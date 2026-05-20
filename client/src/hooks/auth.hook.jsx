import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
// import {serverHost} from "../config/serverhost.jsx";

export function useAuth() {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if(!token){
            setIsAuth(false);
            return;
        }

        try{
            const decodedToken = jwtDecode(token);

            if(decodedToken.exp < Date.now() / 1000){
                const leftTime = decodedToken.exp - Date.now() / 1000;
                const oneDayInSeconds = 24 * 60 * 60;
                if(leftTime <= oneDayInSeconds){
                    const refreshUserToken = async () => {
                        try{
                            const res = await fetch(`/api/token/refresh`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                }
                            });

                            const data = await res.json();
                            if(!res.ok){
                                console.log("Response is not ok on refreshing data", data);
                            }

                            if(data.message === "User token refreshed" && data.data.success){
                                localStorage.setItem("userToken", data.data.userToken);
                                setIsAuth(true);
                            }else{
                                console.log("Response is not ok on refreshing token", data);
                            }
                        }catch(err){
                            console.log("Error on refreshUserToken()",err);
                        }
                    }

                    refreshUserToken();
                }
                localStorage.removeItem("userToken");
                setIsAuth(false);
            }else{
                setIsAuth(true);
            }
        }catch(err){
            console.log("JWT decode error:", err);
            localStorage.removeItem("userToken");
            setIsAuth(false);
        }
        setIsAuth(!!token);
    }, []);

    return isAuth;
}