import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import {serverHost} from "../config/serverhost.jsx";
import {navigate} from "../Router.jsx";

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleResetPassword = async () => {
        try{
            setLoading(true);
            const userEmailForPasswordChanging = localStorage.getItem("userEmailForPasswordChanging");
            // const decodedUserToken = jwtDecode(userToken);
            const res = await fetch(`${serverHost}/api/auth/password/reset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: userEmailForPasswordChanging, password: newPassword}),
            });

            const data = await res.json();
            if(!res.ok){
                console.log(data);
            }

            if(data?.message === "Password successfully changed" && data?.data?.success){
                setSuccessMessage("New password successfully set");
                setTimeout(()=> navigate("/login"), 2000);
            }else{
                setServerResponse(data?.message);
            }
        }catch(err){
            console.log("Error on handleResetPassword()",err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <Navbar />

            <div className="flex items-center justify-center px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">
                            Reset password
                        </h1>
                    </div>

                    {successMessage && (
                        <div className="text-green-700 text-center">{successMessage}</div>
                    )}

                    {serverResponse && (
                        <div className="text-red-700 text-center">{serverResponse}</div>
                    )}

                    {/* Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
                        <Input
                            label="New Password"
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <Button
                            className="w-full rounded-full py-2 mt-2"
                            onClick={handleResetPassword}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></span>
                                    Reseting password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>

                        <div className="text-center text-sm text-gray-500 mt-2">
                            Don’t you recieve OTP code?{" "}
                            <a
                                href="/resend/otp"
                                className="text-black font-medium hover:underline"
                            >
                                Resend code
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/*<footer className="border-t py-6 text-center text-sm text-gray-500">*/}
            {/*    © {new Date().getFullYear()} RedKalam. All rights reserved.*/}
            {/*</footer>*/}
        </div>
    );
}