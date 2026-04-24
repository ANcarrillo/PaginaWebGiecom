import React from 'react'
import logo from '../../assets/giecom.png'
import "./Footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <img src={logo} alt="GIECOM" className="footer-logo" />
            <div className="footer-divider" />
            <p className="footer-text">
                <strong>© 2026 Grupo de Investigación GIECOM</strong>
                <br />
                Universidad de la Amazonia · Todos los derechos reservados
            </p>
        </footer>
    )
}

export default Footer
