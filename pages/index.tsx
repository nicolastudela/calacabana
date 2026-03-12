import type { GetStaticProps } from "next";
import Head from "next/head";

import { Box, Divider, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { PageDrawer } from "@/components";
import { ApartmentCard,
  ApartmentCardProps, ImageCarousel as Carousel,
} from "@/features/apartment";

import { Suspense, useCallback, useReducer } from "react";
import { IDrawerActionTypes } from "@/components/types";
import dynamic from "next/dynamic";


import { IImage, IReview } from "@/types/types";
import usePageScroll from "@/shared/hooks/usePageScroll";
import LoadingMapContainer from "@/features/location/LoadingMapContainer";
import useGlobalContext from "@/shared/hooks/useGlobalContext";
import fetchApartments from "@/server/services/fetchApartments";
import fetchOutStandingReviews from "@/server/services/fetchOutstandingReviews";
import { GenericResponseStatus, ISuccessGenericRes, IReviewsResposePayload } from "@/server/types";

const VerticalGrid = dynamic(() => import("../features/apartment/components/VerticalGallery"));

const Reviews = dynamic(
  () => import("../features/reviews/Reviews")
);

const HeroGrid = dynamic(
  () => import("../features/apartment/components/HeroGrid"), {
    loading: () => <Flex height={"450px"} width={"100%"}><Spinner margin="auto"/></Flex>,
    ssr: false,
  }
);

const Map = dynamic(() => import("../features/location/Map"), {
  suspense: true,
});

const Page = ({ apartments, reviews, images }: IHomePageProps) => {
  const { isMobile } = useGlobalContext();
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
        case IDrawerActionTypes.SHOW_ALL_REVIEWS: {
          if (!state) {
            const reviewsToShow = action.payload as IReview[];
            return {
              title: "Opiniones",
              component: (
                <Reviews
                  reviews={reviewsToShow}
                  overallRating={"5.0"}
                  reviewsCount={reviewsToShow.length}
                />
              ),
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
    [images]
  );
  const [componentToShow, dispatch] = useReducer(reducer, null);
  const scrollTrigger = usePageScroll();

  return (
    <>
      <Box display={{ base: "block", md: "none" }}>
        <Box
          as="button"
          onClick={() => {
            dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
          }}
          w="100%"
          cursor="pointer"
        >
          <Carousel images={images.square} />
        </Box>
      </Box>
      {!isMobile && (
        <HeroGrid
          onShowAllPicks={() => {
            // onOpen();
            // openDrawerAndDispatch({ type: "showAllPics" });
            dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
          }}
          images={images.wide}
        />
      )}
      <Heading
        as="h1"
        size="xl"
        py={{ base: 1, md: 3 }}
        textAlign="center"
      >
        <Text
          as="span"
          display={{ base: "block", md: "inline" }}
          fontFamily={{ base: "'MonteCarlo', cursive", md: "inherit" }}
          letterSpacing={{ base: "wide", md: "normal" }}
        >
          Alojamiento y alquileres vacacionales
        </Text>
        <Text as="span" display={{ base: "none", md: "inline" }}>
          {" en "}
        </Text>
        <Text
          as="span"
          display={{ base: "block", md: "inline" }}
          fontSize={{ base: "lg", md: "inherit" }}
        >
          Tanti, Cordoba
        </Text>
      </Heading>
      <Heading
        as="h2"
        size={{ base: "sm", md: "lg" }}
        textAlign="center"
        mb={{ base: 2, md: 4 }}
        fontWeight="bold"
        fontFamily={{ base: "inherit", md: "'MonteCarlo', cursive" }}
      >
        Naturaleza, confort. Mirador de las sierras, en las sierras.
      </Heading>
      <Flex
        as="section"
        aria-label="Departamentos disponibles"
        width="100%"
        flexWrap={"wrap"}
        justifyContent={{ base: "space-around", md: "space-between" }}
        p="0"
        gap={4}
        my={2}
      >
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.name} {...apartment} />
        ))}
      </Flex>
      <Divider my={8} mb={4} />
      <Box as="section" aria-label="Opiniones de huéspedes">
        <Reviews
          reviews={reviews}
          overallRating={"5.0"}
          reviewsCount={reviews.length}
          onExpand={() =>
            dispatch({
              type: IDrawerActionTypes.SHOW_ALL_REVIEWS,
              payload: reviews,
            })
          }
        />
      </Box>
      <Divider my={8} mb={4} />
      <Text
        display={{ base: "block", md: "none" }}
        fontFamily={"'MonteCarlo', cursive"}
        fontSize="4xl"
        fontWeight="semibold"
        textAlign="center"
        my={4}
      >
        un mirador de las sierras, en las sierras
      </Text>
      {scrollTrigger && (
        <Box as="section" aria-label="Ubicación en el mapa">
          <Suspense fallback={<LoadingMapContainer />}>
            <Map />
          </Suspense>
        </Box>
      )}
      <PageDrawer
        componentToShow={componentToShow}
        onHide={() => dispatch({ type: "hide" })}
      />
    </>
  );
};

const seoDescription = `Alquiler de departamentos vacacionales en Tanti, Córdoba. Vista a las sierras, pileta, WiFi y estacionamiento. Reservá tu escapada en Cala Cabana.`;

const seoTitle = `Cala Cabana: Alquiler de departamentos vacacionales en Tanti, Córdoba`;

const Home = (props: IHomePageProps) => {
  const canonicalPath = process.env.NEXT_PUBLIC_ORIGIN_PATH;
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalPath} />
        <meta key="og-title" property="og:title" content={seoTitle} />
        <meta key="og-url" property="og:url" content={canonicalPath} />
        <meta
          key="og-description"
          property="og:description"
          content={seoDescription}
        />
        <meta
          property="og:image"
          content={`${canonicalPath}${props.images.square[0].src}`}
        />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${canonicalPath}${props.images.square[0].src}`} />
      </Head>
      <Page {...props} />
    </>
  );
};

export type IHomePageProps = { apartments: ApartmentCardProps[], images: {
  wide: IImage[],
  square: IImage[],
} } & {
  reviews: IReview[];
};

// NextJS API Middleware is not available here
const getStaticProps: GetStaticProps<IHomePageProps> = async ({}) => {

  const apartmentsResp = await fetchApartments({includes: ["images"]})
  const apartments = apartmentsResp ? apartmentsResp.map(
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
        images: images ? images.square : [],
        type,
      } as ApartmentCardProps)
  ) : []

  let reviews: IReview[] = []
  const reviewsResponse = await fetchOutStandingReviews();
  if (reviewsResponse.status === GenericResponseStatus.SUCCESFUL) {
    const succes = (reviewsResponse as ISuccessGenericRes<IReviewsResposePayload>)
    reviews = succes.data.reviews;
  } else {
    console.error(JSON.stringify(reviewsResponse))
  }

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
        width: 450,
        height: 450,
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
  

  return {
    props: { apartments: apartments, reviews, images },
    notFound: false,
    // if you want revalidate data of an apartment manually.
    //https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
  };
};

export { getStaticProps };

export default Home;
