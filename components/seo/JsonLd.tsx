import Head from "next/head";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

const JsonLd = ({ data }: JsonLdProps) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  </Head>
);

export default JsonLd;

const ORIGIN = "https://www.calacabana.ar";

export const lodgingBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Cala Cabana",
  description:
    "Alquiler de departamentos vacacionales en Tanti, Cordoba. Vista a las sierras, pileta y confort.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Juarez Celman, Villa Serrana Keoken Manzana I Lote 13",
    addressLocality: "Tanti",
    addressRegion: "Córdoba",
    postalCode: "5155",
    addressCountry: "AR",
  },
  url: ORIGIN,
  telephone: "+541150609152",
  image: [`${ORIGIN}/images/homepage/wide/1-homepage.jpeg`],
  priceRange: "$$",
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.359358,
    longitude: -64.557336,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Estacionamiento", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pileta", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parrilla", value: true },
    { "@type": "LocationFeatureSpecification", name: "Aire acondicionado", value: true },
  ],
};

export const buildAccommodationSchema = (apartment: {
  displayName: string;
  name: string;
  description: string;
  mainFeature: string;
  rooms: string;
  beds: string;
  maxPeople: string;
  images: { square: { src: string }[] };
}) => ({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: `${apartment.displayName} - Cala Cabana`,
  description: `${apartment.displayName} en Tanti, Córdoba. ${apartment.mainFeature}. ${apartment.maxPeople} huéspedes, ${apartment.rooms} ambientes.`,
  url: `${ORIGIN}/alojamiento/${apartment.name}`,
  image: apartment.images.square.slice(0, 3).map((img) => `${ORIGIN}${img.src}`),
  numberOfRooms: apartment.rooms,
  occupancy: {
    "@type": "QuantitativeValue",
    value: apartment.maxPeople,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Juarez Celman, Villa Serrana Keoken Manzana I Lote 13",
    addressLocality: "Tanti",
    addressRegion: "Córdoba",
    postalCode: "5155",
    addressCountry: "AR",
  },
  containedInPlace: {
    "@type": "LodgingBusiness",
    name: "Cala Cabana",
    url: ORIGIN,
  },
});

export const ubicacionPlaceSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "Cala Cabana - Barrio Keoken, Tanti",
  description:
    "Complejo de alojamiento vacacional en Barrio Keoken, Tanti, Córdoba. A 9 km de Villa Carlos Paz y 36 km de Córdoba capital.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Juarez Celman, Villa Serrana Keoken Manzana I Lote 13",
    addressLocality: "Tanti",
    addressRegion: "Córdoba",
    postalCode: "5155",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.359358,
    longitude: -64.557336,
  },
  hasMap: "https://maps.app.goo.gl/calacabana",
};
