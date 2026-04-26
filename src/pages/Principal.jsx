// src/pages/Principal.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import "../styles/global.css";

function Principal() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarUsuario() {
      // Recupera o UID da sessão
      const uid = sessionStorage.getItem("uid");

      if (!uid) {
        navigate("/login");
        return;
      }

      try {
        // Busca os dados no Firestore pelo UID
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        } else {
          setErro("Dados do usuário não encontrados.");
        }
      } catch (error) {
        setErro("Erro ao carregar dados do usuário.");
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuario();
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    sessionStorage.removeItem("uid");
    navigate("/login");
  }

  // Formata data de nascimento 
  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  if (carregando) {
    return (
      <div className="page-wrapper">
        <div className="card">
          <p className="card-subtitle">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <div className="avatar">
            {usuario?.nome?.charAt(0).toUpperCase()}
          </div>
          <h1 className="card-title">
            Olá, {usuario?.nome}!
          </h1>
          <p className="card-subtitle">Seus dados cadastrados</p>
        </div>

        {erro && <div className="msg-erro">{erro}</div>}

        {usuario && (
          <div className="dados-usuario">
            <div className="dado-item">
              <span className="dado-label">Nome</span>
              <span className="dado-valor">{usuario.nome}</span>
            </div>
            <div className="dado-item">
              <span className="dado-label">Sobrenome</span>
              <span className="dado-valor">{usuario.sobrenome}</span>
            </div>
            <div className="dado-item">
              <span className="dado-label">Data de Nascimento</span>
              <span className="dado-valor">{formatarData(usuario.dataNascimento)}</span>
            </div>
            <div className="dado-item">
              <span className="dado-label">E-mail</span>
              <span className="dado-valor">{usuario.email}</span>
            </div>
          </div>
        )}

        <button className="btn-outline" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Principal;
