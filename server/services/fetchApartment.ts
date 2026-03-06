import sanitizeApartment from "../sanitazers/sanitizePrismaApartment";
import prisma from "@/lib/prisma";
import { MOCKED_APARTMENTS_NAMES, stubApartmentData, stubApartmentSlugs } from "@/shared/mocks/apartmentsDataStubber";

const fetchApartment = async (name: string) => {

  if (process.env.NEXT_PUBLIC_MOCK_APARTMENTS_DATA === "1"){
    if (stubApartmentSlugs().includes(name as any)) {
      return stubApartmentData(name as MOCKED_APARTMENTS_NAMES)
    } else {
      console.error(`Apartment name not defined`)
      return null;
    }
  }

  const apartment = await prisma.apartment.findUnique({
    where: {
      name,
    },
    include: {
      images: true,
      amenities: {
        include: {
          amenity: {
            include: {
              group: true,
            },
          },
        },
      },
    },
  });

  return apartment && sanitizeApartment(apartment)
}

export default fetchApartment;