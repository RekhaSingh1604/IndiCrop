import React, {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {

      alert("Invalid Email or Password");

      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Login Successful");

    // Dashboard Open
    navigate("/dashboard");
  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleLogin}
        style={styles.form}
      >

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Login
        </button>

        <p>

          New User ?

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f4"
  },

  form: {
    background: "#fff",
    padding: "30px",
    width: "350px",
    borderRadius: "10px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none"
  }
};

export default Login;