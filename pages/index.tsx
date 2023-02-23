import { Box, Divider, Flex, Heading, Spinner } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import AparmentCard, {
  AparmentCardProps,
} from "@/features/apartment/AparmentCard";
import Carousel from "@/features/apartment/ImageCarousel";

import { Suspense, useCallback, useReducer } from "react";
import { IDrawerActionTypes } from "@/types/types";
import dynamic from "next/dynamic";

import PageDrawer from "@/components/PageDrawer";
import { IApartmentImage, IReview } from "@/types/shared";
import usePageScroll from "@/shared/hooks/usePageScroll";
import LoadingMapContainer from "@/features/location/LoadingMapContainer";
import useGlobalContext from "@/shared/hooks/useGlobalContext";
import fetchApartments from "@/server/services/fetchApartments";
import fetchOutstandingReviews from "@/server/services/fetchOutstandingReviews";
import fetchOutStandingReviews from "@/server/services/fetchOutstandingReviews";
import { GenericResponseStatus, ISuccessGenericRes, IReviewsResposePayload } from "@/types/api";

const VerticalGrid = dynamic(() => import("../features/apartment/VerticalGallery"));

const Reviews = dynamic(
  () => import("../features/reviews/Reviews")
);

const HeroGrid = dynamic(
  () => import("../features/apartment/HeroGrid"), {
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
        <a
          onClick={() => {
            dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
          }}
        >
          <Carousel images={images.square} />
        </a>
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
        as="h2"
        size="xl"
        fontFamily={"'MonteCarlo', cursive"}
        letterSpacing="wide"
        py={1}
        textAlign="center"
        display={{ base: "block", md: "none" }}
      >
        Alojamiento y alquileres vacacionales
      </Heading>
      <Heading
        as="h2"
        size="md"
        // fontFamily={"'MonteCarlo', cursive"}
        // pb={1}
        textAlign="center"
        display={{ base: "block", md: "none" }}
      >
        Tanti, Cordoba
      </Heading>
      <Flex
        width="100%"
        flexWrap={"wrap"}
        justifyContent={{ base: "space-around", md: "space-between" }}
        p="0"
        gap={4}
        my={2}
      >
        {apartments.map((apartment) => (
          <AparmentCard key={apartment.name} {...apartment} />
        ))}
      </Flex>
      <Divider my={8} mb={4} />
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
      <Divider my={8} mb={4} />
      {scrollTrigger && (
        <Suspense fallback={<LoadingMapContainer />}>
          <Map />
        </Suspense>
      )}
      <PageDrawer
        componentToShow={componentToShow}
        onHide={() => dispatch({ type: "hide" })}
      />
    </>
  );
};

const seoDescription = `El alojamiento cuenta con apartamentos diseñados al detalle, con terminaciones de calidad y equipados con todo lo que necesitas. 
El aire puro de las sierras en combinación de las facilidades del alojamiento hacen una composición perfecta para que puedas relajarte disfrutando de una espectacular vista a las sierras.          
  - Cala Cabana: Servicio de alojamiento seguro, alejado de la ciudad, en contacto con la naturaleza pero cerca de todo. Tanti, Cordoba -`;

const seoTitle = `Cala Cabana: Servicio de alojamiento y alquileres vacacionales en Tanti, Cordoba`;

const Home = (props: IHomePageProps) => {
  const canonicalPath = process.env.NEXT_PUBLIC_ORIGIN_PATH;
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="icon" href="/favicon.ico" />
        <meta key="og-title" property="og:title" content={seoTitle} />
        <meta
          key="og-description"
          property="og:description"
          content={seoDescription}
        />
        <meta
          property="og:image"
          content={`${canonicalPath}${props.images.square[0].src}`}
        />
      </Head>
      <Page {...props} />
    </>
  );
};

export type IHomePageProps = { apartments: AparmentCardProps[], images: {
  wide: IApartmentImage[],
  square: IApartmentImage[],
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
      } as AparmentCardProps)
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
