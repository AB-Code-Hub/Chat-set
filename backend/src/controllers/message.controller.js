import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res
      .status(200)
      .json({ message: "User fetched successfully", data: filteredUsers });
  } catch (error) {
    console.error("error in get users for sidebar controller", error);
    return res.status(500).json({ message: "Internal serever error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, reciverId: userToChatId },
        { senderId: userToChatId, reciverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in message controller ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      //Upload base64 image to clodinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //todo:  realtime  functionality goes here using  socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("error in message controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
