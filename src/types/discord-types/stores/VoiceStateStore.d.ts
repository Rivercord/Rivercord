import { VoiceState } from "@discord-types/general";

export default interface VoiceStateStore {
    getAllVoiceStates(): Record<string, Record<string, VoiceState>>;
    getVoiceState(guildId: string, userId: string): VoiceState | null;
    getVoiceStates(guildId: string): Record<string, VoiceState>;
    getVoiceState(guildId: string, userId: string): VoiceState | null;
    getVoiceStateForChannel(channelId: string): VoiceState | null;
    getVoiceStateForSession(guildId: string, sessionId: string): VoiceState | null;
    getVoiceStateForUser(userId: string): VoiceState | null;
    getVoiceStatesForChannel(channelId: string): Record<string, VoiceState>;
}
