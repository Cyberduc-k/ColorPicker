import Component from "./component";
import { remote } from "electron";

export default Component({
    methods: {
        toggleSwatches () {
            this.$store.state.swatches.enabled = !this.$store.state.swatches.enabled;

            const win = remote.getCurrentWindow();
            const size = win.getSize();

            win.setSize(size[0], size[1] + (this.$store.state.swatches.enabled ? 162 : -162));
        }
    },
    template: `
        <div id="swatches-item" title="toggle swatches">
            <svg
                @click="toggleSwatches"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
            >
                <g>
                    <path d="M6,0C5.45,0,5,0.45,5,1v3.5c0,0.55,0,1.45,0,2V9c0,0.55,0,1.45,0,2v8c0,0.55,0.32,0.68,0.71,0.29l3.59-3.59
                        c0.39-0.39,1.03-0.39,1.41,0l3.59,3.59C14.68,19.68,15,19.55,15,19v-8c0-0.55,0-1.45,0-2V6.5c0-0.55,0-1.45,0-2V1
                        c0-0.55-0.45-1-1-1H6z"/>
                </g>
            </svg>
        </div>
    `
})