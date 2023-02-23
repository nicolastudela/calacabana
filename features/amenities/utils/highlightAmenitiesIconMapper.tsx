import { AMENITY } from "../../../types/shared";
import {
  FaMountain,
  FaRegSnowflake, FaSwimmingPool,
} from "react-icons/fa";
import {
  GiFireplace,
  GiRiceCooker,
  GiCampfire,
} from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdWifi, MdOutlineMonitor, MdPets } from "react-icons/md";
import { RiBuilding3Fill } from "react-icons/ri";



const amenityIconMapper = (amenity: AMENITY) => {
  switch (amenity) {
    case AMENITY.AIR_CONDITIONING:
      return FaRegSnowflake;
      case AMENITY.SIERRAS_VIEW:
        return FaMountain;
      case AMENITY.SHARED_POOL:
        return FaSwimmingPool;
      case AMENITY.POOL:
        return FaSwimmingPool;  
      case AMENITY.WIFI:
          return MdWifi;
      case AMENITY.BBQ_GRILL:
          return GiCampfire;
      case AMENITY.KITCHEN:
        return GiRiceCooker;
      case AMENITY.WASHER:
        return CgSmartHomeWashMachine;
      case AMENITY.TV:
        return MdOutlineMonitor;
      case AMENITY.HEATING:
        return GiFireplace;
      case AMENITY.PET_FRIENDLY:
        return MdPets;
      case AMENITY.ALL_PROPERTY:
        return RiBuilding3Fill;             
    default:
      return null;
  }
};

export default amenityIconMapper;
