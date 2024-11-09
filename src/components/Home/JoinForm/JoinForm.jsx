import React, { useState } from 'react';
import Form from '../../Form/Form';
import joinGame from '../../../services/Home/JoinGame';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import "./JoinForm.css";

function JoinForm( {gameId, playerId, setShowForm} ) {
    const navigate = useNavigate();
    const [ input_password, setPassword ] = useState('');

    const handleConfirm = async () => {
        await joinGame(gameId, playerId, input_password, navigate);
        setShowForm(false);
    }

    const handleClose = () => setShowForm(false);

    return (

        <div 
            className="modal fade show" 
            id="joinFormModal" 
            tabindex="-1" 
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
                        {/* <h5 className="modal-title" id="exampleModalLongTitle">Ingresar a partida</h5> */}
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