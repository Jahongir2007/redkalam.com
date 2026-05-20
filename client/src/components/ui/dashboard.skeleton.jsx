import { Skeleton } from "../ui/skeleton.jsx";

export default function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-white text-gray-900">

            {/* Navbar skeleton */}
            <div className="h-16 border-b px-6 flex items-center">
                <Skeleton className="h-6 w-32" />
            </div>

            {/* Header */}
            <section className="px-6 py-10 max-w-6xl mx-auto">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96 mt-3" />
            </section>

            {/* Stats */}
            <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 border rounded-2xl">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16 mt-3" />
                    </div>
                ))}
            </section>

            {/* Actions */}
            <section className="px-6 py-10 max-w-6xl mx-auto flex gap-4">
                <Skeleton className="h-10 w-40 rounded-full" />
                <Skeleton className="h-10 w-40 rounded-full" />
            </section>

            {/* Cards */}
            <section className="px-6 pb-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="p-6 border rounded-2xl">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4 mt-4" />
                        <Skeleton className="h-10 w-full mt-6 rounded-full" />
                    </div>
                ))}
            </section>
        </div>
    );
}