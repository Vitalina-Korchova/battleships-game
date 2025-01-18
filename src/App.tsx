import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import BattleShipsBoard from "./components/BattleshipsBoard";
import IntroBlock from "./components/IntroBlock";
import PlaceShipsBlock from "./components/placeShipsComponents/PlaceShipsBlock";

export default function App() {
  const [arrOccupiedCells, setArrOccupiedCells] = useState<string[]>([]); //масив розміщених кораблів (зайнятих клітинок)

  // console.log("Occupied Cells", arrOccupiedCells);

  return (
    <>
      <Router>
        <div className="containerApp">
          <Routes>
            <Route path="/" element={<IntroBlock />} />
            <Route
              path="/place_ships"
              element={
                <PlaceShipsBlock setArrOccupiedCells={setArrOccupiedCells} />
              }
            />
            <Route
              path="/battle"
              element={<BattleShipsBoard arrOccupiedCells={arrOccupiedCells} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}
