import {useEffect, useState} from "react";
import {getVehicleModels, getFormData, getMunicipalities, getVehicleBrands, getVehicleVersions, getNewQuote} from "../../api";
import InputText from "../../common/components/inputs/InputText";
import InputDate from "../../common/components/inputs/InputDate";
import InputCheckbox from "../../common/components/inputs/InputCheckbox";
import InputRadio from "../../common/components/inputs/InputRadio";
import InputSelect from "../../common/components/inputs/InputSelect";
import InputSelectWithSearch from "../../common/components/inputs/InputSelectWithSearch";
import InputSelectTable from "../../common/components/inputs/InputTable";
import LoadingGif from "../../assets/images/loading.gif";
import InputPrivacy from "../../common/components/inputs/InputPrivacy";
import ProgressBar from "../../common/components/ProgressBar";
import InputAddress from "../../common/components/inputs/InputAddress";
import { validateCarPlate, validateVatNumber } from "../../common/validators";
import {  genders, flagResponse, months, years, power_supply, usage_types, km_during_one_year, vehiclesAmountInFamily, meritClass, companyTypes } from "../../common/constants";
import { useNavigate, useParams } from "react-router-dom";
import convertToItalianDate from "../../common/helpers/convertToItalianDate";
import InputBirthPlace from "../../common/components/inputs/InputBirthPlace";

