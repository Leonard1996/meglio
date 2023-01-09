import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFormData, getMunicipalities, getNewProfessionQuote, getProfessions, storageSetSelectedProfession } from "../api";
import CenteredPageTitle from "../common/components/CenteredPageTitle";
import PageLoading from "../common/components/elements/PageLoading";
import InputAddress from "../common/components/inputs/InputAddress";
import InputBirthPlace from "../common/components/inputs/InputBirthPlace";
import InputDate from "../common/components/inputs/InputDate";
import InputExtensions from "../common/components/inputs/InputExtensions";
import InputRadio from "../common/components/inputs/InputRadio";
import InputSelect from "../common/components/inputs/InputSelect";
import InputSelectWithSearch from "../common/components/inputs/InputSelectWithSearch";
import InputText from "../common/components/inputs/InputText";
import { engineerCodes, flagResponse, genders } from "../common/constants";
import convertToItalianDate from "../common/helpers/convertToItalianDate";
import toUniqueArrayObjects from "../common/helpers/toUniqueArrayObjects";
import { validateItalianPostCode } from "../common/validators";

export default function RcProfession(){
    const navigate = useNavigate();
    const [isLaoding, setIsLoading] = useState(true);
    const [municipalities, setMunicipalities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [selectedScope, setSelectedScope] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [selectedExtensions, setSelectedExtensions] = useState([]);
    const [formData, setFormData] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);
    const extensionExists = (extensionCode) => {
        return selectedExtensions.includes(extensionCode);
    };

    const updateUserData = (value) => {
        setUserData({...userData, ...value});
    }

    const [userData, setUserData] = useState({
        product:"profession",
        source:"greenia.it",
        name:"",
        surname:"",
        gender:"",
        fiscal_code:"DDEBLD94T18H501C",
        phone:"",
        email:"",
        date_of_birth:"",
        country_of_birth_code:"Z000",
        province_of_birth_code:"",
        commune_of_birth_code:"",
        born_abroad:false,
        residence_province_code:"",
        residence_commune_code:"",
        postal_code:"",
        address:"",
        house_number:"",
        civil_status_id:"",
        education_level_id:"",
        profession:"",
        profession_code:"",
        profession_desc:"",
        billed:"",
        billed_maximum:"",
        retroactivity:"",
        high_risk:"",
        ext_reviewer:"no",
        contractor_is_owner:true,
        extensions:[]
    });

    // HOOKS
    useEffect(()=> {
        const checkIfFormDataIsRetrived = () => {
            let isRetrived = true;
            if(!municipalities?.length) isRetrived = false;
            if(!professions?.length) isRetrived = false;
            setIsLoading(!isRetrived);
        }
        checkIfFormDataIsRetrived();
    },[municipalities, professions, formData]);

    useEffect(() => {
        const loadMunicipalities = async () => {
            getMunicipalities().then(res=>{
                setMunicipalities(res.data);
            })
        }
        const loadProfessions = async () => {
            getProfessions().then(res=>{
                let _professions = res.data.filter(item=>item.code !== "personale_sanitario");
                setProfessions(_professions);
            })
        }
        const loadFormData = async () => {
            getFormData().then(res=>{
                setFormData(res.data);
            })
        }
        loadFormData();
        loadProfessions();
        loadMunicipalities();
    }, [])

    useEffect(()=>{
        const checkIfReady = () => {
           let isValid = true; 
        //    console.log(userData);
           Object.keys(userData).forEach(key=>{
                if(key !== "high_risk"){
                    if(userData[key] === "" && isValid){
                        isValid = false
                    }
                }
           });
           setFormIsValid(isValid);
        };
        checkIfReady();
    },[userData]);

    // handlers

    const addExtension = (extensionCode) => {
        setSelectedExtensions([...selectedExtensions, extensionCode]);
        updateUserData({extensions: selectedExtensions});
    };

    const removeExtension = (extensionCode) => {
        let filtered = selectedExtensions.filter(
            (item) => item !== extensionCode
        );
        setSelectedExtensions(filtered);
        updateUserData({extensions: filtered});
    };

    const handleChangeProfession = (value) => {
       let profession = professions.find(item=>parseInt(item.id) === parseInt(value));
       setSelectedProfession(profession);
       updateUserData({profession:value, profession_code: profession.code, profession_desc:profession.name, extensions: []});
       setSelectedScope(null);
       setSelectedSpecialization(null);
       setSelectedExtensions([]);
       storageSetSelectedProfession(profession);
    };

    const handleChangeScope = (value) => {
        let scope = selectedProfession.profession_scopes.find(item=>parseInt(item.id) === parseInt(value));
        setSelectedScope(scope);
    }
    
    const handleChangeSpecialization = (value) => {
        let specialization = selectedProfession.medical_specializations.find(item=>parseInt(item.id) === parseInt(value));
        setSelectedSpecialization(specialization);
    }


    const submitForm = () => {
        setIsLoading(true);
        const _userData = userData;
        _userData.date_of_birth = convertToItalianDate(userData.date_of_birth);
        _userData.high_risk = userData.high_risk ? "si" : "no";
        getNewProfessionQuote(_userData).then(res=> {
            navigate(`/quotes/profession/${res.data.rid_token}`);
        })
        
    }

    // renderer
    const showOptions = (options) => {
        let billedAmountOptions = [];
        let billedAmountOptionsMax = [];
        options.forEach((option) => {
            if (billedAmountOptions.indexOf(option.fatturato) < 0) {
              billedAmountOptions.push(option.fatturato);
            }
            if (billedAmountOptionsMax.indexOf(option.massimale) < 0) {
              billedAmountOptionsMax.push(option.massimale);
            }
        });

        return (
            <>
                <InputSelect label={"Fatturato anno in corso?"} options={billedAmountOptions} onChange={(value)=>updateUserData({billed:value})} /> 
                <InputSelect label={"Seleziona Massimale"} options={billedAmountOptionsMax} onChange={(value)=>updateUserData({billed_maximum:value})} /> 
            </>
        )
    }

    if(isLaoding){
        return <PageLoading />
    }

    return (
        <>
            <CenteredPageTitle title="Completa i dati"/>
            <InputRadio options={genders} title="Il contraente è" onChange={(value) => updateUserData({gender: value})}/>
            <InputText placeholder="Nome" label="Nome" onChange={(value) => updateUserData({name: value})}/>
            <InputText placeholder="Cognome" label="Cognome" onChange={(value) => updateUserData({surname: value})}/>
            <InputDate label="Data di nascita" id="date_of_birth" onChange={(value) => updateUserData({date_of_birth:value})} minDate="1922-01-01" maxDate="2021-01-01"/>       
            <InputBirthPlace 
                label="Luogo di nascita" 
                id="commune_of_birth_code"
                onChange={(item)=>updateUserData({
                    commune_of_birth_code: item.cadastral_code,
                    province_of_birth_code: item.communal_territory.car_plate_symbol,
                    born_abroad: item.born_abroad, 
                })}
                options={municipalities} 
            />
            <InputSelect placeholder="Stato civile" label="Stato civile" name="civil_status_id" id="marital" options={formData.marital_statuses} onChange={(value)=>updateUserData({civil_status_id: value})}/>                        
            <InputSelect placeholder="Titolo di studio" label="Titolo di studio" name="education_level_id" id="educational" options={formData.qualifications} onChange={(value)=>updateUserData({education_level_id: value})} />  
            
            <InputAddress placeholder="Indirizzo" label="Indirizzo" onAddressChange={(value) => updateUserData({address: value})} onHouseNumberChange={(value) => updateUserData({house_number: value})} />
            <InputSelectWithSearch placeholder="Comune" label="Residenza" name="residence_commune_code" onChange={(item) => updateUserData({residence_commune_code:item.cadastral_code, residence_province_code: item.communal_territory.car_plate_symbol})} options={municipalities} returnType={"object"} countryCode="cadastral_code">
                <InputText validator={validateItalianPostCode} type="number" placeholder="-Codice Postale-" name="postal_code" id="postal_code" nostyle={1} onChange={(value)=>updateUserData({postal_code:value})} />
            </InputSelectWithSearch>
            <InputSelect label={"Che lavoro fai ?"} options={professions} onChange={handleChangeProfession}/>
            
            {  
                selectedProfession !== null && 
                selectedProfession.profession_scopes.length > 0 &&
                <InputSelect label={"Ambito di polizza"} options={selectedProfession.profession_scopes} onChange={handleChangeScope} /> 
            }
            {
                selectedProfession !== null && 
                selectedProfession.profession_scopes.length > 0 && 
                selectedProfession.medical_specializations.length > 0 && 
                <InputSelect label={"Specializzazione"} options={selectedProfession.medical_specializations} onChange={handleChangeSpecialization} /> 
            }
            {
                selectedProfession !== null &&
                selectedProfession.code === "personale_sanitario" &&
                selectedProfession.medical_retroactivity_options &&
                selectedProfession.medical_retroactivity_options.length > 0 &&
                <InputSelect label={"Retroattività"} options={selectedProfession.medical_retroactivity_options} onChange={(value)=>updateUserData({retroactivity:value})} /> 
            }
            {
                selectedProfession !== null &&
                engineerCodes.includes(selectedProfession.code) &&
                <InputRadio title="Svolge attività ad alto rischio quale Soil Engeneers (ingegneria del
                    suolo), pilling (palificazione di sostegno), cladding (rivestimenti),
                    ponti, gallerie, dighe o piscine e i relativi fatturati superano il
                    50% del fatturato totale?" id="prove" options={flagResponse} name="high_risk" onChange={(value) => updateUserData({high_risk:value})}/>         
            }
            {
                selectedProfession !== null &&
                selectedProfession.retroactivity_fees &&
                selectedProfession.retroactivity_fees.length > 0 &&
                <InputSelect label={"Retroattività"} options={toUniqueArrayObjects(selectedProfession.retroactivity_fees, 'id')} onChange={(value)=>updateUserData({retroactivity:value})} /> 
            }
            { selectedProfession !== null && <InputExtensions label={"Estensioni"} profession={selectedProfession} extensionExists={extensionExists} addExtension={addExtension} removeExtension={removeExtension} />}
            { 
                selectedProfession !== null &&
                selectedProfession.options &&
                selectedProfession.options.length &&
                showOptions(selectedProfession.options)
            }
            <InputText type="email" id="email" name="email" label="E-mail" onChange={(value)=>updateUserData({email:value})}/>
            <InputText id="phone" name="phone" label="Phone" paragraph="Numeri di rete fissa non accettati dalle aziende" onChange={(value)=>updateUserData({phone:value})} />
                        
            <div className="footer-buttons">
                <div className="d-flex justify-content-between">
                    <button className="btn btn-questionnaire" onClick={submitForm} disabled={!formIsValid}>{"Vai a preventi"}</button>
                </div>
            </div>
        </>
    )
}