import './LabelProhibitedColor.css';
import { useState, useEffect } from 'react';
import { COLORMAP_BOXCARDS } from '../../../../utils/Constants';

function LabelProhibitedColor({ color }) {
    const [visible, setVisible] = useState(false);
    const [hiding, setHiding] = useState(false);

    // Mapea el color usando COLORMAP_BOXCARDS o usa gris como predeterminado.
    const mappedColor = COLORMAP_BOXCARDS[color] || 'gray';

    useEffect(() => {
        if (color > 0 && color <= 4) {
            setVisible(true);
            setHiding(false);
        } else {
            setHiding(true);
            const hideTimer = setTimeout(() => {
                setVisible(false);
                setHiding(false);
            }, 500);
            return () => clearTimeout(hideTimer);
        }
    }, [color]);

    const boxStyle = {
        backgroundColor: mappedColor,
    };

    return (
        <div
            className={`labelProhibitedColor ${visible ? 'visible' : ''} ${hiding ? 'hiding' : ''}`} // Añade la clase flash
            style={{
                transform: visible ? 'translateX(-10px)' : 'translateX(-100px)',
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
