import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://backend-testing-m2l4.vercel.app/api/auth";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if(isRegister){
        await axios.post(`${BASE_URL}/register`, form);
        alert("მომხმარებელი შექმნილია. ახლა შეხვიდეთ სისტემაში.");
        setIsRegister(false);
      } else {
        const res = await axios.post(`${BASE_URL}/login`, {
          email: form.email,
          password: form.password
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        if(res.data.user.role === "buyer") navigate("/dashboard/buyer");
        else navigate("/dashboard/seller");
      }
    } catch(err){
      alert(err.response?.data?.msg || "შეცდომა მოხდა");
    }
  };

  return (
    <div style={{ maxWidth:"400px", margin:"50px auto", textAlign:"center" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {isRegister && <>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required/>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required/>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p style={{ marginTop:"10px" }}>
        {isRegister ? "Have an account?" : "Don't have an account?"}{" "}
        <span onClick={()=>setIsRegister(!isRegister)} style={{ color:"blue", cursor:"pointer", textDecoration:"underline" }}>
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
    </div>
  );
}
