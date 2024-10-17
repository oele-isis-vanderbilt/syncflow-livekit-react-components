import React, { ComponentProps, useState } from "react";
import { TrackReference } from "@livekit/components-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ParticipantInfo from "./participant-props";
import ParticipantAudioTrack, { SyncflowParticipantAudioTrackTheme } from "./participant-audio-track";
import { DeepPartial } from "../../../types";
import { mergeDeep } from "../../../helpers/merge-deep";
import { useParticipantListContext } from "../participant-list-context";
import { twMerge } from "tailwind-merge";

export interface SyncflowParticipantAudioViewTheme {
  base: string,
  title: string,
  audioTrack: SyncflowParticipantAudioTrackTheme,
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

interface ParticipantAudioViewProps extends ComponentProps<"div">{
  participantInfo: ParticipantInfo;
  audioTrackRefs: TrackReference[];
  theme?: DeepPartial<SyncflowParticipantAudioViewTheme>;
}

export default function ParticipantAudioView({
  participantInfo,
  audioTrackRefs,
  theme: customTheme= {},
  className,
}: ParticipantAudioViewProps) {
  const { theme: rootTheme} = useParticipantListContext();
  const theme = mergeDeep(rootTheme.participant.audio, customTheme);


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
    <div className={twMerge(theme.base, className)}>
      <div className={theme.title}>
        {participantInfo.identity} ({audioTrackRefs[currentTrackIndex].source})
      </div>
      <ParticipantAudioTrack trackRef={audioTrackRefs[currentTrackIndex]} theme={theme.audioTrack} />
      {audioTrackRefs.length > 1 && (
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
        {currentTrackIndex + 1} / {audioTrackRefs.length}
      </div>
    </div>
  );
}
