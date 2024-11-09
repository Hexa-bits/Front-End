
// distancia relativa de los patrones de mov, no considero movs de un borde a otro, sí rotaciones
// cada par de coordenadas es un movimiento válido. [dx,dy]
const relative_shifts = {
    1: [[ 2,-2], [-2, 2], [ 2, 2], [-2,-2]], 
    2: [[ 2, 0], [-2, 0], [ 0, 2], [ 0,-2]],
    3: [[ 1, 0], [-1, 0], [ 0, 1], [ 0,-1]],
    4: [[ 1, 1], [-1,-1], [ 1,-1], [-1, 1]],
    5: [[-2, 1], [ 2,-1], [ 1, 2], [-1,-2]],
    6: [[ 2, 1], [-2,-1], [-1, 2], [ 1,-2]],
    7: [[ 4, 0], [-4, 0], [ 0, 4], [ 0,-4]]
}

export const checkMov = ( selectedMov, selectedCards ) => {
    if (!selectedMov || selectedCards.length !== 2) {
        console.error(`Error en seleccion. Faltan ${!selectedMov ? "cartas" : "fichas"}`);
        return false;
    } 

    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = selectedCards;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const movd = relative_shifts[selectedMov.move];
    const valid = movd.some(([x, y]) => x === dx && y === dy);
    if (!valid) { console.error(`Movimiento no valido.`); }

    return movd ? valid : false;
}

