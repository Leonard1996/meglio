
import "./Input.css";
import {useEffect, useState} from "react";
import InputCheckbox from "./InputCheckbox";

export default function InputBirthPlace(props) {
    const {options, onChange, value} = props;
    const [searchFraze,setSearchFraze] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [dropdownActive,setDropdownActive] = useState(false);
    const [bornAbroad, setBornAbroad] = useState(false);

    const handleChange = (opt) => {
        setBornAbroad(opt.born_abroad);
        if(!opt.born_abroad){
            if(!bornAbroad){
                let fraze = opt.name;
                let code = opt.communal_territory? `(${opt.communal_territory.car_plate_symbol})`: "";
                    fraze = fraze + code;
                checkIfValid(opt.name);
                setSearchFraze(fraze);
                setDropdownActive(false);
            }else{
                setSearchFraze("");
                checkIfValid("");
                setDropdownActive(false);
            }
        }else{
            setSearchFraze("");
            checkIfValid("valid");
        }
        opt.born_abroad = opt.born_abroad === undefined ? false : opt.born_abroad;
        onChange(opt);
    }
    
    const [isValid, setIsValid] = useState(null);

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
       if(value.commune_of_birth_code !== null && value.commune_of_birth_code !== ""  ){
            // console.log(options);
            let selected = options.filter((item)=>item.cadastral_code === value.commune_of_birth_code );
            selected.length && handleChange(selected[0]);
       }
    },[]);

    return (
        <div className={`form-input-container ${isValid === null ? "" : isValid ? "valid-input" : "invalid-input"}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4 position-relative">
                    <label className="f-label">{props.label}</label>
                    <div className={"d-flex"}>
                        <input value={searchFraze} type="text" disabled={bornAbroad} onChange={handleSearch} className="form-control" placeholder={props.placeholder}/>
                        {dropdownActive &&
                            <div className="form-select-dropdown">
                                {filteredOptions.length > 0 && filteredOptions.map((opt) => <span key={opt.id} onClick={() => handleChange(opt)}>{opt.name} {opt.communal_territory? `(${opt.communal_territory.car_plate_symbol})`: "" } </span>)}
                            </div>
                        }
                    </div>
                    <InputCheckbox 
                        nostyle={1} 
                        label="Stato estero" 
                        name="born_abroad" 
                        id="born_abroad" 
                        checked={bornAbroad} 
                        onChange={() => {
                            handleChange({ born_abroad: !bornAbroad, cadastral_code:"",communal_territory: { car_plate_symbol:""}});  
                        }}
                    />
                    {isValid === null? "" : !isValid ? <label className="f-paragraph">Questo campo è obbligatorio!</label> : ""}
                </div>
            </div>
        </div>
    )
}
