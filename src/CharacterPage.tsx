import { Box, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Character } from "./App";

const CharacterPage: React.FC = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const fetchCharacter = () => {
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then((response) => response.json())
        .then((data) => {
          const date = new Date(data.created);
          const dateString = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

          setCharacter({ ...data, created: dateString });
        });
    };
    fetchCharacter();
  }, [characterId]);

  return (
    <Box>
      <Box
        sx={{
          padding: "40px",
          backgroundColor: "#424299",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color="#fff">
          {character?.name}
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ paddingTop: "40px" }}>
        <img
          src={character?.image}
          alt={character?.name}
          style={{
            marginRight: "20px",
            borderRadius: "10px",
            float: "left",
            height: "300px",
          }}
        />
        <Box
          sx={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
              {character?.name}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Species:</span>{" "}
              {character?.species}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
              {character?.gender}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
              {character?.location.name}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Episodes count:</span>{" "}
              {character?.episode.length}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Status:</span>{" "}
              {character?.status}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Created on:</span>{" "}
              {character?.created}
            </Typography>
          </Box>
          <Link
            component={RouterLink}
            to="/rick-and-morty-characters"
            sx={{
              textDecoration: "none",
              textAlign: "center",
              fontSize: "1.6rem",
            }}
          >
            Go Back
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default CharacterPage;
