import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.promoBlock}>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.pinkGradient}`} id={styles.element1}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.blueGradient}`} id={styles.element2}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.pinkGradient}`} id={styles.element3}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.blueGradient}`} id={styles.element4}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.yellowGradient}`} id={styles.element5}></div>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Вход</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input type="text" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <input type="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
        <div className={styles.registerLink}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
