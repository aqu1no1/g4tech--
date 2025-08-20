import { CadNotas } from "./components/cadNotas.jsx";
import { CadAluno } from "./components/cadAluno.jsx";
import { Home } from "./components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastrarAluno" element={<CadAluno />} />
        <Route path="/cadastrarNotas" element={<CadNotas />} />
        <Route path="" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
