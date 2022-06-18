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
  SHOW_ALL_AMENITIES,
  SHOW_DESCRIPTION,
  HIDE,
}

export type INav = INavMenu | INavLink