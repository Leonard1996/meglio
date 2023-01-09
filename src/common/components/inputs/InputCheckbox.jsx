import * as React from "react";
import "./Input.css";
export default function InputCheckbox(props){

    if(props.nostyle){
        return (
            <label className="f-label" htmlFor={props.name}>
                <input className="checkbox" type="checkbox" id={props.name} {...props}/>{props.label}
            </label>
            
        )
    }

    return (
        <div className="form-input-container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label className="f-label" htmlFor={props.name}>{props.label}</label>
                    <input  className="checkbox" type="checkbox" id={props.name} {...props}/>
                </div>
            </div>
        </div>
    )
}
