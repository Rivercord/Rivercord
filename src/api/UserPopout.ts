import { User } from "@discord-types/general";
import { Logger } from "@utils/Logger";
import { Guild } from "discord-types/general";

export interface UserPopoutData {
    user: User;
    guild?: Guild;
    channelId?: string;
}

export type UserPopoutSectionCallback = (data: UserPopoutData) => JSX.Element;

const logger = new Logger("UserPopout");

const sections = new Map<string, UserPopoutSectionCallback>();

export function addUserPopoutSection(id: string, render: UserPopoutSectionCallback) {
    sections.set(id, render);
}

export function removeUserPopoutSection(id: string) {
    sections.delete(id);
}

export const _renderAll = (data: UserPopoutData) => {
    const ret = [] as JSX.Element[];

    for (const [id, render] of sections) {
        try {
            ret.push(render(data));
        } catch (e) {
            logger.error("Failed to render user popout element with id:", id, e);
        }
    }

    return ret;
};