export default function FrameRcVehicle() {
    const navigate = useNavigate();

    let { product, id } = useParams();
    // Constants
    const steps = ["Dati Personali","Dati del Veicolo","Dati Assicurativi","Calcolare"];

    // STATE
    const [index, setIndex] = useState(1);
    const [title, setTitle] = useState('');

    const [municipalities, setMunicipalities] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [formData, setFormData] = useState({
        qualifications: [],
        professions: [],
        parking_types: [],
        theft_protections: [],
        marital_statuses:[],
        insurance_companies:[]
    });
    const [vehicleVersions, setVehicleVersions] = useState([]);
    const [nextStepActive, setNextStepActive] = useState(false);
    const [answers, setAnswers] = useState({
        product: product,
        source: "greenia.it",
        contractor_is_owner: "",
        contractor_is_driver: "",
        name:"",
        surname:"",
        gender:"",
        fiscal_code:"DDEBLD94T18H501C", //missing ( autogenerate )
        phone:"",
        email:"",
        date_of_birth:"",
        country_of_birth_code:"Z000", // missing
        province_of_birth_code:"", // missing
        commune_of_birth_code:"",
        born_abroad: 0,
        residence_province_code:"",
        residence_commune_code:"",
        postal_code:"",
        address:"",
        house_number:"",
        civil_status_id:"",
        education_level_id:"",
        profession_id:"",
        driving_license_year:"",
        vehicle_plate:"",
        vehicle_brand_code:"",
        vehicle_model_code:"",
        vehicle_version_code:"",
        vehicle_year:"",
        vehicle_month:"",
        vehicle_purchased_year:"",
        theft_protection_code:"",
        tow_hook:"",
       
        // NEW => TO BE STORED IN BACKEND
        children:"",
        youngest_age:"",
        vehicle_parking: "",
        other_power_supply:"",
        vehicle_usage:"",
        predicted_km:"",
        vehicles_owned: "",
        policy_effective_date:"",
        other_drivers: "",
        mofified_vehicle:"",
        valid_driving_license:"",
        violations:"",
        business_name:"",
        vat_number:"",
        company_type:"",
        // PRIVACY TO DO...
    });

    
    // loading state manager
    const [isLaoding,setIsLoading] = useState(true);
    const [isLoadingVehicleModels, setIsLoadingVehicleModels ] = useState(false);
    const [IsLoadingVehicleVersions, setIsLoadingVehicleVersions] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // FUNCTIONS
    const submitAnswers = () => {
        setIsSubmitting(true);
        const _data = answers;
        _data.date_of_birth = convertToItalianDate(answers.date_of_birth);
        _data.policy_effective_date = convertToItalianDate(answers.policy_effective_date);
        // console.log("DATA", _data);
        getNewQuote(_data).then((res)=>{
            // console.log(res);
            setIsSubmitting(false);
            localStorage.setItem('dataSend', JSON.stringify(_data))
            localStorage.setItem('resData', JSON.stringify(res));
            navigate(`/frame/${id}/quotes/${res.request_token}`);
        });
    }

    const updateFormData = (answer) => {
        setAnswers({...answers, ...answer});
    }

    const prevButton = () => {
        if (index > 1) {
            setIndex(prevIndex => prevIndex - 1);
        }
    }

    const nextButton = async () => {
        if(index === 4){
            submitAnswers();
            return;
        } 
        setIndex(prevIndex => prevIndex + 1);
        setTimeout(()=>window.scrollTo(0, 0),500);
        return;
    }

    // HOOKS

    useEffect(()=> {
        const checkIfFormDataIsRetrived = () => {
            let isRetrived = true;
            if(!municipalities.length) isRetrived = false;
            if(!brands.length) isRetrived = false;
            if(!formData.marital_statuses.length) isRetrived = false;
            setIsLoading(!isRetrived);
        }
        checkIfFormDataIsRetrived();
    },[municipalities,brands,formData]);

    useEffect(() => {
        const loadMunicipalities = async () => {
            getMunicipalities().then(res=>{
                // console.log(res.data[0]);
                setMunicipalities(res.data);
            })
            getVehicleBrands().then(res=>{
                // console.log(res);
                setBrands(res.data);
            })
            getFormData().then(res=>{
                // console.log(res);
                setFormData(res.data);
            })
        }
        loadMunicipalities();
    }, [])

    useEffect(() => {
        switch (index) {
            case 1:
                setTitle('Dati Personali');
                break;
            case 2:
                setTitle('Dati del Veicolo');
                break;
            case 3:
                setTitle('Dati Assicurativi');
                break;
            case 4:
                setTitle('Calcolare');
                break;
            default:
                setTitle('');
                break;
        }
    }, [index])

    useEffect(()=>{
        const checkFirstStep = () => {
            // console.log(answers);
            const { gender, date_of_birth, commune_of_birth_code, province_of_birth_code, born_abroad, residence_commune_code, residence_province_code, postal_code, children, civil_status_id, education_level_id, profession_id, address, contractor_is_driver, contractor_is_owner } = answers;
            const answersFirstStep = [ gender, date_of_birth, commune_of_birth_code, province_of_birth_code, residence_commune_code, residence_province_code, postal_code, children, civil_status_id, education_level_id, profession_id, address, contractor_is_driver, contractor_is_owner];
            console.log(answersFirstStep);
            let isValid = true;
           
            answersFirstStep.forEach(answer=>{
                // console.log(answer);
                if(isValid && answer === "" | answer === undefined){
                    isValid = false;
                }
            })
            if(born_abroad){
                //here born abroad validation
            }
            return isValid;
        }
        const checkSecondStep = () => {
            // validate second step 
            // console.log(answers.tow_hook);
            // console.log(answers);
            if(answers.driving_license_year !== ""){
                return true;
            }
            return false;
        }
        const checkThirdStep = () => {
            if(answers.company_type || answers.valid_driving_license){
                return true;
            }
            return false;
        }
        const checkForthStep = () => {
            if(answers.phone){
                return true;
            }
            return false;
        }
        const checkAnswers = () => {
            let firstStep = checkFirstStep();
            let secondStep = checkSecondStep();
            let thirdStep = checkThirdStep();
            let forthStep = checkForthStep();
            // console.log("CHECKING >>>");
            index === 1 && setNextStepActive(firstStep);
            index === 2 && setNextStepActive(secondStep);
            index === 3 && setNextStepActive(thirdStep);
            index === 4 && setNextStepActive(forthStep);
        }
        checkAnswers();
    },[answers,index])

    useEffect(()=>{
        if(answers.vehicle_brand_code){
            setIsLoadingVehicleModels(true);
            getVehicleModels({make_id:answers.vehicle_brand_code}).then(res=>{
                setVehicleModels(res.data);
                setIsLoadingVehicleModels(false);
            })
        }
    },[answers.vehicle_brand_code])

    useEffect(()=>{
        if(answers.vehicle_model_code){
            setIsLoadingVehicleVersions(true);
            let m = parseInt(answers.vehicle_month) +1;
            let dateImm = "";
            if(m<=9){
                dateImm = answers.vehicle_year.toString() + m.toString().padStart(2, '0');
            }else{
                dateImm = answers.vehicle_year.toString() + m.toString();
            }
            getVehicleVersions({model_id:answers.vehicle_model_code, imm: dateImm }).then(res=> {
                console.log(res.data);
                setVehicleVersions(res.data);
                setIsLoadingVehicleVersions(false);
            })
        }

    },[answers.vehicle_model_code, answers.vehicle_month, answers.vehicle_year])

    if(isLaoding){
        return (
            <div className="d-flex content-laoding">
                <div className="text-center">
                    <img className="loading-gif" src={LoadingGif} alt="Laoding indicator"/><br/>Attendere prego
                </div>
            </div>
        )
    }
 
    return (
        <div className="container-fluid">
          
            <div className="d-flex align-content-center">
                <ProgressBar activeStep={index} steps={steps}/>
            </div>
            <div>
                {isSubmitting && 
                    <div className="stopInteraction">
                        <div className="black-cover"></div>
                        <span>
                            <div className="text-center">
                                <img className="loading-gif" src={LoadingGif}  alt="laoding indicator"/><br/>Attendere prego
                            </div>
                        </span>
                    </div>
                }
                <div className=" row title-questionnaire">
                    <div className="quote-h2 divider"><h2>{title}</h2></div>
                </div>
                {index === 1 &&
                    <div className="form-group" id="index-1">
                        <InputRadio title="Il contraente è" options={genders} name="gender" onChange={(value) => updateFormData({gender:value})}/>
                        <InputDate label="Data di nascita" id="date_of_birth" onChange={(value) => updateFormData({date_of_birth:value})} minDate="1922-01-01" maxDate="2021-01-01"/>
                        <InputBirthPlace 
                            label="Luogo di nascita" 
                            id="commune_of_birth_code"
                            onChange={(item)=>updateFormData({
                                commune_of_birth_code: item.cadastral_code,
                                province_of_birth_code: item.communal_territory.car_plate_symbol,
                                born_abroad: item.born_abroad, 
                            })}
                            options={municipalities} 
                        />
                        <InputAddress placeholder="Indirizzo" label="Indirizzo" onAddressChange={(value) => updateFormData({address:value})} onHouseNumberChange={(value) => updateFormData({house_number:value})}/>
                        <InputSelectWithSearch placeholder="Comune" label="Residenza" name="residence_commune_code" onChange={(item) => updateFormData({residence_commune_code:item.cadastral_code, residence_province_code: item.communal_territory.car_plate_symbol})} options={municipalities} returnType={"object"} countryCode="cadastral_code">
                            <InputText type="number" placeholder="-Codice Postale-" name="postal_code" id="postal_code" nostyle={1} onChange={(value)=>updateFormData({postal_code:value})} />
                        </InputSelectWithSearch>
                        <InputRadio title="Figli conviventi?" id="prove" options={flagResponse} name="children" onChange={(value) => updateFormData({children:value})}/>
                        <InputSelect placeholder="Stato civile" label="Stato civile" name="civil_status_id" id="marital" options={formData.marital_statuses} onChange={(value)=>updateFormData({civil_status_id: value})}/>
                        <InputSelect placeholder="Titolo di studio" label="Titolo di studio" name="education_level_id" id="educational" options={formData.qualifications} onChange={(value)=>updateFormData({education_level_id: value})} />
                        <InputSelect placeholder="Professione" label="Professione" name="profession_id" id="profession" options={formData.professions} onChange={(value)=>updateFormData({profession_id: value})}/>
                        <InputRadio title="Il contraente è anche il conducente abituale del veicolo?" options={flagResponse} name="contractor_is_driver" onChange={(value) => updateFormData({contractor_is_driver:value})}/>
                        <InputRadio title="Il contraente è anche proprietario dell auto?" options={flagResponse} name="contractor_is_owner" onChange={(value) => updateFormData({contractor_is_owner:value})}/>
                    
                    </div>
                }
                {index === 2 &&
                    <div className="form-group" id="index-2">
                        <InputText id="vehicle_plate" validator={validateCarPlate} name="vehicle_plate" label="Targa dell auto" pattern="/^[A-Z]{2}[0-9]{3}[A-Z]{2} *$/" onChange={(value)=> updateFormData({vehicle_plate:value})} className="uppercase"/>
                        <InputSelect label="Data di prima immatricolazione" name="vehicle_month" id="month" placeholder="-Mese-" options={months} onChange={(value)=>updateFormData({vehicle_month:value})}>
                            <InputSelect name="vehicle_year" id="year" placeholder="-Anno-" options={years} nostyle={1} onChange={(value)=>updateFormData({vehicle_year:value})}/>
                        </InputSelect>
                        {answers.vehicle_month && answers.vehicle_year? 
                        <>
                        <InputSelectWithSearch placeholder="Marca" label="Marca" name="vehicle_brand_code" id="brand" options={brands} onChange={(value)=>updateFormData({vehicle_brand_code:value})} />
                        {answers.vehicle_brand_code && 
                            <>
                                {isLoadingVehicleModels ? <p className="text-center">Loading models...</p> : <InputSelect label="Modello" name="vehicle_model_code" id="template" options={vehicleModels} placeholder="Modello" onChange={(value)=>updateFormData({vehicle_model_code:value})} />}
                                
                                {!isLoadingVehicleModels ? 
                                    IsLoadingVehicleVersions ? <p className="text-center">Loading Versions...</p> : answers.vehicle_model_code && 
                                    <InputSelectTable
                                        TableHeader={
                                            <div className="d-flex">
                                                <div className="col-4">Carburante</div>
                                                <div className="col-1">CC</div>
                                                <div className="col-3">Tipo</div>
                                                <div className="col-4">Descrizione</div>
                                            </div>
                                        }
                                        label="Versione"
                                        name="vehicle_version_code"
                                        id="vehicle_version_code"
                                        options={vehicleVersions}
                                        selected={answers.vehicle_version_code}
                                        onSelectOption={(value) => updateFormData({vehicle_version_code: value})}
                                    />
                                    : ""
                                }
                                
                            </>
                        }
                        {answers.vehicle_version_code &&
                            <>
                                <InputSelect label="Altro alimentatore" name="other_power_supply" id="other_power_supply" placeholder="-Seleziona-" options={power_supply} onChange={(value)=>updateFormData({other_power_supply:value})} />
                                <InputSelect label="Parcheggio auto" name="vehicle_parking" id="vehicle_parking" placeholder="-Seleziona-" options={formData.parking_types} onChange={(value)=>updateFormData({vehicle_parking:value})} />
                                <InputSelect label="Antifurto" name="theft_protection_code" id="theft" placeholder="-Seleziona-" options={formData.theft_protections} onChange={(value)=>updateFormData({theft_protection_code:value})}/>
                                <InputSelect label="Utilizzo" name="vehicle_usage" id="vehicle_usage" placeholder="-Seleziona-" options={usage_types} onChange={(value)=>updateFormData({vehicle_usage:value})}/>
                                <InputSelect label="Km percorsi in un anno" name="predicted_km" id="predicted_km" placeholder="-Seleziona-" options={km_during_one_year} onChange={(value)=>{updateFormData({predicted_km:value})}}/>
                                <InputSelect label="Anno in cui hai comprato l'auto" name="vehicle_purchased_year" id="vehicle_purchased_year" placeholder="-Seleziona-" options={years} onChange={(value)=>{updateFormData({vehicle_purchased_year:value})}}/>
                                <InputSelect label="Auto nel nucleo familiare" name="vehicles_owned"  id="vehicles_owned" placeholder="-Seleziona-" options={vehiclesAmountInFamily} onChange={(value)=>{updateFormData({vehicles_owned:value})}}/>
                                <InputRadio title="Hai montato il gancio di traino?" paragraph="(iscritta a rimorchiatori, caravan, ecc.)" options={flagResponse} name="tow_hook" id="tow_hook" onChange={(value) => updateFormData({tow_hook:value})}/>
                                <InputSelect label="Anno patente" name="driving_license_year" id="driving_license_year" placeholder="-Seleziona-" options={years} onChange={(value)=>{updateFormData({driving_license_year:value})}}/>
                            </>
                        }
                    </>
                    : 
                    ""
                    }
                    </div>
                }
                {index === 3 &&
                    <div className="form-group" id="index-3">
                        <InputDate minDate="2022-09-30" maxDate="2022-12-31" name="policy_effective_date" id="policy_effective_date" label="Data di inizio della copertura della polizza" paragraph="Date valide: da oggi a un anno da oggi" onChange={(value) => updateFormData({policy_effective_date:value})}/>
                        <InputRadio title="Ci sono altri conducenti?" options={flagResponse} name="other_drivers" onChange={(value) => updateFormData({other_drivers:value})}/>
                        {answers.other_drivers === "si" && <InputText placeholder="(18 - 30)" type="number" min={18} max={30} label="Età del conducente più giovane" name="youngest_age_driver" id="eta" onChange={(value)=>updateFormData({youngest_age_driver:value})}/> }
                        <InputText placeholder="(18 - 30)" type="number" min={18} max={30} label="Età del membro più giovane della famiglia che vive con la patente di guida" name="youngest_age_family_member" id="eta" onChange={(value)=>updateFormData({youngest_age_family_member:value})}/>
                        <InputRadio title="Hai fatto sinistri negli ultimi 6 anni?" name="violations" id="violations" placeholder="-Seleziona-" options={flagResponse} onChange={(value)=>updateFormData({violations:value})}/>
                        {/* TO OD THE FLOW WHEN VIOLATIONS */}
                        <InputSelect label="Classe di merito." name="merit_class" id="merit_class" placeholder="-Seleziona-" options={meritClass} onChange={(value)=>updateFormData({merit_class:value})} />
                        <InputRadio title="Il conducente dichiara: di essere in possesso di patente italiana mai sospesa da 5 anni e con almeno 20 punti, di non aver mai ricevuto sanzioni per ubriachezza, di non aver modificato il veicolo." options={flagResponse} name="mofified_vehicle_and_valid_driving_license" id="mofified_vehicle_and_valid_driving_license" onChange={(value) => updateFormData({mofified_vehicle:value, valid_driving_license:value})}/>
                        
                        {answers.gender === "G" && 
                            <>
                                <InputText id="business_name" name="business_name" label="Ragione sociale" onChange={(value)=> updateFormData({business_name:value})}/>
                                <InputText validator={validateVatNumber} id="vat_number" name="vat_number" label="Partita Iva" onChange={(value)=> updateFormData({vat_number:value})}/>
                                <InputSelect label="Tipologia azienda" name="company_type" id="company_type" placeholder="-Seleziona-" options={companyTypes} onChange={(value)=>updateFormData({company_type:value})} />
                            </>
                        }
                        {/* <InputSelect
                            label="Metodo di pagamento preferito"
                            name="payment_method"
                            id="payment-method"
                            placeholder="-Seleziona-"
                            options={payments}
                        /> */}
                    </div>
                }
                {index === 4 &&
                    <div className="form-group" id="index-4">
                        <InputText id="name" name="name" label="Nome del contraente" onChange={(value)=>updateFormData({name:value})} />
                        <InputText id="surname" name="surname" label="Cognome" onChange={(value)=>updateFormData({surname:value})}/>
                        <InputText type="email" id="email" name="email" label="E-mail" onChange={(value)=>updateFormData({email:value})}/>
                        <InputText id="phone" name="phone" label="Phone" paragraph="Numeri di rete fissa non accettati dalle aziende" onChange={(value)=>updateFormData({phone:value})} />
                        
                        <h5 className="text-center">Informativa Privacy e IVASS</h5>
                        
                        <InputPrivacy
                            label="Dichiaro di voler ricevere via email, ai sensi dell\'articolo 56 del Regolamento 40 IVASS del 02/08/2018, i preventivi personalizzati dalle compagnie assicurative partner di Comparasemplice Broker srl Il metodo sarà'
                            'modificabile una volta contattata l\'azienda prescelta. Dichiaro di aver preso visione delle note informative relative ai prodotti assicurativi qui raggiungibili. Dichiaro di aver letto e di accettare la pre-'
                            'informazioni contrattuali (pdf) ai sensi della normativa vigente ai sensi del D.Lgs. 209/2005. (obbligatorio)"
                            name="declare"
                            id="declare"
                            checked={answers.declare}
                            onChange={() => {
                                let value = !answers.purposes;
                                updateFormData(value, "declare");
                            }}
                        />
                        <InputPrivacy
                            label="Given the privacy policy , I acknowledge that the processing of my data is preliminary to the provision of the services described in articles 2.1 and 2.2 of paragraph 2 PURPOSE AND LEGAL BASIS OF THE PROCESSING (Article'
                            '6, paragraph 1, letters b) and c) of the Privacy Regulation). (obligatory)"
                            name="privacy"
                            id="privacy"
                            checked={answers.privacy}
                            onChange={() => {
                                let value = !answers.purposes;
                                updateFormData(value, "privacy");
                            }}
                        />
                        <InputPrivacy
                            label="Acconsento al trattamento dei miei dati personali per l'invio di comunicazioni promozionali e materiale pubblicitario, l'offerta di prodotti eo servizi propri o di terzi, il compimento di sondaggi e ricerche di mercato,
                                con qualsiasi mezzo compreso in particolare lutilizzo di telefono con operatore e/o sistemi automatizzati (es. SMS, MMS, fax, autorisponditori, notifiche push, social media). (opzionale)"
                            name="personal"
                            id="personal"
                            checked={answers.personal}
                            onChange={() => {
                                let value = !answers.purposes;
                                updateFormData(value, "personal");
                            }}
                        />
                        <InputPrivacy
                            label="Acconsento al trasferimento dei miei dati personali ad altre società con contratti di collaborazione commerciale, diverse dal titolare e dai contitolari del trattamento, per l invio di comunicazioni promozionali e,
                            materiale pubblicitario, offerte di prodotti e/o servizi propri o di terzi, compimento di sondaggi e ricerche di mercato, con qualsiasi mezzo compreso in particolare l utilizzo del telefono con operatore e/o di sistemi automatizzati
                            (es. SMS, MMS, fax, autorisponditori, notifiche push, social media). (opzionale)"
                            name="transfer"
                            checked={answers.transfer}
                            onChange={() => {
                                let value = !answers.purposes;
                                updateFormData(value, "transfer");
                            }}
                        />
                        <InputPrivacy
                            label="Acconsento al trattamento dei miei dati personali per la profilazione per finalità commerciali e di marketing in base alle modalità di utilizzo del Sito, all interesse manifestato nei vari prodotti/servizi ed esposizione a
                            pubblicità nonché per l\'analisi dei dati personali dell\'utente, delle scelte di acquisto e delle scelte di acquisto e delle preferenze comportamentali sul Sito, al fine di strutturare al meglio comunicazioni e personalizzazioni
                            proposte commerciali, per effettuare analisi generali. (opzionale)"
                            name="purposes"
                            checked={answers.purposes}
                            onChange={() => {
                                let value = !answers.purposes;
                                updateFormData(value, "purposes");
                            }}
                        />
                    </div>
                }
            </div>
            {(index >= 1 && index <= 4) && <div className="footer-buttons">
                <div className="d-flex justify-content-between">
                    {index !== 1 && <button className="btn btn-questionnaire back" onClick={prevButton}>Di Ritorno</button> }
                    <button className="btn btn-questionnaire" onClick={nextButton} disabled={!nextStepActive}>{index === 4? "Vai a preventi" : "Continua"}</button>
                </div>
            </div>
            }
        </div>
    );
}
