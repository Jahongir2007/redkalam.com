import {client} from "../../index.js";
import {
    essayFeedbackSave,
    getUserEssayAndFeedbackById,
    getEssayFeedbackByIdFromDb,
    getUserIELTSScores
} from "../services/user.service.js";

const EVALUATOR_SYSTEM = `You are a certified IELTS Writing Task 2 examiner.
Score the essay on the four official band descriptors, each 0–9 (allow half bands):
- Task Response (TR)
- Coherence and Cohesion (CC)
- Lexical Resource (LR)
- Grammatical Range and Accuracy (GRA)

Compute the overall band as the rounded average per IELTS rules
(.25 rounds up to .5, .75 rounds up to next whole band).

Respond ONLY with valid JSON in this exact shape, no prose, no markdown fences:
{
  "overall": 7.0,
  "scores": { "TR": 7, "CC": 7, "LR": 6.5, "GRA": 7 },
  "feedback": {
    "TR": "…2–3 sentences referencing specific parts of the essay…",
    "CC": "…",
    "LR": "…",
    "GRA": "…"
  },
  "annotated_issues": [
    { "quote": "exact phrase from essay", "issue": "…", "suggestion": "…" }
  ],
  "summary": "2–3 sentence overall summary",
  "next_steps": ["concrete improvement 1", "concrete improvement 2", "concrete improvement 3"]
}`;

export const essayEvaluation = async (req, res, next) => {
    try{
        const {userId} = req.user;
        const {prompt, essay} = req.body;

        if(!prompt){
            return res.status(400).json({
                message: "Topic is not sent by user",
                data: {
                    success: false
                }
            });
        }

        if (!essay || essay.split(/\s+/).length < 50) {
            return res.status(400).json({
                message: "Essay too short or not entered",
                data: {
                    success: false,
                }
            });
        }

        const msg = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 2000,
            system: EVALUATOR_SYSTEM,
            messages: [
                { role: "user", content: `TASK PROMPT:\n${prompt}\n\nCANDIDATE ESSAY:\n${essay}` },
            ],
        });

        const text = msg.content[0].type === "text" ? msg.content[0].text : "";
        // const text = msg.content[0].type === "text" ? msg.content[0].text : "";

// Strip ```json ... ``` or ``` ... ``` fences if present
        const cleaned = text
            .trim()
            .replace(/^```(?:json)?\s*/i, "")  // remove opening fence
            .replace(/\s*```$/, "");            // remove closing fence

        const result = JSON.parse(cleaned);
        const saveEssayEvaluation = await essayFeedbackSave(userId, prompt, essay, result);
        if(saveEssayEvaluation.message === "Essay feedback successfully saved." && saveEssayEvaluation.data.success){
            res.json(result);
        }else{
            return res.status(500).json({
                message: saveEssayEvaluation.message,
                data: {
                    success: false
                }
            })
        }
    }catch(err){
        next(err);
    }
}

export const getUserEssay = async (req, res, next) => {
    try{
        const {userId} = req.user;
        const getUserEssayFromDB = await getUserEssayAndFeedbackById(userId);

        return res.json(getUserEssayFromDB);
    }catch(err){
        next(err);
    }
}

export const getEssayFeedbackById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const getEssayFeedback = await getEssayFeedbackByIdFromDb(id);

        return res.json(getEssayFeedback);
    }catch(err){
        next(err);
    }
}

export const getUserIELTSScoreData = async (req, res, next) => {
    try {
        const {userId} = req.user;
        const getUserIELTSScoresFromDb = await getUserIELTSScores(userId);

        return res.json(getUserIELTSScoresFromDb);
    }catch(err){
        next(err);
    }
}