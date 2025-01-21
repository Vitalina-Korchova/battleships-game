import styles from "./BattleShipsBoard.module.css";
import Battlefield from "./Battlefield";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Ship {
  size: number;
  count: number;
}

const SHIPS: Ship[] = [
  { size: 4, count: 1 },
  { size: 3, count: 2 },
  { size: 2, count: 3 },
  { size: 1, count: 4 },
];

const BOARD_SIZE = 10;

export default function BattleShipsBoard() {
  const [arrOccupiedCells, setArrOccupiedCells] = useState<string[]>([]);
  const [occupiedCellsComputer, setOccupiedCellsComputer] = useState<string[]>(
    []
  );
  //розміщенні кораблі комп ютера

  const [hittedCellsUser, setHittedCellsUser] = useState<string[]>([]); //масив для зруйнованих кораблів юзером
  const [missedCellsUser, setMissedCellsUser] = useState<string[]>([]); //масив для пропущених кораблів юзером
  const [hittedCellsComputer, setHittedCellsComputer] = useState<string[]>([]); //масив для зруйнованих кораблів комп'ютером
  const [missedCellsComputer, setMissedCellsComputer] = useState<string[]>([]); //масив для пропущених кораблів комп'ютером

  // console.log("Occupied Cells Computer", occupiedCellsComputer);
  // console.log("Occupied Cells", arrOccupiedCells);
  console.log("HittedCell", hittedCellsUser);
  console.log("MissedCell", missedCellsUser);

  useEffect(() => {
    // ініціалізація збереженого масиву з локального сховища при завантаженні
    const savedOccupiedCells = localStorage.getItem("occupiedCells");
    if (savedOccupiedCells) {
      setArrOccupiedCells(JSON.parse(savedOccupiedCells));
    }

    //отримуємо масив знерованих зайнятих клітинок
    const savedCellsComputer = localStorage.getItem("occupiedCellsComputer");
    if (savedCellsComputer) {
      setOccupiedCellsComputer(JSON.parse(savedCellsComputer));
    } else {
      placeShipsComputer(SHIPS); // Якщо немає, генеруємо нові
    }

    //блокує кнопку повернення назад
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.pathname);
    });

    return () => {
      window.removeEventListener("popstate", () => {
        window.history.pushState(null, "", window.location.pathname);
      });
    };
  }, []);

  //рандом розміщення кораблів комп ютера
  const placeShipsComputer = (arrShips: Ship[]): void => {
    const newOccupiedCells: string[] = [];

    // Функція перевірки сусідніх клітинок
    const checkNeighbors = (shipCells: string[]): boolean => {
      for (const cell of shipCells) {
        const num = parseInt(cell.split("-")[1], 10);
        const row = Math.ceil(num / 10);
        const col = num % 10 === 0 ? 10 : num % 10;

        // перевірка клітинки зверху
        if (row > 1) {
          if (newOccupiedCells.includes(`cell-${num - 10}`)) return false;
        }

        // перевірка клітинки знизу
        if (row < 10) {
          if (newOccupiedCells.includes(`cell-${num + 10}`)) return false;
        }

        // перевірка клітинки зліва
        if (col > 1) {
          if (newOccupiedCells.includes(`cell-${num - 1}`)) return false;
        }

        // перевірка клітинки справа
        if (col < 10) {
          if (newOccupiedCells.includes(`cell-${num + 1}`)) return false;
        }

        // перевірка діагональні клітинки
        if (row > 1 && col > 1) {
          if (newOccupiedCells.includes(`cell-${num - 11}`)) return false;
        }
        if (row > 1 && col < 10) {
          if (newOccupiedCells.includes(`cell-${num - 9}`)) return false;
        }
        if (row < 10 && col > 1) {
          if (newOccupiedCells.includes(`cell-${num + 9}`)) return false;
        }
        if (row < 10 && col < 10) {
          if (newOccupiedCells.includes(`cell-${num + 11}`)) return false;
        }
      }
      return true;
    };

    arrShips.forEach((ship) => {
      for (let i = 0; i < ship.count; i++) {
        let placed = false;
        while (!placed) {
          const isHorizontal = Math.random() < 0.5;
          const startCell =
            Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE)) + 1;
          const candidateCells: string[] = [];
          for (let j = 0; j < ship.size; j++) {
            let cellNumber: number;
            if (isHorizontal) {
              cellNumber = startCell + j; // Рух горизонтально
              // gеревіряємо, чи виходить за межі правого боку поля
              if (
                Math.floor((startCell - 1) / BOARD_SIZE) !==
                Math.floor((cellNumber - 1) / BOARD_SIZE)
              ) {
                candidateCells.length = 0;
                break;
              }
            } else {
              cellNumber = startCell + j * BOARD_SIZE; // Рух вертикально
              if (cellNumber > BOARD_SIZE * BOARD_SIZE) {
                candidateCells.length = 0;
                break;
              }
            }
            candidateCells.push(`cell-${cellNumber}`);
          }
          // Перевірка, чи ці клітинки не зайняті
          const isValidPlacement = candidateCells.every(
            (cell) => !newOccupiedCells.includes(cell)
          );

          if (
            candidateCells.length === ship.size &&
            isValidPlacement &&
            checkNeighbors(candidateCells)
          ) {
            newOccupiedCells.push(...candidateCells);
            placed = true;
          }
        }
      }
    });
    setOccupiedCellsComputer(newOccupiedCells);
    localStorage.setItem(
      "occupiedCellsComputer",
      JSON.stringify(newOccupiedCells)
    );
  };

  const clickCellUser = (e: React.DragEvent<HTMLDivElement>) => {
    const cellId = e.currentTarget.id;
    console.log(cellId);

    if (
      !hittedCellsUser.includes(cellId) &&
      !missedCellsUser.includes(cellId)
    ) {
      if (occupiedCellsComputer.includes(cellId)) {
        console.log("it is occupied");
        setHittedCellsUser((prevCells) => [...prevCells, cellId]);
      } else {
        console.log("it is missed");
        setMissedCellsUser((prevCells) => [...prevCells, cellId]);
      }
    }
  };

  const clickCellComputer = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const cellId = `cell-${randomNumber}`;
    console.log(cellId);

    if (
      !hittedCellsComputer.includes(cellId) &&
      !missedCellsComputer.includes(cellId)
    ) {
      if (arrOccupiedCells.includes(cellId)) {
        console.log("it is occupied");
        setHittedCellsComputer((prevCells) => [...prevCells, cellId]);
      } else {
        console.log("it is missed");
        setMissedCellsComputer((prevCells) => [...prevCells, cellId]);
      }
    }
  };

  const resetGame = () => {
    setOccupiedCellsComputer([]);
    localStorage.removeItem("occupiedCellsComputer");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button onClick={resetGame} className={styles.btnReturnStart}>
              Повернутись на початок
            </button>
          </Link>
          <span className={styles.text}>Рахунок знищених кораблів</span>
          <span className={styles.text}>0:0</span>
          <div className={styles.rowBattlfields}>
            <Battlefield
              arrOccupiedCells={arrOccupiedCells}
              onClickCell={clickCellComputer}
              hittedCells={hittedCellsComputer}
              missedCells={missedCellsComputer}
            />
            <Battlefield
              onClickCell={clickCellUser}
              hittedCells={hittedCellsUser}
              missedCells={missedCellsUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}
