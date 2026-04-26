// src/pages/Cadastro.jsx
// PÁGINA 1 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import "../styles/global.css";

function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    dataNascimento: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  async function handleCadastro() {
    const { email, senha, nome, sobrenome, dataNascimento } = form;

    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      setErro("Preencha todos os campos.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      // Cria usuario no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      // Grava dados adicionais no Firestore com o UID do usuário
      await setDoc(doc(db, "usuarios", uid), {
        uid: uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email,
        criadoEm: new Date().toISOString(),
      });

      setSucesso("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        setErro("E-mail inválido.");
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <div className="logo-circle">C</div>
          <h1 className="card-title">Criar Conta</h1>
          <p className="card-subtitle">Preencha seus dados para se cadastrar</p>
        </div>

        <div className="form-group">
          <label className="label">Nome</label>
          <input
            className="input"
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="label">Sobrenome</label>
          <input
            className="input"
            type="text"
            name="sobrenome"
            placeholder="Seu sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="label">Data de Nascimento</label>
          <input
            className="input"
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
          />
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
            placeholder="Mínimo 6 caracteres"
            value={form.senha}
            onChange={handleChange}
          />
        </div>

        {erro && <div className="msg-erro">{erro}</div>}
        {sucesso && <div className="msg-sucesso">{sucesso}</div>}

        <button
          className="btn-primary"
          onClick={handleCadastro}
          disabled={carregando}
        >
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="link-text">
          Já tem conta?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Fazer login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
