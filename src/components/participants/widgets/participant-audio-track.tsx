import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import clsx from "clsx";
import { TrackReference } from "@livekit/components-react";
import { LiveAudioVisualizer } from "react-audio-visualize";

export default function MicrophoneAudioTrack({
  trackRef,
}: {
  trackRef: TrackReference;
}) {
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
    <div className="flex flex-col items-center justify-center w-full">
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
        }}
        hidden
      ></audio>
      <div className="flex flex-col items-center gap-4">
        <button onClick={togglePlayback}>
          <Volume2
            className={clsx("w-10 h-10", {
              "text-gray-500": !isPlaying,
              "text-green-500": isPlaying,
            })}
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

