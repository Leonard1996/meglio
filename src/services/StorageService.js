import parseJson from "../common/helpers/parseJSON";
import stringifyJson from "../common/helpers/stringifyJSON";

export default class StorageService {

    getToken() {
        const tokenString = localStorage.getItem('token');
        return tokenString;
    }

    setToken(userToken) {
        localStorage.setItem('token', userToken);
    }

    removeToken(){
        localStorage.removeItem('token');
    }

    getUser() {
       let user =  localStorage.getItem('user');
       if(user !== null){
            return parseJson(user);
       }else{
            return null
       }
    }

    setUser(user) {
        localStorage.setItem('user', stringifyJson(user));
    }

    removeUser(){
        localStorage.setItem('user');
    }

    saveSelectedProfession(profession) {
        localStorage.setItem('profession', stringifyJson(profession));
    }

    getSelectedProfession() {
        return parseJson(localStorage.getItem('profession'));
    }

    setVehicleQuoteAnswers(answers) {
        localStorage.setItem('vqa', stringifyJson(answers));
    }
    getVehicleQuoteAnswers() {
        return parseJson(localStorage.getItem('vqa'));
    }
}


