export default function getAllowedPurchaseYears(yearImm) {
    let minYear = yearImm;
    let maxYear = new Date().getFullYear();
    let y = [];
    for(let i=maxYear;i>=minYear;i--){
        y.push({id: i, name: i, value: i});
    }
    return y;
}