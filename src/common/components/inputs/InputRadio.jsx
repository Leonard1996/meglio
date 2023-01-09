import * as React from "react";
import "./Input.css";
import {useState} from "react";

export default function InputRadio(props) {
    return (
        <div className="form-input-container">
            <div className="f-label label-radio">{props.title}</div>
            <p className="p-radio">{props.paragraph}</p>
            {props.options.map((opt,index) =>
                <div key={index.toString()} className="form-check-inline">
                    <label key={opt.value} className="flex-item">{opt.label}
                        <input checked={props.value === opt.value} className="radio" type="radio" value={opt.value} onChange={() => props.onChange(opt.value)}/>
                    </label>
                </div>
            )}
        </div>
    )
}
