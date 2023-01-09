import CodiceFiscale from "codice-fiscale-js";

export default function generateFiscalCode({name, surname, gender, day, month, year, birthplace, birthplaceProvincia}){
    let cf = new CodiceFiscale({name, surname, gender, day, month, year, birthplace, birthplaceProvincia});
    return cf.code;
}