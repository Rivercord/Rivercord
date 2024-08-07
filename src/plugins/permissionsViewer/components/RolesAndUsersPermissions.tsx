import ErrorBoundary from "@components/ErrorBoundary";
import { Flex } from "@components/Flex";
import { InfoIcon, OwnerCrownIcon } from "@components/Icons";
import { getUniqueUsername } from "@utils/discord";
import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot, ModalSize, openModal } from "@utils/modal";
import { Clipboard, ContextMenuApi, FluxDispatcher, GuildMemberStore, GuildStore, i18n, Menu, PermissionsBits, Text, Tooltip, useEffect, UserStore, useState, useStateFromStores } from "@webpack/common";
import type { Guild } from "discord-types/general";

import { settings } from "..";
import { cl, getPermissionDescription, getPermissionString } from "../utils";
import { PermissionAllowedIcon, PermissionDefaultIcon, PermissionDeniedIcon } from "./icons";

export const enum PermissionType {
    Role = 0,
    User = 1,
    Owner = 2
}

export interface RoleOrUserPermission {
    type: PermissionType;
    id?: string;
    permissions?: bigint;
    overwriteAllow?: bigint;
    overwriteDeny?: bigint;
}

function openRolesAndUsersPermissionsModal(permissions: Array<RoleOrUserPermission>, guild: Guild, header: string) {
    return openModal(modalProps => (
        <RolesAndUsersPermissions
            modalProps={modalProps}
            permissions={permissions}
            guild={guild}
            header={header}
        />
    ));
}

