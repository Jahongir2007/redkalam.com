import {
    // BarChart,
    // Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import {useAuth} from "../hooks/auth.hook.jsx";
import DashboardSkeleton from "../components/ui/dashboard.skeleton.jsx";
import {navigate} from "../Router.jsx";
import UserNavbar from "../components/Navbar/usernavbar.jsx";
// import {serverHost} from "../config/serverhost.jsx";

export default function ProgressPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const isAuth = useAuth();

    useEffect(() => {
        const getUserIELTSScores = async () => {
            try {
                setLoading(true);
                const userToken = localStorage.getItem("userToken");

                const res = await fetch(`/api/user/progress`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userToken}`
                    }
                });

                const data = await res.json();
                if(!res.ok){
                    console.log(data);
                }

                console.log(data);
                const chartData = data.data.scores.map(score => ({
                    date: new Date(score.createdAt).toLocaleDateString(),
                    overall: score.result.overall
                }));
                setData(chartData);
            }catch (err){
                console.log(err);
            }finally {
                setLoading(false);
            }
        }

        getUserIELTSScores();
    }, []);

    if (isAuth === null) return <DashboardSkeleton />;

    if (!isAuth) {
        navigate("/login");
        return null;
    }

    // const scores = [
    //     { date: "2026-05-01", score: 6.5 },
    //     { date: "2026-05-05", score: 7.0 },
    //     { date: "2026-05-10", score: 7.5 },
    //     { date: "2026-05-15", score: 8.0 },
    // ];

    return (
        <div className="min-h-screen bg-white text-gray-900">

            <UserNavbar activePage={""} />

            <div style={{ height: 400 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />

                        <YAxis domain={[0, 9]} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="overall"
                            stroke="black"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}