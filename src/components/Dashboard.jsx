import React, {
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("currentUser")
    );

  const [tools, setTools] = useState([]);

  const [toolData, setToolData] =
    useState({
      title: "",
      category: "",
      image: "",
      quantity: 1
    });

  // Load Tools
  useEffect(() => {

    const savedTools =
      JSON.parse(
        localStorage.getItem("tools")
      ) || [];

    setTools(savedTools);

  }, []);

  // Handle Input
  const handleChange = (e) => {

    if (e.target.name === "image") {

      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {

        setToolData({
          ...toolData,
          image: reader.result
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }

    } else {

      setToolData({
        ...toolData,
        [e.target.name]: e.target.value
      });
    }
  };

  // Add Tool
  const addTool = (e) => {

    e.preventDefault();

    const newTools = [
      ...tools,
      toolData
    ];

    setTools(newTools);

    localStorage.setItem(
      "tools",
      JSON.stringify(newTools)
    );

    alert("Tool Added");

    setToolData({
      title: "",
      category: "",
      image: "",
      quantity: 1
    });
  };

  // Issue Tool
  const issueTool = (index) => {

    let updatedTools = [...tools];

    if (
      updatedTools[index].quantity > 0
    ) {

      updatedTools[index].quantity--;

      setTools(updatedTools);

      localStorage.setItem(
        "tools",
        JSON.stringify(updatedTools)
      );
    }
  };

  // Return Tool
  const returnTool = (index) => {

    let updatedTools = [...tools];

    updatedTools[index].quantity++;

    setTools(updatedTools);

    localStorage.setItem(
      "tools",
      JSON.stringify(updatedTools)
    );
  };

  // Logout
  const logout = () => {

    localStorage.removeItem(
      "currentUser"
    );

    navigate("/");
  };

  return (

    <div style={styles.container}>

      <h1>
        Welcome {user?.name}
      </h1>

      {/* Add Tool Form */}

      <form
        onSubmit={addTool}
        style={styles.form}
      >

        <h2>Add New Tool</h2>

        <input
          type="text"
          name="title"
          placeholder="Tool Name"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="category"
          placeholder="Tool Category"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="file"
          name="image"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.addBtn}>
          Add Tool
        </button>

      </form>

      <h2>Tools Inventory</h2>

      <div style={styles.cardContainer}>

        {
          tools.map((tool, index) => (

            <div
              key={index}
              style={styles.card}
            >

              <img
                src={tool.image}
                alt={tool.title}
                style={styles.image}
              />

              <h3>
                {tool.title}
              </h3>

              <p>
                Category:
                {tool.category}
              </p>

              <p>
                Quantity:
                {tool.quantity}
              </p>

              <button
                onClick={() =>
                  issueTool(index)
                }
                style={styles.issue}
              >
                Issue Tool
              </button>

              <button
                onClick={() =>
                  returnTool(index)
                }
                style={styles.return}
              >
                Return Tool
              </button>

            </div>
          ))
        }

      </div>

      <button
        onClick={logout}
        style={styles.logout}
      >
        Logout
      </button>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    background: "#f4f4f4",
    minHeight: "100vh"
  },

  form: {
    background: "#fff",
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "10px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },

  addBtn: {
    padding: "10px",
    background: "blue",
    color: "#fff",
    border: "none"
  },

  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
  },

  card: {
    background: "#fff",
    width: "220px",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },

  image: {
    width: "80px",
    height: "80px"
  },

  issue: {
    padding: "8px",
    margin: "5px",
    background: "green",
    color: "#fff",
    border: "none"
  },

  return: {
    padding: "8px",
    margin: "5px",
    background: "orange",
    color: "#fff",
    border: "none"
  },

  logout: {
    marginTop: "20px",
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none"
  }
};

export default Dashboard;