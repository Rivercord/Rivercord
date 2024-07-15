import { User } from "@discord-types/general";
import { Logger } from "@utils/Logger";
import { GuildStore } from "@webpack/common";
import { Guild } from "discord-types/general";

export interface UserModalData {
    user: User;
    guild?: Guild;
    items: UserModalSection[];
    section: string;
}

export type UserModalSectionCallback = (data: UserModalData) => JSX.Element;

export interface UserModalSection {
    section: string;
    text: string;
    predicate?(e: UserModalData): boolean;
    component(e: UserModalData): JSX.Element | null;
}

const logger = new Logger("UserModal");

const sections = new Map<string, UserModalSection>();

export function addUserModalSection(section: UserModalSection) {
    sections.set(section.section, section);
}

export function removeUserModalSection(section: string) {
    sections.delete(section);
}

export function getSections() {
    return Array.from(sections.values());
}

export const _buildDataArgument = (e: UserModalData & Record<string, any>) => {
    return {
        ...e,
        guild: e?.displayProfile?.guildId ? GuildStore.getGuild(e?.displayProfile?.guildId) : undefined,
    } as UserModalData;
};

export const _getSectionById = (e: UserModalData, section: string) => {
    e = _buildDataArgument(e);
    return getSections().find(i => (!i.predicate || i.predicate(e)) && i.section === section);
};

export const _patchArgs = (e: UserModalData) => {
    e = _buildDataArgument(e);
    getSections().forEach(s => {
        if ((!s.predicate || s.predicate(e)) && !e.items.some(i => i.section === s.section)) {
            e.items.push(s);
        }
    });
    return e;
};
