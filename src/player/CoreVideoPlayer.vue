<script setup lang="ts">
import { ref } from 'vue';
import { Transformer } from './transformer';
import { vResize } from './vResize';
import { usePlayer } from './usePlayer';
import PlayerControls from './PlayerControls.vue';

const props = defineProps<{
    src?: string;
    focusOn?: string;
}>();

defineExpose({
    loadVideo,
    loadFocusOn,
})

function loadVideo() {
    videoPlayer.value?.load();
}

function loadFocusOn() {
    if (props.focusOn) {
        transformer.value.setFocusOn(props.focusOn);
    }
}


const transformer = ref<Transformer>(new Transformer(props.focusOn));

const videoPlayer = ref<HTMLVideoElement | null>(null);

const playerContext = usePlayer(videoPlayer);

const {
    currentTime,
    togglePlayPause,
} = playerContext;


function setViewportSize(width: number, height: number) {
    transformer.value.setViewportSize(width, height);
}

</script>

<template>
    <div class="player-viewport" v-resize="setViewportSize">
        <video class="video-player"
            :style="{
                transform: transformer.getTransform(currentTime),
            }"
            @click="togglePlayPause"
            ref="videoPlayer"
        >
            <source :src="props.src" />
            unsupported video format
        </video>

        <player-controls :videoPlayer="playerContext" />

    </div>
    <button @click="videoPlayer?.load()">load</button>

</template>

<style lang="css" scoped>
@import './style.css';
</style>
