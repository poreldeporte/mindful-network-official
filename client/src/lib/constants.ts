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

export const resources = [
	{
		key: "innovative-therapies",
		title: "Innovative Therapies",
		path: "/search?resource=innovative-therapies",
	},
	{
		key: "psychologists",
		title: "Psychologists",
		path: "/search?resource=psychologists",
	},
	{
		key: "psychiatry",
		title: "Psychiatry",
		path: "/search?resource=psychiatric",
	},
	{
		key: "outpatient",
		title: "Outpatient Facilities",
		path: "/search?resource=outpatient-facilities",
	},
	{
		key: "inpatient",
		title: "Inpatient Facilities",
		path: "/search?resource=inpatient-facilities",
	},
	{
		key: "baker-act-facilities",
		title: "Baker Act Facilities",
		path: "/search?resource=baker-act-facilities",
	},
	{
		key: "estate-planning-lawyers",
		title: "Estate Planning Lawyers",
		path: "/search?resource=estate-planning-lawyers",
	},
	{
		key: "mental-health-lawyers",
		title: "Mental Health Lawyers",
		path: "/search?resource=mental-health-lawyers",
	},
	{
		key: "mind-body-practices",
		title: "Mind Body Practices",
		path: "/search?resource=mind-body-practices",
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
