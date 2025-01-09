import styles from "./Ship.module.css";

export default function Ship({ amount }: { amount: number }) {
  if (amount === 1) {
    return (
      <div className={styles.innerShip}>
        <div className={styles.singleShip}>
          <div className={styles.circle}></div>
        </div>
      </div>
    );
  }
  if (amount === 2) {
    return (
      <div className={styles.innerShip}>
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
      <div className={styles.innerShip}>
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
      <div className={styles.innerShip}>
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
