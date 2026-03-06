import { AspectRatio, Box, Flex, Heading, Spinner } from "@chakra-ui/react"

const LoadingMapContainer = ({}) => {
  return (
    <Flex direction={"column"} gap={2}>
      <Heading as="h3" size="lg" my={2}>¿Dónde estamos?</Heading>
      <AspectRatio ratio={{base:16/9, md:21 / 9}}>
        <Box maxWidth={"200px"} minHeight={"200px"} margin="auto">
          <Spinner/>
        </Box>
      </AspectRatio>
    </Flex>
  )
}

export default LoadingMapContainer;