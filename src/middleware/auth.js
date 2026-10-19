import { errorhandling } from '../error/all_error.js'
 
export const user_autheticate = async (req, res, next) => {
    try {

        next()
    }
    catch (err) { errorhandling(err, res) }
}
export const user_authorization = async (req, res, next) => {
    try {
        
        next()
    }
    catch (err) { errorhandling(err, res) }
}


export const admin_autheticate = async (req, res, next) => {
    try {

    }
    catch (err) { errorhandling(err, res) }
}
export const admin_authorization = async (req, res, next) => {
    try {

    }
    catch (err) { errorhandling(err, res) }
}