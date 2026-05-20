import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import {serverHost} from "../config/serverhost.jsx";
import {navigate} from "../Router.jsx";
import {useAuth} from "../hooks/auth.hook.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";
import GoogleButton from "../components/ui/googlebutton.jsx";

export default function RegisterPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const isAuth = useAuth();
    if (isAuth === null) return <DashboardSkeleton />;

    if (isAuth) {
        navigate("/user");
    }

    const handleRegister = async () => {
        try{
            setLoading(true);
            const res = await fetch(`${serverHost}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: fullName, email, password}),
            });

            const data = await res.json();
            if(!res?.ok){
                console.log(data);
            }

            if(data?.data?.success && data?.message === "User successfully registered"){
                localStorage.setItem("userToken", data?.data?.userToken);
                navigate("/otp/verification");
            }else if(!data?.data?.success && data?.message === "User already exists"){
                setServerResponse("User with this email already exists");
            }
        }catch(err){
            console.log("Error occured on handleRegister():",err);
        }finally {
            setLoading(false);
        }
    }

    const handleRegisterWithGoogle = async () => {
        try {
            window.location.href = `${serverHost}/api/auth/google`;
        }catch(err){
            console.log("Error occured on handleRegisterWithGoogle():",err);
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
                            Sign Up
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Sign Up to improving your IELTS writing
                        </p>
                    </div>

                    {serverResponse && (
                        <div className="text-red-700 text-center mb-3">{serverResponse}</div>
                    )}

                    {/* Card */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
                        <Input
                            label="Full name"
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            className="w-full rounded-full py-2 mt-2 flex items-center justify-center gap-2"
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></span>
                                    Registering...
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </Button>

                        <div className="mt-3 mb-3">
                            <GoogleButton onClick={handleRegisterWithGoogle} loading={loading}/>
                        </div>

                        <div className="text-center text-sm text-gray-500 mt-2">
                            Already have an account?{" "}
                            <a
                                href="/register"
                                className="text-black font-medium hover:underline"
                            >
                                Sign In
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