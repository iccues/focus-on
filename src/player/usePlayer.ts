import { ref, watch, type Ref } from "vue";


export interface PlayerContext {
    isPlaying: Ref<boolean>;
    currentTime: Ref<number>;
    duration: Ref<number>;
    togglePlayPause: () => void;
    seek: (time: number) => void;
}

export function usePlayer(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext {
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);

    const onTimeUpdate = () => {
        if (videoPlayer.value) {
            currentTime.value = videoPlayer.value.currentTime;
        }
    }

    const onLoadedmetadata = () => {
        if (videoPlayer.value) {
            duration.value = videoPlayer.value.duration;
        }
    }

    const onPlay = () => {
        isPlaying.value = true;
    }

    const onPause = () => {
        isPlaying.value = false;
    }


    function togglePlayPause() {
        if (!videoPlayer.value) return;
        if (videoPlayer.value.paused) {
            videoPlayer.value.play();
        } else {
            videoPlayer.value.pause();
        }
    }

    function seek(time: number) {
        if (videoPlayer.value) {
            videoPlayer.value.currentTime = time;
        }
    }

    watch(videoPlayer, (newPlayer, oldPlayer) => {
        if (oldPlayer) {
            oldPlayer.removeEventListener("timeupdate", onTimeUpdate);
            oldPlayer.removeEventListener("loadedmetadata", onLoadedmetadata)
            oldPlayer.removeEventListener("play", onPlay);
            oldPlayer.removeEventListener("pause", onPause);
        }

        if (newPlayer) {
            newPlayer.addEventListener("timeupdate", onTimeUpdate);
            newPlayer.addEventListener("loadedmetadata", onLoadedmetadata);
            newPlayer.addEventListener("play", onPlay);
            newPlayer.addEventListener("pause", onPause);
        }
    }, { immediate: true });

    return {
        isPlaying,
        currentTime,
        duration,
        togglePlayPause,
        seek,
    }
}
