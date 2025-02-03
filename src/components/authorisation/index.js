import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthorisationPage.module.scss';

const AuthorisationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic here
    console.log('Registration attempt with:', { email, password, confirmPassword });
  };

  return (
    <div className={styles.authorisationContainer}>
      <div className={styles.promoBlock}>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.pinkGradient}`} id={styles.element1}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.blueGradient}`} id={styles.element2}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.pinkGradient}`} id={styles.element3}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.blueGradient}`} id={styles.element4}></div>
        <div className={`${styles.gradientElement} ${styles.elements} ${styles.yellowGradient}`} id={styles.element5}></div>
      </div>
      <form className={styles.authorisationForm} onSubmit={handleSubmit}>
        <h2>Зарегистрироваться</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Почта:
          </label>
          <input type="email" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <input type="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Подтвердите пароль:
          </label>
          <input type="password" id="confirmPassword" className={styles.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
        <p className={styles.loginLink}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default AuthorisationPage;
