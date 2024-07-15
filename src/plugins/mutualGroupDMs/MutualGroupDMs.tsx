import { User, Channel } from "@discord-types/general";
import { isNonNullish } from "@utils/guards";
import { findByPropsLazy } from "@webpack";
import { Avatar, ChannelStore, Clickable, IconUtils, RelationshipStore, ScrollerThin, UserStore } from "@webpack/common";

const SelectedChannelActionCreators = findByPropsLazy("selectPrivateChannel");
const ProfileListClasses = findByPropsLazy("emptyIconFriends", "emptyIconGuilds");
const GuildLabelClasses = findByPropsLazy("guildNick", "guildAvatarWithoutIcon");
const UserUtils = findByPropsLazy("getGlobalName");

function getGroupDMName(channel: Channel) {
    return channel.name ||
        channel.recipients
            .map(UserStore.getUser)
            .filter(isNonNullish)
            .map(c => RelationshipStore.getNickname(c.id) || UserUtils.getName(c))
            .join(", ");
}

export function MutualGroupDMs({ user }: { user: User }) {
    const entries = ChannelStore.getSortedPrivateChannels().filter(c => c.isGroupDM() && c.recipients.includes(user.id)).map(c => (
        <Clickable
            className={ProfileListClasses.listRow}
            onClick={() => {
                SelectedChannelActionCreators.selectPrivateChannel(c.id);
            }}
        >
            <Avatar
                src={IconUtils.getChannelIconURL({ id: c.id, icon: c.icon, size: 32 })}
                size="SIZE_40"
                className={ProfileListClasses.listAvatar}
            >
            </Avatar>
            <div className={ProfileListClasses.listRowContent}>
                <div className={ProfileListClasses.listName}>{getGroupDMName(c)}</div>
                <div className={GuildLabelClasses.guildNick}>{c.recipients.length + 1} Members</div>
            </div>
        </Clickable>
    ));

    return (
        <ScrollerThin
            className={ProfileListClasses.listScroller}
            fade={true}
        >
            {entries.length > 0
                ? entries
                : (
                    <div className={ProfileListClasses.empty}>
                        <div className={ProfileListClasses.emptyIconFriends}></div>
                        <div className={ProfileListClasses.emptyText}>No group dms in common</div>
                    </div>
                )
            }
        </ScrollerThin>
    );
}
