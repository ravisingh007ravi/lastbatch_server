import express from 'express';
import { user_routes } from './user_routes.js';
import { admin_routes } from './admin_routes.js';
import { login_with_google, logout, get_current_user } from '../controller/user_controller.js';
import { user_autheticate } from '../middleware/auth.js';

export const routes = express.Router();

routes.get('/test_limit', (req, res) => {
    res.send('ok');
});

// Authentication endpoints
routes.post('/auth/google', login_with_google);
routes.post('/auth/logout', logout);
routes.get('/auth/me', user_autheticate, get_current_user);

// Feature routes
routes.use('/user', user_routes);
routes.use('/admin', admin_routes);
