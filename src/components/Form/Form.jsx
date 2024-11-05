import "./Form.css";

function Form ({label, type = "text", placeholder, helpText, id, onChange = undefined, value, onKeyDown}) {
    return (
        <div className="form-container">
            <div className="col-form-label-container">
                <label htmlFor={id} className="col-form-label">{label}</label>
            </div>
            <div className="col-auto">
                <input 
                    type={type} 
                    className="form-input"
                    placeholder={placeholder} 
                    id={id}
                    onChange={onChange}   
                    value={value}
                    onKeyDown={onKeyDown}
                />
            </div>
            <div className="col-auto">
                <span id={id} className="form-text">{helpText}</span>
            </div>
        </div>
    );  
}

export default Form;
