import * as React from "react";
import "./Input.css";

export default function InputPrivacy(props) {
    return (
        <div className="form-input-container">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <div className={"d-flex"}>
                        <label className="label-privacy">
                            <input className="checkbox-privacy" type="checkbox" {...props}/> {props.label}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
