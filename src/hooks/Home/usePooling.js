import { useEffect } from 'react';

const usePolling = (callback, delay) => {
  useEffect(() => {
    const interval = setInterval(() => {
      callback();
    }, delay);

    return () => clearInterval(interval);  // Limpieza al desmontar
  }, [callback, delay]);
};

export default usePolling;
