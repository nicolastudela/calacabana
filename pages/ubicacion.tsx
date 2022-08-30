import Layout from "@/components/Layout";
import { Box, Divider, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Map from "@/components/Map";


const images = {
  detail: {
      src: "/images/detalles/detalles-naturaleza-15.jpeg",
      alt: "Servicio de hospedaje Calacabana - Naturaleza",
      width: 1280,
      height: 853,
    },
  }


const Page = ({}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box>
      <Layout>
      {!isMobile && <Divider /> }
        <Flex
          alignItems={"flex-start"}
          direction="column"
          ml={2} mt={4}
        >

          
          <Flex direction={"row"} wrap="wrap" w={"100%"} alignItems="center" justifyContent={"space-between"} gap={1}>
            <Box w={{ base: "100%", md: "49%" }} h={{ base: "auto", md: "80" }} verticalAlign="center">
              <Heading size={"lg"} as="h1" mb={2}>
                Ubicacion
              </Heading>
              <Text >
                El complejo se encuentra en barrio semi-privado KEOKEN, en la ciudad de Tanti. El barrio cuenta con salida al rio. <br/><br/>
                Córdoba se encuentra a 36 km de la casa, mientras que Villa Carlos Paz está a 9 km. El aeropuerto más cercano es el aeropuerto internacional Ingeniero Aeronáutico Ambrosio L.V. Taravella, ubicado a 33 km
              </Text>
            </Box>

            <Box w={{ base: "100%", md: "40%"}} h={"80"} position="relative">
              <Image src={images.detail.src} alt={images.detail.alt} width={images.detail.width} height={images.detail.height} layout="fill" />  
            </Box>
          </Flex>
          <Divider my={4} />
        </Flex>
        <Map mb={2} />
      </Layout>
    </Box>
  );
};
``;
const Ubicacion = ({}) => {
  return (
    <>
      <Head>
        <title>
          Ubicacion - Cala Cabana: Servicio de alojamiento y alquileres
          vacacionales en Tanti, Cordoba
        </title>
        <meta
          name="description"
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page />
    </>
  );
};

export default Ubicacion;
