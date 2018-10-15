import Component from "./component";
import Color from "color";
import { ipcRenderer } from "electron";

export default Component({
    template: `
        <div id="pick" title="Sample color">
            <svg
                @click="sampleColor"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
            >
                <g>
                    <path d="M20,3.5c0-0.9-0.4-1.8-1-2.5c-0.7-0.7-1.6-1-2.5-1c-0.9,0-1.8,0.4-2.5,1l-2.8,2.8c-0.2,0-0.4-0.1-0.6-0.1
                        C10,3.8,9.4,4,9,4.4C8.4,5,8.2,5.9,8.5,6.7l-7.2,7.2c-0.2,0.2-0.3,0.4-0.3,0.7l0.1,2.1l-1.1,1.7c-0.2,0.3-0.2,0.8,0.1,1.1l0.3,0.3
                        C0.7,19.9,0.9,20,1.1,20c0.2,0,0.3,0,0.5-0.1l1.7-1.1l2.1,0.1c0.2,0,0.5-0.1,0.7-0.3l7.2-7.2c0.2,0.1,0.5,0.1,0.8,0.1
                        c0.6,0,1.1-0.2,1.5-0.6c0.5-0.5,0.8-1.3,0.6-2.1L19,6.1C19.6,5.4,20,4.5,20,3.5z M4.9,16.6l-1.4-0.1l-0.1-1.4L10,8.5l1.5,1.5
                        L4.9,16.6z"/>
                </g>
            </svg>
        </div>
    `,
    methods: {
        sampleColor () {
            const startcolor = Color({
                r: this.$store.state.red,
                g: this.$store.state.green,
                b: this.$store.state.blue,
            });
            const alpha = this.$store.state.alpha;

            ipcRenderer.send("openPick");
            ipcRenderer.on("sampleColor", (sender: any, data: any) => {
                this.setColor(Color(`#${data}`));
            });

            ipcRenderer.on("finishedSampling", (sender: any, data: any) => {
                if (!data) {
                    this.setColor(startcolor);
                    this.$store.state.alpha = alpha;
                }
            });
        },
        setColor (clr: Color) {
            this.$store.state.red = Math.round(clr.red());
            this.$store.state.green = Math.round(clr.green());
            this.$store.state.blue = Math.round(clr.blue());
            this.$store.state.hue = Math.round(clr.hue());
            this.$store.state.saturation = Math.round(clr.saturationl());
            this.$store.state.lightness = Math.round(clr.lightness());
            this.$store.state.alpha = 100;
        }
    }
});