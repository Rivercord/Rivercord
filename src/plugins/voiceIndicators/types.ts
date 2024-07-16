export interface StateGuild {
    id: string;
    name: string;
    icon?: string;
    vanity_url_code?: string;
}

export interface StateChannel {
    id: string;
    name: string;
}

export type StateString = "guildDeaf" | "deaf" | "guildMute" | "mute" | "video" | "stream" | "normal";

export interface UserVoiceState {
    created_at: string;
    state: StateString;
    channel: StateChannel;
    channel_id: string;
    guild?: StateGuild;
    guild_id?: string;
    type: "update" | "delete";
}
