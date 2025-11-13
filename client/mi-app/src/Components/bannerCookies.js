import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null; // no mostrar nada si ya hay consentimiento
  }

  return (
    <div style={{ background: '#222', color: '#fff', padding: '10px', position: 'fixed', bottom: 0, width: '100%' }}>
      <p>
        Usamos cookies para mejorar tu experiencia. Consulta nuestra <a href="/cookies" style={{color: 'lightblue'}}>política de cookies</a>.
      </p>
      <button onClick={acceptCookies}>Aceptar</button>
    </div>
  );
};

export default CookieConsent;
