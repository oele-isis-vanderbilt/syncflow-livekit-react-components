import React, { useState } from "react";
import { TrackReference, VideoTrack } from "@livekit/components-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VideoViewProps {
  trackRefs: TrackReference[];
}

export default function ParticipantVideoView({ trackRefs }: VideoViewProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackRefs.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + trackRefs.length) % trackRefs.length
    );
  };

  return (
    <div className="relative w-full h-full">
      <VideoTrack
        trackRef={trackRefs[currentTrackIndex]}
        className="w-full h-full object-cover rounded"
      />
      {trackRefs.length > 1 && (
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
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
        {currentTrackIndex + 1} / {trackRefs.length}
      </div>
    </div>
  );
}
