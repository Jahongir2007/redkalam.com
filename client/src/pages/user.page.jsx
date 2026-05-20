import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import UserNavbar from "../components/Navbar/usernavbar.jsx";
import { motion } from "framer-motion";
import {useAuth} from "../hooks/auth.hook.jsx";
import {navigate} from "../Router.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";
// import {serverHost} from "../config/serverhost.jsx";
import {useState, useEffect} from "react";

export default function UserDashboard() {
    const [essays, setEssays] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserEssaysAndFeedbacks = async () => {
            try{
                if (loading) return;
                setLoading(true);
                const userToken = localStorage.getItem("userToken") ?? "Unknown";
                const res = await fetch(`/api/user/essay`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userToken}`
                    }
                });
                const data = await res.json();
                if(!res.ok){
                    console.log("Error getting user essay data.", data);
                }

                console.log(data);
                if(data.message === "Essays and feedbacks successfully found." && data.data.success){
                    setEssays(data.data.userEssay);
                }else if(data.message === "Essay not found" && !data.data.success){
                    setEssays([]);
                }
            }catch(err){
                console.log("Error on getUserEssaysAndFeedbacks",err);
            }finally {
                setLoading(false);
            }
        }

        getUserEssaysAndFeedbacks();
    }, [])
    const isAuth = useAuth();

    if (isAuth === null) return <DashboardSkeleton />;

    if (!isAuth) {
        navigate("/login");
        return null;
    }

    // const essays = [
    //     {
    //         title: "Some people think...",
    //         score: 6.5,
    //         date: "Apr 30, 2026",
    //     },
    //     {
    //         title: "In many countries...",
    //         score: 7.0,
    //         date: "Apr 28, 2026",
    //     },
    // ];

    if(loading){
        return <DashboardSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <UserNavbar activePage={"home"} />

            {/* Header */}
            <section className="px-6 py-10 max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    Welcome back 👋
                </motion.h1>
                <p className="text-gray-600 mt-2">
                    Track your IELTS writing progress and improve faster.
                </p>
            </section>

            {/* Stats */}
            <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {[
                    { title: "Total Essays", value: essays.length},
                    { title: "Average Score", value: essays.length
                            ? (
                                essays.reduce(
                                    (acc, essay) =>
                                        acc + (essay.result?.overall || 0),
                                    0
                                ) / essays.length
                            ).toFixed(1)
                            : 0 },
                    { title: "Best Score", value: essays.length
                            ? Math.max(
                                ...essays.map(
                                    e => e.result?.overall || 0
                                )
                            )
                            : 0 },
                ].map((item, i) => (
                    <Card key={i} className="rounded-2xl shadow-sm">
                        <CardContent className="p-6">
                            <p className="text-gray-500 text-sm">{item.title}</p>
                            <h2 className="text-2xl font-bold mt-2">
                                {item.value}
                            </h2>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Actions */}
            <section className="px-6 py-10 max-w-6xl mx-auto flex flex-wrap gap-4">
                <Button className="rounded-full px-6 py-2" onClick={()=> navigate("/writing")}>
                    ✍️ Write New Essay
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-2" onClick={()=> navigate("/progress")}>
                    📊 View Progress
                </Button>
            </section>

            {/* Recent Essays */}
            <section className="px-6 pb-16 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Recent Essays</h2>
                {essays.length === 0 ? (
                        <Card className="rounded-2xl shadow-sm">
                            <CardContent className="p-10 text-center">
                                <h3 className="text-xl font-semibold">
                                    No essays yet
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Start writing your first IELTS essay.
                                </p>
                            </CardContent>
                        </Card>
                    ): (
                    <div className="grid md:grid-cols-2 gap-6">
                        {essays.map((essay) => (
                            <Card key={essay?._id} className="rounded-2xl shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg">
                                        {essay?.topic}
                                    </h3>

                                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                        <span> {new Date(essay?.createdAt).toLocaleDateString()}</span>
                                        <span className="font-semibold text-gray-900">
                                        Band: {essay?.result?.overall ?? "N/A"}
                                    </span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="mt-4 rounded-full w-full"
                                        onClick={() => {
                                            window.location.href = `/feedback?id=${essay._id}`;
                                        }}
                                    >
                                        View Feedback
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="border-t py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} RedKalam. All rights reserved.
            </footer>
        </div>
    );
}