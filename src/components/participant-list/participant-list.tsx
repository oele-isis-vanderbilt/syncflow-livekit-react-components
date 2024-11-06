import type { ComponentProps } from "react";
import { ParticipantLoop, useParticipants } from "@livekit/components-react";
import SingleParticipant, { type SyncflowSingleParticipantTheme } from "./single-participant";
import { participantListTheme } from "./theme";
import { twMerge } from "tailwind-merge";
import type { DeepPartial } from "../../types";
import { mergeDeep } from "../../helpers/merge-deep";
import { ParticipantListContext } from "./participant-list-context";


export interface SyncflowParticipantListTheme {
  root: SyncflowParticipantListRootTheme;
  header: SyncflowParticipantListHeaderTheme;
  participant: SyncflowSingleParticipantTheme;
  loop?: SyncflowParticipantListLoopTheme;
}

export interface SyncflowParticipantListRootTheme {
  base: string
}

export interface SyncflowParticipantListHeaderTheme {
  base: string
  title: string
  search: {
    base: string,
    input: string
  }
}

export interface SyncflowParticipantListLoopTheme {
  base: string
}

export interface ParticipantListProps extends ComponentProps<"div"> {
  theme?: DeepPartial<SyncflowParticipantListTheme>;
  onParticipantExpand: (identity: string | undefined) => void;
}

export default function ParticipantList({
  theme: customTheme = {},
  className,
  onParticipantExpand,
}: ParticipantListProps) {
  const participants = useParticipants();
  const defaultTheme = participantListTheme;
  const theme = mergeDeep(defaultTheme, customTheme);

  const handleParticipantExpand = (identity: string | undefined) => {
    onParticipantExpand(identity);
  };

  return (
    // @ts-ignore
    <ParticipantListContext.Provider value={{ theme }}>
      <div className={twMerge(defaultTheme.root.base, className)}>
        <div className={theme.header.base}>
          <h1 className={theme.header.title}>Participants</h1>
          <div className={theme.header.search.base}>
            <input
              type="text"
              placeholder="Search"
              className={theme.header.search.input}
            />
          </div>
        </div>
        <div className={theme.loop?.base}>
          <ParticipantLoop participants={participants}>
            <SingleParticipant
              theme={theme.participant}
              onExpand={handleParticipantExpand}
            />
          </ParticipantLoop>
        </div>
      </div>
    </ParticipantListContext.Provider>
  );
}