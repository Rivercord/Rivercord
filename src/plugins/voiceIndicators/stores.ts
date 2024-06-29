import type { FluxStore, VoiceStateStore as VSS } from "@discord-types/stores";
import { findStoreLazy } from "@webpack";


export const VoiceStateStore: VSS & FluxStore = findStoreLazy("VoiceStateStore");
