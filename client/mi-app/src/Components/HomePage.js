import React from "react";
import Logo from '../Images/logo-snfondo.png';
import '../Stylesheets/HomePage.css';
import Contact from "./Contact.js";

const HomePage = ({ onNavigate }) => {
    return (

        <div className="homepage">
            <nav className="homepage-nav">
                <img src={Logo} alt="PlayRanking" className="nav-logo" />
                <div className="nav-links">
                    <button className="nav-btn" onClick={() => onNavigate('login')}>Iniciar sesión</button>
                    <button className="nav-btn primary" onClick={() => onNavigate('register')}>Registrarse</button>
                </div>
            </nav>

            <main className="homepage-main">
                <h1 className="homepage-title">
                    JUEGA, COMPITE Y<br />
                    LIDERA EL RANKING
                </h1>
                <p className="homepage-sub">
                    Organiza partidos, sigue tu progreso y asciende posiciones en el ranking de pádel, con PlayRanking. La plataforma donde cada partido suma.
                </p>
                <div className="hero-actions">
                    <button className="hero-btn primary" onClick={() => onNavigate('register')}>Crear cuenta</button>
                    <button className="hero-btn" onClick={() => onNavigate('login')}>Ver ranking</button>
                </div>
            </main>
            <footer className="footer-bg">
                <div className="footer-content">
                    <div className="footer-logo">
                            <img src={Logo}
                            alt="PlayRanking" className="footer-logo-img" />
                    </div>
                    <div className="footer-links">
                                    
                        <a href="/privacidad">Política de privacidad</a>
                        <a href="/cookies">Política de cookies</a>
                        <a href="/Contact" 
                        onClick={e=> {e.preventDefault(); onNavigate(Contact)}}>Contacto</a>
                
                     </div>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-copy">
                © PlayRanking 2025
                <div className="footer-note">
                    PlayRanking es una plataforma para gestionar rankings y torneos de pádel entre amigos y clubes.<br />
                    Para dudas o contacto, escribe a: playrankingpadel@gmail.com
                </div>
                </div>
  </footer>
        </div>
    );
}
export default HomePage;

    
 