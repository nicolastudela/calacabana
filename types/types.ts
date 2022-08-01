export interface INavGeneral {
  label: string;
}

export interface INavMenu extends INavGeneral {
  isMenu: true;
  items: INavLink[];
} 

export interface INavLink extends INavGeneral {
  isMenu: false;
  link: string;
}

export enum IDrawerActionTypes {
  SHOW_ALL_PICS,
  SHOW_ALL_PICS_MOBILE,
  SHOW_ALL_AMENITIES,
  SHOW_DESCRIPTION,
  SHOW_EDIT_DATES,
  HIDE,
}

export type INav = INavMenu | INavLink

/**
 * This type represents a period that is ready and valid to be bookeable.
 * Meaning that a period is sematically valid, startDate is after FIRST_BOOKING_DAY. And period not intersect in other booking periods.
 */
export type BookeableValidPeriod = {
  startDate: Date,
  endDate: Date,
}

/**
 * This type represents a period that is ready sematically valid
 */
export type BookingPeriod = [Date, Date]