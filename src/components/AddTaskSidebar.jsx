import React, { useEffect, useState } from 'react'
import { ClipboardList, Square, SquareCheck, Plus, Check, UsersRound, UserPlus, User, FileText, DollarSign, X } from "lucide-react";
import { useChatStore } from '../stores/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import avatar from "../assets/avatar.png";
import { useAuthStore } from '../stores/useAuthStore';
import { axiosInstance } from '../lib/axios';

const AddTaskSidebar = () => {
  const { authUser } = useAuthStore()
  const { getTasks, getMembers, selectedEvent, isAddingTask, members, setIsAddingTask } = useChatStore()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [assigned_to, setAssigned] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post(`/events/${selectedEvent._id}/tasks/new`, {
        name,
        description,
        budget,
        assigned_to
      });

      if (res.data.success) {
        setIsAddingTask(false)
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert("Failed to add task");
    }
  };

  return (
    <aside className="h-full w-20 lg:w-72 border-l border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 flex justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-6" />
          <span className="text-sm hidden lg:block">New Task</span>
        </div>
        <button onClick={() => setIsAddingTask(false)}>
          <X />
        </button>
      </div>

      <div className="overflow-y-auto w-full p-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Task Name
            </div>
            <input
              type="text"
              placeholder="Enter event name"
              className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Task Description */}
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </div>
            <textarea
              placeholder="Enter event description"
              className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Task Budget */}
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Budget
            </div>
            <input
              type="number"
              placeholder="Enter event budget"
              className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <select
            className="w-full px-4 py-2 mt-2 bg-base-200 rounded-lg border"
            value={assigned_to}
            onChange={(e) => setAssigned(e.target.value)}
            required
          >
            <option value="">Assign to</option>
            {members.map((member) => (
              <option key={member.username} value={member.username}>
                {member.username}
              </option>
            ))}
          </select>

          <button type="submit" className="w-25 text-sm bg-pink-500 text-white p-2 mt-5 rounded-lg hover:bg-pink-600">
            Add Task
          </button>
        </form>

      </div>

    </aside>
  );
};

export default AddTaskSidebar