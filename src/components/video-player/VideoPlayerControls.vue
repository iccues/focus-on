<script setup lang="ts">

import type {PlayerContext, ViewportContext} from "../../types/video.ts";
import {formatTime} from "../../utils/timeFormatter.ts";


const props = defineProps<{
    playerContext: PlayerContext;
    viewportContext: ViewportContext;
}>();

const {
    playback: {
        isPlaying,
        togglePlayPause,
    },
    time: {
        currentTime,
        duration,
        seek,
    },
    volume: {
        volume,
        isMuted,
        setVolume,
        toggleMute,
    },
} = props.playerContext;

const {
    isFullscreen,
    toggleFullscreen,
} = props.viewportContext;

function handleProgressChange(event: Event) {
    const target = event.target as HTMLInputElement;
    seek(parseFloat(target.value));
}

function handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setVolume(parseFloat(target.value));
}

</script>

<template>
    <div class="video-player-controls__container">
        <button class="video-player-controls__control-btn video-player-controls__play-pause-btn" @click="togglePlayPause">
            <img v-if="!isPlaying" src="../../assets/icons/play.svg" alt="Play" />
            <img v-else src="../../assets/icons/pause.svg" alt="Pause" />
        </button>
        <input type="range" class="video-player-controls__progress-bar"
            :value="currentTime"
            min="0"
            :max="duration"
            step="0.1"
            @input="handleProgressChange"
        />
        <span class="video-player-controls__time-display">{{ `${formatTime(currentTime)} / ${formatTime(duration)}` }}</span>
        <div class="video-player-controls__volume-container">
            <button class="video-player-controls__control-btn video-player-controls__volume-btn" @click="toggleMute">
                <img v-if="isMuted" src="../../assets/icons/mute.svg" alt="Mute" />
                <img v-else src="../../assets/icons/volume.svg" alt="Volume" />
            </button>
            <input
                type="range"
                class="video-player-controls__volume-slider"
                :value="volume"
                min="0"
                max="1"
                step="0.01"
                @input="handleVolumeChange"
            />
        </div>
        <button class="video-player-controls__control-btn video-player-controls__fullscreen-btn"
            @click="toggleFullscreen"
        >
            <img v-if="!isFullscreen" src="../../assets/icons/entryFullScreen.svg" alt="Enter Fullscreen" />
            <img v-else src="../../assets/icons/exitFullScreen.svg" alt="Exit Fullscreen" />
        </button>
    </div>
</template>

<style scoped>
@import '../../styles/video-player-controls.css';
</style>
