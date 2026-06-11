import { Card, CardContent } from "../components/ui/card.jsx";
import UserNavbar from "../components/Navbar/usernavbar.jsx";
import { useEffect, useState } from "react";
// import { serverHost } from "../config/serverhost.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";
import {Copy, Download} from "lucide-react";
import {Button} from "../components/ui/button.jsx";

export default function FeedbackPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(window.location.search);
    const essayId = params.get("id");

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const token = localStorage.getItem("userToken") ?? "Unknown";

                const res = await fetch(`/api/user/essay/feedback/${essayId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = await res.json();
                setData(result.data.essayAndEssayFeedback);
                console.log(result.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (!data) {
        return (
            <div className="p-10 text-center text-gray-500">
                No feedback found
            </div>
        );
    }

    const { result, essay, topic } = data;

    const handlePDFFileDownload = async (essayId) => {
        try{
            const userToken = localStorage.getItem("userToken") ?? 'Unknown';
            const res = await fetch(`/api/user/essay/feedback/${essayId}/download/pdf`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            });

            // const data = await res.json();
            // const text = await res.text();
            // console.log("Response of handlePDFFileDownload()", data);
            // console.log("Response of handlePDFFileDownload()", text);
            if(!res.ok){
                console.log("Essay feedback pdf download res data", res);
            }

            const blob = await res.blob(); // ✅

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            a.download = "essay-feedback.pdf";

            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        }catch(err){
            console.error("Error occured on handlePDFFileDownload()",err);
        }
    }

    const handleCopyFeedback = async () => {
        if (!result) return;

        const text = `
            Overall IELTS Band: ${result?.overall}
            
            Summary:
            ${result?.summary}
            
            Scores:
            ${Object.entries(result?.scores)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")}
            
            Detailed Feedback:
            ${Object.entries(result?.feedback)
            .map(([key, value]) => `${key}:\n${value}`)
            .join("\n\n")}
            
            Improvements:
            ${result?.annotated_issues
            .map(
                (issue, i) =>
                    `${i + 1}. "${issue?.quote}"
            Issue: ${issue?.issue}
            Suggestion: ${issue?.suggestion}`
            )
            .join("\n\n")}
            
            Next Steps:
            ${result?.next_steps
            .map((step, i) => `${i + 1}. ${step}`)
            .join("\n")}
        `;

        await navigator.clipboard.writeText(text);

        // alert("Copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <UserNavbar activePage={"feedback"} />

            <section className="max-w-5xl mx-auto px-6 py-12">

                {/* HEADER */}
                <h1 className="text-3xl font-bold text-center">
                    Your Essay Feedback
                </h1>
                <p className="text-gray-500 text-center mt-2">
                    AI analysis of your IELTS writing performance
                </p>

                <div className="flex justify-end gap-3 mt-3 mb-3">
                    <Button
                        onClick={handleCopyFeedback}
                        className="rounded-full px-6 py-2 flex items-center gap-2"
                    >
                        <Copy className="h-4 w-4" />
                        <span>Copy Feedback</span>
                    </Button>

                    <Button
                        onClick={() => handlePDFFileDownload(essayId)}
                        className="rounded-full px-6 py-2 flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                    </Button>
                </div>

                {/* BIG SCORE CARD */}
                <Card className="mt-10 rounded-2xl shadow-sm">
                    <CardContent className="p-10 text-center">
                        <p className="text-gray-500">Overall Band Score</p>

                        <h1 className="text-6xl font-bold mt-3">
                            {result?.overall}
                        </h1>

                        <p className="text-gray-600 mt-4">
                            {result?.summary}
                        </p>
                    </CardContent>
                </Card>

                {/* SCORES GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {Object.entries(result?.scores || {}).map(([key, value]) => (
                        <Card key={key} className="rounded-2xl">
                            <CardContent className="p-6 text-center">
                                <p className="text-gray-500 text-sm">
                                    {key}
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    {value}
                                </h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ESSAY TOPIC */}
                <Card className="mt-6 rounded-2xl">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">
                            Topic
                        </h3>
                        <p className="text-gray-700">{topic}</p>

                        <h3 className="font-semibold text-lg mt-4 mb-2">
                            Your Essay
                        </h3>
                        <p className="text-gray-600 whitespace-pre-line">
                            {essay}
                        </p>
                    </CardContent>
                </Card>

                {/* FEEDBACK */}
                <Card className="mt-6 rounded-2xl">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-4">
                            Detailed Feedback
                        </h3>

                        <div className="space-y-5">
                            {Object.entries(result?.feedback || {}).map(
                                ([key, value]) => (
                                    <div key={key}>
                                        <h4 className="font-semibold text-lg">
                                            {key}
                                        </h4>
                                        <p className="text-gray-700 mt-1 leading-7">
                                            {value}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* ISSUES */}
                <Card className="mt-6 rounded-2xl">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-4">
                            Writing Issues
                        </h3>

                        <div className="space-y-4">
                            {(result?.annotated_issues || []).map(
                                (issue, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-xl p-4"
                                    >
                                        <p className="text-red-500 font-medium">
                                            "{issue.quote}"
                                        </p>

                                        <p className="mt-2 text-gray-700">
                                            {issue.issue}
                                        </p>

                                        <div className="mt-3 bg-green-50 border border-green-200 p-3 rounded-lg">
                                            <p className="text-green-700 text-sm">
                                                {issue.suggestion}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* NEXT STEPS */}
                <Card className="mt-6 rounded-2xl">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-4">
                            Next Steps
                        </h3>

                        <ul className="space-y-2">
                            {(result?.next_steps || []).map((step, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="font-bold">
                                        {i + 1}.
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}