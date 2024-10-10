import React, { useState } from "react";
import { TrackReference } from "@livekit/components-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ParticipantInfo from "./participant-props";
import ParticipantAudioTrack from "./participant-audio-track";

interface AudioViewProps {
  participantInfo: ParticipantInfo;
  audioTrackRefs: TrackReference[];
}

export default function ParticipantAudioView({
  participantInfo,
  audioTrackRefs,
}: AudioViewProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const handleNextTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex + 1) % audioTrackRefs.length
    );
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) =>
        (prevIndex - 1 + audioTrackRefs.length) % audioTrackRefs.length
    );
  };

  return (
    <div className="relative w-full rounded">
      <div className="mb-2">
        {participantInfo.identity} ({audioTrackRefs[currentTrackIndex].source})
      </div>
      <ParticipantAudioTrack trackRef={audioTrackRefs[currentTrackIndex]} />
      {audioTrackRefs.length > 1 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
          <button
            onClick={handlePrevTrack}
            className="bg-black bg-opacity-50 p-1 rounded-full"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={handleNextTrack}
            className="bg-black bg-opacity-50 p-1 rounded-full"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs text-white">
        {currentTrackIndex + 1} / {audioTrackRefs.length}
      </div>
    </div>
  );
}
