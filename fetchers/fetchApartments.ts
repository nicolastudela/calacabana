import { get } from "@/lib/httpClient";
import { FETCH_APARTMENTS_INCLUDE_OPTION } from "@/server/services/fetchApartments";
import { GenericResponseStatus, ISuccessGenericRes, IGenericErrorRes } from "@/server/types";
import { IApartment } from "@/types/types";
import { getBaseUrl } from "@/utils/getBaseUrl";

const APARTMENTS_API_PATH = `${getBaseUrl()}/api/apartments`


const fetchApartments = async (includes?: FETCH_APARTMENTS_INCLUDE_OPTION[]) => {

  const response = await get(APARTMENTS_API_PATH, includes && {include: includes.join(',')});

  if (response.status === GenericResponseStatus.SUCCESFUL) {
    return (response as ISuccessGenericRes<IApartment[]>).data
  } else {
    const errorResponse = (response as IGenericErrorRes)
    const error = errorResponse.error
    console.error(`Error while getting the apartments: ${error}`)
    return null;
  }
}

export default fetchApartments;