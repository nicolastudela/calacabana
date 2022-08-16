import { BookingPeriod } from "@/types/shared";
import { Flex, FlexProps, Heading, Link, Spacer, Text } from "@chakra-ui/react";
import { format } from "date-fns";

import esLocale  from 'date-fns/locale/es'


export interface TripSectionProps  {
  numGuests: string;
  bookingPeriod: BookingPeriod | undefined;
  onEditDates: () => void;
  invalidDates: boolean;
} 

const formatPeriod = (bookPeriod: BookingPeriod | undefined) => {
  if (bookPeriod) {
  return `${format(bookPeriod[0], "dd 'de' MMMM", {locale: esLocale})} al ${format(bookPeriod[1], "dd 'de' MMMM", {locale: esLocale})}`
  } else {
    return '';
  }
}

const TripSection = ({numGuests, bookingPeriod, onEditDates, invalidDates, ...rest}: TripSectionProps & FlexProps ) => (
  <Flex direction={"column"} {...rest} gap={6}>
    <Heading as="h3" size="md">Tu viaje</Heading>
    <Flex direction={"row"} justifyContent="space-between">
      <Flex direction={"column"} gap={2}>
        <Heading as="h4" size="sm">Fechas</Heading>
        <Text>{formatPeriod(bookingPeriod)}</Text>
        {invalidDates && (<Text color={"red.500"}>Estas fechas no estan mas disponibles</Text>)}
      </Flex>
      <Link onClick={onEditDates}>Editar</Link>
    </Flex>
    <Flex direction={"column"} justifyContent="space-between">
      <Flex direction={"column"} gap={2}>
        <Heading as="h4" size="sm">Viajeros</Heading>
        <Text>{numGuests} Viajeros</Text>
      </Flex>
      <Spacer/>
    </Flex>
  </Flex>
)

export default TripSection;