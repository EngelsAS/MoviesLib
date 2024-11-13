import styles from "./Categoria.module.css";

interface IProps {
  titulo: string;
  subtitulo?: string | undefined;
}

const Categoria = ({ titulo, subtitulo }: IProps) => {
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
