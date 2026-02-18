import React, { useState, useEffect } from "react";
import type { Marca } from "../types";

const API_URL = `${import.meta.env.VITE_API_URL}/marcas`;

const Marcas: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);


  const fetchMarcas = async () => {
    const res = await fetch(API_URL);
    const data: Marca[] = await res.json();
    setMarcas(data);
  };

  const saveMarca = async () => {
    if (!nombre) return;

    if (editId === null) {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });
    } else {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });
    }

    setNombre("");
    setEditId(null);
    fetchMarcas();
  };

  const editMarca = (m: Marca) => {
    setNombre(m.nombre);
    setEditId(m.id);
  };

  const cancelEdit = () => {
    setNombre("");
    setEditId(null);
  };
const deleteMarca = async (id: number) => {
  setError(null);

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail || "No se pudo eliminar la marca");
      return;
    }

    fetchMarcas();
  } catch {
    setError("Error de conexión con el servidor");
  }
};

  useEffect(() => {
    fetchMarcas();
  }, []);

useEffect(() => {
  if (!error) return;

  const timer = setTimeout(() => {
    setError(null);
  }, 3500); // milisegundos (3.5 segundos)

  return () => clearTimeout(timer);
}, [error]);


  const styles = {
    container: { maxWidth: 600, margin: "20px auto", fontFamily: "Arial" },
    input: { padding: 8, marginRight: 10, borderRadius: 4, border: "1px solid #ccc" },
    btn: {
      padding: "8px 12px",
      marginRight: 5,
      borderRadius: 4,
      border: "none",
      cursor: "pointer"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      marginTop: 20
    },
    th: {
      background: "#f4f4f4",
      borderBottom: "2px solid #ddd",
      textAlign: "left" as const,
      padding: 10
    },
    td: {
      borderBottom: "1px solid #ddd",
      padding: 10
    }
  };


  return (
    <div style={styles.container}>
      <h2>Marcas</h2>



      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: 10,
            borderRadius: 4,
            marginBottom: 10,
            border: "1px solid #f5c6cb"
          }}
        >
          {error}
        </div>
      )}

      <div>
        <input
          placeholder="Nombre marca"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />

        <button
          style={{ ...styles.btn, background: "#28a745", color: "white" }}
          onClick={saveMarca}
        >
          {editId === null ? "Crear" : "Actualizar"}
        </button>

        {editId !== null && (
          <button
            style={{ ...styles.btn, background: "#6c757d", color: "white" }}
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {marcas.map((m) => (
            <tr key={m.id}>
              <td style={styles.td}>{m.id}</td>
              <td style={styles.td}>{m.nombre}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.btn, background: "#007bff", color: "white" }}
                  onClick={() => editMarca(m)}
                >
                  Editar
                </button>

                <button
                  style={{ ...styles.btn, background: "#dc3545", color: "white" }}
                  onClick={() => deleteMarca(m.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marcas;
