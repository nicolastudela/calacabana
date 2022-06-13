import { Button } from "@chakra-ui/react";
import { useMemo } from "react";
import { IAparmentAmenitiesGroup } from "../../types/shared";

import basicAmenitiesIconMapper from "../utils/highlightAmenitiesIconMapper"
import ApartmentFeatures, { ApartmentFeature, ApartmentFeatureIcon } from "../apartment/ApartmentFeatures";

const HiglightAmenities = ({ amenities, onExpand} : { amenities: IAparmentAmenitiesGroup[], onExpand: () => void}) => {
  const allAmenities = useMemo(() => {
    return amenities?.flatMap((group) => group.amenities)
  }, [amenities])

  const highlights = useMemo(() => {
    return allAmenities?.filter((amenity) => amenity.highlighted)
  }, [allAmenities])


  return (
    <>
    <ApartmentFeatures h={{base: "100%", md: "7.5rem"}} flexWrap="wrap" w={"full"}>
      {highlights.map((amenity) => (
        <ApartmentFeature key={amenity.name} title={amenity.name}>
          <ApartmentFeatureIcon as={basicAmenitiesIconMapper(amenity.name)} />
      </ApartmentFeature>))}
    </ApartmentFeatures>
    <Button variant="outline" colorScheme={"brand"} onClick={onExpand}>Mostrar los {allAmenities.length} servicios</Button>
    </>
  )

}

export default HiglightAmenities;