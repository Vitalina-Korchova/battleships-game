import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BattleShipsBoard from "./components/BattleshipsBoard";
import IntroBlock from "./components/IntroBlock";
import PlaceShipsBlock from "./components/placeShipsComponents/PlaceShipsBlock";

export default function App() {
  return (
    <>
      <Router>
        <div className="containerApp">
          <Routes>
            <Route path="/" element={<IntroBlock />} />
            <Route path="/place_ships" element={<PlaceShipsBlock />} />
            <Route path="/battle" element={<BattleShipsBoard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
