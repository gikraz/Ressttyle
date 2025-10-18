import React, { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-testing-sage.vercel.app/api/auth",
});

function Auth() {
  const [isLogin, setIsLogin] = useState(true); 
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await API.post("/login", { email: form.email, password: form.password });
        setMsg(`Login successful! Welcome ${response.data.user.name}`);
      } else {
        response = await API.post("/signup", form);
        setMsg(`Signup successful! Welcome ${response.data.user.name}`);
      }
      localStorage.setItem("token", response.data.token);
      setForm({ name: "", email: "", password: "" }); 
    } catch (err) {
      setMsg(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
      {msg && <p style={{ marginTop: "10px", color: "green" }}>{msg}</p>}
    </div>
  );
}

export default Auth;
