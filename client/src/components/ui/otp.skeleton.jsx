import { Skeleton } from "../ui/skeleton.jsx";

export default function OtpSkeleton() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">

            {/* Navbar */}
            <div className="h-14 border-b px-6 flex items-center">
                <Skeleton className="h-6 w-32" />
            </div>

            <div className="flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-md space-y-6">

                    {/* Title */}
                    <div className="text-center">
                        <Skeleton className="h-8 w-2/3 mx-auto" />
                    </div>

                    {/* Card */}
                    <div className="border border-gray-100 shadow-sm rounded-2xl p-6 space-y-5">

                        {/* Label */}
                        <Skeleton className="h-4 w-24" />

                        {/* Input */}
                        <Skeleton className="h-10 w-full" />

                        {/* Button */}
                        <Skeleton className="h-10 w-full rounded-full" />

                        {/* Footer text */}
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}