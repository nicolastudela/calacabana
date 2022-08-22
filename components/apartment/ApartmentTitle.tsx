import { StarIcon } from "@chakra-ui/icons";
import { HStack, Heading, Flex, Text, Spacer, Box, BoxProps } from "@chakra-ui/react";


export interface IApartmentTitleProps {
  displayName: string;
  mainFeature: string;
  maxPeople: string;
  rooms: string;
  beds: string;
}

const ApartmentTitle = ({
  displayName,
  mainFeature,
  maxPeople,
  rooms,
  beds,
  ...rest
}: IApartmentTitleProps & BoxProps) => (
  
  <Box {...rest} width={"100%"}>
    <Flex direction="row" justifyContent="space-between" width={"100%"}>
      <Heading
        display="inline-block"
        ml={-0.5}
        size={"lg"}
      >{`Departamento ${displayName}`}</Heading>
      <Flex alignItems="center">
        <Heading size={"md"}>5.0</Heading>
        <StarIcon ml={1} />
      </Flex>
    </Flex>
    <Flex wrap={"wrap"} alignItems="center" justifyContent={"flex-start"}>
      <Text>{mainFeature}</Text>
      <Spacer/>
      <Text fontSize="sm">{`${maxPeople} huéspedes - ${rooms} ambientes - ${beds} camas`}</Text>
    </Flex>
  </Box>
);

export default ApartmentTitle;
