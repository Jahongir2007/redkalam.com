import { useEffect } from "react";
import { navigate } from "../Router.jsx";

export default function LogoutPage() {
    useEffect(() => {
        localStorage.removeItem("userToken");
        navigate("/login");
    }, []);

    return null;
}