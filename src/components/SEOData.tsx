"use client";

import { useSalon } from "@/context/SalonContext";

/**
 * Standardized SEO Metadata Component
 * 1. Generates JSON-LD for LocalBusiness search authority.
 * 2. Dynamically reflects current salon identity.
 */
export default function SEOData() {
  const { salonName } = useSalon();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": salonName,
    "image": "https://qonqu-salon.vercel.app/images/hero.png",
    "@id": "https://qonqu-salon.vercel.app",
    "url": "https://qonqu-salon.vercel.app",
    "telephone": "+6281234567890",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Aesthetic Avenue",
      "addressLocality": "Jakarta",
      "postalCode": "12345",
      "addressCountry": "ID"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "21:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
