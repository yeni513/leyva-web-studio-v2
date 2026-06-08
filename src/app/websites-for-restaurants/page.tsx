import type { Metadata } from "next";
import {
  CalendarDays,
  Camera,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import {
  commonInternalLinks,
  LocalSeoPage,
  type LocalSeoPageData,
} from "@/components/seo/LocalSeoPage";
import { site } from "@/lib/site";

const PATH = "/websites-for-restaurants";
const TITLE = "Restaurant Websites in Cleveland | Menus, Reservations, Local SEO";
const DESCRIPTION =
  "Premium websites for Cleveland restaurants, food trucks, taquerias, cafes and catering businesses with menus, photos, reservations, WhatsApp and local SEO.";

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
  eyebrow: "Restaurant websites for Cleveland food businesses",
  h1: "Websites for restaurants that turn",
  h1Accent: "hungry visitors into customers.",
  intro:
    "A restaurant website has to do more than look pretty. It should make the menu easy to scan, the food easy to crave, the location easy to find and the next action obvious: call, reserve, order, message or visit.",
  primaryCta: "Quote my restaurant site",
  primaryMessage:
    "Hi Leyva, I need a website for my restaurant or food business. Can you send me a quote?",
  secondaryMessage:
    "Hi Leyva, I want a restaurant website with menu, photos and reservations.",
  trust: [
    "Menus and photos built for mobile",
    "Reservations, calls and WhatsApp",
    "Local SEO for Cleveland diners",
  ],
  audienceTitle: "Built for food businesses with real-world operations",
  audiences: [
    {
      icon: UtensilsCrossed,
      title: "Restaurants and taquerias",
      text: "Show menu, atmosphere, catering, events and key dishes without making customers hunt.",
    },
    {
      icon: ShoppingBag,
      title: "Food trucks and takeout",
      text: "Highlight location updates, ordering paths, hours and social links for quick decisions.",
    },
    {
      icon: CalendarDays,
      title: "Catering and private events",
      text: "Create inquiry flows for catering, parties, corporate lunches and family celebrations.",
    },
    {
      icon: Camera,
      title: "Cafes and bakeries",
      text: "Use strong visuals, seasonal offers and local search content to bring people in.",
    },
  ],
  problemTitle: "Diners decide fast, usually on their phone.",
  problemIntro:
    "A restaurant can lose a customer because the menu is a PDF, photos are buried, hours are unclear or the reservation path is hard to find.",
  problems: [
    {
      title: "The menu is hard to use",
      text: "PDF menus are slow, small on mobile and hard to update. A good menu should be readable and organized.",
    },
    {
      title: "The food is not selling visually",
      text: "Customers want to see dishes, space and vibe before they commit to a visit or catering request.",
    },
    {
      title: "Calls and reservations are hidden",
      text: "If the action is not obvious, diners bounce to another restaurant with a simpler path.",
    },
  ],
  solutionTitle: "A restaurant website built around appetite and action.",
  solutionIntro:
    "We structure the page so customers can understand the food, trust the place and take action without friction.",
  deliverables: [
    {
      icon: UtensilsCrossed,
      title: "Mobile menu sections",
      text: "Readable categories for tacos, plates, drinks, specials, catering or whatever your restaurant sells.",
    },
    {
      icon: Camera,
      title: "Food and atmosphere visuals",
      text: "Image sections that show dishes and space without slowing the site down.",
    },
    {
      icon: Phone,
      title: "Call and reservation CTAs",
      text: "Clear buttons for phone, WhatsApp, reservation links or catering requests.",
    },
    {
      icon: MapPin,
      title: "Location and hours",
      text: "Address, parking notes, service area, hours and map context for Cleveland diners.",
    },
    {
      icon: Search,
      title: "Restaurant local SEO",
      text: "Metadata and content around restaurant type, city, menu intent and local discovery.",
    },
    {
      icon: MessageCircle,
      title: "Catering inquiries",
      text: "Simple forms or WhatsApp prefill messages for bigger orders and private events.",
    },
  ],
  processTitle: "From menu to launch.",
  process: [
    {
      title: "Gather the menu and offers",
      text: "We organize dishes, catering, specials, hours, photos and the actions customers take most.",
    },
    {
      title: "Design around appetite",
      text: "The site uses visual hierarchy, food photography and clear sections to make the restaurant feel premium.",
    },
    {
      title: "Launch with contact paths",
      text: "The final page connects phone, WhatsApp, maps, reservations and catering inquiries.",
    },
  ],
  internalLinks: commonInternalLinks.filter((link) => link.href !== PATH),
  faqs: [
    {
      q: "Can you build a restaurant website without online ordering?",
      a: "Yes. Some restaurants only need a strong menu, photos, location, phone and reservation or WhatsApp path. Online ordering can be added if it fits the operation.",
    },
    {
      q: "Can the menu be updated later?",
      a: "Yes. Menu edits can be handled through the monthly care plan, and we can structure the site so common changes are straightforward.",
    },
    {
      q: "Do you work with Spanish-speaking restaurant owners?",
      a: "Yes. Leyva Web Studio works in English or Spanish, which is useful for Cleveland restaurants and Hispanic-owned food businesses.",
    },
  ],
  schemaName: "Restaurant Websites in Cleveland",
  schemaServiceType: "Restaurant website design",
  schemaDescription: DESCRIPTION,
};

export default function RestaurantWebsitesPage() {
  return <LocalSeoPage data={data} />;
}
