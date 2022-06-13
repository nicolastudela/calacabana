export enum APARMENTS_NAME {
  CALA,
  CABANA,
}

export interface IApartmentData {
  name: string;
  maxPeople: string;
  rooms: string;
  beds: string;
  mainFeature: string;
  amenities: IAparmentAmenitiesGroup[];
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
