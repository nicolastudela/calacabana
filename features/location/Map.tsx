import { AspectRatio, AspectRatioProps, Box, Flex, Heading } from "@chakra-ui/react";

const Map = ({...rest}: AspectRatioProps) => {
  return (
    <Flex direction={"column"} gap={2}>
      <Heading as="h3" size="lg" my={2}>¿Dónde estamos?</Heading>
      <AspectRatio ratio={{base:16/9, md:21 / 9}} {...rest}>
        {/* //TODO (#23) UNCOMENT THIS, IT'S JUST TO NOT TO CALL MAPS ON TESTING*/}
        {(process.env.NEXT_PUBLIC_MOCK_MAPS && process.env.NEXT_PUBLIC_MOCK_MAPS === "1") ? (
          <Box w="100%" bgColor="lightBlue" />
        ) : (
          <iframe
            loading="lazy"
            // allowFullScreen
            width="100%"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCTg9tYXSO3iRg3_f-qVqpQhsDtRiOyR_Y&q=Cala+Cabana,Tanti,Cordoba&zoom=13"
          ></iframe>
        )}
      </AspectRatio>
    </Flex>
  );
};

export default Map;
