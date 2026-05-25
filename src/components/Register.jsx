import React, { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      level: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    
    const emailExists =
      users.find(
        (u) => u.email === formData.email
      );

    if (emailExists) {

      alert("Email already exists");

      return;
    }

    
    const mobileExists =
      users.find(
        (u) => u.mobile === formData.mobile
      );

    if (mobileExists) {

      alert("Mobile already exists");

      return;
    }

    
    if (
      !/^[0-9]{10}$/.test(formData.mobile)
    ) {

      alert(
        "Mobile Number must be 10 digits"
      );

      return;
    }

    // Password Validation
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;

    if (
      !pattern.test(formData.password)
    ) {

      alert(
        "Password must contain letter, number & special character"
      );

      return;
    }

    users.push(formData);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    
    navigate("/",
    //    {
    //   state: {
    //     email: formData.email,
    //     password: formData.password
    //   }
    // }
  );
  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          maxLength="10"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="level"
          required
          onChange={handleChange}
          style={styles.input}
        >

          <option value="">
            Select Level
          </option>

          <option>Expert</option>

          <option>Medium</option>

          <option>Trainee</option>

        </select>

        <button
          type="submit"
          style={styles.button}
        >
          Register
        </button>

        <p>

          Already have account ?

          <Link to="/">
            Login
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
    background: "blue",
    color: "#fff",
    border: "none"
  }
};

export default Register;