import styles from "./Categoria.module.css";

const Categoria = ({ titulo, subtitulo }) => {
  return (
    <div>
      <h2 className={styles.categoria_titulo}>
        <span className={styles.yellow_bar} />
        {titulo}
      </h2>

      {subtitulo && <h4 className={styles.categoria_subtitulo}>{subtitulo}</h4>}
    </div>
  );
};

export default Categoria;
