import { IAmenitiesGroup } from "@/features/amenities/types";
import { IAparmentData } from "@/features/apartment/types";

export interface IImage {
  alt: string;
  height: number;
  src: string;
  width: number;
}

export interface IImagesGroup {
  wide: IImage[];
  square: IImage[];
}

export interface IApartment extends IAparmentData{
  amenities?: IAmenitiesGroup[];
  images: IImagesGroup;
}