import {
  Button,
  Grid,
  GridItem,
  GridProps,
} from "@chakra-ui/react";

import Image from "next/image";
import { IApartmentImage } from "../types/shared";

type HeroGridProps = GridProps & {
  onShowAllPicks: () => void;
  images: IApartmentImage[];
};

const HeroGrid = ({ images, onShowAllPicks }: HeroGridProps) => {
  return (
    <Grid
      height={"450px"}
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      rowGap={2}
      columnGap={3}
      px={0.5}
      position="relative"
    >
      {images &&
        images.slice(0, 5).map(({ alt, src, height, width }, index) => {
          return index == 0 ? (
            <GridItem
              position="relative"
              display="grid"
              rowSpan={2}
              colSpan={2}
              maxW={"1000px"}
              key={alt}
            >
              <Image src={src}  layout="fill" alt={alt} width={width} height={height} />
            </GridItem>
          ) : (
            <GridItem position="relative" display="grid" maxW={"1000px"} key={alt}>
              <Image src={src} layout="fill" alt={alt} width={width} height={height} />
            </GridItem>
          );
        })}
      <Button
        onClick={onShowAllPicks}
        position={"absolute"}
        size="sm"
        variant="solid"
        colorScheme="brand"
        right={10}
        bottom={5}
      >
        Ver todas las fotos
      </Button>
    </Grid>
  );
};

export default HeroGrid;
