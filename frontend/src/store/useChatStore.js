import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

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

  subscribeToMessages:  () => {
    const {selectedUser} = get()
    if(!selectedUser) return;
    
      const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      set({
        messages: [...get().messages, newMessage]
      })
    })
  },

  unsubscribefromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  resetChatState: () => {
    set({ messages: [], selectedUser: null }); // Reset messages and selected user
  },
}));
