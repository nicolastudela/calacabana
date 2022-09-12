import { FlexProps, Flex, Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

const MobileHeadMaster = ({ children, ...rest }: FlexProps) => (
  <Flex w={"100%"} justify={"flex-start"} height={12} {...rest}>
    <Box flexGrow={1}>{children}</Box>
    <Flex w={"400px"} alignItems={"center"} justifyContent="center" mr={8}>
        <Heading as="h1" size="xl">
          <NextLink href={"/"}>CALACABANA</NextLink>
        </Heading>
    </Flex>
  </Flex>
);

export default MobileHeadMaster;