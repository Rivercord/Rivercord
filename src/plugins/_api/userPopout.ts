import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "UserPopoutAPI",
    description: "API required for plugins that modify the user popout",
    authors: [Devs.TheArmagan],

    patches: [
        {
            // user popout
            find: /onOpenProfile.{1,5}usernameIcon.{1,5}hasAvatarForGuild/,
            replacement: [
                {
                    match: /([a-zA-Z0-9]{1,2}\.Scroller,{.{1,30}children:\[)(.{1,3000})(]})/,
                    replace: "$1$2,...Rivercord.Api.UserPopout._renderAll(arguments[0])$3"
                }
            ]
        }
    ]
});
