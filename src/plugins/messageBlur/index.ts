import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

import "./styles.css";

const settings = definePluginSettings({
    blurAmount: {
        type: OptionType.SLIDER,
        default: 5,
        description: "The amount of blur to apply to messages.",
        markers: [0, 5, 10, 15, 20, 25, 30],
        onChange(value) {
            document.body.style.setProperty("--mb-blur-amount", `${value}px`);
        }
    }
});

const keyBindHandler = (e: KeyboardEvent) => {
    if (e.code === "KeyM" && e.ctrlKey) {
        document.body.classList.toggle("mb-blur");
    }
};

export default definePlugin({
    name: "MessageBlur",
    authors: [Devs.TheArmagan],
    description: "Blur all messages with a CTRL + M shortcut.",
    settings,
    start() {
        document.body.style.setProperty("--mb-blur-amount", `${settings.store.blurAmount}px`);
        document.addEventListener("keydown", keyBindHandler);
    },
    stop() {
        document.body.style.removeProperty("--mb-blur-amount");
        document.removeEventListener("keydown", keyBindHandler);
    }
});
