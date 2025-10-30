import {React, useState} from "react";
import Logo from '../Images/logo-snfondo.png';
import '../Stylesheets/Privacity.css';


const Cookies = () => {
    return (
    <div className="pp-container">
        <header className="pp-header">
             <img src={Logo} alt="Logo de la empresa" className="pp-logo" />
         </header>
        
        <h1 className='pp-title'>Política de Cookies</h1>

        <p className='pp-text'>
          Cuando visitas PlayRanking, se almacenan cookies en tu dispositivo (ordenador, tablet o móvil), con tu previo consentimiento, para facilitar y mejorar tu experiencia de navegación. Al aceptar el banner de cookies en nuestra página de inicio, das tu consentimiento para la instalación de estas cookies con una validez máxima de 13 meses, excepto las cookies funcionales o técnicas que se conservan únicamente durante el tiempo necesario para el correcto funcionamiento del sitio.
        </p>

        <h2 className='pp-section-title'>a. ¿Qué es una cookie?</h2>
        <p className='pp-info'>
          Una cookie es un archivo de texto que se almacena en tu dispositivo y registra información relacionada con tu navegación en un sitio web, como la fecha y hora de la visita, el navegador utilizado, páginas visitadas y duración de tus sesiones.
        </p>

        <h2 className='pp-section-title'>b. ¿Para qué sirven las cookies?</h2>
        <p className='pp-info'>
          Las cookies permiten a PlayRanking o a proveedores externos ofrecerte contenidos y servicios adaptados a tus intereses, mejorar tu experiencia y analizar el uso del sitio. Estas cookies no contienen virus ni programas maliciosos.
        </p>

        <h2 className='pp-section-title'>c. Tipos de cookies usadas en PlayRanking</h2>
        <ul className='pp-list'>
          <li><strong>Cookies técnicas:</strong> esenciales para la navegación y funciones básicas (idioma, identificación, etc.). Si las bloqueas, PlayRanking podría no funcionar correctamente.</li>
          <li><strong>Cookies funcionales:</strong> mejoran tu experiencia recordando tus preferencias y elecciones.</li>
          <li><strong>Cookies analíticas:</strong> recopilan estadísticas para medir y mejorar el rendimiento del sitio.</li>
          <li><strong>Cookies publicitarias:</strong> personalizan la publicidad según tus intereses.</li>
          <li><strong>Cookies sociales:</strong> facilitan compartir contenido en redes sociales y conectar tu navegación con tus perfiles sociales.</li>
        </ul>

        <h2 className='pp-section-title'>d. ¿Cómo gestionar las cookies?</h2>
        <p className='pp-info'>
          Puedes configurar o bloquear las cookies desde los ajustes de tu navegador. A continuación te indicamos cómo hacerlo para los navegadores más comunes:
        </p>
        <ul className='pp-list'>
          <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Configuración del sitio &gt; Cookies.</li>
          <li><strong>Mozilla Firefox:</strong> Herramientas &gt; Opciones &gt; Privacidad &gt; Cookies.</li>
          <li><strong>Safari:</strong> Configuración &gt; Safari &gt; Bloquear todas las cookies.</li>
          <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
          <li><strong>Opera:</strong> Archivo &gt; Preferencias &gt; Privacidad &gt; Cookies.</li>
        </ul>
        <p className='pp-info'>
          También puedes retirar tu consentimiento para cookies no técnicas enviando un correo a privacy@playranking.com. Ten en cuenta que deshabilitar cookies puede afectar la funcionalidad de PlayRanking.
        </p>

     </div>
  );
};

export default Cookies; 
