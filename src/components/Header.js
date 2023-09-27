import React, { useState } from "react";
import Box from "@mui/material/Box";

import { flexBetweenAlign, flexBetweenAlign1 } from "../themes/commonStyles";
import { Avatar, IconButton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export const Header = () => {
  const [first, setfirst] = useState(null);

  React.useEffect(() => {
    const fetchCodeDetails = async () => {
      try {
        let result1 = await fetch(`/codes/${global.usermail}/userdetail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${global.tokens}`,
          },
        });

        if (result1.status === 200) {
          result1 = await result1.json();
          setfirst(result1.username);
          localStorage.setItem("name", result1.username); // Set the value in localStorage
        } else {
          console.error(`Error: ${result1.status}`);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchCodeDetails();
  }, [global.usermail]);

  console.log(global.usermail);
  console.log(first);
  localStorage.setItem("name", first);

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
