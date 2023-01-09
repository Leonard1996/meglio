export default function getAllowedPolicyEffectDate(type) {
    if(type === 'min') {
        let dt = new Date();
        return dt.toISOString().split("T")[0];
    }
    let dt = new Date();
    dt.setMonth(dt.getMonth()+2);
    return dt.toISOString().split("T")[0];
}