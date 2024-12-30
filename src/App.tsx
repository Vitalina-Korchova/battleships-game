import "./App.css";
import { useState } from "react";
import IntroBlock from "./components/IntroBlock";
import PlaceShipsBlock from "./components/PlaceShipsBlock";

export default function App() {
  const [startGame, setStartGame] = useState(false);

  const start = () => {
    setStartGame(true);
  };
  return (
    <div>
      <div className="containerApp">
        {!startGame ? <IntroBlock start={start} /> : <PlaceShipsBlock />}
      </div>
    </div>
  );
}
