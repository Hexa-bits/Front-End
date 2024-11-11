import React, { useState } from 'react';
import Form from '../../Form/Form';
import joinGame from '../../../services/Home/JoinGame';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { hashPassword } from '../../../services/Home/encrypt';
import "./JoinForm.css";

function JoinForm( {game, playerId, setShowForm} ) {
    const navigate = useNavigate();
    const [ input_password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const handleConfirm = async () => {
        if (!input_password) { setError('Campo requerido !'); return; }
        const hashedPass = hashPassword(input_password);
        
        const success = await joinGame(game, playerId, hashedPass, navigate);
        if (!success) { setError('Contraseña incorrecta !'); return; }
        
        setShowForm(false);
    }

    const handleClose = () => setShowForm(false);

    return (

        <div 
            className="modal fade show" 
            id="joinFormModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalCenterTitle" 
            aria-hidden="true"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={handleClose}>

            <div 
                className="modal-dialog modal-dialog-centered" 
                role="document"
                onClick={(e) => e.stopPropagation()}>

                <div className="modal-content">
                    <div className="modal-header">
                        <Button 
                            className={'close'}
                            onClick={handleClose}
                        />
                    </div>
                    
                    <div className="modal-body">
                        <Form 
                            label={'Introduce la contraseña'}
                            type={'password'}
                            placeholder={'Contraseña'}
                            onChange={(e) => setPassword(e.target.value)}
                            icon="/assets/icons/clave.png"
                            error={error}
                        />
                    </div>
                    <div className="modal-footer">
                        <Button 
                            data-dismiss="modal"
                            label={'Confirmar'}
                            onClick={handleConfirm}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinForm;