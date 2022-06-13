import {
  Flex,
  Center,
  HStack,
  Link,
  Heading,
  LinkOverlay,
  LinkBox,
  Button,
} from "@chakra-ui/react";
import MENU_LINKS from './navLinks'
import DesktopNavMenu from "./DesktopNavMenu";

const DesktopHeader = () => {
  return (
    <Flex justify={"space-between"} width="100%" height={20} as="header">
      <Center w={"300px"} alignContent={"center"} justifyContent={"flex-start"}>
        <LinkBox>
          <Heading as="h1" size="xl" fontWeight={"light"}>
            <LinkOverlay href="/">CALACABANA</LinkOverlay>
          </Heading>
        </LinkBox>
      </Center>
      <Center>
        <Heading
          as="h3"
          size="lg"
          fontFamily={"'MonteCarlo', cursive"}
          pb={2}
        >
          un mirador en las sierras, en las sierras
        </Heading>
      </Center>
      <HStack spacing={8} as="nav">
        {MENU_LINKS &&
          MENU_LINKS.map((item) => {
            if (item.isMenu) {
              return <DesktopNavMenu menu={item} key={item.label} />;
            } else {
              return <Link href={item.link} key={item.label}>{item.label}</Link>;
            }
          })}
      </HStack>
    </Flex>
  );
};

export default DesktopHeader;