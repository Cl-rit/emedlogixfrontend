import { Close } from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";

import React, { useEffect, useState } from "react";
import { flexCenter } from "../themes/commonStyles";

const Codedet = () => {
  console.log("enter codedet page");
  console.log(global.index, "codedet index value");
  const [result, setResult] = useState(null);
  const [result1, setResult1] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  console.log(global.results);
  console.log(global.values.code);

  const Code = (global.values?.code || "").replace(/[-.]/g, "");

  useEffect(() => {
    if (global.selectedCodeDetails) {
      setResult(global.selectedCodeDetails);
    } else {
      setResult(null);
    }
  }, [global.selectedCodeDetails]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code && global.years) {
          const response = await fetch(
            `/codes/${(global.values.code || "").replace(
              /[-.]/g,
              ""
            )}/details/?version=${global.years}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${global.tokens} `, // Replace with your actual token
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setResult(data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.values]);
  const handleClose = () => {
    setIsClosed(true);
    window.location.reload();
  };
  console.log("our result is", result);
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "auto" : "170px";
  const componentHeight = isSmOrMd ? "auto" : "2vh";
  return (
    <Box>
      {result && (
        <div>
          <div>
            <Button
              disableFocusRipple
              disableRipple
              sx={{
                border: "0.5px solid green",
                textAlign: "center",
                mt: 2,
                ml: 2,
                height: "5vh",
                width: "auto",
                backgroundColor: "#ADD8E6",
              }}
            >
              {result.code}
              <Close
                sx={{
                  width: "20px",
                  ml: "5px",
                  color: "#4169E1",
                }}
                onClick={handleClose}
              />
            </Button>
          </div>
          <table
            style={{
              ...flexCenter,
              width: "95%",
              marginLeft: "5%",
            }}
          >
            <tbody>
              {result && (
                <tr key={result.code} style={{ textAlign: "center" }}>
                  <td>{result.code}</td>
                  <td>{result.longDescription}</td>
                  <td>
                    {result.billable === true ? (
                      <Button
                        variant="contained"
                        sx={{
                          width: componentWidth,
                          height: componentHeight,
                          color: "white",

                          backgroundColor: "green",
                          textTransform: "lowercase",
                          fontWeight: "700px",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                        }}
                      >
                        Billable Codes
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disableElevation
                        disableFocusRipple
                        sx={{
                          color: "white",
                          width: componentWidth,
                          height: componentHeight,

                          backgroundColor: "orange",
                          textTransform: "lowercase",
                          fontWeight: "700px",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "orange",
                          },
                        }}
                      >
                        NonBillable Codes
                      </Button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Box>
  );
};
export default Codedet;
