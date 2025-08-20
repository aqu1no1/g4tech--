import { Link } from "react-router-dom";
import styles from "./Home.module.css";
export function Home() {
  return (
    <>
      <div className={styles.header}>
        <h1>CRUD - Home</h1>
        <p>Bem-vindo ao sistema de CRUD para gerenciar alunos e notas!</p>
      </div>

      <div className={styles.botao1}>
        <Link to="/cadastrarAluno">
          <button>Ir para area Cadastrar Aluno</button>
        </Link>
      </div>
      <div className={styles.botao2}>
        <Link to="/cadastrarNotas">
          <button>Ir para area Cadastrar Notas</button>
        </Link>
      </div>
    </>
  );
}
