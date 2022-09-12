// import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Link, LinkProps, useDisclosure } from "@chakra-ui/react";
import { INavMenu } from "@/types/types";
import { INavLink } from "@/types/types";
import { useState } from "react";
import { DesktopNavLink } from "./DesktopHeader";


const DesktopNavMenu: React.FC<{ menu: INavMenu }> = ({ menu }) => {
  const [openState, setOpenState] = useState(true);

  return (
  <Menu colorScheme={"pink"} isLazy={openState} isOpen={openState} onClose={()=> setOpenState(false)} onOpen={() => setOpenState(true)}>
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
)};

export default DesktopNavMenu;