function RolesAndUsersPermissionsComponent({ permissions, guild, modalProps, header }: { permissions: Array<RoleOrUserPermission>; guild: Guild; modalProps: ModalProps; header: string; }) {
    permissions.sort((a, b) => a.type - b.type);

    useStateFromStores(
        [GuildMemberStore],
        () => GuildMemberStore.getMemberIds(guild.id),
        null,
        (old, current) => old.length === current.length
    );

    useEffect(() => {
        const usersToRequest = permissions
            .filter(p => p.type === PermissionType.User && !GuildMemberStore.isMember(guild.id, p.id!))
            .map(({ id }) => id);

        FluxDispatcher.dispatch({
            type: "GUILD_MEMBERS_REQUEST",
            guildIds: [guild.id],
            userIds: usersToRequest
        });
    }, []);

    const [selectedItemIndex, selectItem] = useState(0);
    const selectedItem = permissions[selectedItemIndex];

    const roles = GuildStore.getRoles(guild.id);

    return (
        <ModalRoot
            {...modalProps}
            size={ModalSize.LARGE}
        >
            <ModalHeader>
                <Text className={cl("perms-title")} variant="heading-lg/semibold">{header} permissions:</Text>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>

            <ModalContent>
                {!selectedItem && (
                    <div className={cl("perms-no-perms")}>
                        <Text variant="heading-lg/normal">No permissions to display!</Text>
                    </div>
                )}

                {selectedItem && (
                    <div className={cl("perms-container")}>
                        <div className={cl("perms-list")}>
                            {permissions.map((permission, index) => {
                                const user = UserStore.getUser(permission.id ?? "");
                                const role = roles[permission.id ?? ""];

                                return (
                                    <button
                                        className={cl("perms-list-item-btn")}
                                        onClick={() => selectItem(index)}
                                    >
                                        <div
                                            className={cl("perms-list-item", { "perms-list-item-active": selectedItemIndex === index })}
                                            onContextMenu={e => {
                                                if (permission.type === PermissionType.Role)
                                                    ContextMenuApi.openContextMenu(e, () => (
                                                        <RoleContextMenu
                                                            guild={guild}
                                                            roleId={permission.id!}
                                                            onClose={modalProps.onClose}
                                                        />
                                                    ));
                                                else if (permission.type === PermissionType.User) {
                                                    ContextMenuApi.openContextMenu(e, () => (
                                                        <UserContextMenu
                                                            userId={permission.id!}
                                                            onClose={modalProps.onClose}
                                                        />
                                                    ));
                                                }
                                            }}
                                        >
                                            {(permission.type === PermissionType.Role || permission.type === PermissionType.Owner) && (
                                                <span
                                                    className={cl("perms-role-circle")}
                                                    style={{ backgroundColor: role?.colorString ?? "var(--primary-300)" }}
                                                />
                                            )}
                                            {permission.type === PermissionType.User && user !== undefined && (
                                                <img
                                                    className={cl("perms-user-img")}
                                                    src={user.getAvatarURL(void 0, void 0, false)}
                                                />
                                            )}
                                            <Text variant="text-md/normal">
                                                {
                                                    permission.type === PermissionType.Role
                                                        ? role?.name ?? "Unknown Role"
                                                        : permission.type === PermissionType.User
                                                            ? (user && getUniqueUsername(user)) ?? "Unknown User"
                                                            : (
                                                                <Flex style={{ gap: "0.2em", justifyItems: "center" }}>
                                                                    @owner
                                                                    <OwnerCrownIcon
                                                                        height={18}
                                                                        width={18}
                                                                        aria-hidden="true"
                                                                    />
                                                                </Flex>
                                                            )
                                                }
                                            </Text>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className={cl("perms-perms")}>
                            {Object.entries(PermissionsBits).map(([permissionName, bit]) => (
                                <div className={cl("perms-perms-item")}>
                                    <div className={cl("perms-perms-item-icon")}>
                                        {(() => {
                                            const { permissions, overwriteAllow, overwriteDeny } = selectedItem;

                                            if (permissions)
                                                return (permissions & bit) === bit
                                                    ? PermissionAllowedIcon()
                                                    : PermissionDeniedIcon();

                                            if (overwriteAllow && (overwriteAllow & bit) === bit)
                                                return PermissionAllowedIcon();
                                            if (overwriteDeny && (overwriteDeny & bit) === bit)
                                                return PermissionDeniedIcon();

                                            return PermissionDefaultIcon();
                                        })()}
                                    </div>
                                    <Text variant="text-md/normal">{getPermissionString(permissionName)}</Text>

                                    <Tooltip text={getPermissionDescription(permissionName) || "No Description"}>
                                        {props => <InfoIcon {...props} />}
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ModalContent>
        </ModalRoot >
    );
}

function RoleContextMenu({ guild, roleId, onClose }: { guild: Guild; roleId: string; onClose: () => void; }) {
    return (
        <Menu.Menu
            navId={cl("role-context-menu")}
            onClose={ContextMenuApi.closeContextMenu}
            aria-label="Role Options"
        >
            <Menu.MenuItem
                id="rc-copy-role-id"
                label={i18n.Messages.COPY_ID_ROLE}
                action={() => {
                    Clipboard.copy(roleId);
                }}
            />

            {(settings.store as any).unsafeViewAsRole && (
                <Menu.MenuItem
                    id="rc-pw-view-as-role"
                    label={i18n.Messages.VIEW_AS_ROLE}
                    action={() => {
                        const role = GuildStore.getRole(guild.id, roleId);
                        if (!role) return;

                        onClose();

                        FluxDispatcher.dispatch({
                            type: "IMPERSONATE_UPDATE",
                            guildId: guild.id,
                            data: {
                                type: "ROLES",
                                roles: {
                                    [roleId]: role
                                }
                            }
                        });
                    }
                    }
                />
            )}
        </Menu.Menu>
    );
}

function UserContextMenu({ userId, onClose }: { userId: string; onClose: () => void; }) {
    return (
        <Menu.Menu
            navId={cl("user-context-menu")}
            onClose={ContextMenuApi.closeContextMenu}
            aria-label="User Options"
        >
            <Menu.MenuItem
                id="rc-copy-user-id"
                label={i18n.Messages.COPY_ID_USER}
                action={() => {
                    Clipboard.copy(userId);
                }}
            />
        </Menu.Menu>
    );
}

const RolesAndUsersPermissions = ErrorBoundary.wrap(RolesAndUsersPermissionsComponent);

export default openRolesAndUsersPermissionsModal;
