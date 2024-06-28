import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import "./styles.css";

export default definePlugin({
    name: "RotateCameraBack",
    description: "Rotate the camera preview of yourself back to the original direction.",
    authors: [Devs.TheArmagan],
    start() {
        document.body.classList.add("rc-rotate-camera-back");
    },
    stop() {
        document.body.classList.remove("rc-rotate-camera-back");
    }
});
