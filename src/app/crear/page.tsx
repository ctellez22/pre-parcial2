"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Falta el nombre del autor.");
      return;
    }
    if (!birthDate.trim()) {
      setError("Falta la fecha de nacimiento.");
      return;
    }
    if (!description.trim()) {
      setError("Falta la descripción.");
      return;
    }
    if (!image.trim()) {
      setError("Falta la URL de la imagen.");
      return;
    }

    const body = { name, birthDate, description, image };

    try {
      const res = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setError("No se pudo crear el autor. Intenta de nuevo.");
        return;
      }
      router.push("/authors");
    } catch {
      setError("Ocurrió un error al crear el autor. Intenta de nuevo.");
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear usuario</h1>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-md flex flex-col gap-4"
      >
        <label className="flex flex-col gap-1 text-gray-700">
          Nombre
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-gray-700">
          Fecha de nacimiento
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-gray-700">
          Descripción
          <textarea
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-gray-700">
          Imagen (URL)
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Guardar
        </button>
        {error && (
          <div className="text-red-600 mt-2 text-sm font-medium">{error}</div>
        )}
      </form>
    </main>
  );
}
