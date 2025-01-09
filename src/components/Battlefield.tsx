import styles from "./BattlefieldItems.module.css";

export default function Battlefield() {
  const cells = Array.from({ length: 100 }, (_, i) => i);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
              <div key={cell} className={styles.cell}></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
