import {
  Flex,
  Box,
  Center,
  HStack,
  Heading,
  Link,
  LinkProps,
  Spinner,
  FlexProps
} from "@chakra-ui/react";
import MENU_LINKS from "./navLinks";

import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import { trackEvent } from "@/lib/gtag";
import { INavLink } from "@/types/types";

const DesktopNavMenu = dynamic(
  () => import("./DesktopNavMenu"),
  { suspense: true }
);

// const DesktopNavMenu = dynamic(async () => {
//   await new Promise(resolve => setTimeout(resolve, 80000));
//   return import("./DesktopNavMenu");
// }, { suspense: true });

export interface DesktopNavLinkProps extends LinkProps, INavLink{}

export const DesktopNavLink = ({link, label, isMenu, ...rest}: DesktopNavLinkProps) => {
  const onClickAction = useCallback(() => {
    trackEvent("desktop_nav",  { link })
  },[link])
  return (
    <Link as={NextLink} href={link} {...rest} onClick={onClickAction}>
        {label}
    </Link>
  );
}

const DesktopHeader = ({...rest}: FlexProps) => {
  const [ menuInstaciated, setMenuInstaciated] = useState(false);

  const openMenu = useCallback(() => {
    setMenuInstaciated(true);
  }, [])
  
  return (
    <Flex justify={"space-between"} alignItems={"center"} width="100%" height={20} as="header" {...rest}>
      <Box w={"300px"} alignContent={"center"} justifyContent={"flex-start"}>
        <Heading as="h1" size="xl" fontWeight={"light"}>
          <NextLink href={"/"}>CALACABANA</NextLink>
        </Heading>
      </Box>
      {/* <Center> */}
        <Heading as="h3" size="lg" fontFamily={"'MonteCarlo', cursive"} pb={2}>
          un mirador de las sierras, en las sierras
        </Heading>
      {/* </Center> */}
      <HStack spacing={8} as="nav">
        {MENU_LINKS &&
          MENU_LINKS.map((item) => {
            if (item.isMenu) {
              return <Flex minWidth={"28"} key={item.label}>{menuInstaciated ? <Suspense fallback={<Spinner m={"auto"}/>}><DesktopNavMenu menu={item}/></Suspense> : <Link onClick={openMenu}>{item.label}</Link>}</Flex>;
            } else {
              return <DesktopNavLink {...item} key={item.label} />;
            }
          })}
      </HStack>
    </Flex>
  );
};

export default DesktopHeader;
