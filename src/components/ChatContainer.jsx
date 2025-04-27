import { useChatStore } from "../stores/useChatStore";
import { useEffect, useRef } from "react";
import avatar from "../assets/avatar.png";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../stores/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedEvent,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedEvent) {
      getMessages(selectedEvent._id)
    }
  }, [selectedEvent._id, getMessages])

  useEffect(() => {
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedEvent._id, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      console.log("scrolling")
    }
  }, [messages.length]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-full">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.sender._id === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className=" chat-image avatar">
              <div className="size-8 rounded-full border">
                <img
                  src={
                    message.sender._id === authUser._id
                      ? authUser.profilePic || avatar
                      : message.sender.profilePic || avatar
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              <p className="text-xs font-bold">{message.sender.username}</p>
              <div className="text-sm">{message.text && <p>{message.text}</p>}</div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;