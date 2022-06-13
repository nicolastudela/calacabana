import { ArrowBackIcon } from "@chakra-ui/icons";
import {Link, LinkProps, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, IconButton, DrawerBody, VStack, Divider, Text } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { INavLink } from "../../types/types";
import MobileHeadMaster from "./MobileHeadMaster";
import MENU_LINKS from './navLinks'
import theme from "../../theme";


interface NavLinkProps extends LinkProps{ 
  item: INavLink; 
  currentPath: string;
}

const NavLink = ({item, currentPath, ...props}: NavLinkProps) => {
  const [selected, setSelected] = useState(false);
  const bgColor = (!!currentPath && (currentPath === item.link)) ? theme.colors.brand[700] : "";
  const filter = selected ? 'blur(1px)' : '';
  return (
    <Link _hover={{ textDecoration: "none" }} key={item.label} href={item.link} width={"100%"} {...{bgColor}} {...{filter}} {...props} onClick={() => setSelected(true)} >
    {item.label}
    </Link>
  );
}

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  asPath?: NextRouter;
}

const MobileNavMenu = ({isOpen, onOpen, onClose }: MobileNavMenuProps) => {
  const { asPath } = useRouter()

  return (<Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p="0">
            <MobileHeadMaster>
              <IconButton
                size="lg"
                variant="solid"
                aria-label="Options"
                onClick={onClose}
                _focus={{ boxShadow: 'none' }}
                icon={<ArrowBackIcon />}
              />
            </MobileHeadMaster>
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack
              alignContent={"flex-start"}
              alignItems={"flex-start"}
              p={0}
              pt={2}
              as="nav"
            >
              {MENU_LINKS.map((item) => {
                if (item.isMenu) {
                  return (
                    <VStack
                      key={item.label}
                      alignItems={"flex-start"}
                      width={"100%"}
                    >
                      <Text fontSize="lg" fontWeight={"semibold"} pl={"1"}>
                        {item.label}
                      </Text>
                      <Divider orientation="horizontal" />
                      <VStack alignItems={"flex-start"} width={"100%"}>
                        {item.items.map((subItem) => {
                          return <NavLink item={subItem} key={subItem.label} currentPath={asPath} p={"1"} pl={"3"} />

                      })}
                      </VStack>
                    </VStack>
                  );
                } else {
                  return (
                    <NavLink item={item} key={item.label} currentPath={asPath} p={"1"} />
                  );
                }
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
)}

export default MobileNavMenu;