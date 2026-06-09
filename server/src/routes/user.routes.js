import express from "express";

import {authMiddleware} from "../middlewares/auth.middleware.js";
import {
    essayEvaluation,
    getUserEssay,
    getEssayFeedbackById,
    getUserIELTSScoreData,
    getLeaderBoard, getEssayFeedbackPDFFile, anonymousEssayEvaluation
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/essay/evaluate', authMiddleware, essayEvaluation);
router.get('/essay', authMiddleware, getUserEssay);
router.get('/essay/feedback/:id', authMiddleware, getEssayFeedbackById);
router.get('/progress', authMiddleware, getUserIELTSScoreData);
router.get('/leaderboard', authMiddleware, getLeaderBoard);
router.get('/essay/feedback/:id/download/pdf', authMiddleware, getEssayFeedbackPDFFile);
router.post('/essay/anonymous/evaluate', anonymousEssayEvaluation);

export default router;