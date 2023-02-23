import {
  Box,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { IAparmentAmenitiesGroup } from "@/types/shared";
import ApartmentFeatures, {
  ApartmentFeature,
  ApartmentFeatureIcon,
} from "@/features/apartment/ApartmentFeatures";
import amenityIconMapper from "@/features/amenities/utils/amenitiesIconMapper";

const AllAmenities = ({
  amenities,
}: {
  amenities: IAparmentAmenitiesGroup[];
}) => {
  return (
    <Box w={{ base: "full", md: "container.md" }} mx="auto">
    <Flex direction={"column"}>
      {amenities.map((group) => (
        <Flex direction={"column"} key={group.name} gap={2}>
          <Heading as="h2" size={"md"} mt={6} mb={4}>
            {group.name}
          </Heading>
          <ApartmentFeatures>
            {group.amenities.map((amenity, index) => (
              <span key={`${amenity.name}-${index}`}>
                <ApartmentFeature
                  title={amenity.name}
                  subtitle={amenity.description}
                >
                  <ApartmentFeatureIcon as={amenityIconMapper(amenity.name)} />
                </ApartmentFeature>
                <Divider my={2} />
              </span>
            ))}
          </ApartmentFeatures>
        </Flex>
      ))}
    </Flex>
  </Box>)
};

export default AllAmenities;
