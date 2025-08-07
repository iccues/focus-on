<script setup lang="ts">
import { ref } from 'vue';
import CoreVideoPlayer from './player/CoreVideoPlayer.vue';

const videoFileInput = ref<HTMLInputElement | null>(null);
const videoSrc = ref<string | undefined>(undefined);

const focusOnFileInput = ref<HTMLInputElement | null>(null);
const focusOnSrc = ref<string | undefined>(undefined);

function handleVideoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0];

        if (videoSrc.value) {
            URL.revokeObjectURL(videoSrc.value);
        }

        videoSrc.value = URL.createObjectURL(selectedFile);
    }
}

function handleFocusOnChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0];

        if (focusOnSrc.value) {
            URL.revokeObjectURL(focusOnSrc.value);
        }

        focusOnSrc.value = URL.createObjectURL(selectedFile);
    }
}

const coreVideoPlayer = ref<typeof CoreVideoPlayer | null>(null);
const PlayerVisibility = ref(false);

function loadPlayer() {
    PlayerVisibility.value = true;
    if (coreVideoPlayer.value) {
        coreVideoPlayer.value.loadVideo();
        coreVideoPlayer.value.loadFocusOn();
    }
}

</script>

<template>
    <div v-if="!PlayerVisibility">
        <input type="file" ref="videoFileInput" accept="video/*" @change="handleVideoChange"/>
        <input type="file" ref="focusOnFileInput" accept=".json" @change="handleFocusOnChange"/>
        <button @click="loadPlayer">load</button>
    </div>

    <div v-else class="app-container">
        <CoreVideoPlayer
            ref="coreVideoPlayer"
            :src="videoSrc"
            :focus-on="focusOnSrc"
        />
    </div>
</template>

<style scoped>
.app-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: black;
}
</style>