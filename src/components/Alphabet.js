import { Tab, Tabs, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Codenotes1 from "./codenotes1";
import Sectionnotes1 from "./Sectionnotes1";
import { styled } from "@mui/material/styles";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    sx={{
      height: "0px",
      MuiTab: {
        root: {
          minHeight: 70,
        },
      },
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
    backgroundColor: "#635ee7",
  },
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const tabId = `custom-tab-${index}`;
  const panelId = `custom-tabpanel-${index}`;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={panelId}
      aria-labelledby={tabId}
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
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

export const Alphabet = ({ setSelectedCode }) => {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCodeDetails, setSelectedCodeDetails] = useState(null);
  const tabLabels = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  const codenotes1Table = useMemo(
    () => <Codenotes1 onCodeClick={setSelectedCode} />,
    [search]
  );
  const Sectionnotes1Table = useMemo(() => {
    return <Sectionnotes1 onCodeClick={setSelectedCode} />;
  }, [search]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const clickedTabLabel = tabLabels[newValue];
    console.log("Tab clicked: ", clickedTabLabel);
    global.clickedTab = clickedTabLabel;
  };
  console.log(global.clickedTab);

  console.log(search);
  global.searches = search;
  const handleCodeDetailsUpdate = (details) => {
    setSelectedCodeDetails(details);
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
          onChange={(e) => setSearch(e.target.value)}
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
        {tabLabels.map((label, index) => (
          <CustomTabPanel key={label} value={value} index={index}>
            {label === "a" ? codenotes1Table : Sectionnotes1Table}
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
};
