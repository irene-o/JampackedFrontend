import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import avatar from "../assets/avatar.png";

const FriendRequest = () => {
  const { getFriendRequests, friendRequests, acceptRequest, declineRequest } = useAuthStore();

  useEffect(() => {
      getFriendRequests();
    }, []);

  return (
    <div className="fixed top-40 left-5 w-72 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
      <h2 className="text-xl cherry-bomb-one-regular text-[#414141] mb-4 text-center">Friend Requests</h2>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {friendRequests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests</p>
        ) : (
          friendRequests.map((user) => (
            <div key={user._id} className="flex items-center justify-between gap-2 border-b pb-3">
              <img
                src={user.profilePic || avatar }
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="flex-1 ml-2 text-sm font-medium">{user.username}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => acceptRequest(user._id)}
                  className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                >
                  ✓
                </button>
                <button
                  onClick={() => declineRequest(user._id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendRequest;