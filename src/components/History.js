import { Container, Paper, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const History = () => {
  //store the keywords in history variable
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            Searched Keywords
          </Typography>
          {history.length != 0 ? (
            <div style={{ marginTop: "50px" }}>
              {history.map((item, index) => (
                <Stack
                  direction="row"
                  key={index}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <Paper style={{ padding: "0 20px", background: "#F4F9FF" }}>
                    <h4 key={index}> {item.keyword}</h4>
                  </Paper>
                </Stack>
              ))}
            </div>
          ) : (
            <Typography>0 Search result</Typography>
          )}
        </Container>
      )}
    </>
  );
};

export default History;
