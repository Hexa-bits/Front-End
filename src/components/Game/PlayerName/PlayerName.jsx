import './PlayerName.css';

function PlayerName({ label, player }) {
    return (
        <div className="Player">
                {label} : { player }
        </div>
    );
}

export default PlayerName;