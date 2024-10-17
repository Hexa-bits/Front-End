
// distancia relativa de los patrones de mov, no considero movs de un borde a otro, sí rotaciones 
const relative_shifts = {
    1: [{ dx: 2, dy:-2 }, {dx:-2, dy: 2 }, { dx: 2, dy: 2 }, {dx:-2, dy:-2 }], 
    2: [{ dx: 2, dy: 0 }, {dx:-2, dy: 0 }, { dx: 0, dy: 2 }, {dx: 0, dy:-2 }],
    3: [{ dx: 1, dy: 0 }, {dx:-1, dy: 0 }, { dx: 0, dy: 1 }, {dx: 0, dy:-1 }],
    4: [{ dx: 1, dy: 1 }, {dx:-1, dy:-1 }, { dx: 1, dy:-1 }, {dx:-1, dy: 1 }],
    5: [{ dx:-2, dy: 1 }, {dx: 2, dy:-1 }, { dx: 1, dy: 2 }, {dx:-1, dy:-2 }],
    6: [{ dx: 2, dy: 1 }, {dx:-2, dy:-1 }, { dx:-1, dy: 2 }, {dx: 1, dy:-2 }],
    7: [{ dx: 4, dy: 0 }, {dx:-4, dy: 0 }, { dx: 0, dy: 4 }, {dx: 0, dy:-4 }]
}

export const checkMov = ( selectedMov, selectedCards ) => {
    if (!selectedMov || selectedCards.length !== 2) {
        console.error("Error en seleccion. Faltan fichas o cartas.");
        return false;
    } 

    const [card1, card2] = selectedCards;

    const { x: x1, y: y1 } = card1;
    const { x: x2, y: y2 } = card2;
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const movd = relative_shifts[selectedMov.move];
    if (!movd) return false;

    // console.log("dx: ", dx, "dy: ", dy);
    const isValidMove = movd.some((shift) => {
        if (shift.dx === dx && shift.dy === dy) {
            // console.log(`dx: ${shift.dx}, dy: ${shift.dy}`);
            return true;
        }
        return false;
    });

    return isValidMove;
}

