export function validateCarPlate(value){
    let pattern = /^[A-Z]{2}[0-9]{3}[A-Z]{2} *$/;
    return value.toUpperCase().match(pattern);
}
export function validateVatNumber(value){
    let pattern = /^[0-9]{11}$/;
    return value.match(pattern);
}
export function validateItalianPostCode(value){
    let pattern = /^[0-9]{5}$/;
    return value.match(pattern);
}
export function validateBirthday(date){
    let maxBirthDate = new Date();
        maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);
    let BDay = new Date(date);
    return BDay < maxBirthDate;
}