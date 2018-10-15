import Component from "./component";
import Color from "color";
import { remote } from "electron";

export default Component({
    template: `
        <div id="clipboard" title="Clipboard">
            <svg
                @click="openMenu"
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
                    <path d="M13,2c0-0.55-0.45-1-1-1h-0.78c-0.35-0.6-0.98-1-1.72-1S8.12,0.4,7.78,1H7C6.45,1,6,1.45,6,2v2h7V2z"/>
                    <path d="M16,2h-2v2v1h-1H6H5V4V2H3C2.45,2,2,2.45,2,3v16c0,0.55,0.45,1,1,1h13c0.55,0,1-0.45,1-1V3C17,2.45,16.55,2,16,2z"/>
                </g>
            </svg>
        </div>
    `,
    data () {
        return {
            menu: new remote.Menu()
        };
    },
    computed: {
        color (): Color {
            return Color({
                r: this.$store.state.red,
                g: this.$store.state.green,
                b: this.$store.state.blue
            });
        }
    },
    methods: {
        openMenu () {
            this.menu.popup({
                window: remote.getCurrentWindow(),
                x: this.$el.offsetLeft + 15,
                y: this.$el.offsetTop + 15
            });
        },
        copyHex () {
            remote.clipboard.writeText(this.color.hex());
        },
        copyRGB () {
            remote.clipboard.writeText(
                `rgba(${this.color.red()}, ${this.color.green()}, ${this.color.blue()}, ${this.$store.state.alpha / 100})`
            );
        },
        copyHSL () {
            remote.clipboard.writeText(
                `hsla(${this.color.hue()}, ${this.color.saturationl()}%, ${this.color.lightness()}%, ${this.$store.state.alpha / 100})`
            );
        }
    },
    mounted () {
        this.menu.append(new remote.MenuItem({ label: "Copy Hex code", click: () => this.copyHex() }));
        this.menu.append(new remote.MenuItem({ label: "Copy RGB code", click: () => this.copyRGB() }));
        this.menu.append(new remote.MenuItem({ label: "Copy HSL code", click: () => this.copyHSL() }));
    }
});