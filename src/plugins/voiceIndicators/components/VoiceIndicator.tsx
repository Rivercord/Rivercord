import { Channel, Guild } from "@discord-types/general";
import { ChannelStore, GuildStore, InviteActions, moment, NavigationRouter, PermissionStore, Toasts, Tooltip, useEffect, useState } from "@webpack/common";

import { DeafIcon } from "./DeafIcon";
import { MuteIcon } from "./MuteIcon";
import { VoiceIcon } from "./VoiceIcon";
import { VideoIcon } from "./VideoIcon";
import { Colors } from "../constants";
import { UserVoiceState } from "../types";
import { OnlineServices } from "@api/index";

const indicatorMap = {
    guildDeaf: () => <DeafIcon color={Colors.RED} />,
    deaf: () => <DeafIcon color={Colors.GRAY} />,
    guildMute: () => <MuteIcon color={Colors.RED} />,
    mute: () => <MuteIcon color={Colors.GRAY} />,
    video: () => <VideoIcon color={Colors.GRAY} />,
    stream: () => <div className="vi-icon vi-red-dot"></div>,
    normal: () => <VoiceIcon color={Colors.GRAY} />
};

export function VoiceIndicator({ userId, margin }: { userId: string; margin?: boolean; }) {
    const [data, setData] = useState<{ state: UserVoiceState, channel: Channel | null, guild: Guild | null; canConnect: boolean; } | null>(null);

    const updateChannelAndGuild = () => {
        if (!data) return { channel: null, guild: null };
        return {
            channel: ChannelStore.getChannel(data.state.channel_id),
            guild: data.state.guild_id ? GuildStore.getGuild(data.state.guild_id) : null,
        };
    };

    const processEventData = (state: UserVoiceState) => {
        switch (state.type) {
            case "delete": {
                setData(null);
                break;
            }
            case "update": {
                const channel = ChannelStore.getChannel(state.channel_id);
                const guild = state.guild_id ? GuildStore.getGuild(state.guild_id) : null;
                setData({
                    state,
                    channel,
                    guild,
                    canConnect: guild ? PermissionStore.can(1n << 20n, channel) : true
                });
                break;
            }
        }
    };

    useEffect(() => {
        OnlineServices.Socket.send("UserVoiceState", userId);
        OnlineServices.Socket.events.waitFor("UserVoiceState", (_, d: UserVoiceState & { id: string; }) => d.id === userId).then(([d]: any[]) => {
            processEventData(d);
        });

        const unsubscribeUpdates = OnlineServices.Socket.events.on("VoiceStateUpdate", (d: UserVoiceState & { user_id: string; }) => {
            if (d.user_id !== userId) return;
            processEventData(d);
        });
        OnlineServices.Socket.send(":Subscribe", `VoiceStateUpdate:${userId}`);

        return () => {
            unsubscribeUpdates();
            OnlineServices.Socket.send(":Unsubscribe", `VoiceStateUpdate:${userId}`);
        };
    }, [userId]);

    return data && <Tooltip text={
        <div className="vi-tooltip">
            <div className="can-connect">
                {data.canConnect ? "Bağlanabilir" : "Bağlanamaz"}
            </div>
            <div className="guild-name">
                {data.guild?.name || data.state.guild?.name || "Özel Arama"}
            </div>
            <div className="channel-name">
                {data.channel?.name || data.state.channel?.name || "Bilinmiyor"}
            </div>
            <div className="time-elapsed">
                {moment(data.state.created_at).fromNow()}
            </div>
        </div>
    }>
        {tooltipProps => (
            <div {...tooltipProps} className={`vi-icon-container ${margin ? "vi-margin" : ""}`} onClick={e => {
                e.preventDefault();
                e.stopPropagation();

                if (!data.channel && data.state.guild?.vanity_url_code) {
                    InviteActions.acceptInvite({ inviteKey: data.state.guild.vanity_url_code }).finally(() => {
                        setTimeout(() => {
                            const { channel, guild } = updateChannelAndGuild();
                            setData({ ...data, channel, guild });
                            if (channel) {
                                NavigationRouter.transitionTo(`/channels/${channel?.guild_id ?? "@me"}/${channel?.id ?? "@me"}`);
                                Toasts.show({
                                    message: "Sunucuya başarıyla katıldınız!",
                                    type: Toasts.Type.SUCCESS,
                                    id: Toasts.genId()
                                });
                            } else {
                                Toasts.show({
                                    message: "Kanal bulunamadı.",
                                    type: Toasts.Type.FAILURE,
                                    id: Toasts.genId()
                                });
                            }
                        }, 1000);
                    });
                    return;
                }

                NavigationRouter.transitionTo(`/channels/${data.state.guild_id ?? "@me"}/${data.state.channel_id ?? "@me"}`);
            }}>
                {indicatorMap[data.state.state]()}
            </div>
        )}
    </Tooltip>;
}
