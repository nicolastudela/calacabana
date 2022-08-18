import { useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Drawer = dynamic(() => import("../components/Drawer"));

export interface IPageDrawerProps {
  componentToShow: {
    title: string;
    component: JSX.Element;
  } | null,
  onHide: () => void
}

const PageDrawer = ({componentToShow, onHide}: IPageDrawerProps) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [isDrawerMounted, setDrawerMounted] = useState(false);

    // manage the drawer state
    useEffect(() => {
      if (componentToShow) {
        if (!isDrawerMounted) {
          setDrawerMounted(true);
        }
        onDrawerOpen();
      } else {
        onDrawerClose();
      }
    }, [
      isDrawerOpen,
      componentToShow,
      isDrawerMounted,
      onDrawerOpen,
      onDrawerClose,
    ]);


    return isDrawerMounted ? (
        <Drawer
          placement={"top"}
          // onClose={() => dispatch({ type: "hide" })}
          onClose={onHide}
          isOpen={isDrawerOpen}
          size={"full"}
          title={componentToShow?.title}
        >
          {componentToShow?.component}
        </Drawer>
      ): <></>;
}

export default PageDrawer;