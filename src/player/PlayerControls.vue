<script setup lang="ts">
import { type PlayerContext } from './usePlayer';


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

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function handleProgressChange(event: Event) {
    const target = event.target as HTMLInputElement;
    seek(parseFloat(target.value));
}

</script>

<template>
    <div class="player-controls">
        <button class="control-btn play-pause-btn" @click="togglePlayPause">
            <img v-if="!isPlaying" src="./svg/play.svg" alt="Play" />
            <img v-else src="./svg/pause.svg" alt="Pause" />
        </button>
        <input type="range" class="progress-bar"
            :value="currentTime"
            min="0"
            :max="duration"
            step="0.1"
            @input="handleProgressChange"
        />
        <span class="time-display">{{ `${formatTime(currentTime)} / ${formatTime(duration)}` }}</span>
        <button class="control-btn fullscreen-btn">⛶</button>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
