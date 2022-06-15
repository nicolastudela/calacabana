import {
  AspectRatio,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import AparmentCard from "../components/apartment/AparmentCard";
import Carousel from "../components/Carousel";

import aparmentsData from "../shared/apartmentsData";
import { APARMENTS_NAME } from "../types/shared";

const images = [
  {
    src: "/images/noche-vista-deck-4-[1_1].jpeg",
    alt: "TODO",
    width: 450,
    height: 450,
  },
  {
    src: "/images/noche-vista-deck-4.jpeg",
    alt: "TODO",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/dia-cala-6-principal.jpeg",
    alt: "TODO",
    width: 1024,
    height: 682,
  },
  {
    src: "/images/noche-cabana-afuera-4-principal.jpeg",
    alt: "TODO",
    width: 1024,
    height: 682,
  }];


const Home: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Head>
        <title>Cala Cabana</title>
        <meta
          name="description"
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {isMobile ? (
            <Carousel images={images} />
        ) : (
          <Grid
            height={"450px"}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(6, 1fr)"
            rowGap={2}
            columnGap={3}
            px={0.5}
          >
            <GridItem
              position="relative"
              display="grid"
              rowSpan={2}
              colSpan={4}
              bg="tomato"
              maxW={"1000px"}
            >
              <Image src={images[0].src} width={images[1].width} height={images[1].height} alt={images[1].alt} layout="fill" />
            </GridItem>
            <GridItem
              position="relative"
              display="grid"
              colSpan={1}
              bg="papayawhip"
              maxW={"1000px"}
            >
              <Image src={images[0].src} width={images[0].width} height={images[0].height} alt={images[0].alt} layout="fill" />
            </GridItem>
            <GridItem
              position="relative"
              display="grid"
              colSpan={1}
              bg="papayawhip"
              maxW={"1000px"}
            >
              <Image src={images[0].src} width={images[0].width} height={images[0].height} alt={images[0].alt} layout="fill" />
            </GridItem>
            <GridItem
              position="relative"
              display="grid"
              colSpan={2}
              bg="papayawhip"
              maxW={"1000px"}
            >
              <Image src={images[2].src} width={images[2].width} height={images[2].height} alt={images[2].alt} layout="fill" />
            </GridItem>
          </Grid>
        )}
        {isMobile && (
          <Heading
            as="h2"
            size="xl"
            fontFamily={"'MonteCarlo', cursive"}
            py={2}
            textAlign="center"
          >
            Un mirador en las sierras, en las sierras
          </Heading>
        )}
        <HStack
          width="100%"
          flexWrap={"wrap"}
          justifyContent={{ base: "space-around", md: "space-between" }}
          p="0"
        >
         <AparmentCard {...aparmentsData[APARMENTS_NAME.CABANA]} images={images} />
         <AparmentCard {...aparmentsData[APARMENTS_NAME.CALA]} images={images} marginInlineStart={'0px !important'}/>
        </HStack>

        <Container w={{ base: "100%", md: "container.xl" }} mt={1} px="0">
          <AspectRatio ratio={16 / 9}>
            {/* <iframe
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAX9vJdjZqkxsS1p9VO1NUPAHv40MQu28U&q=Cala+Cabana,Tanti,Cordoba"
              ></iframe> */}
            <Box w="100%" bgColor="lightBlue" />
          </AspectRatio>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
