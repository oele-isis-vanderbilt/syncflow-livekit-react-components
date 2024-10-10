import { useState } from "react";
import { Track } from "livekit-client";
import {
  useParticipantInfo,
  useParticipantTracks,
  VideoTrack,
  AudioTrack,
} from "@livekit/components-react";
import {
  Video,
  Mic,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ScreenShare,
} from "lucide-react";

import ParticipantAudioTrack from "./ParticipantAudioTrack";

export default function SingleParticipant() {
  const participantInfo = useParticipantInfo();
  const pName = participantInfo.identity;
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeView, setActiveView] = useState("camera");

  const trackRefs = useParticipantTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
    Track.Source.ScreenShare,
    Track.Source.ScreenShareAudio,
  ]);

  const participantCamTrackRef = trackRefs.find(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Video &&
      trackRef.source === Track.Source.Camera
  );

  const participantScreenTrackRef = trackRefs.find(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Video &&
      trackRef.source === Track.Source.ScreenShare
  );

  const participantAudioTrackRef = trackRefs.find(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Audio &&
      trackRef.source === Track.Source.Microphone
  );

  const handleViewToggle = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="bg-gray-900 text-white p-3 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{pName}</div>
          <div className="text-xs text-gray-400">RM_Qb77MRfZJphV</div>
        </div>
        <div className="flex items-center space-x-2">
          {participantCamTrackRef && (
            <Video
              size={16}
              onClick={() => handleViewToggle("camera")}
              className={`cursor-pointer ${
                activeView === "camera" ? "text-white" : "text-gray-500"
              }`}
            />
          )}
          {participantScreenTrackRef && (
            <ScreenShare
              size={16}
              onClick={() => handleViewToggle("screen")}
              className={`cursor-pointer ${
                activeView === "screen" ? "text-white" : "text-gray-500"
              }`}
            />
          )}
          {participantAudioTrackRef && (
            <Mic
              size={16}
              onClick={() => handleViewToggle("audio")}
              className={`cursor-pointer ${
                activeView === "audio" ? "text-white" : "text-gray-500"
              }`}
            />
          )}
          <MoreHorizontal size={16} className="text-gray-500 cursor-pointer" />
          {isExpanded ? (
            <ChevronUp
              size={16}
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer text-gray-500"
            />
          ) : (
            <ChevronDown
              size={16}
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer text-gray-500"
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 relative w-full h-48">
          {activeView === "camera" && participantCamTrackRef && (
            <VideoTrack
              trackRef={participantCamTrackRef}
              className="w-full h-full object-cover rounded"
            />
          )}
          {activeView === "screen" && participantScreenTrackRef && (
            <VideoTrack
              trackRef={participantScreenTrackRef}
              className="w-full h-full object-contain rounded"
            />
          )}
          {activeView === "audio" && participantAudioTrackRef && (
            <div className="flex flex-row gap-2 items-center justify-between">
              <div className="">
                {participantInfo.identity}{' '}({participantAudioTrackRef.publication.kind})
              </div>
              <div>
              <ParticipantAudioTrack
                trackRef={participantAudioTrackRef}
                participant={participantInfo}
              />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
