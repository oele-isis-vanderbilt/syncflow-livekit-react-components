import React, { ComponentProps, useState, useRef } from "react";
import {
  TrackReference,
  VideoTrack,
  AudioTrack,
} from "@livekit/components-react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Volume2,
  ChevronDown,
} from "lucide-react";
import { DeepPartial } from "../../types";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";
import { useCollectionsContext } from "./collections-context";

export interface SyncflowCollectionsVideoViewTheme {
  base: string;
  infoPanel: {
    base: string;
    name: string;
    identity: string;
    type: string;
  };
  videoContainer: string;
  videoTrack: string;
  controls: {
    base: string;
    button: string;
    icon: string;
    numbers: string;
    dropdown: {
      button: string;
      menu: string;
      item: string;
    };
  };
}

export interface VideoViewProps extends ComponentProps<"div"> {
  trackRefs: TrackReference[];
  audioTrackRefs: TrackReference[];
  theme?: DeepPartial<SyncflowCollectionsVideoViewTheme>;
  videoInfo?: {
    name: string;
    identity: string;
    type: string;
  };
}

export default function CollectionVideoView({
  trackRefs,
  audioTrackRefs,
  theme: customTheme = {},
  className,
}: VideoViewProps) {
  const { theme: rootTheme } = useCollectionsContext();
  const theme = mergeDeep(rootTheme.collection.video, customTheme);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [selectedAudio, setSelectedAudio] = useState<number>(0);
  const [isAudioDropdownOpen, setIsAudioDropdownOpen] =
    useState<boolean>(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackRefs.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + trackRefs.length) % trackRefs.length
    );
  };

  const handleFullScreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  const toggleAudioDropdown = () => {
    setIsAudioDropdownOpen(!isAudioDropdownOpen);
  };

  const selectAudioTrack = (index: number) => {
    setSelectedAudio(index);
    setIsAudioDropdownOpen(false);
  };

  return (
    <div className={twMerge(theme.base, className)}>
      <div className={theme.infoPanel.base}>
        <span className={theme.infoPanel.name}>
          {trackRefs[currentTrackIndex].participant.identity}
        </span>
        <span className={theme.infoPanel.identity}>
          {audioTrackRefs[selectedAudio].source}
        </span>
        <span className={theme.infoPanel.type}>
          {trackRefs[currentTrackIndex].source}
        </span>
      </div>
      <div ref={videoContainerRef} className={theme.videoContainer}>
        <VideoTrack
          trackRef={trackRefs[currentTrackIndex]}
          className={theme.videoTrack}
        />
        <AudioTrack trackRef={audioTrackRefs[selectedAudio]} />
      </div>
      <div className={theme.controls.base}>
        <button onClick={handlePrevTrack} className={theme.controls.button}>
          <ChevronLeft className={theme.controls.icon} />
        </button>
        <span className={theme.controls.numbers}>
          {currentTrackIndex + 1} / {trackRefs.length}
        </span>
        <button onClick={handleNextTrack} className={theme.controls.button}>
          <ChevronRight className={theme.controls.icon} />
        </button>
        <button onClick={handleFullScreen} className={theme.controls.button}>
          <Maximize className={theme.controls.icon} />
        </button>
        <div className={theme.controls.dropdown.button}>
          <button
            onClick={toggleAudioDropdown}
            className={theme.controls.button}
          >
            <Volume2 className={theme.controls.icon} />
            <ChevronDown className={theme.controls.icon} />
          </button>
          {isAudioDropdownOpen && (
            <div className={theme.controls.dropdown.menu}>
              {audioTrackRefs.map((track, index) => (
                <button
                  key={index}
                  onClick={() => selectAudioTrack(index)}
                  className={theme.controls.dropdown.item}
                >
                  {track.source}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
