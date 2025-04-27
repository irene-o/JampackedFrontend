import React, { useEffect } from 'react'
import { Users } from "lucide-react";
import { useChatStore } from '../stores/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import avatar from "../assets/avatar.png";
import { useAuthStore } from '../stores/useAuthStore';

const Sidebar = () => {
    const { authUser } = useAuthStore()
    const { getEvents, events, selectedEvent, setSelectedEvent, isEventsLoading } = useChatStore()

    useEffect(() => {
        getEvents(authUser._id)
    }, [getEvents])

    if (isEventsLoading) return <SidebarSkeleton/>
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Events</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {events.map((event) => (
                    <button
                        key={event._id}
                        onClick={() => setSelectedEvent(event)}
                        className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedEvent?._id === event._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={event.image || avatar}
                                alt={event.name}
                                className="size-12 object-cover rounded-full"
                            />
                        </div>

                        {/* Event info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="text-lg truncate">{event.name}</div>
                            <div className="text-sm truncate italic">{event.location}</div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar
