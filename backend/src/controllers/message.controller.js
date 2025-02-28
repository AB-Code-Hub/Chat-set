import User from "../models/user.model.js"

export const  getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        
        return res.status(200).json({message: "User fetched successfully", data: filteredUsers})
    } catch (error) {
        console.error("error in get users for sidebar controller", error)
        return res.status(500).json({message: "Internal serever error"})
    }
}