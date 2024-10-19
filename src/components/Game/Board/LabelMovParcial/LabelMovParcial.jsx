import './LabelMovParcial.css';
import { useState, useEffect } from "react";

function LabelMovParcial({ isVisible }) {
    const [visible, setVisible] = useState(false);
    const [hiding, setHidding] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setVisible(true);
            setHidding(false); 
        } else {
            setHidding(true);     
            const timer = setTimeout(() => {
                setVisible(false); 
                setHidding(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <div className={`LabelMovParcial ${visible ? 'visible' : ''} ${hiding ? 'hiding' : ''}`}>
            Parcial
        </div>
    );
}

export default LabelMovParcial;