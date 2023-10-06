import React, { useState, useEffect } from "react";

import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { IconButton } from "@mui/material";

const DownArrowButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollDown = () => {
    window.scrollBy({
      top: 700,
      behavior: "smooth",
    });
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "40px",
    height: "40px",
    backgroundColor: "#007bff",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "50%",
    opacity: "0.5",
    display: isVisible ? "flex" : "none",
  };

  return (
    <IconButton onClick={scrollDown} style={buttonStyle}>
      <ExpandCircleDownOutlinedIcon
        sx={{ borderRadius: "50%", fontSize: "35px" }}
      />
    </IconButton>
  );
};

export default DownArrowButton;
