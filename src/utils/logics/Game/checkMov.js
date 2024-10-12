const patterns = {
    1 : [
        [0, 0, 1],
        [0, 0, 0],
        [1, 0, 0]
    ],
    2 : [
        [1],
        [0],
        [1]
    ],
    3 : [
        [1],
        [1]
    ],
    4 : [
        [1, 0],
        [0, 1]
    ],
    5 : [
        [0, 1],
        [0, 0],
        [1, 0]
    ],
    6 : [
        [1, 0],
        [0, 0],
        [0, 1]
    ],
    7 : [
        [1],
        [0],
        [0],
        [0],
        [1]
    ]
}

// dx distancia en filas
// dy distancia en columnas
const relative_shifts2 = {
    1: [{ dx: 2, dy:-2 }, {dx:-2, dy: 2 }, {dx: -4, dy: -2}, {dx:4 , dy:2 },{dx:-2 , dy: -4}, {dx: 2, dy: 4} ],
    2: [{ dx: 2, dy: 0 }, {dx:-2, dy: 0 }, {dx:-1, dy: 0 }, {dx:1, dy: 0 }],
    3: [{ dx: 1, dy: 0 }, {dx:-1, dy: 0 }, {dx:-5, dy: 0 }, {dx:5, dy: 0 }],
    4: [{ dx: 1, dy: 1 }, {dx:-1, dy:-1,}, {dx:-5, dy:-5}, {dx: 5, dy: 5,}, {dx: 1, dy: -5}, {dx: -1, dy: 5}],
    5: [{ dx:-2, dy: 1 }, {dx: 2, dy:-1,}, {dx:-2, dy:-5}, {dx: 2, dy: 5 }, {dx: -4, dy:-1}, {dx: 4, dy: 1}],
    6: [{ dx: 2, dy: 1 }, {dx:-2, dy:-1,}, {dx: 2, dy:-5}, {dx:-2, dy: 5 }, {dx: -4, dy: 1}, {dx: 4, dy:-1}],
    7: [{ dx: 4, dy: 0 }, {dx:-4, dy: 0 }, {dx:-2, dy: 0 }, {dx:2, dy: 0 }]
}

// movs simples sin considerar movs entre bordes
const relative_shifts1 = {
    1: [{ dx: 2, dy:-2 }, {dx:-2, dy: 2 }], 
    2: [{ dx: 2, dy: 0 }, {dx:-2, dy: 0 }],
    3: [{ dx: 1, dy: 0 }, {dx:-1, dy: 0 }],
    4: [{ dx: 1, dy: 1 }, {dx:-1, dy:-1,}],
    5: [{ dx:-2, dy: 1 }, {dx: 2, dy:-1,}],
    6: [{ dx: 2, dy: 1 }, {dx:-2, dy:-1,}],
    7: [{ dx: 4, dy: 0 }, {dx:-4, dy: 0 }]
}

export const checkMov = ( movId, selectedCards ) => {
    if (selectedCards.length !== 2 ) return false;

    const [card, card2] = selectedCards;
    const [x1, y1] = card.split("-").map(Number);
    const [x2, y2] = card2.split("-").map(Number);
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const movd = relative_shifts1[movId];
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

