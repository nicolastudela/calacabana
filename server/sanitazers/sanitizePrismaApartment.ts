import { IApartment, IAmenitiesGroup, IAmenity, AMENITIES_GROUP, IImage } from "@/types/types";

import {
  Apartment as PrismaApartment,
  Amenitiy,
  ApartmentImage,
  AmentiesOnAparments,
  AmenitiesGroup,
} from "@prisma/client";


export type PrismaAparmentWithImgAndAmenties = PrismaApartment & {
  images?: ApartmentImage[];
  amenities?: (AmentiesOnAparments & {
    amenity: Amenitiy & {
      group: AmenitiesGroup;
    };
  })[];
};

export const sanitizePrismaImages = (images: ApartmentImage[]) => {
  type ImgWithPosition = IImage & { position: number };
  let aptImages = images.reduce(
    (prev, curr) => {
      const img: ImgWithPosition = {
        alt: curr.alt,
        height: curr.height,
        src: curr.src,
        width: curr.width,
        position: curr.position,
      };
      if (curr.wide) {
        prev.wide.push(img);
      } else {
        prev.square.push(img);
      }
      return prev;
    },
    {
      wide: [],
      square: [],
    } as { wide: ImgWithPosition[]; square: ImgWithPosition[] }
  );

  aptImages.square.sort((a, b) => a.position - b.position);
  aptImages.wide.sort((a, b) => a.position - b.position);


  return aptImages;
}

export const sanitizePrismaAmenties = (amenities: (AmentiesOnAparments & {
  amenity: Amenitiy & {
    group: AmenitiesGroup;
  };
})[]) => {
  const amenitiesGroups: IAmenitiesGroup[] = amenities.reduce(
    (prev: IAmenitiesGroup[], curr) => {
      const groupIdx = prev
        .map((grp) => grp.name as string)
        .indexOf(curr.amenity.group.name);
      if (groupIdx >= 0) {
        prev[groupIdx].amenities = prev[groupIdx].amenities.concat({
          name: curr.amenity.name,
          description: curr.description,
          highlighted: curr.highlighted,
          priority: curr.priority,
        } as IAmenity);
        return prev;
      } else {
        return prev.concat({
          name: curr.amenity.group.name as AMENITIES_GROUP,
          amenities: [
            {
              name: curr.amenity.name,
              description: curr.description,
              highlighted: curr.highlighted,
              priority: curr.priority,
            } as IAmenity,
          ],
        });
      }
    },
    [] as IAmenitiesGroup[]

  );

  return amenitiesGroups;

}


const sanitizeApartment = ({
  amenities,
  images,
  beds,
  description,
  displayName,
  mainFeature,
  maxPeople,
  rooms,
  name,
  type,
  priority,
}: PrismaAparmentWithImgAndAmenties) => {
  let apt: IApartment;

  apt = {
    beds: beds.toString(),
    amenities: amenities && sanitizePrismaAmenties(amenities),
    description: description,
    displayName: displayName,
    mainFeature: mainFeature,
    maxPeople: maxPeople.toString(),
    rooms: rooms.toString(),
    name: name,
    type: type,
    images: images ? sanitizePrismaImages(images) : { wide: [], square: []},
    priority,
  };

  return apt;
};

export default sanitizeApartment;