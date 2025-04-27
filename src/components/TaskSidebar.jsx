import React, { useEffect } from 'react'
import { ClipboardList, Square, SquareCheck, Plus, Check, UsersRound, UserPlus, Crown } from "lucide-react";
import { useChatStore } from '../stores/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import AddTaskSidebar from './AddTaskSidebar';
import AddMemberSidebar from './AddMemberSidebar';
import avatar from "../assets/avatar.png";
import { useAuthStore } from '../stores/useAuthStore';
import { axiosInstance } from "../lib/axios.js";

const TaskSidebar = () => {
    const { authUser, getUsers, friends, getFriends, getFriendRequests, sendRequest } = useAuthStore()
    const { getTasks, getMembers, selectedEvent, members, isAddingTask, setIsAddingTask, isAddingMember, setIsAddingMember, tasks } = useChatStore()

    useEffect(() => {
        getFriends()
        getFriendRequests()
    }, [])

    const isFriend = (userId) => friends.some(friend => friend._id === userId);

    useEffect(() => {
        getTasks(selectedEvent._id)
    }, [isAddingTask])

    useEffect(() => {
        getMembers(selectedEvent._id)
    }, [isAddingMember])

    const fulluserTasks = tasks.map(task => {
        const user = members.find(m => m._id === task.assigned_to);
        return {
            ...task,
            assigned_to: user || task.assigned_to
        };
    })

    const handleComplete = async (task) => {
        try {
            await axiosInstance.put(`/events/${selectedEvent._id}/tasks/update`, {
                taskName: task.name,
                completed: true,
            });
            await getTasks(selectedEvent._id);
        } catch (error) {
            toast.error("Failed to mark as completed");
        }
    }

    if (isAddingTask) return <AddTaskSidebar />
    if (isAddingMember) return <AddMemberSidebar />

    return (
        <aside className="h-full w-20 lg:w-72 border-l border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5 flex justify-between">
                <div className="flex items-center gap-2">
                    <ClipboardList className="size-6" />
                    <span className="text-sm hidden lg:block">Tasks</span>
                </div>
                {selectedEvent.owner == authUser._id && (
                    <button onClick={() => setIsAddingTask(true)} className=''>
                        <Plus className='size-6' />
                    </button>
                )}
            </div>

            <div className="overflow-y-auto w-full py-3">
                {fulluserTasks.length > 0 ? (
                    <>
                        {/* Your Tasks */}
                        <div className="mb-4 px-4">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">Your Tasks</h2>
                            {fulluserTasks.filter(task => task.assigned_to?._id === authUser._id).length > 0 ? (
                                <ul className="space-y-2">
                                    {fulluserTasks
                                        .filter((task) => task.assigned_to?._id === authUser._id)
                                        .map((task) => (
                                            <li key={task.name} className="bg-gray-100 p-3 rounded-md text-sm flex flex-col justify-between">
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="truncate font-bold">{task.name}</span>
                                                    {task.completed === true ? (
                                                        <div className="group relative flex flex-col items-center">
                                                            <Check className="size-6 text-green-600" />
                                                            <div className="absolute hidden group-hover:block text-xs -left-20 top-1/2 -translate-y-1/2 bg-green-500 px-2 py-1 rounded shadow text-white">
                                                                Completed
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group">
                                                            <button onClick={() => handleComplete(task)}>
                                                                <Square className="size-6 text-gray-600 hover:text-green-600" />
                                                            </button>
                                                            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden group-hover:block bg-green-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                                Mark as completed
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {task.budget != null && (
                                                    <div className="text-sm text-gray-800 p-1">Budget: ${task.budget}</div>
                                                )}
                                                <hr className="border-gray-300 my-2" />
                                                {task.description && <div className="p-1">{task.description}</div>}
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-gray-500 px-4 text-center p-3">Nothing to see here</p>
                            )}

                        </div>

                        {/* Other Tasks */}
                        <div className="px-4">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">Other Tasks</h2>
                            <ul className="space-y-2">
                                {fulluserTasks
                                    .filter((task) => task.assigned_to?._id !== authUser._id)
                                    .map((task) => (
                                        <li key={task.name} className="bg-gray-100 p-3 rounded-md text-sm flex flex-col justify-between">
                                            <div className="flex justify-between items-center w-full">
                                                <span className="truncate font-bold">{task.name}</span>
                                                {task.completed === true && (
                                                    <div className="group relative flex flex-col items-center">
                                                        <Check className="size-6 text-green-600" />
                                                        <div className="absolute hidden group-hover:block text-xs -left-20 top-1/2 -translate-y-1/2 bg-green-500 px-2 py-1 rounded shadow text-white">
                                                            Completed
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {task.budget != null && (
                                                <div className="text-sm text-gray-800 p-1">Budget: ${task.budget}</div>
                                            )}
                                            {task.description && <div className="p-1">{task.description}</div>}
                                            <hr className="border-gray-300 my-2" />
                                            {task.assigned_to && (
                                                <div className="p-2 text-sm flex items-center justify-end gap-2">
                                                    <img
                                                        src={task.assigned_to.profilePic || avatar}
                                                        alt={task.assigned_to.username}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <span>{task.assigned_to.username}</span>
                                                </div>
                                            )}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                ) : (
                    <p className="text-xs text-gray-500 px-4">No tasks available</p>
                )}
            </div>

            <div className="border-b border-base-300 w-full p-5 flex justify-between">
                <div className="flex items-center gap-2">
                    <UsersRound className="size-6" />
                    <span className="text-sm hidden lg:block">Members</span>
                </div>
                {selectedEvent.owner == authUser._id && (
                    <button onClick={() => setIsAddingMember(true)} className=''>
                        <Plus className='size-6' />
                    </button>
                )}
            </div>

            <div className="overflow-y-auto w-full py-3">
                <ul className="space-y-2 px-4">
                    {members.map((member) => (
                        <li key={member._id} className="bg-gray-100 p-3 rounded-md text-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between w-full">
                                <div className="size-8 rounded-full">
                                    <img src={member.profilePic || avatar} alt={members.username} />
                                </div>
                                <span className="truncate">{member.username}</span>
                                {selectedEvent.owner == member._id && (
                                    <div className='group relative flex flex-col items-center'>
                                        <Crown className="size-5" />
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden group-hover:block bg-yellow-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                            Owner
                                        </div>
                                    </div>
                                )}
                                {!isFriend(member._id) && !member.friendRequests?.includes(authUser._id) && !authUser.friendRequests?.includes(member._id) && member._id !== authUser._id && (
                                    <button
                                        onClick={async () => {
                                            await sendRequest(member._id)
                                            await getMembers(selectedEvent._id)
                                        }}
                                    >
                                        <div className='group relative flex flex-col items-center'>
                                            <UserPlus className="size-5" />
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                Add Friend
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default TaskSidebar