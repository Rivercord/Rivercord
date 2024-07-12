import { User, Guild } from "@discord-types/general";

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
        guild_id: guildId,
        member_count: memberCount,
        online_count: onlineCount,
    };
}
