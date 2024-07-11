import { OnlineServices } from "@api/index";
import { User } from "@discord-types/general";
import { Devs, RIVERCORD_WSS_API_BASE } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "OnlineServicesAPI",
    authors: [
        Devs.TheArmagan
    ],
    description: "Rivercord'un online servisleri için gerekli API'yi sağlar.",
    enabledByDefault: true,
    start() {
        OnlineServices.socket.connect(RIVERCORD_WSS_API_BASE, true);
    },
    stop() {
        OnlineServices.socket.close();
    },
    flux: {
        USER_UPDATE({ user }: { user: User; }) {
            if (user.bot) return;
            OnlineServices.socket.send(
                "UserUpdate",
                OnlineServices.buildSocketUser(user)
            );
        }
    }
});
