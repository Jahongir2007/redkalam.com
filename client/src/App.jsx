import {Router} from "./Router.jsx";
import LandingPage from "./pages/landing.page.jsx";
import LoginPage from "./pages/login.page.jsx";
import RegisterPage from "./pages/register.page.jsx";
import OtpVerificationPage from "./pages/otp.page.jsx";
import UserDashboard from "./pages/user.page.jsx";
import ResendOtpVerificationPage from "./pages/resendotp.page.jsx";
import ForgotPasswordOtpVerificationPage from "./pages/forgotpasswordotp.page.jsx";
import ForgotPasswordPage from "./pages/forgotpassword.page.jsx";
import ResetPasswordPage from "./pages/resetpassword.pages.jsx";
import LogoutPage from "./pages/logout.page.jsx";
import WritePage from "./pages/writing.page.jsx";
import UserVerificationPage from "./pages/user.verification.page.jsx";
import FeedbackPage from "./pages/feedback.page.jsx";
import ProgressPage from "./pages/progress.page.jsx";
import LeaderboardPage from "./pages/leaderboard.page.jsx";
import ExampleFeedbackPage from "./pages/example.page.jsx";
import NotFoundPage from "./pages/notfound.jsx";
import WriteAnonymouslyPage from "./pages/writinganonymously.page.jsx";

const routes = {
    "/": LandingPage,
    "/login": LoginPage,
    "/register": RegisterPage,
    "/otp/verification": OtpVerificationPage,
    "/user": UserDashboard,
    "/resend/otp": ResendOtpVerificationPage,
    "/forgot/password/otp/verification": ForgotPasswordOtpVerificationPage,
    "/forgot/password": ForgotPasswordPage,
    "/reset/password": ResetPasswordPage,
    "/logout": LogoutPage,
    "/writing": WritePage,
    "/auth/google/callback": UserVerificationPage,
    "/feedback": FeedbackPage,
    "/progress": ProgressPage,
    "/leaderboard": LeaderboardPage,
    "/example": ExampleFeedbackPage,
    "/writing/anonymously": WriteAnonymouslyPage,
    "/404": NotFoundPage,
};

export default function App() {
    return (
        <div>
            <Router routes={routes} />
        </div>
    );
}