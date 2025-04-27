import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    events: [],
    tasks: [],
    members: [],
    selectedEvent: null,
    isEventsLoading: false,
    isMessagesLoading: false,
    isAddingTask: false,
    isAddingMember: false,

    getEvents: async (userId) => {
        set({ isEventsLoading: true });
        try {
            const res = await axiosInstance.get(`/events/${userId}`);
            set({ events: res.data.events });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isEventsLoading: false });
        }
    },

    getTasks: async (eventId) => {
        try {
            const res = await axiosInstance.get(`/events/${eventId}/tasks`);
            set({ tasks: res.data.tasks })
        } catch (error) {
            toast.error(error.message)
        }
    },

    getMembers: async (eventId) => {
        try {
            const res = await axiosInstance.get(`/events/${eventId}/members`);
            set({ members: res.data.members });
        } catch (error) {
            toast.error(error.message);
        }
    },

    setTaskStatus: async (eventId) => {
        try {
            const { completed, taskName } = get()
            const res = await axiosInstance.put(`/events/${eventId}/tasks/update`, completed, taskName)
            set({ tasks: res.data.tasks })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    getMessages: async (eventId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${eventId}`);
            set({ messages: res.data.messages });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedEvent, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedEvent._id}`, messageData);
            set({ messages: [...messages, res.data.savedMessage] });
            console.log(savedMessage)
        } catch (error) {
            toast.error(error);
        }
    },

    subscribeToMessages: () => {
        const { selectedEvent } = get();
        if (!selectedEvent) return;
        
        const socket = useAuthStore.getState().socket

        socket.emit("joinEvent", selectedEvent._id.toString())

        socket.on("newMessage", (newMessage) => {
            if (newMessage.eventId.toString() !== selectedEvent._id.toString()) return
            console.log("Received message:", newMessage);

            set((state) => ({
                messages: [...state.messages, newMessage],
            }));
        });

    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedEvent: async (selectedEvent) => {
        set({ selectedEvent: selectedEvent, isAddingTask: false, isAddingMember: false })
        if (selectedEvent) {
            await get().getMembers(selectedEvent._id);
            await get().getTasks(selectedEvent._id);
        }
    },

    setIsAddingTask: (isAddingTask) => set({ isAddingTask }),
    setIsAddingMember: (isAddingMember) => set({ isAddingMember })
}));