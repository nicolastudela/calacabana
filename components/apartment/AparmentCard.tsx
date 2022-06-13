import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { IApartmentData } from "../../types/shared";

import Carousel from "../Carousel"
import ApartmentTitle from "./ApartmentTitle";


export interface AparmentCardProps extends IApartmentData {
  images: { img: StaticImageData; alt: string }[];
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
