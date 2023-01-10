import { validateBirthday, validateCarPlate, validateItalianPostCode } from "..";

const isNullOrEmpty = (item) => {
    if(item === null) return true
    if(item === "") return true
    return false
}

const checkFirstStep = (answers) => {
    const { 
        gender,
        date_of_birth,
        commune_of_birth_code,
        province_of_birth_code,
        born_abroad,
        residence_commune_code,
        residence_province_code,
        postal_code,
        house_number,
        children,
        civil_status_id,
        education_level_id,
        profession_id,
        address, 
        contractor_is_driver,
        contractor_is_owner
    } = answers;
    // console.log(answersFirstStep);
    if(isNullOrEmpty(gender)) return { error:true, message:"Tutti i campi sono obbligatori! Gender is required!" }
    if( !validateBirthday(date_of_birth) ) return { error:true, message:"Tutti i campi sono obbligatori! Birthday is required!" }
    if(!born_abroad) {
        if(
            isNullOrEmpty(commune_of_birth_code) || 
            isNullOrEmpty(province_of_birth_code)
        ) return { error:true, message:"Tutti i campi sono obbligatori! Birth place is required!" }
    }
    if(isNullOrEmpty(address)) return { error:true, message:"Tutti i campi sono obbligatori! Address is required!" }
    if(isNullOrEmpty(house_number)) return { error:true, message:"Tutti i campi sono obbligatori! House number is required!" }
    if( 
        isNullOrEmpty(residence_commune_code) || 
        isNullOrEmpty(residence_province_code)
    ) return { error:true, message:"Tutti i campi sono obbligatori! Residence is required!" }
    if(!validateItalianPostCode(postal_code)) return { error:true, message:"Tutti i campi sono obbligatori! Please enter correct postal code !" }
    if(isNullOrEmpty(children)) return { error:true, message:'Tutti i campi sono obbligatori! Rispondi a questa domanda "Figli conviventi?"!' }
    if(isNullOrEmpty(civil_status_id)) return { error:true, message:"Tutti i campi sono obbligatori! Seleziona Stato civile!" }
    if(isNullOrEmpty(education_level_id)) return { error:true, message:"Tutti i campi sono obbligatori! Seleziona Titolo di studio!" }
    if(isNullOrEmpty(profession_id)) return { error:true, message:"Tutti i campi sono obbligatori! Seleziona professione!" }
    if(isNullOrEmpty(contractor_is_driver)) return { error:true, message:'Tutti i campi sono obbligatori! Rispondi a questa domanda "Il contraente è anche il conducente abituale del veicolo?"' }
    if(isNullOrEmpty(contractor_is_owner)) return { error:true, message:'Tutti i campi sono obbligatori! Rispondi a questa domanda "Il contraente è anche proprietario dell auto?"' }
    return { error:false, message:"Valid" }
}

const checkSecondStep = (answers) => {
    const {
        vehicle_plate,
        vehicle_month,
        vehicle_year,
        vehicle_brand_code,
        vehicle_model_code,
        vehicle_version_code,
        other_power_supply,
        vehicle_parking,
        theft_protection_code,
        vehicle_usage,
        predicted_km,
        vehicle_purchased_year,
        vehicles_owned,
        tow_hook,
        driving_license_year,
    } = answers;

    if(!validateCarPlate(vehicle_plate)) return { error:true, message: "Tutti i campi sono obbligatori! Si prega di controllare la targa." }
    if(isNullOrEmpty(vehicle_month)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona il mese!" }
    if(isNullOrEmpty(vehicle_year)) return { error:true, message: "Tutti i campi sono obbligatori! Si prega di selezionare l'anno!" }
    if(isNullOrEmpty(vehicle_brand_code)) return { error:true, message: "Tutti i campi sono obbligatori! Cerca la marca del veicolo e seleziona dall'elenco." }
    if(isNullOrEmpty(vehicle_model_code)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona il modello del tuo veicolo!" }
    if(isNullOrEmpty(vehicle_version_code)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona la versione del tuo veicolo!" }
    if(isNullOrEmpty(other_power_supply)) return { error:true, message: "Tutti i campi sono obbligatori! Selezona altro alimentatore!" }
    if(isNullOrEmpty(vehicle_parking)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona il parcheggio!" }
    if(isNullOrEmpty(theft_protection_code)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona il tipo di antifurto!" }
    if(isNullOrEmpty(vehicle_usage))  return { error:true, message: "Tutti i campi sono obbligatori!" }
    if(isNullOrEmpty(predicted_km)) return { error:true, message: "Tutti i campi sono obbligatori!" }
    if(isNullOrEmpty(vehicle_purchased_year)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona il anno in cui hai comprato l'auto!" }
    if(isNullOrEmpty(vehicles_owned)) return { error:true, message: "Tutti i campi sono obbligatori! Seleziona il tipo di antifurto!" }
    if(isNullOrEmpty(tow_hook)) return { error:true, message: "Tutti i campi sono obbligatori!" }
    if(isNullOrEmpty(driving_license_year)) return { error:true, message: "Tutti i campi sono obbligatori!" }
    return { error:false, message:"Valid" }
}

const checkThirdStep = (answers) => {
    console.log({answers})
    const {
        policy_effective_date,
        other_drivers,
        youngest_age_driver,
        youngest_age_family_member,
        violations,
        merit_class,
        mofified_vehicle,
        valid_driving_license,
        business_name,
        vat_number,
        company_type,
        gender,
        guideType,
    } = answers;
    if(isNullOrEmpty(policy_effective_date)) return { error:true, message: "Tutti i campi sono obbligatori!1" }
    if(isNullOrEmpty(other_drivers)) return { error:true, message: "Tutti i campi sono obbligatori!2" }
    if(other_drivers){
        if(isNullOrEmpty(youngest_age_driver)) return { error:true, message: "Tutti i campi sono obbligatori!3" }
    }
    if(isNullOrEmpty(youngest_age_family_member)) return { error:true, message: "Tutti i campi sono obbligatori!4" }
    if(isNullOrEmpty(violations)) return { error:true, message: "Tutti i campi sono obbligatori!5" }
    if(isNullOrEmpty(merit_class)) return { error:true, message: "Tutti i campi sono obbligatori!6" }
    if(isNullOrEmpty(mofified_vehicle)) return { error:true, message: "Tutti i campi sono obbligatori!7" }
    if(isNullOrEmpty(valid_driving_license)) return { error:true, message: "Tutti i campi sono obbligatori!8" }
    if(gender === 'G'){
        if(isNullOrEmpty(business_name)) return { error:true, message: "Tutti i campi sono obbligatori!9" }
        if(isNullOrEmpty(vat_number)) return { error:true, message: "Tutti i campi sono obbligatori!10" }
        if(isNullOrEmpty(company_type)) return { error:true, message: "Tutti i campi sono obbligatori!11" }
    }
    if(isNullOrEmpty(guideType)) return { error:true, message: "Tutti i campi sono obbligatori!12" }
    return { error:false, message:"Valid" }
}

export default function rcVehicleValidator({answers, index}){
    if(index === 1) return checkFirstStep(answers);
    if(index === 2) return checkSecondStep(answers);
    if(index === 3) return checkThirdStep(answers);
    if(index === 4) return checkThirdStep(answers);
    return { error:false, message:"Valid" }
}