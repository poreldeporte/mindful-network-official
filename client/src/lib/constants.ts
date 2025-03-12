import { EventbriteEventsResponse } from "@/models/eventbrite.model";
import {
	IconBriefcase,
	IconShieldPlus,
	IconHeadset,
	IconBuildingHospital,
} from "@tabler/icons-react";

export const benefits = [
	{
		key: 0,
		title: "Trusted and Verified Resources",
		description:
			"We thoroughly vet and verify evOery mental health resource in our network, ensuring you only have access to reputable and reliable options.",
	},
	{
		key: 1,
		title: "Up-to-Date Information",
		description:
			"Our team continuously monitors and updates our listings, so you can always count on receiving the most current and relevant information.",
	},
	{
		key: 2,
		title: "Personalized Search Options",
		description:
			"With our advanced filters, you can easily find mental health services tailored to your specific needs, whether it’s based on location, type of therapy, insurance coverage, or condition specialty.",
	},
];

export const privacyPolicyContent = [
	{
		id: "platform-information",
		title: "Platform Information",
		content: `The Mindful Network is an informational platform designed to connect individuals with mental health resources.
The content on this site is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
Always seek the advice of your physician or qualified mental health provider with any questions regarding your condition.
In case of a life-threatening emergency, call 911 or go to your nearest emergency room immediately.
This platform does not provide direct clinical services.`,
	},
	{
		id: "accessibility-commitment",
		title: "Accesibility Commitment",
		content: `The Mindful Network is committed to making our website accessible to individuals with disabilities in compliance with the Americans with Disabilities Act (ADA). If you experience any barriers while using our website or need assistance, please contact us at [Contact Information] so we can assist you.`,
	},
	{
		id: "information-we-collect",
		title: "Information We Collect",
		subsections: [
			{
				id: "personal-information",
				title: "Personal Information",
				content:
					"We collect personal data such as name, email address, and location.",
			},
			{
				id: "health-information",
				title: "Health Information",
				content:
					"We may collect health-related information, with user consent, for tailored resources.",
			},
			{
				id: "usage-data",
				title: "Usage Data",
				content:
					"We collect usage data automatically, such as browser type, IP address, and usage statistics.",
			},
		],
	},
	{
		id: "how-we-use-your-information",
		title: "How We Use Your Information",
		content:
			"We use the information to deliver services, personalize user experiences, communicate updates, and analyze platform usage trends.",
	},
	{
		id: "sharing-your-information",
		title: "Sharing Your Information",
		subsections: [
			{
				id: "third-party-providers",
				title: "Third-Party Providers",
				content:
					"We share information with third-party providers for hosting, analytics, and other services.",
			},
			{
				id: "legal-compliance",
				title: "Legal Compliance",
				content:
					"Information may be disclosed to comply with legal obligations or protect user safety.",
			},
			{
				id: "no-sale-of-data",
				title: "No Sale of Data",
				content:
					"We assure users that their information will not be sold to third parties.",
			},
		],
	},
];

export const termsOfServiceContent = [
	{
		id: "introduction",
		title: "Introduction",
		content:
			"These terms outline the conditions for using the platform. By using the app, users accept these terms.",
	},
	{
		id: "user-responsibilities",
		title: "User Responsibilities",
		subsections: [
			{
				id: "account-information",
				title: "Account Information",
				content:
					"Users are responsible for providing accurate information and maintaining account security.",
			},
			{
				id: "prohibited-activities",
				title: "Prohibited Activities",
				content:
					"Prohibited activities include illegal use, harassment, or unauthorized access attempts.",
			},
		],
	},
	{
		id: "use-of-services",
		title: "Use of Services",
		content:
			"We provide specific services and reserve the right to modify or discontinue them as necessary.",
	},
];

export const CTACards = [
	{
		id: "1",
		image:
			"https://images.unsplash.com/photo-1682687982183-c2937a74257c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		buttonText: "Explore Curated Resources",
		path: "/search",
		isInternalLink: true,
		sectionToScroll: null,
	},
	{
		id: "2",
		image:
			"https://images.unsplash.com/photo-1655047273143-91261102716f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		buttonText: "Join Our Network",
		path: "/useful-links",
		isInternalLink: false,
		sectionToScroll: "get-in-touch-form",
	},
];

