<script setup lang="ts">

import type {PlayerContext} from "../../types/video.ts";
import {formatTime} from "../../utils/timeFormatter.ts";


const props = defineProps<{
    videoPlayer: PlayerContext;
}>();

const {
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seek
} = props.videoPlayer;

function handleProgressChange(event: Event) {
    const target = event.target as HTMLInputElement;
    seek(parseFloat(target.value));
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
        <button class="video-player-controls__control-btn video-player-controls__fullscreen-btn">⛶</button>
    </div>
</template>

<style scoped>
@import '../../styles/video-player-controls.css';
</style>
