import {
  Container,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

type GeolocationPositionWithMethod = GeolocationPosition & { method: string };
type GeolocationPositionErrorWithMethod = {
  method: string;
  timestamp: number;
  error: GeolocationPositionError
};


const isDev = process.env.NODE_ENV === "development"

const INTERVAL_TIME_MS = 5000;

const Page = () => {
  const [trackings, setTrackings] = useState<GeolocationPositionWithMethod[]>(
    []
  );
  const [errors, setErrors] = useState<GeolocationPositionErrorWithMethod[]>(
    []
  );
  const [watchPositionId, setWatchPositionId] = useState<Number>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const trackWatchPositionEvent = useCallback((event: GeolocationPosition) => {
    setTrackings((trackings) => {
      return trackings.concat([
        {
          coords: event.coords,
          timestamp: event.timestamp,
          method: "WATCH_POSITION",
        },
      ]);
    });
  }, []);

  const trackIntervalEvent = useCallback((event: GeolocationPosition) => {
    console.log(event)
    setTrackings((trackings) => {
      return trackings.concat([
        {
          coords: event.coords,
          timestamp: event.timestamp,
          method: "INTERVAL",
        },
      ])
    }
    );
  }, []);

  const trackWatchPositionEventError = useCallback(
    (event: GeolocationPositionError) => {
      setErrors((errors) => errors.concat([{ method: "WATCH_POSITION", timestamp: new Date().getMilliseconds(), error: event }]));
    },
    []
  );

  const trackIntervalEventError = useCallback(
    (event: GeolocationPositionError) => {
      setErrors((errors) => errors.concat([{ method: "INTERVAL", timestamp: new Date().getMilliseconds(), error: event }]));
    },
    []
  );

  useEffect(() => {
    if (!!trackIntervalEvent && !!trackIntervalEventError) {
      const id = setInterval(() => {
        
        navigator.geolocation.getCurrentPosition(
          trackIntervalEvent,
          trackIntervalEventError,
          options
        );
      }, INTERVAL_TIME_MS);
      // setIntervalId(id);

      return () => {
        clearInterval(id);
      };
    }
  }, [trackIntervalEvent, trackIntervalEventError]);

  useEffect(() => {
    if (!!trackWatchPositionEvent && !!trackWatchPositionEventError) {
      const watchPositionId = navigator.geolocation.watchPosition(
        trackWatchPositionEvent,
        trackWatchPositionEventError,
        options
      );
      // setWatchPositionId(watchPositionId);
      return () => {
        navigator.geolocation.clearWatch(watchPositionId);
      };
    }
  }, [trackWatchPositionEvent, trackWatchPositionEventError]);

  // console.log(trackings);
  return (
    <Container maxW={"full"}>
      <Tabs size={"lg"}>
        <TabList>
          <Tab>Trackings</Tab>
          <Tab>Errors</Tab>
        </TabList>
        <TabPanels>
        <TabPanel>
          <TableContainer>
            <Table variant="simple" size="lg">
              <TableCaption>Sucessfull Trackings</TableCaption>
              <Thead>
                <Tr>
                  <Th>Method</Th>
                  <Th>Timestamp</Th>
                  <Th>Coords</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trackings.map((tracking) => (
                  <Tr key={`${tracking.method}-${tracking.timestamp}${isDev ? Math.random() * 1000 : ''}`}>
                    <Td>{tracking.method}</Td>
                    <Td>{new Date(tracking.timestamp).toUTCString()}</Td>
                    <Td>
                      {JSON.stringify({
                        alt: tracking.coords.altitude,
                        lng: tracking.coords.longitude,
                        lat: tracking.coords.longitude,
                        speed: tracking.coords.speed,
                        head: tracking.coords.heading,
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel>
        <TableContainer>
            <Table variant="simple" size="lg">
              <TableCaption>Trackings erros</TableCaption>
              <Thead>
                <Tr>
                  <Th>Method</Th>
                  <Th>Timestamp</Th>
                  <Th>Error</Th>
                </Tr>
              </Thead>
              <Tbody>
                {errors.map((error) => (
                  <Tr key={`${error.method}-${error.timestamp}${isDev ? Math.random() * 1000 : ''}`}>
                    <Td>{error.method}</Td>
                    <Td>{new Date(error.timestamp).toUTCString()}</Td>
                    <Td>
                      {JSON.stringify({
                        PERMISSION_DENIED: error.error.PERMISSION_DENIED,
                        POSITION_UNAVAILABLE: error.error.POSITION_UNAVAILABLE,
                        TIMEOUT: error.error.TIMEOUT,
                        code: error.error.code,
                        message: error.error.message
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>           
        </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Page;
