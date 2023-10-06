import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IndexSearch from "./IndexSearch";
import TabularSearch from "./TabularSearch";
import { Box, Stack } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import DownArrowButton from "./DownArrowButton";

function Main({
  refreshMain,
  isNeoplasmCodeClicked,
  selectedItem,
  isDrugCodeClicked,
}) {
  const [selectedCode, setSelectedCode] = useState(null);

  useEffect(() => {
    if (refreshMain) {
      handleRefresh();
    }
  }, [refreshMain]);
  const handleRefresh = () => {
    setSelectedCode(null);
  };
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "95vw",
      }}
    >
      <Stack direction={isSmOrMd ? "column" : "row"} spacing={1}>
        {isSmOrMd ? (
          // Container 1 on top for xs/sm screens
          <>
            {" "}
            <DownArrowButton />
            <TabularSearch
              refreshMain={refreshMain}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              handleRefresh={handleRefresh}
            />
            <IndexSearch
              refreshMain={refreshMain}
              isNeoplasmCodeClicked={isNeoplasmCodeClicked}
              selectedItem={selectedItem}
              isDrugCodeClicked={isDrugCodeClicked}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              handleRefresh={handleRefresh}
            />
          </>
        ) : (
          // Container 2 on top for larger screens
          <>
            <IndexSearch
              refreshMain={refreshMain}
              isNeoplasmCodeClicked={isNeoplasmCodeClicked}
              selectedItem={selectedItem}
              isDrugCodeClicked={isDrugCodeClicked}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              handleRefresh={handleRefresh}
            />
            <TabularSearch
              refreshMain={refreshMain}
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              handleRefresh={handleRefresh}
            />
          </>
        )}
      </Stack>
    </Box>
  );
}
Main.propTypes = {
  refreshMain: PropTypes.bool,
  isNeoplasmCodeClicked: PropTypes.bool,
  selectedItem: PropTypes.object,
  isDrugCodeClicked: PropTypes.bool,
};
export default Main;
