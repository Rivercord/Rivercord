import ErrorBoundary from "@components/ErrorBoundary";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { UserStore } from "@webpack/common";
import { addUserModalSection, removeUserModalSection } from "@api/UserModal";
import { MutualGroupDMs } from "./MutualGroupDMs";


export default definePlugin({
    name: "MutualGroupDMs",
    description: "Shows mutual group dms in profiles",
    authors: [Devs.amia, Devs.TheArmagan],
    dependencies: ["UserModalAPI"],

    start() {
        addUserModalSection({
            section: "mutual-group-dms",
            text: "Mutual Group DMs",
            component({ user }) {
                if (user.bot || user.id === UserStore.getCurrentUser().id) return null;
                return <ErrorBoundary>
                    <MutualGroupDMs user={user} />
                </ErrorBoundary>;
            }
        });
    },

    stop() {
        removeUserModalSection("mutual-group-dms");
    }
});
