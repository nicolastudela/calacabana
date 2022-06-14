import { AMENITIES_GROUP, AMENITY, APARMENTS_NAME, IAparmentAmenitiesGroup, IApartmentData } from "../types/shared";

const sharedAparmentAmenities: IAparmentAmenitiesGroup[] = [
  {
    name: AMENITIES_GROUP.SCENIC_VIEWS,
    amenities: [
      {
        name: AMENITY.SIERRAS_VIEW,
        highlighted: true
      },
    ],
  },
  {
    name: AMENITIES_GROUP.BATHROOM,
    amenities: [
      {
        name: AMENITY.HAIR_DRYER,
      },
      {
        name: AMENITY.SHAMPOO,
      },
      {
        name: AMENITY.HOT_WATER,
      },
      {
        name: AMENITY.BIDET,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.BEEDROOM_LOUNDRY,
    amenities: [
      {
        name: AMENITY.WASHER,
        highlighted: true,
      },
      {
        name: AMENITY.DRYER,
      },
      {
        name: AMENITY.ESSENTIALS,
      },
      {
        name: AMENITY.ESSENTIALS,
        description: "Toallas, sabanas, jabon y papel higienico"
      },
      {
        name: AMENITY.BED_LINENS,
      },
      {
        name: AMENITY.ROOM_DARKENING_SHADES,
      },
      {
        name: AMENITY.ROOM_DARKENING_SHADES,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.ENTERTAINMENT,
    amenities: [
      {
        name: AMENITY.TV,
      },
      {
        name: AMENITY.BLUETOOH_SPEAKER
      },
    ],
  },
  {
    name: AMENITIES_GROUP.HEATING_COOLING,
    amenities: [
      {
        name: AMENITY.AIR_CONDITIONING,
        highlighted: true,
      },
      {
        name: AMENITY.HEATING,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.INTERNET,
    amenities: [
      {
        name: AMENITY.WIFI,
        highlighted: true,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.KITCHEN_DINING,
    amenities: [
      {
        name: AMENITY.KITCHEN,
        description: "Los huéspedes pueden cocinar en este espacio",
      },
      {
        name: AMENITY.REFRIGATOR,
      },
      {
        name: AMENITY.COOKING_BASICS,
        description: "Ollas y sartenes, aceite, sal y pimienta",
      },
      {
        name: AMENITY.DISHES_AND_SILVERWARE,
      },
      {
        name: AMENITY.OVEN,
      },
      {
        name: AMENITY.HOT_WATER_KETTLE,
      },
      {
        name: AMENITY.COFFEE_MAKER,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.LOCATION_FEATURES,
    amenities: [
      {
        name: AMENITY.PRIVATE_ENTRANCE,
      },
      {
        name: AMENITY.RESORT_ACCESS,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.OUTDOOR,
    amenities: [
      {
        name: AMENITY.PRIVATE_PATIO_OR_BALCONY,
      },
      {
        name: AMENITY.BACKYARD,
      },
      {
        name: AMENITY.OUTDOOR_FURNITURE,
      },
      {
        name: AMENITY.OUTDOOR_DINING_AREA,
      },
      {
        name: AMENITY.BBQ_GRILL,
        highlighted: true,
      },
    ],
  },
  {
    name: AMENITIES_GROUP.PARKING_AND_FACILITIES,
    amenities: [
      {
        name: AMENITY.PARKING,
        description: "Estacionamiento bajo techo",
      },
      {
        name: AMENITY.SHARED_POOL,
        description: "Los huéspedes pueden usar la piscina y solarium",
        highlighted: true,
      },
    ],
  },
];

const APARMENTS = {
  [APARMENTS_NAME.CABANA]: {
    amenities: sharedAparmentAmenities,
    beds: "4",
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.\n Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. \n \n Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" \n by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    mainFeature: "Terraza con mirador a las sierras",
    name: "Cabana",
    maxPeople: "6",
    rooms: "3",
  } as IApartmentData,
  [APARMENTS_NAME.CALA]: {
    amenities: sharedAparmentAmenities,
    beds: "2",
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.\n Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. \n \n Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" \n by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    images: [
      {
        src: '/images/cala/wide/cala-1.jpeg',
        alt: "Apartamento Cala - comedor",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-2.jpeg',
        alt: "Apartamento Cala - living",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-3.jpeg',
        alt: "Apartamento Cala - vista",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-4.jpeg',
        alt: "Apartamento Cala - dormitorio",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-5.jpeg',
        alt: "Apartamento Cala - baño",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-6.jpeg',
        alt: "Apartamento Cala - living/comendor de noche",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-7.jpeg',
        alt: "Apartamento Cala - ambiente calido con salamandra",
        width: 1024,
        height: 682,
      },
      {
        src: '/images/cala/wide/cala-8.jpeg',
        alt: "Apartamento Cala - segundo dormitorio",
        width: 1024,
        height: 682,
      },
    ],
    mainFeature: "Salida directa a pileta y jardin",
    name: "Cala",
    maxPeople: "4",
    rooms: "2",
  } as IApartmentData,
}


export default APARMENTS;