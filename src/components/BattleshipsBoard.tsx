import styles from "./BattleShipsBoard.module.css";
import Battlefield from "./Battlefield";
import { Link } from "react-router-dom";

export default function BattleShipsBoard({ arrOccupiedCells }) {
  // console.log("Occupied Cells", arrOccupiedCells);
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
            <Battlefield />
            <Battlefield />
          </div>
        </div>
      </div>
    </>
  );
}
