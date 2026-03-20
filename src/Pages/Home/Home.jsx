import React, { useState, useEffect, useRef } from 'react'
import logo from '../../assets/giecom.png'
import "./Home.css"

// Hook animación al scroll
function AnimatedCard({ children, delay = 0 }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => el.classList.add("visible"), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);
    return (
        <div ref={ref} className="animate-on-scroll">
            {children}
        </div>
    );
}

const proyectos = [
    {
        id: 1,
        icon: "💡",
        titulo: "Proyecto 1",
        descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.",
        año: "2024",
        estado: "En curso",
    },
    {
        id: 2,
        icon: "🤖",
        titulo: "Proyecto 2",
        descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.",
        año: "2024",
        estado: "En curso",
    },
    {
        id: 3,
        icon: "🌿",
        titulo: "Proyecto 3",
        descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.",
        año: "2023",
        estado: "Finalizado",
    },
    {
        id: 4,
        icon: "📡",
        titulo: "Proyecto 4",
        descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.",
        año: "2023",
        estado: "Finalizado",
    },
    {
        id: 5,
        icon: "🔐",
        titulo: "Proyecto 5",
        descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.",
        año: "2025",
        estado: "En curso",
    },
    {
        id: 6,
        icon: "📊",
        titulo: "Proyecto 6",
        descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.",
        año: "2025",
        estado: "En curso",
    },
];

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = () => setMenuOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* ===== NAVBAR ===== */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo GIECOM" />
                </div>

                <button
                    className={`hamburger${menuOpen ? " open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
                    <li><a href="#Inicio" className="active" onClick={handleNavClick}>Inicio</a></li>
                    <li><a href="#Quienessomos" onClick={handleNavClick}>Quienes somos</a></li>
                    <li><a href="#Proyectos" onClick={handleNavClick}>Proyectos</a></li>
                    <li><a href="#Contacto" onClick={handleNavClick}>Contacto</a></li>
                </ul>
            </nav>

            {/* ===== HERO ===== */}
            <section id="Inicio" className="hero">
                <div className="hero-overlay" />
                <div className="hero-content">
                    <img src={logo} alt="GIECOM" className="hero-logo" />
                    <h1 className="hero-title">
                        Grupo de Investigación
                    </h1>
                    <h1 className="hero-title">
                        <span>GIECOM</span>
                    </h1>
                    <p className="hero-subtitle">
                        Gestión del Conocimiento, Electrónica, Informática y Comunicaciones
                    </p>
                    <span className="hero-badge">Universidad de la Amazonia · GIECOM</span>
                </div>
            </section>

            {/* ===== QUIÉNES SOMOS ===== */}
            <section id="Quienessomos" className="section mv-section">
                <div className="section-header">
                    <span className="section-label">Quiénes somos</span>
                    <div className="section-divider" />
                </div>

                {/* Introducción */}
                <AnimatedCard delay={0}>
                    <div className="intro-block">
                        <p>
                            GIECOM es un grupo de investigación de la Universidad de la Amazonia dedicado
                            al estudio y desarrollo en las áreas de Gestión del Conocimiento, Electrónica,
                            Informática y Comunicaciones. Nuestro equipo multidisciplinario trabaja en
                            proyectos que generan impacto real en la región amazónica y en la comunidad
                            académica nacional e internacional.
                        </p>
                    </div>
                </AnimatedCard>
                  <div className="section-header">
                    <h2 className="section-title">Misión &amp; Visión</h2>
                    <div className="section-divider" />
                </div>

                {/* Misión y Visión */}
                <div className="mv-grid">
                    <AnimatedCard delay={0}>
                        <div className="mv-card">
                            <span className="mv-icon">🎯</span>
                            <h3>Misión</h3>
                            <p>
                                GIECOM está comprometido con la generación de conocimiento científico y tecnológico,
                                mediante el trabajo multidisciplinario en las áreas de gestión del conocimiento,
                                comunicación, electrónica e informática, de tal manera que los resultados promuevan
                                el crecimiento y formación de los investigadores, así como el desarrollo tecnológico
                                en la región Amazónica, realizando alianzas estratégicas con diferentes empresas,
                                las cuales se beneficien de nuestros logros alcanzados y de igual forma ayuden a la
                                financiación de los diferentes proyectos a realizar.
                            </p>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={150}>
                        <div className="mv-card vision-card">
                            <span className="mv-icon">🔭</span>
                            <h3>Visión</h3>
                            <p>
                                Para el año 2018, GIECOM se consolidará como un grupo de investigación reconocido
                                a nivel nacional e internacional en la generación de conocimiento en áreas de gestión
                                del conocimiento, comunicación, electrónica e informática, contando con un personal
                                altamente cualificado y generando proyectos multidisciplinarios que fortalezcan el desarrollo
                                empresarial de la Región, promoviendo los proyectos que se desarrollan a las instituciones
                                o empresas para un mutuo beneficio.
                            </p>
                        </div>
                    </AnimatedCard>
                </div>
            </section>

            {/* ===== PROYECTOS ===== */}
            <section id="Proyectos" className="section proyectos-section">
                <div className="section-header">
                    <span className="section-label">Investigación</span>
                    <h2 className="section-title">Nuestros Proyectos</h2>
                    <div className="section-divider" />
                </div>

                <div className="proyectos-grid">
                    {proyectos.map((proyecto, i) => (
                        <AnimatedCard key={proyecto.id} delay={i * 80}>
                            <div className="proyecto-card">
                                <div className="proyecto-icon">{proyecto.icon}</div>
                                <div className={`proyecto-estado ${proyecto.estado === "En curso" ? "en-curso" : "finalizado"}`}>
                                    {proyecto.estado}
                                </div>
                                <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
                                <p className="proyecto-desc">{proyecto.descripcion}</p>
                                <span className="proyecto-año">📅 {proyecto.año}</span>
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </section>

            {/* ===== UBICACIÓN ===== */}
            <section id="Contacto" className="section location-section">
                <div className="section-header">
                    <span className="section-label">Encuéntranos</span>
                    <h2 className="section-title">Nuestra Ubicación</h2>
                    <div className="section-divider" />
                </div>

                <div className="location-container">
                    <div className="location-info">
                        <div className="location-info-item">
                            <span className="icon">📍</span>
                            <span>Florencia, Caquetá, Colombia</span>
                        </div>
                        <div className="location-info-item">
                            <span className="icon">🏛️</span>
                            <span>Universidad de la Amazonia</span>
                        </div>
                        <div className="location-info-item">
                            <span className="icon">🔬</span>
                            <span>Grupo GIECOM</span>
                        </div>
                        <div className="location-info-item">
                            <a
                                href="https://www.facebook.com/share/1AghnZPSVw/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fb-link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fb-icon">
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                                </svg>
                                <span>Síguenos en Facebook</span>
                            </a>
                        </div>
                    </div>

                    <AnimatedCard>
                        <div className="map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d622.5832439924412!2d-75.60475726407643!3d1.6208352489787148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sco!4v1772486017634!5m2!1ses-419!2sco"
                                title="Ubicación GIECOM"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </AnimatedCard>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="footer">
                <img src={logo} alt="GIECOM" className="footer-logo" />
                <div className="footer-divider" />
                <p className="footer-text">
                    <strong>© 2026 Grupo de Investigación GIECOM</strong>
                    <br />
                    Universidad de la Amazonia · Todos los derechos reservados
                </p>
            </footer>
        </>
    )
}

export default Home