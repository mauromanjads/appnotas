import React, { useState, useEffect } from "react";
import Marcas from "./components/Marcas";
import Notas from "./components/Notas";

type Props = {
  onLogout: () => void;
};

const App: React.FC<Props> = ({ onLogout }) => {
  const getPath = () => window.location.pathname.toLowerCase();
  const [path, setPath] = useState(getPath());

  const go = (url: string) => {
    window.history.pushState({}, "", url);
    setPath(url.toLowerCase());
  };

  useEffect(() => {
    const handler = () => setPath(getPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const renderPage = () => {
    if (path === "/marcas") return <Marcas />;
    if (path === "/notas") return <Notas />;
    return <Marcas />;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center", // centra horizontal
        alignItems: "flex-start", // si quieres centro vertical, pon "center"
        padding: "30px 15px", // padding adaptable
        fontFamily: "Segoe UI, Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1300,
          background: "white",
          borderRadius: 10,
          padding: 25,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>ADMINISTRACIÓN DE NOTAS</h1>
          <button
            onClick={onLogout}
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 25,
            marginTop: 20,
            flexWrap: "wrap", // se adapta en pantallas pequeñas
            gap: 1,
          }}
        >
          <button
            onClick={() => go("/marcas")}
            style={{
              padding: "10px 18px",
              border: "1px solid #ddd",
              background: path === "/marcas" ? "#007bff" : "#f1f1f1",
              color: path === "/marcas" ? "white" : "#333",
              cursor: "pointer",
              fontWeight: 600,
              borderRadius: "6px 0 0 6px",
              minWidth: 100,
            }}
          >
            Marcas
          </button>

          <button
            onClick={() => go("/notas")}
            style={{
              padding: "10px 18px",
              border: "1px solid #ddd",
              borderLeft: "none",
              background: path === "/notas" ? "#007bff" : "#f1f1f1",
              color: path === "/notas" ? "white" : "#333",
              cursor: "pointer",
              fontWeight: 600,
              borderRadius: "0 6px 6px 0",
              minWidth: 100,
            }}
          >
            Notas
          </button>
        </div>

        {/* Contenido */}
        <div>{renderPage()}</div>
      </div>
    </div>
  );
};

export default App;
