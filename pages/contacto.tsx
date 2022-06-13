import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from 'next/head'
import Layout from "../components/Layout";


const Contacto: NextPage = () => {
  return (
    <>
      <Head>
      <title>Cala Cabana - Encontranos</title>
        <meta
          name="description"
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Box>
          <Layout>
            <AspectRatio ratio={5 / 3} w="100%" mt={"0 !important"}>
              <Image
                src="/images/dia-cala-6-principal.jpeg"
                alt="naruto"
                objectFit="cover"
              />
            </AspectRatio>
          </Layout>
        </Box>
    </>
  );
};

export default Contacto;