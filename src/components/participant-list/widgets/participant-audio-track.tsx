import { type ComponentProps, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import type { TrackReference } from "@livekit/components-react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import type { DeepPartial } from "../../../types";
import { useParticipantListContext } from "../participant-list-context";
import { mergeDeep } from "../../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

interface HTMLAudioElementWithCaptureStream extends HTMLAudioElement {
  captureStream(): MediaStream;
}

export interface SyncflowParticipantAudioTrackTheme {
  base: string,
  inner: string
  volume: {
    base: string
    on: string
    off: string
  }
}

export interface ParticipantAudioTrackProps extends ComponentProps<"div"> {
  trackRef: TrackReference
  theme?: DeepPartial<SyncflowParticipantAudioTrackTheme>;
}

export default function ParticipantAudioTrack({
  trackRef,
  theme: customTheme ={},
  className,
}: ParticipantAudioTrackProps) {
  const {theme: rootTheme} = useParticipantListContext();
  
  const theme = mergeDeep(rootTheme.participant.audio.audioTrack, customTheme)

  const audioRef = useRef<HTMLAudioElementWithCaptureStream>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    const track = trackRef.publication?.track;
    if (track && audioRef.current) {
      track.attach(audioRef.current);
    }
    return () => {
      if (track) {
        track.detach();
      }
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        setMediaRecorder(null);
      }
    };
  }, [trackRef]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
        const mediaStream = audioRef.current.captureStream();
        const mediaRecorder = new MediaRecorder(mediaStream, {
          mimeType: "audio/webm",
        });
        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        mediaRecorder?.stop();
        setMediaRecorder(null);
      }
    }
  };

  return (
    <div className={twMerge(theme.base, className)}>
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
        }}
        hidden
      />
      <div className={theme.inner}>
        <button type="button" onClick={togglePlayback}>
          <Volume2
            className={twMerge(
              theme.volume.base,
              isPlaying ? theme.volume.on : theme.volume.off
            )}
          />
        </button>
        <div>
          {mediaRecorder && (
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorder}
              width={200}
              height={75}
            />
          )}
        </div>
      </div>
    </div>
  );
}

