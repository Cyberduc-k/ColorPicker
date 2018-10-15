import { remote, ipcRenderer } from "electron";
import Component from "./component";
import Pin from "./pin";
import Settings from "./settings-item";
import Opacity from "./opacity";
import Clipboard from "./clipboard";
import Pick from "./picker";
import Swatches from "./swatch-item";

export default Component({
    template: `
        <div id="titlebar" :style="{ '--tray-count': trayItems.length }">
            <div class="tray" :class="{ onlySettings: $store.state.settings }">
                <div class="tray-item" v-for="(item, i) in trayItems" :item="item" :key="i" :is="item" ref="item"></div>
            </div>
            <br>
            <div class="buttons">
                <div class="minimize" @click="minimize" title="minimize"></div>
                <div class="to-tray" @click="toTray" title="to tray"></div>
                <div class="close" @click="close" title="close"></div>
            </div>
        </div>
    `,
    computed: {
        win () {
            return remote.getCurrentWindow();
        },
        trayItems (): string[] {
            const items = this.$store.state.trayItems;;
            const size = this.win.getSize();

            this.win.setSize(Math.max(items.length * 30 + 78 + 18 + 20, 218), size[1]);

            return items;
        }
    },
    methods: {
        minimize () {
            this.win.minimize();
        },
        toTray () {
            ipcRenderer.send("toTray");
        },
        close () {
            this.win.close();
        }
    },
    components: {
        Pin,
        Opacity,
        Settings,
        Swatches,
        Pick,
        Clipboard
    }
});