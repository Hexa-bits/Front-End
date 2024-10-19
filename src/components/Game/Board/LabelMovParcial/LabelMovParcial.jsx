import './LabelMovParcial.css';
import { useState, useEffect } from "react";

function LabelMovParcial({ isVisible }) {
    const [visible, setVisible] = useState(false);
    const [hidding, setHidding] = useState(false);

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
        <div className={`LabelMovParcial ${visible ? 'visible' : ''} ${hidding ? 'hiding' : ''}`}>
            Parcial
        </div>
    );
}

export default LabelMovParcial;