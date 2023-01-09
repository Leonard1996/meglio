
import "./Input.css";
import {useEffect, useState} from "react";

export default function InputSelectWithSearch(props) {
    const {options, onChange, returnType, disabled, value} = props;
    const [searchFraze,setSearchFraze] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [dropdownActive,setDropdownActive] = useState(false);

    const handleChange = (opt) => {
        let fraze = opt.name;
        let code = opt.communal_territory? `(${opt.communal_territory.car_plate_symbol})`: "";
            fraze = fraze + code;
        checkIfValid(opt.name);
        setSearchFraze(fraze);
        setDropdownActive(false);
        if(returnType === "object"){
            // console.log("HERE OBJECT");
            onChange(opt);
        }else{
            if(returnType && returnType !== "object"){
                // console.log("HERE NOT OBJECT");
                onChange(opt[returnType]);
            }else{
                // console.log("HERE ID");
                onChange(opt.id);
            }
        }
    }

    const [isValid,setIsValid] = useState(null);

    const checkIfValid = (value) => {
        if (value !== '') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const handleSearch = ({target}) => {
        if(target.value === ""){
            setSearchFraze(target.value);
            setFilteredOptions([]);
            setDropdownActive(false);
            checkIfValid(target.value);
        }else{
            let filtered = options.filter((item)=>item.name.toLowerCase().includes(target.value.toLowerCase()));
            setSearchFraze(target.value);
            setFilteredOptions(filtered);
            if(filtered.length){
                setDropdownActive(true);
            }
            else{
                setDropdownActive(false);
            }
        }

    }

    useEffect(()=>{
        if(disabled){
            setSearchFraze("");
            checkIfValid("valid");
        }else{
            if(typeof disabled != 'undefined'){
                checkIfValid(searchFraze);
            }
        }
    },[disabled])

    useEffect(()=>{
        if(typeof value === "object"){
            if(value.residence_commune_code !== null || value.residence_commune_code !== "" ){
                let selected = options.filter((item)=>item.cadastral_code === value.residence_commune_code );
                selected.length && handleChange(selected[0]);
            }
        }else{
            if(value !== null || value !== "" ){
                let selected = options.filter((item)=>item.id === value );
                selected.length && handleChange(selected[0]);
            }
        }
    },[])

    return (
        <div className={`form-input-container ${isValid === null ? "" : isValid ? "valid-input" : "invalid-input"}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4 position-relative">
                    <label className="f-label">{props.label}</label>
                    <div className={"d-flex"}>
                        <input value={searchFraze} type="text" disabled={disabled} onChange={handleSearch} className="form-control" placeholder={props.placeholder}/>
                        {dropdownActive &&
                            <div className="form-select-dropdown">
                                {filteredOptions.length > 0 && filteredOptions.map((opt) => <span key={opt.id} onClick={() => handleChange(opt)}>{opt.name} {opt.communal_territory? `(${opt.communal_territory.car_plate_symbol})`: "" } </span>)}
                            </div>
                        }
                        {props.children &&
                            <div className="children">
                                {props.children}
                            </div>
                        }

                    </div>
                    {props.BottomComponent && props.BottomComponent}
                    {isValid === null? "" : !isValid ? <label className="f-paragraph">Questo campo è obbligatorio!</label> : ""}
                </div>
            </div>
        </div>
    )
}
