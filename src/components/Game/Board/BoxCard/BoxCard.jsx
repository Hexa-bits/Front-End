import './BoxCard.css';

const colorMap = {
    red: '#DC143C',    // rojo carmesí
    blue: '#4169E1',   // azul real
    green: '#50C878',  // verde esmeralda
    yellow: '#FFD700'  // oro claro
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