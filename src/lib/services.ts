// Пакеты услуг. Кнопка заказа ведёт в Telegram с предзаполненным текстом.
export const orderContact = "https://t.me/imnotsheikh";

export type ServiceTier = {
  slug: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

export const tiers: ServiceTier[] = [
  {
    slug: "lite",
    name: "Lite",
    price: "$10",
    tagline: "A landing page that just works.",
    features: [
      "Single-page site (landing page)",
      "Clean template-based design",
      "Responsive layout — looks right on mobile",
      "Deployed and live on hosting",
    ],
  },
  {
    slug: "standard",
    name: "Standard",
    price: "$50",
    tagline: "A full site for a business or a personal brand.",
    highlighted: true,
    features: [
      "Multi-page site — up to 5 pages (Home, About, Services, Contacts)",
      "Custom-designed elements",
      "Contact form wired to your messengers",
      "Basic SEO setup",
      "Deployed with your own domain connected",
    ],
  },
  {
    slug: "pro",
    name: "Pro",
    price: "$150",
    tagline: "Complex sites and e-commerce, done end to end.",
    features: [
      "Complex website or online store — up to 20 pages / products",
      "Unique design with animations",
      "CMS or admin panel integration",
      "Payments and shopping cart",
      "Full SEO preparation and analytics",
      "Deploy, data migration and 1 month of support",
    ],
  },
];
