// import React from "react";
import { Loader2 } from "lucide-react";

export default function GoogleButton({ onClick, loading = false }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 active:scale-[0.99] transition-all rounded-full py-3 px-5 shadow-sm"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-700" />
            ) : (
                <>
                    {/* Google Icon */}
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.13 17.74 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.14-3.09-.4-4.55H24v9.02h12.94c-.56 2.99-2.24 5.52-4.77 7.22l7.73 6C43.98 37.09 46.98 31.38 46.98 24.55z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.54 28.41c-1.01-2.99-1.01-6.22 0-9.21l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.99l7.98-6.58z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-3.63-13.46-8.79l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                    </svg>

                    <span className="text-gray-800 font-semibold text-sm">
            Continue with Google
          </span>
                </>
            )}
        </button>
    );
}
