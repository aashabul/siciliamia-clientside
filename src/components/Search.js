import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

const Search = () => {
  const [entry, setEntry] = useState([]);
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setEntry(data.entries);
      });
  }, []);

  // to show search result
  const handleSearch = () => {
    const search = searchRef.current.value;
    // console.log(search);
    if (search !== "") {
      const result = entry.filter((entry) => entry.API === search);
      // console.log(result);
      setEntry(result);

      //preparing the data as key value pair
      const searchHistory = {
        keyword: search,
      };

      //post seached keyword to the api
      fetch("http://localhost:5000/history", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(searchHistory),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert(
              "search history saved. Check History tab to see searched keywords."
            );
          }
        });
    }
  };

  return (
    <Container style={{ alignItems: "center" }}>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          ref={searchRef}
          style={{ fontSize: "18px", padding: "5px" }}
        />
        <button
          type="submit"
          onClick={handleSearch}
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            marginLeft: "7px",
            background: "#DC2966",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </Box>

      {loading ? (
        //to show a spinner while the content is loadig
        <Loading />
      ) : (
        <Grid container style={{ gap: "40px", marginTop: "80px" }}>
          {entry.slice(0, 6).map((entry, index) => (
            <Grid item key={index} lg={5} md={12} sm={12} xs={12}>
              <Card
                style={{ minWidth: 350, maxHeight: 350, background: "#F4F9FF" }}
              >
                <CardContent>
                  <Typography>
                    <span style={{ fontWeight: 600 }}>API:</span>{" "}
                    <span style={{ color: "#C94669" }}>{entry.API}</span>
                  </Typography>
                  <Divider
                    variant="fullWidth"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  />
                  <Typography style={{ my: 2 }}>
                    <span style={{ fontWeight: 600 }}>Description:</span>{" "}
                    <span style={{ color: "#414756" }}>
                      {entry.Description}
                    </span>
                  </Typography>
                  <Divider
                    variant="fullWidth"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  />
                  <Typography>
                    <span style={{ fontWeight: 600 }}>Link: </span>
                    {entry.Link}
                  </Typography>
                  <Divider
                    variant="fullWidth"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  />
                  <Typography>
                    <span style={{ fontWeight: 600 }}>Category: </span>
                    <span style={{ color: "#644000" }}> {entry.Category}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Search;
