import { useState } from "react";
import { ParticipantLoop, useParticipants, useRoomInfo } from "@livekit/components-react";
import { Search } from "lucide-react";
import SingleParticipant from "./single-participant";

export default function ParticipantList() {
  const roomInfo = useRoomInfo();
  console.log(roomInfo)
  const participants = useParticipants();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Participants</h1>
        <div className="relative w-full sm:w-48">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-blue-600 text-white pl-3 pr-8 py-1 rounded-md placeholder-white placeholder-opacity-75"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            size={18}
          />
        </div>
      </div>
      <ParticipantLoop participants={participants}>
        <SingleParticipant />
      </ParticipantLoop>
    </div>
  );
}
