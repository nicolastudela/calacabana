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
    name: "Cabana",
    beds: "4",
    mainFeature: "Terraza con mirador a las sierras",
    maxPeople: "6",
    rooms: "3",
    amenities: sharedAparmentAmenities,
  } as IApartmentData,
  [APARMENTS_NAME.CALA]: {
    name: "Cala",
    beds: "2",
    mainFeature: "Salida directa a pileta y jardin",
    maxPeople: "4",
    rooms: "2",
    amenities: sharedAparmentAmenities,
  } as IApartmentData,
}


export default APARMENTS;