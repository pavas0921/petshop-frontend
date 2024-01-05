import { decomposeColor } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export const verifyTokenExpiration = () => {
    const token = sessionStorage.getItem("token")
    if (token) {
        const decodedToken = jwtDecode(token);
        const {companyId, rolId, userId} = decodedToken
        const exp = decodedToken?.exp;
        const tokenExpDate = new Date(exp * 1000)
        const currentTime = new Date(Date.now())
        if (currentTime > tokenExpDate) {
            sessionStorage.removeItem("token");
            return false
        } else {
           
            return {
                status: true,
                companyId: companyId,
                rolId: rolId,
                userId: userId 
            }
        }

    } else {
        sessionStorage.removeItem("token");
        return false
    }
}