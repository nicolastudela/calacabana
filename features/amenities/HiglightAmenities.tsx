import { Button } from "@chakra-ui/react";
import { useMemo } from "react";

import basicAmenitiesIconMapper from "@/features/amenities/utils/highlightAmenitiesIconMapper"
import {FeatureList, Feature, FeatureIcon } from "@/components";
import { IAmenitiesGroup } from "./types";

const HiglightAmenities = ({ amenities, onExpand} : { amenities: IAmenitiesGroup[], onExpand: () => void}) => {
  const allAmenities = useMemo(() => {
    return amenities?.flatMap((group) => group.amenities)
  }, [amenities])

  const highlights = useMemo(() => {
    return allAmenities?.filter((amenity) => amenity.highlighted)
  }, [allAmenities])


  return (
    <>
    <FeatureList h={{base: "100%", md: "7.5rem"}} flexWrap="wrap" w={"full"} gap={2}>
      {highlights.map((amenity) => (
        <Feature key={amenity.name} title={amenity.name}>
          <FeatureIcon as={basicAmenitiesIconMapper(amenity.name)} />
      </Feature>))}
    </FeatureList>
    <Button variant="outline" colorScheme={"brand"} onClick={onExpand}>Mostrar los {allAmenities.length} servicios</Button>
    </>
  )

}

export default HiglightAmenities;