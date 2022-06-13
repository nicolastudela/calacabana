import { FlexProps, Flex, Box, LinkBox, Heading, LinkOverlay } from "@chakra-ui/react";


const MobileHeadMaster = ({ children, ...rest }: FlexProps) => (
  <Flex w={"100%"} justify={"flex-start"} height={12} {...rest}>
    <Box flexGrow={1}>{children}</Box>
    <Flex w={"400px"} alignItems={"center"} justifyContent="center" mr={8}>
      <LinkBox>
        <Heading as="h1" size="xl">
          <LinkOverlay href="/">CALACABANA</LinkOverlay>
        </Heading>
      </LinkBox>
    </Flex>
  </Flex>
);

export default MobileHeadMaster;