import * as React from "react";
import "./Input.css";
export default function InputExtensions(props)
{

    if (!props.profession) return null;
    const { extensions } = props.profession;
    if (!extensions) return null;
    if (!extensions.length) return null;

    let uniqueExtensions = extensions.filter((value, index, self) =>
        index === self.findIndex((t) => (
           t.code === value.code
        ))
    )
    
    // console.log(uniqueExtensions);

    return (
        <div className="form-input-container extensions">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <label className="f-label">{props.label}</label>
                    <ul>
                        {uniqueExtensions.map((item) => {
                            let exists = props.extensionExists(item.code);
                            return (
                            <li
                                className={exists?"active":""}
                                key={`key_${item.code}`}
                                onClick={() => {
                                    exists? props.removeExtension(item.code) : props.addExtension(item.code)
                                }}
                            >
                                <label style={{ border: "none" }}>{item.name}</label>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}