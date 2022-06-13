import {
  Button,
  Grid,
  GridItem,
  GridProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Children } from "react";

import Image, { StaticImageData } from "next/image";

type ApartmentHeroProps = GridProps & {
  onShowAllPicks: () => void;
  images: { img: StaticImageData; alt: string }[];
};

const ApartmentHeroGrid = ({ images, onShowAllPicks }: ApartmentHeroProps) => {
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
        images.slice(0, 5).map(({ img, alt }, index) => {
          return index == 0 ? (
            <GridItem
              position="relative"
              display="grid"
              rowSpan={2}
              colSpan={2}
              maxW={"1000px"}
            >
              <Image src={img} placeholder="blur" layout="fill" alt={alt} />
            </GridItem>
          ) : (
            <GridItem position="relative" display="grid" maxW={"1000px"}>
              <Image src={img} placeholder="blur" layout="fill" alt={alt} />
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

export default ApartmentHeroGrid;
