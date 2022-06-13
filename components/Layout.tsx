import {
  chakra,
  Container,
  StackProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import DesktopHeader from "./Header/DesktopHeader";
import MobileHeader from "./Header/MobileHeader";
import Footer from "./Footer";

const Layout = ({ children, ...rest }: StackProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
      <Container display="flex" flexDirection={"column"} maxWidth={"container.xl"} px="0" {...rest}>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
        <chakra.main as="main" width={"100%"} mt={"0 !important"}>
            {children}
        </chakra.main>
        <Footer />
      </Container>
  );
};

export default Layout;
