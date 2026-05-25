import React from "react";

function AdminLogin() {
  return (
    <div className="card">
      <h2>Admin Login</h2>

      <input type="text" placeholder="Admin Username" />
      <input type="password" placeholder="Password" />

      <button>Admin Login</button>
    </div>
  );
}

export default AdminLogin;