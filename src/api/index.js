import ApiService from "../services/ApiService";
import StorageService from "../services/StorageService";

const Storage = new StorageService();
const Service = new ApiService();

export const startSession = async () => Service.startSession("/sanctum/csrf-cookie");
export const loginUser = async (data) => Service.postData("/login", data);
// QUOTE
export const getNewQuote = async (data) => Service.postData("/request/quote", data);
export const getNewProfessionQuote = async (data) => Service.postData("/request/profession/quote", data);
export const getVehicleQuotes = async ({requestToken}) => Service.getData(`/quotes/vehicle/${requestToken}`);
// #formData
export const getMunicipalities = async () => Service.getData("/communes");
export const getVehicleBrands = async () => Service.getData("/vehicle-makes");
export const getFormData = async () => Service.getData("/service-models");
export const getVehicleModels = async ({make_id}) => Service.getData(`/vehicle-models?make_id=${make_id}`);
export const getVehicleVersions = async ({model_id,year,month}) => Service.getData(`/vehicle-versions?model_id=${model_id}&year=${year}&month=${month}`);
export const getProfessions = async () => Service.getData(`/profession/data`);
export const getProfessionQuotes = async ( {requestToken, extensions} ) => {
    let params = "?"
    if(extensions && extensions.length){
        extensions.forEach((element, index) => {
            params += element;
            if(index < extensions.length){
                params += '&';
            }
        });
    }
    return Service.getData(`/quotes/profession/${requestToken}${params==="?"? "" : params}`);
}
//STOREAGE API's
export const storageSetSelectedProfession = (profession) => Storage.saveSelectedProfession(profession);
export const storageGetSelectedProfession = () => Storage.getSelectedProfession();
