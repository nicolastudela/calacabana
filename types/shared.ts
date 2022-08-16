export enum APARMENTS_NAME {
  CALA = "cala",
  CABANA = "cabana",
  CALACABANA = "calacabana",
}

export enum APARMENTS_TYPE {
  APARTAMENT = "Apartamento",
  COMPOUND = "Complejo",
}

export interface IApartmentImage {
  alt: string;
  height: number;
  src: string;
  width: number;
}
export interface IApartmentData {
  amenities: IAparmentAmenitiesGroup[];
  beds: string;
  description: string;
  images: {
    wide: IApartmentImage[],
    square: IApartmentImage[],
  }
  mainFeature: string;
  maxPeople: string;
  name: string;
  displayName: string;
  rooms: string;
  type: APARMENTS_TYPE.APARTAMENT;
}

export enum AMENITIES_GROUP {
  BATHROOM = "Baño",
  BEEDROOM_LOUNDRY = "Dormitorio y lavadero",
  ENTERTAINMENT = "Entretenimiento",
  HEATING_COOLING = "Calefaccion y refrigeracion",
  INTERNET = "Internet y oficina",
  KITCHEN_DINING = "Cocina y comedor",
  OPEN_AIR = "Al aire libre",
  GARAGE_AND_OTHER = "Estacionamiento e instalaciones",
  SCENIC_VIEWS = "Vistas panoramicas",
  HOME_SAFETY = "Seguridad en el hogar",
  LOCATION_FEATURES = "Características de la ubicación",
  OUTDOOR = "Exterior",
  PARKING_AND_FACILITIES = "Estacionamiento e instalaciones",
  SERVICES = "Servicios",
}

export enum AMENITY {
  AIR_CONDITIONING = "Aire acondicionado",
  BACKYARD = "Jardin con plantas",
  BBQ_GRILL = "Parrilla",
  BIDET = "Bidet",
  BED_LINENS = "Ropa de cama",
  BLUETOOH_SPEAKER = "Parlante bluotooth",
  COFFEE_MAKER = "Cafetera",
  COOKING_BASICS = "Utensilios básicos para cocinar",
  DISHES_AND_SILVERWARE = "Platos y cubiertos",
  DRYER = "Secarropas",
  EXTRA_PILLOWS_AND_BLANKETS = "Almohadas y mantas adicionales",
  ESSENTIALS = "Servicios basicos",
  HAIR_DRYER = "Secador de pelo",
  HEATING = "Calefaccion",
  HOT_WATER_KETTLE = "Hervidor electrico",
  HOT_WATER = "Agua caliente",
  IRON = "Plancha",
  KITCHEN = "Cocina",
  OUTDOOR_FURNITURE = "Mobiliario exterior",
  OUTDOOR_DINING_AREA = "Zona de comida al aire libre",
  OVEN = "Horno",
  PARKING = "Estacionamiento techado",
  PRIVATE_ENTRANCE = "Entrada independiente",
  PRIVATE_PATIO_OR_BALCONY = "Patio o balcón Privado",
  ROOM_DARKENING_SHADES = "Persianas o cortinas opacas",
  RESORT_ACCESS = "Acceso al complejo turístico",
  REFRIGATOR = "Heladera",
  SHARED_POOL = "Piscina compartida",
  SIERRAS_VIEW = "Vistas a las sierras",
  SHOWER = "Ducha",
  SHAMPOO = "Shampoo",
  TV = "Televisor",
  WASHER = "Lavarropas",
  WIFI = "WIFI",
}

export interface IAparmentAmenity {
  name: AMENITY;
  description?: string;
  highlighted?: boolean;
  priority?: number;
}


export interface IAparmentAmenitiesGroup {
  name: AMENITIES_GROUP;
  amenities: IAparmentAmenity[];
  priority?: number;
}

/**
 * This type represents a period that is ready and valid to be bookeable.
 * Meaning that a period is sematically valid, startDate is after FIRST_BOOKING_DAY. And period not intersect in other booking periods.
 */
 export type BookeableValidPeriod = {
  startDate: Date,
  endDate: Date,
}

/**
 * This type represents a period that is ready sematically valid
 */
export type BookingPeriod = [Date, Date]


export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
};

export type UserInquiry = UserData & {
  body: string;
};

export type UserInquiryRequest = {
  apartment: APARMENTS_NAME;
  period: BookeableValidPeriod;
  userContact: UserInquiry;
}
