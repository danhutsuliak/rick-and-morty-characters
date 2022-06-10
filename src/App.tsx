import React from "react";
import { Route, Routes } from "react-router-dom";
import CharacterPage from "./CharacterPage";
import HomePage from "./HomePage";

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

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/rick-and-morty-characters" element={<HomePage />}></Route>
      <Route
        path="/rick-and-morty-characters/:characterId"
        element={<CharacterPage />}
      />
    </Routes>
  );
};

export default App;
