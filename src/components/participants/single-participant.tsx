import React, { useState } from "react";
import { Track } from "livekit-client";
import {
  useParticipantInfo,
  useParticipantTracks,
} from "@livekit/components-react";
import ParticipantHeader from "./widgets/participant-header";
import ParticipantVideoView from "./widgets/participant-video-view";
import ParticipantAudioView from "./widgets/participant-audio-view";


export default function SingleParticipant() {
  const participantInfo = useParticipantInfo();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeView, setActiveView] = useState("camera");

  const trackRefs = useParticipantTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
    Track.Source.ScreenShare,
    Track.Source.ScreenShareAudio,
  ]);

  const participantVideoTrackRefs = trackRefs.filter(
    (trackRef) => trackRef.publication.kind === Track.Kind.Video &&
    trackRef.source === Track.Source.Camera
  );

  const participantAudioTrackRefs = trackRefs.filter(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Audio
  );

  const participantScreenTrackRefs = trackRefs.filter(
    (trackRef) => trackRef.publication.kind === Track.Kind.Video &&
    trackRef.source === Track.Source.ScreenShare
  );

  const handleViewToggle = (view) => {
    setActiveView(view);
  };

  return (
    <div className="bg-gray-900 text-white p-3 rounded-lg mb-2">
      <ParticipantHeader
        participantInfo={participantInfo}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        activeView={activeView}
        handleViewToggle={handleViewToggle}
        hasVideo={participantVideoTrackRefs.length > 0}
        hasAudio={participantAudioTrackRefs.length > 0}
        hasScreenshare = {participantScreenTrackRefs.length > 0}
      />
      {isExpanded && (
        <div className="mt-4 relative w-full h-48">
          {activeView === "camera" && participantVideoTrackRefs.length > 0 && (
            <ParticipantVideoView trackRefs={participantVideoTrackRefs} />
          )}
          {activeView === "audio" && participantAudioTrackRefs && (
            <ParticipantAudioView
              participantInfo={participantInfo}
              audioTrackRefs={participantAudioTrackRefs}
            />
          )}
          {activeView === "screenshare" &&
            participantScreenTrackRefs.length > 0 && (
              <ParticipantVideoView trackRefs={participantScreenTrackRefs} />
            )}
        </div>
      )}
    </div>
  );
}
