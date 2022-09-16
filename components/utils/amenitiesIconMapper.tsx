import { AMENITY } from "../../types/shared";
import {
  FaRegSnowflake,
  FaUtensils,
  FaBed,
  FaPumpSoap,
  FaShower,
  FaSwimmingPool,
  FaMountain,
} from "react-icons/fa";
import {
  GiFlowerPot,
  GiForkKnifeSpoon,
  GiToothbrush,
  GiPillow,
  GiWaterDrop,
  GiChickenOven,
  GiRiceCooker,
  GiRockingChair,
  GiFireplace,
  GiCampfire
} from "react-icons/gi";
import {
  MdOutlineCoffeeMaker,
  MdPets,
  MdOutlineAir,
  MdOutlineLocalLaundryService,
  MdLocalParking,
  MdOutlineBeachAccess,
  MdOutlineDeck,
  MdOutlineIron,
  MdOutlineMonitor,
  MdWifi,
} from "react-icons/md";
import { BiBath, BiSpeaker } from "react-icons/bi";
import {
  CgSmartHomeBoiler,
  CgSmartHomeRefrigerator,
  CgSmartHomeWashMachine,
} from "react-icons/cg";
import { BsDoorOpen, BsShieldShaded } from "react-icons/bs";


import { RiBuilding3Fill } from "react-icons/ri";




//FIXME: This is increasing bundle with in 100k? NEED to be fixed, it can return files paths (paths icons files)
const amenityIconMapper = (amenity: AMENITY) => {
  switch (amenity) {
    case AMENITY.AIR_CONDITIONING:
      return FaRegSnowflake;
    case AMENITY.BACKYARD:
      return GiFlowerPot;
    case AMENITY.BBQ_GRILL:
      return GiCampfire;
    case AMENITY.BED_LINENS:
      return FaBed;
    case AMENITY.BIDET:
      return BiBath;
    case AMENITY.BLUETOOH_SPEAKER:
      return BiSpeaker;
    case AMENITY.COFFEE_MAKER:
      return MdOutlineCoffeeMaker;
    case AMENITY.COOKING_BASICS:
      return FaUtensils;
    case AMENITY.DISHES_AND_SILVERWARE:
      return GiForkKnifeSpoon;
    case AMENITY.DRYER:
      return MdOutlineLocalLaundryService;
    case AMENITY.ESSENTIALS:
      return GiToothbrush;
    case AMENITY.EXTRA_PILLOWS_AND_BLANKETS:
      return GiPillow;
    case AMENITY.HAIR_DRYER:
      return MdOutlineAir;
    case AMENITY.HEATING:
      return GiFireplace;
    case AMENITY.HOT_WATER:
      return GiWaterDrop;
    case AMENITY.HOT_WATER_KETTLE:
      return CgSmartHomeBoiler;
    case AMENITY.IRON:
      return MdOutlineIron;
    case AMENITY.KITCHEN:
      return GiRiceCooker;
    case AMENITY.OUTDOOR_DINING_AREA:
      return MdOutlineDeck;
    case AMENITY.OUTDOOR_FURNITURE:
      return GiRockingChair;
    case AMENITY.OVEN:
      return GiChickenOven;
    case AMENITY.PARKING:
      return MdLocalParking;
    case AMENITY.PRIVATE_ENTRANCE:
      return BsDoorOpen;
    case AMENITY.REFRIGATOR:
      return CgSmartHomeRefrigerator;
    case AMENITY.RESORT_ACCESS:
      return MdOutlineBeachAccess;
    case AMENITY.ROOM_DARKENING_SHADES:
      return BsShieldShaded;
    case AMENITY.SHAMPOO:
      return FaPumpSoap;
    case AMENITY.SHARED_POOL:
      return FaSwimmingPool;
    case AMENITY.POOL:
      return FaSwimmingPool;    
    case AMENITY.SHOWER:
      return FaShower;
    case AMENITY.SIERRAS_VIEW:
      return FaMountain;
    case AMENITY.TV:
      return MdOutlineMonitor;
    case AMENITY.WASHER:
      return CgSmartHomeWashMachine;
    case AMENITY.WIFI:
      return MdWifi;
    case AMENITY.PET_FRIENDLY:
      return MdPets;
    case AMENITY.ALL_PROPERTY:
      return RiBuilding3Fill;                
    default:
      return null;
  }
};

export default amenityIconMapper;
