import {ref, type Ref, watch} from "vue";
import type {PlayerContext} from "../types/video.ts";


export function useVideoPlayer(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext {
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const volume = ref(1);
    const isMuted = ref(false);

    const handleTimeUpdate = () => {
        if (!videoPlayer.value) return;
        currentTime.value = videoPlayer.value.currentTime;
    }

    const handleLoadedmetadata = () => {
        if (!videoPlayer.value) return;
        duration.value = videoPlayer.value.duration;
    }

    const handlePlay = () => {
        isPlaying.value = true;
    }

    const handlePause = () => {
        isPlaying.value = false;
    }

    const handleVolumeChange = () => {
        if (!videoPlayer.value) return;
        volume.value = videoPlayer.value.volume;
        isMuted.value = videoPlayer.value.muted;
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
        if (!videoPlayer.value) return;
        videoPlayer.value.currentTime = time;
    }

    function setVolume(newVolume: number) {
        if (!videoPlayer.value) return;
        const clamped = Math.min(1, Math.max(0, newVolume));
        videoPlayer.value.volume = clamped;
    }

    function toggleMute() {
        if (!videoPlayer.value) return;
        videoPlayer.value.muted = !videoPlayer.value.muted;
    }

    watch(videoPlayer, (newPlayer, oldPlayer) => {
        if (oldPlayer) {
            oldPlayer.removeEventListener("timeupdate", handleTimeUpdate);
            oldPlayer.removeEventListener("loadedmetadata", handleLoadedmetadata)
            oldPlayer.removeEventListener("play", handlePlay);
            oldPlayer.removeEventListener("pause", handlePause);
            oldPlayer.removeEventListener("volumechange", handleVolumeChange);
        }

        if (newPlayer) {
            newPlayer.addEventListener("timeupdate", handleTimeUpdate);
            newPlayer.addEventListener("loadedmetadata", handleLoadedmetadata);
            newPlayer.addEventListener("play", handlePlay);
            newPlayer.addEventListener("pause", handlePause);
            newPlayer.addEventListener("volumechange", handleVolumeChange);

            // initialize element state from refs
            newPlayer.volume = volume.value;
            newPlayer.muted = isMuted.value;
        }
    }, { immediate: true });

    return {
        isPlaying,
        currentTime,
        duration,
        togglePlayPause,
        seek,
        volume,
        isMuted,
        setVolume,
        toggleMute,
    }
}
