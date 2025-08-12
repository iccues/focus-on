import type {Ref} from "vue";

export interface PlayerContext {
    isPlaying: Ref<boolean>;
    currentTime: Ref<number>;
    duration: Ref<number>;
    togglePlayPause: () => void;
    seek: (time: number) => void;
    volume: Ref<number>;
    isMuted: Ref<boolean>;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    events: {
        onLoadedmetadata: (callback: () => void) => void;
    };
}

export interface VideoRegion {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface FocusOnData {
    version: string;
    regions: {
        start: number;
        end: number;
        region: VideoRegion;
    }[];
}