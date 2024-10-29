"use client";

import { createContext, useContext } from "react";
import type { SyncflowParticipantListTheme } from "./participant-list";


type ParticipantListContext = {
  theme: SyncflowParticipantListTheme;
};

export const ParticipantListContext = createContext<ParticipantListContext | undefined>(
  undefined
);

export function useParticipantListContext(): ParticipantListContext {
  const context = useContext(ParticipantListContext);

  if (!context) {
    throw new Error(
      "useParticipantListContext should be used within the ParticipantListContext provider!"
    );
  }

  return context;
}
