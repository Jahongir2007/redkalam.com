import dotenv from "dotenv";
dotenv.config();
import {User} from "../models/user.model.js";
import AuthVerify from "auth-verify";
import jwt from 'jsonwebtoken';

const auth = new AuthVerify({});
// import {resendApiKey} from "../../index.js";

auth.otp.sender({
    via: "email",
    service: "api",
    sender: 'noreply@redkalam.com',
    apiService: 'resend',
    apiKey: process.env.RESEND_API_KEY,
});

export const getUserByEmailAndPassword = async (email, password) => {
    try{
        const user = await User.findOne({ email })

        if (!user) {
            return {
                message: 'User not found',
                data: {
                    success: false,
                }
            }
        }

        const correctPassword = await auth.crypto.verify(password, user.password)

        if (!correctPassword) {
            return {
                message: 'Wrong password',
                data: {
                    success: false,
                }
            }
        }

        user.password = undefined;

        const userToken = jwt.sign({userId: user._id, username: user.username, email}, process.env.JWT_SECRET, {
            expiresIn: "20d"
        })

        return {
            message: 'Successfully verified',
            data: {
                success: true,
                userToken
            }
        };
    }catch(err){
        console.log("Error occured on getUserByEmailAndPssword service". err);
        return {
            message: `Internal server error: ${err}`,
            data: {
                success: false
            }
        };
    }
}

export const registerNewUserByEmail = async (username, email, password) => {
    try{
        const userExists = await User.findOne({email})

        if (userExists) {
            return {
                message: 'User already exists',
                data: {
                    success: false
                }
            }
        }

        // Creating OTP and sending it
        await auth.otp.send(email, {
            subject: "Email verification for RedKalam",
            html: code => `
                <center><h3>Email verification for RedKalam</h3></center>
                <p>
                    Hi, ${username}. Thanks for your registration to RedKalam. That's your code:
                    <center><h3>${code}</h3></center>
                </p>
            `
        });

        const hashedPassword = await auth.crypto.hash(password);
        const newUser = new User({username, email, password: hashedPassword, otpCode: auth.otp.code});
        await newUser.save();

        const userToken = jwt.sign({userId: newUser._id, username, email}, process.env.JWT_SECRET, {
            expiresIn: "20d"
        })

        return {
            message: 'User successfully registered',
            data: {
                success: true,
                userToken
            }
        }

    }catch(err){
        console.log("Error occured on registerNewUserByEmail", err);
    }
}

export const verifyUserByOtpCode = async (userId, email, code) => {
    try{
        const user = await User.findOne({email});
        if (!user) {
            return {
                message: 'User not exist',
                data: {
                    success: false
                }
            }
        }

        const validCode = await auth.otp.verify(email, code);
        if (!validCode) {
            return {
                message: 'Invalid OTP Code',
                data: {
                    success: false
                }
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { verified: true },
            { new: true }
        );

        return {
            message: 'Successfully verified',
            data: {
                success: true,
            }
        }
    }catch(err){
        console.log("Error occured on verifyUserByOtpCode", err);
    }
}

export const resendOtpToUserById = async (userId, email) => {
    try{
        const user = await User.findById(userId);

        if(!user){
            return {
                message: 'User not exist',
                data: {
                    success: false
                }
            }
        }

        await auth.otp.send(email, {
            subject: "Email verification for RedKalam",
            html: code => `
                <center><h3>Email verification for RedKalam (resent)</h3></center>
                <p>
                       Your code sent again:
                    <center><h3>${code}</h3></center>
                </p>
            `
        });

        const updateOtpCode = await User.findByIdAndUpdate(userId,
            {otpCode: auth.otp.code},
            {new: true}
        );


        return {
            message: 'Successfully resent',
            data: {
                success: true,
            }
        }
    }catch(err){
        console.log("Error occured resendOtpToUserById()", err);
    }
}

export const passwordResetByEmail = async (email) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            return {
                message: 'User not exist',
                data: {
                    success: false
                }
            }
        }

        const otpSent = await auth.otp.send(email, {
            subject: "Email verification for reset password by RedKalam",
            html: code => `
                 <center><h3>Email verification for for reset password by RedKalam</h3></center>
                <p>
                       Your code:
                    <center><h3>${code}</h3></center>
                </p>
            `
        })

        if(otpSent){
            user.otpCodeForPasswordChanging = auth.otp.code;
            await user.save();
            return {
                message: 'Otp Code For Password Reset sent to Email',
                data: {
                    success: true
                }
            }
        }

        return {
            message: 'Otp Code For Password Reset not sent to Email',
            data: {
                success: false
            }
        }
    }catch(err){
        console.log("Error occured on reset passwordResetByEmail", err);
    }
}

export const verifyUserByOtpCodeForPasswordChanging = async (email, otpCode) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            return {
                message: 'User not exist',
                data: {
                    success: false
                }
            }
        }

        const valid = await auth.otp.verify(email, otpCode);
        if (!valid){
            return {
                message: 'Invalid OTP Code',
                data: {
                    success: false
                }
            }
        }

        user.allowedForPasswordChanging = true;
        await user.save();

        return {
            message: 'Successfully verified',
            data: {
                success: true,
            }
        }

    }catch(err){
        console.log("Error occured on verifyUserByOtpCodeForPasswordChanging()", err);
    }
}

export const updatePasswordByEmail = async (email, password) => {
    try{
        const user = await User.findOne({email})
        if (!user) {
            return {
                message: 'User not exist',
                data: {
                    success: false
                }
            }
        }

        if(!user.allowedForPasswordChanging){
            return {
                message: 'Password changing not allowed',
                data: {
                    success: false,
                }
            }
        }

        const newHashedPassword = await auth.crypto.hash(password);
        user.password = newHashedPassword;
        await user.save();
        return {
            message: 'Password successfully changed',
            data: {
                success: true,
            }
        }
    }catch(err){
        console.log("Error occured on updatePasswordByEmail", err);
    }
}

export const loginOrRegisterUserWithGoogleData = async (googleData) => {
    try{
        const user = await User.findOne({googleId: googleData.id});
        if (!user) {
            const newUser = new User({
                username: googleData.name,
                email: googleData.email,
                provider: "google",
                googleId: googleData.id,
            });

            await newUser.save();

            const userToken = jwt.sign({userId: newUser._id, username: googleData.name, email: googleData.email}, process.env.JWT_SECRET, {
                expiresIn: "20d"
            });

            return {
                message: 'User successfully registered with google data',
                data: {
                    success: true,
                    userToken
                }
            }
        }

        // user.password = undefined;
        const userToken = jwt.sign({userId: user._id, username: user.username, email: googleData.email}, process.env.JWT_SECRET, {
            expiresIn: "20d"
        });

        return {
            message: 'Successfully verified with google data',
            data: {
                success: true,
                userToken
            }
        };
    }catch (err) {
        console.log("Error occured on loginOrRegisterUserWithGoogleData()", err);
    }
}