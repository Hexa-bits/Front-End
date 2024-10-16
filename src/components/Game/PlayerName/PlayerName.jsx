import './PlayerName.css';

function PlayerName({ player }) {
    return (
        <div className="Player">
                USUARIO: { player }
        </div>
    );
}

export default PlayerName;