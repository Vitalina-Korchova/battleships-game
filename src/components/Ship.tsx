import styles from "./Ship.module.css";
import { useDraggable } from "@dnd-kit/core";
export default function Ship({ id, amount }: { id: string; amount: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  if (amount === 1) {
    return (
      <div
        className={styles.singleShip}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
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
