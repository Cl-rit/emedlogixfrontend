import { Tab, Tabs, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Codenotes1 from "./codenotes1";
import Sectionnotes1 from "./Sectionnotes1";
import { styled } from "@mui/material/styles";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    sx={{
      height: "30px",
      minHeight: "30px",
    }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#4185D2",
  },
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const tabId = `custom-tab-${index}`;
  const panelId = `custom-tabpanel-${index}`;
  return (
    <div
      role="tabpanel"
      hidden={false}
      id={panelId}
      aria-labelledby={tabId}
      {...other}
    >
      {children}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

export const Alphabet = ({ setSelectedCode }) => {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  // const [filteredResults, setFilteredResults] = useState([]);

  //const [selectedCodeDetails, setSelectedCodeDetails] = useState(null);
  // const tabLabels = Array.from({ length: 26 }, (_, i) =>
  //   String.fromCharCode(97 + i)
  // );

  // const lowercaseSearch = search.toLowerCase();
  // const codenotes1Table = useMemo(
  //   () => (
  //     <Codenotes1
  //       onCodeClick={setSelectedCode}
  //       filter={lowercaseSearch}
  //       setFilteredResults={setFilteredResults}
  //     />
  //   ),
  //   [lowercaseSearch]
  // );
  // const Sectionnotes1Table = useMemo(() => {
  //   return (
  //     <Sectionnotes1
  //       onCodeClick={setSelectedCode}
  //       filter={lowercaseSearch}
  //       setFilteredResults={setFilteredResults}
  //     />
  //   );
  // }, [lowercaseSearch]);

  const tabLabels = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const tabComponents = tabLabels.map((label) => {
    if (label === "a") {
      return <Codenotes1 onCodeClick={setSelectedCode} filterText={search} />;
    } else {
      return (
        <Sectionnotes1 onCodeClick={setSelectedCode} filterText={search} />
      );
    }
  });
  useEffect(() => {
    // Automatically switch to the tab starting with the first letter of the filter text
    const firstLetter = search.charAt(0).toLowerCase();
    const tabIndex = tabLabels.indexOf(firstLetter);
    if (tabIndex !== -1) {
      setValue(tabIndex);
    }
  }, [search]);

  // const handleSearchChange = (event) => {
  //   const searchText = event.target.value.toLowerCase();
  //   setSearch(searchText);

  //   // Set global.clickedTab2 to the search text itself
  //   global.clickedTab2 = searchText;
  // };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const clickedTabLabel = tabLabels[newValue];
    console.log("Tab clicked: ", clickedTabLabel);
    global.clickedTab2 = clickedTabLabel;
  };
  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearch(searchText);
    global.clickedTab2 = searchText;
    // console.log(global.clickedTab);

    // console.log(search);
    // global.searches = search;
    // const handleCodeDetailsUpdate = (details) => {
    //   setSelectedCodeDetails(details);
    // };
  };
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TextField
          sx={{
            width: "200px",
            "& input": {
              height: "4px",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          placeholder=" Use Filter"
          value={search}
          onChange={handleSearchChange}
          aria-label="Search"
        />
      </div>

      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Tab Navigation"
        className="tabs"
        sx={{
          background: "linear-gradient(to right, #E9F8FF,#90B2D8 , #C1E3FF)",
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={label}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{
              cursor: "pointer",
              color: "#4185D2",
              fontSize: "15px",
              mt: "-10px",
            }}
            label={label}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>

      <div
        className="tabpanels"
        style={{
          height: "60vh",
          overflowY: "scroll",
          backgroundColor: "#C7E1ED",
        }}
      >
        {tabComponents.map((component, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {value === index && component}
          </CustomTabPanel>
        ))}
        {/* {tabLabels.map((label, index) => (
          <CustomTabPanel key={label} value={value} index={index}>
            {label.toLowerCase() === "a" ? codenotes1Table : Sectionnotes1Table}
          </CustomTabPanel>
        ))} */}
      </div>
    </div>
  );
};
