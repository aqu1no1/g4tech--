import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CadAluno.module.css";

export function CadAluno() {
  const [curso, setCurso] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [alunoEditando, setAlunoEditando] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/alunos");
      setAlunos(res.data);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const dados = {
      nome: formData.get("nome"),
      ra: formData.get("ra"),
      curso: formData.get("curso"),
      email: formData.get("email"),
      dataNascimento: formData.get("dataNascimento"),
    };

    try {
      await axios.post("http://localhost:3000/alunos", dados);
      fetchAlunos();
      e.target.reset();
      setCurso("");
    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/alunos/${id}`);
      fetchAlunos();
    } catch (err) {
      console.error("Erro ao excluir aluno:", err);
    }
  };

  const handleEdit = async (id, dados) => {
    try {
      await axios.put(`http://localhost:3000/alunos/${id}`, dados);
      fetchAlunos();
      setAlunoEditando(null);
    } catch (err) {
      console.error("Erro ao editar aluno:", err);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1>CRUD - Cadastrar Alunos</h1>
        <Link to="/cadastrarNotas">
          <button>Ir para área Cadastrar Notas</button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required />
          <br />

          <label htmlFor="ra">RA:</label>
          <input type="text" id="ra" name="ra" required />
          <br />

          <label htmlFor="curso">Curso:</label>
          <select
            name="curso"
            id="curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione um curso
            </option>
            <option value="Engenharia Civil">Engenharia Civil</option>
            <option value="Engenharia Mecanica">Engenharia Mecânica</option>
            <option value="Engenharia Eletrica">Engenharia Elétrica</option>
            <option value="Engenharia de Producao">
              Engenharia de Produção
            </option>
            <option value="Engenharia de Computacao">
              Engenharia de Computação
            </option>
            <option value="Engenharia Quimica">Engenharia Química</option>
            <option value="Engenharia Ambiental">Engenharia Ambiental</option>
            <option value="Engenharia de Controle Automacao">
              Engenharia de Controle e Automação
            </option>
          </select>
          <br />

          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            required
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <div>
            <button className={styles.btCadastrar} type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>RA</th>
              <th>Curso</th>
              <th>Email</th>
              <th>Data de Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.ra}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.email}</td>
                <td>{aluno.dataNascimento}</td>
                <td>
                  <button
                    className={styles.btEditar}
                    onClick={() => setAlunoEditando(aluno)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.btExcluir}
                    onClick={() => handleDelete(aluno.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={alunoEditando ? styles.editContainer : ""}>
        {alunoEditando && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const dados = Object.fromEntries(formData);
              handleEdit(alunoEditando.id, dados);
            }}
          >
            <div className={styles.headerEdit}>
              <h2>Editando o Aluno</h2>
            </div>
            <div className={styles.labelNome}>
              <label htmlFor="">Nome:</label>
            </div>
            <div className={styles.inputNome}>
              <input
                type="text"
                name="nome"
                defaultValue={alunoEditando.nome}
                required
              />
            </div>
            <div className={styles.labelEmail}>
              <label htmlFor="">Email:</label>
            </div>
            <div className={styles.inputEmail}>
              <input
                type="email"
                name="email"
                defaultValue={alunoEditando.email}
                required
              />
            </div>
            <div className={styles.labelEmail}>
              <label>Curso:</label>
            </div>
            <div className={styles.inputCurso}>
              <select
                name="curso"
                id="curso"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecione um curso
                </option>
                <option value="Engenharia Civil">Engenharia Civil</option>
                <option value="Engenharia Mecanica">Engenharia Mecânica</option>
                <option value="Engenharia Eletrica">Engenharia Elétrica</option>
                <option value="Engenharia de Producao">
                  Engenharia de Produção
                </option>
                <option value="Engenharia de Computacao">
                  Engenharia de Computação
                </option>
                <option value="Engenharia Quimica">Engenharia Química</option>
                <option value="Engenharia Ambiental">
                  Engenharia Ambiental
                </option>
                <option value="Engenharia de Controle Automacao">
                  Engenharia de Controle e Automação
                </option>
              </select>
            </div>

            <div className={styles.labelDataNascimento}>
              <label htmlFor="">Data de Nascimento:</label>
            </div>
            <div className={styles.inputdataNascimento}>
              <input
                type="date"
                name="dataNascimento"
                defaultValue={alunoEditando.dataNascimento}
                required
              />
            </div>
            <div className={styles.bt}>
              <button type="submit" className={styles.btSalvar}>
                Salvar
              </button>

              <button
                type="button"
                className={styles.btCancelar}
                onClick={() => setAlunoEditando(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
