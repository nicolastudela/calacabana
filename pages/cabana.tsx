import { Box} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from 'next/head'
import cala_wide_1 from "../public/images/cala/wide/cala-1.jpeg";
import cala_wide_2 from "../public/images/cala/wide/cala-2.jpeg";
import cala_wide_3 from "../public/images/cala/wide/cala-3.jpeg";
import cala_wide_4 from "../public/images/cala/wide/cala-4.jpeg";
import cala_wide_5 from "../public/images/cala/wide/cala-5.jpeg";
import cala_wide_6 from "../public/images/cala/wide/cala-6.jpeg";
import cala_wide_7 from "../public/images/cala/wide/cala-7.jpeg";
import cala_wide_8 from "../public/images/cala/wide/cala-8.jpeg";

import { useState } from "react";
import Layout from "../components/Layout";
const images = [
  {
    img: cala_wide_1,
    alt: "Apartamento Cala - comedor",
  },
  {
    img: cala_wide_2,
    alt: "Apartamento Cala - living",
  },
  {
    img: cala_wide_3,
    alt: "Apartamento Cala - vista"
  },
  {
    img: cala_wide_4,
    alt: "Apartamento Cala - dormitorio"
  },
  {
    img: cala_wide_5,
    alt: "Apartamento Cala - baño"
  },
  {
    img: cala_wide_6,
    alt: "Apartamento Cala - living/comendor de noche"
  },
  {
    img: cala_wide_7,
    alt: "Apartamento Cala - ambiente calido con salamandra"
  },
  {
    img: cala_wide_8,
    alt: "Apartamento Cala - segundo dormitorio"
  },
];

const Cala: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cala Cabana - Departamento Cabana</title>
        <meta
          name="description"
          content="Servicio de hospedaje. Mirador de las sierras, en las sierras"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box>

        </Box>
      </Layout>
    </>
  );
};

export default Cala;