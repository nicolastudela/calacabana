

import { VStack, Box, StackProps } from "@chakra-ui/react";
import Image from "next/image";
import { IImage } from "@/shared/types";

export type VerticalGalleryProps = StackProps & {
  images: IImage[];
};

export const VerticalGallery = ({ images }: VerticalGalleryProps) => {

  return (
     <VStack w={'100%'} h={'100%'}>
      {images &&
        images.map(({ alt, src, width, height} , index) => {
           return(
           <Box key={index} position="relative" width={{base: 500, lg: 800}}>
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
