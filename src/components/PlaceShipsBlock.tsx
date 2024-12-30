import styles from "./BattlefieldItems.module.css";
import Battlefield from "./Battlefield";

export default function PlaceShipsBlock() {
  return (
    <>
      <div className={styles.container}>
        <Battlefield />
      </div>
    </>
  );
}
