import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import {serverHost} from "../config/serverhost.jsx";
import {navigate} from "../Router.jsx";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPasswordByEmail = async () => {
        try{
            if(email.length === 0){
                setServerResponse("Please enter a valid email");
                return;
            }
            setLoading(true);
            const res = await fetch(`${serverHost}/api/auth/forgot/password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if(!res.ok){
                console.log(data);
            }

            if(data?.message === "Otp Code For Password Reset sent to Email" && data?.data?.success){
                localStorage.setItem("userEmailForPasswordChanging", email);
                navigate("/forgot/password/otp/verification");
            }else if(!data?.data?.success && data?.message === "User not exist"){
                setServerResponse("User with that email does not exist");
            }
        }catch(err){
            console.log("Error occured on handleForgotPasswordByEmail():",err);
        }finally {
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
                            Forgot your password?
                        </h1>
                    </div>

                    {serverResponse && (
                        <div className="text-red-700 text-center">{serverResponse}</div>
                    )}

                    {/* Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            className="w-full rounded-full py-2 mt-2"
                            onClick={handleForgotPasswordByEmail}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></span>
                                    Sending OTP code...
                                </>
                            ) : (
                                "Send Code For Password Reset"
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