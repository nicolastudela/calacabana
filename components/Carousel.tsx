import Carousel, { CarouselProps as CustomCarouselProps } from "nuka-carousel";

import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { ArrowBackIcon, StarIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";
import Image, { StaticImageData } from "next/image";

const preventDefaultClickHandlerWrapper = (wrappedHandler: () => void) => {
  const handler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    wrappedHandler();
  };
  return handler;
};

export interface CarouselProps extends CustomCarouselProps {
  aptName?: string;
  roundedBorder?: boolean;
  images: { img: StaticImageData; alt: string }[];
}

const CustomCarousel = ({
  images,
  aptName,
  roundedBorder = false,
}: CarouselProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Carousel
      renderCenterLeftControls={({ previousSlide }) =>
        isMobile ? (
          <></>
        ) : (
          <IconButton
            aria-label={
              aptName ? `anterior-foto-apartamento-${aptName}` : "anterior-foto"
            }
            icon={<ArrowBackIcon />}
            onClick={preventDefaultClickHandlerWrapper(previousSlide)}
          />
        )
      }
      renderCenterRightControls={({ nextSlide }) =>
        isMobile ? (
          <></>
        ) : (
          <IconButton
            aria-label={
              aptName ? `proxima-foto-apartamento-${aptName}` : "proxima-foto"
            }
            icon={<ArrowForwardIcon />}
            onClick={preventDefaultClickHandlerWrapper(nextSlide)}
          />
        )
      }
      defaultControlsConfig={{
        pagingDotsStyle: { fill: "white" },
      }}
      wrapAround={true}
      style={roundedBorder ? { borderRadius: "25px" } : {}}
    >
      {images &&
        images.map(({ img, alt }, index) => (
          <Image key={index} src={img} alt={alt} layout="responsive" />
        ))}
    </Carousel>
  );
};

export default CustomCarousel;
