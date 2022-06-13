import { Box, Divider, DrawerBody, DrawerHeader, Flex, Heading } from "@chakra-ui/react";
import { IAparmentAmenitiesGroup } from "../../types/shared";
import ApartmentFeatures, { ApartmentFeature, ApartmentFeatureIcon } from "../apartment/ApartmentFeatures";
import amenityIconMapper from "../utils/amenitiesIconMapper";

const AllAmenities = ({ amenities }: { amenities: IAparmentAmenitiesGroup[]}) => (
    <Box w={{base: "full", md: "container.md"}} mx="auto">
      <Flex direction={"column"}>
        {amenities.map((group) => (
          <Flex direction={"column"} key={group.name} gap={2}>
          <Heading as="h2" size={"md"} mt={6} mb={4}>
            {group.name}
          </Heading> 
          <ApartmentFeatures>
            {group.amenities.map((amenity) => (
              <>
              <ApartmentFeature key={amenity.name} title={amenity.name} subtitle={amenity.description}>
                <ApartmentFeatureIcon as={amenityIconMapper(amenity.name)} />
              </ApartmentFeature>
              <Divider my={2}/>
              </>
            ))}
          </ApartmentFeatures>
          </Flex>
        ))}
      </Flex>
    </Box>
  );

export default AllAmenities;