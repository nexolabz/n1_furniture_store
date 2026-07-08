const express=require("express")
const authRouter=express.Router()

const {handleRegister,handleLogin}=require('../controllers/authController')

authRouter.post('/register',handleRegister)

authRouter.post('/login',handleLogin)

module.exports=authRouter