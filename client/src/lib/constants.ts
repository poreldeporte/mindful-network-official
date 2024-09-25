import { BlogModel } from "@/models";
import { label } from "framer-motion/client";

export const benefits = [
  {
    key: 0,
    title: "Trusted and Verified Resources",
    description:
      "We thoroughly vet and verify every mental health resource in our network, ensuring you only have access to reputable and reliable options.",
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

export const resources = [
  {
    key: "therapy-services-option",
    title: "Therapy Services",
    path: "/therapy-services",
  },
  {
    key: "medication-management-option",
    title: "Medication Management",
    path: "/medication-management",
  },
  {
    key: "neuropsychological-assessment-option",
    title: "Neuropsychological Assessment",
    path: "/neuropsychological-assessment",
  },
  {
    key: "outpatient-programs-option",
    title: "Outpatient Programs",
    path: "/outpatient-programs",
  },
  {
    key: "inpatient-programs-option",
    title: "Inpatient Programs",
    path: "/inpatient-programs",
  },
  {
    key: "baker-act-facilities-option",
    title: "Baker Act Facilities",
    path: "/baker-act-facilities",
  },
  {
    key: "mental-health-legal-support-option",
    title: "Mental Health Legal Support",
    path: "/mental-health-legal-support",
  },
  {
    key: "innovative-therapies-option",
    title: "Innovative Therapies",
    path: "/innovative-therapies",
  },
  {
    key: "mind-body-practices-option",
    title: "Mind-Body Practices",
    path: "/mind-body-practices",
  },
];

export const blogPosts: BlogModel[] = [
  {
    id: "1",
    title: "MENTAL HEALTH",
    description: "Coping with Depression: Finding Light in the Darkness",
    image: "https://plus.unsplash.com/premium_photo-1670002396637-09ad86899d0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    slug: "coping-with-depression-mental-health-1",
    createdAt: "2024-09-24",
    author: "Author Name 1"
  },
  {
    id: "2",
    title: "PERSONAL GROWTH",
    description: "Coping with Depression: Finding Light in the Darkness",
    image: "https://images.unsplash.com/photo-1619182709086-6cb7beadbe66?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "coping-with-depression-personal-growth-2",
    createdAt: "2024-09-24",
    author: "Author Name 2"
  },
  {
    id: "3",
    title: "MENTAL HEALTH",
    description: "Coping with Depression: Finding Light in the Darkness",
    image: "https://images.unsplash.com/photo-1516799782870-54d129f590b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D3",
    slug: "coping-with-depression-mental-health-3",
    createdAt: "2024-09-24",
    author: "Author Name 3"
  },
  {
    id: "4",
    title: "HEALTH",
    description: "Coping with Depression: Finding Light in the Darkness",
    image: "https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "coping-with-depression-health-4",
    createdAt: "2024-09-24",
    author: "Author Name 4"
  },
  {
    id: "5",
    title: "MENTAL HEALTH",
    description: "Coping with Depression: Finding Light in the Darkness",
    image: "https://plus.unsplash.com/premium_photo-1667249323396-1b49a1486b8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "coping-with-depression-mental-health-5",
    createdAt: "2024-09-24",
    author: "Author Name 5"
  },
  {
    id: "6",
    title: "HEALTH",
    description: "Coping with Depression: Finding Light in the Darkness",
    image: "https://images.unsplash.com/photo-1607551848581-7ee851bf978b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D",
    slug: "coping-with-depression-health-6",
    createdAt: "2024-09-24",
    author: "Author Name 6"
  }
];

export const CTACards = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1682687982183-c2937a74257c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Explore Curated Resources"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1655047273143-91261102716f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Join Our Network"
  }
] 

export const navigation = [
  { key: "about-us", label: "About Us", path: "/about-us" },
  { key: "services", label: "Services", path: "/services" },
  { key: "search-professional", label: "Search Professional", path: "/search-professional" },
  { key: "get-listed", label: "Get Listed and Vetted", path: "/get-listed" },
  { key: "resources", label: "Resources", path: "/resources" },
  { key: "reviews", label: "Reviews", path: "/reviews" },
  { key: "contact", label: "Contact", path: "/contact" }
];