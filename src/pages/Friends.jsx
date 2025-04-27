import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore'
import avatar from "../assets/avatar.png";
import FriendRequest from '../components/FriendRequests';

const Friends = () => {
  const { friends, getFriends, removeFriend } = useAuthStore()

  useEffect(() => {
        getFriends()
      }, [])

  return (
    <div>
      <h1 className='cherry-bomb-one-regular text-4xl sm:py-2 lg:text-5xl leading-loose text-[#414141] flex justify-center'>
        Your Friends
      </h1>
      <div className='flex justify-center'>
        <p className='w-40 mt-2 h-[1px] bg-[#414141]'></p>
      </div>

      <div className='mt-8 flex flex-wrap justify-center gap-6'>
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend._id}
              className='w-52 p-4 border rounded-2xl shadow-md flex flex-col items-center gap-2'
            >
              <img
                src={friend.profilePic || avatar }
                alt={`${friend.username}'s profile`}
                className='w-20 h-20 rounded-full object-cover'
              />
              <p className='text-lg font-medium'>{friend.username}</p>
              <button
                className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition'
                onClick={() => removeFriend(friend._id)}
              >
                Remove Friend
              </button>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 m-10'>You have no friends yet</p>
        )}
      </div>

      <FriendRequest />
    </div>
  );
};

export default Friends;
