import { ComponentProps, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { TrackReference } from "@livekit/components-react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { DeepPartial } from "../../../types";
import { useParticipantListContext } from "../participant-list-context";
import { mergeDeep } from "../../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

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

  let audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    const track = trackRef.publication?.track;
    if (audioRef.current) {
      track?.attach(audioRef.current);
      audioRef.current.muted = !isPlaying;
      if (isPlaying) {
        startRecording();
      } else {
        stopRecording();
      }
    }

    return () => {
      track?.detach();
      stopRecording();
    };
  }, [trackRef, isPlaying]);

  const startRecording = () => {
    if (audioRef.current) {
      const mediaStream = audioRef.current.captureStream();
      const newMediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: "audio/webm",
      });
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
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
      ></audio>
      <div className={theme.inner}>
        <button onClick={togglePlayback}>
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

