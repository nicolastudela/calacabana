import { useEffect, useState, useCallback } from "react";
import useSWR from "swr";
import { GetStaticPaths, GetStaticProps } from "next/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";

import aparmentsData, { APARTMENTS_BUILD } from "@/shared/apartmentsData";
import { IApartmentData } from "@/types/shared";
import Layout from "@/components/Layout";
import aparmentBookingsFetcher from "@/shared/fetchers/aparmentBookingsFetcher";
import usePageDefaultDates, {
  EPageDefaultDatesErrorType,
} from "@/shared/hooks/usePageDefaultDates";
import { BookeableValidPeriod } from "@/types/types";
import createBookeableValidPeriod from "@/shared/model/BookingValidPeriod";
import ListingCard from "@/components/apartment/ListingCard";
import DiscountsInformation from "@/components/DiscountsInformation";

export type IBookingApartmentProps = IApartmentData & { key: string };

enum EApartmentBookingErrorType {
  SELECTED_DATES_NOT_AVAILABLE = "SELECTED_DATES_NOT_AVAILABLE",
}

const Page = (apartmentData: IBookingApartmentProps) => {
  const {
    description,
    images,
    displayName,
    name,
    mainFeature,
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

  const [datesSelected, setSelectedDates] =
    useState<BookeableValidPeriod | null>(null);
  const [pageError, setPageError] = useState<EApartmentBookingErrorType | null>(
    null
  );
  const { defaultDates, pageDefaultDatesError } = usePageDefaultDates({
    excludedDatesRanges,
  });

  const onDatesSelected = useCallback(
    (dates: BookeableValidPeriod | null) => {
      setSelectedDates(dates);

      if (
        dates &&
        pageError === EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE
      ) {
        // TODO think this better
        setPageError(null);
      }
    },
    [pageError]
  );

  /**
   * ISSUE: #6
   * - Invalid dates (not existent, not valid booking date) => Redirects to /aparment/[apt]
   * - Valid Date but period already taken. Sets the page prop error to subseccions "already booked error status"
   */
  useEffect(() => {
    if (defaultDates && !pageDefaultDatesError) {
      onDatesSelected(createBookeableValidPeriod(defaultDates));
    }
    if (pageDefaultDatesError) {
      setPageError(EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE);
      if (
        pageDefaultDatesError ===
        EPageDefaultDatesErrorType.DEFAULT_DATES_INVALID
      ) {
        router.push(`/apartamento/${name}`);
        return;
      }
    }
  }, [defaultDates, pageDefaultDatesError, onDatesSelected, router, name]);

  //sets the page prop error to subseccions "SELECTED_DATES_NOT_AVAILABLE"
  useEffect(() => {
    if (pageDefaultDatesError) {
      setPageError(EApartmentBookingErrorType.SELECTED_DATES_NOT_AVAILABLE);
    }
  }, [pageDefaultDatesError]);

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
          <Heading size="lg">Envia tu consulta</Heading>
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
            <Box bgColor={"lightblue"} w="100%" height={"500px"}>
              {pageError ? pageError : "good"}
            </Box>
            <Box bgColor={"pink"} w="100%" height={"500px"}>
              {datesSelected
                ? `checkin ${datesSelected.startDate} checkout ${datesSelected.endDate}`
                : null}
            </Box>
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
              // borderTop="0"
              // borderLeft="0"
              // borderBottom={{ base: "none", md: "2px solid" }}
              // borderRight={{ base: "none", md: "2px solid" }}
              border={{base: "none", md:"1px solid"}}
              borderColor="brand.500"
              // shadow={{ base: "none", md: "brand" }}
              minWidth="350px"
            >
              <ListingCard
                image={images.wide[0]}
                name={displayName}
                mainFeature={mainFeature}
                apartmentType={apartmentType}
              />
              { !isMobile && <>
                <Divider my={4} />
                <DiscountsInformation w={"full"}/>
              </>
              }
            </Box>
            { isMobile &&<Divider my={4} /> }
          </Box>
        </Flex>
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
