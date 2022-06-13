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

export type INav = INavMenu | INavLink