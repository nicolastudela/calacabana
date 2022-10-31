import Carousel, { CarouselProps as CustomCarouselProps } from "nuka-carousel";

import { IconButton, Flex } from "@chakra-ui/react";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { IApartmentImage } from "@/types/shared";
import { PagingDot } from "@/components/icons/PagingDot";
import useGlobalContext from "@/shared/hooks/useGlobalContext";


const preventDefaultClickHandlerWrapper = (wrappedHandler: () => void) => {
  const handler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    wrappedHandler();
  };
  return handler;
};


const BottomDotsControls = ({}: {
  previousSlide: () => void;
  nextSlide: () => void;
  aptName?: string;
}) => (
  <Flex as="ul" listStyleType={"none"} m={0} p={0} position="relative">
    <li>
      <PagingDot w={"8px"} h={"8px"} />
    </li>
    <li >
      <PagingDot w={"10px"} h={"10px"} />
    </li>
    <li>
      <PagingDot w={"8px"} h={"8px"} />
    </li>
  </Flex>
);

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
  const { isMobile } = useGlobalContext();
  return (
    <Carousel
      dragThreshold={0.2}
      renderCenterLeftControls={({ previousSlide }) =>
        isMobile ? (
          <></>
        ) : (
          <IconButton
            aria-label={
              aptName ? `anterior-foto-alojamiento-${aptName}` : "anterior-foto"
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
              aptName ? `proxima-foto-alojamiento-${aptName}` : "proxima-foto"
            }
            icon={<ArrowForwardIcon />}
            onClick={preventDefaultClickHandlerWrapper(nextSlide)}
          />
        )
      }
      renderBottomCenterControls={({ previousSlide, nextSlide }) => (
        <BottomDotsControls
          previousSlide={previousSlide}
          nextSlide={nextSlide}
          aptName={aptName}
        />
      )}
      defaultControlsConfig={{
        pagingDotsStyle: { fill: "white" },
      }}
      wrapAround={true}
      style={roundedBorder ? { borderRadius: "25px" } : {}}
    >
      {images &&
        images.map(({ src, alt, width, height }, index) => (
          <Image
            key={index}
            src={src}
            alt={alt}
            layout="responsive"
            width={width}
            height={height}
            priority={index === 0 ? true : false}
          />
        ))}
    </Carousel>
  );
};

export default CustomCarousel;
