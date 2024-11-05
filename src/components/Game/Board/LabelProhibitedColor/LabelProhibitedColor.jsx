import './LabelProhibitedColor.css';
import { useState, useEffect } from 'react';
import { COLORMAP_BOXCARDS } from '../../../../utils/Constants';

function LabelProhibitedColor({ color }) {
    const [visible, setVisible] = useState(false);
    const [hiding, setHiding] = useState(false);
    const [flashing, setFlashing] = useState(false); // Estado para el destello

    // Mapea el color usando COLORMAP_BOXCARDS o usa gris como predeterminado.
    const mappedColor = COLORMAP_BOXCARDS[color] || 'gray';

    useEffect(() => {
        if (color > 0 && color <= 4) {
            setVisible(true);
            setHiding(false);
            setFlashing(true); // Activa el destello cuando el color es válido

            // Detener el destello después de que se haya completado la animación
            const flashTimer = setTimeout(() => {
                setFlashing(false); // Detiene el destello
            }, 1500); // Ajusta el tiempo total de la animación

            return () => clearTimeout(flashTimer); // Limpia el temporizador
        } else {
            setHiding(true);
            const hideTimer = setTimeout(() => {
                setVisible(false);
                setHiding(false);
            }, 500); // Tiempo de espera para ocultar completamente
            return () => clearTimeout(hideTimer);
        }
    }, [color]);

    // Define el estilo para el color de fondo sin interacción ni sombras.
    const boxStyle = {
        backgroundColor: mappedColor,
    };

    return (
        <div
            className={`labelProhibitedColor ${visible ? 'visible' : ''} ${hiding ? 'hiding' : ''} ${flashing ? 'flash' : ''}`} // Añade la clase flash
            style={{
                transform: visible ? 'translateY(-20px) translateX(220px)' : 'translateY(-20px) translateX(0px)',
            }}
        >
            <div className="labelProhibitedColor__container">
                
                <div className="labelProhibitedColor__box"
                    style={boxStyle}>
                Bloqueado
                </div>
            </div>
        </div>
    );
}

export default LabelProhibitedColor;
