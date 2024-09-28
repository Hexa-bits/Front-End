export const checkInput = (input) => {
    //va a chequear que el nombre es valido
    return input.length > 0 && input.length <= 10;
};

export const checkButtons = (input) => {
    // va a chequear q la cant de jugadores se ingreso
    return input > 1;
};
