import { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { TrackReference, useTracks, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function Collections() {
  // Return all camera track publications.
  const trackReferences: TrackReference[] = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Collections</h1>
        <button className="bg-blue-500 p-2 rounded-full">
          <Plus size={24} />
        </button>
      </div>

      {trackReferences.map((collection) => (
        <div key={collection.participant.identity} className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="font-semibold">{collection.source}</h2>
              <p className="text-sm text-gray-400">{collection.participant.name}</p>
            </div>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="flex space-x-2">
            <div className="bg-gray-700 w-full h-70 rounded-lg">
                <VideoTrack trackRef={collection} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

