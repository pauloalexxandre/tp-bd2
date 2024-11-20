// context/AuthContext.tsx
"use client"; // Necessário para o Next.js 13
import { createContext, useContext, useState, useEffect } from "react";
import users from "@/utils/login.json";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Criando o contexto com valores padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Verifica se existe um usuário no localStorage ao iniciar
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser); // Define o usuário a partir do localStorage
    }
  }, []);

  // Função para logar o usuário
  const login = (username: string, password: string): boolean => {
    // Exemplo simples de verificação de login com base nos dados fornecidos
    const validUser = users.find(
      (u) => u.user === username && u.password === password
    );

    if (validUser) {
      setUser(validUser.user); // Define o usuário logado
      localStorage.setItem("user", validUser.user); // Armazena o usuário no localStorage
      return true; // Login bem-sucedido
    }

    return false; // Login falhou
  };

  // Função para deslogar
  const logout = () => {
    setUser(null); // Limpa o estado do usuário
    localStorage.removeItem("user"); // Remove o usuário do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
