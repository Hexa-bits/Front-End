import './BoxCard.css';
import red from '../../../../../assets/Board/A.svg';
import yellow from '../../../../../assets/Board/B.svg';
import green from '../../../../../assets/Board/C.svg';
import blue from '../../../../../assets/Board/D.svg';

function BoxCard({ color, isSelected, onClick }) {  
    let imageSrc;

    switch (color) {
        case "red":
            imageSrc = red;  
            break;
        case "yellow":
            imageSrc = yellow;
            break;
        case "green":
            imageSrc = green;
            break;
        case "blue":
            imageSrc = blue;
            break;
        default:
            imageSrc = null;
            break;
    }

    return (
        <div 
            className={`BoxCard ${isSelected ? 'selected' : ''}`} 
            onClick={onClick}
        >
            {imageSrc && <img src={imageSrc} />}
        </div>
    );
}

export default BoxCard;