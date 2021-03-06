import Component from "./component";
import { remote } from "electron";

export default Component({
    methods: {
        togglePinned (): void {
            const win = remote.getCurrentWindow();

            this.$store.state.pinned = !this.$store.state.pinned;

            if (this.$store.state.pinned)
                win.setAlwaysOnTop(true);
            else
                win.setAlwaysOnTop(false);
        }
    },
    template: `
        <div id="pin" :title="$store.state.pinned ? 'unpin' : 'pin'">
            <svg v-if="!$store.state.pinned"
                @click="togglePinned"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
            >
                <g id="pin_2_">
                    <g>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.77,1.16c-0.81,0.81-0.74,2.28,0.02,3.76L6.1,8.71
                            C3.93,7.25,1.98,6.71,1.16,7.53l4.95,4.95l-4.95,6.36l6.36-4.95l4.95,4.95c0.82-0.82,0.27-2.77-1.19-4.94l3.8-5.69
                            c1.47,0.76,2.94,0.84,3.76,0.02L11.77,1.16z"/>
                    </g>
                </g>
            </svg>
            <svg v-else
                @click="togglePinned"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
            >
                <g id="unpin_2_">
                    <g>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.77,1.16c-0.81,0.81-0.74,2.28,0.02,3.76L6.1,8.71
                            C3.93,7.25,1.98,6.71,1.16,7.53l4.95,4.95l-2.12,3.54l3.54-2.12l4.95,4.95c0.82-0.82,0.27-2.77-1.19-4.94l3.8-5.69
                            c1.47,0.76,2.94,0.84,3.76,0.02L11.77,1.16z"/>
                    </g>
                </g>
            </svg>
        </div>
    `
});