import {useState} from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

export default function Login() {
  const [ enteredValues, setEnteredValues ] = useState({
    email: '',
    password: '',
  });

  const [ didEdit, setDidEdit ] = useState({
    email: false,
    password: false
  })

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);

  const passwordIsInvalid =
    didEdit.password &&
    !hasMinLength(enteredValues, 6);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value
    }))
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false,
    }))
  }

  function handleInputBlur(identifier) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }))
  }

  function handleFocus(identifier) {

    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          error={emailIsInvalid && "Please entered a valid email address."}
          // onFocus={handleFocus}
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          error={passwordIsInvalid && "Please entered a valid password."}
          // onFocus={handleFocus}
          onBlur={() => handleInputBlur('password')}
          onChange={(event) => handleInputChange('password', event.target.value)}
          value={enteredValues.password}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button type="button" className="button" onClick={handleSubmit}>Login</button>
      </p>
    </form>
  );
}