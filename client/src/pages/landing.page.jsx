import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { motion } from "framer-motion";
import {useAuth} from "../hooks/auth.hook.jsx";
import {navigate} from "../Router.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";
import {useEffect} from "react";

export default function LandingPage() {
    const isAuth = useAuth();

    useEffect(()=> {
        if (isAuth) {
            navigate("/user");
        }
    }, [isAuth]);

    if (isAuth === null) return <DashboardSkeleton />;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Navbar */}
            <Navbar />
            {/* Hero Section */}
            <section className="text-center py-20 px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                >
                    Improve Your IELTS Writing Task 2
                    <br />
                    With AI Feedback
                </motion.h1>

                <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                    RedKalam helps students analyze their essays, get detailed feedback,
                    improve vocabulary, and boost their band score using AI-powered
                    insights.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Button className="rounded-full px-6 py-2" onClick={()=> navigate("/register")}>Start Writing</Button>
                    <Button variant="outline" className="rounded-full px-6 py-2" onClick={()=> navigate("/example")}>
                        See Example
                    </Button>
                </div>
            </section>

            {/* Features */}
            <section className="px-8 py-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                    {
                        title: "Smart Feedback",
                        desc: "Get instant corrections on grammar, coherence, and structure.",
                    },
                    {
                        title: "Vocabulary Boost",
                        desc: "Learn advanced words and phrases to increase your IELTS score.",
                    },
                    {
                        title: "Band Score Evaluation",
                        desc: "Estimate your Writing Task 2 IELTS band score with AI accuracy.",
                    },
                ].map((item, i) => (
                    <Card key={i} className="rounded-2xl shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-600 mt-2">{item.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* How it works */}
            <section className="bg-gray-50 py-16 px-6 text-center">
                <h2 className="text-3xl font-bold">How it works</h2>
                <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {["Write Essay", "Get AI Feedback", "Improve Score"].map(
                        (step, i) => (
                            <div key={i} className="p-6">
                                <div className="text-2xl font-bold">{i + 1}</div>
                                <h3 className="mt-2 font-semibold">{step}</h3>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <h2 className="text-3xl font-bold">Start improving today</h2>
                <p className="text-gray-600 mt-4">
                    Join thousands of students boosting their IELTS writing scores.
                </p>
                <Button className="mt-6 rounded-full px-6 py-2" onClick={()=> navigate("/register")}>
                    Try RedKalam Free
                </Button>
            </section>

            {/* Footer */}
            <footer className="border-t py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} RedKalam. All rights reserved.
            </footer>
        </div>
    );
}
