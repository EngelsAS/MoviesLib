import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./IconAddToWatchList.module.css";

const IconAddToWatchList = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <div style={{ position: "relative" }} onClick={onClick}>
        <Icon
          className={styles.add_svg}
          fontSize={25}
          icon="ic:baseline-add"
          style={{ color: "#fff" }}
        />
        <Icon
          className={styles.label_svg}
          icon="material-symbols:label-sharp"
          style={{ color: "#000000" }}
          rotate={1}
          fontSize={75}
        />
      </div>
    </div>
  );
};

export default IconAddToWatchList;
