import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

const Page404 = ({}) => {
  return (
    <>
      <Head>
        <title>Página no encontrada - Cala Cabana</title>
        <meta name="description" content="La página que buscás no existe. Volvé al inicio de Cala Cabana para ver nuestros departamentos vacacionales en Tanti, Córdoba." />
        <meta name="robots" content="noindex" />
      </Head>
      <Box>
          <Flex h={"80"} wrap="wrap" justifyContent="space-evenly" alignItems={"center"}> 
            <Image
              src={"/images/404-error.svg"}
              width={208}
              height={100}
              alt="Página no encontrada - ilustración de error 404"
              title="Página no encontrada"
              />
            <Heading as="h1" textAlign={"center"}>Uy! no encontramos la página que buscabas</Heading>
          </Flex>
          <Spacer mb={40} display={{base: "none", md: "block"}}/>
      </Box>
    </>
  )
};

export default Page404;