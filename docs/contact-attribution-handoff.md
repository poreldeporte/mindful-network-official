# Contact-service handoff: first-party lead attribution

The site now sends a first-party `attribution` object with every contact-form
inquiry. This doc is the changeset for **`tmn-contact-service`** (the separate
Vercel repo at `https://tmn-contact-service.vercel.app/api/contact`) to (1)
surface that source in the provider email and (2) append it to a durable Google
Sheet log — so every real lead carries factual source data, independent of GA4.

## What the site now POSTs

The existing fields are unchanged. A new optional `attribution` object is added:

```jsonc
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "305-555-0100",
  "message": "Do you take Aetna?",
  "professionalName": "Vita Cog",
  "professionalSlug": "vita-cog",
  "attribution": {
    "first_touch": {
      "channel": "Organic Search",
      "referrer": "https://www.google.com/",
      "landing_page": "/find/spanish-speaking-therapists-miami",
      "landing_url": "https://themindfulnetwork.com/find/spanish-speaking-therapists-miami",
      "utm_source": null, "utm_medium": null, "utm_campaign": null,
      "utm_term": null, "utm_content": null,
      "gclid": null, "fbclid": null, "msclkid": null,
      "timestamp": "2026-06-25T13:20:00.000Z"
    },
    "last_touch": { "...": "same shape as first_touch" },
    "ga_client_id": "1234567890.1700000000",
    "ga_session_id": "1700000000",
    "page_url": "https://themindfulnetwork.com/professional/vita-cog",
    "submitted_at": "2026-06-25T13:25:00.000Z"
  }
}
```

`attribution` may be absent (older cached clients) or have `null` touches —
treat it as best-effort. Never reject an inquiry because attribution is missing.

## Change 1 — add an attribution block to the provider email

Render a compact, human-readable summary near the top of the email body. Example
helper (adapt to whatever templating the service uses):

```js
function formatAttribution(attr) {
  if (!attr) return "Source: (not captured)";
  const t = attr.last_touch || attr.first_touch;
  if (!t) return "Source: (not captured)";

  const lines = [
    `Channel: ${t.channel}`,
    t.referrer ? `Referrer: ${t.referrer}` : null,
    t.landing_page ? `Entry page: ${t.landing_page}` : null,
    t.utm_campaign ? `Campaign: ${t.utm_campaign}` : null,
    (t.utm_source || t.utm_medium)
      ? `UTM: ${t.utm_source || "?"} / ${t.utm_medium || "?"}` : null,
    t.gclid ? `Google Ads click (gclid): ${t.gclid}` : null,
    t.fbclid ? `Meta click (fbclid): ${t.fbclid}` : null,
    attr.page_url ? `Submitted from: ${attr.page_url}` : null,
  ].filter(Boolean);

  // Note first-touch too if it differs from last-touch (multi-session lead).
  const first = attr.first_touch;
  if (first && attr.last_touch && first.channel !== attr.last_touch.channel) {
    lines.push(`First touch: ${first.channel}` +
      (first.landing_page ? ` → ${first.landing_page}` : ""));
  }
  return lines.join("\n");
}
```

Then in the email template, add a section like:

```
— Where this lead came from —
{{formatAttribution(body.attribution)}}
```

## Change 2 — append every lead to a durable Google Sheet log

Lowest-friction approach (no googleapis dependency, no service-account creds in
the Vercel function): a **Google Apps Script web app** acts as a write webhook.

### a) Create the sheet + Apps Script

1. New Google Sheet "TMN Leads". Header row:
   `timestamp | provider | name | email | phone | channel | referrer | landing_page | utm_source | utm_medium | utm_campaign | gclid | fbclid | first_touch_channel | page_url | ga_client_id | message`
2. Extensions → Apps Script, paste:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Sheet1"); // adjust tab name
  const a = data.attribution || {};
  const t = a.last_touch || a.first_touch || {};
  const f = a.first_touch || {};
  sheet.appendRow([
    a.submitted_at || new Date().toISOString(),
    data.professionalName || data.professionalSlug || "",
    data.name || "", data.email || "", data.phone || "",
    t.channel || "", t.referrer || "", t.landing_page || "",
    t.utm_source || "", t.utm_medium || "", t.utm_campaign || "",
    t.gclid || "", t.fbclid || "",
    f.channel || "", a.page_url || "", a.ga_client_id || "",
    data.message || "",
  ]);
  return ContentService.createTextOutput("ok");
}
```

3. Deploy → New deployment → type "Web app" → execute as **Me**, access
   **Anyone**. Copy the `/exec` URL.

### b) Call it from the contact function

Add `LEADS_SHEET_WEBHOOK_URL` to the contact-service Vercel env, then after the
email send (do NOT let a logging failure break the inquiry response):

```js
async function logLead(body) {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("lead log failed (non-fatal)", err);
  }
}
```

Call `await logLead(req.body)` (or fire-and-forget) inside the handler after the
email succeeds.

## Notes / limits

- The literal **organic-search query is not recoverable** (Google strips it).
  For organic leads you get channel + engine + the intent-revealing entry page;
  approximate the query with GSC `search_analytics` filtered to that
  `/professional/<slug>` page.
- Paid (`gclid`/`fbclid`) reconciles to campaign/ad/keyword in Google/Meta Ads.
- Tag your Mailchimp + Later link-in-bio links with `utm_*` to make Email/Social
  leads fully attributable by campaign.
- Source of truth lives in the Sheet (1 row per real lead). GA4
  `contact_form_submit` stays as the convenient dashboard but is not authoritative.
```
