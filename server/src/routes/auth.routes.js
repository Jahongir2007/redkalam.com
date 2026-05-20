import express from 'express';
import {
    userLogin, userRegister, userVerification, userVerificationByResendOtp, forgotPassword,
    forgotPasswordOtpVerification, resetPassword, refreshUserToken, logInOrRegisterUserWithGoogle,
    logInOrRegisterUserWithGoogleCallback, checkGoogleCredential
} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/otp/verification', authMiddleware, userVerification);
router.post('/otp/verification/resend', authMiddleware, userVerificationByResendOtp);
router.post('/forgot/password', forgotPassword);
router.post('/forgot/password/otp/verification', forgotPasswordOtpVerification);
router.post('/password/reset', resetPassword);
router.get('/token/refresh', authMiddleware, refreshUserToken);
router.get('/google', logInOrRegisterUserWithGoogle);
router.get('/google/callback', logInOrRegisterUserWithGoogleCallback);
router.get('/check/google/credential', checkGoogleCredential);

export default router;

