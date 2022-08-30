import { Divider, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import AparmentCard, {
  AparmentCardProps,
} from "@/components/apartment/AparmentCard";
import Carousel from "@/components/Carousel";
import Map from "@/components/Map";

import aparmentsData from "../shared/apartmentsData";
import HeroGrid from "@/components/HeroGrid";
import { useCallback, useReducer } from "react";
import { IDrawerActionTypes } from "@/types/types";
import dynamic from "next/dynamic";

import PageDrawer from "@/components/PageDrawer";

const VerticalGrid = dynamic(() => import("../components/VerticalGallery"));

const images = {
  square: [
    {
      src: "/images/homepage/square/1-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista noche pileta",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/2-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista solarium pileta",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/3-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista desde cascada pileta",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/square/4-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - cochera bajo techo de noche",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/9-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - camino de noche",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/6-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista hacia los apartamntos con jardin",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/7-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - cochera vista a la entrada de dia",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/8-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - jardin",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/9-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - camino de noche",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/5-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - pileta de noche efectos",
      width: 450,
      height: 450,
    },
    {
      src: "/images/homepage/square/10-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - madera",
      width: 450,
      height: 450,
    },
  ],
  wide: [
    {
      src: "/images/homepage/wide/1-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista noche pileta",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/2-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista solarium pileta",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/3-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista desde cascada pileta",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/4-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - cochera bajo techo de noche",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/9-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - camino de noche",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/6-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - vista hacia los apartamntos con jardin",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/7-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - cochera vista a la entrada de dia",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/8-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - jardin",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/9-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - camino de noche",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/5-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - pileta de noche efectos",
      width: 1280,
      height: 853,
    },
    {
      src: "/images/homepage/wide/10-homepage.jpeg",
      alt: "Servicio de hospedaje Calacabana - madera",
      width: 1280,
      height: 853,
    },
  ],
};

const Page = ({ apartments }: IHomePageProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // use reducer to get dispachers to be used on CTAs, where some CTAs will update whats shown on the drawer
  const reducer = useCallback(
    (state: any, action: { type: any; payload?: any }) => {
      switch (action.type) {
        case IDrawerActionTypes.SHOW_ALL_PICS: {
          if (!state) {
            return {
              title: "Todas las fotos",
              component: <VerticalGrid images={images.wide} />,
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
        <title>Cala Cabana - Servicio de alojamiento y alquileres vacacionales</title>
        <meta
          name="description"
          content="Servicio de alojamiento combinando naturaleza, confort y calidez. Mirador de las sierras, en las sierras"
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
            <Carousel images={images.square} />
          </a>
        ) : (
          <HeroGrid
            onShowAllPicks={() => {
              // onOpen();
              // openDrawerAndDispatch({ type: "showAllPics" });
              dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
            }}
            images={images.wide}
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
            un mirador de las sierras, en las sierras
          </Heading>
        )}
        <Flex
          width="100%"
          flexWrap={"wrap"}
          justifyContent={{ base: "space-around", md: "space-between" }}
          p="0"
          gap={4}
          my="4"
        >
          {apartments.map((apartment) => (
            <AparmentCard key={apartment.name} {...apartment} />
          ))}
        </Flex>
        <Divider my={8} mb={4} />
        <Map />
        <PageDrawer
          componentToShow={componentToShow}
          onHide={() => dispatch({ type: "hide" })}
        />
      </Layout>
    </>
  );
};

const Home = (props: IHomePageProps) => {
  return (
    <>
      <Head>
        <title>Cala Cabana: Servicio de alojamiento y alquileres vacacionales en Tanti, Cordoba</title>
        <meta
          name="description"
          content="Cala Cabana: Servicio de alojamiento y alquileres vacacionales en Tanti, Cordoba - Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page {...props} />
    </>
  );
};

export type IHomePageProps = { apartments: AparmentCardProps[] };

// NextJS API Middleware is not available here
const getStaticProps: GetStaticProps<IHomePageProps> = async ({}) => {
  const apartments = Object.values(aparmentsData).map(
    ({
      name,
      displayName,
      mainFeature,
      rooms,
      beds,
      maxPeople,
      images,
      type,
      ...rest
    }) =>
      ({
        name,
        displayName,
        mainFeature,
        rooms,
        beds,
        maxPeople,
        images: images.square,
        type,
      } as AparmentCardProps)
  );

  let props: IHomePageProps | null = null;
  props = { apartments: apartments };

  return {
    props: { apartments: apartments },
    notFound: false,
    // if you want revalidate data of an apartment manually.
    //https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
  };
};

export { getStaticProps };

export default Home;
