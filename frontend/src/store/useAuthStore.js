import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')

            set({authUser: res.data,})
        } catch (error) {
            console.error("Error in checkAuth:", error)
            set({authUser: null})
        }

        finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const response = await axiosInstance.post("/auth/signup", data)
            set({authUser: response.data})
            toast.success("Acoount created successfully");

        } catch (error) {
            toast.error(error.response.data.message)
            console.error("Error in signup:", error)
        }

        finally{
            set({isSigningUp: false})
        }
    }
}))