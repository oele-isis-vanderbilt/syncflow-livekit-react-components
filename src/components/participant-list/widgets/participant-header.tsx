import React, { ComponentProps } from "react";
import {
  Video,
  Mic,
  ChevronUp,
  ChevronDown,
  ScreenShare,
} from "lucide-react";
import ParticipantInfo from "./participant-props";
import { DeepPartial } from "../../../types";
import { useParticipantListContext } from "../participant-list-context";
import { mergeDeep } from "../../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

export interface SyncflowParticipantHeaderTheme {
  base:string,
  identity:string,
  room:string,
  inner:string
}

export interface ParticipantHeaderProps extends ComponentProps<"div">{
  participantInfo: ParticipantInfo;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  activeView: string;
  handleViewToggle: (view: string) => void;
  hasVideo: boolean;
  hasAudio: boolean;
  hasScreenshare: boolean;
  theme?: DeepPartial<SyncflowParticipantHeaderTheme>;
}

export default function ParticipantHeader({
  participantInfo,
  isExpanded,
  setIsExpanded,
  activeView,
  handleViewToggle,
  hasVideo,
  hasAudio,
  hasScreenshare,
  theme:customTheme = {},
  className
}: ParticipantHeaderProps) {
  const { theme: rootTheme } = useParticipantListContext();

  const theme = mergeDeep(rootTheme.participant.header, customTheme);

  return (
    <div className={twMerge(theme.base, className)}>
      <div>
        <div className={theme.identity}>{participantInfo.identity}</div>
        <div className={theme.room}>RM_Qb77MRfZJphV</div>
      </div>
      <div className={theme.inner}>
        <ControlButtons
          hasVideo={hasVideo}
          hasAudio={hasAudio}
          hasScreenshare={hasScreenshare}
          activeView={activeView}
          handleViewToggle={handleViewToggle}
        />
        <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>
    </div>
  );
}

interface ControlButtonsProps {
  hasVideo: boolean;
  hasAudio: boolean;
  hasScreenshare: boolean;
  activeView: string;
  handleViewToggle: (view: string) => void;
}

function ControlButtons({
  hasVideo,
  hasAudio,
  hasScreenshare,
  activeView,
  handleViewToggle,
}: ControlButtonsProps) {
  return (
    <>
      {hasVideo && (
        <Video
          size={16}
          onClick={() => handleViewToggle("camera")}
          className={`cursor-pointer ${
            activeView === "camera" ? "text-white" : "text-gray-500"
          }`}
        />
      )}
      {hasAudio && (
        <Mic
          size={16}
          onClick={() => handleViewToggle("audio")}
          className={`cursor-pointer ${
            activeView === "audio" ? "text-white" : "text-gray-500"
          }`}
        />
      )}
      {hasScreenshare && (
        <ScreenShare
          size={16}
          onClick={() => handleViewToggle("screenshare")}
          className={`cursor-pointer ${
            activeView === "screenshare" ? "text-white" : "text-gray-500"
          }`}
        />
      )}
    </>
  );
}

interface ExpandButtonProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExpandButton({ isExpanded, setIsExpanded }: ExpandButtonProps) {
  return isExpanded ? (
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
  );
}
