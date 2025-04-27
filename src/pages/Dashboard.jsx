import React  from 'react'
import { useChatStore } from '../stores/useChatStore';
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import TaskSidebar from '../components/TaskSidebar';

const Dashboard = () => {
  const { selectedEvent } = useChatStore()

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-2">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-80px)]">
          <div className="flex h-full rounded-lg">
            <Sidebar />

            {!selectedEvent ? <NoChatSelected /> : <ChatContainer />}

            {selectedEvent && <TaskSidebar/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
