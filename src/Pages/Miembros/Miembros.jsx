import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../hooks/useApi'
import "./Miembros.css"

function AnimatedCard({ children, delay = 0 }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => el.classList.add("visible"), delay)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])
    return (
        <div ref={ref} className="animate-on-scroll">
            {children}
        </div>
    )
}

function getInitials(nombre) {
    return nombre.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
}

const Miembros = () => {
    const [miembros, setMiembros] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError]       = useState(null)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
        api.getMiembros()
            .then(data => {
                if (Array.isArray(data)) {
                    setMiembros(data)
                } else {
                    setError(data.error || 'Error al cargar los miembros')
                }
            })
            .catch(() => setError('No se pudo conectar con el servidor'))
            .finally(() => setCargando(false))
    }, [])

    return (
        <>
            {/* ===== HERO ===== */}
            <section className="miembros-hero">
                <div className="miembros-hero-overlay" />
                <div className="miembros-hero-content">
                    <span className="hero-badge">Universidad de la Amazonia · GIECOM</span>
                    <h1 className="hero-title">Nuestro <span>Equipo</span></h1>
                    <p className="hero-subtitle">
                        Investigadores, docentes y estudiantes comprometidos con el avance
                        científico y tecnológico de la región amazónica
                    </p>
                </div>
            </section>

            {/* ===== MIEMBROS ===== */}
            <section className="section miembros-section">
                <div className="section-header">
                    <span className="section-label">Integrantes</span>
                    <h2 className="section-title">Grupo GIECOM</h2>
                    <div className="section-divider" />
                </div>

                {cargando ? (
                    <p className="miembros-loading">Cargando integrantes...</p>
                ) : error ? (
                    <p className="miembros-loading">⚠️ {error}</p>
                ) : miembros.length === 0 ? (
                    <p className="miembros-loading">No hay integrantes registrados aún.</p>
                ) : (
                    <div className="miembros-grid">
                        {miembros.map((m, i) => (
                            <AnimatedCard key={m.id} delay={i * 80}>
                                <div className="miembro-card">
                                    <div className="miembro-avatar">
                                        {m.imagen
                                            ? <img src={m.imagen} alt={m.nombre} />
                                            : <span>{getInitials(m.nombre)}</span>
                                        }
                                    </div>

                                    <h3 className="miembro-nombre">{m.nombre}</h3>
                                    <p className="miembro-rol">{m.rol}</p>

                                    <div className="miembro-divider" />

                                    {m.correo && (
                                        <a href={`mailto:${m.correo}`} className="miembro-correo">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                            {m.correo}
                                        </a>
                                    )}

                                    {m.telefono && (
                                        <a href={`tel:${m.telefono}`} className="miembro-telefono">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                                            </svg>
                                            {m.telefono}
                                        </a>
                                    )}

                                    {m.cvlac && m.cvlac !== '#' && (
                                        <a href={m.cvlac} target="_blank" rel="noopener noreferrer" className="miembro-cvlac">
                                            Ver CvLAC
                                        </a>
                                    )}
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}

export default Miembros