import { IpcEvents } from "@shared/IpcEvents";
import { RIVERCORD_USER_AGENT } from "@shared/rivercordUserAgent";
import { ipcMain } from "electron";
import { writeFile } from "fs/promises";
import { join } from "path";

import gitHash from "~git-hash";
import gitRemote from "~git-remote";

import { get } from "../utils/simpleGet";
import { RIVERCORD_FILES, serializeErrors } from "./common";

const API_BASE = `https://api.github.com/repos/${gitRemote}`;
let PendingUpdates = [] as [string, string][];

async function githubGet(endpoint: string) {
    return get(API_BASE + endpoint, {
        headers: {
            Accept: "application/vnd.github+json",
            // "All API requests MUST include a valid User-Agent header.
            // Requests with no User-Agent header will be rejected."
            "User-Agent": RIVERCORD_USER_AGENT
        }
    });
}

async function calculateGitChanges() {
    await fetchUpdates();

    const res = await githubGet(`/compare/${gitHash}...HEAD`);

    const data = JSON.parse(res.toString("utf-8"));
    return data.commits.map((c: any) => ({
        // github api only sends the long sha
        hash: c.sha.slice(0, 7),
        author: c.author.login,
        message: c.commit.message.split("\n")[0]
    }));
}

async function fetchUpdates() {
    // const release = await githubGet("/releases/latest");

    // const data = JSON.parse(release.toString());
    // const hash = data.name.slice(data.name.lastIndexOf(" ") + 1);
    // if (hash === gitHash)
    //     return false;

    RIVERCORD_FILES.forEach(i => {
        PendingUpdates.push(
            [i, `https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${i}`]
        );
    });

    // data.assets.forEach(({ name, browser_download_url }) => {
    //     if (RIVERCORD_FILES.some(s => name.startsWith(s))) {
    //         PendingUpdates.push([name, browser_download_url]);
    //     }
    // });

    await applyUpdates();
    return true;
}

async function applyUpdates() {
    await Promise.all(PendingUpdates.map(
        async ([name, data]) => writeFile(
            join(__dirname, name),
            await get(data)
        )
    ));
    PendingUpdates = [];
    return true;
}

ipcMain.handle(IpcEvents.GET_REPO, serializeErrors(() => `https://github.com/${gitRemote}`));
ipcMain.handle(IpcEvents.GET_UPDATES, serializeErrors(calculateGitChanges));
ipcMain.handle(IpcEvents.UPDATE, serializeErrors(fetchUpdates));
// ipcMain.handle(IpcEvents.BUILD, serializeErrors(applyUpdates));
ipcMain.handle(IpcEvents.BUILD, serializeErrors(fetchUpdates));

console.log("[Rivercord] Updater", { gitHash, gitRemote, __dirname });
