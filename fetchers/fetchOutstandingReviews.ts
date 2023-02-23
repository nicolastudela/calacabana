import { GenericResponseStatus, IGenericErrorRes, IReviewsResposePayload, ISuccessGenericRes } from "@/types/api";
import { IReview } from "@/types/shared";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { get } from "@/lib/httpClient";


const OUTSTANDING_REVIEWS_PATH = `${getBaseUrl()}/api/reviews/outstanding`

const outstandingReviewsFetcher = async () => {
  const response = await get(OUTSTANDING_REVIEWS_PATH);

  if (response.status === GenericResponseStatus.SUCCESFUL) {
    const succes = (response as ISuccessGenericRes<IReviewsResposePayload>)
    return succes.data.reviews;
  } else {
    const errorResponse = (response as IGenericErrorRes)
    const error = errorResponse.error
    console.error(`Error while fetching outstanding reviews: ${error}`)
    return [] as IReview[];
  }
}

export default outstandingReviewsFetcher;