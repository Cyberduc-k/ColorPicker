import Component from "./component";
import Color from "color";
import { remote, ipcRenderer } from "electron";
import fs from "fs";

const { Menu, MenuItem, dialog } = remote;

export default Component({
    template: `
        <div id="swatches">
            <div id="shadow" :hidden="scrollTop == 0"></div>
            <div class="groups" ref="groups">
                <ul class="group">
                    <li
                        class="swatch"
                        v-for="(swatch, i) in swatches"
                        :key="i"
                        :style="{ '--background': swatch.color }"
                        :title="swatch.color"
                        contextmenu="swatchMenu"
                        ref="swatch"
                        :swatch="i"
                        @click="setColor(i)"><span>{{ swatch.name }}</span></li>
                </ul>
            </div>
            <div class="menu">
                <div class="new-swatch-set" title="new swatch set" @click="newSwatches">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        xml:space="preserve"
                    >
                        <g id="Page-1" sketch:type="MSPage">
                            <g id="Artboard-1" sketch:type="MSArtboardGroup">
                                <path id="Shape" sketch:type="MSShapeGroup" d="M12,4c0,0.6,0.4,1,1,1h2v2c0,0.6,0.4,1,1,1c0.5,0,1-0.4,1-1V5h2c0.5,0,1-0.4,1-1
                                    s-0.5-1-1-1h-2V1c0-0.6-0.5-1-1-1c-0.6,0-1,0.4-1,1v2h-2C12.4,3,12,3.5,12,4L12,4z M19,7c0,1.7-1.3,3-3,3s-3-1.3-3-3
                                    c-1.7,0-3-1.3-3-3s1.3-3,3-3c0-0.2,0-0.4,0.1-0.5c-1-0.3-2-0.5-3.1-0.5C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10
                                    c0-1.1-0.2-2.1-0.5-3H19L19,7z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="load-swatches" title="load swatch set" @click="loadSwatches">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        xml:space="preserve"
                    >
                        <g id="document_open_1_">
                            <g>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8,15c0,0.55,0.45,1,1,1s1-0.45,1-1v-5c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1
                                    s0.45,1,1,1h2.59l-5.29,5.29C1.11,16.47,1,16.72,1,17c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29L8,12.41V15z M13,0H5
                                    C4.45,0,4,0.45,4,1v6h2V2h6v5h5v11H6v-0.76L4.04,19.2C4.14,19.65,4.52,20,5,20h13c0.55,0,1-0.45,1-1V6L13,0z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="save-swatches" title="save swatch set" @click="saveSwatches">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        xml:space="preserve"
                    >
                        <g id="saved_1_">
                            <g>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12,0H4C3.45,0,3,0.45,3,1v18c0,0.55,0.45,1,1,1h13c0.55,0,1-0.45,1-1V6L12,0z
                                    M16,18H5V2h6v5h5V18z M7.71,11.29C7.53,11.11,7.28,11,7,11c-0.55,0-1,0.45-1,1c0,0.28,0.11,0.53,0.29,0.71l3,3
                                    C9.47,15.89,9.72,16,10,16c0.32,0,0.59-0.16,0.77-0.38l0.01,0.01l4-5l-0.01-0.01C14.91,10.44,15,10.24,15,10c0-0.55-0.45-1-1-1
                                    c-0.32,0-0.59,0.16-0.77,0.38l-0.01-0.01l-3.3,4.13L7.71,11.29z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="new-swatch" title="new swatch" @click="addSwatch">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        xml:space="preserve"
                    >
                        <g id="add_to_artifact">
                            <g>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13,12H1c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1
                                    C14,12.45,13.55,12,13,12z M13,16H1c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1C14,16.45,13.55,16,13,16z M1,6h9
                                    c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1H1C0.45,4,0,4.45,0,5C0,5.55,0.45,6,1,6z M13,8H1C0.45,8,0,8.45,0,9c0,0.55,0.45,1,1,1h12
                                    c0.55,0,1-0.45,1-1C14,8.45,13.55,8,13,8z M19,4h-2V2c0-0.55-0.45-1-1-1s-1,0.45-1,1v2h-2c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h2
                                    v2c0,0.55,0.45,1,1,1s1-0.45,1-1V6h2c0.55,0,1-0.45,1-1C20,4.45,19.55,4,19,4z"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    `,
    data () {
        return {
            scrollTop: 0,
            menu: new Menu()
        };
    },
    computed: {
        swatches (): { name: string, color: string }[] {
            return this.$store.state.swatches.list;
        }
    },
    methods: {
        setColor (index: number): void {
            const hex = this.swatches[index].color;
            const clr = Color(hex);
        
            this.$store.state.red = clr.red();
            this.$store.state.green = clr.green();
            this.$store.state.blue = clr.blue();
            this.$store.state.alpha = clr.alpha() * 100;
            this.$store.state.hue = clr.hue();
            this.$store.state.saturation = clr.saturationl();
            this.$store.state.lightness = clr.lightness();
        },
        addSwatch (): void {
            const self= this;
            let clr = Color({
                r: this.$store.state.red,
                g: this.$store.state.green,
                b: this.$store.state.blue
            });

            clr = clr.fade(1 - (this.$store.state.alpha / 100));

            ipcRenderer.send("openDialog", { type: "newSwatch" });
            ipcRenderer.on("dialogResult", result);

            function result (sender: any, data: any) {
                if (!data.cancel) {
                    self.$store.state.swatches.list.push({ name: data.data, color: clr.toString() });
                }

                ipcRenderer.removeListener("dialogResult", result);
            }
        },
        newSwatches () {
            this.$store.state.swatches.file = "";
            this.$store.state.swatches.list = [];
        },
        loadSwatches () {
            dialog.showOpenDialog(remote.getCurrentWindow(), { title: "Load swatches", filters: [{ name: "", extensions: ["csp"] }] }, filepaths => {
                if (filepaths != undefined) {
                    if (filepaths.length > 1) this.$store.state.file = "";
                    else this.$store.state.file = filepaths[0];

                    this.$store.state.swatches.list = [];

                    filepaths.forEach(filepath => {
                        const contents = fs.readFileSync(filepath, "utf-8");
                        const lines = contents.split(/\r\n?|\n/g);

                        lines.forEach(line => {
                            const swatch = line.split(/;\s/g);

                            this.$store.state.swatches.list.push({ name: swatch[0], color: swatch[1] });
                        });
                    });
                }
            });
        },
        saveSwatches () {
            dialog.showSaveDialog(remote.getCurrentWindow(), { title: "Save swatches", filters: [{ name: "", extensions: ["csp"] }] }, filename => {
                if (filename != undefined) {
                    let file = "";

                    this.swatches.forEach(swatch => {
                        file += `${swatch.name}; ${swatch.color}\n`;
                    });

                    fs.writeFile(filename, file.slice(0, file.length - 1), "utf-8", err => {
                        if (err) console.error(err);
                        else {
                            this.$store.state.swatches.file = filename;
                        }
                    });
                }
            });
        },
        contextMenu (e: any, i: number) {
            const self = this;
            e.preventDefault();

            this.menu.append(new MenuItem({ label: "Rename swatch", click () {
                ipcRenderer.send("openDialog", { type: "renameSwatch", oldName: self.$store.state.swatches.list[i].name });
                ipcRenderer.on("dialogResult", result);

                function result (sender: any, data: any) {
                    if (!data.cancel) {
                        self.$store.state.swatches.list[i].name = data.data;
                    }

                    ipcRenderer.removeListener("dialogResult", result);
                }
            }}));

            this.menu.append(new MenuItem({ label: "Remove swatch", click () {
                self.$store.state.swatches.list.splice(i, 1);
            }}));

            this.menu.popup({ window: remote.getCurrentWindow() });
            this.menu.once("menu-will-close", () => {
                this.menu = new Menu();
            });
        }
    },
    updated () {
        if (this.$refs.swatch) (<any[]>this.$refs.swatch).forEach(swatch => {
            const i = parseInt(swatch.getAttribute("swatch"));

            swatch.oncontextmenu = (e: any) => this.contextMenu(e, i);
        });
    },
    mounted () {
        (<Element>this.$refs.groups).addEventListener("scroll", () => {
            this.scrollTop = (<Element>this.$refs.groups).scrollTop;
        });

        if (this.$refs.swatch) (<any[]>this.$refs.swatch).forEach(swatch => {
            const i = parseInt(swatch.getAttribute("swatch"));

            swatch.oncontextmenu = (e: any) => this.contextMenu(e, i);
        });
    }
});