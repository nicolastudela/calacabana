import {
  Box,
  useDisclosure,
  useBreakpointValue,
  Flex,
  Divider,
  Text,
  Button
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";

import cala_wide_1 from "../public/images/cala/wide/cala-1.jpeg";
import cala_wide_2 from "../public/images/cala/wide/cala-2.jpeg";
import cala_wide_3 from "../public/images/cala/wide/cala-3.jpeg";
import cala_wide_4 from "../public/images/cala/wide/cala-4.jpeg";
import cala_wide_5 from "../public/images/cala/wide/cala-5.jpeg";
import cala_wide_6 from "../public/images/cala/wide/cala-6.jpeg";
import cala_wide_7 from "../public/images/cala/wide/cala-7.jpeg";
import cala_wide_8 from "../public/images/cala/wide/cala-8.jpeg";
import ApartmentHeroGrid from "../components/apartment/ApartmentHeroGrid";

import aparmentsData from "../shared/apartmentsData";
import dynamic from "next/dynamic";
import { useEffect, useReducer, useRef, useState } from "react";
import ApartmentTitle from "../components/apartment/ApartmentTitle";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { GiCctvCamera, GiHomeGarage } from "react-icons/gi";
import ApartmentFeatures, { ApartmentFeature, ApartmentFeatureIcon } from "../components/apartment/ApartmentFeatures";
import { APARMENTS_NAME, IAparmentAmenitiesGroup } from "../types/shared";
import HiglightAmenities from "../components/amenities/HiglightAmenities";
import BookingButton from "../components/booking/BookingButton";

const Drawer = dynamic(() => import("../components/Drawer"));

const VerticalGrid = dynamic(
  () => import("../components/VerticalGallery")
);

const AllAmenities = dynamic(
  () => import("../components/amenities/AllAmenities")
)

const BookingDates = dynamic(
  () => import("../components/booking/BookingDates"), {
  suspense: true,
  }
)

const images = [
  {
    img: cala_wide_1,
    alt: "Apartamento Cala - comedor",
  },
  {
    img: cala_wide_2,
    alt: "Apartamento Cala - living",
  },
  {
    img: cala_wide_3,
    alt: "Apartamento Cala - vista",
  },
  {
    img: cala_wide_4,
    alt: "Apartamento Cala - dormitorio",
  },
  {
    img: cala_wide_5,
    alt: "Apartamento Cala - baño",
  },
  {
    img: cala_wide_6,
    alt: "Apartamento Cala - living/comendor de noche",
  },
  {
    img: cala_wide_7,
    alt: "Apartamento Cala - ambiente calido con salamandra",
  },
  {
    img: cala_wide_8,
    alt: "Apartamento Cala - segundo dormitorio",
  },
];


const apartmentData = aparmentsData[APARMENTS_NAME.CALA];

const apartmentDescription = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.\n Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. \n \n Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" \n by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."


enum IDrawerActionTypes {
  SHOW_ALL_PICS,
  SHOW_ALL_AMENITIES,
  SHOW_DESCRIPTION,
  HIDE,
}

function reducer(state: any, action: { type: any, payload?: any }) {
  switch (action.type) {
    case IDrawerActionTypes.SHOW_ALL_PICS: {
      if (!state) {
        return {
          title: "Todas las fotos",
          component: <VerticalGrid images={images} />,
        }
      }
      return null;
    }
    case IDrawerActionTypes.SHOW_ALL_AMENITIES: {
      if (!state) {
        return {
          title: "Que ofrece este lugar?",
          component: <AllAmenities amenities={action.payload as IAparmentAmenitiesGroup[]} />,
        }
      }
      return null;
    }
    case IDrawerActionTypes.SHOW_DESCRIPTION: {
      if (!state) {
        return {
          title: "Acerca de este alojamiento",
          component: <Text>{apartmentDescription}</Text>,
        }
      }
      return null;
    }
    case "hide":
      return null;
    default:
      return null;
  }
}

const Cala: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isClient, setClient ] = useState(false);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [isDrawerMounted, setDrawerMounted] = useState(false);
  const [datesSelected, setSelectedDates] = useState<Date[] | null>(null);

  // use reducer to get dispachers to be used on CTAs, where some CTAs will update whats shown on the drawer
  const [componentToShow, dispatch] = useReducer(reducer, null);

  const datePickerRef = useRef<HTMLDivElement>(null);

  // manage the drawer state
  useEffect(() => {
    if (componentToShow) {
      if (!isDrawerMounted) {
        setDrawerMounted(true);
      }
      onDrawerOpen();
    } else {
      onDrawerClose();
    }
  }, [isDrawerOpen, componentToShow, isDrawerMounted, onDrawerOpen, onDrawerClose]);

  useEffect(() => {
    setClient(true);
  },[])
  

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
            <Carousel aptName="cala" images={images} />
          ) : (
            <ApartmentHeroGrid
              onShowAllPicks={() => {
                // onOpen();
                // openDrawerAndDispatch({ type: "showAllPics" });
                dispatch({ type: IDrawerActionTypes.SHOW_ALL_PICS });
              }}
              images={images}
            />
          )}

          <Flex
            mt={4}
            alignItems={"flex-start"}
            justifyContent="space-between"
            position="relative"
            wrap={"wrap"}
            px={{base: 1, md: "unset"}}
          >
            <Flex
              w={{ base: "100%", md: "65%" }}
              alignItems={"flex-start"}
              direction="column"
            >
              <ApartmentTitle {...apartmentData} />
              <Divider my={4} />
              <ApartmentFeatures gap={"2"}>
                <ApartmentFeature title="Check-in flexible" subtitle="Nos amoldamos a tus necesidades" isHighlight>
                  <ApartmentFeatureIcon as={BsFillDoorOpenFill}/>
                </ApartmentFeature>
                <ApartmentFeature title="Cámaras de seguridad en la propiedad" isHighlight>
                  <ApartmentFeatureIcon as={GiCctvCamera}/>
                </ApartmentFeature>
                <ApartmentFeature title="Entrada independiente. Cochera bajo techo" isHighlight>
                  <ApartmentFeatureIcon as={GiHomeGarage}/>
                </ApartmentFeature>
              </ApartmentFeatures>
              <Divider my={4} />
              <Text noOfLines={[4,20]}>{apartmentDescription}</Text>
              <Button textDecoration="underline" variant="link" onClick={() => dispatch({ type: IDrawerActionTypes.SHOW_DESCRIPTION, payload: apartmentDescription})}>Mostrar mas</Button>
              <Divider my={4} />
              <HiglightAmenities amenities={apartmentData.amenities} onExpand={() => dispatch({ type: IDrawerActionTypes.SHOW_ALL_AMENITIES, payload: apartmentData.amenities })} />
              <Divider my={4} />         
            </Flex>
            <Box
              w={{ base: "100%", md: "35%" }}
              position={{ base: "relative", md: "sticky" }}
              top={{ base: "unset", md: "40px" }}
            >
                {isClient &&
                    // <Suspense fallback="loading">
                      <Box display="flex" alignItems={"center"} flexDirection={"column"} rounded={{base: "none", md: "md"}} width={"fit-content"} 
                        margin="auto" padding={{base: "unset", md:"24px"}} boxShadow={{base:"none", md:'rgb(100, 158, 148) 0px 6px 16px'}} border='1px solid rgb(100, 158, 148'>
                        <BookingDates ref={datePickerRef}  m={"auto"} width="fit-content" apartmentName={apartmentData.name} forceInline={!!(isMobile)} onDatesChange={(dates) => setSelectedDates(dates)} />
                        {!isMobile && 
                          <>
                            <Divider my={4} width="75%"/>
                            <BookingButton enabled={!!datesSelected} onBookingAction={() => {}}/>
                          </>
                        }
                      </Box>
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
            >
              {(datesSelected && datesSelected.length == 2) ? <BookingButton onBookingAction={() => {}}/> : <Button colorScheme={"red"} onClick={() => datePickerRef.current?.scrollIntoView() }>Scroll to calendar</Button>}
            </Box>
          )}

          {isDrawerMounted && (
            <Drawer
              placement={"bottom"}
              onClose={() => dispatch({ type: "hide" })}
              isOpen={isDrawerOpen}
              size={"full"}
              title={componentToShow?.title}
            >
              {componentToShow?.component}
            </Drawer>
          )}
        </Layout>
      </Box>
    </>
  );
};

export default Cala;
