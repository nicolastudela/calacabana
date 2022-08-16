import { useEffect, useState, useCallback, useReducer, useMemo } from "react";
import useSWR from "swr";
import { GetStaticPaths, GetStaticProps } from "next/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";

import aparmentsData, { APARTMENTS_BUILD } from "@/shared/apartmentsData";
import { BookeableValidPeriod, IApartmentData, UserInquiry, UserInquiryRequest } from "@/types/shared";
import Layout from "@/components/Layout";
import aparmentBookingsFetcher from "@/shared/fetchers/aparmentBookingsFetcher";
import usePageDefaultDates, {
  EPageDefaultDatesErrorType,
} from "@/shared/hooks/usePageDefaultDates";
import { IDrawerActionTypes } from "@/types/types";
import ListingCard from "@/components/apartment/ListingCard";
import DiscountsInformation from "@/components/DiscountsInformation";
import TripSection from "@/components/TripSeccion";
import PageDrawer from "@/components/PageDrawer";
import dynamic from "next/dynamic";
import { updateQueryStringWithBookingDates } from "@/utils/queryStringHandler";
import ContactUs from "@/components/ContactUs";
import postUserInquiry from "@/shared/services/postUserInquiry";
import NotificationSection, { NOTIFICATION } from "@/components/booking/NotificationSection";
import { GenericResponseStatus } from "@/types/api";

export type IBookingApartmentProps = IApartmentData & { key: string };

const BookingDates = dynamic(
  () => import("../../components/booking/BookingDates"),
);

export enum EApartmentBookingErrorType {
  USER_INQUIRY_NOT_AVAILABLE = "USER_INQUIRY_NOT_AVAILABLE",
  INQUIRY_ACTION_FAILED = "INQUIRY_ACTION_FAILED",
  SELECTED_DATES_NOT_AVAILABLE = "SELECTED_DATES_NOT_AVAILABLE",
}

