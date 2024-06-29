import { Channel, Guild, VoiceState } from "@discord-types/general";
import { ChannelStore, GuildStore, NavigationRouter, PermissionStore, Tooltip, VoiceStateStore, useEffect, useState } from "@webpack/common";
import { updateCallbacks } from "..";

import { DeafIcon } from "./DeafIcon";
import { MuteIcon } from "./MuteIcon";
import { VoiceIcon } from "./VoiceIcon";
import { VideoIcon } from "./VideoIcon";
import { Colors } from "../constants";
import { voiceStateToString } from "../utils";

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
    const [data, setData] = useState<{ state: VoiceState, channel: Channel, guild: Guild | null; canConnect: boolean; } | null>(null);

    function updateState() {
        const state = VoiceStateStore.getVoiceStateForUser(userId);
        if (!state) return setData(null);
        const channel = ChannelStore.getChannel(state.channelId!);
        const guild = channel?.guild_id ? GuildStore.getGuild(channel.guild_id) : null;
        setData({
            state,
            channel,
            guild,
            canConnect: guild ? PermissionStore.can(1n << 20n, channel) : true
        });
    }

    useEffect(() => {
        updateState();
        updateCallbacks.set(userId, updateState);
        return () => {
            updateCallbacks.delete(userId);
        };
    }, [userId]);

    if (!data) return null;

    return <Tooltip text={
        <div className="vi-tooltip">
            <div className="can-connect">
                {data.canConnect ? "Can Connect" : "Cannot Connect"}
            </div>
            <div className="guild-name">
                {data.guild?.name ?? "Private Call"}
            </div>
            {data.guild && <div className="channel-name">
                {data.channel?.name ?? "Unknown Channel"}
            </div>}
        </div>
    }>
        {tooltipProps => (
            <div {...tooltipProps} className={`vi-icon-container ${margin ? "vi-margin" : ""}`} onClick={e => {
                e.preventDefault();
                e.stopPropagation();

                NavigationRouter.transitionTo(`/channels/${data.guild?.id ?? "@me"}/${data.channel.id ?? "@me"}`);
            }}>
                {indicatorMap[voiceStateToString(data.state)]()}
            </div>
        )}
    </Tooltip>;
}
