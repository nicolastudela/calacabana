import { INav, INavLink, INavMenu } from "../../types/types";

const NAV_LINKS: INav[] = [
  {
    label: "Hospedaje",
    isMenu: true,
    items: [
      {
        label: "Departamento Cala",
        link: "/cala",
        isMenu: false,
      },
      {
        label: "Departamento Cabana",
        link: "/cabana",
        isMenu: false,
      },
      {
        label: "Pileta y espacios verdes",
        link: "/espacios-comunes",
        isMenu: false,
      },
    ],
  },
  {
    label: "Tanti/Barrio",
    link: "/tanti-barrio",
  } as INavLink,
  {
    label: "Encontranos",
    link: "/contacto",
  } as INavLink,
];

export default NAV_LINKS;