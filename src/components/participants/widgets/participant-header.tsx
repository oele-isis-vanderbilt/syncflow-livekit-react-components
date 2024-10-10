import React from "react";
import {
  Video,
  Mic,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ScreenShare,
} from "lucide-react";
import ParticipantInfo from "./participant-props";

interface ParticipantHeaderProps {
  participantInfo: ParticipantInfo;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  activeView: string;
  handleViewToggle: (view: string) => void;
  hasVideo: boolean;
  hasAudio: boolean;
  hasScreenshare: boolean;
}

export default function ParticipantHeader({
  participantInfo,
  isExpanded,
  setIsExpanded,
  activeView,
  handleViewToggle,
  hasVideo,
  hasAudio,
  hasScreenshare
}: ParticipantHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold">{participantInfo.identity}</div>
        <div className="text-xs text-gray-400">RM_Qb77MRfZJphV</div>
      </div>
      <div className="flex items-center space-x-2">
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
