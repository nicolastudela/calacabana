import NextLink from "next/link";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { APARMENTS_TYPE, IApartmentData, IApartmentImage } from "@/types/shared";

import Carousel from "@/components/Carousel";
import ApartmentTitle from "@/components/apartment/ApartmentTitle";
import Image from "next/image";
import useGlobalContext from "@/shared/hooks/useGlobalContext";

export interface AparmentCardProps
  extends Pick<
    IApartmentData,
    "name" | "displayName" | "mainFeature" | "rooms" | "beds" | "maxPeople" | "type"
  > {
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
  type,
  ...rest
}: AparmentCardProps & BoxProps) => {
  const { isMobile } = useGlobalContext();
  return (
      <Box
        href={`/alojamiento/${name}`} 
        as={NextLink}
        w={{ base: "100%", md: type !== APARMENTS_TYPE.COMPOUND ? "50%" : "auto" }}
        maxWidth={type !== APARMENTS_TYPE.COMPOUND ? "550px" : "1000px"}
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
        margin={!isMobile && type === APARMENTS_TYPE.COMPOUND ? "auto" : "inherit"}
      >
        {(!isMobile && type === APARMENTS_TYPE.COMPOUND) ? (
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

export default AparmentCard;
