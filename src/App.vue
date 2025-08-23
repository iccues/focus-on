<script setup lang="ts">
import { ref } from 'vue';
import VideoPlayer from './components/video-player/VideoPlayer.vue';
import FileInput from './components/FileInput.vue';

const videoSrc = ref<string | undefined>(undefined);

const focusOnSrc = ref<string | undefined>(undefined);

const videoPlayerRef = ref<typeof VideoPlayer | null>(null);
const playerVisibility = ref(false);

function loadPlayer() {
    playerVisibility.value = true;
    if (videoPlayerRef.value) {
        videoPlayerRef.value.loadVideo();
        videoPlayerRef.value.loadFocusOn();
    }
}

</script>

<template>
    <div v-show="!playerVisibility" class="file-inputs">
        <FileInput
            accept="video/*"
            v-model:file-src="videoSrc"
        >Select Video</FileInput>
        <FileInput
            accept=".fon.json"
            v-model:file-src="focusOnSrc"
        >Select Focus On File</FileInput>
        <button @click="loadPlayer">load</button>
    </div>

    <div v-show="playerVisibility" class="player-container">
        <VideoPlayer
            ref="videoPlayerRef"
            :src="videoSrc"
            :focus-on="focusOnSrc"
        />
    </div>

    <div class="close-btn-container">
        <div class="close-btn-background">
            <button class="close-btn" @click="playerVisibility = !playerVisibility">
                <img v-if="playerVisibility" src="./assets/icons/return.svg" alt="Close Video Player" />
                <img v-else src="./assets/icons/forward.svg" alt="Forward Video Player" />
            </button>
        </div>
    </div>

</template>

<style scoped>
@import './styles/app.css';
</style>
