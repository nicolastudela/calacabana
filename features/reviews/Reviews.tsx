import { Heading, Text, Flex, Avatar, Button, Link, Icon, Image, Spacer } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import useGlobalContext from "@/shared/hooks/useGlobalContext";
import { IReview } from "./types";

const MOBILE_REVIEWS_TO_SHOW_ON_WHEN_REDUCED = 5;
const DESKTOP_REVIEWS_TO_SHOW_ON_WHEN_REDUCED = 16;

export interface IReviewsProps {
  reviewsCount: number;
  overallRating: string;
  reviews: IReview[];
  onExpand?: () => void;
}

const SHOW_GOOGLE_AVATARS =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_SHOW_GOOGLE_AVATARS === "1";

const ReviewHeader = ({
  name,
  date,
  authorUrl,
  avatarSrc,
}: {
  name: string;
  date: string;
  authorUrl: string;
  avatarSrc?: string;
}) => (
  <Flex w={"full"} gap={2}>
    <Avatar name={name} src={SHOW_GOOGLE_AVATARS ? avatarSrc : undefined} size="sm" />
    <Flex direction={"column"}>
      <Heading fontSize={"sm"}>
        <Link
          href={authorUrl}
          isExternal
          color="brand.600"
          _hover={{ textDecoration: "underline" }}
        >
          {name}
        </Link>
      </Heading>
      <Text fontSize={"xs"}>{date}</Text>
     </Flex>
  </Flex>
)

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sa=X&sca_esv=0969567df9557e92&hl=es-419&gbv=2&sxsrf=ANbL-n4T3YJ6BS9p1H605VUffQvgUfVMMA:1773408733842&q=CalaCabana+Opiniones&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MTYyMTA2s7QwNzU3NjCzNDc23sDI-IpRxDkxJ9E5MSkxL1HBvyAzLzM_L7V4EStWYQBKoCEwSAAAAA&rldimm=4324036987573069733&tbm=lcl&ved=2ahUKEwiw8fys_pyTAxXfRv4FHd_rHXcQ9fQKegQIUhAG&cshid=1773408739303741&biw=1746&bih=990&dpr=1#lkt=LocalPoiReviews";

const Reviews = ({reviewsCount, overallRating, reviews, onExpand }: IReviewsProps) => {
  const { isMobile } = useGlobalContext();
  let reviewsToShow = reviews
  if (onExpand) {
    reviewsToShow = isMobile ? reviews.slice(0,MOBILE_REVIEWS_TO_SHOW_ON_WHEN_REDUCED) : reviews.slice(0,DESKTOP_REVIEWS_TO_SHOW_ON_WHEN_REDUCED);
  } 
  return (
    <Flex
      direction={"column"}
      gap={4}
      w={{ base: "full", md: !onExpand ? "container.lg" : "full" }}
      mx="auto"
      px={{ base: 3, md: 0 }}
    >
      <Flex
        w={"full"}
        alignItems="center"
        gap={3}
        px={{ base: 3, md: 4 }}
        py={{ base: 1, md: 2 }}
      >
        <Flex alignItems="center" gap={1}>
          <StarIcon fontSize={"sm"} />
          <Heading as="h3" size="lg">
            {overallRating} · {reviewsCount} Opiniones
          </Heading>
        </Flex>
        <Spacer />
        <Link
          href={GOOGLE_REVIEWS_URL}
          isExternal
          aria-label="Ver opiniones en Google"
          ml={1}
          display="inline-flex"
          alignItems="center"
        >
          <Image
            src="/icons/goo-fav-ic.ico"
            alt="Ver opiniones en Google"
            boxSize={{ base: 4, md: 5 }}
          />
        </Link>
      </Flex>
      <Flex direction={"row"} wrap={"wrap"} gap={4} mb={2}>
        {reviewsToShow.map((review, idx) => (
          // reviews have to has an Id
          <Flex key={`${review.author}-${idx}`} width={"full"} direction={"column"} gap={2} maxWidth={isMobile ? "full" : "250px"}>
            <ReviewHeader
              name={review.author}
              date={review.relativeTimeDescription}
              authorUrl={review.authorUrl}
              avatarSrc={review.profilePhotoURL}
            />
            <Text fontSize={"xs"} noOfLines={onExpand ? [3] : []}>{review.text}</Text>
          </Flex>
        ))}
      </Flex>
      {onExpand && (
        <Button
          variant="outline"
          colorScheme={"brand"}
          width={"xs"}
          alignSelf="center"
          mt={2}
          onClick={onExpand}
        >
          Mostrar todas las opiniones
        </Button>
      )}
    </Flex>
  )
}

export default Reviews;