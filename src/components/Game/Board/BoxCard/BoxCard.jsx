import './BoxCard.css';
import { COLORMAP_BOXCARDS } from '../../../../utils/Constants';


function BoxCard({ color, isSelected, isHighlighted, highlightColor, onClick }) {
    const mappedColor = COLORMAP_BOXCARDS[color] || 'gray';
    
    // Determina las clases a aplicar
    const boxClass = `BoxCard ${isSelected ? "selected" : ""} ${isHighlighted ? "highlighted" : ""}`;
    
    // Define el estilo para el color de fondo
    const boxStyle = {
        backgroundColor: mappedColor,
    };

    return (
        <div
            role="button"
            className={boxClass}
            onClick={onClick}
            style={boxStyle}
        >
        </div>
    );
}


export default BoxCard;
