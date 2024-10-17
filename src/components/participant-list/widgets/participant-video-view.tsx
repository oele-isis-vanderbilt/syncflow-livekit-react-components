import React, { ComponentProps, useState } from "react";
import { TrackReference, VideoTrack } from "@livekit/components-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DeepPartial } from "../../../types";
import { useParticipantListContext } from "../participant-list-context";
import { mergeDeep } from "../../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

export interface SyncflowParticipantVideoViewTheme {
  base: string,
  videoTrack:string,
  controls: {
    base:string,
    left: {
      button:string,
      icon:string
    },
    right: {
      button:string,
      icon: string
    }
    numbers: string
  }
}

export interface VideoViewProps extends ComponentProps<"div"> {
  trackRefs: TrackReference[];
  theme? : DeepPartial<SyncflowParticipantVideoViewTheme>;
}

export default function ParticipantVideoView({ 
  trackRefs,
  theme: customTheme = {},
  className,
 }: VideoViewProps) {
  const { theme: rootTheme } = useParticipantListContext();

  const theme = mergeDeep(rootTheme.participant.video, customTheme);

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
    <div className={twMerge(theme.base, className)}>
      <VideoTrack
        trackRef={trackRefs[currentTrackIndex]}
        className={theme.videoTrack}
      />
      {trackRefs.length > 1 && (
        <div className={theme.controls.base}>
          <button
            onClick={handlePrevTrack}
            className={theme.controls.left.button}
          >
            <ChevronLeft size={20} className={theme.controls.left.icon} />
          </button>
          <button
            onClick={handleNextTrack}
            className={theme.controls.right.button}
          >
            <ChevronRight size={20} className={theme.controls.right.icon} />
          </button>
        </div>
      )}
      <div className={theme.controls.numbers}>
        {currentTrackIndex + 1} / {trackRefs.length}
      </div>
    </div>
  );
}
