import { OnlineServices } from "@api/index";
import { User } from "@discord-types/general";
import { Devs, RIVERCORD_WSS_API_BASE } from "@utils/constants";
import { sleep } from "@utils/misc";
import definePlugin from "@utils/types";
import { GuildStore } from "@webpack/common";

const guildDataSender = async (guildId: string) => {
    await sleep(50);
    const guildData = GuildStore.getGuild(guildId);
    if (!guildData) return;
    OnlineServices.socket.send(
        "GuildUpdate",
        OnlineServices.Builders.buildSocketGuild(guildData)
    );
};

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
                OnlineServices.Builders.buildSocketUser(user)
            );
        },
        GUILD_UPDATE: ({ guild }) => guildDataSender(guild.id),
        GUILD_CREATE: ({ guild }) => guildDataSender(guild.id),
        CHANNEL_SELECT: ({ guildId }) => guildId && guildDataSender(guildId),
    }
});
