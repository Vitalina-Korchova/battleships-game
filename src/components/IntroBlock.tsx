import { Link } from "react-router-dom";
import styles from "./IntroBlock.module.css";

export default function IntroBlock() {
  return (
    <>
      <div className={styles.introBlock}>
        <span className={styles.nameGame}>Морський бій</span>
        <Link to="/place_ships" style={{ textDecoration: "none" }}>
          <button type="button" className={styles.buttonStart}>
            Почати гру
          </button>
        </Link>
      </div>
    </>
  );
}
