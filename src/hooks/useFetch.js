
import { LOGIN_URL } from '../utils/constants.js';

const useAuth = () => {
  const login = async (credentials) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
      }

      const data = await response.json();
      // Lógica para manejar la sesión del usuario
      return data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return { login };
};

export default useAuth;
