import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BattleShipsBoard from "./components/BattleshipsBoard";
import IntroBlock from "./components/IntroBlock";
import PlaceShipsBlock from "./components/placeShipsComponents/PlaceShipsBlock";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const handleBackButton = () => {
      // якщо користувач натискає кнопку назад, перенаправляємо на головну сторінку
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);
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
