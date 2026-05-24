import { Button } from "../components/ui/button.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { motion } from "framer-motion";
import { navigate } from "../Router.jsx";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* 404 Content */}
            <section className="flex-1 flex items-center justify-center px-6">
                <div className="text-center max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-7xl md:text-9xl font-bold tracking-tight"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-2xl md:text-4xl font-semibold"
                    >
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-gray-600 text-lg"
                    >
                        The page you are looking for does not exist or may have
                        been moved.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 flex justify-center gap-4"
                    >
                        <Button
                            className="rounded-full px-6 py-2"
                            onClick={() => navigate("/")}
                        >
                            Back Home
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-full px-6 py-2"
                            onClick={() => navigate("/register")}
                        >
                            Start Writing
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} RedKalam. All rights reserved.
            </footer>
        </div>
    );
}