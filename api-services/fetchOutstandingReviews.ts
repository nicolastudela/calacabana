
import stubGooglePlaceAPIReviews from "@/shared/mocks/googlePlaceAPIReviewsStubber";
import { GenericResponseStatus, IGenericErrorRes, IReviewsResposePayload, ISuccessGenericRes } from "@/types/api";
import { IReview } from "@/types/shared";
import { toErrorWithMessage } from "@/utils/genericErrorsHandler";


export interface IRawGoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

const sanitizeGoogleRawReviews = (reviews: IRawGoogleReview[]) => reviews.map((rawReview) => ({
  author: rawReview.author_name,
  authorUrl: rawReview.author_url,
  language: rawReview.language,
  profilePhotoURL: rawReview.profile_photo_url,
  rating: rawReview.rating,
  relativeTimeDescription: rawReview. relative_time_description,
  text: rawReview.text,
  timeInSeconds: rawReview.time,
} as IReview))

const fetchOutStandingReviews = async () => {

    //TODO (#23) REMOVE THIS, IT'S JUST TO NOT TO CALL CALENDAR_API ON EACH CALL
    if (process.env.MOCK_GOOGLE_PLACES_REVIEWS_API && process.env.MOCK_GOOGLE_PLACES_REVIEWS_API === "1") {
      const stubbedReviews = await Promise.resolve(stubGooglePlaceAPIReviews());
      return {
        status: GenericResponseStatus.SUCCESFUL,
        isError: false,
        data: {
          reviews: sanitizeGoogleRawReviews(stubbedReviews)
        }
      } as ISuccessGenericRes<IReviewsResposePayload>
    } else {
      const url = `${process.env.GOOGLE_PLACE_OUTSTANDING_REVIEWS_API_PATH}?language=es&place_id=${process.env.GOOGLE_PLACES_ID}&fields=reviews&key=${process.env.GOOGLE_PLACES_API_KEY}`
      try {
        const resp = await fetch(url);
        if (resp.status >= 200 && resp.status < 300 && resp.ok) {
          const data  = await resp.json();
          if (data && data.result && data.result.reviews && Array.isArray(data.result.reviews) && data.status === "OK") {
            return {
              status: GenericResponseStatus.SUCCESFUL,
              isError: false,
              data: {
                reviews: sanitizeGoogleRawReviews(data.result.reviews as IRawGoogleReview[])
              }
            } as ISuccessGenericRes<IReviewsResposePayload>
          } else {
            return {
              status: GenericResponseStatus.ERROR,
              isError: true,
              error: `Failed on retrieving outstanding reviews from: ${url}. Returned 200 status. Body ${JSON.stringify(data)}`
            } as IGenericErrorRes
          }
        }
        return {
          status: GenericResponseStatus.ERROR,
          isError: true,
          error: `Unknowng error: Failed to retrieve outstanding reviews from: ${url}. Resp status: ${resp.status} Resp status text: ${resp.statusText}`
        } as IGenericErrorRes
      }
      catch (error) {
        const unexpectedError = toErrorWithMessage(error).message
        console.error(`unexpected error on retrieving outstanding reviews from ${url}. Error message: ${unexpectedError}`)
        return {
          status: GenericResponseStatus.ERROR,
          isError: true,
          error: unexpectedError
        } as IGenericErrorRes
      }
    }

}


export default fetchOutStandingReviews;
