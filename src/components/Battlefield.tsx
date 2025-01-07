import styles from "./BattlefieldItems.module.css";
import { useDroppable } from "@dnd-kit/core";

export default function Battlefield({ id, children }) {
  const cells = Array.from({ length: 100 }, (_, i) => i);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "lightgreen" : "#c9d9f1",
  };
  return (
    <>
      <div className={styles.wrapperBattlefield}>
        <div className={styles.columnNumbers}>
          {numbers.map((numb) => (
            <div key={numb} className={styles.lettersNumbers}>
              {" "}
              {numb}
            </div>
          ))}
        </div>

        <div>
          <div className={styles.rowLetters}>
            {letters.map((letter) => (
              <div key={letter} className={styles.lettersNumbers}>
                {" "}
                {letter}
              </div>
            ))}
          </div>
          <div className={styles.battlefield}>
            {cells.map((cell) => (
              <div
                ref={setNodeRef}
                style={style}
                key={cell}
                className={styles.cell}
              >
                {children}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
