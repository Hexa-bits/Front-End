// useVictory.js
import { useState, useEffect } from 'react';

const useVictory = (currentPlayer, conditionForVictory) => {
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    // Lógica para determinar la victoria
    if (conditionForVictory(currentPlayer)) {
      setVictory(true);
    }
  }, [currentPlayer, conditionForVictory]);

  return victory;
};

export default useVictory;
