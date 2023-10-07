import { Box, useMediaQuery } from "@mui/material";
import React, { Fragment, useState } from "react";
import { flexStart } from "../themes/commonStyles";
import { Loads } from "./Loads";

const removeDuplicates = (arr) => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = `${item.code}_${item.title}`;
    const duplicate = seen.has(key);
    seen.add(key);
    return !duplicate;
  });
};
const renderChildRows = (row, depthLevel = 1) => {
  if (row.child) {
    const paddingLeftValue = 20 + depthLevel * 20;
    return (
      <>
        <tr key={row.child.id}>
          <td style={{ paddingLeft: `${paddingLeftValue}px` }}>
            <ul
              style={{
                listStyleType: "circle",
                paddingLeft: "20px",
                margin: 0,
              }}
            >
              {row.child.title && (
                <li>
                  {row.child.title}
                  <a style={{ color: "blue", borderBottom: "1px solid blue" }}>
                    {row.child.code !== null &&
                      row.child.code !== "null" &&
                      ` ${row.child.code}`}
                  </a>
                </li>
              )}
            </ul>
          </td>
        </tr>
        {renderChildRows(row.child, depthLevel + 1)}
      </>
    );
  }
  return null;
};
const Sectionnotes1 = ({ onCodeClick, filterText }) => {
  const [index1, setIndex1] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const Code = (global.values?.code || "").replace(/[-.]/g, "");

  const filteredindex1 = index1?.filter((item) => {
    return (
      filterText.toLowerCase() === "" ||
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  React.useEffect(() => {
    // console.log("enter index table");
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `codes/alldetails/index/title?filterBy=${global.clickedTab2}&version=${global.years}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${global.tokens} `,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIndex1(data);
        } else {
          // console.error("Failed to fetch data");
        }
      } catch (error) {
        // console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchBooks();
  }, []);
  // console.log("our index1 is", index1);
  // console.log(global.searches);

  const handleCodeClick = async (code) => {
    setClickedCode(code);
    global.intable = null;
    await fetchCodeDetails(code);
    onCodeClick(code);
    global.selectedCodeDetails = fetchedData;
    global.intable = null;
    global.selectedCode = code;
    global.isCodeClicked = true;
  };
  React.useEffect(() => {
    if (fetchedData) {
      global.selectedCodeDetails = fetchedData;
    }
  }, [fetchedData]);
  const fetchCodeDetails = async (code) => {
    try {
      if (code) {
        const response = await fetch(
          `/codes/${(code || "").replace(/[-.]/g, "")}/details/?version=${
            global.years
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${global.tokens} `,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
        } else {
          // console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "100%" : "45vw";
  const scrollToTop = () => {
    setTimeout(() => {
      if (isSmOrMd) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
      }
    }, 500);
  };
  return (
    <>
      <Box sx={{ ...flexStart, mt: 2, ml: 1 }}>
        <div
          style={{
            width: componentWidth,
          }}
        >
          <table>
            <tbody style={{ textAlign: "left" }}>
              {!global.values?.code &&
                filteredindex1?.map((row) => {
                  return (
                    <Fragment key={row.id}>
                      <tr>
                        <td>
                          <ul
                            style={{
                              listStyleType: "square",
                              paddingLeft: "20px",
                              margin: 2,
                            }}
                          >
                            {row.nemod !== null && row.nemod !== "null" ? (
                              <li>
                                {row.title} {row.nemod}
                              </li>
                            ) : (
                              <li>{row.title}</li>
                            )}
                          </ul>
                        </td>
                        {row.seealso !== null && row.seealso !== "null" && (
                          <td>
                            <a
                              style={{
                                color: "blue",
                                borderBottom: "1px solid blue",
                              }}
                            >
                              SeeAlso {row.seealso}
                            </a>
                          </td>
                        )}
                        {row.see !== null && row.see !== "null" && (
                          <td>
                            <a
                              style={{
                                color: "blue",
                                borderBottom: "1px solid blue",
                              }}
                            >
                              See {row.see}
                            </a>
                          </td>
                        )}
                        {row.code !== null && row.code !== "null" && (
                          <td>
                            <a
                              style={{
                                color: "blue",
                                borderBottom: "1px solid blue",
                              }}
                              onClick={() => {
                                handleCodeClick(row.code);
                                scrollToTop();
                              }}
                            >
                              {row.code}
                            </a>
                          </td>
                        )}
                      </tr>
                      {renderChildRows(row)}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
          <Box sx={{ ml: -10 }}>{isLoading && <Loads />}</Box>
        </div>
      </Box>
    </>
  );
};
export default Sectionnotes1;
