import './PlayerName.css';

function PlayerName({ player }) {
    return (
        <div className="Player">
                Usuario: { player }
        </div>
    );
}

export default PlayerName;