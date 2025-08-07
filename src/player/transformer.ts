interface Region {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FocusOn {
    version: string;
    video_resolution: {
        width: number;
        height: number;
    };
    regions: {
        start: number;
        end: number;
        region: Region;
    }[];
}

export class Transformer {
    viewportWidth: number = 0;
    viewportHeight: number = 0;
    focusOn: FocusOn | null = null;

    constructor(fileName?: string) {
        (async () => {
            if (fileName) {
                const file = await fetch(fileName);
                this.focusOn = await file.json();
            }
        })();
    }

    async setFocusOn(fileName: string) {
        const file = await fetch(fileName);
        this.focusOn = await file.json();
    }

    setViewportSize(width: number, height: number) {
        this.viewportWidth = width;
        this.viewportHeight = height;
    }

    getRegion(time: number) {
        if (!this.focusOn) {
            return {
                x: 0,
                y: 0,
                width: this.viewportWidth,
                height: this.viewportHeight
            };
        }

        const activeRegion = this.focusOn.regions.find(
            region => time >= region.start && time <= region.end
        );

        return activeRegion?.region ?? {
            x: 0,
            y: 0,
            width: this.focusOn.video_resolution.width,
            height: this.focusOn.video_resolution.height
        };
    }

    getScale(region: Region) {
        const { width, height } = region;
        const scaleX = this.viewportWidth / width;
        const scaleY = this.viewportHeight / height;
        return Math.min(scaleX, scaleY);
    }

    getTranslate(region: Region) {
        const { x, y, width, height } = region;
        const translateX = -(x + width / 2) + this.viewportWidth / 2;
        const translateY = -(y + height / 2) + this.viewportHeight / 2;
        return { translateX, translateY };
    }

    getTransform(time: number) {
        const region = this.getRegion(time);

        const scale = this.getScale(region);
        const { translateX, translateY } = this.getTranslate(region);

        return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
}
