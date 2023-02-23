import { IRawGoogleReview } from "@/server/services/fetchOutstandingReviews";

const MOCK_GOOGLE_REVIEWS = [
  {
    author_name: "daniel pelleriti",
    author_url:
      "https://www.google.com/maps/contrib/103366502446067962966/reviews",
    language: "es",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a/AItbvmnxNspnG0RYJYooWzrqzdQX73CeqMQLWlXYQAd8=s128-c0x00000000-cc-rp-mo-ba5",
    rating: 5,
    relative_time_description: "Hace una semana",
    text: "Que buen lugar para desenchufarse del estrés de la ciudad.Muy bueno y recomendable pasarse unos días aquí. Estuve 10 días y la pasé espectacular con mí novia. La cabaña es hermosa y el paisaje espero volver",
    time: 1661009986,
  } as IRawGoogleReview,
  {
    author_name: "Patricio Serra",
    author_url:
      "https://www.google.com/maps/contrib/101562926399239838240/reviews",
    language: "es",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/AFdZucq-G8ICg1KOUBNeYKjemaOLqmOxEDL9px1e6FIa6g=s128-c0x00000000-cc-rp-mo-ba3",
    rating: 5,
    relative_time_description: "Hace 3 semanas",
    text: "La cabaña es hermosa, con terminaciones de primera categoría ubicada en un lugar increíble. Pasé unos hermosos días con mi pareja rodeados de paz y tranquilidad.  La persona que nos atendió  super  amable. Sin duda volveré. 100% recomendable!!!",
    time: 1660045821,
  } as IRawGoogleReview,
  {
    author_name: "juan manuel Insua",
    author_url:
      "https://www.google.com/maps/contrib/108274823390969518855/reviews",
    language: "es",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/AFdZucry6PjTHLtVd7TnhwfQphC--5hRVomzywW5aFjf=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "Hace 1 mes",
    text: "Increíble lugar!! La calidad y el detalle en cada rinconcito!! Nos vamos felices y esperamos volver pronto!!",
    time: 1658614132,
  } as IRawGoogleReview,
  {
    author_name: "Artkuold Art",
    author_url:
      "https://www.google.com/maps/contrib/105368677117818845912/reviews",
    language: "es",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/AFdZucpPYANrmbGQ3FR_WXAqAYHKXxcqg01t1VEqi1Jwyw=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "Hace 1 mes",
    text: "Espectacular el lugar, la vista increíble la pasamos muy bien",
    time: 1659390514,
  } as IRawGoogleReview,
] as IRawGoogleReview[];

const stubGooglePlaceAPIResponseReviews = () => {
  return MOCK_GOOGLE_REVIEWS;
};

export default stubGooglePlaceAPIResponseReviews;
