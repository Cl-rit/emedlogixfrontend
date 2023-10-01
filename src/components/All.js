import React, { useState } from "react";
import { Header } from "./Header";
import { Year } from "./Year";
import Search1 from "./Search1";
import { flexStart, flexCenter } from "../themes/commonStyles";
import { Box, Stack } from "@mui/material";
import Main from "./Main";

const All = () => {
  const [refreshMain, setRefreshMain] = useState(false);
  const [isNeoplasmCodeClicked, setIsNeoplasmCodeClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrugCodeClicked, setIsDrugCodeClicked] = useState(false);
  const [isValueSelected, setIsValueSelected] = useState(false);
  const [isNeoplasmButtonActive, setIsNeoplasmButtonActive] = useState(false);
  const [isDrugButtonActive, setIsDrugButtonActive] = useState(false);

  // Define a callback function to update Main
  const handleSelectedItemChange = (newSelectedItem) => {
    setSelectedItem(newSelectedItem);
  };
  const handleNeoplasmCodeClick = (isActive) => {
    setIsNeoplasmButtonActive(isActive);
  };
  const handleDrugCodeClick = (isActive) => {
    setIsDrugButtonActive(isActive);
  };
  return (
    <div>
      <Header />

      <Box sx={{ ...flexStart }}>
        <Year />
        <Search1
          refreshMain={refreshMain}
          isNeoplasmCodeClicked={isNeoplasmCodeClicked}
          selectedItem={selectedItem}
          isDrugCodeClicked={isDrugCodeClicked}
          onSelectedItemChange={handleSelectedItemChange}
          onNeoplasmCodeClick={handleNeoplasmCodeClick} // Pass the callback // Pass the callback
          onDrugCodeClick={handleDrugCodeClick}
        />
      </Box>
      <Box sx={{ ...flexCenter }}>
        <Main
          isValueSelected={isValueSelected}
          refreshMain={refreshMain}
          // isNeoplasmCodeClicked={isNeoplasmCodeClicked}
          selectedItem={selectedItem}
          isDrugCodeClicked={isDrugButtonActive}
          isNeoplasmCodeClicked={isNeoplasmButtonActive} // Pass the state to Main
        />
      </Box>
    </div>
  );
};

export default All;
