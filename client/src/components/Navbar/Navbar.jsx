import { useState } from "react";
import { Link, navigate } from "../../Router.jsx";

export default function Navbar() {
    const [active, setActive] = useState("home");

    const linkClass = (name) =>
        `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-black ${
            active === name ? "bg-black text-white" : "text-gray-600"
        }`;

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
            {/* Logo */}
            <div className="text-lg font-bold tracking-tight">RedKalam</div>

            {/* Links */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                <button onClick={() => {
                    setActive("home")
                    navigate("/")
                }} className={linkClass("home")}>
                    Home
                </button>
                <button onClick={() => {
                    setActive("writing")
                    navigate("/writing")
                } } className={linkClass("writing")}>
                    Writing
                </button>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-black">
                    <Link to={"/login"}>Sign In</Link>
                </button>
                <button className="px-4 py-2 text-sm bg-black text-white rounded-full hover:opacity-90">
                    <Link to={"/register"}>Sign Up</Link>
                </button>
            </div>

            {/* Mobile (simple fallback) */}
            <div className="md:hidden flex gap-2">
                <button className="text-sm">Menu</button>
            </div>
        </nav>
    );
}
