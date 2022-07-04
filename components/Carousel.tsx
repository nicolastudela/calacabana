import Carousel, { CarouselProps as CustomCarouselProps } from "nuka-carousel";

import {
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { IApartmentImage } from "@/types/shared";

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
  images: IApartmentImage[];
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
        images.map(({ src, alt, width, height }, index) => (
          <Image key={index} src={src} alt={alt} layout="responsive" width={"100%"} height={"100%"}/>
        ))}
    </Carousel>
  );
};

export default CustomCarousel;
