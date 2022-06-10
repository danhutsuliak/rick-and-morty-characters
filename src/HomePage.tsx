import {
  Autocomplete,
  Card,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "unknown" | "Female" | "Male" | "Genderless";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = (page: number) => {
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.results);
        });
    };

    fetchCharacters(page);
  }, [page]);

  return (
    <Box>
      <Box
        sx={{
          padding: "40px",
          backgroundColor: "#424299",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md" sx={{ padding: "0" }}>
          <Typography lineHeight={2} variant="h3" color="#ffffff">
            Rick and Morty Characters
          </Typography>
          <Autocomplete
            disablePortal
            options={characters}
            getOptionLabel={(character) => character.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(event, value) => setFilter(value!.name)}
            renderOption={(props, characters) => (
              <Box component="li" {...props} key={characters.id}>
                {characters.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Search for a character" />
            )}
          ></Autocomplete>
        </Container>
      </Box>
      <Container
        maxWidth="md"
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <Grid container spacing={5}>
          {characters
            ?.filter((ch) => ch.name.includes(filter))
            .map(
              (ch) =>
                ch.name.includes(filter) && (
                  <Grid item xs={4} key={ch.id}>
                    <Link
                      to={`/rick-and-morty-characters/${ch.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Card sx={{ p: "20px" }}>
                        <img
                          src={ch.image}
                          alt={ch.name}
                          width="100%"
                          style={{ marginBottom: "20px" }}
                        />
                        <Typography>{ch.name}</Typography>
                        <Typography variant="body2" color="blue">
                          {ch.status}
                        </Typography>
                      </Card>
                    </Link>
                  </Grid>
                )
            )}
        </Grid>
        <Pagination
          count={42}
          page={page}
          onChange={(event, num) => setPage(num)}
        />
      </Container>
    </Box>
  );
};

export default HomePage;
