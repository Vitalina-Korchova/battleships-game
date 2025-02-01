import { Link } from "react-router-dom";
import styles from "./PopUp.module.css";

export default function PopUp() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <p>Test1</p>
          <p>Test2</p>
        </div>
      </div>
    </>
  );
}
