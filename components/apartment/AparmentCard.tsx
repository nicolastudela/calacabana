import {
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { IApartmentData, IApartmentImage } from "../../types/shared";

import Carousel from "../Carousel"
import ApartmentTitle from "./ApartmentTitle";

export interface AparmentCardProps extends Pick<IApartmentData, "name" | "displayName" | "mainFeature" | "rooms" | "beds" | "maxPeople">{
  images: IApartmentImage[];
}

const AparmentCard = ({
  images,
  name,
  displayName,
  mainFeature,
  rooms,
  beds,
  maxPeople,
  ...rest
}: AparmentCardProps & BoxProps) => {

  return (
    <Box
      as="a"
      href={`/${name.toLocaleLowerCase()}`}
      w={{ base: "100%", md: "50%" }}
      maxWidth={"550px"}
      pb={4}
      {...rest}
      borderTop="0"
      borderLeft="0"
      borderBottom="2px solid"
      borderRight="2px solid"
      borderColor="brand.500"
      shadow={"brand"}
      rounded={"md"}
    >
      <Carousel aptName={name} images={images}/>
      <ApartmentTitle displayName={displayName} mainFeature={mainFeature} rooms={rooms} beds={beds} maxPeople={maxPeople} p={1} />
    </Box>
  );
};

export default AparmentCard;
