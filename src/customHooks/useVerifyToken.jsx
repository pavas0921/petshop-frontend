import { jwtDecode } from "jwt-decode";
import React, {useEffect} from 'react';

const useVerifyToken = () => {
    const token = sessionStorage.getItem("token")

    if (token) {
        const decodedToken = jwtDecode(token);
        const exp = decodedToken?.exp;
        const tokenExpDate = new Date(exp * 1000)
        const currentTime = new Date(Date.now())
        if (currentTime > tokenExpDate) {
            sessionStorage.removeItem("token");
            return false
        } else {
            return true
        }

    } else {
        sessionStorage.clear();
        return false
    }

}

export default useVerifyToken 