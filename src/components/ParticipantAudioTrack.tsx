
import { useEffect, useRef, useState } from "react";
import { Volume2 } from 'lucide-react'
import clsx from "clsx";
import { TrackReference } from "@livekit/components-react";
import { LiveAudioVisualizer } from "react-audio-visualize";


export default function MicrophoneAudioTrack({
    trackRef,
    participant,
}: {
    trackRef: TrackReference;
    participant?: {
        identity: string | undefined;
        name: string | undefined, metadata: string | undefined
    };
}) {
    let audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mediaRecorder, setmediaRecorder] = useState<MediaRecorder | null>(null);

    useEffect(() => {
        const track = trackRef.publication?.track;
        if (audioRef.current) {
            track?.attach(audioRef.current);
            audioRef.current.muted = !isPlaying;
            if (isPlaying) {
                const mediaStream = audioRef.current.captureStream();
                const mediaRecorder = new MediaRecorder(
                    mediaStream,
                    {
                        mimeType: "audio/webm",
                    }
                );
                mediaRecorder.start();
                mediaRecorder.ondataavailable = (e) => {
                    console.log(e.data);
                };
                setmediaRecorder(
                    mediaRecorder
                );
            }
        }

        return () => {
            track?.detach();
        };
    }, [trackRef, isPlaying]);

    return (
        <div>
            <audio ref={audioRef} onEnded={() => {
                setIsPlaying(false);
            }} hidden src="https://samplelib.com/lib/preview/mp3/sample-12s.mp3" >
            </audio>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        if (audioRef.current) {
                            if (!isPlaying) {
                                audioRef.current.play();
                                setIsPlaying(true);
                            } else {
                                audioRef.current.pause();
                                setIsPlaying(false);
                            }
                        }
                    }}
                >
                    <Volume2 className={
                        clsx("w-10 h-10", {
                            "text-gray-500": !isPlaying,
                            "text-green-500": isPlaying,
                        })
                    }
                    />
                </button>
                <div>
                    {mediaRecorder && (<LiveAudioVisualizer mediaRecorder={mediaRecorder} width={50} height={75} />)}
                </div>
            </div>

        </div>
    );
}