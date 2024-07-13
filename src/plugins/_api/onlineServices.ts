import { OnlineServices } from "@api/index";
import { User } from "@discord-types/general";
import { FluxStore } from "@discord-types/stores";
import { Devs, RIVERCORD_WSS_API_BASE } from "@utils/constants";
import { sleep } from "@utils/misc";
import definePlugin from "@utils/types";
import { findStoreLazy } from "@webpack";
import { GuildStore, SelectedGuildStore } from "@webpack/common";

const guildDataSender = async (guildId: string) => {
    await sleep(50);
    const guildData = GuildStore.getGuild(guildId);
    if (!guildData) return;
    OnlineServices.Socket.send(
        "GuildUpdate",
        OnlineServices.Builders.buildSocketGuild(guildData)
    );
};

const GuildMemberCountStore = findStoreLazy("GuildMemberCountStore") as FluxStore & Record<string, any>;

const guildMemberCountCache: Record<string, { memberCount: number; onlineCount: number; }> = {};

function sendGuildMemberCount() {
    const guildId = SelectedGuildStore.getGuildId();
    if (!guildId) return;
    const memberCount = GuildMemberCountStore.getMemberCount(guildId);
    const onlineCount = GuildMemberCountStore.getOnlineCount(guildId);
    if (guildMemberCountCache[guildId]?.memberCount === memberCount && guildMemberCountCache[guildId]?.onlineCount === onlineCount) return;
    guildMemberCountCache[guildId] = { memberCount, onlineCount };
    OnlineServices.Socket.send(
        "GuildMemberCountUpdate",
        OnlineServices.Builders.buildSocketGuildMemberCount({
            guildId,
            memberCount,
            onlineCount
        })
    );
}

export default definePlugin({
    name: "OnlineServicesAPI",
    authors: [
        Devs.TheArmagan
    ],
    description: "Rivercord'un online servisleri için gerekli API'yi sağlar.",
    enabledByDefault: true,
    start() {
        OnlineServices.Socket.connect(`${RIVERCORD_WSS_API_BASE}?compress=zlib`, true, "zlib");
        GuildMemberCountStore.addReactChangeListener(sendGuildMemberCount);
    },
    stop() {
        OnlineServices.Socket.close();
        GuildMemberCountStore.removeReactChangeListener(sendGuildMemberCount);
    },
    flux: {
        USER_UPDATE({ user }: { user: User; }) {
            if (user.bot) return;
            OnlineServices.Socket.send(
                "UserUpdate",
                OnlineServices.Builders.buildSocketUser(user)
            );
        },
        CHANNEL_SELECT: ({ guildId }) => guildId && guildDataSender(guildId),
    }
});
