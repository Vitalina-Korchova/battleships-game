import styles from "./BattleShipsBoard.module.css";
import Battlefield from "./Battlefield";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";

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
  ); //зайняті клітинки юзера і компа

  //клітинки
  const [hittedCellsUser, setHittedCellsUser] = useState<string[]>([]); //масив для зруйнованих кораблів юзером
  const [missedCellsUser, setMissedCellsUser] = useState<string[]>([]); //масив для пропущених кораблів юзером
  const [hittedCellsComputer, setHittedCellsComputer] = useState<string[]>([]); //масив для зруйнованих кораблів комп'ютером
  const [missedCellsComputer, setMissedCellsComputer] = useState<string[]>([]); //масив для пропущених кораблів комп'ютером

  //кораблі
  const [arrShipsUser, setArrShipsUser] = useState<
    { id: string; cells: string[] }[]
  >([]); //кораблі юзера
  const [arrShipsComputer, setArrShipsComputer] = useState<
    { id: string; cells: string[] }[]
  >([]); //кораблі комп ютера

  //рахунки
  const [pointUser, setPointUser] = useState<number>(0);
  const [pointComputer, setPointComputer] = useState<number>(0);

  //черга
  const [playerTurn, setPlayerTurn] = useState(true);

  //відкриття попапу(Перемога або невдача)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  useEffect(() => {
    const detectedShipsUser = detectShips(arrOccupiedCells);
    setArrShipsUser(detectedShipsUser);

    const detectedShipsComputer = detectShips(occupiedCellsComputer);
    setArrShipsComputer(detectedShipsComputer);
  }, [arrOccupiedCells, occupiedCellsComputer]);

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
              // перевіряємо, чи виходить за межі правого боку поля
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

  //виявити корабель з клітинок
  const detectShips = (arrCells: string[]) => {
    const ships: { id: string; cells: string[] }[] = [];
    let Counter1CellsShip: number = 0;
    let Counter2CellsShip: number = 0;
    let Counter3CellsShip: number = 0;
    let Counter4CellsShip: number = 0;
    let consecutiveCells: number = 1;
    let currentShipCells: string[] = [];
    const shipsVerticalCells: string[] = [];

    const getCellNumber = (cell: string) => parseInt(cell.split("-")[1]);

    const isConsecutiveCells = (cell1: string, cell2: string) => {
      const num1 = getCellNumber(cell1);
      const num2 = getCellNumber(cell2);

      const horizontalCheck = Math.abs(num1 - num2) === 1;
      const verticalCheck = Math.abs(num1 - num2) === 10;

      return horizontalCheck || verticalCheck;
    };

    arrCells.forEach((cell, index) => {
      const nextCell = arrCells[index + 1];

      currentShipCells.push(cell);

      if (nextCell && isConsecutiveCells(cell, nextCell)) {
        consecutiveCells++;
      } else {
        if (consecutiveCells === 4) {
          Counter4CellsShip++;
          ships.push({
            id: `ship-4-${Counter4CellsShip}`,
            cells: [...currentShipCells],
          });
        } else if (consecutiveCells === 3) {
          Counter3CellsShip++;
          ships.push({
            id: `ship-3-${Counter3CellsShip}`,
            cells: [...currentShipCells],
          });
        } else if (consecutiveCells === 2) {
          Counter2CellsShip++;
          ships.push({
            id: `ship-2-${Counter2CellsShip}`,
            cells: [...currentShipCells],
          });
        } else if (consecutiveCells === 1) {
          shipsVerticalCells.push(...currentShipCells);
        }

        consecutiveCells = 1;
        currentShipCells = [];
      }
    });

    // Перевірка останньої групи клітин
    if (consecutiveCells === 4) {
      Counter4CellsShip++;
      ships.push({
        id: `ship-4-${Counter4CellsShip}`,
        cells: [...currentShipCells],
      });
    } else if (consecutiveCells === 3) {
      Counter3CellsShip++;
      ships.push({
        id: `ship-3-${Counter3CellsShip}`,
        cells: [...currentShipCells],
      });
    } else if (consecutiveCells === 2) {
      Counter2CellsShip++;
      ships.push({
        id: `ship-2-${Counter2CellsShip}`,
        cells: [...currentShipCells],
      });
    } else if (consecutiveCells === 1) {
      shipsVerticalCells.push(...currentShipCells);
    }

    // Додаткова перевірка вертикальних кораблів
    if (shipsVerticalCells.length > 0) {
      shipsVerticalCells.forEach((cell, index) => {
        const nextCell = shipsVerticalCells[index + 1];

        if (nextCell && isConsecutiveCells(cell, nextCell)) {
          currentShipCells.push(cell);

          if (currentShipCells.length === 4) {
            Counter4CellsShip++;
            ships.push({
              id: `ship-4-${Counter4CellsShip}`,
              cells: [...currentShipCells],
            });
          } else if (currentShipCells.length === 3) {
            Counter3CellsShip++;
            ships.push({
              id: `ship-3-${Counter3CellsShip}`,
              cells: [...currentShipCells],
            });
          } else if (currentShipCells.length === 2) {
            Counter2CellsShip++;
            ships.push({
              id: `ship-2-${Counter2CellsShip}`,
              cells: [...currentShipCells],
            });
          }
        } else {
          currentShipCells = [cell];
        }
      });
    }

    const singleCells = shipsVerticalCells.filter(
      (cell) => !ships.some((ship) => ship.cells.includes(cell))
    );

    singleCells.forEach((cell) => {
      Counter1CellsShip++;
      ships.push({
        id: `ship-1-${Counter1CellsShip}`,
        cells: [cell],
      });
    });

    return ships;
  };

  //хід юзера по полю компа
  const clickCellUser = (e: React.DragEvent<HTMLDivElement>) => {
    if (playerTurn) {
      const cellId = e.currentTarget.id;
      // console.log(cellId);

      if (
        !hittedCellsUser.includes(cellId) &&
        !missedCellsUser.includes(cellId)
      ) {
        if (occupiedCellsComputer.includes(cellId)) {
          // console.log("it is occupied User");

          setHittedCellsUser((prevCells) => {
            const updatedCells = [...prevCells, cellId];

            const shipHit = arrShipsComputer.find((ship) =>
              ship.cells.includes(cellId)
            );

            if (shipHit) {
              const allCellsHitted = shipHit.cells.every((cell) =>
                updatedCells.includes(cell)
              );

              if (allCellsHitted) {
                setPointUser((prevPoints) => prevPoints + 0.5); //БАГ через асинхронее оновлення стану реакт функція використовується два рази, якщо поставити + 1 , буде додаватись два очка, того поставила 0.5
              }
            }
            return updatedCells;
          });
        } else {
          // console.log("it is missed User");
          setMissedCellsUser((prevCells) => [...prevCells, cellId]);
          setPlayerTurn(false);
        }
      }
    }
  };

  const [wasHitted, setWasHitted] = useState(false); //встановлення стану корабля як влученого
  const [hittedCellId, setHittedCellId] = useState<string>(""); //запам'ятовуємо клітинку яка була поцілена

  //хід комп ютера по полю юзера
  const clickCellComputer = () => {
    setTimeout(() => {
      let randomNumber;
      let cellId: string = "";

      if (wasHitted) {
        const hittedNumber = parseInt(hittedCellId.split("-")[1], 10);
        const possibleMoves = [
          hittedNumber - 10, // Вгору
          hittedNumber + 10, // Вниз
          hittedNumber - 1, // Вліво
          hittedNumber + 1, // Вправо
          hittedNumber - 20,
          hittedNumber + 20,
          hittedNumber - 2,
          hittedNumber + 2,
          hittedNumber - 30,
          hittedNumber + 30,
          hittedNumber - 3,
          hittedNumber + 3,
        ];

        for (const move of possibleMoves) {
          cellId = `cell-${move}`;
          if (
            move > 0 &&
            move <= BOARD_SIZE * BOARD_SIZE &&
            !hittedCellsComputer.includes(cellId) &&
            !missedCellsComputer.includes(cellId)
          ) {
            break;
          }
        }
      }

      //рандом клітинка
      if (!cellId) {
        do {
          randomNumber = Math.floor(Math.random() * 100) + 1;
          cellId = `cell-${randomNumber}`;
        } while (
          hittedCellsComputer.includes(cellId) ||
          missedCellsComputer.includes(cellId)
        );
      }

      //перевірка чи не є згенерована клітинка у масиває вже
      if (arrOccupiedCells.includes(cellId)) {
        // console.log("it is occupied Computer");
        setPlayerTurn(false);
        setHittedCellsComputer((prevCells) => {
          const updatedCells = [...prevCells, cellId];

          // Знаходимо корабель, поцілений у нову клітинку
          const shipHit = arrShipsUser.find((ship) =>
            ship.cells.includes(cellId)
          );

          if (shipHit) {
            // Перевірка, чи всі клітинки корабля знищені
            const allCellsHitted = shipHit.cells.every((cell) =>
              updatedCells.includes(cell)
            );

            if (allCellsHitted) {
              setPointComputer((prevPoints) => prevPoints + 0.5); //БАГ через асинхронее оновлення стану реакт функція використовується два рази, якщо поставити + 1 , буде додаватись два очка, того поставила 0.5
              setWasHitted(false);
            } else {
              setWasHitted(true);
              setHittedCellId(cellId);
            }
          }

          return updatedCells;
        });
      } else {
        // console.log("it is missed Computer");
        setMissedCellsComputer((prevCells) => [...prevCells, cellId]);
        setPlayerTurn(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setOccupiedCellsComputer([]);
    localStorage.removeItem("occupiedCellsComputer");
  };

  const openPopup = () => setIsPopupOpen(true);

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
          <span className={styles.text}>
            {pointUser}:{pointComputer}
          </span>

          <button onClick={openPopup}>Open Pop up</button>
          <div className={styles.rowBattlfields}>
            {/* поле юзера, по якому ходить комп */}
            <Battlefield
              playerTurnState={playerTurn}
              onClickCellAuto={clickCellComputer}
              arrOccupiedCells={arrOccupiedCells}
              hittedCells={hittedCellsComputer}
              missedCells={missedCellsComputer}
            />
            {/* поле компа, по якому ходить юзер */}
            <Battlefield
              onClickCell={clickCellUser}
              hittedCells={hittedCellsUser}
              missedCells={missedCellsUser}
            />
          </div>
        </div>
      </div>
      {isPopupOpen && <PopUp />}
    </>
  );
}
