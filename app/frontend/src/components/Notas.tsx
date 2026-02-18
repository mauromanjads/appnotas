import React, { useState, useEffect } from "react";
import type { Nota, Marca } from "../types";

const API_URL_NOTAS = `${import.meta.env.VITE_API_URL}/notas`;
const API_URL_MARCAS = `${import.meta.env.VITE_API_URL}/marcas`;

const Notas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);

  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [marcaId, setMarcaId] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const fetchNotas = async () => {
    const res = await fetch(API_URL_NOTAS);
    const data: Nota[] = await res.json();
    setNotas(data);
  };

  const fetchMarcas = async () => {
    const res = await fetch(API_URL_MARCAS);
    const data: Marca[] = await res.json();
    setMarcas(data);
  };

  const saveNota = async () => {
    if (!titulo || !cuerpo || !marcaId) return;

    const payload = {
      titulo,
      cuerpo,
      marca_id: parseInt(marcaId),
    };

    if (editId === null) {
      await fetch(API_URL_NOTAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API_URL_NOTAS}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    cancelEdit();
    fetchNotas();
  };

  const editNota = (n: Nota) => {
    setTitulo(n.titulo);
    setCuerpo(n.cuerpo);
    setMarcaId(String(n.marca_id));
    setEditId(n.id);
  };

  const cancelEdit = () => {
    setTitulo("");
    setCuerpo("");
    setMarcaId("");
    setEditId(null);
  };

  const deleteNota = async (id: number) => {
    await fetch(`${API_URL_NOTAS}/${id}`, { method: "DELETE" });
    fetchNotas();
  };

  useEffect(() => {
    fetchNotas();
    fetchMarcas();
  }, []);

  const getMarcaNombre = (id: number) =>
    marcas.find((m) => m.id === id)?.nombre || "—";

  const styles = {
    container: { maxWidth: 800, margin: "20px auto", fontFamily: "Arial" },
    input: { padding: 8, marginRight: 10, borderRadius: 4, border: "1px solid #ccc" },
    select: { padding: 8, marginRight: 10 },
    btn: {
      padding: "8px 12px",
      marginRight: 5,
      borderRadius: 4,
      border: "none",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      marginTop: 20,
    },
    th: {
      background: "#f4f4f4",
      borderBottom: "2px solid #ddd",
      textAlign: "left" as const,
      padding: 10,
    },
    td: {
      borderBottom: "1px solid #ddd",
      padding: 10,
    },
  };

  return (
    <div style={styles.container}>
      <h2>Notas</h2>

      <div style={{ marginBottom: 15 }}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Cuerpo"
          value={cuerpo}
          onChange={(e) => setCuerpo(e.target.value)}
          style={{
            ...styles.input,
            width: "100%",
            minHeight: 120,
            resize: "vertical"
          }}
        />


        <select
          value={marcaId}
          onChange={(e) => setMarcaId(e.target.value)}
          style={styles.select}
        >
          <option value="">Selecciona marca</option>
          {marcas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        <button
          style={{ ...styles.btn, background: "#28a745", color: "white" }}
          onClick={saveNota}
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
            <th style={styles.th}>Título</th>
            <th style={styles.th}>Cuerpo</th>
            <th style={styles.th}>Marca</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {notas.map((n) => (
            <tr key={n.id}>
              <td style={styles.td}>{n.id}</td>
              <td style={styles.td}>{n.titulo}</td>
              <td style={styles.td}>{n.cuerpo}</td>
              <td style={styles.td}>{getMarcaNombre(n.marca_id)}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.btn, background: "#007bff", color: "white" }}
                  onClick={() => editNota(n)}
                >
                  Editar
                </button>

                <button
                  style={{ ...styles.btn, background: "#dc3545", color: "white" }}
                  onClick={() => deleteNota(n.id)}
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

export default Notas;
