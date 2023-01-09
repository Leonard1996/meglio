import { useState, useEffect} from "react";
import "./Input.css";

export default function InputText(props) {

    const [valid, setValid] = useState(null);

    const handleChange = ({target:{value}}) => {
        validate(value);
        props.onChange(value);
    }

    const validate = (value) => {
        if(props.validator){
            setValid(props.validator(value) !== null);
            return;
        }
        if(value) setValid(value.length);
    }
    
    useEffect(()=>{
        if(props.value !== null || props.value !== ""){
            validate(props.value);
        }
    },[])

    if(props.nostyle){
        return (<input value={props.value} type={props.type} min={props.min} max={props.max} className={`form-control text ${valid === null ? "" : valid ? "e-valid-input" : "e-invalid-input"} ${props.className}`} onChange={handleChange} pattern={props.pattern} placeholder={props.placeholder}/>)
    }

    return (
        <div className={`form-input-container ${valid === null ? "" : valid ? "valid-input" : "invalid-input"}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label className="f-label">{props.label}</label>
                    <input value={props.value} placeholder={props.placeholder} className={`form-control text ${props.className}`} type={props.type} min={props.min} max={props.max} pattern={props.pattern} onChange={handleChange} />
                    {valid === null? "" : !valid ? <label className="f-paragraph">Questo campo è obbligatorio!</label> : ""}
                </div>
            </div>
        </div>
    )
}

