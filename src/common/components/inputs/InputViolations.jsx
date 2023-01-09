import { useEffect } from "react";
import { useState } from "react";
import { getLastSixYearsBySelectedYear, violationTypes } from "../../constants";
import InputSelect from "./InputSelect";
import InputText from "./InputText";

const Violation = ({onChange, number, firstRegistrationYear }) => {
    let lastSixYears = getLastSixYearsBySelectedYear(Number(firstRegistrationYear));
    const [violationType, setViolationType] = useState("");
    const [violationYear, setViolationYear] = useState("");

    useEffect(()=>{
        if(violationType !== "" && violationYear !== "") {
            onChange({[Number(number)+1]:{
                year: violationYear,
                type: violationType
            }})
        }
    },[violationYear, violationType]);

    return (
        <div>
            <InputSelect name="violation_type" id="month" placeholder="-Seleziona il tipo-" options={violationTypes} onChange={(value)=>setViolationType(value)} value={violationType}>
                <InputSelect name="violation_year" id="year" placeholder="-Anno-" options={lastSixYears} nostyle={1} onChange={(value)=>setViolationYear(value)} value={violationYear}/>
            </InputSelect>
        </div>
    )
}

export function calculateDetails(firstRegistrationYear, violations = null){
    let details = [] ;
    getLastSixYearsBySelectedYear(Number(firstRegistrationYear)).forEach((y,i)=>{
        if(violations){
            let index = violations.findIndex(x => Number(x.year) === Number(y.id));
            // console.log("inDEX",index);
            if( Number(y.id) < Number(firstRegistrationYear) ) {
                details.push({
                    "year": y.id,
                    "resp_princ": "NA",
                    "resp_paritaria": "NA"
                })
            }else{
                if(index<0){
                    details.push({
                        "year": y.id,
                        "resp_princ": 0,
                        "resp_paritaria": 0
                    })
                }else{
                    details.push({
                        "year": y.id,
                        "resp_princ": violations[index].principale_amount,
                        "resp_paritaria": violations[index].paritaria_amount
                    })
                }
    
            } 
        }else{
            if( Number(y.id) < Number(firstRegistrationYear) ) {
                details.push({
                    "year": y.id,
                    "resp_princ": "NA",
                    "resp_paritaria": "NA"
                })
            }else{
                details.push({
                    "year": y.id,
                    "resp_princ": 0,
                    "resp_paritaria": 0
                })
            } 
        }
    });
    return details;
}

export default function InputViolations(props) {
    const [violationsNr, setViolationsNr] = useState(1);
    const [violationsDetails, setViolationsDetails] = useState([]);
    const [insertedViolations, setInsertedViolations] = useState({});

    useEffect(()=>{
        if(Object.keys(insertedViolations).length === violationsNr){
            updateViolationsDetails();
        }
    },[insertedViolations]);

    useEffect(()=>{
        if(violationsDetails.length){
            props.onChange({details:violationsDetails, number:violationsNr});
        }
    },[violationsDetails]);

    const updateViolationsDetails = () => {
        let newViolations = [];
        let details = [];
        Object.keys(insertedViolations).forEach(key=>{
            let vYear = insertedViolations[key].year;
            let vType = insertedViolations[key].type;
            let index = newViolations.findIndex(x => x.year === vYear);
            if(index<0){
                if(vType === 'principale'){
                    newViolations.push({year:vYear, principale_amount: 1, paritaria_amount:0});
                }else{
                    newViolations.push({year:vYear, principale_amount: 0, paritaria_amount:1});
                }
            }else{
                if(vType === 'principale'){
                    newViolations[index].principale_amount += 1; 
                }else{
                    newViolations[index].paritaria_amount += 1;
                }
            }
        });

        details = calculateDetails(props.firstRegistrationYear, newViolations);
        // console.log("======++++++=====");
        // console.log(newViolations);
        // console.log(details);
        setViolationsDetails(details);
    }

    const updateViolations = (data) => {
        setInsertedViolations({...insertedViolations, ...data});
    }

    // console.log(insertedViolations);
    return (
        <div>
            <InputText  label="Number of violations" type="number" min={1} max={10} onChange={(value)=>{
                 let v = Number(value);
                 if(v < 0) return setViolationsNr(1)
                 if(v > 10) return setViolationsNr(10)
                 return setViolationsNr(v)
            }} value={violationsNr}/>
            {
                [...Array(violationsNr)].map((_, i) => <Violation onChange={(data)=>updateViolations(data)} number={i} key={i+1} firstRegistrationYear={props.firstRegistrationYear}/>)
            }
        </div>
    );
}