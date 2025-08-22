import { onMounted, onUnmounted, ref, type Ref } from "vue";
import type { ViewportContext } from "../types/video";

export function useViewportFullscreen(viewportElement: Ref<HTMLDivElement | null>): ViewportContext {
    const isFullscreen = ref(false);

    const handleFullscreenChange = () => {
        isFullscreen.value = document.fullscreenElement === viewportElement.value;
    }

    function toggleFullscreen() {
        if (viewportElement.value) {
            if (document.fullscreenElement === viewportElement.value) {
                document.exitFullscreen();
            } else {
                viewportElement.value.requestFullscreen();
            }
        }
    }

    onMounted(() => {
        document.addEventListener("fullscreenchange", handleFullscreenChange);
    });

    onUnmounted(() => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
    });

    return {
        isFullscreen,
        toggleFullscreen,
    }
}
