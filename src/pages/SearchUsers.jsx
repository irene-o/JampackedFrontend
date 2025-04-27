import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { UserPlus } from "lucide-react";
import avatar from "../assets/avatar.png";

const SearchUsers = () => {
  const { users, friends, authUser, getUsers, getFriends, sendRequest } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsers();
    getFriends();
  }, []);

  const isFriend = (userId) => friends.some(friend => friend._id === userId);

  const filteredUsers = users
  .filter(user => user._id !== authUser._id)
  .filter(user =>
    user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="cherry-bomb-one-regular text-4xl lg:text-5xl text-[#414141] text-center mb-4">Find Users</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 border rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.profilePic || avatar }
                alt={`${user.username}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-lg font-medium">{user.username}</span>
            </div>
            {!isFriend(user._id) && !user.friendRequests?.includes(authUser._id) && !authUser.friendRequests?.includes(user._id) && (
              <button
              onClick={async () => {
                await sendRequest(user._id);
                await getUsers()
              }}
            >
              <UserPlus className="size-6" />
            </button>
            )}

            {user.friendRequests.includes(authUser._id) && (
              <div className='text-xs'>Request Pending</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
