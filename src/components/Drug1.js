import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { flexStart } from "../themes/commonStyles";
import { Loads } from "./Loads";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: "#90B2D8",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 1,
    border: "1px solid grey",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: 1,
    // padding: "0px 12px 0px 0px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    height: 1,
  },
}));
export default function Drug1({ onCodeClick, filterText }) {
  console.log("neo enter");
  const [drug, setDrug] = useState(null);
  const [drug1, setDrug1] = useState(null);
  // const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1, setResult1] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const Code = (global.values?.code || "").replace(/[-.]/g, "");
  // const search = global.searches.toLowerCase();

  React.useEffect(() => {
    const fetchAllDetailsDrugData = async () => {
      try {
        const response = await fetch(`/codes/alldetails/drug?title=a`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${global.tokens} `,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDrug1(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    setDrug1(null);
    fetchAllDetailsDrugData();
  }, []);
  // const search = global.searches;

  function getTitleFromNestedChild(row) {
    if (row.child?.child?.child?.child?.code) {
      return `${row.child.title}-${row.child.child.title}-${row.child.child.child.title}-${row.child.child.child.child.title}`;
    } else if (row.child?.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title} - ${row.child.child.child.title}`;
    } else if (row.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title}`;
    } else if (row.child?.code) {
      return `${row.child.title}`;
    } else {
      return row.title;
    }
  }
  const filteredDrug = drug?.filter((item) => {
    return (
      filterText.toLowerCase() === "" ||
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const filteredDrug1 = drug1?.filter((item) => {
    return (
      filterText.toLowerCase() === "" ||
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );
  });
  const handleCodeClick = async (code) => {
    setClickedCode(code);
    console.log(clickedCode);
    const Code1 = (clickedCode || "").replace(/[-.]/g, "");

    try {
      if (code) {
        const response = await fetch(
          `/codes/${(code || "").replace(/[-.]/g, "")}/details/?version=${
            global.years
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${global.tokens}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
          setResult1(data);

          // setSelectedCode(Code1);
          global.selectedCodeDetails = data;
          global.selectedSectionDetails = data;
          global.selectedChapterDetails = data;
          global.intable = null;
          global.selectedCode = Code1;
          global.isCodeClicked = true;
          onCodeClick(Code1);
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "100%" : "48vw";
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
      <Box sx={{ ...flexStart }}>
        <TableContainer
          sx={{
            height: "65vh",
            width: componentWidth,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  border: "1px solid grey",
                  height: "20px",
                  alignItems: "center",
                }}
              >
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  D Index
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  Accidental, UnIntentional Poisoning
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  Intentional, Selfharm Poisoning
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  Assault Poisoning
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  Undetermined Poisoning
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  Adverse Effect
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                  align="center"
                >
                  Under Dosing
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {global.values.code !== null &&
                // drug
                //   ?.filter((item) => {
                //     return (
                //       search === "" || // Convert item.title to lowercase for case-insensitive search
                //       item.title.toLowerCase().includes(search)
                //     );
                //   })
                filteredDrug?.map((row) => {
                  const hasValidParentCode = row.code && row.code[0] !== "null";
                  const hasValidChildCode =
                    row.child && row.child.code && row.child.code[0] !== "null";
                  const hasValidChildChildCode =
                    row.child &&
                    row.child.child &&
                    row.child.child.code &&
                    row.child.child.code[0] !== "null";
                  const hasValidChildChildChildCode =
                    row.child &&
                    row.child.child &&
                    row.child.child.child &&
                    row.child.child.child.code &&
                    row.child.child.child.code[0] !== "null";
                  const hasValidChildChildChildChildCode =
                    row.child &&
                    row.child.child &&
                    row.child.child.child &&
                    row.child.child.child.child &&
                    row.child.child.child.child.code &&
                    row.child.child.child.child.code[0] !== "null";

                  if (
                    !(
                      hasValidParentCode ||
                      hasValidChildCode ||
                      hasValidChildChildCode ||
                      hasValidChildChildChildCode ||
                      hasValidChildChildChildChildCode
                    )
                  ) {
                    return null;
                  }

                  const codeDetails = (
                    hasValidChildChildChildChildCode
                      ? row.child.child.child.child.code
                      : hasValidChildChildChildCode
                      ? row.child.child.child.code
                      : hasValidChildChildCode
                      ? row.child.child.code
                      : hasValidChildCode
                      ? row.child.code
                      : row.code
                  ).join(", ");

                  const chunkedCodeDetails = codeDetails
                    .split(", ")
                    .reduce((acc, code) => {
                      if (!acc.length || acc[acc.length - 1].length === 6) {
                        acc.push([code]);
                      } else {
                        acc[acc.length - 1].push(code);
                      }
                      return acc;
                    }, []);
                  return chunkedCodeDetails.map((chunk, index) => (
                    <StyledTableRow key={`${row.id}_${index}`}>
                      <StyledTableCell component="th" scope="row">
                        {getTitleFromNestedChild(row)}
                      </StyledTableCell>
                      {Array.from({ length: 6 }).map((_, colIndex) => (
                        <StyledTableCell
                          key={`${row.id}_${index}_${colIndex}`}
                          sx={{
                            border: "1px solid grey",
                          }}
                          align="center"
                        >
                          {chunk[colIndex] !== "--" ? (
                            <a
                              style={{ borderBottom: "0.5px solid blue" }}
                              onClick={() => handleCodeClick(chunk[colIndex])}
                            >
                              {chunk[colIndex]}
                            </a>
                          ) : (
                            chunk[colIndex]
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ));
                })}
              {global.values.code !== null &&
                // drug1
                //   ?.filter((item) => {
                //     return search === ""
                //       ? item
                //       : item.title.toLowerCase().includes(search);
                //   })
                filteredDrug1?.map((row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.title}
                      </StyledTableCell>
                      {row.code.map((value, index) => (
                        <StyledTableCell
                          key={index}
                          sx={{
                            border: "1px solid grey",
                          }}
                          align="center"
                        >
                          {value !== "--" ? (
                            <a
                              style={{
                                borderBottom: "0.5px solid blue",
                              }}
                              onClick={() => {
                                handleCodeClick(value);
                                scrollToTop(); // Call scrollToTop when the link is clicked
                              }}
                            >
                              {value}
                            </a>
                          ) : (
                            "--"
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
            {isLoading && <Loads />}
          </Table>
          {global.values?.code !== null && drug && drug.length === 0 && (
            <Typography ml="2%" color="#053559" fontWeight="800" mt="5vh">
              No Drug codes found for the given search criteria.
            </Typography>
          )}
          {!global.values?.code && drug && drug1.length === 0 && (
            <Typography ml="2%" color="#053559" fontWeight="800" mt="5vh">
              No Drug codes available in the data.
            </Typography>
          )}
        </TableContainer>
      </Box>
    </>
  );
}
