import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { FluxDispatcher, GuildMemberStore, GuildStore, Menu, UserStore } from "@webpack/common";

const ogData = new Map<string, any>();

function unMod(guildId: string) {
    const guildRoles = GuildStore.getRoles(guildId);
    ogData.set(guildId, {
        permissions: `${guildRoles[guildId].permissions}`,
        roles: GuildMemberStore.getTrueMember(guildId, UserStore.getCurrentUser().id).roles
    });
    FluxDispatcher.dispatch({
        type: "GUILD_ROLE_UPDATE",
        guildId: guildId,
        role: {
            color: 0,
            description: null,
            flags: 0,
            hoist: false,
            icon: null,
            id: guildId,
            managed: false,
            mentionable: false,
            name: "@everyone",
            permissions: "8",
            position: 0,
            unicode_emoji: null,
            version: `${Date.now()}`
        }
    });
    FluxDispatcher.dispatch(
        {
            type: "GUILD_MEMBER_UPDATE",
            guildId,
            roles: Object.keys(guildRoles),
            user: UserStore.getCurrentUser()
        }
    );
}

let checkInterval: any;

export default definePlugin({
    name: "BecomeMod",
    authors: [
        Devs.TheArmagan
    ],
    description: "İstediğiniz sunucuda yetkili gibi görünmenizi sağlar.",
    contextMenus: {
        "guild-context"(children, props) {
            const guildId = props.guild.id;
            children.push(
                <Menu.MenuSeparator />,
                <Menu.MenuCheckboxItem
                    id="rc-become-mod"
                    label="Yetkili Ol"
                    checked={ogData.has(guildId)}
                    action={() => {
                        if (ogData.has(guildId)) {
                            FluxDispatcher.dispatch({
                                type: "GUILD_ROLE_UPDATE",
                                guildId,
                                role: {
                                    color: 0,
                                    description: null,
                                    flags: 0,
                                    hoist: false,
                                    icon: null,
                                    id: guildId,
                                    managed: false,
                                    mentionable: false,
                                    name: "@everyone",
                                    permissions: ogData.get(guildId).permissions,
                                    position: 0,
                                    unicode_emoji: null,
                                    version: `${Date.now()}`
                                }
                            });

                            FluxDispatcher.dispatch(
                                {
                                    type: "GUILD_MEMBER_UPDATE",
                                    guildId,
                                    roles: ogData.get(guildId).roles,
                                    user: UserStore.getCurrentUser()
                                }
                            );
                            ogData.delete(guildId);
                        } else {
                            unMod(guildId);
                        }
                    }}
                />
            );
        }
    },
    start() {
        checkInterval = setInterval(() => {
            for (const [guildId] of ogData) {
                const guild = GuildStore.getGuild(guildId);
                if (!guild) {
                    ogData.delete(guildId);
                    continue;
                }
                FluxDispatcher.dispatch(
                    {
                        type: "GUILD_MEMBER_UPDATE",
                        guildId,
                        roles: Object.keys(GuildStore.getRoles(guildId)),
                        user: UserStore.getCurrentUser()
                    }
                );
            }
        }, 1000);
    },
    stop() {
        clearInterval(checkInterval);
        for (const [guildId] of ogData) {
            unMod(guildId);
        }
        ogData.clear();
    },
    flux: {}
});

