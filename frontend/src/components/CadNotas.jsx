import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./cadNotas.module.css";

export function CadNotas() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [disciplinas, setDisciplina] = useState("");
  const [nota, setNota] = useState("");
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [notas, setNotas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const alunoRes = await axios.get(
        "http://localhost:3000/notas/verificar",
        {
          params: { nome, ra },
        }
      );

      if (!alunoRes.data.existe) {
        alert("Aluno não encontrado!");
        return;
      }

      const dados = {
        alunoId: alunoRes.data.id,
        disciplina: disciplinas,
        nota,
      };

      await axios.post("http://localhost:3000/notas", dados);

      handlePesquisar();
      setDisciplina("");
      setNota("");
    } catch (err) {
      console.error("Erro ao salvar nota:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notas/${id}`);

      handlePesquisar();
    } catch (err) {
      console.error("Erro ao excluir nota:", err);
    }
  };

  const handlePesquisar = async () => {
    if (!nome.trim() || !ra.trim()) {
      alert("Preencha nome e RA!");
      return;
    }

    try {
      const check = await axios.get("http://localhost:3000/notas/verificar", {
        params: { nome, ra },
      });

      if (check.data.existe) {
        const res = await axios.get("http://localhost:3000/notas/aluno/notas", {
          params: { nome, ra },
        });

        setMostrarForm(true);
        setNotas(res.data);
      } else {
        setMostrarForm(false);
        setNotas([]);
        alert("Aluno não encontrado no banco de dados!");
      }
    } catch (err) {
      console.error("Erro ao buscar aluno:", err);
      alert("Erro ao buscar no banco de dados!");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1>CRUD - Notas das disciplinas</h1>
      </div>
      <div className={styles.search}>
        <div className={styles.inputs}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Pesquisar por nome..."
          />
          <input
            type="text"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            placeholder="Digite o RA..."
          />
        </div>

        <div className={styles.buttons}>
          <button type="button" onClick={handlePesquisar}>
            Pesquisar
          </button>

          <Link to="/cadastrarAluno">
            <button className={styles.btVoltar}>Voltar</button>
          </Link>
        </div>
      </div>

      <div
        className={`${styles.formulario} ${mostrarForm ? styles.comBorda : ""}`}
      >
        {mostrarForm && (
          <div className="formularioNotas">
            <div className={styles.formTitle}>
              <h2>Cadastro de Notas</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formTitle}>
                <select
                  name="disciplinas"
                  id="disciplinas"
                  value={disciplinas}
                  onChange={(e) => setDisciplina(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione uma disciplina
                  </option>
                  <option value="Calculo1">Cálculo I</option>
                  <option value="Calculo2">Cálculo II</option>
                  <option value="Calculo3">Cálculo III</option>
                  <option value="Fisica1">Física I</option>
                  <option value="Fisica2">Física II</option>
                  <option value="QuimicaGeral">Química Geral</option>
                  <option value="QuimicaExperimental">
                    Química Experimental
                  </option>
                  <option value="AlgebraLinear">Álgebra Linear</option>
                  <option value="GeometriaAnalitica">
                    Geometria Analítica
                  </option>
                  <option value="ResistenciaDosMateriais">
                    Resistência dos Materiais
                  </option>
                  <option value="MecanicaDosFluidos">
                    Mecânica dos Fluidos
                  </option>
                </select>

                <input
                  type="number"
                  name="nota"
                  min="0"
                  max="10"
                  step="0.1"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  required
                />
              </div>

              <br />
              <div className={styles.buttonContainer}>
                <button id="salvarNotas" type="submit">
                  Salvar Notas
                </button>
              </div>
            </form>

            <div className={styles.tabelaNotas}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Disciplina</th>
                    <th>Nota</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {notas.map((n) => (
                    <tr key={n.id}>
                      <td>{n.id}</td>
                      <td>{n.aluno?.nome}</td>
                      <td>{n.aluno?.ra}</td>
                      <td>{n.disciplina}</td>
                      <td>{n.nota}</td>
                      <td>
                        <button onClick={() => handleDelete(n.id)}>
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
