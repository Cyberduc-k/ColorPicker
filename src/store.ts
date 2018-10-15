import Vuex from "vuex";
import { remote } from "electron";

const defaults = {
    trayItems: ["pin", "opacity", "swatches", "settings"],
    mode: "rgb",
    alphaEnabled: false,
    alpha: 100,
    red: 0,
    green: 0,
    blue: 0,
    hue: 0,
    saturation: 100,
    lightness: 0,
    settings: false,
    pinned: false,

    swatches: {
        enabled: false,
        file: "",
        list: [{ name: "red", color: "rgba(255, 0, 0, 1)" }]
    }
};

const state = JSON.parse(localStorage.getItem("state") || JSON.stringify(defaults));

if (state.swatches.enabled) {
    const win = remote.getCurrentWindow();
    const size = win.getSize();

    win.setSize(size[0], size[1] + 162);
}

if (state.alphaEnabled) {
    const win = remote.getCurrentWindow();
    const size = win.getSize();

    win.setSize(size[0], size[1] + 30);
}

if (state.settings) {
    const win = remote.getCurrentWindow();
    const size = win.getSize();

    win.setSize(size[0], 31 + 200);
}

const store = new Vuex.Store({
    state
});

export default store;

window.onbeforeunload = () => {
    localStorage.setItem("state", JSON.stringify(store.state));
    
    const win = remote.getCurrentWindow();
    const size = win.getSize();

    win.setSize(size[0], 132);
}