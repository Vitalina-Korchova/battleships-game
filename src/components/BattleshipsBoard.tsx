import styles from "./BattleShipsBoard.module.css";
import Battlefield from "./Battlefield";

export default function BattleShipsBoard({ arrOccupiedCells }) {
  // console.log("Occupied Cells", arrOccupiedCells);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <button className={styles.btnReturnStart}>
            Повернутись на початок
          </button>
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
