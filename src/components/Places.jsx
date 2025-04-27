import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios"
import { Plus } from "lucide-react";
import { Link } from 'react-router-dom'

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axiosInstance.get("/places");
                setPlaces(response.data);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
            setLoading(false);
        };

        fetchPlaces();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-center mt-10 mb-10 cherry-bomb-one-regular text-[#414141]">Popular Locations in Dublin</h1>

            {loading && <p className="text-center">Loading...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {places.map((place) => (
                    <div key={place.place_id} className="border p-4 rounded-lg shadow-lg bg-white flex items-center justify-between max-w-sm">
                        {/* Left Content */}
                        <div className="flex-1">
                            <h2 className="text-lg font-bold">{place.name}</h2>

                            {/* Place Type */}
                            <p className="text-sm text-gray-600 capitalize">
                                {place.types[0].replace(/_/g, " ")}
                            </p>

                            {/* Rating with Stars */}
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-lg">
                                    {"⭐".repeat(Math.round(place.rating))}
                                </span>
                                <span className="ml-2 text-sm text-gray-600">{place.rating}</span>
                            </div>
                        </div>

                        <div className="border-l-2 border-dotted border-gray-300 pl-4 ml-4 flex flex-col justify-center items-center h-full">
                            <div className="group relative">
                                {/* Plus Sign Icon */}
                                <Link to={'/newevent'} state={{ location: place.name }}><Plus className="text-gray-600 hover:text-pink-600 text-3xl cursor-pointer" /></Link>
                                <div className="absolute hidden group-hover:block bg-pink-100 text-sm rounded p-1 ml-5 text-nowrap">
                                    Create event here
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Places;