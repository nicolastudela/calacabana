import {
  AMENITIES_GROUP,
  AMENITY,
  APARMENTS_NAME,
  APARMENTS_TYPE,
  IAparmentAmenitiesGroup,
  IApartmentData,
} from "../types/shared";

const sharedAparmentAmenities: IAparmentAmenitiesGroup[] = [
  {
    name: AMENITIES_GROUP.SCENIC_VIEWS,
    amenities: [
      {
        name: AMENITY.SIERRAS_VIEW,
        highlighted: true,
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
        description: "Toallas, sabanas, jabon y papel higienico",
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
        name: AMENITY.BLUETOOH_SPEAKER,
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

export const APARTMENTS_BUILD = [APARMENTS_NAME.CABANA, APARMENTS_NAME.CALA, APARMENTS_NAME.CALACABANA];

const APARMENTS_DATA = {
  [APARMENTS_NAME.CABANA]: {
    amenities: sharedAparmentAmenities,
    beds: "4",
    description:
      'Contrary t popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.<br/> Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. <br/> <br/> Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" <br/> by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    images: {
      wide: [
        {
          src: "/images/cabana/wide/1-cabana.jpeg",
          alt: "Apartamento Cabana - exterior - vista a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/2-cabana.jpeg",
          alt: "Apartamento Cabana - exterior - vista a desde la parrilla",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/3-cabana.jpeg",
          alt: "Apartamento Cabana - dormitorio - vista a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/4-cabana.jpeg",
          alt: "Apartamento Cabana - living/comedor",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/5-cabana.jpeg",
          alt: "Apartamento Cabana - living/comedor con salamandra",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/6-cabana.jpeg",
          alt: "Apartamento Cabana - segundo dormitorio con vistas a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/7-cabana.jpeg",
          alt: "Apartamento Cabana - terraza con vistas a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/8-cabana.jpeg",
          alt: "Apartamento Cabana - baño",
          width: 1024,
          height: 682,
        },
      ],
      square: [
        {
          src: "/images/cabana/square/1-cabana.jpeg",
          alt: "Apartamento Cabana - exterior - vista a las sierras",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/2-cabana.jpeg",
          alt: "Apartamento Cabana - exterior - vista a desde la parrilla",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/3-cabana.jpeg",
          alt: "Apartamento Cabana - dormitorio - vista a las sierras",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/4-cabana.jpeg",
          alt: "Apartamento Cabana - living/comedor",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/5-cabana.jpeg",
          alt: "Apartamento Cabana - living/comedor con salamandra",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/6-cabana.jpeg",
          alt: "Apartamento Cabana - segundo dormitorio con vistas a las sierras",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/7-cabana.jpeg",
          alt: "Apartamento Cabana - terraza con vistas a las sierras",
          width: 1024,
          height: 450,
        },
        {
          src: "/images/cabana/square/8-cabana.jpeg",
          alt: "Apartamento Cabana - baño",
          width: 450,
          height: 450,
        },
      ],
    },
    mainFeature: "Terraza con mirador a las sierras",
    name: APARMENTS_NAME.CABANA,
    displayName:`Departamento 
    ${APARMENTS_NAME.CABANA.charAt(0).toUpperCase()}${APARMENTS_NAME.CABANA.slice(1)}`,
    maxPeople: "6",
    rooms: "3",
    type: APARMENTS_TYPE.APARTAMENT,
  } as IApartmentData,
  [APARMENTS_NAME.CALA]: {
    amenities: sharedAparmentAmenities,
    beds: "2",
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.<br/> Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. <br/> <br/> Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" <br/> by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    images: {
      wide: [
        {
          src: "/images/cala/wide/cala-1.jpeg",
          alt: "Apartamento Cala - comedor",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-2.jpeg",
          alt: "Apartamento Cala - living",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-3.jpeg",
          alt: "Apartamento Cala - vista",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-4.jpeg",
          alt: "Apartamento Cala - dormitorio",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-5.jpeg",
          alt: "Apartamento Cala - baño",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-6.jpeg",
          alt: "Apartamento Cala - living/comendor de noche",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-7.jpeg",
          alt: "Apartamento Cala - ambiente calido con salamandra",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-8.jpeg",
          alt: "Apartamento Cala - segundo dormitorio",
          width: 1024,
          height: 682,
        },
      ],
      square: [
        {
          src: "/images/cala/square/cala-1.jpeg",
          alt: "Apartamento Cala - comedor",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-2.jpeg",
          alt: "Apartamento Cala - living",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-3.jpeg",
          alt: "Apartamento Cala - vista",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-4.jpeg",
          alt: "Apartamento Cala - dormitorio",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-5.jpeg",
          alt: "Apartamento Cala - baño",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-6.jpeg",
          alt: "Apartamento Cala - living/comendor de noche",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-7.jpeg",
          alt: "Apartamento Cala - ambiente calido con salamandra",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-8.jpeg",
          alt: "Apartamento Cala - segundo dormitorio",
          width: 450,
          height: 450,
        },
      ],
    },
    mainFeature: "Salida directa a pileta y jardin",
    name: APARMENTS_NAME.CALA,
    displayName:`Departamento 
    ${APARMENTS_NAME.CALA.charAt(0).toUpperCase()}${APARMENTS_NAME.CALA.slice(1)}`,
    maxPeople: "4",
    rooms: "2",
    type: APARMENTS_TYPE.APARTAMENT,
  } as IApartmentData,
  [APARMENTS_NAME.CALACABANA]: {
    type: APARMENTS_TYPE.COMPOUND,
    mainFeature:
      "Tode el complejo (cala + cabana)",
    name: APARMENTS_NAME.CALACABANA,
    displayName: `Complejo 
      ${APARMENTS_NAME.CALACABANA.charAt(0).toUpperCase()}${APARMENTS_NAME.CALACABANA.slice(1)}`,
    beds: "6",
    maxPeople: "10",
    rooms: "5",
    amenities: sharedAparmentAmenities,
    description:
      'Cuentas con todo el complejo<br/> ' + 
      '<a style="text-decoration: underline;" href="cala">Apartamento Cala</a><br/><a style="text-decoration: underline;" href="cabana">Apartamento Cabana</a><br/><br/>' +
      'Al tener toda la propiedad para ti, es posible que traer tus mascotas!!<br/><br/>' + 
      'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.<br/> Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. <br/> <br/> Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" <br/> by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    images: {
        wide: [
          {
            src: "/images/homepage/wide/3-homepage.jpeg",
            alt: "Servicio de hospedaje Calacabana - vista desde cascada pileta",
            width: 1280,
            height: 853,
          },
          {
            src: "/images/cabana/wide/1-cabana.jpeg",
            alt: "Apartamento Cabana - exterior - vista a las sierras",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/cala/wide/cala-1.jpeg",
            alt: "Apartamento Cala - comedor",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/homepage/wide/1-homepage.jpeg",
            alt: "Servicio de hospedaje Calacabana - vista noche pileta",
            width: 1280,
            height: 853,
          },
          {
            src: "/images/homepage/wide/6-homepage.jpeg",
            alt: "Servicio de hospedaje Calacabana - vista hacia los apartamntos con jardin",
            width: 1280,
            height: 853,
          },
          {
            src: "/images/cala/wide/cala-5.jpeg",
            alt: "Apartamento Cala - baño",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/cabana/wide/4-cabana.jpeg",
            alt: "Apartamento Cabana - living/comedor",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/cabana/wide/3-cabana.jpeg",
            alt: "Apartamento Cabana - dormitorio - vista a las sierras",
            width: 1024,
            height: 682,
          },
        ],
        square: [
          {
            src: "/images/cabana/square/2-cabana.jpeg",
            alt: "Servicio de hospedaje Calacabana - Apartamento Cabana - terraza",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cala/square/cala-3.jpeg",
            alt: "Apartamento Cala - vista",
            width: 450,
            height: 450,
          },
          {
            src: "/images/homepage/square/6-homepage.jpeg",
            alt: "Servicio de hospedaje Calacabana - vista hacia los apartamntos con jardin",
            width: 450,
            height: 450,
          },
          {
            src: "/images/homepage/square/3-homepage.jpeg",
            alt: "Servicio de hospedaje Calacabana - vista desde cascada pileta",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cabana/square/1-cabana.jpeg",
            alt: "Apartamento Cabana - exterior - vista a las sierras",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cala/square/cala-1.jpeg",
            alt: "Apartamento Cala - comedor",
            width: 450,
            height: 450,
          },
          {
            src: "/images/homepage/square/1-homepage.jpeg",
            alt: "Servicio de hospedaje Calacabana - vista noche pileta",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cabana/square/4-cabana.jpeg",
            alt: "Apartamento Cabana - living/comedor",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cabana/square/3-cabana.jpeg",
            alt: "Apartamento Cabana - dormitorio - vista a las sierras",
            width: 450,
            height: 450,
          },
        ],
          
    },
  } as IApartmentData,
};

export default APARMENTS_DATA;
