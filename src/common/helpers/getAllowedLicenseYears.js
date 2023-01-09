export default function getAllowedLicenseYears(birthday){
    let bDay = new Date(birthday);
    let bYear = bDay.getFullYear();
    let minYear = bYear+17
    let maxYear = new Date().getFullYear();
    let y = [];
    for(let i=maxYear;i>=minYear;i--){
        y.push({id: i, name: i, value: i});
    }
    return y;
}