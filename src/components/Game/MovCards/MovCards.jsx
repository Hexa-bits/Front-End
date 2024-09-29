import React from 'react';
import './MovCards.css';

function MovCards({ movsIds }) {
    return ( 
        <div className="mov-cards-container">
            <div className='mov-card'>
                {movsIds.slice(0,3).map((Id, index) => (
                    <img key={index} src={`../../../../assets/Movements/mov${Id}.svg`} alt={`mov${Id}`} />
                ))}              
            </div>
        </div>
    );
}

export default MovCards;