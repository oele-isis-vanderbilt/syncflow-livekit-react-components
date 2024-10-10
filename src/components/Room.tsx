import { LiveKitRoom } from "@livekit/components-react";
import ParticipantList from "./participants/participant-list";

export default function Room({ token }: { token: string }) {
  return (
    <LiveKitRoom
      serverUrl={import.meta.env.VITE_LIVEKIT_URL}
      token={token}
      className="h-full w-full bg-gray-900"
    >
      <ParticipantList />
    </LiveKitRoom>
  );
}
