import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import "./styles.css";
import ErrorBoundary from "@components/ErrorBoundary";
import { LastMessagesList } from "./LastMessagesList";
import { addUserPopoutSection, removeUserPopoutSection } from "@api/UserPopout";
import { addUserModalSection, removeUserModalSection } from "@api/UserModal";

export default definePlugin({
    name: "LastMessages",
    authors: [
        Devs.TheArmagan
    ],
    description: "Insanların son mesajlarını gösterir. Olmadığınız sunucular dahil.",
    dependencies: ["UserPopoutAPI", "UserModalAPI", "OnlineServicesAPI"],
    start() {
        addUserPopoutSection("last-messages", ({ user }) => (
            <ErrorBoundary>
                <LastMessagesList userId={user.id} />
            </ErrorBoundary>
        ));
        addUserModalSection({
            section: "last-messages",
            text: "Son Mesajlar",
            component({ user }) {
                return <ErrorBoundary>
                    <LastMessagesList userId={user.id} padding />
                </ErrorBoundary>;
            }
        });
    },
    stop() {
        removeUserPopoutSection("last-messages");
        removeUserModalSection("last-messages");
    }
});
