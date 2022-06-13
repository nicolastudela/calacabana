import { Box } from "@chakra-ui/react"
import { NextPage } from "next/types"

import Image from "next/image";



import cala_wide_1 from "../public/images/cala/wide/cala-1.jpeg";
import cala_wide_2 from "../public/images/cala/wide/cala-2.jpeg";
import cala_wide_3 from "../public/images/cala/wide/cala-3.jpeg";
import React from "react";

const Test: NextPage = () => {
  // const lazyRoot = React.useRef(null)

  return (
    <div style={{ overflowY: 'scroll', width: '500px', height: '100px' }}>
        <Box position="relative" w={600} height={"800px"}  bg={"blue"}>
            <Image
            // lazyRoot={lazyRoot}
              src={cala_wide_1}
              placeholder="blur"
              // layout="fixed"
              alt="Apartamento Cala - comedor"
              height={"800px"}
            />
          </Box>
          <Box position="relative" w={600}  bg={"tomato"}>
            <Image
            // lazyRoot={lazyRoot}
              src={cala_wide_2}
              placeholder="blur"
              // layout="fill"
              alt="Apartamento Cala - comedor"
              // height={100}
              height={"800px"}
            />
          </Box>
          <Box position="relative" w={600}  bg={"tomato"}>
            <Image
            // lazyRoot={lazyRoot}
              src={cala_wide_3}
              placeholder="blur"
              // layout="fill"
              alt="Apartamento Cala - comedor"
              // height={100}
              height={"800px"}
            />
          </Box>
    </div>
  )

}

export default Test