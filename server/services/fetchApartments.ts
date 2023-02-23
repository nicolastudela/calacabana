import {
  stubApartmentSlugs,
  stubApartmentData,
  MOCKED_APARTMENTS_NAMES,
} from "@/shared/mocks/apartmentsDataStubber";
import sanitizeApartment from "../sanitazers/sanitizePrismaApartment";
import prisma from "@/lib/prisma";

export const FETCH_APARTMENTS_INCLUDE_OPTIONS = ['images','amenities'] as const
export type FETCH_APARTMENTS_INCLUDE_OPTION = typeof FETCH_APARTMENTS_INCLUDE_OPTIONS[number]

const fetchApartments = async (options: { includes: FETCH_APARTMENTS_INCLUDE_OPTION[]} | null) => {
  if (process.env.NEXT_PUBLIC_MOCK_APARTMENTS_DATA === "1") {
    return stubApartmentSlugs().map((slug) =>
      stubApartmentData(slug as MOCKED_APARTMENTS_NAMES)
    );
  }

  const amenities =
    !!options && options.includes.includes("amenities")
      ? {
          include: {
            amenity: {
              include: {
                group: true,
              },
            },
          },
        }
      : false;

  const apartments = await prisma.apartment.findMany({
    include: {
      ...{
        images:!!options && options.includes.includes("images"),
      },
      ...amenities,
    },
  });

  return apartments.map((apt) => sanitizeApartment(apt)).sort((a,b) => (b.priority || 0) - (a.priority || 0))
};

export default fetchApartments;
