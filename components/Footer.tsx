import { Flex, VStack, Icon, Link, Text } from "@chakra-ui/react";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import NextLink from "next/link"


const Footer = () => (
  <Flex
    as="footer"
    borderTop={"solid 1px"}
    width="100%"
    justifyContent={"space-between"}
    pt={4}
    direction={{ base: "column-reverse", md: "row" }}
    alignItems="center"
  >
    <Text textAlign="center" fontSize={{ base: "xs", md: "md" }}>
      ©2022 CALABANA. Todos los derechos reservados
    </Text>
    <VStack pb={4}>
      <Link
        display={"flex"}
        alignItems={"center"}
        href="mailto: calacabana@gmail.com"
        aria-label={"Contactanos por mail"}
        isExternal
        rel="noopener noreferrer"
      >
        <Icon as={FaEnvelope} mr={1} />
        <Text>calacabana@gmail.com</Text>
      </Link>
      <Link
        display={"flex"}
        alignItems={"center"}
        href="https://www.instagram.com/calacabana"
        aria-label={"Calacabana en Instagram"}
        isExternal
        rel="noopener noreferrer"
      >
        <Icon as={FaInstagram} mr={1} />
        <Text>calacabana</Text>
      </Link>
      <Link
        display={"flex"}
        alignItems={"center"}
        href="https://wa.me/+5191153254124?text=Hola%20quiero%20averiguar%20sobre%20calacabana"
        aria-label={"Calacabana en Whatsapp"}
        isExternal
        rel="noopener noreferrer"
      >
        <Icon as={FaWhatsapp} mr={1} />
        <Text>11-5060-9152</Text>
      </Link>
      <NextLink href={"/el-alojamiento"} passHref><Link>Sobre el alojamiento</Link></NextLink>
      <NextLink href={"/ubicacion"} passHref><Link>Tanti, Córdoba, Argentina</Link></NextLink>
    </VStack>
  </Flex>
);

export default Footer;
