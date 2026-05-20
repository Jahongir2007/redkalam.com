import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
// import {serverHost} from "../config/serverhost.jsx";
import {navigate} from "../Router.jsx";
import {useAuth} from "../hooks/auth.hook.jsx";
import OtpSkeleton from "../components/ui/otp.skeleton.jsx";

export default function OtpVerificationPage() {
    const [otpCode, setOtpCode] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const isAuth = useAuth();

    if (isAuth === null) return <OtpSkeleton />;

    if (!isAuth) {
        navigate("/login");
        return null;
    }

    const handleOtpVerification = async () => {
        try{
            setLoading(true);
            const userToken = localStorage.getItem("userToken");
            // const decodedUserToken = jwtDecode(userToken);
            const res = await fetch(`/api/auth/otp/verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({otpCode}),
            });

            const data = await res.json();
            if(!res.ok){
                console.log(data);
            }

            // setServerResponse(data.message);
            if(data?.message === "Successfully verified" && data?.data?.success){
                navigate("/user");
            }else if(data?.message === "Invalid OTP Code" && !data?.data?.success){
                setServerResponse("OTP code expired or wrong");
            }
        }catch(err){
            console.log("Error on handleLogin()",err);
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
                            Email verification
                        </h1>
                    </div>

                    {serverResponse && (
                        <div className="text-red-700 text-center">{serverResponse}</div>
                    )}

                    {/* Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
                        <Input
                            label="OTP Code"
                            type="text"
                            placeholder="123456"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                        />

                        <Button
                            className="w-full rounded-full py-2 mt-2"
                            onClick={handleOtpVerification}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></span>
                                    Verifying...
                                </>
                            ) : (
                                "Verify"
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