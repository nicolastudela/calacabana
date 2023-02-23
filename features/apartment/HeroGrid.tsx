import { Box, Button, Grid, GridItem, GridProps, Heading } from "@chakra-ui/react";

import Image from "next/image";
import { IApartmentImage } from "@/types/shared";

type HeroGridProps = GridProps & {
  onShowAllPicks: () => void;
  images: IApartmentImage[];
  title?: string
  subtitle?: string
};

const HeroGrid = ({ images, onShowAllPicks, title, subtitle }: HeroGridProps) => {
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
        images.slice(0, 5).map(({ alt, src, width, height }, index) => {
          return index == 0 ? (
            <GridItem
              position="relative"
              display="grid"
              rowSpan={2}
              colSpan={2}
              maxW={"1000px"}
              key={alt}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              {(title || subtitle) && (
              <Box position={"absolute"} >
                {title && <Heading
                  as="h2"
                  size="xl"
                  fontFamily={"'MonteCarlo', cursive"}
                  letterSpacing="wide"
                  py={1}
                  textAlign="center"
                >
                  {title}
                </Heading>}
                {subtitle &&<Heading
                  as="h2"
                  size="md"
                  // fontFamily={"'MonteCarlo', cursive"}
                  // pb={1}
                  textAlign="center"
                >
                  {subtitle}
                </Heading>}
              </Box>)}
            </GridItem>
          ) : (
            <GridItem
              position="relative"
              display="grid"
              maxW={"1000px"}
              key={alt}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
