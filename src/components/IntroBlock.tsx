import styles from "./IntroBlock.module.css";

export default function IntroBlock({ start }: { start: () => void }) {
  return (
    <>
      <div className={styles.introBlock}>
        <span className={styles.nameGame}>Морський бій</span>
        <button onClick={start} type="button" className={styles.buttonStart}>
          Почати гру
        </button>
      </div>
    </>
  );
}
