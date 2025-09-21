"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { name, birthDate, description, image };

    await fetch("http://127.0.0.1:8080/api/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => {});

    router.push("/authors"); 
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Crear usuario</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Fecha de nacimiento
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </label>

        <label>
          Descripción
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>
          Imagen (URL)
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </label>

        <button type="submit">Guardar</button>
      </form>
    </main>
  );
}
