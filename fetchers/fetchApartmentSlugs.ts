import { getBaseUrl } from "@/utils/getBaseUrl";
import { get } from "@/lib/httpClient";
import { GenericResponseStatus, IGenericErrorRes, ISuccessGenericRes } from "@/types/api";


const APARTMENT_SLUGS_API_PATH = `${getBaseUrl()}/api/apartments/slugs`


export const fetchApartmentSlugs = async () => {

  const response = await get(`${APARTMENT_SLUGS_API_PATH}`);

  if (response.status === GenericResponseStatus.SUCCESFUL) {
    return (response as ISuccessGenericRes<string[]>).data
  } else {
    const errorResponse = (response as IGenericErrorRes)
    const error = errorResponse.error
    console.error(`Error while getting the apartment: ${error}`)
    return null;
  }
}