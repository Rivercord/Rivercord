export default interface VoiceState {
    channelId: string;
    deaf: boolean;
    mute: boolean;
    requestToSpeakTimestamp: string | null;
    selfDeaf: boolean;
    selfMute: boolean;
    selfStream: boolean;
    selfVideo: boolean;
    sessionId: string;
    suppress: boolean;
    userId: string;

    isVoiceDeafened(): boolean;
    isVoiceMuted(): boolean;

    channelId?: string;
    oldChannelId?: string;
    guildId?: string;
}
