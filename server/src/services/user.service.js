import {Essay} from '../models/essay.model.js'
import {User} from '../models/user.model.js'

export const essayFeedbackSave = async (userId, topic, essay, aiResponse) => {
    try{
        const userExists = await User.findById(userId).lean();

        if (!userExists) {
            return {
                message: 'User does not exist',
                data: {
                    success: false,
                }
            };
        }

        const newEssayEvaluation = new Essay({
            userId, topic, essay, result: aiResponse
        })

        await newEssayEvaluation.save();

        return {
            message: `Essay feedback successfully saved.`,
            data: {
                success: true
            }
        };
    }catch(err){
        console.error("Error on essayFeedbackSave",err);
    }
}

export const getUserEssayAndFeedbackById = async (userId) => {
    try{
        const user = await User.findById(userId).lean();
        if (!user) {
            return {
                message: 'User not found',
                data: {
                    success: false,
                }
            }
        }

        const userEssay = await Essay.find({userId});
        if (userEssay.length === 0) {
            return {
                message: 'Essay not found',
                data: {
                    success: false,
                }
            }
        }

        return {
            message: 'Essays and feedbacks successfully found.',
            data: {
                success: true,
                userEssay
            }
        };
    }catch(err){
        console.error("Error on getUserEssayAndFeedbackById",err);
    }
}

export const getEssayFeedbackByIdFromDb = async (essayId) => {
    try {
        const essayAndEssayFeedback = await Essay.findById(essayId).lean();

        if(!essayAndEssayFeedback) {
            return {
                message: 'Essay not found',
                data: {
                    success: false,
                }
            }
        }

        return {
            message: 'Essays feedback successfully found.',
            data: {
                success: true,
                essayAndEssayFeedback
            }
        }
    }catch(err){
        console.error("Error on getEssayFeedbackByIdFromDb",err);
    }
}

export const getUserIELTSScores = async (userId) => {
    try {
        // const userIELTSScores = await Essay.find({userId}).lean();

        const THIRTY_DAYS_AGO = new Date();

        THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);

        const userIELTSScores = await Essay.find({
            userId,
            createdAt: {
                $gte: THIRTY_DAYS_AGO
            }
        })
            .select("result.overall createdAt")
            .sort({ createdAt: 1 })
            .lean();

        if(userIELTSScores.length === 0){
            return {
                message: 'IELTS scores not found',
                data: {
                    success: false,
                }
            }
        }

        return {
            message: 'IELTS scores successfully found.',
            data: {
                success: true,
                scores: userIELTSScores
            }
        }
    }catch(err){
        console.error("Error on getUserIELTSScores",err);
    }
}