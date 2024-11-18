// app/login/page.js
import styles from './login.module.css';  // Adicione um arquivo de estilo CSS

export default function Login() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Digite seu usuário"
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Entrar</button>
      </form>
    </div>
  );
}
