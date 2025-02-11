// pages/reset-password.jsx
import { useState } from 'react';
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your password reset logic here
    console.log('Password reset link sent to:', email);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Your Password</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Send Reset Link</button>
      </form>
    </div>
  );
}
