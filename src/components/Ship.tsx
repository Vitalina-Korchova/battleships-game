import styles from "./Ship.module.css";

export default function Ship({ amount }: { amount: number }) {
  if (amount === 1) {
    return (
      <div className={styles.singleShip}>
        <div className={styles.circle}></div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headShip}>
        <div className={styles.circle}></div>
      </div>

      {amount >= 3 && (
        <div className={styles.bodyShip}>
          <div className={styles.circle}></div>
        </div>
      )}

      {amount === 4 && (
        <div className={styles.bodyShip}>
          <div className={styles.circle}></div>
        </div>
      )}

      {amount >= 2 && (
        <div className={styles.tailShip}>
          <div className={styles.circle}></div>
        </div>
      )}
    </div>
  );
}
