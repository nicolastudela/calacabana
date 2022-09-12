import {
  Flex,
  Center,
  HStack,
  Heading,
  Link,
  LinkProps
} from "@chakra-ui/react";
import MENU_LINKS from "./navLinks";

import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { trackEvent } from "@/lib/gtag";
import { INavLink } from "@/types/types";

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

const DesktopNavMenu = dynamic(
  () => import("./DesktopNavMenu")
);

const DesktopHeader = () => {
  const [ menuInstaciated, setMenuInstaciated] = useState(false);

  const openMenu = useCallback(() => {
    setMenuInstaciated(true);
  }, [])
  
  return (
    <Flex justify={"space-between"} width="100%" height={20} as="header">
      <Center w={"300px"} alignContent={"center"} justifyContent={"flex-start"}>
        <Heading as="h1" size="xl" fontWeight={"light"}>
          <NextLink href={"/"}>CALACABANA</NextLink>
        </Heading>
      </Center>
      <Center>
        <Heading as="h3" size="lg" fontFamily={"'MonteCarlo', cursive"} pb={2}>
          un mirador de las sierras, en las sierras
        </Heading>
      </Center>
      <HStack spacing={8} as="nav">
        {MENU_LINKS &&
          MENU_LINKS.map((item) => {
            if (item.isMenu) {
              return menuInstaciated ? <DesktopNavMenu menu={item} key={item.label}/> : <Link onClick={openMenu} key={item.label}>{item.label}</Link>;
            } else {
              return <DesktopNavLink {...item} key={item.label} />;
            }
          })}
      </HStack>
    </Flex>
  );
};

export default DesktopHeader;
