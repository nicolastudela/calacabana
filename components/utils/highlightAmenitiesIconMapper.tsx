import { AMENITY } from "../../types/shared";
import {
  FaMountain,
  FaRegSnowflake, FaSwimmingPool,
} from "react-icons/fa";
import {
  GiGasStove,
} from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdWifi, MdOutdoorGrill } from "react-icons/md";

const amenityIconMapper = (amenity: AMENITY) => {
  switch (amenity) {
    case AMENITY.AIR_CONDITIONING:
      return FaRegSnowflake;
      case AMENITY.SIERRAS_VIEW:
        return FaMountain;
      case AMENITY.SHARED_POOL:
        return FaSwimmingPool;
      case AMENITY.WIFI:
          return MdWifi;
      case AMENITY.BBQ_GRILL:
      return MdOutdoorGrill;
      case AMENITY.KITCHEN:
        return GiGasStove;
        case AMENITY.WASHER:
          return CgSmartHomeWashMachine;    
    default:
      return null;
  }
};

export default amenityIconMapper;
