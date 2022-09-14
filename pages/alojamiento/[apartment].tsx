import { GetStaticPaths, GetStaticProps } from "next/types";
import aparmentsData, { APARTMENTS_BUILD } from "../../shared/apartmentsData";

import {
  Box,
  useBreakpointValue,
  Flex,
  Divider,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Carousel from "@/components/Carousel";

import HeroGrid from "@/components/HeroGrid";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import ApartmentTitle from "@/components/apartment/ApartmentTitle";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { GiCctvCamera, GiHomeGarage } from "react-icons/gi";
import ApartmentFeatures, {
  ApartmentFeature,
  ApartmentFeatureIcon,
} from "@/components/apartment/ApartmentFeatures";
import {
  IAparmentAmenitiesGroup,
  IApartmentData,
  IReview,
} from "@/types/shared";
import HiglightAmenities from "@/components/amenities/HiglightAmenities";
import BookingButton from "@/components/booking/BookingButton";
import { BookeableValidPeriod } from "@/types/shared";
import PageDrawer from "@/components/PageDrawer";

import useSWR from "swr";
import aparmentBookingsFetcher from "@/shared/fetchers/aparmentBookingsFetcher";
import usePageDefaultDates from "@/shared/hooks/usePageDefaultDates";

import { useRouter } from "next/router";
import { IDrawerActionTypes } from "@/types/types";
import Reviews from "@/components/Reviews";
import fetchOutstandingReviews from "@/shared/fetchers/fetchOutstandingReviews";
import { trackEvent } from "@/lib/gtag";
import usePageScroll from "@/shared/hooks/usePageScroll";
import LoadingMapContainer from "@/components/LoadingMapContainer";

const VerticalGrid = dynamic(() => import("../../components/VerticalGallery"));

const AllAmenities = dynamic(
  () => import("../../components/amenities/AllAmenities")
);

const BookingDatesLoader = () =>
  import("../../components/booking/BookingDatesWithRef");

const BookingDates = dynamic(BookingDatesLoader, {
  suspense: true,
});

const Map = dynamic(
  () => import("../../components/Map"), {
  suspense: true,
});

export type IApartmentProps = IApartmentData & {
  key: string;
  reviews: IReview[];
};

enum EApartmentPageErrorType {
  SELECTED_DATES_NOT_AVAILABLE = "SELECTED_DATES_NOT_AVAILABLE",
}

interface BookeableValidPeriodState {
  dateSelected: BookeableValidPeriod | null;
  error: EApartmentPageErrorType.SELECTED_DATES_NOT_AVAILABLE | null
}

const Page = (apartmentData: IApartmentProps) => {
  const { amenities, description, images, displayName, name, reviews } =
    apartmentData;
  const [isPageProcessing, setIsPageProcessing] = useState(false);
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isClient, setClient] = useState(false);
  const [bookeableValidPeriodState, setBookeableValidPeriodState] =
    useState<BookeableValidPeriodState>({dateSelected: null, error: null});
  const { data: excludedDatesRanges, error } = useSWR(
    `/api/bookings/${name}`,
    aparmentBookingsFetcher,
    { revalidateOnFocus: false }
  );
  const { defaultDates, bookeableDefaultDates, pageDefaultDatesError } =
    usePageDefaultDates({
      excludedDatesRanges,
    });

  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const scrollTrigger = usePageScroll();

  // use reducer to get dispachers to be used on CTAs, where some CTAs will update whats shown on the PageDrawer
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
        case IDrawerActionTypes.SHOW_ALL_AMENITIES: {
          if (!state) {
            return {
              title: "Que ofrece este lugar?",
              component: (
                <AllAmenities
                  amenities={action.payload as IAparmentAmenitiesGroup[]}
                />
              ),
            };
          }
          return null;
        }
        case IDrawerActionTypes.SHOW_DESCRIPTION: {
          if (!state) {
            return {
              title: "Acerca de este alojamiento",
              component: (
                <Text dangerouslySetInnerHTML={{ __html: description }} />
              ),
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
    [description, images]
  );

  const [componentToShow, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    setClient(true);
  }, []);

  const onDatesSelected = useCallback((dates: BookeableValidPeriod | null) => {
    setBookeableValidPeriodState({dateSelected: dates, error: null})
  }, []);

  /**
   * - Invalid dates (not existent, not valid booking date) => remove them from url (//TODO)
   * - Bookeable dates will be set as valid date.
   */
  useEffect(() => {
    if (bookeableDefaultDates !== undefined) {
      bookeableDefaultDates && trackEvent("apartment_page_with_default_dates")
      setBookeableValidPeriodState((prev) => ({...prev, dateSelected: bookeableDefaultDates }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(bookeableDefaultDates)]);

  //sets "SELECTED_DATES_NOT_AVAILABLE" error if checkin_chekout dates are not valid
  useEffect(() => {
    if (pageDefaultDatesError) {
      trackEvent("invalid_dates_selected_through_url",  { apartment: name })
      setBookeableValidPeriodState((prev: BookeableValidPeriodState) => ({...prev, error: EApartmentPageErrorType.SELECTED_DATES_NOT_AVAILABLE}));
    }
  }, [name, pageDefaultDatesError]);

  const gotToBookApt = useCallback(() => {
    setIsPageProcessing(true);
    // not include apartment prop
    const { apartment, ...restQuery } = router.query;
    trackEvent("click_on_booking_button",  { apartment: name })
    router.push({
      pathname: `/reserva/${name}`,
      query: restQuery,
    });
  }, [name, router]);

  const onMobileDatesCheck = useCallback(() => {
    !!bookeableDefaultDates ? trackEvent("change_dates",  { apartment: name }) : trackEvent("check_availabilty",  { apartment: name })
    datePickerRef.current?.scrollIntoView()
  },[bookeableDefaultDates, name])


  const onShowExpandedDescription = useCallback(() => {
    trackEvent("show_expanded_desription",  { apartment: name })
    dispatch({
      type: IDrawerActionTypes.SHOW_DESCRIPTION,
      payload: description,
    })
  },[name, description])


  const onShowAllAmeninities = useCallback(() => {
    trackEvent("show_expanded_amenities",  { apartment: name })
    dispatch({
      type: IDrawerActionTypes.SHOW_ALL_AMENITIES,
      payload: amenities,
    })
  },[name, amenities])

  const onShowAllReviews = useCallback(() => {
    trackEvent("show_expanded_reviews",  { apartment: name })
    dispatch({
      type: IDrawerActionTypes.SHOW_ALL_REVIEWS,
      payload: reviews,
    })
  },[name, reviews])

  const onShowAllPicks = useCallback(() => {
    trackEvent("show_expanded_pics",  { apartment: name })
    dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
  },[name])

  const userCanBook = useMemo(() => {
    return bookeableValidPeriodState.dateSelected && !bookeableValidPeriodState.error},[bookeableValidPeriodState.dateSelected, bookeableValidPeriodState.error])

  return (
    <Box>
      <Layout>
        {isMobile ? (
          <a
            onClick={() => {
              dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
            }}
          >
            <Carousel aptName="cala" images={images.square} />
          </a>
        ) : (
          <HeroGrid
            onShowAllPicks={onShowAllPicks}
            images={images.wide}
          />
        )}

        <Flex
          mt={4}
          alignItems={"flex-start"}
          justifyContent="space-between"
          position="relative"
          wrap={"wrap"}
          px={{ base: 1, md: "unset" }}
        >
          <Flex
            w={{ base: "100%", md: "65%" }}
            alignItems={"flex-start"}
            direction="column"
          >
            <ApartmentTitle {...apartmentData} isPageTitle />
            <Divider my={4} />
            <ApartmentFeatures gap={"2"}>
              <ApartmentFeature
                title="Check-in flexible"
                subtitle="Nos amoldamos a tus necesidades"
                isHighlight
              >
                <ApartmentFeatureIcon as={BsFillDoorOpenFill} />
              </ApartmentFeature>
              <ApartmentFeature
                title="Cámaras de seguridad en la propiedad"
                isHighlight
              >
                <ApartmentFeatureIcon as={GiCctvCamera} />
              </ApartmentFeature>
              <ApartmentFeature
                title="Entrada independiente. Cochera bajo techo"
                isHighlight
              >
                <ApartmentFeatureIcon as={GiHomeGarage} />
              </ApartmentFeature>
            </ApartmentFeatures>
            <Divider my={4} />
            <Text
              noOfLines={[6, 20]}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Button
              textDecoration="underline"
              variant="link"
              onClick={onShowExpandedDescription}
            >
              Mostrar mas
            </Button>
            <Divider my={4} />
            <HiglightAmenities
              amenities={amenities}
              onExpand={onShowAllAmeninities}
            />
            <Divider my={4} />
            <Reviews
              reviews={reviews}
              overallRating={"5.0"}
              reviewsCount={reviews.length}
              onExpand={onShowAllReviews}
            />
            <Divider my={4} />
          </Flex>
          <Box
            w={{ base: "100%", md: "35%" }}
            position={{ base: "relative", md: "sticky" }}
            top={{ base: "unset", md: "40px" }}
          >
            {
              isClient && (
                // <Suspense fallback="loading">
                <Box
                  display="flex"
                  alignItems={"center"}
                  flexDirection={"column"}
                  rounded={{ base: "none", md: "md" }}
                  width={"fit-content"}
                  margin="auto"
                  padding={{ base: "unset", md: "24px" }}
                  borderTop="0"
                  borderLeft="0"
                  borderBottom={{ base: "none", md: "2px solid" }}
                  borderRight={{ base: "none", md: "2px solid" }}
                  borderColor="brand.500"
                  shadow={{ base: "none", md: "brand" }}
                  minWidth="350px"
                  minHeight={{ base: "xs", md: "auto" }}
                >
                  {excludedDatesRanges &&
                    excludedDatesRanges != null &&
                    !error && (
                      <BookingDates
                        ref={datePickerRef}
                        m={"auto"}
                        width="fit-content"
                        apartmentName={displayName}
                        forceInline={!!isMobile}
                        onDatesSelected={onDatesSelected}
                        excludeDatesRanges={excludedDatesRanges}
                        defaultDates={defaultDates}
                        defaultDatesError={pageDefaultDatesError}
                      />
                    )}
                  {!excludedDatesRanges && !error && (
                    <Spinner margin={"auto"} />
                  )}

                  {!isMobile && (
                    <>
                      <Divider my={4} width="75%" />
                      <BookingButton
                        enabled={!!userCanBook}
                        onBookingAction={gotToBookApt}
                        isLoading={isPageProcessing}
                      />
                    </>
                  )}
                </Box>
              )
              // </Suspense>
            }
          </Box>
        </Flex>

        {isMobile && (
          <Box
            position={"fixed"}
            bottom={0}
            right={0}
            w={"100%"}
            h={20}
            borderTop={"1px solid black"}
            bg="brand.900"
            display={"flex"}
            zIndex={1000}
          >
            {/* Fix these buttons, are styled very poorly */}
            {!bookeableValidPeriodState.error && !!bookeableValidPeriodState.dateSelected ? (
              <BookingButton
                onBookingAction={gotToBookApt}
                isLoading={isPageProcessing}
              />
            ) : (
              <Button
                margin={"auto"}
                variant="action"
                onClick={onMobileDatesCheck}
              >
                {bookeableValidPeriodState.dateSelected ? "Cambiar fechas" : "Consultar disponibilidad"}
              </Button>
            )}
          </Box>
        )}
        {scrollTrigger && <Suspense fallback={<LoadingMapContainer/>}><Map /></Suspense>}
        <PageDrawer
          componentToShow={componentToShow}
          onHide={() => dispatch({ type: "hide" })}
        />
      </Layout>
    </Box>
  );
};

const Apartment = (apartmentData: IApartmentProps) => {
  const canonicalPath = process.env.NEXT_PUBLIC_ORIGIN_PATH;
  return (
    <>
      <Head>
        <title>{`${apartmentData.displayName} - ${apartmentData.mainFeature} - Cala Cabana: Servicio de alojamiento y alquileres vacacionales en Tanti, Cordoba`}</title>
        <meta
          name="description"
          content={`El ${apartmentData.displayName} - ${apartmentData.mainFeature} - cuenta con ${apartmentData.rooms} ambientes - Completamente equipado, combinando  naturaleza, confort y calidez - Cala Cabana`}
        />
        <meta
          key="og-title"
          property="og:title"
          content={`${apartmentData.displayName} - ${apartmentData.mainFeature} - Cala Cabana: Servicio de alojamiento y alquileres vacacionales en Tanti, Cordoba`}
        />
        <meta
          key="og-url"
          property="og:url"
          content={`${canonicalPath}/alojamiento/${apartmentData.name}`}
        />
        <meta
          property="og:image"
          content={`${canonicalPath}${apartmentData.images.square[0].src}`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`${apartmentData.mainFeature} - cuenta con ${apartmentData.rooms} ambientes - Completamente equipado, combinando  naturaleza, confort y calidez`}
        />
      </Head>
      <Page {...apartmentData} />
    </>
  );
};

// Return paths for pre built merchants during build phase
// redirects for disabled and aliased merchants handled in next.config.js
const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: APARTMENTS_BUILD.map((apartment: string) => ({
      params: { apartment: apartment },
    })),
    fallback: false,
  };
};

// NextJS API Middleware is not available here
const getStaticProps: GetStaticProps<IApartmentProps> = async ({ params }) => {
  let props: IApartmentProps | null = null;

  const reviews = await fetchOutstandingReviews();
  if (params?.apartment) {
    props = {
      key: params?.apartment as string,
      ...aparmentsData[params?.apartment as "cala" | "cabana"],
      reviews,
    };
  }

  if (!props) {
    return { notFound: true };
  }

  return {
    props,
    notFound: false,
    // if you want revalidate data of an apartment manually.
    //https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
  };
};

export { getStaticPaths, getStaticProps };

export default Apartment;
