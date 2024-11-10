import "./Form.css";
import React from 'react';

function Form({ label, type = "text", placeholder, helpText, id, onChange = undefined, value, onKeyDown, icon, error }) {
    return (
        <div className="form-container">
            <div className="col-form-label-container">
                <label htmlFor={id} className="col-form-label">{label}</label>
            </div>
            <div className="col-auto input-wrapper">
                <input 
                    type={type} 
                    className={`form-input ${icon ? "icon" : ""} ${error ? "error" : ""}`}
                    placeholder={placeholder} 
                    id={id}
                    onChange={onChange}   
                    value={value}
                    onKeyDown={onKeyDown}
                />
                {icon && <img src={icon} alt="input icon" className="input-icon" />}
            </div>
            <div className="col-auto">
                <span id={id} className="form-text">{helpText}</span>
                <span className="error-text">{error}</span>
            </div>
        </div>
    );
}

export default Form;