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

  // Define a callback function to update Main
  const handleSelectedItemChange = (newSelectedItem) => {
    setSelectedItem(newSelectedItem);
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
          onSelectedItemChange={handleSelectedItemChange} // Pass the callback
        />
      </Box>
      <Box sx={{ ...flexCenter }}>
        <Main
          isValueSelected={isValueSelected}
          refreshMain={refreshMain}
          isNeoplasmCodeClicked={isNeoplasmCodeClicked}
          selectedItem={selectedItem}
          isDrugCodeClicked={isDrugCodeClicked}
        />
      </Box>
    </div>
  );
};

export default All;
