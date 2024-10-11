import './BoxCard.css';

const colorMap = {
    1: '#DC143C',    // rojo carmesí
    2: '#50C878',  // verde esmeralda
    3: '#FFD700',  // oro claro
    4: '#4169E1'   // azul real
};

function BoxCard({ color, isSelected, onClick }) {  

    const mappedColor = colorMap[color] || 'gray'

    return (
        <div
            role="button"
            className={`BoxCard ${isSelected ? 'selected' : ''}`} 
            onClick={onClick}
            style={{backgroundColor: mappedColor}}
        >
        </div>
    );
}

export default BoxCard;
