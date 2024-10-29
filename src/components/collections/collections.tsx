import type { ComponentProps } from "react";
import {
  useParticipantTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import type { DeepPartial } from "../../types";
import { collectionsTheme } from "./theme";
import { mergeDeep } from "../../helpers/merge-deep";
import { CollectionsContext } from "./collections-context";
import type{ SyncflowCollectionsVideoViewTheme } from "./collections-video-view";
import CollectionVideoView from "./collections-video-view";

export interface SyncflowCollectionsTheme {
  root: SyncflowCollectionsRootTheme;
  header: SyncflowCollectionsHeaderTheme;
  collection: SyncflowSingleCollectionTheme;
}

export interface SyncflowCollectionsRootTheme {
  base: string;
}

export interface SyncflowCollectionsHeaderTheme {
  base: string;
  title: string;
}
export interface SyncflowSingleCollectionTheme {
  base: string;
  title: string;
  video: SyncflowCollectionsVideoViewTheme;
}


export interface CollectionsProps extends ComponentProps<"div"> {
  theme?: DeepPartial<SyncflowCollectionsTheme>;
  expandedParticipant: string | undefined;
}

export default function Collections({ 
  theme: customTheme = {},
  expandedParticipant 
}: CollectionsProps) {
  const defaultTheme = collectionsTheme
  const theme = mergeDeep(defaultTheme, customTheme);

  const trackRefs = useParticipantTracks(
    [
      Track.Source.Camera,
      Track.Source.Microphone,
      Track.Source.ScreenShare,
      Track.Source.ScreenShareAudio,
    ],
    expandedParticipant
  );

  const participantVideoTrackRefs = trackRefs.filter(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Video 
  );
  const participantAudioTrackRefs = trackRefs.filter(
    (trackRef) => trackRef.publication.kind === Track.Kind.Audio
  );

  return (
    <CollectionsContext.Provider value={{ theme, expandedParticipant }}>
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Collections</h1>
        </div>

        {participantVideoTrackRefs.length > 0 && (
          <CollectionVideoView
            theme={theme.collection.video}
            trackRefs={participantVideoTrackRefs}
            audioTrackRefs={participantAudioTrackRefs}
          />
        )}
      </div>
    </CollectionsContext.Provider>
  );
};