export const psychologistNavigation = [
	{
		key: "#age-specialty",
		label: "Age Specialty",
	},
	{
		key: "#insurances",
		label: "Insurances",
	},
	{
		key: "#condition-specialty",
		label: "Condition Specialty",
	},
	{
		key: "#therapy-options",
		label: "Therapy Options",
	},
];

export const aboutFooter = [
	{
		key: "the-why",
		label: "The Why",
		link: "/about",
	},
	{
		key: "useful-links",
		label: "Useful Links",
		link: "/useful-links",
	},
	{
		key: "privacy-policy",
		label: "Privacy Policy",
		link: "/privacy-policy",
	},
	{
		key: "terms-of-service",
		label: "Terms of Service",
		link: "/terms-of-service",
	},
	{
		key: "contact",
		label: "Contact",
		link: "/contact",
	},
];

export const usefulLinks = [
	{
		id: "mental-health-services",
		title: "Mental Health Services",
		links: [
			"Therapy services",
			"Neuropsychological Assessment",
			"Outpatient Programs",
		],
		icon: IconBriefcase,
	},
	{
		id: "insurance-and-financial-aid",
		title: "Insurance and Financial Aid",
		links: [
			"Accepted Insurance Plans",
			"Medicaid and Medicare Information",
			"Guide to Using Insurance for Therapy",
		],
		icon: IconShieldPlus,
	},
	{
		id: "support-groups",
		title: "Support groups",
		links: [
			"Peer Support Groups",
			"Family Counseling Programs",
			"Community Centers for Mental Wellness",
		],
		icon: IconHeadset,
	},
	{
		id: "crisis-and-emergency-links",
		title: "Crisis and Emergency Links",
		links: [
			"Suicide Prevention Hotline",
			"Local Crisis Centers",
			"Emergency Numbers",
		],
		icon: IconBuildingHospital,
	},
];

