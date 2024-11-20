// src/pages/Login.tsx
"use client"; // Necessário para o Next.js 13

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirecionamento
import { useAuth } from "../context/AuthContext"; // Importando o hook do contexto
import "./login.css";
import { Header } from "@/components/Header";

export default function Login() {
  const { login } = useAuth(); // Função de login do contexto
  const [username, setUsername] = useState(""); // Estado para o usuário
  const [password, setPassword] = useState(""); // Estado para a senha
  const [error, setError] = useState(""); // Estado para o erro
  const router = useRouter(); // Para redirecionar após login bem-sucedido

  // Função chamada no envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir o comportamento padrão de envio do formulário

    const success = login(username, password); // Tenta realizar o login

    if (success) {
      router.push("/"); // Redireciona o usuário para a página de dashboard ou outra
    } else {
      setError("Usuário ou senha inválidos"); // Exibe erro se o login falhar
    }
  };

  return (
    <>
    <Header/>
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-slate-700 mb-5 text-xl">Login</h2>

        {/* Campo de usuário */}
        <div className="inputContainer">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Digite seu usuário"
            required
            value={username} // Vincula o valor ao estado
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado quando o valor mudar
          />
        </div>

        {/* Campo de senha */}
        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            required
            value={password} // Vincula o valor ao estado
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado quando o valor mudar
          />
        </div>

        {/* Exibe erro caso haja falha no login */}
        {error && <p className="text-red-700 font-medium text-sm text-center pb-2">{error}</p>}

        <button type="submit" className="submitButton">
          Entrar
        </button>
      </form>
    </div>
    </>
  );
}
