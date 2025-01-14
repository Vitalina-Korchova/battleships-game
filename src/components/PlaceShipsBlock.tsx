import styles from "./PlaceShips.module.css";
import Battlefield from "./Battlefield";
import Ship from "./Ship";
import { useState } from "react";

export default function PlaceShipsBlock() {
  const [selectedCell, setSelectedCell] = useState<string[]>([]); //для відображення кужи поставити корабель(підсвітка клітинок)
  const [selectedShip, setSelectedShip] = useState<{
    amount: number | null;
    id: string | null;
  }>({
    amount: null,
    id: null,
  }); //обраний корабель
  const [occupiedCells, setOccupiedCells] = useState<string[]>([]); //зайняті клітинки(розміщений корабель)
  const [placedShips, setPlacedShips] = useState<string[]>([]); //для визначенння чи корабель вже був розміщений чи ще ні
  const [shipDirections, setShipDirections] = useState<{
    [key: string]: string;
  }>({});

  // console.log("Occupied cells: ", occupiedCells);

  const mouseLeave = () => {
    setSelectedCell([]);
  };

  const handleClickShip = (amount: number, id: string) => {
    setSelectedShip({ amount, id });

    //встановлення по дефолту напрямок вертикальний
    if (!shipDirections[id]) {
      setShipDirections((prevDirections) => ({
        ...prevDirections,
        [id]: "vertical",
      }));
    }
    console.log(`Was click the ship ${amount} with id ${id} direction `);
    console.log(
      `Direction for ship ${id}: ${shipDirections[id] || "vertical"}`
    );
  };

  const mouseEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const cellId = e.target.id;
    const cellNumber = parseInt(cellId.split("-")[1], 10);
    if (
      selectedShip.id !== null &&
      shipDirections[selectedShip.id] === "vertical"
    ) {
      if (selectedShip.amount === 1) {
        if (cellNumber <= 100) {
          const verticalCells = [`cell-${cellNumber}`];
          setSelectedCell(verticalCells);
        }
      } else if (selectedShip.amount === 2) {
        if (cellNumber <= 90) {
          const verticalCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 10}`,
          ];
          setSelectedCell(verticalCells);
        }
      } else if (selectedShip.amount === 3) {
        if (cellNumber <= 80) {
          const verticalCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 10}`,
            `cell-${cellNumber + 20}`,
          ];
          setSelectedCell(verticalCells);
        }
      } else if (selectedShip.amount === 4) {
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
    } else {
      //якщо горизонтальний напрям
      if (selectedShip.amount === 1) {
        if (cellNumber <= 100) {
          const horizontalCells = [`cell-${cellNumber}`];
          setSelectedCell(horizontalCells);
        }
      } else if (selectedShip.amount === 2) {
        if (cellNumber % 10 !== 0) {
          const horizontalCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 1}`,
          ];
          setSelectedCell(horizontalCells);
        }
      } else if (selectedShip.amount === 3) {
        if (Math.ceil(cellNumber / 10) === Math.ceil((cellNumber + 2) / 10)) {
          const horizontalCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 1}`,
            `cell-${cellNumber + 2}`,
          ];
          setSelectedCell(horizontalCells);
        }
      } else if (selectedShip.amount === 4) {
        if (Math.ceil(cellNumber / 10) === Math.ceil((cellNumber + 3) / 10)) {
          const horizontalCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 1}`,
            `cell-${cellNumber + 2}`,
            `cell-${cellNumber + 3}`,
          ];
          setSelectedCell(horizontalCells);
        }
      } else {
        setSelectedCell([]);
      }
    }
  };

  const handleClickCells = () => {
    //функція розміщення кораблів
    const isOccupied = selectedCell.some((cell) =>
      occupiedCells.includes(cell)
    );

    if (!isOccupied && selectedShip.id !== null) {
      setOccupiedCells((prevOccupied) => [...prevOccupied, ...selectedCell]);
      setPlacedShips((prevPlaced) => [
        ...prevPlaced,
        selectedShip.id as string,
      ]);
      setSelectedCell([]);
      setSelectedShip({ amount: null, id: null });
    }
  };

  const handleRotateShip = () => {
    if (selectedShip.id) {
      const newDirection =
        shipDirections[selectedShip.id] === "vertical"
          ? "horizontal"
          : "vertical";

      setShipDirections((prevDirections) => ({
        ...prevDirections,
        [selectedShip.id as string]: newDirection,
      }));
      const ship = document.getElementById(selectedShip.id);
      if (ship) {
        const currentRotation = ship.style.transform;
        ship.style.transform =
          currentRotation === "rotate(-90deg)"
            ? "rotate(0deg)"
            : "rotate(-90deg)";
      }
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
          <div className={styles.blockShipsRow}>
            {!placedShips.includes("ship-1-1") && (
              <Ship
                id={"ship-1-1"}
                amount={1}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-1-2") && (
              <Ship
                id={"ship-1-2"}
                amount={1}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-1-3") && (
              <Ship
                id={"ship-1-3"}
                amount={1}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-1-4") && (
              <Ship
                id={"ship-1-4"}
                amount={1}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
          </div>
          <div className={styles.blockShipsRow}>
            {!placedShips.includes("ship-2-1") && (
              <Ship
                id={"ship-2-1"}
                amount={2}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-2-2") && (
              <Ship
                id={"ship-2-2"}
                amount={2}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-2-3") && (
              <Ship
                id={"ship-2-3"}
                amount={2}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
          </div>
          <div className={styles.blockShipsRow}>
            {!placedShips.includes("ship-3-1") && (
              <Ship
                id={"ship-3-1"}
                amount={3}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-3-2") && (
              <Ship
                id={"ship-3-2"}
                amount={3}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
            {!placedShips.includes("ship-4") && (
              <Ship
                id={"ship-4"}
                amount={4}
                onClick={handleClickShip}
                selectedShipId={selectedShip.id}
              />
            )}
          </div>
          <button onClick={handleRotateShip} className={styles.buttonRotate}>
            🗘
          </button>
        </div>
      </div>
    </>
  );
}
