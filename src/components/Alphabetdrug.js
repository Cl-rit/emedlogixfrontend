import { Tab, Tabs, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Drug1 from "./Drug1";
import Drug2 from "./Drug2";
import { styled } from "@mui/material/styles";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    sx={{ height: "0px" }}
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
  return (
    <div
      role="tabpanel"
      hidden={false}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Alphabetdrug = ({ setSelectedCode }) => {
  const [value, setValue] = useState(0);
  const [selectedCodeDetails, setSelectedCodeDetails] = useState(null);
  // const [debouncedSearch, setDebouncedSearch] = useState("");
  const [search, setSearch] = useState("");
  // const tabLabels = Array.from({ length: 26 }, (_, i) =>
  //   String.fromCharCode(97 + i)
  // );

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

  // const lowercaseSearch = search.toLowerCase();
  // // Define memoized tables for drug1 and drug2
  // const drug1Table = useMemo(() => {
  //   return <Drug1 onCodeClick={setSelectedCode} filter={lowercaseSearch} />;
  // }, [lowercaseSearch]);

  // const drug2Table = useMemo(() => {
  //   return <Drug2 onCodeClick={setSelectedCode} filter={lowercaseSearch} />;
  // }, [lowercaseSearch]);

  // // Define a debounce function
  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };
  // // Define a function to handle search input changes with debounce
  // const handleSearchChangeDebounced = debounce((value) => {
  //   setSearch(value);
  // }, 500); // Adjust the delay (in milliseconds) as needed

  const tabComponents = tabLabels.map((label) => {
    if (label === "a") {
      return <Drug1 onCodeClick={setSelectedCode} filterText={search} />;
    } else {
      return <Drug2 onCodeClick={setSelectedCode} filterText={search} />;
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
  console.log(search);
  global.searches = search;
  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearch(searchText);

    // Set global.clickedTab2 to the search text itself
    global.clickedTab2 = searchText;
  };
  // const handleCodeDetailsUpdate = (details) => {
  //   setSelectedCodeDetails(details);
  // };
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
        aria-label="basic tabs example"
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
            }}
            label={label}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
      <div className="tabpanels">
        {" "}
        {tabComponents.map((component, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {value === index && component}
          </CustomTabPanel>
        ))}
        {/* {tabLabels.map((label, index) => (
          <CustomTabPanel key={label} value={value} index={index}>
            {label.toLowerCase() === "a" ? drug1Table : drug2Table}
          </CustomTabPanel>
        ))} */}
      </div>
    </div>
  );
};
