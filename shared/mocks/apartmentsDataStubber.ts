import {
  AMENITIES_GROUP,
  AMENITY,
  APARMENT_TYPES,
  IAparmentAmenitiesGroup,
  IApartmentData,
} from "@/types/shared";

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
        description: "Toallas, sabanas, jabon y papel higienico",
      },
      {
        name: AMENITY.BED_LINENS,
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
        highlighted: true,
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
        highlighted: true,
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
        highlighted: true,
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

const calacabana_paking_and_facilities =   {
  name: AMENITIES_GROUP.PARKING_AND_FACILITIES,
  amenities: [
    {
      name: AMENITY.PARKING,
      description: "Estacionamiento bajo techo",
    },
    {
      name: AMENITY.POOL,
      description: "Los huéspedes pueden usar la piscina y solarium",
      highlighted: true,
    },
    {
      name: AMENITY.PET_FRIENDLY,
      description: "El alojamiento acepta tus mascotas",
      highlighted: true,
    },
    {
      name: AMENITY.ALL_PROPERTY,
      highlighted: true,
    },
  ],
}

const APARMENTS_DATA = {
  ["cabana"]: {
    amenities: sharedAparmentAmenities,
    beds: "4",
    description:
      'Ubicado en la planta alta, especial para apreciar las sierras. Cuenta con una hermosa terraza. Especial para apreciar la caida del sol.<br/>' +
      'Las vistas del apartamento son hermosas, encontraras fascinante poder despertarse y poder apreciar de las sierras<br/><br/>' +
      'En el living del departamento puedes disfrutar de un comodo sofa donde puedes ver la TV y disfrutar del sistema de sonido.</br>El living comedor cuenta con salamandra en caso de que necesites de un poco de calor . Así como airea-condicionado si hace mucho calor.<br/><br/>' +
      'Una cocina completa, con maquina de cafe y totalmente equipada para que puedas tener una estancia reconfortante.<br/><br/>' +
      'Cuenta con 2 habitaciones, una de ellas cuenta con armario, aire-acondicionado. El baño cuenta con ducha y bidet.<br/><br/>' +
      'Nos esforzamos al detalle, y le dimos terminaciones de calidad para que tu estadia sea lo mas confortable posible',
    images: {
      wide: [
        {
          src: "/images/cabana/wide/1-cabana.jpeg",
          alt: "Alojamiento Cabana - exterior - vista a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/2-cabana.jpeg",
          alt: "Alojamiento Cabana - exterior - vista a desde la parrilla",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/3-cabana.jpeg",
          alt: "Alojamiento Cabana - dormitorio - vista a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/4-cabana.jpeg",
          alt: "Alojamiento Cabana - living/comedor",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/5-cabana.jpeg",
          alt: "Alojamiento Cabana - living/comedor con salamandra",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/6-cabana.jpeg",
          alt: "Alojamiento Cabana - segundo dormitorio con vistas a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/7-cabana.jpeg",
          alt: "Alojamiento Cabana - terraza con vistas a las sierras",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cabana/wide/8-cabana.jpeg",
          alt: "Alojamiento Cabana - baño",
          width: 1024,
          height: 682,
        },
      ],
      square: [
        {
          src: "/images/cabana/square/1-cabana.jpeg",
          alt: "Alojamiento Cabana - exterior - vista a las sierras",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/2-cabana.jpeg",
          alt: "Alojamiento Cabana - exterior - vista a desde la parrilla",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/3-cabana.jpeg",
          alt: "Alojamiento Cabana - dormitorio - vista a las sierras",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/4-cabana.jpeg",
          alt: "Alojamiento Cabana - living/comedor",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/5-cabana.jpeg",
          alt: "Alojamiento Cabana - living/comedor con salamandra",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/6-cabana.jpeg",
          alt: "Alojamiento Cabana - segundo dormitorio con vistas a las sierras",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cabana/square/7-cabana.jpeg",
          alt: "Alojamiento Cabana - terraza con vistas a las sierras",
          width: 1024,
          height: 450,
        },
        {
          src: "/images/cabana/square/8-cabana.jpeg",
          alt: "Alojamiento Cabana - baño",
          width: 450,
          height: 450,
        },
      ],
    },
    mainFeature: "Terraza con mirador a las sierras",
    name: "cabana",
    displayName:`Departamento Cabana`,
    maxPeople: "6",
    rooms: "3",
    type: "APARTAMENT",
    priority: 10,
  } as IApartmentData,
  ["cala"]: {
    amenities: sharedAparmentAmenities,
    beds: "2",
    description:
    'Ubicado en la planta baja, con dos accesos. Uno desde la entrada principal junto al garage y otro desde el otro tendrás acceso direct al jardin, solarium y la pileta.<br/>' +
    'Este espacio nos encanta, puedes disfrutar un buen desayuno con vista a las sierras, asi como por las noches cocinar rico algo en la parrilla.<br/><br/>' +
    'En el living del departamento puedes disfrutar de un comodo sofa donde puedes ver la TV y disfrutar del sistema de sonido.</br>El living comedor cuenta con salamandra en caso de que necesites de un poco de calor . Así como airea-condicionado si hace mucho calor.<br/><br/>' +
    'Una cocina completa, con maquina de cafe y totalmente equipada para que puedas tener una estancia reconfortante.<br/><br/>' +
    'Cuenta con 2 habitaciones, una de ellas cuenta con armario, aire-acondicionado. El baño cuenta con ducha y bidet.<br/><br/>' +
    'Nos esforzamos al detalle, y le dimos terminaciones de calidad para que tu estadia sea lo mas confortable posible',
    images: {
      wide: [
        {
          src: "/images/cala/wide/cala-1.jpeg",
          alt: "Alojamiento Cala - comedor",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-2.jpeg",
          alt: "Alojamiento Cala - living",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-3.jpeg",
          alt: "Alojamiento Cala - vista",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-4.jpeg",
          alt: "Alojamiento Cala - dormitorio",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-5.jpeg",
          alt: "Alojamiento Cala - baño",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-6.jpeg",
          alt: "Alojamiento Cala - living/comendor de noche",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-7.jpeg",
          alt: "Alojamiento Cala - ambiente calido con salamandra",
          width: 1024,
          height: 682,
        },
        {
          src: "/images/cala/wide/cala-8.jpeg",
          alt: "Alojamiento Cala - segundo dormitorio",
          width: 1024,
          height: 682,
        },
      ],
      square: [
        {
          src: "/images/cala/square/cala-1.jpeg",
          alt: "Alojamiento Cala - comedor",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-2.jpeg",
          alt: "Alojamiento Cala - living",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-3.jpeg",
          alt: "Alojamiento Cala - vista",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-4.jpeg",
          alt: "Alojamiento Cala - dormitorio",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-5.jpeg",
          alt: "Alojamiento Cala - baño",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-6.jpeg",
          alt: "Alojamiento Cala - living/comendor de noche",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-7.jpeg",
          alt: "Alojamiento Cala - ambiente calido con salamandra",
          width: 450,
          height: 450,
        },
        {
          src: "/images/cala/square/cala-8.jpeg",
          alt: "Alojamiento Cala - segundo dormitorio",
          width: 450,
          height: 450,
        },
      ],
    },
    mainFeature: "Salida directa a pileta y jardin",
    name: "cala",
    displayName:`Departamento Cala`,
    maxPeople: "4",
    rooms: "2",
    type: "APARTAMENT",
    priority: 20,
  } as IApartmentData,
  ["calacabana"]: {
    type: "COMPOUND",
    mainFeature:
      "Tode el complejo ( 2 departamentos )",
    name: "calacabana",
    displayName: `Cala + Cabana `,
    beds: "6",
    maxPeople: "10",
    rooms: "5",
    amenities: sharedAparmentAmenities.filter(((group) => group.name !== AMENITIES_GROUP.PARKING_AND_FACILITIES)).concat(calacabana_paking_and_facilities),
    description:
      'Cuentas con todo el complejo<br/> ' + 
      '<a style="text-decoration: underline;" href="cala">Alojamiento Cala</a><br/><a style="text-decoration: underline;" href="cabana">Alojamiento Cabana</a><br/><br/>' +
      'El alojamiento CALABANA AR, situado en el Barrio Keokén, Tanti, provee la tranquilidad necesaria que da sentirse seguro, alejado de la ciudad, en contacto con la naturaleza pero cerca de todo.<br/><br/>' + 
      'El aire puro de las sierras en combinación de las facilidades del alojamiento hacen una composición perfecta para que puedas relajarte disfrutando de una espectacular vista a las sierras.<br/><br/>' +
      'Los apartamentos están diseñados al detalle, con terminaciones de calidad y equipados con todo lo que necesitas.',
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
            alt: "Alojamiento Cabana - exterior - vista a las sierras",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/cala/wide/cala-1.jpeg",
            alt: "Alojamiento Cala - comedor",
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
            alt: "Alojamiento Cala - baño",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/cabana/wide/4-cabana.jpeg",
            alt: "Alojamiento Cabana - living/comedor",
            width: 1024,
            height: 682,
          },
          {
            src: "/images/cabana/wide/3-cabana.jpeg",
            alt: "Alojamiento Cabana - dormitorio - vista a las sierras",
            width: 1024,
            height: 682,
          },
        ],
        square: [
          {
            src: "/images/cabana/square/2-cabana.jpeg",
            alt: "Servicio de hospedaje Calacabana - Alojamiento Cabana - terraza",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cala/square/cala-3.jpeg",
            alt: "Alojamiento Cala - vista",
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
            alt: "Alojamiento Cabana - exterior - vista a las sierras",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cala/square/cala-1.jpeg",
            alt: "Alojamiento Cala - comedor",
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
            alt: "Alojamiento Cabana - living/comedor",
            width: 450,
            height: 450,
          },
          {
            src: "/images/cabana/square/3-cabana.jpeg",
            alt: "Alojamiento Cabana - dormitorio - vista a las sierras",
            width: 450,
            height: 450,
          },
        ],
          
    },
    priority: 0,
  } as IApartmentData,
};

export const stubApartmentData = (apartmentName: MOCKED_APARTMENTS_NAMES) => {
  return APARMENTS_DATA[apartmentName]
}

export const stubApartmentSlugs = () => {
  return Object.keys(APARMENTS_DATA) as Array<MOCKED_APARTMENTS_NAMES>
}

export type MOCKED_APARTMENTS_NAMES = keyof typeof APARMENTS_DATA
