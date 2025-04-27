import { X, ChevronDown } from "lucide-react"
import { useState } from 'react'
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";
import avatar from "../assets/avatar.png";


const ChatHeader = () => {
  const { selectedEvent, setSelectedEvent } = useChatStore()
  const [visible, setVisible] = useState(false)

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedEvent.image || avatar} alt={selectedEvent.name} />
            </div>
          </div>

          {/* Event info */}
          <div>
            <h3 className="text-lg">{selectedEvent.name}</h3>
            <h3 className="text-sm italic">{selectedEvent.location}</h3>
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setVisible(!visible)} className="pr-5">
            <ChevronDown />
          </button>

          <button onClick={() => setSelectedEvent(null)}>
            <X />
          </button>
        </div>
      </div>
      {visible && (
        <div className="absolute dropdown-menu bg-white shadow-lg rounded-md p-2 mt-2 w-1/3">
          {selectedEvent.budget != null && (<p>Budget: ${selectedEvent.budget}</p>)}
          {selectedEvent.description && <p className="break-words">Description: {selectedEvent.description}</p>}
        </div>
      )}
    </div>
  );
};
export default ChatHeader;