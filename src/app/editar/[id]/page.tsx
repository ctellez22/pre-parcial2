"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  // estados controlados (los mismos campos que usaste al crear)
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // cargar datos del autor al abrir
  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/authors/${id}`)
      .then((r) => r.json())
      .then((a) => {
        setName(a.name || "");
        setBirthDate(a.birthDate || "");
        setDescription(a.description || "");
        setImage(a.image || "");
      })
      .catch(() => {});
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, birthDate, description, image }),
    }).catch(() => {});
    router.push("/authors"); // vuelve a la lista (ya actualizado)
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Editar autor</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>Nombre <input value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label>Fecha de nacimiento <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></label>
        <label>Descripción <textarea value={description} onChange={(e) => setDescription(e.target.value)} /></label>
        <label>Imagen (URL) <input value={image} onChange={(e) => setImage(e.target.value)} /></label>
        <button type="submit">Guardar cambios</button>
      </form>
    </main>
  );
}
