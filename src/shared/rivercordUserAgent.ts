/*
 * Rivercord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import gitHash from "~git-hash";
import gitRemote from "~git-remote";

export { gitHash, gitRemote };

export const RIVERCORD_USER_AGENT = `Rivercord/${gitHash}${gitRemote ? ` (https://github.com/${gitRemote})` : ""}`;
