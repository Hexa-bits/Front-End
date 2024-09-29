import React from 'react';
import './MovCards.css';

function MovCards({ movsIds }) {
    return ( 
        <div className="mov-cards-container">
            <div className='mov-card'>
                {movsIds.map((Id, index) => (
                    <img key={index} src={`../../../../assets/Movements/mov${Id}.svg`} alt={`mov${Id}`} />
                ))}              
            </div>
        </div>
    );
}

export default MovCards;