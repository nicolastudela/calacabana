
import dynamic from "next/dynamic";
import {
  chakra,
  Container,
  StackProps,
} from "@chakra-ui/react";

const Footer = dynamic(() => import("@/components/Footer"));
const MobileHeader = dynamic(() => import("@/components/Header/MobileHeader"));
const DesktopHeader = dynamic(() => import("@/components/Header/DesktopHeader"));

const Layout = ({ children, ...rest }: StackProps) => {
  return (
      <Container display="flex" flexDirection={"column"} maxWidth={"container.xl"} px="0" {...rest}>
        <MobileHeader display={{base: "block", md: "none"}}/>
        <DesktopHeader display={{base: "none", md: "flex"}}  />
        <chakra.main as="main" width={"100%"} mt={"0 !important"}>
            {children}
        </chakra.main>
        <Footer />
      </Container>
  );
};

export default Layout;
