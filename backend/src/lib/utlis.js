import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_SECRET_EXPIER, NODE_ENV } from '../../config/env.js'

export const generateToken = (userId, res) => {
   try {
     
     const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: JWT_SECRET_EXPIER})
 
     res.cookie("jwt", token, {
         maxAge: 1 * 24 * 60 * 60 * 1000, // ms
         httpOnly: true, // prevent XSS attacks cross-site scripting attacks
         sameSite: "strict", //CSRF attacks cross-site request forgery attacks
         secure: NODE_ENV !== "development"
     })
 
     return token
   } catch (error) {
    
    console.error("error in generating token", error)

   }

}