// Rivercord 8ba8c53f
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
    git_hash_default = "8ba8c53f";
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
  await fetchUpdates();
  const res = await githubGet(`/compare/${git_hash_default}...HEAD`);
  const data = JSON.parse(res.toString("utf-8"));
  return data.commits.map((c) => ({
    hash: c.sha.slice(0, 7),
    author: c.author.login,
    message: c.commit.message.split("\n")[0]
  }));
}
async function isUpdateRequired() {
  const remoteGitHash = await get("https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/git-hash.txt");
  return remoteGitHash.toString("utf-8").trim() !== git_hash_default;
}
async function fetchUpdates() {
  if (!await isUpdateRequired())
    return false;
  RIVERCORD_FILES.forEach((i) => {
    PendingUpdates.push(
      [i, `https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${i}`]
    );
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
    import_electron.ipcMain.handle("RivercordIsUpdateRequired" /* IS_UPDATE_REQUIRED */, serializeErrors(isUpdateRequired));
    import_electron.ipcMain.handle("RivercordUpdate" /* UPDATE */, serializeErrors(fetchUpdates));
    import_electron.ipcMain.handle("RivercordBuild" /* BUILD */, serializeErrors(applyUpdates));
    console.log("[Rivercord] Updater", { gitHash: git_hash_default, gitRemote: git_remote_default, __dirname });
  }
});

// src/main/index.ts
init_react();
var import_electron13 = require("electron");
var import_path9 = require("path");

// src/main/ipcMain.ts
init_react();

// src/main/updater/index.ts
init_react();
if (true)
  init_http();

// src/main/ipcPlugins.ts
init_react();
init_IpcEvents();
var import_electron9 = require("electron");

// import-natives:~pluginNatives
init_react();

// src/plugins/appleMusic.desktop/native.ts
var native_exports = {};
__export(native_exports, {
  fetchTrackData: () => fetchTrackData
});
init_react();
var import_child_process = require("child_process");
var import_util = require("util");
var exec = (0, import_util.promisify)(import_child_process.execFile);
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
var import_electron3 = require("electron");
var import_fs = require("fs");

// src/main/utils/constants.ts
init_react();
var import_electron2 = require("electron");
var import_path2 = require("path");
var DATA_DIR = process.env.RIVERCORD_USER_DATA_DIR ?? (process.env.DISCORD_USER_DATA_DIR ? (0, import_path2.join)(process.env.DISCORD_USER_DATA_DIR, "..", "RivercordData") : (0, import_path2.join)(import_electron2.app.getPath("userData"), "..", "Rivercord"));
var SETTINGS_DIR = (0, import_path2.join)(DATA_DIR, "settings");
var THEMES_DIR = (0, import_path2.join)(DATA_DIR, "themes");
var QUICKCSS_PATH = (0, import_path2.join)(SETTINGS_DIR, "quickCss.css");
var SETTINGS_FILE = (0, import_path2.join)(SETTINGS_DIR, "settings.json");
var NATIVE_SETTINGS_FILE = (0, import_path2.join)(SETTINGS_DIR, "native-settings.json");
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
import_electron3.ipcMain.handle("RivercordGetSettingsDir" /* GET_SETTINGS_DIR */, () => SETTINGS_DIR);
import_electron3.ipcMain.on("RivercordGetSettings" /* GET_SETTINGS */, (e) => e.returnValue = RendererSettings.plain);
import_electron3.ipcMain.handle("RivercordSetSettings" /* SET_SETTINGS */, (_, data, pathToNotify) => {
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
var import_electron4 = require("electron");
import_electron4.app.on("browser-window-created", (_, win) => {
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
var import_electron5 = require("electron");
import_electron5.app.on("browser-window-created", (_, win) => {
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
var import_child_process2 = require("child_process");
var fs = __toESM(require("fs"));
var import_os = __toESM(require("os"));
var import_path3 = __toESM(require("path"));
var workdir = null;
var stdout_global = "";
var logs_global = "";
var ytdlpAvailable = false;
var ffmpegAvailable = false;
var ytdlpProcess = null;
var ffmpegProcess = null;
var getdir = () => workdir ?? process.cwd();
var p = (file) => import_path3.default.join(getdir(), file);
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
    ytdlpProcess = (0, import_child_process2.spawn)("yt-dlp", args, {
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
    ffmpegProcess = (0, import_child_process2.spawn)("ffmpeg", args, {
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
  _workdir ||= fs.mkdtempSync(import_path3.default.join(import_os.default.tmpdir(), "vencord_mediaDownloader_"));
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
  const duration = parseFloat((0, import_child_process2.execFileSync)("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", p(file)]).toString());
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
    (0, import_child_process2.execFileSync)("ffmpeg", ["-version"]);
    (0, import_child_process2.execFileSync)("ffprobe", ["-version"]);
    ffmpegAvailable = true;
    return true;
  } catch (e) {
    ffmpegAvailable = false;
    return false;
  }
}
async function checkytdlp(_) {
  try {
    (0, import_child_process2.execFileSync)("yt-dlp", ["--version"]);
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
var import_electron6 = require("electron");

// src/plugins/messageLoggerEnhanced/native/settings.ts
init_react();
var import_promises3 = __toESM(require("fs/promises"));
var import_path5 = __toESM(require("path"));

// src/plugins/messageLoggerEnhanced/native/utils.ts
init_react();
var import_promises2 = require("fs/promises");
var import_path4 = __toESM(require("path"));
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
  return import_path4.default.parse(filename).name;
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
  const mlSettingsDir = import_path5.default.join(MlDataDir, "mlSettings.json");
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
  const res = await import_electron6.dialog.showOpenDialog({ properties: ["openDirectory"], defaultPath });
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
  import_electron6.shell.showItemInFolder(filePath);
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
var import_electron7 = require("electron");
var import_promises5 = require("fs/promises");
var import_path6 = require("path");
async function readRecording(_, filePath) {
  filePath = (0, import_path6.normalize)(filePath);
  const filename = (0, import_path6.basename)(filePath);
  const discordBaseDirWithTrailingSlash = (0, import_path6.normalize)(import_electron7.app.getPath("userData") + "/");
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
var import_electron8 = require("electron");

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
import_electron8.app.on("browser-window-created", (_, win) => {
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
    import_electron9.ipcMain.handle(key, method);
    mappings[methodName] = key;
  }
}
import_electron9.ipcMain.on("RivercordGetPluginIpcMethodMap" /* GET_PLUGIN_IPC_METHOD_MAP */, (e) => {
  e.returnValue = PluginIpcMappings;
});

// src/shared/debounce.ts
init_react();

// src/main/ipcMain.ts
init_IpcEvents();
var import_electron11 = require("electron");

// file-uri:file://monacoWin.html?minify&base64
init_react();
var monacoWin_default = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo=";

// src/main/ipcMain.ts
var import_fs2 = require("fs");
var import_promises6 = require("fs/promises");
var import_path7 = require("path");

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
var import_electron10 = require("electron");
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
        import_electron10.shell.openExternal(url);
    }
    return { action: "deny" };
  });
}

// src/main/ipcMain.ts
(0, import_fs2.mkdirSync)(THEMES_DIR, { recursive: true });
function ensureSafePath(basePath, path5) {
  const normalizedBasePath = (0, import_path7.normalize)(basePath);
  const newPath = (0, import_path7.join)(basePath, path5);
  const normalizedPath = (0, import_path7.normalize)(newPath);
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
import_electron11.ipcMain.handle("RivercordOpenQuickCss" /* OPEN_QUICKCSS */, () => import_electron11.shell.openPath(QUICKCSS_PATH));
import_electron11.ipcMain.handle("RivercordOpenExternal" /* OPEN_EXTERNAL */, (_, url) => {
  try {
    var { protocol: protocol2 } = new URL(url);
  } catch {
    throw "Malformed URL";
  }
  if (!ALLOWED_PROTOCOLS.includes(protocol2))
    throw "Disallowed protocol.";
  import_electron11.shell.openExternal(url);
});
import_electron11.ipcMain.handle("RivercordGetQuickCss" /* GET_QUICK_CSS */, () => readCss());
import_electron11.ipcMain.handle(
  "RivercordSetQuickCss" /* SET_QUICK_CSS */,
  (_, css) => (0, import_fs2.writeFileSync)(QUICKCSS_PATH, css)
);
import_electron11.ipcMain.handle("RivercordGetThemesDir" /* GET_THEMES_DIR */, () => THEMES_DIR);
import_electron11.ipcMain.handle("RivercordGetThemesList" /* GET_THEMES_LIST */, () => listThemes());
import_electron11.ipcMain.handle("RivercordGetThemeData" /* GET_THEME_DATA */, (_, fileName) => getThemeData(fileName));
import_electron11.ipcMain.handle("RivercordGetThemeSystemValues" /* GET_THEME_SYSTEM_VALUES */, () => ({
  "os-accent-color": `#${import_electron11.systemPreferences.getAccentColor?.() || ""}`
}));
import_electron11.ipcMain.handle("RivercordOpenMonacoEditor" /* OPEN_MONACO_EDITOR */, async () => {
  const title = "Rivercord QuickCSS Editor";
  const existingWindow = import_electron11.BrowserWindow.getAllWindows().find((w) => w.title === title);
  if (existingWindow && !existingWindow.isDestroyed()) {
    existingWindow.focus();
    return;
  }
  const win = new import_electron11.BrowserWindow({
    title,
    autoHideMenuBar: true,
    darkTheme: true,
    webPreferences: {
      preload: (0, import_path7.join)(__dirname, false ? "preload.js" : "rivercordDesktopPreload.js"),
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
var import_electron12 = require("electron");

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
var import_path8 = require("path");

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
var extensionCacheDir = (0, import_path8.join)(DATA_DIR, "ExtensionCache");
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
          return void (0, import_promises7.mkdir)((0, import_path8.join)(outDir, f), { recursive: true });
        const pathElements = f.split("/");
        const name = pathElements.pop();
        const directories = pathElements.join("/");
        const dir = (0, import_path8.join)(outDir, directories);
        if (directories) {
          await (0, import_promises7.mkdir)(dir, { recursive: true });
        }
        await (0, import_promises7.writeFile)((0, import_path8.join)(dir, name), files[f]);
      })).then(() => resolve()).catch((err3) => {
        (0, import_promises7.rm)(outDir, { recursive: true, force: true });
        reject(err3);
      });
    });
  });
}
async function installExt(id) {
  const extDir = (0, import_path8.join)(extensionCacheDir, `${id}`);
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
  import_electron12.session.defaultSession.loadExtension(extDir);
}

// src/main/index.ts
if (true) {
  import_electron13.app.whenReady().then(() => {
    import_electron13.protocol.registerFileProtocol("rivercord", ({ url: unsafeUrl }, cb) => {
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
          cb((0, import_path9.join)(__dirname, url));
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
        for (const directive of ["style-src", "connect-src", "img-src", "font-src", "media-src", "worker-src", "script-src", "frame-src"]) {
          csp[directive] ??= [];
          csp[directive].push("*", "blob:", "data:", "rivercord:", "'unsafe-inline'");
        }
        headers[header] = [stringifyPolicy(csp)];
      }
    };
    import_electron13.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders, resourceType }, cb) => {
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
    import_electron13.session.defaultSession.webRequest.onHeadersReceived = () => {
    };
  });
}
if (false) {
}
//# sourceURL=RivercordDesktopMain

/*! For license information please see rivercordDesktopMain.js.LEGAL.txt */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc2NyaXB0cy9idWlsZC9pbmplY3QvcmVhY3QubWpzIiwgIi4uL3NyYy9zaGFyZWQvSXBjRXZlbnRzLnRzIiwgImdpdC1oYXNoOn5naXQtaGFzaCIsICJnaXQtcmVtb3RlOn5naXQtcmVtb3RlIiwgIi4uL3NyYy9zaGFyZWQvcml2ZXJjb3JkVXNlckFnZW50LnRzIiwgIi4uL3NyYy9tYWluL3V0aWxzL3NpbXBsZUdldC50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2NvbW1vbi50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2h0dHAudHMiLCAiLi4vc3JjL21haW4vaW5kZXgudHMiLCAiLi4vc3JjL21haW4vaXBjTWFpbi50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2luZGV4LnRzIiwgIi4uL3NyYy9tYWluL2lwY1BsdWdpbnMudHMiLCAiaW1wb3J0LW5hdGl2ZXM6fnBsdWdpbk5hdGl2ZXMiLCAiLi4vc3JjL3BsdWdpbnMvYXBwbGVNdXNpYy5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9jb25zb2xlU2hvcnRjdXRzL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9maXhTcG90aWZ5RW1iZWRzLmRlc2t0b3AvbmF0aXZlLnRzIiwgIi4uL3NyYy9tYWluL3NldHRpbmdzLnRzIiwgIi4uL3NyYy9zaGFyZWQvU2V0dGluZ3NTdG9yZS50cyIsICIuLi9zcmMvdXRpbHMvbWVyZ2VEZWZhdWx0cy50cyIsICIuLi9zcmMvbWFpbi91dGlscy9jb25zdGFudHMudHMiLCAiLi4vc3JjL3BsdWdpbnMvZml4WW91dHViZUVtYmVkcy5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9tZWRpYURvd25sb2FkZXIuZGVza3RvcC9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZS9pbmRleC50cyIsICIuLi9zcmMvdXRpbHMvUXVldWUudHMiLCAiLi4vc3JjL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZS9zZXR0aW5ncy50cyIsICIuLi9zcmMvcGx1Z2lucy9tZXNzYWdlTG9nZ2VyRW5oYW5jZWQvbmF0aXZlL3V0aWxzLnRzIiwgIi4uL3NyYy9wbHVnaW5zL29wZW5JbkFwcC9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMvdm9pY2VNZXNzYWdlcy9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMvd2F0Y2hUb2dldGhlckFkYmxvY2suZGVza3RvcC9uYXRpdmUudHMiLCAiZmlsZS11cmk6ZmlsZTovL2FkZ3VhcmQuanM/bWluaWZ5IiwgIi4uL3NyYy9wbHVnaW5zL3hzT3ZlcmxheS5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvc2hhcmVkL2RlYm91bmNlLnRzIiwgImZpbGUtdXJpOmZpbGU6Ly9tb25hY29XaW4uaHRtbD9taW5pZnkmYmFzZTY0IiwgIi4uL3NyYy9tYWluL3RoZW1lcy9pbmRleC50cyIsICIuLi9zcmMvbWFpbi91dGlscy9leHRlcm5hbExpbmtzLnRzIiwgIi4uL3NyYy9tYWluL3V0aWxzL2V4dGVuc2lvbnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2ZmbGF0ZUAwLjcuNC9ub2RlX21vZHVsZXMvZmZsYXRlL2VzbS9pbmRleC5tanMiLCAiLi4vc3JjL21haW4vdXRpbHMvY3J4VG9aaXAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmV4cG9ydCBjb25zdCBSaXZlcmNvcmRGcmFnbWVudCA9IC8qICNfX1BVUkVfXyovIFN5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKTtcbmV4cG9ydCBsZXQgUml2ZXJjb3JkQ3JlYXRlRWxlbWVudCA9XG4gICAgKC4uLmFyZ3MpID0+IChSaXZlcmNvcmRDcmVhdGVFbGVtZW50ID0gUml2ZXJjb3JkLldlYnBhY2suQ29tbW9uLlJlYWN0LmNyZWF0ZUVsZW1lbnQpKC4uLmFyZ3MpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmV4cG9ydCBjb25zdCBlbnVtIElwY0V2ZW50cyB7XG4gICAgUVVJQ0tfQ1NTX1VQREFURSA9IFwiUml2ZXJjb3JkUXVpY2tDc3NVcGRhdGVcIixcbiAgICBUSEVNRV9VUERBVEUgPSBcIlJpdmVyY29yZFRoZW1lVXBkYXRlXCIsXG4gICAgR0VUX1FVSUNLX0NTUyA9IFwiUml2ZXJjb3JkR2V0UXVpY2tDc3NcIixcbiAgICBTRVRfUVVJQ0tfQ1NTID0gXCJSaXZlcmNvcmRTZXRRdWlja0Nzc1wiLFxuICAgIFVQTE9BRF9USEVNRSA9IFwiUml2ZXJjb3JkVXBsb2FkVGhlbWVcIixcbiAgICBERUxFVEVfVEhFTUUgPSBcIlJpdmVyY29yZERlbGV0ZVRoZW1lXCIsXG4gICAgR0VUX1RIRU1FU19ESVIgPSBcIlJpdmVyY29yZEdldFRoZW1lc0RpclwiLFxuICAgIEdFVF9USEVNRVNfTElTVCA9IFwiUml2ZXJjb3JkR2V0VGhlbWVzTGlzdFwiLFxuICAgIEdFVF9USEVNRV9EQVRBID0gXCJSaXZlcmNvcmRHZXRUaGVtZURhdGFcIixcbiAgICBHRVRfVEhFTUVfU1lTVEVNX1ZBTFVFUyA9IFwiUml2ZXJjb3JkR2V0VGhlbWVTeXN0ZW1WYWx1ZXNcIixcbiAgICBHRVRfU0VUVElOR1NfRElSID0gXCJSaXZlcmNvcmRHZXRTZXR0aW5nc0RpclwiLFxuICAgIEdFVF9TRVRUSU5HUyA9IFwiUml2ZXJjb3JkR2V0U2V0dGluZ3NcIixcbiAgICBTRVRfU0VUVElOR1MgPSBcIlJpdmVyY29yZFNldFNldHRpbmdzXCIsXG4gICAgT1BFTl9FWFRFUk5BTCA9IFwiUml2ZXJjb3JkT3BlbkV4dGVybmFsXCIsXG4gICAgT1BFTl9RVUlDS0NTUyA9IFwiUml2ZXJjb3JkT3BlblF1aWNrQ3NzXCIsXG4gICAgR0VUX1VQREFURVMgPSBcIlJpdmVyY29yZEdldFVwZGF0ZXNcIixcbiAgICBJU19VUERBVEVfUkVRVUlSRUQgPSBcIlJpdmVyY29yZElzVXBkYXRlUmVxdWlyZWRcIixcbiAgICBHRVRfUkVQTyA9IFwiUml2ZXJjb3JkR2V0UmVwb1wiLFxuICAgIFVQREFURSA9IFwiUml2ZXJjb3JkVXBkYXRlXCIsXG4gICAgQlVJTEQgPSBcIlJpdmVyY29yZEJ1aWxkXCIsXG4gICAgT1BFTl9NT05BQ09fRURJVE9SID0gXCJSaXZlcmNvcmRPcGVuTW9uYWNvRWRpdG9yXCIsXG5cbiAgICBHRVRfUExVR0lOX0lQQ19NRVRIT0RfTUFQID0gXCJSaXZlcmNvcmRHZXRQbHVnaW5JcGNNZXRob2RNYXBcIixcblxuICAgIE9QRU5fSU5fQVBQX19SRVNPTFZFX1JFRElSRUNUID0gXCJSaXZlcmNvcmRPSUFSZXNvbHZlUmVkaXJlY3RcIixcbiAgICBWT0lDRV9NRVNTQUdFU19SRUFEX1JFQ09SRElORyA9IFwiUml2ZXJjb3JkVk1SZWFkUmVjb3JkaW5nXCIsXG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgXCI4YmE4YzUzZlwiIiwgImV4cG9ydCBkZWZhdWx0IFwiUml2ZXJjb3JkL1JpdmVyY29yZFwiIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCBnaXRIYXNoIGZyb20gXCJ+Z2l0LWhhc2hcIjtcbmltcG9ydCBnaXRSZW1vdGUgZnJvbSBcIn5naXQtcmVtb3RlXCI7XG5cbmV4cG9ydCB7IGdpdEhhc2gsIGdpdFJlbW90ZSB9O1xuXG5leHBvcnQgY29uc3QgUklWRVJDT1JEX1VTRVJfQUdFTlQgPSBgUml2ZXJjb3JkLyR7Z2l0SGFzaH0ke2dpdFJlbW90ZSA/IGAgKGh0dHBzOi8vZ2l0aHViLmNvbS8ke2dpdFJlbW90ZX0pYCA6IFwiXCJ9YDtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGh0dHBzLlJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QnVmZmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBzLmdldCh1cmwsIG9wdGlvbnMsIHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUsIHN0YXR1c01lc3NhZ2UsIGhlYWRlcnMgfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChzdGF0dXNDb2RlISA+PSA0MDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVqZWN0KGAke3N0YXR1c0NvZGV9OiAke3N0YXR1c01lc3NhZ2V9IC0gJHt1cmx9YCk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSEgPj0gMzAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlc29sdmUoZ2V0KGhlYWRlcnMubG9jYXRpb24hLCBvcHRpb25zKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNodW5rcyA9IFtdIGFzIEJ1ZmZlcltdO1xuICAgICAgICAgICAgcmVzLm9uKFwiZXJyb3JcIiwgcmVqZWN0KTtcblxuICAgICAgICAgICAgcmVzLm9uKFwiZGF0YVwiLCBjaHVuayA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgICAgICAgICAgcmVzLm9uY2UoXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuZXhwb3J0IGNvbnN0IFJJVkVSQ09SRF9GSUxFUyA9IFtcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInBhdGNoZXIuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcE1haW4uanNcIixcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInByZWxvYWQuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcFByZWxvYWQuanNcIixcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInJlbmRlcmVyLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BSZW5kZXJlci5qc1wiLFxuICAgIElTX0RJU0NPUkRfREVTS1RPUCA/IFwicmVuZGVyZXIuY3NzXCIgOiBcInJpdmVyY29yZERlc2t0b3BSZW5kZXJlci5jc3NcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVFcnJvcnMoZnVuYzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpIHtcbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXdhaXQgZnVuYyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlIGluc3RhbmNlb2YgRXJyb3IgPyB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByb3RvdHlwZXMgZ2V0IGxvc3QsIHNvIHR1cm4gZXJyb3IgaW50byBwbGFpbiBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgLi4uZVxuICAgICAgICAgICAgICAgIH0gOiBlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsICJpbXBvcnQgeyBJcGNFdmVudHMgfSBmcm9tIFwiQHNoYXJlZC9JcGNFdmVudHNcIjtcbmltcG9ydCB7IFJJVkVSQ09SRF9VU0VSX0FHRU5UIH0gZnJvbSBcIkBzaGFyZWQvcml2ZXJjb3JkVXNlckFnZW50XCI7XG5pbXBvcnQgeyBpcGNNYWluIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyB3cml0ZUZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgZ2l0SGFzaCBmcm9tIFwifmdpdC1oYXNoXCI7XG5pbXBvcnQgZ2l0UmVtb3RlIGZyb20gXCJ+Z2l0LXJlbW90ZVwiO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwiLi4vdXRpbHMvc2ltcGxlR2V0XCI7XG5pbXBvcnQgeyBSSVZFUkNPUkRfRklMRVMsIHNlcmlhbGl6ZUVycm9ycyB9IGZyb20gXCIuL2NvbW1vblwiO1xuXG5jb25zdCBBUElfQkFTRSA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7Z2l0UmVtb3RlfWA7XG5sZXQgUGVuZGluZ1VwZGF0ZXMgPSBbXSBhcyBbc3RyaW5nLCBzdHJpbmddW107XG5cbmFzeW5jIGZ1bmN0aW9uIGdpdGh1YkdldChlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGdldChBUElfQkFTRSArIGVuZHBvaW50LCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi92bmQuZ2l0aHViK2pzb25cIixcbiAgICAgICAgICAgIC8vIFwiQWxsIEFQSSByZXF1ZXN0cyBNVVNUIGluY2x1ZGUgYSB2YWxpZCBVc2VyLUFnZW50IGhlYWRlci5cbiAgICAgICAgICAgIC8vIFJlcXVlc3RzIHdpdGggbm8gVXNlci1BZ2VudCBoZWFkZXIgd2lsbCBiZSByZWplY3RlZC5cIlxuICAgICAgICAgICAgXCJVc2VyLUFnZW50XCI6IFJJVkVSQ09SRF9VU0VSX0FHRU5UXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlR2l0Q2hhbmdlcygpIHtcbiAgICBhd2FpdCBmZXRjaFVwZGF0ZXMoKTtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdpdGh1YkdldChgL2NvbXBhcmUvJHtnaXRIYXNofS4uLkhFQURgKTtcblxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy50b1N0cmluZyhcInV0Zi04XCIpKTtcbiAgICByZXR1cm4gZGF0YS5jb21taXRzLm1hcCgoYzogYW55KSA9PiAoe1xuICAgICAgICAvLyBnaXRodWIgYXBpIG9ubHkgc2VuZHMgdGhlIGxvbmcgc2hhXG4gICAgICAgIGhhc2g6IGMuc2hhLnNsaWNlKDAsIDcpLFxuICAgICAgICBhdXRob3I6IGMuYXV0aG9yLmxvZ2luLFxuICAgICAgICBtZXNzYWdlOiBjLmNvbW1pdC5tZXNzYWdlLnNwbGl0KFwiXFxuXCIpWzBdXG4gICAgfSkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc1VwZGF0ZVJlcXVpcmVkKCkge1xuICAgIGNvbnN0IHJlbW90ZUdpdEhhc2ggPSBhd2FpdCBnZXQoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUml2ZXJjb3JkL1JpdmVyY29yZC9tYWluL2Rpc3QvZ2l0LWhhc2gudHh0XCIpO1xuICAgIHJldHVybiByZW1vdGVHaXRIYXNoLnRvU3RyaW5nKFwidXRmLThcIikudHJpbSgpICE9PSBnaXRIYXNoO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFVwZGF0ZXMoKSB7XG4gICAgaWYgKCEoYXdhaXQgaXNVcGRhdGVSZXF1aXJlZCgpKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgUklWRVJDT1JEX0ZJTEVTLmZvckVhY2goaSA9PiB7XG4gICAgICAgIFBlbmRpbmdVcGRhdGVzLnB1c2goXG4gICAgICAgICAgICBbaSwgYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SaXZlcmNvcmQvUml2ZXJjb3JkL21haW4vZGlzdC8ke2l9YF1cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhcHBseVVwZGF0ZXMoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoUGVuZGluZ1VwZGF0ZXMubWFwKFxuICAgICAgICBhc3luYyAoW25hbWUsIGRhdGFdKSA9PiB3cml0ZUZpbGUoXG4gICAgICAgICAgICBqb2luKF9fZGlybmFtZSwgbmFtZSksXG4gICAgICAgICAgICBhd2FpdCBnZXQoZGF0YSlcbiAgICAgICAgKVxuICAgICkpO1xuICAgIFBlbmRpbmdVcGRhdGVzID0gW107XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfUkVQTywgc2VyaWFsaXplRXJyb3JzKCgpID0+IGBodHRwczovL2dpdGh1Yi5jb20vJHtnaXRSZW1vdGV9YCkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9VUERBVEVTLCBzZXJpYWxpemVFcnJvcnMoY2FsY3VsYXRlR2l0Q2hhbmdlcykpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLklTX1VQREFURV9SRVFVSVJFRCwgc2VyaWFsaXplRXJyb3JzKGlzVXBkYXRlUmVxdWlyZWQpKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5VUERBVEUsIHNlcmlhbGl6ZUVycm9ycyhmZXRjaFVwZGF0ZXMpKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5CVUlMRCwgc2VyaWFsaXplRXJyb3JzKGFwcGx5VXBkYXRlcykpO1xuXG5jb25zb2xlLmxvZyhcIltSaXZlcmNvcmRdIFVwZGF0ZXJcIiwgeyBnaXRIYXNoLCBnaXRSZW1vdGUsIF9fZGlybmFtZSB9KTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBhcHAsIHByb3RvY29sLCBzZXNzaW9uIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgZW5zdXJlU2FmZVBhdGggfSBmcm9tIFwiLi9pcGNNYWluXCI7XG5pbXBvcnQgeyBSZW5kZXJlclNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IElTX1ZBTklMTEEsIFRIRU1FU19ESVIgfSBmcm9tIFwiLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IGluc3RhbGxFeHQgfSBmcm9tIFwiLi91dGlscy9leHRlbnNpb25zXCI7XG5cbmlmIChJU19WRVNLVE9QIHx8ICFJU19WQU5JTExBKSB7XG4gICAgYXBwLndoZW5SZWFkeSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBTb3VyY2UgTWFwcyEgTWF5YmUgdGhlcmUncyBhIGJldHRlciB3YXkgYnV0IHNpbmNlIHRoZSByZW5kZXJlciBpcyBleGVjdXRlZFxuICAgICAgICAvLyBmcm9tIGEgc3RyaW5nIEkgZG9uJ3QgdGhpbmsgYW55IG90aGVyIGZvcm0gb2Ygc291cmNlbWFwcyB3b3VsZCB3b3JrXG4gICAgICAgIHByb3RvY29sLnJlZ2lzdGVyRmlsZVByb3RvY29sKFwicml2ZXJjb3JkXCIsICh7IHVybDogdW5zYWZlVXJsIH0sIGNiKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdW5zYWZlVXJsLnNsaWNlKFwicml2ZXJjb3JkOi8vXCIubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKFwiL3RoZW1lcy9cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVtZSA9IHVybC5zbGljZShcIi90aGVtZXMvXCIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzYWZlVXJsID0gZW5zdXJlU2FmZVBhdGgoVEhFTUVTX0RJUiwgdGhlbWUpO1xuICAgICAgICAgICAgICAgIGlmICghc2FmZVVybCkge1xuICAgICAgICAgICAgICAgICAgICBjYih7IHN0YXR1c0NvZGU6IDQwMyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYihzYWZlVXJsLnJlcGxhY2UoL1xcP3Y9XFxkKyQvLCBcIlwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh1cmwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVuZGVyZXIuanMubWFwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInJpdmVyY29yZERlc2t0b3BSZW5kZXJlci5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicHJlbG9hZC5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicml2ZXJjb3JkRGVza3RvcFByZWxvYWQuanMubWFwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInBhdGNoZXIuanMubWFwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInJpdmVyY29yZERlc2t0b3BNYWluLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgICAgICBjYihqb2luKF9fZGlybmFtZSwgdXJsKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNiKHsgc3RhdHVzQ29kZTogNDAzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKFJlbmRlcmVyU2V0dGluZ3Muc3RvcmUuZW5hYmxlUmVhY3REZXZ0b29scylcbiAgICAgICAgICAgICAgICBpbnN0YWxsRXh0KFwiZm1rYWRtYXBnb2ZhZG9wbGpiamZrYXBka29pZW5paGlcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5pbmZvKFwiW1JpdmVyY29yZF0gSW5zdGFsbGVkIFJlYWN0IERldmVsb3BlciBUb29sc1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwiW1JpdmVyY29yZF0gRmFpbGVkIHRvIGluc3RhbGwgUmVhY3QgRGV2ZWxvcGVyIFRvb2xzXCIsIGVycikpO1xuICAgICAgICB9IGNhdGNoIHsgfVxuXG5cbiAgICAgICAgY29uc3QgZmluZEhlYWRlciA9IChoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4sIGhlYWRlck5hbWU6IExvd2VyY2FzZTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycykuZmluZChoID0+IGgudG9Mb3dlckNhc2UoKSA9PT0gaGVhZGVyTmFtZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUmVtb3ZlIENTUFxuICAgICAgICB0eXBlIFBvbGljeVJlc3VsdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPjtcblxuICAgICAgICBjb25zdCBwYXJzZVBvbGljeSA9IChwb2xpY3k6IHN0cmluZyk6IFBvbGljeVJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IFBvbGljeVJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgcG9saWN5LnNwbGl0KFwiO1wiKS5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgW2RpcmVjdGl2ZUtleSwgLi4uZGlyZWN0aXZlVmFsdWVdID0gZGlyZWN0aXZlLnRyaW0oKS5zcGxpdCgvXFxzKy9nKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aXZlS2V5ICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0LCBkaXJlY3RpdmVLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtkaXJlY3RpdmVLZXldID0gZGlyZWN0aXZlVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN0cmluZ2lmeVBvbGljeSA9IChwb2xpY3k6IFBvbGljeVJlc3VsdCk6IHN0cmluZyA9PlxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMocG9saWN5KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKFssIHZhbHVlc10pID0+IHZhbHVlcz8ubGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5tYXAoZGlyZWN0aXZlID0+IGRpcmVjdGl2ZS5mbGF0KCkuam9pbihcIiBcIikpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCI7IFwiKTtcblxuICAgICAgICBjb25zdCBwYXRjaENzcCA9IChoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGZpbmRIZWFkZXIoaGVhZGVycywgXCJjb250ZW50LXNlY3VyaXR5LXBvbGljeVwiKTtcblxuICAgICAgICAgICAgaWYgKGhlYWRlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzcCA9IHBhcnNlUG9saWN5KGhlYWRlcnNbaGVhZGVyXVswXSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRpcmVjdGl2ZSBvZiBbXCJzdHlsZS1zcmNcIiwgXCJjb25uZWN0LXNyY1wiLCBcImltZy1zcmNcIiwgXCJmb250LXNyY1wiLCBcIm1lZGlhLXNyY1wiLCBcIndvcmtlci1zcmNcIiwgXCJzY3JpcHQtc3JjXCIsIFwiZnJhbWUtc3JjXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcFtkaXJlY3RpdmVdID8/PSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY3NwW2RpcmVjdGl2ZV0ucHVzaChcIipcIiwgXCJibG9iOlwiLCBcImRhdGE6XCIsIFwicml2ZXJjb3JkOlwiLCBcIid1bnNhZmUtaW5saW5lJ1wiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyAvLyBUT0RPOiBSZXN0cmljdCB0aGlzIHRvIG9ubHkgaW1wb3J0ZWQgcGFja2FnZXMgd2l0aCBmaXhlZCB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgIC8vIC8vIFBlcmhhcHMgYXV0byBnZW5lcmF0ZSB3aXRoIGVzYnVpbGRcbiAgICAgICAgICAgICAgICAvLyBjc3BbXCJzY3JpcHQtc3JjXCJdID8/PSBbXTtcbiAgICAgICAgICAgICAgICAvLyBjc3BbXCJzY3JpcHQtc3JjXCJdLnB1c2goXCIqXCIsIFwiJ3Vuc2FmZS1ldmFsJ1wiLCBcImh0dHBzOi8vdW5wa2cuY29tXCIsIFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbVwiKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2hlYWRlcl0gPSBbc3RyaW5naWZ5UG9saWN5KGNzcCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlc3Npb24uZGVmYXVsdFNlc3Npb24ud2ViUmVxdWVzdC5vbkhlYWRlcnNSZWNlaXZlZCgoeyByZXNwb25zZUhlYWRlcnMsIHJlc291cmNlVHlwZSB9LCBjYikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlSGVhZGVycykge1xuICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZVR5cGUgPT09IFwibWFpbkZyYW1lXCIpXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoQ3NwKHJlc3BvbnNlSGVhZGVycyk7XG5cbiAgICAgICAgICAgICAgICAvLyBGaXggaG9zdHMgdGhhdCBkb24ndCBwcm9wZXJseSBzZXQgdGhlIGNzcyBjb250ZW50IHR5cGUsIHN1Y2ggYXNcbiAgICAgICAgICAgICAgICAvLyByYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tXG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlVHlwZSA9PT0gXCJzdHlsZXNoZWV0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZmluZEhlYWRlcihyZXNwb25zZUhlYWRlcnMsIFwiY29udGVudC10eXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzW2hlYWRlcl0gPSBbXCJ0ZXh0L2Nzc1wiXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNiKHsgY2FuY2VsOiBmYWxzZSwgcmVzcG9uc2VIZWFkZXJzIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhc3NpZ24gYSBub29wIHRvIG9uSGVhZGVyc1JlY2VpdmVkIHRvIHByZXZlbnQgb3RoZXIgbW9kcyBmcm9tIGFkZGluZyB0aGVpciBvd24gaW5jb21wYXRpYmxlIG9uZXMuXG4gICAgICAgIC8vIEZvciBpbnN0YW5jZSwgT3BlbkFzYXIgYWRkcyB0aGVpciBvd24gdGhhdCBkb2Vzbid0IGZpeCBjb250ZW50LXR5cGUgZm9yIHN0eWxlc2hlZXRzIHdoaWNoIG1ha2VzIGl0XG4gICAgICAgIC8vIGltcG9zc2libGUgdG8gbG9hZCBjc3MgZnJvbSBnaXRodWIgcmF3IGRlc3BpdGUgb3VyIGZpeCBhYm92ZVxuICAgICAgICBzZXNzaW9uLmRlZmF1bHRTZXNzaW9uLndlYlJlcXVlc3Qub25IZWFkZXJzUmVjZWl2ZWQgPSAoKSA9PiB7IH07XG4gICAgfSk7XG59XG5cbmlmIChJU19ESVNDT1JEX0RFU0tUT1ApIHtcbiAgICByZXF1aXJlKFwiLi9wYXRjaGVyXCIpO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCBcIi4vdXBkYXRlclwiO1xuaW1wb3J0IFwiLi9pcGNQbHVnaW5zXCI7XG5pbXBvcnQgXCIuL3NldHRpbmdzXCI7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcIkBzaGFyZWQvZGVib3VuY2VcIjtcbmltcG9ydCB7IElwY0V2ZW50cyB9IGZyb20gXCJAc2hhcmVkL0lwY0V2ZW50c1wiO1xuaW1wb3J0IHsgQnJvd3NlcldpbmRvdywgaXBjTWFpbiwgc2hlbGwsIHN5c3RlbVByZWZlcmVuY2VzIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgbW9uYWNvSHRtbCBmcm9tIFwiZmlsZTovL21vbmFjb1dpbi5odG1sP21pbmlmeSZiYXNlNjRcIjtcbmltcG9ydCB7IEZTV2F0Y2hlciwgbWtkaXJTeW5jLCB3YXRjaCwgd3JpdGVGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgb3BlbiwgcmVhZGRpciwgcmVhZEZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4sIG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGdldFRoZW1lSW5mbywgc3RyaXBCT00sIFVzZXJUaGVtZUhlYWRlciB9IGZyb20gXCIuL3RoZW1lc1wiO1xuaW1wb3J0IHsgQUxMT1dFRF9QUk9UT0NPTFMsIFFVSUNLQ1NTX1BBVEgsIFRIRU1FU19ESVIgfSBmcm9tIFwiLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5IH0gZnJvbSBcIi4vdXRpbHMvZXh0ZXJuYWxMaW5rc1wiO1xuXG5ta2RpclN5bmMoVEhFTUVTX0RJUiwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTYWZlUGF0aChiYXNlUGF0aDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBub3JtYWxpemVkQmFzZVBhdGggPSBub3JtYWxpemUoYmFzZVBhdGgpO1xuICAgIGNvbnN0IG5ld1BhdGggPSBqb2luKGJhc2VQYXRoLCBwYXRoKTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IG5vcm1hbGl6ZShuZXdQYXRoKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZFBhdGguc3RhcnRzV2l0aChub3JtYWxpemVkQmFzZVBhdGgpID8gbm9ybWFsaXplZFBhdGggOiBudWxsO1xufVxuXG5mdW5jdGlvbiByZWFkQ3NzKCkge1xuICAgIHJldHVybiByZWFkRmlsZShRVUlDS0NTU19QQVRILCBcInV0Zi04XCIpLmNhdGNoKCgpID0+IFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0VGhlbWVzKCk6IFByb21pc2U8VXNlclRoZW1lSGVhZGVyW10+IHtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IHJlYWRkaXIoVEhFTUVTX0RJUikuY2F0Y2goKCkgPT4gW10pO1xuXG4gICAgY29uc3QgdGhlbWVJbmZvOiBVc2VyVGhlbWVIZWFkZXJbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBmaWxlcykge1xuICAgICAgICBpZiAoIWZpbGVOYW1lLmVuZHNXaXRoKFwiLmNzc1wiKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFRoZW1lRGF0YShmaWxlTmFtZSkudGhlbihzdHJpcEJPTSkuY2F0Y2goKCkgPT4gbnVsbCk7XG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRoZW1lSW5mby5wdXNoKGdldFRoZW1lSW5mbyhkYXRhLCBmaWxlTmFtZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGVtZUluZm87XG59XG5cbmZ1bmN0aW9uIGdldFRoZW1lRGF0YShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgZmlsZU5hbWUgPSBmaWxlTmFtZS5yZXBsYWNlKC9cXD92PVxcZCskLywgXCJcIik7XG4gICAgY29uc3Qgc2FmZVBhdGggPSBlbnN1cmVTYWZlUGF0aChUSEVNRVNfRElSLCBmaWxlTmFtZSk7XG4gICAgaWYgKCFzYWZlUGF0aCkgcmV0dXJuIFByb21pc2UucmVqZWN0KGBVbnNhZmUgcGF0aCAke2ZpbGVOYW1lfWApO1xuICAgIHJldHVybiByZWFkRmlsZShzYWZlUGF0aCwgXCJ1dGYtOFwiKTtcbn1cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLk9QRU5fUVVJQ0tDU1MsICgpID0+IHNoZWxsLm9wZW5QYXRoKFFVSUNLQ1NTX1BBVEgpKTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLk9QRU5fRVhURVJOQUwsIChfLCB1cmwpID0+IHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgeyBwcm90b2NvbCB9ID0gbmV3IFVSTCh1cmwpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICB0aHJvdyBcIk1hbGZvcm1lZCBVUkxcIjtcbiAgICB9XG4gICAgaWYgKCFBTExPV0VEX1BST1RPQ09MUy5pbmNsdWRlcyhwcm90b2NvbCkpXG4gICAgICAgIHRocm93IFwiRGlzYWxsb3dlZCBwcm90b2NvbC5cIjtcblxuICAgIHNoZWxsLm9wZW5FeHRlcm5hbCh1cmwpO1xufSk7XG5cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9RVUlDS19DU1MsICgpID0+IHJlYWRDc3MoKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuU0VUX1FVSUNLX0NTUywgKF8sIGNzcykgPT5cbiAgICB3cml0ZUZpbGVTeW5jKFFVSUNLQ1NTX1BBVEgsIGNzcylcbik7XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfVEhFTUVTX0RJUiwgKCkgPT4gVEhFTUVTX0RJUik7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1RIRU1FU19MSVNULCAoKSA9PiBsaXN0VGhlbWVzKCkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRV9EQVRBLCAoXywgZmlsZU5hbWUpID0+IGdldFRoZW1lRGF0YShmaWxlTmFtZSkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRV9TWVNURU1fVkFMVUVTLCAoKSA9PiAoe1xuICAgIC8vIHdpbiAmIG1hYyBvbmx5XG4gICAgXCJvcy1hY2NlbnQtY29sb3JcIjogYCMke3N5c3RlbVByZWZlcmVuY2VzLmdldEFjY2VudENvbG9yPy4oKSB8fCBcIlwifWBcbn0pKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdElwYyhtYWluV2luZG93OiBCcm93c2VyV2luZG93KSB7XG4gICAgbGV0IHF1aWNrQ3NzV2F0Y2hlcjogRlNXYXRjaGVyIHwgdW5kZWZpbmVkO1xuXG4gICAgb3BlbihRVUlDS0NTU19QQVRILCBcImErXCIpLnRoZW4oZmQgPT4ge1xuICAgICAgICBmZC5jbG9zZSgpO1xuICAgICAgICBxdWlja0Nzc1dhdGNoZXIgPSB3YXRjaChRVUlDS0NTU19QQVRILCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0sIGRlYm91bmNlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMucG9zdE1lc3NhZ2UoSXBjRXZlbnRzLlFVSUNLX0NTU19VUERBVEUsIGF3YWl0IHJlYWRDc3MoKSk7XG4gICAgICAgIH0sIDUwKSk7XG4gICAgfSkuY2F0Y2goKCkgPT4geyB9KTtcblxuICAgIGNvbnN0IHRoZW1lc1dhdGNoZXIgPSB3YXRjaChUSEVNRVNfRElSLCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0sIGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5wb3N0TWVzc2FnZShJcGNFdmVudHMuVEhFTUVfVVBEQVRFLCB2b2lkIDApO1xuICAgIH0pKTtcblxuICAgIG1haW5XaW5kb3cub25jZShcImNsb3NlZFwiLCAoKSA9PiB7XG4gICAgICAgIHF1aWNrQ3NzV2F0Y2hlcj8uY2xvc2UoKTtcbiAgICAgICAgdGhlbWVzV2F0Y2hlci5jbG9zZSgpO1xuICAgIH0pO1xufVxuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuT1BFTl9NT05BQ09fRURJVE9SLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBcIlJpdmVyY29yZCBRdWlja0NTUyBFZGl0b3JcIjtcbiAgICBjb25zdCBleGlzdGluZ1dpbmRvdyA9IEJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmZpbmQodyA9PiB3LnRpdGxlID09PSB0aXRsZSk7XG4gICAgaWYgKGV4aXN0aW5nV2luZG93ICYmICFleGlzdGluZ1dpbmRvdy5pc0Rlc3Ryb3llZCgpKSB7XG4gICAgICAgIGV4aXN0aW5nV2luZG93LmZvY3VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3aW4gPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRvSGlkZU1lbnVCYXI6IHRydWUsXG4gICAgICAgIGRhcmtUaGVtZTogdHJ1ZSxcbiAgICAgICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgICAgICAgIHByZWxvYWQ6IGpvaW4oX19kaXJuYW1lLCBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInByZWxvYWQuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcFByZWxvYWQuanNcIiksXG4gICAgICAgICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNhbmRib3g6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5KHdpbik7XG5cbiAgICBhd2FpdCB3aW4ubG9hZFVSTChgZGF0YTp0ZXh0L2h0bWw7YmFzZTY0LCR7bW9uYWNvSHRtbH1gKTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbi8vIGlmICghSVNfVVBEQVRFUl9ESVNBQkxFRClcbi8vICAgICByZXF1aXJlKElTX1NUQU5EQUxPTkUgPyBcIi4vaHR0cFwiIDogXCIuL2dpdFwiKTtcblxuaWYgKCFJU19VUERBVEVSX0RJU0FCTEVEKVxuICAgIHJlcXVpcmUoXCIuL2h0dHBcIik7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBpcGNNYWluIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbmltcG9ydCBQbHVnaW5OYXRpdmVzIGZyb20gXCJ+cGx1Z2luTmF0aXZlc1wiO1xuXG5jb25zdCBQbHVnaW5JcGNNYXBwaW5ncyA9IHt9IGFzIFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+O1xuZXhwb3J0IHR5cGUgUGx1Z2luSXBjTWFwcGluZ3MgPSB0eXBlb2YgUGx1Z2luSXBjTWFwcGluZ3M7XG5cbmZvciAoY29uc3QgW3BsdWdpbiwgbWV0aG9kc10gb2YgT2JqZWN0LmVudHJpZXMoUGx1Z2luTmF0aXZlcykpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMobWV0aG9kcyk7XG4gICAgaWYgKCFlbnRyaWVzLmxlbmd0aCkgY29udGludWU7XG5cbiAgICBjb25zdCBtYXBwaW5ncyA9IFBsdWdpbklwY01hcHBpbmdzW3BsdWdpbl0gPSB7fTtcblxuICAgIGZvciAoY29uc3QgW21ldGhvZE5hbWUsIG1ldGhvZF0gb2YgZW50cmllcykge1xuICAgICAgICBjb25zdCBrZXkgPSBgUml2ZXJjb3JkUGx1Z2luTmF0aXZlXyR7cGx1Z2lufV8ke21ldGhvZE5hbWV9YDtcbiAgICAgICAgaXBjTWFpbi5oYW5kbGUoa2V5LCBtZXRob2QpO1xuICAgICAgICBtYXBwaW5nc1ttZXRob2ROYW1lXSA9IGtleTtcbiAgICB9XG59XG5cbmlwY01haW4ub24oSXBjRXZlbnRzLkdFVF9QTFVHSU5fSVBDX01FVEhPRF9NQVAsIGUgPT4ge1xuICAgIGUucmV0dXJuVmFsdWUgPSBQbHVnaW5JcGNNYXBwaW5ncztcbn0pO1xuIiwgImltcG9ydCAqIGFzIHAwIGZyb20gXCIuL3BsdWdpbnMvYXBwbGVNdXNpYy5kZXNrdG9wL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDEgZnJvbSBcIi4vcGx1Z2lucy9jb25zb2xlU2hvcnRjdXRzL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDIgZnJvbSBcIi4vcGx1Z2lucy9maXhTcG90aWZ5RW1iZWRzLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwMyBmcm9tIFwiLi9wbHVnaW5zL2ZpeFlvdXR1YmVFbWJlZHMuZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA0IGZyb20gXCIuL3BsdWdpbnMvbWVkaWFEb3dubG9hZGVyLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwNSBmcm9tIFwiLi9wbHVnaW5zL21lc3NhZ2VMb2dnZXJFbmhhbmNlZC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA2IGZyb20gXCIuL3BsdWdpbnMvb3BlbkluQXBwL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDcgZnJvbSBcIi4vcGx1Z2lucy92b2ljZU1lc3NhZ2VzL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDggZnJvbSBcIi4vcGx1Z2lucy93YXRjaFRvZ2V0aGVyQWRibG9jay5kZXNrdG9wL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDkgZnJvbSBcIi4vcGx1Z2lucy94c092ZXJsYXkuZGVza3RvcC9uYXRpdmVcIjtcbmV4cG9ydCBkZWZhdWx0IHtcblwiQXBwbGVNdXNpY1JpY2hQcmVzZW5jZVwiOnAwLFxuXCJDb25zb2xlU2hvcnRjdXRzXCI6cDEsXG5cIkZpeFNwb3RpZnlFbWJlZHNcIjpwMixcblwiRml4WW91dHViZUVtYmVkc1wiOnAzLFxuXCJNZWRpYURvd25sb2FkZXJcIjpwNCxcblwiTWVzc2FnZUxvZ2dlckVuaGFuY2VkXCI6cDUsXG5cIk9wZW5JbkFwcFwiOnA2LFxuXCJWb2ljZU1lc3NhZ2VzXCI6cDcsXG5cIldhdGNoVG9nZXRoZXJBZGJsb2NrXCI6cDgsXG5cIlhTT3ZlcmxheVwiOnA5LFxufTsiLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyNCBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgZXhlY0ZpbGUgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcInV0aWxcIjtcblxuaW1wb3J0IHR5cGUgeyBUcmFja0RhdGEgfSBmcm9tIFwiLlwiO1xuXG5jb25zdCBleGVjID0gcHJvbWlzaWZ5KGV4ZWNGaWxlKTtcblxuLy8gZnVuY3Rpb24gZXhlYyhmaWxlOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdID0gW10pIHtcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2U8eyBjb2RlOiBudW1iZXIgfCBudWxsLCBzdGRvdXQ6IHN0cmluZyB8IG51bGwsIHN0ZGVycjogc3RyaW5nIHwgbnVsbDsgfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwcm9jZXNzID0gc3Bhd24oZmlsZSwgYXJncywgeyBzdGRpbzogW251bGwsIFwicGlwZVwiLCBcInBpcGVcIl0gfSk7XG5cbi8vICAgICAgICAgbGV0IHN0ZG91dDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4vLyAgICAgICAgIHByb2Nlc3Muc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoY2h1bms6IHN0cmluZykgPT4geyBzdGRvdXQgPz89IFwiXCI7IHN0ZG91dCArPSBjaHVuazsgfSk7XG4vLyAgICAgICAgIGxldCBzdGRlcnI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuLy8gICAgICAgICBwcm9jZXNzLnN0ZGVyci5vbihcImRhdGFcIiwgKGNodW5rOiBzdHJpbmcpID0+IHsgc3Rkb3V0ID8/PSBcIlwiOyBzdGRlcnIgKz0gY2h1bms7IH0pO1xuXG4vLyAgICAgICAgIHByb2Nlc3Mub24oXCJleGl0XCIsIGNvZGUgPT4geyByZXNvbHZlKHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfSk7IH0pO1xuLy8gICAgICAgICBwcm9jZXNzLm9uKFwiZXJyb3JcIiwgZXJyID0+IHJlamVjdChlcnIpKTtcbi8vICAgICB9KTtcbi8vIH1cblxuYXN5bmMgZnVuY3Rpb24gYXBwbGVzY3JpcHQoY21kczogc3RyaW5nW10pIHtcbiAgICBjb25zdCB7IHN0ZG91dCB9ID0gYXdhaXQgZXhlYyhcIm9zYXNjcmlwdFwiLCBjbWRzLm1hcChjID0+IFtcIi1lXCIsIGNdKS5mbGF0KCkpO1xuICAgIHJldHVybiBzdGRvdXQ7XG59XG5cbmZ1bmN0aW9uIG1ha2VTZWFyY2hVcmwodHlwZTogc3RyaW5nLCBxdWVyeTogc3RyaW5nKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChcImh0dHBzOi8vdG9vbHMuYXBwbGVtZWRpYXNlcnZpY2VzLmNvbS9hcGkvYXBwbGUtbWVkaWEvbXVzaWMvVVMvc2VhcmNoLmpzb25cIik7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoXCJ0eXBlc1wiLCB0eXBlKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChcImxpbWl0XCIsIFwiMVwiKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChcInRlcm1cIiwgcXVlcnkpO1xuICAgIHJldHVybiB1cmw7XG59XG5cbmNvbnN0IHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHtcbiAgICBoZWFkZXJzOiB7IFwidXNlci1hZ2VudFwiOiBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IHJ2OjEyNS4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEyNS4wXCIgfSxcbn07XG5cbmludGVyZmFjZSBSZW1vdGVEYXRhIHtcbiAgICBhcHBsZU11c2ljTGluaz86IHN0cmluZyxcbiAgICBzb25nTGluaz86IHN0cmluZyxcbiAgICBhbGJ1bUFydHdvcms/OiBzdHJpbmcsXG4gICAgYXJ0aXN0QXJ0d29yaz86IHN0cmluZztcbn1cblxubGV0IGNhY2hlZFJlbW90ZURhdGE6IHsgaWQ6IHN0cmluZywgZGF0YTogUmVtb3RlRGF0YTsgfSB8IHsgaWQ6IHN0cmluZywgZmFpbHVyZXM6IG51bWJlcjsgfSB8IG51bGwgPSBudWxsO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFJlbW90ZURhdGEoeyBpZCwgbmFtZSwgYXJ0aXN0LCBhbGJ1bSB9OiB7IGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYXJ0aXN0OiBzdHJpbmcsIGFsYnVtOiBzdHJpbmc7IH0pIHtcbiAgICBpZiAoaWQgPT09IGNhY2hlZFJlbW90ZURhdGE/LmlkKSB7XG4gICAgICAgIGlmIChcImRhdGFcIiBpbiBjYWNoZWRSZW1vdGVEYXRhKSByZXR1cm4gY2FjaGVkUmVtb3RlRGF0YS5kYXRhO1xuICAgICAgICBpZiAoXCJmYWlsdXJlc1wiIGluIGNhY2hlZFJlbW90ZURhdGEgJiYgY2FjaGVkUmVtb3RlRGF0YS5mYWlsdXJlcyA+PSA1KSByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBbc29uZ0RhdGEsIGFydGlzdERhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2gobWFrZVNlYXJjaFVybChcInNvbmdzXCIsIGFydGlzdCArIFwiIFwiICsgYWxidW0gKyBcIiBcIiArIG5hbWUpLCByZXF1ZXN0T3B0aW9ucykudGhlbihyID0+IHIuanNvbigpKSxcbiAgICAgICAgICAgIGZldGNoKG1ha2VTZWFyY2hVcmwoXCJhcnRpc3RzXCIsIGFydGlzdC5zcGxpdCgvICpbLCZdICovKVswXSksIHJlcXVlc3RPcHRpb25zKS50aGVuKHIgPT4gci5qc29uKCkpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IGFwcGxlTXVzaWNMaW5rID0gc29uZ0RhdGE/LnNvbmdzPy5kYXRhWzBdPy5hdHRyaWJ1dGVzLnVybDtcbiAgICAgICAgY29uc3Qgc29uZ0xpbmsgPSBzb25nRGF0YT8uc29uZ3M/LmRhdGFbMF0/LmlkID8gYGh0dHBzOi8vc29uZy5saW5rL2kvJHtzb25nRGF0YT8uc29uZ3M/LmRhdGFbMF0/LmlkfWAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3QgYWxidW1BcnR3b3JrID0gc29uZ0RhdGE/LnNvbmdzPy5kYXRhWzBdPy5hdHRyaWJ1dGVzLmFydHdvcmsudXJsLnJlcGxhY2UoXCJ7d31cIiwgXCI1MTJcIikucmVwbGFjZShcIntofVwiLCBcIjUxMlwiKTtcbiAgICAgICAgY29uc3QgYXJ0aXN0QXJ0d29yayA9IGFydGlzdERhdGE/LmFydGlzdHM/LmRhdGFbMF0/LmF0dHJpYnV0ZXMuYXJ0d29yay51cmwucmVwbGFjZShcInt3fVwiLCBcIjUxMlwiKS5yZXBsYWNlKFwie2h9XCIsIFwiNTEyXCIpO1xuXG4gICAgICAgIGNhY2hlZFJlbW90ZURhdGEgPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGRhdGE6IHsgYXBwbGVNdXNpY0xpbmssIHNvbmdMaW5rLCBhbGJ1bUFydHdvcmssIGFydGlzdEFydHdvcmsgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2FjaGVkUmVtb3RlRGF0YS5kYXRhO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltBcHBsZU11c2ljUmljaFByZXNlbmNlXSBGYWlsZWQgdG8gZmV0Y2ggcmVtb3RlIGRhdGE6XCIsIGUpO1xuICAgICAgICBjYWNoZWRSZW1vdGVEYXRhID0ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBmYWlsdXJlczogKGlkID09PSBjYWNoZWRSZW1vdGVEYXRhPy5pZCAmJiBcImZhaWx1cmVzXCIgaW4gY2FjaGVkUmVtb3RlRGF0YSA/IGNhY2hlZFJlbW90ZURhdGEuZmFpbHVyZXMgOiAwKSArIDFcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hUcmFja0RhdGEoKTogUHJvbWlzZTxUcmFja0RhdGEgfCBudWxsPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZXhlYyhcInBncmVwXCIsIFtcIl5NdXNpYyRcIl0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHBsYXllclN0YXRlID0gYXdhaXQgYXBwbGVzY3JpcHQoWyd0ZWxsIGFwcGxpY2F0aW9uIFwiTXVzaWNcIicsIFwiZ2V0IHBsYXllciBzdGF0ZVwiLCBcImVuZCB0ZWxsXCJdKVxuICAgICAgICAudGhlbihvdXQgPT4gb3V0LnRyaW0oKSk7XG4gICAgaWYgKHBsYXllclN0YXRlICE9PSBcInBsYXlpbmdcIikgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBwbGF5ZXJQb3NpdGlvbiA9IGF3YWl0IGFwcGxlc2NyaXB0KFsndGVsbCBhcHBsaWNhdGlvbiBcIk11c2ljXCInLCBcImdldCBwbGF5ZXIgcG9zaXRpb25cIiwgXCJlbmQgdGVsbFwiXSlcbiAgICAgICAgLnRoZW4odGV4dCA9PiBOdW1iZXIucGFyc2VGbG9hdCh0ZXh0LnRyaW0oKSkpO1xuXG4gICAgY29uc3Qgc3Rkb3V0ID0gYXdhaXQgYXBwbGVzY3JpcHQoW1xuICAgICAgICAnc2V0IG91dHB1dCB0byBcIlwiJyxcbiAgICAgICAgJ3RlbGwgYXBwbGljYXRpb24gXCJNdXNpY1wiJyxcbiAgICAgICAgXCJzZXQgdF9pZCB0byBkYXRhYmFzZSBpZCBvZiBjdXJyZW50IHRyYWNrXCIsXG4gICAgICAgIFwic2V0IHRfbmFtZSB0byBuYW1lIG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9hbGJ1bSB0byBhbGJ1bSBvZiBjdXJyZW50IHRyYWNrXCIsXG4gICAgICAgIFwic2V0IHRfYXJ0aXN0IHRvIGFydGlzdCBvZiBjdXJyZW50IHRyYWNrXCIsXG4gICAgICAgIFwic2V0IHRfZHVyYXRpb24gdG8gZHVyYXRpb24gb2YgY3VycmVudCB0cmFja1wiLFxuICAgICAgICAnc2V0IG91dHB1dCB0byBcIlwiICYgdF9pZCAmIFwiXFxcXG5cIiAmIHRfbmFtZSAmIFwiXFxcXG5cIiAmIHRfYWxidW0gJiBcIlxcXFxuXCIgJiB0X2FydGlzdCAmIFwiXFxcXG5cIiAmIHRfZHVyYXRpb24nLFxuICAgICAgICBcImVuZCB0ZWxsXCIsXG4gICAgICAgIFwicmV0dXJuIG91dHB1dFwiXG4gICAgXSk7XG5cbiAgICBjb25zdCBbaWQsIG5hbWUsIGFsYnVtLCBhcnRpc3QsIGR1cmF0aW9uU3RyXSA9IHN0ZG91dC5zcGxpdChcIlxcblwiKS5maWx0ZXIoayA9PiAhIWspO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gTnVtYmVyLnBhcnNlRmxvYXQoZHVyYXRpb25TdHIpO1xuXG4gICAgY29uc3QgcmVtb3RlRGF0YSA9IGF3YWl0IGZldGNoUmVtb3RlRGF0YSh7IGlkLCBuYW1lLCBhcnRpc3QsIGFsYnVtIH0pO1xuXG4gICAgcmV0dXJuIHsgbmFtZSwgYWxidW0sIGFydGlzdCwgcGxheWVyUG9zaXRpb24sIGR1cmF0aW9uLCAuLi5yZW1vdGVEYXRhIH07XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyNCBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgSXBjTWFpbkludm9rZUV2ZW50IH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGV2dG9vbHNPcGVuRWFnZXJMb2FkKGU6IElwY01haW5JbnZva2VFdmVudCkge1xuICAgIGNvbnN0IGhhbmRsZURldnRvb2xzT3BlbmVkID0gKCkgPT4gZS5zZW5kZXIuZXhlY3V0ZUphdmFTY3JpcHQoXCJSaXZlcmNvcmQuUGx1Z2lucy5wbHVnaW5zLkNvbnNvbGVTaG9ydGN1dHMuZWFnZXJMb2FkKHRydWUpXCIpO1xuXG4gICAgaWYgKGUuc2VuZGVyLmlzRGV2VG9vbHNPcGVuZWQoKSlcbiAgICAgICAgaGFuZGxlRGV2dG9vbHNPcGVuZWQoKTtcbiAgICBlbHNlXG4gICAgICAgIGUuc2VuZGVyLm9uY2UoXCJkZXZ0b29scy1vcGVuZWRcIiwgKCkgPT4gaGFuZGxlRGV2dG9vbHNPcGVuZWQoKSk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgUmVuZGVyZXJTZXR0aW5ncyB9IGZyb20gXCJAbWFpbi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbmFwcC5vbihcImJyb3dzZXItd2luZG93LWNyZWF0ZWRcIiwgKF8sIHdpbikgPT4ge1xuICAgIHdpbi53ZWJDb250ZW50cy5vbihcImZyYW1lLWNyZWF0ZWRcIiwgKF8sIHsgZnJhbWUgfSkgPT4ge1xuICAgICAgICBmcmFtZS5vbmNlKFwiZG9tLXJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChmcmFtZS51cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vb3Blbi5zcG90aWZ5LmNvbS9lbWJlZC9cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFJlbmRlcmVyU2V0dGluZ3Muc3RvcmUucGx1Z2lucz8uRml4U3BvdGlmeUVtYmVkcztcbiAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzPy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmcmFtZS5leGVjdXRlSmF2YVNjcmlwdChgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsID0gQXVkaW8ucHJvdG90eXBlLnBsYXk7XG4gICAgICAgICAgICAgICAgICAgIEF1ZGlvLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZvbHVtZSA9ICR7KHNldHRpbmdzLnZvbHVtZSAvIDEwMCkgfHwgMC4xfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyNCBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gXCJAYXBpL1NldHRpbmdzXCI7XG5pbXBvcnQgeyBJcGNFdmVudHMgfSBmcm9tIFwiQHNoYXJlZC9JcGNFdmVudHNcIjtcbmltcG9ydCB7IFNldHRpbmdzU3RvcmUgfSBmcm9tIFwiQHNoYXJlZC9TZXR0aW5nc1N0b3JlXCI7XG5pbXBvcnQgeyBtZXJnZURlZmF1bHRzIH0gZnJvbSBcIkB1dGlscy9tZXJnZURlZmF1bHRzXCI7XG5pbXBvcnQgeyBpcGNNYWluIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBta2RpclN5bmMsIHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgeyBOQVRJVkVfU0VUVElOR1NfRklMRSwgU0VUVElOR1NfRElSLCBTRVRUSU5HU19GSUxFIH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbm1rZGlyU3luYyhTRVRUSU5HU19ESVIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG5mdW5jdGlvbiByZWFkU2V0dGluZ3M8VCA9IG9iamVjdD4obmFtZTogc3RyaW5nLCBmaWxlOiBzdHJpbmcpOiBQYXJ0aWFsPFQ+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoZmlsZSwgXCJ1dGYtOFwiKSk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgaWYgKGVycj8uY29kZSAhPT0gXCJFTk9FTlRcIilcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byByZWFkICR7bmFtZX0gc2V0dGluZ3NgLCBlcnIpO1xuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBSZW5kZXJlclNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmUocmVhZFNldHRpbmdzPFNldHRpbmdzPihcInJlbmRlcmVyXCIsIFNFVFRJTkdTX0ZJTEUpKTtcblxuUmVuZGVyZXJTZXR0aW5ncy5hZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcigoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhTRVRUSU5HU19GSUxFLCBKU09OLnN0cmluZ2lmeShSZW5kZXJlclNldHRpbmdzLnBsYWluLCBudWxsLCA0KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHdyaXRlIHJlbmRlcmVyIHNldHRpbmdzXCIsIGUpO1xuICAgIH1cbn0pO1xuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1NFVFRJTkdTX0RJUiwgKCkgPT4gU0VUVElOR1NfRElSKTtcbmlwY01haW4ub24oSXBjRXZlbnRzLkdFVF9TRVRUSU5HUywgZSA9PiBlLnJldHVyblZhbHVlID0gUmVuZGVyZXJTZXR0aW5ncy5wbGFpbik7XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5TRVRfU0VUVElOR1MsIChfLCBkYXRhOiBTZXR0aW5ncywgcGF0aFRvTm90aWZ5Pzogc3RyaW5nKSA9PiB7XG4gICAgUmVuZGVyZXJTZXR0aW5ncy5zZXREYXRhKGRhdGEsIHBhdGhUb05vdGlmeSk7XG59KTtcblxuZXhwb3J0IGludGVyZmFjZSBOYXRpdmVTZXR0aW5ncyB7XG4gICAgcGx1Z2luczoge1xuICAgICAgICBbcGx1Z2luOiBzdHJpbmddOiB7XG4gICAgICAgICAgICBbc2V0dGluZzogc3RyaW5nXTogYW55O1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbmNvbnN0IERlZmF1bHROYXRpdmVTZXR0aW5nczogTmF0aXZlU2V0dGluZ3MgPSB7XG4gICAgcGx1Z2luczoge31cbn07XG5cbmNvbnN0IG5hdGl2ZVNldHRpbmdzID0gcmVhZFNldHRpbmdzPE5hdGl2ZVNldHRpbmdzPihcIm5hdGl2ZVwiLCBOQVRJVkVfU0VUVElOR1NfRklMRSk7XG5tZXJnZURlZmF1bHRzKG5hdGl2ZVNldHRpbmdzLCBEZWZhdWx0TmF0aXZlU2V0dGluZ3MpO1xuXG5leHBvcnQgY29uc3QgTmF0aXZlU2V0dGluZ3MgPSBuZXcgU2V0dGluZ3NTdG9yZShuYXRpdmVTZXR0aW5ncyk7XG5cbk5hdGl2ZVNldHRpbmdzLmFkZEdsb2JhbENoYW5nZUxpc3RlbmVyKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICB3cml0ZUZpbGVTeW5jKE5BVElWRV9TRVRUSU5HU19GSUxFLCBKU09OLnN0cmluZ2lmeShOYXRpdmVTZXR0aW5ncy5wbGFpbiwgbnVsbCwgNCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3cml0ZSBuYXRpdmUgc2V0dGluZ3NcIiwgZSk7XG4gICAgfVxufSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyNCBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgTGl0ZXJhbFVuaW9uIH0gZnJvbSBcInR5cGUtZmVzdFwiO1xuXG4vLyBSZXNvbHZlcyBhIHBvc3NpYmx5IG5lc3RlZCBwcm9wIGluIHRoZSBmb3JtIG9mIFwic29tZS5uZXN0ZWQucHJvcFwiIHRvIHR5cGUgb2YgVC5zb21lLm5lc3RlZC5wcm9wXG50eXBlIFJlc29sdmVQcm9wRGVlcDxULCBQPiA9IFAgZXh0ZW5kcyBgJHtpbmZlciBQcmV9LiR7aW5mZXIgU3VmfWBcbiAgICA/IFByZSBleHRlbmRzIGtleW9mIFRcbiAgICA/IFJlc29sdmVQcm9wRGVlcDxUW1ByZV0sIFN1Zj5cbiAgICA6IGFueVxuICAgIDogUCBleHRlbmRzIGtleW9mIFRcbiAgICA/IFRbUF1cbiAgICA6IGFueTtcblxuaW50ZXJmYWNlIFNldHRpbmdzU3RvcmVPcHRpb25zIHtcbiAgICByZWFkT25seT86IGJvb2xlYW47XG4gICAgZ2V0RGVmYXVsdFZhbHVlPzogKGRhdGE6IHtcbiAgICAgICAgdGFyZ2V0OiBhbnk7XG4gICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICByb290OiBhbnk7XG4gICAgICAgIHBhdGg6IHN0cmluZztcbiAgICB9KSA9PiBhbnk7XG59XG5cbi8vIG1lcmdlcyB0aGUgU2V0dGluZ3NTdG9yZU9wdGlvbnMgdHlwZSBpbnRvIHRoZSBjbGFzc1xuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5nc1N0b3JlPFQgZXh0ZW5kcyBvYmplY3Q+IGV4dGVuZHMgU2V0dGluZ3NTdG9yZU9wdGlvbnMgeyB9XG5cbi8qKlxuICogVGhlIFNldHRpbmdzU3RvcmUgYWxsb3dzIHlvdSB0byBlYXNpbHkgY3JlYXRlIGEgbXV0YWJsZSBzdG9yZSB0aGF0XG4gKiBoYXMgc3VwcG9ydCBmb3IgZ2xvYmFsIGFuZCBwYXRoLWJhc2VkIGNoYW5nZSBsaXN0ZW5lcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1N0b3JlPFQgZXh0ZW5kcyBvYmplY3Q+IHtcbiAgICBwcml2YXRlIHBhdGhMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgU2V0PChuZXdEYXRhOiBhbnkpID0+IHZvaWQ+PigpO1xuICAgIHByaXZhdGUgZ2xvYmFsTGlzdGVuZXJzID0gbmV3IFNldDwobmV3RGF0YTogVCwgcGF0aDogc3RyaW5nKSA9PiB2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0b3JlIG9iamVjdC4gTWFraW5nIGNoYW5nZXMgdG8gdGhpcyBvYmplY3Qgd2lsbCB0cmlnZ2VyIHRoZSBhcHBsaWNhYmxlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBzdG9yZTogVDtcbiAgICAvKipcbiAgICAgKiBUaGUgcGxhaW4gZGF0YS4gQ2hhbmdlcyB0byB0aGlzIG9iamVjdCB3aWxsIG5vdCB0cmlnZ2VyIGFueSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAgICovXG4gICAgcHVibGljIGRlY2xhcmUgcGxhaW46IFQ7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGxhaW46IFQsIG9wdGlvbnM6IFNldHRpbmdzU3RvcmVPcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5wbGFpbiA9IHBsYWluO1xuICAgICAgICB0aGlzLnN0b3JlID0gdGhpcy5tYWtlUHJveHkocGxhaW4pO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZVByb3h5KG9iamVjdDogYW55LCByb290OiBUID0gb2JqZWN0LCBwYXRoOiBzdHJpbmcgPSBcIlwiKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkob2JqZWN0LCB7XG4gICAgICAgICAgICBnZXQodGFyZ2V0LCBrZXk6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGxldCB2ID0gdGFyZ2V0W2tleV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gdGFyZ2V0KSAmJiBzZWxmLmdldERlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2ID0gc2VsZi5nZXREZWZhdWx0VmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodikpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLm1ha2VQcm94eSh2LCByb290LCBgJHtwYXRofSR7cGF0aCAmJiBcIi5cIn0ke2tleX1gKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh0YXJnZXQsIGtleTogc3RyaW5nLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRba2V5XSA9PT0gdmFsdWUpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRQYXRoID0gYCR7cGF0aH0ke3BhdGggJiYgXCIuXCJ9JHtrZXl9YDtcblxuICAgICAgICAgICAgICAgIHNlbGYuZ2xvYmFsTGlzdGVuZXJzLmZvckVhY2goY2IgPT4gY2IodmFsdWUsIHNldFBhdGgpKTtcbiAgICAgICAgICAgICAgICBzZWxmLnBhdGhMaXN0ZW5lcnMuZ2V0KHNldFBhdGgpPy5mb3JFYWNoKGNiID0+IGNiKHZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRhIG9mIHRoZSBzdG9yZS5cbiAgICAgKiBUaGlzIHdpbGwgdXBkYXRlIHRoaXMuc3RvcmUgYW5kIHRoaXMucGxhaW4gKGFuZCBvbGQgcmVmZXJlbmNlcyB0byB0aGVtIHdpbGwgYmUgc3RhbGUhIEF2b2lkIHN0b3JpbmcgdGhlbSBpbiB2YXJpYWJsZXMpXG4gICAgICpcbiAgICAgKiBBZGRpdGlvbmFsbHksIGFsbCBnbG9iYWwgbGlzdGVuZXJzIChhbmQgdGhvc2UgZm9yIHBhdGhUb05vdGlmeSwgaWYgc3BlY2lmaWVkKSB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgZGF0YVxuICAgICAqIEBwYXJhbSB2YWx1ZSBOZXcgZGF0YVxuICAgICAqIEBwYXJhbSBwYXRoVG9Ob3RpZnkgT3B0aW9uYWwgcGF0aCB0byBub3RpZnkgaW5zdGVhZCBvZiBnbG9iYWxseS4gVXNlZCB0byB0cmFuc2ZlciBwYXRoIHZpYSBpcGNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RGF0YSh2YWx1ZTogVCwgcGF0aFRvTm90aWZ5Pzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRPbmx5KSB0aHJvdyBuZXcgRXJyb3IoXCJTZXR0aW5nc1N0b3JlIGlzIHJlYWQtb25seVwiKTtcblxuICAgICAgICB0aGlzLnBsYWluID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc3RvcmUgPSB0aGlzLm1ha2VQcm94eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHBhdGhUb05vdGlmeSkge1xuICAgICAgICAgICAgbGV0IHYgPSB2YWx1ZTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHBhdGhUb05vdGlmeS5zcGxpdChcIi5cIik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcGF0aCkge1xuICAgICAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICBgU2V0dGluZ3Mjc2V0RGF0YTogUGF0aCAke3BhdGhUb05vdGlmeX0gZG9lcyBub3QgZXhpc3QgaW4gbmV3IGRhdGEuIE5vdCBkaXNwYXRjaGluZyB1cGRhdGVgXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdiA9IHZbcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGF0aExpc3RlbmVycy5nZXQocGF0aFRvTm90aWZ5KT8uZm9yRWFjaChjYiA9PiBjYih2KSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcmtBc0NoYW5nZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBnbG9iYWwgY2hhbmdlIGxpc3RlbmVyLCB0aGF0IHdpbGwgZmlyZSB3aGVuZXZlciBhbnkgc2V0dGluZyBpcyBjaGFuZ2VkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgbmV3IGRhdGEuIFRoaXMgaXMgZWl0aGVyIHRoZSBuZXcgdmFsdWUgc2V0IG9uIHRoZSBwYXRoLCBvciB0aGUgbmV3IHJvb3Qgb2JqZWN0IGlmIGl0IHdhcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHBhdGggb2YgdGhlIHNldHRpbmcgdGhhdCB3YXMgY2hhbmdlZC4gRW1wdHkgc3RyaW5nIGlmIHRoZSByb290IG9iamVjdCB3YXMgY2hhbmdlZFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcihjYjogKGRhdGE6IGFueSwgcGF0aDogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzLmFkZChjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgc2NvcGVkIGNoYW5nZSBsaXN0ZW5lciB0aGF0IHdpbGwgZmlyZSB3aGVuZXZlciBhIHNldHRpbmcgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBwYXRoIGlzIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSBpZiBwYXRoIGlzIGBcImZvby5iYXJcImAsIHRoZSBsaXN0ZW5lciB3aWxsIGZpcmUgb25cbiAgICAgKiBgYGBqc1xuICAgICAqIFNldHRpbmcuc3RvcmUuZm9vLmJhciA9IFwiaGlcIlxuICAgICAqIGBgYFxuICAgICAqIGJ1dCBub3Qgb25cbiAgICAgKiBgYGBqc1xuICAgICAqIFNldHRpbmcuc3RvcmUuZm9vLmJheiA9IFwiaGlcIlxuICAgICAqIGBgYFxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgcHVibGljIGFkZENoYW5nZUxpc3RlbmVyPFAgZXh0ZW5kcyBMaXRlcmFsVW5pb248a2V5b2YgVCwgc3RyaW5nPj4oXG4gICAgICAgIHBhdGg6IFAsXG4gICAgICAgIGNiOiAoZGF0YTogUmVzb2x2ZVByb3BEZWVwPFQsIFA+KSA9PiB2b2lkXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMucGF0aExpc3RlbmVycy5nZXQocGF0aCBhcyBzdHJpbmcpID8/IG5ldyBTZXQoKTtcbiAgICAgICAgbGlzdGVuZXJzLmFkZChjYik7XG4gICAgICAgIHRoaXMucGF0aExpc3RlbmVycy5zZXQocGF0aCBhcyBzdHJpbmcsIGxpc3RlbmVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgZ2xvYmFsIGxpc3RlbmVyXG4gICAgICogQHNlZSB7QGxpbmsgYWRkR2xvYmFsQ2hhbmdlTGlzdGVuZXJ9XG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUdsb2JhbENoYW5nZUxpc3RlbmVyKGNiOiAoZGF0YTogYW55LCBwYXRoOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxMaXN0ZW5lcnMuZGVsZXRlKGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBzY29wZWQgbGlzdGVuZXJcbiAgICAgKiBAc2VlIHtAbGluayBhZGRDaGFuZ2VMaXN0ZW5lcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQ2hhbmdlTGlzdGVuZXIocGF0aDogTGl0ZXJhbFVuaW9uPGtleW9mIFQsIHN0cmluZz4sIGNiOiAoZGF0YTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMucGF0aExpc3RlbmVycy5nZXQocGF0aCBhcyBzdHJpbmcpO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICAgIGxpc3RlbmVycy5kZWxldGUoY2IpO1xuICAgICAgICBpZiAoIWxpc3RlbmVycy5zaXplKSB0aGlzLnBhdGhMaXN0ZW5lcnMuZGVsZXRlKHBhdGggYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIGFsbCBnbG9iYWwgY2hhbmdlIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIHB1YmxpYyBtYXJrQXNDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLmdsb2JhbExpc3RlbmVycy5mb3JFYWNoKGNiID0+IGNiKHRoaXMucGxhaW4sIFwiXCIpKTtcbiAgICB9XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyNCBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBtZXJnZXMgZGVmYXVsdHMgaW50byBhbiBvYmplY3QgYW5kIHJldHVybnMgdGhlIHNhbWUgb2JqZWN0XG4gKiBAcGFyYW0gb2JqIE9iamVjdFxuICogQHBhcmFtIGRlZmF1bHRzIERlZmF1bHRzXG4gKiBAcmV0dXJucyBvYmpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVmYXVsdHM8VD4ob2JqOiBULCBkZWZhdWx0czogVCk6IFQge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRlZmF1bHRzKSB7XG4gICAgICAgIGNvbnN0IHYgPSBkZWZhdWx0c1trZXldO1xuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgIG9ialtrZXldID8/PSB7fSBhcyBhbnk7XG4gICAgICAgICAgICBtZXJnZURlZmF1bHRzKG9ialtrZXldLCB2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID8/PSB2O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGNvbnN0IERBVEFfRElSID0gcHJvY2Vzcy5lbnYuUklWRVJDT1JEX1VTRVJfREFUQV9ESVIgPz8gKFxuICAgIHByb2Nlc3MuZW52LkRJU0NPUkRfVVNFUl9EQVRBX0RJUlxuICAgICAgICA/IGpvaW4ocHJvY2Vzcy5lbnYuRElTQ09SRF9VU0VSX0RBVEFfRElSLCBcIi4uXCIsIFwiUml2ZXJjb3JkRGF0YVwiKVxuICAgICAgICA6IGpvaW4oYXBwLmdldFBhdGgoXCJ1c2VyRGF0YVwiKSwgXCIuLlwiLCBcIlJpdmVyY29yZFwiKVxuKTtcbmV4cG9ydCBjb25zdCBTRVRUSU5HU19ESVIgPSBqb2luKERBVEFfRElSLCBcInNldHRpbmdzXCIpO1xuZXhwb3J0IGNvbnN0IFRIRU1FU19ESVIgPSBqb2luKERBVEFfRElSLCBcInRoZW1lc1wiKTtcbmV4cG9ydCBjb25zdCBRVUlDS0NTU19QQVRIID0gam9pbihTRVRUSU5HU19ESVIsIFwicXVpY2tDc3MuY3NzXCIpO1xuZXhwb3J0IGNvbnN0IFNFVFRJTkdTX0ZJTEUgPSBqb2luKFNFVFRJTkdTX0RJUiwgXCJzZXR0aW5ncy5qc29uXCIpO1xuZXhwb3J0IGNvbnN0IE5BVElWRV9TRVRUSU5HU19GSUxFID0gam9pbihTRVRUSU5HU19ESVIsIFwibmF0aXZlLXNldHRpbmdzLmpzb25cIik7XG5leHBvcnQgY29uc3QgQUxMT1dFRF9QUk9UT0NPTFMgPSBbXG4gICAgXCJodHRwczpcIixcbiAgICBcImh0dHA6XCIsXG4gICAgXCJzdGVhbTpcIixcbiAgICBcInNwb3RpZnk6XCIsXG4gICAgXCJjb20uZXBpY2dhbWVzLmxhdW5jaGVyOlwiLFxuICAgIFwidGlkYWw6XCJcbl07XG5cbmV4cG9ydCBjb25zdCBJU19WQU5JTExBID0gLyogQF9fUFVSRV9fICovIHByb2Nlc3MuYXJndi5pbmNsdWRlcyhcIi0tdmFuaWxsYVwiKTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBSZW5kZXJlclNldHRpbmdzIH0gZnJvbSBcIkBtYWluL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuYXBwLm9uKFwiYnJvd3Nlci13aW5kb3ctY3JlYXRlZFwiLCAoXywgd2luKSA9PiB7XG4gICAgd2luLndlYkNvbnRlbnRzLm9uKFwiZnJhbWUtY3JlYXRlZFwiLCAoXywgeyBmcmFtZSB9KSA9PiB7XG4gICAgICAgIGZyYW1lLm9uY2UoXCJkb20tcmVhZHlcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZyYW1lLnVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LkZpeFlvdXR1YmVFbWJlZHM7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncz8uZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZnJhbWUuZXhlY3V0ZUphdmFTY3JpcHQoYFxuICAgICAgICAgICAgICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYueXRwLWVycm9yLWNvbnRlbnQtd3JhcC1zdWJyZWFzb24gYVtocmVmKj1cInd3dy55b3V0dWJlLmNvbS93YXRjaD92PVwiXScpXG4gICAgICAgICAgICAgICAgICAgICkgbG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgICAgICB9KS5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOnRydWUgfSk7XG4gICAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyNCBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgQ2hpbGRQcm9jZXNzV2l0aG91dE51bGxTdHJlYW1zLCBleGVjRmlsZVN5bmMsIHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IElwY01haW5JbnZva2VFdmVudCB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgb3MgZnJvbSBcIm9zXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG50eXBlIEZvcm1hdCA9IFwidmlkZW9cIiB8IFwiYXVkaW9cIiB8IFwiZ2lmXCI7XG50eXBlIERvd25sb2FkT3B0aW9ucyA9IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBmb3JtYXQ/OiBGb3JtYXQ7XG4gICAgZ2lmUXVhbGl0eT86IDEgfCAyIHwgMyB8IDQgfCA1O1xuICAgIHl0ZGxwQXJncz86IHN0cmluZ1tdO1xuICAgIGZmbXBlZ0FyZ3M/OiBzdHJpbmdbXTtcbiAgICBtYXhGaWxlU2l6ZT86IG51bWJlcjtcbn07XG5cbmxldCB3b3JrZGlyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbmxldCBzdGRvdXRfZ2xvYmFsOiBzdHJpbmcgPSBcIlwiO1xubGV0IGxvZ3NfZ2xvYmFsOiBzdHJpbmcgPSBcIlwiO1xuXG5sZXQgeXRkbHBBdmFpbGFibGUgPSBmYWxzZTtcbmxldCBmZm1wZWdBdmFpbGFibGUgPSBmYWxzZTtcblxubGV0IHl0ZGxwUHJvY2VzczogQ2hpbGRQcm9jZXNzV2l0aG91dE51bGxTdHJlYW1zIHwgbnVsbCA9IG51bGw7XG5sZXQgZmZtcGVnUHJvY2VzczogQ2hpbGRQcm9jZXNzV2l0aG91dE51bGxTdHJlYW1zIHwgbnVsbCA9IG51bGw7XG5cbmNvbnN0IGdldGRpciA9ICgpID0+IHdvcmtkaXIgPz8gcHJvY2Vzcy5jd2QoKTtcbmNvbnN0IHAgPSAoZmlsZTogc3RyaW5nKSA9PiBwYXRoLmpvaW4oZ2V0ZGlyKCksIGZpbGUpO1xuY29uc3QgY2xlYW5WaWRlb0ZpbGVzID0gKCkgPT4ge1xuICAgIGlmICghd29ya2RpcikgcmV0dXJuO1xuICAgIGZzLnJlYWRkaXJTeW5jKHdvcmtkaXIpXG4gICAgICAgIC5maWx0ZXIoZiA9PiBmLnN0YXJ0c1dpdGgoXCJkb3dubG9hZC5cIikgfHwgZi5zdGFydHNXaXRoKFwicmVtdXguXCIpKVxuICAgICAgICAuZm9yRWFjaChmID0+IGZzLnVubGlua1N5bmMocChmKSkpO1xufTtcbmNvbnN0IGFwcGVuZE91dCA9IChkYXRhOiBzdHJpbmcpID0+ICggLy8gTWFrZXMgY2FycmlhZ2UgcmV0dXJuIChcXHIpIHdvcmtcbiAgICAoc3Rkb3V0X2dsb2JhbCArPSBkYXRhKSwgKHN0ZG91dF9nbG9iYWwgPSBzdGRvdXRfZ2xvYmFsLnJlcGxhY2UoL14uKlxccihbXlxcbl0pL2dtLCBcIiQxXCIpKSk7XG5jb25zdCBsb2cgPSAoLi4uZGF0YTogc3RyaW5nW10pID0+IChjb25zb2xlLmxvZyhgW1BsdWdpbjpNZWRpYURvd25sb2FkZXJdICR7ZGF0YS5qb2luKFwiIFwiKX1gKSwgbG9nc19nbG9iYWwgKz0gYFtQbHVnaW46TWVkaWFEb3dubG9hZGVyXSAke2RhdGEuam9pbihcIiBcIil9XFxuYCk7XG5jb25zdCBlcnJvciA9ICguLi5kYXRhOiBzdHJpbmdbXSkgPT4gY29uc29sZS5lcnJvcihgW1BsdWdpbjpNZWRpYURvd25sb2FkZXJdIFtFUlJPUl0gJHtkYXRhLmpvaW4oXCIgXCIpfWApO1xuXG5mdW5jdGlvbiB5dGRscChhcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbG9nKGBFeGVjdXRpbmcgeXQtZGxwIHdpdGggYXJnczogW1wiJHthcmdzLm1hcChhID0+IGEucmVwbGFjZSgnXCInLCAnXFxcXFwiJykpLmpvaW4oJ1wiLCBcIicpfVwiXWApO1xuICAgIGxldCBlcnJvck1zZyA9IFwiXCI7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHl0ZGxwUHJvY2VzcyA9IHNwYXduKFwieXQtZGxwXCIsIGFyZ3MsIHtcbiAgICAgICAgICAgIGN3ZDogZ2V0ZGlyKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHl0ZGxwUHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIGRhdGEgPT4gYXBwZW5kT3V0KGRhdGEpKTtcbiAgICAgICAgeXRkbHBQcm9jZXNzLnN0ZGVyci5vbihcImRhdGFcIiwgZGF0YSA9PiB7XG4gICAgICAgICAgICBhcHBlbmRPdXQoZGF0YSk7XG4gICAgICAgICAgICBlcnJvcihgeXQtZGxwIGVuY291bnRlcmVkIGFuIGVycm9yOiAke2RhdGF9YCk7XG4gICAgICAgICAgICBlcnJvck1zZyArPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgeXRkbHBQcm9jZXNzLm9uKFwiZXhpdFwiLCBjb2RlID0+IHtcbiAgICAgICAgICAgIHl0ZGxwUHJvY2VzcyA9IG51bGw7XG4gICAgICAgICAgICBjb2RlID09PSAwID8gcmVzb2x2ZShzdGRvdXRfZ2xvYmFsKSA6IHJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cgfHwgYHl0LWRscCBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZmZtcGVnKGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsb2coYEV4ZWN1dGluZyBmZm1wZWcgd2l0aCBhcmdzOiBbXCIke2FyZ3MubWFwKGEgPT4gYS5yZXBsYWNlKCdcIicsICdcXFxcXCInKSkuam9pbignXCIsIFwiJyl9XCJdYCk7XG4gICAgbGV0IGVycm9yTXNnID0gXCJcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmZtcGVnUHJvY2VzcyA9IHNwYXduKFwiZmZtcGVnXCIsIGFyZ3MsIHtcbiAgICAgICAgICAgIGN3ZDogZ2V0ZGlyKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZmbXBlZ1Byb2Nlc3Muc3Rkb3V0Lm9uKFwiZGF0YVwiLCBkYXRhID0+IGFwcGVuZE91dChkYXRhKSk7XG4gICAgICAgIGZmbXBlZ1Byb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCBkYXRhID0+IHtcbiAgICAgICAgICAgIGFwcGVuZE91dChkYXRhKTtcbiAgICAgICAgICAgIGVycm9yKGBmZm1wZWcgZW5jb3VudGVyZWQgYW4gZXJyb3I6ICR7ZGF0YX1gKTtcbiAgICAgICAgICAgIGVycm9yTXNnICs9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICBmZm1wZWdQcm9jZXNzLm9uKFwiZXhpdFwiLCBjb2RlID0+IHtcbiAgICAgICAgICAgIGZmbXBlZ1Byb2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgY29kZSA9PT0gMCA/IHJlc29sdmUoc3Rkb3V0X2dsb2JhbCkgOiByZWplY3QobmV3IEVycm9yKGVycm9yTXNnIHx8IGBmZm1wZWcgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnQoXzogSXBjTWFpbkludm9rZUV2ZW50LCBfd29ya2Rpcjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgX3dvcmtkaXIgfHw9IGZzLm1rZHRlbXBTeW5jKHBhdGguam9pbihvcy50bXBkaXIoKSwgXCJ2ZW5jb3JkX21lZGlhRG93bmxvYWRlcl9cIikpO1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhfd29ya2RpcikpIGZzLm1rZGlyU3luYyhfd29ya2RpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgd29ya2RpciA9IF93b3JrZGlyO1xuICAgIGxvZyhcIlVzaW5nIHdvcmtkaXI6IFwiLCB3b3JrZGlyKTtcbiAgICByZXR1cm4gd29ya2Rpcjtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdG9wKF86IElwY01haW5JbnZva2VFdmVudCkge1xuICAgIGlmICh3b3JrZGlyKSB7XG4gICAgICAgIGxvZyhcIkNsZWFuaW5nIHVwIHdvcmtkaXJcIik7XG4gICAgICAgIGZzLnJtU3luYyh3b3JrZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgd29ya2RpciA9IG51bGw7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtZXRhZGF0YShvcHRpb25zOiBEb3dubG9hZE9wdGlvbnMpIHtcbiAgICBzdGRvdXRfZ2xvYmFsID0gXCJcIjtcbiAgICBjb25zdCBtZXRhZGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgeXRkbHAoW1wiLUpcIiwgb3B0aW9ucy51cmwsIFwiLS1uby13YXJuaW5nc1wiXSkpO1xuICAgIGlmIChtZXRhZGF0YS5pc19saXZlKSB0aHJvdyBcIkxpdmUgc3RyZWFtcyBhcmUgbm90IHN1cHBvcnRlZC5cIjtcbiAgICBzdGRvdXRfZ2xvYmFsID0gXCJcIjtcbiAgICByZXR1cm4geyB2aWRlb1RpdGxlOiBgJHttZXRhZGF0YS50aXRsZSB8fCBcInZpZGVvXCJ9ICgke21ldGFkYXRhLmlkfSlgIH07XG59XG5mdW5jdGlvbiBnZW5Gb3JtYXQoeyB2aWRlb1RpdGxlIH06IHsgdmlkZW9UaXRsZTogc3RyaW5nOyB9LCB7IG1heEZpbGVTaXplLCBmb3JtYXQgfTogRG93bmxvYWRPcHRpb25zKSB7XG4gICAgY29uc3QgSEFTX0xJTUlUID0gISFtYXhGaWxlU2l6ZTtcbiAgICBjb25zdCBNQVhfVklERU9fU0laRSA9IEhBU19MSU1JVCA/IG1heEZpbGVTaXplICogMC44IDogMDtcbiAgICBjb25zdCBNQVhfQVVESU9fU0laRSA9IEhBU19MSU1JVCA/IG1heEZpbGVTaXplICogMC4yIDogMDtcblxuICAgIGNvbnN0IGF1ZGlvID0ge1xuICAgICAgICBub0ZmbXBlZzogXCJiYVtleHQ9bXAzXXtUT1RfU0laRX0vd2FbZXh0PW1wM117VE9UX1NJWkV9XCIsXG4gICAgICAgIGZmbXBlZzogXCJiYSp7VE9UX1NJWkV9L2Jhe1RPVF9TSVpFfS93YSp7VE9UX1NJWkV9L2JhKlwiXG4gICAgfTtcbiAgICBjb25zdCB2aWRlbyA9IHtcbiAgICAgICAgbm9GZm1wZWc6IFwiYntUT1RfU0laRX17SEVJR0hUfVtleHQ9d2VibV0vYntUT1RfU0laRX17SEVJR0hUfVtleHQ9bXA0XS93e0hFSUdIVH17VE9UX1NJWkV9XCIsXG4gICAgICAgIGZmbXBlZzogXCJiKntWSURfU0laRX17SEVJR0hUfStiYXtBVURfU0laRX0vYntUT1RfU0laRX17SEVJR0hUfS9iKntIRUlHSFR9K2JhXCIsXG4gICAgfTtcbiAgICBjb25zdCBnaWYgPSB7XG4gICAgICAgIGZmbXBlZzogXCJidntUT1RfU0laRX0vd3Z7VE9UX1NJWkV9XCJcbiAgICB9O1xuXG4gICAgbGV0IGZvcm1hdF9ncm91cDogeyBub0ZmbXBlZz86IHN0cmluZzsgZmZtcGVnOiBzdHJpbmc7IH07XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgY2FzZSBcImF1ZGlvXCI6XG4gICAgICAgICAgICBmb3JtYXRfZ3JvdXAgPSBhdWRpbztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZ2lmXCI6XG4gICAgICAgICAgICBmb3JtYXRfZ3JvdXAgPSBnaWY7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInZpZGVvXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBmb3JtYXRfZ3JvdXAgPSB2aWRlbztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1hdF9zdHJpbmcgPSAoZmZtcGVnQXZhaWxhYmxlID8gZm9ybWF0X2dyb3VwLmZmbXBlZyA6IGZvcm1hdF9ncm91cC5ub0ZmbXBlZylcbiAgICAgICAgPy5yZXBsYWNlQWxsKFwie1RPVF9TSVpFfVwiLCBIQVNfTElNSVQgPyBgW2ZpbGVzaXplPCR7bWF4RmlsZVNpemV9XWAgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZUFsbChcIntWSURfU0laRX1cIiwgSEFTX0xJTUlUID8gYFtmaWxlc2l6ZTwke01BWF9WSURFT19TSVpFfV1gIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJ7QVVEX1NJWkV9XCIsIEhBU19MSU1JVCA/IGBbZmlsZXNpemU8JHtNQVhfQVVESU9fU0laRX1dYCA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlQWxsKFwie0hFSUdIVH1cIiwgXCJbaGVpZ2h0PD0xMDgwXVwiKTtcbiAgICBpZiAoIWZvcm1hdF9zdHJpbmcpIHRocm93IFwiR2lmIGZvcm1hdCBpcyBvbmx5IHN1cHBvcnRlZCB3aXRoIGZmbXBlZy5cIjtcbiAgICBsb2coXCJWaWRlbyBmb3JtYXRlZCBjYWxjdWxhdGVkIGFzIFwiLCBmb3JtYXRfc3RyaW5nKTtcbiAgICBsb2coYEJhc2VkIG9uOiBmb3JtYXQ9JHtmb3JtYXR9LCBtYXhGaWxlU2l6ZT0ke21heEZpbGVTaXplfSwgZmZtcGVnQXZhaWxhYmxlPSR7ZmZtcGVnQXZhaWxhYmxlfWApO1xuICAgIHJldHVybiB7IGZvcm1hdDogZm9ybWF0X3N0cmluZywgdmlkZW9UaXRsZSB9O1xufVxuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWQoeyBmb3JtYXQsIHZpZGVvVGl0bGUgfTogeyBmb3JtYXQ6IHN0cmluZzsgdmlkZW9UaXRsZTogc3RyaW5nOyB9LCB7IHl0ZGxwQXJncywgdXJsLCBmb3JtYXQ6IHVzckZvcm1hdCB9OiBEb3dubG9hZE9wdGlvbnMpIHtcbiAgICBjbGVhblZpZGVvRmlsZXMoKTtcbiAgICBjb25zdCBiYXNlQXJncyA9IFtcIi1mXCIsIGZvcm1hdCwgXCItb1wiLCBcImRvd25sb2FkLiUoZXh0KXNcIiwgXCItLWZvcmNlLW92ZXJ3cml0ZXNcIiwgXCItSVwiLCBcIjFcIl07XG4gICAgY29uc3QgcmVtdXhBcmdzID0gZmZtcGVnQXZhaWxhYmxlXG4gICAgICAgID8gdXNyRm9ybWF0ID09PSBcInZpZGVvXCJcbiAgICAgICAgICAgID8gW1wiLS1yZW11eC12aWRlb1wiLCBcIndlYm0+d2VibS9tcDRcIl1cbiAgICAgICAgICAgIDogdXNyRm9ybWF0ID09PSBcImF1ZGlvXCJcbiAgICAgICAgICAgICAgICA/IFtcIi0tZXh0cmFjdC1hdWRpb1wiLCBcIi0tYXVkaW8tZm9ybWF0XCIsIFwibXAzXCJdXG4gICAgICAgICAgICAgICAgOiBbXVxuICAgICAgICA6IFtdO1xuICAgIGNvbnN0IGN1c3RvbUFyZ3MgPSB5dGRscEFyZ3M/LmZpbHRlcihCb29sZWFuKSB8fCBbXTtcblxuICAgIGF3YWl0IHl0ZGxwKFt1cmwsIC4uLmJhc2VBcmdzLCAuLi5yZW11eEFyZ3MsIC4uLmN1c3RvbUFyZ3NdKTtcbiAgICBjb25zdCBmaWxlID0gZnMucmVhZGRpclN5bmMoZ2V0ZGlyKCkpLmZpbmQoZiA9PiBmLnN0YXJ0c1dpdGgoXCJkb3dubG9hZC5cIikpO1xuICAgIGlmICghZmlsZSkgdGhyb3cgXCJObyB2aWRlbyBmaWxlIHdhcyBmb3VuZCFcIjtcbiAgICByZXR1cm4geyBmaWxlLCB2aWRlb1RpdGxlIH07XG59XG5hc3luYyBmdW5jdGlvbiByZW11eCh7IGZpbGUsIHZpZGVvVGl0bGUgfTogeyBmaWxlOiBzdHJpbmc7IHZpZGVvVGl0bGU6IHN0cmluZzsgfSwgeyBmZm1wZWdBcmdzLCBmb3JtYXQsIG1heEZpbGVTaXplLCBnaWZRdWFsaXR5IH06IERvd25sb2FkT3B0aW9ucykge1xuICAgIGNvbnN0IHNvdXJjZUV4dGVuc2lvbiA9IGZpbGUuc3BsaXQoXCIuXCIpLnBvcCgpO1xuICAgIGlmICghZmZtcGVnQXZhaWxhYmxlKSByZXR1cm4gbG9nKFwiU2tpcHBpbmcgcmVtdXgsIGZmbXBlZyBpcyB1bmF2YWlsYWJsZS5cIiksIHsgZmlsZSwgdmlkZW9UaXRsZSwgZXh0ZW5zaW9uOiBzb3VyY2VFeHRlbnNpb24gfTtcblxuICAgIC8vIFdlIG9ubHkgcmVhbGx5IG5lZWQgdG8gcmVtdXggaWZcbiAgICAvLyAxLiBUaGUgZmlsZSBpcyB0b28gYmlnXG4gICAgLy8gMi4gVGhlIGZpbGUgaXMgaW4gYSBmb3JtYXQgbm90IHN1cHBvcnRlZCBieSBkaXNjb3JkXG4gICAgLy8gMy4gVGhlIHVzZXIgcHJvdmlkZWQgY3VzdG9tIGZmbXBlZyBhcmd1bWVudHNcbiAgICAvLyA0LiBUaGUgdGFyZ2V0IGZvcm1hdCBpcyBnaWZcbiAgICBjb25zdCBhY2NlcHRhYmxlRm9ybWF0cyA9IFtcIm1wM1wiLCBcIm1wNFwiLCBcIndlYm1cIl07XG4gICAgY29uc3QgZmlsZVNpemUgPSBmcy5zdGF0U3luYyhwKGZpbGUpKS5zaXplO1xuICAgIGNvbnN0IGN1c3RvbUFyZ3MgPSBmZm1wZWdBcmdzPy5maWx0ZXIoQm9vbGVhbikgfHwgW107XG5cbiAgICBjb25zdCBpc0Zvcm1hdEFjY2VwdGFibGUgPSBhY2NlcHRhYmxlRm9ybWF0cy5pbmNsdWRlcyhzb3VyY2VFeHRlbnNpb24gPz8gXCJcIik7XG4gICAgY29uc3QgaXNGaWxlU2l6ZUFjY2VwdGFibGUgPSAoIW1heEZpbGVTaXplIHx8IGZpbGVTaXplIDw9IG1heEZpbGVTaXplKTtcbiAgICBjb25zdCBoYXNDdXN0b21BcmdzID0gY3VzdG9tQXJncy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGlzR2lmID0gZm9ybWF0ID09PSBcImdpZlwiO1xuICAgIGlmIChpc0Zvcm1hdEFjY2VwdGFibGUgJiYgaXNGaWxlU2l6ZUFjY2VwdGFibGUgJiYgIWhhc0N1c3RvbUFyZ3MgJiYgIWlzR2lmKVxuICAgICAgICByZXR1cm4gbG9nKFwiU2tpcHBpbmcgcmVtdXgsIGZpbGUgdHlwZSBhbmQgc2l6ZSBhcmUgZ29vZCwgYW5kIG5vIGZmbXBlZyBhcmd1bWVudHMgd2VyZSBzcGVjaWZpZWQuXCIpLCB7IGZpbGUsIHZpZGVvVGl0bGUsIGV4dGVuc2lvbjogc291cmNlRXh0ZW5zaW9uIH07XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlRmxvYXQoZXhlY0ZpbGVTeW5jKFwiZmZwcm9iZVwiLCBbXCItdlwiLCBcImVycm9yXCIsIFwiLXNob3dfZW50cmllc1wiLCBcImZvcm1hdD1kdXJhdGlvblwiLCBcIi1vZlwiLCBcImRlZmF1bHQ9bm9wcmludF93cmFwcGVycz0xOm5va2V5PTFcIiwgcChmaWxlKV0pLnRvU3RyaW5nKCkpO1xuICAgIGlmIChpc05hTihkdXJhdGlvbikpIHRocm93IFwiRmFpbGVkIHRvIGdldCB2aWRlbyBkdXJhdGlvbi5cIjtcbiAgICAvLyBmZm1wZWcgdGVuZHMgdG8gZ28gYWJvdmUgdGhlIHRhcmdldCBzaXplLCBzbyBJJ20gc2V0dGluZyBpdCB0byA3LzhcbiAgICBjb25zdCB0YXJnZXRCaXRzID0gbWF4RmlsZVNpemUgPyAobWF4RmlsZVNpemUgKiA3KSAvIGR1cmF0aW9uIDogOTk5OTk5OTtcbiAgICBjb25zdCBraWxvYml0cyA9IH5+KHRhcmdldEJpdHMgLyAxMDI0KTtcblxuICAgIGxldCBiYXNlQXJnczogc3RyaW5nW107XG4gICAgbGV0IGV4dDogc3RyaW5nO1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgXCJhdWRpb1wiOlxuICAgICAgICAgICAgYmFzZUFyZ3MgPSBbXCItaVwiLCBwKGZpbGUpLCBcIi1iOmFcIiwgYCR7a2lsb2JpdHN9a2AsIFwiLW1heHJhdGVcIiwgYCR7a2lsb2JpdHN9a2AsIFwiLWJ1ZnNpemVcIiwgXCIxTVwiLCBcIi15XCJdO1xuICAgICAgICAgICAgZXh0ID0gXCJtcDNcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidmlkZW9cIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIER5bmFtaWNhbGx5IHJlc2l6ZSBiYXNlZCBvbiB0YXJnZXQgYml0cmF0ZVxuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0ga2lsb2JpdHMgPD0gMTAwID8gNDgwIDoga2lsb2JpdHMgPD0gNTAwID8gNzIwIDogMTA4MDtcbiAgICAgICAgICAgIGJhc2VBcmdzID0gW1wiLWlcIiwgcChmaWxlKSwgXCItYjp2XCIsIGAke35+KGtpbG9iaXRzICogMC44KX1rYCwgXCItYjphXCIsIGAke35+KGtpbG9iaXRzICogMC4yKX1rYCwgXCItbWF4cmF0ZVwiLCBgJHtraWxvYml0c31rYCwgXCItYnVmc2l6ZVwiLCBcIjFNXCIsIFwiLXlcIiwgXCItZmlsdGVyOnZcIiwgYHNjYWxlPS0xOiR7aGVpZ2h0fWBdO1xuICAgICAgICAgICAgZXh0ID0gXCJtcDRcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZ2lmXCI6XG4gICAgICAgICAgICBsZXQgZnBzOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGNvbG9yczogbnVtYmVyLCBiYXllcl9zY2FsZTogbnVtYmVyO1xuICAgICAgICAgICAgLy8gV0FSTklORzogdGhlc2UgcGFyYW1ldGVycyBoYXZlIGJlZW4gYXJiaXRyYXJpbHkgY2hvc2VuLCBvcHRpbWl6YXRpb24gaXMgd2VsY29tZSFcbiAgICAgICAgICAgIHN3aXRjaCAoZ2lmUXVhbGl0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZnBzID0gNSwgd2lkdGggPSAzNjAsIGNvbG9ycyA9IDI0LCBiYXllcl9zY2FsZSA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZnBzID0gMTAsIHdpZHRoID0gNDIwLCBjb2xvcnMgPSAzMiwgYmF5ZXJfc2NhbGUgPSA1O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZnBzID0gMTUsIHdpZHRoID0gNDgwLCBjb2xvcnMgPSA2NCwgYmF5ZXJfc2NhbGUgPSA0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGZwcyA9IDIwLCB3aWR0aCA9IDU0MCwgY29sb3JzID0gNjQsIGJheWVyX3NjYWxlID0gMztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSAzMCwgd2lkdGggPSA3MjAsIGNvbG9ycyA9IDEyOCwgYmF5ZXJfc2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmFzZUFyZ3MgPSBbXCItaVwiLCBwKGZpbGUpLCBcIi12ZlwiLCBgZnBzPSR7ZnBzfSxzY2FsZT13PSR7d2lkdGh9Omg9LTE6ZmxhZ3M9bGFuY3pvcyxtcGRlY2ltYXRlLHNwbGl0W3MwXVtzMV07W3MwXXBhbGV0dGVnZW49bWF4X2NvbG9ycz0ke2NvbG9yc31bcF07W3MxXVtwXXBhbGV0dGV1c2U9ZGl0aGVyPWJheWVyOmJheWVyX3NjYWxlPSR7YmF5ZXJfc2NhbGV9YCwgXCItbG9vcFwiLCBcIjBcIiwgXCItYnVmc2l6ZVwiLCBcIjFNXCIsIFwiLXlcIl07XG4gICAgICAgICAgICBleHQgPSBcImdpZlwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgYXdhaXQgZmZtcGVnKFsuLi5iYXNlQXJncywgLi4uY3VzdG9tQXJncywgYHJlbXV4LiR7ZXh0fWBdKTtcbiAgICByZXR1cm4geyBmaWxlOiBgcmVtdXguJHtleHR9YCwgdmlkZW9UaXRsZSwgZXh0ZW5zaW9uOiBleHQgfTtcbn1cbmZ1bmN0aW9uIHVwbG9hZCh7IGZpbGUsIHZpZGVvVGl0bGUsIGV4dGVuc2lvbiB9OiB7IGZpbGU6IHN0cmluZzsgdmlkZW9UaXRsZTogc3RyaW5nOyBleHRlbnNpb246IHN0cmluZyB8IHVuZGVmaW5lZDsgfSkge1xuICAgIGlmICghZXh0ZW5zaW9uKSB0aHJvdyBcIkludmFsaWQgZXh0ZW5zaW9uLlwiO1xuICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhwKGZpbGUpKTtcbiAgICByZXR1cm4geyBidWZmZXIsIHRpdGxlOiBgJHt2aWRlb1RpdGxlfS4ke2V4dGVuc2lvbn1gIH07XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZShcbiAgICBfOiBJcGNNYWluSW52b2tlRXZlbnQsXG4gICAgb3B0OiBEb3dubG9hZE9wdGlvbnNcbik6IFByb21pc2U8e1xuICAgIGJ1ZmZlcjogQnVmZmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbG9nczogc3RyaW5nO1xufSB8IHtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGxvZ3M6IHN0cmluZztcbn0+IHtcbiAgICBsb2dzX2dsb2JhbCA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmlkZW9NZXRhZGF0YSA9IGF3YWl0IG1ldGFkYXRhKG9wdCk7XG4gICAgICAgIGNvbnN0IHZpZGVvRm9ybWF0ID0gZ2VuRm9ybWF0KHZpZGVvTWV0YWRhdGEsIG9wdCk7XG4gICAgICAgIGNvbnN0IHZpZGVvRG93bmxvYWQgPSBhd2FpdCBkb3dubG9hZCh2aWRlb0Zvcm1hdCwgb3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9SZW11eCA9IGF3YWl0IHJlbXV4KHZpZGVvRG93bmxvYWQsIG9wdCk7XG4gICAgICAgIGNvbnN0IHZpZGVvVXBsb2FkID0gdXBsb2FkKHZpZGVvUmVtdXgpO1xuICAgICAgICByZXR1cm4geyBsb2dzOiBsb2dzX2dsb2JhbCwgLi4udmlkZW9VcGxvYWQgfTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGUudG9TdHJpbmcoKSwgbG9nczogbG9nc19nbG9iYWwgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja2ZmbXBlZyhfPzogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY0ZpbGVTeW5jKFwiZmZtcGVnXCIsIFtcIi12ZXJzaW9uXCJdKTtcbiAgICAgICAgZXhlY0ZpbGVTeW5jKFwiZmZwcm9iZVwiLCBbXCItdmVyc2lvblwiXSk7XG4gICAgICAgIGZmbXBlZ0F2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZmZtcGVnQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2t5dGRscChfPzogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY0ZpbGVTeW5jKFwieXQtZGxwXCIsIFtcIi0tdmVyc2lvblwiXSk7XG4gICAgICAgIHl0ZGxwQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB5dGRscEF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW50ZXJydXB0KF86IElwY01haW5JbnZva2VFdmVudCkge1xuICAgIGxvZyhcIkludGVycnVwdGluZy4uLlwiKTtcbiAgICB5dGRscFByb2Nlc3M/LmtpbGwoKTtcbiAgICBmZm1wZWdQcm9jZXNzPy5raWxsKCk7XG4gICAgY2xlYW5WaWRlb0ZpbGVzKCk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTdGRvdXQgPSAoKSA9PiBzdGRvdXRfZ2xvYmFsO1xuZXhwb3J0IGNvbnN0IGlzWXRkbHBBdmFpbGFibGUgPSAoKSA9PiB5dGRscEF2YWlsYWJsZTtcbmV4cG9ydCBjb25zdCBpc0ZmbXBlZ0F2YWlsYWJsZSA9ICgpID0+IGZmbXBlZ0F2YWlsYWJsZTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyByZWFkZGlyLCByZWFkRmlsZSwgdW5saW5rLCB3cml0ZUZpbGUgfSBmcm9tIFwibm9kZTpmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCJAdXRpbHMvUXVldWVcIjtcbmltcG9ydCB7IGRpYWxvZywgSXBjTWFpbkludm9rZUV2ZW50LCBzaGVsbCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5pbXBvcnQgeyBEQVRBX0RJUiB9IGZyb20gXCIuLi8uLi8uLi9tYWluL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHNhdmVTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBlbnN1cmVEaXJlY3RvcnlFeGlzdHMsIGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCB7IGdldFNldHRpbmdzIH07XG5cbi8vIHNvIHdlIGNhbiBmaWx0ZXIgdGhlIG5hdGl2ZSBoZWxwZXJzIGJ5IHRoaXMga2V5XG5leHBvcnQgZnVuY3Rpb24gbWVzc2FnZUxvZ2dlckVuaGFuY2VkVW5pcXVlSWRUaGluZ3lJZGtNYW4oKSB7IH1cblxuLy8gTWFwPGF0dGFjaG1ldElkLCBwYXRoPigpXG5jb25zdCBuYXRpdmVTYXZlZEltYWdlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5leHBvcnQgY29uc3QgZ2V0TmF0aXZlU2F2ZWRJbWFnZXMgPSAoKSA9PiBuYXRpdmVTYXZlZEltYWdlcztcblxubGV0IGxvZ3NEaXI6IHN0cmluZztcbmxldCBpbWFnZUNhY2hlRGlyOiBzdHJpbmc7XG5cbmNvbnN0IGdldEltYWdlQ2FjaGVEaXIgPSBhc3luYyAoKSA9PiBpbWFnZUNhY2hlRGlyID8/IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpO1xuY29uc3QgZ2V0TG9nc0RpciA9IGFzeW5jICgpID0+IGxvZ3NEaXIgPz8gYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKTtcblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0RGlycygpIHtcbiAgICBjb25zdCB7IGxvZ3NEaXI6IGxkLCBpbWFnZUNhY2hlRGlyOiBpY2QgfSA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG5cbiAgICBsb2dzRGlyID0gbGQgfHwgYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKTtcbiAgICBpbWFnZUNhY2hlRGlyID0gaWNkIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpO1xufVxuaW5pdERpcnMoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBpbWFnZURpciA9IGF3YWl0IGdldEltYWdlQ2FjaGVEaXIoKTtcblxuICAgIGF3YWl0IGVuc3VyZURpcmVjdG9yeUV4aXN0cyhpbWFnZURpcik7XG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCByZWFkZGlyKGltYWdlRGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnRJZCA9IGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZShmaWxlbmFtZSk7XG4gICAgICAgIG5hdGl2ZVNhdmVkSW1hZ2VzLnNldChhdHRhY2htZW50SWQsIHBhdGguam9pbihpbWFnZURpciwgZmlsZW5hbWUpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJbWFnZU5hdGl2ZShfZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgYXR0YWNobWVudElkOiBzdHJpbmcpOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBCdWZmZXIgfCBudWxsPiB7XG4gICAgY29uc3QgaW1hZ2VQYXRoID0gbmF0aXZlU2F2ZWRJbWFnZXMuZ2V0KGF0dGFjaG1lbnRJZCk7XG4gICAgaWYgKCFpbWFnZVBhdGgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhd2FpdCByZWFkRmlsZShpbWFnZVBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVJbWFnZU5hdGl2ZShfZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogVWludDhBcnJheSkge1xuICAgIGlmICghZmlsZW5hbWUgfHwgIWNvbnRlbnQpIHJldHVybjtcbiAgICBjb25zdCBpbWFnZURpciA9IGF3YWl0IGdldEltYWdlQ2FjaGVEaXIoKTtcblxuICAgIC8vIHJldHVybnMgdGhlIGZpbGUgbmFtZVxuICAgIC8vIC4uLy4uL3NvbWVNYWxpY291c1BhdGgucG5nIC0+IHNvbWVNYWxpY291c1BhdGhcbiAgICBjb25zdCBhdHRhY2htZW50SWQgPSBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWUpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdJbWFnZSA9IG5hdGl2ZVNhdmVkSW1hZ2VzLmdldChhdHRhY2htZW50SWQpO1xuICAgIGlmIChleGlzdGluZ0ltYWdlKSByZXR1cm47XG5cbiAgICBjb25zdCBpbWFnZVBhdGggPSBwYXRoLmpvaW4oaW1hZ2VEaXIsIGZpbGVuYW1lKTtcbiAgICBhd2FpdCBlbnN1cmVEaXJlY3RvcnlFeGlzdHMoaW1hZ2VEaXIpO1xuICAgIGF3YWl0IHdyaXRlRmlsZShpbWFnZVBhdGgsIGNvbnRlbnQpO1xuXG4gICAgbmF0aXZlU2F2ZWRJbWFnZXMuc2V0KGF0dGFjaG1lbnRJZCwgaW1hZ2VQYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUZpbGVOYXRpdmUoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGF0dGFjaG1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW1hZ2VQYXRoID0gbmF0aXZlU2F2ZWRJbWFnZXMuZ2V0KGF0dGFjaG1lbnRJZCk7XG4gICAgaWYgKCFpbWFnZVBhdGgpIHJldHVybjtcblxuICAgIGF3YWl0IHVubGluayhpbWFnZVBhdGgpO1xufVxuXG5jb25zdCBMT0dTX0RBVEFfRklMRU5BTUUgPSBcIm1lc3NhZ2UtbG9nZ2VyLWxvZ3MuanNvblwiO1xuY29uc3QgZGF0YVdyaXRlUXVldWUgPSBuZXcgUXVldWUoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExvZ3NGcm9tRnMoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBsb2dzRGlyID0gYXdhaXQgZ2V0TG9nc0RpcigpO1xuXG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKGxvZ3NEaXIpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGF3YWl0IHJlYWRGaWxlKHBhdGguam9pbihsb2dzRGlyLCBMT0dTX0RBVEFfRklMRU5BTUUpLCBcInV0Zi04XCIpKTtcbiAgICB9IGNhdGNoIHsgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZUxvZ3MoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBsb2dzRGlyID0gYXdhaXQgZ2V0TG9nc0RpcigpO1xuXG4gICAgZGF0YVdyaXRlUXVldWUucHVzaCgoKSA9PiB3cml0ZUZpbGUocGF0aC5qb2luKGxvZ3NEaXIsIExPR1NfREFUQV9GSUxFTkFNRSksIGNvbnRlbnRzKSk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKSwgXCJzYXZlZEltYWdlc1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHBhdGguam9pbihEQVRBX0RJUiwgXCJNZXNzYWdlTG9nZ2VyRGF0YVwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNob29zZURpcihldmVudDogSXBjTWFpbkludm9rZUV2ZW50LCBsb2dLZXk6IFwibG9nc0RpclwiIHwgXCJpbWFnZUNhY2hlRGlyXCIpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG4gICAgY29uc3QgZGVmYXVsdFBhdGggPSBzZXR0aW5nc1tsb2dLZXldIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBkaWFsb2cuc2hvd09wZW5EaWFsb2coeyBwcm9wZXJ0aWVzOiBbXCJvcGVuRGlyZWN0b3J5XCJdLCBkZWZhdWx0UGF0aDogZGVmYXVsdFBhdGggfSk7XG4gICAgY29uc3QgZGlyID0gcmVzLmZpbGVQYXRoc1swXTtcblxuICAgIGlmICghZGlyKSB0aHJvdyBFcnJvcihcIkludmFsaWQgRGlyZWN0b3J5XCIpO1xuXG4gICAgc2V0dGluZ3NbbG9nS2V5XSA9IGRpcjtcblxuICAgIGF3YWl0IHNhdmVTZXR0aW5ncyhzZXR0aW5ncyk7XG5cbiAgICBzd2l0Y2ggKGxvZ0tleSkge1xuICAgICAgICBjYXNlIFwibG9nc0RpclwiOiBsb2dzRGlyID0gZGlyOyBicmVhaztcbiAgICAgICAgY2FzZSBcImltYWdlQ2FjaGVEaXJcIjogaW1hZ2VDYWNoZURpciA9IGRpcjsgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGxvZ0tleSA9PT0gXCJpbWFnZUNhY2hlRGlyXCIpXG4gICAgICAgIGF3YWl0IGluaXQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGRpcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3dJdGVtSW5Gb2xkZXIoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICBzaGVsbC5zaG93SXRlbUluRm9sZGVyKGZpbGVQYXRoKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBQcm9taXNhYmxlIH0gZnJvbSBcInR5cGUtZmVzdFwiO1xuXG4vKipcbiAqIEEgcXVldWUgdGhhdCBjYW4gYmUgdXNlZCB0byBydW4gdGFza3MgY29uc2VjdXRpdmVseS5cbiAqIEhpZ2hseSByZWNvbW1lbmRlZCBmb3IgdGhpbmdzIGxpa2UgZmV0Y2hpbmcgZGF0YSBmcm9tIERpc2NvcmRcbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXVlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWF4U2l6ZSBUaGUgbWF4aW11bSBhbW91bnQgb2YgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHF1ZXVlZCBhdCBvbmNlLlxuICAgICAqICAgICAgICAgICAgICAgIElmIHRoZSBxdWV1ZSBpcyBmdWxsLCB0aGUgb2xkZXN0IGZ1bmN0aW9uIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWF4U2l6ZSA9IEluZmluaXR5KSB7IH1cblxuICAgIHByaXZhdGUgcXVldWUgPSBbXSBhcyBBcnJheTwoKSA9PiBQcm9taXNhYmxlPHVua25vd24+PjtcblxuICAgIHByaXZhdGUgcHJvbWlzZT86IFByb21pc2U8YW55PjtcblxuICAgIHByaXZhdGUgbmV4dCgpIHtcbiAgICAgICAgY29uc3QgZnVuYyA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKGZ1bmMpXG4gICAgICAgICAgICB0aGlzLnByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmMpXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5uZXh0KCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnByb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBydW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9taXNlKVxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGEgdGFzayBhdCB0aGUgZW5kIG9mIHRoZSBxdWV1ZS4gVGhpcyB0YXNrIHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIG90aGVyIHRhc2tzXG4gICAgICogSWYgdGhlIHF1ZXVlIGV4Y2VlZHMgdGhlIHNwZWNpZmllZCBtYXhTaXplLCB0aGUgZmlyc3QgdGFzayBpbiBxdWV1ZSB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIGZ1bmMgVGFza1xuICAgICAqL1xuICAgIHB1c2g8VD4oZnVuYzogKCkgPT4gUHJvbWlzYWJsZTxUPikge1xuICAgICAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSlcbiAgICAgICAgICAgIHRoaXMucXVldWUuc2hpZnQoKTtcblxuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZnVuYyk7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGVuZCBhIHRhc2sgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuIFRoaXMgdGFzayB3aWxsIGJlIGV4ZWN1dGVkIG5leHRcbiAgICAgKiBJZiB0aGUgcXVldWUgZXhjZWVkcyB0aGUgc3BlY2lmaWVkIG1heFNpemUsIHRoZSBsYXN0IHRhc2sgaW4gcXVldWUgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIEBwYXJhbSBmdW5jIFRhc2tcbiAgICAgKi9cbiAgICB1bnNoaWZ0PFQ+KGZ1bmM6ICgpID0+IFByb21pc2FibGU8VD4pIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnBvcCgpO1xuXG4gICAgICAgIHRoaXMucXVldWUudW5zaGlmdChmdW5jKTtcbiAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYW1vdW50IG9mIHRhc2tzIGluIHRoZSBxdWV1ZVxuICAgICAqL1xuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgfVxufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGdldERlZmF1bHROYXRpdmVEYXRhRGlyLCBnZXREZWZhdWx0TmF0aXZlSW1hZ2VEaXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgZW5zdXJlRGlyZWN0b3J5RXhpc3RzIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIE1MU2V0dGluZ3Mge1xuICAgIGxvZ3NEaXI6IHN0cmluZztcbiAgICBpbWFnZUNhY2hlRGlyOiBzdHJpbmc7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxNTFNldHRpbmdzPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBmcy5yZWFkRmlsZShhd2FpdCBnZXRTZXR0aW5nc0ZpbGVQYXRoKCksIFwidXRmOFwiKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBwcm9iYWJseSBkb2VzbnQgZXhpc3RcbiAgICAgICAgLy8gdGltZSB0byBjcmVhdGUgaXRcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBsb2dzRGlyOiBhd2FpdCBnZXREZWZhdWx0TmF0aXZlRGF0YURpcigpLFxuICAgICAgICAgICAgaW1hZ2VDYWNoZURpcjogYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZUltYWdlRGlyKCksXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxuXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICB9XG59XG5cbi8vIGRvbnQgZXhwb3NlIHRoaXMgdG8gcmVuZGVyZXIgZnV0dXJlIG1lXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBNTFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncykgcmV0dXJuO1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShhd2FpdCBnZXRTZXR0aW5nc0ZpbGVQYXRoKCksIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLCBudWxsLCA0KSwgXCJ1dGY4XCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0ZpbGVQYXRoKCkge1xuICAgIC8vIG1sU2V0dGluZ3MuanNvbiB3aWxsIGFsd2F5cyBpbiB0aGF0IGZvbGRlclxuICAgIGNvbnN0IE1sRGF0YURpciA9IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKE1sRGF0YURpcik7XG4gICAgY29uc3QgbWxTZXR0aW5nc0RpciA9IHBhdGguam9pbihNbERhdGFEaXIsIFwibWxTZXR0aW5ncy5qc29uXCIpO1xuXG4gICAgcmV0dXJuIG1sU2V0dGluZ3NEaXI7XG59XG5cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBhY2Nlc3MsIG1rZGlyIH0gZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhpc3RzKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhY2Nlc3MoZmlsZW5hbWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlRGlyZWN0b3J5RXhpc3RzKGNhY2hlRGlyOiBzdHJpbmcpIHtcbiAgICBpZiAoIWF3YWl0IGV4aXN0cyhjYWNoZURpcikpXG4gICAgICAgIGF3YWl0IG1rZGlyKGNhY2hlRGlyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZShmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZW5hbWUpLm5hbWU7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgSXBjTWFpbkludm9rZUV2ZW50IH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSBcImh0dHBzXCI7XG5cbi8vIFRoZXNlIGxpbmtzIGRvbid0IHN1cHBvcnQgQ09SUywgc28gdGhpcyBoYXMgdG8gYmUgbmF0aXZlXG5jb25zdCB2YWxpZFJlZGlyZWN0VXJscyA9IC9eaHR0cHM6XFwvXFwvKHNwb3RpZnlcXC5saW5rfHNcXC50ZWFtKVxcLy4rJC87XG5cbmZ1bmN0aW9uIGdldFJlZGlyZWN0KHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZXEgPSByZXF1ZXN0KG5ldyBVUkwodXJsKSwgeyBtZXRob2Q6IFwiSEVBRFwiIH0sIHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgICAgIHJlcy5oZWFkZXJzLmxvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgID8gZ2V0UmVkaXJlY3QocmVzLmhlYWRlcnMubG9jYXRpb24pXG4gICAgICAgICAgICAgICAgICAgIDogdXJsXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgICAgICAgcmVxLmVuZCgpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVJlZGlyZWN0KF86IElwY01haW5JbnZva2VFdmVudCwgdXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXZhbGlkUmVkaXJlY3RVcmxzLnRlc3QodXJsKSkgcmV0dXJuIHVybDtcblxuICAgIHJldHVybiBnZXRSZWRpcmVjdCh1cmwpO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGJhc2VuYW1lLCBub3JtYWxpemUgfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZFJlY29yZGluZyhfLCBmaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgZmlsZVBhdGggPSBub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYmFzZW5hbWUoZmlsZVBhdGgpO1xuICAgIGNvbnN0IGRpc2NvcmRCYXNlRGlyV2l0aFRyYWlsaW5nU2xhc2ggPSBub3JtYWxpemUoYXBwLmdldFBhdGgoXCJ1c2VyRGF0YVwiKSArIFwiL1wiKTtcbiAgICBjb25zb2xlLmxvZyhmaWxlbmFtZSwgZGlzY29yZEJhc2VEaXJXaXRoVHJhaWxpbmdTbGFzaCwgZmlsZVBhdGgpO1xuICAgIGlmIChmaWxlbmFtZSAhPT0gXCJyZWNvcmRpbmcub2dnXCIgfHwgIWZpbGVQYXRoLnN0YXJ0c1dpdGgoZGlzY29yZEJhc2VEaXJXaXRoVHJhaWxpbmdTbGFzaCkpIHJldHVybiBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnVmID0gYXdhaXQgcmVhZEZpbGUoZmlsZVBhdGgpO1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ1ZmZlcik7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBSZW5kZXJlclNldHRpbmdzIH0gZnJvbSBcIkBtYWluL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCBhZGd1YXJkIGZyb20gXCJmaWxlOi8vYWRndWFyZC5qcz9taW5pZnlcIjtcblxuYXBwLm9uKFwiYnJvd3Nlci13aW5kb3ctY3JlYXRlZFwiLCAoXywgd2luKSA9PiB7XG4gICAgd2luLndlYkNvbnRlbnRzLm9uKFwiZnJhbWUtY3JlYXRlZFwiLCAoXywgeyBmcmFtZSB9KSA9PiB7XG4gICAgICAgIGZyYW1lLm9uY2UoXCJkb20tcmVhZHlcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZyYW1lLnVybC5pbmNsdWRlcyhcImRpc2NvcmRzYXlzXCIpICYmIGZyYW1lLnVybC5pbmNsdWRlcyhcInlvdXR1YmUuY29tXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LldhdGNoVG9nZXRoZXJBZGJsb2NrPy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmcmFtZS5leGVjdXRlSmF2YVNjcmlwdChhZGd1YXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsICJleHBvcnQgZGVmYXVsdCBcIi8qIGVzbGludC1kaXNhYmxlICovXFxuXFxuLyoqXFxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWRHdWFyZCdzIEJsb2NrIFlvdVR1YmUgQWRzIChodHRwczovL2dpdGh1Yi5jb20vQWRndWFyZFRlYW0vQmxvY2tZb3VUdWJlQWRzU2hvcnRjdXQpLlxcbiAqXFxuICogQ29weXJpZ2h0IChDKSBBZEd1YXJkIFRlYW1cXG4gKlxcbiAqIEFkR3VhcmQncyBCbG9jayBZb3VUdWJlIEFkcyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XFxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcXG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXFxuICpcXG4gKiBBZEd1YXJkJ3MgQmxvY2sgWW91VHViZSBBZHMgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxcbiAqXFxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcXG4gKiBhbG9uZyB3aXRoIEFkR3VhcmQncyBCbG9jayBZb3VUdWJlIEFkcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cXG4gKi9cXG5cXG5jb25zdCBMT0dPX0lEID0gXFxcImJsb2NrLXlvdXR1YmUtYWRzLWxvZ29cXFwiO1xcbmNvbnN0IGhpZGRlbkNTUyA9IFtcXG4gICAgXFxcIiNfX2ZmWW91dHViZTFcXFwiLFxcbiAgICBcXFwiI19fZmZZb3V0dWJlMlxcXCIsXFxuICAgIFxcXCIjX19mZllvdXR1YmUzXFxcIixcXG4gICAgXFxcIiNfX2ZmWW91dHViZTRcXFwiLFxcbiAgICBcXFwiI2ZlZWQtcHl2LWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIjZmVlZG1vZHVsZS1QUk9cXFwiLFxcbiAgICBcXFwiI2hvbWVwYWdlLWNocm9tZS1zaWRlLXByb21vXFxcIixcXG4gICAgXFxcIiNtZXJjaC1zaGVsZlxcXCIsXFxuICAgIFxcXCIjb2ZmZXItbW9kdWxlXFxcIixcXG4gICAgJyNwbGEtc2hlbGYgPiB5dGQtcGxhLXNoZWxmLXJlbmRlcmVyW2NsYXNzPVxcXCJzdHlsZS1zY29wZSB5dGQtd2F0Y2hcXFwiXScsXFxuICAgIFxcXCIjcGxhLXNoZWxmXFxcIixcXG4gICAgXFxcIiNwcmVtaXVtLXl2YVxcXCIsXFxuICAgIFxcXCIjcHJvbW8taW5mb1xcXCIsXFxuICAgIFxcXCIjcHJvbW8tbGlzdFxcXCIsXFxuICAgIFxcXCIjcHJvbW90aW9uLXNoZWxmXFxcIixcXG4gICAgXFxcIiNyZWxhdGVkID4geXRkLXdhdGNoLW5leHQtc2Vjb25kYXJ5LXJlc3VsdHMtcmVuZGVyZXIgPiAjaXRlbXMgPiB5dGQtY29tcGFjdC1wcm9tb3RlZC12aWRlby1yZW5kZXJlci55dGQtd2F0Y2gtbmV4dC1zZWNvbmRhcnktcmVzdWx0cy1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIjc2VhcmNoLXB2YVxcXCIsXFxuICAgIFxcXCIjc2hlbGYtcHl2LWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIjdmlkZW8tbWFzdGhlYWRcXFwiLFxcbiAgICBcXFwiI3dhdGNoLWJyYW5kZWQtYWN0aW9uc1xcXCIsXFxuICAgIFxcXCIjd2F0Y2gtYnV5LXVybHNcXFwiLFxcbiAgICBcXFwiI3dhdGNoLWNoYW5uZWwtYnJhbmQtZGl2XFxcIixcXG4gICAgXFxcIiN3YXRjaDctYnJhbmRlZC1iYW5uZXJcXFwiLFxcbiAgICBcXFwiI1l0S2V2bGFyVmlzaWJpbGl0eUlkZW50aWZpZXJcXFwiLFxcbiAgICBcXFwiI1l0U3BhcmtsZXNWaXNpYmlsaXR5SWRlbnRpZmllclxcXCIsXFxuICAgIFxcXCIuY2Fyb3VzZWwtb2ZmZXItdXJsLWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIuY29tcGFuaW9uLWFkLWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIuR29vZ2xlQWN0aXZlVmlld0VsZW1lbnRcXFwiLFxcbiAgICAnLmxpc3Qtdmlld1tzdHlsZT1cXFwibWFyZ2luOiA3cHggMHB0O1xcXCJdJyxcXG4gICAgXFxcIi5wcm9tb3RlZC1zcGFya2xlcy10ZXh0LXNlYXJjaC1yb290LWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIucHJvbW90ZWQtdmlkZW9zXFxcIixcXG4gICAgXFxcIi5zZWFyY2hWaWV3Lmxpc3Qtdmlld1xcXCIsXFxuICAgIFxcXCIuc3BhcmtsZXMtbGlnaHQtY3RhXFxcIixcXG4gICAgXFxcIi53YXRjaC1leHRyYS1pbmZvLWNvbHVtblxcXCIsXFxuICAgIFxcXCIud2F0Y2gtZXh0cmEtaW5mby1yaWdodFxcXCIsXFxuICAgIFxcXCIueXRkLWNhcm91c2VsLWFkLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtY29tcGFjdC1wcm9tb3RlZC12aWRlby1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLWNvbXBhbmlvbi1zbG90LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtbWVyY2gtc2hlbGYtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1wbGF5ZXItbGVnYWN5LWRlc2t0b3Atd2F0Y2gtYWRzLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtcHJvbW90ZWQtc3BhcmtsZXMtdGV4dC1zZWFyY2gtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1wcm9tb3RlZC12aWRlby1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXNlYXJjaC1weXYtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC12aWRlby1tYXN0aGVhZC1hZC12My1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRwLWFkLWFjdGlvbi1pbnRlcnN0aXRpYWwtYmFja2dyb3VuZC1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1hY3Rpb24taW50ZXJzdGl0aWFsLXNsb3RcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1pbWFnZS1vdmVybGF5XFxcIixcXG4gICAgXFxcIi55dHAtYWQtb3ZlcmxheS1jb250YWluZXJcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1wcm9ncmVzc1xcXCIsXFxuICAgIFxcXCIueXRwLWFkLXByb2dyZXNzLWxpc3RcXFwiLFxcbiAgICAnW2NsYXNzKj1cXFwieXRkLWRpc3BsYXktYWQtXFxcIl0nLFxcbiAgICAnW2xheW91dCo9XFxcImRpc3BsYXktYWQtXFxcIl0nLFxcbiAgICAnYVtocmVmXj1cXFwiaHR0cDovL3d3dy55b3V0dWJlLmNvbS9jdGhydT9cXFwiXScsXFxuICAgICdhW2hyZWZePVxcXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9jdGhydT9cXFwiXScsXFxuICAgIFxcXCJ5dGQtYWN0aW9uLWNvbXBhbmlvbi1hZC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtYmFubmVyLXByb21vLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1jb21wYWN0LXByb21vdGVkLXZpZGVvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1jb21wYW5pb24tc2xvdC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtZGlzcGxheS1hZC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtcHJvbW90ZWQtc3BhcmtsZXMtdGV4dC1zZWFyY2gtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLXByb21vdGVkLXNwYXJrbGVzLXdlYi1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtc2VhcmNoLXB5di1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtc2luZ2xlLW9wdGlvbi1zdXJ2ZXktcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLXZpZGVvLW1hc3RoZWFkLWFkLWFkdmVydGlzZXItaW5mby1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtdmlkZW8tbWFzdGhlYWQtYWQtdjMtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiWVRNLVBST01PVEVELVZJREVPLVJFTkRFUkVSXFxcIixcXG5dO1xcbi8qKlxcbiogQWRkcyBDU1MgdG8gdGhlIHBhZ2VcXG4qL1xcbmNvbnN0IGhpZGVFbGVtZW50cyA9ICgpID0+IHtcXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gaGlkZGVuQ1NTO1xcbiAgICBpZiAoIXNlbGVjdG9ycykge1xcbiAgICAgICAgcmV0dXJuO1xcbiAgICB9XFxuICAgIGNvbnN0IHJ1bGUgPSBzZWxlY3RvcnMuam9pbihcXFwiLCBcXFwiKSArIFxcXCIgeyBkaXNwbGF5OiBub25lIWltcG9ydGFudDsgfVxcXCI7XFxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcXFwic3R5bGVcXFwiKTtcXG4gICAgc3R5bGUuaW5uZXJIVE1MID0gcnVsZTtcXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XFxufTtcXG4vKipcXG4qIENhbGxzIHRoZSBcXFwiY2FsbGJhY2tcXFwiIGZ1bmN0aW9uIG9uIGV2ZXJ5IERPTSBjaGFuZ2UsIGJ1dCBub3QgZm9yIHRoZSB0cmFja2VkIGV2ZW50c1xcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgZnVuY3Rpb25cXG4qL1xcbmNvbnN0IG9ic2VydmVEb21DaGFuZ2VzID0gY2FsbGJhY2sgPT4ge1xcbiAgICBjb25zdCBkb21NdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcXG4gICAgICAgIGNhbGxiYWNrKG11dGF0aW9ucyk7XFxuICAgIH0pO1xcbiAgICBkb21NdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XFxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxcbiAgICB9KTtcXG59O1xcbi8qKlxcbiogVGhpcyBmdW5jdGlvbiBpcyBzdXBwb3NlZCB0byBiZSBjYWxsZWQgb24gZXZlcnkgRE9NIGNoYW5nZVxcbiovXFxuY29uc3QgaGlkZUR5bmFtaWNBZHMgPSAoKSA9PiB7XFxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcXFwiI2NvbnRlbnRzID4geXRkLXJpY2gtaXRlbS1yZW5kZXJlciB5dGQtZGlzcGxheS1hZC1yZW5kZXJlclxcXCIpO1xcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XFxuICAgICAgICByZXR1cm47XFxuICAgIH1cXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XFxuICAgICAgICBpZiAoZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnBhcmVudE5vZGUpIHtcXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XFxuICAgICAgICAgICAgaWYgKHBhcmVudC5sb2NhbE5hbWUgPT09IFxcXCJ5dGQtcmljaC1pdGVtLXJlbmRlcmVyXFxcIikge1xcbiAgICAgICAgICAgICAgICBwYXJlbnQuc3R5bGUuZGlzcGxheSA9IFxcXCJub25lXFxcIjtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH0pO1xcbn07XFxuLyoqXFxuKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgdmlkZW8gYWRzIGFyZSBjdXJyZW50bHkgcnVubmluZ1xcbiogYW5kIGF1dG8tY2xpY2tzIHRoZSBza2lwIGJ1dHRvbi5cXG4qL1xcbmNvbnN0IGF1dG9Ta2lwQWRzID0gKCkgPT4ge1xcbiAgICAvLyBJZiB0aGVyZSdzIGEgdmlkZW8gdGhhdCBwbGF5cyB0aGUgYWQgYXQgdGhpcyBtb21lbnQsIHNjcm9sbCB0aGlzIGFkXFxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCIuYWQtc2hvd2luZ1xcXCIpKSB7XFxuICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcInZpZGVvXFxcIik7XFxuICAgICAgICBpZiAodmlkZW8gJiYgdmlkZW8uZHVyYXRpb24pIHtcXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IHZpZGVvLmR1cmF0aW9uO1xcbiAgICAgICAgICAgIC8vIFNraXAgYnV0dG9uIHNob3VsZCBhcHBlYXIgYWZ0ZXIgdGhhdCxcXG4gICAgICAgICAgICAvLyBub3cgc2ltcGx5IGNsaWNrIGl0IGF1dG9tYXRpY2FsbHlcXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcImJ1dHRvbi55dHAtYWQtc2tpcC1idXR0b25cXFwiKTtcXG4gICAgICAgICAgICAgICAgaWYgKHNraXBCdG4pIHtcXG4gICAgICAgICAgICAgICAgICAgIHNraXBCdG4uY2xpY2soKTtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH0sIDEwMCk7XFxuICAgICAgICB9XFxuICAgIH1cXG59O1xcbi8qKlxcbiogVGhpcyBmdW5jdGlvbiBvdmVycmlkZXMgYSBwcm9wZXJ0eSBvbiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cXG4qXFxuKiBAcGFyYW0ge29iamVjdH0gb2JqIG9iamVjdCB0byBsb29rIGZvciBwcm9wZXJ0aWVzIGluXFxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIHByb3BlcnR5IHRvIG92ZXJyaWRlXFxuKiBAcGFyYW0geyp9IG92ZXJyaWRlVmFsdWUgdmFsdWUgdG8gc2V0XFxuKi9cXG5jb25zdCBvdmVycmlkZU9iamVjdCA9IChvYmosIHByb3BlcnR5TmFtZSwgb3ZlcnJpZGVWYWx1ZSkgPT4ge1xcbiAgICBpZiAoIW9iaikge1xcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xcbiAgICB9XFxuICAgIGxldCBvdmVycmlkZW4gPSBmYWxzZTtcXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXFxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ID09PSBwcm9wZXJ0eU5hbWUpIHtcXG4gICAgICAgICAgICBvYmpba2V5XSA9IG92ZXJyaWRlVmFsdWU7XFxuICAgICAgICAgICAgb3ZlcnJpZGVuID0gdHJ1ZTtcXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXFxuICAgICAgICB9IGVsc2UgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHR5cGVvZiBvYmpba2V5XSA9PT0gXFxcIm9iamVjdFxcXCIpIHtcXG4gICAgICAgICAgICBpZiAob3ZlcnJpZGVPYmplY3Qob2JqW2tleV0sIHByb3BlcnR5TmFtZSwgb3ZlcnJpZGVWYWx1ZSkpIHtcXG4gICAgICAgICAgICAgICAgb3ZlcnJpZGVuID0gdHJ1ZTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG4gICAgcmV0dXJuIG92ZXJyaWRlbjtcXG59O1xcbi8qKlxcbiogT3ZlcnJpZGVzIEpTT04ucGFyc2UgYW5kIFJlc3BvbnNlLmpzb24gZnVuY3Rpb25zLlxcbiogRXhhbWluZXMgdGhlc2UgZnVuY3Rpb25zIGFyZ3VtZW50cywgbG9va3MgZm9yIHByb3BlcnRpZXMgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgdGhlcmVcXG4qIGFuZCBpZiBpdCBleGlzdHMsIGNoYW5nZXMgaXQncyB2YWx1ZSB0byB3aGF0IHdhcyBzcGVjaWZpZWQuXFxuKlxcbiogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxcbiogQHBhcmFtIHsqfSBvdmVycmlkZVZhbHVlIG5ldyB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5XFxuKi9cXG5jb25zdCBqc29uT3ZlcnJpZGUgPSAocHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKSA9PiB7XFxuICAgIGNvbnN0IG5hdGl2ZUpTT05QYXJzZSA9IEpTT04ucGFyc2U7XFxuICAgIEpTT04ucGFyc2UgPSAoLi4uYXJncykgPT4ge1xcbiAgICAgICAgY29uc3Qgb2JqID0gbmF0aXZlSlNPTlBhcnNlLmFwcGx5KHRoaXMsIGFyZ3MpO1xcbiAgICAgICAgLy8gT3ZlcnJpZGUgaXQncyBwcm9wcyBhbmQgcmV0dXJuIGJhY2sgdG8gdGhlIGNhbGxlclxcbiAgICAgICAgb3ZlcnJpZGVPYmplY3Qob2JqLCBwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpO1xcbiAgICAgICAgcmV0dXJuIG9iajtcXG4gICAgfTtcXG4gICAgLy8gT3ZlcnJpZGUgUmVzcG9uc2UucHJvdG90eXBlLmpzb25cXG4gICAgY29uc3QgbmF0aXZlUmVzcG9uc2VKc29uID0gUmVzcG9uc2UucHJvdG90eXBlLmpzb247XFxuICAgIFJlc3BvbnNlLnByb3RvdHlwZS5qc29uID0gbmV3IFByb3h5KG5hdGl2ZVJlc3BvbnNlSnNvbiwge1xcbiAgICAgICAgYXBwbHkoLi4uYXJncykge1xcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHRhcmdldCBmdW5jdGlvbiwgZ2V0IHRoZSBvcmlnaW5hbCBQcm9taXNlXFxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IFJlZmxlY3QuYXBwbHkoLi4uYXJncyk7XFxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IG9uZSBhbmQgb3ZlcnJpZGUgdGhlIEpTT04gaW5zaWRlXFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGRhdGEgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgb3ZlcnJpZGVPYmplY3QoZGF0YSwgcHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKTtcXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XFxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHJlamVjdChlcnJvcikpO1xcbiAgICAgICAgICAgIH0pO1xcbiAgICAgICAgfSxcXG4gICAgfSk7XFxufTtcXG5jb25zdCBhZGRBZEd1YXJkTG9nb1N0eWxlID0gKCkgPT4geyB9O1xcbmNvbnN0IGFkZEFkR3VhcmRMb2dvID0gKCkgPT4ge1xcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoTE9HT19JRCkpIHtcXG4gICAgICAgIHJldHVybjtcXG4gICAgfVxcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcXFwic3BhblxcXCIpO1xcbiAgICBsb2dvLmlubmVySFRNTCA9IFxcXCJfX2xvZ29fdGV4dF9fXFxcIjtcXG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoXFxcImlkXFxcIiwgTE9HT19JRCk7XFxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFxcXCJtLnlvdXR1YmUuY29tXFxcIikge1xcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwiaGVhZGVyLm1vYmlsZS10b3BiYXItaGVhZGVyID4gYnV0dG9uXFxcIik7XFxuICAgICAgICBpZiAoYnRuKSB7XFxuICAgICAgICAgICAgYnRuLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShsb2dvLCBidG4ubmV4dFNpYmxpbmcpO1xcbiAgICAgICAgICAgIGFkZEFkR3VhcmRMb2dvU3R5bGUoKTtcXG4gICAgICAgIH1cXG4gICAgfSBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFxcXCJ3d3cueW91dHViZS5jb21cXFwiKSB7XFxuICAgICAgICBjb25zdCBjb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXFxcImNvdW50cnktY29kZVxcXCIpO1xcbiAgICAgICAgaWYgKGNvZGUpIHtcXG4gICAgICAgICAgICBjb2RlLmlubmVySFRNTCA9IFxcXCJcXFwiO1xcbiAgICAgICAgICAgIGNvZGUuYXBwZW5kQ2hpbGQobG9nbyk7XFxuICAgICAgICAgICAgYWRkQWRHdWFyZExvZ29TdHlsZSgpO1xcbiAgICAgICAgfVxcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXFxcIm11c2ljLnlvdXR1YmUuY29tXFxcIikge1xcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCIueXRtdXNpYy1uYXYtYmFyI2xlZnQtY29udGVudFxcXCIpO1xcbiAgICAgICAgaWYgKGVsKSB7XFxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQobG9nbyk7XFxuICAgICAgICAgICAgYWRkQWRHdWFyZExvZ29TdHlsZSgpO1xcbiAgICAgICAgfVxcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXFxcInd3dy55b3V0dWJlLW5vY29va2llLmNvbVxcXCIpIHtcXG4gICAgICAgIGNvbnN0IGNvZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCIjeXQtbWFzdGhlYWQgI2xvZ28tY29udGFpbmVyIC5jb250ZW50LXJlZ2lvblxcXCIpO1xcbiAgICAgICAgaWYgKGNvZGUpIHtcXG4gICAgICAgICAgICBjb2RlLmlubmVySFRNTCA9IFxcXCJcXFwiO1xcbiAgICAgICAgICAgIGNvZGUuYXBwZW5kQ2hpbGQobG9nbyk7XFxuICAgICAgICAgICAgYWRkQWRHdWFyZExvZ29TdHlsZSgpO1xcbiAgICAgICAgfVxcbiAgICB9XFxufTtcXG4vLyBSZW1vdmVzIGFkcyBtZXRhZGF0YSBmcm9tIFlvdVR1YmUgWEhSIHJlcXVlc3RzXFxuanNvbk92ZXJyaWRlKFxcXCJhZFBsYWNlbWVudHNcXFwiLCBbXSk7XFxuanNvbk92ZXJyaWRlKFxcXCJwbGF5ZXJBZHNcXFwiLCBbXSk7XFxuLy8gQXBwbGllcyBDU1MgdGhhdCBoaWRlcyBZb3VUdWJlIGFkIGVsZW1lbnRzXFxuaGlkZUVsZW1lbnRzKCk7XFxuLy8gU29tZSBjaGFuZ2VzIHNob3VsZCBiZSByZS1ldmFsdWF0ZWQgb24gZXZlcnkgcGFnZSBjaGFuZ2VcXG5hZGRBZEd1YXJkTG9nbygpO1xcbmhpZGVEeW5hbWljQWRzKCk7XFxuYXV0b1NraXBBZHMoKTtcXG5vYnNlcnZlRG9tQ2hhbmdlcygoKSA9PiB7XFxuICAgIGFkZEFkR3VhcmRMb2dvKCk7XFxuICAgIGhpZGVEeW5hbWljQWRzKCk7XFxuICAgIGF1dG9Ta2lwQWRzKCk7XFxufSk7XCIiLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlU29ja2V0LCBTb2NrZXQgfSBmcm9tIFwiZGdyYW1cIjtcblxubGV0IHhzb1NvY2tldDogU29ja2V0O1xuXG5leHBvcnQgZnVuY3Rpb24gc2VuZFRvT3ZlcmxheShfLCBkYXRhOiBhbnkpIHtcbiAgICBkYXRhLmljb24gPSBCdWZmZXIuZnJvbShkYXRhLmljb24pLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB4c29Tb2NrZXQgPz89IGNyZWF0ZVNvY2tldChcInVkcDRcIik7XG4gICAgeHNvU29ja2V0LnNlbmQoanNvbiwgNDIwNjksIFwiMTI3LjAuMC4xXCIpO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0IHdpbGwgY2FsbCB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICogYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBhZ2FpblxuICogd2l0aGluIHRoZSBkZWxheSwgdGhlIHRpbWVyIHdpbGwgYmUgcmVzZXQuXG4gKiBAcGFyYW0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcFxuICogQHBhcmFtIGRlbGF5IFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlPFQgZXh0ZW5kcyBGdW5jdGlvbj4oZnVuYzogVCwgZGVsYXkgPSAzMDApOiBUIHtcbiAgICBsZXQgdGltZW91dDogTm9kZUpTLlRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHsgZnVuYyguLi5hcmdzKTsgfSwgZGVsYXkpO1xuICAgIH0gYXMgYW55O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IFwiUENGRVQwTlVXVkJGSUdoMGJXdytDanhvZEcxc0lHeGhibWM5SW1WdUlqNEtDanhvWldGa1Bnb2dJQ0FnUEcxbGRHRWdZMmhoY25ObGREMGlkWFJtTFRnaUlDOCtDaUFnSUNBOGRHbDBiR1UrVW1sMlpYSmpiM0prSUZGMWFXTnJRMU5USUVWa2FYUnZjand2ZEdsMGJHVStDaUFnSUNBOGJHbHVheUJ5Wld3OUluTjBlV3hsYzJobFpYUWlJR2h5WldZOUltaDBkSEJ6T2k4dlkyUnVMbXB6WkdWc2FYWnlMbTVsZEM5dWNHMHZiVzl1WVdOdkxXVmthWFJ2Y2tBd0xqVXdMakF2YldsdUwzWnpMMlZrYVhSdmNpOWxaR2wwYjNJdWJXRnBiaTVqYzNNaUNpQWdJQ0FnSUNBZ2FXNTBaV2R5YVhSNVBTSnphR0V5TlRZdGRHbEtVRkV5VHpBMGVpOXdXaTlCZDJSNVNXZG9jazlOZW1WM1ppdFFTWFpGYkRGWlMySlJkbk5hYXowaUlHTnliM056YjNKcFoybHVQU0poYm05dWVXMXZkWE1pQ2lBZ0lDQWdJQ0FnY21WbVpYSnlaWEp3YjJ4cFkzazlJbTV2TFhKbFptVnljbVZ5SWlBdlBnb2dJQ0FnUEhOMGVXeGxQZ29nSUNBZ0lDQWdJR2gwYld3c0NpQWdJQ0FnSUNBZ1ltOWtlU3dLSUNBZ0lDQWdJQ0FqWTI5dWRHRnBibVZ5SUhzS0lDQWdJQ0FnSUNBZ0lDQWdjRzl6YVhScGIyNDZJR0ZpYzI5c2RYUmxPd29nSUNBZ0lDQWdJQ0FnSUNCc1pXWjBPaUF3T3dvZ0lDQWdJQ0FnSUNBZ0lDQjBiM0E2SURBN0NpQWdJQ0FnSUNBZ0lDQWdJSGRwWkhSb09pQXhNREFsT3dvZ0lDQWdJQ0FnSUNBZ0lDQm9aV2xuYUhRNklERXdNQ1U3Q2lBZ0lDQWdJQ0FnSUNBZ0lHMWhjbWRwYmpvZ01Ec0tJQ0FnSUNBZ0lDQWdJQ0FnY0dGa1pHbHVaem9nTURzS0lDQWdJQ0FnSUNBZ0lDQWdiM1psY21ac2IzYzZJR2hwWkdSbGJqc0tJQ0FnSUNBZ0lDQjlDaUFnSUNBOEwzTjBlV3hsUGdvOEwyaGxZV1ErQ2dvOFltOWtlVDRLSUNBZ0lEeGthWFlnYVdROUltTnZiblJoYVc1bGNpSStQQzlrYVhZK0NpQWdJQ0E4YzJOeWFYQjBJSE55WXowaWFIUjBjSE02THk5alpHNHVhbk5rWld4cGRuSXVibVYwTDI1d2JTOXRiMjVoWTI4dFpXUnBkRzl5UURBdU5UQXVNQzl0YVc0dmRuTXZiRzloWkdWeUxtcHpJZ29nSUNBZ0lDQWdJR2x1ZEdWbmNtbDBlVDBpYzJoaE1qVTJMVXRqVlRRNFZFZHlPRFJ5TjNWdVJqZEtOVWxuUW04NU5XRmxWbkpGWW5KSFpUQTBVemRVWTBaVmFuTTlJaUJqY205emMyOXlhV2RwYmowaVlXNXZibmx0YjNWeklnb2dJQ0FnSUNBZ0lISmxabVZ5Y21WeWNHOXNhV041UFNKdWJ5MXlaV1psY25KbGNpSStQQzl6WTNKcGNIUStDZ29nSUNBZ1BITmpjbWx3ZEQ0S0lDQWdJQ0FnSUNCeVpYRjFhWEpsTG1OdmJtWnBaeWg3Q2lBZ0lDQWdJQ0FnSUNBZ0lIQmhkR2h6T2lCN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMmN6b2dJbWgwZEhCek9pOHZZMlJ1TG1welpHVnNhWFp5TG01bGRDOXVjRzB2Ylc5dVlXTnZMV1ZrYVhSdmNrQXdMalV3TGpBdmJXbHVMM1p6SWl3S0lDQWdJQ0FnSUNBZ0lDQWdmU3dLSUNBZ0lDQWdJQ0I5S1RzS0NpQWdJQ0FnSUNBZ2NtVnhkV2x5WlNoYkluWnpMMlZrYVhSdmNpOWxaR2wwYjNJdWJXRnBiaUpkTENBb0tTQTlQaUI3Q2lBZ0lDQWdJQ0FnSUNBZ0lHZGxkRU4xY25KbGJuUkRjM01vS1M1MGFHVnVLQ2hqYzNNcElEMCtJSHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCbFpHbDBiM0lnUFNCdGIyNWhZMjh1WldScGRHOXlMbU55WldGMFpTZ0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ2lZMjl1ZEdGcGJtVnlJaWtzQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2V3b2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllXeDFaVG9nWTNOekxBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1lXNW5kV0ZuWlRvZ0ltTnpjeUlzQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvWlcxbE9pQm5aWFJVYUdWdFpTZ3BMQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNrN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbFpHbDBiM0l1YjI1RWFXUkRhR0Z1WjJWTmIyUmxiRU52Ym5SbGJuUW9LQ2tnUFQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaWFJEYzNNb1pXUnBkRzl5TG1kbGRGWmhiSFZsS0NrcENpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBcE93b2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSW5KbGMybDZaU0lzSUNncElEMCtJSHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QnRZV3RsSUcxdmJtRmpieUJ5WlMxc1lYbHZkWFFLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbFpHbDBiM0l1YkdGNWIzVjBLQ2s3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1RzS0lDQWdJQ0FnSUNBZ0lDQWdmU2s3Q2lBZ0lDQWdJQ0FnZlNrN0NpQWdJQ0E4TDNOamNtbHdkRDRLUEM5aWIyUjVQZ29LUEM5b2RHMXNQZ289XCIiLCAiLyogZXNsaW50LWRpc2FibGUgc2ltcGxlLWhlYWRlci9oZWFkZXIgKi9cblxuLyohXG4gKiBCZXR0ZXJEaXNjb3JkIGFkZG9uIG1ldGEgcGFyc2VyXG4gKiBDb3B5cmlnaHQgMjAyMyBCZXR0ZXJEaXNjb3JkIGNvbnRyaWJ1dG9yc1xuICogQ29weXJpZ2h0IDIwMjMgVmVuZGljYXRlZCBhbmQgUml2ZXJjb3JkIGNvbnRyaWJ1dG9yc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3Qgc3BsaXRSZWdleCA9IC9bXlxcU1xcclxcbl0qP1xccj8oPzpcXHJcXG58XFxuKVteXFxTXFxyXFxuXSo/XFwqW15cXFNcXHJcXG5dPy87XG5jb25zdCBlc2NhcGVkQXRSZWdleCA9IC9eXFxcXEAvO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJUaGVtZUhlYWRlciB7XG4gICAgZmlsZU5hbWU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYXV0aG9yOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICB2ZXJzaW9uPzogc3RyaW5nO1xuICAgIGxpY2Vuc2U/OiBzdHJpbmc7XG4gICAgc291cmNlPzogc3RyaW5nO1xuICAgIHdlYnNpdGU/OiBzdHJpbmc7XG4gICAgaW52aXRlPzogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBtYWtlSGVhZGVyKGZpbGVOYW1lOiBzdHJpbmcsIG9wdHM6IFBhcnRpYWw8VXNlclRoZW1lSGVhZGVyPiA9IHt9KTogVXNlclRoZW1lSGVhZGVyIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgbmFtZTogb3B0cy5uYW1lID8/IGZpbGVOYW1lLnJlcGxhY2UoL1xcLmNzcyQvaSwgXCJcIiksXG4gICAgICAgIGF1dGhvcjogb3B0cy5hdXRob3IgPz8gXCJVbmtub3duIEF1dGhvclwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogb3B0cy5kZXNjcmlwdGlvbiA/PyBcIkEgRGlzY29yZCBUaGVtZS5cIixcbiAgICAgICAgdmVyc2lvbjogb3B0cy52ZXJzaW9uLFxuICAgICAgICBsaWNlbnNlOiBvcHRzLmxpY2Vuc2UsXG4gICAgICAgIHNvdXJjZTogb3B0cy5zb3VyY2UsXG4gICAgICAgIHdlYnNpdGU6IG9wdHMud2Vic2l0ZSxcbiAgICAgICAgaW52aXRlOiBvcHRzLmludml0ZVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcEJPTShmaWxlQ29udGVudDogc3RyaW5nKSB7XG4gICAgaWYgKGZpbGVDb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgICAgICBmaWxlQ29udGVudCA9IGZpbGVDb250ZW50LnNsaWNlKDEpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZUNvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaGVtZUluZm8oY3NzOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcpOiBVc2VyVGhlbWVIZWFkZXIge1xuICAgIGlmICghY3NzKSByZXR1cm4gbWFrZUhlYWRlcihmaWxlTmFtZSk7XG5cbiAgICBjb25zdCBibG9jayA9IGNzcy5zcGxpdChcIi8qKlwiLCAyKT8uWzFdPy5zcGxpdChcIiovXCIsIDEpPy5bMF07XG4gICAgaWYgKCFibG9jaykgcmV0dXJuIG1ha2VIZWFkZXIoZmlsZU5hbWUpO1xuXG4gICAgY29uc3QgaGVhZGVyOiBQYXJ0aWFsPFVzZXJUaGVtZUhlYWRlcj4gPSB7fTtcbiAgICBsZXQgZmllbGQgPSBcIlwiO1xuICAgIGxldCBhY2N1bSA9IFwiXCI7XG4gICAgZm9yIChjb25zdCBsaW5lIG9mIGJsb2NrLnNwbGl0KHNwbGl0UmVnZXgpKSB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG4gICAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gXCJAXCIgJiYgbGluZS5jaGFyQXQoMSkgIT09IFwiIFwiKSB7XG4gICAgICAgICAgICBoZWFkZXJbZmllbGRdID0gYWNjdW0udHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgbCA9IGxpbmUuaW5kZXhPZihcIiBcIik7XG4gICAgICAgICAgICBmaWVsZCA9IGxpbmUuc3Vic3RyaW5nKDEsIGwpO1xuICAgICAgICAgICAgYWNjdW0gPSBsaW5lLnN1YnN0cmluZyhsICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY2N1bSArPSBcIiBcIiArIGxpbmUucmVwbGFjZShcIlxcXFxuXCIsIFwiXFxuXCIpLnJlcGxhY2UoZXNjYXBlZEF0UmVnZXgsIFwiQFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoZWFkZXJbZmllbGRdID0gYWNjdW0udHJpbSgpO1xuICAgIGRlbGV0ZSBoZWFkZXJbXCJcIl07XG4gICAgcmV0dXJuIG1ha2VIZWFkZXIoZmlsZU5hbWUsIGhlYWRlcik7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgdHlwZSBCcm93c2VyV2luZG93LCBzaGVsbCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUxpbmtzT3BlbkV4dGVybmFsbHkod2luOiBCcm93c2VyV2luZG93KSB7XG4gICAgd2luLndlYkNvbnRlbnRzLnNldFdpbmRvd09wZW5IYW5kbGVyKCh7IHVybCB9KSA9PiB7XG4gICAgICAgIHN3aXRjaCAodXJsKSB7XG4gICAgICAgICAgICBjYXNlIFwiYWJvdXQ6YmxhbmtcIjpcbiAgICAgICAgICAgIGNhc2UgXCJodHRwczovL2Rpc2NvcmQuY29tL3BvcG91dFwiOlxuICAgICAgICAgICAgY2FzZSBcImh0dHBzOi8vcHRiLmRpc2NvcmQuY29tL3BvcG91dFwiOlxuICAgICAgICAgICAgY2FzZSBcImh0dHBzOi8vY2FuYXJ5LmRpc2NvcmQuY29tL3BvcG91dFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7IGFjdGlvbjogXCJhbGxvd1wiIH07XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHsgcHJvdG9jb2wgfSA9IG5ldyBVUkwodXJsKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4geyBhY3Rpb246IFwiZGVueVwiIH07XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHByb3RvY29sKSB7XG4gICAgICAgICAgICBjYXNlIFwiaHR0cDpcIjpcbiAgICAgICAgICAgIGNhc2UgXCJodHRwczpcIjpcbiAgICAgICAgICAgIGNhc2UgXCJtYWlsdG86XCI6XG4gICAgICAgICAgICBjYXNlIFwic3RlYW06XCI6XG4gICAgICAgICAgICBjYXNlIFwic3BvdGlmeTpcIjpcbiAgICAgICAgICAgICAgICBzaGVsbC5vcGVuRXh0ZXJuYWwodXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGFjdGlvbjogXCJkZW55XCIgfTtcbiAgICB9KTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBzZXNzaW9uIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyB1bnppcCB9IGZyb20gXCJmZmxhdGVcIjtcbmltcG9ydCB7IGNvbnN0YW50cyBhcyBmc0NvbnN0YW50cyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgYWNjZXNzLCBta2Rpciwgcm0sIHdyaXRlRmlsZSB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IERBVEFfRElSIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjcnhUb1ppcCB9IGZyb20gXCIuL2NyeFRvWmlwXCI7XG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwiLi9zaW1wbGVHZXRcIjtcblxuY29uc3QgZXh0ZW5zaW9uQ2FjaGVEaXIgPSBqb2luKERBVEFfRElSLCBcIkV4dGVuc2lvbkNhY2hlXCIpO1xuXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0KGRhdGE6IEJ1ZmZlciwgb3V0RGlyOiBzdHJpbmcpIHtcbiAgICBhd2FpdCBta2RpcihvdXREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHVuemlwKGRhdGEsIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gdm9pZCByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKGZpbGVzKS5tYXAoYXN5bmMgZiA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2lnbmF0dXJlIHN0dWZmXG4gICAgICAgICAgICAgICAgLy8gJ0Nhbm5vdCBsb2FkIGV4dGVuc2lvbiB3aXRoIGZpbGUgb3IgZGlyZWN0b3J5IG5hbWVcbiAgICAgICAgICAgICAgICAvLyBfbWV0YWRhdGEuIEZpbGVuYW1lcyBzdGFydGluZyB3aXRoIFwiX1wiIGFyZSByZXNlcnZlZCBmb3IgdXNlIGJ5IHRoZSBzeXN0ZW0uJztcbiAgICAgICAgICAgICAgICBpZiAoZi5zdGFydHNXaXRoKFwiX21ldGFkYXRhL1wiKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgaWYgKGYuZW5kc1dpdGgoXCIvXCIpKSByZXR1cm4gdm9pZCBta2Rpcihqb2luKG91dERpciwgZiksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aEVsZW1lbnRzID0gZi5zcGxpdChcIi9cIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBhdGhFbGVtZW50cy5wb3AoKSE7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0b3JpZXMgPSBwYXRoRWxlbWVudHMuam9pbihcIi9cIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlyID0gam9pbihvdXREaXIsIGRpcmVjdG9yaWVzKTtcblxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBta2RpcihkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGF3YWl0IHdyaXRlRmlsZShqb2luKGRpciwgbmFtZSksIGZpbGVzW2ZdKTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm0ob3V0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc3RhbGxFeHQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGV4dERpciA9IGpvaW4oZXh0ZW5zaW9uQ2FjaGVEaXIsIGAke2lkfWApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWNjZXNzKGV4dERpciwgZnNDb25zdGFudHMuRl9PSyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGlkID09PSBcImZta2FkbWFwZ29mYWRvcGxqYmpma2FwZGtvaWVuaWhpXCJcbiAgICAgICAgICAgIC8vIFJlYWN0IERldnRvb2xzIHY0LjI1XG4gICAgICAgICAgICAvLyB2NC4yNyBpcyBicm9rZW4gaW4gRWxlY3Ryb24sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzI1ODQzXG4gICAgICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5LCBHb29nbGUgZG9lcyBub3Qgc2VydmUgb2xkIHZlcnNpb25zLCBzbyB0aGlzIGlzIHRoZSBvbmx5IHdheVxuICAgICAgICAgICAgPyBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9WZW5kaWNhdGVkL3JhbmRvbS1maWxlcy9mNmY1NTBlNGM1OGFjNWYyMDEyMDk1YTEzMDQwNmMyYWIyNWI5ODRkL2Zta2FkbWFwZ29mYWRvcGxqYmpma2FwZGtvaWVuaWhpLnppcFwiXG4gICAgICAgICAgICA6IGBodHRwczovL2NsaWVudHMyLmdvb2dsZS5jb20vc2VydmljZS91cGRhdGUyL2NyeD9yZXNwb25zZT1yZWRpcmVjdCZhY2NlcHRmb3JtYXQ9Y3J4MixjcngzJng9aWQlM0Qke2lkfSUyNnVjJnByb2R2ZXJzaW9uPTMyYDtcbiAgICAgICAgY29uc3QgYnVmID0gYXdhaXQgZ2V0KHVybCwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiVXNlci1BZ2VudFwiOiBcIlJpdmVyY29yZCAoaHR0cHM6Ly9naXRodWIuY29tL1JpdmVyY29yZC9SaXZlcmNvcmQpXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IGV4dHJhY3QoY3J4VG9aaXAoYnVmKSwgZXh0RGlyKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9XG5cbiAgICBzZXNzaW9uLmRlZmF1bHRTZXNzaW9uLmxvYWRFeHRlbnNpb24oZXh0RGlyKTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbW9kdWxlJztcbnZhciByZXF1aXJlID0gY3JlYXRlUmVxdWlyZSgnLycpO1xuLy8gREVGTEFURSBpcyBhIGNvbXBsZXggZm9ybWF0OyB0byByZWFkIHRoaXMgY29kZSwgeW91IHNob3VsZCBwcm9iYWJseSBjaGVjayB0aGUgUkZDIGZpcnN0OlxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzE5NTFcbi8vIFlvdSBtYXkgYWxzbyB3aXNoIHRvIHRha2UgYSBsb29rIGF0IHRoZSBndWlkZSBJIG1hZGUgYWJvdXQgdGhpcyBwcm9ncmFtOlxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vMTAxYXJyb3d6LzI1M2YzMWViNWFiYzNkOTI3NWFiOTQzMDAzZmZlY2FkXG4vLyBTb21lIG9mIHRoZSBmb2xsb3dpbmcgY29kZSBpcyBzaW1pbGFyIHRvIHRoYXQgb2YgVVpJUC5qczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG90b3BlYS9VWklQLmpzXG4vLyBIb3dldmVyLCB0aGUgdmFzdCBtYWpvcml0eSBvZiB0aGUgY29kZWJhc2UgaGFzIGRpdmVyZ2VkIGZyb20gVVpJUC5qcyB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZSBhbmQgcmVkdWNlIGJ1bmRsZSBzaXplLlxuLy8gU29tZXRpbWVzIDAgd2lsbCBhcHBlYXIgd2hlcmUgLTEgd291bGQgYmUgbW9yZSBhcHByb3ByaWF0ZS4gVGhpcyBpcyBiZWNhdXNlIHVzaW5nIGEgdWludFxuLy8gaXMgYmV0dGVyIGZvciBtZW1vcnkgaW4gbW9zdCBlbmdpbmVzIChJICp0aGluayopLlxuLy8gTWVkaW9jcmUgc2hpbVxudmFyIFdvcmtlcjtcbnZhciB3b3JrZXJBZGQgPSBcIjt2YXIgX193PXJlcXVpcmUoJ3dvcmtlcl90aHJlYWRzJyk7X193LnBhcmVudFBvcnQub24oJ21lc3NhZ2UnLGZ1bmN0aW9uKG0pe29ubWVzc2FnZSh7ZGF0YTptfSl9KSxwb3N0TWVzc2FnZT1mdW5jdGlvbihtLHQpe19fdy5wYXJlbnRQb3J0LnBvc3RNZXNzYWdlKG0sdCl9LGNsb3NlPXByb2Nlc3MuZXhpdDtzZWxmPWdsb2JhbFwiO1xudHJ5IHtcbiAgICBXb3JrZXIgPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpLldvcmtlcjtcbn1cbmNhdGNoIChlKSB7XG59XG52YXIgd2sgPSBXb3JrZXIgPyBmdW5jdGlvbiAoYywgXywgbXNnLCB0cmFuc2ZlciwgY2IpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHZhciB3ID0gbmV3IFdvcmtlcihjICsgd29ya2VyQWRkLCB7IGV2YWw6IHRydWUgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBjYihlLCBudWxsKTsgfSlcbiAgICAgICAgLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKG0pIHsgcmV0dXJuIGNiKG51bGwsIG0pOyB9KVxuICAgICAgICAub24oJ2V4aXQnLCBmdW5jdGlvbiAoYykge1xuICAgICAgICBpZiAoYyAmJiAhZG9uZSlcbiAgICAgICAgICAgIGNiKG5ldyBFcnJvcignZXhpdGVkIHdpdGggY29kZSAnICsgYyksIG51bGwpO1xuICAgIH0pO1xuICAgIHcucG9zdE1lc3NhZ2UobXNnLCB0cmFuc2Zlcik7XG4gICAgdy50ZXJtaW5hdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gV29ya2VyLnByb3RvdHlwZS50ZXJtaW5hdGUuY2FsbCh3KTtcbiAgICB9O1xuICAgIHJldHVybiB3O1xufSA6IGZ1bmN0aW9uIChfLCBfXywgX19fLCBfX19fLCBjYikge1xuICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiBjYihuZXcgRXJyb3IoJ2FzeW5jIG9wZXJhdGlvbnMgdW5zdXBwb3J0ZWQgLSB1cGRhdGUgdG8gTm9kZSAxMisgKG9yIE5vZGUgMTAtMTEgd2l0aCB0aGUgLS1leHBlcmltZW50YWwtd29ya2VyIENMSSBmbGFnKScpLCBudWxsKTsgfSk7XG4gICAgdmFyIE5PUCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0ZXJtaW5hdGU6IE5PUCxcbiAgICAgICAgcG9zdE1lc3NhZ2U6IE5PUFxuICAgIH07XG59O1xuXG4vLyBhbGlhc2VzIGZvciBzaG9ydGVyIGNvbXByZXNzZWQgY29kZSAobW9zdCBtaW5pZmVycyBkb24ndCBkbyB0aGlzKVxudmFyIHU4ID0gVWludDhBcnJheSwgdTE2ID0gVWludDE2QXJyYXksIHUzMiA9IFVpbnQzMkFycmF5O1xuLy8gZml4ZWQgbGVuZ3RoIGV4dHJhIGJpdHNcbnZhciBmbGViID0gbmV3IHU4KFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzLCA0LCA0LCA0LCA0LCA1LCA1LCA1LCA1LCAwLCAvKiB1bnVzZWQgKi8gMCwgMCwgLyogaW1wb3NzaWJsZSAqLyAwXSk7XG4vLyBmaXhlZCBkaXN0YW5jZSBleHRyYSBiaXRzXG4vLyBzZWUgZmxlYiBub3RlXG52YXIgZmRlYiA9IG5ldyB1OChbMCwgMCwgMCwgMCwgMSwgMSwgMiwgMiwgMywgMywgNCwgNCwgNSwgNSwgNiwgNiwgNywgNywgOCwgOCwgOSwgOSwgMTAsIDEwLCAxMSwgMTEsIDEyLCAxMiwgMTMsIDEzLCAvKiB1bnVzZWQgKi8gMCwgMF0pO1xuLy8gY29kZSBsZW5ndGggaW5kZXggbWFwXG52YXIgY2xpbSA9IG5ldyB1OChbMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNV0pO1xuLy8gZ2V0IGJhc2UsIHJldmVyc2UgaW5kZXggbWFwIGZyb20gZXh0cmEgYml0c1xudmFyIGZyZWIgPSBmdW5jdGlvbiAoZWIsIHN0YXJ0KSB7XG4gICAgdmFyIGIgPSBuZXcgdTE2KDMxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMxOyArK2kpIHtcbiAgICAgICAgYltpXSA9IHN0YXJ0ICs9IDEgPDwgZWJbaSAtIDFdO1xuICAgIH1cbiAgICAvLyBudW1iZXJzIGhlcmUgYXJlIGF0IG1heCAxOCBiaXRzXG4gICAgdmFyIHIgPSBuZXcgdTMyKGJbMzBdKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDMwOyArK2kpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IGJbaV07IGogPCBiW2kgKyAxXTsgKytqKSB7XG4gICAgICAgICAgICByW2pdID0gKChqIC0gYltpXSkgPDwgNSkgfCBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbYiwgcl07XG59O1xudmFyIF9hID0gZnJlYihmbGViLCAyKSwgZmwgPSBfYVswXSwgcmV2ZmwgPSBfYVsxXTtcbi8vIHdlIGNhbiBpZ25vcmUgdGhlIGZhY3QgdGhhdCB0aGUgb3RoZXIgbnVtYmVycyBhcmUgd3Jvbmc7IHRoZXkgbmV2ZXIgaGFwcGVuIGFueXdheVxuZmxbMjhdID0gMjU4LCByZXZmbFsyNThdID0gMjg7XG52YXIgX2IgPSBmcmViKGZkZWIsIDApLCBmZCA9IF9iWzBdLCByZXZmZCA9IF9iWzFdO1xuLy8gbWFwIG9mIHZhbHVlIHRvIHJldmVyc2UgKGFzc3VtaW5nIDE2IGJpdHMpXG52YXIgcmV2ID0gbmV3IHUxNigzMjc2OCk7XG5mb3IgKHZhciBpID0gMDsgaSA8IDMyNzY4OyArK2kpIHtcbiAgICAvLyByZXZlcnNlIHRhYmxlIGFsZ29yaXRobSBmcm9tIFNPXG4gICAgdmFyIHggPSAoKGkgJiAweEFBQUEpID4+PiAxKSB8ICgoaSAmIDB4NTU1NSkgPDwgMSk7XG4gICAgeCA9ICgoeCAmIDB4Q0NDQykgPj4+IDIpIHwgKCh4ICYgMHgzMzMzKSA8PCAyKTtcbiAgICB4ID0gKCh4ICYgMHhGMEYwKSA+Pj4gNCkgfCAoKHggJiAweDBGMEYpIDw8IDQpO1xuICAgIHJldltpXSA9ICgoKHggJiAweEZGMDApID4+PiA4KSB8ICgoeCAmIDB4MDBGRikgPDwgOCkpID4+PiAxO1xufVxuLy8gY3JlYXRlIGh1ZmZtYW4gdHJlZSBmcm9tIHU4IFwibWFwXCI6IGluZGV4IC0+IGNvZGUgbGVuZ3RoIGZvciBjb2RlIGluZGV4XG4vLyBtYiAobWF4IGJpdHMpIG11c3QgYmUgYXQgbW9zdCAxNVxuLy8gVE9ETzogb3B0aW1pemUvc3BsaXQgdXA/XG52YXIgaE1hcCA9IChmdW5jdGlvbiAoY2QsIG1iLCByKSB7XG4gICAgdmFyIHMgPSBjZC5sZW5ndGg7XG4gICAgLy8gaW5kZXhcbiAgICB2YXIgaSA9IDA7XG4gICAgLy8gdTE2IFwibWFwXCI6IGluZGV4IC0+ICMgb2YgY29kZXMgd2l0aCBiaXQgbGVuZ3RoID0gaW5kZXhcbiAgICB2YXIgbCA9IG5ldyB1MTYobWIpO1xuICAgIC8vIGxlbmd0aCBvZiBjZCBtdXN0IGJlIDI4OCAodG90YWwgIyBvZiBjb2RlcylcbiAgICBmb3IgKDsgaSA8IHM7ICsraSkge1xuICAgICAgICBpZiAoY2RbaV0pXG4gICAgICAgICAgICArK2xbY2RbaV0gLSAxXTtcbiAgICB9XG4gICAgLy8gdTE2IFwibWFwXCI6IGluZGV4IC0+IG1pbmltdW0gY29kZSBmb3IgYml0IGxlbmd0aCA9IGluZGV4XG4gICAgdmFyIGxlID0gbmV3IHUxNihtYik7XG4gICAgZm9yIChpID0gMDsgaSA8IG1iOyArK2kpIHtcbiAgICAgICAgbGVbaV0gPSAobGVbaSAtIDFdICsgbFtpIC0gMV0pIDw8IDE7XG4gICAgfVxuICAgIHZhciBjbztcbiAgICBpZiAocikge1xuICAgICAgICAvLyB1MTYgXCJtYXBcIjogaW5kZXggLT4gbnVtYmVyIG9mIGFjdHVhbCBiaXRzLCBzeW1ib2wgZm9yIGNvZGVcbiAgICAgICAgY28gPSBuZXcgdTE2KDEgPDwgbWIpO1xuICAgICAgICAvLyBiaXRzIHRvIHJlbW92ZSBmb3IgcmV2ZXJzZXJcbiAgICAgICAgdmFyIHJ2YiA9IDE1IC0gbWI7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSAwIGxlbmd0aHNcbiAgICAgICAgICAgIGlmIChjZFtpXSkge1xuICAgICAgICAgICAgICAgIC8vIG51bSBlbmNvZGluZyBib3RoIHN5bWJvbCBhbmQgYml0cyByZWFkXG4gICAgICAgICAgICAgICAgdmFyIHN2ID0gKGkgPDwgNCkgfCBjZFtpXTtcbiAgICAgICAgICAgICAgICAvLyBmcmVlIGJpdHNcbiAgICAgICAgICAgICAgICB2YXIgcl8xID0gbWIgLSBjZFtpXTtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciB2ID0gbGVbY2RbaV0gLSAxXSsrIDw8IHJfMTtcbiAgICAgICAgICAgICAgICAvLyBtIGlzIGVuZCB2YWx1ZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIG0gPSB2IHwgKCgxIDw8IHJfMSkgLSAxKTsgdiA8PSBtOyArK3YpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlcnkgMTYgYml0IHZhbHVlIHN0YXJ0aW5nIHdpdGggdGhlIGNvZGUgeWllbGRzIHRoZSBzYW1lIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICBjb1tyZXZbdl0gPj4+IHJ2Yl0gPSBzdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvID0gbmV3IHUxNihzKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHM7ICsraSkge1xuICAgICAgICAgICAgaWYgKGNkW2ldKSB7XG4gICAgICAgICAgICAgICAgY29baV0gPSByZXZbbGVbY2RbaV0gLSAxXSsrXSA+Pj4gKDE1IC0gY2RbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbztcbn0pO1xuLy8gZml4ZWQgbGVuZ3RoIHRyZWVcbnZhciBmbHQgPSBuZXcgdTgoMjg4KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMTQ0OyArK2kpXG4gICAgZmx0W2ldID0gODtcbmZvciAodmFyIGkgPSAxNDQ7IGkgPCAyNTY7ICsraSlcbiAgICBmbHRbaV0gPSA5O1xuZm9yICh2YXIgaSA9IDI1NjsgaSA8IDI4MDsgKytpKVxuICAgIGZsdFtpXSA9IDc7XG5mb3IgKHZhciBpID0gMjgwOyBpIDwgMjg4OyArK2kpXG4gICAgZmx0W2ldID0gODtcbi8vIGZpeGVkIGRpc3RhbmNlIHRyZWVcbnZhciBmZHQgPSBuZXcgdTgoMzIpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgKytpKVxuICAgIGZkdFtpXSA9IDU7XG4vLyBmaXhlZCBsZW5ndGggbWFwXG52YXIgZmxtID0gLyojX19QVVJFX18qLyBoTWFwKGZsdCwgOSwgMCksIGZscm0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmx0LCA5LCAxKTtcbi8vIGZpeGVkIGRpc3RhbmNlIG1hcFxudmFyIGZkbSA9IC8qI19fUFVSRV9fKi8gaE1hcChmZHQsIDUsIDApLCBmZHJtID0gLyojX19QVVJFX18qLyBoTWFwKGZkdCwgNSwgMSk7XG4vLyBmaW5kIG1heCBvZiBhcnJheVxudmFyIG1heCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIG0gPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoYVtpXSA+IG0pXG4gICAgICAgICAgICBtID0gYVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIG07XG59O1xuLy8gcmVhZCBkLCBzdGFydGluZyBhdCBiaXQgcCBhbmQgbWFzayB3aXRoIG1cbnZhciBiaXRzID0gZnVuY3Rpb24gKGQsIHAsIG0pIHtcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIHJldHVybiAoKGRbb10gfCAoZFtvICsgMV0gPDwgOCkpID4+IChwICYgNykpICYgbTtcbn07XG4vLyByZWFkIGQsIHN0YXJ0aW5nIGF0IGJpdCBwIGNvbnRpbnVpbmcgZm9yIGF0IGxlYXN0IDE2IGJpdHNcbnZhciBiaXRzMTYgPSBmdW5jdGlvbiAoZCwgcCkge1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgcmV0dXJuICgoZFtvXSB8IChkW28gKyAxXSA8PCA4KSB8IChkW28gKyAyXSA8PCAxNikpID4+IChwICYgNykpO1xufTtcbi8vIGdldCBlbmQgb2YgYnl0ZVxudmFyIHNoZnQgPSBmdW5jdGlvbiAocCkgeyByZXR1cm4gKChwICsgNykgLyA4KSB8IDA7IH07XG4vLyB0eXBlZCBhcnJheSBzbGljZSAtIGFsbG93cyBnYXJiYWdlIGNvbGxlY3RvciB0byBmcmVlIG9yaWdpbmFsIHJlZmVyZW5jZSxcbi8vIHdoaWxlIGJlaW5nIG1vcmUgY29tcGF0aWJsZSB0aGFuIC5zbGljZVxudmFyIHNsYyA9IGZ1bmN0aW9uICh2LCBzLCBlKSB7XG4gICAgaWYgKHMgPT0gbnVsbCB8fCBzIDwgMClcbiAgICAgICAgcyA9IDA7XG4gICAgaWYgKGUgPT0gbnVsbCB8fCBlID4gdi5sZW5ndGgpXG4gICAgICAgIGUgPSB2Lmxlbmd0aDtcbiAgICAvLyBjYW4ndCB1c2UgLmNvbnN0cnVjdG9yIGluIGNhc2UgdXNlci1zdXBwbGllZFxuICAgIHZhciBuID0gbmV3ICh2LkJZVEVTX1BFUl9FTEVNRU5UID09IDIgPyB1MTYgOiB2LkJZVEVTX1BFUl9FTEVNRU5UID09IDQgPyB1MzIgOiB1OCkoZSAtIHMpO1xuICAgIG4uc2V0KHYuc3ViYXJyYXkocywgZSkpO1xuICAgIHJldHVybiBuO1xufTtcbi8qKlxuICogQ29kZXMgZm9yIGVycm9ycyBnZW5lcmF0ZWQgd2l0aGluIHRoaXMgbGlicmFyeVxuICovXG5leHBvcnQgdmFyIEZsYXRlRXJyb3JDb2RlID0ge1xuICAgIFVuZXhwZWN0ZWRFT0Y6IDAsXG4gICAgSW52YWxpZEJsb2NrVHlwZTogMSxcbiAgICBJbnZhbGlkTGVuZ3RoTGl0ZXJhbDogMixcbiAgICBJbnZhbGlkRGlzdGFuY2U6IDMsXG4gICAgU3RyZWFtRmluaXNoZWQ6IDQsXG4gICAgTm9TdHJlYW1IYW5kbGVyOiA1LFxuICAgIEludmFsaWRIZWFkZXI6IDYsXG4gICAgTm9DYWxsYmFjazogNyxcbiAgICBJbnZhbGlkVVRGODogOCxcbiAgICBFeHRyYUZpZWxkVG9vTG9uZzogOSxcbiAgICBJbnZhbGlkRGF0ZTogMTAsXG4gICAgRmlsZW5hbWVUb29Mb25nOiAxMSxcbiAgICBTdHJlYW1GaW5pc2hpbmc6IDEyLFxuICAgIEludmFsaWRaaXBEYXRhOiAxMyxcbiAgICBVbmtub3duQ29tcHJlc3Npb25NZXRob2Q6IDE0XG59O1xuLy8gZXJyb3IgY29kZXNcbnZhciBlYyA9IFtcbiAgICAndW5leHBlY3RlZCBFT0YnLFxuICAgICdpbnZhbGlkIGJsb2NrIHR5cGUnLFxuICAgICdpbnZhbGlkIGxlbmd0aC9saXRlcmFsJyxcbiAgICAnaW52YWxpZCBkaXN0YW5jZScsXG4gICAgJ3N0cmVhbSBmaW5pc2hlZCcsXG4gICAgJ25vIHN0cmVhbSBoYW5kbGVyJyxcbiAgICAsXG4gICAgJ25vIGNhbGxiYWNrJyxcbiAgICAnaW52YWxpZCBVVEYtOCBkYXRhJyxcbiAgICAnZXh0cmEgZmllbGQgdG9vIGxvbmcnLFxuICAgICdkYXRlIG5vdCBpbiByYW5nZSAxOTgwLTIwOTknLFxuICAgICdmaWxlbmFtZSB0b28gbG9uZycsXG4gICAgJ3N0cmVhbSBmaW5pc2hpbmcnLFxuICAgICdpbnZhbGlkIHppcCBkYXRhJ1xuICAgIC8vIGRldGVybWluZWQgYnkgdW5rbm93biBjb21wcmVzc2lvbiBtZXRob2Rcbl07XG47XG52YXIgZXJyID0gZnVuY3Rpb24gKGluZCwgbXNnLCBudCkge1xuICAgIHZhciBlID0gbmV3IEVycm9yKG1zZyB8fCBlY1tpbmRdKTtcbiAgICBlLmNvZGUgPSBpbmQ7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKVxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlLCBlcnIpO1xuICAgIGlmICghbnQpXG4gICAgICAgIHRocm93IGU7XG4gICAgcmV0dXJuIGU7XG59O1xuLy8gZXhwYW5kcyByYXcgREVGTEFURSBkYXRhXG52YXIgaW5mbHQgPSBmdW5jdGlvbiAoZGF0LCBidWYsIHN0KSB7XG4gICAgLy8gc291cmNlIGxlbmd0aFxuICAgIHZhciBzbCA9IGRhdC5sZW5ndGg7XG4gICAgaWYgKCFzbCB8fCAoc3QgJiYgc3QuZiAmJiAhc3QubCkpXG4gICAgICAgIHJldHVybiBidWYgfHwgbmV3IHU4KDApO1xuICAgIC8vIGhhdmUgdG8gZXN0aW1hdGUgc2l6ZVxuICAgIHZhciBub0J1ZiA9ICFidWYgfHwgc3Q7XG4gICAgLy8gbm8gc3RhdGVcbiAgICB2YXIgbm9TdCA9ICFzdCB8fCBzdC5pO1xuICAgIGlmICghc3QpXG4gICAgICAgIHN0ID0ge307XG4gICAgLy8gQXNzdW1lcyByb3VnaGx5IDMzJSBjb21wcmVzc2lvbiByYXRpbyBhdmVyYWdlXG4gICAgaWYgKCFidWYpXG4gICAgICAgIGJ1ZiA9IG5ldyB1OChzbCAqIDMpO1xuICAgIC8vIGVuc3VyZSBidWZmZXIgY2FuIGZpdCBhdCBsZWFzdCBsIGVsZW1lbnRzXG4gICAgdmFyIGNidWYgPSBmdW5jdGlvbiAobCkge1xuICAgICAgICB2YXIgYmwgPSBidWYubGVuZ3RoO1xuICAgICAgICAvLyBuZWVkIHRvIGluY3JlYXNlIHNpemUgdG8gZml0XG4gICAgICAgIGlmIChsID4gYmwpIHtcbiAgICAgICAgICAgIC8vIERvdWJsZSBvciBzZXQgdG8gbmVjZXNzYXJ5LCB3aGljaGV2ZXIgaXMgZ3JlYXRlclxuICAgICAgICAgICAgdmFyIG5idWYgPSBuZXcgdTgoTWF0aC5tYXgoYmwgKiAyLCBsKSk7XG4gICAgICAgICAgICBuYnVmLnNldChidWYpO1xuICAgICAgICAgICAgYnVmID0gbmJ1ZjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gIGxhc3QgY2h1bmsgICAgICAgICBiaXRwb3MgICAgICAgICAgIGJ5dGVzXG4gICAgdmFyIGZpbmFsID0gc3QuZiB8fCAwLCBwb3MgPSBzdC5wIHx8IDAsIGJ0ID0gc3QuYiB8fCAwLCBsbSA9IHN0LmwsIGRtID0gc3QuZCwgbGJ0ID0gc3QubSwgZGJ0ID0gc3QubjtcbiAgICAvLyB0b3RhbCBiaXRzXG4gICAgdmFyIHRidHMgPSBzbCAqIDg7XG4gICAgZG8ge1xuICAgICAgICBpZiAoIWxtKSB7XG4gICAgICAgICAgICAvLyBCRklOQUwgLSB0aGlzIGlzIG9ubHkgMSB3aGVuIGxhc3QgY2h1bmsgaXMgbmV4dFxuICAgICAgICAgICAgZmluYWwgPSBiaXRzKGRhdCwgcG9zLCAxKTtcbiAgICAgICAgICAgIC8vIHR5cGU6IDAgPSBubyBjb21wcmVzc2lvbiwgMSA9IGZpeGVkIGh1ZmZtYW4sIDIgPSBkeW5hbWljIGh1ZmZtYW5cbiAgICAgICAgICAgIHZhciB0eXBlID0gYml0cyhkYXQsIHBvcyArIDEsIDMpO1xuICAgICAgICAgICAgcG9zICs9IDM7XG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICAvLyBnbyB0byBlbmQgb2YgYnl0ZSBib3VuZGFyeVxuICAgICAgICAgICAgICAgIHZhciBzID0gc2hmdChwb3MpICsgNCwgbCA9IGRhdFtzIC0gNF0gfCAoZGF0W3MgLSAzXSA8PCA4KSwgdCA9IHMgKyBsO1xuICAgICAgICAgICAgICAgIGlmICh0ID4gc2wpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgc2l6ZVxuICAgICAgICAgICAgICAgIGlmIChub0J1ZilcbiAgICAgICAgICAgICAgICAgICAgY2J1ZihidCArIGwpO1xuICAgICAgICAgICAgICAgIC8vIENvcHkgb3ZlciB1bmNvbXByZXNzZWQgZGF0YVxuICAgICAgICAgICAgICAgIGJ1Zi5zZXQoZGF0LnN1YmFycmF5KHMsIHQpLCBidCk7XG4gICAgICAgICAgICAgICAgLy8gR2V0IG5ldyBiaXRwb3MsIHVwZGF0ZSBieXRlIGNvdW50XG4gICAgICAgICAgICAgICAgc3QuYiA9IGJ0ICs9IGwsIHN0LnAgPSBwb3MgPSB0ICogOCwgc3QuZiA9IGZpbmFsO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAxKVxuICAgICAgICAgICAgICAgIGxtID0gZmxybSwgZG0gPSBmZHJtLCBsYnQgPSA5LCBkYnQgPSA1O1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gIGxpdGVyYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3Roc1xuICAgICAgICAgICAgICAgIHZhciBoTGl0ID0gYml0cyhkYXQsIHBvcywgMzEpICsgMjU3LCBoY0xlbiA9IGJpdHMoZGF0LCBwb3MgKyAxMCwgMTUpICsgNDtcbiAgICAgICAgICAgICAgICB2YXIgdGwgPSBoTGl0ICsgYml0cyhkYXQsIHBvcyArIDUsIDMxKSArIDE7XG4gICAgICAgICAgICAgICAgcG9zICs9IDE0O1xuICAgICAgICAgICAgICAgIC8vIGxlbmd0aCtkaXN0YW5jZSB0cmVlXG4gICAgICAgICAgICAgICAgdmFyIGxkdCA9IG5ldyB1OCh0bCk7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGggdHJlZVxuICAgICAgICAgICAgICAgIHZhciBjbHQgPSBuZXcgdTgoMTkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGNMZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgaW5kZXggbWFwIHRvIGdldCByZWFsIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgY2x0W2NsaW1baV1dID0gYml0cyhkYXQsIHBvcyArIGkgKiAzLCA3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zICs9IGhjTGVuICogMztcbiAgICAgICAgICAgICAgICAvLyBjb2RlIGxlbmd0aHMgYml0c1xuICAgICAgICAgICAgICAgIHZhciBjbGIgPSBtYXgoY2x0KSwgY2xibXNrID0gKDEgPDwgY2xiKSAtIDE7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGhzIG1hcFxuICAgICAgICAgICAgICAgIHZhciBjbG0gPSBoTWFwKGNsdCwgY2xiLCAxKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRsOykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGNsbVtiaXRzKGRhdCwgcG9zLCBjbGJtc2spXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYml0cyByZWFkXG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSByICYgMTU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN5bWJvbFxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHIgPj4+IDQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RoIHRvIGNvcHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMgPCAxNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGR0W2krK10gPSBzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGNvcHkgICBjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSAwLCBuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzID09IDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAzICsgYml0cyhkYXQsIHBvcywgMyksIHBvcyArPSAyLCBjID0gbGR0W2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gMTcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IDMgKyBiaXRzKGRhdCwgcG9zLCA3KSwgcG9zICs9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzID09IDE4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAxMSArIGJpdHMoZGF0LCBwb3MsIDEyNyksIHBvcyArPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG4tLSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZHRbaSsrXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgbGVuZ3RoIHRyZWUgICAgICAgICAgICAgICAgIGRpc3RhbmNlIHRyZWVcbiAgICAgICAgICAgICAgICB2YXIgbHQgPSBsZHQuc3ViYXJyYXkoMCwgaExpdCksIGR0ID0gbGR0LnN1YmFycmF5KGhMaXQpO1xuICAgICAgICAgICAgICAgIC8vIG1heCBsZW5ndGggYml0c1xuICAgICAgICAgICAgICAgIGxidCA9IG1heChsdCk7XG4gICAgICAgICAgICAgICAgLy8gbWF4IGRpc3QgYml0c1xuICAgICAgICAgICAgICAgIGRidCA9IG1heChkdCk7XG4gICAgICAgICAgICAgICAgbG0gPSBoTWFwKGx0LCBsYnQsIDEpO1xuICAgICAgICAgICAgICAgIGRtID0gaE1hcChkdCwgZGJ0LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlcnIoMSk7XG4gICAgICAgICAgICBpZiAocG9zID4gdGJ0cykge1xuICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBidWZmZXIgY2FuIGhvbGQgdGhpcyArIHRoZSBsYXJnZXN0IHBvc3NpYmxlIGFkZGl0aW9uXG4gICAgICAgIC8vIE1heGltdW0gY2h1bmsgc2l6ZSAocHJhY3RpY2FsbHksIHRoZW9yZXRpY2FsbHkgaW5maW5pdGUpIGlzIDJeMTc7XG4gICAgICAgIGlmIChub0J1ZilcbiAgICAgICAgICAgIGNidWYoYnQgKyAxMzEwNzIpO1xuICAgICAgICB2YXIgbG1zID0gKDEgPDwgbGJ0KSAtIDEsIGRtcyA9ICgxIDw8IGRidCkgLSAxO1xuICAgICAgICB2YXIgbHBvcyA9IHBvcztcbiAgICAgICAgZm9yICg7OyBscG9zID0gcG9zKSB7XG4gICAgICAgICAgICAvLyBiaXRzIHJlYWQsIGNvZGVcbiAgICAgICAgICAgIHZhciBjID0gbG1bYml0czE2KGRhdCwgcG9zKSAmIGxtc10sIHN5bSA9IGMgPj4+IDQ7XG4gICAgICAgICAgICBwb3MgKz0gYyAmIDE1O1xuICAgICAgICAgICAgaWYgKHBvcyA+IHRidHMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9TdClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjKVxuICAgICAgICAgICAgICAgIGVycigyKTtcbiAgICAgICAgICAgIGlmIChzeW0gPCAyNTYpXG4gICAgICAgICAgICAgICAgYnVmW2J0KytdID0gc3ltO1xuICAgICAgICAgICAgZWxzZSBpZiAoc3ltID09IDI1Nikge1xuICAgICAgICAgICAgICAgIGxwb3MgPSBwb3MsIGxtID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhZGQgPSBzeW0gLSAyNTQ7XG4gICAgICAgICAgICAgICAgLy8gbm8gZXh0cmEgYml0cyBuZWVkZWQgaWYgbGVzc1xuICAgICAgICAgICAgICAgIGlmIChzeW0gPiAyNjQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBzeW0gLSAyNTcsIGIgPSBmbGViW2ldO1xuICAgICAgICAgICAgICAgICAgICBhZGQgPSBiaXRzKGRhdCwgcG9zLCAoMSA8PCBiKSAtIDEpICsgZmxbaV07XG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSBiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkaXN0XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBkbVtiaXRzMTYoZGF0LCBwb3MpICYgZG1zXSwgZHN5bSA9IGQgPj4+IDQ7XG4gICAgICAgICAgICAgICAgaWYgKCFkKVxuICAgICAgICAgICAgICAgICAgICBlcnIoMyk7XG4gICAgICAgICAgICAgICAgcG9zICs9IGQgJiAxNTtcbiAgICAgICAgICAgICAgICB2YXIgZHQgPSBmZFtkc3ltXTtcbiAgICAgICAgICAgICAgICBpZiAoZHN5bSA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBmZGViW2RzeW1dO1xuICAgICAgICAgICAgICAgICAgICBkdCArPSBiaXRzMTYoZGF0LCBwb3MpICYgKCgxIDw8IGIpIC0gMSksIHBvcyArPSBiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9zID4gdGJ0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9TdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub0J1ZilcbiAgICAgICAgICAgICAgICAgICAgY2J1ZihidCArIDEzMTA3Mik7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IGJ0ICsgYWRkO1xuICAgICAgICAgICAgICAgIGZvciAoOyBidCA8IGVuZDsgYnQgKz0gNCkge1xuICAgICAgICAgICAgICAgICAgICBidWZbYnRdID0gYnVmW2J0IC0gZHRdO1xuICAgICAgICAgICAgICAgICAgICBidWZbYnQgKyAxXSA9IGJ1ZltidCArIDEgLSBkdF07XG4gICAgICAgICAgICAgICAgICAgIGJ1ZltidCArIDJdID0gYnVmW2J0ICsgMiAtIGR0XTtcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0ICsgM10gPSBidWZbYnQgKyAzIC0gZHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidCA9IGVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdC5sID0gbG0sIHN0LnAgPSBscG9zLCBzdC5iID0gYnQsIHN0LmYgPSBmaW5hbDtcbiAgICAgICAgaWYgKGxtKVxuICAgICAgICAgICAgZmluYWwgPSAxLCBzdC5tID0gbGJ0LCBzdC5kID0gZG0sIHN0Lm4gPSBkYnQ7XG4gICAgfSB3aGlsZSAoIWZpbmFsKTtcbiAgICByZXR1cm4gYnQgPT0gYnVmLmxlbmd0aCA/IGJ1ZiA6IHNsYyhidWYsIDAsIGJ0KTtcbn07XG4vLyBzdGFydGluZyBhdCBwLCB3cml0ZSB0aGUgbWluaW11bSBudW1iZXIgb2YgYml0cyB0aGF0IGNhbiBob2xkIHYgdG8gZFxudmFyIHdiaXRzID0gZnVuY3Rpb24gKGQsIHAsIHYpIHtcbiAgICB2IDw8PSBwICYgNztcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIGRbb10gfD0gdjtcbiAgICBkW28gKyAxXSB8PSB2ID4+PiA4O1xufTtcbi8vIHN0YXJ0aW5nIGF0IHAsIHdyaXRlIHRoZSBtaW5pbXVtIG51bWJlciBvZiBiaXRzICg+OCkgdGhhdCBjYW4gaG9sZCB2IHRvIGRcbnZhciB3Yml0czE2ID0gZnVuY3Rpb24gKGQsIHAsIHYpIHtcbiAgICB2IDw8PSBwICYgNztcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIGRbb10gfD0gdjtcbiAgICBkW28gKyAxXSB8PSB2ID4+PiA4O1xuICAgIGRbbyArIDJdIHw9IHYgPj4+IDE2O1xufTtcbi8vIGNyZWF0ZXMgY29kZSBsZW5ndGhzIGZyb20gYSBmcmVxdWVuY3kgdGFibGVcbnZhciBoVHJlZSA9IGZ1bmN0aW9uIChkLCBtYikge1xuICAgIC8vIE5lZWQgZXh0cmEgaW5mbyB0byBtYWtlIGEgdHJlZVxuICAgIHZhciB0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChkW2ldKVxuICAgICAgICAgICAgdC5wdXNoKHsgczogaSwgZjogZFtpXSB9KTtcbiAgICB9XG4gICAgdmFyIHMgPSB0Lmxlbmd0aDtcbiAgICB2YXIgdDIgPSB0LnNsaWNlKCk7XG4gICAgaWYgKCFzKVxuICAgICAgICByZXR1cm4gW2V0LCAwXTtcbiAgICBpZiAocyA9PSAxKSB7XG4gICAgICAgIHZhciB2ID0gbmV3IHU4KHRbMF0ucyArIDEpO1xuICAgICAgICB2W3RbMF0uc10gPSAxO1xuICAgICAgICByZXR1cm4gW3YsIDFdO1xuICAgIH1cbiAgICB0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZiAtIGIuZjsgfSk7XG4gICAgLy8gYWZ0ZXIgaTIgcmVhY2hlcyBsYXN0IGluZCwgd2lsbCBiZSBzdG9wcGVkXG4gICAgLy8gZnJlcSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBsYXJnZXN0IHBvc3NpYmxlIG51bWJlciBvZiBzeW1ib2xzXG4gICAgdC5wdXNoKHsgczogLTEsIGY6IDI1MDAxIH0pO1xuICAgIHZhciBsID0gdFswXSwgciA9IHRbMV0sIGkwID0gMCwgaTEgPSAxLCBpMiA9IDI7XG4gICAgdFswXSA9IHsgczogLTEsIGY6IGwuZiArIHIuZiwgbDogbCwgcjogciB9O1xuICAgIC8vIGVmZmljaWVudCBhbGdvcml0aG0gZnJvbSBVWklQLmpzXG4gICAgLy8gaTAgaXMgbG9va2JlaGluZCwgaTIgaXMgbG9va2FoZWFkIC0gYWZ0ZXIgcHJvY2Vzc2luZyB0d28gbG93LWZyZXFcbiAgICAvLyBzeW1ib2xzIHRoYXQgY29tYmluZWQgaGF2ZSBoaWdoIGZyZXEsIHdpbGwgc3RhcnQgcHJvY2Vzc2luZyBpMiAoaGlnaC1mcmVxLFxuICAgIC8vIG5vbi1jb21wb3NpdGUpIHN5bWJvbHMgaW5zdGVhZFxuICAgIC8vIHNlZSBodHRwczovL3JlZGRpdC5jb20vci9waG90b3BlYS9jb21tZW50cy9pa2VraHQvdXppcGpzX3F1ZXN0aW9ucy9cbiAgICB3aGlsZSAoaTEgIT0gcyAtIDEpIHtcbiAgICAgICAgbCA9IHRbdFtpMF0uZiA8IHRbaTJdLmYgPyBpMCsrIDogaTIrK107XG4gICAgICAgIHIgPSB0W2kwICE9IGkxICYmIHRbaTBdLmYgPCB0W2kyXS5mID8gaTArKyA6IGkyKytdO1xuICAgICAgICB0W2kxKytdID0geyBzOiAtMSwgZjogbC5mICsgci5mLCBsOiBsLCByOiByIH07XG4gICAgfVxuICAgIHZhciBtYXhTeW0gPSB0MlswXS5zO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgczsgKytpKSB7XG4gICAgICAgIGlmICh0MltpXS5zID4gbWF4U3ltKVxuICAgICAgICAgICAgbWF4U3ltID0gdDJbaV0ucztcbiAgICB9XG4gICAgLy8gY29kZSBsZW5ndGhzXG4gICAgdmFyIHRyID0gbmV3IHUxNihtYXhTeW0gKyAxKTtcbiAgICAvLyBtYXggYml0cyBpbiB0cmVlXG4gICAgdmFyIG1idCA9IGxuKHRbaTEgLSAxXSwgdHIsIDApO1xuICAgIGlmIChtYnQgPiBtYikge1xuICAgICAgICAvLyBtb3JlIGFsZ29yaXRobXMgZnJvbSBVWklQLmpzXG4gICAgICAgIC8vIFRPRE86IGZpbmQgb3V0IGhvdyB0aGlzIGNvZGUgd29ya3MgKGRlYnQpXG4gICAgICAgIC8vICBpbmQgICAgZGVidFxuICAgICAgICB2YXIgaSA9IDAsIGR0ID0gMDtcbiAgICAgICAgLy8gICAgbGVmdCAgICAgICAgICAgIGNvc3RcbiAgICAgICAgdmFyIGxmdCA9IG1idCAtIG1iLCBjc3QgPSAxIDw8IGxmdDtcbiAgICAgICAgdDIuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gdHJbYi5zXSAtIHRyW2Euc10gfHwgYS5mIC0gYi5mOyB9KTtcbiAgICAgICAgZm9yICg7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpMl8xID0gdDJbaV0ucztcbiAgICAgICAgICAgIGlmICh0cltpMl8xXSA+IG1iKSB7XG4gICAgICAgICAgICAgICAgZHQgKz0gY3N0IC0gKDEgPDwgKG1idCAtIHRyW2kyXzFdKSk7XG4gICAgICAgICAgICAgICAgdHJbaTJfMV0gPSBtYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkdCA+Pj49IGxmdDtcbiAgICAgICAgd2hpbGUgKGR0ID4gMCkge1xuICAgICAgICAgICAgdmFyIGkyXzIgPSB0MltpXS5zO1xuICAgICAgICAgICAgaWYgKHRyW2kyXzJdIDwgbWIpXG4gICAgICAgICAgICAgICAgZHQgLT0gMSA8PCAobWIgLSB0cltpMl8yXSsrIC0gMSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoOyBpID49IDAgJiYgZHQ7IC0taSkge1xuICAgICAgICAgICAgdmFyIGkyXzMgPSB0MltpXS5zO1xuICAgICAgICAgICAgaWYgKHRyW2kyXzNdID09IG1iKSB7XG4gICAgICAgICAgICAgICAgLS10cltpMl8zXTtcbiAgICAgICAgICAgICAgICArK2R0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1idCA9IG1iO1xuICAgIH1cbiAgICByZXR1cm4gW25ldyB1OCh0ciksIG1idF07XG59O1xuLy8gZ2V0IHRoZSBtYXggbGVuZ3RoIGFuZCBhc3NpZ24gbGVuZ3RoIGNvZGVzXG52YXIgbG4gPSBmdW5jdGlvbiAobiwgbCwgZCkge1xuICAgIHJldHVybiBuLnMgPT0gLTFcbiAgICAgICAgPyBNYXRoLm1heChsbihuLmwsIGwsIGQgKyAxKSwgbG4obi5yLCBsLCBkICsgMSkpXG4gICAgICAgIDogKGxbbi5zXSA9IGQpO1xufTtcbi8vIGxlbmd0aCBjb2RlcyBnZW5lcmF0aW9uXG52YXIgbGMgPSBmdW5jdGlvbiAoYykge1xuICAgIHZhciBzID0gYy5sZW5ndGg7XG4gICAgLy8gTm90ZSB0aGF0IHRoZSBzZW1pY29sb24gd2FzIGludGVudGlvbmFsXG4gICAgd2hpbGUgKHMgJiYgIWNbLS1zXSlcbiAgICAgICAgO1xuICAgIHZhciBjbCA9IG5ldyB1MTYoKytzKTtcbiAgICAvLyAgaW5kICAgICAgbnVtICAgICAgICAgc3RyZWFrXG4gICAgdmFyIGNsaSA9IDAsIGNsbiA9IGNbMF0sIGNscyA9IDE7XG4gICAgdmFyIHcgPSBmdW5jdGlvbiAodikgeyBjbFtjbGkrK10gPSB2OyB9O1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHM7ICsraSkge1xuICAgICAgICBpZiAoY1tpXSA9PSBjbG4gJiYgaSAhPSBzKVxuICAgICAgICAgICAgKytjbHM7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjbG4gJiYgY2xzID4gMikge1xuICAgICAgICAgICAgICAgIGZvciAoOyBjbHMgPiAxMzg7IGNscyAtPSAxMzgpXG4gICAgICAgICAgICAgICAgICAgIHcoMzI3NTQpO1xuICAgICAgICAgICAgICAgIGlmIChjbHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHcoY2xzID4gMTAgPyAoKGNscyAtIDExKSA8PCA1KSB8IDI4NjkwIDogKChjbHMgLSAzKSA8PCA1KSB8IDEyMzA1KTtcbiAgICAgICAgICAgICAgICAgICAgY2xzID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjbHMgPiAzKSB7XG4gICAgICAgICAgICAgICAgdyhjbG4pLCAtLWNscztcbiAgICAgICAgICAgICAgICBmb3IgKDsgY2xzID4gNjsgY2xzIC09IDYpXG4gICAgICAgICAgICAgICAgICAgIHcoODMwNCk7XG4gICAgICAgICAgICAgICAgaWYgKGNscyA+IDIpXG4gICAgICAgICAgICAgICAgICAgIHcoKChjbHMgLSAzKSA8PCA1KSB8IDgyMDgpLCBjbHMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNscy0tKVxuICAgICAgICAgICAgICAgIHcoY2xuKTtcbiAgICAgICAgICAgIGNscyA9IDE7XG4gICAgICAgICAgICBjbG4gPSBjW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbY2wuc3ViYXJyYXkoMCwgY2xpKSwgc107XG59O1xuLy8gY2FsY3VsYXRlIHRoZSBsZW5ndGggb2Ygb3V0cHV0IGZyb20gdHJlZSwgY29kZSBsZW5ndGhzXG52YXIgY2xlbiA9IGZ1bmN0aW9uIChjZiwgY2wpIHtcbiAgICB2YXIgbCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbC5sZW5ndGg7ICsraSlcbiAgICAgICAgbCArPSBjZltpXSAqIGNsW2ldO1xuICAgIHJldHVybiBsO1xufTtcbi8vIHdyaXRlcyBhIGZpeGVkIGJsb2NrXG4vLyByZXR1cm5zIHRoZSBuZXcgYml0IHBvc1xudmFyIHdmYmxrID0gZnVuY3Rpb24gKG91dCwgcG9zLCBkYXQpIHtcbiAgICAvLyBubyBuZWVkIHRvIHdyaXRlIDAwIGFzIHR5cGU6IFR5cGVkQXJyYXkgZGVmYXVsdHMgdG8gMFxuICAgIHZhciBzID0gZGF0Lmxlbmd0aDtcbiAgICB2YXIgbyA9IHNoZnQocG9zICsgMik7XG4gICAgb3V0W29dID0gcyAmIDI1NTtcbiAgICBvdXRbbyArIDFdID0gcyA+Pj4gODtcbiAgICBvdXRbbyArIDJdID0gb3V0W29dIF4gMjU1O1xuICAgIG91dFtvICsgM10gPSBvdXRbbyArIDFdIF4gMjU1O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgczsgKytpKVxuICAgICAgICBvdXRbbyArIGkgKyA0XSA9IGRhdFtpXTtcbiAgICByZXR1cm4gKG8gKyA0ICsgcykgKiA4O1xufTtcbi8vIHdyaXRlcyBhIGJsb2NrXG52YXIgd2JsayA9IGZ1bmN0aW9uIChkYXQsIG91dCwgZmluYWwsIHN5bXMsIGxmLCBkZiwgZWIsIGxpLCBicywgYmwsIHApIHtcbiAgICB3Yml0cyhvdXQsIHArKywgZmluYWwpO1xuICAgICsrbGZbMjU2XTtcbiAgICB2YXIgX2EgPSBoVHJlZShsZiwgMTUpLCBkbHQgPSBfYVswXSwgbWxiID0gX2FbMV07XG4gICAgdmFyIF9iID0gaFRyZWUoZGYsIDE1KSwgZGR0ID0gX2JbMF0sIG1kYiA9IF9iWzFdO1xuICAgIHZhciBfYyA9IGxjKGRsdCksIGxjbHQgPSBfY1swXSwgbmxjID0gX2NbMV07XG4gICAgdmFyIF9kID0gbGMoZGR0KSwgbGNkdCA9IF9kWzBdLCBuZGMgPSBfZFsxXTtcbiAgICB2YXIgbGNmcmVxID0gbmV3IHUxNigxOSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsY2x0Lmxlbmd0aDsgKytpKVxuICAgICAgICBsY2ZyZXFbbGNsdFtpXSAmIDMxXSsrO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGNkdC5sZW5ndGg7ICsraSlcbiAgICAgICAgbGNmcmVxW2xjZHRbaV0gJiAzMV0rKztcbiAgICB2YXIgX2UgPSBoVHJlZShsY2ZyZXEsIDcpLCBsY3QgPSBfZVswXSwgbWxjYiA9IF9lWzFdO1xuICAgIHZhciBubGNjID0gMTk7XG4gICAgZm9yICg7IG5sY2MgPiA0ICYmICFsY3RbY2xpbVtubGNjIC0gMV1dOyAtLW5sY2MpXG4gICAgICAgIDtcbiAgICB2YXIgZmxlbiA9IChibCArIDUpIDw8IDM7XG4gICAgdmFyIGZ0bGVuID0gY2xlbihsZiwgZmx0KSArIGNsZW4oZGYsIGZkdCkgKyBlYjtcbiAgICB2YXIgZHRsZW4gPSBjbGVuKGxmLCBkbHQpICsgY2xlbihkZiwgZGR0KSArIGViICsgMTQgKyAzICogbmxjYyArIGNsZW4obGNmcmVxLCBsY3QpICsgKDIgKiBsY2ZyZXFbMTZdICsgMyAqIGxjZnJlcVsxN10gKyA3ICogbGNmcmVxWzE4XSk7XG4gICAgaWYgKGZsZW4gPD0gZnRsZW4gJiYgZmxlbiA8PSBkdGxlbilcbiAgICAgICAgcmV0dXJuIHdmYmxrKG91dCwgcCwgZGF0LnN1YmFycmF5KGJzLCBicyArIGJsKSk7XG4gICAgdmFyIGxtLCBsbCwgZG0sIGRsO1xuICAgIHdiaXRzKG91dCwgcCwgMSArIChkdGxlbiA8IGZ0bGVuKSksIHAgKz0gMjtcbiAgICBpZiAoZHRsZW4gPCBmdGxlbikge1xuICAgICAgICBsbSA9IGhNYXAoZGx0LCBtbGIsIDApLCBsbCA9IGRsdCwgZG0gPSBoTWFwKGRkdCwgbWRiLCAwKSwgZGwgPSBkZHQ7XG4gICAgICAgIHZhciBsbG0gPSBoTWFwKGxjdCwgbWxjYiwgMCk7XG4gICAgICAgIHdiaXRzKG91dCwgcCwgbmxjIC0gMjU3KTtcbiAgICAgICAgd2JpdHMob3V0LCBwICsgNSwgbmRjIC0gMSk7XG4gICAgICAgIHdiaXRzKG91dCwgcCArIDEwLCBubGNjIC0gNCk7XG4gICAgICAgIHAgKz0gMTQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmxjYzsgKytpKVxuICAgICAgICAgICAgd2JpdHMob3V0LCBwICsgMyAqIGksIGxjdFtjbGltW2ldXSk7XG4gICAgICAgIHAgKz0gMyAqIG5sY2M7XG4gICAgICAgIHZhciBsY3RzID0gW2xjbHQsIGxjZHRdO1xuICAgICAgICBmb3IgKHZhciBpdCA9IDA7IGl0IDwgMjsgKytpdCkge1xuICAgICAgICAgICAgdmFyIGNsY3QgPSBsY3RzW2l0XTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xjdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSBjbGN0W2ldICYgMzE7XG4gICAgICAgICAgICAgICAgd2JpdHMob3V0LCBwLCBsbG1bbGVuXSksIHAgKz0gbGN0W2xlbl07XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA+IDE1KVxuICAgICAgICAgICAgICAgICAgICB3Yml0cyhvdXQsIHAsIChjbGN0W2ldID4+PiA1KSAmIDEyNyksIHAgKz0gY2xjdFtpXSA+Pj4gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxtID0gZmxtLCBsbCA9IGZsdCwgZG0gPSBmZG0sIGRsID0gZmR0O1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpOyArK2kpIHtcbiAgICAgICAgaWYgKHN5bXNbaV0gPiAyNTUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSAoc3ltc1tpXSA+Pj4gMTgpICYgMzE7XG4gICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgbG1bbGVuICsgMjU3XSksIHAgKz0gbGxbbGVuICsgMjU3XTtcbiAgICAgICAgICAgIGlmIChsZW4gPiA3KVxuICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgKHN5bXNbaV0gPj4+IDIzKSAmIDMxKSwgcCArPSBmbGViW2xlbl07XG4gICAgICAgICAgICB2YXIgZHN0ID0gc3ltc1tpXSAmIDMxO1xuICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIGRtW2RzdF0pLCBwICs9IGRsW2RzdF07XG4gICAgICAgICAgICBpZiAoZHN0ID4gMylcbiAgICAgICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgKHN5bXNbaV0gPj4+IDUpICYgODE5MSksIHAgKz0gZmRlYltkc3RdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIGxtW3N5bXNbaV1dKSwgcCArPSBsbFtzeW1zW2ldXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3Yml0czE2KG91dCwgcCwgbG1bMjU2XSk7XG4gICAgcmV0dXJuIHAgKyBsbFsyNTZdO1xufTtcbi8vIGRlZmxhdGUgb3B0aW9ucyAobmljZSA8PCAxMykgfCBjaGFpblxudmFyIGRlbyA9IC8qI19fUFVSRV9fKi8gbmV3IHUzMihbNjU1NDAsIDEzMTA4MCwgMTMxMDg4LCAxMzExMDQsIDI2MjE3NiwgMTA0ODcwNCwgMTA0ODgzMiwgMjExNDU2MCwgMjExNzYzMl0pO1xuLy8gZW1wdHlcbnZhciBldCA9IC8qI19fUFVSRV9fKi8gbmV3IHU4KDApO1xuLy8gY29tcHJlc3NlcyBkYXRhIGludG8gYSByYXcgREVGTEFURSBidWZmZXJcbnZhciBkZmx0ID0gZnVuY3Rpb24gKGRhdCwgbHZsLCBwbHZsLCBwcmUsIHBvc3QsIGxzdCkge1xuICAgIHZhciBzID0gZGF0Lmxlbmd0aDtcbiAgICB2YXIgbyA9IG5ldyB1OChwcmUgKyBzICsgNSAqICgxICsgTWF0aC5jZWlsKHMgLyA3MDAwKSkgKyBwb3N0KTtcbiAgICAvLyB3cml0aW5nIHRvIHRoaXMgd3JpdGVzIHRvIHRoZSBvdXRwdXQgYnVmZmVyXG4gICAgdmFyIHcgPSBvLnN1YmFycmF5KHByZSwgby5sZW5ndGggLSBwb3N0KTtcbiAgICB2YXIgcG9zID0gMDtcbiAgICBpZiAoIWx2bCB8fCBzIDwgOCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzOyBpICs9IDY1NTM1KSB7XG4gICAgICAgICAgICAvLyBlbmRcbiAgICAgICAgICAgIHZhciBlID0gaSArIDY1NTM1O1xuICAgICAgICAgICAgaWYgKGUgPj0gcykge1xuICAgICAgICAgICAgICAgIC8vIHdyaXRlIGZpbmFsIGJsb2NrXG4gICAgICAgICAgICAgICAgd1twb3MgPj4gM10gPSBsc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MgPSB3ZmJsayh3LCBwb3MgKyAxLCBkYXQuc3ViYXJyYXkoaSwgZSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgb3B0ID0gZGVvW2x2bCAtIDFdO1xuICAgICAgICB2YXIgbiA9IG9wdCA+Pj4gMTMsIGMgPSBvcHQgJiA4MTkxO1xuICAgICAgICB2YXIgbXNrXzEgPSAoMSA8PCBwbHZsKSAtIDE7XG4gICAgICAgIC8vICAgIHByZXYgMi1ieXRlIHZhbCBtYXAgICAgY3VyciAyLWJ5dGUgdmFsIG1hcFxuICAgICAgICB2YXIgcHJldiA9IG5ldyB1MTYoMzI3NjgpLCBoZWFkID0gbmV3IHUxNihtc2tfMSArIDEpO1xuICAgICAgICB2YXIgYnMxXzEgPSBNYXRoLmNlaWwocGx2bCAvIDMpLCBiczJfMSA9IDIgKiBiczFfMTtcbiAgICAgICAgdmFyIGhzaCA9IGZ1bmN0aW9uIChpKSB7IHJldHVybiAoZGF0W2ldIF4gKGRhdFtpICsgMV0gPDwgYnMxXzEpIF4gKGRhdFtpICsgMl0gPDwgYnMyXzEpKSAmIG1za18xOyB9O1xuICAgICAgICAvLyAyNDU3NiBpcyBhbiBhcmJpdHJhcnkgbnVtYmVyIG9mIG1heGltdW0gc3ltYm9scyBwZXIgYmxvY2tcbiAgICAgICAgLy8gNDI0IGJ1ZmZlciBmb3IgbGFzdCBibG9ja1xuICAgICAgICB2YXIgc3ltcyA9IG5ldyB1MzIoMjUwMDApO1xuICAgICAgICAvLyBsZW5ndGgvbGl0ZXJhbCBmcmVxICAgZGlzdGFuY2UgZnJlcVxuICAgICAgICB2YXIgbGYgPSBuZXcgdTE2KDI4OCksIGRmID0gbmV3IHUxNigzMik7XG4gICAgICAgIC8vICBsL2xjbnQgIGV4Yml0cyAgaW5kZXggIGwvbGluZCAgd2FpdGR4ICBiaXRwb3NcbiAgICAgICAgdmFyIGxjXzEgPSAwLCBlYiA9IDAsIGkgPSAwLCBsaSA9IDAsIHdpID0gMCwgYnMgPSAwO1xuICAgICAgICBmb3IgKDsgaSA8IHM7ICsraSkge1xuICAgICAgICAgICAgLy8gaGFzaCB2YWx1ZVxuICAgICAgICAgICAgLy8gZGVvcHQgd2hlbiBpID4gcyAtIDMgLSBhdCBlbmQsIGRlb3B0IGFjY2VwdGFibGVcbiAgICAgICAgICAgIHZhciBodiA9IGhzaChpKTtcbiAgICAgICAgICAgIC8vIGluZGV4IG1vZCAzMjc2OCAgICBwcmV2aW91cyBpbmRleCBtb2RcbiAgICAgICAgICAgIHZhciBpbW9kID0gaSAmIDMyNzY3LCBwaW1vZCA9IGhlYWRbaHZdO1xuICAgICAgICAgICAgcHJldltpbW9kXSA9IHBpbW9kO1xuICAgICAgICAgICAgaGVhZFtodl0gPSBpbW9kO1xuICAgICAgICAgICAgLy8gV2UgYWx3YXlzIHNob3VsZCBtb2RpZnkgaGVhZCBhbmQgcHJldiwgYnV0IG9ubHkgYWRkIHN5bWJvbHMgaWZcbiAgICAgICAgICAgIC8vIHRoaXMgZGF0YSBpcyBub3QgeWV0IHByb2Nlc3NlZCAoXCJ3YWl0XCIgZm9yIHdhaXQgaW5kZXgpXG4gICAgICAgICAgICBpZiAod2kgPD0gaSkge1xuICAgICAgICAgICAgICAgIC8vIGJ5dGVzIHJlbWFpbmluZ1xuICAgICAgICAgICAgICAgIHZhciByZW0gPSBzIC0gaTtcbiAgICAgICAgICAgICAgICBpZiAoKGxjXzEgPiA3MDAwIHx8IGxpID4gMjQ1NzYpICYmIHJlbSA+IDQyMykge1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSB3YmxrKGRhdCwgdywgMCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBpIC0gYnMsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGxpID0gbGNfMSA9IGViID0gMCwgYnMgPSBpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI4NjsgKytqKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGZbal0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDMwOyArK2opXG4gICAgICAgICAgICAgICAgICAgICAgICBkZltqXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICBsZW4gICAgZGlzdCAgIGNoYWluXG4gICAgICAgICAgICAgICAgdmFyIGwgPSAyLCBkID0gMCwgY2hfMSA9IGMsIGRpZiA9IChpbW9kIC0gcGltb2QpICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgaWYgKHJlbSA+IDIgJiYgaHYgPT0gaHNoKGkgLSBkaWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhuID0gTWF0aC5taW4obiwgcmVtKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhkID0gTWF0aC5taW4oMzI3NjcsIGkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXggcG9zc2libGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBjYXBwZWQgYXQgZGlmIGJlY2F1c2UgZGVjb21wcmVzc29ycyBpbXBsZW1lbnQgXCJyb2xsaW5nXCIgaW5kZXggcG9wdWxhdGlvblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWwgPSBNYXRoLm1pbigyNTgsIHJlbSk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChkaWYgPD0gbWF4ZCAmJiAtLWNoXzEgJiYgaW1vZCAhPSBwaW1vZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdFtpICsgbF0gPT0gZGF0W2kgKyBsIC0gZGlmXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBubCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IG5sIDwgbWwgJiYgZGF0W2kgKyBubF0gPT0gZGF0W2kgKyBubCAtIGRpZl07ICsrbmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmwgPiBsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBubCwgZCA9IGRpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IGVhcmx5IHdoZW4gd2UgcmVhY2ggXCJuaWNlXCIgKHdlIGFyZSBzYXRpc2ZpZWQgZW5vdWdoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmwgPiBtYXhuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdywgZmluZCB0aGUgcmFyZXN0IDItYnl0ZSBzZXF1ZW5jZSB3aXRoaW4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZW5ndGggb2YgbGl0ZXJhbHMgYW5kIHNlYXJjaCBmb3IgdGhhdCBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNdWNoIGZhc3RlciB0aGFuIGp1c3QgdXNpbmcgdGhlIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtbWQgPSBNYXRoLm1pbihkaWYsIG5sIC0gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbW1kOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aSA9IChpIC0gZGlmICsgaiArIDMyNzY4KSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHB0aSA9IHByZXZbdGldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNkID0gKHRpIC0gcHRpICsgMzI3NjgpICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2QgPiBtZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZCA9IGNkLCBwaW1vZCA9IHRpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhlIHByZXZpb3VzIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBpbW9kID0gcGltb2QsIHBpbW9kID0gcHJldltpbW9kXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZiArPSAoaW1vZCAtIHBpbW9kICsgMzI3NjgpICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZCB3aWxsIGJlIG5vbnplcm8gb25seSB3aGVuIGEgbWF0Y2ggd2FzIGZvdW5kXG4gICAgICAgICAgICAgICAgaWYgKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgYm90aCBkaXN0IGFuZCBsZW4gZGF0YSBpbiBvbmUgVWludDMyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGlzIHJlY29nbml6ZWQgYXMgYSBsZW4vZGlzdCB3aXRoIDI4dGggYml0ICgyXjI4KVxuICAgICAgICAgICAgICAgICAgICBzeW1zW2xpKytdID0gMjY4NDM1NDU2IHwgKHJldmZsW2xdIDw8IDE4KSB8IHJldmZkW2RdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGluID0gcmV2ZmxbbF0gJiAzMSwgZGluID0gcmV2ZmRbZF0gJiAzMTtcbiAgICAgICAgICAgICAgICAgICAgZWIgKz0gZmxlYltsaW5dICsgZmRlYltkaW5dO1xuICAgICAgICAgICAgICAgICAgICArK2xmWzI1NyArIGxpbl07XG4gICAgICAgICAgICAgICAgICAgICsrZGZbZGluXTtcbiAgICAgICAgICAgICAgICAgICAgd2kgPSBpICsgbDtcbiAgICAgICAgICAgICAgICAgICAgKytsY18xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ltc1tsaSsrXSA9IGRhdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgKytsZltkYXRbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwb3MgPSB3YmxrKGRhdCwgdywgbHN0LCBzeW1zLCBsZiwgZGYsIGViLCBsaSwgYnMsIGkgLSBicywgcG9zKTtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgZWFzaWVzdCB3YXkgdG8gYXZvaWQgbmVlZGluZyB0byBtYWludGFpbiBzdGF0ZVxuICAgICAgICBpZiAoIWxzdCAmJiBwb3MgJiA3KVxuICAgICAgICAgICAgcG9zID0gd2ZibGsodywgcG9zICsgMSwgZXQpO1xuICAgIH1cbiAgICByZXR1cm4gc2xjKG8sIDAsIHByZSArIHNoZnQocG9zKSArIHBvc3QpO1xufTtcbi8vIENSQzMyIHRhYmxlXG52YXIgY3JjdCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdCA9IG5ldyBJbnQzMkFycmF5KDI1Nik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICB2YXIgYyA9IGksIGsgPSA5O1xuICAgICAgICB3aGlsZSAoLS1rKVxuICAgICAgICAgICAgYyA9ICgoYyAmIDEpICYmIC0zMDY2NzQ5MTIpIF4gKGMgPj4+IDEpO1xuICAgICAgICB0W2ldID0gYztcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59KSgpO1xuLy8gQ1JDMzJcbnZhciBjcmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGMgPSAtMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgLy8gY2xvc3VyZXMgaGF2ZSBhd2Z1bCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdmFyIGNyID0gYztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjciA9IGNyY3RbKGNyICYgMjU1KSBeIGRbaV1dIF4gKGNyID4+PiA4KTtcbiAgICAgICAgICAgIGMgPSBjcjtcbiAgICAgICAgfSxcbiAgICAgICAgZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gfmM7IH1cbiAgICB9O1xufTtcbi8vIEFsZGVyMzJcbnZhciBhZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYSA9IDEsIGIgPSAwO1xuICAgIHJldHVybiB7XG4gICAgICAgIHA6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAvLyBjbG9zdXJlcyBoYXZlIGF3ZnVsIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICB2YXIgbiA9IGEsIG0gPSBiO1xuICAgICAgICAgICAgdmFyIGwgPSBkLmxlbmd0aCB8IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSAhPSBsOykge1xuICAgICAgICAgICAgICAgIHZhciBlID0gTWF0aC5taW4oaSArIDI2NTUsIGwpO1xuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgZTsgKytpKVxuICAgICAgICAgICAgICAgICAgICBtICs9IG4gKz0gZFtpXTtcbiAgICAgICAgICAgICAgICBuID0gKG4gJiA2NTUzNSkgKyAxNSAqIChuID4+IDE2KSwgbSA9IChtICYgNjU1MzUpICsgMTUgKiAobSA+PiAxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhID0gbiwgYiA9IG07XG4gICAgICAgIH0sXG4gICAgICAgIGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGEgJT0gNjU1MjEsIGIgJT0gNjU1MjE7XG4gICAgICAgICAgICByZXR1cm4gKGEgJiAyNTUpIDw8IDI0IHwgKGEgPj4+IDgpIDw8IDE2IHwgKGIgJiAyNTUpIDw8IDggfCAoYiA+Pj4gOCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbjtcbi8vIGRlZmxhdGUgd2l0aCBvcHRzXG52YXIgZG9wdCA9IGZ1bmN0aW9uIChkYXQsIG9wdCwgcHJlLCBwb3N0LCBzdCkge1xuICAgIHJldHVybiBkZmx0KGRhdCwgb3B0LmxldmVsID09IG51bGwgPyA2IDogb3B0LmxldmVsLCBvcHQubWVtID09IG51bGwgPyBNYXRoLmNlaWwoTWF0aC5tYXgoOCwgTWF0aC5taW4oMTMsIE1hdGgubG9nKGRhdC5sZW5ndGgpKSkgKiAxLjUpIDogKDEyICsgb3B0Lm1lbSksIHByZSwgcG9zdCwgIXN0KTtcbn07XG4vLyBXYWxtYXJ0IG9iamVjdCBzcHJlYWRcbnZhciBtcmcgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBvID0ge307XG4gICAgZm9yICh2YXIgayBpbiBhKVxuICAgICAgICBvW2tdID0gYVtrXTtcbiAgICBmb3IgKHZhciBrIGluIGIpXG4gICAgICAgIG9ba10gPSBiW2tdO1xuICAgIHJldHVybiBvO1xufTtcbi8vIHdvcmtlciBjbG9uZVxuLy8gVGhpcyBpcyBwb3NzaWJseSB0aGUgY3Jhemllc3QgcGFydCBvZiB0aGUgZW50aXJlIGNvZGViYXNlLCBkZXNwaXRlIGhvdyBzaW1wbGUgaXQgbWF5IHNlZW0uXG4vLyBUaGUgb25seSBwYXJhbWV0ZXIgdG8gdGhpcyBmdW5jdGlvbiBpcyBhIGNsb3N1cmUgdGhhdCByZXR1cm5zIGFuIGFycmF5IG9mIHZhcmlhYmxlcyBvdXRzaWRlIG9mIHRoZSBmdW5jdGlvbiBzY29wZS5cbi8vIFdlJ3JlIGdvaW5nIHRvIHRyeSB0byBmaWd1cmUgb3V0IHRoZSB2YXJpYWJsZSBuYW1lcyB1c2VkIGluIHRoZSBjbG9zdXJlIGFzIHN0cmluZ3MgYmVjYXVzZSB0aGF0IGlzIGNydWNpYWwgZm9yIHdvcmtlcml6YXRpb24uXG4vLyBXZSB3aWxsIHJldHVybiBhbiBvYmplY3QgbWFwcGluZyBvZiB0cnVlIHZhcmlhYmxlIG5hbWUgdG8gdmFsdWUgKGJhc2ljYWxseSwgdGhlIGN1cnJlbnQgc2NvcGUgYXMgYSBKUyBvYmplY3QpLlxuLy8gVGhlIHJlYXNvbiB3ZSBjYW4ndCBqdXN0IHVzZSB0aGUgb3JpZ2luYWwgdmFyaWFibGUgbmFtZXMgaXMgbWluaWZpZXJzIG1hbmdsaW5nIHRoZSB0b3BsZXZlbCBzY29wZS5cbi8vIFRoaXMgdG9vayBtZSB0aHJlZSB3ZWVrcyB0byBmaWd1cmUgb3V0IGhvdyB0byBkby5cbnZhciB3Y2xuID0gZnVuY3Rpb24gKGZuLCBmblN0ciwgdGQpIHtcbiAgICB2YXIgZHQgPSBmbigpO1xuICAgIHZhciBzdCA9IGZuLnRvU3RyaW5nKCk7XG4gICAgdmFyIGtzID0gc3Quc2xpY2Uoc3QuaW5kZXhPZignWycpICsgMSwgc3QubGFzdEluZGV4T2YoJ10nKSkucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciB2ID0gZHRbaV0sIGsgPSBrc1tpXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGZuU3RyICs9ICc7JyArIGsgKyAnPSc7XG4gICAgICAgICAgICB2YXIgc3RfMSA9IHYudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICh2LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIC8vIGZvciBnbG9iYWwgb2JqZWN0c1xuICAgICAgICAgICAgICAgIGlmIChzdF8xLmluZGV4T2YoJ1tuYXRpdmUgY29kZV0nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3BJbmQgPSBzdF8xLmluZGV4T2YoJyAnLCA4KSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGZuU3RyICs9IHN0XzEuc2xpY2Uoc3BJbmQsIHN0XzEuaW5kZXhPZignKCcsIHNwSW5kKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmblN0ciArPSBzdF8xO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0IGluIHYucHJvdG90eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm5TdHIgKz0gJzsnICsgayArICcucHJvdG90eXBlLicgKyB0ICsgJz0nICsgdi5wcm90b3R5cGVbdF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm5TdHIgKz0gc3RfMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZFtrXSA9IHY7XG4gICAgfVxuICAgIHJldHVybiBbZm5TdHIsIHRkXTtcbn07XG52YXIgY2ggPSBbXTtcbi8vIGNsb25lIGJ1ZnNcbnZhciBjYmZzID0gZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgdGwgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIHYpIHtcbiAgICAgICAgaWYgKHZba10uYnVmZmVyKSB7XG4gICAgICAgICAgICB0bC5wdXNoKCh2W2tdID0gbmV3IHZba10uY29uc3RydWN0b3IodltrXSkpLmJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRsO1xufTtcbi8vIHVzZSBhIHdvcmtlciB0byBleGVjdXRlIGNvZGVcbnZhciB3cmtyID0gZnVuY3Rpb24gKGZucywgaW5pdCwgaWQsIGNiKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghY2hbaWRdKSB7XG4gICAgICAgIHZhciBmblN0ciA9ICcnLCB0ZF8xID0ge30sIG0gPSBmbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtOyArK2kpXG4gICAgICAgICAgICBfYSA9IHdjbG4oZm5zW2ldLCBmblN0ciwgdGRfMSksIGZuU3RyID0gX2FbMF0sIHRkXzEgPSBfYVsxXTtcbiAgICAgICAgY2hbaWRdID0gd2NsbihmbnNbbV0sIGZuU3RyLCB0ZF8xKTtcbiAgICB9XG4gICAgdmFyIHRkID0gbXJnKHt9LCBjaFtpZF1bMV0pO1xuICAgIHJldHVybiB3ayhjaFtpZF1bMF0gKyAnO29ubWVzc2FnZT1mdW5jdGlvbihlKXtmb3IodmFyIGsgaW4gZS5kYXRhKXNlbGZba109ZS5kYXRhW2tdO29ubWVzc2FnZT0nICsgaW5pdC50b1N0cmluZygpICsgJ30nLCBpZCwgdGQsIGNiZnModGQpLCBjYik7XG59O1xuLy8gYmFzZSBhc3luYyBpbmZsYXRlIGZuXG52YXIgYkluZmx0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW3U4LCB1MTYsIHUzMiwgZmxlYiwgZmRlYiwgY2xpbSwgZmwsIGZkLCBmbHJtLCBmZHJtLCByZXYsIGVjLCBoTWFwLCBtYXgsIGJpdHMsIGJpdHMxNiwgc2hmdCwgc2xjLCBlcnIsIGluZmx0LCBpbmZsYXRlU3luYywgcGJmLCBndThdOyB9O1xudmFyIGJEZmx0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW3U4LCB1MTYsIHUzMiwgZmxlYiwgZmRlYiwgY2xpbSwgcmV2ZmwsIHJldmZkLCBmbG0sIGZsdCwgZmRtLCBmZHQsIHJldiwgZGVvLCBldCwgaE1hcCwgd2JpdHMsIHdiaXRzMTYsIGhUcmVlLCBsbiwgbGMsIGNsZW4sIHdmYmxrLCB3YmxrLCBzaGZ0LCBzbGMsIGRmbHQsIGRvcHQsIGRlZmxhdGVTeW5jLCBwYmZdOyB9O1xuLy8gZ3ppcCBleHRyYVxudmFyIGd6ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtnemgsIGd6aGwsIHdieXRlcywgY3JjLCBjcmN0XTsgfTtcbi8vIGd1bnppcCBleHRyYVxudmFyIGd1emUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3pzLCBnemxdOyB9O1xuLy8gemxpYiBleHRyYVxudmFyIHpsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bGgsIHdieXRlcywgYWRsZXJdOyB9O1xuLy8gdW56bGliIGV4dHJhXG52YXIgenVsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bHZdOyB9O1xuLy8gcG9zdCBidWZcbnZhciBwYmYgPSBmdW5jdGlvbiAobXNnKSB7IHJldHVybiBwb3N0TWVzc2FnZShtc2csIFttc2cuYnVmZmVyXSk7IH07XG4vLyBnZXQgdThcbnZhciBndTggPSBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBvLnNpemUgJiYgbmV3IHU4KG8uc2l6ZSk7IH07XG4vLyBhc3luYyBoZWxwZXJcbnZhciBjYmlmeSA9IGZ1bmN0aW9uIChkYXQsIG9wdHMsIGZucywgaW5pdCwgaWQsIGNiKSB7XG4gICAgdmFyIHcgPSB3cmtyKGZucywgaW5pdCwgaWQsIGZ1bmN0aW9uIChlcnIsIGRhdCkge1xuICAgICAgICB3LnRlcm1pbmF0ZSgpO1xuICAgICAgICBjYihlcnIsIGRhdCk7XG4gICAgfSk7XG4gICAgdy5wb3N0TWVzc2FnZShbZGF0LCBvcHRzXSwgb3B0cy5jb25zdW1lID8gW2RhdC5idWZmZXJdIDogW10pO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHcudGVybWluYXRlKCk7IH07XG59O1xuLy8gYXV0byBzdHJlYW1cbnZhciBhc3RybSA9IGZ1bmN0aW9uIChzdHJtKSB7XG4gICAgc3RybS5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0LCBmaW5hbCkgeyByZXR1cm4gcG9zdE1lc3NhZ2UoW2RhdCwgZmluYWxdLCBbZGF0LmJ1ZmZlcl0pOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHN0cm0ucHVzaChldi5kYXRhWzBdLCBldi5kYXRhWzFdKTsgfTtcbn07XG4vLyBhc3luYyBzdHJlYW0gYXR0YWNoXG52YXIgYXN0cm1pZnkgPSBmdW5jdGlvbiAoZm5zLCBzdHJtLCBvcHRzLCBpbml0LCBpZCkge1xuICAgIHZhciB0O1xuICAgIHZhciB3ID0gd3JrcihmbnMsIGluaXQsIGlkLCBmdW5jdGlvbiAoZXJyLCBkYXQpIHtcbiAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgIHcudGVybWluYXRlKCksIHN0cm0ub25kYXRhLmNhbGwoc3RybSwgZXJyKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0WzFdKVxuICAgICAgICAgICAgICAgIHcudGVybWluYXRlKCk7XG4gICAgICAgICAgICBzdHJtLm9uZGF0YS5jYWxsKHN0cm0sIGVyciwgZGF0WzBdLCBkYXRbMV0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdy5wb3N0TWVzc2FnZShvcHRzKTtcbiAgICBzdHJtLnB1c2ggPSBmdW5jdGlvbiAoZCwgZikge1xuICAgICAgICBpZiAoIXN0cm0ub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAodClcbiAgICAgICAgICAgIHN0cm0ub25kYXRhKGVycig0LCAwLCAxKSwgbnVsbCwgISFmKTtcbiAgICAgICAgdy5wb3N0TWVzc2FnZShbZCwgdCA9IGZdLCBbZC5idWZmZXJdKTtcbiAgICB9O1xuICAgIHN0cm0udGVybWluYXRlID0gZnVuY3Rpb24gKCkgeyB3LnRlcm1pbmF0ZSgpOyB9O1xufTtcbi8vIHJlYWQgMiBieXRlc1xudmFyIGIyID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGRbYl0gfCAoZFtiICsgMV0gPDwgOCk7IH07XG4vLyByZWFkIDQgYnl0ZXNcbnZhciBiNCA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiAoZFtiXSB8IChkW2IgKyAxXSA8PCA4KSB8IChkW2IgKyAyXSA8PCAxNikgfCAoZFtiICsgM10gPDwgMjQpKSA+Pj4gMDsgfTtcbnZhciBiOCA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiBiNChkLCBiKSArIChiNChkLCBiICsgNCkgKiA0Mjk0OTY3Mjk2KTsgfTtcbi8vIHdyaXRlIGJ5dGVzXG52YXIgd2J5dGVzID0gZnVuY3Rpb24gKGQsIGIsIHYpIHtcbiAgICBmb3IgKDsgdjsgKytiKVxuICAgICAgICBkW2JdID0gdiwgdiA+Pj49IDg7XG59O1xuLy8gZ3ppcCBoZWFkZXJcbnZhciBnemggPSBmdW5jdGlvbiAoYywgbykge1xuICAgIHZhciBmbiA9IG8uZmlsZW5hbWU7XG4gICAgY1swXSA9IDMxLCBjWzFdID0gMTM5LCBjWzJdID0gOCwgY1s4XSA9IG8ubGV2ZWwgPCAyID8gNCA6IG8ubGV2ZWwgPT0gOSA/IDIgOiAwLCBjWzldID0gMzsgLy8gYXNzdW1lIFVuaXhcbiAgICBpZiAoby5tdGltZSAhPSAwKVxuICAgICAgICB3Ynl0ZXMoYywgNCwgTWF0aC5mbG9vcihuZXcgRGF0ZShvLm10aW1lIHx8IERhdGUubm93KCkpIC8gMTAwMCkpO1xuICAgIGlmIChmbikge1xuICAgICAgICBjWzNdID0gODtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZm4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjW2kgKyAxMF0gPSBmbi5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbn07XG4vLyBnemlwIGZvb3RlcjogLTggdG8gLTQgPSBDUkMsIC00IHRvIC0wIGlzIGxlbmd0aFxuLy8gZ3ppcCBzdGFydFxudmFyIGd6cyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKGRbMF0gIT0gMzEgfHwgZFsxXSAhPSAxMzkgfHwgZFsyXSAhPSA4KVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgZ3ppcCBkYXRhJyk7XG4gICAgdmFyIGZsZyA9IGRbM107XG4gICAgdmFyIHN0ID0gMTA7XG4gICAgaWYgKGZsZyAmIDQpXG4gICAgICAgIHN0ICs9IGRbMTBdIHwgKGRbMTFdIDw8IDgpICsgMjtcbiAgICBmb3IgKHZhciB6cyA9IChmbGcgPj4gMyAmIDEpICsgKGZsZyA+PiA0ICYgMSk7IHpzID4gMDsgenMgLT0gIWRbc3QrK10pXG4gICAgICAgIDtcbiAgICByZXR1cm4gc3QgKyAoZmxnICYgMik7XG59O1xuLy8gZ3ppcCBsZW5ndGhcbnZhciBnemwgPSBmdW5jdGlvbiAoZCkge1xuICAgIHZhciBsID0gZC5sZW5ndGg7XG4gICAgcmV0dXJuICgoZFtsIC0gNF0gfCBkW2wgLSAzXSA8PCA4IHwgZFtsIC0gMl0gPDwgMTYpIHwgKGRbbCAtIDFdIDw8IDI0KSkgPj4+IDA7XG59O1xuLy8gZ3ppcCBoZWFkZXIgbGVuZ3RoXG52YXIgZ3pobCA9IGZ1bmN0aW9uIChvKSB7IHJldHVybiAxMCArICgoby5maWxlbmFtZSAmJiAoby5maWxlbmFtZS5sZW5ndGggKyAxKSkgfHwgMCk7IH07XG4vLyB6bGliIGhlYWRlclxudmFyIHpsaCA9IGZ1bmN0aW9uIChjLCBvKSB7XG4gICAgdmFyIGx2ID0gby5sZXZlbCwgZmwgPSBsdiA9PSAwID8gMCA6IGx2IDwgNiA/IDEgOiBsdiA9PSA5ID8gMyA6IDI7XG4gICAgY1swXSA9IDEyMCwgY1sxXSA9IChmbCA8PCA2KSB8IChmbCA/ICgzMiAtIDIgKiBmbCkgOiAxKTtcbn07XG4vLyB6bGliIHZhbGlkXG52YXIgemx2ID0gZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoKGRbMF0gJiAxNSkgIT0gOCB8fCAoZFswXSA+Pj4gNCkgPiA3IHx8ICgoZFswXSA8PCA4IHwgZFsxXSkgJSAzMSkpXG4gICAgICAgIGVycig2LCAnaW52YWxpZCB6bGliIGRhdGEnKTtcbiAgICBpZiAoZFsxXSAmIDMyKVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhOiBwcmVzZXQgZGljdGlvbmFyaWVzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5mdW5jdGlvbiBBc3luY0NtcFN0cm0ob3B0cywgY2IpIHtcbiAgICBpZiAoIWNiICYmIHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgcmV0dXJuIG9wdHM7XG59XG4vLyB6bGliIGZvb3RlcjogLTQgdG8gLTAgaXMgQWRsZXIzMlxuLyoqXG4gKiBTdHJlYW1pbmcgREVGTEFURSBjb21wcmVzc2lvblxuICovXG52YXIgRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZsYXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIGlmICghY2IgJiYgdHlwZW9mIG9wdHMgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICB0aGlzLm8gPSBvcHRzIHx8IHt9O1xuICAgIH1cbiAgICBEZWZsYXRlLnByb3RvdHlwZS5wID0gZnVuY3Rpb24gKGMsIGYpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEoZG9wdChjLCB0aGlzLm8sIDAsIDAsICFmKSwgZik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBEZWZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB0aGlzLmQgPSBmaW5hbDtcbiAgICAgICAgdGhpcy5wKGNodW5rLCBmaW5hbCB8fCBmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBEZWZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jRGVmbGF0ZShvcHRzLCBjYikge1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiRGZsdCxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgRGVmbGF0ZV07IH1cbiAgICAgICAgXSwgdGhpcywgQXN5bmNDbXBTdHJtLmNhbGwodGhpcywgb3B0cywgY2IpLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IERlZmxhdGUoZXYuZGF0YSk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgNik7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0RlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNEZWZsYXRlIH07XG5leHBvcnQgZnVuY3Rpb24gZGVmbGF0ZShkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJEZmx0LFxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGRlZmxhdGVTeW5jKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pKTsgfSwgMCwgY2IpO1xufVxuLyoqXG4gKiBDb21wcmVzc2VzIGRhdGEgd2l0aCBERUZMQVRFIHdpdGhvdXQgYW55IHdyYXBwZXJcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGRlZmxhdGVkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmxhdGVTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICByZXR1cm4gZG9wdChkYXRhLCBvcHRzIHx8IHt9LCAwLCAwKTtcbn1cbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgZGVjb21wcmVzc2lvblxuICovXG52YXIgSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluZmxhdGlvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBpbmZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEluZmxhdGUoY2IpIHtcbiAgICAgICAgdGhpcy5zID0ge307XG4gICAgICAgIHRoaXMucCA9IG5ldyB1OCgwKTtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICB9XG4gICAgSW5mbGF0ZS5wcm90b3R5cGUuZSA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIHZhciBsID0gdGhpcy5wLmxlbmd0aDtcbiAgICAgICAgdmFyIG4gPSBuZXcgdTgobCArIGMubGVuZ3RoKTtcbiAgICAgICAgbi5zZXQodGhpcy5wKSwgbi5zZXQoYywgbCksIHRoaXMucCA9IG47XG4gICAgfTtcbiAgICBJbmZsYXRlLnByb3RvdHlwZS5jID0gZnVuY3Rpb24gKGZpbmFsKSB7XG4gICAgICAgIHRoaXMuZCA9IHRoaXMucy5pID0gZmluYWwgfHwgZmFsc2U7XG4gICAgICAgIHZhciBidHMgPSB0aGlzLnMuYjtcbiAgICAgICAgdmFyIGR0ID0gaW5mbHQodGhpcy5wLCB0aGlzLm8sIHRoaXMucyk7XG4gICAgICAgIHRoaXMub25kYXRhKHNsYyhkdCwgYnRzLCB0aGlzLnMuYiksIHRoaXMuZCk7XG4gICAgICAgIHRoaXMubyA9IHNsYyhkdCwgdGhpcy5zLmIgLSAzMjc2OCksIHRoaXMucy5iID0gdGhpcy5vLmxlbmd0aDtcbiAgICAgICAgdGhpcy5wID0gc2xjKHRoaXMucCwgKHRoaXMucy5wIC8gOCkgfCAwKSwgdGhpcy5zLnAgJj0gNztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGluZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgZmluYWwgY2h1bmtcbiAgICAgKi9cbiAgICBJbmZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLmUoY2h1bmspLCB0aGlzLmMoZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEluZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgSW5mbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNJbmZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGluZmxhdGlvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jSW5mbGF0ZShjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiSW5mbHQsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIEluZmxhdGVdOyB9XG4gICAgICAgIF0sIHRoaXMsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IEluZmxhdGUoKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA3KTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0luZmxhdGUgfTtcbmV4cG9ydCBmdW5jdGlvbiBpbmZsYXRlKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkluZmx0XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoaW5mbGF0ZVN5bmMoZXYuZGF0YVswXSwgZ3U4KGV2LmRhdGFbMV0pKSk7IH0sIDEsIGNiKTtcbn1cbi8qKlxuICogRXhwYW5kcyBERUZMQVRFIGRhdGEgd2l0aCBubyB3cmFwcGVyXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3V0IFdoZXJlIHRvIHdyaXRlIHRoZSBkYXRhLiBTYXZlcyBtZW1vcnkgaWYgeW91IGtub3cgdGhlIGRlY29tcHJlc3NlZCBzaXplIGFuZCBwcm92aWRlIGFuIG91dHB1dCBidWZmZXIgb2YgdGhhdCBsZW5ndGguXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZmxhdGVTeW5jKGRhdGEsIG91dCkge1xuICAgIHJldHVybiBpbmZsdChkYXRhLCBvdXQpO1xufVxuLy8gYmVmb3JlIHlvdSB5ZWxsIGF0IG1lIGZvciBub3QganVzdCB1c2luZyBleHRlbmRzLCBteSByZWFzb24gaXMgdGhhdCBUUyBpbmhlcml0YW5jZSBpcyBoYXJkIHRvIHdvcmtlcml6ZS5cbi8qKlxuICogU3RyZWFtaW5nIEdaSVAgY29tcHJlc3Npb25cbiAqL1xudmFyIEd6aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3ppcChvcHRzLCBjYikge1xuICAgICAgICB0aGlzLmMgPSBjcmMoKTtcbiAgICAgICAgdGhpcy5sID0gMDtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgRGVmbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgR1pJUHBlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBHemlwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBEZWZsYXRlLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIEd6aXAucHJvdG90eXBlLnAgPSBmdW5jdGlvbiAoYywgZikge1xuICAgICAgICB0aGlzLmMucChjKTtcbiAgICAgICAgdGhpcy5sICs9IGMubGVuZ3RoO1xuICAgICAgICB2YXIgcmF3ID0gZG9wdChjLCB0aGlzLm8sIHRoaXMudiAmJiBnemhsKHRoaXMubyksIGYgJiYgOCwgIWYpO1xuICAgICAgICBpZiAodGhpcy52KVxuICAgICAgICAgICAgZ3poKHJhdywgdGhpcy5vKSwgdGhpcy52ID0gMDtcbiAgICAgICAgaWYgKGYpXG4gICAgICAgICAgICB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gOCwgdGhpcy5jLmQoKSksIHdieXRlcyhyYXcsIHJhdy5sZW5ndGggLSA0LCB0aGlzLmwpO1xuICAgICAgICB0aGlzLm9uZGF0YShyYXcsIGYpO1xuICAgIH07XG4gICAgcmV0dXJuIEd6aXA7XG59KCkpO1xuZXhwb3J0IHsgR3ppcCB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIEdaSVAgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jR3ppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0d6aXAob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICBnemUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGUsIEd6aXBdOyB9XG4gICAgICAgIF0sIHRoaXMsIEFzeW5jQ21wU3RybS5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBHemlwKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDgpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNHemlwO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jR3ppcCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGd6aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICAgICAgZ3plLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3ppcFN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoZ3ppcFN5bmMoZXYuZGF0YVswXSwgZXYuZGF0YVsxXSkpOyB9LCAyLCBjYik7XG59XG4vKipcbiAqIENvbXByZXNzZXMgZGF0YSB3aXRoIEdaSVBcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGd6aXBwZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3ppcFN5bmMoZGF0YSwgb3B0cykge1xuICAgIGlmICghb3B0cylcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgIHZhciBjID0gY3JjKCksIGwgPSBkYXRhLmxlbmd0aDtcbiAgICBjLnAoZGF0YSk7XG4gICAgdmFyIGQgPSBkb3B0KGRhdGEsIG9wdHMsIGd6aGwob3B0cyksIDgpLCBzID0gZC5sZW5ndGg7XG4gICAgcmV0dXJuIGd6aChkLCBvcHRzKSwgd2J5dGVzKGQsIHMgLSA4LCBjLmQoKSksIHdieXRlcyhkLCBzIC0gNCwgbCksIGQ7XG59XG4vKipcbiAqIFN0cmVhbWluZyBHWklQIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEd1bnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR1VOWklQIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGluZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gR3VuemlwKGNiKSB7XG4gICAgICAgIHRoaXMudiA9IDE7XG4gICAgICAgIEluZmxhdGUuY2FsbCh0aGlzLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIEdVTlpJUHBlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBHdW56aXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIEluZmxhdGUucHJvdG90eXBlLmUuY2FsbCh0aGlzLCBjaHVuayk7XG4gICAgICAgIGlmICh0aGlzLnYpIHtcbiAgICAgICAgICAgIHZhciBzID0gdGhpcy5wLmxlbmd0aCA+IDMgPyBnenModGhpcy5wKSA6IDQ7XG4gICAgICAgICAgICBpZiAocyA+PSB0aGlzLnAubGVuZ3RoICYmICFmaW5hbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnAgPSB0aGlzLnAuc3ViYXJyYXkocyksIHRoaXMudiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA8IDgpXG4gICAgICAgICAgICAgICAgZXJyKDYsICdpbnZhbGlkIGd6aXAgZGF0YScpO1xuICAgICAgICAgICAgdGhpcy5wID0gdGhpcy5wLnN1YmFycmF5KDAsIC04KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBuZWNlc3NhcnkgdG8gcHJldmVudCBUUyBmcm9tIHVzaW5nIHRoZSBjbG9zdXJlIHZhbHVlXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIGZvciB3b3JrZXJpemF0aW9uIHRvIGZ1bmN0aW9uIGNvcnJlY3RseVxuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5jLmNhbGwodGhpcywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEd1bnppcDtcbn0oKSk7XG5leHBvcnQgeyBHdW56aXAgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBHWklQIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jR3VuemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIEdVTlpJUCBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jR3VuemlwKGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJJbmZsdCxcbiAgICAgICAgICAgIGd1emUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIEluZmxhdGUsIEd1bnppcF07IH1cbiAgICAgICAgXSwgdGhpcywgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgR3VuemlwKCk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgOSk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0d1bnppcDtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0d1bnppcCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGd1bnppcChkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdCxcbiAgICAgICAgZ3V6ZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d1bnppcFN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoZ3VuemlwU3luYyhldi5kYXRhWzBdKSk7IH0sIDMsIGNiKTtcbn1cbi8qKlxuICogRXhwYW5kcyBHWklQIGRhdGFcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGRlY29tcHJlc3NcbiAqIEBwYXJhbSBvdXQgV2hlcmUgdG8gd3JpdGUgdGhlIGRhdGEuIEdaSVAgYWxyZWFkeSBlbmNvZGVzIHRoZSBvdXRwdXQgc2l6ZSwgc28gcHJvdmlkaW5nIHRoaXMgZG9lc24ndCBzYXZlIG1lbW9yeS5cbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3VuemlwU3luYyhkYXRhLCBvdXQpIHtcbiAgICByZXR1cm4gaW5mbHQoZGF0YS5zdWJhcnJheShnenMoZGF0YSksIC04KSwgb3V0IHx8IG5ldyB1OChnemwoZGF0YSkpKTtcbn1cbi8qKlxuICogU3RyZWFtaW5nIFpsaWIgY29tcHJlc3Npb25cbiAqL1xudmFyIFpsaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gWmxpYihvcHRzLCBjYikge1xuICAgICAgICB0aGlzLmMgPSBhZGxlcigpO1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBEZWZsYXRlLmNhbGwodGhpcywgb3B0cywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB6bGliYmVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFpsaWIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIERlZmxhdGUucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgWmxpYi5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHRoaXMuYy5wKGMpO1xuICAgICAgICB2YXIgcmF3ID0gZG9wdChjLCB0aGlzLm8sIHRoaXMudiAmJiAyLCBmICYmIDQsICFmKTtcbiAgICAgICAgaWYgKHRoaXMudilcbiAgICAgICAgICAgIHpsaChyYXcsIHRoaXMubyksIHRoaXMudiA9IDA7XG4gICAgICAgIGlmIChmKVxuICAgICAgICAgICAgd2J5dGVzKHJhdywgcmF3Lmxlbmd0aCAtIDQsIHRoaXMuYy5kKCkpO1xuICAgICAgICB0aGlzLm9uZGF0YShyYXcsIGYpO1xuICAgIH07XG4gICAgcmV0dXJuIFpsaWI7XG59KCkpO1xuZXhwb3J0IHsgWmxpYiB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIFpsaWIgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jWmxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY1psaWIob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICB6bGUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGUsIFpsaWJdOyB9XG4gICAgICAgIF0sIHRoaXMsIEFzeW5jQ21wU3RybS5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBabGliKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jWmxpYjtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1psaWIgfTtcbmV4cG9ydCBmdW5jdGlvbiB6bGliKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkRmbHQsXG4gICAgICAgIHpsZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW3psaWJTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKHpsaWJTeW5jKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pKTsgfSwgNCwgY2IpO1xufVxuLyoqXG4gKiBDb21wcmVzcyBkYXRhIHdpdGggWmxpYlxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gY29tcHJlc3NcbiAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgemxpYi1jb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHpsaWJTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgYSA9IGFkbGVyKCk7XG4gICAgYS5wKGRhdGEpO1xuICAgIHZhciBkID0gZG9wdChkYXRhLCBvcHRzLCAyLCA0KTtcbiAgICByZXR1cm4gemxoKGQsIG9wdHMpLCB3Ynl0ZXMoZCwgZC5sZW5ndGggLSA0LCBhLmQoKSksIGQ7XG59XG4vKipcbiAqIFN0cmVhbWluZyBabGliIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIFVuemxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgWmxpYiBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGluZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gVW56bGliKGNiKSB7XG4gICAgICAgIHRoaXMudiA9IDE7XG4gICAgICAgIEluZmxhdGUuY2FsbCh0aGlzLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIHVuemxpYmJlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBVbnpsaWIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIEluZmxhdGUucHJvdG90eXBlLmUuY2FsbCh0aGlzLCBjaHVuayk7XG4gICAgICAgIGlmICh0aGlzLnYpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnAubGVuZ3RoIDwgMiAmJiAhZmluYWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5wID0gdGhpcy5wLnN1YmFycmF5KDIpLCB0aGlzLnYgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPCA0KVxuICAgICAgICAgICAgICAgIGVycig2LCAnaW52YWxpZCB6bGliIGRhdGEnKTtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSgwLCAtNCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmVjZXNzYXJ5IHRvIHByZXZlbnQgVFMgZnJvbSB1c2luZyB0aGUgY2xvc3VyZSB2YWx1ZVxuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3Igd29ya2VyaXphdGlvbiB0byBmdW5jdGlvbiBjb3JyZWN0bHlcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuYy5jYWxsKHRoaXMsIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBVbnpsaWI7XG59KCkpO1xuZXhwb3J0IHsgVW56bGliIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgWmxpYiBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY1VuemxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBabGliIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVmbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY1VuemxpYihjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiSW5mbHQsXG4gICAgICAgICAgICB6dWxlLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlLCBVbnpsaWJdOyB9XG4gICAgICAgIF0sIHRoaXMsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IFVuemxpYigpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDExKTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jVW56bGliO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jVW56bGliIH07XG5leHBvcnQgZnVuY3Rpb24gdW56bGliKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkluZmx0LFxuICAgICAgICB6dWxlLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbdW56bGliU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZih1bnpsaWJTeW5jKGV2LmRhdGFbMF0sIGd1OChldi5kYXRhWzFdKSkpOyB9LCA1LCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgWmxpYiBkYXRhXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3V0IFdoZXJlIHRvIHdyaXRlIHRoZSBkYXRhLiBTYXZlcyBtZW1vcnkgaWYgeW91IGtub3cgdGhlIGRlY29tcHJlc3NlZCBzaXplIGFuZCBwcm92aWRlIGFuIG91dHB1dCBidWZmZXIgb2YgdGhhdCBsZW5ndGguXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuemxpYlN5bmMoZGF0YSwgb3V0KSB7XG4gICAgcmV0dXJuIGluZmx0KCh6bHYoZGF0YSksIGRhdGEuc3ViYXJyYXkoMiwgLTQpKSwgb3V0KTtcbn1cbi8vIERlZmF1bHQgYWxnb3JpdGhtIGZvciBjb21wcmVzc2lvbiAodXNlZCBiZWNhdXNlIGhhdmluZyBhIGtub3duIG91dHB1dCBzaXplIGFsbG93cyBmYXN0ZXIgZGVjb21wcmVzc2lvbilcbmV4cG9ydCB7IGd6aXAgYXMgY29tcHJlc3MsIEFzeW5jR3ppcCBhcyBBc3luY0NvbXByZXNzIH07XG4vLyBEZWZhdWx0IGFsZ29yaXRobSBmb3IgY29tcHJlc3Npb24gKHVzZWQgYmVjYXVzZSBoYXZpbmcgYSBrbm93biBvdXRwdXQgc2l6ZSBhbGxvd3MgZmFzdGVyIGRlY29tcHJlc3Npb24pXG5leHBvcnQgeyBnemlwU3luYyBhcyBjb21wcmVzc1N5bmMsIEd6aXAgYXMgQ29tcHJlc3MgfTtcbi8qKlxuICogU3RyZWFtaW5nIEdaSVAsIFpsaWIsIG9yIHJhdyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIERlY29tcHJlc3MgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVjb21wcmVzc2VkXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGVjb21wcmVzcyhjYikge1xuICAgICAgICB0aGlzLkcgPSBHdW56aXA7XG4gICAgICAgIHRoaXMuSSA9IEluZmxhdGU7XG4gICAgICAgIHRoaXMuWiA9IFVuemxpYjtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVjb21wcmVzc2VkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIERlY29tcHJlc3MucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICghdGhpcy5zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wICYmIHRoaXMucC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBuLnNldCh0aGlzLnApLCBuLnNldChjaHVuaywgdGhpcy5wLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wID0gY2h1bms7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24gKCkgeyBfdGhpc18xLm9uZGF0YS5hcHBseShfdGhpc18xLCBhcmd1bWVudHMpOyB9O1xuICAgICAgICAgICAgICAgIHRoaXMucyA9ICh0aGlzLnBbMF0gPT0gMzEgJiYgdGhpcy5wWzFdID09IDEzOSAmJiB0aGlzLnBbMl0gPT0gOClcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgdGhpcy5HKGNiKVxuICAgICAgICAgICAgICAgICAgICA6ICgodGhpcy5wWzBdICYgMTUpICE9IDggfHwgKHRoaXMucFswXSA+PiA0KSA+IDcgfHwgKCh0aGlzLnBbMF0gPDwgOCB8IHRoaXMucFsxXSkgJSAzMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyB0aGlzLkkoY2IpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyB0aGlzLlooY2IpO1xuICAgICAgICAgICAgICAgIHRoaXMucy5wdXNoKHRoaXMucCwgZmluYWwpO1xuICAgICAgICAgICAgICAgIHRoaXMucCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWNvbXByZXNzO1xufSgpKTtcbmV4cG9ydCB7IERlY29tcHJlc3MgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0RlY29tcHJlc3MgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlY29tcHJlc3NlZFxuICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY0RlY29tcHJlc3MoY2IpIHtcbiAgICAgICAgdGhpcy5HID0gQXN5bmNHdW56aXA7XG4gICAgICAgIHRoaXMuSSA9IEFzeW5jSW5mbGF0ZTtcbiAgICAgICAgdGhpcy5aID0gQXN5bmNVbnpsaWI7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29tcHJlc3NlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBBc3luY0RlY29tcHJlc3MucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIERlY29tcHJlc3MucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jRGVjb21wcmVzcztcbn0oKSk7XG5leHBvcnQgeyBBc3luY0RlY29tcHJlc3MgfTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXByZXNzKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIChkYXRhWzBdID09IDMxICYmIGRhdGFbMV0gPT0gMTM5ICYmIGRhdGFbMl0gPT0gOClcbiAgICAgICAgPyBndW56aXAoZGF0YSwgb3B0cywgY2IpXG4gICAgICAgIDogKChkYXRhWzBdICYgMTUpICE9IDggfHwgKGRhdGFbMF0gPj4gNCkgPiA3IHx8ICgoZGF0YVswXSA8PCA4IHwgZGF0YVsxXSkgJSAzMSkpXG4gICAgICAgICAgICA/IGluZmxhdGUoZGF0YSwgb3B0cywgY2IpXG4gICAgICAgICAgICA6IHVuemxpYihkYXRhLCBvcHRzLCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgY29tcHJlc3NlZCBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkYXRhLCBhdXRvbWF0aWNhbGx5IGRldGVjdGluZyB0aGUgZm9ybWF0XG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3V0IFdoZXJlIHRvIHdyaXRlIHRoZSBkYXRhLiBTYXZlcyBtZW1vcnkgaWYgeW91IGtub3cgdGhlIGRlY29tcHJlc3NlZCBzaXplIGFuZCBwcm92aWRlIGFuIG91dHB1dCBidWZmZXIgb2YgdGhhdCBsZW5ndGguXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcHJlc3NTeW5jKGRhdGEsIG91dCkge1xuICAgIHJldHVybiAoZGF0YVswXSA9PSAzMSAmJiBkYXRhWzFdID09IDEzOSAmJiBkYXRhWzJdID09IDgpXG4gICAgICAgID8gZ3VuemlwU3luYyhkYXRhLCBvdXQpXG4gICAgICAgIDogKChkYXRhWzBdICYgMTUpICE9IDggfHwgKGRhdGFbMF0gPj4gNCkgPiA3IHx8ICgoZGF0YVswXSA8PCA4IHwgZGF0YVsxXSkgJSAzMSkpXG4gICAgICAgICAgICA/IGluZmxhdGVTeW5jKGRhdGEsIG91dClcbiAgICAgICAgICAgIDogdW56bGliU3luYyhkYXRhLCBvdXQpO1xufVxuLy8gZmxhdHRlbiBhIGRpcmVjdG9yeSBzdHJ1Y3R1cmVcbnZhciBmbHRuID0gZnVuY3Rpb24gKGQsIHAsIHQsIG8pIHtcbiAgICBmb3IgKHZhciBrIGluIGQpIHtcbiAgICAgICAgdmFyIHZhbCA9IGRba10sIG4gPSBwICsgaywgb3AgPSBvO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKVxuICAgICAgICAgICAgb3AgPSBtcmcobywgdmFsWzFdKSwgdmFsID0gdmFsWzBdO1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgdTgpXG4gICAgICAgICAgICB0W25dID0gW3ZhbCwgb3BdO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRbbiArPSAnLyddID0gW25ldyB1OCgwKSwgb3BdO1xuICAgICAgICAgICAgZmx0bih2YWwsIG4sIHQsIG8pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIHRleHQgZW5jb2RlclxudmFyIHRlID0gdHlwZW9mIFRleHRFbmNvZGVyICE9ICd1bmRlZmluZWQnICYmIC8qI19fUFVSRV9fKi8gbmV3IFRleHRFbmNvZGVyKCk7XG4vLyB0ZXh0IGRlY29kZXJcbnZhciB0ZCA9IHR5cGVvZiBUZXh0RGVjb2RlciAhPSAndW5kZWZpbmVkJyAmJiAvKiNfX1BVUkVfXyovIG5ldyBUZXh0RGVjb2RlcigpO1xuLy8gdGV4dCBkZWNvZGVyIHN0cmVhbVxudmFyIHRkcyA9IDA7XG50cnkge1xuICAgIHRkLmRlY29kZShldCwgeyBzdHJlYW06IHRydWUgfSk7XG4gICAgdGRzID0gMTtcbn1cbmNhdGNoIChlKSB7IH1cbi8vIGRlY29kZSBVVEY4XG52YXIgZHV0ZjggPSBmdW5jdGlvbiAoZCkge1xuICAgIGZvciAodmFyIHIgPSAnJywgaSA9IDA7Oykge1xuICAgICAgICB2YXIgYyA9IGRbaSsrXTtcbiAgICAgICAgdmFyIGViID0gKGMgPiAxMjcpICsgKGMgPiAyMjMpICsgKGMgPiAyMzkpO1xuICAgICAgICBpZiAoaSArIGViID4gZC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gW3IsIHNsYyhkLCBpIC0gMSldO1xuICAgICAgICBpZiAoIWViKVxuICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgICBlbHNlIGlmIChlYiA9PSAzKSB7XG4gICAgICAgICAgICBjID0gKChjICYgMTUpIDw8IDE4IHwgKGRbaSsrXSAmIDYzKSA8PCAxMiB8IChkW2krK10gJiA2MykgPDwgNiB8IChkW2krK10gJiA2MykpIC0gNjU1MzYsXG4gICAgICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2IHwgKGMgPj4gMTApLCA1NjMyMCB8IChjICYgMTAyMykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGViICYgMSlcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDMxKSA8PCA2IHwgKGRbaSsrXSAmIDYzKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDE1KSA8PCAxMiB8IChkW2krK10gJiA2MykgPDwgNiB8IChkW2krK10gJiA2MykpO1xuICAgIH1cbn07XG4vKipcbiAqIFN0cmVhbWluZyBVVEYtOCBkZWNvZGluZ1xuICovXG52YXIgRGVjb2RlVVRGOCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVVRGLTggZGVjb2Rpbmcgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVjb2RlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERlY29kZVVURjgoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgaWYgKHRkcylcbiAgICAgICAgICAgIHRoaXMudCA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnAgPSBldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVjb2RlZCBmcm9tIFVURi04IGJpbmFyeVxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBEZWNvZGVVVEY4LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBmaW5hbCA9ICEhZmluYWw7XG4gICAgICAgIGlmICh0aGlzLnQpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKHRoaXMudC5kZWNvZGUoY2h1bmssIHsgc3RyZWFtOiB0cnVlIH0pLCBmaW5hbCk7XG4gICAgICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50LmRlY29kZSgpLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDgpO1xuICAgICAgICAgICAgICAgIHRoaXMudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnApXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIHZhciBkYXQgPSBuZXcgdTgodGhpcy5wLmxlbmd0aCArIGNodW5rLmxlbmd0aCk7XG4gICAgICAgIGRhdC5zZXQodGhpcy5wKTtcbiAgICAgICAgZGF0LnNldChjaHVuaywgdGhpcy5wLmxlbmd0aCk7XG4gICAgICAgIHZhciBfYSA9IGR1dGY4KGRhdCksIGNoID0gX2FbMF0sIG5wID0gX2FbMV07XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKG5wLmxlbmd0aClcbiAgICAgICAgICAgICAgICBlcnIoOCk7XG4gICAgICAgICAgICB0aGlzLnAgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucCA9IG5wO1xuICAgICAgICB0aGlzLm9uZGF0YShjaCwgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIERlY29kZVVURjg7XG59KCkpO1xuZXhwb3J0IHsgRGVjb2RlVVRGOCB9O1xuLyoqXG4gKiBTdHJlYW1pbmcgVVRGLTggZW5jb2RpbmdcbiAqL1xudmFyIEVuY29kZVVURjggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVURi04IGRlY29kaW5nIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGVuY29kZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFbmNvZGVVVEY4KGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGVuY29kZWQgdG8gVVRGLThcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIHN0cmluZyBkYXRhIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRW5jb2RlVVRGOC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdGhpcy5vbmRhdGEoc3RyVG9VOChjaHVuayksIHRoaXMuZCA9IGZpbmFsIHx8IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBFbmNvZGVVVEY4O1xufSgpKTtcbmV4cG9ydCB7IEVuY29kZVVURjggfTtcbi8qKlxuICogQ29udmVydHMgYSBzdHJpbmcgaW50byBhIFVpbnQ4QXJyYXkgZm9yIHVzZSB3aXRoIGNvbXByZXNzaW9uL2RlY29tcHJlc3Npb24gbWV0aG9kc1xuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVuY29kZVxuICogQHBhcmFtIGxhdGluMSBXaGV0aGVyIG9yIG5vdCB0byBpbnRlcnByZXQgdGhlIGRhdGEgYXMgTGF0aW4tMS4gVGhpcyBzaG91bGRcbiAqICAgICAgICAgICAgICAgbm90IG5lZWQgdG8gYmUgdHJ1ZSB1bmxlc3MgZGVjb2RpbmcgYSBiaW5hcnkgc3RyaW5nLlxuICogQHJldHVybnMgVGhlIHN0cmluZyBlbmNvZGVkIGluIFVURi04L0xhdGluLTEgYmluYXJ5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJUb1U4KHN0ciwgbGF0aW4xKSB7XG4gICAgaWYgKGxhdGluMSkge1xuICAgICAgICB2YXIgYXJfMSA9IG5ldyB1OChzdHIubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBhcl8xW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHJldHVybiBhcl8xO1xuICAgIH1cbiAgICBpZiAodGUpXG4gICAgICAgIHJldHVybiB0ZS5lbmNvZGUoc3RyKTtcbiAgICB2YXIgbCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIGFyID0gbmV3IHU4KHN0ci5sZW5ndGggKyAoc3RyLmxlbmd0aCA+PiAxKSk7XG4gICAgdmFyIGFpID0gMDtcbiAgICB2YXIgdyA9IGZ1bmN0aW9uICh2KSB7IGFyW2FpKytdID0gdjsgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgICBpZiAoYWkgKyA1ID4gYXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbiA9IG5ldyB1OChhaSArIDggKyAoKGwgLSBpKSA8PCAxKSk7XG4gICAgICAgICAgICBuLnNldChhcik7XG4gICAgICAgICAgICBhciA9IG47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAxMjggfHwgbGF0aW4xKVxuICAgICAgICAgICAgdyhjKTtcbiAgICAgICAgZWxzZSBpZiAoYyA8IDIwNDgpXG4gICAgICAgICAgICB3KDE5MiB8IChjID4+IDYpKSwgdygxMjggfCAoYyAmIDYzKSk7XG4gICAgICAgIGVsc2UgaWYgKGMgPiA1NTI5NSAmJiBjIDwgNTczNDQpXG4gICAgICAgICAgICBjID0gNjU1MzYgKyAoYyAmIDEwMjMgPDwgMTApIHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAxMDIzKSxcbiAgICAgICAgICAgICAgICB3KDI0MCB8IChjID4+IDE4KSksIHcoMTI4IHwgKChjID4+IDEyKSAmIDYzKSksIHcoMTI4IHwgKChjID4+IDYpICYgNjMpKSwgdygxMjggfCAoYyAmIDYzKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHcoMjI0IHwgKGMgPj4gMTIpKSwgdygxMjggfCAoKGMgPj4gNikgJiA2MykpLCB3KDEyOCB8IChjICYgNjMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHNsYyhhciwgMCwgYWkpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIFVpbnQ4QXJyYXkgdG8gYSBzdHJpbmdcbiAqIEBwYXJhbSBkYXQgVGhlIGRhdGEgdG8gZGVjb2RlIHRvIHN0cmluZ1xuICogQHBhcmFtIGxhdGluMSBXaGV0aGVyIG9yIG5vdCB0byBpbnRlcnByZXQgdGhlIGRhdGEgYXMgTGF0aW4tMS4gVGhpcyBzaG91bGRcbiAqICAgICAgICAgICAgICAgbm90IG5lZWQgdG8gYmUgdHJ1ZSB1bmxlc3MgZW5jb2RpbmcgdG8gYmluYXJ5IHN0cmluZy5cbiAqIEByZXR1cm5zIFRoZSBvcmlnaW5hbCBVVEYtOC9MYXRpbi0xIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyRnJvbVU4KGRhdCwgbGF0aW4xKSB7XG4gICAgaWYgKGxhdGluMSkge1xuICAgICAgICB2YXIgciA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdC5sZW5ndGg7IGkgKz0gMTYzODQpXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgZGF0LnN1YmFycmF5KGksIGkgKyAxNjM4NCkpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgZWxzZSBpZiAodGQpXG4gICAgICAgIHJldHVybiB0ZC5kZWNvZGUoZGF0KTtcbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIF9hID0gZHV0ZjgoZGF0KSwgb3V0ID0gX2FbMF0sIGV4dCA9IF9hWzFdO1xuICAgICAgICBpZiAoZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG59XG47XG4vLyBkZWZsYXRlIGJpdCBmbGFnXG52YXIgZGJmID0gZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwgPT0gMSA/IDMgOiBsIDwgNiA/IDIgOiBsID09IDkgPyAxIDogMDsgfTtcbi8vIHNraXAgbG9jYWwgemlwIGhlYWRlclxudmFyIHNsemggPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gYiArIDMwICsgYjIoZCwgYiArIDI2KSArIGIyKGQsIGIgKyAyOCk7IH07XG4vLyByZWFkIHppcCBoZWFkZXJcbnZhciB6aCA9IGZ1bmN0aW9uIChkLCBiLCB6KSB7XG4gICAgdmFyIGZubCA9IGIyKGQsIGIgKyAyOCksIGZuID0gc3RyRnJvbVU4KGQuc3ViYXJyYXkoYiArIDQ2LCBiICsgNDYgKyBmbmwpLCAhKGIyKGQsIGIgKyA4KSAmIDIwNDgpKSwgZXMgPSBiICsgNDYgKyBmbmwsIGJzID0gYjQoZCwgYiArIDIwKTtcbiAgICB2YXIgX2EgPSB6ICYmIGJzID09IDQyOTQ5NjcyOTUgPyB6NjRlKGQsIGVzKSA6IFticywgYjQoZCwgYiArIDI0KSwgYjQoZCwgYiArIDQyKV0sIHNjID0gX2FbMF0sIHN1ID0gX2FbMV0sIG9mZiA9IF9hWzJdO1xuICAgIHJldHVybiBbYjIoZCwgYiArIDEwKSwgc2MsIHN1LCBmbiwgZXMgKyBiMihkLCBiICsgMzApICsgYjIoZCwgYiArIDMyKSwgb2ZmXTtcbn07XG4vLyByZWFkIHppcDY0IGV4dHJhIGZpZWxkXG52YXIgejY0ZSA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICg7IGIyKGQsIGIpICE9IDE7IGIgKz0gNCArIGIyKGQsIGIgKyAyKSlcbiAgICAgICAgO1xuICAgIHJldHVybiBbYjgoZCwgYiArIDEyKSwgYjgoZCwgYiArIDQpLCBiOChkLCBiICsgMjApXTtcbn07XG4vLyBleHRyYSBmaWVsZCBsZW5ndGhcbnZhciBleGZsID0gZnVuY3Rpb24gKGV4KSB7XG4gICAgdmFyIGxlID0gMDtcbiAgICBpZiAoZXgpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBleCkge1xuICAgICAgICAgICAgdmFyIGwgPSBleFtrXS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobCA+IDY1NTM1KVxuICAgICAgICAgICAgICAgIGVycig5KTtcbiAgICAgICAgICAgIGxlICs9IGwgKyA0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZTtcbn07XG4vLyB3cml0ZSB6aXAgaGVhZGVyXG52YXIgd3poID0gZnVuY3Rpb24gKGQsIGIsIGYsIGZuLCB1LCBjLCBjZSwgY28pIHtcbiAgICB2YXIgZmwgPSBmbi5sZW5ndGgsIGV4ID0gZi5leHRyYSwgY29sID0gY28gJiYgY28ubGVuZ3RoO1xuICAgIHZhciBleGwgPSBleGZsKGV4KTtcbiAgICB3Ynl0ZXMoZCwgYiwgY2UgIT0gbnVsbCA/IDB4MjAxNEI1MCA6IDB4NDAzNEI1MCksIGIgKz0gNDtcbiAgICBpZiAoY2UgIT0gbnVsbClcbiAgICAgICAgZFtiKytdID0gMjAsIGRbYisrXSA9IGYub3M7XG4gICAgZFtiXSA9IDIwLCBiICs9IDI7IC8vIHNwZWMgY29tcGxpYW5jZT8gd2hhdCdzIHRoYXQ/XG4gICAgZFtiKytdID0gKGYuZmxhZyA8PCAxKSB8IChjIDwgMCAmJiA4KSwgZFtiKytdID0gdSAmJiA4O1xuICAgIGRbYisrXSA9IGYuY29tcHJlc3Npb24gJiAyNTUsIGRbYisrXSA9IGYuY29tcHJlc3Npb24gPj4gODtcbiAgICB2YXIgZHQgPSBuZXcgRGF0ZShmLm10aW1lID09IG51bGwgPyBEYXRlLm5vdygpIDogZi5tdGltZSksIHkgPSBkdC5nZXRGdWxsWWVhcigpIC0gMTk4MDtcbiAgICBpZiAoeSA8IDAgfHwgeSA+IDExOSlcbiAgICAgICAgZXJyKDEwKTtcbiAgICB3Ynl0ZXMoZCwgYiwgKHkgPDwgMjUpIHwgKChkdC5nZXRNb250aCgpICsgMSkgPDwgMjEpIHwgKGR0LmdldERhdGUoKSA8PCAxNikgfCAoZHQuZ2V0SG91cnMoKSA8PCAxMSkgfCAoZHQuZ2V0TWludXRlcygpIDw8IDUpIHwgKGR0LmdldFNlY29uZHMoKSA+Pj4gMSkpLCBiICs9IDQ7XG4gICAgaWYgKGMgIT0gLTEpIHtcbiAgICAgICAgd2J5dGVzKGQsIGIsIGYuY3JjKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA0LCBjIDwgMCA/IC1jIC0gMiA6IGMpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDgsIGYuc2l6ZSk7XG4gICAgfVxuICAgIHdieXRlcyhkLCBiICsgMTIsIGZsKTtcbiAgICB3Ynl0ZXMoZCwgYiArIDE0LCBleGwpLCBiICs9IDE2O1xuICAgIGlmIChjZSAhPSBudWxsKSB7XG4gICAgICAgIHdieXRlcyhkLCBiLCBjb2wpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDYsIGYuYXR0cnMpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDEwLCBjZSksIGIgKz0gMTQ7XG4gICAgfVxuICAgIGQuc2V0KGZuLCBiKTtcbiAgICBiICs9IGZsO1xuICAgIGlmIChleGwpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBleCkge1xuICAgICAgICAgICAgdmFyIGV4ZiA9IGV4W2tdLCBsID0gZXhmLmxlbmd0aDtcbiAgICAgICAgICAgIHdieXRlcyhkLCBiLCArayk7XG4gICAgICAgICAgICB3Ynl0ZXMoZCwgYiArIDIsIGwpO1xuICAgICAgICAgICAgZC5zZXQoZXhmLCBiICsgNCksIGIgKz0gNCArIGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbClcbiAgICAgICAgZC5zZXQoY28sIGIpLCBiICs9IGNvbDtcbiAgICByZXR1cm4gYjtcbn07XG4vLyB3cml0ZSB6aXAgZm9vdGVyIChlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkpXG52YXIgd3pmID0gZnVuY3Rpb24gKG8sIGIsIGMsIGQsIGUpIHtcbiAgICB3Ynl0ZXMobywgYiwgMHg2MDU0QjUwKTsgLy8gc2tpcCBkaXNrXG4gICAgd2J5dGVzKG8sIGIgKyA4LCBjKTtcbiAgICB3Ynl0ZXMobywgYiArIDEwLCBjKTtcbiAgICB3Ynl0ZXMobywgYiArIDEyLCBkKTtcbiAgICB3Ynl0ZXMobywgYiArIDE2LCBlKTtcbn07XG4vKipcbiAqIEEgcGFzcy10aHJvdWdoIHN0cmVhbSB0byBrZWVwIGRhdGEgdW5jb21wcmVzc2VkIGluIGEgWklQIGFyY2hpdmUuXG4gKi9cbnZhciBaaXBQYXNzVGhyb3VnaCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGFzcy10aHJvdWdoIHN0cmVhbSB0aGF0IGNhbiBiZSBhZGRlZCB0byBaSVAgYXJjaGl2ZXNcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgVGhlIGZpbGVuYW1lIHRvIGFzc29jaWF0ZSB3aXRoIHRoaXMgZGF0YSBzdHJlYW1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXBQYXNzVGhyb3VnaChmaWxlbmFtZSkge1xuICAgICAgICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG4gICAgICAgIHRoaXMuYyA9IGNyYygpO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIGEgY2h1bmsgYW5kIHB1c2hlcyB0byB0aGUgb3V0cHV0IHN0cmVhbS4gWW91IGNhbiBvdmVycmlkZSB0aGlzXG4gICAgICogbWV0aG9kIGluIGEgc3ViY2xhc3MgZm9yIGN1c3RvbSBiZWhhdmlvciwgYnV0IGJ5IGRlZmF1bHQgdGhpcyBwYXNzZXNcbiAgICAgKiB0aGUgZGF0YSB0aHJvdWdoLiBZb3UgbXVzdCBjYWxsIHRoaXMub25kYXRhKGVyciwgY2h1bmssIGZpbmFsKSBhdCBzb21lXG4gICAgICogcG9pbnQgaW4gdGhpcyBtZXRob2QuXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwcm9jZXNzXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgYWRkZWQuIElmIHlvdSBhcmUgc3ViY2xhc3NpbmcgdGhpcyB3aXRoIGEgY3VzdG9tXG4gICAgICogY29tcHJlc3Npb24gYWxnb3JpdGhtLCBub3RlIHRoYXQgeW91IG11c3QgcHVzaCBkYXRhIGZyb20gdGhlIHNvdXJjZVxuICAgICAqIGZpbGUgb25seSwgcHJlLWNvbXByZXNzaW9uLlxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgdGhpcy5jLnAoY2h1bmspO1xuICAgICAgICB0aGlzLnNpemUgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICBpZiAoZmluYWwpXG4gICAgICAgICAgICB0aGlzLmNyYyA9IHRoaXMuYy5kKCk7XG4gICAgICAgIHRoaXMucHJvY2VzcyhjaHVuaywgZmluYWwgfHwgZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIFppcFBhc3NUaHJvdWdoO1xufSgpKTtcbmV4cG9ydCB7IFppcFBhc3NUaHJvdWdoIH07XG4vLyBJIGRvbid0IGV4dGVuZCBiZWNhdXNlIFR5cGVTY3JpcHQgZXh0ZW5zaW9uIGFkZHMgMWtCIG9mIHJ1bnRpbWUgYmxvYXRcbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlcy4gUHJlZmVyIHVzaW5nIEFzeW5jWmlwRGVmbGF0ZVxuICogZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICovXG52YXIgWmlwRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXBEZWZsYXRlKGZpbGVuYW1lLCBvcHRzKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKCFvcHRzKVxuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5jYWxsKHRoaXMsIGZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5kID0gbmV3IERlZmxhdGUob3B0cywgZnVuY3Rpb24gKGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgIF90aGlzXzEub25kYXRhKG51bGwsIGRhdCwgZmluYWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvbiA9IDg7XG4gICAgICAgIHRoaXMuZmxhZyA9IGRiZihvcHRzLmxldmVsKTtcbiAgICB9XG4gICAgWmlwRGVmbGF0ZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZC5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGUsIG51bGwsIGZpbmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmlwRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIFppcERlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgWmlwRGVmbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlc1xuICovXG52YXIgQXN5bmNaaXBEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBERUZMQVRFIHN0cmVhbSB0aGF0IGNhbiBiZSBhZGRlZCB0byBaSVAgYXJjaGl2ZXNcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgVGhlIGZpbGVuYW1lIHRvIGFzc29jaWF0ZSB3aXRoIHRoaXMgZGF0YSBzdHJlYW1cbiAgICAgKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jWmlwRGVmbGF0ZShmaWxlbmFtZSwgb3B0cykge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICghb3B0cylcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2guY2FsbCh0aGlzLCBmaWxlbmFtZSk7XG4gICAgICAgIHRoaXMuZCA9IG5ldyBBc3luY0RlZmxhdGUob3B0cywgZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29tcHJlc3Npb24gPSA4O1xuICAgICAgICB0aGlzLmZsYWcgPSBkYmYob3B0cy5sZXZlbCk7XG4gICAgICAgIHRoaXMudGVybWluYXRlID0gdGhpcy5kLnRlcm1pbmF0ZTtcbiAgICB9XG4gICAgQXN5bmNaaXBEZWZsYXRlLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLmQucHVzaChjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgQXN5bmNaaXBEZWZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNaaXBEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jWmlwRGVmbGF0ZSB9O1xuLy8gVE9ETzogQmV0dGVyIHRyZWUgc2hha2luZ1xuLyoqXG4gKiBBIHppcHBhYmxlIGFyY2hpdmUgdG8gd2hpY2ggZmlsZXMgY2FuIGluY3JlbWVudGFsbHkgYmUgYWRkZWRcbiAqL1xudmFyIFppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IFpJUCBhcmNoaXZlIHRvIHdoaWNoIGZpbGVzIGNhbiBiZSBhZGRlZFxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGZvciB0aGUgZ2VuZXJhdGVkIFpJUCBhcmNoaXZlXG4gICAgICogICAgICAgICAgIGlzIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFppcChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICB0aGlzLnUgPSBbXTtcbiAgICAgICAgdGhpcy5kID0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGZpbGUgdG8gdGhlIFpJUCBhcmNoaXZlXG4gICAgICogQHBhcmFtIGZpbGUgVGhlIGZpbGUgc3RyZWFtIHRvIGFkZFxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICAvLyBmaW5pc2hpbmcgb3IgZmluaXNoZWRcbiAgICAgICAgaWYgKHRoaXMuZCAmIDIpXG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlcnIoNCArICh0aGlzLmQgJiAxKSAqIDgsIDAsIDEpLCBudWxsLCBmYWxzZSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGYgPSBzdHJUb1U4KGZpbGUuZmlsZW5hbWUpLCBmbF8xID0gZi5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY29tID0gZmlsZS5jb21tZW50LCBvID0gY29tICYmIHN0clRvVTgoY29tKTtcbiAgICAgICAgICAgIHZhciB1ID0gZmxfMSAhPSBmaWxlLmZpbGVuYW1lLmxlbmd0aCB8fCAobyAmJiAoY29tLmxlbmd0aCAhPSBvLmxlbmd0aCkpO1xuICAgICAgICAgICAgdmFyIGhsXzEgPSBmbF8xICsgZXhmbChmaWxlLmV4dHJhKSArIDMwO1xuICAgICAgICAgICAgaWYgKGZsXzEgPiA2NTUzNSlcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGF0YShlcnIoMTEsIDAsIDEpLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gbmV3IHU4KGhsXzEpO1xuICAgICAgICAgICAgd3poKGhlYWRlciwgMCwgZmlsZSwgZiwgdSwgLTEpO1xuICAgICAgICAgICAgdmFyIGNoa3NfMSA9IFtoZWFkZXJdO1xuICAgICAgICAgICAgdmFyIHBBbGxfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNoa3NfMiA9IGNoa3NfMTsgX2kgPCBjaGtzXzIubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGsgPSBjaGtzXzJbX2ldO1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLm9uZGF0YShudWxsLCBjaGssIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hrc18xID0gW107XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHRyXzEgPSB0aGlzLmQ7XG4gICAgICAgICAgICB0aGlzLmQgPSAwO1xuICAgICAgICAgICAgdmFyIGluZF8xID0gdGhpcy51Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB1Zl8xID0gbXJnKGZpbGUsIHtcbiAgICAgICAgICAgICAgICBmOiBmLFxuICAgICAgICAgICAgICAgIHU6IHUsXG4gICAgICAgICAgICAgICAgbzogbyxcbiAgICAgICAgICAgICAgICB0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnRlcm1pbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUudGVybWluYXRlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBBbGxfMSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG54dCA9IF90aGlzXzEudVtpbmRfMSArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG54dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBueHQucigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzXzEuZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJfMSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY2xfMSA9IDA7XG4gICAgICAgICAgICBmaWxlLm9uZGF0YSA9IGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzXzEub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzXzEudGVybWluYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbF8xICs9IGRhdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNoa3NfMS5wdXNoKGRhdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRkID0gbmV3IHU4KDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgMCwgMHg4MDc0QjUwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgNCwgZmlsZS5jcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2J5dGVzKGRkLCA4LCBjbF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgMTIsIGZpbGUuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGtzXzEucHVzaChkZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1Zl8xLmMgPSBjbF8xLCB1Zl8xLmIgPSBobF8xICsgY2xfMSArIDE2LCB1Zl8xLmNyYyA9IGZpbGUuY3JjLCB1Zl8xLnNpemUgPSBmaWxlLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Zl8xLnIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyXzEgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRyXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBwQWxsXzEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy51LnB1c2godWZfMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEVuZHMgdGhlIHByb2Nlc3Mgb2YgYWRkaW5nIGZpbGVzIGFuZCBwcmVwYXJlcyB0byBlbWl0IHRoZSBmaW5hbCBjaHVua3MuXG4gICAgICogVGhpcyAqbXVzdCogYmUgY2FsbGVkIGFmdGVyIGFkZGluZyBhbGwgZGVzaXJlZCBmaWxlcyBmb3IgdGhlIHJlc3VsdGluZ1xuICAgICAqIFpJUCBmaWxlIHRvIHdvcmsgcHJvcGVybHkuXG4gICAgICovXG4gICAgWmlwLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuZCAmIDIpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGVycig0ICsgKHRoaXMuZCAmIDEpICogOCwgMCwgMSksIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICB0aGlzLmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy51LnB1c2goe1xuICAgICAgICAgICAgICAgIHI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoX3RoaXNfMS5kICYgMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIF90aGlzXzEudS5zcGxpY2UoLTEsIDEpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLmUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHQ6IGZ1bmN0aW9uICgpIHsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZCA9IDM7XG4gICAgfTtcbiAgICBaaXAucHJvdG90eXBlLmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidCA9IDAsIGwgPSAwLCB0bCA9IDA7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnU7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgZiA9IF9hW19pXTtcbiAgICAgICAgICAgIHRsICs9IDQ2ICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSkgKyAoZi5vID8gZi5vLmxlbmd0aCA6IDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdXQgPSBuZXcgdTgodGwgKyAyMik7XG4gICAgICAgIGZvciAodmFyIF9iID0gMCwgX2MgPSB0aGlzLnU7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICB2YXIgZiA9IF9jW19iXTtcbiAgICAgICAgICAgIHd6aChvdXQsIGJ0LCBmLCBmLmYsIGYudSwgLWYuYyAtIDIsIGwsIGYubyk7XG4gICAgICAgICAgICBidCArPSA0NiArIGYuZi5sZW5ndGggKyBleGZsKGYuZXh0cmEpICsgKGYubyA/IGYuby5sZW5ndGggOiAwKSwgbCArPSBmLmI7XG4gICAgICAgIH1cbiAgICAgICAgd3pmKG91dCwgYnQsIHRoaXMudS5sZW5ndGgsIHRsLCBsKTtcbiAgICAgICAgdGhpcy5vbmRhdGEobnVsbCwgb3V0LCB0cnVlKTtcbiAgICAgICAgdGhpcy5kID0gMjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEEgbWV0aG9kIHRvIHRlcm1pbmF0ZSBhbnkgaW50ZXJuYWwgd29ya2VycyB1c2VkIGJ5IHRoZSBzdHJlYW0uIFN1YnNlcXVlbnRcbiAgICAgKiBjYWxscyB0byBhZGQoKSB3aWxsIGZhaWwuXG4gICAgICovXG4gICAgWmlwLnByb3RvdHlwZS50ZXJtaW5hdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnU7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgZiA9IF9hW19pXTtcbiAgICAgICAgICAgIGYudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZCA9IDI7XG4gICAgfTtcbiAgICByZXR1cm4gWmlwO1xufSgpKTtcbmV4cG9ydCB7IFppcCB9O1xuZXhwb3J0IGZ1bmN0aW9uIHppcChkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHZhciByID0ge307XG4gICAgZmx0bihkYXRhLCAnJywgciwgb3B0cyk7XG4gICAgdmFyIGsgPSBPYmplY3Qua2V5cyhyKTtcbiAgICB2YXIgbGZ0ID0gay5sZW5ndGgsIG8gPSAwLCB0b3QgPSAwO1xuICAgIHZhciBzbGZ0ID0gbGZ0LCBmaWxlcyA9IG5ldyBBcnJheShsZnQpO1xuICAgIHZhciB0ZXJtID0gW107XG4gICAgdmFyIHRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVybS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIHRlcm1baV0oKTtcbiAgICB9O1xuICAgIHZhciBjYmQgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBtdChmdW5jdGlvbiAoKSB7IGNiKGEsIGIpOyB9KTtcbiAgICB9O1xuICAgIG10KGZ1bmN0aW9uICgpIHsgY2JkID0gY2I7IH0pO1xuICAgIHZhciBjYmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvdXQgPSBuZXcgdTgodG90ICsgMjIpLCBvZSA9IG8sIGNkbCA9IHRvdCAtIG87XG4gICAgICAgIHRvdCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xmdDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgZiA9IGZpbGVzW2ldO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGYuYy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd3poKG91dCwgdG90LCBmLCBmLmYsIGYudSwgbCk7XG4gICAgICAgICAgICAgICAgdmFyIGJhZGQgPSAzMCArIGYuZi5sZW5ndGggKyBleGZsKGYuZXh0cmEpO1xuICAgICAgICAgICAgICAgIHZhciBsb2MgPSB0b3QgKyBiYWRkO1xuICAgICAgICAgICAgICAgIG91dC5zZXQoZi5jLCBsb2MpO1xuICAgICAgICAgICAgICAgIHd6aChvdXQsIG8sIGYsIGYuZiwgZi51LCBsLCB0b3QsIGYubSksIG8gKz0gMTYgKyBiYWRkICsgKGYubSA/IGYubS5sZW5ndGggOiAwKSwgdG90ID0gbG9jICsgbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiZChlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3emYob3V0LCBvLCBmaWxlcy5sZW5ndGgsIGNkbCwgb2UpO1xuICAgICAgICBjYmQobnVsbCwgb3V0KTtcbiAgICB9O1xuICAgIGlmICghbGZ0KVxuICAgICAgICBjYmYoKTtcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBmbiA9IGtbaV07XG4gICAgICAgIHZhciBfYSA9IHJbZm5dLCBmaWxlID0gX2FbMF0sIHAgPSBfYVsxXTtcbiAgICAgICAgdmFyIGMgPSBjcmMoKSwgc2l6ZSA9IGZpbGUubGVuZ3RoO1xuICAgICAgICBjLnAoZmlsZSk7XG4gICAgICAgIHZhciBmID0gc3RyVG9VOChmbiksIHMgPSBmLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvbSA9IHAuY29tbWVudCwgbSA9IGNvbSAmJiBzdHJUb1U4KGNvbSksIG1zID0gbSAmJiBtLmxlbmd0aDtcbiAgICAgICAgdmFyIGV4bCA9IGV4ZmwocC5leHRyYSk7XG4gICAgICAgIHZhciBjb21wcmVzc2lvbiA9IHAubGV2ZWwgPT0gMCA/IDAgOiA4O1xuICAgICAgICB2YXIgY2JsID0gZnVuY3Rpb24gKGUsIGQpIHtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgdEFsbCgpO1xuICAgICAgICAgICAgICAgIGNiZChlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBsID0gZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZmlsZXNbaV0gPSBtcmcocCwge1xuICAgICAgICAgICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgICAgICAgICBjcmM6IGMuZCgpLFxuICAgICAgICAgICAgICAgICAgICBjOiBkLFxuICAgICAgICAgICAgICAgICAgICBmOiBmLFxuICAgICAgICAgICAgICAgICAgICBtOiBtLFxuICAgICAgICAgICAgICAgICAgICB1OiBzICE9IGZuLmxlbmd0aCB8fCAobSAmJiAoY29tLmxlbmd0aCAhPSBtcykpLFxuICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogY29tcHJlc3Npb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvICs9IDMwICsgcyArIGV4bCArIGw7XG4gICAgICAgICAgICAgICAgdG90ICs9IDc2ICsgMiAqIChzICsgZXhsKSArIChtcyB8fCAwKSArIGw7XG4gICAgICAgICAgICAgICAgaWYgKCEtLWxmdClcbiAgICAgICAgICAgICAgICAgICAgY2JmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzID4gNjU1MzUpXG4gICAgICAgICAgICBjYmwoZXJyKDExLCAwLCAxKSwgbnVsbCk7XG4gICAgICAgIGlmICghY29tcHJlc3Npb24pXG4gICAgICAgICAgICBjYmwobnVsbCwgZmlsZSk7XG4gICAgICAgIGVsc2UgaWYgKHNpemUgPCAxNjAwMDApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2JsKG51bGwsIGRlZmxhdGVTeW5jKGZpbGUsIHApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY2JsKGUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRlcm0ucHVzaChkZWZsYXRlKGZpbGUsIHAsIGNibCkpO1xuICAgIH07XG4gICAgLy8gQ2Fubm90IHVzZSBsZnQgYmVjYXVzZSBpdCBjYW4gZGVjcmVhc2VcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsZnQ7ICsraSkge1xuICAgICAgICBfbG9vcF8xKGkpO1xuICAgIH1cbiAgICByZXR1cm4gdEFsbDtcbn1cbi8qKlxuICogU3luY2hyb25vdXNseSBjcmVhdGVzIGEgWklQIGZpbGUuIFByZWZlciB1c2luZyBgemlwYCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gKiB3aXRoIG1vcmUgdGhhbiBvbmUgZmlsZS5cbiAqIEBwYXJhbSBkYXRhIFRoZSBkaXJlY3Rvcnkgc3RydWN0dXJlIGZvciB0aGUgWklQIGFyY2hpdmVcbiAqIEBwYXJhbSBvcHRzIFRoZSBtYWluIG9wdGlvbnMsIG1lcmdlZCB3aXRoIHBlci1maWxlIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBnZW5lcmF0ZWQgWklQIGFyY2hpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN5bmMoZGF0YSwgb3B0cykge1xuICAgIGlmICghb3B0cylcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgIHZhciByID0ge307XG4gICAgdmFyIGZpbGVzID0gW107XG4gICAgZmx0bihkYXRhLCAnJywgciwgb3B0cyk7XG4gICAgdmFyIG8gPSAwO1xuICAgIHZhciB0b3QgPSAwO1xuICAgIGZvciAodmFyIGZuIGluIHIpIHtcbiAgICAgICAgdmFyIF9hID0gcltmbl0sIGZpbGUgPSBfYVswXSwgcCA9IF9hWzFdO1xuICAgICAgICB2YXIgY29tcHJlc3Npb24gPSBwLmxldmVsID09IDAgPyAwIDogODtcbiAgICAgICAgdmFyIGYgPSBzdHJUb1U4KGZuKSwgcyA9IGYubGVuZ3RoO1xuICAgICAgICB2YXIgY29tID0gcC5jb21tZW50LCBtID0gY29tICYmIHN0clRvVTgoY29tKSwgbXMgPSBtICYmIG0ubGVuZ3RoO1xuICAgICAgICB2YXIgZXhsID0gZXhmbChwLmV4dHJhKTtcbiAgICAgICAgaWYgKHMgPiA2NTUzNSlcbiAgICAgICAgICAgIGVycigxMSk7XG4gICAgICAgIHZhciBkID0gY29tcHJlc3Npb24gPyBkZWZsYXRlU3luYyhmaWxlLCBwKSA6IGZpbGUsIGwgPSBkLmxlbmd0aDtcbiAgICAgICAgdmFyIGMgPSBjcmMoKTtcbiAgICAgICAgYy5wKGZpbGUpO1xuICAgICAgICBmaWxlcy5wdXNoKG1yZyhwLCB7XG4gICAgICAgICAgICBzaXplOiBmaWxlLmxlbmd0aCxcbiAgICAgICAgICAgIGNyYzogYy5kKCksXG4gICAgICAgICAgICBjOiBkLFxuICAgICAgICAgICAgZjogZixcbiAgICAgICAgICAgIG06IG0sXG4gICAgICAgICAgICB1OiBzICE9IGZuLmxlbmd0aCB8fCAobSAmJiAoY29tLmxlbmd0aCAhPSBtcykpLFxuICAgICAgICAgICAgbzogbyxcbiAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjb21wcmVzc2lvblxuICAgICAgICB9KSk7XG4gICAgICAgIG8gKz0gMzAgKyBzICsgZXhsICsgbDtcbiAgICAgICAgdG90ICs9IDc2ICsgMiAqIChzICsgZXhsKSArIChtcyB8fCAwKSArIGw7XG4gICAgfVxuICAgIHZhciBvdXQgPSBuZXcgdTgodG90ICsgMjIpLCBvZSA9IG8sIGNkbCA9IHRvdCAtIG87XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgZiA9IGZpbGVzW2ldO1xuICAgICAgICB3emgob3V0LCBmLm8sIGYsIGYuZiwgZi51LCBmLmMubGVuZ3RoKTtcbiAgICAgICAgdmFyIGJhZGQgPSAzMCArIGYuZi5sZW5ndGggKyBleGZsKGYuZXh0cmEpO1xuICAgICAgICBvdXQuc2V0KGYuYywgZi5vICsgYmFkZCk7XG4gICAgICAgIHd6aChvdXQsIG8sIGYsIGYuZiwgZi51LCBmLmMubGVuZ3RoLCBmLm8sIGYubSksIG8gKz0gMTYgKyBiYWRkICsgKGYubSA/IGYubS5sZW5ndGggOiAwKTtcbiAgICB9XG4gICAgd3pmKG91dCwgbywgZmlsZXMubGVuZ3RoLCBjZGwsIG9lKTtcbiAgICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgcGFzcy10aHJvdWdoIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlc1xuICovXG52YXIgVW56aXBQYXNzVGhyb3VnaCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVbnppcFBhc3NUaHJvdWdoKCkge1xuICAgIH1cbiAgICBVbnppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIGZpbmFsKSB7XG4gICAgICAgIHRoaXMub25kYXRhKG51bGwsIGRhdGEsIGZpbmFsKTtcbiAgICB9O1xuICAgIFVuemlwUGFzc1Rocm91Z2guY29tcHJlc3Npb24gPSAwO1xuICAgIHJldHVybiBVbnppcFBhc3NUaHJvdWdoO1xufSgpKTtcbmV4cG9ydCB7IFVuemlwUGFzc1Rocm91Z2ggfTtcbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgZGVjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzLiBQcmVmZXIgQXN5bmNaaXBJbmZsYXRlIGZvclxuICogYmV0dGVyIHBlcmZvcm1hbmNlLlxuICovXG52YXIgVW56aXBJbmZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBERUZMQVRFIGRlY29tcHJlc3Npb24gdGhhdCBjYW4gYmUgdXNlZCBpbiBaSVAgYXJjaGl2ZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVbnppcEluZmxhdGUoKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgdGhpcy5pID0gbmV3IEluZmxhdGUoZnVuY3Rpb24gKGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgIF90aGlzXzEub25kYXRhKG51bGwsIGRhdCwgZmluYWwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgVW56aXBJbmZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIGZpbmFsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmkucHVzaChkYXRhLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGUsIG51bGwsIGZpbmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVW56aXBJbmZsYXRlLmNvbXByZXNzaW9uID0gODtcbiAgICByZXR1cm4gVW56aXBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IFVuemlwSW5mbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgZGVjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzXG4gKi9cbnZhciBBc3luY1VuemlwSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBkZWNvbXByZXNzaW9uIHRoYXQgY2FuIGJlIHVzZWQgaW4gWklQIGFyY2hpdmVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNVbnppcEluZmxhdGUoXywgc3opIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAoc3ogPCAzMjAwMDApIHtcbiAgICAgICAgICAgIHRoaXMuaSA9IG5ldyBJbmZsYXRlKGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEobnVsbCwgZGF0LCBmaW5hbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaSA9IG5ldyBBc3luY0luZmxhdGUoZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIF90aGlzXzEub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudGVybWluYXRlID0gdGhpcy5pLnRlcm1pbmF0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBc3luY1VuemlwSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICBpZiAodGhpcy5pLnRlcm1pbmF0ZSlcbiAgICAgICAgICAgIGRhdGEgPSBzbGMoZGF0YSwgMCk7XG4gICAgICAgIHRoaXMuaS5wdXNoKGRhdGEsIGZpbmFsKTtcbiAgICB9O1xuICAgIEFzeW5jVW56aXBJbmZsYXRlLmNvbXByZXNzaW9uID0gODtcbiAgICByZXR1cm4gQXN5bmNVbnppcEluZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNVbnppcEluZmxhdGUgfTtcbi8qKlxuICogQSBaSVAgYXJjaGl2ZSBkZWNvbXByZXNzaW9uIHN0cmVhbSB0aGF0IGVtaXRzIGZpbGVzIGFzIHRoZXkgYXJlIGRpc2NvdmVyZWRcbiAqL1xudmFyIFVuemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBaSVAgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgYSBmaWxlIGluIHRoZSBaSVAgYXJjaGl2ZSBpcyBmb3VuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVuemlwKGNiKSB7XG4gICAgICAgIHRoaXMub25maWxlID0gY2I7XG4gICAgICAgIHRoaXMuayA9IFtdO1xuICAgICAgICB0aGlzLm8gPSB7XG4gICAgICAgICAgICAwOiBVbnppcFBhc3NUaHJvdWdoXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucCA9IGV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB1bnppcHBlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBVbnppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMub25maWxlKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAoIXRoaXMucClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgaWYgKHRoaXMuYyA+IDApIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbih0aGlzLmMsIGNodW5rLmxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgdG9BZGQgPSBjaHVuay5zdWJhcnJheSgwLCBsZW4pO1xuICAgICAgICAgICAgdGhpcy5jIC09IGxlbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICAgICAgdGhpcy5kLnB1c2godG9BZGQsICF0aGlzLmMpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMua1swXS5wdXNoKHRvQWRkKTtcbiAgICAgICAgICAgIGNodW5rID0gY2h1bmsuc3ViYXJyYXkobGVuKTtcbiAgICAgICAgICAgIGlmIChjaHVuay5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChjaHVuaywgZmluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGYgPSAwLCBpID0gMCwgaXMgPSB2b2lkIDAsIGJ1ZiA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmICghdGhpcy5wLmxlbmd0aClcbiAgICAgICAgICAgICAgICBidWYgPSBjaHVuaztcbiAgICAgICAgICAgIGVsc2UgaWYgKCFjaHVuay5sZW5ndGgpXG4gICAgICAgICAgICAgICAgYnVmID0gdGhpcy5wO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjaHVuay5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJ1Zi5zZXQodGhpcy5wKSwgYnVmLnNldChjaHVuaywgdGhpcy5wLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbCA9IGJ1Zi5sZW5ndGgsIG9jID0gdGhpcy5jLCBhZGQgPSBvYyAmJiB0aGlzLmQ7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdmFyIHNpZyA9IGI0KGJ1ZiwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpZyA9PSAweDQwMzRCNTApIHtcbiAgICAgICAgICAgICAgICAgICAgZiA9IDEsIGlzID0gaTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc18xLmQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzXzEuYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiZiA9IGIyKGJ1ZiwgaSArIDYpLCBjbXBfMSA9IGIyKGJ1ZiwgaSArIDgpLCB1ID0gYmYgJiAyMDQ4LCBkZCA9IGJmICYgOCwgZm5sID0gYjIoYnVmLCBpICsgMjYpLCBlcyA9IGIyKGJ1ZiwgaSArIDI4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwgPiBpICsgMzAgKyBmbmwgKyBlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoa3NfMyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLmsudW5zaGlmdChjaGtzXzMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZiA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2NfMSA9IGI0KGJ1ZiwgaSArIDE4KSwgc3VfMSA9IGI0KGJ1ZiwgaSArIDIyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbl8xID0gc3RyRnJvbVU4KGJ1Zi5zdWJhcnJheShpICsgMzAsIGkgKz0gMzAgKyBmbmwpLCAhdSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NfMSA9PSA0Mjk0OTY3Mjk1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBkZCA/IFstMl0gOiB6NjRlKGJ1ZiwgaSksIHNjXzEgPSBfYVswXSwgc3VfMSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NfMSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSBlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5jID0gc2NfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZV8xID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZuXzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNtcF8xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZV8xLm9uZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzY18xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV8xLm9uZGF0YShudWxsLCBldCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN0ciA9IF90aGlzXzEub1tjbXBfMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlXzEub25kYXRhKGVycigxNCwgJ3Vua25vd24gY29tcHJlc3Npb24gdHlwZSAnICsgY21wXzEsIDEpLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEgPSBzY18xIDwgMCA/IG5ldyBjdHIoZm5fMSkgOiBuZXcgY3RyKGZuXzEsIHNjXzEsIHN1XzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLm9uZGF0YSA9IGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHsgZmlsZV8xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGtzXzQgPSBjaGtzXzM7IF9pIDwgY2hrc180Lmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXQgPSBjaGtzXzRbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS5wdXNoKGRhdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzXzEua1swXSA9PSBjaGtzXzMgJiYgX3RoaXNfMS5jKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzXzEuZCA9IGRfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEucHVzaChldCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZF8xICYmIGRfMS50ZXJtaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEudGVybWluYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY18xID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV8xLnNpemUgPSBzY18xLCBmaWxlXzEub3JpZ2luYWxTaXplID0gc3VfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5vbmZpbGUoZmlsZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnID09IDB4ODA3NEI1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXMgPSBpICs9IDEyICsgKG9jID09IC0yICYmIDgpLCBmID0gMywgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzaWcgPT0gMHgyMDE0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcyA9IGkgLT0gNCwgZiA9IDMsIHRoaXNfMS5jID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IGwgLSA0OyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVfMSA9IF9sb29wXzIoKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGVfMSA9PT0gXCJicmVha1wiKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucCA9IGV0O1xuICAgICAgICAgICAgaWYgKG9jIDwgMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXQgPSBmID8gYnVmLnN1YmFycmF5KDAsIGlzIC0gMTIgLSAob2MgPT0gLTIgJiYgOCkgLSAoYjQoYnVmLCBpcyAtIDE2KSA9PSAweDgwNzRCNTAgJiYgNCkpIDogYnVmLnN1YmFycmF5KDAsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChhZGQpXG4gICAgICAgICAgICAgICAgICAgIGFkZC5wdXNoKGRhdCwgISFmKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua1srKGYgPT0gMildLnB1c2goZGF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmICYgMilcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGJ1Zi5zdWJhcnJheShpKSwgZmluYWwpO1xuICAgICAgICAgICAgdGhpcy5wID0gYnVmLnN1YmFycmF5KGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYylcbiAgICAgICAgICAgICAgICBlcnIoMTMpO1xuICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgZGVjb2RlciB3aXRoIHRoZSBzdHJlYW0sIGFsbG93aW5nIGZvciBmaWxlcyBjb21wcmVzc2VkIHdpdGhcbiAgICAgKiB0aGUgY29tcHJlc3Npb24gdHlwZSBwcm92aWRlZCB0byBiZSBleHBhbmRlZCBjb3JyZWN0bHlcbiAgICAgKiBAcGFyYW0gZGVjb2RlciBUaGUgZGVjb2RlciBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIFVuemlwLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChkZWNvZGVyKSB7XG4gICAgICAgIHRoaXMub1tkZWNvZGVyLmNvbXByZXNzaW9uXSA9IGRlY29kZXI7XG4gICAgfTtcbiAgICByZXR1cm4gVW56aXA7XG59KCkpO1xuZXhwb3J0IHsgVW56aXAgfTtcbnZhciBtdCA9IHR5cGVvZiBxdWV1ZU1pY3JvdGFzayA9PSAnZnVuY3Rpb24nID8gcXVldWVNaWNyb3Rhc2sgOiB0eXBlb2Ygc2V0VGltZW91dCA9PSAnZnVuY3Rpb24nID8gc2V0VGltZW91dCA6IGZ1bmN0aW9uIChmbikgeyBmbigpOyB9O1xuZXhwb3J0IGZ1bmN0aW9uIHVuemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgdmFyIHRlcm0gPSBbXTtcbiAgICB2YXIgdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXJtLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgdGVybVtpXSgpO1xuICAgIH07XG4gICAgdmFyIGZpbGVzID0ge307XG4gICAgdmFyIGNiZCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIG10KGZ1bmN0aW9uICgpIHsgY2IoYSwgYik7IH0pO1xuICAgIH07XG4gICAgbXQoZnVuY3Rpb24gKCkgeyBjYmQgPSBjYjsgfSk7XG4gICAgdmFyIGUgPSBkYXRhLmxlbmd0aCAtIDIyO1xuICAgIGZvciAoOyBiNChkYXRhLCBlKSAhPSAweDYwNTRCNTA7IC0tZSkge1xuICAgICAgICBpZiAoIWUgfHwgZGF0YS5sZW5ndGggLSBlID4gNjU1NTgpIHtcbiAgICAgICAgICAgIGNiZChlcnIoMTMsIDAsIDEpLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0QWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIDtcbiAgICB2YXIgbGZ0ID0gYjIoZGF0YSwgZSArIDgpO1xuICAgIGlmIChsZnQpIHtcbiAgICAgICAgdmFyIGMgPSBsZnQ7XG4gICAgICAgIHZhciBvID0gYjQoZGF0YSwgZSArIDE2KTtcbiAgICAgICAgdmFyIHogPSBvID09IDQyOTQ5NjcyOTUgfHwgYyA9PSA2NTUzNTtcbiAgICAgICAgaWYgKHopIHtcbiAgICAgICAgICAgIHZhciB6ZSA9IGI0KGRhdGEsIGUgLSAxMik7XG4gICAgICAgICAgICB6ID0gYjQoZGF0YSwgemUpID09IDB4NjA2NEI1MDtcbiAgICAgICAgICAgIGlmICh6KSB7XG4gICAgICAgICAgICAgICAgYyA9IGxmdCA9IGI0KGRhdGEsIHplICsgMzIpO1xuICAgICAgICAgICAgICAgIG8gPSBiNChkYXRhLCB6ZSArIDQ4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZmx0ciA9IG9wdHMgJiYgb3B0cy5maWx0ZXI7XG4gICAgICAgIHZhciBfbG9vcF8zID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHpoKGRhdGEsIG8sIHopLCBjXzEgPSBfYVswXSwgc2MgPSBfYVsxXSwgc3UgPSBfYVsyXSwgZm4gPSBfYVszXSwgbm8gPSBfYVs0XSwgb2ZmID0gX2FbNV0sIGIgPSBzbHpoKGRhdGEsIG9mZik7XG4gICAgICAgICAgICBvID0gbm87XG4gICAgICAgICAgICB2YXIgY2JsID0gZnVuY3Rpb24gKGUsIGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0QWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGNiZChlLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkKVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNbZm5dID0gZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWxmdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiZChudWxsLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghZmx0ciB8fCBmbHRyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBmbixcbiAgICAgICAgICAgICAgICBzaXplOiBzYyxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFNpemU6IHN1LFxuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjXzFcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjXzEpXG4gICAgICAgICAgICAgICAgICAgIGNibChudWxsLCBzbGMoZGF0YSwgYiwgYiArIHNjKSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY18xID09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZmwgPSBkYXRhLnN1YmFycmF5KGIsIGIgKyBzYyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzYyA8IDMyMDAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYmwobnVsbCwgaW5mbGF0ZVN5bmMoaW5mbCwgbmV3IHU4KHN1KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYmwoZSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGVybS5wdXNoKGluZmxhdGUoaW5mbCwgeyBzaXplOiBzdSB9LCBjYmwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjYmwoZXJyKDE0LCAndW5rbm93biBjb21wcmVzc2lvbiB0eXBlICcgKyBjXzEsIDEpLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYmwobnVsbCwgbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYzsgKytpKSB7XG4gICAgICAgICAgICBfbG9vcF8zKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgY2JkKG51bGwsIHt9KTtcbiAgICByZXR1cm4gdEFsbDtcbn1cbi8qKlxuICogU3luY2hyb25vdXNseSBkZWNvbXByZXNzZXMgYSBaSVAgYXJjaGl2ZS4gUHJlZmVyIHVzaW5nIGB1bnppcGAgZm9yIGJldHRlclxuICogcGVyZm9ybWFuY2Ugd2l0aCBtb3JlIHRoYW4gb25lIGZpbGUuXG4gKiBAcGFyYW0gZGF0YSBUaGUgcmF3IGNvbXByZXNzZWQgWklQIGZpbGVcbiAqIEBwYXJhbSBvcHRzIFRoZSBaSVAgZXh0cmFjdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIGZpbGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnppcFN5bmMoZGF0YSwgb3B0cykge1xuICAgIHZhciBmaWxlcyA9IHt9O1xuICAgIHZhciBlID0gZGF0YS5sZW5ndGggLSAyMjtcbiAgICBmb3IgKDsgYjQoZGF0YSwgZSkgIT0gMHg2MDU0QjUwOyAtLWUpIHtcbiAgICAgICAgaWYgKCFlIHx8IGRhdGEubGVuZ3RoIC0gZSA+IDY1NTU4KVxuICAgICAgICAgICAgZXJyKDEzKTtcbiAgICB9XG4gICAgO1xuICAgIHZhciBjID0gYjIoZGF0YSwgZSArIDgpO1xuICAgIGlmICghYylcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIHZhciBvID0gYjQoZGF0YSwgZSArIDE2KTtcbiAgICB2YXIgeiA9IG8gPT0gNDI5NDk2NzI5NSB8fCBjID09IDY1NTM1O1xuICAgIGlmICh6KSB7XG4gICAgICAgIHZhciB6ZSA9IGI0KGRhdGEsIGUgLSAxMik7XG4gICAgICAgIHogPSBiNChkYXRhLCB6ZSkgPT0gMHg2MDY0QjUwO1xuICAgICAgICBpZiAoeikge1xuICAgICAgICAgICAgYyA9IGI0KGRhdGEsIHplICsgMzIpO1xuICAgICAgICAgICAgbyA9IGI0KGRhdGEsIHplICsgNDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBmbHRyID0gb3B0cyAmJiBvcHRzLmZpbHRlcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGM7ICsraSkge1xuICAgICAgICB2YXIgX2EgPSB6aChkYXRhLCBvLCB6KSwgY18yID0gX2FbMF0sIHNjID0gX2FbMV0sIHN1ID0gX2FbMl0sIGZuID0gX2FbM10sIG5vID0gX2FbNF0sIG9mZiA9IF9hWzVdLCBiID0gc2x6aChkYXRhLCBvZmYpO1xuICAgICAgICBvID0gbm87XG4gICAgICAgIGlmICghZmx0ciB8fCBmbHRyKHtcbiAgICAgICAgICAgIG5hbWU6IGZuLFxuICAgICAgICAgICAgc2l6ZTogc2MsXG4gICAgICAgICAgICBvcmlnaW5hbFNpemU6IHN1LFxuICAgICAgICAgICAgY29tcHJlc3Npb246IGNfMlxuICAgICAgICB9KSkge1xuICAgICAgICAgICAgaWYgKCFjXzIpXG4gICAgICAgICAgICAgICAgZmlsZXNbZm5dID0gc2xjKGRhdGEsIGIsIGIgKyBzYyk7XG4gICAgICAgICAgICBlbHNlIGlmIChjXzIgPT0gOClcbiAgICAgICAgICAgICAgICBmaWxlc1tmbl0gPSBpbmZsYXRlU3luYyhkYXRhLnN1YmFycmF5KGIsIGIgKyBzYyksIG5ldyB1OChzdSkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVycigxNCwgJ3Vua25vd24gY29tcHJlc3Npb24gdHlwZSAnICsgY18yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsZXM7XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgc2ltcGxlLWhlYWRlci9oZWFkZXIgKi9cblxuLyohXG4gKiBjcnhUb1ppcFxuICogQ29weXJpZ2h0IChjKSAyMDEzIFJvYiBXdSA8cm9iQHJvYnd1Lm5sPlxuICogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3J4VG9aaXAoYnVmOiBCdWZmZXIpIHtcbiAgICBmdW5jdGlvbiBjYWxjTGVuZ3RoKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlcikge1xuICAgICAgICBsZXQgbGVuZ3RoID0gMDtcblxuICAgICAgICBsZW5ndGggKz0gYSA8PCAwO1xuICAgICAgICBsZW5ndGggKz0gYiA8PCA4O1xuICAgICAgICBsZW5ndGggKz0gYyA8PCAxNjtcbiAgICAgICAgbGVuZ3RoICs9IGQgPDwgMjQgPj4+IDA7XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gNTAgNGIgMDMgMDRcbiAgICAvLyBUaGlzIGlzIGFjdHVhbGx5IGEgemlwIGZpbGVcbiAgICBpZiAoYnVmWzBdID09PSA4MCAmJiBidWZbMV0gPT09IDc1ICYmIGJ1ZlsyXSA9PT0gMyAmJiBidWZbM10gPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICAvLyA0MyA3MiAzMiAzNCAoQ3IyNClcbiAgICBpZiAoYnVmWzBdICE9PSA2NyB8fCBidWZbMV0gIT09IDExNCB8fCBidWZbMl0gIT09IDUwIHx8IGJ1ZlszXSAhPT0gNTIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBoZWFkZXI6IERvZXMgbm90IHN0YXJ0IHdpdGggQ3IyNFwiKTtcbiAgICB9XG5cbiAgICAvLyAwMiAwMCAwMCAwMFxuICAgIC8vIG9yXG4gICAgLy8gMDMgMDAgMDAgMDBcbiAgICBjb25zdCBpc1YzID0gYnVmWzRdID09PSAzO1xuICAgIGNvbnN0IGlzVjIgPSBidWZbNF0gPT09IDI7XG5cbiAgICBpZiAoKCFpc1YyICYmICFpc1YzKSB8fCBidWZbNV0gfHwgYnVmWzZdIHx8IGJ1Zls3XSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGNyeCBmb3JtYXQgdmVyc2lvbiBudW1iZXIuXCIpO1xuICAgIH1cblxuICAgIGlmIChpc1YyKSB7XG4gICAgICAgIGNvbnN0IHB1YmxpY0tleUxlbmd0aCA9IGNhbGNMZW5ndGgoYnVmWzhdLCBidWZbOV0sIGJ1ZlsxMF0sIGJ1ZlsxMV0pO1xuICAgICAgICBjb25zdCBzaWduYXR1cmVMZW5ndGggPSBjYWxjTGVuZ3RoKGJ1ZlsxMl0sIGJ1ZlsxM10sIGJ1ZlsxNF0sIGJ1ZlsxNV0pO1xuXG4gICAgICAgIC8vIDE2ID0gTWFnaWMgbnVtYmVyICg0KSwgQ1JYIGZvcm1hdCB2ZXJzaW9uICg0KSwgbGVuZ3RocyAoMng0KVxuICAgICAgICBjb25zdCB6aXBTdGFydE9mZnNldCA9IDE2ICsgcHVibGljS2V5TGVuZ3RoICsgc2lnbmF0dXJlTGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiBidWYuc3ViYXJyYXkoemlwU3RhcnRPZmZzZXQsIGJ1Zi5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyB2MyBmb3JtYXQgaGFzIGhlYWRlciBzaXplIGFuZCB0aGVuIGhlYWRlclxuICAgIGNvbnN0IGhlYWRlclNpemUgPSBjYWxjTGVuZ3RoKGJ1Zls4XSwgYnVmWzldLCBidWZbMTBdLCBidWZbMTFdKTtcbiAgICBjb25zdCB6aXBTdGFydE9mZnNldCA9IDEyICsgaGVhZGVyU2l6ZTtcblxuICAgIHJldHVybiBidWYuc3ViYXJyYXkoemlwU3RhcnRPZmZzZXQsIGJ1Zi5sZW5ndGgpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxJQUFPO0FBQVA7QUFBQTtBQUFBO0FBQUEsSUFBTyxtQkFBUTtBQUFBO0FBQUE7OztBQ0FmLElBQU87QUFBUDtBQUFBO0FBQUE7QUFBQSxJQUFPLHFCQUFRO0FBQUE7QUFBQTs7O0FDQWYsSUFXYTtBQVhiO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFDQTtBQUlPLElBQU0sdUJBQXVCLGFBQWEsbUJBQVUscUJBQVksd0JBQXdCLHdCQUFlO0FBQUE7QUFBQTs7O0FDU3ZHLFNBQVMsSUFBSSxLQUFhLFVBQWdDLENBQUMsR0FBRztBQUNqRSxTQUFPLElBQUksUUFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFDNUMsaUJBQUFBLFFBQU0sSUFBSSxLQUFLLFNBQVMsU0FBTztBQUMzQixZQUFNLEVBQUUsWUFBWSxlQUFlLFFBQVEsSUFBSTtBQUMvQyxVQUFJLGNBQWU7QUFDZixlQUFPLEtBQUssT0FBTyxHQUFHLGVBQWUsbUJBQW1CLEtBQUs7QUFDakUsVUFBSSxjQUFlO0FBQ2YsZUFBTyxLQUFLLFFBQVEsSUFBSSxRQUFRLFVBQVcsT0FBTyxDQUFDO0FBRXZELFlBQU0sU0FBUyxDQUFDO0FBQ2hCLFVBQUksR0FBRyxTQUFTLE1BQU07QUFFdEIsVUFBSSxHQUFHLFFBQVEsV0FBUyxPQUFPLEtBQUssS0FBSyxDQUFDO0FBQzFDLFVBQUksS0FBSyxPQUFPLE1BQU0sUUFBUSxPQUFPLE9BQU8sTUFB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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FEVWYscUJBQUksR0FBRywwQkFBMEIsQ0FBQyxHQUFHLFFBQVE7QUFDekMs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QUksZUFBZSxDQUFDO0FBQ3BCLGNBQUksV0FBVyxLQUFLLEtBQUssU0FBUyxTQUFTLGNBQWMsaUJBQWlCO0FBQUEsUUFDOUU7QUFNQSxnQkFBUSxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQztBQUFBLE1BQzNDO0FBQUEsSUFDSjtBQUVBLDhCQUFRLGVBQWUsV0FBVyxrQkFBa0IsQ0FBQyxFQUFFLGlCQUFpQixhQUFhLEdBQUcsT0FBTztBQUMzRixVQUFJLGlCQUFpQjtBQUNqQixZQUFJLGlCQUFpQjtBQUNqQixtQkFBUyxlQUFlO0FBSTVCLFlBQUksaUJBQWlCLGNBQWM7QUFDL0IsZ0JBQU0sU0FBUyxXQUFXLGlCQUFpQixjQUFjO0FBQ3pELGNBQUk7QUFDQSw0QkFBZ0IsVUFBVSxDQUFDLFVBQVU7QUFBQSxRQUM3QztBQUFBLE1BQ0o7QUFFQSxTQUFHLEVBQUUsUUFBUSxPQUFPLGdCQUFnQixDQUFDO0FBQUEsSUFDekMsQ0FBQztBQUtELDhCQUFRLGVBQWUsV0FBVyxvQkFBb0IsTUFBTTtBQUFBLElBQUU7QUFBQSxFQUNsRSxDQUFDO0FBQ0w7QUFFQSxJQUFJLE9BQW9CO0FBRXhCOyIsCiAgIm5hbWVzIjogWyJodHRwcyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW1wb3J0X3BhdGgiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImVycm9yIiwgIm5hdGl2ZV9leHBvcnRzIiwgIm5hdGl2ZV9leHBvcnRzIiwgInBhdGgiLCAicCIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgImVyciIsICJpbXBvcnRfZWxlY3Ryb24iLCAiXyIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiXyIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfY2hpbGRfcHJvY2VzcyIsICJpbXBvcnRfcGF0aCIsICJwYXRoIiwgIm9zIiwgIm1ldGFkYXRhIiwgIm5hdGl2ZV9leHBvcnRzIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9wYXRoIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJlcnJvciIsICJwYXRoIiwgImZzIiwgImVyciIsICJwYXRoIiwgInBhdGgiLCAibG9nc0RpciIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfaHR0cHMiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiXyIsICJuYXRpdmVfZXhwb3J0cyIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW1wb3J0X2ZzIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfZWxlY3Ryb24iLCAicHJvdG9jb2wiLCAicGF0aCIsICJwcm90b2NvbCIsICJpbXBvcnRfZWxlY3Ryb24iLCAicmVxdWlyZSIsICJjIiwgInN0YXJ0IiwgInAiLCAibCIsICJ0ZCIsICJpbml0IiwgIl9hIiwgImluaXQiLCAiZXJyIiwgImRhdCIsICJfYSIsICJfYSIsICJpIiwgIl9hIiwgImUiLCAiaW1wb3J0X2ZzIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJ6aXBTdGFydE9mZnNldCIsICJlcnIiLCAiZnNDb25zdGFudHMiLCAiZXJyIl0KfQo=
