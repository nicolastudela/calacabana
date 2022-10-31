import Layout from "@/components/Layout";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Image from "next/image";

const Page404 = ({}) => {
  return (
    <Box>
      <Layout>
        <Flex h={"80"} wrap="wrap" justifyContent="space-evenly" alignItems={"center"}> 
          <Image
            src={"/images/404-error.svg"}
            width={208}
            height={100}
            alt={"404"}
            title="Page Not Found"
            layout="fixed"
            />
          <Heading textAlign={"center"}>Uy! no encontramos la pagina que buscabas</Heading>
        </Flex>
        <Spacer mb={40} display={{base: "none", md: "block"}}/>
      </Layout>
    </Box>
  );
};

export default Page404;