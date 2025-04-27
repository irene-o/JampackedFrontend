import React, { useState, useEffect } from 'react'
import { ClipboardList, X, Users, UserPlus } from "lucide-react";
import { useChatStore } from '../stores/useChatStore'
import { useAuthStore } from '../stores/useAuthStore';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';

const AddMemberSidebar = () => {
  const { authUser, friends, getFriends } = useAuthStore()
  const { selectedEvent, members, setIsAddingMember } = useChatStore()

  const [searchTerm, setSearchTerm] = useState("")

  const memberIds = members.map(m => m._id);
  const filteredFriends = friends.filter(friend => !memberIds.includes(friend._id));

  const handleAddMember = async (friend) => {
    try {
      const res = await axiosInstance.post(`/events/${selectedEvent._id}/members/new`, { friendId: friend._id })
      if (res.data.success) {
        toast(`Successfully added ${friend.username} to the event!`)
        setIsAddingMember(false)
      } else {
        toast('Failed to add member')
      }
    } catch (error) {
      console.error('Error adding member', error)
      alert('Failed to add member')
    }
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-l border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 flex justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="text-sm hidden lg:block">Add Member</span>
        </div>
        <button onClick={() => setIsAddingMember(false)}>
          <X />
        </button>
      </div>

      <div className="overflow-y-auto w-full p-5">
        <input
          type="text"
          placeholder="Search Friends..."
          className="w-full px-4 py-2.5 bg-base-200 rounded-lg border mb-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="space-y-4">
          {filteredFriends.filter(friend =>
            friend.username.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((friend) => (
            <div key={friend._id} className="flex justify-between items-center p-2 border-b border-base-300">
              <span>{friend.username}</span>
              <button 
                type="button" 
                onClick={() => handleAddMember(friend)} 
                className="text-blue-500"
              >
                <UserPlus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default AddMemberSidebar
