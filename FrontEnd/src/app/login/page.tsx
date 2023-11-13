"use client";


import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // use JS to handle login
    console.log('Username:', username, 'Password:', password);
    // perform login logic
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
           <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
             <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formControl}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
      </div>
      <div className={styles.links}>
        <p>
          Forgot <Link href="https://www.google.com">Username / Password?</Link>
        </p>
        <p>
          Don't have an account? <Link href="https://www.google.com">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
