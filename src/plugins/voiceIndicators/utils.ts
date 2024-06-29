import { VoiceState } from "@discord-types/general";

export function voiceStateToString(i: VoiceState): string {
    return (i.selfDeaf || i.deaf)
        ? `${i.deaf ? "guildDeaf" : "deaf"}`
        : (i.selfMute || i.mute || i.suppress)
            ? `${i.mute ? "guildMute" : "mute"}`
            : i.selfVideo
                ? "video"
                : i.selfStream
                    ? "stream"
                    : "normal";
}
