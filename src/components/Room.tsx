import { LiveKitRoom } from "@livekit/components-react";
import ParticipantList from "./participants/participant-list";
import Collections from "./collections/collections";

export default function Room({ token }: { token: string }) {
  return (
    <LiveKitRoom
      serverUrl={import.meta.env.VITE_LIVEKIT_URL}
      token={token}
      className="h-screen w-full bg-gray-900 text-white"
    >
      <div className="flex flex-col h-full">
        {/* Main content */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Collections */}
          <div className="w-full sm:w-3/4 p-4 overflow-y-auto">
            <Collections />
          </div>

          {/* Participants */}
          <div className="w-full sm:w-1/4 bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Participants</h2>
            <ParticipantList />
          </div>
        </div>
      </div>
    </LiveKitRoom>
  );
};
