import React, { Fragment, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Alphabet } from "./Alphabet";
import { flexStart } from "../themes/commonStyles";

const IndexTables1 = ({ setResults1, setSelectedCode }) => {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(null);
  const [clickedCode, setClickedCode] = useState(null);
  const [results2, setResults2] = useState([]);

  const Code = (global.values?.code || "").replace(/[-.]/g, "");

  React.useEffect(() => {
    // console.log("enter index table");
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code !== null) {
          const response = await fetch(
            `/codes/${(global.values.code || "").replace(
              /[-.]/g,
              ""
            )}/index?version=${global.years}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${global.tokens} `,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setIndex(data);
          } else {
            // console.error("Failed to fetch data");
          }
        } else {
          // console.error("Failed to fetch data");
        }
      } catch (error) {
        // console.error("Error:", error);
      }
    };

    setIndex(null);
    if (global.values && global.values.code !== null) {
      fetchBooks();
    }
  }, [global.values?.code]);

  // console.log("our index is", index);

  const handleCodeClick = async (code) => {
    global.isCodeClicked = true;
    setClickedCode(code);

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
          setResults1(data);
          setSelectedCode(code);
          global.selectedCodeDetails = data;
          global.selectedSectionDetails = data;
          global.selectedChapterDetails = data;
          global.selectedCode = code;
        } else {
          // console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const renderChildRows = (row, depthLevel = 1) => {
    if (row.child && row.child.code !== null) {
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
                    {row.child.title}{" "}
                    {row.child.code !== null && row.child.code !== "null" && (
                      <a
                        style={{
                          color: "blue",
                          borderBottom: "1px solid blue",
                        }}
                        onClick={() => handleCodeClick(row.code)}
                      >
                        {row.child.code}
                      </a>
                    )}
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
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "100%" : "48vw";
  const scrollToTop = () => {
    setTimeout(() => {
      if (isSmOrMd) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
      }
    }, 1000);
  };
  return (
    <>
      {!global.values || !global.values.code ? (
        <Alphabet
          setSelectedCode={setSelectedCode}
          selectedCodeDetails={results2}
        />
      ) : null}

      {global.values && global.values.code && (
        <Box sx={{ ...flexStart, mt: 5 }}>
          <div
            style={{
              height: "65vh",
              backgroundColor: "#C7E1ED",
              overflow: "auto",
              width: componentWidth,
            }}
          >
            <table style={{ marginTop: "50px", marginLeft: "10px" }}>
              <tbody style={{ textAlign: "left" }}>
                {global.values?.code !== null &&
                  index
                    ?.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.title.toLowerCase().includes(search);
                    })
                    .map((row) => (
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
                              {row.nemod ? (
                                <li>
                                  {row.title}{" "}
                                  {row.nemod !== null &&
                                    row.nemod !== "null" &&
                                    row.nemod}
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
                                seeAlso {row.seealso}
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
                                See{row.see}
                              </a>
                            </td>
                          )}
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
                              {row.code !== null &&
                                row.code !== "null" &&
                                row.code}
                            </a>
                          </td>
                        </tr>
                        {renderChildRows(row)}
                      </Fragment>
                    ))}
              </tbody>

              {global.values?.code !== null && index && index.length === 0 && (
                <Typography color="#053559" fontWeight="800" mt="9vh">
                  No Index codes found for the given search criteria.
                </Typography>
              )}
            </table>
          </div>
        </Box>
      )}
    </>
  );
};
export default IndexTables1;
