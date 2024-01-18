import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectAfterDelay   = ({ path, delay }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(path);
    }, delay * 1000); // Convertir el retraso a milisegundos

    return () => clearTimeout(timeoutId);
  }, [path, delay]);

  return null; // No necesita renderizar nada
};