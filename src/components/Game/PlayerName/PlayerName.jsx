import './PlayerName.css';

function PlayerName({ isOnlineOrb , player }) {
    return (
        <div className="Player">
        <div className='online-orb'>{isOnlineOrb}</div>
            <div className='name-player'>{player}</div>   
      </div>
    );
}

export default PlayerName;