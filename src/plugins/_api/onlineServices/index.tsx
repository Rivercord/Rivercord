import { OnlineServices, ServerList } from "@api/index";
import { ServerListRenderPosition } from "@api/ServerList";
import { User } from "@discord-types/general";
import { FluxStore } from "@discord-types/stores";
import { Devs, RIVERCORD_WSS_API_BASE } from "@utils/constants";
import definePlugin from "@utils/types";
import { findStoreLazy } from "@webpack";
import { ChannelStore, GuildStore, SelectedGuildStore } from "@webpack/common";

import "./styles.css";
import { OnlineRivercordUsers } from "./components/OnlineRivercordUsers";

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

const guildsClicked = new Set<string>();

export default definePlugin({
    name: "OnlineServicesAPI",
    authors: [
        Devs.TheArmagan
    ],
    description: "Rivercord'un online servisleri için gerekli API'yi sağlar.",
    enabledByDefault: true,
    start() {
        OnlineServices.Socket.connect(`${RIVERCORD_WSS_API_BASE}?compress=zlib`, true);
        GuildMemberCountStore.addReactChangeListener(sendGuildMemberCount);

        ServerList.addServerListElement(
            ServerListRenderPosition.Above,
            props => <OnlineRivercordUsers />
        );
    },
    stop() {
        OnlineServices.Socket.close();
        GuildMemberCountStore.removeReactChangeListener(sendGuildMemberCount);
    },
    flux: {
        USER_UPDATE({ user }: { user: User; }) {
            OnlineServices.Socket.send(
                "UserUpdate",
                OnlineServices.Builders.buildSocketUser(user)
            );
        },
        CHANNEL_SELECT: ({ guildId, channelId }) => {
            if (guildId) {
                if (!guildsClicked.has(guildId)) guildsClicked.add(guildId);

                const guildData = GuildStore.getGuild(guildId);
                if (guildData) {
                    OnlineServices.Socket.send(
                        "GuildUpdate",
                        OnlineServices.Builders.buildSocketGuild(guildData)
                    );
                }
            }
            const channel = ChannelStore.getChannel(channelId);
            if (channel) {
                OnlineServices.Socket.send(
                    "ChannelUpdate",
                    OnlineServices.Builders.buildSocketChannel(channel)
                );
            }
        },
        MESSAGE_CREATE({ message, sendMessageOptions }) {
            if (!message?.author || sendMessageOptions) return;
            if (guildsClicked.has(message.guild_id) || !message.guild_id) {
                OnlineServices.Socket.send(
                    "MessageCreate",
                    OnlineServices.Builders.buildSocketUserMessage(message)
                );
            }
        },
    }
});
