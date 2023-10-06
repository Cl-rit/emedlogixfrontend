import React from "react";
import Box from "@mui/material/Box";
import { flexBetweenAlign } from "../themes/commonStyles";

export const Header = () => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          position="sticky"
          sx={{
            ...flexBetweenAlign,
            background: "linear-gradient(to right, #E9F8FF, #90B2D8, #C1E3FF)",
            minHeight: 90,
          }}
        >
          <Box sx={{ ml: 4 }}>
            <img
              src="https://static.wixstatic.com/media/7607b5_dbdbad3954b74cd0b66694c3302204e0~mv2.png/v1/fill/w_275,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/EMEDLOGIX_Final-01.png"
              alt="logo"
              width="100%"
              height="auto"
            />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
