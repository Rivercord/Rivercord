import { Logger } from "@utils/Logger";
import { ReconnectingWebSocket } from "lib/ReconnectingWebSocket";

export * as Builders from "./builders";
export * as Auth from "./auth";

export const socket = new ReconnectingWebSocket();
export const logger = new Logger("OnlineServices", "#1f7bdf");
