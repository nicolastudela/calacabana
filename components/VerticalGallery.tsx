

import { VStack, Box, StackProps } from "@chakra-ui/react";
import Image from "next/image";
import { IApartmentImage } from "@/types/shared";

type VerticalGallery = StackProps & {
  images: IApartmentImage[];
};

const VerticalGallery = ({ images }: VerticalGallery) => {
  return (
     <VStack w={'100%'} h={'100%'}>
      {images &&
        images.map(({ alt, src, width, height} , index) => {
           return(
           <Box key={index} position="relative" width={800}>
             <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
              />
           </Box>)
         })}
    </VStack>
  );
};

export default VerticalGallery;
