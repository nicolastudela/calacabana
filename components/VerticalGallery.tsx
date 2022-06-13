

import { VStack, Box, StackProps } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

type VerticalGallery = StackProps & {
  images: {img: StaticImageData; alt: string}[]
};

const VerticalGallery = ({ images }: VerticalGallery) => {
  return (
     <VStack w={'100%'} h={'100%'}>
      {images &&
        images.map(({img, alt} , index) => {
           return(
           <Box key={index} position="relative" width={800}>
             <Image
              src={img}
              alt={alt}
              placeholder="blur"
              />
           </Box>)
         })}
    </VStack>
  );
};

export default VerticalGallery;
