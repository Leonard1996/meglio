import { useState } from "react";
import "./Input.css";

export default function InputAddress(props) {
    const {valueAddress, valueHouse} = props;
    const [validAddress, setValidAddress] = useState(valueAddress);
    const [validHouseNumber, setValidHouseNumber] = useState(valueHouse);

    const handleAddressChange = ({target:{value}}) => {
        props.onAddressChange(value);
        setValidAddress(validate(value));
    }

    const handleHouseNumberChange = ({target:{value}}) => {
        props.onHouseNumberChange(value);
        setValidHouseNumber(validate(value));
    }
    
    const validate = (value) => {
        return value.length > 0
    }
   
    return (
        <div className={`form-input-container ${validAddress === null ? "" : validAddress ? "valid-input" : "invalid-input"}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label className="f-label">{props.label}</label>
                    <div className="d-flex justify-content-between">
                        <input className="form-control text address" type="text" onChange={handleAddressChange} value={valueAddress} />
                        <span className="f-label">N.</span>
                        <input  value={valueHouse} type="number" className={`form-control house-nr required ${validHouseNumber || validHouseNumber === null? "" : "e-invalid-input"}`} onChange={handleHouseNumberChange}/>
                    </div>
                    {validAddress === null? "" : !validAddress ? <label className="f-paragraph">Questo campo è obbligatorio!</label> : ""}
                </div>
            </div>
        </div>
    )
}

