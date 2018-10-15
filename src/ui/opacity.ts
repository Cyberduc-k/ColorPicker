import Component from "./component";
import { remote } from "electron";

export default Component({
    methods: {
        toggleOpacity (): void {
            this.$store.state.alphaEnabled = !this.$store.state.alphaEnabled;

            const win = remote.getCurrentWindow();
            const size = win.getSize();

            win.setSize(size[0], size[1] + (this.$store.state.alphaEnabled ? 30 : -30));

            if (!this.$store.state.alphaEnabled)
                this.$store.state.alpha = 100;
        }
    },
    template: `
        <div id="opacity" title="toggle opacity">
            <svg
                @click="toggleOpacity"
                version="1.1"
                id="Laag_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
            >
                <path d="M20,7.6C20,3.4,16.6,0,12.4,0C9,0,6.2,2.1,5.1,5.1c-1.1,0.4-2.1,1-2.9,1.8C0.8,8.4,0,10.3,0,12.4c0,2,0.8,4,2.2,5.4
                    C3.7,19.2,5.6,20,7.6,20s4-0.8,5.4-2.2c0.8-0.8,1.4-1.8,1.8-2.9C17.9,13.8,20,11,20,7.6z M7,18.8c-0.8-0.1-1.5-0.3-2.2-0.6l3.8-3.8
                    c0.6,0.3,1.3,0.6,2,0.8L7,18.8z M9.6,13.5l3.9-3.9c0.3,0.7,0.5,1.4,0.6,2.2l-2.4,2.4C11,14,10.2,13.8,9.6,13.5z M7.1,11.5l4.3-4.3
                    c0.3,0.2,0.5,0.4,0.7,0.6c0.2,0.2,0.5,0.5,0.6,0.7l-4.3,4.3C8,12.5,7.5,12,7.1,11.5z M1.2,13l3.7-3.7c0.2,0.7,0.4,1.4,0.8,2
                    l-3.8,3.8C1.5,14.5,1.3,13.7,1.2,13z M6.5,6L6,6.5C6,6.4,6,6.2,6.1,6.1C6.2,6,6.4,6,6.5,6z M5.9,8.3l2.4-2.4C9,6,9.8,6.2,10.4,6.5
                    l-3.9,3.9C6.2,9.8,6,9,5.9,8.3z M14,13.5c0,0.2-0.1,0.3-0.1,0.5c-0.2,0-0.3,0.1-0.5,0.1L14,13.5z M3.1,7.8c0.5-0.5,1.1-0.9,1.7-1.2
                    C4.7,6.9,4.7,7.3,4.7,7.6c0,0.1,0,0.1,0,0.2l-3.4,3.4C1.5,9.9,2.1,8.7,3.1,7.8z M2.4,16.2l3.9-3.9c0.4,0.5,0.9,1,1.4,1.4l-3.9,3.9
                    c-0.3-0.2-0.5-0.4-0.7-0.6C2.8,16.7,2.6,16.4,2.4,16.2z M12.2,16.9c-1,1-2.2,1.6-3.5,1.8l3.4-3.4c0.1,0,0.1,0,0.2,0
                    c0.4,0,0.7,0,1.1-0.1C13.2,15.8,12.7,16.4,12.2,16.9z"/>
            </svg>
        </div>
    `
});