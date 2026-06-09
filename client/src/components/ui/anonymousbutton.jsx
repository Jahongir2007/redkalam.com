import { Loader2, UserRound } from "lucide-react";

export default function AnonymousButton({ onClick, loading = false }) {
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
                    <UserRound className="w-5 h-5 text-gray-700" />

                    <span className="text-gray-800 font-semibold text-sm">
                        Use Anonymously
                    </span>
                </>
            )}
        </button>
    );
}