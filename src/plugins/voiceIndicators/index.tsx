import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import "./styles.css";

import { addDecorator, removeDecorator } from "@api/MemberListDecorators";
import ErrorBoundary from "@components/ErrorBoundary";
import { VoiceIndicator } from "./components/VoiceIndicator";
import { BadgePosition, ProfileBadge, addBadge, removeBadge } from "@api/Badges";
import { addDecoration, removeDecoration } from "@api/MessageDecorations";

const badge: ProfileBadge = {
    component: p => <VoiceIndicator {...p} />,
    position: BadgePosition.START,
    key: "voice-indicator"
};

export default definePlugin({
    name: "VoiceIndicators",
    authors: [Devs.TheArmagan],
    description: "Insanların hangi ses kanalında olduğunu öğrenin. Aynı sunucuda olmanız gerekmemektedir.",
    dependencies: ["BadgeAPI", "MemberListDecoratorsAPI", "MessageDecorationsAPI", "OnlineServicesAPI"],
    start() {

        addDecorator("voice-indicator", props => props.user ? (
            <ErrorBoundary noop>
                <VoiceIndicator userId={props.user.id} margin />
            </ErrorBoundary>
        ) : null);

        addDecoration("voice-indicator", props => (
            <ErrorBoundary noop>
                <VoiceIndicator userId={props.message?.author.id} margin />
            </ErrorBoundary>
        ));

        addBadge(badge);
    },
    stop() {
        removeDecorator("voice-indicator");

        removeBadge(badge);

        removeDecoration("voice-indicator");
    }
});

