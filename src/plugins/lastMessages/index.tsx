import { User } from "@discord-types/general";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { LastMessagesList } from "./LastMessagesList";
import ErrorBoundary from "@components/ErrorBoundary";

import "./styles.css";

export default definePlugin({
    name: "LastMessages",
    authors: [
        Devs.TheArmagan
    ],
    description: "Insanların son mesajlarını gösterir.",
    patches: [
        {
            // user popout
            find: /,className:[a-zA-Z0-9]{1,2},scrollerRef:[a-zA-Z0-9]{1,2},specs:[a-zA-Z0-9]{1,2}}\);/,
            replacement: [
                {
                    match: /(return .{1,2}.forwardRef\(function\((.{1,10})\){.{1,500}containerRef:[a-zA-Z0-9]{1,3},children:\[)(.{1,10})(\])/,
                    replace(_, before, children, originalChildren, after) {
                        const [first, second] = originalChildren.split(",");
                        return `${before}${first},$self.getListComponent(${children}),${second}${after}`;
                    }
                }
            ]
        }
    ],
    getListComponent(e) {
        if (!e?.className) return null;
        if (!e.className.startsWith("scroller_") && !e.className.startsWith("body_")) return null;
        const user = e?.children?.find?.(i => i?.props?.user)?.props?.user as User;
        if (!user) return null;
        return <ErrorBoundary noop>
            <LastMessagesList user={user} />
        </ErrorBoundary>;
    }
});
