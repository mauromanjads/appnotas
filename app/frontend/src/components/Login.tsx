import React, { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/login/`;

type Props = {
  onLogin: (token: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async () => {
    setMensaje("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      // 🔥 IMPORTANTE
      // Notificar al sistema que se autenticó
      onLogin(data.access_token);

      setMensaje("✅ Login exitoso");

    } catch {
      setMensaje("❌ Credenciales incorrectas");
    }
  };

  return (
    <div
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
  }}
>
  <div
    style={{
      width: 320,
      padding: 30,
      borderRadius: 12,
      background: "#fff",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      textAlign: "center",
    }}
  >
    <h2 style={{ marginBottom: 20 }}>Login</h2>

    <input
      placeholder="Usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{
        width: "100%",
        padding: 10,
        marginBottom: 12,
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
      }}
    />

    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      style={{
        width: "100%",
        padding: 10,
        marginBottom: 18,
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
      }}
    />

    <button
      onClick={handleLogin}
      style={{
        width: "100%",
        padding: 12,
        borderRadius: 6,
        border: "none",
        background: "#1976d2",
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Ingresar
    </button>

    <p style={{ marginTop: 15, color: "#d32f2f" }}>{mensaje}</p>
  </div>
</div>

  );
};

export default Login;
