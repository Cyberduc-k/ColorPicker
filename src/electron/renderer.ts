import Vue from "vue";
import Vuex from "vuex"; Vue.use(Vuex);
import Titlebar from "../ui/titlebar";
import Sliders from "../ui/sliders";
import Swatches from "../ui/swatches";
import Settings from "../ui/settings";
import Color from "color";
import store from "../store";

new Vue({
    el: "#app",
    store,
    template: `
        <div id="app" :style="styles">
            <Titlebar></Titlebar> 
            <Sliders v-if="!$store.state.settings"></Sliders>
            <Settings v-else></Settings>
            <Swatches v-if="$store.state.swatches.enabled && !$store.state.settings"></Swatches>
        </div>
    `,
    computed: {
        styles (): any {
            return {
                '--color': this.color.toString(),
                '--color-no-red': this.colorNoRed.toString(),
                '--color-no-green': this.colorNoGreen.toString(),
                '--color-no-blue': this.colorNoBlue.toString(),
                '--color-no-saturation': this.colorNoSat.toString(),
                '--color-full-saturation': this.colorFullSat.toString(),
                '--color-no-lightness': this.colorNoLightness.toString(),
                '--color-full-lightness': this.colorFullLightness.toString(),
                '--color-half-lightness': this.colorHalfLightness.toString(),
                '--text-color': this.color.isDark() ? "white" : "black",
                '--text-color-half': this.color.isDark() ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
            }
        },
        color (): Color {
            return Color({
                r: this.$store.state.red,
                g: this.$store.state.green,
                b: this.$store.state.blue
            });
        },
        colorNoRed (): Color {
            return Color({
                r: 0,
                g: this.$store.state.green,
                b: this.$store.state.blue
            });
        },
        colorNoGreen (): Color {
            return Color({
                r: this.$store.state.red,
                g: 0,
                b: this.$store.state.blue
            });
        },
        colorNoBlue (): Color {
            return Color({
                r: this.$store.state.red,
                g: this.$store.state.green,
                b: 0
            });
        },
        colorNoSat (): Color {
            return Color.hsl(
                this.$store.state.hue,
                0,
                Math.max(this.$store.state.lightness, 10)
            );
        },
        colorFullSat (): Color {
            return Color.hsl(
                this.$store.state.hue,
                100,
                Math.max(this.$store.state.lightness, 10)
            );
        },
        colorNoLightness (): Color {
            return Color.hsl(
                this.$store.state.hue,
                this.$store.state.saturation,
                0
            );
        },
        colorFullLightness (): Color {
            return Color.hsl(
                this.$store.state.hue,
                this.$store.state.saturation,
                100
            );
        },
        colorHalfLightness (): Color {
            return Color.hsl(
                this.$store.state.hue,
                this.$store.state.saturation,
                50
            );
        }
    },
    components: {
        Titlebar,
        Sliders,
        Swatches,
        Settings
    }
});