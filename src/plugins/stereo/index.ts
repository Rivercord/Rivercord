import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    audioBitrate: {
        type: OptionType.SELECT,
        description: "Ses kalitesi.",
        options: [
            {
                label: "8kbps",
                value: "8000"
            },
            {
                label: "16kbps",
                value: "16000"
            },
            {
                label: "32kbps",
                value: "32000"
            },
            {
                label: "64kbps",
                value: "64000"
            },
            {
                label: "128kbps",
                value: "128000"
            },
            {
                label: "256kbps",
                value: "256000",
                default: true
            },
            {
                label: "512kbps",
                value: "512000"
            }
        ]
    },
    channelCount: {
        type: OptionType.SELECT,
        description: "Kanal sayısı.",
        options: [
            {
                label: "1.0 Mono Sound",
                value: "1.0"
            },
            {
                label: "2.0 Normal Stereo Sound",
                value: "2.0"
            },
            {
                label: "7.1 Surround Sound",
                value: "7.1",
                default: true
            }
        ]
    }
});

export default definePlugin({
    name: "Stereo",
    description: "Mikrofonunuzun sesini stereo olarak ayarlayabilmenize olanak sağlar.",
    authors: [
        Devs.TheArmagan
    ],
    settings,
    patches: [
        {
            find: "updateVideoQuality(",
            replacement: [
                {
                    match: /(updateVideoQuality\([a-zA-Z0-9]{1,3}\){)(let{)/,
                    replace: "$1$self.modifyConn(this);$2"
                }
            ]
        }
    ],
    modifyConn(self: any) {
        // eslint-disable-next-line prefer-destructuring
        const setTransportOptions = self.conn.setTransportOptions;
        self.conn.setTransportOptions = function (arg0) {
            if (arg0.audioEncoder) {
                arg0.audioEncoder.params = {
                    stereo: settings.store.channelCount,
                };
                arg0.audioEncoder.channels = parseFloat(settings.store.channelCount);
            } else {
                arg0.audioEncoder = {
                    params: {
                        stereo: settings.store.channelCount,
                    },
                    channels: parseFloat(settings.store.channelCount),
                };
            }

            arg0.fec = false;
            arg0.encodingVoiceBitRate = parseInt(settings.store.audioBitrate);

            return setTransportOptions.call(self.conn, arg0);
        };
    }
});
