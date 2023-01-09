import * as React from "react";
import "./Input.css";
import {useState} from "react";
import { useEffect } from "react";

export default function InputSelect(props) {
    const [selected, setSelected] = useState("");
    const [isValid, setIsValid] = useState(null);

    const handleChange = ({target}) => {
        checkIfValid(target.value);
        setSelected(target.value);
        props.onChange(target.value);
    }

    const checkIfValid = (value) => {
        if (value !== '') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    useEffect(()=>{
        if(props.value !== null && props.value !== ""){
            handleChange({target:{value:props.value}});
        }
    },[])

    if(props.nostyle){
        return (
            <select id={props.name} value={selected} className={`form-control  ${isValid === null ? "" : isValid ? "e-valid-input" : "e-invalid-input"}`} onChange={handleChange}>
                <option value="" disabled>{props.placeholder}</option>
                {props.options && props.options.map((opt) => <option key={opt.id? opt.id.toString() : opt} value={opt.id? opt.id : opt}>{opt.name ? opt.name : opt}</option>)}
            </select>
        )
    }
    return (
        <div className={`form-input-container ${isValid === null ? "" : isValid ? "valid-input" : "invalid-input"}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label className="f-label">{props.label}</label>
                    <div className={"d-flex"}>
                        <select id={props.name} value={selected} className="form-control" onChange={handleChange}>
                            <option value="" disabled>{props.placeholder}</option>
                            {props.options && props.options.map((opt) => <option key={opt.id? opt.id.toString() : opt} value={opt.id? opt.id : opt}>{opt.name ? opt.name : opt}</option>)}
                        </select>
                        {props.children && <div className="children">{props.children}</div>}
                        
                    </div>
                </div>
                {props.BottomComponent && props.BottomComponent}
            </div>
        </div>
    )
}
