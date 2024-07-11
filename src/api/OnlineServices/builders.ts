import { User } from "@discord-types/general";

export function buildSocketUser(user: User) {
    return {
        id: user.id,
        username: user.username,
        global_name: user.globalName || user.username,
        avatar: user.avatar,
        banner: user.banner,
        avatar_decoration_asset: user.avatarDecorationData?.asset,
        premium_type: user.premiumType,
        bio: user.bio,
        flags: user.flags || user.publicFlags,
    };
}
