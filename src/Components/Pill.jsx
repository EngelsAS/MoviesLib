import styles from "./Pill.module.css";

const Pill = ({ text }) => {
  return <div className={styles.pill}>{text}</div>;
};

export default Pill;
