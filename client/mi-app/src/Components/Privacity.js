import React from 'react';
import Logo from '../Images/logo-snfondo.png'; 
import '../Stylesheets/Privacity.css';

const Privacity =() => {
  return (
    <div className="pp-container">
        <header className="pp-header">
            <img src={Logo} alt="Logo de la empresa" className="pp-logo" />
        </header>
            <h1 className='pp-title' >Política de privacidad y protección de datos personales</h1>
            
            <h2 className='pp-section-title'>1. Responsable del tratamiento</h2>
            <p className='pp-text'>El responsable del tratamiento de sus datos es:</p>
            <p className='pp-info'>PlayRanking</p>
            <p className='pp-info'>Dirección: Avenida de la Invención, 1 Bajo</p>
            <p className='pp-info'>Correo electrónico: <a href="playrankingpadel@gmail.com">privacidad_playranking@gmail.com</a></p>

            <h2 className='pp-section-title'>2. Contacto para protección de datos</h2>
            <p className='pp-text'>Para cualquier consulta o ejercicio de sus derechos relativos a sus datos personales, puede contactar con:</p>
            <p className='pp-info'>Nombre: Jessica Rubinos Rey</p>
            <p className='pp-info'>Email: <a href="playrankingpadel@gmail.com">privacidad_playranking@gmail.com</a></p>

            <h2 className='pp-section-title'>3. Finalidades y bases legales del tratamiento</h2>
            <p className='pp-text'>Procesamos sus datos personales para:</p>
            <ul className='pp-list'>
                <li>Gestionar su cuenta y participación en partidos de ranking.</li>
                <li>Organizar y coordinar partidos, rankings y resultados.</li>
                <li>Enviar comunicaciones relacionadas con su actividad en el Sitio.</li>
                <li>Cumplir con obligaciones legales y de seguridad.</li>
            </ul>
            <p className='pp-text'>El tratamiento se basa en la ejecución del contrato que usted celebra al registrarse y utilizar el Sitio, así como en nuestro interés legítimo para ofrecerle un servicio funcional y seguro, y, cuando sea necesario, en su consentimiento.</p>

            <h2 className='pp-section-title'>4. Datos que recogemos</h2>
            <p className='pp-text'>Para prestar nuestros servicios, recogemos datos personales tales como nombre, correo electrónico, datos de contacto, detalles de partidos jugados, puntuaciones y clasificaciones.</p>
            <p className='pp-text'>También podemos recoger ciertos datos técnicos para mejorar la experiencia en el Sitio y la seguridad, incluyendo cookies.</p>

            <h2 className='pp-section-title'>5. Uso de cookies</h2>
            <p className='pp-text'>Utilizamos cookies para personalizar su experiencia, analizar el uso del Sitio y mostrar publicidad relevante. Usted puede configurar o bloquear las cookies en su navegador, aunque algunas funciones del Sitio pueden verse afectadas.</p>

            <h2 className='pp-section-title'>6. Conservación de los datos</h2>
            <p className='pp-text'>Conservamos sus datos mientras mantenga una cuenta activa o durante el tiempo necesario para cumplir con obligaciones legales o resolver posibles disputas.</p>

            <h2 className='pp-section-title'>7. Compartir datos</h2>
            <p className='pp-text'>No compartimos sus datos con terceros para fines comerciales sin su consentimiento. Podemos compartir información con proveedores de servicios vinculados a la gestión técnica del Sitio o con autoridades si es requerido por ley.</p>

            <h2 className='pp-section-title'>8. Seguridad</h2>
            <p className='pp-text'>Implementamos medidas técnicas y organizativas para proteger sus datos contra accesos no autorizados, pérdidas o alteraciones.</p>

            <h2 className='pp-section-title'>9. Sus derechos</h2>
            <p className='pp-text'>Usted tiene derecho a acceder, rectificar, eliminar, limitar, oponerse y portar sus datos personales, así como a retirar su consentimiento en cualquier momento. Puede ejercer estos derechos contactándonos en <a href="playrankingpadel@gmail.com">privacidad_playranking@gmail.com</a>.</p>

            <h2 className='pp-section-title'>10. Cambios en esta política</h2>
            <p className='pp-text'>Podemos actualizar esta política cuando sea necesario para cumplir con requisitos legales o mejorar nuestras prácticas. Le notificaremos a través del Sitio o correo electrónico.</p>
 </div>
    
  );
};

export default Privacity;
