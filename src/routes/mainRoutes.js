import express from 'express'
import { user_routes } from './user_routes.js'
import { admin_routes } from './admin_routes.js'

export const routes = express.Router()

routes.get('/test_limit',(req,res)=>{res.send('ok')})

routes.use('/user', user_routes)
routes.use('/admin', admin_routes)   