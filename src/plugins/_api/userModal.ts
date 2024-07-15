import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "UserModalAPI",
    description: "API required for plugins that modify the user popout",
    authors: [Devs.TheArmagan],

    patches: [
        {
            find: /.{1,2}===.{1,20}MUTUAL_FRIENDS\?/,
            replacement: [
                {
                    match: /(function .{1,2}\((.{1,2})\){)(let{.{1,20}subsection:)/,
                    replace: "$1$2=Rivercord.Api.UserModal._patchArgs($2);$3"
                },
                {
                    match: /(function .{1,2}\((.{1,2})\){var .{1,10};)(let{user:.{1,50},items:)/,
                    replace: "$1$2=Rivercord.Api.UserModal._patchArgs($2);$3"
                },
                {
                    match: /(([a-zA-Z0-9]{1,2})===(?:.{1,15})\.BOT_INFO)/,
                    replace: "Rivercord.Api.UserModal._getSectionById(arguments[0],$2)?Rivercord.Api.UserModal._getSectionById(arguments[0],$2).component(arguments[0]):$1"
                }
            ]
        }
    ]
});
