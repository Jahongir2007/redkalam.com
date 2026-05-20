import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Not authorized',
                data: {
                    success: false,
                }
            })
        }

        const userToken = authHeader.split(' ')[1];
        const decodedUserToken = jwt.verify(userToken, process.env.JWT_SECRET);

        req.user = decodedUserToken;
        next();
    }catch(err){
        next(err);
    }
}