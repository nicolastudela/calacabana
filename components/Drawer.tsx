import {
  DrawerOverlay,
  DrawerHeader,
  IconButton,
  DrawerBody,
  DrawerContent,
  Drawer,
  DrawerProps,
  Heading,
  Spacer
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";

type CustomDrawerProps = DrawerProps & { children: ReactNode, title?: string }

const CustomDrawer = ({isOpen, onClose, title, children, ...rest}: CustomDrawerProps) => (
  <Drawer  onClose={onClose} isOpen={isOpen} {...rest}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader p="0" display={"flex"} justifyContent="space-around" alignItems= "center">
        <IconButton
          size="lg"
          variant="solid"
          aria-label="Atras"
          onClick={onClose}
          _focus={{ boxShadow: "none" }}
          icon={<ArrowBackIcon />}
        />
        <Spacer />
        <Spacer />
        {title && <Heading as="h3" display={"inline-block"} size="lg">{title}</Heading>}
        <Spacer />
        <Spacer/>
      </DrawerHeader>
      <DrawerBody p={0}>{children}</DrawerBody>
    </DrawerContent>
  </Drawer>
);

export default CustomDrawer;
