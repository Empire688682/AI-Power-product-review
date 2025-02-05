import React, { useState } from 'react';
import style from "./SignupForm.module.css";

const SignupForm = ({ setShowSignup, showSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Add your signup logic here
    console.log('Signup data:', formData);
  };

  const handleGoogleSignup = () => {
    // Add your Google authentication logic here
    console.log('Google signup clicked');
  };

  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <button className={style.closeButton} onClick={()=>setShowSignup(!showSignup)}>
          ×
        </button>
        
        <h2 className={style.title}>Create Account</h2>
        
        <button 
          className={style.googleButton}
          onClick={handleGoogleSignup}
        >
          <img 
            src="/google-icon.png" 
            alt="Google" 
            className={style.googleIcon}
          />
          Continue with Google
        </button>

        <div className={style.divider}>
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              minLength="8"
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          {error && <div className={style.error}>{error}</div>}

          <button type="submit" className={style.submitButton}>
            Sign Up
          </button>
        </form>

        <p className={style.terms}>
          By signing up, you agree to our{' '}
          <a href="/terms">Terms of Service</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </p>

        <p className={style.login}>
          Already have an account?{' '}
          <a href="#" onClick={() => console.log('Switch to login')}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;