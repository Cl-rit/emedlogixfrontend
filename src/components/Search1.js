import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import "../App.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types"; // Import PropTypes

const Search1 = (props) => {
  const [result, setResult] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState("");
  const [word, setWord] = useState("");
  const [isValueSelected, setIsValueSelected] = useState(false);
  const [isDescriptionFetched, setIsDescriptionFetched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshMain, setRefreshMain] = useState(false);
  const [isNeoplasmCodeClicked, setisNeoplasmCodeClicked] = useState(false);
  const [isDrugCodeClicked, setisDrugCodeClicked] = useState(false);

  global.tokens = localStorage.getItem("emed");
  console.log(global.tokens);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setWord(newValue);
    if (newValue.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setSelectedItem(null);
    setIsValueSelected(false);
    setRefreshMain(!refreshMain);
    global.isCodeClicked = false;
  };
  const handleClearInput = () => {
    setWord("");
    setSelectedItem(null);
    setIsValueSelected(false);

    setIsValueSelected(null);
  };
  console.log(word);

  useEffect(() => {
    //const getdataAftertimeout = setTimeout(() => {

    global.inatbleresult = null;

    const fetchBooks = async () => {
      try {
        if (word) {
          const regex =
            /^[a-zA-Z]$|^[a-zA-Z]+\d+$|^[a-zA-Z]+\d+[a-zA-Z]+$|^[a-zA-Z]+\d+[a-zA-Z]+\d+$/;
          const combinedData = [];

          if (regex.test(word)) {
            const response = await fetch(`/codes/${word}/matches`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${global.tokens} `,
              },
            });
            setIsDescriptionFetched(false);

            if (response.ok) {
              const data = await response.json();
              combinedData.push(...data);
            } else {
              console.error("Failed to fetch data from the first API");
            }
          } else if (
            /^[a-zA-Z]{2,}\s[a-zA-Z]{1,}\s[a-zA-Z]{1,}$/.test(word) ||
            word.length > 3
          ) {
            const response = await fetch(
              `/codes/index/search/name?name=${word}&mainTermSearch=true`,
              // `/codes/index/search/combined?name=${word}&mainTermSearch=true`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${global.tokens} `,
                },
              }
            );
            setIsDescriptionFetched(true);

            if (response.ok) {
              const data = await response.json();
              combinedData.push(...data);
            } else {
              console.error("Failed to fetch data from the first API");
            }

            const alterResponse = await fetch(
              `/codes/alter-terms/search?alterDescription=${word}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${global.tokens} `,
                },
              }
            );
            setIsDescriptionFetched(true);
            if (alterResponse.ok) {
              const alterData = await alterResponse.json();
              combinedData.push(...alterData);

              console.log("Second API response:", alterData);
            } else {
              console.error("Failed to fetch data from the second API");
            }
            const thirdResponse = await fetch(`/codes/${word}/description`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${global.tokens} `,
              },
            });
            setIsDescriptionFetched(true);
            if (thirdResponse.ok) {
              const alterrData = await thirdResponse.json();
              combinedData.push(...alterrData);
              console.log("third API response:", alterrData);
            } else {
              console.error("Failed to fetch data from the third API");
            }
          } else {
            console.error("Invalid input");
          }

          setResult(combinedData);
        } else {
          setResult([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBooks();
    //  }, 600);
    //  return () => clearTimeout(getdataAftertimeout);
  }, [word]);
  console.log(result);

  console.log("our result is", result);
  console.log(first);
  global.values = first;
  global.words = word;

  //if (setIsDescriptionFetched) {
  // window.sortOptions = (options, typedValueLower) => {
  //   return options.sort((a, b) => {
  //     const aTitle = (a.title || a.description || a.alterDescription || a.see || a.seealso)?? "";
  //     const bTitle = (b.title || b.description || b.alterDescription || a.see || a.seealso )?? "";
  //     const aLower = aTitle.toLowerCase();
  //     const bLower = bTitle.toLowerCase();
  //     if (aLower.startsWith(typedValueLower)) return -1;
  //     if (bLower.startsWith(typedValueLower)) return 1;
  //     return aLower.localeCompare(bLower);
  //   });
  // };

  // if (setIsDescriptionFetched) {
  //   window.sortOptions = (options, typedValue) => {
  //     const typedValueLower = typedValue.toLowerCase();
  //     const sanitizedTypedValue = typedValueLower.replace(/['s-]/g, "");

  //     return options.sort((a, b) => {
  //       // Check if either 'a' or 'b' has a type property equal to "ismainterm"
  //       if (a.type === "ismainterm") {
  //         return -1; // 'a' comes before 'b'
  //       } else if (b.type === "ismainterm") {
  //         return 1; // 'b' comes before 'a'
  //       }

  //       const aContent = `${a.title || ""} ${a.description || ""} ${
  //         a.alterDescription || ""
  //       }`;
  //       const bContent = `${b.title || ""} ${b.description || ""} ${
  //         b.alterDescription || ""
  //       }`;
  //       const aLower = aContent.toLowerCase();
  //       const bLower = bContent.toLowerCase();

  //       // Preprocess the content of a and b to ignore 's and hyphens
  //       const aContentSanitized = aLower.replace(/['s-]/g, "");
  //       const bContentSanitized = bLower.replace(/['s-]/g, "");

  //       // Calculate how well a and b match the typed value
  //       const matchScoreA = aContentSanitized.includes(sanitizedTypedValue)
  //         ? 1
  //         : 0;
  //       const matchScoreB = bContentSanitized.includes(sanitizedTypedValue)
  //         ? 1
  //         : 0;

  //       // Sort in descending order of match score
  //       if (matchScoreA > matchScoreB) return -1;
  //       if (matchScoreA < matchScoreB) return 1;

  //       // If match scores are equal, sort alphabetically
  //       return aLower.localeCompare(bLower);
  //     });
  //   };
  // }
  if (setIsDescriptionFetched) {
    window.sortOptions = (options, typedValue) => {
      const typedValueLower = typedValue ? typedValue.toLowerCase() : "";
      const sanitizedTypedValue = typedValueLower.replace(/['s-]/g, "");

      return options.sort((a, b) => {
        const aTitle =
          (a.title ||
            a.description ||
            a.alterDescription ||
            a.see ||
            a.seealso) ??
          "";
        const bTitle =
          (b.title ||
            b.description ||
            b.alterDescription ||
            b.see ||
            b.seealso) ??
          "";
        const aLower = aTitle.toLowerCase();
        const bLower = bTitle.toLowerCase();
        const aContentSanitized = aLower.replace(/['s-]/g, "");
        const bContentSanitized = bLower.replace(/['s-]/g, "");

        // Check if any part of the user-typed value matches with "ismainTerm" options
        const matchesA =
          a.type === "ismainterm" &&
          aContentSanitized.includes(sanitizedTypedValue);
        const matchesB =
          b.type === "ismainterm" &&
          bContentSanitized.includes(sanitizedTypedValue);

        if (matchesA && !matchesB) return -1;
        if (matchesB && !matchesA) return 1;

        if (aContentSanitized === sanitizedTypedValue) return -1;
        if (bContentSanitized === sanitizedTypedValue) return 1;

        return aContentSanitized.localeCompare(bContentSanitized);
      });
    };
  }
  /* differ from kps*/
  const HandleClick = () => {
    setisNeoplasmCodeClicked(true);
  };
  const HandleClicks = () => {
    setisDrugCodeClicked(true);
  };
  const handleSelectedItemChange = (newSelectedItem) => {
    setSelectedItem(newSelectedItem);
    setIsValueSelected(true);

    // Check if the selectedItem has 'Neoplasm' in its description or 'seealso'
    if (
      newSelectedItem &&
      (newSelectedItem.description?.includes("Neoplasm") ||
        newSelectedItem.seealso?.includes("Neoplasm") ||
        newSelectedItem.see?.includes("Neoplasm"))
    ) {
      props.onNeoplasmCodeClick(true);
      props.onDrugCodeClick(false); // Activate the Neoplasm button
    } else if (
      newSelectedItem &&
      (newSelectedItem.description?.includes("Drug") ||
        newSelectedItem.seealso?.includes("Drug") ||
        newSelectedItem.see?.includes("Drug"))
    ) {
      props.onDrugCodeClick(true); // Activate the Neoplasm button
      props.onNeoplasmCodeClick(false);
    } else {
      props.onNeoplasmCodeClick(false);
      props.onDrugCodeClick(false);
    }
  };
  function handleclick() {}
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const componentWidth = isSmOrMd ? "65%" : "70%";
  const componentMargin = isSmOrMd ? 1 : 3;
  return (
    <>
      <Box
        sx={{
          height: "80px",
          ml: componentMargin,
          width: componentWidth,
        }}
      >
        <Box
          sx={{
            margin: "auto",
            color: "black",

            mt: "20px",
            width: "100%",
          }}
          direction="column"
          gap={5}
        >
          <TextField
            style={{ width: "100%" }}
            sx={{
              "& input": {
                height: "5px",
              },
            }}
            onChange={handleChange}
            placeholder="Search for code"
            value={
              selectedItem && isValueSelected
                ? `${
                    selectedItem.code !== null &&
                    selectedItem.code !== "null" &&
                    selectedItem.code !== undefined
                      ? selectedItem.code
                      : ""
                  } ${
                    selectedItem.description !== null &&
                    selectedItem.description !== "null" &&
                    selectedItem.description
                      ? selectedItem.description
                      : ""
                  } ${
                    selectedItem.alterDescription !== null &&
                    selectedItem.alterDescription !== "null" &&
                    selectedItem.alterDescription
                      ? selectedItem.alterDescription
                      : ""
                  } ${
                    selectedItem.title !== null &&
                    selectedItem.title !== "null" &&
                    selectedItem.title !== undefined
                      ? selectedItem.title
                      : ""
                  } ${
                    selectedItem.see !== null &&
                    selectedItem.see !== "null" &&
                    selectedItem.see !== undefined
                      ? selectedItem.see
                      : ""
                  } ${
                    selectedItem.seealso !== null &&
                    selectedItem.seealso !== "null" &&
                    selectedItem.seealso !== undefined
                      ? selectedItem.seealso
                      : ""
                  }`
                : word
            }
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                setSelectedItem(null);
                setIsValueSelected(false);
              }
            }}
            inputProps={{
              autoComplete: "off",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {word || selectedItem ? (
                    <CloseIcon
                      sx={{
                        fontSize: "20px",
                      }}
                      onClick={handleClearInput}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <SearchIcon sx={{ cursor: "context-menu" }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Autocomplete
            disableClearable
            freeSolo
            id="users"
            defaultValue={null}
            getOptionLabel={(item) =>
              `${item.title || ""}   ${item.seealso || ""}   ${
                item.see || ""
              } ${item.description || ""} ${item.code || ""} ${item.nemod}${
                item.alterDescription || ""
              }`
            }
            options={
              isDescriptionFetched
                ? window.sortOptions([...result], word).slice(0, 50)
                : [...result].slice(0, 50)
            }
            style={{
              width: "100%",
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            isoptionequalToValue={(option, value) =>
              option.description === value.description ||
              option.see === value.see ||
              option.seealso === value.seealso
            }
            noOptionsText={"PLEASE ENTER VALID CODES"}
            open={open}
            onInputChange={(_, value) => {
              if (value.length === 0) {
                if (open) setOpen(false);
              } else {
                if (!open) setOpen(true);
              }
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event, newValue) => {
              handleSelectedItemChange(newValue);
              setSelectedItem(newValue);
              setWord(newValue ? newValue.title : "");
              setFirst(newValue);
              setIsValueSelected(true);
              if (props.onSelectedItemChange) {
                props.onSelectedItemChange(newValue);
              }
              if (
                newValue?.seealso?.includes("Neoplasm") ||
                newValue?.see?.includes("Neoplasm") ||
                newValue?.seealso?.includes("Leukemia") ||
                newValue?.see?.includes("Leukemia") ||
                newValue?.seealso?.includes("Cancer") ||
                newValue?.see?.includes("Cancer")
              ) {
                setisNeoplasmCodeClicked(true);
                setisDrugCodeClicked(false);
              } else if (
                newValue?.seealso?.includes("Drugs") ||
                newValue?.see?.includes("Drugs") ||
                newValue?.seealso?.includes("Poisoning") ||
                newValue?.see?.includes("Poisoning")
              ) {
                setisDrugCodeClicked(true);
                setisNeoplasmCodeClicked(false);
              } else {
                setisNeoplasmCodeClicked(false);
                setisDrugCodeClicked(false);
              }
            }}
            autoSelect
            renderInput={(params) => (
              <TextField
                // disabled
                sx={{
                  "& input": {
                    height: "0px",
                    display: "none",
                    mt: "-50px",
                    border: "none",
                  },
                }}
                {...params}
                placeholder="Search for code"
              />
            )}
            renderOption={(props, result1) => (
              <Box {...props} key={result.id}>
                {isDescriptionFetched ? (
                  <span>
                    {result1.title &&
                    (result1.code !== "null" || result1.seealso !== "null")
                      ? result1.title + " "
                      : ""}{" "}
                    {result1.description !== "null" ? result1.description : ""}{" "}
                    {result1.alterDescription !== "null"
                      ? result1.alterDescription
                      : ""}{" "}
                    {result1.seealso !== "null" &&
                    result1.seealso !== undefined &&
                    !(
                      result1.seealso.includes("Drugs") ||
                      result1.seealso.includes("Poisoning")
                    ) &&
                    !(
                      result1.seealso.includes("Neoplasm") ||
                      result1.seealso.includes("Leukemia") ||
                      result1.seealso.includes("cancer")
                    ) ? (
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={handleclick(result1.seealso)}
                      >
                        seealso:{result1.seealso}
                      </span>
                    ) : (
                      ""
                    )}
                    {result1.seealso !== "null" &&
                    result1.seealso !== undefined &&
                    !(
                      result1.seealso.includes("Drugs") ||
                      result1.seealso.includes("Poisoning")
                    ) &&
                    (result1.seealso.includes("Neoplasm") ||
                      result1.seealso.includes("Leukemia") ||
                      result1.seealso.includes("cancer")) ? (
                      <span
                        style={{
                          borderBottom: "1px solid blue",
                          cursor: "pointer",
                        }}
                      >
                        seealso:{result1.seealso}
                      </span>
                    ) : (
                      ""
                    )}
                    {result1.seealso !== "null" &&
                    result1.seealso !== undefined &&
                    (result1.seealso.includes("Drugs") ||
                      result1.seealso.includes("Poisoning")) &&
                    !(
                      result1.seealso.includes("Neoplasm") ||
                      result1.seealso.includes("Leukemia") ||
                      result1.seealso.includes("cancer")
                    ) ? (
                      <span
                        style={{
                          borderBottom: "1px solid blue",
                          cursor: "pointer",
                        }}
                      >
                        seealso:{result1.seealso}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    {result1.see !== "null" &&
                    result1.see !== undefined &&
                    !(
                      result1.see.includes("Drugs") ||
                      result1.see.includes("Poisoning")
                    ) &&
                    !(
                      result1.see.includes("Neoplasm") ||
                      result1.see.includes("Leukemia") ||
                      result1.see.includes("cancer")
                    )
                      ? `see:${result1.see}`
                      : ""}
                    {result1.see !== "null" &&
                    result1.see !== undefined &&
                    !(
                      result1.see.includes("Drugs") ||
                      result1.see.includes("Poisoning")
                    ) &&
                    (result1.see.includes("Neoplasm") ||
                      result1.see.includes("Leukemia") ||
                      result1.see.includes("cancer")) ? (
                      <span
                        style={{
                          borderBottom: "1px solid blue",
                          cursor: "pointer",
                        }}
                      >
                        see:{result1.see}
                      </span>
                    ) : (
                      ""
                    )}
                    {result1.see !== "null" &&
                    result1.see !== undefined &&
                    (result1.see.includes("Drugs") ||
                      result1.see.includes("Poisoning")) &&
                    !(
                      result1.see.includes("Neoplasm") ||
                      result1.see.includes("Leukemia") ||
                      result1.see.includes("cancer")
                    ) ? (
                      <span
                        style={{
                          borderBottom: "1px solid blue",
                          cursor: "pointer",
                        }}
                      >
                        see:{result1.see}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    {result1.nemod !== "null" ? result1.nemod : ""}{" "}
                    {result1.code !== "null" &&
                    result1.code !== null &&
                    (result1.description !== "null" ||
                      result1.title !== "null" ||
                      result1.alterDescription !== "null" ||
                      result1.description !== undefined) ? (
                      <span style={{ color: "blue" }}>{result1.code}</span>
                    ) : (
                      ""
                    )}
                  </span>
                ) : (
                  <span>
                    {result1.description !== null &&
                    result1.description !== "null" &&
                    result1.description !== undefined ? (
                      <span style={{ color: "blue" }}>{result1.code}</span>
                    ) : (
                      ""
                    )}{" "}
                    {result1.description !== null &&
                    result1.description !== "null" &&
                    result1.description !== undefined
                      ? result1.description
                      : ""}
                  </span>
                )}
              </Box>
            )}
          />
        </Box>
      </Box>
    </>
  );
};
Search1.propTypes = {
  // ... (other prop types)
  onNeoplasmCodeClick: PropTypes.func.isRequired,
  onDrugCodeClick: PropTypes.func.isRequired,
};
export default Search1;
