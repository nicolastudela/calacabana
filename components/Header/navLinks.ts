import { INav, INavLink } from "../../types/types";

const NAV_LINKS: INav[] = [
  {
    label: "Hospedaje",
    isMenu: true,
    items: [
      {
        label: "Departamento Cala",
        link: "/alojamiento/cala",
        isMenu: false,
      },
      {
        label: "Departamento Cabana",
        link: "/alojamiento/cabana",
        isMenu: false,
      },
      {
        label: "Todo el complejo (Cala + Cabana) ",
        link: "/alojamiento/calacabana",
        isMenu: false,
      },
      {
        label: "Sobre el alojamiento",
        link: "/espacios-comunes",
        isMenu: false,
      },
    ],
  },
  {
    label: "Ubicacion",
    link: "/ubicacion",
  } as INavLink,
  {
    label: "Tanti / Cordoba",
    link: "/tanti-cordoba",
  } as INavLink,
];

export default NAV_LINKS;