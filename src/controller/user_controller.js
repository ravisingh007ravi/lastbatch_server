import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { errorhandling } from '../error/all_error.js';
import { User_model } from '../model/user_model.js';

const getOAuthClient = () => {
    const clientId = process.env.Client_ID || process.env.GOOGLE_CLIENT_ID;
    return { client: new OAuth2Client(clientId), clientId };
};

export const login_with_google = async (req, res) => {
    try {
        const { credential } = req.body;
        const idToken = credential;

        if (!idToken) return res.status(400).json({ status: false, message: "Google ID token (credential) is required" });

        const { client, clientId } = getOAuthClient();

        let ticket;
        try {
            ticket = await client.verifyIdToken({ idToken, audience: clientId });
        }
        catch (verifyErr) {
            return res.status(401).json({ status: false, message: `Google authentication failed: ${verifyErr.message}` });
        }

        const payload = ticket.getPayload();
        if (!payload || !payload.email) { return res.status(400).json({ status: false, message: "Unable to retrieve Google user profile" }); }
        console.log(payload.email)

        let googleEmail = payload.email;
        
        return res.status(200).json({ status: true, message: "Google login successful", user: payload });
    } catch (err) {
        return errorhandling(err, res);
    }
};

export const get_current_user = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ status: false, message: "User not authenticated" });
        }

        const user = await User_model.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        return res.status(200).json({
            status: true,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                profileImg: user.profileImg,
                authProvider: user.authProvider
            }
        });
    } catch (err) {
        return errorhandling(err, res);
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            status: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        return errorhandling(err, res);
    }
};

export const create_user = async (req, res) => {
    try {
        const data = req.body;
        const response = await User_model.create(data);
        res.status(201).send({ status: true, data: response });
    } catch (err) {
        errorhandling(err, res);
    }
};

export const verify_otp = async (req, res) => {
    try {
        res.send({ status: true, message: "OTP verified" });
    } catch (err) {
        errorhandling(err, res);
    }
};

export const resend_otp = async (req, res) => {
    try {
        res.send({ status: true, message: "OTP resent" });
    } catch (err) {
        errorhandling(err, res);
    }
};

export const login = async (req, res) => {
    try {
        res.send({ status: true, message: "Login endpoint" });
    } catch (err) {
        errorhandling(err, res);
    }
};

export const update_profile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const updateData = req.body;
        delete updateData.password;
        delete updateData.role;

        const updated = await User_model.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        res.send({ status: true, data: updated });
    } catch (err) {
        errorhandling(err, res);
    }
};
