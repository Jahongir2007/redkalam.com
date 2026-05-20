import express from "express";

import {authMiddleware} from "../middlewares/auth.middleware.js";
import {
    essayEvaluation,
    getUserEssay,
    getEssayFeedbackById,
    getUserIELTSScoreData
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/essay/evaluate', authMiddleware, essayEvaluation);
router.get('/essay', authMiddleware, getUserEssay);
router.get('/essay/feedback/:id', authMiddleware, getEssayFeedbackById);
router.get('/progress', authMiddleware, getUserIELTSScoreData)

export default router;