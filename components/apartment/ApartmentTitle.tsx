import { StarIcon } from "@chakra-ui/icons";
import { StackProps, HStack, Heading, Flex, Text, Spacer } from "@chakra-ui/react";
import { IApartmentData } from "../../types/shared";


export interface IApartmentTitleProps {
  name: string;
  mainFeature: string;
  maxPeople: string;
  rooms: string;
  beds: string;
}

const ApartmentTitle = ({
  name,
  mainFeature,
  maxPeople,
  rooms,
  beds,
  ...rest
}: IApartmentTitleProps & StackProps) => (
  <>
    <HStack justifyContent="space-between" {...rest} width={"100%"}>
      <Heading
        display="inline-block"
        ml={-0.5}
        size={"lg"}
      >{`Departamento ${name}`}</Heading>
      <Flex>
        <Heading size={"sm"}>5.0</Heading>
        <StarIcon ml={1} />
      </Flex>
    </HStack>
    <Flex wrap={"wrap"} alignItems="center">
      <Text>{mainFeature}</Text>
      <Spacer/>
      <Text fontSize="sm">{`${maxPeople} huéspedes - ${rooms} ambientes - ${beds} camas`}</Text>
    </Flex>
  </>
);

export default ApartmentTitle;
