import { stubApartmentSlugs } from "@/shared/mocks/apartmentsDataStubber";

import prisma from "@/lib/prisma";

const fetchApartmentSlugs = async () => {
  if (process.env.NEXT_PUBLIC_MOCK_APARTMENTS_DATA === "1"){
    return stubApartmentSlugs()
  }
  
  const slugs = await prisma.apartment.findMany({ select: {
    name: true
  }})

  return slugs.map(apt => apt.name)
} 

export default fetchApartmentSlugs;