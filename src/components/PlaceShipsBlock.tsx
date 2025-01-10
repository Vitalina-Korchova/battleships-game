import styles from "./BattlefieldItems.module.css";
import Battlefield from "./Battlefield";
import Ship from "./Ship";
import { useState } from "react";

export default function PlaceShipsBlock() {
  const [selectedCell, setSelectedCell] = useState<string[]>([]); //для відображення кужи поставити корабель(підсвітка клітинок)
  const [selectedShip, setSelectedShip] = useState<number | null>(null); //обраний корабель
  const [occupiedCells, setOccupiedCells] = useState<string[]>([]); //зайняті клітинки(розміщений корабель)
  const [placedShips, setPlacedShips] = useState<number[]>([]); //для визначенння чи корабель вже був розміщений чи ще ні

  // console.log("Occupied cells: ", occupiedCells);

  const mouseLeave = () => {
    setSelectedCell([]);
  };

  const handleClickShip = (amount: number) => {
    setSelectedShip(amount);
    console.log(`Was click the ship  ${amount}`);
  };

  const mouseEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const cellId = e.target.id;
    const cellNumber = parseInt(cellId.split("-")[1], 10);
    if (selectedShip === 1) {
      if (cellNumber <= 100) {
        const verticalCells = [`cell-${cellNumber}`];
        setSelectedCell(verticalCells);
      }
    } else if (selectedShip === 2) {
      if (cellNumber <= 90) {
        const verticalCells = [`cell-${cellNumber}`, `cell-${cellNumber + 10}`];
        setSelectedCell(verticalCells);
      }
    } else if (selectedShip === 3) {
      if (cellNumber <= 80) {
        const verticalCells = [
          `cell-${cellNumber}`,
          `cell-${cellNumber + 10}`,
          `cell-${cellNumber + 20}`,
        ];
        setSelectedCell(verticalCells);
      }
    } else if (selectedShip === 4) {
      if (cellNumber <= 70) {
        const verticalCells = [
          `cell-${cellNumber}`,
          `cell-${cellNumber + 10}`,
          `cell-${cellNumber + 20}`,
          `cell-${cellNumber + 30}`,
        ];
        setSelectedCell(verticalCells);
      }
    } else {
      setSelectedCell([]);
    }
  };

  const handleClickCells = () => {
    const isOccupied = selectedCell.some((cell) =>
      occupiedCells.includes(cell)
    );

    if (!isOccupied && selectedShip !== null) {
      setOccupiedCells((prevOccupied) => [...prevOccupied, ...selectedCell]);
      setPlacedShips((prevPlaced) => [...prevPlaced, selectedShip]);
      setSelectedCell([]);
      setSelectedShip(null);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <span className={styles.textPlaceShips}> Розташуйте кораблі 🌊</span>
          <Battlefield
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            selectedCell={selectedCell}
            onClickCell={handleClickCells}
            occupiedCells={occupiedCells}
          />
        </div>

        <div className={styles.containerShips}>
          <span className={styles.textShips}>
            Натисніть на будь-який корабель і відмідьте його розташування на
            полі 👇
          </span>
          {!placedShips.includes(1) && (
            <Ship id={"ship-1-1"} amount={1} onClick={handleClickShip} />
          )}
          {!placedShips.includes(1) && (
            <Ship id={"ship-1-2"} amount={1} onClick={handleClickShip} />
          )}
          {!placedShips.includes(1) && (
            <Ship id={"ship-1-3"} amount={1} onClick={handleClickShip} />
          )}
          {!placedShips.includes(1) && (
            <Ship id={"ship-1-4"} amount={1} onClick={handleClickShip} />
          )}
          {!placedShips.includes(2) && (
            <Ship id={"ship-2-1"} amount={2} onClick={handleClickShip} />
          )}
          {!placedShips.includes(2) && (
            <Ship id={"ship-2-2"} amount={2} onClick={handleClickShip} />
          )}
          {!placedShips.includes(2) && (
            <Ship id={"ship-2-3"} amount={2} onClick={handleClickShip} />
          )}

          {!placedShips.includes(3) && (
            <Ship id={"ship-3-1"} amount={3} onClick={handleClickShip} />
          )}
          {!placedShips.includes(3) && (
            <Ship id={"ship-3-2"} amount={3} onClick={handleClickShip} />
          )}
          {!placedShips.includes(4) && (
            <Ship id={"ship-4"} amount={4} onClick={handleClickShip} />
          )}
        </div>
      </div>
    </>
  );
}
