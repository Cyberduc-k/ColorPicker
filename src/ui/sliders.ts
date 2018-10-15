import Component from "./component";
import Color from "color";

export default Component({
    template: `
        <div id="sliders" class="rgb" v-if="$store.state.mode == 'rgb'">
            <div class="group red">
                <input type="range" min="0" max="255" v-model="red">
                <input type="number" min="0" max="255" v-model="red">
            </div>
            <div class="group green">
                <input type="range" min="0" max="255" v-model="green">
                <input type="number" min="0" max="255" v-model="green">
            </div>
            <div class="group blue">
                <input type="range" min="0" max="255" v-model="blue">
                <input type="number" min="0" max="255" v-model="blue">
            </div>
            <div class="group alpha" v-if="$store.state.alphaEnabled">
                <input type="range" min="0" max="100" v-model="alpha">
                <input type="number" min="0" max="100" v-model="alpha">
            </div>
        </div>
        <div id="sliders" class="hsl" v-else-if="$store.state.mode == 'hsl'">
            <div class="group hue">
                <input type="range" min="0" max="359" v-model="hue">
                <input type="number" min="0" max="359" v-model="hue">
            </div>
            <div class="group saturation">
                <input type="range" min="0" max="100" v-model="saturation">
                <input type="number" min="0" max="100" v-model="saturation">
            </div>
            <div class="group lightness">
                <input type="range" min="0" max="100" v-model="lightness">
                <input type="number" min="0" max="100" v-model="lightness">
            </div>
            <div class="group alpha" v-if="$store.state.alphaEnabled">
                <input type="range" min="0" max="100" v-model="alpha">
                <input type="number" min="0" max="100" v-model="alpha">
            </div>
        </div>
    `,
    computed: {
        red: <any>{
            get () {
                return this.$store.state.red;
            },
            set (value: number) {
                this.$store.state.red = parseInt(value.toString());
            }
        },
        green: <any>{
            get () {
                return this.$store.state.green;
            },
            set (value: number) {
                this.$store.state.green = parseInt(value.toString());
            }
        },
        blue: <any>{
            get () {
                return this.$store.state.blue;
            },
            set (value: number) {
                this.$store.state.blue = parseInt(value.toString());
            }
        },
        hue: <any>{
            get () {
                return this.$store.state.hue;
            },
            set (value: number) {
                this.$store.state.hue = parseInt(value.toString());
            }
        },
        saturation: <any>{
            get () {
                return this.$store.state.saturation;
            },
            set (value: number) {
                this.$store.state.saturation = parseInt(value.toString());
            }
        },
        lightness: <any>{
            get () {
                return this.$store.state.lightness;
            },
            set (value: number) {
                this.$store.state.lightness = parseInt(value.toString());
            }
        },
        alpha: <any>{
            get () {
                return this.$store.state.alpha;
            },
            set (value: number) {
                this.$store.state.alpha = parseInt(value.toString());
            }
        },
    },
    watch: {
        '$store.state.red' () {
            this.computeColor();
        },
        '$store.state.green' () {
            this.computeColor();
        },
        '$store.state.blue' () {
            this.computeColor();
        },
        '$store.state.hue' () {
            this.computeColor();
        },
        '$store.state.saturation' () {
            this.computeColor();
        },
        '$store.state.lightness' () {
            this.computeColor();
        }
    },
    methods: {
        computeColor () {
            if (this.$store.state.mode == "rgb") {
                const clr = Color({
                    r: this.$store.state.red,
                    g: this.$store.state.green,
                    b: this.$store.state.blue
                });

                this.$store.state.hue = clr.hue();
                this.$store.state.saturation = clr.saturationl();
                this.$store.state.lightness = clr.lightness();
            }
            else if (this.$store.state.mode == "hsl") {
                const clr = Color({
                    h: this.$store.state.hue,
                    s: this.$store.state.saturation,
                    l: this.$store.state.lightness
                });

                this.$store.state.red = clr.red();
                this.$store.state.green = clr.green();
                this.$store.state.blue = clr.blue();
            }
        }
    }
});