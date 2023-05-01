import NextLink from "next/link";
import { Box, BoxProps, Flex } from "@chakra-ui/react";

import Carousel from "./ImageCarousel";
import ApartmentTitle from "./ApartmentTitle";
import Image from "next/image";
import useGlobalContext from "@/shared/hooks/useGlobalContext";
import { IApartment, IImage } from "@/shared/types";

export interface AparmentCardProps
  extends Pick<
    IApartment,
    "name" | "displayName" | "mainFeature" | "rooms" | "beds" | "maxPeople" | "type"
  > {
  images: IImage[];
}

export const AparmentCard = ({
  images,
  name,
  displayName,
  mainFeature,
  rooms,
  beds,
  maxPeople,
  type,
  ...rest
}: AparmentCardProps & BoxProps) => {
  const { isMobile } = useGlobalContext();
  return (
      <Box
        href={`/alojamiento/${name}`} 
        as={NextLink}
        w={{ base: "100%", md: type !== "COMPOUND" ? "50%" : "auto" }}
        maxWidth={type !== "COMPOUND" ? "550px" : "1000px"}
        pb={4}
        {...rest}
        borderTop="0"
        borderLeft="0"
        borderBottom="2px solid"
        borderRight="2px solid"
        borderColor="brand.500"
        shadow={"brand"}
        rounded={"md"}
        display="flex"
        flexDirection={"column"}
        margin={!isMobile && type === "COMPOUND" ? "auto" : "inherit"}
      >
        {(!isMobile && type === "COMPOUND") ? (
          <Flex direction="row" gap="5">
            <Image src={images[0].src} alt={images[0].alt} width={images[0].width} height={images[0].height}  />  
            <Image src={images[1].src} alt={images[1].alt} width={images[1].width} height={images[1].height}  />
          </Flex>
        ) : (<Carousel aptName={name} images={images} />)}

        <ApartmentTitle
          displayName={displayName}
          mainFeature={mainFeature}
          rooms={rooms}
          beds={beds}
          maxPeople={maxPeople}
          p={1}
        />
      </Box>
  );
};
