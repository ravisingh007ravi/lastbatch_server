import express from 'express'
import { create_user, verify_otp, resend_otp, login, update_profile } from '../controller/user_controller.js'
import { user_autheticate, user_authorization } from '../middleware/auth.js'
export const user_routes = express.Router()

// public APi no Use Auth
user_routes.post('/create_user', create_user)
user_routes.post('/verify_otp', verify_otp)
user_routes.post('/resend_otp', resend_otp)
user_routes.post('/login', login)


// Private APi Use Auth
user_routes.post('/update_profile', user_autheticate, user_authorization, update_profile)