export function Button({ children, className = "", variant = "default", ...props }) {
    const base =
        "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200";

    const variants = {
        default: "bg-black text-white hover:opacity-90",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}