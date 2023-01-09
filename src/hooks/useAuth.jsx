import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StorageService from "../services/StorageService";
import { authActions } from "../app/store";
const Storage = new StorageService();
export default function useAuth(){

    const authUser = useSelector(x => x.auth);
    const dispatch = useDispatch();
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);

    useEffect(()=> {
        const checkAuth = () => {
            if(authUser.token){
                return setIsUserLoggedIn(true);
            }
            let token = Storage.getToken();
            let user = Storage.getUser();
            if(token !== null){
                setIsUserLoggedIn(true);
                dispatch(authActions.setAuth({token,user}));
            }
            
        }
        checkAuth();
    },[authUser.token]);

    return {
        isUserLoggedIn
    }
}