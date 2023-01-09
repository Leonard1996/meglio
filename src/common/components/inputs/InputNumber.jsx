import * as React from "react";
import "./Input.css";
export default function InputNumber(props){

    const handleChange = (value, item) => {
        handleBorderColorChange(value, item);
    }

    const handleBorderColorChange = (value, item) => {
        if (value !== '') {
            document.getElementById(item?.id)?.classList.add("valid-input");
        } else {
            document.getElementById(item?.id)?.classList.remove("valid-input");
            document.getElementById(item?.id)?.classList.add("invalid-input");
        }
    }
    if(props.nostyle){
        return (<input  className="form-control text" type="number"
                        onChange={(e) => handleChange(e.target.value, props)}/>)
    }
    return (
        <div className="form-input-container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <input  className="form-control text" type="number"
                            onChange={(e) => handleChange(e.target.value, props)}/>
                </div>
            </div>
        </div>
    )
}
