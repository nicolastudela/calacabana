import {
  Flex,
  Center,
  HStack,
  Heading,
} from "@chakra-ui/react";
import MENU_LINKS from "./navLinks";
import DesktopNavMenu, { DesktopNavLink } from "./DesktopNavMenu";
import NextLink from "next/link";

const DesktopHeader = () => {
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
              return <DesktopNavMenu menu={item} key={item.label} />;
            } else {
              return <DesktopNavLink {...item} key={item.label} />;
            }
          })}
      </HStack>
    </Flex>
  );
};

export default DesktopHeader;
