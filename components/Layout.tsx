import {
  chakra,
  Container,
  StackProps,
} from "@chakra-ui/react";
import DesktopHeader from "@/components/Header/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader";
import Footer from "@/components/Footer";

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
