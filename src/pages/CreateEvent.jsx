import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useLocation } from 'react-router-dom'
import { Camera, User, FileText, DollarSign, Users, ClipboardList, MapPin } from "lucide-react"

const CreateEvent = () => {
  const { authUser, friends, getFriends } = useAuthStore()

  const locationState = useLocation().state

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState(locationState?.location || "")
  const [budget, setBudget] = useState("")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState(null)
  const [members, setMembers] = useState([authUser])
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  useEffect(() => { }, [members])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setImage(reader.result);
    };
  };

  const handleAddMember = (user) => {
    setMembers((prevMembers) => {
      if (!prevMembers.find((m) => m._id === user._id)) {
        return [...prevMembers, user];
      }
      return prevMembers;
    });
  };

  const handleRemoveMember = (user) => {
    setMembers(members.filter((m) => m.username !== user));
  };

  const handleAddTask = () => {
    setTasks([...tasks, { name: "", description: "", location: "", budget: "", assigned_to: "" }]);
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/events/create", {
        name,
        description,
        location,
        budget,
        image,
        members: members,
        owner: authUser._id,
        tasks: tasks.map(({ name, description, budget, assigned_to }) => ({
          name,
          description,
          budget,
          assigned_to
        }))
      });

      if (response.data.success) {
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert("Failed to create event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-300 rounded-xl shadow-lg">
      <h1 className="cherry-bomb-one-regular text-4xl sm:py-2 lg:text-5xl leading-loose text-[#414141] flex justify-center">
        Create Event
      </h1>
      <div className="flex justify-center mb-6">
        <p className="w-40 mt-2 h-[1px] bg-[#414141]"></p>
      </div>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={previewImage}
            className="size-32 rounded-full object-cover border-4"
          />
          <label
            htmlFor="event-image-upload"
            className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
          >
            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="event-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <p className="text-sm text-zinc-400">Click the camera icon to upload an event image</p>
      </div>

      <div className="space-y-6 mt-4">
        {/* Event Name */}
        <div className="space-y-1.5">
          <div className="text-sm text-zinc-400 flex items-center gap-2">
            <User className="w-4 h-4" />
            Event Name
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

        {/* Event Description */}
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

        {/* Event Location */}
        <div className="space-y-1.5">
          <div className="text-sm text-zinc-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </div>
          <input
            placeholder="Enter event description"
            className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>


        {/* Event Budget */}
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
      </div>

      {/* Members & Tasks Section */}
      <div className="mt-6 bg-base-300 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">Event Details</h2>

        {/* Members */}
        <div className="space-y-3 text-sm">
          <div className="py-2 border-b border-zinc-700">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members
            </span>
            <input
              type="text"
              placeholder="Search Friends..."
              className="w-full px-4 py-2.5 bg-base-200 rounded-lg border mt-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-40 overflow-y-auto border mt-2 p-2 rounded">
              {friends.filter(friend =>
                friend.username.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 ? (
                <p className="text-sm text-center text-gray-500">Add a friend to get started</p>
              ) : (
                friends
                  .filter(friend =>
                    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(friend => (
                    <div key={friend._id} className="flex justify-between p-2 border-b">
                      <span>{friend.username}</span>
                      <button
                        type="button"
                        onClick={() => handleAddMember(friend)}
                        className="text-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="mt-2">
            <h4 className="text-sm text-zinc-400">Selected Members:</h4>
            {members.map((member) => (
              <div key={member._id} className="flex justify-between p-2 border-b">
                <span>{member.username}</span>
                {!(member._id === authUser._id) && <button type="button" onClick={() => handleRemoveMember(member.username)} className="text-red-500">Remove</button>}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3 text-sm mt-4">
          <div className="py-2 border-b border-zinc-700">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Tasks
            </span>
            {tasks.map((task, index) => (
              <div key={index} className="p-2 border rounded mt-2">
                <input
                  type="text"
                  placeholder="Task Name"
                  className="w-full px-4 py-2 bg-base-200 rounded-lg border"
                  value={task.name}
                  onChange={(e) => handleTaskChange(index, "name", e.target.value)}
                  required
                />
                <textarea
                  placeholder="Task Description"
                  className="w-full px-4 py-2 mt-2 bg-base-200 rounded-lg border"
                  value={task.description}
                  onChange={(e) => handleTaskChange(index, "description", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Task Budget"
                  className="w-full px-4 py-2 mt-2 bg-base-200 rounded-lg border"
                  value={task.budget}
                  onChange={(e) => handleTaskChange(index, "budget", e.target.value)}
                />
                <select
                  className="w-full px-4 py-2 mt-2 bg-base-200 rounded-lg border"
                  value={task.assigned_to}
                  onChange={(e) => handleTaskChange(index, "assigned_to", e.target.value)}
                  required
                >
                  <option value="">Assign to</option>
                  {members.map((member) => (
                    <option key={member.username} value={member.username}>
                      {member.username}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button type="button" onClick={handleAddTask} className="w-50 m-3 bg-pink-400 text-white p-2 rounded mt-2 hover:bg-pink-600">
              + Add Task
            </button>
          </div>
        </div>
      </div>

      <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg mt-6 hover:bg-blue-600">
        Create Event
      </button>
    </div>
  );

};

export default CreateEvent;