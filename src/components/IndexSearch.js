import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IndexTables1 from "./IndexTable1";
import NeoplasmTable from "./NeoplasmTable";
import DrugTable from "./DrugTable";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";

function IndexSearch({
  isNeoplasmCodeClicked,
  selectedItem,
  isDrugCodeClicked,
  handleRefresh,
  selectedCode, // Receive selectedCode as a prop
  setSelectedCode, // Receive setSelectedCode as a prop
}) {
  const [showTable, setShowTable] = useState(false);
  const [showIndex, setShowIndex] = useState(true);
  const [showDrug, setShowDrug] = useState(false);
  const [results1, setResults1] = useState([]);

  const [activeBtn, setActiveBtn] = useState("btn1");

  const handleNavBtnClick = (btnId) => {
    setActiveBtn((prevActiveBtn) => (prevActiveBtn === btnId ? null : btnId));

    setShowIndex(btnId === "btn1");
    setShowTable(btnId === "btn2");
    setShowDrug(btnId === "btn3");
    handleRefresh();
  };
  // const handleNavBtnClick = (btnId) => {
  //   setActiveBtn(btnId);
  //   setShowIndex(!showIndex);
  //   setShowTable(false);
  //   setShowDrug(false);
  //   handleRefresh();
  // };

  // const handleNavBtnClick2 = (btnId) => {
  //   setActiveBtn(btnId);
  //   setShowTable(!showTable);
  //   setShowIndex(false);
  //   setShowDrug(false);
  //   handleRefresh();
  // };

  // const handleNavBtnClick3 = (btnId) => {
  //   setActiveBtn(btnId);
  //   setShowDrug(!showDrug);
  //   setShowIndex(false);
  //   setShowTable(false);
  //   handleRefresh();
  // };

  //   const handleRefresh = () => {
  //     setActiveBtn("btn1");
  //     setResults1([]);
  //     setSelectedCode(null);
  //   };

  useEffect(() => {
    if (selectedCode !== null) {
      handleRefresh();
    }
  }, [selectedCode]);

  useEffect(() => {
    if (isNeoplasmCodeClicked && !showTable) {
      setActiveBtn("btn2");
      setShowTable(true);
      setShowIndex(false);
      setShowDrug(false);
      setSelectedCode(selectedCode);
    } else if (isDrugCodeClicked && !showDrug) {
      setActiveBtn("btn3");
      setShowTable(false);
      setShowIndex(false);
      setShowDrug(true);
      setSelectedCode(selectedCode);
    } else if (!isNeoplasmCodeClicked && !isDrugCodeClicked) {
      setActiveBtn("btn1");
      setShowTable(false);
      setShowIndex(true);
      setShowDrug(false);
    }
  }, [isNeoplasmCodeClicked, isDrugCodeClicked]);
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "100%" : "48vw";

  return (
    <Box
      sx={{
        height: "88vh",
        width: componentWidth,
        border: "0.5px solid grey",
      }}
    >
      <Stack direction={"row"}>
        <Button
          variant="contained"
          sx={{
            width: "100px",
            height: "30px",
            borderRadius: 0,
            border: ".5px solid #053559",
            color: activeBtn === "btn1" ? "white" : "#053559",
            backgroundColor: activeBtn === "btn1" ? "#90B2D8" : "#E9F8FF",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: activeBtn === "btn1" ? "#90B2D8" : "#E9F8FF",
            },
          }}
          className={`nav-btn ${activeBtn === "btn1" ? "active" : ""}`}
          onClick={() => handleNavBtnClick("btn1")}
        >
          Index
        </Button>

        <Button
          variant="contained"
          sx={{
            marginLeft: 1,
            width: "100px",
            height: "30px",
            borderRadius: 0,
            border: ".5px solid #053559",
            color: activeBtn === "btn2" ? "white" : "#053559",
            backgroundColor: activeBtn === "btn2" ? "#90B2D8" : "#E9F8FF",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: activeBtn === "btn2" ? "#90B2D8" : "#E9F8FF",
            },
          }}
          className={`nav-btn ${activeBtn === "btn2" ? "active" : ""}`}
          onClick={() => handleNavBtnClick("btn2")}
        >
          Neoplasm
        </Button>

        <Button
          variant="contained"
          sx={{
            marginLeft: 1,
            width: "100px",
            height: "30px",
            borderRadius: 0,
            border: ".5px solid #053559",
            color: activeBtn === "btn3" ? "white" : "#053559",
            backgroundColor: activeBtn === "btn3" ? "#90B2D8" : "#E9F8FF",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: activeBtn === "btn3" ? "#90B2D8" : "#E9F8FF",
            },
          }}
          className={`nav-btn ${activeBtn === "btn3" ? "active" : ""}`}
          onClick={() => handleNavBtnClick("btn3")}
        >
          Drug
        </Button>
      </Stack>{" "}
      {activeBtn === "btn1" && (
        <IndexTables1
          setResults1={setResults1}
          setSelectedCode={setSelectedCode}
        />
      )}
      {activeBtn === "btn2" && (
        <NeoplasmTable
          setResults1={setResults1}
          setSelectedCode={setSelectedCode}
        />
      )}
      {activeBtn === "btn3" && (
        <DrugTable
          setResults1={setResults1}
          setSelectedCode={setSelectedCode}
        />
      )}
    </Box>
  );
}

IndexSearch.propTypes = {
  isNeoplasmCodeClicked: PropTypes.bool,
  selectedItem: PropTypes.object,
  isDrugCodeClicked: PropTypes.bool,
  handleRefresh: PropTypes.func, // You need to add this prop
  selectedCode: PropTypes.object, // You don't need to redeclare this prop
  setSelectedCode: PropTypes.func,
};

export default IndexSearch;
