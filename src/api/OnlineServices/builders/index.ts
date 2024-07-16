import { User, Guild, Channel, VoiceState } from "@discord-types/general";
import { UserStore } from "@webpack/common";

export * from "./message";

export function buildSocketUser(user: User) {
    return {
        id: user.id,
        username: user.username,
        global_name: user.globalName,
        avatar: user.avatar,
        banner: user.banner,
        avatar_decoration_asset: user.avatarDecorationData?.asset,
        premium_type: user.premiumType,
        bio: user.bio,
        flags: user.flags || user.publicFlags,
        bot: user.bot,
        discriminator: user.discriminator,
    };
}

export function buildSocketGuild(guild: Guild) {
    return {
        id: guild.id,
        name: guild.name,
        vanity_url_code: guild.vanityURLCode,
        banner: guild.banner,
        splash: guild.splash,
        icon: guild.icon,
        description: guild.description,
        owner_id: guild.ownerId,
        max_members: guild.maxMembers,
        preferred_locale: guild.preferredLocale,
        premium_subscription_count: guild.premiumSubscriberCount,
        verification_level: guild.verificationLevel,
        nsfw_level: guild.nsfwLevel,
        features: guild.features,
    };
}

export function buildSocketGuildMemberCount({ guildId, memberCount, onlineCount }: { guildId: string; memberCount: number; onlineCount: number; }) {
    return {
        id: guildId,
        member_count: memberCount,
        online_count: onlineCount,
    };
}

export function buildSocketChannel(channel: Channel) {
    const recipients = channel.recipients?.length ? [...new Map([...channel.recipients.map(i => [i, UserStore.getUser(i)]) as any, [UserStore.getCurrentUser().id, UserStore.getCurrentUser()]]).values()].filter(i => i) : [];
    return {
        id: channel.id,
        guild_id: channel.guild_id,
        name: channel.name || ((channel.isDM() && !channel.isGroupDM()) ?
            (UserStore.getUser(channel.getRecipientId()).username + ", " + UserStore.getCurrentUser().username)
            : channel.name) || recipients.map((i: any) => i.username).sort((a, b) => a.localeCompare(b)).join(", "),
        type: channel.type,
        recipients: recipients.map((i: any) => i.id).filter(i => i) as string[],
        owner_id: channel.ownerId,
        position: channel.position,
        parent_id: channel.parent_id,
        flags: channel.flags,
        icon: channel.icon,
    };
}

export function buildSocketVoiceState(state: VoiceState) {
    return {
        user_id: state.userId,
        guild_id: state.guildId,
        channel_id: state.channelId,
        old_channel_id: state.oldChannelId,
        session_id: state.sessionId,
        deaf: state.deaf,
        mute: state.mute,
        self_deaf: state.selfDeaf,
        self_mute: state.selfMute,
        self_stream: state.selfStream,
        self_video: state.selfVideo,
        suppress: state.suppress,
    };
}
