import styles from "./BattlefieldItems.module.css";
import Battlefield from "./Battlefield";
import Ship from "./Ship";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
export default function PlaceShipsBlock() {
  const [shipPosition, setShipPosition] = useState({});

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      setShipPosition((prev) => ({
        ...prev,
        [active.id]: over.id,
      }));
    }
  };

  return (
    <>
      <div className={styles.container}>
        <DndContext onDragEnd={handleDragEnd}>
          <Battlefield />
          <div>
            <Ship id={"ship1"} amount={1} />
            <Ship id={"ship2"} amount={2} />
            <Ship id={"ship3"} amount={3} />
            <Ship id={"ship4"} amount={4} />
          </div>
        </DndContext>
      </div>
    </>
  );
}
