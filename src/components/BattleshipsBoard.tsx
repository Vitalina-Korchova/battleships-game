import styles from "./BattleShipsBoard.module.css";
import Battlefield from "./Battlefield";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SHIPS = [
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

  // console.log("Occupied Cells", arrOccupiedCells);

  useEffect(() => {
    // ініціалізація збереженого масиву з локального сховища при завантаженні
    const savedOccupiedCells = localStorage.getItem("occupiedCells");
    if (savedOccupiedCells) {
      setArrOccupiedCells(JSON.parse(savedOccupiedCells));
    }

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className={styles.btnReturnStart}>
              Повернутись на початок
            </button>
          </Link>
          <span className={styles.text}>Рахунок знищених кораблів</span>
          <span className={styles.text}>0:0</span>
          <div className={styles.rowBattlfields}>
            <Battlefield arrOccupiedCells={arrOccupiedCells} />
            <Battlefield />
          </div>
        </div>
      </div>
    </>
  );
}
