import { GetStaticPaths, GetStaticProps } from "next/types";
import aparmentsData, { APARTMENTS_BUILD } from "../../shared/apartmentsData";

import {
  Box,
  useBreakpointValue,
  Flex,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Carousel from "@/components/Carousel";

import HeroGrid from "@/components/HeroGrid";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ApartmentTitle from "@/components/apartment/ApartmentTitle";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { GiCctvCamera, GiHomeGarage } from "react-icons/gi";
import ApartmentFeatures, {
  ApartmentFeature,
  ApartmentFeatureIcon,
} from "@/components/apartment/ApartmentFeatures";
import { IAparmentAmenitiesGroup, IApartmentData } from "@/types/shared";
import HiglightAmenities from "@/components/amenities/HiglightAmenities";
import BookingButton from "@/components/booking/BookingButton";
import { BookeableValidPeriod } from "@/types/shared";
import PageDrawer from "@/components/PageDrawer";

import useSWR from "swr";
import aparmentBookingsFetcher from "@/shared/fetchers/aparmentBookingsFetcher";
import usePageDefaultDates from "@/shared/hooks/usePageDefaultDates";

import { useRouter } from "next/router";
import { IDrawerActionTypes } from "@/types/types";

const VerticalGrid = dynamic(() => import("../../components/VerticalGallery"));

const AllAmenities = dynamic(
  () => import("../../components/amenities/AllAmenities")
);

const BookingDatesLoader = () => import("../../components/booking/BookingDatesWithRef")

const BookingDates = dynamic(
  BookingDatesLoader,
  {
    suspense: true,
  }
);

export type IApartmentProps = IApartmentData & { key: string };

enum EApartmentPageErrorType {
  SELECTED_DATES_NOT_AVAILABLE = "SELECTED_DATES_NOT_AVAILABLE",
}

const Page = (apartmentData: IApartmentProps) => {
  const { amenities, description, images, displayName, name } = apartmentData;
  const [isPageProcessing, setIsPageProcessing] = useState(false);
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isClient, setClient] = useState(false);
  const [datesSelected, setSelectedDates] =
    useState<BookeableValidPeriod | null>(null);
  const { data: excludedDatesRanges, error } = useSWR(
    `/api/bookings/${name}`,
    aparmentBookingsFetcher,
    { revalidateOnFocus: false }
  );
  const { defaultDates, bookeableDefaultDates,  pageDefaultDatesError } = usePageDefaultDates({
    excludedDatesRanges,
  });

  const [pageError, setPageError] = useState<EApartmentPageErrorType | null>(
    null
  );
  const datePickerRef = useRef<HTMLDivElement | null>(null);

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
              component: <Text dangerouslySetInnerHTML={{ __html: description}}/>,
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

  const onDatesSelected = useCallback(
    (dates: BookeableValidPeriod | null) => {
      setSelectedDates(dates);
    },
    []
  );

  useEffect(() => {
    if (
      datesSelected &&
      pageError === EApartmentPageErrorType.SELECTED_DATES_NOT_AVAILABLE
    ) {
      setPageError(null);
    }
  },[datesSelected, setPageError, pageError])

  /**
   * - Invalid dates (not existent, not valid booking date) => remove them from url (//TODO)
   * - Bookeable dates will be set as valid date.
   */
  useEffect(() => {
    if (bookeableDefaultDates !== undefined) {
      onDatesSelected(bookeableDefaultDates);
    }
  }, [bookeableDefaultDates, pageDefaultDatesError, onDatesSelected]);

  //sets the page prop error to subseccions "SELECTED_DATES_NOT_AVAILABLE"
  useEffect(() => {
    if (pageDefaultDatesError) {
      setPageError(EApartmentPageErrorType.SELECTED_DATES_NOT_AVAILABLE);
    }

  },[pageDefaultDatesError]);


  const gotToBookApt = useCallback(() => {
    setIsPageProcessing(true);
    // not include apartment prop
    const {apartment, ...restQuery} = router.query
    router.push({
      pathname: `/reserva/${name}`,
      query:  restQuery,
    })
  }, [name, router])

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
            onShowAllPicks={() => {
              dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
            }}
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
            <ApartmentTitle {...apartmentData} />
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
            <Text noOfLines={[6, 20]} dangerouslySetInnerHTML={{ __html: description}}/>
            <Button
              textDecoration="underline"
              variant="link"
              onClick={() =>
                dispatch({
                  type: IDrawerActionTypes.SHOW_DESCRIPTION,
                  payload: description,
                })
              }
            >
              Mostrar mas
            </Button>
            <Divider my={4} />
            <HiglightAmenities
              amenities={amenities}
              onExpand={() =>
                dispatch({
                  type: IDrawerActionTypes.SHOW_ALL_AMENITIES,
                  payload: amenities,
                })
              }
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
                  {!excludedDatesRanges && !error && <div>Loading</div>}

                  {!isMobile && (
                    <>
                      <Divider my={4} width="75%" />
                      <BookingButton
                        enabled={!!datesSelected && !pageError}
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
          >
            {/* Fix these buttons, are styled very poorly */}
            {!pageError && !!datesSelected ? (
              <BookingButton
                onBookingAction={gotToBookApt}
                isLoading={isPageProcessing}
              />
            ) : (
              <Button
                margin={"auto"}
                variant="action"
                onClick={() => datePickerRef.current?.scrollIntoView()}
              >
                {datesSelected ? "Cambiar fechas" : "Consultar disponibilidad"}
              </Button>
            )}
          </Box>
        )}

        <PageDrawer
          componentToShow={componentToShow}
          onHide={() => dispatch({ type: "hide" })}
        />
      </Layout>
    </Box>
  );
};

const Apartment = (apartmentData: IApartmentProps) => {
  return (
    <>
      <Head>
        <title>{`${apartmentData.displayName} - CalaCabana Hospedaje`}</title>
        <meta
          name="description"
          // TODO(#20) SEO description is needed
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
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
  if (params?.apartment) {
    props = { key: params?.apartment as string,  ...aparmentsData[params?.apartment as "cala" | "cabana"]};
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
