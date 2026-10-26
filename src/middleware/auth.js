import jwt from 'jsonwebtoken';
import { errorhandling } from '../error/all_error.js';

export const user_autheticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = (authHeader && authHeader.startsWith('Bearer '))
            ? authHeader.split(' ')[1]
            : (req.cookies?.token || null);

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Authentication required. Please log in."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'techzone_jwt_secret_key_default'
        );

        req.user = decoded;
        next();
    } catch (err) {
        return errorhandling(err, res);
    }
};

export const user_authorization = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }
        next();
    } catch (err) {
        return errorhandling(err, res);
    }
};

export const admin_autheticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = (authHeader && authHeader.startsWith('Bearer '))
            ? authHeader.split(' ')[1]
            : (req.cookies?.token || null);

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Admin authentication required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'techzone_jwt_secret_key_default'
        );

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                status: false,
                message: "Admin access forbidden"
            });
        }

        req.admin = decoded;
        next();
    } catch (err) {
        return errorhandling(err, res);
    }
};

export const admin_authorization = async (req, res, next) => {
    try {
        if (!req.admin || req.admin.role !== 'admin') {
            return res.status(403).json({ status: false, message: "Admin access forbidden" });
        }
        next();
    } catch (err) {
        return errorhandling(err, res);
    }
};