export const eventbriteEvents: EventbriteEventsResponse = {
	pagination: {
		object_count: 5,
		page_number: 1,
		page_size: 50,
		page_count: 1,
		has_more_items: false,
	},
	events: [
		{
			id: "98765432109",
			name: {
				text: "Mindfulness Meditation Retreat: Finding Inner Peace",
				html: "Mindfulness Meditation Retreat: Finding Inner Peace",
			},
			description: {
				text: "Join us for a transformative weekend of mindfulness meditation in a serene setting. This retreat is designed for both beginners and experienced practitioners who wish to deepen their mindfulness practice and find lasting inner peace. Led by experienced meditation teachers, you'll learn practical techniques for bringing mindfulness into your daily life, reducing stress, and cultivating greater awareness and compassion. The retreat includes guided meditations, mindful walking, gentle yoga, and periods of silence, as well as group discussions and one-on-one sessions with teachers. All meals are included and feature locally-sourced, organic vegetarian cuisine.",
				html: "<p>Join us for a transformative weekend of mindfulness meditation in a serene setting. This retreat is designed for both beginners and experienced practitioners who wish to deepen their mindfulness practice and find lasting inner peace.</p><p>Led by experienced meditation teachers, you'll learn practical techniques for bringing mindfulness into your daily life, reducing stress, and cultivating greater awareness and compassion.</p><p>The retreat includes:</p><ul><li>Guided meditations</li><li>Mindful walking</li><li>Gentle yoga</li><li>Periods of silence</li><li>Group discussions</li><li>One-on-one sessions with teachers</li></ul><p>All meals are included and feature locally-sourced, organic vegetarian cuisine.</p>",
			},
			url: "https://www.eventbrite.com/e/mindfulness-meditation-retreat-finding-inner-peace-tickets-98765432109",
			start: {
				timezone: "America/New_York",
				local: "2025-04-18T17:00:00",
				utc: "2025-04-18T21:00:00Z",
			},
			end: {
				timezone: "America/New_York",
				local: "2025-04-20T14:00:00",
				utc: "2025-04-20T18:00:00Z",
			},
			organization_id: "12345678",
			created: "2025-01-15T12:00:00Z",
			changed: "2025-01-20T14:30:00Z",
			published: "2025-01-21T09:00:00Z",
			capacity: 30,
			capacity_is_custom: true,
			status: "live",
			currency: "USD",
			listed: true,
			shareable: true,
			online_event: false,
			tx_time_limit: 1800,
			hide_start_date: false,
			hide_end_date: false,
			locale: "en_US",
			is_locked: false,
			privacy_setting: "unlocked",
			is_series: false,
			is_series_parent: false,
			inventory_type: "limited",
			is_reserved_seating: false,
			show_pick_a_seat: false,
			show_seatmap_thumbnail: false,
			show_colors_in_seatmap_thumbnail: false,
			source: "create_html",
			is_free: false,
			version: "3.0.0",
			summary:
				"A weekend retreat focused on mindfulness meditation practices for inner peace",
			facebook_event_id: null,
			logo_id: "54321987",
			organizer_id: "98765432",
			venue: {
				id: "87654321",
				name: "Serenity Retreat Center",
				address: {
					address_1: "123 Peaceful Lane",
					address_2: null,
					city: "Miami",
					region: "FL",
					postal_code: "33101",
					country: "US",
					latitude: "25.7617",
					longitude: "-80.1918",
				},
				capacity: 50,
				venue_type: "physical",
			},
			format_id: "9",
			format: {
				id: "9",
				name: "Retreat",
				name_localized: "Retreat",
				short_name: "Retreat",
				short_name_localized: "Retreat",
			},
			category_id: "107",
			category: {
				id: "107",
				name: "Health & Wellness",
				name_localized: "Health & Wellness",
				short_name: "Health",
				short_name_localized: "Health",
			},
			subcategory_id: "7005",
			subcategory: {
				id: "7005",
				name: "Meditation",
				name_localized: "Meditation",
				short_name: "Meditation",
				short_name_localized: "Meditation",
			},
			price_range: {
				min: "375.00",
				max: "450.00",
				currency: "USD",
			},
			logo: {
				url: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			id: "87654321098",
			name: {
				text: "Mindful Living Workshop: Stress Reduction Through Awareness",
				html: "Mindful Living Workshop: Stress Reduction Through Awareness",
			},
			description: {
				text: "This one-day workshop offers practical tools for incorporating mindfulness into your everyday life to reduce stress and anxiety. Learn how small moments of awareness can transform your relationship with stress and help you respond more skillfully to life's challenges. Suitable for all levels, this workshop combines evidence-based mindfulness techniques with the latest research in neuroscience and psychology. You'll leave with a personalized mindfulness plan and practical strategies you can implement immediately. The workshop includes guided mindfulness exercises, interactive discussions, hands-on activities, and take-home materials to support your ongoing practice.",
				html: "<p>This one-day workshop offers practical tools for incorporating mindfulness into your everyday life to reduce stress and anxiety.</p><p>Learn how small moments of awareness can transform your relationship with stress and help you respond more skillfully to life's challenges.</p><p>Suitable for all levels, this workshop combines evidence-based mindfulness techniques with the latest research in neuroscience and psychology. You'll leave with a personalized mindfulness plan and practical strategies you can implement immediately.</p><p>The workshop includes:</p><ul><li>Guided mindfulness exercises</li><li>Interactive discussions</li><li>Hands-on activities</li><li>Take-home materials to support your ongoing practice</li></ul>",
			},
			url: "https://www.eventbrite.com/e/mindful-living-workshop-stress-reduction-through-awareness-tickets-87654321098",
			start: {
				timezone: "America/New_York",
				local: "2025-05-10T09:00:00",
				utc: "2025-05-10T13:00:00Z",
			},
			end: {
				timezone: "America/New_York",
				local: "2025-05-10T16:00:00",
				utc: "2025-05-10T20:00:00Z",
			},
			organization_id: "23456789",
			created: "2025-01-25T15:30:00Z",
			changed: "2025-02-02T10:15:00Z",
			published: "2025-02-05T08:45:00Z",
			capacity: 50,
			capacity_is_custom: true,
			status: "live",
			currency: "USD",
			listed: true,
			shareable: true,
			online_event: false,
			tx_time_limit: 1800,
			hide_start_date: false,
			hide_end_date: false,
			locale: "en_US",
			is_locked: false,
			privacy_setting: "unlocked",
			is_series: false,
			is_series_parent: false,
			inventory_type: "limited",
			is_reserved_seating: false,
			show_pick_a_seat: false,
			show_seatmap_thumbnail: false,
			show_colors_in_seatmap_thumbnail: false,
			source: "create_html",
			is_free: false,
			version: "3.0.0",
			summary:
				"A practical workshop on applying mindfulness techniques for stress reduction",
			facebook_event_id: null,
			logo_id: "65432198",
			organizer_id: "87654321",
			venue: {
				id: "76543219",
				name: "The Mindful Center",
				address: {
					address_1: "456 Awareness Avenue",
					address_2: "Suite 200",
					city: "Fort Lauderdale",
					region: "FL",
					postal_code: "33301",
					country: "US",
					latitude: "26.1224",
					longitude: "-80.1373",
				},
				capacity: 60,
				venue_type: "physical",
			},
			format_id: "1",
			format: {
				id: "1",
				name: "Workshop",
				name_localized: "Workshop",
				short_name: "Workshop",
				short_name_localized: "Workshop",
			},
			category_id: "107",
			category: {
				id: "107",
				name: "Health & Wellness",
				name_localized: "Health & Wellness",
				short_name: "Health",
				short_name_localized: "Health",
			},
			subcategory_id: "7005",
			subcategory: {
				id: "7005",
				name: "Meditation",
				name_localized: "Meditation",
				short_name: "Meditation",
				short_name_localized: "Meditation",
			},
			price_range: {
				min: "85.00",
				max: "85.00",
				currency: "USD",
			},
			logo: {
				url: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			id: "76543210987",
			name: {
				text: "Virtual Mindfulness for Mental Health: An Online Experience",
				html: "Virtual Mindfulness for Mental Health: An Online Experience",
			},
			description: {
				text: "Join us for this virtual mindfulness session designed specifically to support mental health and emotional wellbeing. In today's fast-paced world, taking time to cultivate mindfulness is essential for maintaining balance and resilience. This online workshop will introduce you to practical mindfulness techniques that can help reduce anxiety, manage depression, and improve overall mental health. Our experienced instructor will guide you through meditation practices, breathing exercises, and mindful movement that you can easily incorporate into your daily routine. This session is perfect for beginners as well as those with some mindfulness experience who want to deepen their practice specifically for mental health benefits. You'll need a quiet space, comfortable clothing, and an internet connection.",
				html: "<p>Join us for this virtual mindfulness session designed specifically to support mental health and emotional wellbeing. In today's fast-paced world, taking time to cultivate mindfulness is essential for maintaining balance and resilience.</p><p>This online workshop will introduce you to practical mindfulness techniques that can help reduce anxiety, manage depression, and improve overall mental health.</p><p>Our experienced instructor will guide you through:</p><ul><li>Meditation practices tailored for anxiety and stress relief</li><li>Breathing exercises for emotional regulation</li><li>Mindful movement for embodied awareness</li><li>Simple techniques you can easily incorporate into your daily routine</li></ul><p>This session is perfect for beginners as well as those with some mindfulness experience who want to deepen their practice specifically for mental health benefits.</p><p>You'll need a quiet space, comfortable clothing, and an internet connection.</p>",
			},
			url: "https://www.eventbrite.com/e/virtual-mindfulness-for-mental-health-an-online-experience-tickets-76543210987",
			start: {
				timezone: "America/New_York",
				local: "2025-04-05T11:00:00",
				utc: "2025-04-05T15:00:00Z",
			},
			end: {
				timezone: "America/New_York",
				local: "2025-04-05T12:30:00",
				utc: "2025-04-05T16:30:00Z",
			},
			organization_id: "34567890",
			created: "2025-01-10T09:45:00Z",
			changed: "2025-01-15T16:20:00Z",
			published: "2025-01-18T11:30:00Z",
			capacity: 100,
			capacity_is_custom: true,
			status: "live",
			currency: "USD",
			listed: true,
			shareable: true,
			online_event: true,
			tx_time_limit: 1800,
			hide_start_date: false,
			hide_end_date: false,
			locale: "en_US",
			is_locked: false,
			privacy_setting: "unlocked",
			is_series: true,
			is_series_parent: false,
			inventory_type: "limited",
			is_reserved_seating: false,
			show_pick_a_seat: false,
			show_seatmap_thumbnail: false,
			show_colors_in_seatmap_thumbnail: false,
			source: "create_html",
			is_free: false,
			version: "3.0.0",
			summary:
				"A virtual workshop focusing on mindfulness techniques for mental health support",
			facebook_event_id: null,
			logo_id: "76543219",
			organizer_id: "76543210",
			venue: null,
			online_event_details: {
				online_event_url: "https://zoom.us/j/1234567890",
				online_event_type: "zoom",
				online_event_third_party: true,
			},
			format_id: "2",
			format: {
				id: "2",
				name: "Virtual Class",
				name_localized: "Virtual Class",
				short_name: "Class",
				short_name_localized: "Class",
			},
			category_id: "107",
			category: {
				id: "107",
				name: "Health & Wellness",
				name_localized: "Health & Wellness",
				short_name: "Health",
				short_name_localized: "Health",
			},
			subcategory_id: "7005",
			subcategory: {
				id: "7005",
				name: "Meditation",
				name_localized: "Meditation",
				short_name: "Meditation",
				short_name_localized: "Meditation",
			},
			price_range: {
				min: "25.00",
				max: "25.00",
				currency: "USD",
			},
			logo: {
				url: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			id: "65432109876",
			name: {
				text: "Mindfulness & Art: Exploring Creativity Through Present Moment Awareness",
				html: "Mindfulness &amp; Art: Exploring Creativity Through Present Moment Awareness",
			},
			description: {
				text: "Discover the powerful connection between mindfulness and artistic expression in this unique workshop. No artistic experience is necessary - just a willingness to explore and play. Through guided mindfulness exercises and creative activities, you'll learn to access your innate creativity by cultivating present moment awareness. This workshop creates a safe, non-judgmental space to explore the intersection of mindfulness and creativity. You'll experiment with various art forms including drawing, collage, and expressive writing, all through the lens of mindful awareness. All materials are provided, and you'll take home your creations along with techniques for continuing your mindful creative practice. Limited to 15 participants to ensure personalized attention.",
				html: "<p>Discover the powerful connection between mindfulness and artistic expression in this unique workshop. No artistic experience is necessary - just a willingness to explore and play.</p><p>Through guided mindfulness exercises and creative activities, you'll learn to access your innate creativity by cultivating present moment awareness.</p><p>This workshop creates a safe, non-judgmental space to explore the intersection of mindfulness and creativity. You'll experiment with:</p><ul><li>Mindful drawing exercises</li><li>Intuitive collage-making</li><li>Expressive writing practices</li><li>Sensory awareness activities</li></ul><p>All materials are provided, and you'll take home your creations along with techniques for continuing your mindful creative practice.</p><p>Limited to 15 participants to ensure personalized attention.</p>",
			},
			url: "https://www.eventbrite.com/e/mindfulness-art-exploring-creativity-through-present-moment-awareness-tickets-65432109876",
			start: {
				timezone: "America/New_York",
				local: "2025-05-17T13:00:00",
				utc: "2025-05-17T17:00:00Z",
			},
			end: {
				timezone: "America/New_York",
				local: "2025-05-17T16:00:00",
				utc: "2025-05-17T20:00:00Z",
			},
			organization_id: "45678901",
			created: "2025-02-01T14:30:00Z",
			changed: "2025-02-10T09:15:00Z",
			published: "2025-02-12T11:45:00Z",
			capacity: 15,
			capacity_is_custom: true,
			status: "live",
			currency: "USD",
			listed: true,
			shareable: true,
			online_event: false,
			tx_time_limit: 1800,
			hide_start_date: false,
			hide_end_date: false,
			locale: "en_US",
			is_locked: false,
			privacy_setting: "unlocked",
			is_series: false,
			is_series_parent: false,
			inventory_type: "limited",
			is_reserved_seating: false,
			show_pick_a_seat: false,
			show_seatmap_thumbnail: false,
			show_colors_in_seatmap_thumbnail: false,
			source: "create_html",
			is_free: false,
			version: "3.0.0",
			summary:
				"A creative workshop combining mindfulness practice with artistic expression",
			facebook_event_id: null,
			logo_id: "87654321",
			organizer_id: "65432109",
			venue: {
				id: "65432198",
				name: "Creative Mindfulness Studio",
				address: {
					address_1: "789 Artistic Way",
					address_2: null,
					city: "West Palm Beach",
					region: "FL",
					postal_code: "33401",
					country: "US",
					latitude: "26.7153",
					longitude: "-80.0534",
				},
				capacity: 20,
				venue_type: "physical",
			},
			format_id: "1",
			format: {
				id: "1",
				name: "Workshop",
				name_localized: "Workshop",
				short_name: "Workshop",
				short_name_localized: "Workshop",
			},
			category_id: "107",
			category: {
				id: "107",
				name: "Health & Wellness",
				name_localized: "Health & Wellness",
				short_name: "Health",
				short_name_localized: "Health",
			},
			subcategory_id: "7002",
			subcategory: {
				id: "7002",
				name: "Art Therapy",
				name_localized: "Art Therapy",
				short_name: "Art Therapy",
				short_name_localized: "Art Therapy",
			},
			price_range: {
				min: "65.00",
				max: "65.00",
				currency: "USD",
			},
			logo: {
				url: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			id: "54321098765",
			name: {
				text: "Mindfulness for Families: Cultivating Peace in the Home",
				html: "Mindfulness for Families: Cultivating Peace in the Home",
			},
			description: {
				text: "This special family workshop introduces age-appropriate mindfulness practices that parents and children can enjoy together. Learn practical strategies for bringing more calm, connection, and joy into your family life. This workshop is designed for families with children ages 6-12 and offers a playful, engaging approach to mindfulness that kids will enjoy while providing parents with tools they can use at home. Through interactive activities, games, storytelling, and simple mindfulness exercises, families will discover how to navigate challenges with greater ease and build stronger connections. Each family will receive a take-home kit with mindfulness activities and resources to continue the practice at home. Limited to 10 families to ensure a quality experience for all participants.",
				html: "<p>This special family workshop introduces age-appropriate mindfulness practices that parents and children can enjoy together. Learn practical strategies for bringing more calm, connection, and joy into your family life.</p><p>This workshop is designed for families with children ages 6-12 and offers a playful, engaging approach to mindfulness that kids will enjoy while providing parents with tools they can use at home.</p><p>Through interactive activities, you'll learn:</p><ul><li>Simple mindfulness games for the whole family</li><li>Calming techniques for challenging moments</li><li>Ways to build emotional awareness and regulation</li><li>Mindful communication skills</li><li>Bedtime mindfulness rituals</li></ul><p>Each family will receive a take-home kit with mindfulness activities and resources to continue the practice at home.</p><p>Limited to 10 families to ensure a quality experience for all participants.</p>",
			},
			url: "https://www.eventbrite.com/e/mindfulness-for-families-cultivating-peace-in-the-home-tickets-54321098765",
			start: {
				timezone: "America/New_York",
				local: "2025-04-26T10:00:00",
				utc: "2025-04-26T14:00:00Z",
			},
			end: {
				timezone: "America/New_York",
				local: "2025-04-26T12:00:00",
				utc: "2025-04-26T16:00:00Z",
			},
			organization_id: "56789012",
			created: "2025-01-20T10:30:00Z",
			changed: "2025-02-05T13:45:00Z",
			published: "2025-02-08T09:15:00Z",
			capacity: 40,
			capacity_is_custom: true,
			status: "live",
			currency: "USD",
			listed: true,
			shareable: true,
			online_event: false,
			tx_time_limit: 1800,
			hide_start_date: false,
			hide_end_date: false,
			locale: "en_US",
			is_locked: false,
			privacy_setting: "unlocked",
			is_series: false,
			is_series_parent: false,
			inventory_type: "limited",
			is_reserved_seating: false,
			show_pick_a_seat: false,
			show_seatmap_thumbnail: false,
			show_colors_in_seatmap_thumbnail: false,
			source: "create_html",
			is_free: false,
			version: "3.0.0",
			summary:
				"An interactive workshop teaching mindfulness practices for the whole family",
			facebook_event_id: null,
			logo_id: "98765432",
			organizer_id: "54321098",
			venue: {
				id: "54321987",
				name: "Family Wellness Center",
				address: {
					address_1: "321 Family Circle",
					address_2: "Building B",
					city: "Boca Raton",
					region: "FL",
					postal_code: "33432",
					country: "US",
					latitude: "26.3683",
					longitude: "-80.1289",
				},
				capacity: 50,
				venue_type: "physical",
			},
			format_id: "1",
			format: {
				id: "1",
				name: "Workshop",
				name_localized: "Workshop",
				short_name: "Workshop",
				short_name_localized: "Workshop",
			},
			category_id: "107",
			category: {
				id: "107",
				name: "Health & Wellness",
				name_localized: "Health & Wellness",
				short_name: "Health",
				short_name_localized: "Health",
			},
			subcategory_id: "7004",
			subcategory: {
				id: "7004",
				name: "Family & Education",
				name_localized: "Family & Education",
				short_name: "Family",
				short_name_localized: "Family",
			},
			price_range: {
				min: "45.00",
				max: "45.00",
				currency: "USD",
			},
			logo: {
				url: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
	],
};
