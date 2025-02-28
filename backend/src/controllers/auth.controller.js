import { generateToken } from "../lib/utlis.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;


        if(!email || !password || !fullName)
        {
            return res.status(400).json({message: "All fields are required"})
        }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser =  await User.create({
        fullName,
        email,
        password: hashedPassword
    })

    if(newUser){
        // generate jwt token for user

        generateToken(newUser._id, res)

        await newUser.save()

        res.status(201).json({ 
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
            
        })


    }   
    
    else{
     res.status(400).json({message: "invalid User data"})
    }




  } catch (error) {
    console.error("something went wrong in signup contoller", error);
    res.status(500).json({message: "Internal server error"})
  }
};

export const login = async (req, res) => {
    try {
        
        
    } catch (error) {
        console.error("something wrong in login controller", error)
        return res.status(500).json({message: error.message})
    }

};

export const logout = (req, res) => {};
