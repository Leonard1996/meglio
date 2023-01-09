import * as React from "react";
import "./Input.css";
import {useState} from "react";
import { useEffect } from "react";

export default function InputDate(props) {
    const  {minDate, maxDate, label, onChange, value} = props;

    const [valid, setValid] = useState(null);

    const handleChange = ({target}) => {
        onChange(target.value);
        validateDate(target.value);
    }

    const validateDate = (v) => {
        let selectedDate = new Date(v);
        if ( selectedDate <= new Date(maxDate) && new Date(minDate) <= selectedDate ) {
            setValid(true);
        } else {
            setValid(false);
        }
    }

    useEffect(()=>{
        if(value !== null && value !== ""){
            validateDate(value);
        }
    },[])

    return (
        <div
            className={`form-input-container ${valid === null ? "" : valid ? "valid-input" : "invalid-input"}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label className="f-label">{label}</label>
                    <input className="form-control date" type="date" lang="it-IT" min={minDate} max={maxDate} value={value} onChange={handleChange}/>
                    {valid === null? "" : !valid ? <label className="f-paragraph">Questo campo è obbligatorio! Si prega di selezionare la data corretta!</label> : ""}
                </div>
            </div>
        </div>
    )
}
