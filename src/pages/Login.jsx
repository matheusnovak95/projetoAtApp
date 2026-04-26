// src/pages/Login.jsx
// PAGINA 2

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import "../styles/global.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  async function handleLogin() {
    const { email, senha } = form;

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      // Valida os dados no Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      // Salva o UID
      sessionStorage.setItem("uid", uid);

      // Redireciona
      navigate("/principal");
    } catch (error) {
      // Usuario nao encontrado ou senha errada
      setErro("Usuário não está cadastrado ou senha incorreta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <div className="logo-circle">A</div>
          <h1 className="card-title">Bem-vindo</h1>
          <p className="card-subtitle">Entre com suas credenciais</p>
        </div>

        <div className="form-group">
          <label className="label">E-mail</label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="label">Senha</label>
          <input
            className="input"
            type="password"
            name="senha"
            placeholder="Sua senha"
            value={form.senha}
            onChange={handleChange}
          />
        </div>

        {erro && <div className="msg-erro">{erro}</div>}

        <button
          className="btn-primary"
          onClick={handleLogin}
          disabled={carregando}
        >
          {carregando ? "Entrando..." : "Acessar"}
        </button>

        <p className="link-text">
          Não tem conta?{" "}
          <span className="link" onClick={() => navigate("/cadastro")}>
            Cadastrar-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
