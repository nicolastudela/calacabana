import { IReview } from "@/types/shared";
import { Heading, Text, Flex, Avatar, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import useGlobalContext from "@/shared/hooks/useGlobalContext";

const MOBILE_REVIEWS_TO_SHOW_ON_WHEN_REDUCED = 2;
const DESKTOP_REVIEWS_TO_SHOW_ON_WHEN_REDUCED = 6;

export interface IReviewsProps {
  reviewsCount: number;
  overallRating: string;
  reviews: IReview[];
  onExpand?: () => void;
}

const ReviewHeader = ({avatar, name, date} : {avatar: string; name: string; date: string}) => (
  <Flex w={"full"} gap={2}>
    <Avatar name={name} src={avatar} size="sm" />
    <Flex direction={"column"}>
      <Heading fontSize={"sm"}>{name}</Heading>
      <Text fontSize={"xs"}>{date}</Text>
     </Flex>
  </Flex>
)

const Reviews = ({reviewsCount, overallRating, reviews, onExpand }: IReviewsProps) => {
  const { isMobile } = useGlobalContext();
  let reviewsToShow = reviews
  if (onExpand) {
    reviewsToShow = isMobile ? reviews.slice(0,MOBILE_REVIEWS_TO_SHOW_ON_WHEN_REDUCED) : reviews.slice(0,DESKTOP_REVIEWS_TO_SHOW_ON_WHEN_REDUCED);
  } 
  return (
    <Flex direction={"column"} gap={4} w={{base:"full",md: !onExpand ? "container.lg" : "full"}} mx="auto">
      <Flex w={"full"} alignItems="center" gap={2}>
        <StarIcon fontSize={"sm"}/>
        <Heading as="h3" size="lg">{overallRating} · {reviewsCount} Opiniones</Heading>
      </Flex>
      <Flex direction={"row"} wrap={"wrap"} gap={4} mb={2}>
        {reviewsToShow.map((review, idx) => (
          // reviews have to has an Id
          <Flex key={`${review.author}-${idx}`} width={"full"} direction={"column"} gap={2} maxWidth={isMobile ? "full" : "250px"}>
            <ReviewHeader name={review.author} avatar={review.profilePhotoURL} date={review.relativeTimeDescription} />
            <Text fontSize={"xs"} noOfLines={onExpand ? [3] : []}>{review.text}</Text>
          </Flex>
        ))}
      </Flex>
      {onExpand && <Button variant="outline" colorScheme={"brand"} width={"xs"} onClick={onExpand}> Mostrar todas las opiniones</Button>}
    </Flex>
  )
}

export default Reviews;