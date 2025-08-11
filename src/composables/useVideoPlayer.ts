import {ref, type Ref, watch} from "vue";
import type {PlayerContext} from "../types/video.ts";


export function useVideoPlayer(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext {
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);

    const handleTimeUpdate = () => {
        if (videoPlayer.value) {
            currentTime.value = videoPlayer.value.currentTime;
        }
    }

    const handleLoadedmetadata = () => {
        if (videoPlayer.value) {
            duration.value = videoPlayer.value.duration;
        }
    }

    const handlePlay = () => {
        isPlaying.value = true;
    }

    const handlePause = () => {
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
            oldPlayer.removeEventListener("timeupdate", handleTimeUpdate);
            oldPlayer.removeEventListener("loadedmetadata", handleLoadedmetadata)
            oldPlayer.removeEventListener("play", handlePlay);
            oldPlayer.removeEventListener("pause", handlePause);
        }

        if (newPlayer) {
            newPlayer.addEventListener("timeupdate", handleTimeUpdate);
            newPlayer.addEventListener("loadedmetadata", handleLoadedmetadata);
            newPlayer.addEventListener("play", handlePlay);
            newPlayer.addEventListener("pause", handlePause);
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
