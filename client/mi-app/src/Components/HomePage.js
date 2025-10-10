import React from "react";
import Logo from '../Images/PlayRanking_logo.png';
import '../Stylesheets/HomePage.css';

const HomePage = ({ onNavigate }) => {
    
    
    return (
        <div className='homepage-container'>
            <header className='homepage-header'> {/*Cabecera con logo*/}
                <img
                    className='logo-playRanking'
                    src={ Logo }
                    alt='Logo de PlayRanking'
                />
            </header>

            <main className='main'>
                {/*Zona principal con explicación y botones de accion*/}

                <div className='main-container'>
                     <h2 className='homepage-title'> ¿Que es PlayRanking? </h2>
                        <p className='homepage-text'>  ¿Listo para llevar tu juego al siguiente nivel? Nuestra plataforma está pensada para jugadores que quieren competir, sumar puntos y alcanzar lo más alto del ranking. Solo necesitas registrarte, encontrar un compañero y formar tu pareja.</p>
                </div>
                    

                <div className='main-container'>
                    
                    <h2 className='homepage-title'> ¿Como funciona el torneo? </h2>
                    <ul className='homepage-text'>
                        <li>Forma tu dupla y regístrense al torneo antes del cierre de inscripciones.</li>
                        <li>Un formato todos contra todos, con partidos 2 vs 2 donde cada victoria cuenta.</li>
                        <li>Máximo 9 parejas por torneo para asegurar una experiencia ágil y emocionante.</li>
                        <li>Los partidos se asignan automáticamente con fechas aleatorias, ¡prepárate para competir!</li>
                    </ul>
                </div>

                <div className='main-container'>
                    
                    <h2 className='homepage-title'> Puntos, rankings y estadísticas </h2>
                    <p className='homepage-text'> Gana partidos y suma puntos. Cada partido importa: los puntos te posicionan en el ranking general del torneo.
                    ¿Tu objetivo? ¡Terminar en lo más alto del ranking! </p>
                    
                </div>

                <div className='homepage-buttons'>
                    <button onClick={() => onNavigate('login')} className='homepage-btn'>Iniciar sesión</button>
                    <button onClick={()=>onNavigate('register')} className='homepage-btn'> Registrate</button>
                </div>

            </main>

            <footer className="homepage-footer">
                Contacto: Jessica Rubinos Rey
            </footer>

        </div>
    )
    
}


export default HomePage; 