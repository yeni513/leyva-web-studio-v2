import type { Metadata } from "next";
import {
  Briefcase,
  Building2,
  Calculator,
  FileSignature,
  Hammer,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  commonDeliverableIcons,
  commonInternalLinks,
  LocalSeoPage,
  type LocalSeoPageData,
} from "@/components/seo/LocalSeoPage";
import { site } from "@/lib/site";

const PATH = "/small-business-web-design";
const TITLE = "Small Business Web Design | Cleveland Local Business Websites";
const DESCRIPTION =
  "Small business web design for Cleveland owners: contractors, beauty, cleaning, repair, tax, notary, local shops and service businesses that need a premium website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${site.url}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: `${site.brand} ${site.brandSub}`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
};

const data: LocalSeoPageData = {
  path: PATH,
  eyebrow: "Small business web design for Cleveland owners",
  h1: "Small business websites that make",
  h1Accent: "local brands look established.",
  intro:
    "A small business website should not feel small. Whether you run a cleaning company, tax office, notary service, repair shop, salon, local store or contractor business, the site should explain what you do and make customers confident enough to contact you.",
  primaryCta: "Quote my business website",
  primaryMessage:
    "Hi Leyva, I need a website for my small business. Can you send me a quote?",
  secondaryMessage:
    "Hi Leyva, I want a premium website for my small business.",
  trust: [
    "Designed for service and storefront businesses",
    "Clear pricing paths",
    "Built to convert visitors into leads",
  ],
  audienceTitle: "Useful for everyday businesses people search for locally",
  audiences: [
    {
      icon: Hammer,
      title: "Contractors and repair",
      text: "Show services, service areas, project examples and quote paths for customers comparing local options.",
    },
    {
      icon: Scissors,
      title: "Beauty and wellness",
      text: "Present services, pricing context, booking paths and the feel of the experience before a client visits.",
    },
    {
      icon: Calculator,
      title: "Taxes and accounting",
      text: "Create trust for tax preparation, bookkeeping and seasonal appointment-driven services.",
    },
    {
      icon: FileSignature,
      title: "Notary and local offices",
      text: "Explain documents, availability, service area and contact options clearly.",
    },
  ],
  problemTitle: "Small businesses often lose trust online before they speak.",
  problemIntro:
    "Customers judge professionalism from the website, even if the business itself is excellent. A weak site can make a strong local company look temporary or hard to reach.",
  problems: [
    {
      title: "The offer is unclear",
      text: "Visitors should understand services, location, price context and next steps without calling just to ask basic questions.",
    },
    {
      title: "The business feels hard to verify",
      text: "Local owners need clear contact details, service areas, photos, policies and professional presentation.",
    },
    {
      title: "The site is not built for repeated use",
      text: "Small businesses need a site that can handle updates, seasonal offers and service changes after launch.",
    },
  ],
  solutionTitle: "A premium digital storefront for local trust.",
  solutionIntro:
    "We build a site that feels serious, loads fast and gives customers enough context to take the next step.",
  deliverables: [
    {
      icon: Sparkles,
      title: "Premium one-page or multi-section site",
      text: "A polished structure for services, trust, FAQs, contact and conversion.",
    },
    {
      icon: commonDeliverableIcons.search,
      title: "Local SEO basics",
      text: "Metadata, headings, service context and internal links that support local discovery.",
    },
    {
      icon: Briefcase,
      title: "Service clarity",
      text: "Sections that explain what you offer, who it is for and what the customer should do next.",
    },
    {
      icon: commonDeliverableIcons.message,
      title: "Direct contact paths",
      text: "Phone, email, WhatsApp and contact form routes designed for mobile visitors.",
    },
    {
      icon: Building2,
      title: "Business identity",
      text: "Content that makes the operation feel established, local and trustworthy.",
    },
    {
      icon: ShieldCheck,
      title: "Care after launch",
      text: "Monthly support so text, photos, offers and technical details can keep improving.",
    },
  ],
  processTitle: "A focused build for owners with limited time.",
  process: [
    {
      title: "Clarify the offer",
      text: "We define services, customer type, service area and the strongest path to inquiry.",
    },
    {
      title: "Build the proof",
      text: "We shape content around trust: what you do, how it works, who you help and how to contact you.",
    },
    {
      title: "Launch and maintain",
      text: "We publish the site, connect the domain and keep it healthy through the monthly plan.",
    },
  ],
  internalLinks: commonInternalLinks.filter((link) => link.href !== PATH),
  faqs: [
    {
      q: "Is this only for larger companies?",
      a: "No. The packages are built specifically for local businesses that need to look professional without hiring a large agency.",
    },
    {
      q: "Can you help if I do not have photos or copy?",
      a: "Yes. We can structure the copy and guide what photos are needed. If you already have photos, we optimize and place them strategically.",
    },
    {
      q: "What small businesses do you work with?",
      a: "Contractors, cleaners, salons, notaries, tax preparers, repair shops, restaurants, local stores and independent service providers.",
    },
  ],
  schemaName: "Small Business Web Design",
  schemaServiceType: "Small business website design",
  schemaDescription: DESCRIPTION,
};

export default function SmallBusinessWebDesignPage() {
  return <LocalSeoPage data={data} />;
}
