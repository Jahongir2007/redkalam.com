import { useEffect } from "react";
import { navigate } from "../Router.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";

export default function UserVerificationPage() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        // console.log("URL:", window.location.href);
        const token= params.get("token");

        // console.log("TOKEN:",token);
        if (!token) {
            navigate("/login");
            return;
        }

        localStorage.setItem("userToken", token);

        // Remove token from URL
        window.history.replaceState({}, document.title, "/");

        setTimeout(() => {
            navigate("/user");
        }, 0);

    }, []);

    return <DashboardSkeleton />;
}