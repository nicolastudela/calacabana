import {
  AspectRatio,
  Box,
  Container,
  Heading,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import AparmentCard from "@/components/apartment/AparmentCard";
import Carousel from "@/components/Carousel";

import aparmentsData from "../shared/apartmentsData";
import { APARMENTS_NAME } from "@/types/shared";
import HeroGrid from "@/components/HeroGrid";
import { useCallback, useReducer } from "react";
import { IDrawerActionTypes } from "@/types/types";
import dynamic from "next/dynamic";

import PageDrawer from "@/components/PageDrawer";

const VerticalGrid = dynamic(() => import("../components/VerticalGallery"));

const images = [
  {
    src: "/images/homepage/1-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - vista noche pileta",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/2-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - vista solarium pileta",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/3-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - vista desde cascada pileta",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/4-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - cochera bajo techo de noche",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/9-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - camino de noche",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/6-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - vista hacia los apartamntos con jardin",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/7-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - cochera vista a la entrada de dia",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/8-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - jardin",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/9-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - camino de noche",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/5-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - pileta de noche efectos",
    width: 1280,
    height: 853,
  },
  {
    src: "/images/homepage/10-homepage.jpeg",
    alt: "Servicio de hospedaje Calacabana - madera",
    width: 1280,
    height: 853,
  },
];

const Home: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // use reducer to get dispachers to be used on CTAs, where some CTAs will update whats shown on the drawer
  const reducer = useCallback(
    (state: any, action: { type: any; payload?: any }) => {
      switch (action.type) {
        case IDrawerActionTypes.SHOW_ALL_PICS: {
          if (!state) {
            return {
              title: "Todas las fotos",
              component: <VerticalGrid images={images} />,
            };
          }
          return null;
        }
        case "hide":
          return null;
        default:
          return null;
      }
    },
    []
  );
  const [componentToShow, dispatch] = useReducer(reducer, null);

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
          <a
            onClick={() => {
              dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
            }}
          >
            <Carousel images={images} />
          </a>
        ) : (
          <HeroGrid
            onShowAllPicks={() => {
              // onOpen();
              // openDrawerAndDispatch({ type: "showAllPics" });
              dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
            }}
            images={images}
          />
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
          gap={4}
          my="4"
        >
          <AparmentCard
            {...aparmentsData[APARMENTS_NAME.CABANA]}
            images={images}
          />
          <AparmentCard
            {...aparmentsData[APARMENTS_NAME.CALA]}
            images={images}
            marginInlineStart={"0px !important"}
          />
        </HStack>

        <Container w={{ base: "100%", md: "container.xl" }} mt={1} px="0">
          <AspectRatio ratio={16 / 9}>
            {/* //TODO (#23) UNCOMENT THIS, IT'S JUST TO NOT TO CALL MAPS ON TESTING*/}
            {/* <iframe
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCTg9tYXSO3iRg3_f-qVqpQhsDtRiOyR_Y&q=Cala+Cabana,Tanti,Cordoba"
              ></iframe> */}
            <Box w="100%" bgColor="lightBlue" />
          </AspectRatio>
        </Container>
        <PageDrawer
          componentToShow={componentToShow}
          onHide={() => dispatch({ type: "hide" })}
        />
      </Layout>
    </>
  );
};

export default Home;
