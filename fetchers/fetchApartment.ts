
import { GenericResponseStatus, ISuccessGenericRes, IGenericErrorRes } from "@/server/types";
import { IApartment } from "@/types/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { get } from "@/lib/httpClient";
import { MOCKED_APARTMENTS_NAMES, stubApartmentData, stubApartmentSlugs } from "@/shared/mocks/apartmentsDataStubber";


const APARTMENT_API_PATH = `${getBaseUrl()}/api/apartments`


const fetchApartment = async (name: string) => {

  if (!name) {
    console.error(`Apartment name not defined`)
    return null;
  }

  const response = await get(`${APARTMENT_API_PATH}/${name}`);

  if (response.status === GenericResponseStatus.SUCCESFUL) {
    return (response as ISuccessGenericRes<IApartment>).data;
  } else {
    const errorResponse = (response as IGenericErrorRes)
    const error = errorResponse.error
    console.error(`Error while getting the apartment: ${error}`)
    return null;
  }
}

export default fetchApartment;