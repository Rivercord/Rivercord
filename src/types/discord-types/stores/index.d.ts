import { FluxEvents } from "@discord-types/other";

export { default as ChannelStore } from './ChannelStore';
export { default as GuildMemberStore } from './GuildMemberStore';
export { default as GuildStore } from './GuildStore';
export { default as MessageStore } from './MessageStore';
export { default as RelationshipStore } from './RelationshipStore';
export { default as SelectedChannelStore } from './SelectedChannelStore';
export { default as SelectedGuildStore } from './SelectedGuildStore';
export { default as UserStore } from './UserStore';
export { default as VoiceStateStore } from './VoiceStateStore';

export class FluxStore {
    constructor(dispatcher: FluxDispatcher, eventHandlers?: Partial<Record<FluxEvents, (data: any) => void>>);

    addChangeListener(callback: () => void): void;
    addReactChangeListener(callback: () => void): void;
    removeChangeListener(callback: () => void): void;
    removeReactChangeListener(callback: () => void): void;
    emitChange(): void;
    getDispatchToken(): string;
    getName(): string;
    initialize(): void;
    initializeIfNeeded(): void;
    registerActionHandlers: (...args: any[]) => any;
    syncWith: (...args: any[]) => any;
    waitFor: (...args: any[]) => any;

    static getAll(): FluxStore[];
}
