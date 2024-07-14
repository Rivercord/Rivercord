import { ChannelStore } from "@webpack/common";

function cleanupUserObject(user: any) {
    return {
        discriminator: user.discriminator,
        username: user.username,
        avatar: user.avatar,
        id: user.id,
        bot: user.bot,
        public_flags: typeof user.publicFlags !== "undefined" ? user.publicFlags : user.public_flags,
        flags: typeof user.publicFlags !== "undefined" ? user.publicFlags : user.public_flags,
        avatar_decoration_asset: user.avatar_decoration_data?.asset,
    };
}
function cleanupEmbed(embed: any) {
    if (!embed?.id) return embed;
    const retEmbed: any = {};
    if (typeof embed.rawTitle === "string") retEmbed.title = embed.rawTitle;
    if (typeof embed.rawDescription === "string") retEmbed.description = embed.rawDescription;
    if (typeof embed.referenceId !== "undefined") retEmbed.reference_id = embed.referenceId;
    if (typeof embed.color === "string") retEmbed.color = parseInt(embed.color.replace("#", ""), 16);
    if (typeof embed.type !== "undefined") retEmbed.type = embed.type;
    if (typeof embed.url !== "undefined") retEmbed.url = embed.url;
    if (typeof embed.provider === "object") retEmbed.provider = { name: embed.provider.name, url: embed.provider.url };
    if (typeof embed.footer === "object") retEmbed.footer = { text: embed.footer.text, icon_url: embed.footer.iconURL, proxy_icon_url: embed.footer.iconProxyURL };
    if (typeof embed.author === "object") retEmbed.author = { name: embed.author.name, url: embed.author.url, icon_url: embed.author.iconURL, proxy_icon_url: embed.author.iconProxyURL };
    if (typeof embed.timestamp === "object" && embed.timestamp._isAMomentObject) retEmbed.timestamp = new Date(embed.timestamp.milliseconds()).toISOString();
    if (typeof embed.thumbnail === "object") {
        if (typeof embed.thumbnail.proxyURL === "string" || (typeof embed.thumbnail.url === "string" && !embed.thumbnail.url.endsWith("?format=jpeg"))) {
            retEmbed.thumbnail = {
                url: embed.thumbnail.url,
                proxy_url: typeof embed.thumbnail.proxyURL === "string" ? embed.thumbnail.proxyURL.split("?")[0] : undefined,
                width: embed.thumbnail.width,
                height: embed.thumbnail.height
            };
        }
    }
    if (typeof embed.image === "object") {
        retEmbed.image = {
            url: embed.image.url,
            proxy_url: embed.image.proxyURL,
            width: embed.image.width,
            height: embed.image.height
        };
    }
    if (typeof embed.video === "object") {
        retEmbed.video = {
            url: embed.video.url,
            proxy_url: embed.video.proxyURL,
            width: embed.video.width,
            height: embed.video.height
        };
    }
    if (Array.isArray(embed.fields) && embed.fields.length) {
        retEmbed.fields = embed.fields.map(e => ({ name: e.rawName, value: e.rawValue, inline: e.inline }));
    }
    return retEmbed;
}

function cleanupMessageObject(message: any) {
    return {
        mention_everyone: typeof message.mention_everyone !== "boolean" ? typeof message.mentionEveryone !== "boolean" ? false : message.mentionEveryone : message.mention_everyone,
        edited_timestamp: message.edited_timestamp || message.editedTimestamp || null,
        attachments: message.attachments || [],
        channel_id: message.channel_id,
        reactions: (message.reactions || []).map((e: any) => ({ count: e.count, emoji: e.emoji, me: e.me })),
        guild_id: message.guild_id || (ChannelStore.getChannel(message.channel_id) ? ChannelStore.getChannel(message.channel_id).guild_id : undefined),
        content: message.content,
        type: message.type,
        embeds: (message.embeds || []).map(cleanupEmbed),
        author: cleanupUserObject(message.author),
        mentions: message.mentions || [],
        mention_roles: message.mention_roles || message.mentionRoles || [],
        id: message.id,
        flags: message.flags,
        timestamp: message.timestamp,
        referenced_message: message.message_reference || message.messageReference,
        sticker_items: message.sticker_items || message.stickerItems || [],
    };
}

export function buildSocketUserMessage(message: any) {
    return cleanupMessageObject(message);
}
