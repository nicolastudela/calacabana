import { IApartmentImage } from "@/types/shared";
import { Flex, Box, Text, Heading, FlexProps } from "@chakra-ui/react";
import Image from "next/image";


export interface IListingCardProps {
  name: string,
  image: IApartmentImage,
  apartmentType: string,
  mainFeature: string,
}

const ListingCard = ({ image, apartmentType, name, mainFeature, ...rest } : IListingCardProps & FlexProps) => (
  <Flex gap={3} {...rest}>
    <Box width={{"base": 150, "md": 150}} height={{"base": 100, "md": 100 }} position="relative">
      <Image src={image.src} alt={image.alt} height={image.height} width={image.width} layout="fill" />
    </Box> 
    <Flex direction={"column"} justifyContent={"space-between"}>
      <Box>
        <Heading as='h6' size='xs' color={"gray.500"}>{apartmentType}</Heading>
        <Heading as='h3' size='md'>{name}</Heading>
      </Box>
      <Box>
        <Text fontSize='xs'>{mainFeature}</Text>
      </Box>
    </Flex>
  </Flex>
);

export default ListingCard;