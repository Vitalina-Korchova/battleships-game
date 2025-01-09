import styles from "./BattlefieldItems.module.css";
import Battlefield from "./Battlefield";
import Ship from "./Ship";
import { useState } from "react";

export default function PlaceShipsBlock() {
  return (
    <>
      <div className={styles.container}>
        <Battlefield />
        <div>
          <Ship amount={1} />
          <Ship amount={2} />
          <Ship amount={3} />
          <Ship amount={4} />
        </div>
      </div>
    </>
  );
}
