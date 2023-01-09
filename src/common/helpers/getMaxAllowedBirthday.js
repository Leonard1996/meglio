export default function getMaxAllowedBirthday() {
    let maxBirthDate = new Date();
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);
    return maxBirthDate.toISOString().split("T")[0];
}