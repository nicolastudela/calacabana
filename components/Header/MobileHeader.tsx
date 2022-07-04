import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import MobileHeadMaster from "@/components/Header/MobileHeadMaster";

const MobileNavMenu = dynamic(
  () => import("./MobileNavMenu")
);


const MobileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ instanciated, setInstanciated] = useState(false);

  const openDrawer = useCallback(() => {
    if (!instanciated) {
      setInstanciated(true);
    }
    onOpen();
  }, [onOpen, instanciated])

  return (
    <>
      { instanciated && <MobileNavMenu isOpen={isOpen} onClose={onClose} onOpen={onClose} />}
      <MobileHeadMaster as="header">
        <IconButton
          size="lg"
          variant="solid"
          aria-label="Menu"
          onClick={openDrawer}
          _focus={{ boxShadow: 'none' }}
          icon={<HamburgerIcon />}
        />
      </MobileHeadMaster>
    </>
  );
};

export default MobileHeader;