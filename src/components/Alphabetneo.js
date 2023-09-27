import { Tab, Tabs, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Neoplasm2 from "./Neoplasm2";
import Neoplasm1 from "./Neoplasm1";
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
    backgroundColor: "#635ee7",
  },
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
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

export const Alphabetneo = ({ setSelectedCode }) => {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCodeDetails, setSelectedCodeDetails] = useState(null);
  const tabLabels = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  const neoplasm1Table = useMemo(
    () => <Neoplasm1 onCodeClick={setSelectedCode} />,
    [search]
  );

  const neoplasm2Table = useMemo(() => {
    return <Neoplasm2 onCodeClick={setSelectedCode} />;
  }, [search]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const clickedTabLabel = tabLabels[newValue];
    console.log("Tab clicked: ", clickedTabLabel);
    global.clickedTab1 = clickedTabLabel;
  };

  console.log(search);
  global.searches = search;

  const handleCodeDetailsUpdate = (details) => {
    setSelectedCodeDetails(details);
  };

  return (
    <div>
      {/* <div style={{ marginTop: 20 }}>
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
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
      </div> */}

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
        {tabLabels.map((label, index) => (
          <CustomTabPanel key={label} value={value} index={index}>
            {label === "a" ? neoplasm1Table : neoplasm2Table}
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
};
