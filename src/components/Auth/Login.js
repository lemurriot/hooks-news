import React, { useState } from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            type="text"
            value={values.name}
            name="name"
            placeholder="Your name"
            autoComplete="off"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          value={values.email}
          name="email"
          placeholder="Your email"
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          type="password"
          value={values.password}
          name="password"
          placeholder="Choose a secure password"
          onChange={handleChange}
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "need to create new account" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
