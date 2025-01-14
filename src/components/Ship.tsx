import styles from "./Ship.module.css";
import { useState } from "react";
export default function Ship({
  id,
  amount,
  onClick,
  selectedShipId,
}: {
  id: string;
  amount: number;
  onClick: (amount: number, id: string) => void;
  selectedShipId: string | null;
}) {
  const handleShipClick = () => {
    onClick(amount, id);
  };

  const isSelected = selectedShipId === id;
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
        id={id}
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
        id={id}
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
        id={id}
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
