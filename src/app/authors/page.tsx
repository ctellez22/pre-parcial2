"use client";
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthorsPage() {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : [])
      .then(setAuthors);
  }, []);

  async function handleDelete(id) {
    if (window.confirm('¿Seguro que quieres eliminar este autor?')) {
      await fetch(`http://127.0.0.1:8080/api/authors/${id}`, { method: 'DELETE' });
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Autores</h1>
      {authors.map((a) => (
        <div key={a.id}>
          <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
            <a href={`/editar/${a.id}`} className={styles.editBtn}>Editar</a>
            <button
              className={styles.editBtn}
              style={{ background: '#111', color: '#fff' }}
              onClick={() => handleDelete(a.id)}
            >Eliminar</button>
          </div>
          <div className={styles.authorCard}>
            <img src={a.image} alt={a.name} className={styles.authorImg} />
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>{a.name}</div>
              <div className={styles.authorBirth}>Fecha de nacimiento: {a.birthDate}</div>
              <div className={styles.authorDesc}>{a.description}</div>

              {a.books && a.books.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Libros</div>
                  <div className={styles.books}>
                    {a.books.map((b) => (
                      <div key={b.id} className={styles.bookCard}>
                        <img src={b.image} alt={b.name} className={styles.bookImg} />
                        <div className={styles.bookName}>{b.name}</div>
                        <div className={styles.bookDate}>Fecha: {b.publishingDate}</div>
                        <div className={styles.bookEditorial}>Editorial: {b.editorial?.name}</div>
                        <div className={styles.bookDesc}>{b.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {a.prizes && a.prizes.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Premios</div>
                  <div className={styles.prizes}>
                    {a.prizes.map((p) => (
                      <div key={p.id} className={styles.prizeCard}>
                        <div className={styles.prizeName}>{p.name}</div>
                        <div className={styles.prizeDate}>Fecha: {p.premiationDate}</div>
                        <div className={styles.prizeDesc}>{p.description}</div>
                        <div className={styles.prizeOrg}>Organización: {p.organization?.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
