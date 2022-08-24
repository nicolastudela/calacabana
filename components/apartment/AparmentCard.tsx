import NextLink from "next/link";
import { Box, BoxProps, Flex, useBreakpointValue } from "@chakra-ui/react";
import { APARMENTS_TYPE, IApartmentData, IApartmentImage } from "@/types/shared";

import Carousel from "@/components/Carousel";
import ApartmentTitle from "@/components/apartment/ApartmentTitle";
import Image from "next/image";

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
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <NextLink href={`/apartamento/${name}`} passHref>
      <Box
        as="a"
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
            <Image src={images[0].src} alt={images[0].alt} width={images[0].width} height={images[0].height} layout="fixed" />  
            <Image src={images[1].src} alt={images[1].alt} width={images[1].width} height={images[1].height} layout="fixed" />
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
    </NextLink>
  );
};

export default AparmentCard;
