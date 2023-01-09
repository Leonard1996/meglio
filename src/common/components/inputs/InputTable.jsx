import * as React from "react";
import "./Input.css";


export default function InputSelectTable(props) {

    return (
        <div className="form-input-container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <label className="f-label">{props.label}</label>
                    <div className="select-table">
                        {props.TableHeader && props.TableHeader}
                        {props.options && props.options.map((opt) =>
                            <div key={opt.id} className={`select-table-item ${opt.id === props.selected ? "selected" : ""}`} onClick={() =>{localStorage.setItem('autoDesc', JSON.stringify(opt)); props.onSelectOption(opt.id)}}>
                                <div className="d-flex align-items-center">
                                    <div className="col-3">{opt.fuel.name}</div>
                                    <div className="col-1">{opt.cubic_capacity}</div>
                                    <div className="col-3">{opt.body_type.name}</div>
                                    <div className="col-4">{opt.description}</div>
                                </div>
                            </div>
                        )}
                        {props.children &&
                            <div className="children">
                                {props.children}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

