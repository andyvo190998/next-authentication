import axios from 'axios';
import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import classes from './auth-form.module.css';
import { useRouter } from 'next/router';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const emailInput = useRef();
  const passwordInput = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    if (isLogin) {
      // login
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result.error) {
        router.replace('/profile');
      } else {
        alert('fail to login');
      }
    } else {
      const input = {
        email: enteredEmail,
        password: enteredPassword,
      };
      axios
        .post('/api/auth/signIn', input)
        .then(() => console.log('create new user successful'))
        .catch(() => console.log('create user fail'));
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleOnSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInput} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInput} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
