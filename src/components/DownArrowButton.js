import React, { useState, useEffect } from "react";

import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { IconButton } from "@mui/material";

const DownArrowButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add an event listener to track scroll position
    const handleScroll = () => {
      if (window.scrollY < 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollDown = () => {
    // Smooth scroll down when the button is clicked
    window.scrollBy({
      top: 700, // Adjust as needed for scrolling distance
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
