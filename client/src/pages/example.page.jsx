import { motion } from "framer-motion";

import UserNavbar from "../components/Navbar/usernavbar.jsx";

import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";

import { navigate } from "../Router.jsx";

export default function ExampleFeedbackPage() {

    const result = {
        overall: 7.5,

        summary:
            "Strong task response with clear arguments and a good range of vocabulary. Minor grammar mistakes prevent a higher band.",

        scores: {
            task_response: 7,
            coherence_and_cohesion: 7.5,
            lexical_resource: 8,
            grammar: 7.5
        },

        feedback: {
            task_response:
                "You answered the question clearly and supported your ideas with relevant examples.",

            coherence_and_cohesion:
                "Your essay structure is logical and easy to follow. Paragraph transitions are mostly smooth.",

            lexical_resource:
                "Good use of advanced vocabulary with only minor repetition.",

            grammar:
                "Grammar is generally accurate, though there are occasional sentence structure mistakes."
        },

        annotated_issues: [
            {
                quote:
                    "People is becoming happier because technology.",

                issue:
                    "Incorrect subject-verb agreement and incomplete sentence structure.",

                suggestion:
                    "Use: 'People are becoming happier because of technology.'"
            },

            {
                quote:
                    "Nowadays childrens spend too much time phones.",

                issue:
                    "Plural noun and missing preposition issue.",

                suggestion:
                    "Use: 'Nowadays children spend too much time on phones.'"
            }
        ],

        next_steps: [
            "Practice using more complex sentence structures.",
            "Reduce small grammar mistakes.",
            "Use more topic-specific vocabulary.",
            "Continue improving coherence between paragraphs."
        ]
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">

            <UserNavbar activePage={""} />

            <section className="max-w-4xl mx-auto px-6 py-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Example AI Feedback
                    </h1>

                    <p className="text-gray-600 mt-4">
                        See how RedKalam analyzes IELTS essays with AI.
                    </p>
                </motion.div>

                {/* Topic */}
                <Card className="mt-10 rounded-2xl shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">
                            IELTS Task 2 Topic
                        </h3>

                        <p className="text-gray-700 leading-7">
                            Some people think that technology makes people
                            more socially isolated, while others believe
                            it helps people connect better. Discuss both
                            views and give your opinion.
                        </p>
                    </CardContent>
                </Card>

                {/* Sample Essay */}
                <Card className="mt-6 rounded-2xl shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">
                            Sample Essay
                        </h3>

                        <p className="text-gray-700 leading-8">
                            Technology has dramatically changed the way
                            people communicate in modern society.
                            Some individuals believe that social media
                            and smartphones isolate people from real-life
                            interactions, while others argue that these
                            technologies improve global communication.

                            <br /><br />

                            On the one hand, excessive use of technology
                            can reduce face-to-face communication.
                            Nowadays, many people spend hours on their
                            phones instead of interacting with family
                            members or friends directly. This may weaken
                            personal relationships and increase loneliness.

                            <br /><br />

                            On the other hand, technology allows people
                            to stay connected regardless of distance.
                            Applications such as video calls and messaging
                            platforms make communication faster and easier.
                            For example, families living in different
                            countries can communicate instantly.

                            <br /><br />

                            In my opinion, technology is beneficial when
                            used responsibly. Although it may reduce some
                            real-world interaction, it also creates
                            opportunities for global connection and
                            information sharing.
                        </p>
                    </CardContent>
                </Card>

                {/* AI Result */}
                <div className="mt-10 space-y-6">

                    {/* Overall Score */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <Card className="rounded-2xl shadow-sm">
                            <CardContent className="p-8 text-center">

                                <p className="text-gray-500 text-sm">
                                    Overall IELTS Band
                                </p>

                                <h2 className="text-6xl font-bold mt-2">
                                    {result.overall}
                                </h2>

                                <p className="text-gray-600 mt-4">
                                    {result.summary}
                                </p>

                                <p className="text-sm text-gray-400 mt-4">
                                    🧠 Generated in 42 seconds
                                </p>

                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {Object.entries(result.scores).map(([key, value]) => (
                            <Card
                                key={key}
                                className="rounded-2xl"
                            >
                                <CardContent className="p-6 text-center">

                                    <p className="text-gray-500 text-sm capitalize">
                                        {key.replaceAll("_", " ")}
                                    </p>

                                    <h3 className="text-3xl font-bold mt-2">
                                        {value}
                                    </h3>

                                </CardContent>
                            </Card>
                        ))}

                    </div>

                    {/* Feedback */}
                    <Card className="rounded-2xl">
                        <CardContent className="p-6">

                            <h3 className="text-2xl font-bold mb-6">
                                Detailed Feedback
                            </h3>

                            <div className="space-y-6">

                                {Object.entries(result.feedback).map(
                                    ([key, value]) => (
                                        <div key={key}>

                                            <h4 className="font-semibold text-lg capitalize">
                                                {key.replaceAll("_", " ")}
                                            </h4>

                                            <p className="text-gray-700 mt-2 leading-7">
                                                {value}
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </CardContent>
                    </Card>

                    {/* Improvements */}
                    <Card className="rounded-2xl">
                        <CardContent className="p-6">

                            <h3 className="text-2xl font-bold mb-6">
                                Improvements
                            </h3>

                            <div className="space-y-5">

                                {result.annotated_issues.map(
                                    (issue, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-xl p-4"
                                        >

                                            <p className="font-medium text-red-500">
                                                "{issue.quote}"
                                            </p>

                                            <p className="mt-2 text-gray-700">
                                                {issue.issue}
                                            </p>

                                            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                                                <p className="text-sm text-green-800">
                                                    {issue.suggestion}
                                                </p>
                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="rounded-2xl">
                        <CardContent className="p-6">

                            <h3 className="text-2xl font-bold mb-4">
                                Next Steps
                            </h3>

                            <ul className="space-y-3">

                                {result.next_steps.map((step, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-3"
                                    >

                                        <span className="font-bold">
                                            {index + 1}.
                                        </span>

                                        <span className="text-gray-700">
                                            {step}
                                        </span>

                                    </li>
                                ))}

                            </ul>

                        </CardContent>
                    </Card>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="rounded-2xl border-2 border-black">
                            <CardContent className="p-10 text-center">

                                <h3 className="text-3xl font-bold">
                                    Ready to improve your IELTS score?
                                </h3>

                                <p className="text-gray-600 mt-4">
                                    Get instant AI feedback on your own essays.
                                </p>

                                <Button
                                    className="mt-6 rounded-full px-8 py-2"
                                    onClick={() => navigate("/register")}
                                >
                                    ✍️ Try RedKalam Now
                                </Button>

                            </CardContent>
                        </Card>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}