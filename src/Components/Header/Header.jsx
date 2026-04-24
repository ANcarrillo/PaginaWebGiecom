import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/giecom.png'
import "./Header.css"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleNavClick = () => setMenuOpen(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) setMenuOpen(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Cuando la ruta cambia y trae un hash, hace scroll a la sección
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '')
            const el = document.getElementById(id)
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        } else if (location.pathname === '/') {
            // Si vuelve a Home sin hash, sube al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [location])

    const handleSectionClick = (seccion) => {
        setMenuOpen(false)
        if (location.pathname !== '/') {
            // Si está en otra página, navega a Home y luego hace scroll
            navigate('/#' + seccion)
        } else {
            // Ya está en Home, solo hace scroll
            const el = document.getElementById(seccion)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" onClick={handleNavClick}>
                    <img src={logo} alt="Logo GIECOM" />
                </Link>
            </div>

            <button
                className={`hamburger${menuOpen ? " open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
            >
                <span /><span /><span />
            </button>

            <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
                <li>
                    <Link to="/" onClick={handleNavClick}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <button onClick={() => handleSectionClick('Quienessomos')}>
                        Quiénes somos
                    </button>
                </li>
                <li>
                    <button onClick={() => handleSectionClick('Proyectos')}>
                        Proyectos
                    </button>
                </li>
                <li>
                    <Link to="/miembros" onClick={handleNavClick}>
                        Miembros
                    </Link>
                </li>
                <li>
                    <button onClick={() => handleSectionClick('Contacto')}>
                        Contacto
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Header