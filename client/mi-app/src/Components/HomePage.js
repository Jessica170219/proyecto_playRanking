import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/logo-snfondo.png';
import '../Stylesheets/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    return (

        <div className="homepage">
            <nav className="homepage-nav">
                <img src={Logo} alt="PlayRanking" className="nav-logo" />
                <div className="nav-links">
                    <button className="nav-btn" onClick={() => navigate('/login')}>Iniciar sesión</button>
                    <button className="nav-btn primary" onClick={() => navigate('/register')}>Registrarse</button>
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
                    <button className="hero-btn primary" onClick={() => navigate('/register')}>Crear cuenta</button>
                    <button className="hero-btn" onClick={() => navigate('/login')}>Ver ranking</button>
                </div>
            </main>
            <footer className="footer-bg">
                <div className="footer-content">
                    <div className="footer-logo">
                            <img src={Logo}
                            alt="PlayRanking" className="footer-logo-img" />
                    </div>
                    <div className="footer-links">
                                    
                        <Link to='/privacity' target='_blank' rel="noopener noreferrer"> Política de privacidad </Link>
                        <Link to='/cookies' target='_blank' rel="noopener noreferrer"> Cookies</Link>
                        <Link to='/contact' target='_blank' rel="noopener noreferrer"> Contacto</Link>
                        @PlayRanking
                
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

    
 