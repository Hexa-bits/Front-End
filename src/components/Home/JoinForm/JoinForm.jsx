import React, { useState } from 'react';
import Form from '../../Form/Form';
import joinGame from '../../../services/Home/JoinGame';
import Button from '../../Button/Button';

function JoinForm( gameId, playerId, setShowForm ) {
    const [ input_password, setPassword ] = useState('');

    const handleConfirm = async () => {
        joinGame(gameId, playerId, input_password);
        setShowForm(false);
    }

    return (
        <div className='private-container'>
            <div className='priv-form'>
                <Form 
                    label={'Introduce la contraseña de la partida'}
                    type={'password'}
                    placeholder={'Contraseña'}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='priv-confirm-btn'>
                <Button 
                    label={'Confirmar'}
                    onClick={handleConfirm}
                />
            </div>
        </div>
    )
}

export default JoinForm;