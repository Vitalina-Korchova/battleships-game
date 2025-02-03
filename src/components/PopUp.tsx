import { Link } from "react-router-dom";
import styles from "./PopUp.module.css";

export default function PopUp({ result }: { result: boolean }) {
  return (
    <>
      <div
        className={styles.container}
        style={{ border: `thick double ${result ? "#c0cbff" : "#ffa68d"}` }}
      >
        <div className={styles.innerContainer}>
          {result && <p className={styles.textVictory}>Ви перемогли!</p>}
          {result && (
            <img
              className={styles.img}
              src="./icon-victory.png"
              alt="victory"
            />
          )}
          {!result && <p className={styles.textDefeat}> Ви програли!</p>}
          {!result && (
            <img className={styles.img} src="./icon-defeat.png" alt="defeat" />
          )}
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              className={styles.btnEnd}
              style={{
                backgroundImage: result
                  ? "linear-gradient(45deg, #0cddf9 0%, #0900b2 51%, #0368db 100%)"
                  : "linear-gradient(45deg, #ffa68d 0%, #b22f00 51%, #db2703 100%)",
              }}
            >
              Завершити гру
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
