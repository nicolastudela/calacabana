// import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import { INavMenu } from "@/types/types";

import NextLink from "next/link"

const DesktopNavMenu: React.FC<{ menu: INavMenu }> = ({ menu }) => (
  //TODO Menu component is INSANLY BIG. weigths like 50kb. Should replace it with some ad-hoc component o just lazy load it when the user hover on the link
  <Menu colorScheme={"pink"}>
    <MenuButton
      as={Link}
      _focus={{ boxShadow: "none" }}
      // rightIcon={<ChevronDownIcon />}
    >
      {menu.label}
    </MenuButton>
    <MenuList>
      {menu.items.map(({ label, link }) => (
        <MenuItem key={label}>
          <NextLink href={link} passHref>
            <Link>{label}</Link>
          </NextLink>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default DesktopNavMenu;
