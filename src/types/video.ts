import type {Ref} from "vue";

export interface PlayerContext {
    isPlaying: Ref<boolean>;
    currentTime: Ref<number>;
    duration: Ref<number>;
    togglePlayPause: () => void;
    seek: (time: number) => void;
}

export interface VideoRegion {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface FocusOnData {
    version: string;
    video_resolution: {
        width: number;
        height: number;
    };
    regions: {
        start: number;
        end: number;
        region: VideoRegion;
    }[];
}