const Page = (apartmentData: IBookingApartmentProps) => {
  const {
    description,
    images,
    displayName,
    name,
    mainFeature,
    maxPeople,
    type: apartmentType,
  } = apartmentData;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const { data: excludedDatesRanges, error: excludedDatesRangesError } = useSWR(
    `/api/bookings/${name}`,
    aparmentBookingsFetcher,
    { revalidateOnFocus: false }
  );
  const [isPageProcessing, setIsPageProcessing] = useState(false);
  const [userInquiryRequestSent, setUserInquiryRequestSent] = useState(false);
  const [datesSelected, setSelectedDates] =
    useState<BookeableValidPeriod | null>(null);
  const [userContactData, setUserContactData] = useState<UserInquiry | null>(null);
  const [pageErrors, setPageErrors] = useState<EApartmentBookingErrorType[]>(
    []
  );
  const { defaultDates, bookeableDefaultDates, pageDefaultDatesError } =
    usePageDefaultDates({
      excludedDatesRanges,
    });

  const onDatesSelected = useCallback((dates: BookeableValidPeriod | null) => {
    setSelectedDates(dates);
  }, []);

  const onUserConctactChange = useCallback((userContactData: UserInquiry | null) => {
    setUserContactData(userContactData);
  },[]);

  // cleans or set error depending date_selected data
  useEffect(() => {
    if (
      datesSelected &&
      pageErrors.includes(EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE)
    ) {
      // TODO think this better
      setPageErrors((prev) => prev.filter((err) => err !== EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE));
    }
  }, [datesSelected, pageErrors]);

  // cleans or set error depending user_inquiry data
  useEffect(() => {
    if (!userContactData) {
      setPageErrors((prev) => prev.concat(EApartmentBookingErrorType.USER_INQUIRY_NOT_AVAILABLE))
    } else {
      setPageErrors((prev) => prev.filter((err) => err !== EApartmentBookingErrorType.USER_INQUIRY_NOT_AVAILABLE));
    }
  }, [userContactData])

  const selectDatesAndCloseDrawer = useCallback((dates: BookeableValidPeriod | null) => {
    onDatesSelected(dates);
    if (router && dates) {
      updateQueryStringWithBookingDates(router, [dates.startDate, dates.endDate]);
    }
    dispatch({ type: "hide" });
  },[onDatesSelected, router]);

  // handles Notification component content
  const notification = useMemo(() => {
    if (userInquiryRequestSent) {
      return NOTIFICATION.SUCCESS_INQUIRY_ACTION;
    }
    const errorToNotify = pageErrors.find((error) => (error === EApartmentBookingErrorType.INQUIRY_ACTION_FAILED) || (error === EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE));
    if (errorToNotify) {
      if (errorToNotify === EApartmentBookingErrorType.INQUIRY_ACTION_FAILED) {
        return NOTIFICATION.FAILED_INQUIRY_ACTION;
      } else {
        return NOTIFICATION.FAILED_SELECTED_DATES_NOT_AVAILABLE;
      }
    }
    return null
  },[pageErrors, userInquiryRequestSent])
  
  // use reducer to get dispachers to be used on CTAs, where some CTAs will update whats shown on the PageDrawer
  const reducer = useCallback(
    (state: any, action: { type: any; payload?: any }) => {
      switch (action.type) {
        case IDrawerActionTypes.SHOW_EDIT_DATES: {
          if (!state) {
            return {
              title: (!isMobile) ? "Selecciona tus fechas de tu viaje" : "Selecciona tus fechas",
              component: (<Box w={'100%'}><BookingDates m="auto" mt="4" maxWidth={320} excludeDatesRanges={excludedDatesRanges} apartmentName={name} forceInline={true} 
                selectWithButtonFlow onDatesSelected={selectDatesAndCloseDrawer} defaultDates={datesSelected ? [datesSelected.startDate, datesSelected.endDate] : undefined}/></Box>),
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
    [datesSelected, excludedDatesRanges, isMobile, name, selectDatesAndCloseDrawer]
  );

  const [componentToShow, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    if (bookeableDefaultDates !== undefined) {
      onDatesSelected(bookeableDefaultDates);
    }
  }, [bookeableDefaultDates, onDatesSelected]);

  /**
   * ISSUE: #6
   * - Invalid dates (not existent, not valid booking date) => Redirects to /aparment/[apt]
   * - Valid Date but period already taken. Sets the page prop error to subseccions "already booked error status"
   */
  useEffect(() => {
    if (pageDefaultDatesError) {
      setPageErrors((prev) => prev.concat(EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE));
      if (
        pageDefaultDatesError ===
        EPageDefaultDatesErrorType.DEFAULT_DATES_INVALID
      ) {
        router.push(`/apartamento/${name}`);
        return;
      }
    }
  }, [pageDefaultDatesError, router, name]);

  // callback to post user_inqury. Checks for no errors and data should be available
  const postInquiry = useCallback(() => {
      if (datesSelected && name && userContactData && pageErrors.length === 0) {
        setIsPageProcessing(true);
        postUserInquiry({
          apartment: name,
          period: datesSelected,
          userContact: userContactData
        } as UserInquiryRequest).then((resp) => { 
          if (resp.isError || resp.status === GenericResponseStatus.ERROR) {
            setPageErrors((prev) => prev.concat(EApartmentBookingErrorType.INQUIRY_ACTION_FAILED));
          } else {
            setUserInquiryRequestSent(true);
          }
        }).finally(() =>  setIsPageProcessing(false))
      }
  }, [datesSelected, name, pageErrors, userContactData])


  return (
    <Box>
      <Layout>
        <Flex w={"full"} alignContent="center" gap={4} mt={2}>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Atras"
            isLoading={isPageProcessing}
            onClick={() => {
              setIsPageProcessing(true);
              //removes param bookApt that comes into query
              const { bookApt, ...restQuery } = router.query;
              router.push({
                pathname: `/apartamento/${name}`,
                query: restQuery,
              });
            }}
            _focus={{ boxShadow: "none" }}
            icon={<ArrowBackIcon />}
          />
          <Heading as="h2" size="lg">
            Envia tu consulta
          </Heading>
        </Flex>
        <Flex
          mt={4}
          alignItems={"flex-start"}
          justifyContent="space-between"
          position="relative"
          wrap={"wrap"}
          direction={{ base: "column-reverse", md: "row" }}
          px={{ base: 1, md: "unset" }}
        >
          <Flex
            w={{ base: "100%", md: "65%" }}
            alignItems={"flex-start"}
            direction="column"
          >
            {!isMobile && <Divider mb={4}/> }
            <TripSection
              w={"full"}
              numGuests={maxPeople}
              bookingPeriod={
                datesSelected
                  ? [datesSelected.startDate, datesSelected.endDate]
                  : defaultDates
              }
              onEditDates={() =>
                dispatch({
                  type: IDrawerActionTypes.SHOW_EDIT_DATES,
                  payload: datesSelected,
                })
              }
              invalidDates={
                !!pageErrors.find((err) => err ===EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE)
              }
            />
            <Divider my={6}/>
            {notification ? <NotificationSection notification={notification} m="auto" maxWidth={"sm"} minHeight={72} /> : <ContactUs onChange={onUserConctactChange} /> }
      
            <Divider my={6}/>
            {!userInquiryRequestSent && <Button isLoading={isPageProcessing} size={"lg"} alignSelf={{base: "center", md: "flex-start"}} variant="action" disabled={pageErrors.length !== 0 || userInquiryRequestSent} mb={4} onClick={postInquiry}>Envia tu consulta</Button>}
          </Flex>
          <Box
            w={{ base: "100%", md: "35%" }}
            position={{ base: "relative", md: "sticky" }}
            top={{ base: "unset", md: "40px" }}
          >
            <Box
              display="flex"
              alignItems={"center"}
              flexDirection={"column"}
              rounded={{ base: "none", md: "md" }}
              width={"fit-content"}
              margin="auto"
              padding={{ base: "unset", md: "24px" }}
              border={{ base: "none", md: "1px solid" }}
              borderColor="brand.500"
              minWidth="350px"
            >
              <ListingCard
                image={images.wide[0]}
                name={displayName}
                mainFeature={mainFeature}
                apartmentType={apartmentType}
              />
              {!isMobile && (
                <>
                  <Divider my={4} />
                  <DiscountsInformation w={"full"} />
                </>
              )}
            </Box>
            {isMobile && <Divider my={4} />}
          </Box>
        </Flex>
        <PageDrawer
          componentToShow={componentToShow}
          onHide={() => dispatch({ type: "hide" })}
        />
      </Layout>
    </Box>
  );
};

const BookingApartment = (apartmentData: IBookingApartmentProps) => {
  return (
    <>
      <Head>
        <title>{`Reserva ${apartmentData.displayName} - CalaCabana Hospedaje`}</title>
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

// Fetch Apartment data during build phase
// NextJS API Middleware is not available here
const getStaticProps: GetStaticProps<IBookingApartmentProps> = async ({
  params,
}) => {
  let props: IBookingApartmentProps | null = null;
  if (params?.bookApt) {
    props = {
      key: params?.bookApt as string,
      ...aparmentsData[params?.bookApt as "cala" | "cabana"],
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

// Return paths for pre built merchants during build phase
// redirects for disabled and aliased merchants handled in next.config.js
const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: APARTMENTS_BUILD.map((apartment: string) => ({
      params: { bookApt: apartment },
    })),
    fallback: false,
  };
};

export { getStaticPaths, getStaticProps };

export default BookingApartment;
