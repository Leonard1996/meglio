import { useEffect } from "react";
import { useState } from "react";
import "./CoverageItem.css";

export default function CoverageItem({title, selected, disabled, onChange}) {

    const [ isSelected, setIsSelected] = useState(selected);
    const [ editStarted, setEditStarted] = useState(false);
    const toggleSelect = ()=> {
        setEditStarted(true);
        if(!disabled){
            setIsSelected(prevState=>!prevState);
        }
    }

    useEffect(()=>{
        if(editStarted){
            onChange(isSelected);
        }
    },[isSelected, editStarted])

    return (
        <li className={`coverage-item ${disabled? 'disabled' : ''} ${isSelected? 'selected' : ''}`} onClick={toggleSelect}>
            {
            !isSelected?
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
            :
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z"/></svg>
            }
            {title}
            <i>(?)</i>
        </li>
    )
}