import { useEffect } from "react";
import styles from "./Battlefield.module.css";

interface BattlefieldProps {
  arrOccupiedCells?: string[];
  onClickCell?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickCellAuto?: () => void;
  hittedCells: string[];
  missedCells: string[];
  playerTurnState?: boolean;
}

export default function Battlefield({
  arrOccupiedCells = [],
  onClickCellAuto,
  playerTurnState,
  onClickCell,
  hittedCells,
  missedCells,
}: BattlefieldProps) {
  const cells = Array.from({ length: 100 }, (_, i) => i + 1);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  useEffect(() => {
    if (!playerTurnState && onClickCellAuto) {
      onClickCellAuto();
    }
  }, [playerTurnState, onClickCellAuto]);

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
                {letter}
              </div>
            ))}
          </div>
          <div className={styles.battlefield}>
            {cells.map((cell) => (
              <div
                key={cell}
                onClick={(e) => onClickCell?.(e)}
                id={`cell-${cell}`}
                className={`${
                  arrOccupiedCells.includes(`cell-${cell}`) &&
                  !hittedCells.includes(`cell-${cell}`)
                    ? styles.occupiedCell
                    : hittedCells.includes(`cell-${cell}`)
                    ? styles.occupiedCellHitted
                    : missedCells.includes(`cell-${cell}`)
                    ? styles.cellMissed
                    : styles.cell
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
