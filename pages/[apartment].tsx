import { GetStaticPaths, GetStaticProps } from "next/types";
import aparmentsData, { APARTMENTS_BUILD } from "../shared/apartmentsData";

import {
  Box,
  useBreakpointValue,
  Flex,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";

import HeroGrid from "../components/HeroGrid";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ApartmentTitle from "../components/apartment/ApartmentTitle";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { GiCctvCamera, GiHomeGarage } from "react-icons/gi";
import ApartmentFeatures, {
  ApartmentFeature,
  ApartmentFeatureIcon,
} from "../components/apartment/ApartmentFeatures";
import { IAparmentAmenitiesGroup, IApartmentData } from "../types/shared";
import HiglightAmenities from "../components/amenities/HiglightAmenities";
import BookingButton from "../components/booking/BookingButton";
import { IDrawerActionTypes } from "../types/types";
import PageDrawer from "../components/PageDrawer";

const VerticalGrid = dynamic(() => import("../components/VerticalGallery"));

const AllAmenities = dynamic(
  () => import("../components/amenities/AllAmenities")
);

const BookingDates = dynamic(
  () => import("../components/booking/BookingDates"),
  {
    suspense: true,
  }
);

export interface IApartmentProps {
  apartmentData: IApartmentData;
}


const Page = ({ apartmentData }: IApartmentProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isClient, setClient] = useState(false);
  const [datesSelected, setSelectedDates] = useState<Date[] | null>(null);


  // use reducer to get dispachers to be used on CTAs, where some CTAs will update whats shown on the PageDrawer
  const reducer = useCallback((state: any, action: { type: any; payload?: any }) => {
      switch (action.type) {
        case IDrawerActionTypes.SHOW_ALL_PICS: {
          if (!state) {
            return {
              title: "Todas las fotos",
              component: <VerticalGrid images={apartmentData.images.wide} />,
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
              component: <Text>{apartmentData.description}</Text>,
            };
          }
          return null;
        }
        case "hide":
          return null;
        default:
          return null;
      }
    },[apartmentData.description, apartmentData.images])

  const [componentToShow, dispatch] = useReducer(reducer, null);

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>CalaCabana - Departamento Cala</title>
        <meta
          name="description"
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Layout>
          {isMobile ? (
            <Carousel aptName="cala" images={apartmentData.images.wide} />
          ) : (
            <HeroGrid
              onShowAllPicks={() => {
                // onOpen();
                // openDrawerAndDispatch({ type: "showAllPics" });
                dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
              }}
              images={apartmentData.images.wide}
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
              <Text noOfLines={[4, 20]}>{apartmentData.description}</Text>
              <Button
                textDecoration="underline"
                variant="link"
                onClick={() =>
                  dispatch({
                    type: IDrawerActionTypes.SHOW_DESCRIPTION,
                    payload: apartmentData.description,
                  })
                }
              >
                Mostrar mas
              </Button>
              <Divider my={4} />
              <HiglightAmenities
                amenities={apartmentData.amenities}
                onExpand={() =>
                  dispatch({
                    type: IDrawerActionTypes.SHOW_ALL_AMENITIES,
                    payload: apartmentData.amenities,
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
                    boxShadow={{
                      base: "none",
                      md: "rgb(100, 158, 148) 0px 6px 16px",
                    }}
                    border="1px solid rgb(100, 158, 148"
                  >
                    <BookingDates
                      ref={datePickerRef}
                      m={"auto"}
                      width="fit-content"
                      apartmentName={apartmentData.name}
                      forceInline={!!isMobile}
                      onDatesChange={(dates) => setSelectedDates(dates)}
                    />
                    {!isMobile && (
                      <>
                        <Divider my={4} width="75%" />
                        <BookingButton
                          enabled={!!datesSelected}
                          onBookingAction={() => {}}
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
              {datesSelected && datesSelected.length == 2 ? (
                <BookingButton onBookingAction={() => {}} />
              ) : (
                <Button
                  margin={"auto"}
                  bg="tomato"
                  onClick={() => datePickerRef.current?.scrollIntoView()}
                >
                  Scroll to calendar
                </Button>
              )}
            </Box>
          )}

          <PageDrawer componentToShow={componentToShow} onHide={() => dispatch({ type: "hide" })} />
        </Layout>
      </Box>
    </>
  );
};

const Apartment = ({ apartmentData }: IApartmentProps) => {

  return (
    <>
      <Head>
        <title>CalaCabana - Departamento ${apartmentData?.name}</title>
        <meta
          name="description"
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page apartmentData={apartmentData} />
    </>
  );
}

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

// Fetch merchant data during build phase
// NextJS API Middleware is not available here
const getStaticProps: GetStaticProps<IApartmentProps> = async ({ params }) => {
 
  let props: IApartmentProps | null = null;
  if (params?.apartment) {
    props = { 
      apartmentData: aparmentsData[params?.apartment as "cala" | "cabana"],
    }
  }

  if (!props || !props.apartmentData) {
    return { notFound: true };
  }

  return {
    props,
    notFound: false,
    revalidate: Number(process.env.REVALIDATE || "0") || false,
  };
};

export { getStaticPaths, getStaticProps }

export default Apartment;
