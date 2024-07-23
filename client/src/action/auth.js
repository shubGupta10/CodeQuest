import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';

const getBrowserInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes("edg/")) return "Edge";
    if (userAgent.includes("opr/")) return "Opera";
    if (userAgent.includes("brave")) return "Brave";
    if (userAgent.includes("firefox/")) return "Firefox";
    if (userAgent.includes("safari/") && !userAgent.includes("chrome")) return "Safari";
    if (userAgent.includes("chrome/") && !userAgent.includes("edg/") && !userAgent.includes("opr/") && !userAgent.includes("brave")) return "Chrome";
    
    return "Unknown";
};

export const signup = (authdata, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(authdata);
        dispatch({ type: "AUTH", data });
        localStorage.setItem('Profile', JSON.stringify(data));
        localStorage.setItem('Browser', getBrowserInfo());
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem('Profile'))));
        dispatch(fetchallusers());
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

export const login = (authdata, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(authdata);
        dispatch({ type: "AUTH", data });
        localStorage.setItem('Profile', JSON.stringify(data));
        localStorage.setItem('Browser', getBrowserInfo());
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};