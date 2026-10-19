import { errorhandling } from '../error/all_error.js'
import jwt from 'jsonwebtoken'
import {User_model} from '../model/user_model.js'

export const create_user = async (req, res) => {
    try {
        const data = req.body;
        const { firstName, lastName, gender, email, password } = data;

        const response = await User_model.create(data)

        res.send({ data: response })


    }
    catch (err) { errorhandling(err, res) }
}


export const verify_otp = async (req, res) => {
    try {
        res.send({ a: "abc" })
    }
    catch (err) { errorhandling(err, res) }
}

export const resend_otp = async (req, res) => {
    try {
        res.send({ a: "abc" })
    }
    catch (err) { errorhandling(err, res) }
}

export const login = async (req, res) => {
    try {
        res.send({ a: "abc" })
    }
    catch (err) { errorhandling(err, res) }
}

export const update_profile = async (req, res) => {
    try {
        res.send({ a: "abc" })
    }
    catch (err) { errorhandling(err, res) }
}