import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import Codedet from "./Codedet";
import PropTypes from "prop-types";
import Codenotes from "./Codenotes";
import Sectionnotes from "./Sectionnotes";
import Chapternotes from "./Chapternotes";
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    sx={{ height: "30px", minHeight: "30px" }}
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

const TabularSearch = ({ refreshMain, selectedCode, setSelectedCode }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (refreshMain) {
      handleRefresh();
    }
  }, [refreshMain]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRefresh = () => {
    setValue(0);
    setSelectedCode(null);
  };
  useEffect(() => {
    if (selectedCode !== null) {
      handleRefresh();
    }
  }, [selectedCode]);
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "100%" : "46vw";

  return (
    <div
      style={{
        height: "88vh",
        width: componentWidth,
        border: "0.5px solid grey",
      }}
    >
      <Box
        sx={{
          height: "3vh",
          width: componentWidth,
        }}
      >
        <Typography variant="subtitle1" color=" #4185D2">
          Tabular Search
        </Typography>
        <Typography
          mt={1.5}
          variant="subtitle1"
          color={" #4185D2"}
          fontWeight={600}
          sx={{
            borderBottom: "0.3px solid grey",
          }}
        >
          Code details
        </Typography>

        <Box>{<Codedet />}</Box>
        <Box
          style={{
            height: "50vh",
            width: componentWidth,
            marginTop: "20px",
          }}
        >
          <Box sx={{ width: componentWidth }}>
            <Box
              sx={{
                marginTop: "10px",
                background:
                  "linear-gradient(to right, #E9F8FF,#90B2D8 , #C1E3FF)",
                width: componentWidth,
              }}
            >
              <StyledTabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
                <Tab
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    cursor: "pointer",
                    height: 3,
                    mt: "-10px",
                    fontSize: "15px",
                    color: "#4185D2",
                  }}
                  label="  Code notes"
                  {...a11yProps(0)}
                />
                <Tab
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    cursor: "pointer",
                    height: 3,
                    mt: "-10px",
                    fontSize: "15px",
                    color: "#4185D2",
                  }}
                  label="Section notes"
                  {...a11yProps(1)}
                />
                <Tab
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    cursor: "pointer",
                    height: 3,
                    mt: "-10px",
                    fontSize: "15px",
                    color: "#4185D2",
                  }}
                  label="Chapter notes"
                  {...a11yProps(2)}
                />
                <Tab
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    cursor: "pointer",
                    height: 3,

                    mt: "-10px",
                    fontSize: "15px",
                    color: "#4185D2",
                  }}
                  label="Chapter guidlines"
                  {...a11yProps(3)}
                />
              </StyledTabs>
            </Box>

            <Box
              style={{
                marginTop: "20px",
                overflow: "auto",
                width: componentWidth,
                height: "45vh",
              }}
            >
              <CustomTabPanel value={value} index={0}>
                <Codenotes />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Sectionnotes />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Chapternotes />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}></CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
TabularSearch.propTypes = {
  refreshMain: PropTypes.bool,
  selectedCode: PropTypes.object,
  setSelectedCode: PropTypes.func,
};
export default TabularSearch;
