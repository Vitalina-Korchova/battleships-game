import "./App.css";
import { useState } from "react";
import BattleShipsBoard from "./components/BattleshipsBoard";
import IntroBlock from "./components/IntroBlock";
import PlaceShipsBlock from "./components/placeShipsComponents/PlaceShipsBlock";

export default function App() {
  const [startGame, setStartGame] = useState(false);
  const [arrOccupiedCells, setArrOccupiedCells] = useState<string[]>([]); //масив розміщених кораблів (зайнятих клітинок)
  const [openBattleshipsBoard, setOpenBattleshipsBoard] = useState(false); //перехід на поле гри

  // console.log("Occupied Cells", arrOccupiedCells);

  const start = () => {
    setStartGame(true);
  };

  return (
    <div>
      <div className="containerApp">
        {!startGame ? (
          <IntroBlock start={start} />
        ) : (
          <PlaceShipsBlock
            setOpenBattleshipsBoard={setOpenBattleshipsBoard}
            setArrOccupiedCells={setArrOccupiedCells}
          />
        )}
        {openBattleshipsBoard && (
          <BattleShipsBoard arrOccupiedCells={arrOccupiedCells} />
        )}
      </div>
    </div>
  );
}
