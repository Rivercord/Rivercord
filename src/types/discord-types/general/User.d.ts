export default class User {
    constructor(user: object);
    accentColor: number;
    avatar: string;
    banner: string;
    bio: string;
    bot: boolean;
    desktop: boolean;
    discriminator: string;
    email: string | undefined;
    flags: number;
    globalName: string | undefined;
    guildMemberAvatars: Record<string, string>;
    id: string;
    mfaEnabled: boolean;
    mobile: boolean;
    nsfwAllowed: boolean | undefined;
    phone: string | undefined;
    premiumType: number | undefined;
    premiumUsageFlags: number;
    publicFlags: number;
    purchasedFlags: number;
    system: boolean;
    username: string;
    verified: boolean;
    premiumType: number | undefined;
    avatarDecorationData: {
        asset: string;
        skuId: string;
    } | undefined;
    clan: {
        badge: string;
        identityEnabled: boolean;
        identityGuildId: string;
        tag: string;
    } | undefined;

    get createdAt(): Date;
    get hasPremiumPerks(): boolean;
    get tag(): string;
    get usernameNormalized(): string;

    addGuildAvatarHash(guildId: string, avatarHash: string): User;
    getAvatarSource(guildId: string, canAnimate?: boolean): { uri: string; };
    getAvatarURL(guildId?: string, t?: unknown, canAnimate?: boolean): string;
    hasAvatarForGuild(guildId: string): boolean;
    hasDisabledPremium(): boolean;
    hasFlag(flag: number): boolean;
    hasFreePremium(): boolean;
    hasHadSKU(e: unknown): boolean;
    hasPremiumUsageFlag(flag: number): boolean;
    hasPurchasedFlag(flag: number): boolean;
    hasUrgentMessages(): boolean;
    isClaimed(): boolean;
    isLocalBot(): boolean;
    isNonUserBot(): boolean;
    isPhoneVerified(): boolean;
    isStaff(): boolean;
    isSystemUser(): boolean;
    isVerifiedBot(): boolean;
    removeGuildAvatarHash(guildId: string): User;
    toString(): string;
}

export interface UserJSON {
    avatar: string;
    avatarDecoration: unknown | undefined;
    discriminator: string;
    id: string;
    publicFlags: number;
    username: string;
}
