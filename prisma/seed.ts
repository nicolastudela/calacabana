import { stubApartmentData } from "@/shared/mocks/apartmentsDataStubber";
import { IAparmentAmenitiesGroup, IAparmentImages, IApartmentData, IApartmentImage } from "../types/shared";
import { Apartment, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({
  log: ['warn', 'error','info', 'query']
})



const fromSharedDataToPrismaSchema = ({
  beds,
  description,
  displayName,
  mainFeature,
  name,
  maxPeople,
  rooms,
  type,
  priority,
}: IApartmentData) => {
  const data = {
    beds: Number.parseInt(beds),
    description,
    displayName,
    mainFeature,
    name,
    maxPeople: Number.parseInt(maxPeople),
    rooms: Number.parseInt(rooms),
    type,
    priority,
    googleCalendarId:
      name === "cala"
        ? process.env.CALA_GOOGLE_CALENDAR_ID
        : name === "cabana"
        ? process.env.CABANA_GOOGLE_CALENDAR_ID
        : null,
  } as Omit<Apartment, "id">;
  return data;
};

const fromImagesToPrismaSchema = (images: IAparmentImages) => {
  const fromImageToPRismaSchema = (
    image: IApartmentImage,
    idx: number,
    wide: boolean
  ) => {
    return {
      alt: image.alt,
      height: image.height,
      position: idx,
      src: image.src,
      wide: wide,
      width: image.width,
    };
  };
  return images.square
    .map((img, idx) => fromImageToPRismaSchema(img, idx, false))
    .concat(
      images.wide.map((img, idx) => fromImageToPRismaSchema(img, idx, true))
    );
};

const fromAmenityGropToPrismaScheme = (amenties: IAparmentAmenitiesGroup[] = []) => {
  return amenties.flatMap(({name, amenities, priority}: IAparmentAmenitiesGroup) => {
    return amenities.map(am => {
      return {
        amenity: {
          connectOrCreate: {
            create: {
              name: am.name,
              group: {
                connect: {
                  name: name
                }
              }
            },
            where: {
              name: am.name,
            },
          }
        },
        description: am.description,
        highlighted: am.highlighted,
        priority: am.priority
      }
    })
  })
}


async function main() {
  let outputResponse: Record<string, any> = {}

  const createAmGroups = await prisma.amenitiesGroup.createMany({
    data: [
      { name: "Baño"},
      { name: "Dormitorio y lavadero" },
      { name: "Entretenimiento" },
      { name: "Calefaccion y refrigeracion" },
      { name: "Internet y oficina" },
      { name: "Cocina y comedor" },
      { name: "Al aire libre" },
      { name: "Estacionamiento e instalaciones" },
      { name: "Vistas panoramicas" },
      { name: "Seguridad en el hogar" },
      { name: "Características de la ubicación" },
      { name: "Exterior" },
      { name: "Servicios" },
    ],
  });

  outputResponse.amenityGroupsCreated =  createAmGroups.count

  const staticApts = [stubApartmentData("cala"), stubApartmentData("cabana")]

  const singleAptsPromise = await staticApts.reduce((prev: Promise<any>, curr) => {
    return prev.then(async () => {
      const newApt = await prisma.apartment.create({
        select: {
          id: true,
          name: true,
        },
        data: {
          ...fromSharedDataToPrismaSchema(curr),
          ...{
            images: {
              create: fromImagesToPrismaSchema(curr.images),
            },
            amenities: {
              create: fromAmenityGropToPrismaScheme(curr.amenities)
            },
          },
        },
      })
      outputResponse = {...outputResponse, ...{[newApt.name]: newApt.id}}
      return outputResponse
    })
  }, Promise.resolve())

  console.log(singleAptsPromise)

  if (singleAptsPromise) {
    const compound =  stubApartmentData('calacabana')
    const compoundProm = await prisma.apartment.create({
      select: {
        id: true,
        name: true,
      },
      data: {
        ...fromSharedDataToPrismaSchema(compound),
        ...{
          images: {
            create: fromImagesToPrismaSchema(compound.images),
          },
          amenities: {
            create: fromAmenityGropToPrismaScheme(compound.amenities)
          },
          subAparments: {
            connect: [{name: 'cala'}, {name: 'cabana'}]
          },
        },
      },
    })

    outputResponse = {...outputResponse, ...{[compoundProm.name]: compoundProm.id} }
  }

  console.log(outputResponse);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })