import {
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { IApartmentData, IApartmentImage } from "../../types/shared";

import Carousel from "../Carousel"
import ApartmentTitle from "./ApartmentTitle";

export interface AparmentCardProps extends Pick<IApartmentData, "name" | "mainFeature" | "rooms" | "beds" | "maxPeople">{
  images: IApartmentImage[];
}

const AparmentCard = ({
  images,
  name,
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
      p={1}
      pb={4}
      {...rest}
    >
      <Carousel aptName={name} images={images}/>
      <ApartmentTitle name={name} mainFeature={mainFeature} rooms={rooms} beds={beds} maxPeople={maxPeople} />
    </Box>
  );
};

export default AparmentCard;
