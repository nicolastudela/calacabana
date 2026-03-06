import {
  Box,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Feature, FeatureIcon, FeatureList } from "@/components"
import amenityIconMapper from './utils/amenitiesIconMapper'
import { IAmenitiesGroup } from "./types";

const AllAmenities = ({
  amenities,
}: {
  amenities: IAmenitiesGroup[];
}) => {
  return (
    <Box w={{ base: "full", md: "container.md" }} mx="auto">
    <Flex direction={"column"}>
      {amenities.map((group) => (
        <Flex direction={"column"} key={group.name} gap={2}>
          <Heading as="h2" size={"md"} mt={6} mb={4}>
            {group.name}
          </Heading>
          <FeatureList>
            {group.amenities.map((amenity, index) => (
              <span key={`${amenity.name}-${index}`}>
                <Feature
                  title={amenity.name}
                  subtitle={amenity.description}
                >
                  <FeatureIcon as={amenityIconMapper(amenity.name)} />
                </Feature>
                <Divider my={2} />
              </span>
            ))}
          </FeatureList>
        </Flex>
      ))}
    </Flex>
  </Box>)
};

export default AllAmenities;
