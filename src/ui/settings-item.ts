import Component from "./component";
import { remote } from "electron";

export default Component({
    methods: {
        toggleSettings (): void {
            this.$store.state.settings = !this.$store.state.settings;

            const win = remote.getCurrentWindow();
            const size = win.getSize();

            if (this.$store.state.settings) {
                win.setSize(size[0], 31 + 200);
            }
            else {
                win.setSize(
                    size[0],
                    131 +
                    (this.$store.state.alphaEnabled ? 30 : 0) +
                    (this.$store.state.swatches.enabled ? 162 : 0)
                );
            }
        }
    },
    template: `
        <div id="settings-item" title="toggle settings">
            <svg
                @click="toggleSettings"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
            >
                <g id="cog_2_">
                    <g>
                        <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M19,8h-2.31c-0.14-0.46-0.33-0.89-0.56-1.3l1.7-1.7c0.39-0.39,0.39-1.02,0-1.41
                            l-1.41-1.41c-0.39-0.39-1.02-0.39-1.41,0l-1.7,1.7c-0.41-0.22-0.84-0.41-1.3-0.55V1c0-0.55-0.45-1-1-1H9C8.45,0,8,0.45,8,1v2.33
                            C7.52,3.47,7.06,3.67,6.63,3.91L5,2.28c-0.37-0.37-0.98-0.37-1.36,0L2.28,3.64C1.91,4.02,1.91,4.63,2.28,5l1.62,1.62
                            C3.66,7.06,3.46,7.51,3.31,8H1C0.45,8,0,8.45,0,9v2c0,0.55,0.45,1,1,1h2.31c0.14,0.46,0.33,0.89,0.56,1.3L2.17,15
                            c-0.39,0.39-0.39,1.02,0,1.41l1.41,1.41c0.39,0.39,1.02,0.39,1.41,0l1.7-1.7c0.41,0.22,0.84,0.41,1.3,0.55V19c0,0.55,0.45,1,1,1h2
                            c0.55,0,1-0.45,1-1v-2.33c0.48-0.14,0.94-0.35,1.37-0.59L15,17.72c0.37,0.37,0.98,0.37,1.36,0l1.36-1.36
                            c0.37-0.37,0.37-0.98,0-1.36l-1.62-1.62c0.24-0.43,0.45-0.89,0.6-1.38H19c0.55,0,1-0.45,1-1V9C20,8.45,19.55,8,19,8z M10,14
                            c-2.21,0-4-1.79-4-4c0-2.21,1.79-4,4-4s4,1.79,4,4C14,12.21,12.21,14,10,14z"/>
                    </g>
                </g>
            </svg>
        </div>
    `
});