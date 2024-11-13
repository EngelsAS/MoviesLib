import styles from "./LoadingComponent.module.css";
import { Icon } from "@iconify/react";

const LoadingComponent = () => {
  return (
    <div className={styles.loading_div}>
      <Icon icon="line-md:loading-loop" style={{ color: "#757575" }} />
    </div>
  );
};

export default LoadingComponent;
