import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import UserNavbar from "../components/Navbar/usernavbar.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";

import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";

import { useAuth } from "../hooks/auth.hook.jsx";
import { navigate } from "../Router.jsx";

// import { serverHost } from "../config/serverhost.jsx";

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);

    const isAuth = useAuth();

    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                if (loading) return;

                setLoading(true);
                const userToken = localStorage.getItem("userToken");

                const res = await fetch(
                    `/api/user/leaderboard`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userToken}`
                        }
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    console.log(
                        "Error getting leaderboard.",
                        data
                    );
                }

                if (
                    data.message ===
                    "Leaderboard successfully found." &&
                    data.data.success
                ) {
                    setLeaderboard(data.data.leaderboard);
                }

            } catch (err) {
                console.log(
                    "Error on getLeaderboard",
                    err
                );
            } finally {
                setLoading(false);
            }
        };

        getLeaderboard();
    }, []);

    if (isAuth === null || loading) {
        return <DashboardSkeleton />;
    }

    if (!isAuth) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <UserNavbar activePage={"leaderboard"} />

            {/* Header */}
            <section className="px-6 py-10 max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    🏆 Leaderboard
                </motion.h1>

                <p className="text-gray-600 mt-2">
                    Top IELTS writers on RedKalam.
                </p>
            </section>

            {/* Top 3 */}
            {leaderboard.length > 0 && (
                <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
                    {leaderboard
                        .slice(0, 3)
                        .map((user, index) => (
                            <motion.div
                                key={user._id}
                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: index * 0.1
                                }}
                            >
                                <Card className="rounded-2xl shadow-sm border-2">
                                    <CardContent className="p-6 text-center">
                                        <div className="text-4xl mb-3">
                                            {index === 0
                                                ? "🥇"
                                                : index === 1
                                                    ? "🥈"
                                                    : "🥉"}
                                        </div>

                                        <h2 className="text-xl font-bold">
                                            {user.username}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            Best IELTS Score
                                        </p>

                                        <div className="text-4xl font-bold mt-4">
                                            {user.bestScore}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                </section>
            )}

            {/* Leaderboard List */}
            <section className="px-6 pb-16 max-w-6xl mx-auto">
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {leaderboard.map((user, index) => (
                                <motion.div
                                    key={user._id}
                                    initial={{
                                        opacity: 0,
                                        x: -20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0
                                    }}
                                    transition={{
                                        delay: index * 0.05
                                    }}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        p-5
                                        hover:bg-gray-50
                                        transition
                                    "
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="
                                                w-10
                                                h-10
                                                rounded-full
                                                bg-gray-100
                                                flex
                                                items-center
                                                justify-center
                                                font-bold
                                            "
                                        >
                                            #{index + 1}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {user.username}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-2xl font-bold">
                                            {user.bestScore}
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            IELTS Band
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Empty State */}
                {leaderboard.length === 0 && (
                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="p-10 text-center">
                            <h3 className="text-xl font-semibold">
                                No leaderboard data yet
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Be the first to submit an essay.
                            </p>

                            <Button
                                className="mt-6 rounded-full"
                                onClick={() =>
                                    navigate("/writing")
                                }
                            >
                                ✍️ Write Essay
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </section>

            {/* Footer */}
            <footer className="border-t py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} RedKalam.
                All rights reserved.
            </footer>
        </div>
    );
}