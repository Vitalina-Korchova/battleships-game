import styles from "./PlaceShips.module.css";
import Battlefield from "./BattlefieldPlace";
import Ship from "./Ship";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PlaceShipsBlock({
  setArrOccupiedCells,
}: {
  setArrOccupiedCells: React.Dispatch<React.SetStateAction<string[]>>;
}) {
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
    //встановлення напряму корабля
    [key: string]: string;
  }>({});

  // console.log("Occupied cells: ", occupiedCells);

  useEffect(() => {
    setArrOccupiedCells(occupiedCells);
  }, [occupiedCells, setArrOccupiedCells]);

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

  //підсвітка для розміщення корабля
  const mouseEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const cellId = e.target.id;
    const cellNumber = parseInt(cellId.split("-")[1], 10);

    // Функція перевірки сусідніх клітинок
    const checkNeighbors = (shipCells: string[]): boolean => {
      for (const cell of shipCells) {
        const num = parseInt(cell.split("-")[1], 10);
        const row = Math.ceil(num / 10);
        const col = num % 10 === 0 ? 10 : num % 10;

        // перевірка клітинки зверху
        if (row > 1) {
          if (occupiedCells.includes(`cell-${num - 10}`)) return false;
        }

        // перевірка клітинки знизу
        if (row < 10) {
          if (occupiedCells.includes(`cell-${num + 10}`)) return false;
        }

        // перевірка клітинки зліва
        if (col > 1) {
          if (occupiedCells.includes(`cell-${num - 1}`)) return false;
        }

        // перевірка клітинки справа
        if (col < 10) {
          if (occupiedCells.includes(`cell-${num + 1}`)) return false;
        }

        // перевірка діагональні клітинки
        if (row > 1 && col > 1) {
          if (occupiedCells.includes(`cell-${num - 11}`)) return false;
        }
        if (row > 1 && col < 10) {
          if (occupiedCells.includes(`cell-${num - 9}`)) return false;
        }
        if (row < 10 && col > 1) {
          if (occupiedCells.includes(`cell-${num + 9}`)) return false;
        }
        if (row < 10 && col < 10) {
          if (occupiedCells.includes(`cell-${num + 11}`)) return false;
        }
      }
      return true;
    };

    let newSelectedCells: string[] = [];

    if (
      selectedShip.id !== null &&
      shipDirections[selectedShip.id] === "vertical"
    ) {
      if (selectedShip.amount === 1) {
        if (cellNumber <= 100) {
          newSelectedCells = [`cell-${cellNumber}`];
        }
      } else if (selectedShip.amount === 2) {
        if (cellNumber <= 90) {
          newSelectedCells = [`cell-${cellNumber}`, `cell-${cellNumber + 10}`];
        }
      } else if (selectedShip.amount === 3) {
        if (cellNumber <= 80) {
          newSelectedCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 10}`,
            `cell-${cellNumber + 20}`,
          ];
        }
      } else if (selectedShip.amount === 4) {
        if (cellNumber <= 70) {
          newSelectedCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 10}`,
            `cell-${cellNumber + 20}`,
            `cell-${cellNumber + 30}`,
          ];
        }
      }
    } else {
      if (selectedShip.amount === 1) {
        if (cellNumber <= 100) {
          newSelectedCells = [`cell-${cellNumber}`];
        }
      } else if (selectedShip.amount === 2) {
        if (cellNumber % 10 !== 0) {
          newSelectedCells = [`cell-${cellNumber}`, `cell-${cellNumber + 1}`];
        }
      } else if (selectedShip.amount === 3) {
        if (Math.ceil(cellNumber / 10) === Math.ceil((cellNumber + 2) / 10)) {
          newSelectedCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 1}`,
            `cell-${cellNumber + 2}`,
          ];
        }
      } else if (selectedShip.amount === 4) {
        if (Math.ceil(cellNumber / 10) === Math.ceil((cellNumber + 3) / 10)) {
          newSelectedCells = [
            `cell-${cellNumber}`,
            `cell-${cellNumber + 1}`,
            `cell-${cellNumber + 2}`,
            `cell-${cellNumber + 3}`,
          ];
        }
      }
    }

    // Перевіряємо чи можна розмістити корабель
    if (newSelectedCells.length > 0 && checkNeighbors(newSelectedCells)) {
      setSelectedCell(newSelectedCells);
    } else {
      setSelectedCell([]);
    }
  };

  //функція розміщення кораблів
  const handleClickCells = () => {
    if (selectedCell.length > 0 && selectedShip.id !== null) {
      setOccupiedCells((prevOccupied) => [...prevOccupied, ...selectedCell]);
      setPlacedShips((prevPlaced) => [
        ...prevPlaced,
        selectedShip.id as string,
      ]);
      setSelectedCell([]);
      setSelectedShip({ amount: null, id: null });
    }
  };

  //повернути корабель
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

  //скинути розміщення
  const resetShipsPosition = () => {
    setOccupiedCells([]);
    setPlacedShips([]);
    setSelectedCell([]);
    setSelectedShip({ amount: null, id: null });
    setShipDirections({});
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <span className={styles.textPlaceShips}>Розташуйте кораблі 🌊</span>
          <Link to="/battle" style={{ textDecoration: "none" }}>
            <button
              disabled={occupiedCells.length !== 20}
              className={styles.buttonStart}
            >
              Старт
            </button>
          </Link>

          <Battlefield
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            selectedCell={selectedCell}
            onClickCell={handleClickCells}
            occupiedCells={occupiedCells}
          />
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
            <button
              className={styles.btnResetShips}
              style={{
                display: occupiedCells.length === 20 ? "block" : "none",
              }}
              onClick={resetShipsPosition}
            >
              Скинути розміщення
            </button>
            <button onClick={handleRotateShip} className={styles.buttonRotate}>
              🗘
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
