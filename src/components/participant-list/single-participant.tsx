import React, { ComponentProps, useState } from "react";
import { Track } from "livekit-client";
import {
  useParticipantInfo,
  useParticipantTracks,
} from "@livekit/components-react";
import ParticipantHeader, { SyncflowParticipantHeaderTheme } from "./widgets/participant-header";
import ParticipantVideoView, { SyncflowParticipantVideoViewTheme } from "./widgets/participant-video-view";
import ParticipantAudioView, { SyncflowParticipantAudioViewTheme } from "./widgets/participant-audio-view";import { SyncflowParticipantAudioTrackTheme } from "./widgets/participant-audio-track";
import { DeepPartial } from "../../types";
import { useParticipantListContext } from "./participant-list-context";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

export interface SyncflowSingleParticipantTheme {
  base: string;
  media: string;
  header: SyncflowParticipantHeaderTheme;
  audio: SyncflowParticipantAudioViewTheme;
  video: SyncflowParticipantVideoViewTheme;
}

export interface SingleParticipantProps extends ComponentProps<"div"> {
  theme?: DeepPartial<SyncflowSingleParticipantTheme>
}

export default function SingleParticipant({theme: customTheme = {}, className}:SingleParticipantProps) {
  const { theme: rootTheme } = useParticipantListContext();
  const theme = mergeDeep(rootTheme.participant, customTheme);
  
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
    <div className={twMerge(theme.base, className)}>
      <ParticipantHeader
        participantInfo={participantInfo}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        activeView={activeView}
        handleViewToggle={handleViewToggle}
        hasVideo={participantVideoTrackRefs.length > 0}
        hasAudio={participantAudioTrackRefs.length > 0}
        hasScreenshare = {participantScreenTrackRefs.length > 0}
        theme={theme.header}
      />
      {isExpanded && (
        <div className={theme.media}>
          {activeView === "camera" && participantVideoTrackRefs.length > 0 && (
            <ParticipantVideoView trackRefs={participantVideoTrackRefs} theme={theme.video} />
          )}
          {activeView === "audio" && participantAudioTrackRefs && (
            <ParticipantAudioView
              participantInfo={participantInfo}
              audioTrackRefs={participantAudioTrackRefs}
              theme={theme.audio}
            />
          )}
          {activeView === "screenshare" &&
            participantScreenTrackRefs.length > 0 && (
              <ParticipantVideoView trackRefs={participantScreenTrackRefs} theme={theme.video}/>
            )}
        </div>
      )}
    </div>
  );
}