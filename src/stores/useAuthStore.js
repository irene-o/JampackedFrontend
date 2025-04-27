import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore.js";

const backendURL = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = create((set, get) => ({
  users: [],
  friends: [],
  friendRequests: [],
  authUser: null,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/authorize");
      set({ authUser: res.data });
      get().connectSocket(res.data);
    } catch (error) {
      set({ authUser: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/user/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      useChatStore.getState().setSelectedEvent(null)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/user/all");
      set({ users: res.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  getFriends: async () => {
    try {
      const res = await axiosInstance.get("/user/friends")
      set({ friends: res.data })
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  },

  getFriendRequests: async () => {
    try {
      const res = await axiosInstance.get("/user/friend-requests")
      set({ friendRequests: res.data })
    } catch (error) {
      console.error("Error fetching friend requests:", error)
    }
  },

  sendRequest: async (targetUserId) => {
    try {
      await axiosInstance.post(`/user/send-request/${targetUserId}`)
      toast.success("Friend request sent")
    } catch (error) {
      console.error("Error sending friend request:", error)
      toast.error("Could not send request")
    }
  },

  acceptRequest: async (senderId) => {
    try {
      await axiosInstance.post(`/user/accept-request/${senderId}`)
      toast.success("Friend request accepted")
      await get().getFriends()
      await get().getFriendRequests()
    } catch (error) {
      console.error("Error accepting request:", error)
      toast.error("Could not accept request")
    }
  },

  declineRequest: async (senderId) => {
    try {
      await axiosInstance.post(`/user/decline-request/${senderId}`)
      toast.info("Friend request declined")
      await get().getFriendRequests()
    } catch (error) {
      console.error("Error declining request:", error)
      toast.error("Could not decline request")
    }
  },

  removeFriend: async (friendId) => {
    try {
      await axiosInstance.delete(`/user/remove-friend/${friendId}`)
      toast.success("Friend removed")
      await get().getFriends()
    } catch (error) {
      console.error("Error removing friend:", error)
      toast.error("Could not remove friend")
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/user/profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updating profile:", error);
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: (authUser) => {
    const { socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(backendURL, {
      query: {
        userId: authUser._id,
      },
    });
    newSocket.connect();

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));