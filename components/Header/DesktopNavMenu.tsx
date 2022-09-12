// import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Link, LinkProps } from "@chakra-ui/react";
import { INavMenu } from "@/types/types";
import { INavLink } from "@/types/types";

import NextLink from "next/link"
import { trackEvent } from "@/lib/gtag";
import { useCallback } from "react";

export interface DesktopNavLinkProps extends LinkProps, INavLink{}

export const DesktopNavLink = ({link, label, isMenu, ...rest}: DesktopNavLinkProps) => {
  const onClickAction = useCallback(() => {
    trackEvent("desktop_nav",  { link })
  },[link])
  return (
    <NextLink href={link} passHref>
      <Link
        {...rest}
        onClick={onClickAction}
      >
        {label}
      </Link>
    </NextLink>
  );
}

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
      {menu.items.map((navLink: INavLink) => (
        <MenuItem key={navLink.label}>
          <DesktopNavLink {...navLink} />
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default DesktopNavMenu;
