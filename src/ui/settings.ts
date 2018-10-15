import Component from "./component";

export default Component({
    template: `
        <div id="settings">
            <div class="section">
                <h3>Mode</h3>
                <div>
                    <input type="radio" name="mode" value="rgb" id="rgb" v-model="$store.state.mode">
                    <label for="rgb">RGB</label>
                </div>
                <div>
                    <input type="radio" name="mode" value="hsl" id="hsl" v-model="$store.state.mode">
                    <label for="hsl">HSL</label>
                </div>
            </div>
            <div class="section tools">
                <h3>Tools</h3>
                <div>
                    <input type="checkbox" name="tools" id="pin_" v-model="pin">
                    <label for="pin_">Pin</label>
                </div>
                <div>
                    <input type="checkbox" name="tools" id="swatches_" v-model="swatches">
                    <label for="swatches_">Swatches</label>
                </div>
                <div>
                    <input type="checkbox" name="tools" id="pick_" v-model="pick">
                    <label for="pick_">Picker</label>
                </div>
                <div>
                    <input type="checkbox" name="tools" id="clipboard_" v-model="clipboard">
                    <label for="clipboard_">Clipboard</label>
                </div>
                <div>
                    <input type="checkbox" name="tools" id="opacity_" v-model="opacity">
                    <label for="opacity_">Opacity</label>
                </div>
            </div>
        </div>
    `,
    data () {
        return {
            pin: this.$store.state.trayItems.indexOf("pin") >= 0,
            opacity: this.$store.state.trayItems.indexOf("opacity") >= 0,
            swatches: this.$store.state.trayItems.indexOf("swatches") >= 0,
            clipboard: this.$store.state.trayItems.indexOf("clipboard") >= 0,
            pick: this.$store.state.trayItems.indexOf("pick") >= 0
        }
    },
    watch: {
        pin () {
            if (this.pin)
                this.$store.state.trayItems.push("pin");
            else
                this.$store.state.trayItems.splice(this.$store.state.trayItems.indexOf("pin"), 1);

            this.sort();
        },
        opacity () {
            if (this.opacity)
                this.$store.state.trayItems.push("opacity");
            else
                this.$store.state.trayItems.splice(this.$store.state.trayItems.indexOf("opacity"), 1);

            this.sort();
        },
        swatches () {
            if (this.swatches)
                this.$store.state.trayItems.push("swatches");
            else
                this.$store.state.trayItems.splice(this.$store.state.trayItems.indexOf("swatches"), 1);

            this.sort();
        },
        clipboard () {
            if (this.clipboard)
                this.$store.state.trayItems.push("clipboard");
            else
                this.$store.state.trayItems.splice(this.$store.state.trayItems.indexOf("clipboard"), 1);

            this.sort();
        },
        pick () {
            if (this.pick)
                this.$store.state.trayItems.push("pick");
            else
                this.$store.state.trayItems.splice(this.$store.state.trayItems.indexOf("pick"), 1);

            this.sort();
        }
    },
    methods: {
        sort () {
            const items = this.$store.state.trayItems;
            let new_: string[] = [];

            if (items.indexOf("pin") >= 0) new_.push("pin");
            if (items.indexOf("pick") >= 0) new_.push("pick");
            if (items.indexOf("opacity") >= 0) new_.push("opacity");
            if (items.indexOf("clipboard") >= 0) new_.push("clipboard");
            if (items.indexOf("swatches") >= 0) new_.push("swatches");

            new_.push("settings");

            this.$store.state.trayItems = new_;
        }
    }
});