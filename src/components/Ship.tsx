import styles from "./Ship.module.css";
import { useState } from "react";
export default function Ship({
  id,
  amount,
  onClick,
}: {
  id: string;
  amount: number;
  onClick: (amount: number, id: string) => void;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleShipClick = () => {
    setIsSelected(!isSelected);
    onClick(amount, id);
  };
  const selectedClass = isSelected ? styles.selectedShip : "";

  if (amount === 1) {
    return (
      <div
        className={`${styles.innerShip} ${selectedClass}`}
        onClick={handleShipClick}
      >
        <div className={styles.singleShip}>
          <div className={styles.circle}></div>
        </div>
      </div>
    );
  }
  if (amount === 2) {
    return (
      <div
        className={`${styles.innerShip} ${selectedClass}`}
        onClick={handleShipClick}
      >
        <div className={styles.headShip}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.tailShip}>
          <div className={styles.circle}></div>
        </div>
      </div>
    );
  }
  if (amount === 3) {
    return (
      <div
        className={`${styles.innerShip} ${selectedClass}`}
        onClick={handleShipClick}
      >
        <div className={styles.headShip}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.bodyShip}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.tailShip}>
          <div className={styles.circle}></div>
        </div>
      </div>
    );
  }

  if (amount === 4) {
    return (
      <div
        className={`${styles.innerShip} ${selectedClass}`}
        onClick={handleShipClick}
      >
        <div className={styles.headShip}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.bodyShip}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.bodyShip}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.tailShip}>
          <div className={styles.circle}></div>
        </div>
      </div>
    );
  }
}
