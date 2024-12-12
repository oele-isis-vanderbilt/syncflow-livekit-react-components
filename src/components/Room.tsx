"use client";

import { useState } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import ParticipantList from "./participant-list/participant-list";
import Collections from "./collections/collections";

export default function Room({
  token,
  lkServerUrl,
}: {
  token: string;
  lkServerUrl: string;
}) {
  const [expandedParticipant, setExpandedParticipant] = useState<
    string | undefined
  >(undefined);

  const handleParticipantExpand = (identity: string | undefined) => {
    setExpandedParticipant(identity);
  };

  return (
    <LiveKitRoom
      serverUrl={lkServerUrl}
      token={token}
      className="h-full w-full bg-gray-900 text-white"
    >
      <div className="flex flex-col h-full">
        {/* Main content */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Collections */}
          <div className="w-3/4 sm:w-3/4 p-4 overflow-y-auto">
            <Collections expandedParticipant={expandedParticipant} />
          </div>

          {/* Participants */}
          <div className="w-1/4 sm:w-1/4 bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Participants</h2>
            <ParticipantList onParticipantExpand={handleParticipantExpand} />
          </div>
        </div>
      </div>
    </LiveKitRoom>
  );
}
