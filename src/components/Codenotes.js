import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "../themes/commonStyles";

const Codenotes = () => {
  const [results, setResults] = useState(null);
  const globalValuesCode = global.values.code;

  const Code = (global.values?.code || "").replace(/[-.]/g, "");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (globalValuesCode && global.years && !global.isCodeClicked) {
          const response = await fetch(
            `/codes/${Code}/details/?version=${global.years}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${global.tokens} `, // Replace with your actual token
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            console.error("Failed to fetch data");
            setResults(null);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setResults(null);
      }
    };
    fetchBooks();
  }, [global.values]);

  useEffect(() => {
    if (global.isCodeClicked) {
      setResults(global.selectedCodeDetails);
    } else {
      setResults(null);
    }
  }, [global.selectedCodeDetails]);

  console.log("our result is", results);

  return (
    <>
      <Box
        sx={{
          p: 2,
        }}
      >
        {results ? (
          results.section && results.section.notes ? (
            <table>
              <tbody className="chapter">
                {results.section.notes.map((note, index) => (
                  <tr key={index}>
                    <td>{note.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <tbody className="chapter">
                <tr>
                  <td>No Code notes</td>
                </tr>
              </tbody>
            </table>
          )
        ) : null}

        {globalValuesCode === "H548" && results?.section?.visualImpairment ? (
          <Box>
            <table className="table1" cellSpacing={0}>
              <thead>
                <tr>
                  <th style={{ ...Table }} rowSpan="2">
                    {results.section.visualImpairment.categoryHeading}
                  </th>
                  <th style={{ ...Table }} colSpan="2">
                    {results.section.visualImpairment.rangeHeading}
                  </th>
                </tr>
                <tr>
                  <th style={{ ...Table }}>
                    {results.section.visualImpairment.maxHeading}
                  </th>
                  <th style={{ ...Table }}>
                    {results.section.visualImpairment.minHeading}
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.section.visualImpairment.categoriesList.map(
                  (category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      {category.value &&
                        category.visRangeList &&
                        category.visRangeList.some(
                          (range) => range.max || range.min
                        ) && (
                          <>
                            {category.visRangeList.map(
                              (range, rangeIndex) =>
                                (range.max || range.min) && (
                                  <tr key={`${categoryIndex}-${rangeIndex}`}>
                                    {rangeIndex === 0 && (
                                      <td
                                        style={{ ...Table }}
                                        rowSpan={category.visRangeList.length}
                                      >
                                        {category.value}
                                      </td>
                                    )}
                                    <td style={{ ...Table }}>{range.max}</td>
                                    <td style={{ ...Table }}>{range.min}</td>
                                  </tr>
                                )
                            )}
                          </>
                        )}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </Box>
        ) : null}
        {results?.section?.sevenChrDef ? (
          <table style={{ ...Table }} border="1">
            <thead>
              <tr>
                <th style={{ ...Table }} rowSpan="2">
                  <h4>7th Char</h4>
                </th>
                <th style={{ ...Table }} rowSpan="2">
                  <h4>Description</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {results.section.sevenChrDef.extensionList.map((charac) => {
                return (
                  <tr key={charac.charValue}>
                    <td style={{ ...Table }}>{charac.charValue}</td>
                    <td style={{ ...Table }}>{charac.extensionValue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </Box>
    </>
  );
};
export default Codenotes;
