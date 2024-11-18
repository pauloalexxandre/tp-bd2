// components/Login.js
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    // Função para validar o login (simulação simples)
    const handleLogin = (e) => {
        e.preventDefault();
        
        const usuarioValido = 'admin';
        const senhaValida = '1234';

        if (usuario === usuarioValido && senha === senhaValida) {
            alert('Login Bem-Sucedido!');
            // Aqui você pode redirecionar o usuário para outra página
        } else {
            alert('Usuário ou senha inválidos');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.textbox}>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.textbox}>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <input type="submit" value="Entrar" className={styles.btnLogin} />
                </form>
            </div>
        </div>
    );
};

export default Login;
