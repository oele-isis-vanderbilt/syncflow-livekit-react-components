"use client";

import { createContext, useContext } from "react";
import type { SyncflowCollectionsTheme } from "./collections";

type CollectionsContext = {
  theme: SyncflowCollectionsTheme | undefined;
};

export const CollectionsContext = createContext<CollectionsContext | undefined>(
  undefined
);

export function useCollectionsContext(): CollectionsContext {
  const context = useContext(CollectionsContext);

  if (!context) {
    throw new Error(
      "useCollectionsContext should be used within the CollectionsContext provider!"
    );
  }

  return context;
}
