import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
const Chapternotes = () => {
  const [results, setResults] = useState(null);
  //const Code = global.values?.code?.replace(/-/g, "") || '';
  const Code = (global.values?.code || "").replace(/[-.]/g, "");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (
          global.values &&
          global.values.code &&
          global.years &&
          !global.isCodeClicked
        ) {
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
            setResults(null);
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        setResults(null);
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.values]);
  useEffect(() => {
    if (global.isCodeClicked) {
      setResults(global.selectedCodeDetails); // Use the stored details
    } else {
      setResults(null);
    }
  }, [global.selectedCodeDetails]);
  console.log("our result is", results);
  const shouldDisplayClassification = (classification, index) => {
    if (index === 0) {
      return true;
    }
    const previousClassifications = results.chapter.notes
      .slice(0, index)
      .map((note) => note.classification);
    return !previousClassifications.includes(classification);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
        }}
      >
        {results ? (
          results.chapter && results.chapter.description ? (
            <div key={results.code}>
              <div>{results.chapter.description}</div>
            </div>
          ) : (
            <div></div>
          )
        ) : null}
        {results ? (
          results.chapter && results.chapter.notes ? (
            results.chapter.notes
              .sort((a, b) => a.classification.localeCompare(b.classification))
              .map((note, index) => (
                <div key={index}>
                  {index === 0 ||
                  note.classification !==
                    results.chapter.notes[index - 1].classification ? (
                    <div style={{ padding: "10px 20px 20px 20px" }}>
                      <strong>{note.classification.toUpperCase()}</strong>
                      :&nbsp;&nbsp;
                      {note.notes}
                    </div>
                  ) : (
                    <div style={{ marginLeft: "10vw" }}>{note.notes}</div>
                  )}
                </div>
              ))
          ) : (
            <div>No chapter notes</div>
          )
        ) : null}
      </Box>
    </>
  );
};
export default Chapternotes;
