import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.data });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (msgData) => {
      const {selectedUser, messages} = get()    
      try {
        const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, msgData)
        set({messages: [...messages, res.data]})
      } catch (error) {
        toast.error(error.response.data.message)
        
      }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
