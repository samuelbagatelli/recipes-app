import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';

function Login() {
  const handleSubmit = (event) => event.preventDefault();

  const handleChange = ({ target }, setter) => {
    const { value } = target;
    setter(value);
  };

  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
  } = useContext(LoginContext);

  const emailDisable = () => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
      return true;
    }
  };

  const passwordDisable = () => {
    const PASSWORD_VALIDATION = 6;

    if (passwordInput.length <= PASSWORD_VALIDATION) {
      return true;
    }
  };

  const disabled = () => {
    if (emailDisable() || passwordDisable()) {
      return true;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={ handleSubmit }
      >
        <input
          type="text"
          placeholder="Email"
          data-testid="email-input"
          onChange={ (event) => {
            handleChange(event, setEmailInput);
            disabled();
          } }
          value={ emailInput }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={ (event) => {
            handleChange(event, setPasswordInput);
            disabled();
          } }
          value={ passwordInput }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
