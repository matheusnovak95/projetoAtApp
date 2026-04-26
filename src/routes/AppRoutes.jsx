// src/routes/AppRoutes.jsx
// ARQUIVO DE ROTAS

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Principal from "../pages/Principal";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão redireciona para Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página de Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Página Principal (após login) */}
        <Route path="/principal" element={<Principal />} />

        {/* Rota não encontrada */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
