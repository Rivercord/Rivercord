// Rivercord b42a43e2
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// scripts/build/inject/react.mjs
var init_react = __esm({
  "scripts/build/inject/react.mjs"() {
    "use strict";
  }
});

// src/shared/IpcEvents.ts
var init_IpcEvents = __esm({
  "src/shared/IpcEvents.ts"() {
    "use strict";
    init_react();
  }
});

// git-hash:~git-hash
var git_hash_default;
var init_git_hash = __esm({
  "git-hash:~git-hash"() {
    init_react();
    git_hash_default = "b42a43e2";
  }
});

// git-remote:~git-remote
var git_remote_default;
var init_git_remote = __esm({
  "git-remote:~git-remote"() {
    init_react();
    git_remote_default = "Rivercord/Rivercord";
  }
});

// src/shared/rivercordUserAgent.ts
var RIVERCORD_USER_AGENT;
var init_rivercordUserAgent = __esm({
  "src/shared/rivercordUserAgent.ts"() {
    "use strict";
    init_react();
    init_git_hash();
    init_git_remote();
    RIVERCORD_USER_AGENT = `Rivercord/${git_hash_default}${git_remote_default ? ` (https://github.com/${git_remote_default})` : ""}`;
  }
});

// src/main/utils/simpleGet.ts
function get(url, options = {}) {
  return new Promise((resolve, reject) => {
    import_https.default.get(url, options, (res) => {
      const { statusCode, statusMessage, headers } = res;
      if (statusCode >= 400)
        return void reject(`${statusCode}: ${statusMessage} - ${url}`);
      if (statusCode >= 300)
        return void resolve(get(headers.location, options));
      const chunks = [];
      res.on("error", reject);
      res.on("data", (chunk) => chunks.push(chunk));
      res.once("end", () => resolve(Buffer.concat(chunks)));
    });
  });
}
var import_https;
var init_simpleGet = __esm({
  "src/main/utils/simpleGet.ts"() {
    "use strict";
    init_react();
    import_https = __toESM(require("https"));
  }
});

// src/main/updater/common.ts
function serializeErrors(func) {
  return async function() {
    try {
      return {
        ok: true,
        value: await func(...arguments)
      };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? {
          ...e
        } : e
      };
    }
  };
}
var RIVERCORD_FILES;
var init_common = __esm({
  "src/main/updater/common.ts"() {
    "use strict";
    init_react();
    RIVERCORD_FILES = [
      false ? "patcher.js" : "rivercordDesktopMain.js",
      false ? "preload.js" : "rivercordDesktopPreload.js",
      false ? "renderer.js" : "rivercordDesktopRenderer.js",
      false ? "renderer.css" : "rivercordDesktopRenderer.css"
    ];
  }
});

// src/main/updater/http.ts
var http_exports = {};
async function githubGet(endpoint) {
  return get(API_BASE + endpoint, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": RIVERCORD_USER_AGENT
    }
  });
}
async function calculateGitChanges() {
  const isOutdated = await fetchUpdates();
  if (!isOutdated)
    return [];
  const res = await githubGet(`/compare/${git_hash_default}...HEAD`);
  const data = JSON.parse(res.toString("utf-8"));
  return data.commits.map((c) => ({
    hash: c.sha.slice(0, 7),
    author: c.author.login,
    message: c.commit.message.split("\n")[0]
  }));
}
async function fetchUpdates() {
  const release = await githubGet("/releases/latest");
  const data = JSON.parse(release.toString());
  const hash = data.name.slice(data.name.lastIndexOf(" ") + 1);
  if (hash === git_hash_default)
    return false;
  data.assets.forEach(({ name, browser_download_url }) => {
    if (RIVERCORD_FILES.some((s) => name.startsWith(s))) {
      PendingUpdates.push([name, browser_download_url]);
    }
  });
  return true;
}
async function applyUpdates() {
  await Promise.all(PendingUpdates.map(
    async ([name, data]) => (0, import_promises.writeFile)(
      (0, import_path.join)(__dirname, name),
      await get(data)
    )
  ));
  PendingUpdates = [];
  return true;
}
var import_electron, import_promises, import_path, API_BASE, PendingUpdates;
var init_http = __esm({
  "src/main/updater/http.ts"() {
    "use strict";
    init_react();
    init_IpcEvents();
    init_rivercordUserAgent();
    import_electron = require("electron");
    import_promises = require("fs/promises");
    import_path = require("path");
    init_git_hash();
    init_git_remote();
    init_simpleGet();
    init_common();
    API_BASE = `https://api.github.com/repos/${git_remote_default}`;
    PendingUpdates = [];
    import_electron.ipcMain.handle("RivercordGetRepo" /* GET_REPO */, serializeErrors(() => `https://github.com/${git_remote_default}`));
    import_electron.ipcMain.handle("RivercordGetUpdates" /* GET_UPDATES */, serializeErrors(calculateGitChanges));
    import_electron.ipcMain.handle("RivercordUpdate" /* UPDATE */, serializeErrors(fetchUpdates));
    import_electron.ipcMain.handle("RivercordBuild" /* BUILD */, serializeErrors(applyUpdates));
  }
});

// src/main/updater/git.ts
var git_exports = {};
function git(...args) {
  const opts = { cwd: RIVERCORD_SRC_DIR };
  if (isFlatpak)
    return execFile("flatpak-spawn", ["--host", "git", ...args], opts);
  else
    return execFile("git", args, opts);
}
async function getRepo() {
  const res = await git("remote", "get-url", "origin");
  return res.stdout.trim().replace(/git@(.+):/, "https://$1/").replace(/\.git$/, "");
}
async function calculateGitChanges2() {
  await git("fetch");
  const branch = (await git("branch", "--show-current")).stdout.trim();
  const existsOnOrigin = (await git("ls-remote", "origin", branch)).stdout.length > 0;
  if (!existsOnOrigin)
    return [];
  const res = await git("log", `HEAD...origin/${branch}`, "--pretty=format:%an/%h/%s");
  const commits = res.stdout.trim();
  return commits ? commits.split("\n").map((line) => {
    const [author, hash, ...rest] = line.split("/");
    return {
      hash,
      author,
      message: rest.join("/").split("\n")[0]
    };
  }) : [];
}
async function pull() {
  const res = await git("pull");
  return res.stdout.includes("Fast-forward");
}
async function build() {
  const opts = { cwd: RIVERCORD_SRC_DIR };
  const command = isFlatpak ? "flatpak-spawn" : "node";
  const args = isFlatpak ? ["--host", "node", "scripts/build/build.mjs"] : ["scripts/build/build.mjs"];
  if (true)
    args.push("--dev");
  const res = await execFile(command, args, opts);
  return !res.stderr.includes("Build failed");
}
var import_child_process, import_electron2, import_path2, import_util, RIVERCORD_SRC_DIR, execFile, isFlatpak;
var init_git = __esm({
  "src/main/updater/git.ts"() {
    "use strict";
    init_react();
    init_IpcEvents();
    import_child_process = require("child_process");
    import_electron2 = require("electron");
    import_path2 = require("path");
    import_util = require("util");
    init_common();
    RIVERCORD_SRC_DIR = (0, import_path2.join)(__dirname, "..");
    execFile = (0, import_util.promisify)(import_child_process.execFile);
    isFlatpak = false;
    if (false)
      process.env.PATH = `/usr/local/bin:${process.env.PATH}`;
    import_electron2.ipcMain.handle("RivercordGetRepo" /* GET_REPO */, serializeErrors(getRepo));
    import_electron2.ipcMain.handle("RivercordGetUpdates" /* GET_UPDATES */, serializeErrors(calculateGitChanges2));
    import_electron2.ipcMain.handle("RivercordUpdate" /* UPDATE */, serializeErrors(pull));
    import_electron2.ipcMain.handle("RivercordBuild" /* BUILD */, serializeErrors(build));
  }
});

// src/main/index.ts
init_react();
var import_electron14 = require("electron");
var import_path10 = require("path");

// src/main/ipcMain.ts
init_react();

// src/main/updater/index.ts
init_react();
if (true)
  false ? (init_http(), __toCommonJS(http_exports)) : (init_git(), __toCommonJS(git_exports));

// src/main/ipcPlugins.ts
init_react();
init_IpcEvents();
var import_electron10 = require("electron");

// import-natives:~pluginNatives
init_react();

// src/plugins/appleMusic.desktop/native.ts
var native_exports = {};
__export(native_exports, {
  fetchTrackData: () => fetchTrackData
});
init_react();
var import_child_process2 = require("child_process");
var import_util2 = require("util");
var exec = (0, import_util2.promisify)(import_child_process2.execFile);
async function applescript(cmds) {
  const { stdout } = await exec("osascript", cmds.map((c) => ["-e", c]).flat());
  return stdout;
}
function makeSearchUrl(type, query) {
  const url = new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");
  url.searchParams.set("types", type);
  url.searchParams.set("limit", "1");
  url.searchParams.set("term", query);
  return url;
}
var requestOptions = {
  headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0" }
};
var cachedRemoteData = null;
async function fetchRemoteData({ id, name, artist, album }) {
  if (id === cachedRemoteData?.id) {
    if ("data" in cachedRemoteData)
      return cachedRemoteData.data;
    if ("failures" in cachedRemoteData && cachedRemoteData.failures >= 5)
      return null;
  }
  try {
    const [songData, artistData] = await Promise.all([
      fetch(makeSearchUrl("songs", artist + " " + album + " " + name), requestOptions).then((r) => r.json()),
      fetch(makeSearchUrl("artists", artist.split(/ *[,&] */)[0]), requestOptions).then((r) => r.json())
    ]);
    const appleMusicLink = songData?.songs?.data[0]?.attributes.url;
    const songLink = songData?.songs?.data[0]?.id ? `https://song.link/i/${songData?.songs?.data[0]?.id}` : void 0;
    const albumArtwork = songData?.songs?.data[0]?.attributes.artwork.url.replace("{w}", "512").replace("{h}", "512");
    const artistArtwork = artistData?.artists?.data[0]?.attributes.artwork.url.replace("{w}", "512").replace("{h}", "512");
    cachedRemoteData = {
      id,
      data: { appleMusicLink, songLink, albumArtwork, artistArtwork }
    };
    return cachedRemoteData.data;
  } catch (e) {
    console.error("[AppleMusicRichPresence] Failed to fetch remote data:", e);
    cachedRemoteData = {
      id,
      failures: (id === cachedRemoteData?.id && "failures" in cachedRemoteData ? cachedRemoteData.failures : 0) + 1
    };
    return null;
  }
}
async function fetchTrackData() {
  try {
    await exec("pgrep", ["^Music$"]);
  } catch (error2) {
    return null;
  }
  const playerState = await applescript(['tell application "Music"', "get player state", "end tell"]).then((out) => out.trim());
  if (playerState !== "playing")
    return null;
  const playerPosition = await applescript(['tell application "Music"', "get player position", "end tell"]).then((text) => Number.parseFloat(text.trim()));
  const stdout = await applescript([
    'set output to ""',
    'tell application "Music"',
    "set t_id to database id of current track",
    "set t_name to name of current track",
    "set t_album to album of current track",
    "set t_artist to artist of current track",
    "set t_duration to duration of current track",
    'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',
    "end tell",
    "return output"
  ]);
  const [id, name, album, artist, durationStr] = stdout.split("\n").filter((k) => !!k);
  const duration = Number.parseFloat(durationStr);
  const remoteData = await fetchRemoteData({ id, name, artist, album });
  return { name, album, artist, playerPosition, duration, ...remoteData };
}

// src/plugins/consoleShortcuts/native.ts
var native_exports2 = {};
__export(native_exports2, {
  initDevtoolsOpenEagerLoad: () => initDevtoolsOpenEagerLoad
});
init_react();
function initDevtoolsOpenEagerLoad(e) {
  const handleDevtoolsOpened = () => e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");
  if (e.sender.isDevToolsOpened())
    handleDevtoolsOpened();
  else
    e.sender.once("devtools-opened", () => handleDevtoolsOpened());
}

// src/plugins/fixSpotifyEmbeds.desktop/native.ts
var native_exports3 = {};
init_react();

// src/main/settings.ts
init_react();
init_IpcEvents();

// src/shared/SettingsStore.ts
init_react();
var SettingsStore = class {
  pathListeners = /* @__PURE__ */ new Map();
  globalListeners = /* @__PURE__ */ new Set();
  constructor(plain, options = {}) {
    this.plain = plain;
    this.store = this.makeProxy(plain);
    Object.assign(this, options);
  }
  makeProxy(object, root = object, path5 = "") {
    const self = this;
    return new Proxy(object, {
      get(target, key) {
        let v = target[key];
        if (!(key in target) && self.getDefaultValue) {
          v = self.getDefaultValue({
            target,
            key,
            root,
            path: path5
          });
        }
        if (typeof v === "object" && v !== null && !Array.isArray(v))
          return self.makeProxy(v, root, `${path5}${path5 && "."}${key}`);
        return v;
      },
      set(target, key, value) {
        if (target[key] === value)
          return true;
        Reflect.set(target, key, value);
        const setPath = `${path5}${path5 && "."}${key}`;
        self.globalListeners.forEach((cb) => cb(value, setPath));
        self.pathListeners.get(setPath)?.forEach((cb) => cb(value));
        return true;
      }
    });
  }
  setData(value, pathToNotify) {
    if (this.readOnly)
      throw new Error("SettingsStore is read-only");
    this.plain = value;
    this.store = this.makeProxy(value);
    if (pathToNotify) {
      let v = value;
      const path5 = pathToNotify.split(".");
      for (const p2 of path5) {
        if (!v) {
          console.warn(
            `Settings#setData: Path ${pathToNotify} does not exist in new data. Not dispatching update`
          );
          return;
        }
        v = v[p2];
      }
      this.pathListeners.get(pathToNotify)?.forEach((cb) => cb(v));
    }
    this.markAsChanged();
  }
  addGlobalChangeListener(cb) {
    this.globalListeners.add(cb);
  }
  addChangeListener(path5, cb) {
    const listeners = this.pathListeners.get(path5) ?? /* @__PURE__ */ new Set();
    listeners.add(cb);
    this.pathListeners.set(path5, listeners);
  }
  removeGlobalChangeListener(cb) {
    this.globalListeners.delete(cb);
  }
  removeChangeListener(path5, cb) {
    const listeners = this.pathListeners.get(path5);
    if (!listeners)
      return;
    listeners.delete(cb);
    if (!listeners.size)
      this.pathListeners.delete(path5);
  }
  markAsChanged() {
    this.globalListeners.forEach((cb) => cb(this.plain, ""));
  }
};

// src/utils/mergeDefaults.ts
init_react();
function mergeDefaults(obj, defaults) {
  for (const key in defaults) {
    const v = defaults[key];
    if (typeof v === "object" && !Array.isArray(v)) {
      obj[key] ??= {};
      mergeDefaults(obj[key], v);
    } else {
      obj[key] ??= v;
    }
  }
  return obj;
}

// src/main/settings.ts
var import_electron4 = require("electron");
var import_fs = require("fs");

// src/main/utils/constants.ts
init_react();
var import_electron3 = require("electron");
var import_path3 = require("path");
var DATA_DIR = process.env.RIVERCORD_USER_DATA_DIR ?? (process.env.DISCORD_USER_DATA_DIR ? (0, import_path3.join)(process.env.DISCORD_USER_DATA_DIR, "..", "RivercordData") : (0, import_path3.join)(import_electron3.app.getPath("userData"), "..", "Rivercord"));
var SETTINGS_DIR = (0, import_path3.join)(DATA_DIR, "settings");
var THEMES_DIR = (0, import_path3.join)(DATA_DIR, "themes");
var QUICKCSS_PATH = (0, import_path3.join)(SETTINGS_DIR, "quickCss.css");
var SETTINGS_FILE = (0, import_path3.join)(SETTINGS_DIR, "settings.json");
var NATIVE_SETTINGS_FILE = (0, import_path3.join)(SETTINGS_DIR, "native-settings.json");
var ALLOWED_PROTOCOLS = [
  "https:",
  "http:",
  "steam:",
  "spotify:",
  "com.epicgames.launcher:",
  "tidal:"
];

// src/main/settings.ts
(0, import_fs.mkdirSync)(SETTINGS_DIR, { recursive: true });
function readSettings(name, file) {
  try {
    return JSON.parse((0, import_fs.readFileSync)(file, "utf-8"));
  } catch (err2) {
    if (err2?.code !== "ENOENT")
      console.error(`Failed to read ${name} settings`, err2);
    return {};
  }
}
var RendererSettings = new SettingsStore(readSettings("renderer", SETTINGS_FILE));
RendererSettings.addGlobalChangeListener(() => {
  try {
    (0, import_fs.writeFileSync)(SETTINGS_FILE, JSON.stringify(RendererSettings.plain, null, 4));
  } catch (e) {
    console.error("Failed to write renderer settings", e);
  }
});
import_electron4.ipcMain.handle("RivercordGetSettingsDir" /* GET_SETTINGS_DIR */, () => SETTINGS_DIR);
import_electron4.ipcMain.on("RivercordGetSettings" /* GET_SETTINGS */, (e) => e.returnValue = RendererSettings.plain);
import_electron4.ipcMain.handle("RivercordSetSettings" /* SET_SETTINGS */, (_, data, pathToNotify) => {
  RendererSettings.setData(data, pathToNotify);
});
var DefaultNativeSettings = {
  plugins: {}
};
var nativeSettings = readSettings("native", NATIVE_SETTINGS_FILE);
mergeDefaults(nativeSettings, DefaultNativeSettings);
var NativeSettings = new SettingsStore(nativeSettings);
NativeSettings.addGlobalChangeListener(() => {
  try {
    (0, import_fs.writeFileSync)(NATIVE_SETTINGS_FILE, JSON.stringify(NativeSettings.plain, null, 4));
  } catch (e) {
    console.error("Failed to write native settings", e);
  }
});

// src/plugins/fixSpotifyEmbeds.desktop/native.ts
var import_electron5 = require("electron");
import_electron5.app.on("browser-window-created", (_, win) => {
  win.webContents.on("frame-created", (_2, { frame }) => {
    frame.once("dom-ready", () => {
      if (frame.url.startsWith("https://open.spotify.com/embed/")) {
        const settings = RendererSettings.store.plugins?.FixSpotifyEmbeds;
        if (!settings?.enabled)
          return;
        frame.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${settings.volume / 100 || 0.1};
                        return original.apply(this, arguments);
                    }
                `);
      }
    });
  });
});

// src/plugins/fixYoutubeEmbeds.desktop/native.ts
var native_exports4 = {};
init_react();
var import_electron6 = require("electron");
import_electron6.app.on("browser-window-created", (_, win) => {
  win.webContents.on("frame-created", (_2, { frame }) => {
    frame.once("dom-ready", () => {
      if (frame.url.startsWith("https://www.youtube.com/")) {
        const settings = RendererSettings.store.plugins?.FixYoutubeEmbeds;
        if (!settings?.enabled)
          return;
        frame.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `);
      }
    });
  });
});

// src/plugins/mediaDownloader.desktop/native.ts
var native_exports5 = {};
__export(native_exports5, {
  checkffmpeg: () => checkffmpeg,
  checkytdlp: () => checkytdlp,
  execute: () => execute,
  getStdout: () => getStdout,
  interrupt: () => interrupt,
  isFfmpegAvailable: () => isFfmpegAvailable,
  isYtdlpAvailable: () => isYtdlpAvailable,
  start: () => start,
  stop: () => stop
});
init_react();
var import_child_process3 = require("child_process");
var fs = __toESM(require("fs"));
var import_os = __toESM(require("os"));
var import_path4 = __toESM(require("path"));
var workdir = null;
var stdout_global = "";
var logs_global = "";
var ytdlpAvailable = false;
var ffmpegAvailable = false;
var ytdlpProcess = null;
var ffmpegProcess = null;
var getdir = () => workdir ?? process.cwd();
var p = (file) => import_path4.default.join(getdir(), file);
var cleanVideoFiles = () => {
  if (!workdir)
    return;
  fs.readdirSync(workdir).filter((f) => f.startsWith("download.") || f.startsWith("remux.")).forEach((f) => fs.unlinkSync(p(f)));
};
var appendOut = (data) => (stdout_global += data, stdout_global = stdout_global.replace(/^.*\r([^\n])/gm, "$1"));
var log = (...data) => (console.log(`[Plugin:MediaDownloader] ${data.join(" ")}`), logs_global += `[Plugin:MediaDownloader] ${data.join(" ")}
`);
var error = (...data) => console.error(`[Plugin:MediaDownloader] [ERROR] ${data.join(" ")}`);
function ytdlp(args) {
  log(`Executing yt-dlp with args: ["${args.map((a) => a.replace('"', '\\"')).join('", "')}"]`);
  let errorMsg = "";
  return new Promise((resolve, reject) => {
    ytdlpProcess = (0, import_child_process3.spawn)("yt-dlp", args, {
      cwd: getdir()
    });
    ytdlpProcess.stdout.on("data", (data) => appendOut(data));
    ytdlpProcess.stderr.on("data", (data) => {
      appendOut(data);
      error(`yt-dlp encountered an error: ${data}`);
      errorMsg += data;
    });
    ytdlpProcess.on("exit", (code) => {
      ytdlpProcess = null;
      code === 0 ? resolve(stdout_global) : reject(new Error(errorMsg || `yt-dlp exited with code ${code}`));
    });
  });
}
function ffmpeg(args) {
  log(`Executing ffmpeg with args: ["${args.map((a) => a.replace('"', '\\"')).join('", "')}"]`);
  let errorMsg = "";
  return new Promise((resolve, reject) => {
    ffmpegProcess = (0, import_child_process3.spawn)("ffmpeg", args, {
      cwd: getdir()
    });
    ffmpegProcess.stdout.on("data", (data) => appendOut(data));
    ffmpegProcess.stderr.on("data", (data) => {
      appendOut(data);
      error(`ffmpeg encountered an error: ${data}`);
      errorMsg += data;
    });
    ffmpegProcess.on("exit", (code) => {
      ffmpegProcess = null;
      code === 0 ? resolve(stdout_global) : reject(new Error(errorMsg || `ffmpeg exited with code ${code}`));
    });
  });
}
async function start(_, _workdir) {
  _workdir ||= fs.mkdtempSync(import_path4.default.join(import_os.default.tmpdir(), "vencord_mediaDownloader_"));
  if (!fs.existsSync(_workdir))
    fs.mkdirSync(_workdir, { recursive: true });
  workdir = _workdir;
  log("Using workdir: ", workdir);
  return workdir;
}
async function stop(_) {
  if (workdir) {
    log("Cleaning up workdir");
    fs.rmSync(workdir, { recursive: true });
    workdir = null;
  }
}
async function metadata(options) {
  stdout_global = "";
  const metadata2 = JSON.parse(await ytdlp(["-J", options.url, "--no-warnings"]));
  if (metadata2.is_live)
    throw "Live streams are not supported.";
  stdout_global = "";
  return { videoTitle: `${metadata2.title || "video"} (${metadata2.id})` };
}
function genFormat({ videoTitle }, { maxFileSize, format }) {
  const HAS_LIMIT = !!maxFileSize;
  const MAX_VIDEO_SIZE = HAS_LIMIT ? maxFileSize * 0.8 : 0;
  const MAX_AUDIO_SIZE = HAS_LIMIT ? maxFileSize * 0.2 : 0;
  const audio = {
    noFfmpeg: "ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",
    ffmpeg: "ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"
  };
  const video = {
    noFfmpeg: "b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",
    ffmpeg: "b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"
  };
  const gif = {
    ffmpeg: "bv{TOT_SIZE}/wv{TOT_SIZE}"
  };
  let format_group;
  switch (format) {
    case "audio":
      format_group = audio;
      break;
    case "gif":
      format_group = gif;
      break;
    case "video":
    default:
      format_group = video;
      break;
  }
  const format_string = (ffmpegAvailable ? format_group.ffmpeg : format_group.noFfmpeg)?.replaceAll("{TOT_SIZE}", HAS_LIMIT ? `[filesize<${maxFileSize}]` : "").replaceAll("{VID_SIZE}", HAS_LIMIT ? `[filesize<${MAX_VIDEO_SIZE}]` : "").replaceAll("{AUD_SIZE}", HAS_LIMIT ? `[filesize<${MAX_AUDIO_SIZE}]` : "").replaceAll("{HEIGHT}", "[height<=1080]");
  if (!format_string)
    throw "Gif format is only supported with ffmpeg.";
  log("Video formated calculated as ", format_string);
  log(`Based on: format=${format}, maxFileSize=${maxFileSize}, ffmpegAvailable=${ffmpegAvailable}`);
  return { format: format_string, videoTitle };
}
async function download({ format, videoTitle }, { ytdlpArgs, url, format: usrFormat }) {
  cleanVideoFiles();
  const baseArgs = ["-f", format, "-o", "download.%(ext)s", "--force-overwrites", "-I", "1"];
  const remuxArgs = ffmpegAvailable ? usrFormat === "video" ? ["--remux-video", "webm>webm/mp4"] : usrFormat === "audio" ? ["--extract-audio", "--audio-format", "mp3"] : [] : [];
  const customArgs = ytdlpArgs?.filter(Boolean) || [];
  await ytdlp([url, ...baseArgs, ...remuxArgs, ...customArgs]);
  const file = fs.readdirSync(getdir()).find((f) => f.startsWith("download."));
  if (!file)
    throw "No video file was found!";
  return { file, videoTitle };
}
async function remux({ file, videoTitle }, { ffmpegArgs, format, maxFileSize, gifQuality }) {
  const sourceExtension = file.split(".").pop();
  if (!ffmpegAvailable)
    return log("Skipping remux, ffmpeg is unavailable."), { file, videoTitle, extension: sourceExtension };
  const acceptableFormats = ["mp3", "mp4", "webm"];
  const fileSize = fs.statSync(p(file)).size;
  const customArgs = ffmpegArgs?.filter(Boolean) || [];
  const isFormatAcceptable = acceptableFormats.includes(sourceExtension ?? "");
  const isFileSizeAcceptable = !maxFileSize || fileSize <= maxFileSize;
  const hasCustomArgs = customArgs.length > 0;
  const isGif = format === "gif";
  if (isFormatAcceptable && isFileSizeAcceptable && !hasCustomArgs && !isGif)
    return log("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."), { file, videoTitle, extension: sourceExtension };
  const duration = parseFloat((0, import_child_process3.execFileSync)("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", p(file)]).toString());
  if (isNaN(duration))
    throw "Failed to get video duration.";
  const targetBits = maxFileSize ? maxFileSize * 7 / duration : 9999999;
  const kilobits = ~~(targetBits / 1024);
  let baseArgs;
  let ext;
  switch (format) {
    case "audio":
      baseArgs = ["-i", p(file), "-b:a", `${kilobits}k`, "-maxrate", `${kilobits}k`, "-bufsize", "1M", "-y"];
      ext = "mp3";
      break;
    case "video":
    default:
      const height = kilobits <= 100 ? 480 : kilobits <= 500 ? 720 : 1080;
      baseArgs = ["-i", p(file), "-b:v", `${~~(kilobits * 0.8)}k`, "-b:a", `${~~(kilobits * 0.2)}k`, "-maxrate", `${kilobits}k`, "-bufsize", "1M", "-y", "-filter:v", `scale=-1:${height}`];
      ext = "mp4";
      break;
    case "gif":
      let fps, width, colors, bayer_scale;
      switch (gifQuality) {
        case 1:
          fps = 5, width = 360, colors = 24, bayer_scale = 5;
          break;
        case 2:
          fps = 10, width = 420, colors = 32, bayer_scale = 5;
          break;
        default:
        case 3:
          fps = 15, width = 480, colors = 64, bayer_scale = 4;
          break;
        case 4:
          fps = 20, width = 540, colors = 64, bayer_scale = 3;
          break;
        case 5:
          fps = 30, width = 720, colors = 128, bayer_scale = 1;
          break;
      }
      baseArgs = ["-i", p(file), "-vf", `fps=${fps},scale=w=${width}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${colors}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${bayer_scale}`, "-loop", "0", "-bufsize", "1M", "-y"];
      ext = "gif";
      break;
  }
  await ffmpeg([...baseArgs, ...customArgs, `remux.${ext}`]);
  return { file: `remux.${ext}`, videoTitle, extension: ext };
}
function upload({ file, videoTitle, extension }) {
  if (!extension)
    throw "Invalid extension.";
  const buffer = fs.readFileSync(p(file));
  return { buffer, title: `${videoTitle}.${extension}` };
}
async function execute(_, opt) {
  logs_global = "";
  try {
    const videoMetadata = await metadata(opt);
    const videoFormat = genFormat(videoMetadata, opt);
    const videoDownload = await download(videoFormat, opt);
    const videoRemux = await remux(videoDownload, opt);
    const videoUpload = upload(videoRemux);
    return { logs: logs_global, ...videoUpload };
  } catch (e) {
    return { error: e.toString(), logs: logs_global };
  }
}
function checkffmpeg(_) {
  try {
    (0, import_child_process3.execFileSync)("ffmpeg", ["-version"]);
    (0, import_child_process3.execFileSync)("ffprobe", ["-version"]);
    ffmpegAvailable = true;
    return true;
  } catch (e) {
    ffmpegAvailable = false;
    return false;
  }
}
async function checkytdlp(_) {
  try {
    (0, import_child_process3.execFileSync)("yt-dlp", ["--version"]);
    ytdlpAvailable = true;
    return true;
  } catch (e) {
    ytdlpAvailable = false;
    return false;
  }
}
async function interrupt(_) {
  log("Interrupting...");
  ytdlpProcess?.kill();
  ffmpegProcess?.kill();
  cleanVideoFiles();
}
var getStdout = () => stdout_global;
var isYtdlpAvailable = () => ytdlpAvailable;
var isFfmpegAvailable = () => ffmpegAvailable;

// src/plugins/messageLoggerEnhanced/native/index.ts
var native_exports6 = {};
__export(native_exports6, {
  chooseDir: () => chooseDir,
  deleteFileNative: () => deleteFileNative,
  getDefaultNativeDataDir: () => getDefaultNativeDataDir,
  getDefaultNativeImageDir: () => getDefaultNativeImageDir,
  getImageNative: () => getImageNative,
  getLogsFromFs: () => getLogsFromFs,
  getNativeSavedImages: () => getNativeSavedImages,
  getSettings: () => getSettings,
  init: () => init,
  initDirs: () => initDirs,
  messageLoggerEnhancedUniqueIdThingyIdkMan: () => messageLoggerEnhancedUniqueIdThingyIdkMan,
  showItemInFolder: () => showItemInFolder,
  writeImageNative: () => writeImageNative,
  writeLogs: () => writeLogs
});
init_react();
var import_promises4 = require("node:fs/promises");
var import_node_path = __toESM(require("node:path"));

// src/utils/Queue.ts
init_react();
var Queue = class {
  constructor(maxSize = Infinity) {
    this.maxSize = maxSize;
  }
  queue = [];
  promise;
  next() {
    const func = this.queue.shift();
    if (func)
      this.promise = Promise.resolve().then(func).finally(() => this.next());
    else
      this.promise = void 0;
  }
  run() {
    if (!this.promise)
      this.next();
  }
  push(func) {
    if (this.size >= this.maxSize)
      this.queue.shift();
    this.queue.push(func);
    this.run();
  }
  unshift(func) {
    if (this.size >= this.maxSize)
      this.queue.pop();
    this.queue.unshift(func);
    this.run();
  }
  get size() {
    return this.queue.length;
  }
};

// src/plugins/messageLoggerEnhanced/native/index.ts
var import_electron7 = require("electron");

// src/plugins/messageLoggerEnhanced/native/settings.ts
init_react();
var import_promises3 = __toESM(require("fs/promises"));
var import_path6 = __toESM(require("path"));

// src/plugins/messageLoggerEnhanced/native/utils.ts
init_react();
var import_promises2 = require("fs/promises");
var import_path5 = __toESM(require("path"));
async function exists(filename) {
  try {
    await (0, import_promises2.access)(filename);
    return true;
  } catch (error2) {
    return false;
  }
}
async function ensureDirectoryExists(cacheDir) {
  if (!await exists(cacheDir))
    await (0, import_promises2.mkdir)(cacheDir);
}
function getAttachmentIdFromFilename(filename) {
  return import_path5.default.parse(filename).name;
}

// src/plugins/messageLoggerEnhanced/native/settings.ts
async function getSettings() {
  try {
    const settings = await import_promises3.default.readFile(await getSettingsFilePath(), "utf8");
    return JSON.parse(settings);
  } catch (err2) {
    const settings = {
      logsDir: await getDefaultNativeDataDir(),
      imageCacheDir: await getDefaultNativeImageDir()
    };
    try {
      await saveSettings(settings);
    } catch (err3) {
    }
    return settings;
  }
}
async function saveSettings(settings) {
  if (!settings)
    return;
  await import_promises3.default.writeFile(await getSettingsFilePath(), JSON.stringify(settings, null, 4), "utf8");
}
async function getSettingsFilePath() {
  const MlDataDir = await getDefaultNativeDataDir();
  await ensureDirectoryExists(MlDataDir);
  const mlSettingsDir = import_path6.default.join(MlDataDir, "mlSettings.json");
  return mlSettingsDir;
}

// src/plugins/messageLoggerEnhanced/native/index.ts
function messageLoggerEnhancedUniqueIdThingyIdkMan() {
}
var nativeSavedImages = /* @__PURE__ */ new Map();
var getNativeSavedImages = () => nativeSavedImages;
var logsDir;
var imageCacheDir;
var getImageCacheDir = async () => imageCacheDir ?? await getDefaultNativeImageDir();
var getLogsDir = async () => logsDir ?? await getDefaultNativeDataDir();
async function initDirs() {
  const { logsDir: ld, imageCacheDir: icd } = await getSettings();
  logsDir = ld || await getDefaultNativeDataDir();
  imageCacheDir = icd || await getDefaultNativeImageDir();
}
initDirs();
async function init(_event) {
  const imageDir = await getImageCacheDir();
  await ensureDirectoryExists(imageDir);
  const files = await (0, import_promises4.readdir)(imageDir);
  for (const filename of files) {
    const attachmentId = getAttachmentIdFromFilename(filename);
    nativeSavedImages.set(attachmentId, import_node_path.default.join(imageDir, filename));
  }
}
async function getImageNative(_event, attachmentId) {
  const imagePath = nativeSavedImages.get(attachmentId);
  if (!imagePath)
    return null;
  return await (0, import_promises4.readFile)(imagePath);
}
async function writeImageNative(_event, filename, content) {
  if (!filename || !content)
    return;
  const imageDir = await getImageCacheDir();
  const attachmentId = getAttachmentIdFromFilename(filename);
  const existingImage = nativeSavedImages.get(attachmentId);
  if (existingImage)
    return;
  const imagePath = import_node_path.default.join(imageDir, filename);
  await ensureDirectoryExists(imageDir);
  await (0, import_promises4.writeFile)(imagePath, content);
  nativeSavedImages.set(attachmentId, imagePath);
}
async function deleteFileNative(_event, attachmentId) {
  const imagePath = nativeSavedImages.get(attachmentId);
  if (!imagePath)
    return;
  await (0, import_promises4.unlink)(imagePath);
}
var LOGS_DATA_FILENAME = "message-logger-logs.json";
var dataWriteQueue = new Queue();
async function getLogsFromFs(_event) {
  const logsDir2 = await getLogsDir();
  await ensureDirectoryExists(logsDir2);
  try {
    return JSON.parse(await (0, import_promises4.readFile)(import_node_path.default.join(logsDir2, LOGS_DATA_FILENAME), "utf-8"));
  } catch {
  }
  return null;
}
async function writeLogs(_event, contents) {
  const logsDir2 = await getLogsDir();
  dataWriteQueue.push(() => (0, import_promises4.writeFile)(import_node_path.default.join(logsDir2, LOGS_DATA_FILENAME), contents));
}
async function getDefaultNativeImageDir() {
  return import_node_path.default.join(await getDefaultNativeDataDir(), "savedImages");
}
async function getDefaultNativeDataDir() {
  return import_node_path.default.join(DATA_DIR, "MessageLoggerData");
}
async function chooseDir(event, logKey) {
  const settings = await getSettings();
  const defaultPath = settings[logKey] || await getDefaultNativeDataDir();
  const res = await import_electron7.dialog.showOpenDialog({ properties: ["openDirectory"], defaultPath });
  const dir = res.filePaths[0];
  if (!dir)
    throw Error("Invalid Directory");
  settings[logKey] = dir;
  await saveSettings(settings);
  switch (logKey) {
    case "logsDir":
      logsDir = dir;
      break;
    case "imageCacheDir":
      imageCacheDir = dir;
      break;
  }
  if (logKey === "imageCacheDir")
    await init(event);
  return dir;
}
async function showItemInFolder(_event, filePath) {
  import_electron7.shell.showItemInFolder(filePath);
}

// src/plugins/openInApp/native.ts
var native_exports7 = {};
__export(native_exports7, {
  resolveRedirect: () => resolveRedirect
});
init_react();
var import_https2 = require("https");
var validRedirectUrls = /^https:\/\/(spotify\.link|s\.team)\/.+$/;
function getRedirect(url) {
  return new Promise((resolve, reject) => {
    const req = (0, import_https2.request)(new URL(url), { method: "HEAD" }, (res) => {
      resolve(
        res.headers.location ? getRedirect(res.headers.location) : url
      );
    });
    req.on("error", reject);
    req.end();
  });
}
async function resolveRedirect(_, url) {
  if (!validRedirectUrls.test(url))
    return url;
  return getRedirect(url);
}

// src/plugins/voiceMessages/native.ts
var native_exports8 = {};
__export(native_exports8, {
  readRecording: () => readRecording
});
init_react();
var import_electron8 = require("electron");
var import_promises5 = require("fs/promises");
var import_path7 = require("path");
async function readRecording(_, filePath) {
  filePath = (0, import_path7.normalize)(filePath);
  const filename = (0, import_path7.basename)(filePath);
  const discordBaseDirWithTrailingSlash = (0, import_path7.normalize)(import_electron8.app.getPath("userData") + "/");
  console.log(filename, discordBaseDirWithTrailingSlash, filePath);
  if (filename !== "recording.ogg" || !filePath.startsWith(discordBaseDirWithTrailingSlash))
    return null;
  try {
    const buf = await (0, import_promises5.readFile)(filePath);
    return new Uint8Array(buf.buffer);
  } catch {
    return null;
  }
}

// src/plugins/watchTogetherAdblock.desktop/native.ts
var native_exports9 = {};
init_react();
var import_electron9 = require("electron");

// file-uri:file://adguard.js?minify
init_react();
var adguard_default = `/* eslint-disable */

/**
 * This file is part of AdGuard's Block YouTube Ads (https://github.com/AdguardTeam/BlockYouTubeAdsShortcut).
 *
 * Copyright (C) AdGuard Team
 *
 * AdGuard's Block YouTube Ads is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard's Block YouTube Ads is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard's Block YouTube Ads.  If not, see <http://www.gnu.org/licenses/>.
 */

const LOGO_ID = "block-youtube-ads-logo";
const hiddenCSS = [
    "#__ffYoutube1",
    "#__ffYoutube2",
    "#__ffYoutube3",
    "#__ffYoutube4",
    "#feed-pyv-container",
    "#feedmodule-PRO",
    "#homepage-chrome-side-promo",
    "#merch-shelf",
    "#offer-module",
    '#pla-shelf > ytd-pla-shelf-renderer[class="style-scope ytd-watch"]',
    "#pla-shelf",
    "#premium-yva",
    "#promo-info",
    "#promo-list",
    "#promotion-shelf",
    "#related > ytd-watch-next-secondary-results-renderer > #items > ytd-compact-promoted-video-renderer.ytd-watch-next-secondary-results-renderer",
    "#search-pva",
    "#shelf-pyv-container",
    "#video-masthead",
    "#watch-branded-actions",
    "#watch-buy-urls",
    "#watch-channel-brand-div",
    "#watch7-branded-banner",
    "#YtKevlarVisibilityIdentifier",
    "#YtSparklesVisibilityIdentifier",
    ".carousel-offer-url-container",
    ".companion-ad-container",
    ".GoogleActiveViewElement",
    '.list-view[style="margin: 7px 0pt;"]',
    ".promoted-sparkles-text-search-root-container",
    ".promoted-videos",
    ".searchView.list-view",
    ".sparkles-light-cta",
    ".watch-extra-info-column",
    ".watch-extra-info-right",
    ".ytd-carousel-ad-renderer",
    ".ytd-compact-promoted-video-renderer",
    ".ytd-companion-slot-renderer",
    ".ytd-merch-shelf-renderer",
    ".ytd-player-legacy-desktop-watch-ads-renderer",
    ".ytd-promoted-sparkles-text-search-renderer",
    ".ytd-promoted-video-renderer",
    ".ytd-search-pyv-renderer",
    ".ytd-video-masthead-ad-v3-renderer",
    ".ytp-ad-action-interstitial-background-container",
    ".ytp-ad-action-interstitial-slot",
    ".ytp-ad-image-overlay",
    ".ytp-ad-overlay-container",
    ".ytp-ad-progress",
    ".ytp-ad-progress-list",
    '[class*="ytd-display-ad-"]',
    '[layout*="display-ad-"]',
    'a[href^="http://www.youtube.com/cthru?"]',
    'a[href^="https://www.youtube.com/cthru?"]',
    "ytd-action-companion-ad-renderer",
    "ytd-banner-promo-renderer",
    "ytd-compact-promoted-video-renderer",
    "ytd-companion-slot-renderer",
    "ytd-display-ad-renderer",
    "ytd-promoted-sparkles-text-search-renderer",
    "ytd-promoted-sparkles-web-renderer",
    "ytd-search-pyv-renderer",
    "ytd-single-option-survey-renderer",
    "ytd-video-masthead-ad-advertiser-info-renderer",
    "ytd-video-masthead-ad-v3-renderer",
    "YTM-PROMOTED-VIDEO-RENDERER",
];
/**
* Adds CSS to the page
*/
const hideElements = () => {
    const selectors = hiddenCSS;
    if (!selectors) {
        return;
    }
    const rule = selectors.join(", ") + " { display: none!important; }";
    const style = document.createElement("style");
    style.innerHTML = rule;
    document.head.appendChild(style);
};
/**
* Calls the "callback" function on every DOM change, but not for the tracked events
* @param {Function} callback callback function
*/
const observeDomChanges = callback => {
    const domMutationObserver = new MutationObserver(mutations => {
        callback(mutations);
    });
    domMutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
};
/**
* This function is supposed to be called on every DOM change
*/
const hideDynamicAds = () => {
    const elements = document.querySelectorAll("#contents > ytd-rich-item-renderer ytd-display-ad-renderer");
    if (elements.length === 0) {
        return;
    }
    elements.forEach(el => {
        if (el.parentNode && el.parentNode.parentNode) {
            const parent = el.parentNode.parentNode;
            if (parent.localName === "ytd-rich-item-renderer") {
                parent.style.display = "none";
            }
        }
    });
};
/**
* This function checks if the video ads are currently running
* and auto-clicks the skip button.
*/
const autoSkipAds = () => {
    // If there's a video that plays the ad at this moment, scroll this ad
    if (document.querySelector(".ad-showing")) {
        const video = document.querySelector("video");
        if (video && video.duration) {
            video.currentTime = video.duration;
            // Skip button should appear after that,
            // now simply click it automatically
            setTimeout(() => {
                const skipBtn = document.querySelector("button.ytp-ad-skip-button");
                if (skipBtn) {
                    skipBtn.click();
                }
            }, 100);
        }
    }
};
/**
* This function overrides a property on the specified object.
*
* @param {object} obj object to look for properties in
* @param {string} propertyName property to override
* @param {*} overrideValue value to set
*/
const overrideObject = (obj, propertyName, overrideValue) => {
    if (!obj) {
        return false;
    }
    let overriden = false;
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && key === propertyName) {
            obj[key] = overrideValue;
            overriden = true;
            // eslint-disable-next-line no-prototype-builtins
        } else if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
            if (overrideObject(obj[key], propertyName, overrideValue)) {
                overriden = true;
            }
        }
    }
    return overriden;
};
/**
* Overrides JSON.parse and Response.json functions.
* Examines these functions arguments, looks for properties with the specified name there
* and if it exists, changes it's value to what was specified.
*
* @param {string} propertyName name of the property
* @param {*} overrideValue new value for the property
*/
const jsonOverride = (propertyName, overrideValue) => {
    const nativeJSONParse = JSON.parse;
    JSON.parse = (...args) => {
        const obj = nativeJSONParse.apply(this, args);
        // Override it's props and return back to the caller
        overrideObject(obj, propertyName, overrideValue);
        return obj;
    };
    // Override Response.prototype.json
    const nativeResponseJson = Response.prototype.json;
    Response.prototype.json = new Proxy(nativeResponseJson, {
        apply(...args) {
            // Call the target function, get the original Promise
            const promise = Reflect.apply(...args);
            // Create a new one and override the JSON inside
            return new Promise((resolve, reject) => {
                promise.then(data => {
                    overrideObject(data, propertyName, overrideValue);
                    resolve(data);
                }).catch(error => reject(error));
            });
        },
    });
};
const addAdGuardLogoStyle = () => { };
const addAdGuardLogo = () => {
    if (document.getElementById(LOGO_ID)) {
        return;
    }
    const logo = document.createElement("span");
    logo.innerHTML = "__logo_text__";
    logo.setAttribute("id", LOGO_ID);
    if (window.location.hostname === "m.youtube.com") {
        const btn = document.querySelector("header.mobile-topbar-header > button");
        if (btn) {
            btn.parentNode?.insertBefore(logo, btn.nextSibling);
            addAdGuardLogoStyle();
        }
    } else if (window.location.hostname === "www.youtube.com") {
        const code = document.getElementById("country-code");
        if (code) {
            code.innerHTML = "";
            code.appendChild(logo);
            addAdGuardLogoStyle();
        }
    } else if (window.location.hostname === "music.youtube.com") {
        const el = document.querySelector(".ytmusic-nav-bar#left-content");
        if (el) {
            el.appendChild(logo);
            addAdGuardLogoStyle();
        }
    } else if (window.location.hostname === "www.youtube-nocookie.com") {
        const code = document.querySelector("#yt-masthead #logo-container .content-region");
        if (code) {
            code.innerHTML = "";
            code.appendChild(logo);
            addAdGuardLogoStyle();
        }
    }
};
// Removes ads metadata from YouTube XHR requests
jsonOverride("adPlacements", []);
jsonOverride("playerAds", []);
// Applies CSS that hides YouTube ad elements
hideElements();
// Some changes should be re-evaluated on every page change
addAdGuardLogo();
hideDynamicAds();
autoSkipAds();
observeDomChanges(() => {
    addAdGuardLogo();
    hideDynamicAds();
    autoSkipAds();
});`;

// src/plugins/watchTogetherAdblock.desktop/native.ts
import_electron9.app.on("browser-window-created", (_, win) => {
  win.webContents.on("frame-created", (_2, { frame }) => {
    frame.once("dom-ready", () => {
      if (frame.url.includes("discordsays") && frame.url.includes("youtube.com")) {
        if (!RendererSettings.store.plugins?.WatchTogetherAdblock?.enabled)
          return;
        frame.executeJavaScript(adguard_default);
      }
    });
  });
});

// src/plugins/xsOverlay.desktop/native.ts
var native_exports10 = {};
__export(native_exports10, {
  sendToOverlay: () => sendToOverlay
});
init_react();
var import_dgram = require("dgram");
var xsoSocket;
function sendToOverlay(_, data) {
  data.icon = Buffer.from(data.icon).toString("base64");
  const json = JSON.stringify(data);
  xsoSocket ??= (0, import_dgram.createSocket)("udp4");
  xsoSocket.send(json, 42069, "127.0.0.1");
}

// import-natives:~pluginNatives
var pluginNatives_default = {
  "AppleMusicRichPresence": native_exports,
  "ConsoleShortcuts": native_exports2,
  "FixSpotifyEmbeds": native_exports3,
  "FixYoutubeEmbeds": native_exports4,
  "MediaDownloader": native_exports5,
  "MessageLoggerEnhanced": native_exports6,
  "OpenInApp": native_exports7,
  "VoiceMessages": native_exports8,
  "WatchTogetherAdblock": native_exports9,
  "XSOverlay": native_exports10
};

// src/main/ipcPlugins.ts
var PluginIpcMappings = {};
for (const [plugin, methods] of Object.entries(pluginNatives_default)) {
  const entries = Object.entries(methods);
  if (!entries.length)
    continue;
  const mappings = PluginIpcMappings[plugin] = {};
  for (const [methodName, method] of entries) {
    const key = `RivercordPluginNative_${plugin}_${methodName}`;
    import_electron10.ipcMain.handle(key, method);
    mappings[methodName] = key;
  }
}
import_electron10.ipcMain.on("RivercordGetPluginIpcMethodMap" /* GET_PLUGIN_IPC_METHOD_MAP */, (e) => {
  e.returnValue = PluginIpcMappings;
});

// src/shared/debounce.ts
init_react();

// src/main/ipcMain.ts
init_IpcEvents();
var import_electron12 = require("electron");

// file-uri:file://monacoWin.html?minify&base64
init_react();
var monacoWin_default = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo=";

// src/main/ipcMain.ts
var import_fs2 = require("fs");
var import_promises6 = require("fs/promises");
var import_path8 = require("path");

// src/main/themes/index.ts
init_react();
var splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
var escapedAtRegex = /^\\@/;
function makeHeader(fileName, opts = {}) {
  return {
    fileName,
    name: opts.name ?? fileName.replace(/\.css$/i, ""),
    author: opts.author ?? "Unknown Author",
    description: opts.description ?? "A Discord Theme.",
    version: opts.version,
    license: opts.license,
    source: opts.source,
    website: opts.website,
    invite: opts.invite
  };
}
function stripBOM(fileContent) {
  if (fileContent.charCodeAt(0) === 65279) {
    fileContent = fileContent.slice(1);
  }
  return fileContent;
}
function getThemeInfo(css, fileName) {
  if (!css)
    return makeHeader(fileName);
  const block = css.split("/**", 2)?.[1]?.split("*/", 1)?.[0];
  if (!block)
    return makeHeader(fileName);
  const header = {};
  let field = "";
  let accum = "";
  for (const line of block.split(splitRegex)) {
    if (line.length === 0)
      continue;
    if (line.charAt(0) === "@" && line.charAt(1) !== " ") {
      header[field] = accum.trim();
      const l = line.indexOf(" ");
      field = line.substring(1, l);
      accum = line.substring(l + 1);
    } else {
      accum += " " + line.replace("\\n", "\n").replace(escapedAtRegex, "@");
    }
  }
  header[field] = accum.trim();
  delete header[""];
  return makeHeader(fileName, header);
}

// src/main/utils/externalLinks.ts
init_react();
var import_electron11 = require("electron");
function makeLinksOpenExternally(win) {
  win.webContents.setWindowOpenHandler(({ url }) => {
    switch (url) {
      case "about:blank":
      case "https://discord.com/popout":
      case "https://ptb.discord.com/popout":
      case "https://canary.discord.com/popout":
        return { action: "allow" };
    }
    try {
      var { protocol: protocol2 } = new URL(url);
    } catch {
      return { action: "deny" };
    }
    switch (protocol2) {
      case "http:":
      case "https:":
      case "mailto:":
      case "steam:":
      case "spotify:":
        import_electron11.shell.openExternal(url);
    }
    return { action: "deny" };
  });
}

// src/main/ipcMain.ts
(0, import_fs2.mkdirSync)(THEMES_DIR, { recursive: true });
function ensureSafePath(basePath, path5) {
  const normalizedBasePath = (0, import_path8.normalize)(basePath);
  const newPath = (0, import_path8.join)(basePath, path5);
  const normalizedPath = (0, import_path8.normalize)(newPath);
  return normalizedPath.startsWith(normalizedBasePath) ? normalizedPath : null;
}
function readCss() {
  return (0, import_promises6.readFile)(QUICKCSS_PATH, "utf-8").catch(() => "");
}
async function listThemes() {
  const files = await (0, import_promises6.readdir)(THEMES_DIR).catch(() => []);
  const themeInfo = [];
  for (const fileName of files) {
    if (!fileName.endsWith(".css"))
      continue;
    const data = await getThemeData(fileName).then(stripBOM).catch(() => null);
    if (data == null)
      continue;
    themeInfo.push(getThemeInfo(data, fileName));
  }
  return themeInfo;
}
function getThemeData(fileName) {
  fileName = fileName.replace(/\?v=\d+$/, "");
  const safePath = ensureSafePath(THEMES_DIR, fileName);
  if (!safePath)
    return Promise.reject(`Unsafe path ${fileName}`);
  return (0, import_promises6.readFile)(safePath, "utf-8");
}
import_electron12.ipcMain.handle("RivercordOpenQuickCss" /* OPEN_QUICKCSS */, () => import_electron12.shell.openPath(QUICKCSS_PATH));
import_electron12.ipcMain.handle("RivercordOpenExternal" /* OPEN_EXTERNAL */, (_, url) => {
  try {
    var { protocol: protocol2 } = new URL(url);
  } catch {
    throw "Malformed URL";
  }
  if (!ALLOWED_PROTOCOLS.includes(protocol2))
    throw "Disallowed protocol.";
  import_electron12.shell.openExternal(url);
});
import_electron12.ipcMain.handle("RivercordGetQuickCss" /* GET_QUICK_CSS */, () => readCss());
import_electron12.ipcMain.handle(
  "RivercordSetQuickCss" /* SET_QUICK_CSS */,
  (_, css) => (0, import_fs2.writeFileSync)(QUICKCSS_PATH, css)
);
import_electron12.ipcMain.handle("RivercordGetThemesDir" /* GET_THEMES_DIR */, () => THEMES_DIR);
import_electron12.ipcMain.handle("RivercordGetThemesList" /* GET_THEMES_LIST */, () => listThemes());
import_electron12.ipcMain.handle("RivercordGetThemeData" /* GET_THEME_DATA */, (_, fileName) => getThemeData(fileName));
import_electron12.ipcMain.handle("RivercordGetThemeSystemValues" /* GET_THEME_SYSTEM_VALUES */, () => ({
  "os-accent-color": `#${import_electron12.systemPreferences.getAccentColor?.() || ""}`
}));
import_electron12.ipcMain.handle("RivercordOpenMonacoEditor" /* OPEN_MONACO_EDITOR */, async () => {
  const title = "Rivercord QuickCSS Editor";
  const existingWindow = import_electron12.BrowserWindow.getAllWindows().find((w) => w.title === title);
  if (existingWindow && !existingWindow.isDestroyed()) {
    existingWindow.focus();
    return;
  }
  const win = new import_electron12.BrowserWindow({
    title,
    autoHideMenuBar: true,
    darkTheme: true,
    webPreferences: {
      preload: (0, import_path8.join)(__dirname, false ? "preload.js" : "rivercordDesktopPreload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  makeLinksOpenExternally(win);
  await win.loadURL(`data:text/html;base64,${monacoWin_default}`);
});

// src/main/utils/extensions.ts
init_react();
var import_electron13 = require("electron");

// node_modules/.pnpm/fflate@0.7.4/node_modules/fflate/esm/index.mjs
init_react();
var import_module = require("module");
var require2 = (0, import_module.createRequire)("/");
var Worker;
var workerAdd = ";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";
try {
  Worker = require2("worker_threads").Worker;
} catch (e) {
}
var wk = Worker ? function(c, _, msg, transfer, cb) {
  var done = false;
  var w = new Worker(c + workerAdd, { eval: true }).on("error", function(e) {
    return cb(e, null);
  }).on("message", function(m) {
    return cb(null, m);
  }).on("exit", function(c2) {
    if (c2 && !done)
      cb(new Error("exited with code " + c2), null);
  });
  w.postMessage(msg, transfer);
  w.terminate = function() {
    done = true;
    return Worker.prototype.terminate.call(w);
  };
  return w;
} : function(_, __, ___, ____, cb) {
  setImmediate(function() {
    return cb(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"), null);
  });
  var NOP = function() {
  };
  return {
    terminate: NOP,
    postMessage: NOP
  };
};
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start2) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start2 += 1 << eb[i - 1];
  }
  var r = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p2, m) {
  var o = p2 / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p2 & 7) & m;
};
var bits16 = function(d, p2) {
  var o = p2 / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p2 & 7);
};
var shft = function(p2) {
  return (p2 + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, buf, st) {
  var sl = dat.length;
  if (!sl || st && st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf || st;
  var noSt = !st || st.i;
  if (!st)
    st = {};
  if (!buf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >>> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (noBuf)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + 131072);
        var end = bt + add;
        for (; bt < end; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end;
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wcln = function(fn, fnStr, td2) {
  var dt = fn();
  var st = fn.toString();
  var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
  for (var i = 0; i < dt.length; ++i) {
    var v = dt[i], k = ks[i];
    if (typeof v == "function") {
      fnStr += ";" + k + "=";
      var st_1 = v.toString();
      if (v.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t in v.prototype)
            fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
        }
      } else
        fnStr += st_1;
    } else
      td2[k] = v;
  }
  return [fnStr, td2];
};
var ch = [];
var cbfs = function(v) {
  var tl = [];
  for (var k in v) {
    if (v[k].buffer) {
      tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
  }
  return tl;
};
var wrkr = function(fns, init2, id, cb) {
  var _a2;
  if (!ch[id]) {
    var fnStr = "", td_1 = {}, m = fns.length - 1;
    for (var i = 0; i < m; ++i)
      _a2 = wcln(fns[i], fnStr, td_1), fnStr = _a2[0], td_1 = _a2[1];
    ch[id] = wcln(fns[m], fnStr, td_1);
  }
  var td2 = mrg({}, ch[id][1]);
  return wk(ch[id][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init2.toString() + "}", id, td2, cbfs(td2), cb);
};
var bInflt = function() {
  return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var gu8 = function(o) {
  return o && o.size && new u8(o.size);
};
var cbify = function(dat, opts, fns, init2, id, cb) {
  var w = wrkr(fns, init2, id, function(err2, dat2) {
    w.terminate();
    cb(err2, dat2);
  });
  w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
  return function() {
    w.terminate();
  };
};
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
function inflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bInflt
  ], function(ev) {
    return pbf(inflateSync(ev.data[0], gu8(ev.data[1])));
  }, 1, cb);
}
function inflateSync(data, out) {
  return inflt(data, out);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return [r, slc(d, i - 1)];
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td)
    return td.decode(dat);
  else {
    var _a2 = dutf8(dat), out = _a2[0], ext = _a2[1];
    if (ext.length)
      err(8);
    return out;
  }
}
var slzh = function(d, b) {
  return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
var zh = function(d, b, z) {
  var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
  var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
  return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
  fn();
};
function unzip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var files = {};
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558) {
      cbd(err(13, 0, 1), null);
      return tAll;
    }
  }
  ;
  var lft = b2(data, e + 8);
  if (lft) {
    var c = lft;
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = lft = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    var _loop_3 = function(i2) {
      var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      var cbl = function(e2, d) {
        if (e2) {
          tAll();
          cbd(e2, null);
        } else {
          if (d)
            files[fn] = d;
          if (!--lft)
            cbd(null, files);
        }
      };
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_1
      })) {
        if (!c_1)
          cbl(null, slc(data, b, b + sc));
        else if (c_1 == 8) {
          var infl = data.subarray(b, b + sc);
          if (sc < 32e4) {
            try {
              cbl(null, inflateSync(infl, new u8(su)));
            } catch (e2) {
              cbl(e2, null);
            }
          } else
            term.push(inflate(infl, { size: su }, cbl));
        } else
          cbl(err(14, "unknown compression type " + c_1, 1), null);
      } else
        cbl(null, null);
    };
    for (var i = 0; i < c; ++i) {
      _loop_3(i);
    }
  } else
    cbd(null, {});
  return tAll;
}

// src/main/utils/extensions.ts
var import_fs3 = require("fs");
var import_promises7 = require("fs/promises");
var import_path9 = require("path");

// src/main/utils/crxToZip.ts
init_react();
function crxToZip(buf) {
  function calcLength(a, b, c, d) {
    let length = 0;
    length += a << 0;
    length += b << 8;
    length += c << 16;
    length += d << 24 >>> 0;
    return length;
  }
  if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4) {
    return buf;
  }
  if (buf[0] !== 67 || buf[1] !== 114 || buf[2] !== 50 || buf[3] !== 52) {
    throw new Error("Invalid header: Does not start with Cr24");
  }
  const isV3 = buf[4] === 3;
  const isV2 = buf[4] === 2;
  if (!isV2 && !isV3 || buf[5] || buf[6] || buf[7]) {
    throw new Error("Unexpected crx format version number.");
  }
  if (isV2) {
    const publicKeyLength = calcLength(buf[8], buf[9], buf[10], buf[11]);
    const signatureLength = calcLength(buf[12], buf[13], buf[14], buf[15]);
    const zipStartOffset2 = 16 + publicKeyLength + signatureLength;
    return buf.subarray(zipStartOffset2, buf.length);
  }
  const headerSize = calcLength(buf[8], buf[9], buf[10], buf[11]);
  const zipStartOffset = 12 + headerSize;
  return buf.subarray(zipStartOffset, buf.length);
}

// src/main/utils/extensions.ts
init_simpleGet();
var extensionCacheDir = (0, import_path9.join)(DATA_DIR, "ExtensionCache");
async function extract(data, outDir) {
  await (0, import_promises7.mkdir)(outDir, { recursive: true });
  return new Promise((resolve, reject) => {
    unzip(data, (err2, files) => {
      if (err2)
        return void reject(err2);
      Promise.all(Object.keys(files).map(async (f) => {
        if (f.startsWith("_metadata/"))
          return;
        if (f.endsWith("/"))
          return void (0, import_promises7.mkdir)((0, import_path9.join)(outDir, f), { recursive: true });
        const pathElements = f.split("/");
        const name = pathElements.pop();
        const directories = pathElements.join("/");
        const dir = (0, import_path9.join)(outDir, directories);
        if (directories) {
          await (0, import_promises7.mkdir)(dir, { recursive: true });
        }
        await (0, import_promises7.writeFile)((0, import_path9.join)(dir, name), files[f]);
      })).then(() => resolve()).catch((err3) => {
        (0, import_promises7.rm)(outDir, { recursive: true, force: true });
        reject(err3);
      });
    });
  });
}
async function installExt(id) {
  const extDir = (0, import_path9.join)(extensionCacheDir, `${id}`);
  try {
    await (0, import_promises7.access)(extDir, import_fs3.constants.F_OK);
  } catch (err2) {
    const url = id === "fmkadmapgofadopljbjfkapdkoienihi" ? "https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip" : `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${id}%26uc&prodversion=32`;
    const buf = await get(url, {
      headers: {
        "User-Agent": "Rivercord (https://github.com/Rivercord/Rivercord)"
      }
    });
    await extract(crxToZip(buf), extDir).catch(console.error);
  }
  import_electron13.session.defaultSession.loadExtension(extDir);
}

// src/main/index.ts
if (true) {
  import_electron14.app.whenReady().then(() => {
    import_electron14.protocol.registerFileProtocol("rivercord", ({ url: unsafeUrl }, cb) => {
      let url = unsafeUrl.slice("rivercord://".length);
      if (url.endsWith("/"))
        url = url.slice(0, -1);
      if (url.startsWith("/themes/")) {
        const theme = url.slice("/themes/".length);
        const safeUrl = ensureSafePath(THEMES_DIR, theme);
        if (!safeUrl) {
          cb({ statusCode: 403 });
          return;
        }
        cb(safeUrl.replace(/\?v=\d+$/, ""));
        return;
      }
      switch (url) {
        case "renderer.js.map":
        case "rivercordDesktopRenderer.js.map":
        case "preload.js.map":
        case "rivercordDesktopPreload.js.map":
        case "patcher.js.map":
        case "rivercordDesktopMain.js.map":
          cb((0, import_path10.join)(__dirname, url));
          break;
        default:
          cb({ statusCode: 403 });
      }
    });
    try {
      if (RendererSettings.store.enableReactDevtools)
        installExt("fmkadmapgofadopljbjfkapdkoienihi").then(() => console.info("[Rivercord] Installed React Developer Tools")).catch((err2) => console.error("[Rivercord] Failed to install React Developer Tools", err2));
    } catch {
    }
    const findHeader = (headers, headerName) => {
      return Object.keys(headers).find((h) => h.toLowerCase() === headerName);
    };
    const parsePolicy = (policy) => {
      const result = {};
      policy.split(";").forEach((directive) => {
        const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
        if (directiveKey && !Object.prototype.hasOwnProperty.call(result, directiveKey)) {
          result[directiveKey] = directiveValue;
        }
      });
      return result;
    };
    const stringifyPolicy = (policy) => Object.entries(policy).filter(([, values]) => values?.length).map((directive) => directive.flat().join(" ")).join("; ");
    const patchCsp = (headers) => {
      const header = findHeader(headers, "content-security-policy");
      if (header) {
        const csp = parsePolicy(headers[header][0]);
        for (const directive of ["style-src", "connect-src", "img-src", "font-src", "media-src", "worker-src"]) {
          csp[directive] ??= [];
          csp[directive].push("*", "blob:", "data:", "rivercord:", "'unsafe-inline'");
        }
        csp["script-src"] ??= [];
        csp["script-src"].push("'unsafe-eval'", "https://unpkg.com", "https://cdnjs.cloudflare.com");
        headers[header] = [stringifyPolicy(csp)];
      }
    };
    import_electron14.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders, resourceType }, cb) => {
      if (responseHeaders) {
        if (resourceType === "mainFrame")
          patchCsp(responseHeaders);
        if (resourceType === "stylesheet") {
          const header = findHeader(responseHeaders, "content-type");
          if (header)
            responseHeaders[header] = ["text/css"];
        }
      }
      cb({ cancel: false, responseHeaders });
    });
    import_electron14.session.defaultSession.webRequest.onHeadersReceived = () => {
    };
  });
}
if (false) {
}
//# sourceURL=RivercordDesktopMain

/*! For license information please see rivercordDesktopMain.js.LEGAL.txt */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc2NyaXB0cy9idWlsZC9pbmplY3QvcmVhY3QubWpzIiwgIi4uL3NyYy9zaGFyZWQvSXBjRXZlbnRzLnRzIiwgImdpdC1oYXNoOn5naXQtaGFzaCIsICJnaXQtcmVtb3RlOn5naXQtcmVtb3RlIiwgIi4uL3NyYy9zaGFyZWQvcml2ZXJjb3JkVXNlckFnZW50LnRzIiwgIi4uL3NyYy9tYWluL3V0aWxzL3NpbXBsZUdldC50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2NvbW1vbi50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2h0dHAudHMiLCAiLi4vc3JjL21haW4vdXBkYXRlci9naXQudHMiLCAiLi4vc3JjL21haW4vaW5kZXgudHMiLCAiLi4vc3JjL21haW4vaXBjTWFpbi50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2luZGV4LnRzIiwgIi4uL3NyYy9tYWluL2lwY1BsdWdpbnMudHMiLCAiaW1wb3J0LW5hdGl2ZXM6fnBsdWdpbk5hdGl2ZXMiLCAiLi4vc3JjL3BsdWdpbnMvYXBwbGVNdXNpYy5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9jb25zb2xlU2hvcnRjdXRzL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9maXhTcG90aWZ5RW1iZWRzLmRlc2t0b3AvbmF0aXZlLnRzIiwgIi4uL3NyYy9tYWluL3NldHRpbmdzLnRzIiwgIi4uL3NyYy9zaGFyZWQvU2V0dGluZ3NTdG9yZS50cyIsICIuLi9zcmMvdXRpbHMvbWVyZ2VEZWZhdWx0cy50cyIsICIuLi9zcmMvbWFpbi91dGlscy9jb25zdGFudHMudHMiLCAiLi4vc3JjL3BsdWdpbnMvZml4WW91dHViZUVtYmVkcy5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9tZWRpYURvd25sb2FkZXIuZGVza3RvcC9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZS9pbmRleC50cyIsICIuLi9zcmMvdXRpbHMvUXVldWUudHMiLCAiLi4vc3JjL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZS9zZXR0aW5ncy50cyIsICIuLi9zcmMvcGx1Z2lucy9tZXNzYWdlTG9nZ2VyRW5oYW5jZWQvbmF0aXZlL3V0aWxzLnRzIiwgIi4uL3NyYy9wbHVnaW5zL29wZW5JbkFwcC9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMvdm9pY2VNZXNzYWdlcy9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMvd2F0Y2hUb2dldGhlckFkYmxvY2suZGVza3RvcC9uYXRpdmUudHMiLCAiZmlsZS11cmk6ZmlsZTovL2FkZ3VhcmQuanM/bWluaWZ5IiwgIi4uL3NyYy9wbHVnaW5zL3hzT3ZlcmxheS5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvc2hhcmVkL2RlYm91bmNlLnRzIiwgImZpbGUtdXJpOmZpbGU6Ly9tb25hY29XaW4uaHRtbD9taW5pZnkmYmFzZTY0IiwgIi4uL3NyYy9tYWluL3RoZW1lcy9pbmRleC50cyIsICIuLi9zcmMvbWFpbi91dGlscy9leHRlcm5hbExpbmtzLnRzIiwgIi4uL3NyYy9tYWluL3V0aWxzL2V4dGVuc2lvbnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2ZmbGF0ZUAwLjcuNC9ub2RlX21vZHVsZXMvZmZsYXRlL2VzbS9pbmRleC5tanMiLCAiLi4vc3JjL21haW4vdXRpbHMvY3J4VG9aaXAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmV4cG9ydCBjb25zdCBSaXZlcmNvcmRGcmFnbWVudCA9IC8qICNfX1BVUkVfXyovIFN5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKTtcbmV4cG9ydCBsZXQgUml2ZXJjb3JkQ3JlYXRlRWxlbWVudCA9XG4gICAgKC4uLmFyZ3MpID0+IChSaXZlcmNvcmRDcmVhdGVFbGVtZW50ID0gUml2ZXJjb3JkLldlYnBhY2suQ29tbW9uLlJlYWN0LmNyZWF0ZUVsZW1lbnQpKC4uLmFyZ3MpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmV4cG9ydCBjb25zdCBlbnVtIElwY0V2ZW50cyB7XG4gICAgUVVJQ0tfQ1NTX1VQREFURSA9IFwiUml2ZXJjb3JkUXVpY2tDc3NVcGRhdGVcIixcbiAgICBUSEVNRV9VUERBVEUgPSBcIlJpdmVyY29yZFRoZW1lVXBkYXRlXCIsXG4gICAgR0VUX1FVSUNLX0NTUyA9IFwiUml2ZXJjb3JkR2V0UXVpY2tDc3NcIixcbiAgICBTRVRfUVVJQ0tfQ1NTID0gXCJSaXZlcmNvcmRTZXRRdWlja0Nzc1wiLFxuICAgIFVQTE9BRF9USEVNRSA9IFwiUml2ZXJjb3JkVXBsb2FkVGhlbWVcIixcbiAgICBERUxFVEVfVEhFTUUgPSBcIlJpdmVyY29yZERlbGV0ZVRoZW1lXCIsXG4gICAgR0VUX1RIRU1FU19ESVIgPSBcIlJpdmVyY29yZEdldFRoZW1lc0RpclwiLFxuICAgIEdFVF9USEVNRVNfTElTVCA9IFwiUml2ZXJjb3JkR2V0VGhlbWVzTGlzdFwiLFxuICAgIEdFVF9USEVNRV9EQVRBID0gXCJSaXZlcmNvcmRHZXRUaGVtZURhdGFcIixcbiAgICBHRVRfVEhFTUVfU1lTVEVNX1ZBTFVFUyA9IFwiUml2ZXJjb3JkR2V0VGhlbWVTeXN0ZW1WYWx1ZXNcIixcbiAgICBHRVRfU0VUVElOR1NfRElSID0gXCJSaXZlcmNvcmRHZXRTZXR0aW5nc0RpclwiLFxuICAgIEdFVF9TRVRUSU5HUyA9IFwiUml2ZXJjb3JkR2V0U2V0dGluZ3NcIixcbiAgICBTRVRfU0VUVElOR1MgPSBcIlJpdmVyY29yZFNldFNldHRpbmdzXCIsXG4gICAgT1BFTl9FWFRFUk5BTCA9IFwiUml2ZXJjb3JkT3BlbkV4dGVybmFsXCIsXG4gICAgT1BFTl9RVUlDS0NTUyA9IFwiUml2ZXJjb3JkT3BlblF1aWNrQ3NzXCIsXG4gICAgR0VUX1VQREFURVMgPSBcIlJpdmVyY29yZEdldFVwZGF0ZXNcIixcbiAgICBHRVRfUkVQTyA9IFwiUml2ZXJjb3JkR2V0UmVwb1wiLFxuICAgIFVQREFURSA9IFwiUml2ZXJjb3JkVXBkYXRlXCIsXG4gICAgQlVJTEQgPSBcIlJpdmVyY29yZEJ1aWxkXCIsXG4gICAgT1BFTl9NT05BQ09fRURJVE9SID0gXCJSaXZlcmNvcmRPcGVuTW9uYWNvRWRpdG9yXCIsXG5cbiAgICBHRVRfUExVR0lOX0lQQ19NRVRIT0RfTUFQID0gXCJSaXZlcmNvcmRHZXRQbHVnaW5JcGNNZXRob2RNYXBcIixcblxuICAgIE9QRU5fSU5fQVBQX19SRVNPTFZFX1JFRElSRUNUID0gXCJSaXZlcmNvcmRPSUFSZXNvbHZlUmVkaXJlY3RcIixcbiAgICBWT0lDRV9NRVNTQUdFU19SRUFEX1JFQ09SRElORyA9IFwiUml2ZXJjb3JkVk1SZWFkUmVjb3JkaW5nXCIsXG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgXCJiNDJhNDNlMlwiIiwgImV4cG9ydCBkZWZhdWx0IFwiUml2ZXJjb3JkL1JpdmVyY29yZFwiIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCBnaXRIYXNoIGZyb20gXCJ+Z2l0LWhhc2hcIjtcbmltcG9ydCBnaXRSZW1vdGUgZnJvbSBcIn5naXQtcmVtb3RlXCI7XG5cbmV4cG9ydCB7IGdpdEhhc2gsIGdpdFJlbW90ZSB9O1xuXG5leHBvcnQgY29uc3QgUklWRVJDT1JEX1VTRVJfQUdFTlQgPSBgUml2ZXJjb3JkLyR7Z2l0SGFzaH0ke2dpdFJlbW90ZSA/IGAgKGh0dHBzOi8vZ2l0aHViLmNvbS8ke2dpdFJlbW90ZX0pYCA6IFwiXCJ9YDtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHBzLlJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QnVmZmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBzLmdldCh1cmwsIG9wdGlvbnMsIHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUsIHN0YXR1c01lc3NhZ2UsIGhlYWRlcnMgfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChzdGF0dXNDb2RlISA+PSA0MDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVqZWN0KGAke3N0YXR1c0NvZGV9OiAke3N0YXR1c01lc3NhZ2V9IC0gJHt1cmx9YCk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSEgPj0gMzAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlc29sdmUoZ2V0KGhlYWRlcnMubG9jYXRpb24hLCBvcHRpb25zKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNodW5rcyA9IFtdIGFzIEJ1ZmZlcltdO1xuICAgICAgICAgICAgcmVzLm9uKFwiZXJyb3JcIiwgcmVqZWN0KTtcblxuICAgICAgICAgICAgcmVzLm9uKFwiZGF0YVwiLCBjaHVuayA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgICAgICAgICAgcmVzLm9uY2UoXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuZXhwb3J0IGNvbnN0IFJJVkVSQ09SRF9GSUxFUyA9IFtcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInBhdGNoZXIuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcE1haW4uanNcIixcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInByZWxvYWQuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcFByZWxvYWQuanNcIixcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInJlbmRlcmVyLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BSZW5kZXJlci5qc1wiLFxuICAgIElTX0RJU0NPUkRfREVTS1RPUCA/IFwicmVuZGVyZXIuY3NzXCIgOiBcInJpdmVyY29yZERlc2t0b3BSZW5kZXJlci5jc3NcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVFcnJvcnMoZnVuYzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpIHtcbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXdhaXQgZnVuYyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlIGluc3RhbmNlb2YgRXJyb3IgPyB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByb3RvdHlwZXMgZ2V0IGxvc3QsIHNvIHR1cm4gZXJyb3IgaW50byBwbGFpbiBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgLi4uZVxuICAgICAgICAgICAgICAgIH0gOiBlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBJcGNFdmVudHMgfSBmcm9tIFwiQHNoYXJlZC9JcGNFdmVudHNcIjtcbmltcG9ydCB7IFJJVkVSQ09SRF9VU0VSX0FHRU5UIH0gZnJvbSBcIkBzaGFyZWQvcml2ZXJjb3JkVXNlckFnZW50XCI7XG5pbXBvcnQgeyBpcGNNYWluIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyB3cml0ZUZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgZ2l0SGFzaCBmcm9tIFwifmdpdC1oYXNoXCI7XG5pbXBvcnQgZ2l0UmVtb3RlIGZyb20gXCJ+Z2l0LXJlbW90ZVwiO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwiLi4vdXRpbHMvc2ltcGxlR2V0XCI7XG5pbXBvcnQgeyBSSVZFUkNPUkRfRklMRVMsc2VyaWFsaXplRXJyb3JzIH0gZnJvbSBcIi4vY29tbW9uXCI7XG5cbmNvbnN0IEFQSV9CQVNFID0gYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtnaXRSZW1vdGV9YDtcbmxldCBQZW5kaW5nVXBkYXRlcyA9IFtdIGFzIFtzdHJpbmcsIHN0cmluZ11bXTtcblxuYXN5bmMgZnVuY3Rpb24gZ2l0aHViR2V0KGVuZHBvaW50OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZ2V0KEFQSV9CQVNFICsgZW5kcG9pbnQsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL3ZuZC5naXRodWIranNvblwiLFxuICAgICAgICAgICAgLy8gXCJBbGwgQVBJIHJlcXVlc3RzIE1VU1QgaW5jbHVkZSBhIHZhbGlkIFVzZXItQWdlbnQgaGVhZGVyLlxuICAgICAgICAgICAgLy8gUmVxdWVzdHMgd2l0aCBubyBVc2VyLUFnZW50IGhlYWRlciB3aWxsIGJlIHJlamVjdGVkLlwiXG4gICAgICAgICAgICBcIlVzZXItQWdlbnRcIjogUklWRVJDT1JEX1VTRVJfQUdFTlRcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxjdWxhdGVHaXRDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGlzT3V0ZGF0ZWQgPSBhd2FpdCBmZXRjaFVwZGF0ZXMoKTtcbiAgICBpZiAoIWlzT3V0ZGF0ZWQpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdpdGh1YkdldChgL2NvbXBhcmUvJHtnaXRIYXNofS4uLkhFQURgKTtcblxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy50b1N0cmluZyhcInV0Zi04XCIpKTtcbiAgICByZXR1cm4gZGF0YS5jb21taXRzLm1hcCgoYzogYW55KSA9PiAoe1xuICAgICAgICAvLyBnaXRodWIgYXBpIG9ubHkgc2VuZHMgdGhlIGxvbmcgc2hhXG4gICAgICAgIGhhc2g6IGMuc2hhLnNsaWNlKDAsIDcpLFxuICAgICAgICBhdXRob3I6IGMuYXV0aG9yLmxvZ2luLFxuICAgICAgICBtZXNzYWdlOiBjLmNvbW1pdC5tZXNzYWdlLnNwbGl0KFwiXFxuXCIpWzBdXG4gICAgfSkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFVwZGF0ZXMoKSB7XG4gICAgY29uc3QgcmVsZWFzZSA9IGF3YWl0IGdpdGh1YkdldChcIi9yZWxlYXNlcy9sYXRlc3RcIik7XG5cbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZWxlYXNlLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGhhc2ggPSBkYXRhLm5hbWUuc2xpY2UoZGF0YS5uYW1lLmxhc3RJbmRleE9mKFwiIFwiKSArIDEpO1xuICAgIGlmIChoYXNoID09PSBnaXRIYXNoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBkYXRhLmFzc2V0cy5mb3JFYWNoKCh7IG5hbWUsIGJyb3dzZXJfZG93bmxvYWRfdXJsIH0pID0+IHtcbiAgICAgICAgaWYgKFJJVkVSQ09SRF9GSUxFUy5zb21lKHMgPT4gbmFtZS5zdGFydHNXaXRoKHMpKSkge1xuICAgICAgICAgICAgUGVuZGluZ1VwZGF0ZXMucHVzaChbbmFtZSwgYnJvd3Nlcl9kb3dubG9hZF91cmxdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhcHBseVVwZGF0ZXMoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoUGVuZGluZ1VwZGF0ZXMubWFwKFxuICAgICAgICBhc3luYyAoW25hbWUsIGRhdGFdKSA9PiB3cml0ZUZpbGUoXG4gICAgICAgICAgICBqb2luKF9fZGlybmFtZSwgbmFtZSksXG4gICAgICAgICAgICBhd2FpdCBnZXQoZGF0YSlcbiAgICAgICAgKVxuICAgICkpO1xuICAgIFBlbmRpbmdVcGRhdGVzID0gW107XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfUkVQTywgc2VyaWFsaXplRXJyb3JzKCgpID0+IGBodHRwczovL2dpdGh1Yi5jb20vJHtnaXRSZW1vdGV9YCkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9VUERBVEVTLCBzZXJpYWxpemVFcnJvcnMoY2FsY3VsYXRlR2l0Q2hhbmdlcykpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLlVQREFURSwgc2VyaWFsaXplRXJyb3JzKGZldGNoVXBkYXRlcykpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkJVSUxELCBzZXJpYWxpemVFcnJvcnMoYXBwbHlVcGRhdGVzKSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBleGVjRmlsZSBhcyBjcEV4ZWNGaWxlIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IGlwY01haW4gfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcInV0aWxcIjtcblxuaW1wb3J0IHsgc2VyaWFsaXplRXJyb3JzIH0gZnJvbSBcIi4vY29tbW9uXCI7XG5cbmNvbnN0IFJJVkVSQ09SRF9TUkNfRElSID0gam9pbihfX2Rpcm5hbWUsIFwiLi5cIik7XG5cbmNvbnN0IGV4ZWNGaWxlID0gcHJvbWlzaWZ5KGNwRXhlY0ZpbGUpO1xuXG5jb25zdCBpc0ZsYXRwYWsgPSBwcm9jZXNzLnBsYXRmb3JtID09PSBcImxpbnV4XCIgJiYgISFwcm9jZXNzLmVudi5GTEFUUEFLX0lEO1xuXG5pZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJkYXJ3aW5cIikgcHJvY2Vzcy5lbnYuUEFUSCA9IGAvdXNyL2xvY2FsL2Jpbjoke3Byb2Nlc3MuZW52LlBBVEh9YDtcblxuZnVuY3Rpb24gZ2l0KC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0cyA9IHsgY3dkOiBSSVZFUkNPUkRfU1JDX0RJUiB9O1xuXG4gICAgaWYgKGlzRmxhdHBhaykgcmV0dXJuIGV4ZWNGaWxlKFwiZmxhdHBhay1zcGF3blwiLCBbXCItLWhvc3RcIiwgXCJnaXRcIiwgLi4uYXJnc10sIG9wdHMpO1xuICAgIGVsc2UgcmV0dXJuIGV4ZWNGaWxlKFwiZ2l0XCIsIGFyZ3MsIG9wdHMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRSZXBvKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdpdChcInJlbW90ZVwiLCBcImdldC11cmxcIiwgXCJvcmlnaW5cIik7XG4gICAgcmV0dXJuIHJlcy5zdGRvdXQudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9naXRAKC4rKTovLCBcImh0dHBzOi8vJDEvXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXC5naXQkLywgXCJcIik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUdpdENoYW5nZXMoKSB7XG4gICAgYXdhaXQgZ2l0KFwiZmV0Y2hcIik7XG5cbiAgICBjb25zdCBicmFuY2ggPSAoYXdhaXQgZ2l0KFwiYnJhbmNoXCIsIFwiLS1zaG93LWN1cnJlbnRcIikpLnN0ZG91dC50cmltKCk7XG5cbiAgICBjb25zdCBleGlzdHNPbk9yaWdpbiA9IChhd2FpdCBnaXQoXCJscy1yZW1vdGVcIiwgXCJvcmlnaW5cIiwgYnJhbmNoKSkuc3Rkb3V0Lmxlbmd0aCA+IDA7XG4gICAgaWYgKCFleGlzdHNPbk9yaWdpbikgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2l0KFwibG9nXCIsIGBIRUFELi4ub3JpZ2luLyR7YnJhbmNofWAsIFwiLS1wcmV0dHk9Zm9ybWF0OiVhbi8laC8lc1wiKTtcblxuICAgIGNvbnN0IGNvbW1pdHMgPSByZXMuc3Rkb3V0LnRyaW0oKTtcbiAgICByZXR1cm4gY29tbWl0cyA/IGNvbW1pdHMuc3BsaXQoXCJcXG5cIikubWFwKGxpbmUgPT4ge1xuICAgICAgICBjb25zdCBbYXV0aG9yLCBoYXNoLCAuLi5yZXN0XSA9IGxpbmUuc3BsaXQoXCIvXCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzaCwgYXV0aG9yLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzdC5qb2luKFwiL1wiKS5zcGxpdChcIlxcblwiKVswXVxuICAgICAgICB9O1xuICAgIH0pIDogW107XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHB1bGwoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2l0KFwicHVsbFwiKTtcbiAgICByZXR1cm4gcmVzLnN0ZG91dC5pbmNsdWRlcyhcIkZhc3QtZm9yd2FyZFwiKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgY29uc3Qgb3B0cyA9IHsgY3dkOiBSSVZFUkNPUkRfU1JDX0RJUiB9O1xuXG4gICAgY29uc3QgY29tbWFuZCA9IGlzRmxhdHBhayA/IFwiZmxhdHBhay1zcGF3blwiIDogXCJub2RlXCI7XG4gICAgY29uc3QgYXJncyA9IGlzRmxhdHBhayA/IFtcIi0taG9zdFwiLCBcIm5vZGVcIiwgXCJzY3JpcHRzL2J1aWxkL2J1aWxkLm1qc1wiXSA6IFtcInNjcmlwdHMvYnVpbGQvYnVpbGQubWpzXCJdO1xuXG4gICAgaWYgKElTX0RFVikgYXJncy5wdXNoKFwiLS1kZXZcIik7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBleGVjRmlsZShjb21tYW5kLCBhcmdzLCBvcHRzKTtcblxuICAgIHJldHVybiAhcmVzLnN0ZGVyci5pbmNsdWRlcyhcIkJ1aWxkIGZhaWxlZFwiKTtcbn1cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9SRVBPLCBzZXJpYWxpemVFcnJvcnMoZ2V0UmVwbykpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9VUERBVEVTLCBzZXJpYWxpemVFcnJvcnMoY2FsY3VsYXRlR2l0Q2hhbmdlcykpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLlVQREFURSwgc2VyaWFsaXplRXJyb3JzKHB1bGwpKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5CVUlMRCwgc2VyaWFsaXplRXJyb3JzKGJ1aWxkKSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgYXBwLCBwcm90b2NvbCwgc2Vzc2lvbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGVuc3VyZVNhZmVQYXRoIH0gZnJvbSBcIi4vaXBjTWFpblwiO1xuaW1wb3J0IHsgUmVuZGVyZXJTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBJU19WQU5JTExBLCBUSEVNRVNfRElSIH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBpbnN0YWxsRXh0IH0gZnJvbSBcIi4vdXRpbHMvZXh0ZW5zaW9uc1wiO1xuXG5pZiAoSVNfVkVTS1RPUCB8fCAhSVNfVkFOSUxMQSkge1xuICAgIGFwcC53aGVuUmVhZHkoKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gU291cmNlIE1hcHMhIE1heWJlIHRoZXJlJ3MgYSBiZXR0ZXIgd2F5IGJ1dCBzaW5jZSB0aGUgcmVuZGVyZXIgaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gZnJvbSBhIHN0cmluZyBJIGRvbid0IHRoaW5rIGFueSBvdGhlciBmb3JtIG9mIHNvdXJjZW1hcHMgd291bGQgd29ya1xuICAgICAgICBwcm90b2NvbC5yZWdpc3RlckZpbGVQcm90b2NvbChcInJpdmVyY29yZFwiLCAoeyB1cmw6IHVuc2FmZVVybCB9LCBjYikgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHVuc2FmZVVybC5zbGljZShcInJpdmVyY29yZDovL1wiLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAodXJsLmVuZHNXaXRoKFwiL1wiKSkgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcIi90aGVtZXMvXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlbWUgPSB1cmwuc2xpY2UoXCIvdGhlbWVzL1wiLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2FmZVVybCA9IGVuc3VyZVNhZmVQYXRoKFRIRU1FU19ESVIsIHRoZW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIXNhZmVVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoeyBzdGF0dXNDb2RlOiA0MDMgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2Ioc2FmZVVybC5yZXBsYWNlKC9cXD92PVxcZCskLywgXCJcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodXJsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJlbmRlcmVyLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyaXZlcmNvcmREZXNrdG9wUmVuZGVyZXIuanMubWFwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInByZWxvYWQuanMubWFwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInJpdmVyY29yZERlc2t0b3BQcmVsb2FkLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXRjaGVyLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyaXZlcmNvcmREZXNrdG9wTWFpbi5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICAgICAgY2Ioam9pbihfX2Rpcm5hbWUsIHVybCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjYih7IHN0YXR1c0NvZGU6IDQwMyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChSZW5kZXJlclNldHRpbmdzLnN0b3JlLmVuYWJsZVJlYWN0RGV2dG9vbHMpXG4gICAgICAgICAgICAgICAgaW5zdGFsbEV4dChcImZta2FkbWFwZ29mYWRvcGxqYmpma2FwZGtvaWVuaWhpXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUuaW5mbyhcIltSaXZlcmNvcmRdIEluc3RhbGxlZCBSZWFjdCBEZXZlbG9wZXIgVG9vbHNcIikpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihcIltSaXZlcmNvcmRdIEZhaWxlZCB0byBpbnN0YWxsIFJlYWN0IERldmVsb3BlciBUb29sc1wiLCBlcnIpKTtcbiAgICAgICAgfSBjYXRjaCB7IH1cblxuXG4gICAgICAgIGNvbnN0IGZpbmRIZWFkZXIgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+LCBoZWFkZXJOYW1lOiBMb3dlcmNhc2U8c3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoaCA9PiBoLnRvTG93ZXJDYXNlKCkgPT09IGhlYWRlck5hbWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFJlbW92ZSBDU1BcbiAgICAgICAgdHlwZSBQb2xpY3lSZXN1bHQgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT47XG5cbiAgICAgICAgY29uc3QgcGFyc2VQb2xpY3kgPSAocG9saWN5OiBzdHJpbmcpOiBQb2xpY3lSZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBQb2xpY3lSZXN1bHQgPSB7fTtcbiAgICAgICAgICAgIHBvbGljeS5zcGxpdChcIjtcIikuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtkaXJlY3RpdmVLZXksIC4uLmRpcmVjdGl2ZVZhbHVlXSA9IGRpcmVjdGl2ZS50cmltKCkuc3BsaXQoL1xccysvZyk7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZUtleSAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwgZGlyZWN0aXZlS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbZGlyZWN0aXZlS2V5XSA9IGRpcmVjdGl2ZVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdHJpbmdpZnlQb2xpY3kgPSAocG9saWN5OiBQb2xpY3lSZXN1bHQpOiBzdHJpbmcgPT5cbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHBvbGljeSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChbLCB2YWx1ZXNdKSA9PiB2YWx1ZXM/Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAubWFwKGRpcmVjdGl2ZSA9PiBkaXJlY3RpdmUuZmxhdCgpLmpvaW4oXCIgXCIpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiOyBcIik7XG5cbiAgICAgICAgY29uc3QgcGF0Y2hDc3AgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBmaW5kSGVhZGVyKGhlYWRlcnMsIFwiY29udGVudC1zZWN1cml0eS1wb2xpY3lcIik7XG5cbiAgICAgICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3AgPSBwYXJzZVBvbGljeShoZWFkZXJzW2hlYWRlcl1bMF0pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkaXJlY3RpdmUgb2YgW1wic3R5bGUtc3JjXCIsIFwiY29ubmVjdC1zcmNcIiwgXCJpbWctc3JjXCIsIFwiZm9udC1zcmNcIiwgXCJtZWRpYS1zcmNcIiwgXCJ3b3JrZXItc3JjXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcFtkaXJlY3RpdmVdID8/PSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY3NwW2RpcmVjdGl2ZV0ucHVzaChcIipcIiwgXCJibG9iOlwiLCBcImRhdGE6XCIsIFwicml2ZXJjb3JkOlwiLCBcIid1bnNhZmUtaW5saW5lJ1wiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZXN0cmljdCB0aGlzIHRvIG9ubHkgaW1wb3J0ZWQgcGFja2FnZXMgd2l0aCBmaXhlZCB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgIC8vIFBlcmhhcHMgYXV0byBnZW5lcmF0ZSB3aXRoIGVzYnVpbGRcbiAgICAgICAgICAgICAgICBjc3BbXCJzY3JpcHQtc3JjXCJdID8/PSBbXTtcbiAgICAgICAgICAgICAgICBjc3BbXCJzY3JpcHQtc3JjXCJdLnB1c2goXCIndW5zYWZlLWV2YWwnXCIsIFwiaHR0cHM6Ly91bnBrZy5jb21cIiwgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tXCIpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnNbaGVhZGVyXSA9IFtzdHJpbmdpZnlQb2xpY3koY3NwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2Vzc2lvbi5kZWZhdWx0U2Vzc2lvbi53ZWJSZXF1ZXN0Lm9uSGVhZGVyc1JlY2VpdmVkKCh7IHJlc3BvbnNlSGVhZGVycywgcmVzb3VyY2VUeXBlIH0sIGNiKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlVHlwZSA9PT0gXCJtYWluRnJhbWVcIilcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2hDc3AocmVzcG9uc2VIZWFkZXJzKTtcblxuICAgICAgICAgICAgICAgIC8vIEZpeCBob3N0cyB0aGF0IGRvbid0IHByb3Blcmx5IHNldCB0aGUgY3NzIGNvbnRlbnQgdHlwZSwgc3VjaCBhc1xuICAgICAgICAgICAgICAgIC8vIHJhdy5naXRodWJ1c2VyY29udGVudC5jb21cbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2VUeXBlID09PSBcInN0eWxlc2hlZXRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBmaW5kSGVhZGVyKHJlc3BvbnNlSGVhZGVycywgXCJjb250ZW50LXR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNbaGVhZGVyXSA9IFtcInRleHQvY3NzXCJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2IoeyBjYW5jZWw6IGZhbHNlLCByZXNwb25zZUhlYWRlcnMgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFzc2lnbiBhIG5vb3AgdG8gb25IZWFkZXJzUmVjZWl2ZWQgdG8gcHJldmVudCBvdGhlciBtb2RzIGZyb20gYWRkaW5nIHRoZWlyIG93biBpbmNvbXBhdGlibGUgb25lcy5cbiAgICAgICAgLy8gRm9yIGluc3RhbmNlLCBPcGVuQXNhciBhZGRzIHRoZWlyIG93biB0aGF0IGRvZXNuJ3QgZml4IGNvbnRlbnQtdHlwZSBmb3Igc3R5bGVzaGVldHMgd2hpY2ggbWFrZXMgaXRcbiAgICAgICAgLy8gaW1wb3NzaWJsZSB0byBsb2FkIGNzcyBmcm9tIGdpdGh1YiByYXcgZGVzcGl0ZSBvdXIgZml4IGFib3ZlXG4gICAgICAgIHNlc3Npb24uZGVmYXVsdFNlc3Npb24ud2ViUmVxdWVzdC5vbkhlYWRlcnNSZWNlaXZlZCA9ICgpID0+IHsgfTtcbiAgICB9KTtcbn1cblxuaWYgKElTX0RJU0NPUkRfREVTS1RPUCkge1xuICAgIHJlcXVpcmUoXCIuL3BhdGNoZXJcIik7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IFwiLi91cGRhdGVyXCI7XG5pbXBvcnQgXCIuL2lwY1BsdWdpbnNcIjtcbmltcG9ydCBcIi4vc2V0dGluZ3NcIjtcblxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tIFwiQHNoYXJlZC9kZWJvdW5jZVwiO1xuaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBCcm93c2VyV2luZG93LCBpcGNNYWluLCBzaGVsbCwgc3lzdGVtUHJlZmVyZW5jZXMgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCBtb25hY29IdG1sIGZyb20gXCJmaWxlOi8vbW9uYWNvV2luLmh0bWw/bWluaWZ5JmJhc2U2NFwiO1xuaW1wb3J0IHsgRlNXYXRjaGVyLCBta2RpclN5bmMsIHdhdGNoLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBvcGVuLCByZWFkZGlyLCByZWFkRmlsZSB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHsgam9pbiwgbm9ybWFsaXplIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgZ2V0VGhlbWVJbmZvLCBzdHJpcEJPTSwgVXNlclRoZW1lSGVhZGVyIH0gZnJvbSBcIi4vdGhlbWVzXCI7XG5pbXBvcnQgeyBBTExPV0VEX1BST1RPQ09MUywgUVVJQ0tDU1NfUEFUSCwgVEhFTUVTX0RJUiB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgbWFrZUxpbmtzT3BlbkV4dGVybmFsbHkgfSBmcm9tIFwiLi91dGlscy9leHRlcm5hbExpbmtzXCI7XG5cbm1rZGlyU3luYyhUSEVNRVNfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVNhZmVQYXRoKGJhc2VQYXRoOiBzdHJpbmcsIHBhdGg6IHN0cmluZykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRCYXNlUGF0aCA9IG5vcm1hbGl6ZShiYXNlUGF0aCk7XG4gICAgY29uc3QgbmV3UGF0aCA9IGpvaW4oYmFzZVBhdGgsIHBhdGgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gbm9ybWFsaXplKG5ld1BhdGgpO1xuICAgIHJldHVybiBub3JtYWxpemVkUGF0aC5zdGFydHNXaXRoKG5vcm1hbGl6ZWRCYXNlUGF0aCkgPyBub3JtYWxpemVkUGF0aCA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlYWRDc3MoKSB7XG4gICAgcmV0dXJuIHJlYWRGaWxlKFFVSUNLQ1NTX1BBVEgsIFwidXRmLThcIikuY2F0Y2goKCkgPT4gXCJcIik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RUaGVtZXMoKTogUHJvbWlzZTxVc2VyVGhlbWVIZWFkZXJbXT4ge1xuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgcmVhZGRpcihUSEVNRVNfRElSKS5jYXRjaCgoKSA9PiBbXSk7XG5cbiAgICBjb25zdCB0aGVtZUluZm86IFVzZXJUaGVtZUhlYWRlcltdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGZpbGVOYW1lIG9mIGZpbGVzKSB7XG4gICAgICAgIGlmICghZmlsZU5hbWUuZW5kc1dpdGgoXCIuY3NzXCIpKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0VGhlbWVEYXRhKGZpbGVOYW1lKS50aGVuKHN0cmlwQk9NKS5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgICAgdGhlbWVJbmZvLnB1c2goZ2V0VGhlbWVJbmZvKGRhdGEsIGZpbGVOYW1lKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoZW1lSW5mbztcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbWVEYXRhKGZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICBmaWxlTmFtZSA9IGZpbGVOYW1lLnJlcGxhY2UoL1xcP3Y9XFxkKyQvLCBcIlwiKTtcbiAgICBjb25zdCBzYWZlUGF0aCA9IGVuc3VyZVNhZmVQYXRoKFRIRU1FU19ESVIsIGZpbGVOYW1lKTtcbiAgICBpZiAoIXNhZmVQYXRoKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoYFVuc2FmZSBwYXRoICR7ZmlsZU5hbWV9YCk7XG4gICAgcmV0dXJuIHJlYWRGaWxlKHNhZmVQYXRoLCBcInV0Zi04XCIpO1xufVxuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuT1BFTl9RVUlDS0NTUywgKCkgPT4gc2hlbGwub3BlblBhdGgoUVVJQ0tDU1NfUEFUSCkpO1xuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuT1BFTl9FWFRFUk5BTCwgKF8sIHVybCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciB7IHByb3RvY29sIH0gPSBuZXcgVVJMKHVybCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHRocm93IFwiTWFsZm9ybWVkIFVSTFwiO1xuICAgIH1cbiAgICBpZiAoIUFMTE9XRURfUFJPVE9DT0xTLmluY2x1ZGVzKHByb3RvY29sKSlcbiAgICAgICAgdGhyb3cgXCJEaXNhbGxvd2VkIHByb3RvY29sLlwiO1xuXG4gICAgc2hlbGwub3BlbkV4dGVybmFsKHVybCk7XG59KTtcblxuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1FVSUNLX0NTUywgKCkgPT4gcmVhZENzcygpKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5TRVRfUVVJQ0tfQ1NTLCAoXywgY3NzKSA9PlxuICAgIHdyaXRlRmlsZVN5bmMoUVVJQ0tDU1NfUEFUSCwgY3NzKVxuKTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRVNfRElSLCAoKSA9PiBUSEVNRVNfRElSKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfVEhFTUVTX0xJU1QsICgpID0+IGxpc3RUaGVtZXMoKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1RIRU1FX0RBVEEsIChfLCBmaWxlTmFtZSkgPT4gZ2V0VGhlbWVEYXRhKGZpbGVOYW1lKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1RIRU1FX1NZU1RFTV9WQUxVRVMsICgpID0+ICh7XG4gICAgLy8gd2luICYgbWFjIG9ubHlcbiAgICBcIm9zLWFjY2VudC1jb2xvclwiOiBgIyR7c3lzdGVtUHJlZmVyZW5jZXMuZ2V0QWNjZW50Q29sb3I/LigpIHx8IFwiXCJ9YFxufSkpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0SXBjKG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3cpIHtcbiAgICBsZXQgcXVpY2tDc3NXYXRjaGVyOiBGU1dhdGNoZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBvcGVuKFFVSUNLQ1NTX1BBVEgsIFwiYStcIikudGhlbihmZCA9PiB7XG4gICAgICAgIGZkLmNsb3NlKCk7XG4gICAgICAgIHF1aWNrQ3NzV2F0Y2hlciA9IHdhdGNoKFFVSUNLQ1NTX1BBVEgsIHsgcGVyc2lzdGVudDogZmFsc2UgfSwgZGVib3VuY2UoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5wb3N0TWVzc2FnZShJcGNFdmVudHMuUVVJQ0tfQ1NTX1VQREFURSwgYXdhaXQgcmVhZENzcygpKTtcbiAgICAgICAgfSwgNTApKTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7IH0pO1xuXG4gICAgY29uc3QgdGhlbWVzV2F0Y2hlciA9IHdhdGNoKFRIRU1FU19ESVIsIHsgcGVyc2lzdGVudDogZmFsc2UgfSwgZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnBvc3RNZXNzYWdlKElwY0V2ZW50cy5USEVNRV9VUERBVEUsIHZvaWQgMCk7XG4gICAgfSkpO1xuXG4gICAgbWFpbldpbmRvdy5vbmNlKFwiY2xvc2VkXCIsICgpID0+IHtcbiAgICAgICAgcXVpY2tDc3NXYXRjaGVyPy5jbG9zZSgpO1xuICAgICAgICB0aGVtZXNXYXRjaGVyLmNsb3NlKCk7XG4gICAgfSk7XG59XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5PUEVOX01PTkFDT19FRElUT1IsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IFwiUml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvclwiO1xuICAgIGNvbnN0IGV4aXN0aW5nV2luZG93ID0gQnJvd3NlcldpbmRvdy5nZXRBbGxXaW5kb3dzKCkuZmluZCh3ID0+IHcudGl0bGUgPT09IHRpdGxlKTtcbiAgICBpZiAoZXhpc3RpbmdXaW5kb3cgJiYgIWV4aXN0aW5nV2luZG93LmlzRGVzdHJveWVkKCkpIHtcbiAgICAgICAgZXhpc3RpbmdXaW5kb3cuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdpbiA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dG9IaWRlTWVudUJhcjogdHJ1ZSxcbiAgICAgICAgZGFya1RoZW1lOiB0cnVlLFxuICAgICAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgICAgICAgcHJlbG9hZDogam9pbihfX2Rpcm5hbWUsIElTX0RJU0NPUkRfREVTS1RPUCA/IFwicHJlbG9hZC5qc1wiIDogXCJyaXZlcmNvcmREZXNrdG9wUHJlbG9hZC5qc1wiKSxcbiAgICAgICAgICAgIGNvbnRleHRJc29sYXRpb246IHRydWUsXG4gICAgICAgICAgICBub2RlSW50ZWdyYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgc2FuZGJveDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbWFrZUxpbmtzT3BlbkV4dGVybmFsbHkod2luKTtcblxuICAgIGF3YWl0IHdpbi5sb2FkVVJMKGBkYXRhOnRleHQvaHRtbDtiYXNlNjQsJHttb25hY29IdG1sfWApO1xufSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaWYgKCFJU19VUERBVEVSX0RJU0FCTEVEKVxuICAgIHJlcXVpcmUoSVNfU1RBTkRBTE9ORSA/IFwiLi9odHRwXCIgOiBcIi4vZ2l0XCIpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IElwY0V2ZW50cyB9IGZyb20gXCJAc2hhcmVkL0lwY0V2ZW50c1wiO1xuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5pbXBvcnQgUGx1Z2luTmF0aXZlcyBmcm9tIFwifnBsdWdpbk5hdGl2ZXNcIjtcblxuY29uc3QgUGx1Z2luSXBjTWFwcGluZ3MgPSB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PjtcbmV4cG9ydCB0eXBlIFBsdWdpbklwY01hcHBpbmdzID0gdHlwZW9mIFBsdWdpbklwY01hcHBpbmdzO1xuXG5mb3IgKGNvbnN0IFtwbHVnaW4sIG1ldGhvZHNdIG9mIE9iamVjdC5lbnRyaWVzKFBsdWdpbk5hdGl2ZXMpKSB7XG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG1ldGhvZHMpO1xuICAgIGlmICghZW50cmllcy5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgbWFwcGluZ3MgPSBQbHVnaW5JcGNNYXBwaW5nc1twbHVnaW5dID0ge307XG5cbiAgICBmb3IgKGNvbnN0IFttZXRob2ROYW1lLCBtZXRob2RdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gYFJpdmVyY29yZFBsdWdpbk5hdGl2ZV8ke3BsdWdpbn1fJHttZXRob2ROYW1lfWA7XG4gICAgICAgIGlwY01haW4uaGFuZGxlKGtleSwgbWV0aG9kKTtcbiAgICAgICAgbWFwcGluZ3NbbWV0aG9kTmFtZV0gPSBrZXk7XG4gICAgfVxufVxuXG5pcGNNYWluLm9uKElwY0V2ZW50cy5HRVRfUExVR0lOX0lQQ19NRVRIT0RfTUFQLCBlID0+IHtcbiAgICBlLnJldHVyblZhbHVlID0gUGx1Z2luSXBjTWFwcGluZ3M7XG59KTtcbiIsICJpbXBvcnQgKiBhcyBwMCBmcm9tIFwiLi9wbHVnaW5zL2FwcGxlTXVzaWMuZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHAxIGZyb20gXCIuL3BsdWdpbnMvY29uc29sZVNob3J0Y3V0cy9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHAyIGZyb20gXCIuL3BsdWdpbnMvZml4U3BvdGlmeUVtYmVkcy5kZXNrdG9wL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDMgZnJvbSBcIi4vcGx1Z2lucy9maXhZb3V0dWJlRW1iZWRzLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwNCBmcm9tIFwiLi9wbHVnaW5zL21lZGlhRG93bmxvYWRlci5kZXNrdG9wL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDUgZnJvbSBcIi4vcGx1Z2lucy9tZXNzYWdlTG9nZ2VyRW5oYW5jZWQvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwNiBmcm9tIFwiLi9wbHVnaW5zL29wZW5JbkFwcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA3IGZyb20gXCIuL3BsdWdpbnMvdm9pY2VNZXNzYWdlcy9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA4IGZyb20gXCIuL3BsdWdpbnMvd2F0Y2hUb2dldGhlckFkYmxvY2suZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA5IGZyb20gXCIuL3BsdWdpbnMveHNPdmVybGF5LmRlc2t0b3AvbmF0aXZlXCI7XG5leHBvcnQgZGVmYXVsdCB7XG5cIkFwcGxlTXVzaWNSaWNoUHJlc2VuY2VcIjpwMCxcblwiQ29uc29sZVNob3J0Y3V0c1wiOnAxLFxuXCJGaXhTcG90aWZ5RW1iZWRzXCI6cDIsXG5cIkZpeFlvdXR1YmVFbWJlZHNcIjpwMyxcblwiTWVkaWFEb3dubG9hZGVyXCI6cDQsXG5cIk1lc3NhZ2VMb2dnZXJFbmhhbmNlZFwiOnA1LFxuXCJPcGVuSW5BcHBcIjpwNixcblwiVm9pY2VNZXNzYWdlc1wiOnA3LFxuXCJXYXRjaFRvZ2V0aGVyQWRibG9ja1wiOnA4LFxuXCJYU092ZXJsYXlcIjpwOSxcbn07IiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IGV4ZWNGaWxlIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gXCJ1dGlsXCI7XG5cbmltcG9ydCB0eXBlIHsgVHJhY2tEYXRhIH0gZnJvbSBcIi5cIjtcblxuY29uc3QgZXhlYyA9IHByb21pc2lmeShleGVjRmlsZSk7XG5cbi8vIGZ1bmN0aW9uIGV4ZWMoZmlsZTogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSA9IFtdKSB7XG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHsgY29kZTogbnVtYmVyIHwgbnVsbCwgc3Rkb3V0OiBzdHJpbmcgfCBudWxsLCBzdGRlcnI6IHN0cmluZyB8IG51bGw7IH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICAgICAgY29uc3QgcHJvY2VzcyA9IHNwYXduKGZpbGUsIGFyZ3MsIHsgc3RkaW86IFtudWxsLCBcInBpcGVcIiwgXCJwaXBlXCJdIH0pO1xuXG4vLyAgICAgICAgIGxldCBzdGRvdXQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuLy8gICAgICAgICBwcm9jZXNzLnN0ZG91dC5vbihcImRhdGFcIiwgKGNodW5rOiBzdHJpbmcpID0+IHsgc3Rkb3V0ID8/PSBcIlwiOyBzdGRvdXQgKz0gY2h1bms7IH0pO1xuLy8gICAgICAgICBsZXQgc3RkZXJyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbi8vICAgICAgICAgcHJvY2Vzcy5zdGRlcnIub24oXCJkYXRhXCIsIChjaHVuazogc3RyaW5nKSA9PiB7IHN0ZG91dCA/Pz0gXCJcIjsgc3RkZXJyICs9IGNodW5rOyB9KTtcblxuLy8gICAgICAgICBwcm9jZXNzLm9uKFwiZXhpdFwiLCBjb2RlID0+IHsgcmVzb2x2ZSh7IGNvZGUsIHN0ZG91dCwgc3RkZXJyIH0pOyB9KTtcbi8vICAgICAgICAgcHJvY2Vzcy5vbihcImVycm9yXCIsIGVyciA9PiByZWplY3QoZXJyKSk7XG4vLyAgICAgfSk7XG4vLyB9XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGxlc2NyaXB0KGNtZHM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgeyBzdGRvdXQgfSA9IGF3YWl0IGV4ZWMoXCJvc2FzY3JpcHRcIiwgY21kcy5tYXAoYyA9PiBbXCItZVwiLCBjXSkuZmxhdCgpKTtcbiAgICByZXR1cm4gc3Rkb3V0O1xufVxuXG5mdW5jdGlvbiBtYWtlU2VhcmNoVXJsKHR5cGU6IHN0cmluZywgcXVlcnk6IHN0cmluZykge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoXCJodHRwczovL3Rvb2xzLmFwcGxlbWVkaWFzZXJ2aWNlcy5jb20vYXBpL2FwcGxlLW1lZGlhL211c2ljL1VTL3NlYXJjaC5qc29uXCIpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwidHlwZXNcIiwgdHlwZSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoXCJsaW1pdFwiLCBcIjFcIik7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoXCJ0ZXJtXCIsIHF1ZXJ5KTtcbiAgICByZXR1cm4gdXJsO1xufVxuXG5jb25zdCByZXF1ZXN0T3B0aW9uczogUmVxdWVzdEluaXQgPSB7XG4gICAgaGVhZGVyczogeyBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBydjoxMjUuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xMjUuMFwiIH0sXG59O1xuXG5pbnRlcmZhY2UgUmVtb3RlRGF0YSB7XG4gICAgYXBwbGVNdXNpY0xpbms/OiBzdHJpbmcsXG4gICAgc29uZ0xpbms/OiBzdHJpbmcsXG4gICAgYWxidW1BcnR3b3JrPzogc3RyaW5nLFxuICAgIGFydGlzdEFydHdvcms/OiBzdHJpbmc7XG59XG5cbmxldCBjYWNoZWRSZW1vdGVEYXRhOiB7IGlkOiBzdHJpbmcsIGRhdGE6IFJlbW90ZURhdGE7IH0gfCB7IGlkOiBzdHJpbmcsIGZhaWx1cmVzOiBudW1iZXI7IH0gfCBudWxsID0gbnVsbDtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hSZW1vdGVEYXRhKHsgaWQsIG5hbWUsIGFydGlzdCwgYWxidW0gfTogeyBpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGFydGlzdDogc3RyaW5nLCBhbGJ1bTogc3RyaW5nOyB9KSB7XG4gICAgaWYgKGlkID09PSBjYWNoZWRSZW1vdGVEYXRhPy5pZCkge1xuICAgICAgICBpZiAoXCJkYXRhXCIgaW4gY2FjaGVkUmVtb3RlRGF0YSkgcmV0dXJuIGNhY2hlZFJlbW90ZURhdGEuZGF0YTtcbiAgICAgICAgaWYgKFwiZmFpbHVyZXNcIiBpbiBjYWNoZWRSZW1vdGVEYXRhICYmIGNhY2hlZFJlbW90ZURhdGEuZmFpbHVyZXMgPj0gNSkgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgW3NvbmdEYXRhLCBhcnRpc3REYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoKG1ha2VTZWFyY2hVcmwoXCJzb25nc1wiLCBhcnRpc3QgKyBcIiBcIiArIGFsYnVtICsgXCIgXCIgKyBuYW1lKSwgcmVxdWVzdE9wdGlvbnMpLnRoZW4ociA9PiByLmpzb24oKSksXG4gICAgICAgICAgICBmZXRjaChtYWtlU2VhcmNoVXJsKFwiYXJ0aXN0c1wiLCBhcnRpc3Quc3BsaXQoLyAqWywmXSAqLylbMF0pLCByZXF1ZXN0T3B0aW9ucykudGhlbihyID0+IHIuanNvbigpKVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBhcHBsZU11c2ljTGluayA9IHNvbmdEYXRhPy5zb25ncz8uZGF0YVswXT8uYXR0cmlidXRlcy51cmw7XG4gICAgICAgIGNvbnN0IHNvbmdMaW5rID0gc29uZ0RhdGE/LnNvbmdzPy5kYXRhWzBdPy5pZCA/IGBodHRwczovL3NvbmcubGluay9pLyR7c29uZ0RhdGE/LnNvbmdzPy5kYXRhWzBdPy5pZH1gIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IGFsYnVtQXJ0d29yayA9IHNvbmdEYXRhPy5zb25ncz8uZGF0YVswXT8uYXR0cmlidXRlcy5hcnR3b3JrLnVybC5yZXBsYWNlKFwie3d9XCIsIFwiNTEyXCIpLnJlcGxhY2UoXCJ7aH1cIiwgXCI1MTJcIik7XG4gICAgICAgIGNvbnN0IGFydGlzdEFydHdvcmsgPSBhcnRpc3REYXRhPy5hcnRpc3RzPy5kYXRhWzBdPy5hdHRyaWJ1dGVzLmFydHdvcmsudXJsLnJlcGxhY2UoXCJ7d31cIiwgXCI1MTJcIikucmVwbGFjZShcIntofVwiLCBcIjUxMlwiKTtcblxuICAgICAgICBjYWNoZWRSZW1vdGVEYXRhID0ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBkYXRhOiB7IGFwcGxlTXVzaWNMaW5rLCBzb25nTGluaywgYWxidW1BcnR3b3JrLCBhcnRpc3RBcnR3b3JrIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNhY2hlZFJlbW90ZURhdGEuZGF0YTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbQXBwbGVNdXNpY1JpY2hQcmVzZW5jZV0gRmFpbGVkIHRvIGZldGNoIHJlbW90ZSBkYXRhOlwiLCBlKTtcbiAgICAgICAgY2FjaGVkUmVtb3RlRGF0YSA9IHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgZmFpbHVyZXM6IChpZCA9PT0gY2FjaGVkUmVtb3RlRGF0YT8uaWQgJiYgXCJmYWlsdXJlc1wiIGluIGNhY2hlZFJlbW90ZURhdGEgPyBjYWNoZWRSZW1vdGVEYXRhLmZhaWx1cmVzIDogMCkgKyAxXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoVHJhY2tEYXRhKCk6IFByb21pc2U8VHJhY2tEYXRhIHwgbnVsbD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGV4ZWMoXCJwZ3JlcFwiLCBbXCJeTXVzaWMkXCJdKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJTdGF0ZSA9IGF3YWl0IGFwcGxlc2NyaXB0KFsndGVsbCBhcHBsaWNhdGlvbiBcIk11c2ljXCInLCBcImdldCBwbGF5ZXIgc3RhdGVcIiwgXCJlbmQgdGVsbFwiXSlcbiAgICAgICAgLnRoZW4ob3V0ID0+IG91dC50cmltKCkpO1xuICAgIGlmIChwbGF5ZXJTdGF0ZSAhPT0gXCJwbGF5aW5nXCIpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcGxheWVyUG9zaXRpb24gPSBhd2FpdCBhcHBsZXNjcmlwdChbJ3RlbGwgYXBwbGljYXRpb24gXCJNdXNpY1wiJywgXCJnZXQgcGxheWVyIHBvc2l0aW9uXCIsIFwiZW5kIHRlbGxcIl0pXG4gICAgICAgIC50aGVuKHRleHQgPT4gTnVtYmVyLnBhcnNlRmxvYXQodGV4dC50cmltKCkpKTtcblxuICAgIGNvbnN0IHN0ZG91dCA9IGF3YWl0IGFwcGxlc2NyaXB0KFtcbiAgICAgICAgJ3NldCBvdXRwdXQgdG8gXCJcIicsXG4gICAgICAgICd0ZWxsIGFwcGxpY2F0aW9uIFwiTXVzaWNcIicsXG4gICAgICAgIFwic2V0IHRfaWQgdG8gZGF0YWJhc2UgaWQgb2YgY3VycmVudCB0cmFja1wiLFxuICAgICAgICBcInNldCB0X25hbWUgdG8gbmFtZSBvZiBjdXJyZW50IHRyYWNrXCIsXG4gICAgICAgIFwic2V0IHRfYWxidW0gdG8gYWxidW0gb2YgY3VycmVudCB0cmFja1wiLFxuICAgICAgICBcInNldCB0X2FydGlzdCB0byBhcnRpc3Qgb2YgY3VycmVudCB0cmFja1wiLFxuICAgICAgICBcInNldCB0X2R1cmF0aW9uIHRvIGR1cmF0aW9uIG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgJ3NldCBvdXRwdXQgdG8gXCJcIiAmIHRfaWQgJiBcIlxcXFxuXCIgJiB0X25hbWUgJiBcIlxcXFxuXCIgJiB0X2FsYnVtICYgXCJcXFxcblwiICYgdF9hcnRpc3QgJiBcIlxcXFxuXCIgJiB0X2R1cmF0aW9uJyxcbiAgICAgICAgXCJlbmQgdGVsbFwiLFxuICAgICAgICBcInJldHVybiBvdXRwdXRcIlxuICAgIF0pO1xuXG4gICAgY29uc3QgW2lkLCBuYW1lLCBhbGJ1bSwgYXJ0aXN0LCBkdXJhdGlvblN0cl0gPSBzdGRvdXQuc3BsaXQoXCJcXG5cIikuZmlsdGVyKGsgPT4gISFrKTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IE51bWJlci5wYXJzZUZsb2F0KGR1cmF0aW9uU3RyKTtcblxuICAgIGNvbnN0IHJlbW90ZURhdGEgPSBhd2FpdCBmZXRjaFJlbW90ZURhdGEoeyBpZCwgbmFtZSwgYXJ0aXN0LCBhbGJ1bSB9KTtcblxuICAgIHJldHVybiB7IG5hbWUsIGFsYnVtLCBhcnRpc3QsIHBsYXllclBvc2l0aW9uLCBkdXJhdGlvbiwgLi4ucmVtb3RlRGF0YSB9O1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IElwY01haW5JbnZva2VFdmVudCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERldnRvb2xzT3BlbkVhZ2VyTG9hZChlOiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBoYW5kbGVEZXZ0b29sc09wZW5lZCA9ICgpID0+IGUuc2VuZGVyLmV4ZWN1dGVKYXZhU2NyaXB0KFwiUml2ZXJjb3JkLlBsdWdpbnMucGx1Z2lucy5Db25zb2xlU2hvcnRjdXRzLmVhZ2VyTG9hZCh0cnVlKVwiKTtcblxuICAgIGlmIChlLnNlbmRlci5pc0RldlRvb2xzT3BlbmVkKCkpXG4gICAgICAgIGhhbmRsZURldnRvb2xzT3BlbmVkKCk7XG4gICAgZWxzZVxuICAgICAgICBlLnNlbmRlci5vbmNlKFwiZGV2dG9vbHMtb3BlbmVkXCIsICgpID0+IGhhbmRsZURldnRvb2xzT3BlbmVkKCkpO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiQG1haW4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChfLCB3aW4pID0+IHtcbiAgICB3aW4ud2ViQ29udGVudHMub24oXCJmcmFtZS1jcmVhdGVkXCIsIChfLCB7IGZyYW1lIH0pID0+IHtcbiAgICAgICAgZnJhbWUub25jZShcImRvbS1yZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJhbWUudXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL29wZW4uc3BvdGlmeS5jb20vZW1iZWQvXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LkZpeFNwb3RpZnlFbWJlZHM7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncz8uZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZnJhbWUuZXhlY3V0ZUphdmFTY3JpcHQoYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IEF1ZGlvLnByb3RvdHlwZS5wbGF5O1xuICAgICAgICAgICAgICAgICAgICBBdWRpby5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52b2x1bWUgPSAkeyhzZXR0aW5ncy52b2x1bWUgLyAxMDApIHx8IDAuMX07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tIFwiQGFwaS9TZXR0aW5nc1wiO1xuaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSBcIkBzaGFyZWQvU2V0dGluZ3NTdG9yZVwiO1xuaW1wb3J0IHsgbWVyZ2VEZWZhdWx0cyB9IGZyb20gXCJAdXRpbHMvbWVyZ2VEZWZhdWx0c1wiO1xuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuaW1wb3J0IHsgTkFUSVZFX1NFVFRJTkdTX0ZJTEUsIFNFVFRJTkdTX0RJUiwgU0VUVElOR1NfRklMRSB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5ta2RpclN5bmMoU0VUVElOR1NfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gcmVhZFNldHRpbmdzPFQgPSBvYmplY3Q+KG5hbWU6IHN0cmluZywgZmlsZTogc3RyaW5nKTogUGFydGlhbDxUPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGZpbGUsIFwidXRmLThcIikpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGlmIChlcnI/LmNvZGUgIT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcmVhZCAke25hbWV9IHNldHRpbmdzYCwgZXJyKTtcblxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUmVuZGVyZXJTZXR0aW5ncyA9IG5ldyBTZXR0aW5nc1N0b3JlKHJlYWRTZXR0aW5nczxTZXR0aW5ncz4oXCJyZW5kZXJlclwiLCBTRVRUSU5HU19GSUxFKSk7XG5cblJlbmRlcmVyU2V0dGluZ3MuYWRkR2xvYmFsQ2hhbmdlTGlzdGVuZXIoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHdyaXRlRmlsZVN5bmMoU0VUVElOR1NfRklMRSwgSlNPTi5zdHJpbmdpZnkoUmVuZGVyZXJTZXR0aW5ncy5wbGFpbiwgbnVsbCwgNCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3cml0ZSByZW5kZXJlciBzZXR0aW5nc1wiLCBlKTtcbiAgICB9XG59KTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9TRVRUSU5HU19ESVIsICgpID0+IFNFVFRJTkdTX0RJUik7XG5pcGNNYWluLm9uKElwY0V2ZW50cy5HRVRfU0VUVElOR1MsIGUgPT4gZS5yZXR1cm5WYWx1ZSA9IFJlbmRlcmVyU2V0dGluZ3MucGxhaW4pO1xuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuU0VUX1NFVFRJTkdTLCAoXywgZGF0YTogU2V0dGluZ3MsIHBhdGhUb05vdGlmeT86IHN0cmluZykgPT4ge1xuICAgIFJlbmRlcmVyU2V0dGluZ3Muc2V0RGF0YShkYXRhLCBwYXRoVG9Ob3RpZnkpO1xufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF0aXZlU2V0dGluZ3Mge1xuICAgIHBsdWdpbnM6IHtcbiAgICAgICAgW3BsdWdpbjogc3RyaW5nXToge1xuICAgICAgICAgICAgW3NldHRpbmc6IHN0cmluZ106IGFueTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5jb25zdCBEZWZhdWx0TmF0aXZlU2V0dGluZ3M6IE5hdGl2ZVNldHRpbmdzID0ge1xuICAgIHBsdWdpbnM6IHt9XG59O1xuXG5jb25zdCBuYXRpdmVTZXR0aW5ncyA9IHJlYWRTZXR0aW5nczxOYXRpdmVTZXR0aW5ncz4oXCJuYXRpdmVcIiwgTkFUSVZFX1NFVFRJTkdTX0ZJTEUpO1xubWVyZ2VEZWZhdWx0cyhuYXRpdmVTZXR0aW5ncywgRGVmYXVsdE5hdGl2ZVNldHRpbmdzKTtcblxuZXhwb3J0IGNvbnN0IE5hdGl2ZVNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmUobmF0aXZlU2V0dGluZ3MpO1xuXG5OYXRpdmVTZXR0aW5ncy5hZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcigoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhOQVRJVkVfU0VUVElOR1NfRklMRSwgSlNPTi5zdHJpbmdpZnkoTmF0aXZlU2V0dGluZ3MucGxhaW4sIG51bGwsIDQpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgbmF0aXZlIHNldHRpbmdzXCIsIGUpO1xuICAgIH1cbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IExpdGVyYWxVbmlvbiB9IGZyb20gXCJ0eXBlLWZlc3RcIjtcblxuLy8gUmVzb2x2ZXMgYSBwb3NzaWJseSBuZXN0ZWQgcHJvcCBpbiB0aGUgZm9ybSBvZiBcInNvbWUubmVzdGVkLnByb3BcIiB0byB0eXBlIG9mIFQuc29tZS5uZXN0ZWQucHJvcFxudHlwZSBSZXNvbHZlUHJvcERlZXA8VCwgUD4gPSBQIGV4dGVuZHMgYCR7aW5mZXIgUHJlfS4ke2luZmVyIFN1Zn1gXG4gICAgPyBQcmUgZXh0ZW5kcyBrZXlvZiBUXG4gICAgPyBSZXNvbHZlUHJvcERlZXA8VFtQcmVdLCBTdWY+XG4gICAgOiBhbnlcbiAgICA6IFAgZXh0ZW5kcyBrZXlvZiBUXG4gICAgPyBUW1BdXG4gICAgOiBhbnk7XG5cbmludGVyZmFjZSBTZXR0aW5nc1N0b3JlT3B0aW9ucyB7XG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xuICAgIGdldERlZmF1bHRWYWx1ZT86IChkYXRhOiB7XG4gICAgICAgIHRhcmdldDogYW55O1xuICAgICAgICBrZXk6IHN0cmluZztcbiAgICAgICAgcm9vdDogYW55O1xuICAgICAgICBwYXRoOiBzdHJpbmc7XG4gICAgfSkgPT4gYW55O1xufVxuXG4vLyBtZXJnZXMgdGhlIFNldHRpbmdzU3RvcmVPcHRpb25zIHR5cGUgaW50byB0aGUgY2xhc3NcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3NTdG9yZTxUIGV4dGVuZHMgb2JqZWN0PiBleHRlbmRzIFNldHRpbmdzU3RvcmVPcHRpb25zIHsgfVxuXG4vKipcbiAqIFRoZSBTZXR0aW5nc1N0b3JlIGFsbG93cyB5b3UgdG8gZWFzaWx5IGNyZWF0ZSBhIG11dGFibGUgc3RvcmUgdGhhdFxuICogaGFzIHN1cHBvcnQgZm9yIGdsb2JhbCBhbmQgcGF0aC1iYXNlZCBjaGFuZ2UgbGlzdGVuZXJzLlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTdG9yZTxUIGV4dGVuZHMgb2JqZWN0PiB7XG4gICAgcHJpdmF0ZSBwYXRoTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIFNldDwobmV3RGF0YTogYW55KSA9PiB2b2lkPj4oKTtcbiAgICBwcml2YXRlIGdsb2JhbExpc3RlbmVycyA9IG5ldyBTZXQ8KG5ld0RhdGE6IFQsIHBhdGg6IHN0cmluZykgPT4gdm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdG9yZSBvYmplY3QuIE1ha2luZyBjaGFuZ2VzIHRvIHRoaXMgb2JqZWN0IHdpbGwgdHJpZ2dlciB0aGUgYXBwbGljYWJsZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgc3RvcmU6IFQ7XG4gICAgLyoqXG4gICAgICogVGhlIHBsYWluIGRhdGEuIENoYW5nZXMgdG8gdGhpcyBvYmplY3Qgd2lsbCBub3QgdHJpZ2dlciBhbnkgY2hhbmdlIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHBsYWluOiBUO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBsYWluOiBULCBvcHRpb25zOiBTZXR0aW5nc1N0b3JlT3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMucGxhaW4gPSBwbGFpbjtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHRoaXMubWFrZVByb3h5KHBsYWluKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1ha2VQcm94eShvYmplY3Q6IGFueSwgcm9vdDogVCA9IG9iamVjdCwgcGF0aDogc3RyaW5nID0gXCJcIikge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG9iamVjdCwge1xuICAgICAgICAgICAgZ2V0KHRhcmdldCwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHRhcmdldFtrZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRhcmdldCkgJiYgc2VsZi5nZXREZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IHNlbGYuZ2V0RGVmYXVsdFZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiB2ICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHYpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5tYWtlUHJveHkodiwgcm9vdCwgYCR7cGF0aH0ke3BhdGggJiYgXCIuXCJ9JHtrZXl9YCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodGFyZ2V0LCBrZXk6IHN0cmluZywgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2tleV0gPT09IHZhbHVlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0UGF0aCA9IGAke3BhdGh9JHtwYXRoICYmIFwiLlwifSR7a2V5fWA7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmdsb2JhbExpc3RlbmVycy5mb3JFYWNoKGNiID0+IGNiKHZhbHVlLCBzZXRQYXRoKSk7XG4gICAgICAgICAgICAgICAgc2VsZi5wYXRoTGlzdGVuZXJzLmdldChzZXRQYXRoKT8uZm9yRWFjaChjYiA9PiBjYih2YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGF0YSBvZiB0aGUgc3RvcmUuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSB0aGlzLnN0b3JlIGFuZCB0aGlzLnBsYWluIChhbmQgb2xkIHJlZmVyZW5jZXMgdG8gdGhlbSB3aWxsIGJlIHN0YWxlISBBdm9pZCBzdG9yaW5nIHRoZW0gaW4gdmFyaWFibGVzKVxuICAgICAqXG4gICAgICogQWRkaXRpb25hbGx5LCBhbGwgZ2xvYmFsIGxpc3RlbmVycyAoYW5kIHRob3NlIGZvciBwYXRoVG9Ob3RpZnksIGlmIHNwZWNpZmllZCkgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbmV3IGRhdGFcbiAgICAgKiBAcGFyYW0gdmFsdWUgTmV3IGRhdGFcbiAgICAgKiBAcGFyYW0gcGF0aFRvTm90aWZ5IE9wdGlvbmFsIHBhdGggdG8gbm90aWZ5IGluc3RlYWQgb2YgZ2xvYmFsbHkuIFVzZWQgdG8gdHJhbnNmZXIgcGF0aCB2aWEgaXBjXG4gICAgICovXG4gICAgcHVibGljIHNldERhdGEodmFsdWU6IFQsIHBhdGhUb05vdGlmeT86IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5yZWFkT25seSkgdGhyb3cgbmV3IEVycm9yKFwiU2V0dGluZ3NTdG9yZSBpcyByZWFkLW9ubHlcIik7XG5cbiAgICAgICAgdGhpcy5wbGFpbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnN0b3JlID0gdGhpcy5tYWtlUHJveHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChwYXRoVG9Ob3RpZnkpIHtcbiAgICAgICAgICAgIGxldCB2ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBwYXRoVG9Ob3RpZnkuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIHBhdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgYFNldHRpbmdzI3NldERhdGE6IFBhdGggJHtwYXRoVG9Ob3RpZnl9IGRvZXMgbm90IGV4aXN0IGluIG5ldyBkYXRhLiBOb3QgZGlzcGF0Y2hpbmcgdXBkYXRlYFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYgPSB2W3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhdGhMaXN0ZW5lcnMuZ2V0KHBhdGhUb05vdGlmeSk/LmZvckVhY2goY2IgPT4gY2IodikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXJrQXNDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgZ2xvYmFsIGNoYW5nZSBsaXN0ZW5lciwgdGhhdCB3aWxsIGZpcmUgd2hlbmV2ZXIgYW55IHNldHRpbmcgaXMgY2hhbmdlZFxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIG5ldyBkYXRhLiBUaGlzIGlzIGVpdGhlciB0aGUgbmV3IHZhbHVlIHNldCBvbiB0aGUgcGF0aCwgb3IgdGhlIG5ldyByb290IG9iamVjdCBpZiBpdCB3YXMgY2hhbmdlZFxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBzZXR0aW5nIHRoYXQgd2FzIGNoYW5nZWQuIEVtcHR5IHN0cmluZyBpZiB0aGUgcm9vdCBvYmplY3Qgd2FzIGNoYW5nZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkR2xvYmFsQ2hhbmdlTGlzdGVuZXIoY2I6IChkYXRhOiBhbnksIHBhdGg6IHN0cmluZykgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmdsb2JhbExpc3RlbmVycy5hZGQoY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIHNjb3BlZCBjaGFuZ2UgbGlzdGVuZXIgdGhhdCB3aWxsIGZpcmUgd2hlbmV2ZXIgYSBzZXR0aW5nIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgcGF0aCBpcyBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogRm9yIGV4YW1wbGUgaWYgcGF0aCBpcyBgXCJmb28uYmFyXCJgLCB0aGUgbGlzdGVuZXIgd2lsbCBmaXJlIG9uXG4gICAgICogYGBganNcbiAgICAgKiBTZXR0aW5nLnN0b3JlLmZvby5iYXIgPSBcImhpXCJcbiAgICAgKiBgYGBcbiAgICAgKiBidXQgbm90IG9uXG4gICAgICogYGBganNcbiAgICAgKiBTZXR0aW5nLnN0b3JlLmZvby5iYXogPSBcImhpXCJcbiAgICAgKiBgYGBcbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRDaGFuZ2VMaXN0ZW5lcjxQIGV4dGVuZHMgTGl0ZXJhbFVuaW9uPGtleW9mIFQsIHN0cmluZz4+KFxuICAgICAgICBwYXRoOiBQLFxuICAgICAgICBjYjogKGRhdGE6IFJlc29sdmVQcm9wRGVlcDxULCBQPikgPT4gdm9pZFxuICAgICkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLnBhdGhMaXN0ZW5lcnMuZ2V0KHBhdGggYXMgc3RyaW5nKSA/PyBuZXcgU2V0KCk7XG4gICAgICAgIGxpc3RlbmVycy5hZGQoY2IpO1xuICAgICAgICB0aGlzLnBhdGhMaXN0ZW5lcnMuc2V0KHBhdGggYXMgc3RyaW5nLCBsaXN0ZW5lcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGdsb2JhbCBsaXN0ZW5lclxuICAgICAqIEBzZWUge0BsaW5rIGFkZEdsb2JhbENoYW5nZUxpc3RlbmVyfVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVHbG9iYWxDaGFuZ2VMaXN0ZW5lcihjYjogKGRhdGE6IGFueSwgcGF0aDogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzLmRlbGV0ZShjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgc2NvcGVkIGxpc3RlbmVyXG4gICAgICogQHNlZSB7QGxpbmsgYWRkQ2hhbmdlTGlzdGVuZXJ9XG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUNoYW5nZUxpc3RlbmVyKHBhdGg6IExpdGVyYWxVbmlvbjxrZXlvZiBULCBzdHJpbmc+LCBjYjogKGRhdGE6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLnBhdGhMaXN0ZW5lcnMuZ2V0KHBhdGggYXMgc3RyaW5nKTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGNiKTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMuc2l6ZSkgdGhpcy5wYXRoTGlzdGVuZXJzLmRlbGV0ZShwYXRoIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCBhbGwgZ2xvYmFsIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBwdWJsaWMgbWFya0FzQ2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxMaXN0ZW5lcnMuZm9yRWFjaChjYiA9PiBjYih0aGlzLnBsYWluLCBcIlwiKSk7XG4gICAgfVxufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIGRlZmF1bHRzIGludG8gYW4gb2JqZWN0IGFuZCByZXR1cm5zIHRoZSBzYW1lIG9iamVjdFxuICogQHBhcmFtIG9iaiBPYmplY3RcbiAqIEBwYXJhbSBkZWZhdWx0cyBEZWZhdWx0c1xuICogQHJldHVybnMgb2JqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZmF1bHRzPFQ+KG9iajogVCwgZGVmYXVsdHM6IFQpOiBUIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0cykge1xuICAgICAgICBjb25zdCB2ID0gZGVmYXVsdHNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA/Pz0ge30gYXMgYW55O1xuICAgICAgICAgICAgbWVyZ2VEZWZhdWx0cyhvYmpba2V5XSwgdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA/Pz0gdjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBjb25zdCBEQVRBX0RJUiA9IHByb2Nlc3MuZW52LlJJVkVSQ09SRF9VU0VSX0RBVEFfRElSID8/IChcbiAgICBwcm9jZXNzLmVudi5ESVNDT1JEX1VTRVJfREFUQV9ESVJcbiAgICAgICAgPyBqb2luKHByb2Nlc3MuZW52LkRJU0NPUkRfVVNFUl9EQVRBX0RJUiwgXCIuLlwiLCBcIlJpdmVyY29yZERhdGFcIilcbiAgICAgICAgOiBqb2luKGFwcC5nZXRQYXRoKFwidXNlckRhdGFcIiksIFwiLi5cIiwgXCJSaXZlcmNvcmRcIilcbik7XG5leHBvcnQgY29uc3QgU0VUVElOR1NfRElSID0gam9pbihEQVRBX0RJUiwgXCJzZXR0aW5nc1wiKTtcbmV4cG9ydCBjb25zdCBUSEVNRVNfRElSID0gam9pbihEQVRBX0RJUiwgXCJ0aGVtZXNcIik7XG5leHBvcnQgY29uc3QgUVVJQ0tDU1NfUEFUSCA9IGpvaW4oU0VUVElOR1NfRElSLCBcInF1aWNrQ3NzLmNzc1wiKTtcbmV4cG9ydCBjb25zdCBTRVRUSU5HU19GSUxFID0gam9pbihTRVRUSU5HU19ESVIsIFwic2V0dGluZ3MuanNvblwiKTtcbmV4cG9ydCBjb25zdCBOQVRJVkVfU0VUVElOR1NfRklMRSA9IGpvaW4oU0VUVElOR1NfRElSLCBcIm5hdGl2ZS1zZXR0aW5ncy5qc29uXCIpO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfUFJPVE9DT0xTID0gW1xuICAgIFwiaHR0cHM6XCIsXG4gICAgXCJodHRwOlwiLFxuICAgIFwic3RlYW06XCIsXG4gICAgXCJzcG90aWZ5OlwiLFxuICAgIFwiY29tLmVwaWNnYW1lcy5sYXVuY2hlcjpcIixcbiAgICBcInRpZGFsOlwiXG5dO1xuXG5leHBvcnQgY29uc3QgSVNfVkFOSUxMQSA9IC8qIEBfX1BVUkVfXyAqLyBwcm9jZXNzLmFyZ3YuaW5jbHVkZXMoXCItLXZhbmlsbGFcIik7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgUmVuZGVyZXJTZXR0aW5ncyB9IGZyb20gXCJAbWFpbi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbmFwcC5vbihcImJyb3dzZXItd2luZG93LWNyZWF0ZWRcIiwgKF8sIHdpbikgPT4ge1xuICAgIHdpbi53ZWJDb250ZW50cy5vbihcImZyYW1lLWNyZWF0ZWRcIiwgKF8sIHsgZnJhbWUgfSkgPT4ge1xuICAgICAgICBmcmFtZS5vbmNlKFwiZG9tLXJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChmcmFtZS51cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL1wiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gUmVuZGVyZXJTZXR0aW5ncy5zdG9yZS5wbHVnaW5zPy5GaXhZb3V0dWJlRW1iZWRzO1xuICAgICAgICAgICAgICAgIGlmICghc2V0dGluZ3M/LmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGZyYW1lLmV4ZWN1dGVKYXZhU2NyaXB0KGBcbiAgICAgICAgICAgICAgICBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lnl0cC1lcnJvci1jb250ZW50LXdyYXAtc3VicmVhc29uIGFbaHJlZio9XCJ3d3cueW91dHViZS5jb20vd2F0Y2g/dj1cIl0nKVxuICAgICAgICAgICAgICAgICAgICApIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgICAgICAgICAgfSkub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTp0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IENoaWxkUHJvY2Vzc1dpdGhvdXROdWxsU3RyZWFtcywgZXhlY0ZpbGVTeW5jLCBzcGF3biB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IG9zIGZyb20gXCJvc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxudHlwZSBGb3JtYXQgPSBcInZpZGVvXCIgfCBcImF1ZGlvXCIgfCBcImdpZlwiO1xudHlwZSBEb3dubG9hZE9wdGlvbnMgPSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgZm9ybWF0PzogRm9ybWF0O1xuICAgIGdpZlF1YWxpdHk/OiAxIHwgMiB8IDMgfCA0IHwgNTtcbiAgICB5dGRscEFyZ3M/OiBzdHJpbmdbXTtcbiAgICBmZm1wZWdBcmdzPzogc3RyaW5nW107XG4gICAgbWF4RmlsZVNpemU/OiBudW1iZXI7XG59O1xuXG5sZXQgd29ya2Rpcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5sZXQgc3Rkb3V0X2dsb2JhbDogc3RyaW5nID0gXCJcIjtcbmxldCBsb2dzX2dsb2JhbDogc3RyaW5nID0gXCJcIjtcblxubGV0IHl0ZGxwQXZhaWxhYmxlID0gZmFsc2U7XG5sZXQgZmZtcGVnQXZhaWxhYmxlID0gZmFsc2U7XG5cbmxldCB5dGRscFByb2Nlc3M6IENoaWxkUHJvY2Vzc1dpdGhvdXROdWxsU3RyZWFtcyB8IG51bGwgPSBudWxsO1xubGV0IGZmbXBlZ1Byb2Nlc3M6IENoaWxkUHJvY2Vzc1dpdGhvdXROdWxsU3RyZWFtcyB8IG51bGwgPSBudWxsO1xuXG5jb25zdCBnZXRkaXIgPSAoKSA9PiB3b3JrZGlyID8/IHByb2Nlc3MuY3dkKCk7XG5jb25zdCBwID0gKGZpbGU6IHN0cmluZykgPT4gcGF0aC5qb2luKGdldGRpcigpLCBmaWxlKTtcbmNvbnN0IGNsZWFuVmlkZW9GaWxlcyA9ICgpID0+IHtcbiAgICBpZiAoIXdvcmtkaXIpIHJldHVybjtcbiAgICBmcy5yZWFkZGlyU3luYyh3b3JrZGlyKVxuICAgICAgICAuZmlsdGVyKGYgPT4gZi5zdGFydHNXaXRoKFwiZG93bmxvYWQuXCIpIHx8IGYuc3RhcnRzV2l0aChcInJlbXV4LlwiKSlcbiAgICAgICAgLmZvckVhY2goZiA9PiBmcy51bmxpbmtTeW5jKHAoZikpKTtcbn07XG5jb25zdCBhcHBlbmRPdXQgPSAoZGF0YTogc3RyaW5nKSA9PiAoIC8vIE1ha2VzIGNhcnJpYWdlIHJldHVybiAoXFxyKSB3b3JrXG4gICAgKHN0ZG91dF9nbG9iYWwgKz0gZGF0YSksIChzdGRvdXRfZ2xvYmFsID0gc3Rkb3V0X2dsb2JhbC5yZXBsYWNlKC9eLipcXHIoW15cXG5dKS9nbSwgXCIkMVwiKSkpO1xuY29uc3QgbG9nID0gKC4uLmRhdGE6IHN0cmluZ1tdKSA9PiAoY29uc29sZS5sb2coYFtQbHVnaW46TWVkaWFEb3dubG9hZGVyXSAke2RhdGEuam9pbihcIiBcIil9YCksIGxvZ3NfZ2xvYmFsICs9IGBbUGx1Z2luOk1lZGlhRG93bmxvYWRlcl0gJHtkYXRhLmpvaW4oXCIgXCIpfVxcbmApO1xuY29uc3QgZXJyb3IgPSAoLi4uZGF0YTogc3RyaW5nW10pID0+IGNvbnNvbGUuZXJyb3IoYFtQbHVnaW46TWVkaWFEb3dubG9hZGVyXSBbRVJST1JdICR7ZGF0YS5qb2luKFwiIFwiKX1gKTtcblxuZnVuY3Rpb24geXRkbHAoYXJnczogc3RyaW5nW10pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxvZyhgRXhlY3V0aW5nIHl0LWRscCB3aXRoIGFyZ3M6IFtcIiR7YXJncy5tYXAoYSA9PiBhLnJlcGxhY2UoJ1wiJywgJ1xcXFxcIicpKS5qb2luKCdcIiwgXCInKX1cIl1gKTtcbiAgICBsZXQgZXJyb3JNc2cgPSBcIlwiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB5dGRscFByb2Nlc3MgPSBzcGF3bihcInl0LWRscFwiLCBhcmdzLCB7XG4gICAgICAgICAgICBjd2Q6IGdldGRpcigpLFxuICAgICAgICB9KTtcblxuICAgICAgICB5dGRscFByb2Nlc3Muc3Rkb3V0Lm9uKFwiZGF0YVwiLCBkYXRhID0+IGFwcGVuZE91dChkYXRhKSk7XG4gICAgICAgIHl0ZGxwUHJvY2Vzcy5zdGRlcnIub24oXCJkYXRhXCIsIGRhdGEgPT4ge1xuICAgICAgICAgICAgYXBwZW5kT3V0KGRhdGEpO1xuICAgICAgICAgICAgZXJyb3IoYHl0LWRscCBlbmNvdW50ZXJlZCBhbiBlcnJvcjogJHtkYXRhfWApO1xuICAgICAgICAgICAgZXJyb3JNc2cgKz0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIHl0ZGxwUHJvY2Vzcy5vbihcImV4aXRcIiwgY29kZSA9PiB7XG4gICAgICAgICAgICB5dGRscFByb2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgY29kZSA9PT0gMCA/IHJlc29sdmUoc3Rkb3V0X2dsb2JhbCkgOiByZWplY3QobmV3IEVycm9yKGVycm9yTXNnIHx8IGB5dC1kbHAgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZmbXBlZyhhcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbG9nKGBFeGVjdXRpbmcgZmZtcGVnIHdpdGggYXJnczogW1wiJHthcmdzLm1hcChhID0+IGEucmVwbGFjZSgnXCInLCAnXFxcXFwiJykpLmpvaW4oJ1wiLCBcIicpfVwiXWApO1xuICAgIGxldCBlcnJvck1zZyA9IFwiXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZmbXBlZ1Byb2Nlc3MgPSBzcGF3bihcImZmbXBlZ1wiLCBhcmdzLCB7XG4gICAgICAgICAgICBjd2Q6IGdldGRpcigpLFxuICAgICAgICB9KTtcblxuICAgICAgICBmZm1wZWdQcm9jZXNzLnN0ZG91dC5vbihcImRhdGFcIiwgZGF0YSA9PiBhcHBlbmRPdXQoZGF0YSkpO1xuICAgICAgICBmZm1wZWdQcm9jZXNzLnN0ZGVyci5vbihcImRhdGFcIiwgZGF0YSA9PiB7XG4gICAgICAgICAgICBhcHBlbmRPdXQoZGF0YSk7XG4gICAgICAgICAgICBlcnJvcihgZmZtcGVnIGVuY291bnRlcmVkIGFuIGVycm9yOiAke2RhdGF9YCk7XG4gICAgICAgICAgICBlcnJvck1zZyArPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgZmZtcGVnUHJvY2Vzcy5vbihcImV4aXRcIiwgY29kZSA9PiB7XG4gICAgICAgICAgICBmZm1wZWdQcm9jZXNzID0gbnVsbDtcbiAgICAgICAgICAgIGNvZGUgPT09IDAgPyByZXNvbHZlKHN0ZG91dF9nbG9iYWwpIDogcmVqZWN0KG5ldyBFcnJvcihlcnJvck1zZyB8fCBgZmZtcGVnIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0KF86IElwY01haW5JbnZva2VFdmVudCwgX3dvcmtkaXI6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIF93b3JrZGlyIHx8PSBmcy5ta2R0ZW1wU3luYyhwYXRoLmpvaW4ob3MudG1wZGlyKCksIFwidmVuY29yZF9tZWRpYURvd25sb2FkZXJfXCIpKTtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoX3dvcmtkaXIpKSBmcy5ta2RpclN5bmMoX3dvcmtkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHdvcmtkaXIgPSBfd29ya2RpcjtcbiAgICBsb2coXCJVc2luZyB3b3JrZGlyOiBcIiwgd29ya2Rpcik7XG4gICAgcmV0dXJuIHdvcmtkaXI7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RvcChfOiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBpZiAod29ya2Rpcikge1xuICAgICAgICBsb2coXCJDbGVhbmluZyB1cCB3b3JrZGlyXCIpO1xuICAgICAgICBmcy5ybVN5bmMod29ya2RpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIHdvcmtkaXIgPSBudWxsO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWV0YWRhdGEob3B0aW9uczogRG93bmxvYWRPcHRpb25zKSB7XG4gICAgc3Rkb3V0X2dsb2JhbCA9IFwiXCI7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBKU09OLnBhcnNlKGF3YWl0IHl0ZGxwKFtcIi1KXCIsIG9wdGlvbnMudXJsLCBcIi0tbm8td2FybmluZ3NcIl0pKTtcbiAgICBpZiAobWV0YWRhdGEuaXNfbGl2ZSkgdGhyb3cgXCJMaXZlIHN0cmVhbXMgYXJlIG5vdCBzdXBwb3J0ZWQuXCI7XG4gICAgc3Rkb3V0X2dsb2JhbCA9IFwiXCI7XG4gICAgcmV0dXJuIHsgdmlkZW9UaXRsZTogYCR7bWV0YWRhdGEudGl0bGUgfHwgXCJ2aWRlb1wifSAoJHttZXRhZGF0YS5pZH0pYCB9O1xufVxuZnVuY3Rpb24gZ2VuRm9ybWF0KHsgdmlkZW9UaXRsZSB9OiB7IHZpZGVvVGl0bGU6IHN0cmluZzsgfSwgeyBtYXhGaWxlU2l6ZSwgZm9ybWF0IH06IERvd25sb2FkT3B0aW9ucykge1xuICAgIGNvbnN0IEhBU19MSU1JVCA9ICEhbWF4RmlsZVNpemU7XG4gICAgY29uc3QgTUFYX1ZJREVPX1NJWkUgPSBIQVNfTElNSVQgPyBtYXhGaWxlU2l6ZSAqIDAuOCA6IDA7XG4gICAgY29uc3QgTUFYX0FVRElPX1NJWkUgPSBIQVNfTElNSVQgPyBtYXhGaWxlU2l6ZSAqIDAuMiA6IDA7XG5cbiAgICBjb25zdCBhdWRpbyA9IHtcbiAgICAgICAgbm9GZm1wZWc6IFwiYmFbZXh0PW1wM117VE9UX1NJWkV9L3dhW2V4dD1tcDNde1RPVF9TSVpFfVwiLFxuICAgICAgICBmZm1wZWc6IFwiYmEqe1RPVF9TSVpFfS9iYXtUT1RfU0laRX0vd2Eqe1RPVF9TSVpFfS9iYSpcIlxuICAgIH07XG4gICAgY29uc3QgdmlkZW8gPSB7XG4gICAgICAgIG5vRmZtcGVnOiBcImJ7VE9UX1NJWkV9e0hFSUdIVH1bZXh0PXdlYm1dL2J7VE9UX1NJWkV9e0hFSUdIVH1bZXh0PW1wNF0vd3tIRUlHSFR9e1RPVF9TSVpFfVwiLFxuICAgICAgICBmZm1wZWc6IFwiYip7VklEX1NJWkV9e0hFSUdIVH0rYmF7QVVEX1NJWkV9L2J7VE9UX1NJWkV9e0hFSUdIVH0vYip7SEVJR0hUfStiYVwiLFxuICAgIH07XG4gICAgY29uc3QgZ2lmID0ge1xuICAgICAgICBmZm1wZWc6IFwiYnZ7VE9UX1NJWkV9L3d2e1RPVF9TSVpFfVwiXG4gICAgfTtcblxuICAgIGxldCBmb3JtYXRfZ3JvdXA6IHsgbm9GZm1wZWc/OiBzdHJpbmc7IGZmbXBlZzogc3RyaW5nOyB9O1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgXCJhdWRpb1wiOlxuICAgICAgICAgICAgZm9ybWF0X2dyb3VwID0gYXVkaW87XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImdpZlwiOlxuICAgICAgICAgICAgZm9ybWF0X2dyb3VwID0gZ2lmO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZm9ybWF0X2dyb3VwID0gdmlkZW87XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtYXRfc3RyaW5nID0gKGZmbXBlZ0F2YWlsYWJsZSA/IGZvcm1hdF9ncm91cC5mZm1wZWcgOiBmb3JtYXRfZ3JvdXAubm9GZm1wZWcpXG4gICAgICAgID8ucmVwbGFjZUFsbChcIntUT1RfU0laRX1cIiwgSEFTX0xJTUlUID8gYFtmaWxlc2l6ZTwke21heEZpbGVTaXplfV1gIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJ7VklEX1NJWkV9XCIsIEhBU19MSU1JVCA/IGBbZmlsZXNpemU8JHtNQVhfVklERU9fU0laRX1dYCA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlQWxsKFwie0FVRF9TSVpFfVwiLCBIQVNfTElNSVQgPyBgW2ZpbGVzaXplPCR7TUFYX0FVRElPX1NJWkV9XWAgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZUFsbChcIntIRUlHSFR9XCIsIFwiW2hlaWdodDw9MTA4MF1cIik7XG4gICAgaWYgKCFmb3JtYXRfc3RyaW5nKSB0aHJvdyBcIkdpZiBmb3JtYXQgaXMgb25seSBzdXBwb3J0ZWQgd2l0aCBmZm1wZWcuXCI7XG4gICAgbG9nKFwiVmlkZW8gZm9ybWF0ZWQgY2FsY3VsYXRlZCBhcyBcIiwgZm9ybWF0X3N0cmluZyk7XG4gICAgbG9nKGBCYXNlZCBvbjogZm9ybWF0PSR7Zm9ybWF0fSwgbWF4RmlsZVNpemU9JHttYXhGaWxlU2l6ZX0sIGZmbXBlZ0F2YWlsYWJsZT0ke2ZmbXBlZ0F2YWlsYWJsZX1gKTtcbiAgICByZXR1cm4geyBmb3JtYXQ6IGZvcm1hdF9zdHJpbmcsIHZpZGVvVGl0bGUgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkKHsgZm9ybWF0LCB2aWRlb1RpdGxlIH06IHsgZm9ybWF0OiBzdHJpbmc7IHZpZGVvVGl0bGU6IHN0cmluZzsgfSwgeyB5dGRscEFyZ3MsIHVybCwgZm9ybWF0OiB1c3JGb3JtYXQgfTogRG93bmxvYWRPcHRpb25zKSB7XG4gICAgY2xlYW5WaWRlb0ZpbGVzKCk7XG4gICAgY29uc3QgYmFzZUFyZ3MgPSBbXCItZlwiLCBmb3JtYXQsIFwiLW9cIiwgXCJkb3dubG9hZC4lKGV4dClzXCIsIFwiLS1mb3JjZS1vdmVyd3JpdGVzXCIsIFwiLUlcIiwgXCIxXCJdO1xuICAgIGNvbnN0IHJlbXV4QXJncyA9IGZmbXBlZ0F2YWlsYWJsZVxuICAgICAgICA/IHVzckZvcm1hdCA9PT0gXCJ2aWRlb1wiXG4gICAgICAgICAgICA/IFtcIi0tcmVtdXgtdmlkZW9cIiwgXCJ3ZWJtPndlYm0vbXA0XCJdXG4gICAgICAgICAgICA6IHVzckZvcm1hdCA9PT0gXCJhdWRpb1wiXG4gICAgICAgICAgICAgICAgPyBbXCItLWV4dHJhY3QtYXVkaW9cIiwgXCItLWF1ZGlvLWZvcm1hdFwiLCBcIm1wM1wiXVxuICAgICAgICAgICAgICAgIDogW11cbiAgICAgICAgOiBbXTtcbiAgICBjb25zdCBjdXN0b21BcmdzID0geXRkbHBBcmdzPy5maWx0ZXIoQm9vbGVhbikgfHwgW107XG5cbiAgICBhd2FpdCB5dGRscChbdXJsLCAuLi5iYXNlQXJncywgLi4ucmVtdXhBcmdzLCAuLi5jdXN0b21BcmdzXSk7XG4gICAgY29uc3QgZmlsZSA9IGZzLnJlYWRkaXJTeW5jKGdldGRpcigpKS5maW5kKGYgPT4gZi5zdGFydHNXaXRoKFwiZG93bmxvYWQuXCIpKTtcbiAgICBpZiAoIWZpbGUpIHRocm93IFwiTm8gdmlkZW8gZmlsZSB3YXMgZm91bmQhXCI7XG4gICAgcmV0dXJuIHsgZmlsZSwgdmlkZW9UaXRsZSB9O1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtdXgoeyBmaWxlLCB2aWRlb1RpdGxlIH06IHsgZmlsZTogc3RyaW5nOyB2aWRlb1RpdGxlOiBzdHJpbmc7IH0sIHsgZmZtcGVnQXJncywgZm9ybWF0LCBtYXhGaWxlU2l6ZSwgZ2lmUXVhbGl0eSB9OiBEb3dubG9hZE9wdGlvbnMpIHtcbiAgICBjb25zdCBzb3VyY2VFeHRlbnNpb24gPSBmaWxlLnNwbGl0KFwiLlwiKS5wb3AoKTtcbiAgICBpZiAoIWZmbXBlZ0F2YWlsYWJsZSkgcmV0dXJuIGxvZyhcIlNraXBwaW5nIHJlbXV4LCBmZm1wZWcgaXMgdW5hdmFpbGFibGUuXCIpLCB7IGZpbGUsIHZpZGVvVGl0bGUsIGV4dGVuc2lvbjogc291cmNlRXh0ZW5zaW9uIH07XG5cbiAgICAvLyBXZSBvbmx5IHJlYWxseSBuZWVkIHRvIHJlbXV4IGlmXG4gICAgLy8gMS4gVGhlIGZpbGUgaXMgdG9vIGJpZ1xuICAgIC8vIDIuIFRoZSBmaWxlIGlzIGluIGEgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgYnkgZGlzY29yZFxuICAgIC8vIDMuIFRoZSB1c2VyIHByb3ZpZGVkIGN1c3RvbSBmZm1wZWcgYXJndW1lbnRzXG4gICAgLy8gNC4gVGhlIHRhcmdldCBmb3JtYXQgaXMgZ2lmXG4gICAgY29uc3QgYWNjZXB0YWJsZUZvcm1hdHMgPSBbXCJtcDNcIiwgXCJtcDRcIiwgXCJ3ZWJtXCJdO1xuICAgIGNvbnN0IGZpbGVTaXplID0gZnMuc3RhdFN5bmMocChmaWxlKSkuc2l6ZTtcbiAgICBjb25zdCBjdXN0b21BcmdzID0gZmZtcGVnQXJncz8uZmlsdGVyKEJvb2xlYW4pIHx8IFtdO1xuXG4gICAgY29uc3QgaXNGb3JtYXRBY2NlcHRhYmxlID0gYWNjZXB0YWJsZUZvcm1hdHMuaW5jbHVkZXMoc291cmNlRXh0ZW5zaW9uID8/IFwiXCIpO1xuICAgIGNvbnN0IGlzRmlsZVNpemVBY2NlcHRhYmxlID0gKCFtYXhGaWxlU2l6ZSB8fCBmaWxlU2l6ZSA8PSBtYXhGaWxlU2l6ZSk7XG4gICAgY29uc3QgaGFzQ3VzdG9tQXJncyA9IGN1c3RvbUFyZ3MubGVuZ3RoID4gMDtcbiAgICBjb25zdCBpc0dpZiA9IGZvcm1hdCA9PT0gXCJnaWZcIjtcbiAgICBpZiAoaXNGb3JtYXRBY2NlcHRhYmxlICYmIGlzRmlsZVNpemVBY2NlcHRhYmxlICYmICFoYXNDdXN0b21BcmdzICYmICFpc0dpZilcbiAgICAgICAgcmV0dXJuIGxvZyhcIlNraXBwaW5nIHJlbXV4LCBmaWxlIHR5cGUgYW5kIHNpemUgYXJlIGdvb2QsIGFuZCBubyBmZm1wZWcgYXJndW1lbnRzIHdlcmUgc3BlY2lmaWVkLlwiKSwgeyBmaWxlLCB2aWRlb1RpdGxlLCBleHRlbnNpb246IHNvdXJjZUV4dGVuc2lvbiB9O1xuXG4gICAgY29uc3QgZHVyYXRpb24gPSBwYXJzZUZsb2F0KGV4ZWNGaWxlU3luYyhcImZmcHJvYmVcIiwgW1wiLXZcIiwgXCJlcnJvclwiLCBcIi1zaG93X2VudHJpZXNcIiwgXCJmb3JtYXQ9ZHVyYXRpb25cIiwgXCItb2ZcIiwgXCJkZWZhdWx0PW5vcHJpbnRfd3JhcHBlcnM9MTpub2tleT0xXCIsIHAoZmlsZSldKS50b1N0cmluZygpKTtcbiAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB0aHJvdyBcIkZhaWxlZCB0byBnZXQgdmlkZW8gZHVyYXRpb24uXCI7XG4gICAgLy8gZmZtcGVnIHRlbmRzIHRvIGdvIGFib3ZlIHRoZSB0YXJnZXQgc2l6ZSwgc28gSSdtIHNldHRpbmcgaXQgdG8gNy84XG4gICAgY29uc3QgdGFyZ2V0Qml0cyA9IG1heEZpbGVTaXplID8gKG1heEZpbGVTaXplICogNykgLyBkdXJhdGlvbiA6IDk5OTk5OTk7XG4gICAgY29uc3Qga2lsb2JpdHMgPSB+fih0YXJnZXRCaXRzIC8gMTAyNCk7XG5cbiAgICBsZXQgYmFzZUFyZ3M6IHN0cmluZ1tdO1xuICAgIGxldCBleHQ6IHN0cmluZztcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICBjYXNlIFwiYXVkaW9cIjpcbiAgICAgICAgICAgIGJhc2VBcmdzID0gW1wiLWlcIiwgcChmaWxlKSwgXCItYjphXCIsIGAke2tpbG9iaXRzfWtgLCBcIi1tYXhyYXRlXCIsIGAke2tpbG9iaXRzfWtgLCBcIi1idWZzaXplXCIsIFwiMU1cIiwgXCIteVwiXTtcbiAgICAgICAgICAgIGV4dCA9IFwibXAzXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInZpZGVvXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBEeW5hbWljYWxseSByZXNpemUgYmFzZWQgb24gdGFyZ2V0IGJpdHJhdGVcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGtpbG9iaXRzIDw9IDEwMCA/IDQ4MCA6IGtpbG9iaXRzIDw9IDUwMCA/IDcyMCA6IDEwODA7XG4gICAgICAgICAgICBiYXNlQXJncyA9IFtcIi1pXCIsIHAoZmlsZSksIFwiLWI6dlwiLCBgJHt+fihraWxvYml0cyAqIDAuOCl9a2AsIFwiLWI6YVwiLCBgJHt+fihraWxvYml0cyAqIDAuMil9a2AsIFwiLW1heHJhdGVcIiwgYCR7a2lsb2JpdHN9a2AsIFwiLWJ1ZnNpemVcIiwgXCIxTVwiLCBcIi15XCIsIFwiLWZpbHRlcjp2XCIsIGBzY2FsZT0tMToke2hlaWdodH1gXTtcbiAgICAgICAgICAgIGV4dCA9IFwibXA0XCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImdpZlwiOlxuICAgICAgICAgICAgbGV0IGZwczogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBjb2xvcnM6IG51bWJlciwgYmF5ZXJfc2NhbGU6IG51bWJlcjtcbiAgICAgICAgICAgIC8vIFdBUk5JTkc6IHRoZXNlIHBhcmFtZXRlcnMgaGF2ZSBiZWVuIGFyYml0cmFyaWx5IGNob3Nlbiwgb3B0aW1pemF0aW9uIGlzIHdlbGNvbWUhXG4gICAgICAgICAgICBzd2l0Y2ggKGdpZlF1YWxpdHkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGZwcyA9IDUsIHdpZHRoID0gMzYwLCBjb2xvcnMgPSAyNCwgYmF5ZXJfc2NhbGUgPSA1O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGZwcyA9IDEwLCB3aWR0aCA9IDQyMCwgY29sb3JzID0gMzIsIGJheWVyX3NjYWxlID0gNTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGZwcyA9IDE1LCB3aWR0aCA9IDQ4MCwgY29sb3JzID0gNjQsIGJheWVyX3NjYWxlID0gNDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSAyMCwgd2lkdGggPSA1NDAsIGNvbG9ycyA9IDY0LCBiYXllcl9zY2FsZSA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgZnBzID0gMzAsIHdpZHRoID0gNzIwLCBjb2xvcnMgPSAxMjgsIGJheWVyX3NjYWxlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJhc2VBcmdzID0gW1wiLWlcIiwgcChmaWxlKSwgXCItdmZcIiwgYGZwcz0ke2Zwc30sc2NhbGU9dz0ke3dpZHRofTpoPS0xOmZsYWdzPWxhbmN6b3MsbXBkZWNpbWF0ZSxzcGxpdFtzMF1bczFdO1tzMF1wYWxldHRlZ2VuPW1heF9jb2xvcnM9JHtjb2xvcnN9W3BdO1tzMV1bcF1wYWxldHRldXNlPWRpdGhlcj1iYXllcjpiYXllcl9zY2FsZT0ke2JheWVyX3NjYWxlfWAsIFwiLWxvb3BcIiwgXCIwXCIsIFwiLWJ1ZnNpemVcIiwgXCIxTVwiLCBcIi15XCJdO1xuICAgICAgICAgICAgZXh0ID0gXCJnaWZcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGF3YWl0IGZmbXBlZyhbLi4uYmFzZUFyZ3MsIC4uLmN1c3RvbUFyZ3MsIGByZW11eC4ke2V4dH1gXSk7XG4gICAgcmV0dXJuIHsgZmlsZTogYHJlbXV4LiR7ZXh0fWAsIHZpZGVvVGl0bGUsIGV4dGVuc2lvbjogZXh0IH07XG59XG5mdW5jdGlvbiB1cGxvYWQoeyBmaWxlLCB2aWRlb1RpdGxlLCBleHRlbnNpb24gfTogeyBmaWxlOiBzdHJpbmc7IHZpZGVvVGl0bGU6IHN0cmluZzsgZXh0ZW5zaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7IH0pIHtcbiAgICBpZiAoIWV4dGVuc2lvbikgdGhyb3cgXCJJbnZhbGlkIGV4dGVuc2lvbi5cIjtcbiAgICBjb25zdCBidWZmZXIgPSBmcy5yZWFkRmlsZVN5bmMocChmaWxlKSk7XG4gICAgcmV0dXJuIHsgYnVmZmVyLCB0aXRsZTogYCR7dmlkZW9UaXRsZX0uJHtleHRlbnNpb259YCB9O1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGUoXG4gICAgXzogSXBjTWFpbkludm9rZUV2ZW50LFxuICAgIG9wdDogRG93bmxvYWRPcHRpb25zXG4pOiBQcm9taXNlPHtcbiAgICBidWZmZXI6IEJ1ZmZlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGxvZ3M6IHN0cmluZztcbn0gfCB7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBsb2dzOiBzdHJpbmc7XG59PiB7XG4gICAgbG9nc19nbG9iYWwgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHZpZGVvTWV0YWRhdGEgPSBhd2FpdCBtZXRhZGF0YShvcHQpO1xuICAgICAgICBjb25zdCB2aWRlb0Zvcm1hdCA9IGdlbkZvcm1hdCh2aWRlb01ldGFkYXRhLCBvcHQpO1xuICAgICAgICBjb25zdCB2aWRlb0Rvd25sb2FkID0gYXdhaXQgZG93bmxvYWQodmlkZW9Gb3JtYXQsIG9wdCk7XG4gICAgICAgIGNvbnN0IHZpZGVvUmVtdXggPSBhd2FpdCByZW11eCh2aWRlb0Rvd25sb2FkLCBvcHQpO1xuICAgICAgICBjb25zdCB2aWRlb1VwbG9hZCA9IHVwbG9hZCh2aWRlb1JlbXV4KTtcbiAgICAgICAgcmV0dXJuIHsgbG9nczogbG9nc19nbG9iYWwsIC4uLnZpZGVvVXBsb2FkIH07XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBlLnRvU3RyaW5nKCksIGxvZ3M6IGxvZ3NfZ2xvYmFsIH07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tmZm1wZWcoXz86IElwY01haW5JbnZva2VFdmVudCkge1xuICAgIHRyeSB7XG4gICAgICAgIGV4ZWNGaWxlU3luYyhcImZmbXBlZ1wiLCBbXCItdmVyc2lvblwiXSk7XG4gICAgICAgIGV4ZWNGaWxlU3luYyhcImZmcHJvYmVcIiwgW1wiLXZlcnNpb25cIl0pO1xuICAgICAgICBmZm1wZWdBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGZmbXBlZ0F2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNreXRkbHAoXz86IElwY01haW5JbnZva2VFdmVudCkge1xuICAgIHRyeSB7XG4gICAgICAgIGV4ZWNGaWxlU3luYyhcInl0LWRscFwiLCBbXCItLXZlcnNpb25cIl0pO1xuICAgICAgICB5dGRscEF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgeXRkbHBBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGludGVycnVwdChfOiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBsb2coXCJJbnRlcnJ1cHRpbmcuLi5cIik7XG4gICAgeXRkbHBQcm9jZXNzPy5raWxsKCk7XG4gICAgZmZtcGVnUHJvY2Vzcz8ua2lsbCgpO1xuICAgIGNsZWFuVmlkZW9GaWxlcygpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U3Rkb3V0ID0gKCkgPT4gc3Rkb3V0X2dsb2JhbDtcbmV4cG9ydCBjb25zdCBpc1l0ZGxwQXZhaWxhYmxlID0gKCkgPT4geXRkbHBBdmFpbGFibGU7XG5leHBvcnQgY29uc3QgaXNGZm1wZWdBdmFpbGFibGUgPSAoKSA9PiBmZm1wZWdBdmFpbGFibGU7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgcmVhZGRpciwgcmVhZEZpbGUsIHVubGluaywgd3JpdGVGaWxlIH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiQHV0aWxzL1F1ZXVlXCI7XG5pbXBvcnQgeyBkaWFsb2csIElwY01haW5JbnZva2VFdmVudCwgc2hlbGwgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuaW1wb3J0IHsgREFUQV9ESVIgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldFNldHRpbmdzLCBzYXZlU2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgZW5zdXJlRGlyZWN0b3J5RXhpc3RzLCBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgeyBnZXRTZXR0aW5ncyB9O1xuXG4vLyBzbyB3ZSBjYW4gZmlsdGVyIHRoZSBuYXRpdmUgaGVscGVycyBieSB0aGlzIGtleVxuZXhwb3J0IGZ1bmN0aW9uIG1lc3NhZ2VMb2dnZXJFbmhhbmNlZFVuaXF1ZUlkVGhpbmd5SWRrTWFuKCkgeyB9XG5cbi8vIE1hcDxhdHRhY2htZXRJZCwgcGF0aD4oKVxuY29uc3QgbmF0aXZlU2F2ZWRJbWFnZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuZXhwb3J0IGNvbnN0IGdldE5hdGl2ZVNhdmVkSW1hZ2VzID0gKCkgPT4gbmF0aXZlU2F2ZWRJbWFnZXM7XG5cbmxldCBsb2dzRGlyOiBzdHJpbmc7XG5sZXQgaW1hZ2VDYWNoZURpcjogc3RyaW5nO1xuXG5jb25zdCBnZXRJbWFnZUNhY2hlRGlyID0gYXN5bmMgKCkgPT4gaW1hZ2VDYWNoZURpciA/PyBhd2FpdCBnZXREZWZhdWx0TmF0aXZlSW1hZ2VEaXIoKTtcbmNvbnN0IGdldExvZ3NEaXIgPSBhc3luYyAoKSA9PiBsb2dzRGlyID8/IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdERpcnMoKSB7XG4gICAgY29uc3QgeyBsb2dzRGlyOiBsZCwgaW1hZ2VDYWNoZURpcjogaWNkIH0gPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xuXG4gICAgbG9nc0RpciA9IGxkIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG4gICAgaW1hZ2VDYWNoZURpciA9IGljZCB8fCBhd2FpdCBnZXREZWZhdWx0TmF0aXZlSW1hZ2VEaXIoKTtcbn1cbmluaXREaXJzKCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KF9ldmVudDogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgY29uc3QgaW1hZ2VEaXIgPSBhd2FpdCBnZXRJbWFnZUNhY2hlRGlyKCk7XG5cbiAgICBhd2FpdCBlbnN1cmVEaXJlY3RvcnlFeGlzdHMoaW1hZ2VEaXIpO1xuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgcmVhZGRpcihpbWFnZURpcik7XG4gICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlcykge1xuICAgICAgICBjb25zdCBhdHRhY2htZW50SWQgPSBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWUpO1xuICAgICAgICBuYXRpdmVTYXZlZEltYWdlcy5zZXQoYXR0YWNobWVudElkLCBwYXRoLmpvaW4oaW1hZ2VEaXIsIGZpbGVuYW1lKSk7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW1hZ2VOYXRpdmUoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGF0dGFjaG1lbnRJZDogc3RyaW5nKTogUHJvbWlzZTxVaW50OEFycmF5IHwgQnVmZmVyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGltYWdlUGF0aCA9IG5hdGl2ZVNhdmVkSW1hZ2VzLmdldChhdHRhY2htZW50SWQpO1xuICAgIGlmICghaW1hZ2VQYXRoKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gYXdhaXQgcmVhZEZpbGUoaW1hZ2VQYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlSW1hZ2VOYXRpdmUoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IFVpbnQ4QXJyYXkpIHtcbiAgICBpZiAoIWZpbGVuYW1lIHx8ICFjb250ZW50KSByZXR1cm47XG4gICAgY29uc3QgaW1hZ2VEaXIgPSBhd2FpdCBnZXRJbWFnZUNhY2hlRGlyKCk7XG5cbiAgICAvLyByZXR1cm5zIHRoZSBmaWxlIG5hbWVcbiAgICAvLyAuLi8uLi9zb21lTWFsaWNvdXNQYXRoLnBuZyAtPiBzb21lTWFsaWNvdXNQYXRoXG4gICAgY29uc3QgYXR0YWNobWVudElkID0gZ2V0QXR0YWNobWVudElkRnJvbUZpbGVuYW1lKGZpbGVuYW1lKTtcblxuICAgIGNvbnN0IGV4aXN0aW5nSW1hZ2UgPSBuYXRpdmVTYXZlZEltYWdlcy5nZXQoYXR0YWNobWVudElkKTtcbiAgICBpZiAoZXhpc3RpbmdJbWFnZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgaW1hZ2VQYXRoID0gcGF0aC5qb2luKGltYWdlRGlyLCBmaWxlbmFtZSk7XG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKGltYWdlRGlyKTtcbiAgICBhd2FpdCB3cml0ZUZpbGUoaW1hZ2VQYXRoLCBjb250ZW50KTtcblxuICAgIG5hdGl2ZVNhdmVkSW1hZ2VzLnNldChhdHRhY2htZW50SWQsIGltYWdlUGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVGaWxlTmF0aXZlKF9ldmVudDogSXBjTWFpbkludm9rZUV2ZW50LCBhdHRhY2htZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGltYWdlUGF0aCA9IG5hdGl2ZVNhdmVkSW1hZ2VzLmdldChhdHRhY2htZW50SWQpO1xuICAgIGlmICghaW1hZ2VQYXRoKSByZXR1cm47XG5cbiAgICBhd2FpdCB1bmxpbmsoaW1hZ2VQYXRoKTtcbn1cblxuY29uc3QgTE9HU19EQVRBX0ZJTEVOQU1FID0gXCJtZXNzYWdlLWxvZ2dlci1sb2dzLmpzb25cIjtcbmNvbnN0IGRhdGFXcml0ZVF1ZXVlID0gbmV3IFF1ZXVlKCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMb2dzRnJvbUZzKF9ldmVudDogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgY29uc3QgbG9nc0RpciA9IGF3YWl0IGdldExvZ3NEaXIoKTtcblxuICAgIGF3YWl0IGVuc3VyZURpcmVjdG9yeUV4aXN0cyhsb2dzRGlyKTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShhd2FpdCByZWFkRmlsZShwYXRoLmpvaW4obG9nc0RpciwgTE9HU19EQVRBX0ZJTEVOQU1FKSwgXCJ1dGYtOFwiKSk7XG4gICAgfSBjYXRjaCB7IH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVMb2dzKF9ldmVudDogSXBjTWFpbkludm9rZUV2ZW50LCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgY29uc3QgbG9nc0RpciA9IGF3YWl0IGdldExvZ3NEaXIoKTtcblxuICAgIGRhdGFXcml0ZVF1ZXVlLnB1c2goKCkgPT4gd3JpdGVGaWxlKHBhdGguam9pbihsb2dzRGlyLCBMT0dTX0RBVEFfRklMRU5BTUUpLCBjb250ZW50cykpO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0TmF0aXZlSW1hZ2VEaXIoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gcGF0aC5qb2luKGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCksIFwic2F2ZWRJbWFnZXNcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0TmF0aXZlRGF0YURpcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oREFUQV9ESVIsIFwiTWVzc2FnZUxvZ2dlckRhdGFcIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaG9vc2VEaXIoZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgbG9nS2V5OiBcImxvZ3NEaXJcIiB8IFwiaW1hZ2VDYWNoZURpclwiKSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xuICAgIGNvbnN0IGRlZmF1bHRQYXRoID0gc2V0dGluZ3NbbG9nS2V5XSB8fCBhd2FpdCBnZXREZWZhdWx0TmF0aXZlRGF0YURpcigpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGlhbG9nLnNob3dPcGVuRGlhbG9nKHsgcHJvcGVydGllczogW1wib3BlbkRpcmVjdG9yeVwiXSwgZGVmYXVsdFBhdGg6IGRlZmF1bHRQYXRoIH0pO1xuICAgIGNvbnN0IGRpciA9IHJlcy5maWxlUGF0aHNbMF07XG5cbiAgICBpZiAoIWRpcikgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIERpcmVjdG9yeVwiKTtcblxuICAgIHNldHRpbmdzW2xvZ0tleV0gPSBkaXI7XG5cbiAgICBhd2FpdCBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpO1xuXG4gICAgc3dpdGNoIChsb2dLZXkpIHtcbiAgICAgICAgY2FzZSBcImxvZ3NEaXJcIjogbG9nc0RpciA9IGRpcjsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbWFnZUNhY2hlRGlyXCI6IGltYWdlQ2FjaGVEaXIgPSBkaXI7IGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChsb2dLZXkgPT09IFwiaW1hZ2VDYWNoZURpclwiKVxuICAgICAgICBhd2FpdCBpbml0KGV2ZW50KTtcblxuICAgIHJldHVybiBkaXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93SXRlbUluRm9sZGVyKF9ldmVudDogSXBjTWFpbkludm9rZUV2ZW50LCBmaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgc2hlbGwuc2hvd0l0ZW1JbkZvbGRlcihmaWxlUGF0aCk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgUHJvbWlzYWJsZSB9IGZyb20gXCJ0eXBlLWZlc3RcIjtcblxuLyoqXG4gKiBBIHF1ZXVlIHRoYXQgY2FuIGJlIHVzZWQgdG8gcnVuIHRhc2tzIGNvbnNlY3V0aXZlbHkuXG4gKiBIaWdobHkgcmVjb21tZW5kZWQgZm9yIHRoaW5ncyBsaWtlIGZldGNoaW5nIGRhdGEgZnJvbSBEaXNjb3JkXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWV1ZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1heFNpemUgVGhlIG1heGltdW0gYW1vdW50IG9mIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBxdWV1ZWQgYXQgb25jZS5cbiAgICAgKiAgICAgICAgICAgICAgICBJZiB0aGUgcXVldWUgaXMgZnVsbCwgdGhlIG9sZGVzdCBmdW5jdGlvbiB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG1heFNpemUgPSBJbmZpbml0eSkgeyB9XG5cbiAgICBwcml2YXRlIHF1ZXVlID0gW10gYXMgQXJyYXk8KCkgPT4gUHJvbWlzYWJsZTx1bmtub3duPj47XG5cbiAgICBwcml2YXRlIHByb21pc2U/OiBQcm9taXNlPGFueT47XG5cbiAgICBwcml2YXRlIG5leHQoKSB7XG4gICAgICAgIGNvbnN0IGZ1bmMgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGlmIChmdW5jKVxuICAgICAgICAgICAgdGhpcy5wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jKVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMubmV4dCgpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wcm9taXNlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgcnVuKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvbWlzZSlcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBhIHRhc2sgYXQgdGhlIGVuZCBvZiB0aGUgcXVldWUuIFRoaXMgdGFzayB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCBvdGhlciB0YXNrc1xuICAgICAqIElmIHRoZSBxdWV1ZSBleGNlZWRzIHRoZSBzcGVjaWZpZWQgbWF4U2l6ZSwgdGhlIGZpcnN0IHRhc2sgaW4gcXVldWUgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIEBwYXJhbSBmdW5jIFRhc2tcbiAgICAgKi9cbiAgICBwdXNoPFQ+KGZ1bmM6ICgpID0+IFByb21pc2FibGU8VD4pIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKGZ1bmMpO1xuICAgICAgICB0aGlzLnJ1bigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBlbmQgYSB0YXNrIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlLiBUaGlzIHRhc2sgd2lsbCBiZSBleGVjdXRlZCBuZXh0XG4gICAgICogSWYgdGhlIHF1ZXVlIGV4Y2VlZHMgdGhlIHNwZWNpZmllZCBtYXhTaXplLCB0aGUgbGFzdCB0YXNrIGluIHF1ZXVlIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0gZnVuYyBUYXNrXG4gICAgICovXG4gICAgdW5zaGlmdDxUPihmdW5jOiAoKSA9PiBQcm9taXNhYmxlPFQ+KSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKVxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5wb3AoKTtcblxuICAgICAgICB0aGlzLnF1ZXVlLnVuc2hpZnQoZnVuYyk7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGFtb3VudCBvZiB0YXNrcyBpbiB0aGUgcXVldWVcbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH1cbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgZnMgZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBnZXREZWZhdWx0TmF0aXZlRGF0YURpciwgZ2V0RGVmYXVsdE5hdGl2ZUltYWdlRGlyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGVuc3VyZURpcmVjdG9yeUV4aXN0cyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmludGVyZmFjZSBNTFNldHRpbmdzIHtcbiAgICBsb2dzRGlyOiBzdHJpbmc7XG4gICAgaW1hZ2VDYWNoZURpcjogc3RyaW5nO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNldHRpbmdzKCk6IFByb21pc2U8TUxTZXR0aW5ncz4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZnMucmVhZEZpbGUoYXdhaXQgZ2V0U2V0dGluZ3NGaWxlUGF0aCgpLCBcInV0ZjhcIik7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gcHJvYmFibHkgZG9lc250IGV4aXN0XG4gICAgICAgIC8vIHRpbWUgdG8gY3JlYXRlIGl0XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0ge1xuICAgICAgICAgICAgbG9nc0RpcjogYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKSxcbiAgICAgICAgICAgIGltYWdlQ2FjaGVEaXI6IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgc2F2ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cblxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgfVxufVxuXG4vLyBkb250IGV4cG9zZSB0aGlzIHRvIHJlbmRlcmVyIGZ1dHVyZSBtZVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhzZXR0aW5nczogTUxTZXR0aW5ncykge1xuICAgIGlmICghc2V0dGluZ3MpIHJldHVybjtcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoYXdhaXQgZ2V0U2V0dGluZ3NGaWxlUGF0aCgpLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncywgbnVsbCwgNCksIFwidXRmOFwiKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3NGaWxlUGF0aCgpIHtcbiAgICAvLyBtbFNldHRpbmdzLmpzb24gd2lsbCBhbHdheXMgaW4gdGhhdCBmb2xkZXJcbiAgICBjb25zdCBNbERhdGFEaXIgPSBhd2FpdCBnZXREZWZhdWx0TmF0aXZlRGF0YURpcigpO1xuICAgIGF3YWl0IGVuc3VyZURpcmVjdG9yeUV4aXN0cyhNbERhdGFEaXIpO1xuICAgIGNvbnN0IG1sU2V0dGluZ3NEaXIgPSBwYXRoLmpvaW4oTWxEYXRhRGlyLCBcIm1sU2V0dGluZ3MuanNvblwiKTtcblxuICAgIHJldHVybiBtbFNldHRpbmdzRGlyO1xufVxuXG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgYWNjZXNzLCBta2RpciB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4aXN0cyhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWNjZXNzKGZpbGVuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZURpcmVjdG9yeUV4aXN0cyhjYWNoZURpcjogc3RyaW5nKSB7XG4gICAgaWYgKCFhd2FpdCBleGlzdHMoY2FjaGVEaXIpKVxuICAgICAgICBhd2FpdCBta2RpcihjYWNoZURpcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVuYW1lKS5uYW1lO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IElwY01haW5JbnZva2VFdmVudCB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gXCJodHRwc1wiO1xuXG4vLyBUaGVzZSBsaW5rcyBkb24ndCBzdXBwb3J0IENPUlMsIHNvIHRoaXMgaGFzIHRvIGJlIG5hdGl2ZVxuY29uc3QgdmFsaWRSZWRpcmVjdFVybHMgPSAvXmh0dHBzOlxcL1xcLyhzcG90aWZ5XFwubGlua3xzXFwudGVhbSlcXC8uKyQvO1xuXG5mdW5jdGlvbiBnZXRSZWRpcmVjdCh1cmw6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVxID0gcmVxdWVzdChuZXcgVVJMKHVybCksIHsgbWV0aG9kOiBcIkhFQURcIiB9LCByZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgICAgICByZXMuaGVhZGVycy5sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICA/IGdldFJlZGlyZWN0KHJlcy5oZWFkZXJzLmxvY2F0aW9uKVxuICAgICAgICAgICAgICAgICAgICA6IHVybFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIHJlamVjdCk7XG4gICAgICAgIHJlcS5lbmQoKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc29sdmVSZWRpcmVjdChfOiBJcGNNYWluSW52b2tlRXZlbnQsIHVybDogc3RyaW5nKSB7XG4gICAgaWYgKCF2YWxpZFJlZGlyZWN0VXJscy50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgICByZXR1cm4gZ2V0UmVkaXJlY3QodXJsKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgeyBiYXNlbmFtZSwgbm9ybWFsaXplIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRSZWNvcmRpbmcoXywgZmlsZVBhdGg6IHN0cmluZykge1xuICAgIGZpbGVQYXRoID0gbm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGJhc2VuYW1lKGZpbGVQYXRoKTtcbiAgICBjb25zdCBkaXNjb3JkQmFzZURpcldpdGhUcmFpbGluZ1NsYXNoID0gbm9ybWFsaXplKGFwcC5nZXRQYXRoKFwidXNlckRhdGFcIikgKyBcIi9cIik7XG4gICAgY29uc29sZS5sb2coZmlsZW5hbWUsIGRpc2NvcmRCYXNlRGlyV2l0aFRyYWlsaW5nU2xhc2gsIGZpbGVQYXRoKTtcbiAgICBpZiAoZmlsZW5hbWUgIT09IFwicmVjb3JkaW5nLm9nZ1wiIHx8ICFmaWxlUGF0aC5zdGFydHNXaXRoKGRpc2NvcmRCYXNlRGlyV2l0aFRyYWlsaW5nU2xhc2gpKSByZXR1cm4gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IGF3YWl0IHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1Zi5idWZmZXIpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgUmVuZGVyZXJTZXR0aW5ncyB9IGZyb20gXCJAbWFpbi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgYWRndWFyZCBmcm9tIFwiZmlsZTovL2FkZ3VhcmQuanM/bWluaWZ5XCI7XG5cbmFwcC5vbihcImJyb3dzZXItd2luZG93LWNyZWF0ZWRcIiwgKF8sIHdpbikgPT4ge1xuICAgIHdpbi53ZWJDb250ZW50cy5vbihcImZyYW1lLWNyZWF0ZWRcIiwgKF8sIHsgZnJhbWUgfSkgPT4ge1xuICAgICAgICBmcmFtZS5vbmNlKFwiZG9tLXJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChmcmFtZS51cmwuaW5jbHVkZXMoXCJkaXNjb3Jkc2F5c1wiKSAmJiBmcmFtZS51cmwuaW5jbHVkZXMoXCJ5b3V0dWJlLmNvbVwiKSkge1xuICAgICAgICAgICAgICAgIGlmICghUmVuZGVyZXJTZXR0aW5ncy5zdG9yZS5wbHVnaW5zPy5XYXRjaFRvZ2V0aGVyQWRibG9jaz8uZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZnJhbWUuZXhlY3V0ZUphdmFTY3JpcHQoYWRndWFyZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCAiZXhwb3J0IGRlZmF1bHQgXCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xcblxcbi8qKlxcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFkR3VhcmQncyBCbG9jayBZb3VUdWJlIEFkcyAoaHR0cHM6Ly9naXRodWIuY29tL0FkZ3VhcmRUZWFtL0Jsb2NrWW91VHViZUFkc1Nob3J0Y3V0KS5cXG4gKlxcbiAqIENvcHlyaWdodCAoQykgQWRHdWFyZCBUZWFtXFxuICpcXG4gKiBBZEd1YXJkJ3MgQmxvY2sgWW91VHViZSBBZHMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XFxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxcbiAqXFxuICogQWRHdWFyZCdzIEJsb2NrIFlvdVR1YmUgQWRzIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXFxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cXG4gKlxcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXFxuICogYWxvbmcgd2l0aCBBZEd1YXJkJ3MgQmxvY2sgWW91VHViZSBBZHMuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXFxuICovXFxuXFxuY29uc3QgTE9HT19JRCA9IFxcXCJibG9jay15b3V0dWJlLWFkcy1sb2dvXFxcIjtcXG5jb25zdCBoaWRkZW5DU1MgPSBbXFxuICAgIFxcXCIjX19mZllvdXR1YmUxXFxcIixcXG4gICAgXFxcIiNfX2ZmWW91dHViZTJcXFwiLFxcbiAgICBcXFwiI19fZmZZb3V0dWJlM1xcXCIsXFxuICAgIFxcXCIjX19mZllvdXR1YmU0XFxcIixcXG4gICAgXFxcIiNmZWVkLXB5di1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiI2ZlZWRtb2R1bGUtUFJPXFxcIixcXG4gICAgXFxcIiNob21lcGFnZS1jaHJvbWUtc2lkZS1wcm9tb1xcXCIsXFxuICAgIFxcXCIjbWVyY2gtc2hlbGZcXFwiLFxcbiAgICBcXFwiI29mZmVyLW1vZHVsZVxcXCIsXFxuICAgICcjcGxhLXNoZWxmID4geXRkLXBsYS1zaGVsZi1yZW5kZXJlcltjbGFzcz1cXFwic3R5bGUtc2NvcGUgeXRkLXdhdGNoXFxcIl0nLFxcbiAgICBcXFwiI3BsYS1zaGVsZlxcXCIsXFxuICAgIFxcXCIjcHJlbWl1bS15dmFcXFwiLFxcbiAgICBcXFwiI3Byb21vLWluZm9cXFwiLFxcbiAgICBcXFwiI3Byb21vLWxpc3RcXFwiLFxcbiAgICBcXFwiI3Byb21vdGlvbi1zaGVsZlxcXCIsXFxuICAgIFxcXCIjcmVsYXRlZCA+IHl0ZC13YXRjaC1uZXh0LXNlY29uZGFyeS1yZXN1bHRzLXJlbmRlcmVyID4gI2l0ZW1zID4geXRkLWNvbXBhY3QtcHJvbW90ZWQtdmlkZW8tcmVuZGVyZXIueXRkLXdhdGNoLW5leHQtc2Vjb25kYXJ5LXJlc3VsdHMtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiI3NlYXJjaC1wdmFcXFwiLFxcbiAgICBcXFwiI3NoZWxmLXB5di1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiI3ZpZGVvLW1hc3RoZWFkXFxcIixcXG4gICAgXFxcIiN3YXRjaC1icmFuZGVkLWFjdGlvbnNcXFwiLFxcbiAgICBcXFwiI3dhdGNoLWJ1eS11cmxzXFxcIixcXG4gICAgXFxcIiN3YXRjaC1jaGFubmVsLWJyYW5kLWRpdlxcXCIsXFxuICAgIFxcXCIjd2F0Y2g3LWJyYW5kZWQtYmFubmVyXFxcIixcXG4gICAgXFxcIiNZdEtldmxhclZpc2liaWxpdHlJZGVudGlmaWVyXFxcIixcXG4gICAgXFxcIiNZdFNwYXJrbGVzVmlzaWJpbGl0eUlkZW50aWZpZXJcXFwiLFxcbiAgICBcXFwiLmNhcm91c2VsLW9mZmVyLXVybC1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiLmNvbXBhbmlvbi1hZC1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiLkdvb2dsZUFjdGl2ZVZpZXdFbGVtZW50XFxcIixcXG4gICAgJy5saXN0LXZpZXdbc3R5bGU9XFxcIm1hcmdpbjogN3B4IDBwdDtcXFwiXScsXFxuICAgIFxcXCIucHJvbW90ZWQtc3BhcmtsZXMtdGV4dC1zZWFyY2gtcm9vdC1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiLnByb21vdGVkLXZpZGVvc1xcXCIsXFxuICAgIFxcXCIuc2VhcmNoVmlldy5saXN0LXZpZXdcXFwiLFxcbiAgICBcXFwiLnNwYXJrbGVzLWxpZ2h0LWN0YVxcXCIsXFxuICAgIFxcXCIud2F0Y2gtZXh0cmEtaW5mby1jb2x1bW5cXFwiLFxcbiAgICBcXFwiLndhdGNoLWV4dHJhLWluZm8tcmlnaHRcXFwiLFxcbiAgICBcXFwiLnl0ZC1jYXJvdXNlbC1hZC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLWNvbXBhY3QtcHJvbW90ZWQtdmlkZW8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1jb21wYW5pb24tc2xvdC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLW1lcmNoLXNoZWxmLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtcGxheWVyLWxlZ2FjeS1kZXNrdG9wLXdhdGNoLWFkcy1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXByb21vdGVkLXNwYXJrbGVzLXRleHQtc2VhcmNoLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtcHJvbW90ZWQtdmlkZW8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1zZWFyY2gtcHl2LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtdmlkZW8tbWFzdGhlYWQtYWQtdjMtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1hY3Rpb24taW50ZXJzdGl0aWFsLWJhY2tncm91bmQtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi55dHAtYWQtYWN0aW9uLWludGVyc3RpdGlhbC1zbG90XFxcIixcXG4gICAgXFxcIi55dHAtYWQtaW1hZ2Utb3ZlcmxheVxcXCIsXFxuICAgIFxcXCIueXRwLWFkLW92ZXJsYXktY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi55dHAtYWQtcHJvZ3Jlc3NcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1wcm9ncmVzcy1saXN0XFxcIixcXG4gICAgJ1tjbGFzcyo9XFxcInl0ZC1kaXNwbGF5LWFkLVxcXCJdJyxcXG4gICAgJ1tsYXlvdXQqPVxcXCJkaXNwbGF5LWFkLVxcXCJdJyxcXG4gICAgJ2FbaHJlZl49XFxcImh0dHA6Ly93d3cueW91dHViZS5jb20vY3RocnU/XFxcIl0nLFxcbiAgICAnYVtocmVmXj1cXFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vY3RocnU/XFxcIl0nLFxcbiAgICBcXFwieXRkLWFjdGlvbi1jb21wYW5pb24tYWQtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLWJhbm5lci1wcm9tby1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtY29tcGFjdC1wcm9tb3RlZC12aWRlby1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtY29tcGFuaW9uLXNsb3QtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLWRpc3BsYXktYWQtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLXByb21vdGVkLXNwYXJrbGVzLXRleHQtc2VhcmNoLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1wcm9tb3RlZC1zcGFya2xlcy13ZWItcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLXNlYXJjaC1weXYtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLXNpbmdsZS1vcHRpb24tc3VydmV5LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC12aWRlby1tYXN0aGVhZC1hZC1hZHZlcnRpc2VyLWluZm8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLXZpZGVvLW1hc3RoZWFkLWFkLXYzLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIllUTS1QUk9NT1RFRC1WSURFTy1SRU5ERVJFUlxcXCIsXFxuXTtcXG4vKipcXG4qIEFkZHMgQ1NTIHRvIHRoZSBwYWdlXFxuKi9cXG5jb25zdCBoaWRlRWxlbWVudHMgPSAoKSA9PiB7XFxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGhpZGRlbkNTUztcXG4gICAgaWYgKCFzZWxlY3RvcnMpIHtcXG4gICAgICAgIHJldHVybjtcXG4gICAgfVxcbiAgICBjb25zdCBydWxlID0gc2VsZWN0b3JzLmpvaW4oXFxcIiwgXFxcIikgKyBcXFwiIHsgZGlzcGxheTogbm9uZSFpbXBvcnRhbnQ7IH1cXFwiO1xcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXFxcInN0eWxlXFxcIik7XFxuICAgIHN0eWxlLmlubmVySFRNTCA9IHJ1bGU7XFxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xcbn07XFxuLyoqXFxuKiBDYWxscyB0aGUgXFxcImNhbGxiYWNrXFxcIiBmdW5jdGlvbiBvbiBldmVyeSBET00gY2hhbmdlLCBidXQgbm90IGZvciB0aGUgdHJhY2tlZCBldmVudHNcXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIGZ1bmN0aW9uXFxuKi9cXG5jb25zdCBvYnNlcnZlRG9tQ2hhbmdlcyA9IGNhbGxiYWNrID0+IHtcXG4gICAgY29uc3QgZG9tTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9ucyA9PiB7XFxuICAgICAgICBjYWxsYmFjayhtdXRhdGlvbnMpO1xcbiAgICB9KTtcXG4gICAgZG9tTXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcXG4gICAgfSk7XFxufTtcXG4vKipcXG4qIFRoaXMgZnVuY3Rpb24gaXMgc3VwcG9zZWQgdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IERPTSBjaGFuZ2VcXG4qL1xcbmNvbnN0IGhpZGVEeW5hbWljQWRzID0gKCkgPT4ge1xcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXFxcIiNjb250ZW50cyA+IHl0ZC1yaWNoLWl0ZW0tcmVuZGVyZXIgeXRkLWRpc3BsYXktYWQtcmVuZGVyZXJcXFwiKTtcXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xcbiAgICAgICAgcmV0dXJuO1xcbiAgICB9XFxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xcbiAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5wYXJlbnROb2RlKSB7XFxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xcbiAgICAgICAgICAgIGlmIChwYXJlbnQubG9jYWxOYW1lID09PSBcXFwieXRkLXJpY2gtaXRlbS1yZW5kZXJlclxcXCIpIHtcXG4gICAgICAgICAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSBcXFwibm9uZVxcXCI7XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9KTtcXG59O1xcbi8qKlxcbiogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIHZpZGVvIGFkcyBhcmUgY3VycmVudGx5IHJ1bm5pbmdcXG4qIGFuZCBhdXRvLWNsaWNrcyB0aGUgc2tpcCBidXR0b24uXFxuKi9cXG5jb25zdCBhdXRvU2tpcEFkcyA9ICgpID0+IHtcXG4gICAgLy8gSWYgdGhlcmUncyBhIHZpZGVvIHRoYXQgcGxheXMgdGhlIGFkIGF0IHRoaXMgbW9tZW50LCBzY3JvbGwgdGhpcyBhZFxcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwiLmFkLXNob3dpbmdcXFwiKSkge1xcbiAgICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCJ2aWRlb1xcXCIpO1xcbiAgICAgICAgaWYgKHZpZGVvICYmIHZpZGVvLmR1cmF0aW9uKSB7XFxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSB2aWRlby5kdXJhdGlvbjtcXG4gICAgICAgICAgICAvLyBTa2lwIGJ1dHRvbiBzaG91bGQgYXBwZWFyIGFmdGVyIHRoYXQsXFxuICAgICAgICAgICAgLy8gbm93IHNpbXBseSBjbGljayBpdCBhdXRvbWF0aWNhbGx5XFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XFxuICAgICAgICAgICAgICAgIGNvbnN0IHNraXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCJidXR0b24ueXRwLWFkLXNraXAtYnV0dG9uXFxcIik7XFxuICAgICAgICAgICAgICAgIGlmIChza2lwQnRuKSB7XFxuICAgICAgICAgICAgICAgICAgICBza2lwQnRuLmNsaWNrKCk7XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9LCAxMDApO1xcbiAgICAgICAgfVxcbiAgICB9XFxufTtcXG4vKipcXG4qIFRoaXMgZnVuY3Rpb24gb3ZlcnJpZGVzIGEgcHJvcGVydHkgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXFxuKlxcbiogQHBhcmFtIHtvYmplY3R9IG9iaiBvYmplY3QgdG8gbG9vayBmb3IgcHJvcGVydGllcyBpblxcbiogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZSBwcm9wZXJ0eSB0byBvdmVycmlkZVxcbiogQHBhcmFtIHsqfSBvdmVycmlkZVZhbHVlIHZhbHVlIHRvIHNldFxcbiovXFxuY29uc3Qgb3ZlcnJpZGVPYmplY3QgPSAob2JqLCBwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpID0+IHtcXG4gICAgaWYgKCFvYmopIHtcXG4gICAgICAgIHJldHVybiBmYWxzZTtcXG4gICAgfVxcbiAgICBsZXQgb3ZlcnJpZGVuID0gZmFsc2U7XFxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSA9PT0gcHJvcGVydHlOYW1lKSB7XFxuICAgICAgICAgICAgb2JqW2tleV0gPSBvdmVycmlkZVZhbHVlO1xcbiAgICAgICAgICAgIG92ZXJyaWRlbiA9IHRydWU7XFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xcbiAgICAgICAgfSBlbHNlIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiB0eXBlb2Ygb2JqW2tleV0gPT09IFxcXCJvYmplY3RcXFwiKSB7XFxuICAgICAgICAgICAgaWYgKG92ZXJyaWRlT2JqZWN0KG9ialtrZXldLCBwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpKSB7XFxuICAgICAgICAgICAgICAgIG92ZXJyaWRlbiA9IHRydWU7XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9XFxuICAgIHJldHVybiBvdmVycmlkZW47XFxufTtcXG4vKipcXG4qIE92ZXJyaWRlcyBKU09OLnBhcnNlIGFuZCBSZXNwb25zZS5qc29uIGZ1bmN0aW9ucy5cXG4qIEV4YW1pbmVzIHRoZXNlIGZ1bmN0aW9ucyBhcmd1bWVudHMsIGxvb2tzIGZvciBwcm9wZXJ0aWVzIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIHRoZXJlXFxuKiBhbmQgaWYgaXQgZXhpc3RzLCBjaGFuZ2VzIGl0J3MgdmFsdWUgdG8gd2hhdCB3YXMgc3BlY2lmaWVkLlxcbipcXG4qIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWUgbmFtZSBvZiB0aGUgcHJvcGVydHlcXG4qIEBwYXJhbSB7Kn0gb3ZlcnJpZGVWYWx1ZSBuZXcgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eVxcbiovXFxuY29uc3QganNvbk92ZXJyaWRlID0gKHByb3BlcnR5TmFtZSwgb3ZlcnJpZGVWYWx1ZSkgPT4ge1xcbiAgICBjb25zdCBuYXRpdmVKU09OUGFyc2UgPSBKU09OLnBhcnNlO1xcbiAgICBKU09OLnBhcnNlID0gKC4uLmFyZ3MpID0+IHtcXG4gICAgICAgIGNvbnN0IG9iaiA9IG5hdGl2ZUpTT05QYXJzZS5hcHBseSh0aGlzLCBhcmdzKTtcXG4gICAgICAgIC8vIE92ZXJyaWRlIGl0J3MgcHJvcHMgYW5kIHJldHVybiBiYWNrIHRvIHRoZSBjYWxsZXJcXG4gICAgICAgIG92ZXJyaWRlT2JqZWN0KG9iaiwgcHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKTtcXG4gICAgICAgIHJldHVybiBvYmo7XFxuICAgIH07XFxuICAgIC8vIE92ZXJyaWRlIFJlc3BvbnNlLnByb3RvdHlwZS5qc29uXFxuICAgIGNvbnN0IG5hdGl2ZVJlc3BvbnNlSnNvbiA9IFJlc3BvbnNlLnByb3RvdHlwZS5qc29uO1xcbiAgICBSZXNwb25zZS5wcm90b3R5cGUuanNvbiA9IG5ldyBQcm94eShuYXRpdmVSZXNwb25zZUpzb24sIHtcXG4gICAgICAgIGFwcGx5KC4uLmFyZ3MpIHtcXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSB0YXJnZXQgZnVuY3Rpb24sIGdldCB0aGUgb3JpZ2luYWwgUHJvbWlzZVxcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBSZWZsZWN0LmFwcGx5KC4uLmFyZ3MpO1xcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBvbmUgYW5kIG92ZXJyaWRlIHRoZSBKU09OIGluc2lkZVxcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihkYXRhID0+IHtcXG4gICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlT2JqZWN0KGRhdGEsIHByb3BlcnR5TmFtZSwgb3ZlcnJpZGVWYWx1ZSk7XFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcXG4gICAgICAgICAgICB9KTtcXG4gICAgICAgIH0sXFxuICAgIH0pO1xcbn07XFxuY29uc3QgYWRkQWRHdWFyZExvZ29TdHlsZSA9ICgpID0+IHsgfTtcXG5jb25zdCBhZGRBZEd1YXJkTG9nbyA9ICgpID0+IHtcXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKExPR09fSUQpKSB7XFxuICAgICAgICByZXR1cm47XFxuICAgIH1cXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXFxcInNwYW5cXFwiKTtcXG4gICAgbG9nby5pbm5lckhUTUwgPSBcXFwiX19sb2dvX3RleHRfX1xcXCI7XFxuICAgIGxvZ28uc2V0QXR0cmlidXRlKFxcXCJpZFxcXCIsIExPR09fSUQpO1xcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcXFwibS55b3V0dWJlLmNvbVxcXCIpIHtcXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcImhlYWRlci5tb2JpbGUtdG9wYmFyLWhlYWRlciA+IGJ1dHRvblxcXCIpO1xcbiAgICAgICAgaWYgKGJ0bikge1xcbiAgICAgICAgICAgIGJ0bi5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUobG9nbywgYnRuLm5leHRTaWJsaW5nKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcXFwid3d3LnlvdXR1YmUuY29tXFxcIikge1xcbiAgICAgICAgY29uc3QgY29kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxcXCJjb3VudHJ5LWNvZGVcXFwiKTtcXG4gICAgICAgIGlmIChjb2RlKSB7XFxuICAgICAgICAgICAgY29kZS5pbm5lckhUTUwgPSBcXFwiXFxcIjtcXG4gICAgICAgICAgICBjb2RlLmFwcGVuZENoaWxkKGxvZ28pO1xcbiAgICAgICAgICAgIGFkZEFkR3VhcmRMb2dvU3R5bGUoKTtcXG4gICAgICAgIH1cXG4gICAgfSBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFxcXCJtdXNpYy55b3V0dWJlLmNvbVxcXCIpIHtcXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwiLnl0bXVzaWMtbmF2LWJhciNsZWZ0LWNvbnRlbnRcXFwiKTtcXG4gICAgICAgIGlmIChlbCkge1xcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGxvZ28pO1xcbiAgICAgICAgICAgIGFkZEFkR3VhcmRMb2dvU3R5bGUoKTtcXG4gICAgICAgIH1cXG4gICAgfSBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFxcXCJ3d3cueW91dHViZS1ub2Nvb2tpZS5jb21cXFwiKSB7XFxuICAgICAgICBjb25zdCBjb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwiI3l0LW1hc3RoZWFkICNsb2dvLWNvbnRhaW5lciAuY29udGVudC1yZWdpb25cXFwiKTtcXG4gICAgICAgIGlmIChjb2RlKSB7XFxuICAgICAgICAgICAgY29kZS5pbm5lckhUTUwgPSBcXFwiXFxcIjtcXG4gICAgICAgICAgICBjb2RlLmFwcGVuZENoaWxkKGxvZ28pO1xcbiAgICAgICAgICAgIGFkZEFkR3VhcmRMb2dvU3R5bGUoKTtcXG4gICAgICAgIH1cXG4gICAgfVxcbn07XFxuLy8gUmVtb3ZlcyBhZHMgbWV0YWRhdGEgZnJvbSBZb3VUdWJlIFhIUiByZXF1ZXN0c1xcbmpzb25PdmVycmlkZShcXFwiYWRQbGFjZW1lbnRzXFxcIiwgW10pO1xcbmpzb25PdmVycmlkZShcXFwicGxheWVyQWRzXFxcIiwgW10pO1xcbi8vIEFwcGxpZXMgQ1NTIHRoYXQgaGlkZXMgWW91VHViZSBhZCBlbGVtZW50c1xcbmhpZGVFbGVtZW50cygpO1xcbi8vIFNvbWUgY2hhbmdlcyBzaG91bGQgYmUgcmUtZXZhbHVhdGVkIG9uIGV2ZXJ5IHBhZ2UgY2hhbmdlXFxuYWRkQWRHdWFyZExvZ28oKTtcXG5oaWRlRHluYW1pY0FkcygpO1xcbmF1dG9Ta2lwQWRzKCk7XFxub2JzZXJ2ZURvbUNoYW5nZXMoKCkgPT4ge1xcbiAgICBhZGRBZEd1YXJkTG9nbygpO1xcbiAgICBoaWRlRHluYW1pY0FkcygpO1xcbiAgICBhdXRvU2tpcEFkcygpO1xcbn0pO1wiIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IGNyZWF0ZVNvY2tldCwgU29ja2V0IH0gZnJvbSBcImRncmFtXCI7XG5cbmxldCB4c29Tb2NrZXQ6IFNvY2tldDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRUb092ZXJsYXkoXywgZGF0YTogYW55KSB7XG4gICAgZGF0YS5pY29uID0gQnVmZmVyLmZyb20oZGF0YS5pY29uKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgeHNvU29ja2V0ID8/PSBjcmVhdGVTb2NrZXQoXCJ1ZHA0XCIpO1xuICAgIHhzb1NvY2tldC5zZW5kKGpzb24sIDQyMDY5LCBcIjEyNy4wLjAuMVwiKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gdGhhdCB3aWxsIGNhbGwgdGhlIHdyYXBwZWQgZnVuY3Rpb25cbiAqIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkuIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW5cbiAqIHdpdGhpbiB0aGUgZGVsYXksIHRoZSB0aW1lciB3aWxsIGJlIHJlc2V0LlxuICogQHBhcmFtIGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXBcbiAqIEBwYXJhbSBkZWxheSBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZTxUIGV4dGVuZHMgRnVuY3Rpb24+KGZ1bmM6IFQsIGRlbGF5ID0gMzAwKTogVCB7XG4gICAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7IGZ1bmMoLi4uYXJncyk7IH0sIGRlbGF5KTtcbiAgICB9IGFzIGFueTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBcIlBDRkVUME5VV1ZCRklHaDBiV3crQ2p4b2RHMXNJR3hoYm1jOUltVnVJajRLQ2p4b1pXRmtQZ29nSUNBZ1BHMWxkR0VnWTJoaGNuTmxkRDBpZFhSbUxUZ2lJQzgrQ2lBZ0lDQThkR2wwYkdVK1VtbDJaWEpqYjNKa0lGRjFhV05yUTFOVElFVmthWFJ2Y2p3dmRHbDBiR1UrQ2lBZ0lDQThiR2x1YXlCeVpXdzlJbk4wZVd4bGMyaGxaWFFpSUdoeVpXWTlJbWgwZEhCek9pOHZZMlJ1TG1welpHVnNhWFp5TG01bGRDOXVjRzB2Ylc5dVlXTnZMV1ZrYVhSdmNrQXdMalV3TGpBdmJXbHVMM1p6TDJWa2FYUnZjaTlsWkdsMGIzSXViV0ZwYmk1amMzTWlDaUFnSUNBZ0lDQWdhVzUwWldkeWFYUjVQU0p6YUdFeU5UWXRkR2xLVUZFeVR6QTBlaTl3V2k5QmQyUjVTV2RvY2s5TmVtVjNaaXRRU1haRmJERlpTMkpSZG5OYWF6MGlJR055YjNOemIzSnBaMmx1UFNKaGJtOXVlVzF2ZFhNaUNpQWdJQ0FnSUNBZ2NtVm1aWEp5WlhKd2IyeHBZM2s5SW01dkxYSmxabVZ5Y21WeUlpQXZQZ29nSUNBZ1BITjBlV3hsUGdvZ0lDQWdJQ0FnSUdoMGJXd3NDaUFnSUNBZ0lDQWdZbTlrZVN3S0lDQWdJQ0FnSUNBalkyOXVkR0ZwYm1WeUlIc0tJQ0FnSUNBZ0lDQWdJQ0FnY0c5emFYUnBiMjQ2SUdGaWMyOXNkWFJsT3dvZ0lDQWdJQ0FnSUNBZ0lDQnNaV1owT2lBd093b2dJQ0FnSUNBZ0lDQWdJQ0IwYjNBNklEQTdDaUFnSUNBZ0lDQWdJQ0FnSUhkcFpIUm9PaUF4TURBbE93b2dJQ0FnSUNBZ0lDQWdJQ0JvWldsbmFIUTZJREV3TUNVN0NpQWdJQ0FnSUNBZ0lDQWdJRzFoY21kcGJqb2dNRHNLSUNBZ0lDQWdJQ0FnSUNBZ2NHRmtaR2x1WnpvZ01Ec0tJQ0FnSUNBZ0lDQWdJQ0FnYjNabGNtWnNiM2M2SUdocFpHUmxianNLSUNBZ0lDQWdJQ0I5Q2lBZ0lDQThMM04wZVd4bFBnbzhMMmhsWVdRK0NnbzhZbTlrZVQ0S0lDQWdJRHhrYVhZZ2FXUTlJbU52Ym5SaGFXNWxjaUkrUEM5a2FYWStDaUFnSUNBOGMyTnlhWEIwSUhOeVl6MGlhSFIwY0hNNkx5OWpaRzR1YW5Oa1pXeHBkbkl1Ym1WMEwyNXdiUzl0YjI1aFkyOHRaV1JwZEc5eVFEQXVOVEF1TUM5dGFXNHZkbk12Ykc5aFpHVnlMbXB6SWdvZ0lDQWdJQ0FnSUdsdWRHVm5jbWwwZVQwaWMyaGhNalUyTFV0alZUUTRWRWR5T0RSeU4zVnVSamRLTlVsblFtODVOV0ZsVm5KRlluSkhaVEEwVXpkVVkwWlZhbk05SWlCamNtOXpjMjl5YVdkcGJqMGlZVzV2Ym5sdGIzVnpJZ29nSUNBZ0lDQWdJSEpsWm1WeWNtVnljRzlzYVdONVBTSnVieTF5WldabGNuSmxjaUkrUEM5elkzSnBjSFErQ2dvZ0lDQWdQSE5qY21sd2RENEtJQ0FnSUNBZ0lDQnlaWEYxYVhKbExtTnZibVpwWnloN0NpQWdJQ0FnSUNBZ0lDQWdJSEJoZEdoek9pQjdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJjem9nSW1oMGRIQnpPaTh2WTJSdUxtcHpaR1ZzYVhaeUxtNWxkQzl1Y0cwdmJXOXVZV052TFdWa2FYUnZja0F3TGpVd0xqQXZiV2x1TDNaeklpd0tJQ0FnSUNBZ0lDQWdJQ0FnZlN3S0lDQWdJQ0FnSUNCOUtUc0tDaUFnSUNBZ0lDQWdjbVZ4ZFdseVpTaGJJblp6TDJWa2FYUnZjaTlsWkdsMGIzSXViV0ZwYmlKZExDQW9LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQWdJR2RsZEVOMWNuSmxiblJEYzNNb0tTNTBhR1Z1S0NoamMzTXBJRDArSUhzS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmxaR2wwYjNJZ1BTQnRiMjVoWTI4dVpXUnBkRzl5TG1OeVpXRjBaU2dLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2dpWTI5dWRHRnBibVZ5SWlrc0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdld29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZV3gxWlRvZ1kzTnpMQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNZVzVuZFdGblpUb2dJbU56Y3lJc0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb1pXMWxPaUJuWlhSVWFHVnRaU2dwTEFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxaR2wwYjNJdWIyNUVhV1JEYUdGdVoyVk5iMlJsYkVOdmJuUmxiblFvS0NrZ1BUNEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6WlhSRGMzTW9aV1JwZEc5eUxtZGxkRlpoYkhWbEtDa3BDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXBPd29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0luSmxjMmw2WlNJc0lDZ3BJRDArSUhzS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJ0WVd0bElHMXZibUZqYnlCeVpTMXNZWGx2ZFhRS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxaR2wwYjNJdWJHRjViM1YwS0NrN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtUc0tJQ0FnSUNBZ0lDQWdJQ0FnZlNrN0NpQWdJQ0FnSUNBZ2ZTazdDaUFnSUNBOEwzTmpjbWx3ZEQ0S1BDOWliMlI1UGdvS1BDOW9kRzFzUGdvPVwiIiwgIi8qIGVzbGludC1kaXNhYmxlIHNpbXBsZS1oZWFkZXIvaGVhZGVyICovXG5cbi8qIVxuICogQmV0dGVyRGlzY29yZCBhZGRvbiBtZXRhIHBhcnNlclxuICogQ29weXJpZ2h0IDIwMjMgQmV0dGVyRGlzY29yZCBjb250cmlidXRvcnNcbiAqIENvcHlyaWdodCAyMDIzIFZlbmRpY2F0ZWQgYW5kIFJpdmVyY29yZCBjb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IHNwbGl0UmVnZXggPSAvW15cXFNcXHJcXG5dKj9cXHI/KD86XFxyXFxufFxcbilbXlxcU1xcclxcbl0qP1xcKlteXFxTXFxyXFxuXT8vO1xuY29uc3QgZXNjYXBlZEF0UmVnZXggPSAvXlxcXFxALztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyVGhlbWVIZWFkZXIge1xuICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgdmVyc2lvbj86IHN0cmluZztcbiAgICBsaWNlbnNlPzogc3RyaW5nO1xuICAgIHNvdXJjZT86IHN0cmluZztcbiAgICB3ZWJzaXRlPzogc3RyaW5nO1xuICAgIGludml0ZT86IHN0cmluZztcbn1cblxuZnVuY3Rpb24gbWFrZUhlYWRlcihmaWxlTmFtZTogc3RyaW5nLCBvcHRzOiBQYXJ0aWFsPFVzZXJUaGVtZUhlYWRlcj4gPSB7fSk6IFVzZXJUaGVtZUhlYWRlciB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgIG5hbWU6IG9wdHMubmFtZSA/PyBmaWxlTmFtZS5yZXBsYWNlKC9cXC5jc3MkL2ksIFwiXCIpLFxuICAgICAgICBhdXRob3I6IG9wdHMuYXV0aG9yID8/IFwiVW5rbm93biBBdXRob3JcIixcbiAgICAgICAgZGVzY3JpcHRpb246IG9wdHMuZGVzY3JpcHRpb24gPz8gXCJBIERpc2NvcmQgVGhlbWUuXCIsXG4gICAgICAgIHZlcnNpb246IG9wdHMudmVyc2lvbixcbiAgICAgICAgbGljZW5zZTogb3B0cy5saWNlbnNlLFxuICAgICAgICBzb3VyY2U6IG9wdHMuc291cmNlLFxuICAgICAgICB3ZWJzaXRlOiBvcHRzLndlYnNpdGUsXG4gICAgICAgIGludml0ZTogb3B0cy5pbnZpdGVcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaXBCT00oZmlsZUNvbnRlbnQ6IHN0cmluZykge1xuICAgIGlmIChmaWxlQ29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmaWxlQ29udGVudC5zbGljZSgxKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVDb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGhlbWVJbmZvKGNzczogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKTogVXNlclRoZW1lSGVhZGVyIHtcbiAgICBpZiAoIWNzcykgcmV0dXJuIG1ha2VIZWFkZXIoZmlsZU5hbWUpO1xuXG4gICAgY29uc3QgYmxvY2sgPSBjc3Muc3BsaXQoXCIvKipcIiwgMik/LlsxXT8uc3BsaXQoXCIqL1wiLCAxKT8uWzBdO1xuICAgIGlmICghYmxvY2spIHJldHVybiBtYWtlSGVhZGVyKGZpbGVOYW1lKTtcblxuICAgIGNvbnN0IGhlYWRlcjogUGFydGlhbDxVc2VyVGhlbWVIZWFkZXI+ID0ge307XG4gICAgbGV0IGZpZWxkID0gXCJcIjtcbiAgICBsZXQgYWNjdW0gPSBcIlwiO1xuICAgIGZvciAoY29uc3QgbGluZSBvZiBibG9jay5zcGxpdChzcGxpdFJlZ2V4KSkge1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAobGluZS5jaGFyQXQoMCkgPT09IFwiQFwiICYmIGxpbmUuY2hhckF0KDEpICE9PSBcIiBcIikge1xuICAgICAgICAgICAgaGVhZGVyW2ZpZWxkXSA9IGFjY3VtLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBsaW5lLmluZGV4T2YoXCIgXCIpO1xuICAgICAgICAgICAgZmllbGQgPSBsaW5lLnN1YnN0cmluZygxLCBsKTtcbiAgICAgICAgICAgIGFjY3VtID0gbGluZS5zdWJzdHJpbmcobCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWNjdW0gKz0gXCIgXCIgKyBsaW5lLnJlcGxhY2UoXCJcXFxcblwiLCBcIlxcblwiKS5yZXBsYWNlKGVzY2FwZWRBdFJlZ2V4LCBcIkBcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGVhZGVyW2ZpZWxkXSA9IGFjY3VtLnRyaW0oKTtcbiAgICBkZWxldGUgaGVhZGVyW1wiXCJdO1xuICAgIHJldHVybiBtYWtlSGVhZGVyKGZpbGVOYW1lLCBoZWFkZXIpO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IHR5cGUgQnJvd3NlcldpbmRvdywgc2hlbGwgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5KHdpbjogQnJvd3NlcldpbmRvdykge1xuICAgIHdpbi53ZWJDb250ZW50cy5zZXRXaW5kb3dPcGVuSGFuZGxlcigoeyB1cmwgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHVybCkge1xuICAgICAgICAgICAgY2FzZSBcImFib3V0OmJsYW5rXCI6XG4gICAgICAgICAgICBjYXNlIFwiaHR0cHM6Ly9kaXNjb3JkLmNvbS9wb3BvdXRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJodHRwczovL3B0Yi5kaXNjb3JkLmNvbS9wb3BvdXRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJodHRwczovL2NhbmFyeS5kaXNjb3JkLmNvbS9wb3BvdXRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhY3Rpb246IFwiYWxsb3dcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB7IHByb3RvY29sIH0gPSBuZXcgVVJMKHVybCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBcImRlbnlcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChwcm90b2NvbCkge1xuICAgICAgICAgICAgY2FzZSBcImh0dHA6XCI6XG4gICAgICAgICAgICBjYXNlIFwiaHR0cHM6XCI6XG4gICAgICAgICAgICBjYXNlIFwibWFpbHRvOlwiOlxuICAgICAgICAgICAgY2FzZSBcInN0ZWFtOlwiOlxuICAgICAgICAgICAgY2FzZSBcInNwb3RpZnk6XCI6XG4gICAgICAgICAgICAgICAgc2hlbGwub3BlbkV4dGVybmFsKHVybCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBhY3Rpb246IFwiZGVueVwiIH07XG4gICAgfSk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgc2Vzc2lvbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgdW56aXAgfSBmcm9tIFwiZmZsYXRlXCI7XG5pbXBvcnQgeyBjb25zdGFudHMgYXMgZnNDb25zdGFudHMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGFjY2VzcywgbWtkaXIsIHJtLCB3cml0ZUZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBEQVRBX0RJUiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY3J4VG9aaXAgfSBmcm9tIFwiLi9jcnhUb1ppcFwiO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIi4vc2ltcGxlR2V0XCI7XG5cbmNvbnN0IGV4dGVuc2lvbkNhY2hlRGlyID0gam9pbihEQVRBX0RJUiwgXCJFeHRlbnNpb25DYWNoZVwiKTtcblxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdChkYXRhOiBCdWZmZXIsIG91dERpcjogc3RyaW5nKSB7XG4gICAgYXdhaXQgbWtkaXIob3V0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB1bnppcChkYXRhLCAoZXJyLCBmaWxlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHZvaWQgcmVqZWN0KGVycik7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhmaWxlcykubWFwKGFzeW5jIGYgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpZ25hdHVyZSBzdHVmZlxuICAgICAgICAgICAgICAgIC8vICdDYW5ub3QgbG9hZCBleHRlbnNpb24gd2l0aCBmaWxlIG9yIGRpcmVjdG9yeSBuYW1lXG4gICAgICAgICAgICAgICAgLy8gX21ldGFkYXRhLiBGaWxlbmFtZXMgc3RhcnRpbmcgd2l0aCBcIl9cIiBhcmUgcmVzZXJ2ZWQgZm9yIHVzZSBieSB0aGUgc3lzdGVtLic7XG4gICAgICAgICAgICAgICAgaWYgKGYuc3RhcnRzV2l0aChcIl9tZXRhZGF0YS9cIikpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmIChmLmVuZHNXaXRoKFwiL1wiKSkgcmV0dXJuIHZvaWQgbWtkaXIoam9pbihvdXREaXIsIGYpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhFbGVtZW50cyA9IGYuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYXRoRWxlbWVudHMucG9wKCkhO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yaWVzID0gcGF0aEVsZW1lbnRzLmpvaW4oXCIvXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpciA9IGpvaW4ob3V0RGlyLCBkaXJlY3Rvcmllcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWtkaXIoZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZUZpbGUoam9pbihkaXIsIG5hbWUpLCBmaWxlc1tmXSk7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKCkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJtKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnN0YWxsRXh0KGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBleHREaXIgPSBqb2luKGV4dGVuc2lvbkNhY2hlRGlyLCBgJHtpZH1gKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFjY2VzcyhleHREaXIsIGZzQ29uc3RhbnRzLkZfT0spO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCB1cmwgPSBpZCA9PT0gXCJmbWthZG1hcGdvZmFkb3BsamJqZmthcGRrb2llbmloaVwiXG4gICAgICAgICAgICAvLyBSZWFjdCBEZXZ0b29scyB2NC4yNVxuICAgICAgICAgICAgLy8gdjQuMjcgaXMgYnJva2VuIGluIEVsZWN0cm9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8yNTg0M1xuICAgICAgICAgICAgLy8gVW5mb3J0dW5hdGVseSwgR29vZ2xlIGRvZXMgbm90IHNlcnZlIG9sZCB2ZXJzaW9ucywgc28gdGhpcyBpcyB0aGUgb25seSB3YXlcbiAgICAgICAgICAgID8gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vVmVuZGljYXRlZC9yYW5kb20tZmlsZXMvZjZmNTUwZTRjNThhYzVmMjAxMjA5NWExMzA0MDZjMmFiMjViOTg0ZC9mbWthZG1hcGdvZmFkb3BsamJqZmthcGRrb2llbmloaS56aXBcIlxuICAgICAgICAgICAgOiBgaHR0cHM6Ly9jbGllbnRzMi5nb29nbGUuY29tL3NlcnZpY2UvdXBkYXRlMi9jcng/cmVzcG9uc2U9cmVkaXJlY3QmYWNjZXB0Zm9ybWF0PWNyeDIsY3J4MyZ4PWlkJTNEJHtpZH0lMjZ1YyZwcm9kdmVyc2lvbj0zMmA7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IGF3YWl0IGdldCh1cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIlVzZXItQWdlbnRcIjogXCJSaXZlcmNvcmQgKGh0dHBzOi8vZ2l0aHViLmNvbS9SaXZlcmNvcmQvUml2ZXJjb3JkKVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBleHRyYWN0KGNyeFRvWmlwKGJ1ZiksIGV4dERpcikuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfVxuXG4gICAgc2Vzc2lvbi5kZWZhdWx0U2Vzc2lvbi5sb2FkRXh0ZW5zaW9uKGV4dERpcik7XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ21vZHVsZSc7XG52YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoJy8nKTtcbi8vIERFRkxBVEUgaXMgYSBjb21wbGV4IGZvcm1hdDsgdG8gcmVhZCB0aGlzIGNvZGUsIHlvdSBzaG91bGQgcHJvYmFibHkgY2hlY2sgdGhlIFJGQyBmaXJzdDpcbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMxOTUxXG4vLyBZb3UgbWF5IGFsc28gd2lzaCB0byB0YWtlIGEgbG9vayBhdCB0aGUgZ3VpZGUgSSBtYWRlIGFib3V0IHRoaXMgcHJvZ3JhbTpcbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzEwMWFycm93ei8yNTNmMzFlYjVhYmMzZDkyNzVhYjk0MzAwM2ZmZWNhZFxuLy8gU29tZSBvZiB0aGUgZm9sbG93aW5nIGNvZGUgaXMgc2ltaWxhciB0byB0aGF0IG9mIFVaSVAuanM6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGhvdG9wZWEvVVpJUC5qc1xuLy8gSG93ZXZlciwgdGhlIHZhc3QgbWFqb3JpdHkgb2YgdGhlIGNvZGViYXNlIGhhcyBkaXZlcmdlZCBmcm9tIFVaSVAuanMgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UgYW5kIHJlZHVjZSBidW5kbGUgc2l6ZS5cbi8vIFNvbWV0aW1lcyAwIHdpbGwgYXBwZWFyIHdoZXJlIC0xIHdvdWxkIGJlIG1vcmUgYXBwcm9wcmlhdGUuIFRoaXMgaXMgYmVjYXVzZSB1c2luZyBhIHVpbnRcbi8vIGlzIGJldHRlciBmb3IgbWVtb3J5IGluIG1vc3QgZW5naW5lcyAoSSAqdGhpbmsqKS5cbi8vIE1lZGlvY3JlIHNoaW1cbnZhciBXb3JrZXI7XG52YXIgd29ya2VyQWRkID0gXCI7dmFyIF9fdz1yZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpO19fdy5wYXJlbnRQb3J0Lm9uKCdtZXNzYWdlJyxmdW5jdGlvbihtKXtvbm1lc3NhZ2Uoe2RhdGE6bX0pfSkscG9zdE1lc3NhZ2U9ZnVuY3Rpb24obSx0KXtfX3cucGFyZW50UG9ydC5wb3N0TWVzc2FnZShtLHQpfSxjbG9zZT1wcm9jZXNzLmV4aXQ7c2VsZj1nbG9iYWxcIjtcbnRyeSB7XG4gICAgV29ya2VyID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKS5Xb3JrZXI7XG59XG5jYXRjaCAoZSkge1xufVxudmFyIHdrID0gV29ya2VyID8gZnVuY3Rpb24gKGMsIF8sIG1zZywgdHJhbnNmZXIsIGNiKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB2YXIgdyA9IG5ldyBXb3JrZXIoYyArIHdvcmtlckFkZCwgeyBldmFsOiB0cnVlIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gY2IoZSwgbnVsbCk7IH0pXG4gICAgICAgIC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChtKSB7IHJldHVybiBjYihudWxsLCBtKTsgfSlcbiAgICAgICAgLm9uKCdleGl0JywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgaWYgKGMgJiYgIWRvbmUpXG4gICAgICAgICAgICBjYihuZXcgRXJyb3IoJ2V4aXRlZCB3aXRoIGNvZGUgJyArIGMpLCBudWxsKTtcbiAgICB9KTtcbiAgICB3LnBvc3RNZXNzYWdlKG1zZywgdHJhbnNmZXIpO1xuICAgIHcudGVybWluYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFdvcmtlci5wcm90b3R5cGUudGVybWluYXRlLmNhbGwodyk7XG4gICAgfTtcbiAgICByZXR1cm4gdztcbn0gOiBmdW5jdGlvbiAoXywgX18sIF9fXywgX19fXywgY2IpIHtcbiAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2IobmV3IEVycm9yKCdhc3luYyBvcGVyYXRpb25zIHVuc3VwcG9ydGVkIC0gdXBkYXRlIHRvIE5vZGUgMTIrIChvciBOb2RlIDEwLTExIHdpdGggdGhlIC0tZXhwZXJpbWVudGFsLXdvcmtlciBDTEkgZmxhZyknKSwgbnVsbCk7IH0pO1xuICAgIHZhciBOT1AgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGVybWluYXRlOiBOT1AsXG4gICAgICAgIHBvc3RNZXNzYWdlOiBOT1BcbiAgICB9O1xufTtcblxuLy8gYWxpYXNlcyBmb3Igc2hvcnRlciBjb21wcmVzc2VkIGNvZGUgKG1vc3QgbWluaWZlcnMgZG9uJ3QgZG8gdGhpcylcbnZhciB1OCA9IFVpbnQ4QXJyYXksIHUxNiA9IFVpbnQxNkFycmF5LCB1MzIgPSBVaW50MzJBcnJheTtcbi8vIGZpeGVkIGxlbmd0aCBleHRyYSBiaXRzXG52YXIgZmxlYiA9IG5ldyB1OChbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMywgMywgMywgMywgNCwgNCwgNCwgNCwgNSwgNSwgNSwgNSwgMCwgLyogdW51c2VkICovIDAsIDAsIC8qIGltcG9zc2libGUgKi8gMF0pO1xuLy8gZml4ZWQgZGlzdGFuY2UgZXh0cmEgYml0c1xuLy8gc2VlIGZsZWIgbm90ZVxudmFyIGZkZWIgPSBuZXcgdTgoWzAsIDAsIDAsIDAsIDEsIDEsIDIsIDIsIDMsIDMsIDQsIDQsIDUsIDUsIDYsIDYsIDcsIDcsIDgsIDgsIDksIDksIDEwLCAxMCwgMTEsIDExLCAxMiwgMTIsIDEzLCAxMywgLyogdW51c2VkICovIDAsIDBdKTtcbi8vIGNvZGUgbGVuZ3RoIGluZGV4IG1hcFxudmFyIGNsaW0gPSBuZXcgdTgoWzE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVdKTtcbi8vIGdldCBiYXNlLCByZXZlcnNlIGluZGV4IG1hcCBmcm9tIGV4dHJhIGJpdHNcbnZhciBmcmViID0gZnVuY3Rpb24gKGViLCBzdGFydCkge1xuICAgIHZhciBiID0gbmV3IHUxNigzMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMTsgKytpKSB7XG4gICAgICAgIGJbaV0gPSBzdGFydCArPSAxIDw8IGViW2kgLSAxXTtcbiAgICB9XG4gICAgLy8gbnVtYmVycyBoZXJlIGFyZSBhdCBtYXggMTggYml0c1xuICAgIHZhciByID0gbmV3IHUzMihiWzMwXSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAzMDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBiW2ldOyBqIDwgYltpICsgMV07ICsraikge1xuICAgICAgICAgICAgcltqXSA9ICgoaiAtIGJbaV0pIDw8IDUpIHwgaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2IsIHJdO1xufTtcbnZhciBfYSA9IGZyZWIoZmxlYiwgMiksIGZsID0gX2FbMF0sIHJldmZsID0gX2FbMV07XG4vLyB3ZSBjYW4gaWdub3JlIHRoZSBmYWN0IHRoYXQgdGhlIG90aGVyIG51bWJlcnMgYXJlIHdyb25nOyB0aGV5IG5ldmVyIGhhcHBlbiBhbnl3YXlcbmZsWzI4XSA9IDI1OCwgcmV2ZmxbMjU4XSA9IDI4O1xudmFyIF9iID0gZnJlYihmZGViLCAwKSwgZmQgPSBfYlswXSwgcmV2ZmQgPSBfYlsxXTtcbi8vIG1hcCBvZiB2YWx1ZSB0byByZXZlcnNlIChhc3N1bWluZyAxNiBiaXRzKVxudmFyIHJldiA9IG5ldyB1MTYoMzI3NjgpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAzMjc2ODsgKytpKSB7XG4gICAgLy8gcmV2ZXJzZSB0YWJsZSBhbGdvcml0aG0gZnJvbSBTT1xuICAgIHZhciB4ID0gKChpICYgMHhBQUFBKSA+Pj4gMSkgfCAoKGkgJiAweDU1NTUpIDw8IDEpO1xuICAgIHggPSAoKHggJiAweENDQ0MpID4+PiAyKSB8ICgoeCAmIDB4MzMzMykgPDwgMik7XG4gICAgeCA9ICgoeCAmIDB4RjBGMCkgPj4+IDQpIHwgKCh4ICYgMHgwRjBGKSA8PCA0KTtcbiAgICByZXZbaV0gPSAoKCh4ICYgMHhGRjAwKSA+Pj4gOCkgfCAoKHggJiAweDAwRkYpIDw8IDgpKSA+Pj4gMTtcbn1cbi8vIGNyZWF0ZSBodWZmbWFuIHRyZWUgZnJvbSB1OCBcIm1hcFwiOiBpbmRleCAtPiBjb2RlIGxlbmd0aCBmb3IgY29kZSBpbmRleFxuLy8gbWIgKG1heCBiaXRzKSBtdXN0IGJlIGF0IG1vc3QgMTVcbi8vIFRPRE86IG9wdGltaXplL3NwbGl0IHVwP1xudmFyIGhNYXAgPSAoZnVuY3Rpb24gKGNkLCBtYiwgcikge1xuICAgIHZhciBzID0gY2QubGVuZ3RoO1xuICAgIC8vIGluZGV4XG4gICAgdmFyIGkgPSAwO1xuICAgIC8vIHUxNiBcIm1hcFwiOiBpbmRleCAtPiAjIG9mIGNvZGVzIHdpdGggYml0IGxlbmd0aCA9IGluZGV4XG4gICAgdmFyIGwgPSBuZXcgdTE2KG1iKTtcbiAgICAvLyBsZW5ndGggb2YgY2QgbXVzdCBiZSAyODggKHRvdGFsICMgb2YgY29kZXMpXG4gICAgZm9yICg7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgaWYgKGNkW2ldKVxuICAgICAgICAgICAgKytsW2NkW2ldIC0gMV07XG4gICAgfVxuICAgIC8vIHUxNiBcIm1hcFwiOiBpbmRleCAtPiBtaW5pbXVtIGNvZGUgZm9yIGJpdCBsZW5ndGggPSBpbmRleFxuICAgIHZhciBsZSA9IG5ldyB1MTYobWIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtYjsgKytpKSB7XG4gICAgICAgIGxlW2ldID0gKGxlW2kgLSAxXSArIGxbaSAtIDFdKSA8PCAxO1xuICAgIH1cbiAgICB2YXIgY287XG4gICAgaWYgKHIpIHtcbiAgICAgICAgLy8gdTE2IFwibWFwXCI6IGluZGV4IC0+IG51bWJlciBvZiBhY3R1YWwgYml0cywgc3ltYm9sIGZvciBjb2RlXG4gICAgICAgIGNvID0gbmV3IHUxNigxIDw8IG1iKTtcbiAgICAgICAgLy8gYml0cyB0byByZW1vdmUgZm9yIHJldmVyc2VyXG4gICAgICAgIHZhciBydmIgPSAxNSAtIG1iO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgMCBsZW5ndGhzXG4gICAgICAgICAgICBpZiAoY2RbaV0pIHtcbiAgICAgICAgICAgICAgICAvLyBudW0gZW5jb2RpbmcgYm90aCBzeW1ib2wgYW5kIGJpdHMgcmVhZFxuICAgICAgICAgICAgICAgIHZhciBzdiA9IChpIDw8IDQpIHwgY2RbaV07XG4gICAgICAgICAgICAgICAgLy8gZnJlZSBiaXRzXG4gICAgICAgICAgICAgICAgdmFyIHJfMSA9IG1iIC0gY2RbaV07XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgdmFsdWVcbiAgICAgICAgICAgICAgICB2YXIgdiA9IGxlW2NkW2ldIC0gMV0rKyA8PCByXzE7XG4gICAgICAgICAgICAgICAgLy8gbSBpcyBlbmQgdmFsdWVcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBtID0gdiB8ICgoMSA8PCByXzEpIC0gMSk7IHYgPD0gbTsgKyt2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZXJ5IDE2IGJpdCB2YWx1ZSBzdGFydGluZyB3aXRoIHRoZSBjb2RlIHlpZWxkcyB0aGUgc2FtZSByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgY29bcmV2W3ZdID4+PiBydmJdID0gc3Y7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjbyA9IG5ldyB1MTYocyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjZFtpXSkge1xuICAgICAgICAgICAgICAgIGNvW2ldID0gcmV2W2xlW2NkW2ldIC0gMV0rK10gPj4+ICgxNSAtIGNkW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY287XG59KTtcbi8vIGZpeGVkIGxlbmd0aCB0cmVlXG52YXIgZmx0ID0gbmV3IHU4KDI4OCk7XG5mb3IgKHZhciBpID0gMDsgaSA8IDE0NDsgKytpKVxuICAgIGZsdFtpXSA9IDg7XG5mb3IgKHZhciBpID0gMTQ0OyBpIDwgMjU2OyArK2kpXG4gICAgZmx0W2ldID0gOTtcbmZvciAodmFyIGkgPSAyNTY7IGkgPCAyODA7ICsraSlcbiAgICBmbHRbaV0gPSA3O1xuZm9yICh2YXIgaSA9IDI4MDsgaSA8IDI4ODsgKytpKVxuICAgIGZsdFtpXSA9IDg7XG4vLyBmaXhlZCBkaXN0YW5jZSB0cmVlXG52YXIgZmR0ID0gbmV3IHU4KDMyKTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMzI7ICsraSlcbiAgICBmZHRbaV0gPSA1O1xuLy8gZml4ZWQgbGVuZ3RoIG1hcFxudmFyIGZsbSA9IC8qI19fUFVSRV9fKi8gaE1hcChmbHQsIDksIDApLCBmbHJtID0gLyojX19QVVJFX18qLyBoTWFwKGZsdCwgOSwgMSk7XG4vLyBmaXhlZCBkaXN0YW5jZSBtYXBcbnZhciBmZG0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmR0LCA1LCAwKSwgZmRybSA9IC8qI19fUFVSRV9fKi8gaE1hcChmZHQsIDUsIDEpO1xuLy8gZmluZCBtYXggb2YgYXJyYXlcbnZhciBtYXggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBtID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGFbaV0gPiBtKVxuICAgICAgICAgICAgbSA9IGFbaV07XG4gICAgfVxuICAgIHJldHVybiBtO1xufTtcbi8vIHJlYWQgZCwgc3RhcnRpbmcgYXQgYml0IHAgYW5kIG1hc2sgd2l0aCBtXG52YXIgYml0cyA9IGZ1bmN0aW9uIChkLCBwLCBtKSB7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICByZXR1cm4gKChkW29dIHwgKGRbbyArIDFdIDw8IDgpKSA+PiAocCAmIDcpKSAmIG07XG59O1xuLy8gcmVhZCBkLCBzdGFydGluZyBhdCBiaXQgcCBjb250aW51aW5nIGZvciBhdCBsZWFzdCAxNiBiaXRzXG52YXIgYml0czE2ID0gZnVuY3Rpb24gKGQsIHApIHtcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIHJldHVybiAoKGRbb10gfCAoZFtvICsgMV0gPDwgOCkgfCAoZFtvICsgMl0gPDwgMTYpKSA+PiAocCAmIDcpKTtcbn07XG4vLyBnZXQgZW5kIG9mIGJ5dGVcbnZhciBzaGZ0ID0gZnVuY3Rpb24gKHApIHsgcmV0dXJuICgocCArIDcpIC8gOCkgfCAwOyB9O1xuLy8gdHlwZWQgYXJyYXkgc2xpY2UgLSBhbGxvd3MgZ2FyYmFnZSBjb2xsZWN0b3IgdG8gZnJlZSBvcmlnaW5hbCByZWZlcmVuY2UsXG4vLyB3aGlsZSBiZWluZyBtb3JlIGNvbXBhdGlibGUgdGhhbiAuc2xpY2VcbnZhciBzbGMgPSBmdW5jdGlvbiAodiwgcywgZSkge1xuICAgIGlmIChzID09IG51bGwgfHwgcyA8IDApXG4gICAgICAgIHMgPSAwO1xuICAgIGlmIChlID09IG51bGwgfHwgZSA+IHYubGVuZ3RoKVxuICAgICAgICBlID0gdi5sZW5ndGg7XG4gICAgLy8gY2FuJ3QgdXNlIC5jb25zdHJ1Y3RvciBpbiBjYXNlIHVzZXItc3VwcGxpZWRcbiAgICB2YXIgbiA9IG5ldyAodi5CWVRFU19QRVJfRUxFTUVOVCA9PSAyID8gdTE2IDogdi5CWVRFU19QRVJfRUxFTUVOVCA9PSA0ID8gdTMyIDogdTgpKGUgLSBzKTtcbiAgICBuLnNldCh2LnN1YmFycmF5KHMsIGUpKTtcbiAgICByZXR1cm4gbjtcbn07XG4vKipcbiAqIENvZGVzIGZvciBlcnJvcnMgZ2VuZXJhdGVkIHdpdGhpbiB0aGlzIGxpYnJhcnlcbiAqL1xuZXhwb3J0IHZhciBGbGF0ZUVycm9yQ29kZSA9IHtcbiAgICBVbmV4cGVjdGVkRU9GOiAwLFxuICAgIEludmFsaWRCbG9ja1R5cGU6IDEsXG4gICAgSW52YWxpZExlbmd0aExpdGVyYWw6IDIsXG4gICAgSW52YWxpZERpc3RhbmNlOiAzLFxuICAgIFN0cmVhbUZpbmlzaGVkOiA0LFxuICAgIE5vU3RyZWFtSGFuZGxlcjogNSxcbiAgICBJbnZhbGlkSGVhZGVyOiA2LFxuICAgIE5vQ2FsbGJhY2s6IDcsXG4gICAgSW52YWxpZFVURjg6IDgsXG4gICAgRXh0cmFGaWVsZFRvb0xvbmc6IDksXG4gICAgSW52YWxpZERhdGU6IDEwLFxuICAgIEZpbGVuYW1lVG9vTG9uZzogMTEsXG4gICAgU3RyZWFtRmluaXNoaW5nOiAxMixcbiAgICBJbnZhbGlkWmlwRGF0YTogMTMsXG4gICAgVW5rbm93bkNvbXByZXNzaW9uTWV0aG9kOiAxNFxufTtcbi8vIGVycm9yIGNvZGVzXG52YXIgZWMgPSBbXG4gICAgJ3VuZXhwZWN0ZWQgRU9GJyxcbiAgICAnaW52YWxpZCBibG9jayB0eXBlJyxcbiAgICAnaW52YWxpZCBsZW5ndGgvbGl0ZXJhbCcsXG4gICAgJ2ludmFsaWQgZGlzdGFuY2UnLFxuICAgICdzdHJlYW0gZmluaXNoZWQnLFxuICAgICdubyBzdHJlYW0gaGFuZGxlcicsXG4gICAgLFxuICAgICdubyBjYWxsYmFjaycsXG4gICAgJ2ludmFsaWQgVVRGLTggZGF0YScsXG4gICAgJ2V4dHJhIGZpZWxkIHRvbyBsb25nJyxcbiAgICAnZGF0ZSBub3QgaW4gcmFuZ2UgMTk4MC0yMDk5JyxcbiAgICAnZmlsZW5hbWUgdG9vIGxvbmcnLFxuICAgICdzdHJlYW0gZmluaXNoaW5nJyxcbiAgICAnaW52YWxpZCB6aXAgZGF0YSdcbiAgICAvLyBkZXRlcm1pbmVkIGJ5IHVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXG5dO1xuO1xudmFyIGVyciA9IGZ1bmN0aW9uIChpbmQsIG1zZywgbnQpIHtcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtc2cgfHwgZWNbaW5kXSk7XG4gICAgZS5jb2RlID0gaW5kO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSlcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZSwgZXJyKTtcbiAgICBpZiAoIW50KVxuICAgICAgICB0aHJvdyBlO1xuICAgIHJldHVybiBlO1xufTtcbi8vIGV4cGFuZHMgcmF3IERFRkxBVEUgZGF0YVxudmFyIGluZmx0ID0gZnVuY3Rpb24gKGRhdCwgYnVmLCBzdCkge1xuICAgIC8vIHNvdXJjZSBsZW5ndGhcbiAgICB2YXIgc2wgPSBkYXQubGVuZ3RoO1xuICAgIGlmICghc2wgfHwgKHN0ICYmIHN0LmYgJiYgIXN0LmwpKVxuICAgICAgICByZXR1cm4gYnVmIHx8IG5ldyB1OCgwKTtcbiAgICAvLyBoYXZlIHRvIGVzdGltYXRlIHNpemVcbiAgICB2YXIgbm9CdWYgPSAhYnVmIHx8IHN0O1xuICAgIC8vIG5vIHN0YXRlXG4gICAgdmFyIG5vU3QgPSAhc3QgfHwgc3QuaTtcbiAgICBpZiAoIXN0KVxuICAgICAgICBzdCA9IHt9O1xuICAgIC8vIEFzc3VtZXMgcm91Z2hseSAzMyUgY29tcHJlc3Npb24gcmF0aW8gYXZlcmFnZVxuICAgIGlmICghYnVmKVxuICAgICAgICBidWYgPSBuZXcgdTgoc2wgKiAzKTtcbiAgICAvLyBlbnN1cmUgYnVmZmVyIGNhbiBmaXQgYXQgbGVhc3QgbCBlbGVtZW50c1xuICAgIHZhciBjYnVmID0gZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgdmFyIGJsID0gYnVmLmxlbmd0aDtcbiAgICAgICAgLy8gbmVlZCB0byBpbmNyZWFzZSBzaXplIHRvIGZpdFxuICAgICAgICBpZiAobCA+IGJsKSB7XG4gICAgICAgICAgICAvLyBEb3VibGUgb3Igc2V0IHRvIG5lY2Vzc2FyeSwgd2hpY2hldmVyIGlzIGdyZWF0ZXJcbiAgICAgICAgICAgIHZhciBuYnVmID0gbmV3IHU4KE1hdGgubWF4KGJsICogMiwgbCkpO1xuICAgICAgICAgICAgbmJ1Zi5zZXQoYnVmKTtcbiAgICAgICAgICAgIGJ1ZiA9IG5idWY7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vICBsYXN0IGNodW5rICAgICAgICAgYml0cG9zICAgICAgICAgICBieXRlc1xuICAgIHZhciBmaW5hbCA9IHN0LmYgfHwgMCwgcG9zID0gc3QucCB8fCAwLCBidCA9IHN0LmIgfHwgMCwgbG0gPSBzdC5sLCBkbSA9IHN0LmQsIGxidCA9IHN0Lm0sIGRidCA9IHN0Lm47XG4gICAgLy8gdG90YWwgYml0c1xuICAgIHZhciB0YnRzID0gc2wgKiA4O1xuICAgIGRvIHtcbiAgICAgICAgaWYgKCFsbSkge1xuICAgICAgICAgICAgLy8gQkZJTkFMIC0gdGhpcyBpcyBvbmx5IDEgd2hlbiBsYXN0IGNodW5rIGlzIG5leHRcbiAgICAgICAgICAgIGZpbmFsID0gYml0cyhkYXQsIHBvcywgMSk7XG4gICAgICAgICAgICAvLyB0eXBlOiAwID0gbm8gY29tcHJlc3Npb24sIDEgPSBmaXhlZCBodWZmbWFuLCAyID0gZHluYW1pYyBodWZmbWFuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGJpdHMoZGF0LCBwb3MgKyAxLCAzKTtcbiAgICAgICAgICAgIHBvcyArPSAzO1xuICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgLy8gZ28gdG8gZW5kIG9mIGJ5dGUgYm91bmRhcnlcbiAgICAgICAgICAgICAgICB2YXIgcyA9IHNoZnQocG9zKSArIDQsIGwgPSBkYXRbcyAtIDRdIHwgKGRhdFtzIC0gM10gPDwgOCksIHQgPSBzICsgbDtcbiAgICAgICAgICAgICAgICBpZiAodCA+IHNsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHNpemVcbiAgICAgICAgICAgICAgICBpZiAobm9CdWYpXG4gICAgICAgICAgICAgICAgICAgIGNidWYoYnQgKyBsKTtcbiAgICAgICAgICAgICAgICAvLyBDb3B5IG92ZXIgdW5jb21wcmVzc2VkIGRhdGFcbiAgICAgICAgICAgICAgICBidWYuc2V0KGRhdC5zdWJhcnJheShzLCB0KSwgYnQpO1xuICAgICAgICAgICAgICAgIC8vIEdldCBuZXcgYml0cG9zLCB1cGRhdGUgYnl0ZSBjb3VudFxuICAgICAgICAgICAgICAgIHN0LmIgPSBidCArPSBsLCBzdC5wID0gcG9zID0gdCAqIDgsIHN0LmYgPSBmaW5hbDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMSlcbiAgICAgICAgICAgICAgICBsbSA9IGZscm0sIGRtID0gZmRybSwgbGJ0ID0gOSwgZGJ0ID0gNTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgIC8vICBsaXRlcmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aHNcbiAgICAgICAgICAgICAgICB2YXIgaExpdCA9IGJpdHMoZGF0LCBwb3MsIDMxKSArIDI1NywgaGNMZW4gPSBiaXRzKGRhdCwgcG9zICsgMTAsIDE1KSArIDQ7XG4gICAgICAgICAgICAgICAgdmFyIHRsID0gaExpdCArIGJpdHMoZGF0LCBwb3MgKyA1LCAzMSkgKyAxO1xuICAgICAgICAgICAgICAgIHBvcyArPSAxNDtcbiAgICAgICAgICAgICAgICAvLyBsZW5ndGgrZGlzdGFuY2UgdHJlZVxuICAgICAgICAgICAgICAgIHZhciBsZHQgPSBuZXcgdTgodGwpO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RoIHRyZWVcbiAgICAgICAgICAgICAgICB2YXIgY2x0ID0gbmV3IHU4KDE5KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhjTGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGluZGV4IG1hcCB0byBnZXQgcmVhbCBjb2RlXG4gICAgICAgICAgICAgICAgICAgIGNsdFtjbGltW2ldXSA9IGJpdHMoZGF0LCBwb3MgKyBpICogMywgNyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyArPSBoY0xlbiAqIDM7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGhzIGJpdHNcbiAgICAgICAgICAgICAgICB2YXIgY2xiID0gbWF4KGNsdCksIGNsYm1zayA9ICgxIDw8IGNsYikgLSAxO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RocyBtYXBcbiAgICAgICAgICAgICAgICB2YXIgY2xtID0gaE1hcChjbHQsIGNsYiwgMSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0bDspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBjbG1bYml0cyhkYXQsIHBvcywgY2xibXNrKV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGJpdHMgcmVhZFxuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gciAmIDE1O1xuICAgICAgICAgICAgICAgICAgICAvLyBzeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSByID4+PiA0O1xuICAgICAgICAgICAgICAgICAgICAvLyBjb2RlIGxlbmd0aCB0byBjb3B5XG4gICAgICAgICAgICAgICAgICAgIGlmIChzIDwgMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxkdFtpKytdID0gcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICBjb3B5ICAgY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gMCwgbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PSAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMyArIGJpdHMoZGF0LCBwb3MsIDMpLCBwb3MgKz0gMiwgYyA9IGxkdFtpIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzID09IDE3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAzICsgYml0cyhkYXQsIHBvcywgNyksIHBvcyArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocyA9PSAxOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMTEgKyBiaXRzKGRhdCwgcG9zLCAxMjcpLCBwb3MgKz0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChuLS0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGR0W2krK10gPSBjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgIGxlbmd0aCB0cmVlICAgICAgICAgICAgICAgICBkaXN0YW5jZSB0cmVlXG4gICAgICAgICAgICAgICAgdmFyIGx0ID0gbGR0LnN1YmFycmF5KDAsIGhMaXQpLCBkdCA9IGxkdC5zdWJhcnJheShoTGl0KTtcbiAgICAgICAgICAgICAgICAvLyBtYXggbGVuZ3RoIGJpdHNcbiAgICAgICAgICAgICAgICBsYnQgPSBtYXgobHQpO1xuICAgICAgICAgICAgICAgIC8vIG1heCBkaXN0IGJpdHNcbiAgICAgICAgICAgICAgICBkYnQgPSBtYXgoZHQpO1xuICAgICAgICAgICAgICAgIGxtID0gaE1hcChsdCwgbGJ0LCAxKTtcbiAgICAgICAgICAgICAgICBkbSA9IGhNYXAoZHQsIGRidCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZXJyKDEpO1xuICAgICAgICAgICAgaWYgKHBvcyA+IHRidHMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9TdClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgYnVmZmVyIGNhbiBob2xkIHRoaXMgKyB0aGUgbGFyZ2VzdCBwb3NzaWJsZSBhZGRpdGlvblxuICAgICAgICAvLyBNYXhpbXVtIGNodW5rIHNpemUgKHByYWN0aWNhbGx5LCB0aGVvcmV0aWNhbGx5IGluZmluaXRlKSBpcyAyXjE3O1xuICAgICAgICBpZiAobm9CdWYpXG4gICAgICAgICAgICBjYnVmKGJ0ICsgMTMxMDcyKTtcbiAgICAgICAgdmFyIGxtcyA9ICgxIDw8IGxidCkgLSAxLCBkbXMgPSAoMSA8PCBkYnQpIC0gMTtcbiAgICAgICAgdmFyIGxwb3MgPSBwb3M7XG4gICAgICAgIGZvciAoOzsgbHBvcyA9IHBvcykge1xuICAgICAgICAgICAgLy8gYml0cyByZWFkLCBjb2RlXG4gICAgICAgICAgICB2YXIgYyA9IGxtW2JpdHMxNihkYXQsIHBvcykgJiBsbXNdLCBzeW0gPSBjID4+PiA0O1xuICAgICAgICAgICAgcG9zICs9IGMgJiAxNTtcbiAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYylcbiAgICAgICAgICAgICAgICBlcnIoMik7XG4gICAgICAgICAgICBpZiAoc3ltIDwgMjU2KVxuICAgICAgICAgICAgICAgIGJ1ZltidCsrXSA9IHN5bTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHN5bSA9PSAyNTYpIHtcbiAgICAgICAgICAgICAgICBscG9zID0gcG9zLCBsbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYWRkID0gc3ltIC0gMjU0O1xuICAgICAgICAgICAgICAgIC8vIG5vIGV4dHJhIGJpdHMgbmVlZGVkIGlmIGxlc3NcbiAgICAgICAgICAgICAgICBpZiAoc3ltID4gMjY0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gc3ltIC0gMjU3LCBiID0gZmxlYltpXTtcbiAgICAgICAgICAgICAgICAgICAgYWRkID0gYml0cyhkYXQsIHBvcywgKDEgPDwgYikgLSAxKSArIGZsW2ldO1xuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZGlzdFxuICAgICAgICAgICAgICAgIHZhciBkID0gZG1bYml0czE2KGRhdCwgcG9zKSAmIGRtc10sIGRzeW0gPSBkID4+PiA0O1xuICAgICAgICAgICAgICAgIGlmICghZClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDMpO1xuICAgICAgICAgICAgICAgIHBvcyArPSBkICYgMTU7XG4gICAgICAgICAgICAgICAgdmFyIGR0ID0gZmRbZHN5bV07XG4gICAgICAgICAgICAgICAgaWYgKGRzeW0gPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gZmRlYltkc3ltXTtcbiAgICAgICAgICAgICAgICAgICAgZHQgKz0gYml0czE2KGRhdCwgcG9zKSAmICgoMSA8PCBiKSAtIDEpLCBwb3MgKz0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+IHRidHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9CdWYpXG4gICAgICAgICAgICAgICAgICAgIGNidWYoYnQgKyAxMzEwNzIpO1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSBidCArIGFkZDtcbiAgICAgICAgICAgICAgICBmb3IgKDsgYnQgPCBlbmQ7IGJ0ICs9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0XSA9IGJ1ZltidCAtIGR0XTtcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0ICsgMV0gPSBidWZbYnQgKyAxIC0gZHRdO1xuICAgICAgICAgICAgICAgICAgICBidWZbYnQgKyAyXSA9IGJ1ZltidCArIDIgLSBkdF07XG4gICAgICAgICAgICAgICAgICAgIGJ1ZltidCArIDNdID0gYnVmW2J0ICsgMyAtIGR0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnQgPSBlbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3QubCA9IGxtLCBzdC5wID0gbHBvcywgc3QuYiA9IGJ0LCBzdC5mID0gZmluYWw7XG4gICAgICAgIGlmIChsbSlcbiAgICAgICAgICAgIGZpbmFsID0gMSwgc3QubSA9IGxidCwgc3QuZCA9IGRtLCBzdC5uID0gZGJ0O1xuICAgIH0gd2hpbGUgKCFmaW5hbCk7XG4gICAgcmV0dXJuIGJ0ID09IGJ1Zi5sZW5ndGggPyBidWYgOiBzbGMoYnVmLCAwLCBidCk7XG59O1xuLy8gc3RhcnRpbmcgYXQgcCwgd3JpdGUgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGJpdHMgdGhhdCBjYW4gaG9sZCB2IHRvIGRcbnZhciB3Yml0cyA9IGZ1bmN0aW9uIChkLCBwLCB2KSB7XG4gICAgdiA8PD0gcCAmIDc7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICBkW29dIHw9IHY7XG4gICAgZFtvICsgMV0gfD0gdiA+Pj4gODtcbn07XG4vLyBzdGFydGluZyBhdCBwLCB3cml0ZSB0aGUgbWluaW11bSBudW1iZXIgb2YgYml0cyAoPjgpIHRoYXQgY2FuIGhvbGQgdiB0byBkXG52YXIgd2JpdHMxNiA9IGZ1bmN0aW9uIChkLCBwLCB2KSB7XG4gICAgdiA8PD0gcCAmIDc7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICBkW29dIHw9IHY7XG4gICAgZFtvICsgMV0gfD0gdiA+Pj4gODtcbiAgICBkW28gKyAyXSB8PSB2ID4+PiAxNjtcbn07XG4vLyBjcmVhdGVzIGNvZGUgbGVuZ3RocyBmcm9tIGEgZnJlcXVlbmN5IHRhYmxlXG52YXIgaFRyZWUgPSBmdW5jdGlvbiAoZCwgbWIpIHtcbiAgICAvLyBOZWVkIGV4dHJhIGluZm8gdG8gbWFrZSBhIHRyZWVcbiAgICB2YXIgdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZC5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoZFtpXSlcbiAgICAgICAgICAgIHQucHVzaCh7IHM6IGksIGY6IGRbaV0gfSk7XG4gICAgfVxuICAgIHZhciBzID0gdC5sZW5ndGg7XG4gICAgdmFyIHQyID0gdC5zbGljZSgpO1xuICAgIGlmICghcylcbiAgICAgICAgcmV0dXJuIFtldCwgMF07XG4gICAgaWYgKHMgPT0gMSkge1xuICAgICAgICB2YXIgdiA9IG5ldyB1OCh0WzBdLnMgKyAxKTtcbiAgICAgICAgdlt0WzBdLnNdID0gMTtcbiAgICAgICAgcmV0dXJuIFt2LCAxXTtcbiAgICB9XG4gICAgdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmYgLSBiLmY7IH0pO1xuICAgIC8vIGFmdGVyIGkyIHJlYWNoZXMgbGFzdCBpbmQsIHdpbGwgYmUgc3RvcHBlZFxuICAgIC8vIGZyZXEgbXVzdCBiZSBncmVhdGVyIHRoYW4gbGFyZ2VzdCBwb3NzaWJsZSBudW1iZXIgb2Ygc3ltYm9sc1xuICAgIHQucHVzaCh7IHM6IC0xLCBmOiAyNTAwMSB9KTtcbiAgICB2YXIgbCA9IHRbMF0sIHIgPSB0WzFdLCBpMCA9IDAsIGkxID0gMSwgaTIgPSAyO1xuICAgIHRbMF0gPSB7IHM6IC0xLCBmOiBsLmYgKyByLmYsIGw6IGwsIHI6IHIgfTtcbiAgICAvLyBlZmZpY2llbnQgYWxnb3JpdGhtIGZyb20gVVpJUC5qc1xuICAgIC8vIGkwIGlzIGxvb2tiZWhpbmQsIGkyIGlzIGxvb2thaGVhZCAtIGFmdGVyIHByb2Nlc3NpbmcgdHdvIGxvdy1mcmVxXG4gICAgLy8gc3ltYm9scyB0aGF0IGNvbWJpbmVkIGhhdmUgaGlnaCBmcmVxLCB3aWxsIHN0YXJ0IHByb2Nlc3NpbmcgaTIgKGhpZ2gtZnJlcSxcbiAgICAvLyBub24tY29tcG9zaXRlKSBzeW1ib2xzIGluc3RlYWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9yZWRkaXQuY29tL3IvcGhvdG9wZWEvY29tbWVudHMvaWtla2h0L3V6aXBqc19xdWVzdGlvbnMvXG4gICAgd2hpbGUgKGkxICE9IHMgLSAxKSB7XG4gICAgICAgIGwgPSB0W3RbaTBdLmYgPCB0W2kyXS5mID8gaTArKyA6IGkyKytdO1xuICAgICAgICByID0gdFtpMCAhPSBpMSAmJiB0W2kwXS5mIDwgdFtpMl0uZiA/IGkwKysgOiBpMisrXTtcbiAgICAgICAgdFtpMSsrXSA9IHsgczogLTEsIGY6IGwuZiArIHIuZiwgbDogbCwgcjogciB9O1xuICAgIH1cbiAgICB2YXIgbWF4U3ltID0gdDJbMF0ucztcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHM7ICsraSkge1xuICAgICAgICBpZiAodDJbaV0ucyA+IG1heFN5bSlcbiAgICAgICAgICAgIG1heFN5bSA9IHQyW2ldLnM7XG4gICAgfVxuICAgIC8vIGNvZGUgbGVuZ3Roc1xuICAgIHZhciB0ciA9IG5ldyB1MTYobWF4U3ltICsgMSk7XG4gICAgLy8gbWF4IGJpdHMgaW4gdHJlZVxuICAgIHZhciBtYnQgPSBsbih0W2kxIC0gMV0sIHRyLCAwKTtcbiAgICBpZiAobWJ0ID4gbWIpIHtcbiAgICAgICAgLy8gbW9yZSBhbGdvcml0aG1zIGZyb20gVVpJUC5qc1xuICAgICAgICAvLyBUT0RPOiBmaW5kIG91dCBob3cgdGhpcyBjb2RlIHdvcmtzIChkZWJ0KVxuICAgICAgICAvLyAgaW5kICAgIGRlYnRcbiAgICAgICAgdmFyIGkgPSAwLCBkdCA9IDA7XG4gICAgICAgIC8vICAgIGxlZnQgICAgICAgICAgICBjb3N0XG4gICAgICAgIHZhciBsZnQgPSBtYnQgLSBtYiwgY3N0ID0gMSA8PCBsZnQ7XG4gICAgICAgIHQyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHRyW2Iuc10gLSB0clthLnNdIHx8IGEuZiAtIGIuZjsgfSk7XG4gICAgICAgIGZvciAoOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaTJfMSA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfMV0gPiBtYikge1xuICAgICAgICAgICAgICAgIGR0ICs9IGNzdCAtICgxIDw8IChtYnQgLSB0cltpMl8xXSkpO1xuICAgICAgICAgICAgICAgIHRyW2kyXzFdID0gbWI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZHQgPj4+PSBsZnQ7XG4gICAgICAgIHdoaWxlIChkdCA+IDApIHtcbiAgICAgICAgICAgIHZhciBpMl8yID0gdDJbaV0ucztcbiAgICAgICAgICAgIGlmICh0cltpMl8yXSA8IG1iKVxuICAgICAgICAgICAgICAgIGR0IC09IDEgPDwgKG1iIC0gdHJbaTJfMl0rKyAtIDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA+PSAwICYmIGR0OyAtLWkpIHtcbiAgICAgICAgICAgIHZhciBpMl8zID0gdDJbaV0ucztcbiAgICAgICAgICAgIGlmICh0cltpMl8zXSA9PSBtYikge1xuICAgICAgICAgICAgICAgIC0tdHJbaTJfM107XG4gICAgICAgICAgICAgICAgKytkdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYnQgPSBtYjtcbiAgICB9XG4gICAgcmV0dXJuIFtuZXcgdTgodHIpLCBtYnRdO1xufTtcbi8vIGdldCB0aGUgbWF4IGxlbmd0aCBhbmQgYXNzaWduIGxlbmd0aCBjb2Rlc1xudmFyIGxuID0gZnVuY3Rpb24gKG4sIGwsIGQpIHtcbiAgICByZXR1cm4gbi5zID09IC0xXG4gICAgICAgID8gTWF0aC5tYXgobG4obi5sLCBsLCBkICsgMSksIGxuKG4uciwgbCwgZCArIDEpKVxuICAgICAgICA6IChsW24uc10gPSBkKTtcbn07XG4vLyBsZW5ndGggY29kZXMgZ2VuZXJhdGlvblxudmFyIGxjID0gZnVuY3Rpb24gKGMpIHtcbiAgICB2YXIgcyA9IGMubGVuZ3RoO1xuICAgIC8vIE5vdGUgdGhhdCB0aGUgc2VtaWNvbG9uIHdhcyBpbnRlbnRpb25hbFxuICAgIHdoaWxlIChzICYmICFjWy0tc10pXG4gICAgICAgIDtcbiAgICB2YXIgY2wgPSBuZXcgdTE2KCsrcyk7XG4gICAgLy8gIGluZCAgICAgIG51bSAgICAgICAgIHN0cmVha1xuICAgIHZhciBjbGkgPSAwLCBjbG4gPSBjWzBdLCBjbHMgPSAxO1xuICAgIHZhciB3ID0gZnVuY3Rpb24gKHYpIHsgY2xbY2xpKytdID0gdjsgfTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBzOyArK2kpIHtcbiAgICAgICAgaWYgKGNbaV0gPT0gY2xuICYmIGkgIT0gcylcbiAgICAgICAgICAgICsrY2xzO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY2xuICYmIGNscyA+IDIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKDsgY2xzID4gMTM4OyBjbHMgLT0gMTM4KVxuICAgICAgICAgICAgICAgICAgICB3KDMyNzU0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2xzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB3KGNscyA+IDEwID8gKChjbHMgLSAxMSkgPDwgNSkgfCAyODY5MCA6ICgoY2xzIC0gMykgPDwgNSkgfCAxMjMwNSk7XG4gICAgICAgICAgICAgICAgICAgIGNscyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2xzID4gMykge1xuICAgICAgICAgICAgICAgIHcoY2xuKSwgLS1jbHM7XG4gICAgICAgICAgICAgICAgZm9yICg7IGNscyA+IDY7IGNscyAtPSA2KVxuICAgICAgICAgICAgICAgICAgICB3KDgzMDQpO1xuICAgICAgICAgICAgICAgIGlmIChjbHMgPiAyKVxuICAgICAgICAgICAgICAgICAgICB3KCgoY2xzIC0gMykgPDwgNSkgfCA4MjA4KSwgY2xzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjbHMtLSlcbiAgICAgICAgICAgICAgICB3KGNsbik7XG4gICAgICAgICAgICBjbHMgPSAxO1xuICAgICAgICAgICAgY2xuID0gY1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2NsLnN1YmFycmF5KDAsIGNsaSksIHNdO1xufTtcbi8vIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIG91dHB1dCBmcm9tIHRyZWUsIGNvZGUgbGVuZ3Roc1xudmFyIGNsZW4gPSBmdW5jdGlvbiAoY2YsIGNsKSB7XG4gICAgdmFyIGwgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2wubGVuZ3RoOyArK2kpXG4gICAgICAgIGwgKz0gY2ZbaV0gKiBjbFtpXTtcbiAgICByZXR1cm4gbDtcbn07XG4vLyB3cml0ZXMgYSBmaXhlZCBibG9ja1xuLy8gcmV0dXJucyB0aGUgbmV3IGJpdCBwb3NcbnZhciB3ZmJsayA9IGZ1bmN0aW9uIChvdXQsIHBvcywgZGF0KSB7XG4gICAgLy8gbm8gbmVlZCB0byB3cml0ZSAwMCBhcyB0eXBlOiBUeXBlZEFycmF5IGRlZmF1bHRzIHRvIDBcbiAgICB2YXIgcyA9IGRhdC5sZW5ndGg7XG4gICAgdmFyIG8gPSBzaGZ0KHBvcyArIDIpO1xuICAgIG91dFtvXSA9IHMgJiAyNTU7XG4gICAgb3V0W28gKyAxXSA9IHMgPj4+IDg7XG4gICAgb3V0W28gKyAyXSA9IG91dFtvXSBeIDI1NTtcbiAgICBvdXRbbyArIDNdID0gb3V0W28gKyAxXSBeIDI1NTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHM7ICsraSlcbiAgICAgICAgb3V0W28gKyBpICsgNF0gPSBkYXRbaV07XG4gICAgcmV0dXJuIChvICsgNCArIHMpICogODtcbn07XG4vLyB3cml0ZXMgYSBibG9ja1xudmFyIHdibGsgPSBmdW5jdGlvbiAoZGF0LCBvdXQsIGZpbmFsLCBzeW1zLCBsZiwgZGYsIGViLCBsaSwgYnMsIGJsLCBwKSB7XG4gICAgd2JpdHMob3V0LCBwKyssIGZpbmFsKTtcbiAgICArK2xmWzI1Nl07XG4gICAgdmFyIF9hID0gaFRyZWUobGYsIDE1KSwgZGx0ID0gX2FbMF0sIG1sYiA9IF9hWzFdO1xuICAgIHZhciBfYiA9IGhUcmVlKGRmLCAxNSksIGRkdCA9IF9iWzBdLCBtZGIgPSBfYlsxXTtcbiAgICB2YXIgX2MgPSBsYyhkbHQpLCBsY2x0ID0gX2NbMF0sIG5sYyA9IF9jWzFdO1xuICAgIHZhciBfZCA9IGxjKGRkdCksIGxjZHQgPSBfZFswXSwgbmRjID0gX2RbMV07XG4gICAgdmFyIGxjZnJlcSA9IG5ldyB1MTYoMTkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGNsdC5sZW5ndGg7ICsraSlcbiAgICAgICAgbGNmcmVxW2xjbHRbaV0gJiAzMV0rKztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxjZHQubGVuZ3RoOyArK2kpXG4gICAgICAgIGxjZnJlcVtsY2R0W2ldICYgMzFdKys7XG4gICAgdmFyIF9lID0gaFRyZWUobGNmcmVxLCA3KSwgbGN0ID0gX2VbMF0sIG1sY2IgPSBfZVsxXTtcbiAgICB2YXIgbmxjYyA9IDE5O1xuICAgIGZvciAoOyBubGNjID4gNCAmJiAhbGN0W2NsaW1bbmxjYyAtIDFdXTsgLS1ubGNjKVxuICAgICAgICA7XG4gICAgdmFyIGZsZW4gPSAoYmwgKyA1KSA8PCAzO1xuICAgIHZhciBmdGxlbiA9IGNsZW4obGYsIGZsdCkgKyBjbGVuKGRmLCBmZHQpICsgZWI7XG4gICAgdmFyIGR0bGVuID0gY2xlbihsZiwgZGx0KSArIGNsZW4oZGYsIGRkdCkgKyBlYiArIDE0ICsgMyAqIG5sY2MgKyBjbGVuKGxjZnJlcSwgbGN0KSArICgyICogbGNmcmVxWzE2XSArIDMgKiBsY2ZyZXFbMTddICsgNyAqIGxjZnJlcVsxOF0pO1xuICAgIGlmIChmbGVuIDw9IGZ0bGVuICYmIGZsZW4gPD0gZHRsZW4pXG4gICAgICAgIHJldHVybiB3ZmJsayhvdXQsIHAsIGRhdC5zdWJhcnJheShicywgYnMgKyBibCkpO1xuICAgIHZhciBsbSwgbGwsIGRtLCBkbDtcbiAgICB3Yml0cyhvdXQsIHAsIDEgKyAoZHRsZW4gPCBmdGxlbikpLCBwICs9IDI7XG4gICAgaWYgKGR0bGVuIDwgZnRsZW4pIHtcbiAgICAgICAgbG0gPSBoTWFwKGRsdCwgbWxiLCAwKSwgbGwgPSBkbHQsIGRtID0gaE1hcChkZHQsIG1kYiwgMCksIGRsID0gZGR0O1xuICAgICAgICB2YXIgbGxtID0gaE1hcChsY3QsIG1sY2IsIDApO1xuICAgICAgICB3Yml0cyhvdXQsIHAsIG5sYyAtIDI1Nyk7XG4gICAgICAgIHdiaXRzKG91dCwgcCArIDUsIG5kYyAtIDEpO1xuICAgICAgICB3Yml0cyhvdXQsIHAgKyAxMCwgbmxjYyAtIDQpO1xuICAgICAgICBwICs9IDE0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5sY2M7ICsraSlcbiAgICAgICAgICAgIHdiaXRzKG91dCwgcCArIDMgKiBpLCBsY3RbY2xpbVtpXV0pO1xuICAgICAgICBwICs9IDMgKiBubGNjO1xuICAgICAgICB2YXIgbGN0cyA9IFtsY2x0LCBsY2R0XTtcbiAgICAgICAgZm9yICh2YXIgaXQgPSAwOyBpdCA8IDI7ICsraXQpIHtcbiAgICAgICAgICAgIHZhciBjbGN0ID0gbGN0c1tpdF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsY3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gY2xjdFtpXSAmIDMxO1xuICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgbGxtW2xlbl0pLCBwICs9IGxjdFtsZW5dO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPiAxNSlcbiAgICAgICAgICAgICAgICAgICAgd2JpdHMob3V0LCBwLCAoY2xjdFtpXSA+Pj4gNSkgJiAxMjcpLCBwICs9IGNsY3RbaV0gPj4+IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsbSA9IGZsbSwgbGwgPSBmbHQsIGRtID0gZmRtLCBkbCA9IGZkdDtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaTsgKytpKSB7XG4gICAgICAgIGlmIChzeW1zW2ldID4gMjU1KSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gKHN5bXNbaV0gPj4+IDE4KSAmIDMxO1xuICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIGxtW2xlbiArIDI1N10pLCBwICs9IGxsW2xlbiArIDI1N107XG4gICAgICAgICAgICBpZiAobGVuID4gNylcbiAgICAgICAgICAgICAgICB3Yml0cyhvdXQsIHAsIChzeW1zW2ldID4+PiAyMykgJiAzMSksIHAgKz0gZmxlYltsZW5dO1xuICAgICAgICAgICAgdmFyIGRzdCA9IHN5bXNbaV0gJiAzMTtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBkbVtkc3RdKSwgcCArPSBkbFtkc3RdO1xuICAgICAgICAgICAgaWYgKGRzdCA+IDMpXG4gICAgICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIChzeW1zW2ldID4+PiA1KSAmIDgxOTEpLCBwICs9IGZkZWJbZHN0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBsbVtzeW1zW2ldXSksIHAgKz0gbGxbc3ltc1tpXV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2JpdHMxNihvdXQsIHAsIGxtWzI1Nl0pO1xuICAgIHJldHVybiBwICsgbGxbMjU2XTtcbn07XG4vLyBkZWZsYXRlIG9wdGlvbnMgKG5pY2UgPDwgMTMpIHwgY2hhaW5cbnZhciBkZW8gPSAvKiNfX1BVUkVfXyovIG5ldyB1MzIoWzY1NTQwLCAxMzEwODAsIDEzMTA4OCwgMTMxMTA0LCAyNjIxNzYsIDEwNDg3MDQsIDEwNDg4MzIsIDIxMTQ1NjAsIDIxMTc2MzJdKTtcbi8vIGVtcHR5XG52YXIgZXQgPSAvKiNfX1BVUkVfXyovIG5ldyB1OCgwKTtcbi8vIGNvbXByZXNzZXMgZGF0YSBpbnRvIGEgcmF3IERFRkxBVEUgYnVmZmVyXG52YXIgZGZsdCA9IGZ1bmN0aW9uIChkYXQsIGx2bCwgcGx2bCwgcHJlLCBwb3N0LCBsc3QpIHtcbiAgICB2YXIgcyA9IGRhdC5sZW5ndGg7XG4gICAgdmFyIG8gPSBuZXcgdTgocHJlICsgcyArIDUgKiAoMSArIE1hdGguY2VpbChzIC8gNzAwMCkpICsgcG9zdCk7XG4gICAgLy8gd3JpdGluZyB0byB0aGlzIHdyaXRlcyB0byB0aGUgb3V0cHV0IGJ1ZmZlclxuICAgIHZhciB3ID0gby5zdWJhcnJheShwcmUsIG8ubGVuZ3RoIC0gcG9zdCk7XG4gICAgdmFyIHBvcyA9IDA7XG4gICAgaWYgKCFsdmwgfHwgcyA8IDgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gczsgaSArPSA2NTUzNSkge1xuICAgICAgICAgICAgLy8gZW5kXG4gICAgICAgICAgICB2YXIgZSA9IGkgKyA2NTUzNTtcbiAgICAgICAgICAgIGlmIChlID49IHMpIHtcbiAgICAgICAgICAgICAgICAvLyB3cml0ZSBmaW5hbCBibG9ja1xuICAgICAgICAgICAgICAgIHdbcG9zID4+IDNdID0gbHN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zID0gd2ZibGsodywgcG9zICsgMSwgZGF0LnN1YmFycmF5KGksIGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG9wdCA9IGRlb1tsdmwgLSAxXTtcbiAgICAgICAgdmFyIG4gPSBvcHQgPj4+IDEzLCBjID0gb3B0ICYgODE5MTtcbiAgICAgICAgdmFyIG1za18xID0gKDEgPDwgcGx2bCkgLSAxO1xuICAgICAgICAvLyAgICBwcmV2IDItYnl0ZSB2YWwgbWFwICAgIGN1cnIgMi1ieXRlIHZhbCBtYXBcbiAgICAgICAgdmFyIHByZXYgPSBuZXcgdTE2KDMyNzY4KSwgaGVhZCA9IG5ldyB1MTYobXNrXzEgKyAxKTtcbiAgICAgICAgdmFyIGJzMV8xID0gTWF0aC5jZWlsKHBsdmwgLyAzKSwgYnMyXzEgPSAyICogYnMxXzE7XG4gICAgICAgIHZhciBoc2ggPSBmdW5jdGlvbiAoaSkgeyByZXR1cm4gKGRhdFtpXSBeIChkYXRbaSArIDFdIDw8IGJzMV8xKSBeIChkYXRbaSArIDJdIDw8IGJzMl8xKSkgJiBtc2tfMTsgfTtcbiAgICAgICAgLy8gMjQ1NzYgaXMgYW4gYXJiaXRyYXJ5IG51bWJlciBvZiBtYXhpbXVtIHN5bWJvbHMgcGVyIGJsb2NrXG4gICAgICAgIC8vIDQyNCBidWZmZXIgZm9yIGxhc3QgYmxvY2tcbiAgICAgICAgdmFyIHN5bXMgPSBuZXcgdTMyKDI1MDAwKTtcbiAgICAgICAgLy8gbGVuZ3RoL2xpdGVyYWwgZnJlcSAgIGRpc3RhbmNlIGZyZXFcbiAgICAgICAgdmFyIGxmID0gbmV3IHUxNigyODgpLCBkZiA9IG5ldyB1MTYoMzIpO1xuICAgICAgICAvLyAgbC9sY250ICBleGJpdHMgIGluZGV4ICBsL2xpbmQgIHdhaXRkeCAgYml0cG9zXG4gICAgICAgIHZhciBsY18xID0gMCwgZWIgPSAwLCBpID0gMCwgbGkgPSAwLCB3aSA9IDAsIGJzID0gMDtcbiAgICAgICAgZm9yICg7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGhhc2ggdmFsdWVcbiAgICAgICAgICAgIC8vIGRlb3B0IHdoZW4gaSA+IHMgLSAzIC0gYXQgZW5kLCBkZW9wdCBhY2NlcHRhYmxlXG4gICAgICAgICAgICB2YXIgaHYgPSBoc2goaSk7XG4gICAgICAgICAgICAvLyBpbmRleCBtb2QgMzI3NjggICAgcHJldmlvdXMgaW5kZXggbW9kXG4gICAgICAgICAgICB2YXIgaW1vZCA9IGkgJiAzMjc2NywgcGltb2QgPSBoZWFkW2h2XTtcbiAgICAgICAgICAgIHByZXZbaW1vZF0gPSBwaW1vZDtcbiAgICAgICAgICAgIGhlYWRbaHZdID0gaW1vZDtcbiAgICAgICAgICAgIC8vIFdlIGFsd2F5cyBzaG91bGQgbW9kaWZ5IGhlYWQgYW5kIHByZXYsIGJ1dCBvbmx5IGFkZCBzeW1ib2xzIGlmXG4gICAgICAgICAgICAvLyB0aGlzIGRhdGEgaXMgbm90IHlldCBwcm9jZXNzZWQgKFwid2FpdFwiIGZvciB3YWl0IGluZGV4KVxuICAgICAgICAgICAgaWYgKHdpIDw9IGkpIHtcbiAgICAgICAgICAgICAgICAvLyBieXRlcyByZW1haW5pbmdcbiAgICAgICAgICAgICAgICB2YXIgcmVtID0gcyAtIGk7XG4gICAgICAgICAgICAgICAgaWYgKChsY18xID4gNzAwMCB8fCBsaSA+IDI0NTc2KSAmJiByZW0gPiA0MjMpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gd2JsayhkYXQsIHcsIDAsIHN5bXMsIGxmLCBkZiwgZWIsIGxpLCBicywgaSAtIGJzLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICBsaSA9IGxjXzEgPSBlYiA9IDAsIGJzID0gaTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyODY7ICsrailcbiAgICAgICAgICAgICAgICAgICAgICAgIGxmW2pdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAzMDsgKytqKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGZbal0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgbGVuICAgIGRpc3QgICBjaGFpblxuICAgICAgICAgICAgICAgIHZhciBsID0gMiwgZCA9IDAsIGNoXzEgPSBjLCBkaWYgPSAoaW1vZCAtIHBpbW9kKSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgIGlmIChyZW0gPiAyICYmIGh2ID09IGhzaChpIC0gZGlmKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4biA9IE1hdGgubWluKG4sIHJlbSkgLSAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ZCA9IE1hdGgubWluKDMyNzY3LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF4IHBvc3NpYmxlIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAvLyBub3QgY2FwcGVkIGF0IGRpZiBiZWNhdXNlIGRlY29tcHJlc3NvcnMgaW1wbGVtZW50IFwicm9sbGluZ1wiIGluZGV4IHBvcHVsYXRpb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1sID0gTWF0aC5taW4oMjU4LCByZW0pO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZGlmIDw9IG1heGQgJiYgLS1jaF8xICYmIGltb2QgIT0gcGltb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRbaSArIGxdID09IGRhdFtpICsgbCAtIGRpZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBubCA8IG1sICYmIGRhdFtpICsgbmxdID09IGRhdFtpICsgbmwgLSBkaWZdOyArK25sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sID4gbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gbmwsIGQgPSBkaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBlYXJseSB3aGVuIHdlIHJlYWNoIFwibmljZVwiICh3ZSBhcmUgc2F0aXNmaWVkIGVub3VnaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sID4gbWF4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3csIGZpbmQgdGhlIHJhcmVzdCAyLWJ5dGUgc2VxdWVuY2Ugd2l0aGluIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGVuZ3RoIG9mIGxpdGVyYWxzIGFuZCBzZWFyY2ggZm9yIHRoYXQgaW5zdGVhZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVjaCBmYXN0ZXIgdGhhbiBqdXN0IHVzaW5nIHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW1kID0gTWF0aC5taW4oZGlmLCBubCAtIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1tZDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGkgPSAoaSAtIGRpZiArIGogKyAzMjc2OCkgJiAzMjc2NztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwdGkgPSBwcmV2W3RpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjZCA9ICh0aSAtIHB0aSArIDMyNzY4KSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNkID4gbWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWQgPSBjZCwgcGltb2QgPSB0aTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBwcmV2aW91cyBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1vZCA9IHBpbW9kLCBwaW1vZCA9IHByZXZbaW1vZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWYgKz0gKGltb2QgLSBwaW1vZCArIDMyNzY4KSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGQgd2lsbCBiZSBub256ZXJvIG9ubHkgd2hlbiBhIG1hdGNoIHdhcyBmb3VuZFxuICAgICAgICAgICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIGJvdGggZGlzdCBhbmQgbGVuIGRhdGEgaW4gb25lIFVpbnQzMlxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBpcyByZWNvZ25pemVkIGFzIGEgbGVuL2Rpc3Qgd2l0aCAyOHRoIGJpdCAoMl4yOClcbiAgICAgICAgICAgICAgICAgICAgc3ltc1tsaSsrXSA9IDI2ODQzNTQ1NiB8IChyZXZmbFtsXSA8PCAxOCkgfCByZXZmZFtkXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbiA9IHJldmZsW2xdICYgMzEsIGRpbiA9IHJldmZkW2RdICYgMzE7XG4gICAgICAgICAgICAgICAgICAgIGViICs9IGZsZWJbbGluXSArIGZkZWJbZGluXTtcbiAgICAgICAgICAgICAgICAgICAgKytsZlsyNTcgKyBsaW5dO1xuICAgICAgICAgICAgICAgICAgICArK2RmW2Rpbl07XG4gICAgICAgICAgICAgICAgICAgIHdpID0gaSArIGw7XG4gICAgICAgICAgICAgICAgICAgICsrbGNfMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bXNbbGkrK10gPSBkYXRbaV07XG4gICAgICAgICAgICAgICAgICAgICsrbGZbZGF0W2ldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9zID0gd2JsayhkYXQsIHcsIGxzdCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBpIC0gYnMsIHBvcyk7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGVhc2llc3Qgd2F5IHRvIGF2b2lkIG5lZWRpbmcgdG8gbWFpbnRhaW4gc3RhdGVcbiAgICAgICAgaWYgKCFsc3QgJiYgcG9zICYgNylcbiAgICAgICAgICAgIHBvcyA9IHdmYmxrKHcsIHBvcyArIDEsIGV0KTtcbiAgICB9XG4gICAgcmV0dXJuIHNsYyhvLCAwLCBwcmUgKyBzaGZ0KHBvcykgKyBwb3N0KTtcbn07XG4vLyBDUkMzMiB0YWJsZVxudmFyIGNyY3QgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHQgPSBuZXcgSW50MzJBcnJheSgyNTYpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBpLCBrID0gOTtcbiAgICAgICAgd2hpbGUgKC0taylcbiAgICAgICAgICAgIGMgPSAoKGMgJiAxKSAmJiAtMzA2Njc0OTEyKSBeIChjID4+PiAxKTtcbiAgICAgICAgdFtpXSA9IGM7XG4gICAgfVxuICAgIHJldHVybiB0O1xufSkoKTtcbi8vIENSQzMyXG52YXIgY3JjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjID0gLTE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcDogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIC8vIGNsb3N1cmVzIGhhdmUgYXdmdWwgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHZhciBjciA9IGM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGQubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY3IgPSBjcmN0WyhjciAmIDI1NSkgXiBkW2ldXSBeIChjciA+Pj4gOCk7XG4gICAgICAgICAgICBjID0gY3I7XG4gICAgICAgIH0sXG4gICAgICAgIGQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIH5jOyB9XG4gICAgfTtcbn07XG4vLyBBbGRlcjMyXG52YXIgYWRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGEgPSAxLCBiID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgICBwOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgLy8gY2xvc3VyZXMgaGF2ZSBhd2Z1bCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdmFyIG4gPSBhLCBtID0gYjtcbiAgICAgICAgICAgIHZhciBsID0gZC5sZW5ndGggfCAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgIT0gbDspIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IE1hdGgubWluKGkgKyAyNjU1LCBsKTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGU7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgbSArPSBuICs9IGRbaV07XG4gICAgICAgICAgICAgICAgbiA9IChuICYgNjU1MzUpICsgMTUgKiAobiA+PiAxNiksIG0gPSAobSAmIDY1NTM1KSArIDE1ICogKG0gPj4gMTYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSA9IG4sIGIgPSBtO1xuICAgICAgICB9LFxuICAgICAgICBkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhICU9IDY1NTIxLCBiICU9IDY1NTIxO1xuICAgICAgICAgICAgcmV0dXJuIChhICYgMjU1KSA8PCAyNCB8IChhID4+PiA4KSA8PCAxNiB8IChiICYgMjU1KSA8PCA4IHwgKGIgPj4+IDgpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG47XG4vLyBkZWZsYXRlIHdpdGggb3B0c1xudmFyIGRvcHQgPSBmdW5jdGlvbiAoZGF0LCBvcHQsIHByZSwgcG9zdCwgc3QpIHtcbiAgICByZXR1cm4gZGZsdChkYXQsIG9wdC5sZXZlbCA9PSBudWxsID8gNiA6IG9wdC5sZXZlbCwgb3B0Lm1lbSA9PSBudWxsID8gTWF0aC5jZWlsKE1hdGgubWF4KDgsIE1hdGgubWluKDEzLCBNYXRoLmxvZyhkYXQubGVuZ3RoKSkpICogMS41KSA6ICgxMiArIG9wdC5tZW0pLCBwcmUsIHBvc3QsICFzdCk7XG59O1xuLy8gV2FsbWFydCBvYmplY3Qgc3ByZWFkXG52YXIgbXJnID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbyA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gYSlcbiAgICAgICAgb1trXSA9IGFba107XG4gICAgZm9yICh2YXIgayBpbiBiKVxuICAgICAgICBvW2tdID0gYltrXTtcbiAgICByZXR1cm4gbztcbn07XG4vLyB3b3JrZXIgY2xvbmVcbi8vIFRoaXMgaXMgcG9zc2libHkgdGhlIGNyYXppZXN0IHBhcnQgb2YgdGhlIGVudGlyZSBjb2RlYmFzZSwgZGVzcGl0ZSBob3cgc2ltcGxlIGl0IG1heSBzZWVtLlxuLy8gVGhlIG9ubHkgcGFyYW1ldGVyIHRvIHRoaXMgZnVuY3Rpb24gaXMgYSBjbG9zdXJlIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZiB2YXJpYWJsZXMgb3V0c2lkZSBvZiB0aGUgZnVuY3Rpb24gc2NvcGUuXG4vLyBXZSdyZSBnb2luZyB0byB0cnkgdG8gZmlndXJlIG91dCB0aGUgdmFyaWFibGUgbmFtZXMgdXNlZCBpbiB0aGUgY2xvc3VyZSBhcyBzdHJpbmdzIGJlY2F1c2UgdGhhdCBpcyBjcnVjaWFsIGZvciB3b3JrZXJpemF0aW9uLlxuLy8gV2Ugd2lsbCByZXR1cm4gYW4gb2JqZWN0IG1hcHBpbmcgb2YgdHJ1ZSB2YXJpYWJsZSBuYW1lIHRvIHZhbHVlIChiYXNpY2FsbHksIHRoZSBjdXJyZW50IHNjb3BlIGFzIGEgSlMgb2JqZWN0KS5cbi8vIFRoZSByZWFzb24gd2UgY2FuJ3QganVzdCB1c2UgdGhlIG9yaWdpbmFsIHZhcmlhYmxlIG5hbWVzIGlzIG1pbmlmaWVycyBtYW5nbGluZyB0aGUgdG9wbGV2ZWwgc2NvcGUuXG4vLyBUaGlzIHRvb2sgbWUgdGhyZWUgd2Vla3MgdG8gZmlndXJlIG91dCBob3cgdG8gZG8uXG52YXIgd2NsbiA9IGZ1bmN0aW9uIChmbiwgZm5TdHIsIHRkKSB7XG4gICAgdmFyIGR0ID0gZm4oKTtcbiAgICB2YXIgc3QgPSBmbi50b1N0cmluZygpO1xuICAgIHZhciBrcyA9IHN0LnNsaWNlKHN0LmluZGV4T2YoJ1snKSArIDEsIHN0Lmxhc3RJbmRleE9mKCddJykpLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgdiA9IGR0W2ldLCBrID0ga3NbaV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBmblN0ciArPSAnOycgKyBrICsgJz0nO1xuICAgICAgICAgICAgdmFyIHN0XzEgPSB2LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAodi5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgZ2xvYmFsIG9iamVjdHNcbiAgICAgICAgICAgICAgICBpZiAoc3RfMS5pbmRleE9mKCdbbmF0aXZlIGNvZGVdJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwSW5kID0gc3RfMS5pbmRleE9mKCcgJywgOCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBmblN0ciArPSBzdF8xLnNsaWNlKHNwSW5kLCBzdF8xLmluZGV4T2YoJygnLCBzcEluZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm5TdHIgKz0gc3RfMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdCBpbiB2LnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuU3RyICs9ICc7JyArIGsgKyAnLnByb3RvdHlwZS4nICsgdCArICc9JyArIHYucHJvdG90eXBlW3RdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZuU3RyICs9IHN0XzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGRba10gPSB2O1xuICAgIH1cbiAgICByZXR1cm4gW2ZuU3RyLCB0ZF07XG59O1xudmFyIGNoID0gW107XG4vLyBjbG9uZSBidWZzXG52YXIgY2JmcyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIHRsID0gW107XG4gICAgZm9yICh2YXIgayBpbiB2KSB7XG4gICAgICAgIGlmICh2W2tdLmJ1ZmZlcikge1xuICAgICAgICAgICAgdGwucHVzaCgodltrXSA9IG5ldyB2W2tdLmNvbnN0cnVjdG9yKHZba10pKS5idWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bDtcbn07XG4vLyB1c2UgYSB3b3JrZXIgdG8gZXhlY3V0ZSBjb2RlXG52YXIgd3JrciA9IGZ1bmN0aW9uIChmbnMsIGluaXQsIGlkLCBjYikge1xuICAgIHZhciBfYTtcbiAgICBpZiAoIWNoW2lkXSkge1xuICAgICAgICB2YXIgZm5TdHIgPSAnJywgdGRfMSA9IHt9LCBtID0gZm5zLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbTsgKytpKVxuICAgICAgICAgICAgX2EgPSB3Y2xuKGZuc1tpXSwgZm5TdHIsIHRkXzEpLCBmblN0ciA9IF9hWzBdLCB0ZF8xID0gX2FbMV07XG4gICAgICAgIGNoW2lkXSA9IHdjbG4oZm5zW21dLCBmblN0ciwgdGRfMSk7XG4gICAgfVxuICAgIHZhciB0ZCA9IG1yZyh7fSwgY2hbaWRdWzFdKTtcbiAgICByZXR1cm4gd2soY2hbaWRdWzBdICsgJztvbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciBrIGluIGUuZGF0YSlzZWxmW2tdPWUuZGF0YVtrXTtvbm1lc3NhZ2U9JyArIGluaXQudG9TdHJpbmcoKSArICd9JywgaWQsIHRkLCBjYmZzKHRkKSwgY2IpO1xufTtcbi8vIGJhc2UgYXN5bmMgaW5mbGF0ZSBmblxudmFyIGJJbmZsdCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1OCwgdTE2LCB1MzIsIGZsZWIsIGZkZWIsIGNsaW0sIGZsLCBmZCwgZmxybSwgZmRybSwgcmV2LCBlYywgaE1hcCwgbWF4LCBiaXRzLCBiaXRzMTYsIHNoZnQsIHNsYywgZXJyLCBpbmZsdCwgaW5mbGF0ZVN5bmMsIHBiZiwgZ3U4XTsgfTtcbnZhciBiRGZsdCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1OCwgdTE2LCB1MzIsIGZsZWIsIGZkZWIsIGNsaW0sIHJldmZsLCByZXZmZCwgZmxtLCBmbHQsIGZkbSwgZmR0LCByZXYsIGRlbywgZXQsIGhNYXAsIHdiaXRzLCB3Yml0czE2LCBoVHJlZSwgbG4sIGxjLCBjbGVuLCB3ZmJsaywgd2Jsaywgc2hmdCwgc2xjLCBkZmx0LCBkb3B0LCBkZWZsYXRlU3luYywgcGJmXTsgfTtcbi8vIGd6aXAgZXh0cmFcbnZhciBnemUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3poLCBnemhsLCB3Ynl0ZXMsIGNyYywgY3JjdF07IH07XG4vLyBndW56aXAgZXh0cmFcbnZhciBndXplID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6cywgZ3psXTsgfTtcbi8vIHpsaWIgZXh0cmFcbnZhciB6bGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbemxoLCB3Ynl0ZXMsIGFkbGVyXTsgfTtcbi8vIHVuemxpYiBleHRyYVxudmFyIHp1bGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbemx2XTsgfTtcbi8vIHBvc3QgYnVmXG52YXIgcGJmID0gZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gcG9zdE1lc3NhZ2UobXNnLCBbbXNnLmJ1ZmZlcl0pOyB9O1xuLy8gZ2V0IHU4XG52YXIgZ3U4ID0gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgby5zaXplICYmIG5ldyB1OChvLnNpemUpOyB9O1xuLy8gYXN5bmMgaGVscGVyXG52YXIgY2JpZnkgPSBmdW5jdGlvbiAoZGF0LCBvcHRzLCBmbnMsIGluaXQsIGlkLCBjYikge1xuICAgIHZhciB3ID0gd3JrcihmbnMsIGluaXQsIGlkLCBmdW5jdGlvbiAoZXJyLCBkYXQpIHtcbiAgICAgICAgdy50ZXJtaW5hdGUoKTtcbiAgICAgICAgY2IoZXJyLCBkYXQpO1xuICAgIH0pO1xuICAgIHcucG9zdE1lc3NhZ2UoW2RhdCwgb3B0c10sIG9wdHMuY29uc3VtZSA/IFtkYXQuYnVmZmVyXSA6IFtdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyB3LnRlcm1pbmF0ZSgpOyB9O1xufTtcbi8vIGF1dG8gc3RyZWFtXG52YXIgYXN0cm0gPSBmdW5jdGlvbiAoc3RybSkge1xuICAgIHN0cm0ub25kYXRhID0gZnVuY3Rpb24gKGRhdCwgZmluYWwpIHsgcmV0dXJuIHBvc3RNZXNzYWdlKFtkYXQsIGZpbmFsXSwgW2RhdC5idWZmZXJdKTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2KSB7IHJldHVybiBzdHJtLnB1c2goZXYuZGF0YVswXSwgZXYuZGF0YVsxXSk7IH07XG59O1xuLy8gYXN5bmMgc3RyZWFtIGF0dGFjaFxudmFyIGFzdHJtaWZ5ID0gZnVuY3Rpb24gKGZucywgc3RybSwgb3B0cywgaW5pdCwgaWQpIHtcbiAgICB2YXIgdDtcbiAgICB2YXIgdyA9IHdya3IoZm5zLCBpbml0LCBpZCwgZnVuY3Rpb24gKGVyciwgZGF0KSB7XG4gICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICB3LnRlcm1pbmF0ZSgpLCBzdHJtLm9uZGF0YS5jYWxsKHN0cm0sIGVycik7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRhdFsxXSlcbiAgICAgICAgICAgICAgICB3LnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgc3RybS5vbmRhdGEuY2FsbChzdHJtLCBlcnIsIGRhdFswXSwgZGF0WzFdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHcucG9zdE1lc3NhZ2Uob3B0cyk7XG4gICAgc3RybS5wdXNoID0gZnVuY3Rpb24gKGQsIGYpIHtcbiAgICAgICAgaWYgKCFzdHJtLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHQpXG4gICAgICAgICAgICBzdHJtLm9uZGF0YShlcnIoNCwgMCwgMSksIG51bGwsICEhZik7XG4gICAgICAgIHcucG9zdE1lc3NhZ2UoW2QsIHQgPSBmXSwgW2QuYnVmZmVyXSk7XG4gICAgfTtcbiAgICBzdHJtLnRlcm1pbmF0ZSA9IGZ1bmN0aW9uICgpIHsgdy50ZXJtaW5hdGUoKTsgfTtcbn07XG4vLyByZWFkIDIgYnl0ZXNcbnZhciBiMiA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiBkW2JdIHwgKGRbYiArIDFdIDw8IDgpOyB9O1xuLy8gcmVhZCA0IGJ5dGVzXG52YXIgYjQgPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gKGRbYl0gfCAoZFtiICsgMV0gPDwgOCkgfCAoZFtiICsgMl0gPDwgMTYpIHwgKGRbYiArIDNdIDw8IDI0KSkgPj4+IDA7IH07XG52YXIgYjggPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gYjQoZCwgYikgKyAoYjQoZCwgYiArIDQpICogNDI5NDk2NzI5Nik7IH07XG4vLyB3cml0ZSBieXRlc1xudmFyIHdieXRlcyA9IGZ1bmN0aW9uIChkLCBiLCB2KSB7XG4gICAgZm9yICg7IHY7ICsrYilcbiAgICAgICAgZFtiXSA9IHYsIHYgPj4+PSA4O1xufTtcbi8vIGd6aXAgaGVhZGVyXG52YXIgZ3poID0gZnVuY3Rpb24gKGMsIG8pIHtcbiAgICB2YXIgZm4gPSBvLmZpbGVuYW1lO1xuICAgIGNbMF0gPSAzMSwgY1sxXSA9IDEzOSwgY1syXSA9IDgsIGNbOF0gPSBvLmxldmVsIDwgMiA/IDQgOiBvLmxldmVsID09IDkgPyAyIDogMCwgY1s5XSA9IDM7IC8vIGFzc3VtZSBVbml4XG4gICAgaWYgKG8ubXRpbWUgIT0gMClcbiAgICAgICAgd2J5dGVzKGMsIDQsIE1hdGguZmxvb3IobmV3IERhdGUoby5tdGltZSB8fCBEYXRlLm5vdygpKSAvIDEwMDApKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgICAgY1szXSA9IDg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGZuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY1tpICsgMTBdID0gZm4uY2hhckNvZGVBdChpKTtcbiAgICB9XG59O1xuLy8gZ3ppcCBmb290ZXI6IC04IHRvIC00ID0gQ1JDLCAtNCB0byAtMCBpcyBsZW5ndGhcbi8vIGd6aXAgc3RhcnRcbnZhciBnenMgPSBmdW5jdGlvbiAoZCkge1xuICAgIGlmIChkWzBdICE9IDMxIHx8IGRbMV0gIT0gMTM5IHx8IGRbMl0gIT0gOClcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIGd6aXAgZGF0YScpO1xuICAgIHZhciBmbGcgPSBkWzNdO1xuICAgIHZhciBzdCA9IDEwO1xuICAgIGlmIChmbGcgJiA0KVxuICAgICAgICBzdCArPSBkWzEwXSB8IChkWzExXSA8PCA4KSArIDI7XG4gICAgZm9yICh2YXIgenMgPSAoZmxnID4+IDMgJiAxKSArIChmbGcgPj4gNCAmIDEpOyB6cyA+IDA7IHpzIC09ICFkW3N0KytdKVxuICAgICAgICA7XG4gICAgcmV0dXJuIHN0ICsgKGZsZyAmIDIpO1xufTtcbi8vIGd6aXAgbGVuZ3RoXG52YXIgZ3psID0gZnVuY3Rpb24gKGQpIHtcbiAgICB2YXIgbCA9IGQubGVuZ3RoO1xuICAgIHJldHVybiAoKGRbbCAtIDRdIHwgZFtsIC0gM10gPDwgOCB8IGRbbCAtIDJdIDw8IDE2KSB8IChkW2wgLSAxXSA8PCAyNCkpID4+PiAwO1xufTtcbi8vIGd6aXAgaGVhZGVyIGxlbmd0aFxudmFyIGd6aGwgPSBmdW5jdGlvbiAobykgeyByZXR1cm4gMTAgKyAoKG8uZmlsZW5hbWUgJiYgKG8uZmlsZW5hbWUubGVuZ3RoICsgMSkpIHx8IDApOyB9O1xuLy8gemxpYiBoZWFkZXJcbnZhciB6bGggPSBmdW5jdGlvbiAoYywgbykge1xuICAgIHZhciBsdiA9IG8ubGV2ZWwsIGZsID0gbHYgPT0gMCA/IDAgOiBsdiA8IDYgPyAxIDogbHYgPT0gOSA/IDMgOiAyO1xuICAgIGNbMF0gPSAxMjAsIGNbMV0gPSAoZmwgPDwgNikgfCAoZmwgPyAoMzIgLSAyICogZmwpIDogMSk7XG59O1xuLy8gemxpYiB2YWxpZFxudmFyIHpsdiA9IGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKChkWzBdICYgMTUpICE9IDggfHwgKGRbMF0gPj4+IDQpID4gNyB8fCAoKGRbMF0gPDwgOCB8IGRbMV0pICUgMzEpKVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhJyk7XG4gICAgaWYgKGRbMV0gJiAzMilcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIHpsaWIgZGF0YTogcHJlc2V0IGRpY3Rpb25hcmllcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuZnVuY3Rpb24gQXN5bmNDbXBTdHJtKG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYiAmJiB0eXBlb2Ygb3B0cyA9PSAnZnVuY3Rpb24nKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIHJldHVybiBvcHRzO1xufVxuLy8gemxpYiBmb290ZXI6IC00IHRvIC0wIGlzIEFkbGVyMzJcbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb25cbiAqL1xudmFyIERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmbGF0ZShvcHRzLCBjYikge1xuICAgICAgICBpZiAoIWNiICYmIHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdGhpcy5vID0gb3B0cyB8fCB7fTtcbiAgICB9XG4gICAgRGVmbGF0ZS5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHRoaXMub25kYXRhKGRvcHQoYywgdGhpcy5vLCAwLCAwLCAhZiksIGYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdGhpcy5kID0gZmluYWw7XG4gICAgICAgIHRoaXMucChjaHVuaywgZmluYWwgfHwgZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgRGVmbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0RlZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGVdOyB9XG4gICAgICAgIF0sIHRoaXMsIEFzeW5jQ21wU3RybS5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBEZWZsYXRlKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDYpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jRGVmbGF0ZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmxhdGUoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihkZWZsYXRlU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDAsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3NlcyBkYXRhIHdpdGggREVGTEFURSB3aXRob3V0IGFueSB3cmFwcGVyXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWZsYXRlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZsYXRlU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgcmV0dXJuIGRvcHQoZGF0YSwgb3B0cyB8fCB7fSwgMCwgMCk7XG59XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbmZsYXRpb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgaW5mbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBJbmZsYXRlKGNiKSB7XG4gICAgICAgIHRoaXMucyA9IHt9O1xuICAgICAgICB0aGlzLnAgPSBuZXcgdTgoMCk7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIEluZmxhdGUucHJvdG90eXBlLmUgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB2YXIgbCA9IHRoaXMucC5sZW5ndGg7XG4gICAgICAgIHZhciBuID0gbmV3IHU4KGwgKyBjLmxlbmd0aCk7XG4gICAgICAgIG4uc2V0KHRoaXMucCksIG4uc2V0KGMsIGwpLCB0aGlzLnAgPSBuO1xuICAgIH07XG4gICAgSW5mbGF0ZS5wcm90b3R5cGUuYyA9IGZ1bmN0aW9uIChmaW5hbCkge1xuICAgICAgICB0aGlzLmQgPSB0aGlzLnMuaSA9IGZpbmFsIHx8IGZhbHNlO1xuICAgICAgICB2YXIgYnRzID0gdGhpcy5zLmI7XG4gICAgICAgIHZhciBkdCA9IGluZmx0KHRoaXMucCwgdGhpcy5vLCB0aGlzLnMpO1xuICAgICAgICB0aGlzLm9uZGF0YShzbGMoZHQsIGJ0cywgdGhpcy5zLmIpLCB0aGlzLmQpO1xuICAgICAgICB0aGlzLm8gPSBzbGMoZHQsIHRoaXMucy5iIC0gMzI3NjgpLCB0aGlzLnMuYiA9IHRoaXMuby5sZW5ndGg7XG4gICAgICAgIHRoaXMucCA9IHNsYyh0aGlzLnAsICh0aGlzLnMucCAvIDgpIHwgMCksIHRoaXMucy5wICY9IDc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBpbmZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGZpbmFsIGNodW5rXG4gICAgICovXG4gICAgSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5lKGNodW5rKSwgdGhpcy5jKGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEluZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBpbmZsYXRpb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVmbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY0luZmxhdGUoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkluZmx0LFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlXTsgfVxuICAgICAgICBdLCB0aGlzLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBJbmZsYXRlKCk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgNyk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0luZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNJbmZsYXRlIH07XG5leHBvcnQgZnVuY3Rpb24gaW5mbGF0ZShkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdFxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGluZmxhdGVTeW5jKGV2LmRhdGFbMF0sIGd1OChldi5kYXRhWzFdKSkpOyB9LCAxLCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgREVGTEFURSBkYXRhIHdpdGggbm8gd3JhcHBlclxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gU2F2ZXMgbWVtb3J5IGlmIHlvdSBrbm93IHRoZSBkZWNvbXByZXNzZWQgc2l6ZSBhbmQgcHJvdmlkZSBhbiBvdXRwdXQgYnVmZmVyIG9mIHRoYXQgbGVuZ3RoLlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmZsYXRlU3luYyhkYXRhLCBvdXQpIHtcbiAgICByZXR1cm4gaW5mbHQoZGF0YSwgb3V0KTtcbn1cbi8vIGJlZm9yZSB5b3UgeWVsbCBhdCBtZSBmb3Igbm90IGp1c3QgdXNpbmcgZXh0ZW5kcywgbXkgcmVhc29uIGlzIHRoYXQgVFMgaW5oZXJpdGFuY2UgaXMgaGFyZCB0byB3b3JrZXJpemUuXG4vKipcbiAqIFN0cmVhbWluZyBHWklQIGNvbXByZXNzaW9uXG4gKi9cbnZhciBHemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEd6aXAob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5jID0gY3JjKCk7XG4gICAgICAgIHRoaXMubCA9IDA7XG4gICAgICAgIHRoaXMudiA9IDE7XG4gICAgICAgIERlZmxhdGUuY2FsbCh0aGlzLCBvcHRzLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIEdaSVBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgR3ppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICBHemlwLnByb3RvdHlwZS5wID0gZnVuY3Rpb24gKGMsIGYpIHtcbiAgICAgICAgdGhpcy5jLnAoYyk7XG4gICAgICAgIHRoaXMubCArPSBjLmxlbmd0aDtcbiAgICAgICAgdmFyIHJhdyA9IGRvcHQoYywgdGhpcy5vLCB0aGlzLnYgJiYgZ3pobCh0aGlzLm8pLCBmICYmIDgsICFmKTtcbiAgICAgICAgaWYgKHRoaXMudilcbiAgICAgICAgICAgIGd6aChyYXcsIHRoaXMubyksIHRoaXMudiA9IDA7XG4gICAgICAgIGlmIChmKVxuICAgICAgICAgICAgd2J5dGVzKHJhdywgcmF3Lmxlbmd0aCAtIDgsIHRoaXMuYy5kKCkpLCB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gNCwgdGhpcy5sKTtcbiAgICAgICAgdGhpcy5vbmRhdGEocmF3LCBmKTtcbiAgICB9O1xuICAgIHJldHVybiBHemlwO1xufSgpKTtcbmV4cG9ydCB7IEd6aXAgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBHWklQIGNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0d6aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNHemlwKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJEZmx0LFxuICAgICAgICAgICAgZ3plLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBEZWZsYXRlLCBHemlwXTsgfVxuICAgICAgICBdLCB0aGlzLCBBc3luY0NtcFN0cm0uY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgR3ppcChldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA4KTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jR3ppcDtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0d6aXAgfTtcbmV4cG9ydCBmdW5jdGlvbiBnemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkRmbHQsXG4gICAgICAgIGd6ZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6aXBTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGd6aXBTeW5jKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pKTsgfSwgMiwgY2IpO1xufVxuLyoqXG4gKiBDb21wcmVzc2VzIGRhdGEgd2l0aCBHWklQXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBnemlwcGVkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGd6aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgYyA9IGNyYygpLCBsID0gZGF0YS5sZW5ndGg7XG4gICAgYy5wKGRhdGEpO1xuICAgIHZhciBkID0gZG9wdChkYXRhLCBvcHRzLCBnemhsKG9wdHMpLCA4KSwgcyA9IGQubGVuZ3RoO1xuICAgIHJldHVybiBnemgoZCwgb3B0cyksIHdieXRlcyhkLCBzIC0gOCwgYy5kKCkpLCB3Ynl0ZXMoZCwgcyAtIDQsIGwpLCBkO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgR1pJUCBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBHdW56aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdVTlpJUCBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBpbmZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEd1bnppcChjYikge1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBJbmZsYXRlLmNhbGwodGhpcywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBHVU5aSVBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgR3VuemlwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5lLmNhbGwodGhpcywgY2h1bmspO1xuICAgICAgICBpZiAodGhpcy52KSB7XG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMucC5sZW5ndGggPiAzID8gZ3pzKHRoaXMucCkgOiA0O1xuICAgICAgICAgICAgaWYgKHMgPj0gdGhpcy5wLmxlbmd0aCAmJiAhZmluYWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5wID0gdGhpcy5wLnN1YmFycmF5KHMpLCB0aGlzLnYgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPCA4KVxuICAgICAgICAgICAgICAgIGVycig2LCAnaW52YWxpZCBnemlwIGRhdGEnKTtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSgwLCAtOCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmVjZXNzYXJ5IHRvIHByZXZlbnQgVFMgZnJvbSB1c2luZyB0aGUgY2xvc3VyZSB2YWx1ZVxuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3Igd29ya2VyaXphdGlvbiB0byBmdW5jdGlvbiBjb3JyZWN0bHlcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuYy5jYWxsKHRoaXMsIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBHdW56aXA7XG59KCkpO1xuZXhwb3J0IHsgR3VuemlwIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0d1bnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBHVU5aSVAgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVmbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY0d1bnppcChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiSW5mbHQsXG4gICAgICAgICAgICBndXplLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlLCBHdW56aXBdOyB9XG4gICAgICAgIF0sIHRoaXMsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IEd1bnppcCgpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDkpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNHdW56aXA7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNHdW56aXAgfTtcbmV4cG9ydCBmdW5jdGlvbiBndW56aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiSW5mbHQsXG4gICAgICAgIGd1emUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtndW56aXBTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGd1bnppcFN5bmMoZXYuZGF0YVswXSkpOyB9LCAzLCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgR1pJUCBkYXRhXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3V0IFdoZXJlIHRvIHdyaXRlIHRoZSBkYXRhLiBHWklQIGFscmVhZHkgZW5jb2RlcyB0aGUgb3V0cHV0IHNpemUsIHNvIHByb3ZpZGluZyB0aGlzIGRvZXNuJ3Qgc2F2ZSBtZW1vcnkuXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGd1bnppcFN5bmMoZGF0YSwgb3V0KSB7XG4gICAgcmV0dXJuIGluZmx0KGRhdGEuc3ViYXJyYXkoZ3pzKGRhdGEpLCAtOCksIG91dCB8fCBuZXcgdTgoZ3psKGRhdGEpKSk7XG59XG4vKipcbiAqIFN0cmVhbWluZyBabGliIGNvbXByZXNzaW9uXG4gKi9cbnZhciBabGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFpsaWIob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5jID0gYWRsZXIoKTtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgRGVmbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgemxpYmJlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBabGliLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBEZWZsYXRlLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIFpsaWIucHJvdG90eXBlLnAgPSBmdW5jdGlvbiAoYywgZikge1xuICAgICAgICB0aGlzLmMucChjKTtcbiAgICAgICAgdmFyIHJhdyA9IGRvcHQoYywgdGhpcy5vLCB0aGlzLnYgJiYgMiwgZiAmJiA0LCAhZik7XG4gICAgICAgIGlmICh0aGlzLnYpXG4gICAgICAgICAgICB6bGgocmF3LCB0aGlzLm8pLCB0aGlzLnYgPSAwO1xuICAgICAgICBpZiAoZilcbiAgICAgICAgICAgIHdieXRlcyhyYXcsIHJhdy5sZW5ndGggLSA0LCB0aGlzLmMuZCgpKTtcbiAgICAgICAgdGhpcy5vbmRhdGEocmF3LCBmKTtcbiAgICB9O1xuICAgIHJldHVybiBabGliO1xufSgpKTtcbmV4cG9ydCB7IFpsaWIgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBabGliIGNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY1psaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNabGliKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJEZmx0LFxuICAgICAgICAgICAgemxlLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBEZWZsYXRlLCBabGliXTsgfVxuICAgICAgICBdLCB0aGlzLCBBc3luY0NtcFN0cm0uY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgWmxpYihldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY1psaWI7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNabGliIH07XG5leHBvcnQgZnVuY3Rpb24gemxpYihkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJEZmx0LFxuICAgICAgICB6bGUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bGliU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZih6bGliU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDQsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3MgZGF0YSB3aXRoIFpsaWJcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIHpsaWItY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6bGliU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKVxuICAgICAgICBvcHRzID0ge307XG4gICAgdmFyIGEgPSBhZGxlcigpO1xuICAgIGEucChkYXRhKTtcbiAgICB2YXIgZCA9IGRvcHQoZGF0YSwgb3B0cywgMiwgNCk7XG4gICAgcmV0dXJuIHpsaChkLCBvcHRzKSwgd2J5dGVzKGQsIGQubGVuZ3RoIC0gNCwgYS5kKCkpLCBkO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgWmxpYiBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBVbnpsaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFpsaWIgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBpbmZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVuemxpYihjYikge1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBJbmZsYXRlLmNhbGwodGhpcywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB1bnpsaWJiZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgVW56bGliLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5lLmNhbGwodGhpcywgY2h1bmspO1xuICAgICAgICBpZiAodGhpcy52KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA8IDIgJiYgIWZpbmFsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSgyKSwgdGhpcy52ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnAubGVuZ3RoIDwgNClcbiAgICAgICAgICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhJyk7XG4gICAgICAgICAgICB0aGlzLnAgPSB0aGlzLnAuc3ViYXJyYXkoMCwgLTQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5lY2Vzc2FyeSB0byBwcmV2ZW50IFRTIGZyb20gdXNpbmcgdGhlIGNsb3N1cmUgdmFsdWVcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIHdvcmtlcml6YXRpb24gdG8gZnVuY3Rpb24gY29ycmVjdGx5XG4gICAgICAgIEluZmxhdGUucHJvdG90eXBlLmMuY2FsbCh0aGlzLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gVW56bGliO1xufSgpKTtcbmV4cG9ydCB7IFVuemxpYiB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIFpsaWIgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNVbnpsaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgWmxpYiBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNVbnpsaWIoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkluZmx0LFxuICAgICAgICAgICAgenVsZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgSW5mbGF0ZSwgVW56bGliXTsgfVxuICAgICAgICBdLCB0aGlzLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBVbnpsaWIoKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCAxMSk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY1VuemxpYjtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1VuemxpYiB9O1xuZXhwb3J0IGZ1bmN0aW9uIHVuemxpYihkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdCxcbiAgICAgICAgenVsZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW3VuemxpYlN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYodW56bGliU3luYyhldi5kYXRhWzBdLCBndTgoZXYuZGF0YVsxXSkpKTsgfSwgNSwgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIFpsaWIgZGF0YVxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gU2F2ZXMgbWVtb3J5IGlmIHlvdSBrbm93IHRoZSBkZWNvbXByZXNzZWQgc2l6ZSBhbmQgcHJvdmlkZSBhbiBvdXRwdXQgYnVmZmVyIG9mIHRoYXQgbGVuZ3RoLlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnpsaWJTeW5jKGRhdGEsIG91dCkge1xuICAgIHJldHVybiBpbmZsdCgoemx2KGRhdGEpLCBkYXRhLnN1YmFycmF5KDIsIC00KSksIG91dCk7XG59XG4vLyBEZWZhdWx0IGFsZ29yaXRobSBmb3IgY29tcHJlc3Npb24gKHVzZWQgYmVjYXVzZSBoYXZpbmcgYSBrbm93biBvdXRwdXQgc2l6ZSBhbGxvd3MgZmFzdGVyIGRlY29tcHJlc3Npb24pXG5leHBvcnQgeyBnemlwIGFzIGNvbXByZXNzLCBBc3luY0d6aXAgYXMgQXN5bmNDb21wcmVzcyB9O1xuLy8gRGVmYXVsdCBhbGdvcml0aG0gZm9yIGNvbXByZXNzaW9uICh1c2VkIGJlY2F1c2UgaGF2aW5nIGEga25vd24gb3V0cHV0IHNpemUgYWxsb3dzIGZhc3RlciBkZWNvbXByZXNzaW9uKVxuZXhwb3J0IHsgZ3ppcFN5bmMgYXMgY29tcHJlc3NTeW5jLCBHemlwIGFzIENvbXByZXNzIH07XG4vKipcbiAqIFN0cmVhbWluZyBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBEZWNvbXByZXNzID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlY29tcHJlc3NlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERlY29tcHJlc3MoY2IpIHtcbiAgICAgICAgdGhpcy5HID0gR3VuemlwO1xuICAgICAgICB0aGlzLkkgPSBJbmZsYXRlO1xuICAgICAgICB0aGlzLlogPSBVbnpsaWI7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29tcHJlc3NlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAoIXRoaXMucykge1xuICAgICAgICAgICAgaWYgKHRoaXMucCAmJiB0aGlzLnAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBuZXcgdTgodGhpcy5wLmxlbmd0aCArIGNodW5rLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbi5zZXQodGhpcy5wKSwgbi5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucCA9IGNodW5rO1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBjYiA9IGZ1bmN0aW9uICgpIHsgX3RoaXNfMS5vbmRhdGEuYXBwbHkoX3RoaXNfMSwgYXJndW1lbnRzKTsgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnMgPSAodGhpcy5wWzBdID09IDMxICYmIHRoaXMucFsxXSA9PSAxMzkgJiYgdGhpcy5wWzJdID09IDgpXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IHRoaXMuRyhjYilcbiAgICAgICAgICAgICAgICAgICAgOiAoKHRoaXMucFswXSAmIDE1KSAhPSA4IHx8ICh0aGlzLnBbMF0gPj4gNCkgPiA3IHx8ICgodGhpcy5wWzBdIDw8IDggfCB0aGlzLnBbMV0pICUgMzEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgdGhpcy5JKGNiKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgdGhpcy5aKGNiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnMucHVzaCh0aGlzLnAsIGZpbmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnAgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucy5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVjb21wcmVzcztcbn0oKSk7XG5leHBvcnQgeyBEZWNvbXByZXNzIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNEZWNvbXByZXNzID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWNvbXByZXNzZWRcbiAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNEZWNvbXByZXNzKGNiKSB7XG4gICAgICAgIHRoaXMuRyA9IEFzeW5jR3VuemlwO1xuICAgICAgICB0aGlzLkkgPSBBc3luY0luZmxhdGU7XG4gICAgICAgIHRoaXMuWiA9IEFzeW5jVW56bGliO1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWNvbXByZXNzZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgQXN5bmNEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY0RlY29tcHJlc3M7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNEZWNvbXByZXNzIH07XG5leHBvcnQgZnVuY3Rpb24gZGVjb21wcmVzcyhkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiAoZGF0YVswXSA9PSAzMSAmJiBkYXRhWzFdID09IDEzOSAmJiBkYXRhWzJdID09IDgpXG4gICAgICAgID8gZ3VuemlwKGRhdGEsIG9wdHMsIGNiKVxuICAgICAgICA6ICgoZGF0YVswXSAmIDE1KSAhPSA4IHx8IChkYXRhWzBdID4+IDQpID4gNyB8fCAoKGRhdGFbMF0gPDwgOCB8IGRhdGFbMV0pICUgMzEpKVxuICAgICAgICAgICAgPyBpbmZsYXRlKGRhdGEsIG9wdHMsIGNiKVxuICAgICAgICAgICAgOiB1bnpsaWIoZGF0YSwgb3B0cywgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIGNvbXByZXNzZWQgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGF0YSwgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGZvcm1hdFxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gU2F2ZXMgbWVtb3J5IGlmIHlvdSBrbm93IHRoZSBkZWNvbXByZXNzZWQgc2l6ZSBhbmQgcHJvdmlkZSBhbiBvdXRwdXQgYnVmZmVyIG9mIHRoYXQgbGVuZ3RoLlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXByZXNzU3luYyhkYXRhLCBvdXQpIHtcbiAgICByZXR1cm4gKGRhdGFbMF0gPT0gMzEgJiYgZGF0YVsxXSA9PSAxMzkgJiYgZGF0YVsyXSA9PSA4KVxuICAgICAgICA/IGd1bnppcFN5bmMoZGF0YSwgb3V0KVxuICAgICAgICA6ICgoZGF0YVswXSAmIDE1KSAhPSA4IHx8IChkYXRhWzBdID4+IDQpID4gNyB8fCAoKGRhdGFbMF0gPDwgOCB8IGRhdGFbMV0pICUgMzEpKVxuICAgICAgICAgICAgPyBpbmZsYXRlU3luYyhkYXRhLCBvdXQpXG4gICAgICAgICAgICA6IHVuemxpYlN5bmMoZGF0YSwgb3V0KTtcbn1cbi8vIGZsYXR0ZW4gYSBkaXJlY3Rvcnkgc3RydWN0dXJlXG52YXIgZmx0biA9IGZ1bmN0aW9uIChkLCBwLCB0LCBvKSB7XG4gICAgZm9yICh2YXIgayBpbiBkKSB7XG4gICAgICAgIHZhciB2YWwgPSBkW2tdLCBuID0gcCArIGssIG9wID0gbztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgICAgIG9wID0gbXJnKG8sIHZhbFsxXSksIHZhbCA9IHZhbFswXTtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIHU4KVxuICAgICAgICAgICAgdFtuXSA9IFt2YWwsIG9wXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0W24gKz0gJy8nXSA9IFtuZXcgdTgoMCksIG9wXTtcbiAgICAgICAgICAgIGZsdG4odmFsLCBuLCB0LCBvKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vLyB0ZXh0IGVuY29kZXJcbnZhciB0ZSA9IHR5cGVvZiBUZXh0RW5jb2RlciAhPSAndW5kZWZpbmVkJyAmJiAvKiNfX1BVUkVfXyovIG5ldyBUZXh0RW5jb2RlcigpO1xuLy8gdGV4dCBkZWNvZGVyXG52YXIgdGQgPSB0eXBlb2YgVGV4dERlY29kZXIgIT0gJ3VuZGVmaW5lZCcgJiYgLyojX19QVVJFX18qLyBuZXcgVGV4dERlY29kZXIoKTtcbi8vIHRleHQgZGVjb2RlciBzdHJlYW1cbnZhciB0ZHMgPSAwO1xudHJ5IHtcbiAgICB0ZC5kZWNvZGUoZXQsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgIHRkcyA9IDE7XG59XG5jYXRjaCAoZSkgeyB9XG4vLyBkZWNvZGUgVVRGOFxudmFyIGR1dGY4ID0gZnVuY3Rpb24gKGQpIHtcbiAgICBmb3IgKHZhciByID0gJycsIGkgPSAwOzspIHtcbiAgICAgICAgdmFyIGMgPSBkW2krK107XG4gICAgICAgIHZhciBlYiA9IChjID4gMTI3KSArIChjID4gMjIzKSArIChjID4gMjM5KTtcbiAgICAgICAgaWYgKGkgKyBlYiA+IGQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIFtyLCBzbGMoZCwgaSAtIDEpXTtcbiAgICAgICAgaWYgKCFlYilcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgZWxzZSBpZiAoZWIgPT0gMykge1xuICAgICAgICAgICAgYyA9ICgoYyAmIDE1KSA8PCAxOCB8IChkW2krK10gJiA2MykgPDwgMTIgfCAoZFtpKytdICYgNjMpIDw8IDYgfCAoZFtpKytdICYgNjMpKSAtIDY1NTM2LFxuICAgICAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NiB8IChjID4+IDEwKSwgNTYzMjAgfCAoYyAmIDEwMjMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlYiAmIDEpXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAzMSkgPDwgNiB8IChkW2krK10gJiA2MykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAxNSkgPDwgMTIgfCAoZFtpKytdICYgNjMpIDw8IDYgfCAoZFtpKytdICYgNjMpKTtcbiAgICB9XG59O1xuLyoqXG4gKiBTdHJlYW1pbmcgVVRGLTggZGVjb2RpbmdcbiAqL1xudmFyIERlY29kZVVURjggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVURi04IGRlY29kaW5nIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlY29kZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWNvZGVVVEY4KGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIGlmICh0ZHMpXG4gICAgICAgICAgICB0aGlzLnQgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wID0gZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29kZWQgZnJvbSBVVEYtOCBiaW5hcnlcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVjb2RlVVRGOC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgZmluYWwgPSAhIWZpbmFsO1xuICAgICAgICBpZiAodGhpcy50KSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YSh0aGlzLnQuZGVjb2RlKGNodW5rLCB7IHN0cmVhbTogdHJ1ZSB9KSwgZmluYWwpO1xuICAgICAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudC5kZWNvZGUoKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB2YXIgZGF0ID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjaHVuay5sZW5ndGgpO1xuICAgICAgICBkYXQuc2V0KHRoaXMucCk7XG4gICAgICAgIGRhdC5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICB2YXIgX2EgPSBkdXRmOChkYXQpLCBjaCA9IF9hWzBdLCBucCA9IF9hWzFdO1xuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmIChucC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZXJyKDgpO1xuICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnAgPSBucDtcbiAgICAgICAgdGhpcy5vbmRhdGEoY2gsIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWNvZGVVVEY4O1xufSgpKTtcbmV4cG9ydCB7IERlY29kZVVURjggfTtcbi8qKlxuICogU3RyZWFtaW5nIFVURi04IGVuY29kaW5nXG4gKi9cbnZhciBFbmNvZGVVVEY4ID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVVEYtOCBkZWNvZGluZyBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBlbmNvZGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gRW5jb2RlVVRGOChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBlbmNvZGVkIHRvIFVURi04XG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBzdHJpbmcgZGF0YSB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEVuY29kZVVURjgucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIHRoaXMub25kYXRhKHN0clRvVTgoY2h1bmspLCB0aGlzLmQgPSBmaW5hbCB8fCBmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gRW5jb2RlVVRGODtcbn0oKSk7XG5leHBvcnQgeyBFbmNvZGVVVEY4IH07XG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIGludG8gYSBVaW50OEFycmF5IGZvciB1c2Ugd2l0aCBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIG1ldGhvZHNcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlbmNvZGVcbiAqIEBwYXJhbSBsYXRpbjEgV2hldGhlciBvciBub3QgdG8gaW50ZXJwcmV0IHRoZSBkYXRhIGFzIExhdGluLTEuIFRoaXMgc2hvdWxkXG4gKiAgICAgICAgICAgICAgIG5vdCBuZWVkIHRvIGJlIHRydWUgdW5sZXNzIGRlY29kaW5nIGEgYmluYXJ5IHN0cmluZy5cbiAqIEByZXR1cm5zIFRoZSBzdHJpbmcgZW5jb2RlZCBpbiBVVEYtOC9MYXRpbi0xIGJpbmFyeVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9VOChzdHIsIGxhdGluMSkge1xuICAgIGlmIChsYXRpbjEpIHtcbiAgICAgICAgdmFyIGFyXzEgPSBuZXcgdTgoc3RyLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYXJfMVtpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICByZXR1cm4gYXJfMTtcbiAgICB9XG4gICAgaWYgKHRlKVxuICAgICAgICByZXR1cm4gdGUuZW5jb2RlKHN0cik7XG4gICAgdmFyIGwgPSBzdHIubGVuZ3RoO1xuICAgIHZhciBhciA9IG5ldyB1OChzdHIubGVuZ3RoICsgKHN0ci5sZW5ndGggPj4gMSkpO1xuICAgIHZhciBhaSA9IDA7XG4gICAgdmFyIHcgPSBmdW5jdGlvbiAodikgeyBhclthaSsrXSA9IHY7IH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKGFpICsgNSA+IGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG4gPSBuZXcgdTgoYWkgKyA4ICsgKChsIC0gaSkgPDwgMSkpO1xuICAgICAgICAgICAgbi5zZXQoYXIpO1xuICAgICAgICAgICAgYXIgPSBuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMTI4IHx8IGxhdGluMSlcbiAgICAgICAgICAgIHcoYyk7XG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxuICAgICAgICAgICAgdygxOTIgfCAoYyA+PiA2KSksIHcoMTI4IHwgKGMgJiA2MykpO1xuICAgICAgICBlbHNlIGlmIChjID4gNTUyOTUgJiYgYyA8IDU3MzQ0KVxuICAgICAgICAgICAgYyA9IDY1NTM2ICsgKGMgJiAxMDIzIDw8IDEwKSB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMTAyMyksXG4gICAgICAgICAgICAgICAgdygyNDAgfCAoYyA+PiAxOCkpLCB3KDEyOCB8ICgoYyA+PiAxMikgJiA2MykpLCB3KDEyOCB8ICgoYyA+PiA2KSAmIDYzKSksIHcoMTI4IHwgKGMgJiA2MykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3KDIyNCB8IChjID4+IDEyKSksIHcoMTI4IHwgKChjID4+IDYpICYgNjMpKSwgdygxMjggfCAoYyAmIDYzKSk7XG4gICAgfVxuICAgIHJldHVybiBzbGMoYXIsIDAsIGFpKTtcbn1cbi8qKlxuICogQ29udmVydHMgYSBVaW50OEFycmF5IHRvIGEgc3RyaW5nXG4gKiBAcGFyYW0gZGF0IFRoZSBkYXRhIHRvIGRlY29kZSB0byBzdHJpbmdcbiAqIEBwYXJhbSBsYXRpbjEgV2hldGhlciBvciBub3QgdG8gaW50ZXJwcmV0IHRoZSBkYXRhIGFzIExhdGluLTEuIFRoaXMgc2hvdWxkXG4gKiAgICAgICAgICAgICAgIG5vdCBuZWVkIHRvIGJlIHRydWUgdW5sZXNzIGVuY29kaW5nIHRvIGJpbmFyeSBzdHJpbmcuXG4gKiBAcmV0dXJucyBUaGUgb3JpZ2luYWwgVVRGLTgvTGF0aW4tMSBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0ckZyb21VOChkYXQsIGxhdGluMSkge1xuICAgIGlmIChsYXRpbjEpIHtcbiAgICAgICAgdmFyIHIgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXQubGVuZ3RoOyBpICs9IDE2Mzg0KVxuICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGRhdC5zdWJhcnJheShpLCBpICsgMTYzODQpKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRkKVxuICAgICAgICByZXR1cm4gdGQuZGVjb2RlKGRhdCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBfYSA9IGR1dGY4KGRhdCksIG91dCA9IF9hWzBdLCBleHQgPSBfYVsxXTtcbiAgICAgICAgaWYgKGV4dC5sZW5ndGgpXG4gICAgICAgICAgICBlcnIoOCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxufVxuO1xuLy8gZGVmbGF0ZSBiaXQgZmxhZ1xudmFyIGRiZiA9IGZ1bmN0aW9uIChsKSB7IHJldHVybiBsID09IDEgPyAzIDogbCA8IDYgPyAyIDogbCA9PSA5ID8gMSA6IDA7IH07XG4vLyBza2lwIGxvY2FsIHppcCBoZWFkZXJcbnZhciBzbHpoID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGIgKyAzMCArIGIyKGQsIGIgKyAyNikgKyBiMihkLCBiICsgMjgpOyB9O1xuLy8gcmVhZCB6aXAgaGVhZGVyXG52YXIgemggPSBmdW5jdGlvbiAoZCwgYiwgeikge1xuICAgIHZhciBmbmwgPSBiMihkLCBiICsgMjgpLCBmbiA9IHN0ckZyb21VOChkLnN1YmFycmF5KGIgKyA0NiwgYiArIDQ2ICsgZm5sKSwgIShiMihkLCBiICsgOCkgJiAyMDQ4KSksIGVzID0gYiArIDQ2ICsgZm5sLCBicyA9IGI0KGQsIGIgKyAyMCk7XG4gICAgdmFyIF9hID0geiAmJiBicyA9PSA0Mjk0OTY3Mjk1ID8gejY0ZShkLCBlcykgOiBbYnMsIGI0KGQsIGIgKyAyNCksIGI0KGQsIGIgKyA0MildLCBzYyA9IF9hWzBdLCBzdSA9IF9hWzFdLCBvZmYgPSBfYVsyXTtcbiAgICByZXR1cm4gW2IyKGQsIGIgKyAxMCksIHNjLCBzdSwgZm4sIGVzICsgYjIoZCwgYiArIDMwKSArIGIyKGQsIGIgKyAzMiksIG9mZl07XG59O1xuLy8gcmVhZCB6aXA2NCBleHRyYSBmaWVsZFxudmFyIHo2NGUgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAoOyBiMihkLCBiKSAhPSAxOyBiICs9IDQgKyBiMihkLCBiICsgMikpXG4gICAgICAgIDtcbiAgICByZXR1cm4gW2I4KGQsIGIgKyAxMiksIGI4KGQsIGIgKyA0KSwgYjgoZCwgYiArIDIwKV07XG59O1xuLy8gZXh0cmEgZmllbGQgbGVuZ3RoXG52YXIgZXhmbCA9IGZ1bmN0aW9uIChleCkge1xuICAgIHZhciBsZSA9IDA7XG4gICAgaWYgKGV4KSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZXgpIHtcbiAgICAgICAgICAgIHZhciBsID0gZXhba10ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGwgPiA2NTUzNSlcbiAgICAgICAgICAgICAgICBlcnIoOSk7XG4gICAgICAgICAgICBsZSArPSBsICsgNDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGU7XG59O1xuLy8gd3JpdGUgemlwIGhlYWRlclxudmFyIHd6aCA9IGZ1bmN0aW9uIChkLCBiLCBmLCBmbiwgdSwgYywgY2UsIGNvKSB7XG4gICAgdmFyIGZsID0gZm4ubGVuZ3RoLCBleCA9IGYuZXh0cmEsIGNvbCA9IGNvICYmIGNvLmxlbmd0aDtcbiAgICB2YXIgZXhsID0gZXhmbChleCk7XG4gICAgd2J5dGVzKGQsIGIsIGNlICE9IG51bGwgPyAweDIwMTRCNTAgOiAweDQwMzRCNTApLCBiICs9IDQ7XG4gICAgaWYgKGNlICE9IG51bGwpXG4gICAgICAgIGRbYisrXSA9IDIwLCBkW2IrK10gPSBmLm9zO1xuICAgIGRbYl0gPSAyMCwgYiArPSAyOyAvLyBzcGVjIGNvbXBsaWFuY2U/IHdoYXQncyB0aGF0P1xuICAgIGRbYisrXSA9IChmLmZsYWcgPDwgMSkgfCAoYyA8IDAgJiYgOCksIGRbYisrXSA9IHUgJiYgODtcbiAgICBkW2IrK10gPSBmLmNvbXByZXNzaW9uICYgMjU1LCBkW2IrK10gPSBmLmNvbXByZXNzaW9uID4+IDg7XG4gICAgdmFyIGR0ID0gbmV3IERhdGUoZi5tdGltZSA9PSBudWxsID8gRGF0ZS5ub3coKSA6IGYubXRpbWUpLCB5ID0gZHQuZ2V0RnVsbFllYXIoKSAtIDE5ODA7XG4gICAgaWYgKHkgPCAwIHx8IHkgPiAxMTkpXG4gICAgICAgIGVycigxMCk7XG4gICAgd2J5dGVzKGQsIGIsICh5IDw8IDI1KSB8ICgoZHQuZ2V0TW9udGgoKSArIDEpIDw8IDIxKSB8IChkdC5nZXREYXRlKCkgPDwgMTYpIHwgKGR0LmdldEhvdXJzKCkgPDwgMTEpIHwgKGR0LmdldE1pbnV0ZXMoKSA8PCA1KSB8IChkdC5nZXRTZWNvbmRzKCkgPj4+IDEpKSwgYiArPSA0O1xuICAgIGlmIChjICE9IC0xKSB7XG4gICAgICAgIHdieXRlcyhkLCBiLCBmLmNyYyk7XG4gICAgICAgIHdieXRlcyhkLCBiICsgNCwgYyA8IDAgPyAtYyAtIDIgOiBjKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA4LCBmLnNpemUpO1xuICAgIH1cbiAgICB3Ynl0ZXMoZCwgYiArIDEyLCBmbCk7XG4gICAgd2J5dGVzKGQsIGIgKyAxNCwgZXhsKSwgYiArPSAxNjtcbiAgICBpZiAoY2UgIT0gbnVsbCkge1xuICAgICAgICB3Ynl0ZXMoZCwgYiwgY29sKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA2LCBmLmF0dHJzKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyAxMCwgY2UpLCBiICs9IDE0O1xuICAgIH1cbiAgICBkLnNldChmbiwgYik7XG4gICAgYiArPSBmbDtcbiAgICBpZiAoZXhsKSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZXgpIHtcbiAgICAgICAgICAgIHZhciBleGYgPSBleFtrXSwgbCA9IGV4Zi5sZW5ndGg7XG4gICAgICAgICAgICB3Ynl0ZXMoZCwgYiwgK2spO1xuICAgICAgICAgICAgd2J5dGVzKGQsIGIgKyAyLCBsKTtcbiAgICAgICAgICAgIGQuc2V0KGV4ZiwgYiArIDQpLCBiICs9IDQgKyBsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wpXG4gICAgICAgIGQuc2V0KGNvLCBiKSwgYiArPSBjb2w7XG4gICAgcmV0dXJuIGI7XG59O1xuLy8gd3JpdGUgemlwIGZvb3RlciAoZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5KVxudmFyIHd6ZiA9IGZ1bmN0aW9uIChvLCBiLCBjLCBkLCBlKSB7XG4gICAgd2J5dGVzKG8sIGIsIDB4NjA1NEI1MCk7IC8vIHNraXAgZGlza1xuICAgIHdieXRlcyhvLCBiICsgOCwgYyk7XG4gICAgd2J5dGVzKG8sIGIgKyAxMCwgYyk7XG4gICAgd2J5dGVzKG8sIGIgKyAxMiwgZCk7XG4gICAgd2J5dGVzKG8sIGIgKyAxNiwgZSk7XG59O1xuLyoqXG4gKiBBIHBhc3MtdGhyb3VnaCBzdHJlYW0gdG8ga2VlcCBkYXRhIHVuY29tcHJlc3NlZCBpbiBhIFpJUCBhcmNoaXZlLlxuICovXG52YXIgWmlwUGFzc1Rocm91Z2ggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBhc3MtdGhyb3VnaCBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwUGFzc1Rocm91Z2goZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmMgPSBjcmMoKTtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvbiA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBhIGNodW5rIGFuZCBwdXNoZXMgdG8gdGhlIG91dHB1dCBzdHJlYW0uIFlvdSBjYW4gb3ZlcnJpZGUgdGhpc1xuICAgICAqIG1ldGhvZCBpbiBhIHN1YmNsYXNzIGZvciBjdXN0b20gYmVoYXZpb3IsIGJ1dCBieSBkZWZhdWx0IHRoaXMgcGFzc2VzXG4gICAgICogdGhlIGRhdGEgdGhyb3VnaC4gWW91IG11c3QgY2FsbCB0aGlzLm9uZGF0YShlcnIsIGNodW5rLCBmaW5hbCkgYXQgc29tZVxuICAgICAqIHBvaW50IGluIHRoaXMgbWV0aG9kLlxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHJvY2Vzc1xuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEobnVsbCwgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGFkZGVkLiBJZiB5b3UgYXJlIHN1YmNsYXNzaW5nIHRoaXMgd2l0aCBhIGN1c3RvbVxuICAgICAqIGNvbXByZXNzaW9uIGFsZ29yaXRobSwgbm90ZSB0aGF0IHlvdSBtdXN0IHB1c2ggZGF0YSBmcm9tIHRoZSBzb3VyY2VcbiAgICAgKiBmaWxlIG9ubHksIHByZS1jb21wcmVzc2lvbi5cbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIHRoaXMuYy5wKGNodW5rKTtcbiAgICAgICAgdGhpcy5zaXplICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgaWYgKGZpbmFsKVxuICAgICAgICAgICAgdGhpcy5jcmMgPSB0aGlzLmMuZCgpO1xuICAgICAgICB0aGlzLnByb2Nlc3MoY2h1bmssIGZpbmFsIHx8IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBaaXBQYXNzVGhyb3VnaDtcbn0oKSk7XG5leHBvcnQgeyBaaXBQYXNzVGhyb3VnaCB9O1xuLy8gSSBkb24ndCBleHRlbmQgYmVjYXVzZSBUeXBlU2NyaXB0IGV4dGVuc2lvbiBhZGRzIDFrQiBvZiBydW50aW1lIGJsb2F0XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXMuIFByZWZlciB1c2luZyBBc3luY1ppcERlZmxhdGVcbiAqIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAqL1xudmFyIFppcERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgc3RyZWFtIHRoYXQgY2FuIGJlIGFkZGVkIHRvIFpJUCBhcmNoaXZlc1xuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBUaGUgZmlsZW5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBkYXRhIHN0cmVhbVxuICAgICAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwRGVmbGF0ZShmaWxlbmFtZSwgb3B0cykge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICghb3B0cylcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2guY2FsbCh0aGlzLCBmaWxlbmFtZSk7XG4gICAgICAgIHRoaXMuZCA9IG5ldyBEZWZsYXRlKG9wdHMsIGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpc18xLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29tcHJlc3Npb24gPSA4O1xuICAgICAgICB0aGlzLmZsYWcgPSBkYmYob3B0cy5sZXZlbCk7XG4gICAgfVxuICAgIFppcERlZmxhdGUucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmQucHVzaChjaHVuaywgZmluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlLCBudWxsLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFppcERlZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBaaXBEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IFppcERlZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXNcbiAqL1xudmFyIEFzeW5jWmlwRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY1ppcERlZmxhdGUoZmlsZW5hbWUsIG9wdHMpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAoIW9wdHMpXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLmNhbGwodGhpcywgZmlsZW5hbWUpO1xuICAgICAgICB0aGlzLmQgPSBuZXcgQXN5bmNEZWZsYXRlKG9wdHMsIGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgIF90aGlzXzEub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gODtcbiAgICAgICAgdGhpcy5mbGFnID0gZGJmKG9wdHMubGV2ZWwpO1xuICAgICAgICB0aGlzLnRlcm1pbmF0ZSA9IHRoaXMuZC50ZXJtaW5hdGU7XG4gICAgfVxuICAgIEFzeW5jWmlwRGVmbGF0ZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5kLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEFzeW5jWmlwRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jWmlwRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1ppcERlZmxhdGUgfTtcbi8vIFRPRE86IEJldHRlciB0cmVlIHNoYWtpbmdcbi8qKlxuICogQSB6aXBwYWJsZSBhcmNoaXZlIHRvIHdoaWNoIGZpbGVzIGNhbiBpbmNyZW1lbnRhbGx5IGJlIGFkZGVkXG4gKi9cbnZhciBaaXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBaSVAgYXJjaGl2ZSB0byB3aGljaCBmaWxlcyBjYW4gYmUgYWRkZWRcbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBmb3IgdGhlIGdlbmVyYXRlZCBaSVAgYXJjaGl2ZVxuICAgICAqICAgICAgICAgICBpcyBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXAoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdGhpcy51ID0gW107XG4gICAgICAgIHRoaXMuZCA9IDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBmaWxlIHRvIHRoZSBaSVAgYXJjaGl2ZVxuICAgICAqIEBwYXJhbSBmaWxlIFRoZSBmaWxlIHN0cmVhbSB0byBhZGRcbiAgICAgKi9cbiAgICBaaXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgLy8gZmluaXNoaW5nIG9yIGZpbmlzaGVkXG4gICAgICAgIGlmICh0aGlzLmQgJiAyKVxuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDQgKyAodGhpcy5kICYgMSkgKiA4LCAwLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmID0gc3RyVG9VOChmaWxlLmZpbGVuYW1lKSwgZmxfMSA9IGYubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbSA9IGZpbGUuY29tbWVudCwgbyA9IGNvbSAmJiBzdHJUb1U4KGNvbSk7XG4gICAgICAgICAgICB2YXIgdSA9IGZsXzEgIT0gZmlsZS5maWxlbmFtZS5sZW5ndGggfHwgKG8gJiYgKGNvbS5sZW5ndGggIT0gby5sZW5ndGgpKTtcbiAgICAgICAgICAgIHZhciBobF8xID0gZmxfMSArIGV4ZmwoZmlsZS5leHRyYSkgKyAzMDtcbiAgICAgICAgICAgIGlmIChmbF8xID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDExLCAwLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgdmFyIGhlYWRlciA9IG5ldyB1OChobF8xKTtcbiAgICAgICAgICAgIHd6aChoZWFkZXIsIDAsIGZpbGUsIGYsIHUsIC0xKTtcbiAgICAgICAgICAgIHZhciBjaGtzXzEgPSBbaGVhZGVyXTtcbiAgICAgICAgICAgIHZhciBwQWxsXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGtzXzIgPSBjaGtzXzE7IF9pIDwgY2hrc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hrID0gY2hrc18yW19pXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEobnVsbCwgY2hrLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoa3NfMSA9IFtdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciB0cl8xID0gdGhpcy5kO1xuICAgICAgICAgICAgdGhpcy5kID0gMDtcbiAgICAgICAgICAgIHZhciBpbmRfMSA9IHRoaXMudS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdWZfMSA9IG1yZyhmaWxlLCB7XG4gICAgICAgICAgICAgICAgZjogZixcbiAgICAgICAgICAgICAgICB1OiB1LFxuICAgICAgICAgICAgICAgIG86IG8sXG4gICAgICAgICAgICAgICAgdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS50ZXJtaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwQWxsXzEoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBueHQgPSBfdGhpc18xLnVbaW5kXzEgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChueHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnh0LnIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc18xLmQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyXzEgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGNsXzEgPSAwO1xuICAgICAgICAgICAgZmlsZS5vbmRhdGEgPSBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xfMSArPSBkYXQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjaGtzXzEucHVzaChkYXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZCA9IG5ldyB1OCgxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDAsIDB4ODA3NEI1MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDQsIGZpbGUuY3JjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgOCwgY2xfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDEyLCBmaWxlLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hrc18xLnB1c2goZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdWZfMS5jID0gY2xfMSwgdWZfMS5iID0gaGxfMSArIGNsXzEgKyAxNiwgdWZfMS5jcmMgPSBmaWxlLmNyYywgdWZfMS5zaXplID0gZmlsZS5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWZfMS5yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cl8xID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0cl8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgcEFsbF8xKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudS5wdXNoKHVmXzEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFbmRzIHRoZSBwcm9jZXNzIG9mIGFkZGluZyBmaWxlcyBhbmQgcHJlcGFyZXMgdG8gZW1pdCB0aGUgZmluYWwgY2h1bmtzLlxuICAgICAqIFRoaXMgKm11c3QqIGJlIGNhbGxlZCBhZnRlciBhZGRpbmcgYWxsIGRlc2lyZWQgZmlsZXMgZm9yIHRoZSByZXN1bHRpbmdcbiAgICAgKiBaSVAgZmlsZSB0byB3b3JrIHByb3Blcmx5LlxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmQgJiAyKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlcnIoNCArICh0aGlzLmQgJiAxKSAqIDgsIDAsIDEpLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgdGhpcy5lKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudS5wdXNoKHtcbiAgICAgICAgICAgICAgICByOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKF90aGlzXzEuZCAmIDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLnUuc3BsaWNlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5lKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0OiBmdW5jdGlvbiAoKSB7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmQgPSAzO1xuICAgIH07XG4gICAgWmlwLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYnQgPSAwLCBsID0gMCwgdGwgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfYVtfaV07XG4gICAgICAgICAgICB0bCArPSA0NiArIGYuZi5sZW5ndGggKyBleGZsKGYuZXh0cmEpICsgKGYubyA/IGYuby5sZW5ndGggOiAwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3V0ID0gbmV3IHU4KHRsICsgMjIpO1xuICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdGhpcy51OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfY1tfYl07XG4gICAgICAgICAgICB3emgob3V0LCBidCwgZiwgZi5mLCBmLnUsIC1mLmMgLSAyLCBsLCBmLm8pO1xuICAgICAgICAgICAgYnQgKz0gNDYgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKSArIChmLm8gPyBmLm8ubGVuZ3RoIDogMCksIGwgKz0gZi5iO1xuICAgICAgICB9XG4gICAgICAgIHd6ZihvdXQsIGJ0LCB0aGlzLnUubGVuZ3RoLCB0bCwgbCk7XG4gICAgICAgIHRoaXMub25kYXRhKG51bGwsIG91dCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZCA9IDI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIG1ldGhvZCB0byB0ZXJtaW5hdGUgYW55IGludGVybmFsIHdvcmtlcnMgdXNlZCBieSB0aGUgc3RyZWFtLiBTdWJzZXF1ZW50XG4gICAgICogY2FsbHMgdG8gYWRkKCkgd2lsbCBmYWlsLlxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfYVtfaV07XG4gICAgICAgICAgICBmLnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmQgPSAyO1xuICAgIH07XG4gICAgcmV0dXJuIFppcDtcbn0oKSk7XG5leHBvcnQgeyBaaXAgfTtcbmV4cG9ydCBmdW5jdGlvbiB6aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICB2YXIgciA9IHt9O1xuICAgIGZsdG4oZGF0YSwgJycsIHIsIG9wdHMpO1xuICAgIHZhciBrID0gT2JqZWN0LmtleXMocik7XG4gICAgdmFyIGxmdCA9IGsubGVuZ3RoLCBvID0gMCwgdG90ID0gMDtcbiAgICB2YXIgc2xmdCA9IGxmdCwgZmlsZXMgPSBuZXcgQXJyYXkobGZ0KTtcbiAgICB2YXIgdGVybSA9IFtdO1xuICAgIHZhciB0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlcm0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB0ZXJtW2ldKCk7XG4gICAgfTtcbiAgICB2YXIgY2JkID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgbXQoZnVuY3Rpb24gKCkgeyBjYihhLCBiKTsgfSk7XG4gICAgfTtcbiAgICBtdChmdW5jdGlvbiAoKSB7IGNiZCA9IGNiOyB9KTtcbiAgICB2YXIgY2JmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3V0ID0gbmV3IHU4KHRvdCArIDIyKSwgb2UgPSBvLCBjZGwgPSB0b3QgLSBvO1xuICAgICAgICB0b3QgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsZnQ7ICsraSkge1xuICAgICAgICAgICAgdmFyIGYgPSBmaWxlc1tpXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBmLmMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHd6aChvdXQsIHRvdCwgZiwgZi5mLCBmLnUsIGwpO1xuICAgICAgICAgICAgICAgIHZhciBiYWRkID0gMzAgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9jID0gdG90ICsgYmFkZDtcbiAgICAgICAgICAgICAgICBvdXQuc2V0KGYuYywgbG9jKTtcbiAgICAgICAgICAgICAgICB3emgob3V0LCBvLCBmLCBmLmYsIGYudSwgbCwgdG90LCBmLm0pLCBvICs9IDE2ICsgYmFkZCArIChmLm0gPyBmLm0ubGVuZ3RoIDogMCksIHRvdCA9IGxvYyArIGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3pmKG91dCwgbywgZmlsZXMubGVuZ3RoLCBjZGwsIG9lKTtcbiAgICAgICAgY2JkKG51bGwsIG91dCk7XG4gICAgfTtcbiAgICBpZiAoIWxmdClcbiAgICAgICAgY2JmKCk7XG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgZm4gPSBrW2ldO1xuICAgICAgICB2YXIgX2EgPSByW2ZuXSwgZmlsZSA9IF9hWzBdLCBwID0gX2FbMV07XG4gICAgICAgIHZhciBjID0gY3JjKCksIHNpemUgPSBmaWxlLmxlbmd0aDtcbiAgICAgICAgYy5wKGZpbGUpO1xuICAgICAgICB2YXIgZiA9IHN0clRvVTgoZm4pLCBzID0gZi5sZW5ndGg7XG4gICAgICAgIHZhciBjb20gPSBwLmNvbW1lbnQsIG0gPSBjb20gJiYgc3RyVG9VOChjb20pLCBtcyA9IG0gJiYgbS5sZW5ndGg7XG4gICAgICAgIHZhciBleGwgPSBleGZsKHAuZXh0cmEpO1xuICAgICAgICB2YXIgY29tcHJlc3Npb24gPSBwLmxldmVsID09IDAgPyAwIDogODtcbiAgICAgICAgdmFyIGNibCA9IGZ1bmN0aW9uIChlLCBkKSB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIHRBbGwoKTtcbiAgICAgICAgICAgICAgICBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZpbGVzW2ldID0gbXJnKHAsIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JjOiBjLmQoKSxcbiAgICAgICAgICAgICAgICAgICAgYzogZCxcbiAgICAgICAgICAgICAgICAgICAgZjogZixcbiAgICAgICAgICAgICAgICAgICAgbTogbSxcbiAgICAgICAgICAgICAgICAgICAgdTogcyAhPSBmbi5sZW5ndGggfHwgKG0gJiYgKGNvbS5sZW5ndGggIT0gbXMpKSxcbiAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbyArPSAzMCArIHMgKyBleGwgKyBsO1xuICAgICAgICAgICAgICAgIHRvdCArPSA3NiArIDIgKiAocyArIGV4bCkgKyAobXMgfHwgMCkgKyBsO1xuICAgICAgICAgICAgICAgIGlmICghLS1sZnQpXG4gICAgICAgICAgICAgICAgICAgIGNiZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAocyA+IDY1NTM1KVxuICAgICAgICAgICAgY2JsKGVycigxMSwgMCwgMSksIG51bGwpO1xuICAgICAgICBpZiAoIWNvbXByZXNzaW9uKVxuICAgICAgICAgICAgY2JsKG51bGwsIGZpbGUpO1xuICAgICAgICBlbHNlIGlmIChzaXplIDwgMTYwMDAwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNibChudWxsLCBkZWZsYXRlU3luYyhmaWxlLCBwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNibChlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZXJtLnB1c2goZGVmbGF0ZShmaWxlLCBwLCBjYmwpKTtcbiAgICB9O1xuICAgIC8vIENhbm5vdCB1c2UgbGZ0IGJlY2F1c2UgaXQgY2FuIGRlY3JlYXNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGZ0OyArK2kpIHtcbiAgICAgICAgX2xvb3BfMShpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRBbGw7XG59XG4vKipcbiAqIFN5bmNocm9ub3VzbHkgY3JlYXRlcyBhIFpJUCBmaWxlLiBQcmVmZXIgdXNpbmcgYHppcGAgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICogd2l0aCBtb3JlIHRoYW4gb25lIGZpbGUuXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGlyZWN0b3J5IHN0cnVjdHVyZSBmb3IgdGhlIFpJUCBhcmNoaXZlXG4gKiBAcGFyYW0gb3B0cyBUaGUgbWFpbiBvcHRpb25zLCBtZXJnZWQgd2l0aCBwZXItZmlsZSBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZ2VuZXJhdGVkIFpJUCBhcmNoaXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgciA9IHt9O1xuICAgIHZhciBmaWxlcyA9IFtdO1xuICAgIGZsdG4oZGF0YSwgJycsIHIsIG9wdHMpO1xuICAgIHZhciBvID0gMDtcbiAgICB2YXIgdG90ID0gMDtcbiAgICBmb3IgKHZhciBmbiBpbiByKSB7XG4gICAgICAgIHZhciBfYSA9IHJbZm5dLCBmaWxlID0gX2FbMF0sIHAgPSBfYVsxXTtcbiAgICAgICAgdmFyIGNvbXByZXNzaW9uID0gcC5sZXZlbCA9PSAwID8gMCA6IDg7XG4gICAgICAgIHZhciBmID0gc3RyVG9VOChmbiksIHMgPSBmLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvbSA9IHAuY29tbWVudCwgbSA9IGNvbSAmJiBzdHJUb1U4KGNvbSksIG1zID0gbSAmJiBtLmxlbmd0aDtcbiAgICAgICAgdmFyIGV4bCA9IGV4ZmwocC5leHRyYSk7XG4gICAgICAgIGlmIChzID4gNjU1MzUpXG4gICAgICAgICAgICBlcnIoMTEpO1xuICAgICAgICB2YXIgZCA9IGNvbXByZXNzaW9uID8gZGVmbGF0ZVN5bmMoZmlsZSwgcCkgOiBmaWxlLCBsID0gZC5sZW5ndGg7XG4gICAgICAgIHZhciBjID0gY3JjKCk7XG4gICAgICAgIGMucChmaWxlKTtcbiAgICAgICAgZmlsZXMucHVzaChtcmcocCwge1xuICAgICAgICAgICAgc2l6ZTogZmlsZS5sZW5ndGgsXG4gICAgICAgICAgICBjcmM6IGMuZCgpLFxuICAgICAgICAgICAgYzogZCxcbiAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICBtOiBtLFxuICAgICAgICAgICAgdTogcyAhPSBmbi5sZW5ndGggfHwgKG0gJiYgKGNvbS5sZW5ndGggIT0gbXMpKSxcbiAgICAgICAgICAgIG86IG8sXG4gICAgICAgICAgICBjb21wcmVzc2lvbjogY29tcHJlc3Npb25cbiAgICAgICAgfSkpO1xuICAgICAgICBvICs9IDMwICsgcyArIGV4bCArIGw7XG4gICAgICAgIHRvdCArPSA3NiArIDIgKiAocyArIGV4bCkgKyAobXMgfHwgMCkgKyBsO1xuICAgIH1cbiAgICB2YXIgb3V0ID0gbmV3IHU4KHRvdCArIDIyKSwgb2UgPSBvLCBjZGwgPSB0b3QgLSBvO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGYgPSBmaWxlc1tpXTtcbiAgICAgICAgd3poKG91dCwgZi5vLCBmLCBmLmYsIGYudSwgZi5jLmxlbmd0aCk7XG4gICAgICAgIHZhciBiYWRkID0gMzAgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKTtcbiAgICAgICAgb3V0LnNldChmLmMsIGYubyArIGJhZGQpO1xuICAgICAgICB3emgob3V0LCBvLCBmLCBmLmYsIGYudSwgZi5jLmxlbmd0aCwgZi5vLCBmLm0pLCBvICs9IDE2ICsgYmFkZCArIChmLm0gPyBmLm0ubGVuZ3RoIDogMCk7XG4gICAgfVxuICAgIHd6ZihvdXQsIG8sIGZpbGVzLmxlbmd0aCwgY2RsLCBvZSk7XG4gICAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3RyZWFtaW5nIHBhc3MtdGhyb3VnaCBkZWNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXNcbiAqL1xudmFyIFVuemlwUGFzc1Rocm91Z2ggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVW56aXBQYXNzVGhyb3VnaCgpIHtcbiAgICB9XG4gICAgVW56aXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBkYXRhLCBmaW5hbCk7XG4gICAgfTtcbiAgICBVbnppcFBhc3NUaHJvdWdoLmNvbXByZXNzaW9uID0gMDtcbiAgICByZXR1cm4gVW56aXBQYXNzVGhyb3VnaDtcbn0oKSk7XG5leHBvcnQgeyBVbnppcFBhc3NUaHJvdWdoIH07XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlcy4gUHJlZmVyIEFzeW5jWmlwSW5mbGF0ZSBmb3JcbiAqIGJldHRlciBwZXJmb3JtYW5jZS5cbiAqL1xudmFyIFVuemlwSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBkZWNvbXByZXNzaW9uIHRoYXQgY2FuIGJlIHVzZWQgaW4gWklQIGFyY2hpdmVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gVW56aXBJbmZsYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIHRoaXMuaSA9IG5ldyBJbmZsYXRlKGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpc18xLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFVuemlwSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5pLnB1c2goZGF0YSwgZmluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlLCBudWxsLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFVuemlwSW5mbGF0ZS5jb21wcmVzc2lvbiA9IDg7XG4gICAgcmV0dXJuIFVuemlwSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBVbnppcEluZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlc1xuICovXG52YXIgQXN5bmNVbnppcEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgZGVjb21wcmVzc2lvbiB0aGF0IGNhbiBiZSB1c2VkIGluIFpJUCBhcmNoaXZlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jVW56aXBJbmZsYXRlKF8sIHN6KSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKHN6IDwgMzIwMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmkgPSBuZXcgSW5mbGF0ZShmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIF90aGlzXzEub25kYXRhKG51bGwsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmkgPSBuZXcgQXN5bmNJbmZsYXRlKGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpc18xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRlcm1pbmF0ZSA9IHRoaXMuaS50ZXJtaW5hdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXN5bmNVbnppcEluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgZmluYWwpIHtcbiAgICAgICAgaWYgKHRoaXMuaS50ZXJtaW5hdGUpXG4gICAgICAgICAgICBkYXRhID0gc2xjKGRhdGEsIDApO1xuICAgICAgICB0aGlzLmkucHVzaChkYXRhLCBmaW5hbCk7XG4gICAgfTtcbiAgICBBc3luY1VuemlwSW5mbGF0ZS5jb21wcmVzc2lvbiA9IDg7XG4gICAgcmV0dXJuIEFzeW5jVW56aXBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jVW56aXBJbmZsYXRlIH07XG4vKipcbiAqIEEgWklQIGFyY2hpdmUgZGVjb21wcmVzc2lvbiBzdHJlYW0gdGhhdCBlbWl0cyBmaWxlcyBhcyB0aGV5IGFyZSBkaXNjb3ZlcmVkXG4gKi9cbnZhciBVbnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgWklQIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGEgZmlsZSBpbiB0aGUgWklQIGFyY2hpdmUgaXMgZm91bmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVbnppcChjYikge1xuICAgICAgICB0aGlzLm9uZmlsZSA9IGNiO1xuICAgICAgICB0aGlzLmsgPSBbXTtcbiAgICAgICAgdGhpcy5vID0ge1xuICAgICAgICAgICAgMDogVW56aXBQYXNzVGhyb3VnaFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnAgPSBldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgdW56aXBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgVW56aXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm9uZmlsZSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKCF0aGlzLnApXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIGlmICh0aGlzLmMgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4odGhpcy5jLCBjaHVuay5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIHRvQWRkID0gY2h1bmsuc3ViYXJyYXkoMCwgbGVuKTtcbiAgICAgICAgICAgIHRoaXMuYyAtPSBsZW47XG4gICAgICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgICAgIHRoaXMuZC5wdXNoKHRvQWRkLCAhdGhpcy5jKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmtbMF0ucHVzaCh0b0FkZCk7XG4gICAgICAgICAgICBjaHVuayA9IGNodW5rLnN1YmFycmF5KGxlbik7XG4gICAgICAgICAgICBpZiAoY2h1bmsubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmID0gMCwgaSA9IDAsIGlzID0gdm9pZCAwLCBidWYgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoIXRoaXMucC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgYnVmID0gY2h1bms7XG4gICAgICAgICAgICBlbHNlIGlmICghY2h1bmsubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGJ1ZiA9IHRoaXMucDtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1ZiA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBidWYuc2V0KHRoaXMucCksIGJ1Zi5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGwgPSBidWYubGVuZ3RoLCBvYyA9IHRoaXMuYywgYWRkID0gb2MgJiYgdGhpcy5kO1xuICAgICAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciBzaWcgPSBiNChidWYsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChzaWcgPT0gMHg0MDM0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGYgPSAxLCBpcyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNfMS5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmYgPSBiMihidWYsIGkgKyA2KSwgY21wXzEgPSBiMihidWYsIGkgKyA4KSwgdSA9IGJmICYgMjA0OCwgZGQgPSBiZiAmIDgsIGZubCA9IGIyKGJ1ZiwgaSArIDI2KSwgZXMgPSBiMihidWYsIGkgKyAyOCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsID4gaSArIDMwICsgZm5sICsgZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGtzXzMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5rLnVuc2hpZnQoY2hrc18zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjXzEgPSBiNChidWYsIGkgKyAxOCksIHN1XzEgPSBiNChidWYsIGkgKyAyMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm5fMSA9IHN0ckZyb21VOChidWYuc3ViYXJyYXkoaSArIDMwLCBpICs9IDMwICsgZm5sKSwgIXUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjXzEgPT0gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZGQgPyBbLTJdIDogejY0ZShidWYsIGkpLCBzY18xID0gX2FbMF0sIHN1XzEgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjXzEgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEuYyA9IHNjXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZF8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmbl8xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjbXBfMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVfMS5vbmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2NfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5vbmRhdGEobnVsbCwgZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHIgPSBfdGhpc18xLm9bY21wXzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdHIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV8xLm9uZGF0YShlcnIoMTQsICd1bmtub3duIGNvbXByZXNzaW9uIHR5cGUgJyArIGNtcF8xLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xID0gc2NfMSA8IDAgPyBuZXcgY3RyKGZuXzEpIDogbmV3IGN0cihmbl8xLCBzY18xLCBzdV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS5vbmRhdGEgPSBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7IGZpbGVfMS5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY2hrc180ID0gY2hrc18zOyBfaSA8IGNoa3NfNC5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ID0gY2hrc180W19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEucHVzaChkYXQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpc18xLmtbMF0gPT0gY2hrc18zICYmIF90aGlzXzEuYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc18xLmQgPSBkXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLnB1c2goZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRfMSAmJiBkXzEudGVybWluYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NfMSA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5zaXplID0gc2NfMSwgZmlsZV8xLm9yaWdpbmFsU2l6ZSA9IHN1XzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEub25maWxlKGZpbGVfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZyA9PSAweDgwNzRCNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzID0gaSArPSAxMiArIChvYyA9PSAtMiAmJiA4KSwgZiA9IDMsIHRoaXNfMS5jID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2lnID09IDB4MjAxNEI1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXMgPSBpIC09IDQsIGYgPSAzLCB0aGlzXzEuYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBsIC0gNDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlXzEgPSBfbG9vcF8yKCk7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlXzEgPT09IFwiYnJlYWtcIilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnAgPSBldDtcbiAgICAgICAgICAgIGlmIChvYyA8IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ID0gZiA/IGJ1Zi5zdWJhcnJheSgwLCBpcyAtIDEyIC0gKG9jID09IC0yICYmIDgpIC0gKGI0KGJ1ZiwgaXMgLSAxNikgPT0gMHg4MDc0QjUwICYmIDQpKSA6IGJ1Zi5zdWJhcnJheSgwLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoYWRkKVxuICAgICAgICAgICAgICAgICAgICBhZGQucHVzaChkYXQsICEhZik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtbKyhmID09IDIpXS5wdXNoKGRhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZiAmIDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChidWYuc3ViYXJyYXkoaSksIGZpbmFsKTtcbiAgICAgICAgICAgIHRoaXMucCA9IGJ1Zi5zdWJhcnJheShpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmMpXG4gICAgICAgICAgICAgICAgZXJyKDEzKTtcbiAgICAgICAgICAgIHRoaXMucCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGRlY29kZXIgd2l0aCB0aGUgc3RyZWFtLCBhbGxvd2luZyBmb3IgZmlsZXMgY29tcHJlc3NlZCB3aXRoXG4gICAgICogdGhlIGNvbXByZXNzaW9uIHR5cGUgcHJvdmlkZWQgdG8gYmUgZXhwYW5kZWQgY29ycmVjdGx5XG4gICAgICogQHBhcmFtIGRlY29kZXIgVGhlIGRlY29kZXIgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBVbnppcC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGVjb2Rlcikge1xuICAgICAgICB0aGlzLm9bZGVjb2Rlci5jb21wcmVzc2lvbl0gPSBkZWNvZGVyO1xuICAgIH07XG4gICAgcmV0dXJuIFVuemlwO1xufSgpKTtcbmV4cG9ydCB7IFVuemlwIH07XG52YXIgbXQgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgPT0gJ2Z1bmN0aW9uJyA/IHF1ZXVlTWljcm90YXNrIDogdHlwZW9mIHNldFRpbWVvdXQgPT0gJ2Z1bmN0aW9uJyA/IHNldFRpbWVvdXQgOiBmdW5jdGlvbiAoZm4pIHsgZm4oKTsgfTtcbmV4cG9ydCBmdW5jdGlvbiB1bnppcChkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHZhciB0ZXJtID0gW107XG4gICAgdmFyIHRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVybS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIHRlcm1baV0oKTtcbiAgICB9O1xuICAgIHZhciBmaWxlcyA9IHt9O1xuICAgIHZhciBjYmQgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBtdChmdW5jdGlvbiAoKSB7IGNiKGEsIGIpOyB9KTtcbiAgICB9O1xuICAgIG10KGZ1bmN0aW9uICgpIHsgY2JkID0gY2I7IH0pO1xuICAgIHZhciBlID0gZGF0YS5sZW5ndGggLSAyMjtcbiAgICBmb3IgKDsgYjQoZGF0YSwgZSkgIT0gMHg2MDU0QjUwOyAtLWUpIHtcbiAgICAgICAgaWYgKCFlIHx8IGRhdGEubGVuZ3RoIC0gZSA+IDY1NTU4KSB7XG4gICAgICAgICAgICBjYmQoZXJyKDEzLCAwLCAxKSwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gdEFsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICA7XG4gICAgdmFyIGxmdCA9IGIyKGRhdGEsIGUgKyA4KTtcbiAgICBpZiAobGZ0KSB7XG4gICAgICAgIHZhciBjID0gbGZ0O1xuICAgICAgICB2YXIgbyA9IGI0KGRhdGEsIGUgKyAxNik7XG4gICAgICAgIHZhciB6ID0gbyA9PSA0Mjk0OTY3Mjk1IHx8IGMgPT0gNjU1MzU7XG4gICAgICAgIGlmICh6KSB7XG4gICAgICAgICAgICB2YXIgemUgPSBiNChkYXRhLCBlIC0gMTIpO1xuICAgICAgICAgICAgeiA9IGI0KGRhdGEsIHplKSA9PSAweDYwNjRCNTA7XG4gICAgICAgICAgICBpZiAoeikge1xuICAgICAgICAgICAgICAgIGMgPSBsZnQgPSBiNChkYXRhLCB6ZSArIDMyKTtcbiAgICAgICAgICAgICAgICBvID0gYjQoZGF0YSwgemUgKyA0OCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZsdHIgPSBvcHRzICYmIG9wdHMuZmlsdGVyO1xuICAgICAgICB2YXIgX2xvb3BfMyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB6aChkYXRhLCBvLCB6KSwgY18xID0gX2FbMF0sIHNjID0gX2FbMV0sIHN1ID0gX2FbMl0sIGZuID0gX2FbM10sIG5vID0gX2FbNF0sIG9mZiA9IF9hWzVdLCBiID0gc2x6aChkYXRhLCBvZmYpO1xuICAgICAgICAgICAgbyA9IG5vO1xuICAgICAgICAgICAgdmFyIGNibCA9IGZ1bmN0aW9uIChlLCBkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdEFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzW2ZuXSA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1sZnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYmQobnVsbCwgZmlsZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIWZsdHIgfHwgZmx0cih7XG4gICAgICAgICAgICAgICAgbmFtZTogZm4sXG4gICAgICAgICAgICAgICAgc2l6ZTogc2MsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxTaXplOiBzdSxcbiAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogY18xXG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgIGlmICghY18xKVxuICAgICAgICAgICAgICAgICAgICBjYmwobnVsbCwgc2xjKGRhdGEsIGIsIGIgKyBzYykpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNfMSA9PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmZsID0gZGF0YS5zdWJhcnJheShiLCBiICsgc2MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2MgPCAzMjAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2JsKG51bGwsIGluZmxhdGVTeW5jKGluZmwsIG5ldyB1OChzdSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2JsKGUsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcm0ucHVzaChpbmZsYXRlKGluZmwsIHsgc2l6ZTogc3UgfSwgY2JsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2JsKGVycigxNCwgJ3Vua25vd24gY29tcHJlc3Npb24gdHlwZSAnICsgY18xLCAxKSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2JsKG51bGwsIG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGM7ICsraSkge1xuICAgICAgICAgICAgX2xvb3BfMyhpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGNiZChudWxsLCB7fSk7XG4gICAgcmV0dXJuIHRBbGw7XG59XG4vKipcbiAqIFN5bmNocm9ub3VzbHkgZGVjb21wcmVzc2VzIGEgWklQIGFyY2hpdmUuIFByZWZlciB1c2luZyBgdW56aXBgIGZvciBiZXR0ZXJcbiAqIHBlcmZvcm1hbmNlIHdpdGggbW9yZSB0aGFuIG9uZSBmaWxlLlxuICogQHBhcmFtIGRhdGEgVGhlIHJhdyBjb21wcmVzc2VkIFpJUCBmaWxlXG4gKiBAcGFyYW0gb3B0cyBUaGUgWklQIGV4dHJhY3Rpb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCBmaWxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdW56aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICB2YXIgZmlsZXMgPSB7fTtcbiAgICB2YXIgZSA9IGRhdGEubGVuZ3RoIC0gMjI7XG4gICAgZm9yICg7IGI0KGRhdGEsIGUpICE9IDB4NjA1NEI1MDsgLS1lKSB7XG4gICAgICAgIGlmICghZSB8fCBkYXRhLmxlbmd0aCAtIGUgPiA2NTU1OClcbiAgICAgICAgICAgIGVycigxMyk7XG4gICAgfVxuICAgIDtcbiAgICB2YXIgYyA9IGIyKGRhdGEsIGUgKyA4KTtcbiAgICBpZiAoIWMpXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB2YXIgbyA9IGI0KGRhdGEsIGUgKyAxNik7XG4gICAgdmFyIHogPSBvID09IDQyOTQ5NjcyOTUgfHwgYyA9PSA2NTUzNTtcbiAgICBpZiAoeikge1xuICAgICAgICB2YXIgemUgPSBiNChkYXRhLCBlIC0gMTIpO1xuICAgICAgICB6ID0gYjQoZGF0YSwgemUpID09IDB4NjA2NEI1MDtcbiAgICAgICAgaWYgKHopIHtcbiAgICAgICAgICAgIGMgPSBiNChkYXRhLCB6ZSArIDMyKTtcbiAgICAgICAgICAgIG8gPSBiNChkYXRhLCB6ZSArIDQ4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZmx0ciA9IG9wdHMgJiYgb3B0cy5maWx0ZXI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjOyArK2kpIHtcbiAgICAgICAgdmFyIF9hID0gemgoZGF0YSwgbywgeiksIGNfMiA9IF9hWzBdLCBzYyA9IF9hWzFdLCBzdSA9IF9hWzJdLCBmbiA9IF9hWzNdLCBubyA9IF9hWzRdLCBvZmYgPSBfYVs1XSwgYiA9IHNsemgoZGF0YSwgb2ZmKTtcbiAgICAgICAgbyA9IG5vO1xuICAgICAgICBpZiAoIWZsdHIgfHwgZmx0cih7XG4gICAgICAgICAgICBuYW1lOiBmbixcbiAgICAgICAgICAgIHNpemU6IHNjLFxuICAgICAgICAgICAgb3JpZ2luYWxTaXplOiBzdSxcbiAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjXzJcbiAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGlmICghY18yKVxuICAgICAgICAgICAgICAgIGZpbGVzW2ZuXSA9IHNsYyhkYXRhLCBiLCBiICsgc2MpO1xuICAgICAgICAgICAgZWxzZSBpZiAoY18yID09IDgpXG4gICAgICAgICAgICAgICAgZmlsZXNbZm5dID0gaW5mbGF0ZVN5bmMoZGF0YS5zdWJhcnJheShiLCBiICsgc2MpLCBuZXcgdTgoc3UpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlcnIoMTQsICd1bmtub3duIGNvbXByZXNzaW9uIHR5cGUgJyArIGNfMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbGVzO1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIHNpbXBsZS1oZWFkZXIvaGVhZGVyICovXG5cbi8qIVxuICogY3J4VG9aaXBcbiAqIENvcHlyaWdodCAoYykgMjAxMyBSb2IgV3UgPHJvYkByb2J3dS5ubD5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyeFRvWmlwKGJ1ZjogQnVmZmVyKSB7XG4gICAgZnVuY3Rpb24gY2FsY0xlbmd0aChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoICs9IGEgPDwgMDtcbiAgICAgICAgbGVuZ3RoICs9IGIgPDwgODtcbiAgICAgICAgbGVuZ3RoICs9IGMgPDwgMTY7XG4gICAgICAgIGxlbmd0aCArPSBkIDw8IDI0ID4+PiAwO1xuICAgICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIDUwIDRiIDAzIDA0XG4gICAgLy8gVGhpcyBpcyBhY3R1YWxseSBhIHppcCBmaWxlXG4gICAgaWYgKGJ1ZlswXSA9PT0gODAgJiYgYnVmWzFdID09PSA3NSAmJiBidWZbMl0gPT09IDMgJiYgYnVmWzNdID09PSA0KSB7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgLy8gNDMgNzIgMzIgMzQgKENyMjQpXG4gICAgaWYgKGJ1ZlswXSAhPT0gNjcgfHwgYnVmWzFdICE9PSAxMTQgfHwgYnVmWzJdICE9PSA1MCB8fCBidWZbM10gIT09IDUyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGVhZGVyOiBEb2VzIG5vdCBzdGFydCB3aXRoIENyMjRcIik7XG4gICAgfVxuXG4gICAgLy8gMDIgMDAgMDAgMDBcbiAgICAvLyBvclxuICAgIC8vIDAzIDAwIDAwIDAwXG4gICAgY29uc3QgaXNWMyA9IGJ1Zls0XSA9PT0gMztcbiAgICBjb25zdCBpc1YyID0gYnVmWzRdID09PSAyO1xuXG4gICAgaWYgKCghaXNWMiAmJiAhaXNWMykgfHwgYnVmWzVdIHx8IGJ1Zls2XSB8fCBidWZbN10pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBjcnggZm9ybWF0IHZlcnNpb24gbnVtYmVyLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoaXNWMikge1xuICAgICAgICBjb25zdCBwdWJsaWNLZXlMZW5ndGggPSBjYWxjTGVuZ3RoKGJ1Zls4XSwgYnVmWzldLCBidWZbMTBdLCBidWZbMTFdKTtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlTGVuZ3RoID0gY2FsY0xlbmd0aChidWZbMTJdLCBidWZbMTNdLCBidWZbMTRdLCBidWZbMTVdKTtcblxuICAgICAgICAvLyAxNiA9IE1hZ2ljIG51bWJlciAoNCksIENSWCBmb3JtYXQgdmVyc2lvbiAoNCksIGxlbmd0aHMgKDJ4NClcbiAgICAgICAgY29uc3QgemlwU3RhcnRPZmZzZXQgPSAxNiArIHB1YmxpY0tleUxlbmd0aCArIHNpZ25hdHVyZUxlbmd0aDtcblxuICAgICAgICByZXR1cm4gYnVmLnN1YmFycmF5KHppcFN0YXJ0T2Zmc2V0LCBidWYubGVuZ3RoKTtcbiAgICB9XG4gICAgLy8gdjMgZm9ybWF0IGhhcyBoZWFkZXIgc2l6ZSBhbmQgdGhlbiBoZWFkZXJcbiAgICBjb25zdCBoZWFkZXJTaXplID0gY2FsY0xlbmd0aChidWZbOF0sIGJ1Zls5XSwgYnVmWzEwXSwgYnVmWzExXSk7XG4gICAgY29uc3QgemlwU3RhcnRPZmZzZXQgPSAxMiArIGhlYWRlclNpemU7XG5cbiAgICByZXR1cm4gYnVmLnN1YmFycmF5KHppcFN0YXJ0T2Zmc2V0LCBidWYubGVuZ3RoKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsSUFBTztBQUFQO0FBQUE7QUFBQTtBQUFBLElBQU8sbUJBQVE7QUFBQTtBQUFBOzs7QUNBZixJQUFPO0FBQVA7QUFBQTtBQUFBO0FBQUEsSUFBTyxxQkFBUTtBQUFBO0FBQUE7OztBQ0FmLElBV2E7QUFYYjtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFJTyxJQUFNLHVCQUF1QixhQUFhLG1CQUFVLHFCQUFZLHdCQUF3Qix3QkFBZTtBQUFBO0FBQUE7OztBQ1N2RyxTQUFTLElBQUksS0FBYSxVQUFnQyxDQUFDLEdBQUc7QUFDakUsU0FBTyxJQUFJLFFBQWdCLENBQUMsU0FBUyxXQUFXO0FBQzVDLGlCQUFBQSxRQUFNLElBQUksS0FBSyxTQUFTLFNBQU87QUFDM0IsWUFBTSxFQUFFLFlBQVksZUFBZSxRQUFRLElBQUk7QUFDL0MsVUFBSSxjQUFlO0FBQ2YsZUFBTyxLQUFLLE9BQU8sR0FBRyxlQUFlLG1CQUFtQixLQUFLO0FBQ2pFLFVBQUksY0FBZTtBQUNmLGVBQU8sS0FBSyxRQUFRLElBQUksUUFBUSxVQUFXLE9BQU8s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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBRFVmLHFCQUFJLEdBQUcsMEJBQTBCLENBQUMsR0FBRyxRQUFRO0FBQ3pDLE1BQUksWUFBWSxHQUFHLGlCQUFpQixDQUFDQyxJQUFH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UyxTQUFTLGNBQWMsaUJBQWlCO0FBQUEsUUFDOUU7QUFJQSxZQUFJLGtCQUFrQixDQUFDO0FBQ3ZCLFlBQUksY0FBYyxLQUFLLGlCQUFpQixxQkFBcUIsOEJBQThCO0FBQzNGLGdCQUFRLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDO0FBQUEsTUFDM0M7QUFBQSxJQUNKO0FBRUEsOEJBQVEsZUFBZSxXQUFXLGtCQUFrQixDQUFDLEVBQUUsaUJBQWlCLGFBQWEsR0FBRyxPQUFPO0FBQzNGLFVBQUksaUJBQWlCO0FBQ2pCLFlBQUksaUJBQWlCO0FBQ2pCLG1CQUFTLGVBQWU7QUFJNUIsWUFBSSxpQkFBaUIsY0FBYztBQUMvQixnQkFBTSxTQUFTLFdBQVcsaUJBQWlCLGNBQWM7QUFDekQsY0FBSTtBQUNBLDRCQUFnQixVQUFVLENBQUMsVUFBVTtBQUFBLFFBQzdDO0FBQUEsTUFDSjtBQUVBLFNBQUcsRUFBRSxRQUFRLE9BQU8sZ0JBQWdCLENBQUM7QUFBQSxJQUN6QyxDQUFDO0FBS0QsOEJBQVEsZUFBZSxXQUFXLG9CQUFvQixNQUFNO0FBQUEsSUFBRTtBQUFBLEVBQ2xFLENBQUM7QUFDTDtBQUVBLElBQUksT0FBb0I7QUFFeEI7IiwKICAibmFtZXMiOiBbImh0dHBzIiwgImNhbGN1bGF0ZUdpdENoYW5nZXMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgImNwRXhlY0ZpbGUiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfY2hpbGRfcHJvY2VzcyIsICJpbXBvcnRfdXRpbCIsICJlcnJvciIsICJuYXRpdmVfZXhwb3J0cyIsICJuYXRpdmVfZXhwb3J0cyIsICJwYXRoIiwgInAiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfcGF0aCIsICJlcnIiLCAiaW1wb3J0X2VsZWN0cm9uIiwgIl8iLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgIl8iLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2NoaWxkX3Byb2Nlc3MiLCAiaW1wb3J0X3BhdGgiLCAicGF0aCIsICJvcyIsICJtZXRhZGF0YSIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAiZXJyb3IiLCAicGF0aCIsICJmcyIsICJlcnIiLCAicGF0aCIsICJwYXRoIiwgImxvZ3NEaXIiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2h0dHBzIiwgIm5hdGl2ZV9leHBvcnRzIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgIl8iLCAibmF0aXZlX2V4cG9ydHMiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9mcyIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAiaW1wb3J0X2VsZWN0cm9uIiwgInByb3RvY29sIiwgInBhdGgiLCAicHJvdG9jb2wiLCAiaW1wb3J0X2VsZWN0cm9uIiwgInJlcXVpcmUiLCAiYyIsICJzdGFydCIsICJwIiwgImwiLCAidGQiLCAiaW5pdCIsICJfYSIsICJpbml0IiwgImVyciIsICJkYXQiLCAiX2EiLCAiX2EiLCAiaSIsICJfYSIsICJlIiwgImltcG9ydF9mcyIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAiemlwU3RhcnRPZmZzZXQiLCAiZXJyIiwgImZzQ29uc3RhbnRzIiwgImVyciJdCn0K
