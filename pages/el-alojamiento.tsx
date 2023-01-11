import Layout from "@/components/Layout";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Map from "@/components/Map";

const images = {
  nature: {
    src: "/images/detalles/naturaleza.jpeg",
    alt: "Servicio de hospedaje Calacabana - Naturaleza",
    width: 1280,
    height: 853,
  },
  dorm: {
    src: "/images/detalles/dormitorio.jpeg",
    alt: "Servicio de hospedaje Calacabana - Dormitorio",
    width: 1280,
    height: 853,
  },
  cactus: {
    src: "/images/detalles/cactus.jpeg",
    alt: "Servicio de hospedaje Calacabana - Cactus",
    width: 1280,
    height: 853,
  },
};


const seoTitle = `Sobre el Alojamiento - Cala Cabana: Servicio de alojamiento y alquileres vacacionales en Tanti, Cordoba`

const seoDescription = `El alojamiento cuenta con apartamentos diseñados al detalle, con terminaciones de calidad y equipados con todo lo que necesitas. 
El aire puro de las sierras en combinación de las facilidades del alojamiento hacen una composición perfecta para que puedas relajarte disfrutando de una espectacular vista a las sierras.          
  - Cala Cabana: Servicio de alojamiento seguro, alejado de la ciudad, en contacto con la naturaleza pero cerca de todo. Tanti, Cordoba -`;


const Page = ({}) => {
  return (
    <Box>
        <Divider display={{base: "none", md: "block"}}/>
        <Flex alignItems={"flex-start"} direction="column" ml={2} mt={4}>
          <Flex
            direction={"column"}
            wrap="wrap"
            w={"100%"}
            alignItems="center"
            justifyContent={"space-between"}
            gap={4}
            height={["auto","96"]}
          >
            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "auto", md: "100%" }}
              verticalAlign="center"
              direction={"column"}
            >
              <Heading size={"lg"} as="h1" mb={{base: 2, md: 10}}>
                Naturaleza
              </Heading>
              <Text>
                Queremos compartir nuestra amor por la naturaleza.
                <br />
                <br />
                Nuestra responsabilidad es con la flora y el cuidado de nuestra
                tierra. <br />
                <br />
                Creemos que un lugar inmerso en la vegetation, que conserva su
                vegetacion autoctona es ideal para disfrutar un tiempo de
                relajacion e inspiracion
              </Text>
            </Flex>

            <Box w={{ base: "100%", md: "48%" }} h={"96"} position="relative">
              <Image
                src={images.nature.src}
                alt={images.nature.alt}
                width={images.nature.width}
                height={images.nature.height}
              />
            </Box>
          </Flex>
          <Divider my={4} />
          <Flex
            direction={["column-reverse","column"]}
            wrap="wrap"
            w={"100%"}
            alignItems="center"
            justifyContent={"space-between"}
            gap={4}
            height={["auto","96"]}
          >
            <Box w={{ base: "100%", md: "48%" }} h={"96"} position="relative">
              <Image
                src={images.cactus.src}
                alt={images.cactus.alt}
                width={images.cactus.width}
                height={images.cactus.height}
              />
            </Box>
            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "auto", md: "100%" }}
              verticalAlign="center"
              direction={"column"}
            >
              <Heading size={"lg"} as="h1"mb={{base: 2, md: 10}}>
                Tranquilidad
              </Heading>
              <Text>
                El alojamiento situado en el Barrio Keoken provee la
                tranquilidad necesaria que da sentirse seguro , alejado de la
                ciudad y en contacto con la naturaleza.
                <br />
                <br />
                El aire puro de las sierras en combination de las facilidades
                del alojamiento hacen una composición perfecta para que puedas
                relajarte disfrutando de una espectacular vista a las sierras.
              </Text>
            </Flex>
          </Flex>
          <Divider my={4} />
          <Flex
            direction={"column"}
            wrap="wrap"
            w={"100%"}
            alignItems="center"
            justifyContent={"space-between"}
            gap={4}
            height={["auto","96"]}
          >
            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "auto", md: "100%" }}
              verticalAlign="center"
              direction={"column"}
            >
              <Heading size={"lg"} as="h1" mb={{base: 2, md: 10}}>
                Comodidad
              </Heading>
              <Text>
                Queremos que la gente que nos visita se sienta lo más
                confortable posible. Por eso nos hemos esforzado en crear un
                lugar cálido, cómodo que resalte la belleza natural del lugar.
                <br />
                <br />
                Los apartamentos están diseñados al detalle, con terminaciones
                de calidad y equipados con todo lo que necesitas.
              </Text>
            </Flex>

            <Box w={{ base: "100%", md: "48%" }} h={"96"} position="relative">
              <Image
                src={images.dorm.src}
                alt={images.dorm.alt}
                width={images.dorm.width}
                height={images.dorm.height}
              />
            </Box>
          </Flex>
        </Flex>
        <Map mb={2} />
    </Box>
  );
};


const ElAlojamiento = ({}) => {
  const canonicalPath = process.env.NEXT_PUBLIC_ORIGIN_PATH;
  return (
    <>
      <Head>
        <title>
          {seoTitle}
        </title>
        <meta
          name="description"
          content={seoDescription}
        />
        <meta
          key="og-title"
          property="og:title"
          content={seoTitle}
        />
        <meta
          key="og-description"
          property="og:description"
          content={seoDescription}
          />
         <meta
          property="og:image"
          content={`${canonicalPath}/images/homepage/square/1-homepage.jpeg`}
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page />
    </>
  );
};

export default ElAlojamiento;
