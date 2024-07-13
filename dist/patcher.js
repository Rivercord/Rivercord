// Rivercord 5a62a7ee
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
    git_hash_default = "5a62a7ee";
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
      true ? "patcher.js" : "rivercordDesktopMain.js",
      true ? "preload.js" : "rivercordDesktopPreload.js",
      true ? "renderer.js" : "rivercordDesktopRenderer.js",
      true ? "renderer.css" : "rivercordDesktopRenderer.css"
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

// src/main/updater/index.ts
var init_updater = __esm({
  "src/main/updater/index.ts"() {
    "use strict";
    init_react();
    if (true)
      init_http();
  }
});

// src/plugins/appleMusic.desktop/native.ts
var native_exports = {};
__export(native_exports, {
  fetchTrackData: () => fetchTrackData
});
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
var import_child_process, import_util, exec, requestOptions, cachedRemoteData;
var init_native = __esm({
  "src/plugins/appleMusic.desktop/native.ts"() {
    "use strict";
    init_react();
    import_child_process = require("child_process");
    import_util = require("util");
    exec = (0, import_util.promisify)(import_child_process.execFile);
    requestOptions = {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0" }
    };
    cachedRemoteData = null;
  }
});

// src/plugins/consoleShortcuts/native.ts
var native_exports2 = {};
__export(native_exports2, {
  initDevtoolsOpenEagerLoad: () => initDevtoolsOpenEagerLoad
});
function initDevtoolsOpenEagerLoad(e) {
  const handleDevtoolsOpened = () => e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");
  if (e.sender.isDevToolsOpened())
    handleDevtoolsOpened();
  else
    e.sender.once("devtools-opened", () => handleDevtoolsOpened());
}
var init_native2 = __esm({
  "src/plugins/consoleShortcuts/native.ts"() {
    "use strict";
    init_react();
  }
});

// src/shared/SettingsStore.ts
var SettingsStore;
var init_SettingsStore = __esm({
  "src/shared/SettingsStore.ts"() {
    "use strict";
    init_react();
    SettingsStore = class {
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
  }
});

// src/utils/mergeDefaults.ts
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
var init_mergeDefaults = __esm({
  "src/utils/mergeDefaults.ts"() {
    "use strict";
    init_react();
  }
});

// src/main/utils/constants.ts
var import_electron2, import_path2, DATA_DIR, SETTINGS_DIR, THEMES_DIR, QUICKCSS_PATH, SETTINGS_FILE, NATIVE_SETTINGS_FILE, ALLOWED_PROTOCOLS, IS_VANILLA;
var init_constants = __esm({
  "src/main/utils/constants.ts"() {
    "use strict";
    init_react();
    import_electron2 = require("electron");
    import_path2 = require("path");
    DATA_DIR = process.env.RIVERCORD_USER_DATA_DIR ?? (process.env.DISCORD_USER_DATA_DIR ? (0, import_path2.join)(process.env.DISCORD_USER_DATA_DIR, "..", "RivercordData") : (0, import_path2.join)(import_electron2.app.getPath("userData"), "..", "Rivercord"));
    SETTINGS_DIR = (0, import_path2.join)(DATA_DIR, "settings");
    THEMES_DIR = (0, import_path2.join)(DATA_DIR, "themes");
    QUICKCSS_PATH = (0, import_path2.join)(SETTINGS_DIR, "quickCss.css");
    SETTINGS_FILE = (0, import_path2.join)(SETTINGS_DIR, "settings.json");
    NATIVE_SETTINGS_FILE = (0, import_path2.join)(SETTINGS_DIR, "native-settings.json");
    ALLOWED_PROTOCOLS = [
      "https:",
      "http:",
      "steam:",
      "spotify:",
      "com.epicgames.launcher:",
      "tidal:"
    ];
    IS_VANILLA = /* @__PURE__ */ process.argv.includes("--vanilla");
  }
});

// src/main/settings.ts
function readSettings(name, file) {
  try {
    return JSON.parse((0, import_fs.readFileSync)(file, "utf-8"));
  } catch (err2) {
    if (err2?.code !== "ENOENT")
      console.error(`Failed to read ${name} settings`, err2);
    return {};
  }
}
var import_electron3, import_fs, RendererSettings, DefaultNativeSettings, nativeSettings, NativeSettings;
var init_settings = __esm({
  "src/main/settings.ts"() {
    "use strict";
    init_react();
    init_IpcEvents();
    init_SettingsStore();
    init_mergeDefaults();
    import_electron3 = require("electron");
    import_fs = require("fs");
    init_constants();
    (0, import_fs.mkdirSync)(SETTINGS_DIR, { recursive: true });
    RendererSettings = new SettingsStore(readSettings("renderer", SETTINGS_FILE));
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
    DefaultNativeSettings = {
      plugins: {}
    };
    nativeSettings = readSettings("native", NATIVE_SETTINGS_FILE);
    mergeDefaults(nativeSettings, DefaultNativeSettings);
    NativeSettings = new SettingsStore(nativeSettings);
    NativeSettings.addGlobalChangeListener(() => {
      try {
        (0, import_fs.writeFileSync)(NATIVE_SETTINGS_FILE, JSON.stringify(NativeSettings.plain, null, 4));
      } catch (e) {
        console.error("Failed to write native settings", e);
      }
    });
  }
});

// src/plugins/fixSpotifyEmbeds.desktop/native.ts
var native_exports3 = {};
var import_electron4;
var init_native3 = __esm({
  "src/plugins/fixSpotifyEmbeds.desktop/native.ts"() {
    "use strict";
    init_react();
    init_settings();
    import_electron4 = require("electron");
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
  }
});

// src/plugins/fixYoutubeEmbeds.desktop/native.ts
var native_exports4 = {};
var import_electron5;
var init_native4 = __esm({
  "src/plugins/fixYoutubeEmbeds.desktop/native.ts"() {
    "use strict";
    init_react();
    init_settings();
    import_electron5 = require("electron");
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
  }
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
var import_child_process2, fs, import_os, import_path3, workdir, stdout_global, logs_global, ytdlpAvailable, ffmpegAvailable, ytdlpProcess, ffmpegProcess, getdir, p, cleanVideoFiles, appendOut, log, error, getStdout, isYtdlpAvailable, isFfmpegAvailable;
var init_native5 = __esm({
  "src/plugins/mediaDownloader.desktop/native.ts"() {
    "use strict";
    init_react();
    import_child_process2 = require("child_process");
    fs = __toESM(require("fs"));
    import_os = __toESM(require("os"));
    import_path3 = __toESM(require("path"));
    workdir = null;
    stdout_global = "";
    logs_global = "";
    ytdlpAvailable = false;
    ffmpegAvailable = false;
    ytdlpProcess = null;
    ffmpegProcess = null;
    getdir = () => workdir ?? process.cwd();
    p = (file) => import_path3.default.join(getdir(), file);
    cleanVideoFiles = () => {
      if (!workdir)
        return;
      fs.readdirSync(workdir).filter((f) => f.startsWith("download.") || f.startsWith("remux.")).forEach((f) => fs.unlinkSync(p(f)));
    };
    appendOut = (data) => (stdout_global += data, stdout_global = stdout_global.replace(/^.*\r([^\n])/gm, "$1"));
    log = (...data) => (console.log(`[Plugin:MediaDownloader] ${data.join(" ")}`), logs_global += `[Plugin:MediaDownloader] ${data.join(" ")}
`);
    error = (...data) => console.error(`[Plugin:MediaDownloader] [ERROR] ${data.join(" ")}`);
    getStdout = () => stdout_global;
    isYtdlpAvailable = () => ytdlpAvailable;
    isFfmpegAvailable = () => ffmpegAvailable;
  }
});

// src/utils/Queue.ts
var Queue;
var init_Queue = __esm({
  "src/utils/Queue.ts"() {
    "use strict";
    init_react();
    Queue = class {
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
  }
});

// src/plugins/messageLoggerEnhanced/native/utils.ts
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
var import_promises2, import_path4;
var init_utils = __esm({
  "src/plugins/messageLoggerEnhanced/native/utils.ts"() {
    "use strict";
    init_react();
    import_promises2 = require("fs/promises");
    import_path4 = __toESM(require("path"));
  }
});

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
var import_promises3, import_path5;
var init_settings2 = __esm({
  "src/plugins/messageLoggerEnhanced/native/settings.ts"() {
    "use strict";
    init_react();
    import_promises3 = __toESM(require("fs/promises"));
    import_path5 = __toESM(require("path"));
    init_native6();
    init_utils();
  }
});

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
function messageLoggerEnhancedUniqueIdThingyIdkMan() {
}
async function initDirs() {
  const { logsDir: ld, imageCacheDir: icd } = await getSettings();
  logsDir = ld || await getDefaultNativeDataDir();
  imageCacheDir = icd || await getDefaultNativeImageDir();
}
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
var import_promises4, import_node_path, import_electron6, nativeSavedImages, getNativeSavedImages, logsDir, imageCacheDir, getImageCacheDir, getLogsDir, LOGS_DATA_FILENAME, dataWriteQueue;
var init_native6 = __esm({
  "src/plugins/messageLoggerEnhanced/native/index.ts"() {
    "use strict";
    init_react();
    import_promises4 = require("node:fs/promises");
    import_node_path = __toESM(require("node:path"));
    init_Queue();
    import_electron6 = require("electron");
    init_constants();
    init_settings2();
    init_utils();
    nativeSavedImages = /* @__PURE__ */ new Map();
    getNativeSavedImages = () => nativeSavedImages;
    getImageCacheDir = async () => imageCacheDir ?? await getDefaultNativeImageDir();
    getLogsDir = async () => logsDir ?? await getDefaultNativeDataDir();
    initDirs();
    LOGS_DATA_FILENAME = "message-logger-logs.json";
    dataWriteQueue = new Queue();
  }
});

// src/plugins/openInApp/native.ts
var native_exports7 = {};
__export(native_exports7, {
  resolveRedirect: () => resolveRedirect
});
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
var import_https2, validRedirectUrls;
var init_native7 = __esm({
  "src/plugins/openInApp/native.ts"() {
    "use strict";
    init_react();
    import_https2 = require("https");
    validRedirectUrls = /^https:\/\/(spotify\.link|s\.team)\/.+$/;
  }
});

// src/plugins/voiceMessages/native.ts
var native_exports8 = {};
__export(native_exports8, {
  readRecording: () => readRecording
});
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
var import_electron7, import_promises5, import_path6;
var init_native8 = __esm({
  "src/plugins/voiceMessages/native.ts"() {
    "use strict";
    init_react();
    import_electron7 = require("electron");
    import_promises5 = require("fs/promises");
    import_path6 = require("path");
  }
});

// file-uri:file://adguard.js?minify
var adguard_default;
var init_adguard = __esm({
  "file-uri:file://adguard.js?minify"() {
    init_react();
    adguard_default = `/* eslint-disable */

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
  }
});

// src/plugins/watchTogetherAdblock.desktop/native.ts
var native_exports9 = {};
var import_electron8;
var init_native9 = __esm({
  "src/plugins/watchTogetherAdblock.desktop/native.ts"() {
    "use strict";
    init_react();
    init_settings();
    import_electron8 = require("electron");
    init_adguard();
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
  }
});

// src/plugins/xsOverlay.desktop/native.ts
var native_exports10 = {};
__export(native_exports10, {
  sendToOverlay: () => sendToOverlay
});
function sendToOverlay(_, data) {
  data.icon = Buffer.from(data.icon).toString("base64");
  const json = JSON.stringify(data);
  xsoSocket ??= (0, import_dgram.createSocket)("udp4");
  xsoSocket.send(json, 42069, "127.0.0.1");
}
var import_dgram, xsoSocket;
var init_native10 = __esm({
  "src/plugins/xsOverlay.desktop/native.ts"() {
    "use strict";
    init_react();
    import_dgram = require("dgram");
  }
});

// import-natives:~pluginNatives
var pluginNatives_default;
var init_pluginNatives = __esm({
  "import-natives:~pluginNatives"() {
    init_react();
    init_native();
    init_native2();
    init_native3();
    init_native4();
    init_native5();
    init_native6();
    init_native7();
    init_native8();
    init_native9();
    init_native10();
    pluginNatives_default = {
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
  }
});

// src/main/ipcPlugins.ts
var import_electron9, PluginIpcMappings;
var init_ipcPlugins = __esm({
  "src/main/ipcPlugins.ts"() {
    "use strict";
    init_react();
    init_IpcEvents();
    import_electron9 = require("electron");
    init_pluginNatives();
    PluginIpcMappings = {};
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
  }
});

// src/shared/debounce.ts
function debounce(func, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
var init_debounce = __esm({
  "src/shared/debounce.ts"() {
    "use strict";
    init_react();
  }
});

// file-uri:file://monacoWin.html?minify&base64
var monacoWin_default;
var init_monacoWin = __esm({
  "file-uri:file://monacoWin.html?minify&base64"() {
    init_react();
    monacoWin_default = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo=";
  }
});

// src/main/themes/index.ts
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
var splitRegex, escapedAtRegex;
var init_themes = __esm({
  "src/main/themes/index.ts"() {
    "use strict";
    init_react();
    splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
    escapedAtRegex = /^\\@/;
  }
});

// src/main/utils/externalLinks.ts
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
var import_electron10;
var init_externalLinks = __esm({
  "src/main/utils/externalLinks.ts"() {
    "use strict";
    init_react();
    import_electron10 = require("electron");
  }
});

// src/main/ipcMain.ts
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
function initIpc(mainWindow) {
  let quickCssWatcher;
  (0, import_promises6.open)(QUICKCSS_PATH, "a+").then((fd2) => {
    fd2.close();
    quickCssWatcher = (0, import_fs2.watch)(QUICKCSS_PATH, { persistent: false }, debounce(async () => {
      mainWindow.webContents.postMessage("RivercordQuickCssUpdate" /* QUICK_CSS_UPDATE */, await readCss());
    }, 50));
  }).catch(() => {
  });
  const themesWatcher = (0, import_fs2.watch)(THEMES_DIR, { persistent: false }, debounce(() => {
    mainWindow.webContents.postMessage("RivercordThemeUpdate" /* THEME_UPDATE */, void 0);
  }));
  mainWindow.once("closed", () => {
    quickCssWatcher?.close();
    themesWatcher.close();
  });
}
var import_electron11, import_fs2, import_promises6, import_path7;
var init_ipcMain = __esm({
  "src/main/ipcMain.ts"() {
    "use strict";
    init_react();
    init_updater();
    init_ipcPlugins();
    init_settings();
    init_debounce();
    init_IpcEvents();
    import_electron11 = require("electron");
    init_monacoWin();
    import_fs2 = require("fs");
    import_promises6 = require("fs/promises");
    import_path7 = require("path");
    init_themes();
    init_constants();
    init_externalLinks();
    (0, import_fs2.mkdirSync)(THEMES_DIR, { recursive: true });
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
          preload: (0, import_path7.join)(__dirname, true ? "preload.js" : "rivercordDesktopPreload.js"),
          contextIsolation: true,
          nodeIntegration: false,
          sandbox: false
        }
      });
      makeLinksOpenExternally(win);
      await win.loadURL(`data:text/html;base64,${monacoWin_default}`);
    });
  }
});

// src/shared/onceDefined.ts
function onceDefined(target, property, callback) {
  const propertyAsAny = property;
  if (property in target)
    return void callback(target[propertyAsAny]);
  Object.defineProperty(target, property, {
    set(v) {
      delete target[propertyAsAny];
      target[propertyAsAny] = v;
      callback(v);
    },
    configurable: true,
    enumerable: false
  });
}
var init_onceDefined = __esm({
  "src/shared/onceDefined.ts"() {
    "use strict";
    init_react();
  }
});

// src/main/patchWin32Updater.ts
var patchWin32Updater_exports = {};
function isNewer($new, old) {
  const newParts = $new.slice(4).split(".").map(Number);
  const oldParts = old.slice(4).split(".").map(Number);
  for (let i = 0; i < oldParts.length; i++) {
    if (newParts[i] > oldParts[i])
      return true;
    if (newParts[i] < oldParts[i])
      return false;
  }
  return false;
}
function patchLatest() {
  if (process.env.DISABLE_UPDATER_AUTO_PATCHING)
    return;
  try {
    const currentAppPath = (0, import_path9.dirname)(process.execPath);
    const currentVersion = (0, import_path9.basename)(currentAppPath);
    const discordPath = (0, import_path9.join)(currentAppPath, "..");
    const latestVersion = (0, import_original_fs.readdirSync)(discordPath).reduce((prev, curr) => {
      return curr.startsWith("app-") && isNewer(curr, prev) ? curr : prev;
    }, currentVersion);
    if (latestVersion === currentVersion)
      return;
    const resources = (0, import_path9.join)(discordPath, latestVersion, "resources");
    const app9 = (0, import_path9.join)(resources, "app.asar");
    const _app = (0, import_path9.join)(resources, "_app.asar");
    if (!(0, import_original_fs.existsSync)(app9) || (0, import_original_fs.statSync)(app9).isDirectory())
      return;
    console.info("[Rivercord] Detected Host Update. Repatching...");
    (0, import_original_fs.renameSync)(app9, _app);
    (0, import_original_fs.mkdirSync)(app9);
    (0, import_original_fs.writeFileSync)((0, import_path9.join)(app9, "package.json"), JSON.stringify({
      name: "discord",
      main: "index.js"
    }));
    (0, import_original_fs.writeFileSync)((0, import_path9.join)(app9, "index.js"), `require(${JSON.stringify((0, import_path9.join)(__dirname, "patcher.js"))});`);
  } catch (err2) {
    console.error("[Rivercord] Failed to repatch latest host update", err2);
  }
}
var import_electron13, import_original_fs, import_path9;
var init_patchWin32Updater = __esm({
  "src/main/patchWin32Updater.ts"() {
    "use strict";
    init_react();
    import_electron13 = require("electron");
    import_original_fs = require("original-fs");
    import_path9 = require("path");
    import_electron13.app.on("before-quit", patchLatest);
  }
});

// src/main/patcher.ts
var patcher_exports = {};
var import_electron14, import_path10, injectorPath, asarName, asarPath, discordPkg;
var init_patcher = __esm({
  "src/main/patcher.ts"() {
    "use strict";
    init_react();
    init_onceDefined();
    import_electron14 = __toESM(require("electron"));
    import_path10 = require("path");
    init_ipcMain();
    init_settings();
    init_constants();
    console.log("[Rivercord] Starting up...");
    injectorPath = require.main.filename;
    asarName = require.main.path.endsWith("app.asar") ? "_app.asar" : "app.asar";
    asarPath = (0, import_path10.join)((0, import_path10.dirname)(injectorPath), "..", asarName);
    discordPkg = require((0, import_path10.join)(asarPath, "package.json"));
    require.main.filename = (0, import_path10.join)(asarPath, discordPkg.main);
    import_electron14.app.setAppPath(asarPath);
    if (!IS_VANILLA) {
      const settings = RendererSettings.store;
      if (true) {
        init_patchWin32Updater();
        if (settings.winCtrlQ) {
          const originalBuild = import_electron14.Menu.buildFromTemplate;
          import_electron14.Menu.buildFromTemplate = function(template) {
            if (template[0]?.label === "&File") {
              const { submenu } = template[0];
              if (Array.isArray(submenu)) {
                submenu.push({
                  label: "Quit (Hidden)",
                  visible: false,
                  acceleratorWorksWhenHidden: true,
                  accelerator: "Control+Q",
                  click: () => import_electron14.app.quit()
                });
              }
            }
            return originalBuild.call(this, template);
          };
        }
      }
      class BrowserWindow2 extends import_electron14.default.BrowserWindow {
        constructor(options) {
          if (options?.webPreferences?.preload && options.title) {
            const original = options.webPreferences.preload;
            options.webPreferences.preload = (0, import_path10.join)(__dirname, true ? "preload.js" : "rivercordDesktopPreload.js");
            options.webPreferences.sandbox = false;
            options.webPreferences.backgroundThrottling = false;
            if (settings.frameless) {
              options.frame = false;
            } else if (settings.winNativeTitleBar) {
              delete options.frame;
            }
            if (settings.transparent) {
              options.transparent = true;
              options.backgroundColor = "#00000000";
            }
            const needsVibrancy = false;
            if (needsVibrancy) {
              options.backgroundColor = "#00000000";
              if (settings.macosVibrancyStyle) {
                options.vibrancy = settings.macosVibrancyStyle;
              }
            }
            process.env.DISCORD_PRELOAD = original;
            super(options);
            initIpc(this);
          } else
            super(options);
        }
      }
      Object.assign(BrowserWindow2, import_electron14.default.BrowserWindow);
      Object.defineProperty(BrowserWindow2, "name", { value: "BrowserWindow", configurable: true });
      const electronPath = require.resolve("electron");
      delete require.cache[electronPath].exports;
      require.cache[electronPath].exports = {
        ...import_electron14.default,
        BrowserWindow: BrowserWindow2
      };
      onceDefined(global, "appSettings", (s) => {
        s.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING", true);
        if (settings.disableMinSize) {
          s.set("MIN_WIDTH", 0);
          s.set("MIN_HEIGHT", 0);
        } else {
          s.set("MIN_WIDTH", 940);
          s.set("MIN_HEIGHT", 500);
        }
      });
      process.env.DATA_DIR = (0, import_path10.join)(import_electron14.app.getPath("userData"), "..", "Rivercord");
      const originalAppend = import_electron14.app.commandLine.appendSwitch;
      import_electron14.app.commandLine.appendSwitch = function(...args) {
        if (args[0] === "disable-features") {
          const disabledFeatures = new Set((args[1] ?? "").split(","));
          disabledFeatures.add("WidgetLayering");
          disabledFeatures.add("UseEcoQoSForBackgroundProcess");
          args[1] += [...disabledFeatures].join(",");
        }
        return originalAppend.apply(this, args);
      };
      import_electron14.app.commandLine.appendSwitch("disable-renderer-backgrounding");
      import_electron14.app.commandLine.appendSwitch("disable-background-timer-throttling");
      import_electron14.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
    } else {
      console.log("[Rivercord] Running in vanilla mode. Not loading Rivercord");
    }
    console.log("[Rivercord] Loading original Discord app.asar");
    require(require.main.filename);
  }
});

// src/main/index.ts
init_react();
var import_electron15 = require("electron");
var import_path11 = require("path");
init_ipcMain();
init_settings();
init_constants();

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
init_constants();

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
if (!IS_VANILLA) {
  import_electron15.app.whenReady().then(() => {
    import_electron15.protocol.registerFileProtocol("rivercord", ({ url: unsafeUrl }, cb) => {
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
          cb((0, import_path11.join)(__dirname, url));
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
    import_electron15.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders, resourceType }, cb) => {
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
    import_electron15.session.defaultSession.webRequest.onHeadersReceived = () => {
    };
  });
}
if (true) {
  init_patcher();
}
//# sourceURL=RivercordPatcher

/*! For license information please see patcher.js.LEGAL.txt */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc2NyaXB0cy9idWlsZC9pbmplY3QvcmVhY3QubWpzIiwgIi4uL3NyYy9zaGFyZWQvSXBjRXZlbnRzLnRzIiwgImdpdC1oYXNoOn5naXQtaGFzaCIsICJnaXQtcmVtb3RlOn5naXQtcmVtb3RlIiwgIi4uL3NyYy9zaGFyZWQvcml2ZXJjb3JkVXNlckFnZW50LnRzIiwgIi4uL3NyYy9tYWluL3V0aWxzL3NpbXBsZUdldC50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2NvbW1vbi50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2h0dHAudHMiLCAiLi4vc3JjL21haW4vdXBkYXRlci9pbmRleC50cyIsICIuLi9zcmMvcGx1Z2lucy9hcHBsZU11c2ljLmRlc2t0b3AvbmF0aXZlLnRzIiwgIi4uL3NyYy9wbHVnaW5zL2NvbnNvbGVTaG9ydGN1dHMvbmF0aXZlLnRzIiwgIi4uL3NyYy9zaGFyZWQvU2V0dGluZ3NTdG9yZS50cyIsICIuLi9zcmMvdXRpbHMvbWVyZ2VEZWZhdWx0cy50cyIsICIuLi9zcmMvbWFpbi91dGlscy9jb25zdGFudHMudHMiLCAiLi4vc3JjL21haW4vc2V0dGluZ3MudHMiLCAiLi4vc3JjL3BsdWdpbnMvZml4U3BvdGlmeUVtYmVkcy5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9maXhZb3V0dWJlRW1iZWRzLmRlc2t0b3AvbmF0aXZlLnRzIiwgIi4uL3NyYy9wbHVnaW5zL21lZGlhRG93bmxvYWRlci5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvdXRpbHMvUXVldWUudHMiLCAiLi4vc3JjL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZS91dGlscy50cyIsICIuLi9zcmMvcGx1Z2lucy9tZXNzYWdlTG9nZ2VyRW5oYW5jZWQvbmF0aXZlL3NldHRpbmdzLnRzIiwgIi4uL3NyYy9wbHVnaW5zL21lc3NhZ2VMb2dnZXJFbmhhbmNlZC9uYXRpdmUvaW5kZXgudHMiLCAiLi4vc3JjL3BsdWdpbnMvb3BlbkluQXBwL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy92b2ljZU1lc3NhZ2VzL25hdGl2ZS50cyIsICJmaWxlLXVyaTpmaWxlOi8vYWRndWFyZC5qcz9taW5pZnkiLCAiLi4vc3JjL3BsdWdpbnMvd2F0Y2hUb2dldGhlckFkYmxvY2suZGVza3RvcC9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMveHNPdmVybGF5LmRlc2t0b3AvbmF0aXZlLnRzIiwgImltcG9ydC1uYXRpdmVzOn5wbHVnaW5OYXRpdmVzIiwgIi4uL3NyYy9tYWluL2lwY1BsdWdpbnMudHMiLCAiLi4vc3JjL3NoYXJlZC9kZWJvdW5jZS50cyIsICJmaWxlLXVyaTpmaWxlOi8vbW9uYWNvV2luLmh0bWw/bWluaWZ5JmJhc2U2NCIsICIuLi9zcmMvbWFpbi90aGVtZXMvaW5kZXgudHMiLCAiLi4vc3JjL21haW4vdXRpbHMvZXh0ZXJuYWxMaW5rcy50cyIsICIuLi9zcmMvbWFpbi9pcGNNYWluLnRzIiwgIi4uL3NyYy9zaGFyZWQvb25jZURlZmluZWQudHMiLCAiLi4vc3JjL21haW4vcGF0Y2hXaW4zMlVwZGF0ZXIudHMiLCAiLi4vc3JjL21haW4vcGF0Y2hlci50cyIsICIuLi9zcmMvbWFpbi9pbmRleC50cyIsICIuLi9zcmMvbWFpbi91dGlscy9leHRlbnNpb25zLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9mZmxhdGVAMC43LjQvbm9kZV9tb2R1bGVzL2ZmbGF0ZS9lc20vaW5kZXgubWpzIiwgIi4uL3NyYy9tYWluL3V0aWxzL2NyeFRvWmlwLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5leHBvcnQgY29uc3QgUml2ZXJjb3JkRnJhZ21lbnQgPSAvKiAjX19QVVJFX18qLyBTeW1ib2wuZm9yKFwicmVhY3QuZnJhZ21lbnRcIik7XG5leHBvcnQgbGV0IFJpdmVyY29yZENyZWF0ZUVsZW1lbnQgPVxuICAgICguLi5hcmdzKSA9PiAoUml2ZXJjb3JkQ3JlYXRlRWxlbWVudCA9IFJpdmVyY29yZC5XZWJwYWNrLkNvbW1vbi5SZWFjdC5jcmVhdGVFbGVtZW50KSguLi5hcmdzKTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5leHBvcnQgY29uc3QgZW51bSBJcGNFdmVudHMge1xuICAgIFFVSUNLX0NTU19VUERBVEUgPSBcIlJpdmVyY29yZFF1aWNrQ3NzVXBkYXRlXCIsXG4gICAgVEhFTUVfVVBEQVRFID0gXCJSaXZlcmNvcmRUaGVtZVVwZGF0ZVwiLFxuICAgIEdFVF9RVUlDS19DU1MgPSBcIlJpdmVyY29yZEdldFF1aWNrQ3NzXCIsXG4gICAgU0VUX1FVSUNLX0NTUyA9IFwiUml2ZXJjb3JkU2V0UXVpY2tDc3NcIixcbiAgICBVUExPQURfVEhFTUUgPSBcIlJpdmVyY29yZFVwbG9hZFRoZW1lXCIsXG4gICAgREVMRVRFX1RIRU1FID0gXCJSaXZlcmNvcmREZWxldGVUaGVtZVwiLFxuICAgIEdFVF9USEVNRVNfRElSID0gXCJSaXZlcmNvcmRHZXRUaGVtZXNEaXJcIixcbiAgICBHRVRfVEhFTUVTX0xJU1QgPSBcIlJpdmVyY29yZEdldFRoZW1lc0xpc3RcIixcbiAgICBHRVRfVEhFTUVfREFUQSA9IFwiUml2ZXJjb3JkR2V0VGhlbWVEYXRhXCIsXG4gICAgR0VUX1RIRU1FX1NZU1RFTV9WQUxVRVMgPSBcIlJpdmVyY29yZEdldFRoZW1lU3lzdGVtVmFsdWVzXCIsXG4gICAgR0VUX1NFVFRJTkdTX0RJUiA9IFwiUml2ZXJjb3JkR2V0U2V0dGluZ3NEaXJcIixcbiAgICBHRVRfU0VUVElOR1MgPSBcIlJpdmVyY29yZEdldFNldHRpbmdzXCIsXG4gICAgU0VUX1NFVFRJTkdTID0gXCJSaXZlcmNvcmRTZXRTZXR0aW5nc1wiLFxuICAgIE9QRU5fRVhURVJOQUwgPSBcIlJpdmVyY29yZE9wZW5FeHRlcm5hbFwiLFxuICAgIE9QRU5fUVVJQ0tDU1MgPSBcIlJpdmVyY29yZE9wZW5RdWlja0Nzc1wiLFxuICAgIEdFVF9VUERBVEVTID0gXCJSaXZlcmNvcmRHZXRVcGRhdGVzXCIsXG4gICAgSVNfVVBEQVRFX1JFUVVJUkVEID0gXCJSaXZlcmNvcmRJc1VwZGF0ZVJlcXVpcmVkXCIsXG4gICAgR0VUX1JFUE8gPSBcIlJpdmVyY29yZEdldFJlcG9cIixcbiAgICBVUERBVEUgPSBcIlJpdmVyY29yZFVwZGF0ZVwiLFxuICAgIEJVSUxEID0gXCJSaXZlcmNvcmRCdWlsZFwiLFxuICAgIE9QRU5fTU9OQUNPX0VESVRPUiA9IFwiUml2ZXJjb3JkT3Blbk1vbmFjb0VkaXRvclwiLFxuXG4gICAgR0VUX1BMVUdJTl9JUENfTUVUSE9EX01BUCA9IFwiUml2ZXJjb3JkR2V0UGx1Z2luSXBjTWV0aG9kTWFwXCIsXG5cbiAgICBPUEVOX0lOX0FQUF9fUkVTT0xWRV9SRURJUkVDVCA9IFwiUml2ZXJjb3JkT0lBUmVzb2x2ZVJlZGlyZWN0XCIsXG4gICAgVk9JQ0VfTUVTU0FHRVNfUkVBRF9SRUNPUkRJTkcgPSBcIlJpdmVyY29yZFZNUmVhZFJlY29yZGluZ1wiLFxufVxuIiwgImV4cG9ydCBkZWZhdWx0IFwiNWE2MmE3ZWVcIiIsICJleHBvcnQgZGVmYXVsdCBcIlJpdmVyY29yZC9SaXZlcmNvcmRcIiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgZ2l0SGFzaCBmcm9tIFwifmdpdC1oYXNoXCI7XG5pbXBvcnQgZ2l0UmVtb3RlIGZyb20gXCJ+Z2l0LXJlbW90ZVwiO1xuXG5leHBvcnQgeyBnaXRIYXNoLCBnaXRSZW1vdGUgfTtcblxuZXhwb3J0IGNvbnN0IFJJVkVSQ09SRF9VU0VSX0FHRU5UID0gYFJpdmVyY29yZC8ke2dpdEhhc2h9JHtnaXRSZW1vdGUgPyBgIChodHRwczovL2dpdGh1Yi5jb20vJHtnaXRSZW1vdGV9KWAgOiBcIlwifWA7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwcy5SZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEJ1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwcy5nZXQodXJsLCBvcHRpb25zLCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0dXNDb2RlLCBzdGF0dXNNZXNzYWdlLCBoZWFkZXJzIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSEgPj0gNDAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlamVjdChgJHtzdGF0dXNDb2RlfTogJHtzdGF0dXNNZXNzYWdlfSAtICR7dXJsfWApO1xuICAgICAgICAgICAgaWYgKHN0YXR1c0NvZGUhID49IDMwMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCByZXNvbHZlKGdldChoZWFkZXJzLmxvY2F0aW9uISwgb3B0aW9ucykpO1xuXG4gICAgICAgICAgICBjb25zdCBjaHVua3MgPSBbXSBhcyBCdWZmZXJbXTtcbiAgICAgICAgICAgIHJlcy5vbihcImVycm9yXCIsIHJlamVjdCk7XG5cbiAgICAgICAgICAgIHJlcy5vbihcImRhdGFcIiwgY2h1bmsgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgICAgIHJlcy5vbmNlKFwiZW5kXCIsICgpID0+IHJlc29sdmUoQnVmZmVyLmNvbmNhdChjaHVua3MpKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmV4cG9ydCBjb25zdCBSSVZFUkNPUkRfRklMRVMgPSBbXG4gICAgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJwYXRjaGVyLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BNYWluLmpzXCIsXG4gICAgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJwcmVsb2FkLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BQcmVsb2FkLmpzXCIsXG4gICAgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJyZW5kZXJlci5qc1wiIDogXCJyaXZlcmNvcmREZXNrdG9wUmVuZGVyZXIuanNcIixcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInJlbmRlcmVyLmNzc1wiIDogXCJyaXZlcmNvcmREZXNrdG9wUmVuZGVyZXIuY3NzXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRXJyb3JzKGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSB7XG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGF3YWl0IGZ1bmMoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZSBpbnN0YW5jZW9mIEVycm9yID8ge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcm90b3R5cGVzIGdldCBsb3N0LCBzbyB0dXJuIGVycm9yIGludG8gcGxhaW4gb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIC4uLmVcbiAgICAgICAgICAgICAgICB9IDogZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCAiaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBSSVZFUkNPUkRfVVNFUl9BR0VOVCB9IGZyb20gXCJAc2hhcmVkL3JpdmVyY29yZFVzZXJBZ2VudFwiO1xuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgd3JpdGVGaWxlIH0gZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IGdpdEhhc2ggZnJvbSBcIn5naXQtaGFzaFwiO1xuaW1wb3J0IGdpdFJlbW90ZSBmcm9tIFwifmdpdC1yZW1vdGVcIjtcblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIi4uL3V0aWxzL3NpbXBsZUdldFwiO1xuaW1wb3J0IHsgUklWRVJDT1JEX0ZJTEVTLCBzZXJpYWxpemVFcnJvcnMgfSBmcm9tIFwiLi9jb21tb25cIjtcblxuY29uc3QgQVBJX0JBU0UgPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2dpdFJlbW90ZX1gO1xubGV0IFBlbmRpbmdVcGRhdGVzID0gW10gYXMgW3N0cmluZywgc3RyaW5nXVtdO1xuXG5hc3luYyBmdW5jdGlvbiBnaXRodWJHZXQoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgIHJldHVybiBnZXQoQVBJX0JBU0UgKyBlbmRwb2ludCwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vdm5kLmdpdGh1Yitqc29uXCIsXG4gICAgICAgICAgICAvLyBcIkFsbCBBUEkgcmVxdWVzdHMgTVVTVCBpbmNsdWRlIGEgdmFsaWQgVXNlci1BZ2VudCBoZWFkZXIuXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB3aXRoIG5vIFVzZXItQWdlbnQgaGVhZGVyIHdpbGwgYmUgcmVqZWN0ZWQuXCJcbiAgICAgICAgICAgIFwiVXNlci1BZ2VudFwiOiBSSVZFUkNPUkRfVVNFUl9BR0VOVFxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUdpdENoYW5nZXMoKSB7XG4gICAgYXdhaXQgZmV0Y2hVcGRhdGVzKCk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnaXRodWJHZXQoYC9jb21wYXJlLyR7Z2l0SGFzaH0uLi5IRUFEYCk7XG5cbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMudG9TdHJpbmcoXCJ1dGYtOFwiKSk7XG4gICAgcmV0dXJuIGRhdGEuY29tbWl0cy5tYXAoKGM6IGFueSkgPT4gKHtcbiAgICAgICAgLy8gZ2l0aHViIGFwaSBvbmx5IHNlbmRzIHRoZSBsb25nIHNoYVxuICAgICAgICBoYXNoOiBjLnNoYS5zbGljZSgwLCA3KSxcbiAgICAgICAgYXV0aG9yOiBjLmF1dGhvci5sb2dpbixcbiAgICAgICAgbWVzc2FnZTogYy5jb21taXQubWVzc2FnZS5zcGxpdChcIlxcblwiKVswXVxuICAgIH0pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaXNVcGRhdGVSZXF1aXJlZCgpIHtcbiAgICBjb25zdCByZW1vdGVHaXRIYXNoID0gYXdhaXQgZ2V0KFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1JpdmVyY29yZC9SaXZlcmNvcmQvbWFpbi9kaXN0L2dpdC1oYXNoLnR4dFwiKTtcbiAgICByZXR1cm4gcmVtb3RlR2l0SGFzaC50b1N0cmluZyhcInV0Zi04XCIpLnRyaW0oKSAhPT0gZ2l0SGFzaDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hVcGRhdGVzKCkge1xuICAgIGlmICghKGF3YWl0IGlzVXBkYXRlUmVxdWlyZWQoKSkpIHJldHVybiBmYWxzZTtcblxuICAgIFJJVkVSQ09SRF9GSUxFUy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBQZW5kaW5nVXBkYXRlcy5wdXNoKFxuICAgICAgICAgICAgW2ksIGBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUml2ZXJjb3JkL1JpdmVyY29yZC9tYWluL2Rpc3QvJHtpfWBdXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlVcGRhdGVzKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFBlbmRpbmdVcGRhdGVzLm1hcChcbiAgICAgICAgYXN5bmMgKFtuYW1lLCBkYXRhXSkgPT4gd3JpdGVGaWxlKFxuICAgICAgICAgICAgam9pbihfX2Rpcm5hbWUsIG5hbWUpLFxuICAgICAgICAgICAgYXdhaXQgZ2V0KGRhdGEpXG4gICAgICAgIClcbiAgICApKTtcbiAgICBQZW5kaW5nVXBkYXRlcyA9IFtdO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1JFUE8sIHNlcmlhbGl6ZUVycm9ycygoKSA9PiBgaHR0cHM6Ly9naXRodWIuY29tLyR7Z2l0UmVtb3RlfWApKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfVVBEQVRFUywgc2VyaWFsaXplRXJyb3JzKGNhbGN1bGF0ZUdpdENoYW5nZXMpKTtcbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5JU19VUERBVEVfUkVRVUlSRUQsIHNlcmlhbGl6ZUVycm9ycyhpc1VwZGF0ZVJlcXVpcmVkKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuVVBEQVRFLCBzZXJpYWxpemVFcnJvcnMoZmV0Y2hVcGRhdGVzKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuQlVJTEQsIHNlcmlhbGl6ZUVycm9ycyhhcHBseVVwZGF0ZXMpKTtcblxuY29uc29sZS5sb2coXCJbUml2ZXJjb3JkXSBVcGRhdGVyXCIsIHsgZ2l0SGFzaCwgZ2l0UmVtb3RlLCBfX2Rpcm5hbWUgfSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuLy8gaWYgKCFJU19VUERBVEVSX0RJU0FCTEVEKVxuLy8gICAgIHJlcXVpcmUoSVNfU1RBTkRBTE9ORSA/IFwiLi9odHRwXCIgOiBcIi4vZ2l0XCIpO1xuXG5pZiAoIUlTX1VQREFURVJfRElTQUJMRUQpXG4gICAgcmVxdWlyZShcIi4vaHR0cFwiKTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBleGVjRmlsZSB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tIFwidXRpbFwiO1xuXG5pbXBvcnQgdHlwZSB7IFRyYWNrRGF0YSB9IGZyb20gXCIuXCI7XG5cbmNvbnN0IGV4ZWMgPSBwcm9taXNpZnkoZXhlY0ZpbGUpO1xuXG4vLyBmdW5jdGlvbiBleGVjKGZpbGU6IHN0cmluZywgYXJnczogc3RyaW5nW10gPSBbXSkge1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IGNvZGU6IG51bWJlciB8IG51bGwsIHN0ZG91dDogc3RyaW5nIHwgbnVsbCwgc3RkZXJyOiBzdHJpbmcgfCBudWxsOyB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHByb2Nlc3MgPSBzcGF3bihmaWxlLCBhcmdzLCB7IHN0ZGlvOiBbbnVsbCwgXCJwaXBlXCIsIFwicGlwZVwiXSB9KTtcblxuLy8gICAgICAgICBsZXQgc3Rkb3V0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbi8vICAgICAgICAgcHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIChjaHVuazogc3RyaW5nKSA9PiB7IHN0ZG91dCA/Pz0gXCJcIjsgc3Rkb3V0ICs9IGNodW5rOyB9KTtcbi8vICAgICAgICAgbGV0IHN0ZGVycjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4vLyAgICAgICAgIHByb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCAoY2h1bms6IHN0cmluZykgPT4geyBzdGRvdXQgPz89IFwiXCI7IHN0ZGVyciArPSBjaHVuazsgfSk7XG5cbi8vICAgICAgICAgcHJvY2Vzcy5vbihcImV4aXRcIiwgY29kZSA9PiB7IHJlc29sdmUoeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9KTsgfSk7XG4vLyAgICAgICAgIHByb2Nlc3Mub24oXCJlcnJvclwiLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuLy8gICAgIH0pO1xuLy8gfVxuXG5hc3luYyBmdW5jdGlvbiBhcHBsZXNjcmlwdChjbWRzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKFwib3Nhc2NyaXB0XCIsIGNtZHMubWFwKGMgPT4gW1wiLWVcIiwgY10pLmZsYXQoKSk7XG4gICAgcmV0dXJuIHN0ZG91dDtcbn1cblxuZnVuY3Rpb24gbWFrZVNlYXJjaFVybCh0eXBlOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKFwiaHR0cHM6Ly90b29scy5hcHBsZW1lZGlhc2VydmljZXMuY29tL2FwaS9hcHBsZS1tZWRpYS9tdXNpYy9VUy9zZWFyY2guanNvblwiKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChcInR5cGVzXCIsIHR5cGUpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwibGltaXRcIiwgXCIxXCIpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwidGVybVwiLCBxdWVyeSk7XG4gICAgcmV0dXJuIHVybDtcbn1cblxuY29uc3QgcmVxdWVzdE9wdGlvbnM6IFJlcXVlc3RJbml0ID0ge1xuICAgIGhlYWRlcnM6IHsgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgcnY6MTI1LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMTI1LjBcIiB9LFxufTtcblxuaW50ZXJmYWNlIFJlbW90ZURhdGEge1xuICAgIGFwcGxlTXVzaWNMaW5rPzogc3RyaW5nLFxuICAgIHNvbmdMaW5rPzogc3RyaW5nLFxuICAgIGFsYnVtQXJ0d29yaz86IHN0cmluZyxcbiAgICBhcnRpc3RBcnR3b3JrPzogc3RyaW5nO1xufVxuXG5sZXQgY2FjaGVkUmVtb3RlRGF0YTogeyBpZDogc3RyaW5nLCBkYXRhOiBSZW1vdGVEYXRhOyB9IHwgeyBpZDogc3RyaW5nLCBmYWlsdXJlczogbnVtYmVyOyB9IHwgbnVsbCA9IG51bGw7XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoUmVtb3RlRGF0YSh7IGlkLCBuYW1lLCBhcnRpc3QsIGFsYnVtIH06IHsgaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhcnRpc3Q6IHN0cmluZywgYWxidW06IHN0cmluZzsgfSkge1xuICAgIGlmIChpZCA9PT0gY2FjaGVkUmVtb3RlRGF0YT8uaWQpIHtcbiAgICAgICAgaWYgKFwiZGF0YVwiIGluIGNhY2hlZFJlbW90ZURhdGEpIHJldHVybiBjYWNoZWRSZW1vdGVEYXRhLmRhdGE7XG4gICAgICAgIGlmIChcImZhaWx1cmVzXCIgaW4gY2FjaGVkUmVtb3RlRGF0YSAmJiBjYWNoZWRSZW1vdGVEYXRhLmZhaWx1cmVzID49IDUpIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtzb25nRGF0YSwgYXJ0aXN0RGF0YV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChtYWtlU2VhcmNoVXJsKFwic29uZ3NcIiwgYXJ0aXN0ICsgXCIgXCIgKyBhbGJ1bSArIFwiIFwiICsgbmFtZSksIHJlcXVlc3RPcHRpb25zKS50aGVuKHIgPT4gci5qc29uKCkpLFxuICAgICAgICAgICAgZmV0Y2gobWFrZVNlYXJjaFVybChcImFydGlzdHNcIiwgYXJ0aXN0LnNwbGl0KC8gKlssJl0gKi8pWzBdKSwgcmVxdWVzdE9wdGlvbnMpLnRoZW4ociA9PiByLmpzb24oKSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYXBwbGVNdXNpY0xpbmsgPSBzb25nRGF0YT8uc29uZ3M/LmRhdGFbMF0/LmF0dHJpYnV0ZXMudXJsO1xuICAgICAgICBjb25zdCBzb25nTGluayA9IHNvbmdEYXRhPy5zb25ncz8uZGF0YVswXT8uaWQgPyBgaHR0cHM6Ly9zb25nLmxpbmsvaS8ke3NvbmdEYXRhPy5zb25ncz8uZGF0YVswXT8uaWR9YCA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjb25zdCBhbGJ1bUFydHdvcmsgPSBzb25nRGF0YT8uc29uZ3M/LmRhdGFbMF0/LmF0dHJpYnV0ZXMuYXJ0d29yay51cmwucmVwbGFjZShcInt3fVwiLCBcIjUxMlwiKS5yZXBsYWNlKFwie2h9XCIsIFwiNTEyXCIpO1xuICAgICAgICBjb25zdCBhcnRpc3RBcnR3b3JrID0gYXJ0aXN0RGF0YT8uYXJ0aXN0cz8uZGF0YVswXT8uYXR0cmlidXRlcy5hcnR3b3JrLnVybC5yZXBsYWNlKFwie3d9XCIsIFwiNTEyXCIpLnJlcGxhY2UoXCJ7aH1cIiwgXCI1MTJcIik7XG5cbiAgICAgICAgY2FjaGVkUmVtb3RlRGF0YSA9IHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgZGF0YTogeyBhcHBsZU11c2ljTGluaywgc29uZ0xpbmssIGFsYnVtQXJ0d29yaywgYXJ0aXN0QXJ0d29yayB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYWNoZWRSZW1vdGVEYXRhLmRhdGE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW0FwcGxlTXVzaWNSaWNoUHJlc2VuY2VdIEZhaWxlZCB0byBmZXRjaCByZW1vdGUgZGF0YTpcIiwgZSk7XG4gICAgICAgIGNhY2hlZFJlbW90ZURhdGEgPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGZhaWx1cmVzOiAoaWQgPT09IGNhY2hlZFJlbW90ZURhdGE/LmlkICYmIFwiZmFpbHVyZXNcIiBpbiBjYWNoZWRSZW1vdGVEYXRhID8gY2FjaGVkUmVtb3RlRGF0YS5mYWlsdXJlcyA6IDApICsgMVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRyYWNrRGF0YSgpOiBQcm9taXNlPFRyYWNrRGF0YSB8IG51bGw+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBleGVjKFwicGdyZXBcIiwgW1wiXk11c2ljJFwiXSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyU3RhdGUgPSBhd2FpdCBhcHBsZXNjcmlwdChbJ3RlbGwgYXBwbGljYXRpb24gXCJNdXNpY1wiJywgXCJnZXQgcGxheWVyIHN0YXRlXCIsIFwiZW5kIHRlbGxcIl0pXG4gICAgICAgIC50aGVuKG91dCA9PiBvdXQudHJpbSgpKTtcbiAgICBpZiAocGxheWVyU3RhdGUgIT09IFwicGxheWluZ1wiKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHBsYXllclBvc2l0aW9uID0gYXdhaXQgYXBwbGVzY3JpcHQoWyd0ZWxsIGFwcGxpY2F0aW9uIFwiTXVzaWNcIicsIFwiZ2V0IHBsYXllciBwb3NpdGlvblwiLCBcImVuZCB0ZWxsXCJdKVxuICAgICAgICAudGhlbih0ZXh0ID0+IE51bWJlci5wYXJzZUZsb2F0KHRleHQudHJpbSgpKSk7XG5cbiAgICBjb25zdCBzdGRvdXQgPSBhd2FpdCBhcHBsZXNjcmlwdChbXG4gICAgICAgICdzZXQgb3V0cHV0IHRvIFwiXCInLFxuICAgICAgICAndGVsbCBhcHBsaWNhdGlvbiBcIk11c2ljXCInLFxuICAgICAgICBcInNldCB0X2lkIHRvIGRhdGFiYXNlIGlkIG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9uYW1lIHRvIG5hbWUgb2YgY3VycmVudCB0cmFja1wiLFxuICAgICAgICBcInNldCB0X2FsYnVtIHRvIGFsYnVtIG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9hcnRpc3QgdG8gYXJ0aXN0IG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9kdXJhdGlvbiB0byBkdXJhdGlvbiBvZiBjdXJyZW50IHRyYWNrXCIsXG4gICAgICAgICdzZXQgb3V0cHV0IHRvIFwiXCIgJiB0X2lkICYgXCJcXFxcblwiICYgdF9uYW1lICYgXCJcXFxcblwiICYgdF9hbGJ1bSAmIFwiXFxcXG5cIiAmIHRfYXJ0aXN0ICYgXCJcXFxcblwiICYgdF9kdXJhdGlvbicsXG4gICAgICAgIFwiZW5kIHRlbGxcIixcbiAgICAgICAgXCJyZXR1cm4gb3V0cHV0XCJcbiAgICBdKTtcblxuICAgIGNvbnN0IFtpZCwgbmFtZSwgYWxidW0sIGFydGlzdCwgZHVyYXRpb25TdHJdID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpLmZpbHRlcihrID0+ICEhayk7XG4gICAgY29uc3QgZHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdChkdXJhdGlvblN0cik7XG5cbiAgICBjb25zdCByZW1vdGVEYXRhID0gYXdhaXQgZmV0Y2hSZW1vdGVEYXRhKHsgaWQsIG5hbWUsIGFydGlzdCwgYWxidW0gfSk7XG5cbiAgICByZXR1cm4geyBuYW1lLCBhbGJ1bSwgYXJ0aXN0LCBwbGF5ZXJQb3NpdGlvbiwgZHVyYXRpb24sIC4uLnJlbW90ZURhdGEgfTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREZXZ0b29sc09wZW5FYWdlckxvYWQoZTogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgY29uc3QgaGFuZGxlRGV2dG9vbHNPcGVuZWQgPSAoKSA9PiBlLnNlbmRlci5leGVjdXRlSmF2YVNjcmlwdChcIlJpdmVyY29yZC5QbHVnaW5zLnBsdWdpbnMuQ29uc29sZVNob3J0Y3V0cy5lYWdlckxvYWQodHJ1ZSlcIik7XG5cbiAgICBpZiAoZS5zZW5kZXIuaXNEZXZUb29sc09wZW5lZCgpKVxuICAgICAgICBoYW5kbGVEZXZ0b29sc09wZW5lZCgpO1xuICAgIGVsc2VcbiAgICAgICAgZS5zZW5kZXIub25jZShcImRldnRvb2xzLW9wZW5lZFwiLCAoKSA9PiBoYW5kbGVEZXZ0b29sc09wZW5lZCgpKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBMaXRlcmFsVW5pb24gfSBmcm9tIFwidHlwZS1mZXN0XCI7XG5cbi8vIFJlc29sdmVzIGEgcG9zc2libHkgbmVzdGVkIHByb3AgaW4gdGhlIGZvcm0gb2YgXCJzb21lLm5lc3RlZC5wcm9wXCIgdG8gdHlwZSBvZiBULnNvbWUubmVzdGVkLnByb3BcbnR5cGUgUmVzb2x2ZVByb3BEZWVwPFQsIFA+ID0gUCBleHRlbmRzIGAke2luZmVyIFByZX0uJHtpbmZlciBTdWZ9YFxuICAgID8gUHJlIGV4dGVuZHMga2V5b2YgVFxuICAgID8gUmVzb2x2ZVByb3BEZWVwPFRbUHJlXSwgU3VmPlxuICAgIDogYW55XG4gICAgOiBQIGV4dGVuZHMga2V5b2YgVFxuICAgID8gVFtQXVxuICAgIDogYW55O1xuXG5pbnRlcmZhY2UgU2V0dGluZ3NTdG9yZU9wdGlvbnMge1xuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICBnZXREZWZhdWx0VmFsdWU/OiAoZGF0YToge1xuICAgICAgICB0YXJnZXQ6IGFueTtcbiAgICAgICAga2V5OiBzdHJpbmc7XG4gICAgICAgIHJvb3Q6IGFueTtcbiAgICAgICAgcGF0aDogc3RyaW5nO1xuICAgIH0pID0+IGFueTtcbn1cblxuLy8gbWVyZ2VzIHRoZSBTZXR0aW5nc1N0b3JlT3B0aW9ucyB0eXBlIGludG8gdGhlIGNsYXNzXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzU3RvcmU8VCBleHRlbmRzIG9iamVjdD4gZXh0ZW5kcyBTZXR0aW5nc1N0b3JlT3B0aW9ucyB7IH1cblxuLyoqXG4gKiBUaGUgU2V0dGluZ3NTdG9yZSBhbGxvd3MgeW91IHRvIGVhc2lseSBjcmVhdGUgYSBtdXRhYmxlIHN0b3JlIHRoYXRcbiAqIGhhcyBzdXBwb3J0IGZvciBnbG9iYWwgYW5kIHBhdGgtYmFzZWQgY2hhbmdlIGxpc3RlbmVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdzU3RvcmU8VCBleHRlbmRzIG9iamVjdD4ge1xuICAgIHByaXZhdGUgcGF0aExpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8KG5ld0RhdGE6IGFueSkgPT4gdm9pZD4+KCk7XG4gICAgcHJpdmF0ZSBnbG9iYWxMaXN0ZW5lcnMgPSBuZXcgU2V0PChuZXdEYXRhOiBULCBwYXRoOiBzdHJpbmcpID0+IHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RvcmUgb2JqZWN0LiBNYWtpbmcgY2hhbmdlcyB0byB0aGlzIG9iamVjdCB3aWxsIHRyaWdnZXIgdGhlIGFwcGxpY2FibGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHN0b3JlOiBUO1xuICAgIC8qKlxuICAgICAqIFRoZSBwbGFpbiBkYXRhLiBDaGFuZ2VzIHRvIHRoaXMgb2JqZWN0IHdpbGwgbm90IHRyaWdnZXIgYW55IGNoYW5nZSBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBwbGFpbjogVDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGFpbjogVCwgb3B0aW9uczogU2V0dGluZ3NTdG9yZU9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnBsYWluID0gcGxhaW47XG4gICAgICAgIHRoaXMuc3RvcmUgPSB0aGlzLm1ha2VQcm94eShwbGFpbik7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUHJveHkob2JqZWN0OiBhbnksIHJvb3Q6IFQgPSBvYmplY3QsIHBhdGg6IHN0cmluZyA9IFwiXCIpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShvYmplY3QsIHtcbiAgICAgICAgICAgIGdldCh0YXJnZXQsIGtleTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IHYgPSB0YXJnZXRba2V5XTtcblxuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiB0YXJnZXQpICYmIHNlbGYuZ2V0RGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHYgPSBzZWxmLmdldERlZmF1bHRWYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICByb290LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubWFrZVByb3h5KHYsIHJvb3QsIGAke3BhdGh9JHtwYXRoICYmIFwiLlwifSR7a2V5fWApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHRhcmdldCwga2V5OiBzdHJpbmcsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFtrZXldID09PSB2YWx1ZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNldFBhdGggPSBgJHtwYXRofSR7cGF0aCAmJiBcIi5cIn0ke2tleX1gO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5nbG9iYWxMaXN0ZW5lcnMuZm9yRWFjaChjYiA9PiBjYih2YWx1ZSwgc2V0UGF0aCkpO1xuICAgICAgICAgICAgICAgIHNlbGYucGF0aExpc3RlbmVycy5nZXQoc2V0UGF0aCk/LmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRhdGEgb2YgdGhlIHN0b3JlLlxuICAgICAqIFRoaXMgd2lsbCB1cGRhdGUgdGhpcy5zdG9yZSBhbmQgdGhpcy5wbGFpbiAoYW5kIG9sZCByZWZlcmVuY2VzIHRvIHRoZW0gd2lsbCBiZSBzdGFsZSEgQXZvaWQgc3RvcmluZyB0aGVtIGluIHZhcmlhYmxlcylcbiAgICAgKlxuICAgICAqIEFkZGl0aW9uYWxseSwgYWxsIGdsb2JhbCBsaXN0ZW5lcnMgKGFuZCB0aG9zZSBmb3IgcGF0aFRvTm90aWZ5LCBpZiBzcGVjaWZpZWQpIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBkYXRhXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyBkYXRhXG4gICAgICogQHBhcmFtIHBhdGhUb05vdGlmeSBPcHRpb25hbCBwYXRoIHRvIG5vdGlmeSBpbnN0ZWFkIG9mIGdsb2JhbGx5LiBVc2VkIHRvIHRyYW5zZmVyIHBhdGggdmlhIGlwY1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXREYXRhKHZhbHVlOiBULCBwYXRoVG9Ob3RpZnk/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHRocm93IG5ldyBFcnJvcihcIlNldHRpbmdzU3RvcmUgaXMgcmVhZC1vbmx5XCIpO1xuXG4gICAgICAgIHRoaXMucGxhaW4gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHRoaXMubWFrZVByb3h5KHZhbHVlKTtcblxuICAgICAgICBpZiAocGF0aFRvTm90aWZ5KSB7XG4gICAgICAgICAgICBsZXQgdiA9IHZhbHVlO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gcGF0aFRvTm90aWZ5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBwYXRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgICAgIGBTZXR0aW5ncyNzZXREYXRhOiBQYXRoICR7cGF0aFRvTm90aWZ5fSBkb2VzIG5vdCBleGlzdCBpbiBuZXcgZGF0YS4gTm90IGRpc3BhdGNoaW5nIHVwZGF0ZWBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2ID0gdltwXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYXRoTGlzdGVuZXJzLmdldChwYXRoVG9Ob3RpZnkpPy5mb3JFYWNoKGNiID0+IGNiKHYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFya0FzQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGdsb2JhbCBjaGFuZ2UgbGlzdGVuZXIsIHRoYXQgd2lsbCBmaXJlIHdoZW5ldmVyIGFueSBzZXR0aW5nIGlzIGNoYW5nZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBuZXcgZGF0YS4gVGhpcyBpcyBlaXRoZXIgdGhlIG5ldyB2YWx1ZSBzZXQgb24gdGhlIHBhdGgsIG9yIHRoZSBuZXcgcm9vdCBvYmplY3QgaWYgaXQgd2FzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBvZiB0aGUgc2V0dGluZyB0aGF0IHdhcyBjaGFuZ2VkLiBFbXB0eSBzdHJpbmcgaWYgdGhlIHJvb3Qgb2JqZWN0IHdhcyBjaGFuZ2VkXG4gICAgICovXG4gICAgcHVibGljIGFkZEdsb2JhbENoYW5nZUxpc3RlbmVyKGNiOiAoZGF0YTogYW55LCBwYXRoOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxMaXN0ZW5lcnMuYWRkKGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBzY29wZWQgY2hhbmdlIGxpc3RlbmVyIHRoYXQgd2lsbCBmaXJlIHdoZW5ldmVyIGEgc2V0dGluZyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHBhdGggaXMgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlIGlmIHBhdGggaXMgYFwiZm9vLmJhclwiYCwgdGhlIGxpc3RlbmVyIHdpbGwgZmlyZSBvblxuICAgICAqIGBgYGpzXG4gICAgICogU2V0dGluZy5zdG9yZS5mb28uYmFyID0gXCJoaVwiXG4gICAgICogYGBgXG4gICAgICogYnV0IG5vdCBvblxuICAgICAqIGBgYGpzXG4gICAgICogU2V0dGluZy5zdG9yZS5mb28uYmF6ID0gXCJoaVwiXG4gICAgICogYGBgXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcGFyYW0gY2JcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkQ2hhbmdlTGlzdGVuZXI8UCBleHRlbmRzIExpdGVyYWxVbmlvbjxrZXlvZiBULCBzdHJpbmc+PihcbiAgICAgICAgcGF0aDogUCxcbiAgICAgICAgY2I6IChkYXRhOiBSZXNvbHZlUHJvcERlZXA8VCwgUD4pID0+IHZvaWRcbiAgICApIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5wYXRoTGlzdGVuZXJzLmdldChwYXRoIGFzIHN0cmluZykgPz8gbmV3IFNldCgpO1xuICAgICAgICBsaXN0ZW5lcnMuYWRkKGNiKTtcbiAgICAgICAgdGhpcy5wYXRoTGlzdGVuZXJzLnNldChwYXRoIGFzIHN0cmluZywgbGlzdGVuZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBnbG9iYWwgbGlzdGVuZXJcbiAgICAgKiBAc2VlIHtAbGluayBhZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlR2xvYmFsQ2hhbmdlTGlzdGVuZXIoY2I6IChkYXRhOiBhbnksIHBhdGg6IHN0cmluZykgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmdsb2JhbExpc3RlbmVycy5kZWxldGUoY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHNjb3BlZCBsaXN0ZW5lclxuICAgICAqIEBzZWUge0BsaW5rIGFkZENoYW5nZUxpc3RlbmVyfVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVDaGFuZ2VMaXN0ZW5lcihwYXRoOiBMaXRlcmFsVW5pb248a2V5b2YgVCwgc3RyaW5nPiwgY2I6IChkYXRhOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5wYXRoTGlzdGVuZXJzLmdldChwYXRoIGFzIHN0cmluZyk7XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShjYik7XG4gICAgICAgIGlmICghbGlzdGVuZXJzLnNpemUpIHRoaXMucGF0aExpc3RlbmVycy5kZWxldGUocGF0aCBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgYWxsIGdsb2JhbCBjaGFuZ2UgbGlzdGVuZXJzXG4gICAgICovXG4gICAgcHVibGljIG1hcmtBc0NoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzLmZvckVhY2goY2IgPT4gY2IodGhpcy5wbGFpbiwgXCJcIikpO1xuICAgIH1cbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBkZWZhdWx0cyBpbnRvIGFuIG9iamVjdCBhbmQgcmV0dXJucyB0aGUgc2FtZSBvYmplY3RcbiAqIEBwYXJhbSBvYmogT2JqZWN0XG4gKiBAcGFyYW0gZGVmYXVsdHMgRGVmYXVsdHNcbiAqIEByZXR1cm5zIG9ialxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWZhdWx0czxUPihvYmo6IFQsIGRlZmF1bHRzOiBUKTogVCB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgICAgY29uc3QgdiA9IGRlZmF1bHRzW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPz89IHt9IGFzIGFueTtcbiAgICAgICAgICAgIG1lcmdlRGVmYXVsdHMob2JqW2tleV0sIHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPz89IHY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgY29uc3QgREFUQV9ESVIgPSBwcm9jZXNzLmVudi5SSVZFUkNPUkRfVVNFUl9EQVRBX0RJUiA/PyAoXG4gICAgcHJvY2Vzcy5lbnYuRElTQ09SRF9VU0VSX0RBVEFfRElSXG4gICAgICAgID8gam9pbihwcm9jZXNzLmVudi5ESVNDT1JEX1VTRVJfREFUQV9ESVIsIFwiLi5cIiwgXCJSaXZlcmNvcmREYXRhXCIpXG4gICAgICAgIDogam9pbihhcHAuZ2V0UGF0aChcInVzZXJEYXRhXCIpLCBcIi4uXCIsIFwiUml2ZXJjb3JkXCIpXG4pO1xuZXhwb3J0IGNvbnN0IFNFVFRJTkdTX0RJUiA9IGpvaW4oREFUQV9ESVIsIFwic2V0dGluZ3NcIik7XG5leHBvcnQgY29uc3QgVEhFTUVTX0RJUiA9IGpvaW4oREFUQV9ESVIsIFwidGhlbWVzXCIpO1xuZXhwb3J0IGNvbnN0IFFVSUNLQ1NTX1BBVEggPSBqb2luKFNFVFRJTkdTX0RJUiwgXCJxdWlja0Nzcy5jc3NcIik7XG5leHBvcnQgY29uc3QgU0VUVElOR1NfRklMRSA9IGpvaW4oU0VUVElOR1NfRElSLCBcInNldHRpbmdzLmpzb25cIik7XG5leHBvcnQgY29uc3QgTkFUSVZFX1NFVFRJTkdTX0ZJTEUgPSBqb2luKFNFVFRJTkdTX0RJUiwgXCJuYXRpdmUtc2V0dGluZ3MuanNvblwiKTtcbmV4cG9ydCBjb25zdCBBTExPV0VEX1BST1RPQ09MUyA9IFtcbiAgICBcImh0dHBzOlwiLFxuICAgIFwiaHR0cDpcIixcbiAgICBcInN0ZWFtOlwiLFxuICAgIFwic3BvdGlmeTpcIixcbiAgICBcImNvbS5lcGljZ2FtZXMubGF1bmNoZXI6XCIsXG4gICAgXCJ0aWRhbDpcIlxuXTtcblxuZXhwb3J0IGNvbnN0IElTX1ZBTklMTEEgPSAvKiBAX19QVVJFX18gKi8gcHJvY2Vzcy5hcmd2LmluY2x1ZGVzKFwiLS12YW5pbGxhXCIpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tIFwiQGFwaS9TZXR0aW5nc1wiO1xuaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSBcIkBzaGFyZWQvU2V0dGluZ3NTdG9yZVwiO1xuaW1wb3J0IHsgbWVyZ2VEZWZhdWx0cyB9IGZyb20gXCJAdXRpbHMvbWVyZ2VEZWZhdWx0c1wiO1xuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuaW1wb3J0IHsgTkFUSVZFX1NFVFRJTkdTX0ZJTEUsIFNFVFRJTkdTX0RJUiwgU0VUVElOR1NfRklMRSB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5ta2RpclN5bmMoU0VUVElOR1NfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gcmVhZFNldHRpbmdzPFQgPSBvYmplY3Q+KG5hbWU6IHN0cmluZywgZmlsZTogc3RyaW5nKTogUGFydGlhbDxUPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGZpbGUsIFwidXRmLThcIikpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGlmIChlcnI/LmNvZGUgIT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcmVhZCAke25hbWV9IHNldHRpbmdzYCwgZXJyKTtcblxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUmVuZGVyZXJTZXR0aW5ncyA9IG5ldyBTZXR0aW5nc1N0b3JlKHJlYWRTZXR0aW5nczxTZXR0aW5ncz4oXCJyZW5kZXJlclwiLCBTRVRUSU5HU19GSUxFKSk7XG5cblJlbmRlcmVyU2V0dGluZ3MuYWRkR2xvYmFsQ2hhbmdlTGlzdGVuZXIoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHdyaXRlRmlsZVN5bmMoU0VUVElOR1NfRklMRSwgSlNPTi5zdHJpbmdpZnkoUmVuZGVyZXJTZXR0aW5ncy5wbGFpbiwgbnVsbCwgNCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3cml0ZSByZW5kZXJlciBzZXR0aW5nc1wiLCBlKTtcbiAgICB9XG59KTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9TRVRUSU5HU19ESVIsICgpID0+IFNFVFRJTkdTX0RJUik7XG5pcGNNYWluLm9uKElwY0V2ZW50cy5HRVRfU0VUVElOR1MsIGUgPT4gZS5yZXR1cm5WYWx1ZSA9IFJlbmRlcmVyU2V0dGluZ3MucGxhaW4pO1xuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuU0VUX1NFVFRJTkdTLCAoXywgZGF0YTogU2V0dGluZ3MsIHBhdGhUb05vdGlmeT86IHN0cmluZykgPT4ge1xuICAgIFJlbmRlcmVyU2V0dGluZ3Muc2V0RGF0YShkYXRhLCBwYXRoVG9Ob3RpZnkpO1xufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF0aXZlU2V0dGluZ3Mge1xuICAgIHBsdWdpbnM6IHtcbiAgICAgICAgW3BsdWdpbjogc3RyaW5nXToge1xuICAgICAgICAgICAgW3NldHRpbmc6IHN0cmluZ106IGFueTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5jb25zdCBEZWZhdWx0TmF0aXZlU2V0dGluZ3M6IE5hdGl2ZVNldHRpbmdzID0ge1xuICAgIHBsdWdpbnM6IHt9XG59O1xuXG5jb25zdCBuYXRpdmVTZXR0aW5ncyA9IHJlYWRTZXR0aW5nczxOYXRpdmVTZXR0aW5ncz4oXCJuYXRpdmVcIiwgTkFUSVZFX1NFVFRJTkdTX0ZJTEUpO1xubWVyZ2VEZWZhdWx0cyhuYXRpdmVTZXR0aW5ncywgRGVmYXVsdE5hdGl2ZVNldHRpbmdzKTtcblxuZXhwb3J0IGNvbnN0IE5hdGl2ZVNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmUobmF0aXZlU2V0dGluZ3MpO1xuXG5OYXRpdmVTZXR0aW5ncy5hZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcigoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhOQVRJVkVfU0VUVElOR1NfRklMRSwgSlNPTi5zdHJpbmdpZnkoTmF0aXZlU2V0dGluZ3MucGxhaW4sIG51bGwsIDQpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgbmF0aXZlIHNldHRpbmdzXCIsIGUpO1xuICAgIH1cbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiQG1haW4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChfLCB3aW4pID0+IHtcbiAgICB3aW4ud2ViQ29udGVudHMub24oXCJmcmFtZS1jcmVhdGVkXCIsIChfLCB7IGZyYW1lIH0pID0+IHtcbiAgICAgICAgZnJhbWUub25jZShcImRvbS1yZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJhbWUudXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL29wZW4uc3BvdGlmeS5jb20vZW1iZWQvXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LkZpeFNwb3RpZnlFbWJlZHM7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncz8uZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZnJhbWUuZXhlY3V0ZUphdmFTY3JpcHQoYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IEF1ZGlvLnByb3RvdHlwZS5wbGF5O1xuICAgICAgICAgICAgICAgICAgICBBdWRpby5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52b2x1bWUgPSAkeyhzZXR0aW5ncy52b2x1bWUgLyAxMDApIHx8IDAuMX07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiQG1haW4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChfLCB3aW4pID0+IHtcbiAgICB3aW4ud2ViQ29udGVudHMub24oXCJmcmFtZS1jcmVhdGVkXCIsIChfLCB7IGZyYW1lIH0pID0+IHtcbiAgICAgICAgZnJhbWUub25jZShcImRvbS1yZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJhbWUudXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFJlbmRlcmVyU2V0dGluZ3Muc3RvcmUucGx1Z2lucz8uRml4WW91dHViZUVtYmVkcztcbiAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzPy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmcmFtZS5leGVjdXRlSmF2YVNjcmlwdChgXG4gICAgICAgICAgICAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi55dHAtZXJyb3ItY29udGVudC13cmFwLXN1YnJlYXNvbiBhW2hyZWYqPVwid3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9XCJdJylcbiAgICAgICAgICAgICAgICAgICAgKSBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgICAgICAgIH0pLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6dHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBDaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMsIGV4ZWNGaWxlU3luYywgc3Bhd24gfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgSXBjTWFpbkludm9rZUV2ZW50IH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBvcyBmcm9tIFwib3NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbnR5cGUgRm9ybWF0ID0gXCJ2aWRlb1wiIHwgXCJhdWRpb1wiIHwgXCJnaWZcIjtcbnR5cGUgRG93bmxvYWRPcHRpb25zID0ge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGZvcm1hdD86IEZvcm1hdDtcbiAgICBnaWZRdWFsaXR5PzogMSB8IDIgfCAzIHwgNCB8IDU7XG4gICAgeXRkbHBBcmdzPzogc3RyaW5nW107XG4gICAgZmZtcGVnQXJncz86IHN0cmluZ1tdO1xuICAgIG1heEZpbGVTaXplPzogbnVtYmVyO1xufTtcblxubGV0IHdvcmtkaXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xubGV0IHN0ZG91dF9nbG9iYWw6IHN0cmluZyA9IFwiXCI7XG5sZXQgbG9nc19nbG9iYWw6IHN0cmluZyA9IFwiXCI7XG5cbmxldCB5dGRscEF2YWlsYWJsZSA9IGZhbHNlO1xubGV0IGZmbXBlZ0F2YWlsYWJsZSA9IGZhbHNlO1xuXG5sZXQgeXRkbHBQcm9jZXNzOiBDaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMgfCBudWxsID0gbnVsbDtcbmxldCBmZm1wZWdQcm9jZXNzOiBDaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMgfCBudWxsID0gbnVsbDtcblxuY29uc3QgZ2V0ZGlyID0gKCkgPT4gd29ya2RpciA/PyBwcm9jZXNzLmN3ZCgpO1xuY29uc3QgcCA9IChmaWxlOiBzdHJpbmcpID0+IHBhdGguam9pbihnZXRkaXIoKSwgZmlsZSk7XG5jb25zdCBjbGVhblZpZGVvRmlsZXMgPSAoKSA9PiB7XG4gICAgaWYgKCF3b3JrZGlyKSByZXR1cm47XG4gICAgZnMucmVhZGRpclN5bmMod29ya2RpcilcbiAgICAgICAgLmZpbHRlcihmID0+IGYuc3RhcnRzV2l0aChcImRvd25sb2FkLlwiKSB8fCBmLnN0YXJ0c1dpdGgoXCJyZW11eC5cIikpXG4gICAgICAgIC5mb3JFYWNoKGYgPT4gZnMudW5saW5rU3luYyhwKGYpKSk7XG59O1xuY29uc3QgYXBwZW5kT3V0ID0gKGRhdGE6IHN0cmluZykgPT4gKCAvLyBNYWtlcyBjYXJyaWFnZSByZXR1cm4gKFxccikgd29ya1xuICAgIChzdGRvdXRfZ2xvYmFsICs9IGRhdGEpLCAoc3Rkb3V0X2dsb2JhbCA9IHN0ZG91dF9nbG9iYWwucmVwbGFjZSgvXi4qXFxyKFteXFxuXSkvZ20sIFwiJDFcIikpKTtcbmNvbnN0IGxvZyA9ICguLi5kYXRhOiBzdHJpbmdbXSkgPT4gKGNvbnNvbGUubG9nKGBbUGx1Z2luOk1lZGlhRG93bmxvYWRlcl0gJHtkYXRhLmpvaW4oXCIgXCIpfWApLCBsb2dzX2dsb2JhbCArPSBgW1BsdWdpbjpNZWRpYURvd25sb2FkZXJdICR7ZGF0YS5qb2luKFwiIFwiKX1cXG5gKTtcbmNvbnN0IGVycm9yID0gKC4uLmRhdGE6IHN0cmluZ1tdKSA9PiBjb25zb2xlLmVycm9yKGBbUGx1Z2luOk1lZGlhRG93bmxvYWRlcl0gW0VSUk9SXSAke2RhdGEuam9pbihcIiBcIil9YCk7XG5cbmZ1bmN0aW9uIHl0ZGxwKGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsb2coYEV4ZWN1dGluZyB5dC1kbHAgd2l0aCBhcmdzOiBbXCIke2FyZ3MubWFwKGEgPT4gYS5yZXBsYWNlKCdcIicsICdcXFxcXCInKSkuam9pbignXCIsIFwiJyl9XCJdYCk7XG4gICAgbGV0IGVycm9yTXNnID0gXCJcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgeXRkbHBQcm9jZXNzID0gc3Bhd24oXCJ5dC1kbHBcIiwgYXJncywge1xuICAgICAgICAgICAgY3dkOiBnZXRkaXIoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgeXRkbHBQcm9jZXNzLnN0ZG91dC5vbihcImRhdGFcIiwgZGF0YSA9PiBhcHBlbmRPdXQoZGF0YSkpO1xuICAgICAgICB5dGRscFByb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCBkYXRhID0+IHtcbiAgICAgICAgICAgIGFwcGVuZE91dChkYXRhKTtcbiAgICAgICAgICAgIGVycm9yKGB5dC1kbHAgZW5jb3VudGVyZWQgYW4gZXJyb3I6ICR7ZGF0YX1gKTtcbiAgICAgICAgICAgIGVycm9yTXNnICs9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB5dGRscFByb2Nlc3Mub24oXCJleGl0XCIsIGNvZGUgPT4ge1xuICAgICAgICAgICAgeXRkbHBQcm9jZXNzID0gbnVsbDtcbiAgICAgICAgICAgIGNvZGUgPT09IDAgPyByZXNvbHZlKHN0ZG91dF9nbG9iYWwpIDogcmVqZWN0KG5ldyBFcnJvcihlcnJvck1zZyB8fCBgeXQtZGxwIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZm1wZWcoYXJnczogc3RyaW5nW10pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxvZyhgRXhlY3V0aW5nIGZmbXBlZyB3aXRoIGFyZ3M6IFtcIiR7YXJncy5tYXAoYSA9PiBhLnJlcGxhY2UoJ1wiJywgJ1xcXFxcIicpKS5qb2luKCdcIiwgXCInKX1cIl1gKTtcbiAgICBsZXQgZXJyb3JNc2cgPSBcIlwiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmZm1wZWdQcm9jZXNzID0gc3Bhd24oXCJmZm1wZWdcIiwgYXJncywge1xuICAgICAgICAgICAgY3dkOiBnZXRkaXIoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZmZtcGVnUHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIGRhdGEgPT4gYXBwZW5kT3V0KGRhdGEpKTtcbiAgICAgICAgZmZtcGVnUHJvY2Vzcy5zdGRlcnIub24oXCJkYXRhXCIsIGRhdGEgPT4ge1xuICAgICAgICAgICAgYXBwZW5kT3V0KGRhdGEpO1xuICAgICAgICAgICAgZXJyb3IoYGZmbXBlZyBlbmNvdW50ZXJlZCBhbiBlcnJvcjogJHtkYXRhfWApO1xuICAgICAgICAgICAgZXJyb3JNc2cgKz0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZmbXBlZ1Byb2Nlc3Mub24oXCJleGl0XCIsIGNvZGUgPT4ge1xuICAgICAgICAgICAgZmZtcGVnUHJvY2VzcyA9IG51bGw7XG4gICAgICAgICAgICBjb2RlID09PSAwID8gcmVzb2x2ZShzdGRvdXRfZ2xvYmFsKSA6IHJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cgfHwgYGZmbXBlZyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydChfOiBJcGNNYWluSW52b2tlRXZlbnQsIF93b3JrZGlyOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICBfd29ya2RpciB8fD0gZnMubWtkdGVtcFN5bmMocGF0aC5qb2luKG9zLnRtcGRpcigpLCBcInZlbmNvcmRfbWVkaWFEb3dubG9hZGVyX1wiKSk7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKF93b3JrZGlyKSkgZnMubWtkaXJTeW5jKF93b3JrZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB3b3JrZGlyID0gX3dvcmtkaXI7XG4gICAgbG9nKFwiVXNpbmcgd29ya2RpcjogXCIsIHdvcmtkaXIpO1xuICAgIHJldHVybiB3b3JrZGlyO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0b3AoXzogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgaWYgKHdvcmtkaXIpIHtcbiAgICAgICAgbG9nKFwiQ2xlYW5pbmcgdXAgd29ya2RpclwiKTtcbiAgICAgICAgZnMucm1TeW5jKHdvcmtkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB3b3JrZGlyID0gbnVsbDtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1ldGFkYXRhKG9wdGlvbnM6IERvd25sb2FkT3B0aW9ucykge1xuICAgIHN0ZG91dF9nbG9iYWwgPSBcIlwiO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gSlNPTi5wYXJzZShhd2FpdCB5dGRscChbXCItSlwiLCBvcHRpb25zLnVybCwgXCItLW5vLXdhcm5pbmdzXCJdKSk7XG4gICAgaWYgKG1ldGFkYXRhLmlzX2xpdmUpIHRocm93IFwiTGl2ZSBzdHJlYW1zIGFyZSBub3Qgc3VwcG9ydGVkLlwiO1xuICAgIHN0ZG91dF9nbG9iYWwgPSBcIlwiO1xuICAgIHJldHVybiB7IHZpZGVvVGl0bGU6IGAke21ldGFkYXRhLnRpdGxlIHx8IFwidmlkZW9cIn0gKCR7bWV0YWRhdGEuaWR9KWAgfTtcbn1cbmZ1bmN0aW9uIGdlbkZvcm1hdCh7IHZpZGVvVGl0bGUgfTogeyB2aWRlb1RpdGxlOiBzdHJpbmc7IH0sIHsgbWF4RmlsZVNpemUsIGZvcm1hdCB9OiBEb3dubG9hZE9wdGlvbnMpIHtcbiAgICBjb25zdCBIQVNfTElNSVQgPSAhIW1heEZpbGVTaXplO1xuICAgIGNvbnN0IE1BWF9WSURFT19TSVpFID0gSEFTX0xJTUlUID8gbWF4RmlsZVNpemUgKiAwLjggOiAwO1xuICAgIGNvbnN0IE1BWF9BVURJT19TSVpFID0gSEFTX0xJTUlUID8gbWF4RmlsZVNpemUgKiAwLjIgOiAwO1xuXG4gICAgY29uc3QgYXVkaW8gPSB7XG4gICAgICAgIG5vRmZtcGVnOiBcImJhW2V4dD1tcDNde1RPVF9TSVpFfS93YVtleHQ9bXAzXXtUT1RfU0laRX1cIixcbiAgICAgICAgZmZtcGVnOiBcImJhKntUT1RfU0laRX0vYmF7VE9UX1NJWkV9L3dhKntUT1RfU0laRX0vYmEqXCJcbiAgICB9O1xuICAgIGNvbnN0IHZpZGVvID0ge1xuICAgICAgICBub0ZmbXBlZzogXCJie1RPVF9TSVpFfXtIRUlHSFR9W2V4dD13ZWJtXS9ie1RPVF9TSVpFfXtIRUlHSFR9W2V4dD1tcDRdL3d7SEVJR0hUfXtUT1RfU0laRX1cIixcbiAgICAgICAgZmZtcGVnOiBcImIqe1ZJRF9TSVpFfXtIRUlHSFR9K2Jhe0FVRF9TSVpFfS9ie1RPVF9TSVpFfXtIRUlHSFR9L2Iqe0hFSUdIVH0rYmFcIixcbiAgICB9O1xuICAgIGNvbnN0IGdpZiA9IHtcbiAgICAgICAgZmZtcGVnOiBcImJ2e1RPVF9TSVpFfS93dntUT1RfU0laRX1cIlxuICAgIH07XG5cbiAgICBsZXQgZm9ybWF0X2dyb3VwOiB7IG5vRmZtcGVnPzogc3RyaW5nOyBmZm1wZWc6IHN0cmluZzsgfTtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICBjYXNlIFwiYXVkaW9cIjpcbiAgICAgICAgICAgIGZvcm1hdF9ncm91cCA9IGF1ZGlvO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJnaWZcIjpcbiAgICAgICAgICAgIGZvcm1hdF9ncm91cCA9IGdpZjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidmlkZW9cIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGZvcm1hdF9ncm91cCA9IHZpZGVvO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybWF0X3N0cmluZyA9IChmZm1wZWdBdmFpbGFibGUgPyBmb3JtYXRfZ3JvdXAuZmZtcGVnIDogZm9ybWF0X2dyb3VwLm5vRmZtcGVnKVxuICAgICAgICA/LnJlcGxhY2VBbGwoXCJ7VE9UX1NJWkV9XCIsIEhBU19MSU1JVCA/IGBbZmlsZXNpemU8JHttYXhGaWxlU2l6ZX1dYCA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlQWxsKFwie1ZJRF9TSVpFfVwiLCBIQVNfTElNSVQgPyBgW2ZpbGVzaXplPCR7TUFYX1ZJREVPX1NJWkV9XWAgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZUFsbChcIntBVURfU0laRX1cIiwgSEFTX0xJTUlUID8gYFtmaWxlc2l6ZTwke01BWF9BVURJT19TSVpFfV1gIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJ7SEVJR0hUfVwiLCBcIltoZWlnaHQ8PTEwODBdXCIpO1xuICAgIGlmICghZm9ybWF0X3N0cmluZykgdGhyb3cgXCJHaWYgZm9ybWF0IGlzIG9ubHkgc3VwcG9ydGVkIHdpdGggZmZtcGVnLlwiO1xuICAgIGxvZyhcIlZpZGVvIGZvcm1hdGVkIGNhbGN1bGF0ZWQgYXMgXCIsIGZvcm1hdF9zdHJpbmcpO1xuICAgIGxvZyhgQmFzZWQgb246IGZvcm1hdD0ke2Zvcm1hdH0sIG1heEZpbGVTaXplPSR7bWF4RmlsZVNpemV9LCBmZm1wZWdBdmFpbGFibGU9JHtmZm1wZWdBdmFpbGFibGV9YCk7XG4gICAgcmV0dXJuIHsgZm9ybWF0OiBmb3JtYXRfc3RyaW5nLCB2aWRlb1RpdGxlIH07XG59XG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZCh7IGZvcm1hdCwgdmlkZW9UaXRsZSB9OiB7IGZvcm1hdDogc3RyaW5nOyB2aWRlb1RpdGxlOiBzdHJpbmc7IH0sIHsgeXRkbHBBcmdzLCB1cmwsIGZvcm1hdDogdXNyRm9ybWF0IH06IERvd25sb2FkT3B0aW9ucykge1xuICAgIGNsZWFuVmlkZW9GaWxlcygpO1xuICAgIGNvbnN0IGJhc2VBcmdzID0gW1wiLWZcIiwgZm9ybWF0LCBcIi1vXCIsIFwiZG93bmxvYWQuJShleHQpc1wiLCBcIi0tZm9yY2Utb3ZlcndyaXRlc1wiLCBcIi1JXCIsIFwiMVwiXTtcbiAgICBjb25zdCByZW11eEFyZ3MgPSBmZm1wZWdBdmFpbGFibGVcbiAgICAgICAgPyB1c3JGb3JtYXQgPT09IFwidmlkZW9cIlxuICAgICAgICAgICAgPyBbXCItLXJlbXV4LXZpZGVvXCIsIFwid2VibT53ZWJtL21wNFwiXVxuICAgICAgICAgICAgOiB1c3JGb3JtYXQgPT09IFwiYXVkaW9cIlxuICAgICAgICAgICAgICAgID8gW1wiLS1leHRyYWN0LWF1ZGlvXCIsIFwiLS1hdWRpby1mb3JtYXRcIiwgXCJtcDNcIl1cbiAgICAgICAgICAgICAgICA6IFtdXG4gICAgICAgIDogW107XG4gICAgY29uc3QgY3VzdG9tQXJncyA9IHl0ZGxwQXJncz8uZmlsdGVyKEJvb2xlYW4pIHx8IFtdO1xuXG4gICAgYXdhaXQgeXRkbHAoW3VybCwgLi4uYmFzZUFyZ3MsIC4uLnJlbXV4QXJncywgLi4uY3VzdG9tQXJnc10pO1xuICAgIGNvbnN0IGZpbGUgPSBmcy5yZWFkZGlyU3luYyhnZXRkaXIoKSkuZmluZChmID0+IGYuc3RhcnRzV2l0aChcImRvd25sb2FkLlwiKSk7XG4gICAgaWYgKCFmaWxlKSB0aHJvdyBcIk5vIHZpZGVvIGZpbGUgd2FzIGZvdW5kIVwiO1xuICAgIHJldHVybiB7IGZpbGUsIHZpZGVvVGl0bGUgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbXV4KHsgZmlsZSwgdmlkZW9UaXRsZSB9OiB7IGZpbGU6IHN0cmluZzsgdmlkZW9UaXRsZTogc3RyaW5nOyB9LCB7IGZmbXBlZ0FyZ3MsIGZvcm1hdCwgbWF4RmlsZVNpemUsIGdpZlF1YWxpdHkgfTogRG93bmxvYWRPcHRpb25zKSB7XG4gICAgY29uc3Qgc291cmNlRXh0ZW5zaW9uID0gZmlsZS5zcGxpdChcIi5cIikucG9wKCk7XG4gICAgaWYgKCFmZm1wZWdBdmFpbGFibGUpIHJldHVybiBsb2coXCJTa2lwcGluZyByZW11eCwgZmZtcGVnIGlzIHVuYXZhaWxhYmxlLlwiKSwgeyBmaWxlLCB2aWRlb1RpdGxlLCBleHRlbnNpb246IHNvdXJjZUV4dGVuc2lvbiB9O1xuXG4gICAgLy8gV2Ugb25seSByZWFsbHkgbmVlZCB0byByZW11eCBpZlxuICAgIC8vIDEuIFRoZSBmaWxlIGlzIHRvbyBiaWdcbiAgICAvLyAyLiBUaGUgZmlsZSBpcyBpbiBhIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGJ5IGRpc2NvcmRcbiAgICAvLyAzLiBUaGUgdXNlciBwcm92aWRlZCBjdXN0b20gZmZtcGVnIGFyZ3VtZW50c1xuICAgIC8vIDQuIFRoZSB0YXJnZXQgZm9ybWF0IGlzIGdpZlxuICAgIGNvbnN0IGFjY2VwdGFibGVGb3JtYXRzID0gW1wibXAzXCIsIFwibXA0XCIsIFwid2VibVwiXTtcbiAgICBjb25zdCBmaWxlU2l6ZSA9IGZzLnN0YXRTeW5jKHAoZmlsZSkpLnNpemU7XG4gICAgY29uc3QgY3VzdG9tQXJncyA9IGZmbXBlZ0FyZ3M/LmZpbHRlcihCb29sZWFuKSB8fCBbXTtcblxuICAgIGNvbnN0IGlzRm9ybWF0QWNjZXB0YWJsZSA9IGFjY2VwdGFibGVGb3JtYXRzLmluY2x1ZGVzKHNvdXJjZUV4dGVuc2lvbiA/PyBcIlwiKTtcbiAgICBjb25zdCBpc0ZpbGVTaXplQWNjZXB0YWJsZSA9ICghbWF4RmlsZVNpemUgfHwgZmlsZVNpemUgPD0gbWF4RmlsZVNpemUpO1xuICAgIGNvbnN0IGhhc0N1c3RvbUFyZ3MgPSBjdXN0b21BcmdzLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgaXNHaWYgPSBmb3JtYXQgPT09IFwiZ2lmXCI7XG4gICAgaWYgKGlzRm9ybWF0QWNjZXB0YWJsZSAmJiBpc0ZpbGVTaXplQWNjZXB0YWJsZSAmJiAhaGFzQ3VzdG9tQXJncyAmJiAhaXNHaWYpXG4gICAgICAgIHJldHVybiBsb2coXCJTa2lwcGluZyByZW11eCwgZmlsZSB0eXBlIGFuZCBzaXplIGFyZSBnb29kLCBhbmQgbm8gZmZtcGVnIGFyZ3VtZW50cyB3ZXJlIHNwZWNpZmllZC5cIiksIHsgZmlsZSwgdmlkZW9UaXRsZSwgZXh0ZW5zaW9uOiBzb3VyY2VFeHRlbnNpb24gfTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gcGFyc2VGbG9hdChleGVjRmlsZVN5bmMoXCJmZnByb2JlXCIsIFtcIi12XCIsIFwiZXJyb3JcIiwgXCItc2hvd19lbnRyaWVzXCIsIFwiZm9ybWF0PWR1cmF0aW9uXCIsIFwiLW9mXCIsIFwiZGVmYXVsdD1ub3ByaW50X3dyYXBwZXJzPTE6bm9rZXk9MVwiLCBwKGZpbGUpXSkudG9TdHJpbmcoKSk7XG4gICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkgdGhyb3cgXCJGYWlsZWQgdG8gZ2V0IHZpZGVvIGR1cmF0aW9uLlwiO1xuICAgIC8vIGZmbXBlZyB0ZW5kcyB0byBnbyBhYm92ZSB0aGUgdGFyZ2V0IHNpemUsIHNvIEknbSBzZXR0aW5nIGl0IHRvIDcvOFxuICAgIGNvbnN0IHRhcmdldEJpdHMgPSBtYXhGaWxlU2l6ZSA/IChtYXhGaWxlU2l6ZSAqIDcpIC8gZHVyYXRpb24gOiA5OTk5OTk5O1xuICAgIGNvbnN0IGtpbG9iaXRzID0gfn4odGFyZ2V0Qml0cyAvIDEwMjQpO1xuXG4gICAgbGV0IGJhc2VBcmdzOiBzdHJpbmdbXTtcbiAgICBsZXQgZXh0OiBzdHJpbmc7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgY2FzZSBcImF1ZGlvXCI6XG4gICAgICAgICAgICBiYXNlQXJncyA9IFtcIi1pXCIsIHAoZmlsZSksIFwiLWI6YVwiLCBgJHtraWxvYml0c31rYCwgXCItbWF4cmF0ZVwiLCBgJHtraWxvYml0c31rYCwgXCItYnVmc2l6ZVwiLCBcIjFNXCIsIFwiLXlcIl07XG4gICAgICAgICAgICBleHQgPSBcIm1wM1wiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gRHluYW1pY2FsbHkgcmVzaXplIGJhc2VkIG9uIHRhcmdldCBiaXRyYXRlXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBraWxvYml0cyA8PSAxMDAgPyA0ODAgOiBraWxvYml0cyA8PSA1MDAgPyA3MjAgOiAxMDgwO1xuICAgICAgICAgICAgYmFzZUFyZ3MgPSBbXCItaVwiLCBwKGZpbGUpLCBcIi1iOnZcIiwgYCR7fn4oa2lsb2JpdHMgKiAwLjgpfWtgLCBcIi1iOmFcIiwgYCR7fn4oa2lsb2JpdHMgKiAwLjIpfWtgLCBcIi1tYXhyYXRlXCIsIGAke2tpbG9iaXRzfWtgLCBcIi1idWZzaXplXCIsIFwiMU1cIiwgXCIteVwiLCBcIi1maWx0ZXI6dlwiLCBgc2NhbGU9LTE6JHtoZWlnaHR9YF07XG4gICAgICAgICAgICBleHQgPSBcIm1wNFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJnaWZcIjpcbiAgICAgICAgICAgIGxldCBmcHM6IG51bWJlciwgd2lkdGg6IG51bWJlciwgY29sb3JzOiBudW1iZXIsIGJheWVyX3NjYWxlOiBudW1iZXI7XG4gICAgICAgICAgICAvLyBXQVJOSU5HOiB0aGVzZSBwYXJhbWV0ZXJzIGhhdmUgYmVlbiBhcmJpdHJhcmlseSBjaG9zZW4sIG9wdGltaXphdGlvbiBpcyB3ZWxjb21lIVxuICAgICAgICAgICAgc3dpdGNoIChnaWZRdWFsaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSA1LCB3aWR0aCA9IDM2MCwgY29sb3JzID0gMjQsIGJheWVyX3NjYWxlID0gNTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSAxMCwgd2lkdGggPSA0MjAsIGNvbG9ycyA9IDMyLCBiYXllcl9zY2FsZSA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSAxNSwgd2lkdGggPSA0ODAsIGNvbG9ycyA9IDY0LCBiYXllcl9zY2FsZSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZnBzID0gMjAsIHdpZHRoID0gNTQwLCBjb2xvcnMgPSA2NCwgYmF5ZXJfc2NhbGUgPSAzO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGZwcyA9IDMwLCB3aWR0aCA9IDcyMCwgY29sb3JzID0gMTI4LCBiYXllcl9zY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiYXNlQXJncyA9IFtcIi1pXCIsIHAoZmlsZSksIFwiLXZmXCIsIGBmcHM9JHtmcHN9LHNjYWxlPXc9JHt3aWR0aH06aD0tMTpmbGFncz1sYW5jem9zLG1wZGVjaW1hdGUsc3BsaXRbczBdW3MxXTtbczBdcGFsZXR0ZWdlbj1tYXhfY29sb3JzPSR7Y29sb3JzfVtwXTtbczFdW3BdcGFsZXR0ZXVzZT1kaXRoZXI9YmF5ZXI6YmF5ZXJfc2NhbGU9JHtiYXllcl9zY2FsZX1gLCBcIi1sb29wXCIsIFwiMFwiLCBcIi1idWZzaXplXCIsIFwiMU1cIiwgXCIteVwiXTtcbiAgICAgICAgICAgIGV4dCA9IFwiZ2lmXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhd2FpdCBmZm1wZWcoWy4uLmJhc2VBcmdzLCAuLi5jdXN0b21BcmdzLCBgcmVtdXguJHtleHR9YF0pO1xuICAgIHJldHVybiB7IGZpbGU6IGByZW11eC4ke2V4dH1gLCB2aWRlb1RpdGxlLCBleHRlbnNpb246IGV4dCB9O1xufVxuZnVuY3Rpb24gdXBsb2FkKHsgZmlsZSwgdmlkZW9UaXRsZSwgZXh0ZW5zaW9uIH06IHsgZmlsZTogc3RyaW5nOyB2aWRlb1RpdGxlOiBzdHJpbmc7IGV4dGVuc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkOyB9KSB7XG4gICAgaWYgKCFleHRlbnNpb24pIHRocm93IFwiSW52YWxpZCBleHRlbnNpb24uXCI7XG4gICAgY29uc3QgYnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKHAoZmlsZSkpO1xuICAgIHJldHVybiB7IGJ1ZmZlciwgdGl0bGU6IGAke3ZpZGVvVGl0bGV9LiR7ZXh0ZW5zaW9ufWAgfTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlKFxuICAgIF86IElwY01haW5JbnZva2VFdmVudCxcbiAgICBvcHQ6IERvd25sb2FkT3B0aW9uc1xuKTogUHJvbWlzZTx7XG4gICAgYnVmZmVyOiBCdWZmZXI7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBsb2dzOiBzdHJpbmc7XG59IHwge1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgbG9nczogc3RyaW5nO1xufT4ge1xuICAgIGxvZ3NfZ2xvYmFsID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2aWRlb01ldGFkYXRhID0gYXdhaXQgbWV0YWRhdGEob3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9Gb3JtYXQgPSBnZW5Gb3JtYXQodmlkZW9NZXRhZGF0YSwgb3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9Eb3dubG9hZCA9IGF3YWl0IGRvd25sb2FkKHZpZGVvRm9ybWF0LCBvcHQpO1xuICAgICAgICBjb25zdCB2aWRlb1JlbXV4ID0gYXdhaXQgcmVtdXgodmlkZW9Eb3dubG9hZCwgb3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9VcGxvYWQgPSB1cGxvYWQodmlkZW9SZW11eCk7XG4gICAgICAgIHJldHVybiB7IGxvZ3M6IGxvZ3NfZ2xvYmFsLCAuLi52aWRlb1VwbG9hZCB9O1xuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogZS50b1N0cmluZygpLCBsb2dzOiBsb2dzX2dsb2JhbCB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrZmZtcGVnKF8/OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgICBleGVjRmlsZVN5bmMoXCJmZm1wZWdcIiwgW1wiLXZlcnNpb25cIl0pO1xuICAgICAgICBleGVjRmlsZVN5bmMoXCJmZnByb2JlXCIsIFtcIi12ZXJzaW9uXCJdKTtcbiAgICAgICAgZmZtcGVnQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmZm1wZWdBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja3l0ZGxwKF8/OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgICBleGVjRmlsZVN5bmMoXCJ5dC1kbHBcIiwgW1wiLS12ZXJzaW9uXCJdKTtcbiAgICAgICAgeXRkbHBBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHl0ZGxwQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnRlcnJ1cHQoXzogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgbG9nKFwiSW50ZXJydXB0aW5nLi4uXCIpO1xuICAgIHl0ZGxwUHJvY2Vzcz8ua2lsbCgpO1xuICAgIGZmbXBlZ1Byb2Nlc3M/LmtpbGwoKTtcbiAgICBjbGVhblZpZGVvRmlsZXMoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFN0ZG91dCA9ICgpID0+IHN0ZG91dF9nbG9iYWw7XG5leHBvcnQgY29uc3QgaXNZdGRscEF2YWlsYWJsZSA9ICgpID0+IHl0ZGxwQXZhaWxhYmxlO1xuZXhwb3J0IGNvbnN0IGlzRmZtcGVnQXZhaWxhYmxlID0gKCkgPT4gZmZtcGVnQXZhaWxhYmxlO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IFByb21pc2FibGUgfSBmcm9tIFwidHlwZS1mZXN0XCI7XG5cbi8qKlxuICogQSBxdWV1ZSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJ1biB0YXNrcyBjb25zZWN1dGl2ZWx5LlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGZvciB0aGluZ3MgbGlrZSBmZXRjaGluZyBkYXRhIGZyb20gRGlzY29yZFxuICovXG5leHBvcnQgY2xhc3MgUXVldWUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtYXhTaXplIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgcXVldWVkIGF0IG9uY2UuXG4gICAgICogICAgICAgICAgICAgICAgSWYgdGhlIHF1ZXVlIGlzIGZ1bGwsIHRoZSBvbGRlc3QgZnVuY3Rpb24gd2lsbCBiZSByZW1vdmVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtYXhTaXplID0gSW5maW5pdHkpIHsgfVxuXG4gICAgcHJpdmF0ZSBxdWV1ZSA9IFtdIGFzIEFycmF5PCgpID0+IFByb21pc2FibGU8dW5rbm93bj4+O1xuXG4gICAgcHJpdmF0ZSBwcm9taXNlPzogUHJvbWlzZTxhbnk+O1xuXG4gICAgcHJpdmF0ZSBuZXh0KCkge1xuICAgICAgICBjb25zdCBmdW5jID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoZnVuYylcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuYylcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB0aGlzLm5leHQoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJ1bigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb21pc2UpXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgYSB0YXNrIGF0IHRoZSBlbmQgb2YgdGhlIHF1ZXVlLiBUaGlzIHRhc2sgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgb3RoZXIgdGFza3NcbiAgICAgKiBJZiB0aGUgcXVldWUgZXhjZWVkcyB0aGUgc3BlY2lmaWVkIG1heFNpemUsIHRoZSBmaXJzdCB0YXNrIGluIHF1ZXVlIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0gZnVuYyBUYXNrXG4gICAgICovXG4gICAgcHVzaDxUPihmdW5jOiAoKSA9PiBQcm9taXNhYmxlPFQ+KSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKVxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgIHRoaXMucXVldWUucHVzaChmdW5jKTtcbiAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVwZW5kIGEgdGFzayBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS4gVGhpcyB0YXNrIHdpbGwgYmUgZXhlY3V0ZWQgbmV4dFxuICAgICAqIElmIHRoZSBxdWV1ZSBleGNlZWRzIHRoZSBzcGVjaWZpZWQgbWF4U2l6ZSwgdGhlIGxhc3QgdGFzayBpbiBxdWV1ZSB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIGZ1bmMgVGFza1xuICAgICAqL1xuICAgIHVuc2hpZnQ8VD4oZnVuYzogKCkgPT4gUHJvbWlzYWJsZTxUPikge1xuICAgICAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSlcbiAgICAgICAgICAgIHRoaXMucXVldWUucG9wKCk7XG5cbiAgICAgICAgdGhpcy5xdWV1ZS51bnNoaWZ0KGZ1bmMpO1xuICAgICAgICB0aGlzLnJ1bigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2YgdGFza3MgaW4gdGhlIHF1ZXVlXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICB9XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgYWNjZXNzLCBta2RpciB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4aXN0cyhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWNjZXNzKGZpbGVuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZURpcmVjdG9yeUV4aXN0cyhjYWNoZURpcjogc3RyaW5nKSB7XG4gICAgaWYgKCFhd2FpdCBleGlzdHMoY2FjaGVEaXIpKVxuICAgICAgICBhd2FpdCBta2RpcihjYWNoZURpcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVuYW1lKS5uYW1lO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGdldERlZmF1bHROYXRpdmVEYXRhRGlyLCBnZXREZWZhdWx0TmF0aXZlSW1hZ2VEaXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgZW5zdXJlRGlyZWN0b3J5RXhpc3RzIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIE1MU2V0dGluZ3Mge1xuICAgIGxvZ3NEaXI6IHN0cmluZztcbiAgICBpbWFnZUNhY2hlRGlyOiBzdHJpbmc7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxNTFNldHRpbmdzPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBmcy5yZWFkRmlsZShhd2FpdCBnZXRTZXR0aW5nc0ZpbGVQYXRoKCksIFwidXRmOFwiKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBwcm9iYWJseSBkb2VzbnQgZXhpc3RcbiAgICAgICAgLy8gdGltZSB0byBjcmVhdGUgaXRcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBsb2dzRGlyOiBhd2FpdCBnZXREZWZhdWx0TmF0aXZlRGF0YURpcigpLFxuICAgICAgICAgICAgaW1hZ2VDYWNoZURpcjogYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZUltYWdlRGlyKCksXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxuXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICB9XG59XG5cbi8vIGRvbnQgZXhwb3NlIHRoaXMgdG8gcmVuZGVyZXIgZnV0dXJlIG1lXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBNTFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncykgcmV0dXJuO1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShhd2FpdCBnZXRTZXR0aW5nc0ZpbGVQYXRoKCksIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLCBudWxsLCA0KSwgXCJ1dGY4XCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0ZpbGVQYXRoKCkge1xuICAgIC8vIG1sU2V0dGluZ3MuanNvbiB3aWxsIGFsd2F5cyBpbiB0aGF0IGZvbGRlclxuICAgIGNvbnN0IE1sRGF0YURpciA9IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKE1sRGF0YURpcik7XG4gICAgY29uc3QgbWxTZXR0aW5nc0RpciA9IHBhdGguam9pbihNbERhdGFEaXIsIFwibWxTZXR0aW5ncy5qc29uXCIpO1xuXG4gICAgcmV0dXJuIG1sU2V0dGluZ3NEaXI7XG59XG5cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyByZWFkZGlyLCByZWFkRmlsZSwgdW5saW5rLCB3cml0ZUZpbGUgfSBmcm9tIFwibm9kZTpmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCJAdXRpbHMvUXVldWVcIjtcbmltcG9ydCB7IGRpYWxvZywgSXBjTWFpbkludm9rZUV2ZW50LCBzaGVsbCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5pbXBvcnQgeyBEQVRBX0RJUiB9IGZyb20gXCIuLi8uLi8uLi9tYWluL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHNhdmVTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBlbnN1cmVEaXJlY3RvcnlFeGlzdHMsIGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCB7IGdldFNldHRpbmdzIH07XG5cbi8vIHNvIHdlIGNhbiBmaWx0ZXIgdGhlIG5hdGl2ZSBoZWxwZXJzIGJ5IHRoaXMga2V5XG5leHBvcnQgZnVuY3Rpb24gbWVzc2FnZUxvZ2dlckVuaGFuY2VkVW5pcXVlSWRUaGluZ3lJZGtNYW4oKSB7IH1cblxuLy8gTWFwPGF0dGFjaG1ldElkLCBwYXRoPigpXG5jb25zdCBuYXRpdmVTYXZlZEltYWdlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5leHBvcnQgY29uc3QgZ2V0TmF0aXZlU2F2ZWRJbWFnZXMgPSAoKSA9PiBuYXRpdmVTYXZlZEltYWdlcztcblxubGV0IGxvZ3NEaXI6IHN0cmluZztcbmxldCBpbWFnZUNhY2hlRGlyOiBzdHJpbmc7XG5cbmNvbnN0IGdldEltYWdlQ2FjaGVEaXIgPSBhc3luYyAoKSA9PiBpbWFnZUNhY2hlRGlyID8/IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpO1xuY29uc3QgZ2V0TG9nc0RpciA9IGFzeW5jICgpID0+IGxvZ3NEaXIgPz8gYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKTtcblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0RGlycygpIHtcbiAgICBjb25zdCB7IGxvZ3NEaXI6IGxkLCBpbWFnZUNhY2hlRGlyOiBpY2QgfSA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG5cbiAgICBsb2dzRGlyID0gbGQgfHwgYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKTtcbiAgICBpbWFnZUNhY2hlRGlyID0gaWNkIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpO1xufVxuaW5pdERpcnMoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBpbWFnZURpciA9IGF3YWl0IGdldEltYWdlQ2FjaGVEaXIoKTtcblxuICAgIGF3YWl0IGVuc3VyZURpcmVjdG9yeUV4aXN0cyhpbWFnZURpcik7XG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCByZWFkZGlyKGltYWdlRGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnRJZCA9IGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZShmaWxlbmFtZSk7XG4gICAgICAgIG5hdGl2ZVNhdmVkSW1hZ2VzLnNldChhdHRhY2htZW50SWQsIHBhdGguam9pbihpbWFnZURpciwgZmlsZW5hbWUpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJbWFnZU5hdGl2ZShfZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgYXR0YWNobWVudElkOiBzdHJpbmcpOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBCdWZmZXIgfCBudWxsPiB7XG4gICAgY29uc3QgaW1hZ2VQYXRoID0gbmF0aXZlU2F2ZWRJbWFnZXMuZ2V0KGF0dGFjaG1lbnRJZCk7XG4gICAgaWYgKCFpbWFnZVBhdGgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhd2FpdCByZWFkRmlsZShpbWFnZVBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVJbWFnZU5hdGl2ZShfZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogVWludDhBcnJheSkge1xuICAgIGlmICghZmlsZW5hbWUgfHwgIWNvbnRlbnQpIHJldHVybjtcbiAgICBjb25zdCBpbWFnZURpciA9IGF3YWl0IGdldEltYWdlQ2FjaGVEaXIoKTtcblxuICAgIC8vIHJldHVybnMgdGhlIGZpbGUgbmFtZVxuICAgIC8vIC4uLy4uL3NvbWVNYWxpY291c1BhdGgucG5nIC0+IHNvbWVNYWxpY291c1BhdGhcbiAgICBjb25zdCBhdHRhY2htZW50SWQgPSBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWUpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdJbWFnZSA9IG5hdGl2ZVNhdmVkSW1hZ2VzLmdldChhdHRhY2htZW50SWQpO1xuICAgIGlmIChleGlzdGluZ0ltYWdlKSByZXR1cm47XG5cbiAgICBjb25zdCBpbWFnZVBhdGggPSBwYXRoLmpvaW4oaW1hZ2VEaXIsIGZpbGVuYW1lKTtcbiAgICBhd2FpdCBlbnN1cmVEaXJlY3RvcnlFeGlzdHMoaW1hZ2VEaXIpO1xuICAgIGF3YWl0IHdyaXRlRmlsZShpbWFnZVBhdGgsIGNvbnRlbnQpO1xuXG4gICAgbmF0aXZlU2F2ZWRJbWFnZXMuc2V0KGF0dGFjaG1lbnRJZCwgaW1hZ2VQYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUZpbGVOYXRpdmUoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGF0dGFjaG1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW1hZ2VQYXRoID0gbmF0aXZlU2F2ZWRJbWFnZXMuZ2V0KGF0dGFjaG1lbnRJZCk7XG4gICAgaWYgKCFpbWFnZVBhdGgpIHJldHVybjtcblxuICAgIGF3YWl0IHVubGluayhpbWFnZVBhdGgpO1xufVxuXG5jb25zdCBMT0dTX0RBVEFfRklMRU5BTUUgPSBcIm1lc3NhZ2UtbG9nZ2VyLWxvZ3MuanNvblwiO1xuY29uc3QgZGF0YVdyaXRlUXVldWUgPSBuZXcgUXVldWUoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExvZ3NGcm9tRnMoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBsb2dzRGlyID0gYXdhaXQgZ2V0TG9nc0RpcigpO1xuXG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKGxvZ3NEaXIpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGF3YWl0IHJlYWRGaWxlKHBhdGguam9pbihsb2dzRGlyLCBMT0dTX0RBVEFfRklMRU5BTUUpLCBcInV0Zi04XCIpKTtcbiAgICB9IGNhdGNoIHsgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZUxvZ3MoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBsb2dzRGlyID0gYXdhaXQgZ2V0TG9nc0RpcigpO1xuXG4gICAgZGF0YVdyaXRlUXVldWUucHVzaCgoKSA9PiB3cml0ZUZpbGUocGF0aC5qb2luKGxvZ3NEaXIsIExPR1NfREFUQV9GSUxFTkFNRSksIGNvbnRlbnRzKSk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKSwgXCJzYXZlZEltYWdlc1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHBhdGguam9pbihEQVRBX0RJUiwgXCJNZXNzYWdlTG9nZ2VyRGF0YVwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNob29zZURpcihldmVudDogSXBjTWFpbkludm9rZUV2ZW50LCBsb2dLZXk6IFwibG9nc0RpclwiIHwgXCJpbWFnZUNhY2hlRGlyXCIpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG4gICAgY29uc3QgZGVmYXVsdFBhdGggPSBzZXR0aW5nc1tsb2dLZXldIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBkaWFsb2cuc2hvd09wZW5EaWFsb2coeyBwcm9wZXJ0aWVzOiBbXCJvcGVuRGlyZWN0b3J5XCJdLCBkZWZhdWx0UGF0aDogZGVmYXVsdFBhdGggfSk7XG4gICAgY29uc3QgZGlyID0gcmVzLmZpbGVQYXRoc1swXTtcblxuICAgIGlmICghZGlyKSB0aHJvdyBFcnJvcihcIkludmFsaWQgRGlyZWN0b3J5XCIpO1xuXG4gICAgc2V0dGluZ3NbbG9nS2V5XSA9IGRpcjtcblxuICAgIGF3YWl0IHNhdmVTZXR0aW5ncyhzZXR0aW5ncyk7XG5cbiAgICBzd2l0Y2ggKGxvZ0tleSkge1xuICAgICAgICBjYXNlIFwibG9nc0RpclwiOiBsb2dzRGlyID0gZGlyOyBicmVhaztcbiAgICAgICAgY2FzZSBcImltYWdlQ2FjaGVEaXJcIjogaW1hZ2VDYWNoZURpciA9IGRpcjsgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGxvZ0tleSA9PT0gXCJpbWFnZUNhY2hlRGlyXCIpXG4gICAgICAgIGF3YWl0IGluaXQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGRpcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3dJdGVtSW5Gb2xkZXIoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICBzaGVsbC5zaG93SXRlbUluRm9sZGVyKGZpbGVQYXRoKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tIFwiaHR0cHNcIjtcblxuLy8gVGhlc2UgbGlua3MgZG9uJ3Qgc3VwcG9ydCBDT1JTLCBzbyB0aGlzIGhhcyB0byBiZSBuYXRpdmVcbmNvbnN0IHZhbGlkUmVkaXJlY3RVcmxzID0gL15odHRwczpcXC9cXC8oc3BvdGlmeVxcLmxpbmt8c1xcLnRlYW0pXFwvLiskLztcblxuZnVuY3Rpb24gZ2V0UmVkaXJlY3QodXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHJlcXVlc3QobmV3IFVSTCh1cmwpLCB7IG1ldGhvZDogXCJIRUFEXCIgfSwgcmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgICAgcmVzLmhlYWRlcnMubG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgPyBnZXRSZWRpcmVjdChyZXMuaGVhZGVycy5sb2NhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgOiB1cmxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCByZWplY3QpO1xuICAgICAgICByZXEuZW5kKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXNvbHZlUmVkaXJlY3QoXzogSXBjTWFpbkludm9rZUV2ZW50LCB1cmw6IHN0cmluZykge1xuICAgIGlmICghdmFsaWRSZWRpcmVjdFVybHMudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gICAgcmV0dXJuIGdldFJlZGlyZWN0KHVybCk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyByZWFkRmlsZSB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHsgYmFzZW5hbWUsIG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkUmVjb3JkaW5nKF8sIGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICBmaWxlUGF0aCA9IG5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBiYXNlbmFtZShmaWxlUGF0aCk7XG4gICAgY29uc3QgZGlzY29yZEJhc2VEaXJXaXRoVHJhaWxpbmdTbGFzaCA9IG5vcm1hbGl6ZShhcHAuZ2V0UGF0aChcInVzZXJEYXRhXCIpICsgXCIvXCIpO1xuICAgIGNvbnNvbGUubG9nKGZpbGVuYW1lLCBkaXNjb3JkQmFzZURpcldpdGhUcmFpbGluZ1NsYXNoLCBmaWxlUGF0aCk7XG4gICAgaWYgKGZpbGVuYW1lICE9PSBcInJlY29yZGluZy5vZ2dcIiB8fCAhZmlsZVBhdGguc3RhcnRzV2l0aChkaXNjb3JkQmFzZURpcldpdGhUcmFpbGluZ1NsYXNoKSkgcmV0dXJuIG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBidWYgPSBhd2FpdCByZWFkRmlsZShmaWxlUGF0aCk7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWYuYnVmZmVyKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IFwiLyogZXNsaW50LWRpc2FibGUgKi9cXG5cXG4vKipcXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBZEd1YXJkJ3MgQmxvY2sgWW91VHViZSBBZHMgKGh0dHBzOi8vZ2l0aHViLmNvbS9BZGd1YXJkVGVhbS9CbG9ja1lvdVR1YmVBZHNTaG9ydGN1dCkuXFxuICpcXG4gKiBDb3B5cmlnaHQgKEMpIEFkR3VhcmQgVGVhbVxcbiAqXFxuICogQWRHdWFyZCdzIEJsb2NrIFlvdVR1YmUgQWRzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcXG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXFxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cXG4gKlxcbiAqIEFkR3VhcmQncyBCbG9jayBZb3VUdWJlIEFkcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXFxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXFxuICpcXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxcbiAqIGFsb25nIHdpdGggQWRHdWFyZCdzIEJsb2NrIFlvdVR1YmUgQWRzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxcbiAqL1xcblxcbmNvbnN0IExPR09fSUQgPSBcXFwiYmxvY2steW91dHViZS1hZHMtbG9nb1xcXCI7XFxuY29uc3QgaGlkZGVuQ1NTID0gW1xcbiAgICBcXFwiI19fZmZZb3V0dWJlMVxcXCIsXFxuICAgIFxcXCIjX19mZllvdXR1YmUyXFxcIixcXG4gICAgXFxcIiNfX2ZmWW91dHViZTNcXFwiLFxcbiAgICBcXFwiI19fZmZZb3V0dWJlNFxcXCIsXFxuICAgIFxcXCIjZmVlZC1weXYtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIiNmZWVkbW9kdWxlLVBST1xcXCIsXFxuICAgIFxcXCIjaG9tZXBhZ2UtY2hyb21lLXNpZGUtcHJvbW9cXFwiLFxcbiAgICBcXFwiI21lcmNoLXNoZWxmXFxcIixcXG4gICAgXFxcIiNvZmZlci1tb2R1bGVcXFwiLFxcbiAgICAnI3BsYS1zaGVsZiA+IHl0ZC1wbGEtc2hlbGYtcmVuZGVyZXJbY2xhc3M9XFxcInN0eWxlLXNjb3BlIHl0ZC13YXRjaFxcXCJdJyxcXG4gICAgXFxcIiNwbGEtc2hlbGZcXFwiLFxcbiAgICBcXFwiI3ByZW1pdW0teXZhXFxcIixcXG4gICAgXFxcIiNwcm9tby1pbmZvXFxcIixcXG4gICAgXFxcIiNwcm9tby1saXN0XFxcIixcXG4gICAgXFxcIiNwcm9tb3Rpb24tc2hlbGZcXFwiLFxcbiAgICBcXFwiI3JlbGF0ZWQgPiB5dGQtd2F0Y2gtbmV4dC1zZWNvbmRhcnktcmVzdWx0cy1yZW5kZXJlciA+ICNpdGVtcyA+IHl0ZC1jb21wYWN0LXByb21vdGVkLXZpZGVvLXJlbmRlcmVyLnl0ZC13YXRjaC1uZXh0LXNlY29uZGFyeS1yZXN1bHRzLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIiNzZWFyY2gtcHZhXFxcIixcXG4gICAgXFxcIiNzaGVsZi1weXYtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIiN2aWRlby1tYXN0aGVhZFxcXCIsXFxuICAgIFxcXCIjd2F0Y2gtYnJhbmRlZC1hY3Rpb25zXFxcIixcXG4gICAgXFxcIiN3YXRjaC1idXktdXJsc1xcXCIsXFxuICAgIFxcXCIjd2F0Y2gtY2hhbm5lbC1icmFuZC1kaXZcXFwiLFxcbiAgICBcXFwiI3dhdGNoNy1icmFuZGVkLWJhbm5lclxcXCIsXFxuICAgIFxcXCIjWXRLZXZsYXJWaXNpYmlsaXR5SWRlbnRpZmllclxcXCIsXFxuICAgIFxcXCIjWXRTcGFya2xlc1Zpc2liaWxpdHlJZGVudGlmaWVyXFxcIixcXG4gICAgXFxcIi5jYXJvdXNlbC1vZmZlci11cmwtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi5jb21wYW5pb24tYWQtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi5Hb29nbGVBY3RpdmVWaWV3RWxlbWVudFxcXCIsXFxuICAgICcubGlzdC12aWV3W3N0eWxlPVxcXCJtYXJnaW46IDdweCAwcHQ7XFxcIl0nLFxcbiAgICBcXFwiLnByb21vdGVkLXNwYXJrbGVzLXRleHQtc2VhcmNoLXJvb3QtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi5wcm9tb3RlZC12aWRlb3NcXFwiLFxcbiAgICBcXFwiLnNlYXJjaFZpZXcubGlzdC12aWV3XFxcIixcXG4gICAgXFxcIi5zcGFya2xlcy1saWdodC1jdGFcXFwiLFxcbiAgICBcXFwiLndhdGNoLWV4dHJhLWluZm8tY29sdW1uXFxcIixcXG4gICAgXFxcIi53YXRjaC1leHRyYS1pbmZvLXJpZ2h0XFxcIixcXG4gICAgXFxcIi55dGQtY2Fyb3VzZWwtYWQtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1jb21wYWN0LXByb21vdGVkLXZpZGVvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtY29tcGFuaW9uLXNsb3QtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1tZXJjaC1zaGVsZi1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXBsYXllci1sZWdhY3ktZGVza3RvcC13YXRjaC1hZHMtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1wcm9tb3RlZC1zcGFya2xlcy10ZXh0LXNlYXJjaC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXByb21vdGVkLXZpZGVvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtc2VhcmNoLXB5di1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXZpZGVvLW1hc3RoZWFkLWFkLXYzLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dHAtYWQtYWN0aW9uLWludGVyc3RpdGlhbC1iYWNrZ3JvdW5kLWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIueXRwLWFkLWFjdGlvbi1pbnRlcnN0aXRpYWwtc2xvdFxcXCIsXFxuICAgIFxcXCIueXRwLWFkLWltYWdlLW92ZXJsYXlcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1vdmVybGF5LWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIueXRwLWFkLXByb2dyZXNzXFxcIixcXG4gICAgXFxcIi55dHAtYWQtcHJvZ3Jlc3MtbGlzdFxcXCIsXFxuICAgICdbY2xhc3MqPVxcXCJ5dGQtZGlzcGxheS1hZC1cXFwiXScsXFxuICAgICdbbGF5b3V0Kj1cXFwiZGlzcGxheS1hZC1cXFwiXScsXFxuICAgICdhW2hyZWZePVxcXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL2N0aHJ1P1xcXCJdJyxcXG4gICAgJ2FbaHJlZl49XFxcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2N0aHJ1P1xcXCJdJyxcXG4gICAgXFxcInl0ZC1hY3Rpb24tY29tcGFuaW9uLWFkLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1iYW5uZXItcHJvbW8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLWNvbXBhY3QtcHJvbW90ZWQtdmlkZW8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLWNvbXBhbmlvbi1zbG90LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1kaXNwbGF5LWFkLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1wcm9tb3RlZC1zcGFya2xlcy10ZXh0LXNlYXJjaC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtcHJvbW90ZWQtc3BhcmtsZXMtd2ViLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1zZWFyY2gtcHl2LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1zaW5nbGUtb3B0aW9uLXN1cnZleS1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtdmlkZW8tbWFzdGhlYWQtYWQtYWR2ZXJ0aXNlci1pbmZvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC12aWRlby1tYXN0aGVhZC1hZC12My1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJZVE0tUFJPTU9URUQtVklERU8tUkVOREVSRVJcXFwiLFxcbl07XFxuLyoqXFxuKiBBZGRzIENTUyB0byB0aGUgcGFnZVxcbiovXFxuY29uc3QgaGlkZUVsZW1lbnRzID0gKCkgPT4ge1xcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBoaWRkZW5DU1M7XFxuICAgIGlmICghc2VsZWN0b3JzKSB7XFxuICAgICAgICByZXR1cm47XFxuICAgIH1cXG4gICAgY29uc3QgcnVsZSA9IHNlbGVjdG9ycy5qb2luKFxcXCIsIFxcXCIpICsgXFxcIiB7IGRpc3BsYXk6IG5vbmUhaW1wb3J0YW50OyB9XFxcIjtcXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxcXCJzdHlsZVxcXCIpO1xcbiAgICBzdHlsZS5pbm5lckhUTUwgPSBydWxlO1xcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcXG59O1xcbi8qKlxcbiogQ2FsbHMgdGhlIFxcXCJjYWxsYmFja1xcXCIgZnVuY3Rpb24gb24gZXZlcnkgRE9NIGNoYW5nZSwgYnV0IG5vdCBmb3IgdGhlIHRyYWNrZWQgZXZlbnRzXFxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvblxcbiovXFxuY29uc3Qgb2JzZXJ2ZURvbUNoYW5nZXMgPSBjYWxsYmFjayA9PiB7XFxuICAgIGNvbnN0IGRvbU11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xcbiAgICAgICAgY2FsbGJhY2sobXV0YXRpb25zKTtcXG4gICAgfSk7XFxuICAgIGRvbU11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXFxuICAgIH0pO1xcbn07XFxuLyoqXFxuKiBUaGlzIGZ1bmN0aW9uIGlzIHN1cHBvc2VkIHRvIGJlIGNhbGxlZCBvbiBldmVyeSBET00gY2hhbmdlXFxuKi9cXG5jb25zdCBoaWRlRHluYW1pY0FkcyA9ICgpID0+IHtcXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxcXCIjY29udGVudHMgPiB5dGQtcmljaC1pdGVtLXJlbmRlcmVyIHl0ZC1kaXNwbGF5LWFkLXJlbmRlcmVyXFxcIik7XFxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcXG4gICAgICAgIHJldHVybjtcXG4gICAgfVxcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcXG4gICAgICAgIGlmIChlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcXG4gICAgICAgICAgICBpZiAocGFyZW50LmxvY2FsTmFtZSA9PT0gXFxcInl0ZC1yaWNoLWl0ZW0tcmVuZGVyZXJcXFwiKSB7XFxuICAgICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXFxcIm5vbmVcXFwiO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfSk7XFxufTtcXG4vKipcXG4qIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSB2aWRlbyBhZHMgYXJlIGN1cnJlbnRseSBydW5uaW5nXFxuKiBhbmQgYXV0by1jbGlja3MgdGhlIHNraXAgYnV0dG9uLlxcbiovXFxuY29uc3QgYXV0b1NraXBBZHMgPSAoKSA9PiB7XFxuICAgIC8vIElmIHRoZXJlJ3MgYSB2aWRlbyB0aGF0IHBsYXlzIHRoZSBhZCBhdCB0aGlzIG1vbWVudCwgc2Nyb2xsIHRoaXMgYWRcXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcIi5hZC1zaG93aW5nXFxcIikpIHtcXG4gICAgICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwidmlkZW9cXFwiKTtcXG4gICAgICAgIGlmICh2aWRlbyAmJiB2aWRlby5kdXJhdGlvbikge1xcbiAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gdmlkZW8uZHVyYXRpb247XFxuICAgICAgICAgICAgLy8gU2tpcCBidXR0b24gc2hvdWxkIGFwcGVhciBhZnRlciB0aGF0LFxcbiAgICAgICAgICAgIC8vIG5vdyBzaW1wbHkgY2xpY2sgaXQgYXV0b21hdGljYWxseVxcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xcbiAgICAgICAgICAgICAgICBjb25zdCBza2lwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwiYnV0dG9uLnl0cC1hZC1za2lwLWJ1dHRvblxcXCIpO1xcbiAgICAgICAgICAgICAgICBpZiAoc2tpcEJ0bikge1xcbiAgICAgICAgICAgICAgICAgICAgc2tpcEJ0bi5jbGljaygpO1xcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfSwgMTAwKTtcXG4gICAgICAgIH1cXG4gICAgfVxcbn07XFxuLyoqXFxuKiBUaGlzIGZ1bmN0aW9uIG92ZXJyaWRlcyBhIHByb3BlcnR5IG9uIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxcbipcXG4qIEBwYXJhbSB7b2JqZWN0fSBvYmogb2JqZWN0IHRvIGxvb2sgZm9yIHByb3BlcnRpZXMgaW5cXG4qIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgdG8gb3ZlcnJpZGVcXG4qIEBwYXJhbSB7Kn0gb3ZlcnJpZGVWYWx1ZSB2YWx1ZSB0byBzZXRcXG4qL1xcbmNvbnN0IG92ZXJyaWRlT2JqZWN0ID0gKG9iaiwgcHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKSA9PiB7XFxuICAgIGlmICghb2JqKSB7XFxuICAgICAgICByZXR1cm4gZmFsc2U7XFxuICAgIH1cXG4gICAgbGV0IG92ZXJyaWRlbiA9IGZhbHNlO1xcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgPT09IHByb3BlcnR5TmFtZSkge1xcbiAgICAgICAgICAgIG9ialtrZXldID0gb3ZlcnJpZGVWYWx1ZTtcXG4gICAgICAgICAgICBvdmVycmlkZW4gPSB0cnVlO1xcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcXG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgdHlwZW9mIG9ialtrZXldID09PSBcXFwib2JqZWN0XFxcIikge1xcbiAgICAgICAgICAgIGlmIChvdmVycmlkZU9iamVjdChvYmpba2V5XSwgcHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKSkge1xcbiAgICAgICAgICAgICAgICBvdmVycmlkZW4gPSB0cnVlO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcbiAgICByZXR1cm4gb3ZlcnJpZGVuO1xcbn07XFxuLyoqXFxuKiBPdmVycmlkZXMgSlNPTi5wYXJzZSBhbmQgUmVzcG9uc2UuanNvbiBmdW5jdGlvbnMuXFxuKiBFeGFtaW5lcyB0aGVzZSBmdW5jdGlvbnMgYXJndW1lbnRzLCBsb29rcyBmb3IgcHJvcGVydGllcyB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSB0aGVyZVxcbiogYW5kIGlmIGl0IGV4aXN0cywgY2hhbmdlcyBpdCdzIHZhbHVlIHRvIHdoYXQgd2FzIHNwZWNpZmllZC5cXG4qXFxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIG5hbWUgb2YgdGhlIHByb3BlcnR5XFxuKiBAcGFyYW0geyp9IG92ZXJyaWRlVmFsdWUgbmV3IHZhbHVlIGZvciB0aGUgcHJvcGVydHlcXG4qL1xcbmNvbnN0IGpzb25PdmVycmlkZSA9IChwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpID0+IHtcXG4gICAgY29uc3QgbmF0aXZlSlNPTlBhcnNlID0gSlNPTi5wYXJzZTtcXG4gICAgSlNPTi5wYXJzZSA9ICguLi5hcmdzKSA9PiB7XFxuICAgICAgICBjb25zdCBvYmogPSBuYXRpdmVKU09OUGFyc2UuYXBwbHkodGhpcywgYXJncyk7XFxuICAgICAgICAvLyBPdmVycmlkZSBpdCdzIHByb3BzIGFuZCByZXR1cm4gYmFjayB0byB0aGUgY2FsbGVyXFxuICAgICAgICBvdmVycmlkZU9iamVjdChvYmosIHByb3BlcnR5TmFtZSwgb3ZlcnJpZGVWYWx1ZSk7XFxuICAgICAgICByZXR1cm4gb2JqO1xcbiAgICB9O1xcbiAgICAvLyBPdmVycmlkZSBSZXNwb25zZS5wcm90b3R5cGUuanNvblxcbiAgICBjb25zdCBuYXRpdmVSZXNwb25zZUpzb24gPSBSZXNwb25zZS5wcm90b3R5cGUuanNvbjtcXG4gICAgUmVzcG9uc2UucHJvdG90eXBlLmpzb24gPSBuZXcgUHJveHkobmF0aXZlUmVzcG9uc2VKc29uLCB7XFxuICAgICAgICBhcHBseSguLi5hcmdzKSB7XFxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgdGFyZ2V0IGZ1bmN0aW9uLCBnZXQgdGhlIG9yaWdpbmFsIFByb21pc2VcXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gUmVmbGVjdC5hcHBseSguLi5hcmdzKTtcXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgb25lIGFuZCBvdmVycmlkZSB0aGUgSlNPTiBpbnNpZGVcXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZGF0YSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZU9iamVjdChkYXRhLCBwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpO1xcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XFxuICAgICAgICAgICAgfSk7XFxuICAgICAgICB9LFxcbiAgICB9KTtcXG59O1xcbmNvbnN0IGFkZEFkR3VhcmRMb2dvU3R5bGUgPSAoKSA9PiB7IH07XFxuY29uc3QgYWRkQWRHdWFyZExvZ28gPSAoKSA9PiB7XFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChMT0dPX0lEKSkge1xcbiAgICAgICAgcmV0dXJuO1xcbiAgICB9XFxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxcXCJzcGFuXFxcIik7XFxuICAgIGxvZ28uaW5uZXJIVE1MID0gXFxcIl9fbG9nb190ZXh0X19cXFwiO1xcbiAgICBsb2dvLnNldEF0dHJpYnV0ZShcXFwiaWRcXFwiLCBMT0dPX0lEKTtcXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXFxcIm0ueW91dHViZS5jb21cXFwiKSB7XFxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCJoZWFkZXIubW9iaWxlLXRvcGJhci1oZWFkZXIgPiBidXR0b25cXFwiKTtcXG4gICAgICAgIGlmIChidG4pIHtcXG4gICAgICAgICAgICBidG4ucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGxvZ28sIGJ0bi5uZXh0U2libGluZyk7XFxuICAgICAgICAgICAgYWRkQWRHdWFyZExvZ29TdHlsZSgpO1xcbiAgICAgICAgfVxcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXFxcInd3dy55b3V0dWJlLmNvbVxcXCIpIHtcXG4gICAgICAgIGNvbnN0IGNvZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcXFwiY291bnRyeS1jb2RlXFxcIik7XFxuICAgICAgICBpZiAoY29kZSkge1xcbiAgICAgICAgICAgIGNvZGUuaW5uZXJIVE1MID0gXFxcIlxcXCI7XFxuICAgICAgICAgICAgY29kZS5hcHBlbmRDaGlsZChsb2dvKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcXFwibXVzaWMueW91dHViZS5jb21cXFwiKSB7XFxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcIi55dG11c2ljLW5hdi1iYXIjbGVmdC1jb250ZW50XFxcIik7XFxuICAgICAgICBpZiAoZWwpIHtcXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChsb2dvKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcXFwid3d3LnlvdXR1YmUtbm9jb29raWUuY29tXFxcIikge1xcbiAgICAgICAgY29uc3QgY29kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcIiN5dC1tYXN0aGVhZCAjbG9nby1jb250YWluZXIgLmNvbnRlbnQtcmVnaW9uXFxcIik7XFxuICAgICAgICBpZiAoY29kZSkge1xcbiAgICAgICAgICAgIGNvZGUuaW5uZXJIVE1MID0gXFxcIlxcXCI7XFxuICAgICAgICAgICAgY29kZS5hcHBlbmRDaGlsZChsb2dvKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH1cXG59O1xcbi8vIFJlbW92ZXMgYWRzIG1ldGFkYXRhIGZyb20gWW91VHViZSBYSFIgcmVxdWVzdHNcXG5qc29uT3ZlcnJpZGUoXFxcImFkUGxhY2VtZW50c1xcXCIsIFtdKTtcXG5qc29uT3ZlcnJpZGUoXFxcInBsYXllckFkc1xcXCIsIFtdKTtcXG4vLyBBcHBsaWVzIENTUyB0aGF0IGhpZGVzIFlvdVR1YmUgYWQgZWxlbWVudHNcXG5oaWRlRWxlbWVudHMoKTtcXG4vLyBTb21lIGNoYW5nZXMgc2hvdWxkIGJlIHJlLWV2YWx1YXRlZCBvbiBldmVyeSBwYWdlIGNoYW5nZVxcbmFkZEFkR3VhcmRMb2dvKCk7XFxuaGlkZUR5bmFtaWNBZHMoKTtcXG5hdXRvU2tpcEFkcygpO1xcbm9ic2VydmVEb21DaGFuZ2VzKCgpID0+IHtcXG4gICAgYWRkQWRHdWFyZExvZ28oKTtcXG4gICAgaGlkZUR5bmFtaWNBZHMoKTtcXG4gICAgYXV0b1NraXBBZHMoKTtcXG59KTtcIiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBSZW5kZXJlclNldHRpbmdzIH0gZnJvbSBcIkBtYWluL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCBhZGd1YXJkIGZyb20gXCJmaWxlOi8vYWRndWFyZC5qcz9taW5pZnlcIjtcblxuYXBwLm9uKFwiYnJvd3Nlci13aW5kb3ctY3JlYXRlZFwiLCAoXywgd2luKSA9PiB7XG4gICAgd2luLndlYkNvbnRlbnRzLm9uKFwiZnJhbWUtY3JlYXRlZFwiLCAoXywgeyBmcmFtZSB9KSA9PiB7XG4gICAgICAgIGZyYW1lLm9uY2UoXCJkb20tcmVhZHlcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZyYW1lLnVybC5pbmNsdWRlcyhcImRpc2NvcmRzYXlzXCIpICYmIGZyYW1lLnVybC5pbmNsdWRlcyhcInlvdXR1YmUuY29tXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LldhdGNoVG9nZXRoZXJBZGJsb2NrPy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmcmFtZS5leGVjdXRlSmF2YVNjcmlwdChhZGd1YXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTb2NrZXQsIFNvY2tldCB9IGZyb20gXCJkZ3JhbVwiO1xuXG5sZXQgeHNvU29ja2V0OiBTb2NrZXQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kVG9PdmVybGF5KF8sIGRhdGE6IGFueSkge1xuICAgIGRhdGEuaWNvbiA9IEJ1ZmZlci5mcm9tKGRhdGEuaWNvbikudG9TdHJpbmcoXCJiYXNlNjRcIik7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIHhzb1NvY2tldCA/Pz0gY3JlYXRlU29ja2V0KFwidWRwNFwiKTtcbiAgICB4c29Tb2NrZXQuc2VuZChqc29uLCA0MjA2OSwgXCIxMjcuMC4wLjFcIik7XG59XG4iLCAiaW1wb3J0ICogYXMgcDAgZnJvbSBcIi4vcGx1Z2lucy9hcHBsZU11c2ljLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwMSBmcm9tIFwiLi9wbHVnaW5zL2NvbnNvbGVTaG9ydGN1dHMvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwMiBmcm9tIFwiLi9wbHVnaW5zL2ZpeFNwb3RpZnlFbWJlZHMuZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHAzIGZyb20gXCIuL3BsdWdpbnMvZml4WW91dHViZUVtYmVkcy5kZXNrdG9wL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDQgZnJvbSBcIi4vcGx1Z2lucy9tZWRpYURvd25sb2FkZXIuZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA1IGZyb20gXCIuL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDYgZnJvbSBcIi4vcGx1Z2lucy9vcGVuSW5BcHAvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwNyBmcm9tIFwiLi9wbHVnaW5zL3ZvaWNlTWVzc2FnZXMvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwOCBmcm9tIFwiLi9wbHVnaW5zL3dhdGNoVG9nZXRoZXJBZGJsb2NrLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwOSBmcm9tIFwiLi9wbHVnaW5zL3hzT3ZlcmxheS5kZXNrdG9wL25hdGl2ZVwiO1xuZXhwb3J0IGRlZmF1bHQge1xuXCJBcHBsZU11c2ljUmljaFByZXNlbmNlXCI6cDAsXG5cIkNvbnNvbGVTaG9ydGN1dHNcIjpwMSxcblwiRml4U3BvdGlmeUVtYmVkc1wiOnAyLFxuXCJGaXhZb3V0dWJlRW1iZWRzXCI6cDMsXG5cIk1lZGlhRG93bmxvYWRlclwiOnA0LFxuXCJNZXNzYWdlTG9nZ2VyRW5oYW5jZWRcIjpwNSxcblwiT3BlbkluQXBwXCI6cDYsXG5cIlZvaWNlTWVzc2FnZXNcIjpwNyxcblwiV2F0Y2hUb2dldGhlckFkYmxvY2tcIjpwOCxcblwiWFNPdmVybGF5XCI6cDksXG59OyIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBJcGNFdmVudHMgfSBmcm9tIFwiQHNoYXJlZC9JcGNFdmVudHNcIjtcbmltcG9ydCB7IGlwY01haW4gfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuaW1wb3J0IFBsdWdpbk5hdGl2ZXMgZnJvbSBcIn5wbHVnaW5OYXRpdmVzXCI7XG5cbmNvbnN0IFBsdWdpbklwY01hcHBpbmdzID0ge30gYXMgUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj47XG5leHBvcnQgdHlwZSBQbHVnaW5JcGNNYXBwaW5ncyA9IHR5cGVvZiBQbHVnaW5JcGNNYXBwaW5ncztcblxuZm9yIChjb25zdCBbcGx1Z2luLCBtZXRob2RzXSBvZiBPYmplY3QuZW50cmllcyhQbHVnaW5OYXRpdmVzKSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhtZXRob2RzKTtcbiAgICBpZiAoIWVudHJpZXMubGVuZ3RoKSBjb250aW51ZTtcblxuICAgIGNvbnN0IG1hcHBpbmdzID0gUGx1Z2luSXBjTWFwcGluZ3NbcGx1Z2luXSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBbbWV0aG9kTmFtZSwgbWV0aG9kXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGBSaXZlcmNvcmRQbHVnaW5OYXRpdmVfJHtwbHVnaW59XyR7bWV0aG9kTmFtZX1gO1xuICAgICAgICBpcGNNYWluLmhhbmRsZShrZXksIG1ldGhvZCk7XG4gICAgICAgIG1hcHBpbmdzW21ldGhvZE5hbWVdID0ga2V5O1xuICAgIH1cbn1cblxuaXBjTWFpbi5vbihJcGNFdmVudHMuR0VUX1BMVUdJTl9JUENfTUVUSE9EX01BUCwgZSA9PiB7XG4gICAgZS5yZXR1cm5WYWx1ZSA9IFBsdWdpbklwY01hcHBpbmdzO1xufSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIHRoYXQgd2lsbCBjYWxsIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gKiBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIGFnYWluXG4gKiB3aXRoaW4gdGhlIGRlbGF5LCB0aGUgdGltZXIgd2lsbCBiZSByZXNldC5cbiAqIEBwYXJhbSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwXG4gKiBAcGFyYW0gZGVsYXkgVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2U8VCBleHRlbmRzIEZ1bmN0aW9uPihmdW5jOiBULCBkZWxheSA9IDMwMCk6IFQge1xuICAgIGxldCB0aW1lb3V0OiBOb2RlSlMuVGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4geyBmdW5jKC4uLmFyZ3MpOyB9LCBkZWxheSk7XG4gICAgfSBhcyBhbnk7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgXCJQQ0ZFVDBOVVdWQkZJR2gwYld3K0NqeG9kRzFzSUd4aGJtYzlJbVZ1SWo0S0NqeG9aV0ZrUGdvZ0lDQWdQRzFsZEdFZ1kyaGhjbk5sZEQwaWRYUm1MVGdpSUM4K0NpQWdJQ0E4ZEdsMGJHVStVbWwyWlhKamIzSmtJRkYxYVdOclExTlRJRVZrYVhSdmNqd3ZkR2wwYkdVK0NpQWdJQ0E4YkdsdWF5QnlaV3c5SW5OMGVXeGxjMmhsWlhRaUlHaHlaV1k5SW1oMGRIQnpPaTh2WTJSdUxtcHpaR1ZzYVhaeUxtNWxkQzl1Y0cwdmJXOXVZV052TFdWa2FYUnZja0F3TGpVd0xqQXZiV2x1TDNaekwyVmthWFJ2Y2k5bFpHbDBiM0l1YldGcGJpNWpjM01pQ2lBZ0lDQWdJQ0FnYVc1MFpXZHlhWFI1UFNKemFHRXlOVFl0ZEdsS1VGRXlUekEwZWk5d1dpOUJkMlI1U1dkb2NrOU5lbVYzWml0UVNYWkZiREZaUzJKUmRuTmFhejBpSUdOeWIzTnpiM0pwWjJsdVBTSmhibTl1ZVcxdmRYTWlDaUFnSUNBZ0lDQWdjbVZtWlhKeVpYSndiMnhwWTNrOUltNXZMWEpsWm1WeWNtVnlJaUF2UGdvZ0lDQWdQSE4wZVd4bFBnb2dJQ0FnSUNBZ0lHaDBiV3dzQ2lBZ0lDQWdJQ0FnWW05a2VTd0tJQ0FnSUNBZ0lDQWpZMjl1ZEdGcGJtVnlJSHNLSUNBZ0lDQWdJQ0FnSUNBZ2NHOXphWFJwYjI0NklHRmljMjlzZFhSbE93b2dJQ0FnSUNBZ0lDQWdJQ0JzWldaME9pQXdPd29nSUNBZ0lDQWdJQ0FnSUNCMGIzQTZJREE3Q2lBZ0lDQWdJQ0FnSUNBZ0lIZHBaSFJvT2lBeE1EQWxPd29nSUNBZ0lDQWdJQ0FnSUNCb1pXbG5hSFE2SURFd01DVTdDaUFnSUNBZ0lDQWdJQ0FnSUcxaGNtZHBiam9nTURzS0lDQWdJQ0FnSUNBZ0lDQWdjR0ZrWkdsdVp6b2dNRHNLSUNBZ0lDQWdJQ0FnSUNBZ2IzWmxjbVpzYjNjNklHaHBaR1JsYmpzS0lDQWdJQ0FnSUNCOUNpQWdJQ0E4TDNOMGVXeGxQZ284TDJobFlXUStDZ284WW05a2VUNEtJQ0FnSUR4a2FYWWdhV1E5SW1OdmJuUmhhVzVsY2lJK1BDOWthWFkrQ2lBZ0lDQThjMk55YVhCMElITnlZejBpYUhSMGNITTZMeTlqWkc0dWFuTmtaV3hwZG5JdWJtVjBMMjV3YlM5dGIyNWhZMjh0WldScGRHOXlRREF1TlRBdU1DOXRhVzR2ZG5NdmJHOWhaR1Z5TG1weklnb2dJQ0FnSUNBZ0lHbHVkR1ZuY21sMGVUMGljMmhoTWpVMkxVdGpWVFE0VkVkeU9EUnlOM1Z1UmpkS05VbG5RbTg1TldGbFZuSkZZbkpIWlRBMFV6ZFVZMFpWYW5NOUlpQmpjbTl6YzI5eWFXZHBiajBpWVc1dmJubHRiM1Z6SWdvZ0lDQWdJQ0FnSUhKbFptVnljbVZ5Y0c5c2FXTjVQU0p1YnkxeVpXWmxjbkpsY2lJK1BDOXpZM0pwY0hRK0Nnb2dJQ0FnUEhOamNtbHdkRDRLSUNBZ0lDQWdJQ0J5WlhGMWFYSmxMbU52Ym1acFp5aDdDaUFnSUNBZ0lDQWdJQ0FnSUhCaGRHaHpPaUI3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyY3pvZ0ltaDBkSEJ6T2k4dlkyUnVMbXB6WkdWc2FYWnlMbTVsZEM5dWNHMHZiVzl1WVdOdkxXVmthWFJ2Y2tBd0xqVXdMakF2YldsdUwzWnpJaXdLSUNBZ0lDQWdJQ0FnSUNBZ2ZTd0tJQ0FnSUNBZ0lDQjlLVHNLQ2lBZ0lDQWdJQ0FnY21WeGRXbHlaU2hiSW5aekwyVmthWFJ2Y2k5bFpHbDBiM0l1YldGcGJpSmRMQ0FvS1NBOVBpQjdDaUFnSUNBZ0lDQWdJQ0FnSUdkbGRFTjFjbkpsYm5SRGMzTW9LUzUwYUdWdUtDaGpjM01wSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJsWkdsMGIzSWdQU0J0YjI1aFkyOHVaV1JwZEc5eUxtTnlaV0YwWlNnS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNnaVkyOXVkR0ZwYm1WeUlpa3NDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZXdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVd4MVpUb2dZM056TEFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JzWVc1bmRXRm5aVG9nSW1OemN5SXNDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9aVzFsT2lCblpYUlVhR1Z0WlNncExBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ2s3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsWkdsMGIzSXViMjVFYVdSRGFHRnVaMlZOYjJSbGJFTnZiblJsYm5Rb0tDa2dQVDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpYUkRjM01vWldScGRHOXlMbWRsZEZaaGJIVmxLQ2twQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FwT3dvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9JbkpsYzJsNlpTSXNJQ2dwSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlCdFlXdGxJRzF2Ym1GamJ5QnlaUzFzWVhsdmRYUUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsWkdsMGIzSXViR0Y1YjNWMEtDazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVHNLSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdDaUFnSUNBZ0lDQWdmU2s3Q2lBZ0lDQThMM05qY21sd2RENEtQQzlpYjJSNVBnb0tQQzlvZEcxc1Bnbz1cIiIsICIvKiBlc2xpbnQtZGlzYWJsZSBzaW1wbGUtaGVhZGVyL2hlYWRlciAqL1xuXG4vKiFcbiAqIEJldHRlckRpc2NvcmQgYWRkb24gbWV0YSBwYXJzZXJcbiAqIENvcHlyaWdodCAyMDIzIEJldHRlckRpc2NvcmQgY29udHJpYnV0b3JzXG4gKiBDb3B5cmlnaHQgMjAyMyBWZW5kaWNhdGVkIGFuZCBSaXZlcmNvcmQgY29udHJpYnV0b3JzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBzcGxpdFJlZ2V4ID0gL1teXFxTXFxyXFxuXSo/XFxyPyg/OlxcclxcbnxcXG4pW15cXFNcXHJcXG5dKj9cXCpbXlxcU1xcclxcbl0/LztcbmNvbnN0IGVzY2FwZWRBdFJlZ2V4ID0gL15cXFxcQC87XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclRoZW1lSGVhZGVyIHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBhdXRob3I6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBzdHJpbmc7XG4gICAgbGljZW5zZT86IHN0cmluZztcbiAgICBzb3VyY2U/OiBzdHJpbmc7XG4gICAgd2Vic2l0ZT86IHN0cmluZztcbiAgICBpbnZpdGU/OiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIG1ha2VIZWFkZXIoZmlsZU5hbWU6IHN0cmluZywgb3B0czogUGFydGlhbDxVc2VyVGhlbWVIZWFkZXI+ID0ge30pOiBVc2VyVGhlbWVIZWFkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVOYW1lLFxuICAgICAgICBuYW1lOiBvcHRzLm5hbWUgPz8gZmlsZU5hbWUucmVwbGFjZSgvXFwuY3NzJC9pLCBcIlwiKSxcbiAgICAgICAgYXV0aG9yOiBvcHRzLmF1dGhvciA/PyBcIlVua25vd24gQXV0aG9yXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBvcHRzLmRlc2NyaXB0aW9uID8/IFwiQSBEaXNjb3JkIFRoZW1lLlwiLFxuICAgICAgICB2ZXJzaW9uOiBvcHRzLnZlcnNpb24sXG4gICAgICAgIGxpY2Vuc2U6IG9wdHMubGljZW5zZSxcbiAgICAgICAgc291cmNlOiBvcHRzLnNvdXJjZSxcbiAgICAgICAgd2Vic2l0ZTogb3B0cy53ZWJzaXRlLFxuICAgICAgICBpbnZpdGU6IG9wdHMuaW52aXRlXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwQk9NKGZpbGVDb250ZW50OiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZUNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlQ29udGVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoZW1lSW5mbyhjc3M6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IFVzZXJUaGVtZUhlYWRlciB7XG4gICAgaWYgKCFjc3MpIHJldHVybiBtYWtlSGVhZGVyKGZpbGVOYW1lKTtcblxuICAgIGNvbnN0IGJsb2NrID0gY3NzLnNwbGl0KFwiLyoqXCIsIDIpPy5bMV0/LnNwbGl0KFwiKi9cIiwgMSk/LlswXTtcbiAgICBpZiAoIWJsb2NrKSByZXR1cm4gbWFrZUhlYWRlcihmaWxlTmFtZSk7XG5cbiAgICBjb25zdCBoZWFkZXI6IFBhcnRpYWw8VXNlclRoZW1lSGVhZGVyPiA9IHt9O1xuICAgIGxldCBmaWVsZCA9IFwiXCI7XG4gICAgbGV0IGFjY3VtID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgYmxvY2suc3BsaXQoc3BsaXRSZWdleCkpIHtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID09PSAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSBcIkBcIiAmJiBsaW5lLmNoYXJBdCgxKSAhPT0gXCIgXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcltmaWVsZF0gPSBhY2N1bS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCBsID0gbGluZS5pbmRleE9mKFwiIFwiKTtcbiAgICAgICAgICAgIGZpZWxkID0gbGluZS5zdWJzdHJpbmcoMSwgbCk7XG4gICAgICAgICAgICBhY2N1bSA9IGxpbmUuc3Vic3RyaW5nKGwgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjY3VtICs9IFwiIFwiICsgbGluZS5yZXBsYWNlKFwiXFxcXG5cIiwgXCJcXG5cIikucmVwbGFjZShlc2NhcGVkQXRSZWdleCwgXCJAXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhlYWRlcltmaWVsZF0gPSBhY2N1bS50cmltKCk7XG4gICAgZGVsZXRlIGhlYWRlcltcIlwiXTtcbiAgICByZXR1cm4gbWFrZUhlYWRlcihmaWxlTmFtZSwgaGVhZGVyKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyB0eXBlIEJyb3dzZXJXaW5kb3csIHNoZWxsIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGlua3NPcGVuRXh0ZXJuYWxseSh3aW46IEJyb3dzZXJXaW5kb3cpIHtcbiAgICB3aW4ud2ViQ29udGVudHMuc2V0V2luZG93T3BlbkhhbmRsZXIoKHsgdXJsIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh1cmwpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhYm91dDpibGFua1wiOlxuICAgICAgICAgICAgY2FzZSBcImh0dHBzOi8vZGlzY29yZC5jb20vcG9wb3V0XCI6XG4gICAgICAgICAgICBjYXNlIFwiaHR0cHM6Ly9wdGIuZGlzY29yZC5jb20vcG9wb3V0XCI6XG4gICAgICAgICAgICBjYXNlIFwiaHR0cHM6Ly9jYW5hcnkuZGlzY29yZC5jb20vcG9wb3V0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBcImFsbG93XCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgeyBwcm90b2NvbCB9ID0gbmV3IFVSTCh1cmwpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiB7IGFjdGlvbjogXCJkZW55XCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICAgICAgICAgIGNhc2UgXCJodHRwOlwiOlxuICAgICAgICAgICAgY2FzZSBcImh0dHBzOlwiOlxuICAgICAgICAgICAgY2FzZSBcIm1haWx0bzpcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdGVhbTpcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzcG90aWZ5OlwiOlxuICAgICAgICAgICAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbCh1cmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBcImRlbnlcIiB9O1xuICAgIH0pO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCBcIi4vdXBkYXRlclwiO1xuaW1wb3J0IFwiLi9pcGNQbHVnaW5zXCI7XG5pbXBvcnQgXCIuL3NldHRpbmdzXCI7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcIkBzaGFyZWQvZGVib3VuY2VcIjtcbmltcG9ydCB7IElwY0V2ZW50cyB9IGZyb20gXCJAc2hhcmVkL0lwY0V2ZW50c1wiO1xuaW1wb3J0IHsgQnJvd3NlcldpbmRvdywgaXBjTWFpbiwgc2hlbGwsIHN5c3RlbVByZWZlcmVuY2VzIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgbW9uYWNvSHRtbCBmcm9tIFwiZmlsZTovL21vbmFjb1dpbi5odG1sP21pbmlmeSZiYXNlNjRcIjtcbmltcG9ydCB7IEZTV2F0Y2hlciwgbWtkaXJTeW5jLCB3YXRjaCwgd3JpdGVGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgb3BlbiwgcmVhZGRpciwgcmVhZEZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4sIG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGdldFRoZW1lSW5mbywgc3RyaXBCT00sIFVzZXJUaGVtZUhlYWRlciB9IGZyb20gXCIuL3RoZW1lc1wiO1xuaW1wb3J0IHsgQUxMT1dFRF9QUk9UT0NPTFMsIFFVSUNLQ1NTX1BBVEgsIFRIRU1FU19ESVIgfSBmcm9tIFwiLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5IH0gZnJvbSBcIi4vdXRpbHMvZXh0ZXJuYWxMaW5rc1wiO1xuXG5ta2RpclN5bmMoVEhFTUVTX0RJUiwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTYWZlUGF0aChiYXNlUGF0aDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBub3JtYWxpemVkQmFzZVBhdGggPSBub3JtYWxpemUoYmFzZVBhdGgpO1xuICAgIGNvbnN0IG5ld1BhdGggPSBqb2luKGJhc2VQYXRoLCBwYXRoKTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IG5vcm1hbGl6ZShuZXdQYXRoKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZFBhdGguc3RhcnRzV2l0aChub3JtYWxpemVkQmFzZVBhdGgpID8gbm9ybWFsaXplZFBhdGggOiBudWxsO1xufVxuXG5mdW5jdGlvbiByZWFkQ3NzKCkge1xuICAgIHJldHVybiByZWFkRmlsZShRVUlDS0NTU19QQVRILCBcInV0Zi04XCIpLmNhdGNoKCgpID0+IFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0VGhlbWVzKCk6IFByb21pc2U8VXNlclRoZW1lSGVhZGVyW10+IHtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IHJlYWRkaXIoVEhFTUVTX0RJUikuY2F0Y2goKCkgPT4gW10pO1xuXG4gICAgY29uc3QgdGhlbWVJbmZvOiBVc2VyVGhlbWVIZWFkZXJbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBmaWxlcykge1xuICAgICAgICBpZiAoIWZpbGVOYW1lLmVuZHNXaXRoKFwiLmNzc1wiKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFRoZW1lRGF0YShmaWxlTmFtZSkudGhlbihzdHJpcEJPTSkuY2F0Y2goKCkgPT4gbnVsbCk7XG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRoZW1lSW5mby5wdXNoKGdldFRoZW1lSW5mbyhkYXRhLCBmaWxlTmFtZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGVtZUluZm87XG59XG5cbmZ1bmN0aW9uIGdldFRoZW1lRGF0YShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgZmlsZU5hbWUgPSBmaWxlTmFtZS5yZXBsYWNlKC9cXD92PVxcZCskLywgXCJcIik7XG4gICAgY29uc3Qgc2FmZVBhdGggPSBlbnN1cmVTYWZlUGF0aChUSEVNRVNfRElSLCBmaWxlTmFtZSk7XG4gICAgaWYgKCFzYWZlUGF0aCkgcmV0dXJuIFByb21pc2UucmVqZWN0KGBVbnNhZmUgcGF0aCAke2ZpbGVOYW1lfWApO1xuICAgIHJldHVybiByZWFkRmlsZShzYWZlUGF0aCwgXCJ1dGYtOFwiKTtcbn1cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLk9QRU5fUVVJQ0tDU1MsICgpID0+IHNoZWxsLm9wZW5QYXRoKFFVSUNLQ1NTX1BBVEgpKTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLk9QRU5fRVhURVJOQUwsIChfLCB1cmwpID0+IHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgeyBwcm90b2NvbCB9ID0gbmV3IFVSTCh1cmwpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICB0aHJvdyBcIk1hbGZvcm1lZCBVUkxcIjtcbiAgICB9XG4gICAgaWYgKCFBTExPV0VEX1BST1RPQ09MUy5pbmNsdWRlcyhwcm90b2NvbCkpXG4gICAgICAgIHRocm93IFwiRGlzYWxsb3dlZCBwcm90b2NvbC5cIjtcblxuICAgIHNoZWxsLm9wZW5FeHRlcm5hbCh1cmwpO1xufSk7XG5cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9RVUlDS19DU1MsICgpID0+IHJlYWRDc3MoKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuU0VUX1FVSUNLX0NTUywgKF8sIGNzcykgPT5cbiAgICB3cml0ZUZpbGVTeW5jKFFVSUNLQ1NTX1BBVEgsIGNzcylcbik7XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfVEhFTUVTX0RJUiwgKCkgPT4gVEhFTUVTX0RJUik7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1RIRU1FU19MSVNULCAoKSA9PiBsaXN0VGhlbWVzKCkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRV9EQVRBLCAoXywgZmlsZU5hbWUpID0+IGdldFRoZW1lRGF0YShmaWxlTmFtZSkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRV9TWVNURU1fVkFMVUVTLCAoKSA9PiAoe1xuICAgIC8vIHdpbiAmIG1hYyBvbmx5XG4gICAgXCJvcy1hY2NlbnQtY29sb3JcIjogYCMke3N5c3RlbVByZWZlcmVuY2VzLmdldEFjY2VudENvbG9yPy4oKSB8fCBcIlwifWBcbn0pKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdElwYyhtYWluV2luZG93OiBCcm93c2VyV2luZG93KSB7XG4gICAgbGV0IHF1aWNrQ3NzV2F0Y2hlcjogRlNXYXRjaGVyIHwgdW5kZWZpbmVkO1xuXG4gICAgb3BlbihRVUlDS0NTU19QQVRILCBcImErXCIpLnRoZW4oZmQgPT4ge1xuICAgICAgICBmZC5jbG9zZSgpO1xuICAgICAgICBxdWlja0Nzc1dhdGNoZXIgPSB3YXRjaChRVUlDS0NTU19QQVRILCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0sIGRlYm91bmNlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMucG9zdE1lc3NhZ2UoSXBjRXZlbnRzLlFVSUNLX0NTU19VUERBVEUsIGF3YWl0IHJlYWRDc3MoKSk7XG4gICAgICAgIH0sIDUwKSk7XG4gICAgfSkuY2F0Y2goKCkgPT4geyB9KTtcblxuICAgIGNvbnN0IHRoZW1lc1dhdGNoZXIgPSB3YXRjaChUSEVNRVNfRElSLCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0sIGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5wb3N0TWVzc2FnZShJcGNFdmVudHMuVEhFTUVfVVBEQVRFLCB2b2lkIDApO1xuICAgIH0pKTtcblxuICAgIG1haW5XaW5kb3cub25jZShcImNsb3NlZFwiLCAoKSA9PiB7XG4gICAgICAgIHF1aWNrQ3NzV2F0Y2hlcj8uY2xvc2UoKTtcbiAgICAgICAgdGhlbWVzV2F0Y2hlci5jbG9zZSgpO1xuICAgIH0pO1xufVxuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuT1BFTl9NT05BQ09fRURJVE9SLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBcIlJpdmVyY29yZCBRdWlja0NTUyBFZGl0b3JcIjtcbiAgICBjb25zdCBleGlzdGluZ1dpbmRvdyA9IEJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmZpbmQodyA9PiB3LnRpdGxlID09PSB0aXRsZSk7XG4gICAgaWYgKGV4aXN0aW5nV2luZG93ICYmICFleGlzdGluZ1dpbmRvdy5pc0Rlc3Ryb3llZCgpKSB7XG4gICAgICAgIGV4aXN0aW5nV2luZG93LmZvY3VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3aW4gPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRvSGlkZU1lbnVCYXI6IHRydWUsXG4gICAgICAgIGRhcmtUaGVtZTogdHJ1ZSxcbiAgICAgICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgICAgICAgIHByZWxvYWQ6IGpvaW4oX19kaXJuYW1lLCBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInByZWxvYWQuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcFByZWxvYWQuanNcIiksXG4gICAgICAgICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNhbmRib3g6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5KHdpbik7XG5cbiAgICBhd2FpdCB3aW4ubG9hZFVSTChgZGF0YTp0ZXh0L2h0bWw7YmFzZTY0LCR7bW9uYWNvSHRtbH1gKTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB0eXBlIHsgTGl0ZXJhbFVuaW9uIH0gZnJvbSBcInR5cGUtZmVzdFwiO1xuXG4vKipcbiAqIFdhaXQgZm9yIGEgcHJvcGVydHkgdG8gYmUgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0LCB0aGVuIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGhcbiAqIHRoZSB2YWx1ZVxuICogQHBhcmFtIHRhcmdldCBPYmplY3RcbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSB0byBiZSBkZWZpbmVkXG4gKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAqXG4gKiBAZXhhbXBsZSBvbmNlRGVmaW5lZCh3aW5kb3csIFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIiwgd3BJbnN0YW5jZSA9PiB3cEluc3RhbmNlLnB1c2goLi4uKSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbmNlRGVmaW5lZDxUIGV4dGVuZHMgb2JqZWN0LCBQIGV4dGVuZHMgTGl0ZXJhbFVuaW9uPGtleW9mIFQsIFByb3BlcnR5S2V5Pj4oXG4gICAgdGFyZ2V0OiBULCBwcm9wZXJ0eTogUCwgY2FsbGJhY2s6ICh2OiBQIGV4dGVuZHMga2V5b2YgVCA/IFRbUF0gOiBhbnkpID0+IHZvaWRcbik6IHZvaWQge1xuICAgIGNvbnN0IHByb3BlcnR5QXNBbnkgPSBwcm9wZXJ0eSBhcyBhbnk7XG5cbiAgICBpZiAocHJvcGVydHkgaW4gdGFyZ2V0KVxuICAgICAgICByZXR1cm4gdm9pZCBjYWxsYmFjayh0YXJnZXRbcHJvcGVydHlBc0FueV0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICAgICAgc2V0KHYpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlBc0FueV07XG4gICAgICAgICAgICB0YXJnZXRbcHJvcGVydHlBc0FueV0gPSB2O1xuICAgICAgICAgICAgY2FsbGJhY2sodik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB9KTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMsIG1rZGlyU3luYywgcmVhZGRpclN5bmMsIHJlbmFtZVN5bmMsIHN0YXRTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcIm9yaWdpbmFsLWZzXCI7XG5pbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSwgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmZ1bmN0aW9uIGlzTmV3ZXIoJG5ldzogc3RyaW5nLCBvbGQ6IHN0cmluZykge1xuICAgIGNvbnN0IG5ld1BhcnRzID0gJG5ldy5zbGljZSg0KS5zcGxpdChcIi5cIikubWFwKE51bWJlcik7XG4gICAgY29uc3Qgb2xkUGFydHMgPSBvbGQuc2xpY2UoNCkuc3BsaXQoXCIuXCIpLm1hcChOdW1iZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobmV3UGFydHNbaV0gPiBvbGRQYXJ0c1tpXSkgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChuZXdQYXJ0c1tpXSA8IG9sZFBhcnRzW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcGF0Y2hMYXRlc3QoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52LkRJU0FCTEVfVVBEQVRFUl9BVVRPX1BBVENISU5HKSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjdXJyZW50QXBwUGF0aCA9IGRpcm5hbWUocHJvY2Vzcy5leGVjUGF0aCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWZXJzaW9uID0gYmFzZW5hbWUoY3VycmVudEFwcFBhdGgpO1xuICAgICAgICBjb25zdCBkaXNjb3JkUGF0aCA9IGpvaW4oY3VycmVudEFwcFBhdGgsIFwiLi5cIik7XG5cbiAgICAgICAgY29uc3QgbGF0ZXN0VmVyc2lvbiA9IHJlYWRkaXJTeW5jKGRpc2NvcmRQYXRoKS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoY3Vyci5zdGFydHNXaXRoKFwiYXBwLVwiKSAmJiBpc05ld2VyKGN1cnIsIHByZXYpKVxuICAgICAgICAgICAgICAgID8gY3VyclxuICAgICAgICAgICAgICAgIDogcHJldjtcbiAgICAgICAgfSwgY3VycmVudFZlcnNpb24gYXMgc3RyaW5nKTtcblxuICAgICAgICBpZiAobGF0ZXN0VmVyc2lvbiA9PT0gY3VycmVudFZlcnNpb24pIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBqb2luKGRpc2NvcmRQYXRoLCBsYXRlc3RWZXJzaW9uLCBcInJlc291cmNlc1wiKTtcbiAgICAgICAgY29uc3QgYXBwID0gam9pbihyZXNvdXJjZXMsIFwiYXBwLmFzYXJcIik7XG4gICAgICAgIGNvbnN0IF9hcHAgPSBqb2luKHJlc291cmNlcywgXCJfYXBwLmFzYXJcIik7XG5cbiAgICAgICAgaWYgKCFleGlzdHNTeW5jKGFwcCkgfHwgc3RhdFN5bmMoYXBwKS5pc0RpcmVjdG9yeSgpKSByZXR1cm47XG5cbiAgICAgICAgY29uc29sZS5pbmZvKFwiW1JpdmVyY29yZF0gRGV0ZWN0ZWQgSG9zdCBVcGRhdGUuIFJlcGF0Y2hpbmcuLi5cIik7XG5cbiAgICAgICAgcmVuYW1lU3luYyhhcHAsIF9hcHApO1xuICAgICAgICBta2RpclN5bmMoYXBwKTtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhqb2luKGFwcCwgXCJwYWNrYWdlLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGlzY29yZFwiLFxuICAgICAgICAgICAgbWFpbjogXCJpbmRleC5qc1wiXG4gICAgICAgIH0pKTtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhqb2luKGFwcCwgXCJpbmRleC5qc1wiKSwgYHJlcXVpcmUoJHtKU09OLnN0cmluZ2lmeShqb2luKF9fZGlybmFtZSwgXCJwYXRjaGVyLmpzXCIpKX0pO2ApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW1JpdmVyY29yZF0gRmFpbGVkIHRvIHJlcGF0Y2ggbGF0ZXN0IGhvc3QgdXBkYXRlXCIsIGVycik7XG4gICAgfVxufVxuXG4vLyBUcnkgdG8gcGF0Y2ggbGF0ZXN0IG9uIGJlZm9yZS1xdWl0XG4vLyBEaXNjb3JkJ3MgV2luMzIgdXBkYXRlciB3aWxsIGNhbGwgYXBwLnF1aXQoKSBvbiByZXN0YXJ0IGFuZCBvcGVuIG5ldyB2ZXJzaW9uIG9uIHdpbGwtcXVpdFxuYXBwLm9uKFwiYmVmb3JlLXF1aXRcIiwgcGF0Y2hMYXRlc3QpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IG9uY2VEZWZpbmVkIH0gZnJvbSBcIkBzaGFyZWQvb25jZURlZmluZWRcIjtcbmltcG9ydCBlbGVjdHJvbiwgeyBhcHAsIEJyb3dzZXJXaW5kb3dDb25zdHJ1Y3Rvck9wdGlvbnMsIE1lbnUgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGRpcm5hbWUsIGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBpbml0SXBjIH0gZnJvbSBcIi4vaXBjTWFpblwiO1xuaW1wb3J0IHsgUmVuZGVyZXJTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBJU19WQU5JTExBIH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmNvbnNvbGUubG9nKFwiW1JpdmVyY29yZF0gU3RhcnRpbmcgdXAuLi5cIik7XG5cbi8vIE91ciBpbmplY3RvciBmaWxlIGF0IGFwcC9pbmRleC5qc1xuY29uc3QgaW5qZWN0b3JQYXRoID0gcmVxdWlyZS5tYWluIS5maWxlbmFtZTtcblxuLy8gc3BlY2lhbCBkaXNjb3JkX2FyY2hfZWxlY3Ryb24gaW5qZWN0aW9uIG1ldGhvZFxuY29uc3QgYXNhck5hbWUgPSByZXF1aXJlLm1haW4hLnBhdGguZW5kc1dpdGgoXCJhcHAuYXNhclwiKSA/IFwiX2FwcC5hc2FyXCIgOiBcImFwcC5hc2FyXCI7XG5cbi8vIFRoZSBvcmlnaW5hbCBhcHAuYXNhclxuY29uc3QgYXNhclBhdGggPSBqb2luKGRpcm5hbWUoaW5qZWN0b3JQYXRoKSwgXCIuLlwiLCBhc2FyTmFtZSk7XG5cbmNvbnN0IGRpc2NvcmRQa2cgPSByZXF1aXJlKGpvaW4oYXNhclBhdGgsIFwicGFja2FnZS5qc29uXCIpKTtcbnJlcXVpcmUubWFpbiEuZmlsZW5hbWUgPSBqb2luKGFzYXJQYXRoLCBkaXNjb3JkUGtnLm1haW4pO1xuXG4vLyBAdHMtaWdub3JlIFVudHlwZWQgbWV0aG9kPyBEaWVzIGZyb20gY3JpbmdlXG5hcHAuc2V0QXBwUGF0aChhc2FyUGF0aCk7XG5cbmlmICghSVNfVkFOSUxMQSkge1xuICAgIGNvbnN0IHNldHRpbmdzID0gUmVuZGVyZXJTZXR0aW5ncy5zdG9yZTtcbiAgICAvLyBSZXBhdGNoIGFmdGVyIGhvc3QgdXBkYXRlcyBvbiBXaW5kb3dzXG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIikge1xuICAgICAgICByZXF1aXJlKFwiLi9wYXRjaFdpbjMyVXBkYXRlclwiKTtcblxuICAgICAgICBpZiAoc2V0dGluZ3Mud2luQ3RybFEpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsQnVpbGQgPSBNZW51LmJ1aWxkRnJvbVRlbXBsYXRlO1xuICAgICAgICAgICAgTWVudS5idWlsZEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZVswXT8ubGFiZWwgPT09IFwiJkZpbGVcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN1Ym1lbnUgfSA9IHRlbXBsYXRlWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJtZW51KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJRdWl0IChIaWRkZW4pXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZWxlcmF0b3JXb3Jrc1doZW5IaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZWxlcmF0b3I6IFwiQ29udHJvbCtRXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IGFwcC5xdWl0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEJ1aWxkLmNhbGwodGhpcywgdGVtcGxhdGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEJyb3dzZXJXaW5kb3cgZXh0ZW5kcyBlbGVjdHJvbi5Ccm93c2VyV2luZG93IHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9uczogQnJvd3NlcldpbmRvd0NvbnN0cnVjdG9yT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnM/LndlYlByZWZlcmVuY2VzPy5wcmVsb2FkICYmIG9wdGlvbnMudGl0bGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IG9wdGlvbnMud2ViUHJlZmVyZW5jZXMucHJlbG9hZDtcbiAgICAgICAgICAgICAgICBvcHRpb25zLndlYlByZWZlcmVuY2VzLnByZWxvYWQgPSBqb2luKF9fZGlybmFtZSwgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJwcmVsb2FkLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BQcmVsb2FkLmpzXCIpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMud2ViUHJlZmVyZW5jZXMuc2FuZGJveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIHdvcmsgYXJvdW5kIGRpc2NvcmQgdW5sb2FkaW5nIHdoZW4gaW4gYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIG9wdGlvbnMud2ViUHJlZmVyZW5jZXMuYmFja2dyb3VuZFRocm90dGxpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mcmFtZWxlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5mcmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiICYmIHNldHRpbmdzLndpbk5hdGl2ZVRpdGxlQmFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmZyYW1lO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy50cmFuc3BhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDAwMDAwMFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG5lZWRzVmlicmFuY3kgPSBwcm9jZXNzLnBsYXRmb3JtID09PSBcImRhcndpblwiICYmIHNldHRpbmdzLm1hY29zVmlicmFuY3lTdHlsZTtcblxuICAgICAgICAgICAgICAgIGlmIChuZWVkc1ZpYnJhbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwMDAwMDBcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1hY29zVmlicmFuY3lTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYW5jeSA9IHNldHRpbmdzLm1hY29zVmlicmFuY3lTdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkRJU0NPUkRfUFJFTE9BRCA9IG9yaWdpbmFsO1xuXG4gICAgICAgICAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaW5pdElwYyh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKEJyb3dzZXJXaW5kb3csIGVsZWN0cm9uLkJyb3dzZXJXaW5kb3cpO1xuICAgIC8vIGVzYnVpbGQgbWF5IHJlbmFtZSBvdXIgQnJvd3NlcldpbmRvdywgd2hpY2ggbGVhZHMgdG8gaXQgYmVpbmcgZXhjbHVkZWRcbiAgICAvLyBmcm9tIGdldEZvY3VzZWRXaW5kb3coKSwgc28gdGhpcyBpcyBuZWNlc3NhcnlcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZGlzY29yZC9lbGVjdHJvbi9ibG9iLzEzLXgteS9saWIvYnJvd3Nlci9hcGkvYnJvd3Nlci13aW5kb3cudHMjTDYwLUw2MlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCcm93c2VyV2luZG93LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJCcm93c2VyV2luZG93XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcblxuICAgIC8vIFJlcGxhY2UgZWxlY3Ryb25zIGV4cG9ydHMgd2l0aCBvdXIgY3VzdG9tIEJyb3dzZXJXaW5kb3dcbiAgICBjb25zdCBlbGVjdHJvblBhdGggPSByZXF1aXJlLnJlc29sdmUoXCJlbGVjdHJvblwiKTtcbiAgICBkZWxldGUgcmVxdWlyZS5jYWNoZVtlbGVjdHJvblBhdGhdIS5leHBvcnRzO1xuICAgIHJlcXVpcmUuY2FjaGVbZWxlY3Ryb25QYXRoXSEuZXhwb3J0cyA9IHtcbiAgICAgICAgLi4uZWxlY3Ryb24sXG4gICAgICAgIEJyb3dzZXJXaW5kb3dcbiAgICB9O1xuXG4gICAgLy8gUGF0Y2ggYXBwU2V0dGluZ3MgdG8gZm9yY2UgZW5hYmxlIGRldnRvb2xzIGFuZCBvcHRpb25hbGx5IGRpc2FibGUgbWluIHNpemVcbiAgICBvbmNlRGVmaW5lZChnbG9iYWwsIFwiYXBwU2V0dGluZ3NcIiwgcyA9PiB7XG4gICAgICAgIHMuc2V0KFwiREFOR0VST1VTX0VOQUJMRV9ERVZUT09MU19PTkxZX0VOQUJMRV9JRl9ZT1VfS05PV19XSEFUX1lPVVJFX0RPSU5HXCIsIHRydWUpO1xuICAgICAgICBpZiAoc2V0dGluZ3MuZGlzYWJsZU1pblNpemUpIHtcbiAgICAgICAgICAgIHMuc2V0KFwiTUlOX1dJRFRIXCIsIDApO1xuICAgICAgICAgICAgcy5zZXQoXCJNSU5fSEVJR0hUXCIsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcy5zZXQoXCJNSU5fV0lEVEhcIiwgOTQwKTtcbiAgICAgICAgICAgIHMuc2V0KFwiTUlOX0hFSUdIVFwiLCA1MDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBwcm9jZXNzLmVudi5EQVRBX0RJUiA9IGpvaW4oYXBwLmdldFBhdGgoXCJ1c2VyRGF0YVwiKSwgXCIuLlwiLCBcIlJpdmVyY29yZFwiKTtcblxuICAgIC8vIE1vbmtleSBwYXRjaCBjb21tYW5kTGluZSB0bzpcbiAgICAvLyAtIGRpc2FibGUgV2lkZ2V0TGF5ZXJpbmc6IEZpeCBEZXZUb29scyBjb250ZXh0IG1lbnVzIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvMzg3OTBcbiAgICAvLyAtIGRpc2FibGUgVXNlRWNvUW9TRm9yQmFja2dyb3VuZFByb2Nlc3M6IFdvcmsgYXJvdW5kIERpc2NvcmQgdW5sb2FkaW5nIHdoZW4gaW4gYmFja2dyb3VuZFxuICAgIGNvbnN0IG9yaWdpbmFsQXBwZW5kID0gYXBwLmNvbW1hbmRMaW5lLmFwcGVuZFN3aXRjaDtcbiAgICBhcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09IFwiZGlzYWJsZS1mZWF0dXJlc1wiKSB7XG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlZEZlYXR1cmVzID0gbmV3IFNldCgoYXJnc1sxXSA/PyBcIlwiKS5zcGxpdChcIixcIikpO1xuICAgICAgICAgICAgZGlzYWJsZWRGZWF0dXJlcy5hZGQoXCJXaWRnZXRMYXllcmluZ1wiKTtcbiAgICAgICAgICAgIGRpc2FibGVkRmVhdHVyZXMuYWRkKFwiVXNlRWNvUW9TRm9yQmFja2dyb3VuZFByb2Nlc3NcIik7XG4gICAgICAgICAgICBhcmdzWzFdICs9IFsuLi5kaXNhYmxlZEZlYXR1cmVzXS5qb2luKFwiLFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxBcHBlbmQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIGRpc2FibGUgcmVuZGVyZXIgYmFja2dyb3VuZGluZyB0byBwcmV2ZW50IHRoZSBhcHAgZnJvbSB1bmxvYWRpbmcgd2hlbiBpbiB0aGUgYmFja2dyb3VuZFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvMjgyMlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvY2hyb21lLWxhdW5jaGVyL2Jsb2IvNWEyN2RkNTc0ZDQ3YTc1ZmVjMGZiNTBmN2I3NzRlYmY4YTk3OTFiYS9kb2NzL2Nocm9tZS1mbGFncy1mb3ItdG9vbHMubWQjdGFzay10aHJvdHRsaW5nXG4gICAgLy8gV29yayBhcm91bmQgZGlzY29yZCB1bmxvYWRpbmcgd2hlbiBpbiBiYWNrZ3JvdW5kXG4gICAgLy8gRGlzY29yZCBhbHNvIHJlY2VudGx5IHN0YXJ0ZWQgYWRkaW5nIHRoZXNlIGZsYWdzIGJ1dCBvbmx5IG9uIHdpbmRvd3MgZm9yIHNvbWUgcmVhc29uIGR1bm5vIHdoeSwgaXQgaGFwcGVucyBvbiBMaW51eCB0b29cbiAgICBhcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoKFwiZGlzYWJsZS1yZW5kZXJlci1iYWNrZ3JvdW5kaW5nXCIpO1xuICAgIGFwcC5jb21tYW5kTGluZS5hcHBlbmRTd2l0Y2goXCJkaXNhYmxlLWJhY2tncm91bmQtdGltZXItdGhyb3R0bGluZ1wiKTtcbiAgICBhcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoKFwiZGlzYWJsZS1iYWNrZ3JvdW5kaW5nLW9jY2x1ZGVkLXdpbmRvd3NcIik7XG59IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKFwiW1JpdmVyY29yZF0gUnVubmluZyBpbiB2YW5pbGxhIG1vZGUuIE5vdCBsb2FkaW5nIFJpdmVyY29yZFwiKTtcbn1cblxuY29uc29sZS5sb2coXCJbUml2ZXJjb3JkXSBMb2FkaW5nIG9yaWdpbmFsIERpc2NvcmQgYXBwLmFzYXJcIik7XG5yZXF1aXJlKHJlcXVpcmUubWFpbiEuZmlsZW5hbWUpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IGFwcCwgcHJvdG9jb2wsIHNlc3Npb24gfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBlbnN1cmVTYWZlUGF0aCB9IGZyb20gXCIuL2lwY01haW5cIjtcbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgSVNfVkFOSUxMQSwgVEhFTUVTX0RJUiB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgaW5zdGFsbEV4dCB9IGZyb20gXCIuL3V0aWxzL2V4dGVuc2lvbnNcIjtcblxuaWYgKElTX1ZFU0tUT1AgfHwgIUlTX1ZBTklMTEEpIHtcbiAgICBhcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIFNvdXJjZSBNYXBzISBNYXliZSB0aGVyZSdzIGEgYmV0dGVyIHdheSBidXQgc2luY2UgdGhlIHJlbmRlcmVyIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIGZyb20gYSBzdHJpbmcgSSBkb24ndCB0aGluayBhbnkgb3RoZXIgZm9ybSBvZiBzb3VyY2VtYXBzIHdvdWxkIHdvcmtcbiAgICAgICAgcHJvdG9jb2wucmVnaXN0ZXJGaWxlUHJvdG9jb2woXCJyaXZlcmNvcmRcIiwgKHsgdXJsOiB1bnNhZmVVcmwgfSwgY2IpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB1bnNhZmVVcmwuc2xpY2UoXCJyaXZlcmNvcmQ6Ly9cIi5sZW5ndGgpO1xuICAgICAgICAgICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCIvdGhlbWVzL1wiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gdXJsLnNsaWNlKFwiL3RoZW1lcy9cIi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVVcmwgPSBlbnN1cmVTYWZlUGF0aChUSEVNRVNfRElSLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzYWZlVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHsgc3RhdHVzQ29kZTogNDAzIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNiKHNhZmVVcmwucmVwbGFjZSgvXFw/dj1cXGQrJC8sIFwiXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHVybCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyZW5kZXJlci5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicml2ZXJjb3JkRGVza3RvcFJlbmRlcmVyLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJwcmVsb2FkLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyaXZlcmNvcmREZXNrdG9wUHJlbG9hZC5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicGF0Y2hlci5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicml2ZXJjb3JkRGVza3RvcE1haW4uanMubWFwXCI6XG4gICAgICAgICAgICAgICAgICAgIGNiKGpvaW4oX19kaXJuYW1lLCB1cmwpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY2IoeyBzdGF0dXNDb2RlOiA0MDMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoUmVuZGVyZXJTZXR0aW5ncy5zdG9yZS5lbmFibGVSZWFjdERldnRvb2xzKVxuICAgICAgICAgICAgICAgIGluc3RhbGxFeHQoXCJmbWthZG1hcGdvZmFkb3BsamJqZmthcGRrb2llbmloaVwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmluZm8oXCJbUml2ZXJjb3JkXSBJbnN0YWxsZWQgUmVhY3QgRGV2ZWxvcGVyIFRvb2xzXCIpKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJbUml2ZXJjb3JkXSBGYWlsZWQgdG8gaW5zdGFsbCBSZWFjdCBEZXZlbG9wZXIgVG9vbHNcIiwgZXJyKSk7XG4gICAgICAgIH0gY2F0Y2ggeyB9XG5cblxuICAgICAgICBjb25zdCBmaW5kSGVhZGVyID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiwgaGVhZGVyTmFtZTogTG93ZXJjYXNlPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKGggPT4gaC50b0xvd2VyQ2FzZSgpID09PSBoZWFkZXJOYW1lKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZW1vdmUgQ1NQXG4gICAgICAgIHR5cGUgUG9saWN5UmVzdWx0ID0gUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xuXG4gICAgICAgIGNvbnN0IHBhcnNlUG9saWN5ID0gKHBvbGljeTogc3RyaW5nKTogUG9saWN5UmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUG9saWN5UmVzdWx0ID0ge307XG4gICAgICAgICAgICBwb2xpY3kuc3BsaXQoXCI7XCIpLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBbZGlyZWN0aXZlS2V5LCAuLi5kaXJlY3RpdmVWYWx1ZV0gPSBkaXJlY3RpdmUudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmVLZXkgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIGRpcmVjdGl2ZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2RpcmVjdGl2ZUtleV0gPSBkaXJlY3RpdmVWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZ5UG9saWN5ID0gKHBvbGljeTogUG9saWN5UmVzdWx0KTogc3RyaW5nID0+XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhwb2xpY3kpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoWywgdmFsdWVzXSkgPT4gdmFsdWVzPy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgLm1hcChkaXJlY3RpdmUgPT4gZGlyZWN0aXZlLmZsYXQoKS5qb2luKFwiIFwiKSlcbiAgICAgICAgICAgICAgICAuam9pbihcIjsgXCIpO1xuXG4gICAgICAgIGNvbnN0IHBhdGNoQ3NwID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZmluZEhlYWRlcihoZWFkZXJzLCBcImNvbnRlbnQtc2VjdXJpdHktcG9saWN5XCIpO1xuXG4gICAgICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NwID0gcGFyc2VQb2xpY3koaGVhZGVyc1toZWFkZXJdWzBdKTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGlyZWN0aXZlIG9mIFtcInN0eWxlLXNyY1wiLCBcImNvbm5lY3Qtc3JjXCIsIFwiaW1nLXNyY1wiLCBcImZvbnQtc3JjXCIsIFwibWVkaWEtc3JjXCIsIFwid29ya2VyLXNyY1wiLCBcInNjcmlwdC1zcmNcIiwgXCJmcmFtZS1zcmNcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY3NwW2RpcmVjdGl2ZV0gPz89IFtdO1xuICAgICAgICAgICAgICAgICAgICBjc3BbZGlyZWN0aXZlXS5wdXNoKFwiKlwiLCBcImJsb2I6XCIsIFwiZGF0YTpcIiwgXCJyaXZlcmNvcmQ6XCIsIFwiJ3Vuc2FmZS1pbmxpbmUnXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIC8vIFRPRE86IFJlc3RyaWN0IHRoaXMgdG8gb25seSBpbXBvcnRlZCBwYWNrYWdlcyB3aXRoIGZpeGVkIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgLy8gLy8gUGVyaGFwcyBhdXRvIGdlbmVyYXRlIHdpdGggZXNidWlsZFxuICAgICAgICAgICAgICAgIC8vIGNzcFtcInNjcmlwdC1zcmNcIl0gPz89IFtdO1xuICAgICAgICAgICAgICAgIC8vIGNzcFtcInNjcmlwdC1zcmNcIl0ucHVzaChcIipcIiwgXCIndW5zYWZlLWV2YWwnXCIsIFwiaHR0cHM6Ly91bnBrZy5jb21cIiwgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tXCIpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnNbaGVhZGVyXSA9IFtzdHJpbmdpZnlQb2xpY3koY3NwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2Vzc2lvbi5kZWZhdWx0U2Vzc2lvbi53ZWJSZXF1ZXN0Lm9uSGVhZGVyc1JlY2VpdmVkKCh7IHJlc3BvbnNlSGVhZGVycywgcmVzb3VyY2VUeXBlIH0sIGNiKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlVHlwZSA9PT0gXCJtYWluRnJhbWVcIilcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2hDc3AocmVzcG9uc2VIZWFkZXJzKTtcblxuICAgICAgICAgICAgICAgIC8vIEZpeCBob3N0cyB0aGF0IGRvbid0IHByb3Blcmx5IHNldCB0aGUgY3NzIGNvbnRlbnQgdHlwZSwgc3VjaCBhc1xuICAgICAgICAgICAgICAgIC8vIHJhdy5naXRodWJ1c2VyY29udGVudC5jb21cbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2VUeXBlID09PSBcInN0eWxlc2hlZXRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBmaW5kSGVhZGVyKHJlc3BvbnNlSGVhZGVycywgXCJjb250ZW50LXR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNbaGVhZGVyXSA9IFtcInRleHQvY3NzXCJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2IoeyBjYW5jZWw6IGZhbHNlLCByZXNwb25zZUhlYWRlcnMgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFzc2lnbiBhIG5vb3AgdG8gb25IZWFkZXJzUmVjZWl2ZWQgdG8gcHJldmVudCBvdGhlciBtb2RzIGZyb20gYWRkaW5nIHRoZWlyIG93biBpbmNvbXBhdGlibGUgb25lcy5cbiAgICAgICAgLy8gRm9yIGluc3RhbmNlLCBPcGVuQXNhciBhZGRzIHRoZWlyIG93biB0aGF0IGRvZXNuJ3QgZml4IGNvbnRlbnQtdHlwZSBmb3Igc3R5bGVzaGVldHMgd2hpY2ggbWFrZXMgaXRcbiAgICAgICAgLy8gaW1wb3NzaWJsZSB0byBsb2FkIGNzcyBmcm9tIGdpdGh1YiByYXcgZGVzcGl0ZSBvdXIgZml4IGFib3ZlXG4gICAgICAgIHNlc3Npb24uZGVmYXVsdFNlc3Npb24ud2ViUmVxdWVzdC5vbkhlYWRlcnNSZWNlaXZlZCA9ICgpID0+IHsgfTtcbiAgICB9KTtcbn1cblxuaWYgKElTX0RJU0NPUkRfREVTS1RPUCkge1xuICAgIHJlcXVpcmUoXCIuL3BhdGNoZXJcIik7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IHsgc2Vzc2lvbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgdW56aXAgfSBmcm9tIFwiZmZsYXRlXCI7XG5pbXBvcnQgeyBjb25zdGFudHMgYXMgZnNDb25zdGFudHMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGFjY2VzcywgbWtkaXIsIHJtLCB3cml0ZUZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBEQVRBX0RJUiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY3J4VG9aaXAgfSBmcm9tIFwiLi9jcnhUb1ppcFwiO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIi4vc2ltcGxlR2V0XCI7XG5cbmNvbnN0IGV4dGVuc2lvbkNhY2hlRGlyID0gam9pbihEQVRBX0RJUiwgXCJFeHRlbnNpb25DYWNoZVwiKTtcblxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdChkYXRhOiBCdWZmZXIsIG91dERpcjogc3RyaW5nKSB7XG4gICAgYXdhaXQgbWtkaXIob3V0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB1bnppcChkYXRhLCAoZXJyLCBmaWxlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHZvaWQgcmVqZWN0KGVycik7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhmaWxlcykubWFwKGFzeW5jIGYgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpZ25hdHVyZSBzdHVmZlxuICAgICAgICAgICAgICAgIC8vICdDYW5ub3QgbG9hZCBleHRlbnNpb24gd2l0aCBmaWxlIG9yIGRpcmVjdG9yeSBuYW1lXG4gICAgICAgICAgICAgICAgLy8gX21ldGFkYXRhLiBGaWxlbmFtZXMgc3RhcnRpbmcgd2l0aCBcIl9cIiBhcmUgcmVzZXJ2ZWQgZm9yIHVzZSBieSB0aGUgc3lzdGVtLic7XG4gICAgICAgICAgICAgICAgaWYgKGYuc3RhcnRzV2l0aChcIl9tZXRhZGF0YS9cIikpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmIChmLmVuZHNXaXRoKFwiL1wiKSkgcmV0dXJuIHZvaWQgbWtkaXIoam9pbihvdXREaXIsIGYpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhFbGVtZW50cyA9IGYuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYXRoRWxlbWVudHMucG9wKCkhO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yaWVzID0gcGF0aEVsZW1lbnRzLmpvaW4oXCIvXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpciA9IGpvaW4ob3V0RGlyLCBkaXJlY3Rvcmllcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWtkaXIoZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZUZpbGUoam9pbihkaXIsIG5hbWUpLCBmaWxlc1tmXSk7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKCkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJtKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnN0YWxsRXh0KGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBleHREaXIgPSBqb2luKGV4dGVuc2lvbkNhY2hlRGlyLCBgJHtpZH1gKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFjY2VzcyhleHREaXIsIGZzQ29uc3RhbnRzLkZfT0spO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCB1cmwgPSBpZCA9PT0gXCJmbWthZG1hcGdvZmFkb3BsamJqZmthcGRrb2llbmloaVwiXG4gICAgICAgICAgICAvLyBSZWFjdCBEZXZ0b29scyB2NC4yNVxuICAgICAgICAgICAgLy8gdjQuMjcgaXMgYnJva2VuIGluIEVsZWN0cm9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8yNTg0M1xuICAgICAgICAgICAgLy8gVW5mb3J0dW5hdGVseSwgR29vZ2xlIGRvZXMgbm90IHNlcnZlIG9sZCB2ZXJzaW9ucywgc28gdGhpcyBpcyB0aGUgb25seSB3YXlcbiAgICAgICAgICAgID8gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vVmVuZGljYXRlZC9yYW5kb20tZmlsZXMvZjZmNTUwZTRjNThhYzVmMjAxMjA5NWExMzA0MDZjMmFiMjViOTg0ZC9mbWthZG1hcGdvZmFkb3BsamJqZmthcGRrb2llbmloaS56aXBcIlxuICAgICAgICAgICAgOiBgaHR0cHM6Ly9jbGllbnRzMi5nb29nbGUuY29tL3NlcnZpY2UvdXBkYXRlMi9jcng/cmVzcG9uc2U9cmVkaXJlY3QmYWNjZXB0Zm9ybWF0PWNyeDIsY3J4MyZ4PWlkJTNEJHtpZH0lMjZ1YyZwcm9kdmVyc2lvbj0zMmA7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IGF3YWl0IGdldCh1cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIlVzZXItQWdlbnRcIjogXCJSaXZlcmNvcmQgKGh0dHBzOi8vZ2l0aHViLmNvbS9SaXZlcmNvcmQvUml2ZXJjb3JkKVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBleHRyYWN0KGNyeFRvWmlwKGJ1ZiksIGV4dERpcikuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfVxuXG4gICAgc2Vzc2lvbi5kZWZhdWx0U2Vzc2lvbi5sb2FkRXh0ZW5zaW9uKGV4dERpcik7XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ21vZHVsZSc7XG52YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoJy8nKTtcbi8vIERFRkxBVEUgaXMgYSBjb21wbGV4IGZvcm1hdDsgdG8gcmVhZCB0aGlzIGNvZGUsIHlvdSBzaG91bGQgcHJvYmFibHkgY2hlY2sgdGhlIFJGQyBmaXJzdDpcbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMxOTUxXG4vLyBZb3UgbWF5IGFsc28gd2lzaCB0byB0YWtlIGEgbG9vayBhdCB0aGUgZ3VpZGUgSSBtYWRlIGFib3V0IHRoaXMgcHJvZ3JhbTpcbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzEwMWFycm93ei8yNTNmMzFlYjVhYmMzZDkyNzVhYjk0MzAwM2ZmZWNhZFxuLy8gU29tZSBvZiB0aGUgZm9sbG93aW5nIGNvZGUgaXMgc2ltaWxhciB0byB0aGF0IG9mIFVaSVAuanM6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGhvdG9wZWEvVVpJUC5qc1xuLy8gSG93ZXZlciwgdGhlIHZhc3QgbWFqb3JpdHkgb2YgdGhlIGNvZGViYXNlIGhhcyBkaXZlcmdlZCBmcm9tIFVaSVAuanMgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UgYW5kIHJlZHVjZSBidW5kbGUgc2l6ZS5cbi8vIFNvbWV0aW1lcyAwIHdpbGwgYXBwZWFyIHdoZXJlIC0xIHdvdWxkIGJlIG1vcmUgYXBwcm9wcmlhdGUuIFRoaXMgaXMgYmVjYXVzZSB1c2luZyBhIHVpbnRcbi8vIGlzIGJldHRlciBmb3IgbWVtb3J5IGluIG1vc3QgZW5naW5lcyAoSSAqdGhpbmsqKS5cbi8vIE1lZGlvY3JlIHNoaW1cbnZhciBXb3JrZXI7XG52YXIgd29ya2VyQWRkID0gXCI7dmFyIF9fdz1yZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpO19fdy5wYXJlbnRQb3J0Lm9uKCdtZXNzYWdlJyxmdW5jdGlvbihtKXtvbm1lc3NhZ2Uoe2RhdGE6bX0pfSkscG9zdE1lc3NhZ2U9ZnVuY3Rpb24obSx0KXtfX3cucGFyZW50UG9ydC5wb3N0TWVzc2FnZShtLHQpfSxjbG9zZT1wcm9jZXNzLmV4aXQ7c2VsZj1nbG9iYWxcIjtcbnRyeSB7XG4gICAgV29ya2VyID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKS5Xb3JrZXI7XG59XG5jYXRjaCAoZSkge1xufVxudmFyIHdrID0gV29ya2VyID8gZnVuY3Rpb24gKGMsIF8sIG1zZywgdHJhbnNmZXIsIGNiKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB2YXIgdyA9IG5ldyBXb3JrZXIoYyArIHdvcmtlckFkZCwgeyBldmFsOiB0cnVlIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gY2IoZSwgbnVsbCk7IH0pXG4gICAgICAgIC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChtKSB7IHJldHVybiBjYihudWxsLCBtKTsgfSlcbiAgICAgICAgLm9uKCdleGl0JywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgaWYgKGMgJiYgIWRvbmUpXG4gICAgICAgICAgICBjYihuZXcgRXJyb3IoJ2V4aXRlZCB3aXRoIGNvZGUgJyArIGMpLCBudWxsKTtcbiAgICB9KTtcbiAgICB3LnBvc3RNZXNzYWdlKG1zZywgdHJhbnNmZXIpO1xuICAgIHcudGVybWluYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFdvcmtlci5wcm90b3R5cGUudGVybWluYXRlLmNhbGwodyk7XG4gICAgfTtcbiAgICByZXR1cm4gdztcbn0gOiBmdW5jdGlvbiAoXywgX18sIF9fXywgX19fXywgY2IpIHtcbiAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2IobmV3IEVycm9yKCdhc3luYyBvcGVyYXRpb25zIHVuc3VwcG9ydGVkIC0gdXBkYXRlIHRvIE5vZGUgMTIrIChvciBOb2RlIDEwLTExIHdpdGggdGhlIC0tZXhwZXJpbWVudGFsLXdvcmtlciBDTEkgZmxhZyknKSwgbnVsbCk7IH0pO1xuICAgIHZhciBOT1AgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGVybWluYXRlOiBOT1AsXG4gICAgICAgIHBvc3RNZXNzYWdlOiBOT1BcbiAgICB9O1xufTtcblxuLy8gYWxpYXNlcyBmb3Igc2hvcnRlciBjb21wcmVzc2VkIGNvZGUgKG1vc3QgbWluaWZlcnMgZG9uJ3QgZG8gdGhpcylcbnZhciB1OCA9IFVpbnQ4QXJyYXksIHUxNiA9IFVpbnQxNkFycmF5LCB1MzIgPSBVaW50MzJBcnJheTtcbi8vIGZpeGVkIGxlbmd0aCBleHRyYSBiaXRzXG52YXIgZmxlYiA9IG5ldyB1OChbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMywgMywgMywgMywgNCwgNCwgNCwgNCwgNSwgNSwgNSwgNSwgMCwgLyogdW51c2VkICovIDAsIDAsIC8qIGltcG9zc2libGUgKi8gMF0pO1xuLy8gZml4ZWQgZGlzdGFuY2UgZXh0cmEgYml0c1xuLy8gc2VlIGZsZWIgbm90ZVxudmFyIGZkZWIgPSBuZXcgdTgoWzAsIDAsIDAsIDAsIDEsIDEsIDIsIDIsIDMsIDMsIDQsIDQsIDUsIDUsIDYsIDYsIDcsIDcsIDgsIDgsIDksIDksIDEwLCAxMCwgMTEsIDExLCAxMiwgMTIsIDEzLCAxMywgLyogdW51c2VkICovIDAsIDBdKTtcbi8vIGNvZGUgbGVuZ3RoIGluZGV4IG1hcFxudmFyIGNsaW0gPSBuZXcgdTgoWzE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVdKTtcbi8vIGdldCBiYXNlLCByZXZlcnNlIGluZGV4IG1hcCBmcm9tIGV4dHJhIGJpdHNcbnZhciBmcmViID0gZnVuY3Rpb24gKGViLCBzdGFydCkge1xuICAgIHZhciBiID0gbmV3IHUxNigzMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMTsgKytpKSB7XG4gICAgICAgIGJbaV0gPSBzdGFydCArPSAxIDw8IGViW2kgLSAxXTtcbiAgICB9XG4gICAgLy8gbnVtYmVycyBoZXJlIGFyZSBhdCBtYXggMTggYml0c1xuICAgIHZhciByID0gbmV3IHUzMihiWzMwXSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAzMDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBiW2ldOyBqIDwgYltpICsgMV07ICsraikge1xuICAgICAgICAgICAgcltqXSA9ICgoaiAtIGJbaV0pIDw8IDUpIHwgaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2IsIHJdO1xufTtcbnZhciBfYSA9IGZyZWIoZmxlYiwgMiksIGZsID0gX2FbMF0sIHJldmZsID0gX2FbMV07XG4vLyB3ZSBjYW4gaWdub3JlIHRoZSBmYWN0IHRoYXQgdGhlIG90aGVyIG51bWJlcnMgYXJlIHdyb25nOyB0aGV5IG5ldmVyIGhhcHBlbiBhbnl3YXlcbmZsWzI4XSA9IDI1OCwgcmV2ZmxbMjU4XSA9IDI4O1xudmFyIF9iID0gZnJlYihmZGViLCAwKSwgZmQgPSBfYlswXSwgcmV2ZmQgPSBfYlsxXTtcbi8vIG1hcCBvZiB2YWx1ZSB0byByZXZlcnNlIChhc3N1bWluZyAxNiBiaXRzKVxudmFyIHJldiA9IG5ldyB1MTYoMzI3NjgpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAzMjc2ODsgKytpKSB7XG4gICAgLy8gcmV2ZXJzZSB0YWJsZSBhbGdvcml0aG0gZnJvbSBTT1xuICAgIHZhciB4ID0gKChpICYgMHhBQUFBKSA+Pj4gMSkgfCAoKGkgJiAweDU1NTUpIDw8IDEpO1xuICAgIHggPSAoKHggJiAweENDQ0MpID4+PiAyKSB8ICgoeCAmIDB4MzMzMykgPDwgMik7XG4gICAgeCA9ICgoeCAmIDB4RjBGMCkgPj4+IDQpIHwgKCh4ICYgMHgwRjBGKSA8PCA0KTtcbiAgICByZXZbaV0gPSAoKCh4ICYgMHhGRjAwKSA+Pj4gOCkgfCAoKHggJiAweDAwRkYpIDw8IDgpKSA+Pj4gMTtcbn1cbi8vIGNyZWF0ZSBodWZmbWFuIHRyZWUgZnJvbSB1OCBcIm1hcFwiOiBpbmRleCAtPiBjb2RlIGxlbmd0aCBmb3IgY29kZSBpbmRleFxuLy8gbWIgKG1heCBiaXRzKSBtdXN0IGJlIGF0IG1vc3QgMTVcbi8vIFRPRE86IG9wdGltaXplL3NwbGl0IHVwP1xudmFyIGhNYXAgPSAoZnVuY3Rpb24gKGNkLCBtYiwgcikge1xuICAgIHZhciBzID0gY2QubGVuZ3RoO1xuICAgIC8vIGluZGV4XG4gICAgdmFyIGkgPSAwO1xuICAgIC8vIHUxNiBcIm1hcFwiOiBpbmRleCAtPiAjIG9mIGNvZGVzIHdpdGggYml0IGxlbmd0aCA9IGluZGV4XG4gICAgdmFyIGwgPSBuZXcgdTE2KG1iKTtcbiAgICAvLyBsZW5ndGggb2YgY2QgbXVzdCBiZSAyODggKHRvdGFsICMgb2YgY29kZXMpXG4gICAgZm9yICg7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgaWYgKGNkW2ldKVxuICAgICAgICAgICAgKytsW2NkW2ldIC0gMV07XG4gICAgfVxuICAgIC8vIHUxNiBcIm1hcFwiOiBpbmRleCAtPiBtaW5pbXVtIGNvZGUgZm9yIGJpdCBsZW5ndGggPSBpbmRleFxuICAgIHZhciBsZSA9IG5ldyB1MTYobWIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtYjsgKytpKSB7XG4gICAgICAgIGxlW2ldID0gKGxlW2kgLSAxXSArIGxbaSAtIDFdKSA8PCAxO1xuICAgIH1cbiAgICB2YXIgY287XG4gICAgaWYgKHIpIHtcbiAgICAgICAgLy8gdTE2IFwibWFwXCI6IGluZGV4IC0+IG51bWJlciBvZiBhY3R1YWwgYml0cywgc3ltYm9sIGZvciBjb2RlXG4gICAgICAgIGNvID0gbmV3IHUxNigxIDw8IG1iKTtcbiAgICAgICAgLy8gYml0cyB0byByZW1vdmUgZm9yIHJldmVyc2VyXG4gICAgICAgIHZhciBydmIgPSAxNSAtIG1iO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgMCBsZW5ndGhzXG4gICAgICAgICAgICBpZiAoY2RbaV0pIHtcbiAgICAgICAgICAgICAgICAvLyBudW0gZW5jb2RpbmcgYm90aCBzeW1ib2wgYW5kIGJpdHMgcmVhZFxuICAgICAgICAgICAgICAgIHZhciBzdiA9IChpIDw8IDQpIHwgY2RbaV07XG4gICAgICAgICAgICAgICAgLy8gZnJlZSBiaXRzXG4gICAgICAgICAgICAgICAgdmFyIHJfMSA9IG1iIC0gY2RbaV07XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgdmFsdWVcbiAgICAgICAgICAgICAgICB2YXIgdiA9IGxlW2NkW2ldIC0gMV0rKyA8PCByXzE7XG4gICAgICAgICAgICAgICAgLy8gbSBpcyBlbmQgdmFsdWVcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBtID0gdiB8ICgoMSA8PCByXzEpIC0gMSk7IHYgPD0gbTsgKyt2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZXJ5IDE2IGJpdCB2YWx1ZSBzdGFydGluZyB3aXRoIHRoZSBjb2RlIHlpZWxkcyB0aGUgc2FtZSByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgY29bcmV2W3ZdID4+PiBydmJdID0gc3Y7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjbyA9IG5ldyB1MTYocyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjZFtpXSkge1xuICAgICAgICAgICAgICAgIGNvW2ldID0gcmV2W2xlW2NkW2ldIC0gMV0rK10gPj4+ICgxNSAtIGNkW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY287XG59KTtcbi8vIGZpeGVkIGxlbmd0aCB0cmVlXG52YXIgZmx0ID0gbmV3IHU4KDI4OCk7XG5mb3IgKHZhciBpID0gMDsgaSA8IDE0NDsgKytpKVxuICAgIGZsdFtpXSA9IDg7XG5mb3IgKHZhciBpID0gMTQ0OyBpIDwgMjU2OyArK2kpXG4gICAgZmx0W2ldID0gOTtcbmZvciAodmFyIGkgPSAyNTY7IGkgPCAyODA7ICsraSlcbiAgICBmbHRbaV0gPSA3O1xuZm9yICh2YXIgaSA9IDI4MDsgaSA8IDI4ODsgKytpKVxuICAgIGZsdFtpXSA9IDg7XG4vLyBmaXhlZCBkaXN0YW5jZSB0cmVlXG52YXIgZmR0ID0gbmV3IHU4KDMyKTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMzI7ICsraSlcbiAgICBmZHRbaV0gPSA1O1xuLy8gZml4ZWQgbGVuZ3RoIG1hcFxudmFyIGZsbSA9IC8qI19fUFVSRV9fKi8gaE1hcChmbHQsIDksIDApLCBmbHJtID0gLyojX19QVVJFX18qLyBoTWFwKGZsdCwgOSwgMSk7XG4vLyBmaXhlZCBkaXN0YW5jZSBtYXBcbnZhciBmZG0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmR0LCA1LCAwKSwgZmRybSA9IC8qI19fUFVSRV9fKi8gaE1hcChmZHQsIDUsIDEpO1xuLy8gZmluZCBtYXggb2YgYXJyYXlcbnZhciBtYXggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBtID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGFbaV0gPiBtKVxuICAgICAgICAgICAgbSA9IGFbaV07XG4gICAgfVxuICAgIHJldHVybiBtO1xufTtcbi8vIHJlYWQgZCwgc3RhcnRpbmcgYXQgYml0IHAgYW5kIG1hc2sgd2l0aCBtXG52YXIgYml0cyA9IGZ1bmN0aW9uIChkLCBwLCBtKSB7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICByZXR1cm4gKChkW29dIHwgKGRbbyArIDFdIDw8IDgpKSA+PiAocCAmIDcpKSAmIG07XG59O1xuLy8gcmVhZCBkLCBzdGFydGluZyBhdCBiaXQgcCBjb250aW51aW5nIGZvciBhdCBsZWFzdCAxNiBiaXRzXG52YXIgYml0czE2ID0gZnVuY3Rpb24gKGQsIHApIHtcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIHJldHVybiAoKGRbb10gfCAoZFtvICsgMV0gPDwgOCkgfCAoZFtvICsgMl0gPDwgMTYpKSA+PiAocCAmIDcpKTtcbn07XG4vLyBnZXQgZW5kIG9mIGJ5dGVcbnZhciBzaGZ0ID0gZnVuY3Rpb24gKHApIHsgcmV0dXJuICgocCArIDcpIC8gOCkgfCAwOyB9O1xuLy8gdHlwZWQgYXJyYXkgc2xpY2UgLSBhbGxvd3MgZ2FyYmFnZSBjb2xsZWN0b3IgdG8gZnJlZSBvcmlnaW5hbCByZWZlcmVuY2UsXG4vLyB3aGlsZSBiZWluZyBtb3JlIGNvbXBhdGlibGUgdGhhbiAuc2xpY2VcbnZhciBzbGMgPSBmdW5jdGlvbiAodiwgcywgZSkge1xuICAgIGlmIChzID09IG51bGwgfHwgcyA8IDApXG4gICAgICAgIHMgPSAwO1xuICAgIGlmIChlID09IG51bGwgfHwgZSA+IHYubGVuZ3RoKVxuICAgICAgICBlID0gdi5sZW5ndGg7XG4gICAgLy8gY2FuJ3QgdXNlIC5jb25zdHJ1Y3RvciBpbiBjYXNlIHVzZXItc3VwcGxpZWRcbiAgICB2YXIgbiA9IG5ldyAodi5CWVRFU19QRVJfRUxFTUVOVCA9PSAyID8gdTE2IDogdi5CWVRFU19QRVJfRUxFTUVOVCA9PSA0ID8gdTMyIDogdTgpKGUgLSBzKTtcbiAgICBuLnNldCh2LnN1YmFycmF5KHMsIGUpKTtcbiAgICByZXR1cm4gbjtcbn07XG4vKipcbiAqIENvZGVzIGZvciBlcnJvcnMgZ2VuZXJhdGVkIHdpdGhpbiB0aGlzIGxpYnJhcnlcbiAqL1xuZXhwb3J0IHZhciBGbGF0ZUVycm9yQ29kZSA9IHtcbiAgICBVbmV4cGVjdGVkRU9GOiAwLFxuICAgIEludmFsaWRCbG9ja1R5cGU6IDEsXG4gICAgSW52YWxpZExlbmd0aExpdGVyYWw6IDIsXG4gICAgSW52YWxpZERpc3RhbmNlOiAzLFxuICAgIFN0cmVhbUZpbmlzaGVkOiA0LFxuICAgIE5vU3RyZWFtSGFuZGxlcjogNSxcbiAgICBJbnZhbGlkSGVhZGVyOiA2LFxuICAgIE5vQ2FsbGJhY2s6IDcsXG4gICAgSW52YWxpZFVURjg6IDgsXG4gICAgRXh0cmFGaWVsZFRvb0xvbmc6IDksXG4gICAgSW52YWxpZERhdGU6IDEwLFxuICAgIEZpbGVuYW1lVG9vTG9uZzogMTEsXG4gICAgU3RyZWFtRmluaXNoaW5nOiAxMixcbiAgICBJbnZhbGlkWmlwRGF0YTogMTMsXG4gICAgVW5rbm93bkNvbXByZXNzaW9uTWV0aG9kOiAxNFxufTtcbi8vIGVycm9yIGNvZGVzXG52YXIgZWMgPSBbXG4gICAgJ3VuZXhwZWN0ZWQgRU9GJyxcbiAgICAnaW52YWxpZCBibG9jayB0eXBlJyxcbiAgICAnaW52YWxpZCBsZW5ndGgvbGl0ZXJhbCcsXG4gICAgJ2ludmFsaWQgZGlzdGFuY2UnLFxuICAgICdzdHJlYW0gZmluaXNoZWQnLFxuICAgICdubyBzdHJlYW0gaGFuZGxlcicsXG4gICAgLFxuICAgICdubyBjYWxsYmFjaycsXG4gICAgJ2ludmFsaWQgVVRGLTggZGF0YScsXG4gICAgJ2V4dHJhIGZpZWxkIHRvbyBsb25nJyxcbiAgICAnZGF0ZSBub3QgaW4gcmFuZ2UgMTk4MC0yMDk5JyxcbiAgICAnZmlsZW5hbWUgdG9vIGxvbmcnLFxuICAgICdzdHJlYW0gZmluaXNoaW5nJyxcbiAgICAnaW52YWxpZCB6aXAgZGF0YSdcbiAgICAvLyBkZXRlcm1pbmVkIGJ5IHVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXG5dO1xuO1xudmFyIGVyciA9IGZ1bmN0aW9uIChpbmQsIG1zZywgbnQpIHtcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtc2cgfHwgZWNbaW5kXSk7XG4gICAgZS5jb2RlID0gaW5kO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSlcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZSwgZXJyKTtcbiAgICBpZiAoIW50KVxuICAgICAgICB0aHJvdyBlO1xuICAgIHJldHVybiBlO1xufTtcbi8vIGV4cGFuZHMgcmF3IERFRkxBVEUgZGF0YVxudmFyIGluZmx0ID0gZnVuY3Rpb24gKGRhdCwgYnVmLCBzdCkge1xuICAgIC8vIHNvdXJjZSBsZW5ndGhcbiAgICB2YXIgc2wgPSBkYXQubGVuZ3RoO1xuICAgIGlmICghc2wgfHwgKHN0ICYmIHN0LmYgJiYgIXN0LmwpKVxuICAgICAgICByZXR1cm4gYnVmIHx8IG5ldyB1OCgwKTtcbiAgICAvLyBoYXZlIHRvIGVzdGltYXRlIHNpemVcbiAgICB2YXIgbm9CdWYgPSAhYnVmIHx8IHN0O1xuICAgIC8vIG5vIHN0YXRlXG4gICAgdmFyIG5vU3QgPSAhc3QgfHwgc3QuaTtcbiAgICBpZiAoIXN0KVxuICAgICAgICBzdCA9IHt9O1xuICAgIC8vIEFzc3VtZXMgcm91Z2hseSAzMyUgY29tcHJlc3Npb24gcmF0aW8gYXZlcmFnZVxuICAgIGlmICghYnVmKVxuICAgICAgICBidWYgPSBuZXcgdTgoc2wgKiAzKTtcbiAgICAvLyBlbnN1cmUgYnVmZmVyIGNhbiBmaXQgYXQgbGVhc3QgbCBlbGVtZW50c1xuICAgIHZhciBjYnVmID0gZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgdmFyIGJsID0gYnVmLmxlbmd0aDtcbiAgICAgICAgLy8gbmVlZCB0byBpbmNyZWFzZSBzaXplIHRvIGZpdFxuICAgICAgICBpZiAobCA+IGJsKSB7XG4gICAgICAgICAgICAvLyBEb3VibGUgb3Igc2V0IHRvIG5lY2Vzc2FyeSwgd2hpY2hldmVyIGlzIGdyZWF0ZXJcbiAgICAgICAgICAgIHZhciBuYnVmID0gbmV3IHU4KE1hdGgubWF4KGJsICogMiwgbCkpO1xuICAgICAgICAgICAgbmJ1Zi5zZXQoYnVmKTtcbiAgICAgICAgICAgIGJ1ZiA9IG5idWY7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vICBsYXN0IGNodW5rICAgICAgICAgYml0cG9zICAgICAgICAgICBieXRlc1xuICAgIHZhciBmaW5hbCA9IHN0LmYgfHwgMCwgcG9zID0gc3QucCB8fCAwLCBidCA9IHN0LmIgfHwgMCwgbG0gPSBzdC5sLCBkbSA9IHN0LmQsIGxidCA9IHN0Lm0sIGRidCA9IHN0Lm47XG4gICAgLy8gdG90YWwgYml0c1xuICAgIHZhciB0YnRzID0gc2wgKiA4O1xuICAgIGRvIHtcbiAgICAgICAgaWYgKCFsbSkge1xuICAgICAgICAgICAgLy8gQkZJTkFMIC0gdGhpcyBpcyBvbmx5IDEgd2hlbiBsYXN0IGNodW5rIGlzIG5leHRcbiAgICAgICAgICAgIGZpbmFsID0gYml0cyhkYXQsIHBvcywgMSk7XG4gICAgICAgICAgICAvLyB0eXBlOiAwID0gbm8gY29tcHJlc3Npb24sIDEgPSBmaXhlZCBodWZmbWFuLCAyID0gZHluYW1pYyBodWZmbWFuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGJpdHMoZGF0LCBwb3MgKyAxLCAzKTtcbiAgICAgICAgICAgIHBvcyArPSAzO1xuICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgLy8gZ28gdG8gZW5kIG9mIGJ5dGUgYm91bmRhcnlcbiAgICAgICAgICAgICAgICB2YXIgcyA9IHNoZnQocG9zKSArIDQsIGwgPSBkYXRbcyAtIDRdIHwgKGRhdFtzIC0gM10gPDwgOCksIHQgPSBzICsgbDtcbiAgICAgICAgICAgICAgICBpZiAodCA+IHNsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHNpemVcbiAgICAgICAgICAgICAgICBpZiAobm9CdWYpXG4gICAgICAgICAgICAgICAgICAgIGNidWYoYnQgKyBsKTtcbiAgICAgICAgICAgICAgICAvLyBDb3B5IG92ZXIgdW5jb21wcmVzc2VkIGRhdGFcbiAgICAgICAgICAgICAgICBidWYuc2V0KGRhdC5zdWJhcnJheShzLCB0KSwgYnQpO1xuICAgICAgICAgICAgICAgIC8vIEdldCBuZXcgYml0cG9zLCB1cGRhdGUgYnl0ZSBjb3VudFxuICAgICAgICAgICAgICAgIHN0LmIgPSBidCArPSBsLCBzdC5wID0gcG9zID0gdCAqIDgsIHN0LmYgPSBmaW5hbDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMSlcbiAgICAgICAgICAgICAgICBsbSA9IGZscm0sIGRtID0gZmRybSwgbGJ0ID0gOSwgZGJ0ID0gNTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgIC8vICBsaXRlcmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aHNcbiAgICAgICAgICAgICAgICB2YXIgaExpdCA9IGJpdHMoZGF0LCBwb3MsIDMxKSArIDI1NywgaGNMZW4gPSBiaXRzKGRhdCwgcG9zICsgMTAsIDE1KSArIDQ7XG4gICAgICAgICAgICAgICAgdmFyIHRsID0gaExpdCArIGJpdHMoZGF0LCBwb3MgKyA1LCAzMSkgKyAxO1xuICAgICAgICAgICAgICAgIHBvcyArPSAxNDtcbiAgICAgICAgICAgICAgICAvLyBsZW5ndGgrZGlzdGFuY2UgdHJlZVxuICAgICAgICAgICAgICAgIHZhciBsZHQgPSBuZXcgdTgodGwpO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RoIHRyZWVcbiAgICAgICAgICAgICAgICB2YXIgY2x0ID0gbmV3IHU4KDE5KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhjTGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGluZGV4IG1hcCB0byBnZXQgcmVhbCBjb2RlXG4gICAgICAgICAgICAgICAgICAgIGNsdFtjbGltW2ldXSA9IGJpdHMoZGF0LCBwb3MgKyBpICogMywgNyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyArPSBoY0xlbiAqIDM7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGhzIGJpdHNcbiAgICAgICAgICAgICAgICB2YXIgY2xiID0gbWF4KGNsdCksIGNsYm1zayA9ICgxIDw8IGNsYikgLSAxO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RocyBtYXBcbiAgICAgICAgICAgICAgICB2YXIgY2xtID0gaE1hcChjbHQsIGNsYiwgMSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0bDspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBjbG1bYml0cyhkYXQsIHBvcywgY2xibXNrKV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGJpdHMgcmVhZFxuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gciAmIDE1O1xuICAgICAgICAgICAgICAgICAgICAvLyBzeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSByID4+PiA0O1xuICAgICAgICAgICAgICAgICAgICAvLyBjb2RlIGxlbmd0aCB0byBjb3B5XG4gICAgICAgICAgICAgICAgICAgIGlmIChzIDwgMTYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxkdFtpKytdID0gcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICBjb3B5ICAgY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gMCwgbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PSAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMyArIGJpdHMoZGF0LCBwb3MsIDMpLCBwb3MgKz0gMiwgYyA9IGxkdFtpIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzID09IDE3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAzICsgYml0cyhkYXQsIHBvcywgNyksIHBvcyArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocyA9PSAxOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMTEgKyBiaXRzKGRhdCwgcG9zLCAxMjcpLCBwb3MgKz0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChuLS0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGR0W2krK10gPSBjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgIGxlbmd0aCB0cmVlICAgICAgICAgICAgICAgICBkaXN0YW5jZSB0cmVlXG4gICAgICAgICAgICAgICAgdmFyIGx0ID0gbGR0LnN1YmFycmF5KDAsIGhMaXQpLCBkdCA9IGxkdC5zdWJhcnJheShoTGl0KTtcbiAgICAgICAgICAgICAgICAvLyBtYXggbGVuZ3RoIGJpdHNcbiAgICAgICAgICAgICAgICBsYnQgPSBtYXgobHQpO1xuICAgICAgICAgICAgICAgIC8vIG1heCBkaXN0IGJpdHNcbiAgICAgICAgICAgICAgICBkYnQgPSBtYXgoZHQpO1xuICAgICAgICAgICAgICAgIGxtID0gaE1hcChsdCwgbGJ0LCAxKTtcbiAgICAgICAgICAgICAgICBkbSA9IGhNYXAoZHQsIGRidCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZXJyKDEpO1xuICAgICAgICAgICAgaWYgKHBvcyA+IHRidHMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9TdClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgYnVmZmVyIGNhbiBob2xkIHRoaXMgKyB0aGUgbGFyZ2VzdCBwb3NzaWJsZSBhZGRpdGlvblxuICAgICAgICAvLyBNYXhpbXVtIGNodW5rIHNpemUgKHByYWN0aWNhbGx5LCB0aGVvcmV0aWNhbGx5IGluZmluaXRlKSBpcyAyXjE3O1xuICAgICAgICBpZiAobm9CdWYpXG4gICAgICAgICAgICBjYnVmKGJ0ICsgMTMxMDcyKTtcbiAgICAgICAgdmFyIGxtcyA9ICgxIDw8IGxidCkgLSAxLCBkbXMgPSAoMSA8PCBkYnQpIC0gMTtcbiAgICAgICAgdmFyIGxwb3MgPSBwb3M7XG4gICAgICAgIGZvciAoOzsgbHBvcyA9IHBvcykge1xuICAgICAgICAgICAgLy8gYml0cyByZWFkLCBjb2RlXG4gICAgICAgICAgICB2YXIgYyA9IGxtW2JpdHMxNihkYXQsIHBvcykgJiBsbXNdLCBzeW0gPSBjID4+PiA0O1xuICAgICAgICAgICAgcG9zICs9IGMgJiAxNTtcbiAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYylcbiAgICAgICAgICAgICAgICBlcnIoMik7XG4gICAgICAgICAgICBpZiAoc3ltIDwgMjU2KVxuICAgICAgICAgICAgICAgIGJ1ZltidCsrXSA9IHN5bTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHN5bSA9PSAyNTYpIHtcbiAgICAgICAgICAgICAgICBscG9zID0gcG9zLCBsbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYWRkID0gc3ltIC0gMjU0O1xuICAgICAgICAgICAgICAgIC8vIG5vIGV4dHJhIGJpdHMgbmVlZGVkIGlmIGxlc3NcbiAgICAgICAgICAgICAgICBpZiAoc3ltID4gMjY0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gc3ltIC0gMjU3LCBiID0gZmxlYltpXTtcbiAgICAgICAgICAgICAgICAgICAgYWRkID0gYml0cyhkYXQsIHBvcywgKDEgPDwgYikgLSAxKSArIGZsW2ldO1xuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZGlzdFxuICAgICAgICAgICAgICAgIHZhciBkID0gZG1bYml0czE2KGRhdCwgcG9zKSAmIGRtc10sIGRzeW0gPSBkID4+PiA0O1xuICAgICAgICAgICAgICAgIGlmICghZClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDMpO1xuICAgICAgICAgICAgICAgIHBvcyArPSBkICYgMTU7XG4gICAgICAgICAgICAgICAgdmFyIGR0ID0gZmRbZHN5bV07XG4gICAgICAgICAgICAgICAgaWYgKGRzeW0gPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gZmRlYltkc3ltXTtcbiAgICAgICAgICAgICAgICAgICAgZHQgKz0gYml0czE2KGRhdCwgcG9zKSAmICgoMSA8PCBiKSAtIDEpLCBwb3MgKz0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+IHRidHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9CdWYpXG4gICAgICAgICAgICAgICAgICAgIGNidWYoYnQgKyAxMzEwNzIpO1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSBidCArIGFkZDtcbiAgICAgICAgICAgICAgICBmb3IgKDsgYnQgPCBlbmQ7IGJ0ICs9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0XSA9IGJ1ZltidCAtIGR0XTtcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0ICsgMV0gPSBidWZbYnQgKyAxIC0gZHRdO1xuICAgICAgICAgICAgICAgICAgICBidWZbYnQgKyAyXSA9IGJ1ZltidCArIDIgLSBkdF07XG4gICAgICAgICAgICAgICAgICAgIGJ1ZltidCArIDNdID0gYnVmW2J0ICsgMyAtIGR0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnQgPSBlbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3QubCA9IGxtLCBzdC5wID0gbHBvcywgc3QuYiA9IGJ0LCBzdC5mID0gZmluYWw7XG4gICAgICAgIGlmIChsbSlcbiAgICAgICAgICAgIGZpbmFsID0gMSwgc3QubSA9IGxidCwgc3QuZCA9IGRtLCBzdC5uID0gZGJ0O1xuICAgIH0gd2hpbGUgKCFmaW5hbCk7XG4gICAgcmV0dXJuIGJ0ID09IGJ1Zi5sZW5ndGggPyBidWYgOiBzbGMoYnVmLCAwLCBidCk7XG59O1xuLy8gc3RhcnRpbmcgYXQgcCwgd3JpdGUgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGJpdHMgdGhhdCBjYW4gaG9sZCB2IHRvIGRcbnZhciB3Yml0cyA9IGZ1bmN0aW9uIChkLCBwLCB2KSB7XG4gICAgdiA8PD0gcCAmIDc7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICBkW29dIHw9IHY7XG4gICAgZFtvICsgMV0gfD0gdiA+Pj4gODtcbn07XG4vLyBzdGFydGluZyBhdCBwLCB3cml0ZSB0aGUgbWluaW11bSBudW1iZXIgb2YgYml0cyAoPjgpIHRoYXQgY2FuIGhvbGQgdiB0byBkXG52YXIgd2JpdHMxNiA9IGZ1bmN0aW9uIChkLCBwLCB2KSB7XG4gICAgdiA8PD0gcCAmIDc7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICBkW29dIHw9IHY7XG4gICAgZFtvICsgMV0gfD0gdiA+Pj4gODtcbiAgICBkW28gKyAyXSB8PSB2ID4+PiAxNjtcbn07XG4vLyBjcmVhdGVzIGNvZGUgbGVuZ3RocyBmcm9tIGEgZnJlcXVlbmN5IHRhYmxlXG52YXIgaFRyZWUgPSBmdW5jdGlvbiAoZCwgbWIpIHtcbiAgICAvLyBOZWVkIGV4dHJhIGluZm8gdG8gbWFrZSBhIHRyZWVcbiAgICB2YXIgdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZC5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoZFtpXSlcbiAgICAgICAgICAgIHQucHVzaCh7IHM6IGksIGY6IGRbaV0gfSk7XG4gICAgfVxuICAgIHZhciBzID0gdC5sZW5ndGg7XG4gICAgdmFyIHQyID0gdC5zbGljZSgpO1xuICAgIGlmICghcylcbiAgICAgICAgcmV0dXJuIFtldCwgMF07XG4gICAgaWYgKHMgPT0gMSkge1xuICAgICAgICB2YXIgdiA9IG5ldyB1OCh0WzBdLnMgKyAxKTtcbiAgICAgICAgdlt0WzBdLnNdID0gMTtcbiAgICAgICAgcmV0dXJuIFt2LCAxXTtcbiAgICB9XG4gICAgdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmYgLSBiLmY7IH0pO1xuICAgIC8vIGFmdGVyIGkyIHJlYWNoZXMgbGFzdCBpbmQsIHdpbGwgYmUgc3RvcHBlZFxuICAgIC8vIGZyZXEgbXVzdCBiZSBncmVhdGVyIHRoYW4gbGFyZ2VzdCBwb3NzaWJsZSBudW1iZXIgb2Ygc3ltYm9sc1xuICAgIHQucHVzaCh7IHM6IC0xLCBmOiAyNTAwMSB9KTtcbiAgICB2YXIgbCA9IHRbMF0sIHIgPSB0WzFdLCBpMCA9IDAsIGkxID0gMSwgaTIgPSAyO1xuICAgIHRbMF0gPSB7IHM6IC0xLCBmOiBsLmYgKyByLmYsIGw6IGwsIHI6IHIgfTtcbiAgICAvLyBlZmZpY2llbnQgYWxnb3JpdGhtIGZyb20gVVpJUC5qc1xuICAgIC8vIGkwIGlzIGxvb2tiZWhpbmQsIGkyIGlzIGxvb2thaGVhZCAtIGFmdGVyIHByb2Nlc3NpbmcgdHdvIGxvdy1mcmVxXG4gICAgLy8gc3ltYm9scyB0aGF0IGNvbWJpbmVkIGhhdmUgaGlnaCBmcmVxLCB3aWxsIHN0YXJ0IHByb2Nlc3NpbmcgaTIgKGhpZ2gtZnJlcSxcbiAgICAvLyBub24tY29tcG9zaXRlKSBzeW1ib2xzIGluc3RlYWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9yZWRkaXQuY29tL3IvcGhvdG9wZWEvY29tbWVudHMvaWtla2h0L3V6aXBqc19xdWVzdGlvbnMvXG4gICAgd2hpbGUgKGkxICE9IHMgLSAxKSB7XG4gICAgICAgIGwgPSB0W3RbaTBdLmYgPCB0W2kyXS5mID8gaTArKyA6IGkyKytdO1xuICAgICAgICByID0gdFtpMCAhPSBpMSAmJiB0W2kwXS5mIDwgdFtpMl0uZiA/IGkwKysgOiBpMisrXTtcbiAgICAgICAgdFtpMSsrXSA9IHsgczogLTEsIGY6IGwuZiArIHIuZiwgbDogbCwgcjogciB9O1xuICAgIH1cbiAgICB2YXIgbWF4U3ltID0gdDJbMF0ucztcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHM7ICsraSkge1xuICAgICAgICBpZiAodDJbaV0ucyA+IG1heFN5bSlcbiAgICAgICAgICAgIG1heFN5bSA9IHQyW2ldLnM7XG4gICAgfVxuICAgIC8vIGNvZGUgbGVuZ3Roc1xuICAgIHZhciB0ciA9IG5ldyB1MTYobWF4U3ltICsgMSk7XG4gICAgLy8gbWF4IGJpdHMgaW4gdHJlZVxuICAgIHZhciBtYnQgPSBsbih0W2kxIC0gMV0sIHRyLCAwKTtcbiAgICBpZiAobWJ0ID4gbWIpIHtcbiAgICAgICAgLy8gbW9yZSBhbGdvcml0aG1zIGZyb20gVVpJUC5qc1xuICAgICAgICAvLyBUT0RPOiBmaW5kIG91dCBob3cgdGhpcyBjb2RlIHdvcmtzIChkZWJ0KVxuICAgICAgICAvLyAgaW5kICAgIGRlYnRcbiAgICAgICAgdmFyIGkgPSAwLCBkdCA9IDA7XG4gICAgICAgIC8vICAgIGxlZnQgICAgICAgICAgICBjb3N0XG4gICAgICAgIHZhciBsZnQgPSBtYnQgLSBtYiwgY3N0ID0gMSA8PCBsZnQ7XG4gICAgICAgIHQyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHRyW2Iuc10gLSB0clthLnNdIHx8IGEuZiAtIGIuZjsgfSk7XG4gICAgICAgIGZvciAoOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaTJfMSA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfMV0gPiBtYikge1xuICAgICAgICAgICAgICAgIGR0ICs9IGNzdCAtICgxIDw8IChtYnQgLSB0cltpMl8xXSkpO1xuICAgICAgICAgICAgICAgIHRyW2kyXzFdID0gbWI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZHQgPj4+PSBsZnQ7XG4gICAgICAgIHdoaWxlIChkdCA+IDApIHtcbiAgICAgICAgICAgIHZhciBpMl8yID0gdDJbaV0ucztcbiAgICAgICAgICAgIGlmICh0cltpMl8yXSA8IG1iKVxuICAgICAgICAgICAgICAgIGR0IC09IDEgPDwgKG1iIC0gdHJbaTJfMl0rKyAtIDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA+PSAwICYmIGR0OyAtLWkpIHtcbiAgICAgICAgICAgIHZhciBpMl8zID0gdDJbaV0ucztcbiAgICAgICAgICAgIGlmICh0cltpMl8zXSA9PSBtYikge1xuICAgICAgICAgICAgICAgIC0tdHJbaTJfM107XG4gICAgICAgICAgICAgICAgKytkdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYnQgPSBtYjtcbiAgICB9XG4gICAgcmV0dXJuIFtuZXcgdTgodHIpLCBtYnRdO1xufTtcbi8vIGdldCB0aGUgbWF4IGxlbmd0aCBhbmQgYXNzaWduIGxlbmd0aCBjb2Rlc1xudmFyIGxuID0gZnVuY3Rpb24gKG4sIGwsIGQpIHtcbiAgICByZXR1cm4gbi5zID09IC0xXG4gICAgICAgID8gTWF0aC5tYXgobG4obi5sLCBsLCBkICsgMSksIGxuKG4uciwgbCwgZCArIDEpKVxuICAgICAgICA6IChsW24uc10gPSBkKTtcbn07XG4vLyBsZW5ndGggY29kZXMgZ2VuZXJhdGlvblxudmFyIGxjID0gZnVuY3Rpb24gKGMpIHtcbiAgICB2YXIgcyA9IGMubGVuZ3RoO1xuICAgIC8vIE5vdGUgdGhhdCB0aGUgc2VtaWNvbG9uIHdhcyBpbnRlbnRpb25hbFxuICAgIHdoaWxlIChzICYmICFjWy0tc10pXG4gICAgICAgIDtcbiAgICB2YXIgY2wgPSBuZXcgdTE2KCsrcyk7XG4gICAgLy8gIGluZCAgICAgIG51bSAgICAgICAgIHN0cmVha1xuICAgIHZhciBjbGkgPSAwLCBjbG4gPSBjWzBdLCBjbHMgPSAxO1xuICAgIHZhciB3ID0gZnVuY3Rpb24gKHYpIHsgY2xbY2xpKytdID0gdjsgfTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBzOyArK2kpIHtcbiAgICAgICAgaWYgKGNbaV0gPT0gY2xuICYmIGkgIT0gcylcbiAgICAgICAgICAgICsrY2xzO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY2xuICYmIGNscyA+IDIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKDsgY2xzID4gMTM4OyBjbHMgLT0gMTM4KVxuICAgICAgICAgICAgICAgICAgICB3KDMyNzU0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2xzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB3KGNscyA+IDEwID8gKChjbHMgLSAxMSkgPDwgNSkgfCAyODY5MCA6ICgoY2xzIC0gMykgPDwgNSkgfCAxMjMwNSk7XG4gICAgICAgICAgICAgICAgICAgIGNscyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2xzID4gMykge1xuICAgICAgICAgICAgICAgIHcoY2xuKSwgLS1jbHM7XG4gICAgICAgICAgICAgICAgZm9yICg7IGNscyA+IDY7IGNscyAtPSA2KVxuICAgICAgICAgICAgICAgICAgICB3KDgzMDQpO1xuICAgICAgICAgICAgICAgIGlmIChjbHMgPiAyKVxuICAgICAgICAgICAgICAgICAgICB3KCgoY2xzIC0gMykgPDwgNSkgfCA4MjA4KSwgY2xzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjbHMtLSlcbiAgICAgICAgICAgICAgICB3KGNsbik7XG4gICAgICAgICAgICBjbHMgPSAxO1xuICAgICAgICAgICAgY2xuID0gY1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2NsLnN1YmFycmF5KDAsIGNsaSksIHNdO1xufTtcbi8vIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIG91dHB1dCBmcm9tIHRyZWUsIGNvZGUgbGVuZ3Roc1xudmFyIGNsZW4gPSBmdW5jdGlvbiAoY2YsIGNsKSB7XG4gICAgdmFyIGwgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2wubGVuZ3RoOyArK2kpXG4gICAgICAgIGwgKz0gY2ZbaV0gKiBjbFtpXTtcbiAgICByZXR1cm4gbDtcbn07XG4vLyB3cml0ZXMgYSBmaXhlZCBibG9ja1xuLy8gcmV0dXJucyB0aGUgbmV3IGJpdCBwb3NcbnZhciB3ZmJsayA9IGZ1bmN0aW9uIChvdXQsIHBvcywgZGF0KSB7XG4gICAgLy8gbm8gbmVlZCB0byB3cml0ZSAwMCBhcyB0eXBlOiBUeXBlZEFycmF5IGRlZmF1bHRzIHRvIDBcbiAgICB2YXIgcyA9IGRhdC5sZW5ndGg7XG4gICAgdmFyIG8gPSBzaGZ0KHBvcyArIDIpO1xuICAgIG91dFtvXSA9IHMgJiAyNTU7XG4gICAgb3V0W28gKyAxXSA9IHMgPj4+IDg7XG4gICAgb3V0W28gKyAyXSA9IG91dFtvXSBeIDI1NTtcbiAgICBvdXRbbyArIDNdID0gb3V0W28gKyAxXSBeIDI1NTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHM7ICsraSlcbiAgICAgICAgb3V0W28gKyBpICsgNF0gPSBkYXRbaV07XG4gICAgcmV0dXJuIChvICsgNCArIHMpICogODtcbn07XG4vLyB3cml0ZXMgYSBibG9ja1xudmFyIHdibGsgPSBmdW5jdGlvbiAoZGF0LCBvdXQsIGZpbmFsLCBzeW1zLCBsZiwgZGYsIGViLCBsaSwgYnMsIGJsLCBwKSB7XG4gICAgd2JpdHMob3V0LCBwKyssIGZpbmFsKTtcbiAgICArK2xmWzI1Nl07XG4gICAgdmFyIF9hID0gaFRyZWUobGYsIDE1KSwgZGx0ID0gX2FbMF0sIG1sYiA9IF9hWzFdO1xuICAgIHZhciBfYiA9IGhUcmVlKGRmLCAxNSksIGRkdCA9IF9iWzBdLCBtZGIgPSBfYlsxXTtcbiAgICB2YXIgX2MgPSBsYyhkbHQpLCBsY2x0ID0gX2NbMF0sIG5sYyA9IF9jWzFdO1xuICAgIHZhciBfZCA9IGxjKGRkdCksIGxjZHQgPSBfZFswXSwgbmRjID0gX2RbMV07XG4gICAgdmFyIGxjZnJlcSA9IG5ldyB1MTYoMTkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGNsdC5sZW5ndGg7ICsraSlcbiAgICAgICAgbGNmcmVxW2xjbHRbaV0gJiAzMV0rKztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxjZHQubGVuZ3RoOyArK2kpXG4gICAgICAgIGxjZnJlcVtsY2R0W2ldICYgMzFdKys7XG4gICAgdmFyIF9lID0gaFRyZWUobGNmcmVxLCA3KSwgbGN0ID0gX2VbMF0sIG1sY2IgPSBfZVsxXTtcbiAgICB2YXIgbmxjYyA9IDE5O1xuICAgIGZvciAoOyBubGNjID4gNCAmJiAhbGN0W2NsaW1bbmxjYyAtIDFdXTsgLS1ubGNjKVxuICAgICAgICA7XG4gICAgdmFyIGZsZW4gPSAoYmwgKyA1KSA8PCAzO1xuICAgIHZhciBmdGxlbiA9IGNsZW4obGYsIGZsdCkgKyBjbGVuKGRmLCBmZHQpICsgZWI7XG4gICAgdmFyIGR0bGVuID0gY2xlbihsZiwgZGx0KSArIGNsZW4oZGYsIGRkdCkgKyBlYiArIDE0ICsgMyAqIG5sY2MgKyBjbGVuKGxjZnJlcSwgbGN0KSArICgyICogbGNmcmVxWzE2XSArIDMgKiBsY2ZyZXFbMTddICsgNyAqIGxjZnJlcVsxOF0pO1xuICAgIGlmIChmbGVuIDw9IGZ0bGVuICYmIGZsZW4gPD0gZHRsZW4pXG4gICAgICAgIHJldHVybiB3ZmJsayhvdXQsIHAsIGRhdC5zdWJhcnJheShicywgYnMgKyBibCkpO1xuICAgIHZhciBsbSwgbGwsIGRtLCBkbDtcbiAgICB3Yml0cyhvdXQsIHAsIDEgKyAoZHRsZW4gPCBmdGxlbikpLCBwICs9IDI7XG4gICAgaWYgKGR0bGVuIDwgZnRsZW4pIHtcbiAgICAgICAgbG0gPSBoTWFwKGRsdCwgbWxiLCAwKSwgbGwgPSBkbHQsIGRtID0gaE1hcChkZHQsIG1kYiwgMCksIGRsID0gZGR0O1xuICAgICAgICB2YXIgbGxtID0gaE1hcChsY3QsIG1sY2IsIDApO1xuICAgICAgICB3Yml0cyhvdXQsIHAsIG5sYyAtIDI1Nyk7XG4gICAgICAgIHdiaXRzKG91dCwgcCArIDUsIG5kYyAtIDEpO1xuICAgICAgICB3Yml0cyhvdXQsIHAgKyAxMCwgbmxjYyAtIDQpO1xuICAgICAgICBwICs9IDE0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5sY2M7ICsraSlcbiAgICAgICAgICAgIHdiaXRzKG91dCwgcCArIDMgKiBpLCBsY3RbY2xpbVtpXV0pO1xuICAgICAgICBwICs9IDMgKiBubGNjO1xuICAgICAgICB2YXIgbGN0cyA9IFtsY2x0LCBsY2R0XTtcbiAgICAgICAgZm9yICh2YXIgaXQgPSAwOyBpdCA8IDI7ICsraXQpIHtcbiAgICAgICAgICAgIHZhciBjbGN0ID0gbGN0c1tpdF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsY3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gY2xjdFtpXSAmIDMxO1xuICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgbGxtW2xlbl0pLCBwICs9IGxjdFtsZW5dO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPiAxNSlcbiAgICAgICAgICAgICAgICAgICAgd2JpdHMob3V0LCBwLCAoY2xjdFtpXSA+Pj4gNSkgJiAxMjcpLCBwICs9IGNsY3RbaV0gPj4+IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsbSA9IGZsbSwgbGwgPSBmbHQsIGRtID0gZmRtLCBkbCA9IGZkdDtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaTsgKytpKSB7XG4gICAgICAgIGlmIChzeW1zW2ldID4gMjU1KSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gKHN5bXNbaV0gPj4+IDE4KSAmIDMxO1xuICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIGxtW2xlbiArIDI1N10pLCBwICs9IGxsW2xlbiArIDI1N107XG4gICAgICAgICAgICBpZiAobGVuID4gNylcbiAgICAgICAgICAgICAgICB3Yml0cyhvdXQsIHAsIChzeW1zW2ldID4+PiAyMykgJiAzMSksIHAgKz0gZmxlYltsZW5dO1xuICAgICAgICAgICAgdmFyIGRzdCA9IHN5bXNbaV0gJiAzMTtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBkbVtkc3RdKSwgcCArPSBkbFtkc3RdO1xuICAgICAgICAgICAgaWYgKGRzdCA+IDMpXG4gICAgICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIChzeW1zW2ldID4+PiA1KSAmIDgxOTEpLCBwICs9IGZkZWJbZHN0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBsbVtzeW1zW2ldXSksIHAgKz0gbGxbc3ltc1tpXV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2JpdHMxNihvdXQsIHAsIGxtWzI1Nl0pO1xuICAgIHJldHVybiBwICsgbGxbMjU2XTtcbn07XG4vLyBkZWZsYXRlIG9wdGlvbnMgKG5pY2UgPDwgMTMpIHwgY2hhaW5cbnZhciBkZW8gPSAvKiNfX1BVUkVfXyovIG5ldyB1MzIoWzY1NTQwLCAxMzEwODAsIDEzMTA4OCwgMTMxMTA0LCAyNjIxNzYsIDEwNDg3MDQsIDEwNDg4MzIsIDIxMTQ1NjAsIDIxMTc2MzJdKTtcbi8vIGVtcHR5XG52YXIgZXQgPSAvKiNfX1BVUkVfXyovIG5ldyB1OCgwKTtcbi8vIGNvbXByZXNzZXMgZGF0YSBpbnRvIGEgcmF3IERFRkxBVEUgYnVmZmVyXG52YXIgZGZsdCA9IGZ1bmN0aW9uIChkYXQsIGx2bCwgcGx2bCwgcHJlLCBwb3N0LCBsc3QpIHtcbiAgICB2YXIgcyA9IGRhdC5sZW5ndGg7XG4gICAgdmFyIG8gPSBuZXcgdTgocHJlICsgcyArIDUgKiAoMSArIE1hdGguY2VpbChzIC8gNzAwMCkpICsgcG9zdCk7XG4gICAgLy8gd3JpdGluZyB0byB0aGlzIHdyaXRlcyB0byB0aGUgb3V0cHV0IGJ1ZmZlclxuICAgIHZhciB3ID0gby5zdWJhcnJheShwcmUsIG8ubGVuZ3RoIC0gcG9zdCk7XG4gICAgdmFyIHBvcyA9IDA7XG4gICAgaWYgKCFsdmwgfHwgcyA8IDgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gczsgaSArPSA2NTUzNSkge1xuICAgICAgICAgICAgLy8gZW5kXG4gICAgICAgICAgICB2YXIgZSA9IGkgKyA2NTUzNTtcbiAgICAgICAgICAgIGlmIChlID49IHMpIHtcbiAgICAgICAgICAgICAgICAvLyB3cml0ZSBmaW5hbCBibG9ja1xuICAgICAgICAgICAgICAgIHdbcG9zID4+IDNdID0gbHN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zID0gd2ZibGsodywgcG9zICsgMSwgZGF0LnN1YmFycmF5KGksIGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG9wdCA9IGRlb1tsdmwgLSAxXTtcbiAgICAgICAgdmFyIG4gPSBvcHQgPj4+IDEzLCBjID0gb3B0ICYgODE5MTtcbiAgICAgICAgdmFyIG1za18xID0gKDEgPDwgcGx2bCkgLSAxO1xuICAgICAgICAvLyAgICBwcmV2IDItYnl0ZSB2YWwgbWFwICAgIGN1cnIgMi1ieXRlIHZhbCBtYXBcbiAgICAgICAgdmFyIHByZXYgPSBuZXcgdTE2KDMyNzY4KSwgaGVhZCA9IG5ldyB1MTYobXNrXzEgKyAxKTtcbiAgICAgICAgdmFyIGJzMV8xID0gTWF0aC5jZWlsKHBsdmwgLyAzKSwgYnMyXzEgPSAyICogYnMxXzE7XG4gICAgICAgIHZhciBoc2ggPSBmdW5jdGlvbiAoaSkgeyByZXR1cm4gKGRhdFtpXSBeIChkYXRbaSArIDFdIDw8IGJzMV8xKSBeIChkYXRbaSArIDJdIDw8IGJzMl8xKSkgJiBtc2tfMTsgfTtcbiAgICAgICAgLy8gMjQ1NzYgaXMgYW4gYXJiaXRyYXJ5IG51bWJlciBvZiBtYXhpbXVtIHN5bWJvbHMgcGVyIGJsb2NrXG4gICAgICAgIC8vIDQyNCBidWZmZXIgZm9yIGxhc3QgYmxvY2tcbiAgICAgICAgdmFyIHN5bXMgPSBuZXcgdTMyKDI1MDAwKTtcbiAgICAgICAgLy8gbGVuZ3RoL2xpdGVyYWwgZnJlcSAgIGRpc3RhbmNlIGZyZXFcbiAgICAgICAgdmFyIGxmID0gbmV3IHUxNigyODgpLCBkZiA9IG5ldyB1MTYoMzIpO1xuICAgICAgICAvLyAgbC9sY250ICBleGJpdHMgIGluZGV4ICBsL2xpbmQgIHdhaXRkeCAgYml0cG9zXG4gICAgICAgIHZhciBsY18xID0gMCwgZWIgPSAwLCBpID0gMCwgbGkgPSAwLCB3aSA9IDAsIGJzID0gMDtcbiAgICAgICAgZm9yICg7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGhhc2ggdmFsdWVcbiAgICAgICAgICAgIC8vIGRlb3B0IHdoZW4gaSA+IHMgLSAzIC0gYXQgZW5kLCBkZW9wdCBhY2NlcHRhYmxlXG4gICAgICAgICAgICB2YXIgaHYgPSBoc2goaSk7XG4gICAgICAgICAgICAvLyBpbmRleCBtb2QgMzI3NjggICAgcHJldmlvdXMgaW5kZXggbW9kXG4gICAgICAgICAgICB2YXIgaW1vZCA9IGkgJiAzMjc2NywgcGltb2QgPSBoZWFkW2h2XTtcbiAgICAgICAgICAgIHByZXZbaW1vZF0gPSBwaW1vZDtcbiAgICAgICAgICAgIGhlYWRbaHZdID0gaW1vZDtcbiAgICAgICAgICAgIC8vIFdlIGFsd2F5cyBzaG91bGQgbW9kaWZ5IGhlYWQgYW5kIHByZXYsIGJ1dCBvbmx5IGFkZCBzeW1ib2xzIGlmXG4gICAgICAgICAgICAvLyB0aGlzIGRhdGEgaXMgbm90IHlldCBwcm9jZXNzZWQgKFwid2FpdFwiIGZvciB3YWl0IGluZGV4KVxuICAgICAgICAgICAgaWYgKHdpIDw9IGkpIHtcbiAgICAgICAgICAgICAgICAvLyBieXRlcyByZW1haW5pbmdcbiAgICAgICAgICAgICAgICB2YXIgcmVtID0gcyAtIGk7XG4gICAgICAgICAgICAgICAgaWYgKChsY18xID4gNzAwMCB8fCBsaSA+IDI0NTc2KSAmJiByZW0gPiA0MjMpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gd2JsayhkYXQsIHcsIDAsIHN5bXMsIGxmLCBkZiwgZWIsIGxpLCBicywgaSAtIGJzLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICBsaSA9IGxjXzEgPSBlYiA9IDAsIGJzID0gaTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyODY7ICsrailcbiAgICAgICAgICAgICAgICAgICAgICAgIGxmW2pdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAzMDsgKytqKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGZbal0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgbGVuICAgIGRpc3QgICBjaGFpblxuICAgICAgICAgICAgICAgIHZhciBsID0gMiwgZCA9IDAsIGNoXzEgPSBjLCBkaWYgPSAoaW1vZCAtIHBpbW9kKSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgIGlmIChyZW0gPiAyICYmIGh2ID09IGhzaChpIC0gZGlmKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4biA9IE1hdGgubWluKG4sIHJlbSkgLSAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ZCA9IE1hdGgubWluKDMyNzY3LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF4IHBvc3NpYmxlIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAvLyBub3QgY2FwcGVkIGF0IGRpZiBiZWNhdXNlIGRlY29tcHJlc3NvcnMgaW1wbGVtZW50IFwicm9sbGluZ1wiIGluZGV4IHBvcHVsYXRpb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1sID0gTWF0aC5taW4oMjU4LCByZW0pO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZGlmIDw9IG1heGQgJiYgLS1jaF8xICYmIGltb2QgIT0gcGltb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRbaSArIGxdID09IGRhdFtpICsgbCAtIGRpZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBubCA8IG1sICYmIGRhdFtpICsgbmxdID09IGRhdFtpICsgbmwgLSBkaWZdOyArK25sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sID4gbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gbmwsIGQgPSBkaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBlYXJseSB3aGVuIHdlIHJlYWNoIFwibmljZVwiICh3ZSBhcmUgc2F0aXNmaWVkIGVub3VnaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sID4gbWF4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3csIGZpbmQgdGhlIHJhcmVzdCAyLWJ5dGUgc2VxdWVuY2Ugd2l0aGluIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGVuZ3RoIG9mIGxpdGVyYWxzIGFuZCBzZWFyY2ggZm9yIHRoYXQgaW5zdGVhZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVjaCBmYXN0ZXIgdGhhbiBqdXN0IHVzaW5nIHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW1kID0gTWF0aC5taW4oZGlmLCBubCAtIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1tZDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGkgPSAoaSAtIGRpZiArIGogKyAzMjc2OCkgJiAzMjc2NztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwdGkgPSBwcmV2W3RpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjZCA9ICh0aSAtIHB0aSArIDMyNzY4KSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNkID4gbWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWQgPSBjZCwgcGltb2QgPSB0aTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBwcmV2aW91cyBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1vZCA9IHBpbW9kLCBwaW1vZCA9IHByZXZbaW1vZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWYgKz0gKGltb2QgLSBwaW1vZCArIDMyNzY4KSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGQgd2lsbCBiZSBub256ZXJvIG9ubHkgd2hlbiBhIG1hdGNoIHdhcyBmb3VuZFxuICAgICAgICAgICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIGJvdGggZGlzdCBhbmQgbGVuIGRhdGEgaW4gb25lIFVpbnQzMlxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBpcyByZWNvZ25pemVkIGFzIGEgbGVuL2Rpc3Qgd2l0aCAyOHRoIGJpdCAoMl4yOClcbiAgICAgICAgICAgICAgICAgICAgc3ltc1tsaSsrXSA9IDI2ODQzNTQ1NiB8IChyZXZmbFtsXSA8PCAxOCkgfCByZXZmZFtkXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbiA9IHJldmZsW2xdICYgMzEsIGRpbiA9IHJldmZkW2RdICYgMzE7XG4gICAgICAgICAgICAgICAgICAgIGViICs9IGZsZWJbbGluXSArIGZkZWJbZGluXTtcbiAgICAgICAgICAgICAgICAgICAgKytsZlsyNTcgKyBsaW5dO1xuICAgICAgICAgICAgICAgICAgICArK2RmW2Rpbl07XG4gICAgICAgICAgICAgICAgICAgIHdpID0gaSArIGw7XG4gICAgICAgICAgICAgICAgICAgICsrbGNfMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bXNbbGkrK10gPSBkYXRbaV07XG4gICAgICAgICAgICAgICAgICAgICsrbGZbZGF0W2ldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9zID0gd2JsayhkYXQsIHcsIGxzdCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBpIC0gYnMsIHBvcyk7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGVhc2llc3Qgd2F5IHRvIGF2b2lkIG5lZWRpbmcgdG8gbWFpbnRhaW4gc3RhdGVcbiAgICAgICAgaWYgKCFsc3QgJiYgcG9zICYgNylcbiAgICAgICAgICAgIHBvcyA9IHdmYmxrKHcsIHBvcyArIDEsIGV0KTtcbiAgICB9XG4gICAgcmV0dXJuIHNsYyhvLCAwLCBwcmUgKyBzaGZ0KHBvcykgKyBwb3N0KTtcbn07XG4vLyBDUkMzMiB0YWJsZVxudmFyIGNyY3QgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHQgPSBuZXcgSW50MzJBcnJheSgyNTYpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBpLCBrID0gOTtcbiAgICAgICAgd2hpbGUgKC0taylcbiAgICAgICAgICAgIGMgPSAoKGMgJiAxKSAmJiAtMzA2Njc0OTEyKSBeIChjID4+PiAxKTtcbiAgICAgICAgdFtpXSA9IGM7XG4gICAgfVxuICAgIHJldHVybiB0O1xufSkoKTtcbi8vIENSQzMyXG52YXIgY3JjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjID0gLTE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcDogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIC8vIGNsb3N1cmVzIGhhdmUgYXdmdWwgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHZhciBjciA9IGM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGQubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY3IgPSBjcmN0WyhjciAmIDI1NSkgXiBkW2ldXSBeIChjciA+Pj4gOCk7XG4gICAgICAgICAgICBjID0gY3I7XG4gICAgICAgIH0sXG4gICAgICAgIGQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIH5jOyB9XG4gICAgfTtcbn07XG4vLyBBbGRlcjMyXG52YXIgYWRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGEgPSAxLCBiID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgICBwOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgLy8gY2xvc3VyZXMgaGF2ZSBhd2Z1bCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdmFyIG4gPSBhLCBtID0gYjtcbiAgICAgICAgICAgIHZhciBsID0gZC5sZW5ndGggfCAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgIT0gbDspIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IE1hdGgubWluKGkgKyAyNjU1LCBsKTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGU7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgbSArPSBuICs9IGRbaV07XG4gICAgICAgICAgICAgICAgbiA9IChuICYgNjU1MzUpICsgMTUgKiAobiA+PiAxNiksIG0gPSAobSAmIDY1NTM1KSArIDE1ICogKG0gPj4gMTYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSA9IG4sIGIgPSBtO1xuICAgICAgICB9LFxuICAgICAgICBkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhICU9IDY1NTIxLCBiICU9IDY1NTIxO1xuICAgICAgICAgICAgcmV0dXJuIChhICYgMjU1KSA8PCAyNCB8IChhID4+PiA4KSA8PCAxNiB8IChiICYgMjU1KSA8PCA4IHwgKGIgPj4+IDgpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG47XG4vLyBkZWZsYXRlIHdpdGggb3B0c1xudmFyIGRvcHQgPSBmdW5jdGlvbiAoZGF0LCBvcHQsIHByZSwgcG9zdCwgc3QpIHtcbiAgICByZXR1cm4gZGZsdChkYXQsIG9wdC5sZXZlbCA9PSBudWxsID8gNiA6IG9wdC5sZXZlbCwgb3B0Lm1lbSA9PSBudWxsID8gTWF0aC5jZWlsKE1hdGgubWF4KDgsIE1hdGgubWluKDEzLCBNYXRoLmxvZyhkYXQubGVuZ3RoKSkpICogMS41KSA6ICgxMiArIG9wdC5tZW0pLCBwcmUsIHBvc3QsICFzdCk7XG59O1xuLy8gV2FsbWFydCBvYmplY3Qgc3ByZWFkXG52YXIgbXJnID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbyA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gYSlcbiAgICAgICAgb1trXSA9IGFba107XG4gICAgZm9yICh2YXIgayBpbiBiKVxuICAgICAgICBvW2tdID0gYltrXTtcbiAgICByZXR1cm4gbztcbn07XG4vLyB3b3JrZXIgY2xvbmVcbi8vIFRoaXMgaXMgcG9zc2libHkgdGhlIGNyYXppZXN0IHBhcnQgb2YgdGhlIGVudGlyZSBjb2RlYmFzZSwgZGVzcGl0ZSBob3cgc2ltcGxlIGl0IG1heSBzZWVtLlxuLy8gVGhlIG9ubHkgcGFyYW1ldGVyIHRvIHRoaXMgZnVuY3Rpb24gaXMgYSBjbG9zdXJlIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZiB2YXJpYWJsZXMgb3V0c2lkZSBvZiB0aGUgZnVuY3Rpb24gc2NvcGUuXG4vLyBXZSdyZSBnb2luZyB0byB0cnkgdG8gZmlndXJlIG91dCB0aGUgdmFyaWFibGUgbmFtZXMgdXNlZCBpbiB0aGUgY2xvc3VyZSBhcyBzdHJpbmdzIGJlY2F1c2UgdGhhdCBpcyBjcnVjaWFsIGZvciB3b3JrZXJpemF0aW9uLlxuLy8gV2Ugd2lsbCByZXR1cm4gYW4gb2JqZWN0IG1hcHBpbmcgb2YgdHJ1ZSB2YXJpYWJsZSBuYW1lIHRvIHZhbHVlIChiYXNpY2FsbHksIHRoZSBjdXJyZW50IHNjb3BlIGFzIGEgSlMgb2JqZWN0KS5cbi8vIFRoZSByZWFzb24gd2UgY2FuJ3QganVzdCB1c2UgdGhlIG9yaWdpbmFsIHZhcmlhYmxlIG5hbWVzIGlzIG1pbmlmaWVycyBtYW5nbGluZyB0aGUgdG9wbGV2ZWwgc2NvcGUuXG4vLyBUaGlzIHRvb2sgbWUgdGhyZWUgd2Vla3MgdG8gZmlndXJlIG91dCBob3cgdG8gZG8uXG52YXIgd2NsbiA9IGZ1bmN0aW9uIChmbiwgZm5TdHIsIHRkKSB7XG4gICAgdmFyIGR0ID0gZm4oKTtcbiAgICB2YXIgc3QgPSBmbi50b1N0cmluZygpO1xuICAgIHZhciBrcyA9IHN0LnNsaWNlKHN0LmluZGV4T2YoJ1snKSArIDEsIHN0Lmxhc3RJbmRleE9mKCddJykpLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgdiA9IGR0W2ldLCBrID0ga3NbaV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBmblN0ciArPSAnOycgKyBrICsgJz0nO1xuICAgICAgICAgICAgdmFyIHN0XzEgPSB2LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAodi5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgZ2xvYmFsIG9iamVjdHNcbiAgICAgICAgICAgICAgICBpZiAoc3RfMS5pbmRleE9mKCdbbmF0aXZlIGNvZGVdJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwSW5kID0gc3RfMS5pbmRleE9mKCcgJywgOCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBmblN0ciArPSBzdF8xLnNsaWNlKHNwSW5kLCBzdF8xLmluZGV4T2YoJygnLCBzcEluZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm5TdHIgKz0gc3RfMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdCBpbiB2LnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuU3RyICs9ICc7JyArIGsgKyAnLnByb3RvdHlwZS4nICsgdCArICc9JyArIHYucHJvdG90eXBlW3RdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZuU3RyICs9IHN0XzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGRba10gPSB2O1xuICAgIH1cbiAgICByZXR1cm4gW2ZuU3RyLCB0ZF07XG59O1xudmFyIGNoID0gW107XG4vLyBjbG9uZSBidWZzXG52YXIgY2JmcyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIHRsID0gW107XG4gICAgZm9yICh2YXIgayBpbiB2KSB7XG4gICAgICAgIGlmICh2W2tdLmJ1ZmZlcikge1xuICAgICAgICAgICAgdGwucHVzaCgodltrXSA9IG5ldyB2W2tdLmNvbnN0cnVjdG9yKHZba10pKS5idWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bDtcbn07XG4vLyB1c2UgYSB3b3JrZXIgdG8gZXhlY3V0ZSBjb2RlXG52YXIgd3JrciA9IGZ1bmN0aW9uIChmbnMsIGluaXQsIGlkLCBjYikge1xuICAgIHZhciBfYTtcbiAgICBpZiAoIWNoW2lkXSkge1xuICAgICAgICB2YXIgZm5TdHIgPSAnJywgdGRfMSA9IHt9LCBtID0gZm5zLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbTsgKytpKVxuICAgICAgICAgICAgX2EgPSB3Y2xuKGZuc1tpXSwgZm5TdHIsIHRkXzEpLCBmblN0ciA9IF9hWzBdLCB0ZF8xID0gX2FbMV07XG4gICAgICAgIGNoW2lkXSA9IHdjbG4oZm5zW21dLCBmblN0ciwgdGRfMSk7XG4gICAgfVxuICAgIHZhciB0ZCA9IG1yZyh7fSwgY2hbaWRdWzFdKTtcbiAgICByZXR1cm4gd2soY2hbaWRdWzBdICsgJztvbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciBrIGluIGUuZGF0YSlzZWxmW2tdPWUuZGF0YVtrXTtvbm1lc3NhZ2U9JyArIGluaXQudG9TdHJpbmcoKSArICd9JywgaWQsIHRkLCBjYmZzKHRkKSwgY2IpO1xufTtcbi8vIGJhc2UgYXN5bmMgaW5mbGF0ZSBmblxudmFyIGJJbmZsdCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1OCwgdTE2LCB1MzIsIGZsZWIsIGZkZWIsIGNsaW0sIGZsLCBmZCwgZmxybSwgZmRybSwgcmV2LCBlYywgaE1hcCwgbWF4LCBiaXRzLCBiaXRzMTYsIHNoZnQsIHNsYywgZXJyLCBpbmZsdCwgaW5mbGF0ZVN5bmMsIHBiZiwgZ3U4XTsgfTtcbnZhciBiRGZsdCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1OCwgdTE2LCB1MzIsIGZsZWIsIGZkZWIsIGNsaW0sIHJldmZsLCByZXZmZCwgZmxtLCBmbHQsIGZkbSwgZmR0LCByZXYsIGRlbywgZXQsIGhNYXAsIHdiaXRzLCB3Yml0czE2LCBoVHJlZSwgbG4sIGxjLCBjbGVuLCB3ZmJsaywgd2Jsaywgc2hmdCwgc2xjLCBkZmx0LCBkb3B0LCBkZWZsYXRlU3luYywgcGJmXTsgfTtcbi8vIGd6aXAgZXh0cmFcbnZhciBnemUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3poLCBnemhsLCB3Ynl0ZXMsIGNyYywgY3JjdF07IH07XG4vLyBndW56aXAgZXh0cmFcbnZhciBndXplID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6cywgZ3psXTsgfTtcbi8vIHpsaWIgZXh0cmFcbnZhciB6bGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbemxoLCB3Ynl0ZXMsIGFkbGVyXTsgfTtcbi8vIHVuemxpYiBleHRyYVxudmFyIHp1bGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbemx2XTsgfTtcbi8vIHBvc3QgYnVmXG52YXIgcGJmID0gZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gcG9zdE1lc3NhZ2UobXNnLCBbbXNnLmJ1ZmZlcl0pOyB9O1xuLy8gZ2V0IHU4XG52YXIgZ3U4ID0gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgby5zaXplICYmIG5ldyB1OChvLnNpemUpOyB9O1xuLy8gYXN5bmMgaGVscGVyXG52YXIgY2JpZnkgPSBmdW5jdGlvbiAoZGF0LCBvcHRzLCBmbnMsIGluaXQsIGlkLCBjYikge1xuICAgIHZhciB3ID0gd3JrcihmbnMsIGluaXQsIGlkLCBmdW5jdGlvbiAoZXJyLCBkYXQpIHtcbiAgICAgICAgdy50ZXJtaW5hdGUoKTtcbiAgICAgICAgY2IoZXJyLCBkYXQpO1xuICAgIH0pO1xuICAgIHcucG9zdE1lc3NhZ2UoW2RhdCwgb3B0c10sIG9wdHMuY29uc3VtZSA/IFtkYXQuYnVmZmVyXSA6IFtdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyB3LnRlcm1pbmF0ZSgpOyB9O1xufTtcbi8vIGF1dG8gc3RyZWFtXG52YXIgYXN0cm0gPSBmdW5jdGlvbiAoc3RybSkge1xuICAgIHN0cm0ub25kYXRhID0gZnVuY3Rpb24gKGRhdCwgZmluYWwpIHsgcmV0dXJuIHBvc3RNZXNzYWdlKFtkYXQsIGZpbmFsXSwgW2RhdC5idWZmZXJdKTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2KSB7IHJldHVybiBzdHJtLnB1c2goZXYuZGF0YVswXSwgZXYuZGF0YVsxXSk7IH07XG59O1xuLy8gYXN5bmMgc3RyZWFtIGF0dGFjaFxudmFyIGFzdHJtaWZ5ID0gZnVuY3Rpb24gKGZucywgc3RybSwgb3B0cywgaW5pdCwgaWQpIHtcbiAgICB2YXIgdDtcbiAgICB2YXIgdyA9IHdya3IoZm5zLCBpbml0LCBpZCwgZnVuY3Rpb24gKGVyciwgZGF0KSB7XG4gICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICB3LnRlcm1pbmF0ZSgpLCBzdHJtLm9uZGF0YS5jYWxsKHN0cm0sIGVycik7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRhdFsxXSlcbiAgICAgICAgICAgICAgICB3LnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgc3RybS5vbmRhdGEuY2FsbChzdHJtLCBlcnIsIGRhdFswXSwgZGF0WzFdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHcucG9zdE1lc3NhZ2Uob3B0cyk7XG4gICAgc3RybS5wdXNoID0gZnVuY3Rpb24gKGQsIGYpIHtcbiAgICAgICAgaWYgKCFzdHJtLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHQpXG4gICAgICAgICAgICBzdHJtLm9uZGF0YShlcnIoNCwgMCwgMSksIG51bGwsICEhZik7XG4gICAgICAgIHcucG9zdE1lc3NhZ2UoW2QsIHQgPSBmXSwgW2QuYnVmZmVyXSk7XG4gICAgfTtcbiAgICBzdHJtLnRlcm1pbmF0ZSA9IGZ1bmN0aW9uICgpIHsgdy50ZXJtaW5hdGUoKTsgfTtcbn07XG4vLyByZWFkIDIgYnl0ZXNcbnZhciBiMiA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiBkW2JdIHwgKGRbYiArIDFdIDw8IDgpOyB9O1xuLy8gcmVhZCA0IGJ5dGVzXG52YXIgYjQgPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gKGRbYl0gfCAoZFtiICsgMV0gPDwgOCkgfCAoZFtiICsgMl0gPDwgMTYpIHwgKGRbYiArIDNdIDw8IDI0KSkgPj4+IDA7IH07XG52YXIgYjggPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gYjQoZCwgYikgKyAoYjQoZCwgYiArIDQpICogNDI5NDk2NzI5Nik7IH07XG4vLyB3cml0ZSBieXRlc1xudmFyIHdieXRlcyA9IGZ1bmN0aW9uIChkLCBiLCB2KSB7XG4gICAgZm9yICg7IHY7ICsrYilcbiAgICAgICAgZFtiXSA9IHYsIHYgPj4+PSA4O1xufTtcbi8vIGd6aXAgaGVhZGVyXG52YXIgZ3poID0gZnVuY3Rpb24gKGMsIG8pIHtcbiAgICB2YXIgZm4gPSBvLmZpbGVuYW1lO1xuICAgIGNbMF0gPSAzMSwgY1sxXSA9IDEzOSwgY1syXSA9IDgsIGNbOF0gPSBvLmxldmVsIDwgMiA/IDQgOiBvLmxldmVsID09IDkgPyAyIDogMCwgY1s5XSA9IDM7IC8vIGFzc3VtZSBVbml4XG4gICAgaWYgKG8ubXRpbWUgIT0gMClcbiAgICAgICAgd2J5dGVzKGMsIDQsIE1hdGguZmxvb3IobmV3IERhdGUoby5tdGltZSB8fCBEYXRlLm5vdygpKSAvIDEwMDApKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgICAgY1szXSA9IDg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGZuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY1tpICsgMTBdID0gZm4uY2hhckNvZGVBdChpKTtcbiAgICB9XG59O1xuLy8gZ3ppcCBmb290ZXI6IC04IHRvIC00ID0gQ1JDLCAtNCB0byAtMCBpcyBsZW5ndGhcbi8vIGd6aXAgc3RhcnRcbnZhciBnenMgPSBmdW5jdGlvbiAoZCkge1xuICAgIGlmIChkWzBdICE9IDMxIHx8IGRbMV0gIT0gMTM5IHx8IGRbMl0gIT0gOClcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIGd6aXAgZGF0YScpO1xuICAgIHZhciBmbGcgPSBkWzNdO1xuICAgIHZhciBzdCA9IDEwO1xuICAgIGlmIChmbGcgJiA0KVxuICAgICAgICBzdCArPSBkWzEwXSB8IChkWzExXSA8PCA4KSArIDI7XG4gICAgZm9yICh2YXIgenMgPSAoZmxnID4+IDMgJiAxKSArIChmbGcgPj4gNCAmIDEpOyB6cyA+IDA7IHpzIC09ICFkW3N0KytdKVxuICAgICAgICA7XG4gICAgcmV0dXJuIHN0ICsgKGZsZyAmIDIpO1xufTtcbi8vIGd6aXAgbGVuZ3RoXG52YXIgZ3psID0gZnVuY3Rpb24gKGQpIHtcbiAgICB2YXIgbCA9IGQubGVuZ3RoO1xuICAgIHJldHVybiAoKGRbbCAtIDRdIHwgZFtsIC0gM10gPDwgOCB8IGRbbCAtIDJdIDw8IDE2KSB8IChkW2wgLSAxXSA8PCAyNCkpID4+PiAwO1xufTtcbi8vIGd6aXAgaGVhZGVyIGxlbmd0aFxudmFyIGd6aGwgPSBmdW5jdGlvbiAobykgeyByZXR1cm4gMTAgKyAoKG8uZmlsZW5hbWUgJiYgKG8uZmlsZW5hbWUubGVuZ3RoICsgMSkpIHx8IDApOyB9O1xuLy8gemxpYiBoZWFkZXJcbnZhciB6bGggPSBmdW5jdGlvbiAoYywgbykge1xuICAgIHZhciBsdiA9IG8ubGV2ZWwsIGZsID0gbHYgPT0gMCA/IDAgOiBsdiA8IDYgPyAxIDogbHYgPT0gOSA/IDMgOiAyO1xuICAgIGNbMF0gPSAxMjAsIGNbMV0gPSAoZmwgPDwgNikgfCAoZmwgPyAoMzIgLSAyICogZmwpIDogMSk7XG59O1xuLy8gemxpYiB2YWxpZFxudmFyIHpsdiA9IGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKChkWzBdICYgMTUpICE9IDggfHwgKGRbMF0gPj4+IDQpID4gNyB8fCAoKGRbMF0gPDwgOCB8IGRbMV0pICUgMzEpKVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhJyk7XG4gICAgaWYgKGRbMV0gJiAzMilcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIHpsaWIgZGF0YTogcHJlc2V0IGRpY3Rpb25hcmllcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuZnVuY3Rpb24gQXN5bmNDbXBTdHJtKG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYiAmJiB0eXBlb2Ygb3B0cyA9PSAnZnVuY3Rpb24nKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIHJldHVybiBvcHRzO1xufVxuLy8gemxpYiBmb290ZXI6IC00IHRvIC0wIGlzIEFkbGVyMzJcbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb25cbiAqL1xudmFyIERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmbGF0ZShvcHRzLCBjYikge1xuICAgICAgICBpZiAoIWNiICYmIHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdGhpcy5vID0gb3B0cyB8fCB7fTtcbiAgICB9XG4gICAgRGVmbGF0ZS5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHRoaXMub25kYXRhKGRvcHQoYywgdGhpcy5vLCAwLCAwLCAhZiksIGYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdGhpcy5kID0gZmluYWw7XG4gICAgICAgIHRoaXMucChjaHVuaywgZmluYWwgfHwgZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgRGVmbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0RlZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGVdOyB9XG4gICAgICAgIF0sIHRoaXMsIEFzeW5jQ21wU3RybS5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBEZWZsYXRlKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDYpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jRGVmbGF0ZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmxhdGUoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihkZWZsYXRlU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDAsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3NlcyBkYXRhIHdpdGggREVGTEFURSB3aXRob3V0IGFueSB3cmFwcGVyXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWZsYXRlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZsYXRlU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgcmV0dXJuIGRvcHQoZGF0YSwgb3B0cyB8fCB7fSwgMCwgMCk7XG59XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbmZsYXRpb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgaW5mbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBJbmZsYXRlKGNiKSB7XG4gICAgICAgIHRoaXMucyA9IHt9O1xuICAgICAgICB0aGlzLnAgPSBuZXcgdTgoMCk7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIEluZmxhdGUucHJvdG90eXBlLmUgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB2YXIgbCA9IHRoaXMucC5sZW5ndGg7XG4gICAgICAgIHZhciBuID0gbmV3IHU4KGwgKyBjLmxlbmd0aCk7XG4gICAgICAgIG4uc2V0KHRoaXMucCksIG4uc2V0KGMsIGwpLCB0aGlzLnAgPSBuO1xuICAgIH07XG4gICAgSW5mbGF0ZS5wcm90b3R5cGUuYyA9IGZ1bmN0aW9uIChmaW5hbCkge1xuICAgICAgICB0aGlzLmQgPSB0aGlzLnMuaSA9IGZpbmFsIHx8IGZhbHNlO1xuICAgICAgICB2YXIgYnRzID0gdGhpcy5zLmI7XG4gICAgICAgIHZhciBkdCA9IGluZmx0KHRoaXMucCwgdGhpcy5vLCB0aGlzLnMpO1xuICAgICAgICB0aGlzLm9uZGF0YShzbGMoZHQsIGJ0cywgdGhpcy5zLmIpLCB0aGlzLmQpO1xuICAgICAgICB0aGlzLm8gPSBzbGMoZHQsIHRoaXMucy5iIC0gMzI3NjgpLCB0aGlzLnMuYiA9IHRoaXMuby5sZW5ndGg7XG4gICAgICAgIHRoaXMucCA9IHNsYyh0aGlzLnAsICh0aGlzLnMucCAvIDgpIHwgMCksIHRoaXMucy5wICY9IDc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBpbmZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGZpbmFsIGNodW5rXG4gICAgICovXG4gICAgSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5lKGNodW5rKSwgdGhpcy5jKGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEluZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBpbmZsYXRpb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVmbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY0luZmxhdGUoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkluZmx0LFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlXTsgfVxuICAgICAgICBdLCB0aGlzLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBJbmZsYXRlKCk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgNyk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0luZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNJbmZsYXRlIH07XG5leHBvcnQgZnVuY3Rpb24gaW5mbGF0ZShkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdFxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGluZmxhdGVTeW5jKGV2LmRhdGFbMF0sIGd1OChldi5kYXRhWzFdKSkpOyB9LCAxLCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgREVGTEFURSBkYXRhIHdpdGggbm8gd3JhcHBlclxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gU2F2ZXMgbWVtb3J5IGlmIHlvdSBrbm93IHRoZSBkZWNvbXByZXNzZWQgc2l6ZSBhbmQgcHJvdmlkZSBhbiBvdXRwdXQgYnVmZmVyIG9mIHRoYXQgbGVuZ3RoLlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmZsYXRlU3luYyhkYXRhLCBvdXQpIHtcbiAgICByZXR1cm4gaW5mbHQoZGF0YSwgb3V0KTtcbn1cbi8vIGJlZm9yZSB5b3UgeWVsbCBhdCBtZSBmb3Igbm90IGp1c3QgdXNpbmcgZXh0ZW5kcywgbXkgcmVhc29uIGlzIHRoYXQgVFMgaW5oZXJpdGFuY2UgaXMgaGFyZCB0byB3b3JrZXJpemUuXG4vKipcbiAqIFN0cmVhbWluZyBHWklQIGNvbXByZXNzaW9uXG4gKi9cbnZhciBHemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEd6aXAob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5jID0gY3JjKCk7XG4gICAgICAgIHRoaXMubCA9IDA7XG4gICAgICAgIHRoaXMudiA9IDE7XG4gICAgICAgIERlZmxhdGUuY2FsbCh0aGlzLCBvcHRzLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIEdaSVBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgR3ppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICBHemlwLnByb3RvdHlwZS5wID0gZnVuY3Rpb24gKGMsIGYpIHtcbiAgICAgICAgdGhpcy5jLnAoYyk7XG4gICAgICAgIHRoaXMubCArPSBjLmxlbmd0aDtcbiAgICAgICAgdmFyIHJhdyA9IGRvcHQoYywgdGhpcy5vLCB0aGlzLnYgJiYgZ3pobCh0aGlzLm8pLCBmICYmIDgsICFmKTtcbiAgICAgICAgaWYgKHRoaXMudilcbiAgICAgICAgICAgIGd6aChyYXcsIHRoaXMubyksIHRoaXMudiA9IDA7XG4gICAgICAgIGlmIChmKVxuICAgICAgICAgICAgd2J5dGVzKHJhdywgcmF3Lmxlbmd0aCAtIDgsIHRoaXMuYy5kKCkpLCB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gNCwgdGhpcy5sKTtcbiAgICAgICAgdGhpcy5vbmRhdGEocmF3LCBmKTtcbiAgICB9O1xuICAgIHJldHVybiBHemlwO1xufSgpKTtcbmV4cG9ydCB7IEd6aXAgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBHWklQIGNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0d6aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNHemlwKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJEZmx0LFxuICAgICAgICAgICAgZ3plLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBEZWZsYXRlLCBHemlwXTsgfVxuICAgICAgICBdLCB0aGlzLCBBc3luY0NtcFN0cm0uY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgR3ppcChldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA4KTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jR3ppcDtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0d6aXAgfTtcbmV4cG9ydCBmdW5jdGlvbiBnemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkRmbHQsXG4gICAgICAgIGd6ZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6aXBTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGd6aXBTeW5jKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pKTsgfSwgMiwgY2IpO1xufVxuLyoqXG4gKiBDb21wcmVzc2VzIGRhdGEgd2l0aCBHWklQXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBnemlwcGVkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGd6aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgYyA9IGNyYygpLCBsID0gZGF0YS5sZW5ndGg7XG4gICAgYy5wKGRhdGEpO1xuICAgIHZhciBkID0gZG9wdChkYXRhLCBvcHRzLCBnemhsKG9wdHMpLCA4KSwgcyA9IGQubGVuZ3RoO1xuICAgIHJldHVybiBnemgoZCwgb3B0cyksIHdieXRlcyhkLCBzIC0gOCwgYy5kKCkpLCB3Ynl0ZXMoZCwgcyAtIDQsIGwpLCBkO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgR1pJUCBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBHdW56aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdVTlpJUCBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBpbmZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEd1bnppcChjYikge1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBJbmZsYXRlLmNhbGwodGhpcywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBHVU5aSVBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgR3VuemlwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5lLmNhbGwodGhpcywgY2h1bmspO1xuICAgICAgICBpZiAodGhpcy52KSB7XG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMucC5sZW5ndGggPiAzID8gZ3pzKHRoaXMucCkgOiA0O1xuICAgICAgICAgICAgaWYgKHMgPj0gdGhpcy5wLmxlbmd0aCAmJiAhZmluYWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5wID0gdGhpcy5wLnN1YmFycmF5KHMpLCB0aGlzLnYgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPCA4KVxuICAgICAgICAgICAgICAgIGVycig2LCAnaW52YWxpZCBnemlwIGRhdGEnKTtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSgwLCAtOCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmVjZXNzYXJ5IHRvIHByZXZlbnQgVFMgZnJvbSB1c2luZyB0aGUgY2xvc3VyZSB2YWx1ZVxuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3Igd29ya2VyaXphdGlvbiB0byBmdW5jdGlvbiBjb3JyZWN0bHlcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuYy5jYWxsKHRoaXMsIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBHdW56aXA7XG59KCkpO1xuZXhwb3J0IHsgR3VuemlwIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0d1bnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBHVU5aSVAgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVmbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY0d1bnppcChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiSW5mbHQsXG4gICAgICAgICAgICBndXplLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlLCBHdW56aXBdOyB9XG4gICAgICAgIF0sIHRoaXMsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IEd1bnppcCgpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDkpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNHdW56aXA7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNHdW56aXAgfTtcbmV4cG9ydCBmdW5jdGlvbiBndW56aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiSW5mbHQsXG4gICAgICAgIGd1emUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtndW56aXBTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGd1bnppcFN5bmMoZXYuZGF0YVswXSkpOyB9LCAzLCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgR1pJUCBkYXRhXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3V0IFdoZXJlIHRvIHdyaXRlIHRoZSBkYXRhLiBHWklQIGFscmVhZHkgZW5jb2RlcyB0aGUgb3V0cHV0IHNpemUsIHNvIHByb3ZpZGluZyB0aGlzIGRvZXNuJ3Qgc2F2ZSBtZW1vcnkuXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGd1bnppcFN5bmMoZGF0YSwgb3V0KSB7XG4gICAgcmV0dXJuIGluZmx0KGRhdGEuc3ViYXJyYXkoZ3pzKGRhdGEpLCAtOCksIG91dCB8fCBuZXcgdTgoZ3psKGRhdGEpKSk7XG59XG4vKipcbiAqIFN0cmVhbWluZyBabGliIGNvbXByZXNzaW9uXG4gKi9cbnZhciBabGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFpsaWIob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5jID0gYWRsZXIoKTtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgRGVmbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgemxpYmJlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBabGliLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBEZWZsYXRlLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIFpsaWIucHJvdG90eXBlLnAgPSBmdW5jdGlvbiAoYywgZikge1xuICAgICAgICB0aGlzLmMucChjKTtcbiAgICAgICAgdmFyIHJhdyA9IGRvcHQoYywgdGhpcy5vLCB0aGlzLnYgJiYgMiwgZiAmJiA0LCAhZik7XG4gICAgICAgIGlmICh0aGlzLnYpXG4gICAgICAgICAgICB6bGgocmF3LCB0aGlzLm8pLCB0aGlzLnYgPSAwO1xuICAgICAgICBpZiAoZilcbiAgICAgICAgICAgIHdieXRlcyhyYXcsIHJhdy5sZW5ndGggLSA0LCB0aGlzLmMuZCgpKTtcbiAgICAgICAgdGhpcy5vbmRhdGEocmF3LCBmKTtcbiAgICB9O1xuICAgIHJldHVybiBabGliO1xufSgpKTtcbmV4cG9ydCB7IFpsaWIgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBabGliIGNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY1psaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNabGliKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJEZmx0LFxuICAgICAgICAgICAgemxlLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBEZWZsYXRlLCBabGliXTsgfVxuICAgICAgICBdLCB0aGlzLCBBc3luY0NtcFN0cm0uY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgWmxpYihldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY1psaWI7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNabGliIH07XG5leHBvcnQgZnVuY3Rpb24gemxpYihkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJEZmx0LFxuICAgICAgICB6bGUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bGliU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZih6bGliU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDQsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3MgZGF0YSB3aXRoIFpsaWJcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIHpsaWItY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6bGliU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKVxuICAgICAgICBvcHRzID0ge307XG4gICAgdmFyIGEgPSBhZGxlcigpO1xuICAgIGEucChkYXRhKTtcbiAgICB2YXIgZCA9IGRvcHQoZGF0YSwgb3B0cywgMiwgNCk7XG4gICAgcmV0dXJuIHpsaChkLCBvcHRzKSwgd2J5dGVzKGQsIGQubGVuZ3RoIC0gNCwgYS5kKCkpLCBkO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgWmxpYiBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBVbnpsaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFpsaWIgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBpbmZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVuemxpYihjYikge1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBJbmZsYXRlLmNhbGwodGhpcywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB1bnpsaWJiZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgVW56bGliLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5lLmNhbGwodGhpcywgY2h1bmspO1xuICAgICAgICBpZiAodGhpcy52KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA8IDIgJiYgIWZpbmFsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSgyKSwgdGhpcy52ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnAubGVuZ3RoIDwgNClcbiAgICAgICAgICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhJyk7XG4gICAgICAgICAgICB0aGlzLnAgPSB0aGlzLnAuc3ViYXJyYXkoMCwgLTQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5lY2Vzc2FyeSB0byBwcmV2ZW50IFRTIGZyb20gdXNpbmcgdGhlIGNsb3N1cmUgdmFsdWVcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIHdvcmtlcml6YXRpb24gdG8gZnVuY3Rpb24gY29ycmVjdGx5XG4gICAgICAgIEluZmxhdGUucHJvdG90eXBlLmMuY2FsbCh0aGlzLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gVW56bGliO1xufSgpKTtcbmV4cG9ydCB7IFVuemxpYiB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIFpsaWIgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNVbnpsaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgWmxpYiBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNVbnpsaWIoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkluZmx0LFxuICAgICAgICAgICAgenVsZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgSW5mbGF0ZSwgVW56bGliXTsgfVxuICAgICAgICBdLCB0aGlzLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBVbnpsaWIoKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCAxMSk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY1VuemxpYjtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1VuemxpYiB9O1xuZXhwb3J0IGZ1bmN0aW9uIHVuemxpYihkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdCxcbiAgICAgICAgenVsZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW3VuemxpYlN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYodW56bGliU3luYyhldi5kYXRhWzBdLCBndTgoZXYuZGF0YVsxXSkpKTsgfSwgNSwgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIFpsaWIgZGF0YVxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gU2F2ZXMgbWVtb3J5IGlmIHlvdSBrbm93IHRoZSBkZWNvbXByZXNzZWQgc2l6ZSBhbmQgcHJvdmlkZSBhbiBvdXRwdXQgYnVmZmVyIG9mIHRoYXQgbGVuZ3RoLlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnpsaWJTeW5jKGRhdGEsIG91dCkge1xuICAgIHJldHVybiBpbmZsdCgoemx2KGRhdGEpLCBkYXRhLnN1YmFycmF5KDIsIC00KSksIG91dCk7XG59XG4vLyBEZWZhdWx0IGFsZ29yaXRobSBmb3IgY29tcHJlc3Npb24gKHVzZWQgYmVjYXVzZSBoYXZpbmcgYSBrbm93biBvdXRwdXQgc2l6ZSBhbGxvd3MgZmFzdGVyIGRlY29tcHJlc3Npb24pXG5leHBvcnQgeyBnemlwIGFzIGNvbXByZXNzLCBBc3luY0d6aXAgYXMgQXN5bmNDb21wcmVzcyB9O1xuLy8gRGVmYXVsdCBhbGdvcml0aG0gZm9yIGNvbXByZXNzaW9uICh1c2VkIGJlY2F1c2UgaGF2aW5nIGEga25vd24gb3V0cHV0IHNpemUgYWxsb3dzIGZhc3RlciBkZWNvbXByZXNzaW9uKVxuZXhwb3J0IHsgZ3ppcFN5bmMgYXMgY29tcHJlc3NTeW5jLCBHemlwIGFzIENvbXByZXNzIH07XG4vKipcbiAqIFN0cmVhbWluZyBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBEZWNvbXByZXNzID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlY29tcHJlc3NlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERlY29tcHJlc3MoY2IpIHtcbiAgICAgICAgdGhpcy5HID0gR3VuemlwO1xuICAgICAgICB0aGlzLkkgPSBJbmZsYXRlO1xuICAgICAgICB0aGlzLlogPSBVbnpsaWI7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29tcHJlc3NlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAoIXRoaXMucykge1xuICAgICAgICAgICAgaWYgKHRoaXMucCAmJiB0aGlzLnAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBuZXcgdTgodGhpcy5wLmxlbmd0aCArIGNodW5rLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbi5zZXQodGhpcy5wKSwgbi5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucCA9IGNodW5rO1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBjYiA9IGZ1bmN0aW9uICgpIHsgX3RoaXNfMS5vbmRhdGEuYXBwbHkoX3RoaXNfMSwgYXJndW1lbnRzKTsgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnMgPSAodGhpcy5wWzBdID09IDMxICYmIHRoaXMucFsxXSA9PSAxMzkgJiYgdGhpcy5wWzJdID09IDgpXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IHRoaXMuRyhjYilcbiAgICAgICAgICAgICAgICAgICAgOiAoKHRoaXMucFswXSAmIDE1KSAhPSA4IHx8ICh0aGlzLnBbMF0gPj4gNCkgPiA3IHx8ICgodGhpcy5wWzBdIDw8IDggfCB0aGlzLnBbMV0pICUgMzEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgdGhpcy5JKGNiKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgdGhpcy5aKGNiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnMucHVzaCh0aGlzLnAsIGZpbmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnAgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucy5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVjb21wcmVzcztcbn0oKSk7XG5leHBvcnQgeyBEZWNvbXByZXNzIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNEZWNvbXByZXNzID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWNvbXByZXNzZWRcbiAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNEZWNvbXByZXNzKGNiKSB7XG4gICAgICAgIHRoaXMuRyA9IEFzeW5jR3VuemlwO1xuICAgICAgICB0aGlzLkkgPSBBc3luY0luZmxhdGU7XG4gICAgICAgIHRoaXMuWiA9IEFzeW5jVW56bGliO1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWNvbXByZXNzZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgQXN5bmNEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY0RlY29tcHJlc3M7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNEZWNvbXByZXNzIH07XG5leHBvcnQgZnVuY3Rpb24gZGVjb21wcmVzcyhkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiAoZGF0YVswXSA9PSAzMSAmJiBkYXRhWzFdID09IDEzOSAmJiBkYXRhWzJdID09IDgpXG4gICAgICAgID8gZ3VuemlwKGRhdGEsIG9wdHMsIGNiKVxuICAgICAgICA6ICgoZGF0YVswXSAmIDE1KSAhPSA4IHx8IChkYXRhWzBdID4+IDQpID4gNyB8fCAoKGRhdGFbMF0gPDwgOCB8IGRhdGFbMV0pICUgMzEpKVxuICAgICAgICAgICAgPyBpbmZsYXRlKGRhdGEsIG9wdHMsIGNiKVxuICAgICAgICAgICAgOiB1bnpsaWIoZGF0YSwgb3B0cywgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIGNvbXByZXNzZWQgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGF0YSwgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGZvcm1hdFxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gU2F2ZXMgbWVtb3J5IGlmIHlvdSBrbm93IHRoZSBkZWNvbXByZXNzZWQgc2l6ZSBhbmQgcHJvdmlkZSBhbiBvdXRwdXQgYnVmZmVyIG9mIHRoYXQgbGVuZ3RoLlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXByZXNzU3luYyhkYXRhLCBvdXQpIHtcbiAgICByZXR1cm4gKGRhdGFbMF0gPT0gMzEgJiYgZGF0YVsxXSA9PSAxMzkgJiYgZGF0YVsyXSA9PSA4KVxuICAgICAgICA/IGd1bnppcFN5bmMoZGF0YSwgb3V0KVxuICAgICAgICA6ICgoZGF0YVswXSAmIDE1KSAhPSA4IHx8IChkYXRhWzBdID4+IDQpID4gNyB8fCAoKGRhdGFbMF0gPDwgOCB8IGRhdGFbMV0pICUgMzEpKVxuICAgICAgICAgICAgPyBpbmZsYXRlU3luYyhkYXRhLCBvdXQpXG4gICAgICAgICAgICA6IHVuemxpYlN5bmMoZGF0YSwgb3V0KTtcbn1cbi8vIGZsYXR0ZW4gYSBkaXJlY3Rvcnkgc3RydWN0dXJlXG52YXIgZmx0biA9IGZ1bmN0aW9uIChkLCBwLCB0LCBvKSB7XG4gICAgZm9yICh2YXIgayBpbiBkKSB7XG4gICAgICAgIHZhciB2YWwgPSBkW2tdLCBuID0gcCArIGssIG9wID0gbztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgICAgIG9wID0gbXJnKG8sIHZhbFsxXSksIHZhbCA9IHZhbFswXTtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIHU4KVxuICAgICAgICAgICAgdFtuXSA9IFt2YWwsIG9wXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0W24gKz0gJy8nXSA9IFtuZXcgdTgoMCksIG9wXTtcbiAgICAgICAgICAgIGZsdG4odmFsLCBuLCB0LCBvKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vLyB0ZXh0IGVuY29kZXJcbnZhciB0ZSA9IHR5cGVvZiBUZXh0RW5jb2RlciAhPSAndW5kZWZpbmVkJyAmJiAvKiNfX1BVUkVfXyovIG5ldyBUZXh0RW5jb2RlcigpO1xuLy8gdGV4dCBkZWNvZGVyXG52YXIgdGQgPSB0eXBlb2YgVGV4dERlY29kZXIgIT0gJ3VuZGVmaW5lZCcgJiYgLyojX19QVVJFX18qLyBuZXcgVGV4dERlY29kZXIoKTtcbi8vIHRleHQgZGVjb2RlciBzdHJlYW1cbnZhciB0ZHMgPSAwO1xudHJ5IHtcbiAgICB0ZC5kZWNvZGUoZXQsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgIHRkcyA9IDE7XG59XG5jYXRjaCAoZSkgeyB9XG4vLyBkZWNvZGUgVVRGOFxudmFyIGR1dGY4ID0gZnVuY3Rpb24gKGQpIHtcbiAgICBmb3IgKHZhciByID0gJycsIGkgPSAwOzspIHtcbiAgICAgICAgdmFyIGMgPSBkW2krK107XG4gICAgICAgIHZhciBlYiA9IChjID4gMTI3KSArIChjID4gMjIzKSArIChjID4gMjM5KTtcbiAgICAgICAgaWYgKGkgKyBlYiA+IGQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIFtyLCBzbGMoZCwgaSAtIDEpXTtcbiAgICAgICAgaWYgKCFlYilcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgZWxzZSBpZiAoZWIgPT0gMykge1xuICAgICAgICAgICAgYyA9ICgoYyAmIDE1KSA8PCAxOCB8IChkW2krK10gJiA2MykgPDwgMTIgfCAoZFtpKytdICYgNjMpIDw8IDYgfCAoZFtpKytdICYgNjMpKSAtIDY1NTM2LFxuICAgICAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NiB8IChjID4+IDEwKSwgNTYzMjAgfCAoYyAmIDEwMjMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlYiAmIDEpXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAzMSkgPDwgNiB8IChkW2krK10gJiA2MykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAxNSkgPDwgMTIgfCAoZFtpKytdICYgNjMpIDw8IDYgfCAoZFtpKytdICYgNjMpKTtcbiAgICB9XG59O1xuLyoqXG4gKiBTdHJlYW1pbmcgVVRGLTggZGVjb2RpbmdcbiAqL1xudmFyIERlY29kZVVURjggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVURi04IGRlY29kaW5nIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlY29kZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWNvZGVVVEY4KGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIGlmICh0ZHMpXG4gICAgICAgICAgICB0aGlzLnQgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wID0gZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29kZWQgZnJvbSBVVEYtOCBiaW5hcnlcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVjb2RlVVRGOC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgZmluYWwgPSAhIWZpbmFsO1xuICAgICAgICBpZiAodGhpcy50KSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YSh0aGlzLnQuZGVjb2RlKGNodW5rLCB7IHN0cmVhbTogdHJ1ZSB9KSwgZmluYWwpO1xuICAgICAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudC5kZWNvZGUoKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB2YXIgZGF0ID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjaHVuay5sZW5ndGgpO1xuICAgICAgICBkYXQuc2V0KHRoaXMucCk7XG4gICAgICAgIGRhdC5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICB2YXIgX2EgPSBkdXRmOChkYXQpLCBjaCA9IF9hWzBdLCBucCA9IF9hWzFdO1xuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmIChucC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZXJyKDgpO1xuICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnAgPSBucDtcbiAgICAgICAgdGhpcy5vbmRhdGEoY2gsIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWNvZGVVVEY4O1xufSgpKTtcbmV4cG9ydCB7IERlY29kZVVURjggfTtcbi8qKlxuICogU3RyZWFtaW5nIFVURi04IGVuY29kaW5nXG4gKi9cbnZhciBFbmNvZGVVVEY4ID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVVEYtOCBkZWNvZGluZyBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBlbmNvZGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gRW5jb2RlVVRGOChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBlbmNvZGVkIHRvIFVURi04XG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBzdHJpbmcgZGF0YSB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEVuY29kZVVURjgucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIHRoaXMub25kYXRhKHN0clRvVTgoY2h1bmspLCB0aGlzLmQgPSBmaW5hbCB8fCBmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gRW5jb2RlVVRGODtcbn0oKSk7XG5leHBvcnQgeyBFbmNvZGVVVEY4IH07XG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIGludG8gYSBVaW50OEFycmF5IGZvciB1c2Ugd2l0aCBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIG1ldGhvZHNcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlbmNvZGVcbiAqIEBwYXJhbSBsYXRpbjEgV2hldGhlciBvciBub3QgdG8gaW50ZXJwcmV0IHRoZSBkYXRhIGFzIExhdGluLTEuIFRoaXMgc2hvdWxkXG4gKiAgICAgICAgICAgICAgIG5vdCBuZWVkIHRvIGJlIHRydWUgdW5sZXNzIGRlY29kaW5nIGEgYmluYXJ5IHN0cmluZy5cbiAqIEByZXR1cm5zIFRoZSBzdHJpbmcgZW5jb2RlZCBpbiBVVEYtOC9MYXRpbi0xIGJpbmFyeVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9VOChzdHIsIGxhdGluMSkge1xuICAgIGlmIChsYXRpbjEpIHtcbiAgICAgICAgdmFyIGFyXzEgPSBuZXcgdTgoc3RyLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYXJfMVtpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICByZXR1cm4gYXJfMTtcbiAgICB9XG4gICAgaWYgKHRlKVxuICAgICAgICByZXR1cm4gdGUuZW5jb2RlKHN0cik7XG4gICAgdmFyIGwgPSBzdHIubGVuZ3RoO1xuICAgIHZhciBhciA9IG5ldyB1OChzdHIubGVuZ3RoICsgKHN0ci5sZW5ndGggPj4gMSkpO1xuICAgIHZhciBhaSA9IDA7XG4gICAgdmFyIHcgPSBmdW5jdGlvbiAodikgeyBhclthaSsrXSA9IHY7IH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgaWYgKGFpICsgNSA+IGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG4gPSBuZXcgdTgoYWkgKyA4ICsgKChsIC0gaSkgPDwgMSkpO1xuICAgICAgICAgICAgbi5zZXQoYXIpO1xuICAgICAgICAgICAgYXIgPSBuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMTI4IHx8IGxhdGluMSlcbiAgICAgICAgICAgIHcoYyk7XG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxuICAgICAgICAgICAgdygxOTIgfCAoYyA+PiA2KSksIHcoMTI4IHwgKGMgJiA2MykpO1xuICAgICAgICBlbHNlIGlmIChjID4gNTUyOTUgJiYgYyA8IDU3MzQ0KVxuICAgICAgICAgICAgYyA9IDY1NTM2ICsgKGMgJiAxMDIzIDw8IDEwKSB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMTAyMyksXG4gICAgICAgICAgICAgICAgdygyNDAgfCAoYyA+PiAxOCkpLCB3KDEyOCB8ICgoYyA+PiAxMikgJiA2MykpLCB3KDEyOCB8ICgoYyA+PiA2KSAmIDYzKSksIHcoMTI4IHwgKGMgJiA2MykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3KDIyNCB8IChjID4+IDEyKSksIHcoMTI4IHwgKChjID4+IDYpICYgNjMpKSwgdygxMjggfCAoYyAmIDYzKSk7XG4gICAgfVxuICAgIHJldHVybiBzbGMoYXIsIDAsIGFpKTtcbn1cbi8qKlxuICogQ29udmVydHMgYSBVaW50OEFycmF5IHRvIGEgc3RyaW5nXG4gKiBAcGFyYW0gZGF0IFRoZSBkYXRhIHRvIGRlY29kZSB0byBzdHJpbmdcbiAqIEBwYXJhbSBsYXRpbjEgV2hldGhlciBvciBub3QgdG8gaW50ZXJwcmV0IHRoZSBkYXRhIGFzIExhdGluLTEuIFRoaXMgc2hvdWxkXG4gKiAgICAgICAgICAgICAgIG5vdCBuZWVkIHRvIGJlIHRydWUgdW5sZXNzIGVuY29kaW5nIHRvIGJpbmFyeSBzdHJpbmcuXG4gKiBAcmV0dXJucyBUaGUgb3JpZ2luYWwgVVRGLTgvTGF0aW4tMSBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0ckZyb21VOChkYXQsIGxhdGluMSkge1xuICAgIGlmIChsYXRpbjEpIHtcbiAgICAgICAgdmFyIHIgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXQubGVuZ3RoOyBpICs9IDE2Mzg0KVxuICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGRhdC5zdWJhcnJheShpLCBpICsgMTYzODQpKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRkKVxuICAgICAgICByZXR1cm4gdGQuZGVjb2RlKGRhdCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBfYSA9IGR1dGY4KGRhdCksIG91dCA9IF9hWzBdLCBleHQgPSBfYVsxXTtcbiAgICAgICAgaWYgKGV4dC5sZW5ndGgpXG4gICAgICAgICAgICBlcnIoOCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxufVxuO1xuLy8gZGVmbGF0ZSBiaXQgZmxhZ1xudmFyIGRiZiA9IGZ1bmN0aW9uIChsKSB7IHJldHVybiBsID09IDEgPyAzIDogbCA8IDYgPyAyIDogbCA9PSA5ID8gMSA6IDA7IH07XG4vLyBza2lwIGxvY2FsIHppcCBoZWFkZXJcbnZhciBzbHpoID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGIgKyAzMCArIGIyKGQsIGIgKyAyNikgKyBiMihkLCBiICsgMjgpOyB9O1xuLy8gcmVhZCB6aXAgaGVhZGVyXG52YXIgemggPSBmdW5jdGlvbiAoZCwgYiwgeikge1xuICAgIHZhciBmbmwgPSBiMihkLCBiICsgMjgpLCBmbiA9IHN0ckZyb21VOChkLnN1YmFycmF5KGIgKyA0NiwgYiArIDQ2ICsgZm5sKSwgIShiMihkLCBiICsgOCkgJiAyMDQ4KSksIGVzID0gYiArIDQ2ICsgZm5sLCBicyA9IGI0KGQsIGIgKyAyMCk7XG4gICAgdmFyIF9hID0geiAmJiBicyA9PSA0Mjk0OTY3Mjk1ID8gejY0ZShkLCBlcykgOiBbYnMsIGI0KGQsIGIgKyAyNCksIGI0KGQsIGIgKyA0MildLCBzYyA9IF9hWzBdLCBzdSA9IF9hWzFdLCBvZmYgPSBfYVsyXTtcbiAgICByZXR1cm4gW2IyKGQsIGIgKyAxMCksIHNjLCBzdSwgZm4sIGVzICsgYjIoZCwgYiArIDMwKSArIGIyKGQsIGIgKyAzMiksIG9mZl07XG59O1xuLy8gcmVhZCB6aXA2NCBleHRyYSBmaWVsZFxudmFyIHo2NGUgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAoOyBiMihkLCBiKSAhPSAxOyBiICs9IDQgKyBiMihkLCBiICsgMikpXG4gICAgICAgIDtcbiAgICByZXR1cm4gW2I4KGQsIGIgKyAxMiksIGI4KGQsIGIgKyA0KSwgYjgoZCwgYiArIDIwKV07XG59O1xuLy8gZXh0cmEgZmllbGQgbGVuZ3RoXG52YXIgZXhmbCA9IGZ1bmN0aW9uIChleCkge1xuICAgIHZhciBsZSA9IDA7XG4gICAgaWYgKGV4KSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZXgpIHtcbiAgICAgICAgICAgIHZhciBsID0gZXhba10ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGwgPiA2NTUzNSlcbiAgICAgICAgICAgICAgICBlcnIoOSk7XG4gICAgICAgICAgICBsZSArPSBsICsgNDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGU7XG59O1xuLy8gd3JpdGUgemlwIGhlYWRlclxudmFyIHd6aCA9IGZ1bmN0aW9uIChkLCBiLCBmLCBmbiwgdSwgYywgY2UsIGNvKSB7XG4gICAgdmFyIGZsID0gZm4ubGVuZ3RoLCBleCA9IGYuZXh0cmEsIGNvbCA9IGNvICYmIGNvLmxlbmd0aDtcbiAgICB2YXIgZXhsID0gZXhmbChleCk7XG4gICAgd2J5dGVzKGQsIGIsIGNlICE9IG51bGwgPyAweDIwMTRCNTAgOiAweDQwMzRCNTApLCBiICs9IDQ7XG4gICAgaWYgKGNlICE9IG51bGwpXG4gICAgICAgIGRbYisrXSA9IDIwLCBkW2IrK10gPSBmLm9zO1xuICAgIGRbYl0gPSAyMCwgYiArPSAyOyAvLyBzcGVjIGNvbXBsaWFuY2U/IHdoYXQncyB0aGF0P1xuICAgIGRbYisrXSA9IChmLmZsYWcgPDwgMSkgfCAoYyA8IDAgJiYgOCksIGRbYisrXSA9IHUgJiYgODtcbiAgICBkW2IrK10gPSBmLmNvbXByZXNzaW9uICYgMjU1LCBkW2IrK10gPSBmLmNvbXByZXNzaW9uID4+IDg7XG4gICAgdmFyIGR0ID0gbmV3IERhdGUoZi5tdGltZSA9PSBudWxsID8gRGF0ZS5ub3coKSA6IGYubXRpbWUpLCB5ID0gZHQuZ2V0RnVsbFllYXIoKSAtIDE5ODA7XG4gICAgaWYgKHkgPCAwIHx8IHkgPiAxMTkpXG4gICAgICAgIGVycigxMCk7XG4gICAgd2J5dGVzKGQsIGIsICh5IDw8IDI1KSB8ICgoZHQuZ2V0TW9udGgoKSArIDEpIDw8IDIxKSB8IChkdC5nZXREYXRlKCkgPDwgMTYpIHwgKGR0LmdldEhvdXJzKCkgPDwgMTEpIHwgKGR0LmdldE1pbnV0ZXMoKSA8PCA1KSB8IChkdC5nZXRTZWNvbmRzKCkgPj4+IDEpKSwgYiArPSA0O1xuICAgIGlmIChjICE9IC0xKSB7XG4gICAgICAgIHdieXRlcyhkLCBiLCBmLmNyYyk7XG4gICAgICAgIHdieXRlcyhkLCBiICsgNCwgYyA8IDAgPyAtYyAtIDIgOiBjKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA4LCBmLnNpemUpO1xuICAgIH1cbiAgICB3Ynl0ZXMoZCwgYiArIDEyLCBmbCk7XG4gICAgd2J5dGVzKGQsIGIgKyAxNCwgZXhsKSwgYiArPSAxNjtcbiAgICBpZiAoY2UgIT0gbnVsbCkge1xuICAgICAgICB3Ynl0ZXMoZCwgYiwgY29sKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA2LCBmLmF0dHJzKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyAxMCwgY2UpLCBiICs9IDE0O1xuICAgIH1cbiAgICBkLnNldChmbiwgYik7XG4gICAgYiArPSBmbDtcbiAgICBpZiAoZXhsKSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZXgpIHtcbiAgICAgICAgICAgIHZhciBleGYgPSBleFtrXSwgbCA9IGV4Zi5sZW5ndGg7XG4gICAgICAgICAgICB3Ynl0ZXMoZCwgYiwgK2spO1xuICAgICAgICAgICAgd2J5dGVzKGQsIGIgKyAyLCBsKTtcbiAgICAgICAgICAgIGQuc2V0KGV4ZiwgYiArIDQpLCBiICs9IDQgKyBsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wpXG4gICAgICAgIGQuc2V0KGNvLCBiKSwgYiArPSBjb2w7XG4gICAgcmV0dXJuIGI7XG59O1xuLy8gd3JpdGUgemlwIGZvb3RlciAoZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5KVxudmFyIHd6ZiA9IGZ1bmN0aW9uIChvLCBiLCBjLCBkLCBlKSB7XG4gICAgd2J5dGVzKG8sIGIsIDB4NjA1NEI1MCk7IC8vIHNraXAgZGlza1xuICAgIHdieXRlcyhvLCBiICsgOCwgYyk7XG4gICAgd2J5dGVzKG8sIGIgKyAxMCwgYyk7XG4gICAgd2J5dGVzKG8sIGIgKyAxMiwgZCk7XG4gICAgd2J5dGVzKG8sIGIgKyAxNiwgZSk7XG59O1xuLyoqXG4gKiBBIHBhc3MtdGhyb3VnaCBzdHJlYW0gdG8ga2VlcCBkYXRhIHVuY29tcHJlc3NlZCBpbiBhIFpJUCBhcmNoaXZlLlxuICovXG52YXIgWmlwUGFzc1Rocm91Z2ggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBhc3MtdGhyb3VnaCBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwUGFzc1Rocm91Z2goZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmMgPSBjcmMoKTtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvbiA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBhIGNodW5rIGFuZCBwdXNoZXMgdG8gdGhlIG91dHB1dCBzdHJlYW0uIFlvdSBjYW4gb3ZlcnJpZGUgdGhpc1xuICAgICAqIG1ldGhvZCBpbiBhIHN1YmNsYXNzIGZvciBjdXN0b20gYmVoYXZpb3IsIGJ1dCBieSBkZWZhdWx0IHRoaXMgcGFzc2VzXG4gICAgICogdGhlIGRhdGEgdGhyb3VnaC4gWW91IG11c3QgY2FsbCB0aGlzLm9uZGF0YShlcnIsIGNodW5rLCBmaW5hbCkgYXQgc29tZVxuICAgICAqIHBvaW50IGluIHRoaXMgbWV0aG9kLlxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHJvY2Vzc1xuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEobnVsbCwgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGFkZGVkLiBJZiB5b3UgYXJlIHN1YmNsYXNzaW5nIHRoaXMgd2l0aCBhIGN1c3RvbVxuICAgICAqIGNvbXByZXNzaW9uIGFsZ29yaXRobSwgbm90ZSB0aGF0IHlvdSBtdXN0IHB1c2ggZGF0YSBmcm9tIHRoZSBzb3VyY2VcbiAgICAgKiBmaWxlIG9ubHksIHByZS1jb21wcmVzc2lvbi5cbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIHRoaXMuYy5wKGNodW5rKTtcbiAgICAgICAgdGhpcy5zaXplICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgaWYgKGZpbmFsKVxuICAgICAgICAgICAgdGhpcy5jcmMgPSB0aGlzLmMuZCgpO1xuICAgICAgICB0aGlzLnByb2Nlc3MoY2h1bmssIGZpbmFsIHx8IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBaaXBQYXNzVGhyb3VnaDtcbn0oKSk7XG5leHBvcnQgeyBaaXBQYXNzVGhyb3VnaCB9O1xuLy8gSSBkb24ndCBleHRlbmQgYmVjYXVzZSBUeXBlU2NyaXB0IGV4dGVuc2lvbiBhZGRzIDFrQiBvZiBydW50aW1lIGJsb2F0XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXMuIFByZWZlciB1c2luZyBBc3luY1ppcERlZmxhdGVcbiAqIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAqL1xudmFyIFppcERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgc3RyZWFtIHRoYXQgY2FuIGJlIGFkZGVkIHRvIFpJUCBhcmNoaXZlc1xuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBUaGUgZmlsZW5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBkYXRhIHN0cmVhbVxuICAgICAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwRGVmbGF0ZShmaWxlbmFtZSwgb3B0cykge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICghb3B0cylcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2guY2FsbCh0aGlzLCBmaWxlbmFtZSk7XG4gICAgICAgIHRoaXMuZCA9IG5ldyBEZWZsYXRlKG9wdHMsIGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpc18xLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29tcHJlc3Npb24gPSA4O1xuICAgICAgICB0aGlzLmZsYWcgPSBkYmYob3B0cy5sZXZlbCk7XG4gICAgfVxuICAgIFppcERlZmxhdGUucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmQucHVzaChjaHVuaywgZmluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlLCBudWxsLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFppcERlZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBaaXBEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IFppcERlZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXNcbiAqL1xudmFyIEFzeW5jWmlwRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY1ppcERlZmxhdGUoZmlsZW5hbWUsIG9wdHMpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAoIW9wdHMpXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLmNhbGwodGhpcywgZmlsZW5hbWUpO1xuICAgICAgICB0aGlzLmQgPSBuZXcgQXN5bmNEZWZsYXRlKG9wdHMsIGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgIF90aGlzXzEub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gODtcbiAgICAgICAgdGhpcy5mbGFnID0gZGJmKG9wdHMubGV2ZWwpO1xuICAgICAgICB0aGlzLnRlcm1pbmF0ZSA9IHRoaXMuZC50ZXJtaW5hdGU7XG4gICAgfVxuICAgIEFzeW5jWmlwRGVmbGF0ZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5kLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEFzeW5jWmlwRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jWmlwRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1ppcERlZmxhdGUgfTtcbi8vIFRPRE86IEJldHRlciB0cmVlIHNoYWtpbmdcbi8qKlxuICogQSB6aXBwYWJsZSBhcmNoaXZlIHRvIHdoaWNoIGZpbGVzIGNhbiBpbmNyZW1lbnRhbGx5IGJlIGFkZGVkXG4gKi9cbnZhciBaaXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBaSVAgYXJjaGl2ZSB0byB3aGljaCBmaWxlcyBjYW4gYmUgYWRkZWRcbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBmb3IgdGhlIGdlbmVyYXRlZCBaSVAgYXJjaGl2ZVxuICAgICAqICAgICAgICAgICBpcyBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXAoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdGhpcy51ID0gW107XG4gICAgICAgIHRoaXMuZCA9IDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBmaWxlIHRvIHRoZSBaSVAgYXJjaGl2ZVxuICAgICAqIEBwYXJhbSBmaWxlIFRoZSBmaWxlIHN0cmVhbSB0byBhZGRcbiAgICAgKi9cbiAgICBaaXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgLy8gZmluaXNoaW5nIG9yIGZpbmlzaGVkXG4gICAgICAgIGlmICh0aGlzLmQgJiAyKVxuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDQgKyAodGhpcy5kICYgMSkgKiA4LCAwLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmID0gc3RyVG9VOChmaWxlLmZpbGVuYW1lKSwgZmxfMSA9IGYubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbSA9IGZpbGUuY29tbWVudCwgbyA9IGNvbSAmJiBzdHJUb1U4KGNvbSk7XG4gICAgICAgICAgICB2YXIgdSA9IGZsXzEgIT0gZmlsZS5maWxlbmFtZS5sZW5ndGggfHwgKG8gJiYgKGNvbS5sZW5ndGggIT0gby5sZW5ndGgpKTtcbiAgICAgICAgICAgIHZhciBobF8xID0gZmxfMSArIGV4ZmwoZmlsZS5leHRyYSkgKyAzMDtcbiAgICAgICAgICAgIGlmIChmbF8xID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDExLCAwLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgdmFyIGhlYWRlciA9IG5ldyB1OChobF8xKTtcbiAgICAgICAgICAgIHd6aChoZWFkZXIsIDAsIGZpbGUsIGYsIHUsIC0xKTtcbiAgICAgICAgICAgIHZhciBjaGtzXzEgPSBbaGVhZGVyXTtcbiAgICAgICAgICAgIHZhciBwQWxsXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGtzXzIgPSBjaGtzXzE7IF9pIDwgY2hrc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hrID0gY2hrc18yW19pXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEobnVsbCwgY2hrLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoa3NfMSA9IFtdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciB0cl8xID0gdGhpcy5kO1xuICAgICAgICAgICAgdGhpcy5kID0gMDtcbiAgICAgICAgICAgIHZhciBpbmRfMSA9IHRoaXMudS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdWZfMSA9IG1yZyhmaWxlLCB7XG4gICAgICAgICAgICAgICAgZjogZixcbiAgICAgICAgICAgICAgICB1OiB1LFxuICAgICAgICAgICAgICAgIG86IG8sXG4gICAgICAgICAgICAgICAgdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS50ZXJtaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwQWxsXzEoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBueHQgPSBfdGhpc18xLnVbaW5kXzEgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChueHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnh0LnIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc18xLmQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyXzEgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGNsXzEgPSAwO1xuICAgICAgICAgICAgZmlsZS5vbmRhdGEgPSBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xfMSArPSBkYXQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjaGtzXzEucHVzaChkYXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZCA9IG5ldyB1OCgxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDAsIDB4ODA3NEI1MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDQsIGZpbGUuY3JjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgOCwgY2xfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDEyLCBmaWxlLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hrc18xLnB1c2goZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdWZfMS5jID0gY2xfMSwgdWZfMS5iID0gaGxfMSArIGNsXzEgKyAxNiwgdWZfMS5jcmMgPSBmaWxlLmNyYywgdWZfMS5zaXplID0gZmlsZS5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWZfMS5yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cl8xID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0cl8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgcEFsbF8xKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudS5wdXNoKHVmXzEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFbmRzIHRoZSBwcm9jZXNzIG9mIGFkZGluZyBmaWxlcyBhbmQgcHJlcGFyZXMgdG8gZW1pdCB0aGUgZmluYWwgY2h1bmtzLlxuICAgICAqIFRoaXMgKm11c3QqIGJlIGNhbGxlZCBhZnRlciBhZGRpbmcgYWxsIGRlc2lyZWQgZmlsZXMgZm9yIHRoZSByZXN1bHRpbmdcbiAgICAgKiBaSVAgZmlsZSB0byB3b3JrIHByb3Blcmx5LlxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmQgJiAyKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlcnIoNCArICh0aGlzLmQgJiAxKSAqIDgsIDAsIDEpLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgdGhpcy5lKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudS5wdXNoKHtcbiAgICAgICAgICAgICAgICByOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKF90aGlzXzEuZCAmIDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBfdGhpc18xLnUuc3BsaWNlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5lKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0OiBmdW5jdGlvbiAoKSB7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmQgPSAzO1xuICAgIH07XG4gICAgWmlwLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYnQgPSAwLCBsID0gMCwgdGwgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfYVtfaV07XG4gICAgICAgICAgICB0bCArPSA0NiArIGYuZi5sZW5ndGggKyBleGZsKGYuZXh0cmEpICsgKGYubyA/IGYuby5sZW5ndGggOiAwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3V0ID0gbmV3IHU4KHRsICsgMjIpO1xuICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdGhpcy51OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfY1tfYl07XG4gICAgICAgICAgICB3emgob3V0LCBidCwgZiwgZi5mLCBmLnUsIC1mLmMgLSAyLCBsLCBmLm8pO1xuICAgICAgICAgICAgYnQgKz0gNDYgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKSArIChmLm8gPyBmLm8ubGVuZ3RoIDogMCksIGwgKz0gZi5iO1xuICAgICAgICB9XG4gICAgICAgIHd6ZihvdXQsIGJ0LCB0aGlzLnUubGVuZ3RoLCB0bCwgbCk7XG4gICAgICAgIHRoaXMub25kYXRhKG51bGwsIG91dCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZCA9IDI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIG1ldGhvZCB0byB0ZXJtaW5hdGUgYW55IGludGVybmFsIHdvcmtlcnMgdXNlZCBieSB0aGUgc3RyZWFtLiBTdWJzZXF1ZW50XG4gICAgICogY2FsbHMgdG8gYWRkKCkgd2lsbCBmYWlsLlxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfYVtfaV07XG4gICAgICAgICAgICBmLnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmQgPSAyO1xuICAgIH07XG4gICAgcmV0dXJuIFppcDtcbn0oKSk7XG5leHBvcnQgeyBaaXAgfTtcbmV4cG9ydCBmdW5jdGlvbiB6aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICB2YXIgciA9IHt9O1xuICAgIGZsdG4oZGF0YSwgJycsIHIsIG9wdHMpO1xuICAgIHZhciBrID0gT2JqZWN0LmtleXMocik7XG4gICAgdmFyIGxmdCA9IGsubGVuZ3RoLCBvID0gMCwgdG90ID0gMDtcbiAgICB2YXIgc2xmdCA9IGxmdCwgZmlsZXMgPSBuZXcgQXJyYXkobGZ0KTtcbiAgICB2YXIgdGVybSA9IFtdO1xuICAgIHZhciB0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlcm0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB0ZXJtW2ldKCk7XG4gICAgfTtcbiAgICB2YXIgY2JkID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgbXQoZnVuY3Rpb24gKCkgeyBjYihhLCBiKTsgfSk7XG4gICAgfTtcbiAgICBtdChmdW5jdGlvbiAoKSB7IGNiZCA9IGNiOyB9KTtcbiAgICB2YXIgY2JmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3V0ID0gbmV3IHU4KHRvdCArIDIyKSwgb2UgPSBvLCBjZGwgPSB0b3QgLSBvO1xuICAgICAgICB0b3QgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsZnQ7ICsraSkge1xuICAgICAgICAgICAgdmFyIGYgPSBmaWxlc1tpXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBmLmMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHd6aChvdXQsIHRvdCwgZiwgZi5mLCBmLnUsIGwpO1xuICAgICAgICAgICAgICAgIHZhciBiYWRkID0gMzAgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9jID0gdG90ICsgYmFkZDtcbiAgICAgICAgICAgICAgICBvdXQuc2V0KGYuYywgbG9jKTtcbiAgICAgICAgICAgICAgICB3emgob3V0LCBvLCBmLCBmLmYsIGYudSwgbCwgdG90LCBmLm0pLCBvICs9IDE2ICsgYmFkZCArIChmLm0gPyBmLm0ubGVuZ3RoIDogMCksIHRvdCA9IGxvYyArIGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3pmKG91dCwgbywgZmlsZXMubGVuZ3RoLCBjZGwsIG9lKTtcbiAgICAgICAgY2JkKG51bGwsIG91dCk7XG4gICAgfTtcbiAgICBpZiAoIWxmdClcbiAgICAgICAgY2JmKCk7XG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgZm4gPSBrW2ldO1xuICAgICAgICB2YXIgX2EgPSByW2ZuXSwgZmlsZSA9IF9hWzBdLCBwID0gX2FbMV07XG4gICAgICAgIHZhciBjID0gY3JjKCksIHNpemUgPSBmaWxlLmxlbmd0aDtcbiAgICAgICAgYy5wKGZpbGUpO1xuICAgICAgICB2YXIgZiA9IHN0clRvVTgoZm4pLCBzID0gZi5sZW5ndGg7XG4gICAgICAgIHZhciBjb20gPSBwLmNvbW1lbnQsIG0gPSBjb20gJiYgc3RyVG9VOChjb20pLCBtcyA9IG0gJiYgbS5sZW5ndGg7XG4gICAgICAgIHZhciBleGwgPSBleGZsKHAuZXh0cmEpO1xuICAgICAgICB2YXIgY29tcHJlc3Npb24gPSBwLmxldmVsID09IDAgPyAwIDogODtcbiAgICAgICAgdmFyIGNibCA9IGZ1bmN0aW9uIChlLCBkKSB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIHRBbGwoKTtcbiAgICAgICAgICAgICAgICBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZpbGVzW2ldID0gbXJnKHAsIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JjOiBjLmQoKSxcbiAgICAgICAgICAgICAgICAgICAgYzogZCxcbiAgICAgICAgICAgICAgICAgICAgZjogZixcbiAgICAgICAgICAgICAgICAgICAgbTogbSxcbiAgICAgICAgICAgICAgICAgICAgdTogcyAhPSBmbi5sZW5ndGggfHwgKG0gJiYgKGNvbS5sZW5ndGggIT0gbXMpKSxcbiAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbyArPSAzMCArIHMgKyBleGwgKyBsO1xuICAgICAgICAgICAgICAgIHRvdCArPSA3NiArIDIgKiAocyArIGV4bCkgKyAobXMgfHwgMCkgKyBsO1xuICAgICAgICAgICAgICAgIGlmICghLS1sZnQpXG4gICAgICAgICAgICAgICAgICAgIGNiZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAocyA+IDY1NTM1KVxuICAgICAgICAgICAgY2JsKGVycigxMSwgMCwgMSksIG51bGwpO1xuICAgICAgICBpZiAoIWNvbXByZXNzaW9uKVxuICAgICAgICAgICAgY2JsKG51bGwsIGZpbGUpO1xuICAgICAgICBlbHNlIGlmIChzaXplIDwgMTYwMDAwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNibChudWxsLCBkZWZsYXRlU3luYyhmaWxlLCBwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNibChlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZXJtLnB1c2goZGVmbGF0ZShmaWxlLCBwLCBjYmwpKTtcbiAgICB9O1xuICAgIC8vIENhbm5vdCB1c2UgbGZ0IGJlY2F1c2UgaXQgY2FuIGRlY3JlYXNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGZ0OyArK2kpIHtcbiAgICAgICAgX2xvb3BfMShpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRBbGw7XG59XG4vKipcbiAqIFN5bmNocm9ub3VzbHkgY3JlYXRlcyBhIFpJUCBmaWxlLiBQcmVmZXIgdXNpbmcgYHppcGAgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICogd2l0aCBtb3JlIHRoYW4gb25lIGZpbGUuXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGlyZWN0b3J5IHN0cnVjdHVyZSBmb3IgdGhlIFpJUCBhcmNoaXZlXG4gKiBAcGFyYW0gb3B0cyBUaGUgbWFpbiBvcHRpb25zLCBtZXJnZWQgd2l0aCBwZXItZmlsZSBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZ2VuZXJhdGVkIFpJUCBhcmNoaXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgciA9IHt9O1xuICAgIHZhciBmaWxlcyA9IFtdO1xuICAgIGZsdG4oZGF0YSwgJycsIHIsIG9wdHMpO1xuICAgIHZhciBvID0gMDtcbiAgICB2YXIgdG90ID0gMDtcbiAgICBmb3IgKHZhciBmbiBpbiByKSB7XG4gICAgICAgIHZhciBfYSA9IHJbZm5dLCBmaWxlID0gX2FbMF0sIHAgPSBfYVsxXTtcbiAgICAgICAgdmFyIGNvbXByZXNzaW9uID0gcC5sZXZlbCA9PSAwID8gMCA6IDg7XG4gICAgICAgIHZhciBmID0gc3RyVG9VOChmbiksIHMgPSBmLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvbSA9IHAuY29tbWVudCwgbSA9IGNvbSAmJiBzdHJUb1U4KGNvbSksIG1zID0gbSAmJiBtLmxlbmd0aDtcbiAgICAgICAgdmFyIGV4bCA9IGV4ZmwocC5leHRyYSk7XG4gICAgICAgIGlmIChzID4gNjU1MzUpXG4gICAgICAgICAgICBlcnIoMTEpO1xuICAgICAgICB2YXIgZCA9IGNvbXByZXNzaW9uID8gZGVmbGF0ZVN5bmMoZmlsZSwgcCkgOiBmaWxlLCBsID0gZC5sZW5ndGg7XG4gICAgICAgIHZhciBjID0gY3JjKCk7XG4gICAgICAgIGMucChmaWxlKTtcbiAgICAgICAgZmlsZXMucHVzaChtcmcocCwge1xuICAgICAgICAgICAgc2l6ZTogZmlsZS5sZW5ndGgsXG4gICAgICAgICAgICBjcmM6IGMuZCgpLFxuICAgICAgICAgICAgYzogZCxcbiAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICBtOiBtLFxuICAgICAgICAgICAgdTogcyAhPSBmbi5sZW5ndGggfHwgKG0gJiYgKGNvbS5sZW5ndGggIT0gbXMpKSxcbiAgICAgICAgICAgIG86IG8sXG4gICAgICAgICAgICBjb21wcmVzc2lvbjogY29tcHJlc3Npb25cbiAgICAgICAgfSkpO1xuICAgICAgICBvICs9IDMwICsgcyArIGV4bCArIGw7XG4gICAgICAgIHRvdCArPSA3NiArIDIgKiAocyArIGV4bCkgKyAobXMgfHwgMCkgKyBsO1xuICAgIH1cbiAgICB2YXIgb3V0ID0gbmV3IHU4KHRvdCArIDIyKSwgb2UgPSBvLCBjZGwgPSB0b3QgLSBvO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGYgPSBmaWxlc1tpXTtcbiAgICAgICAgd3poKG91dCwgZi5vLCBmLCBmLmYsIGYudSwgZi5jLmxlbmd0aCk7XG4gICAgICAgIHZhciBiYWRkID0gMzAgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKTtcbiAgICAgICAgb3V0LnNldChmLmMsIGYubyArIGJhZGQpO1xuICAgICAgICB3emgob3V0LCBvLCBmLCBmLmYsIGYudSwgZi5jLmxlbmd0aCwgZi5vLCBmLm0pLCBvICs9IDE2ICsgYmFkZCArIChmLm0gPyBmLm0ubGVuZ3RoIDogMCk7XG4gICAgfVxuICAgIHd6ZihvdXQsIG8sIGZpbGVzLmxlbmd0aCwgY2RsLCBvZSk7XG4gICAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3RyZWFtaW5nIHBhc3MtdGhyb3VnaCBkZWNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXNcbiAqL1xudmFyIFVuemlwUGFzc1Rocm91Z2ggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVW56aXBQYXNzVGhyb3VnaCgpIHtcbiAgICB9XG4gICAgVW56aXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBkYXRhLCBmaW5hbCk7XG4gICAgfTtcbiAgICBVbnppcFBhc3NUaHJvdWdoLmNvbXByZXNzaW9uID0gMDtcbiAgICByZXR1cm4gVW56aXBQYXNzVGhyb3VnaDtcbn0oKSk7XG5leHBvcnQgeyBVbnppcFBhc3NUaHJvdWdoIH07XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlcy4gUHJlZmVyIEFzeW5jWmlwSW5mbGF0ZSBmb3JcbiAqIGJldHRlciBwZXJmb3JtYW5jZS5cbiAqL1xudmFyIFVuemlwSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBkZWNvbXByZXNzaW9uIHRoYXQgY2FuIGJlIHVzZWQgaW4gWklQIGFyY2hpdmVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gVW56aXBJbmZsYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIHRoaXMuaSA9IG5ldyBJbmZsYXRlKGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpc18xLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFVuemlwSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5pLnB1c2goZGF0YSwgZmluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlLCBudWxsLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFVuemlwSW5mbGF0ZS5jb21wcmVzc2lvbiA9IDg7XG4gICAgcmV0dXJuIFVuemlwSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBVbnppcEluZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlc1xuICovXG52YXIgQXN5bmNVbnppcEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgZGVjb21wcmVzc2lvbiB0aGF0IGNhbiBiZSB1c2VkIGluIFpJUCBhcmNoaXZlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jVW56aXBJbmZsYXRlKF8sIHN6KSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKHN6IDwgMzIwMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmkgPSBuZXcgSW5mbGF0ZShmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIF90aGlzXzEub25kYXRhKG51bGwsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmkgPSBuZXcgQXN5bmNJbmZsYXRlKGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpc18xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRlcm1pbmF0ZSA9IHRoaXMuaS50ZXJtaW5hdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXN5bmNVbnppcEluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgZmluYWwpIHtcbiAgICAgICAgaWYgKHRoaXMuaS50ZXJtaW5hdGUpXG4gICAgICAgICAgICBkYXRhID0gc2xjKGRhdGEsIDApO1xuICAgICAgICB0aGlzLmkucHVzaChkYXRhLCBmaW5hbCk7XG4gICAgfTtcbiAgICBBc3luY1VuemlwSW5mbGF0ZS5jb21wcmVzc2lvbiA9IDg7XG4gICAgcmV0dXJuIEFzeW5jVW56aXBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jVW56aXBJbmZsYXRlIH07XG4vKipcbiAqIEEgWklQIGFyY2hpdmUgZGVjb21wcmVzc2lvbiBzdHJlYW0gdGhhdCBlbWl0cyBmaWxlcyBhcyB0aGV5IGFyZSBkaXNjb3ZlcmVkXG4gKi9cbnZhciBVbnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgWklQIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGEgZmlsZSBpbiB0aGUgWklQIGFyY2hpdmUgaXMgZm91bmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVbnppcChjYikge1xuICAgICAgICB0aGlzLm9uZmlsZSA9IGNiO1xuICAgICAgICB0aGlzLmsgPSBbXTtcbiAgICAgICAgdGhpcy5vID0ge1xuICAgICAgICAgICAgMDogVW56aXBQYXNzVGhyb3VnaFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnAgPSBldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgdW56aXBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgVW56aXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm9uZmlsZSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKCF0aGlzLnApXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIGlmICh0aGlzLmMgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4odGhpcy5jLCBjaHVuay5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIHRvQWRkID0gY2h1bmsuc3ViYXJyYXkoMCwgbGVuKTtcbiAgICAgICAgICAgIHRoaXMuYyAtPSBsZW47XG4gICAgICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgICAgIHRoaXMuZC5wdXNoKHRvQWRkLCAhdGhpcy5jKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmtbMF0ucHVzaCh0b0FkZCk7XG4gICAgICAgICAgICBjaHVuayA9IGNodW5rLnN1YmFycmF5KGxlbik7XG4gICAgICAgICAgICBpZiAoY2h1bmsubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmID0gMCwgaSA9IDAsIGlzID0gdm9pZCAwLCBidWYgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoIXRoaXMucC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgYnVmID0gY2h1bms7XG4gICAgICAgICAgICBlbHNlIGlmICghY2h1bmsubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGJ1ZiA9IHRoaXMucDtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1ZiA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBidWYuc2V0KHRoaXMucCksIGJ1Zi5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGwgPSBidWYubGVuZ3RoLCBvYyA9IHRoaXMuYywgYWRkID0gb2MgJiYgdGhpcy5kO1xuICAgICAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciBzaWcgPSBiNChidWYsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChzaWcgPT0gMHg0MDM0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGYgPSAxLCBpcyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNfMS5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmYgPSBiMihidWYsIGkgKyA2KSwgY21wXzEgPSBiMihidWYsIGkgKyA4KSwgdSA9IGJmICYgMjA0OCwgZGQgPSBiZiAmIDgsIGZubCA9IGIyKGJ1ZiwgaSArIDI2KSwgZXMgPSBiMihidWYsIGkgKyAyOCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsID4gaSArIDMwICsgZm5sICsgZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGtzXzMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5rLnVuc2hpZnQoY2hrc18zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjXzEgPSBiNChidWYsIGkgKyAxOCksIHN1XzEgPSBiNChidWYsIGkgKyAyMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm5fMSA9IHN0ckZyb21VOChidWYuc3ViYXJyYXkoaSArIDMwLCBpICs9IDMwICsgZm5sKSwgIXUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjXzEgPT0gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZGQgPyBbLTJdIDogejY0ZShidWYsIGkpLCBzY18xID0gX2FbMF0sIHN1XzEgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjXzEgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEuYyA9IHNjXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZF8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmbl8xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjbXBfMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVfMS5vbmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2NfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5vbmRhdGEobnVsbCwgZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHIgPSBfdGhpc18xLm9bY21wXzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdHIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV8xLm9uZGF0YShlcnIoMTQsICd1bmtub3duIGNvbXByZXNzaW9uIHR5cGUgJyArIGNtcF8xLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xID0gc2NfMSA8IDAgPyBuZXcgY3RyKGZuXzEpIDogbmV3IGN0cihmbl8xLCBzY18xLCBzdV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS5vbmRhdGEgPSBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7IGZpbGVfMS5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY2hrc180ID0gY2hrc18zOyBfaSA8IGNoa3NfNC5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ID0gY2hrc180W19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEucHVzaChkYXQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpc18xLmtbMF0gPT0gY2hrc18zICYmIF90aGlzXzEuYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc18xLmQgPSBkXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLnB1c2goZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRfMSAmJiBkXzEudGVybWluYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NfMSA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5zaXplID0gc2NfMSwgZmlsZV8xLm9yaWdpbmFsU2l6ZSA9IHN1XzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEub25maWxlKGZpbGVfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZyA9PSAweDgwNzRCNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzID0gaSArPSAxMiArIChvYyA9PSAtMiAmJiA4KSwgZiA9IDMsIHRoaXNfMS5jID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2lnID09IDB4MjAxNEI1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXMgPSBpIC09IDQsIGYgPSAzLCB0aGlzXzEuYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBsIC0gNDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlXzEgPSBfbG9vcF8yKCk7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlXzEgPT09IFwiYnJlYWtcIilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnAgPSBldDtcbiAgICAgICAgICAgIGlmIChvYyA8IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ID0gZiA/IGJ1Zi5zdWJhcnJheSgwLCBpcyAtIDEyIC0gKG9jID09IC0yICYmIDgpIC0gKGI0KGJ1ZiwgaXMgLSAxNikgPT0gMHg4MDc0QjUwICYmIDQpKSA6IGJ1Zi5zdWJhcnJheSgwLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoYWRkKVxuICAgICAgICAgICAgICAgICAgICBhZGQucHVzaChkYXQsICEhZik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtbKyhmID09IDIpXS5wdXNoKGRhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZiAmIDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChidWYuc3ViYXJyYXkoaSksIGZpbmFsKTtcbiAgICAgICAgICAgIHRoaXMucCA9IGJ1Zi5zdWJhcnJheShpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmMpXG4gICAgICAgICAgICAgICAgZXJyKDEzKTtcbiAgICAgICAgICAgIHRoaXMucCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGRlY29kZXIgd2l0aCB0aGUgc3RyZWFtLCBhbGxvd2luZyBmb3IgZmlsZXMgY29tcHJlc3NlZCB3aXRoXG4gICAgICogdGhlIGNvbXByZXNzaW9uIHR5cGUgcHJvdmlkZWQgdG8gYmUgZXhwYW5kZWQgY29ycmVjdGx5XG4gICAgICogQHBhcmFtIGRlY29kZXIgVGhlIGRlY29kZXIgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBVbnppcC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGVjb2Rlcikge1xuICAgICAgICB0aGlzLm9bZGVjb2Rlci5jb21wcmVzc2lvbl0gPSBkZWNvZGVyO1xuICAgIH07XG4gICAgcmV0dXJuIFVuemlwO1xufSgpKTtcbmV4cG9ydCB7IFVuemlwIH07XG52YXIgbXQgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgPT0gJ2Z1bmN0aW9uJyA/IHF1ZXVlTWljcm90YXNrIDogdHlwZW9mIHNldFRpbWVvdXQgPT0gJ2Z1bmN0aW9uJyA/IHNldFRpbWVvdXQgOiBmdW5jdGlvbiAoZm4pIHsgZm4oKTsgfTtcbmV4cG9ydCBmdW5jdGlvbiB1bnppcChkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHZhciB0ZXJtID0gW107XG4gICAgdmFyIHRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVybS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIHRlcm1baV0oKTtcbiAgICB9O1xuICAgIHZhciBmaWxlcyA9IHt9O1xuICAgIHZhciBjYmQgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBtdChmdW5jdGlvbiAoKSB7IGNiKGEsIGIpOyB9KTtcbiAgICB9O1xuICAgIG10KGZ1bmN0aW9uICgpIHsgY2JkID0gY2I7IH0pO1xuICAgIHZhciBlID0gZGF0YS5sZW5ndGggLSAyMjtcbiAgICBmb3IgKDsgYjQoZGF0YSwgZSkgIT0gMHg2MDU0QjUwOyAtLWUpIHtcbiAgICAgICAgaWYgKCFlIHx8IGRhdGEubGVuZ3RoIC0gZSA+IDY1NTU4KSB7XG4gICAgICAgICAgICBjYmQoZXJyKDEzLCAwLCAxKSwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gdEFsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICA7XG4gICAgdmFyIGxmdCA9IGIyKGRhdGEsIGUgKyA4KTtcbiAgICBpZiAobGZ0KSB7XG4gICAgICAgIHZhciBjID0gbGZ0O1xuICAgICAgICB2YXIgbyA9IGI0KGRhdGEsIGUgKyAxNik7XG4gICAgICAgIHZhciB6ID0gbyA9PSA0Mjk0OTY3Mjk1IHx8IGMgPT0gNjU1MzU7XG4gICAgICAgIGlmICh6KSB7XG4gICAgICAgICAgICB2YXIgemUgPSBiNChkYXRhLCBlIC0gMTIpO1xuICAgICAgICAgICAgeiA9IGI0KGRhdGEsIHplKSA9PSAweDYwNjRCNTA7XG4gICAgICAgICAgICBpZiAoeikge1xuICAgICAgICAgICAgICAgIGMgPSBsZnQgPSBiNChkYXRhLCB6ZSArIDMyKTtcbiAgICAgICAgICAgICAgICBvID0gYjQoZGF0YSwgemUgKyA0OCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZsdHIgPSBvcHRzICYmIG9wdHMuZmlsdGVyO1xuICAgICAgICB2YXIgX2xvb3BfMyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB6aChkYXRhLCBvLCB6KSwgY18xID0gX2FbMF0sIHNjID0gX2FbMV0sIHN1ID0gX2FbMl0sIGZuID0gX2FbM10sIG5vID0gX2FbNF0sIG9mZiA9IF9hWzVdLCBiID0gc2x6aChkYXRhLCBvZmYpO1xuICAgICAgICAgICAgbyA9IG5vO1xuICAgICAgICAgICAgdmFyIGNibCA9IGZ1bmN0aW9uIChlLCBkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdEFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzW2ZuXSA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1sZnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYmQobnVsbCwgZmlsZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIWZsdHIgfHwgZmx0cih7XG4gICAgICAgICAgICAgICAgbmFtZTogZm4sXG4gICAgICAgICAgICAgICAgc2l6ZTogc2MsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxTaXplOiBzdSxcbiAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogY18xXG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgIGlmICghY18xKVxuICAgICAgICAgICAgICAgICAgICBjYmwobnVsbCwgc2xjKGRhdGEsIGIsIGIgKyBzYykpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNfMSA9PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmZsID0gZGF0YS5zdWJhcnJheShiLCBiICsgc2MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2MgPCAzMjAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2JsKG51bGwsIGluZmxhdGVTeW5jKGluZmwsIG5ldyB1OChzdSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2JsKGUsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcm0ucHVzaChpbmZsYXRlKGluZmwsIHsgc2l6ZTogc3UgfSwgY2JsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2JsKGVycigxNCwgJ3Vua25vd24gY29tcHJlc3Npb24gdHlwZSAnICsgY18xLCAxKSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2JsKG51bGwsIG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGM7ICsraSkge1xuICAgICAgICAgICAgX2xvb3BfMyhpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGNiZChudWxsLCB7fSk7XG4gICAgcmV0dXJuIHRBbGw7XG59XG4vKipcbiAqIFN5bmNocm9ub3VzbHkgZGVjb21wcmVzc2VzIGEgWklQIGFyY2hpdmUuIFByZWZlciB1c2luZyBgdW56aXBgIGZvciBiZXR0ZXJcbiAqIHBlcmZvcm1hbmNlIHdpdGggbW9yZSB0aGFuIG9uZSBmaWxlLlxuICogQHBhcmFtIGRhdGEgVGhlIHJhdyBjb21wcmVzc2VkIFpJUCBmaWxlXG4gKiBAcGFyYW0gb3B0cyBUaGUgWklQIGV4dHJhY3Rpb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCBmaWxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdW56aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICB2YXIgZmlsZXMgPSB7fTtcbiAgICB2YXIgZSA9IGRhdGEubGVuZ3RoIC0gMjI7XG4gICAgZm9yICg7IGI0KGRhdGEsIGUpICE9IDB4NjA1NEI1MDsgLS1lKSB7XG4gICAgICAgIGlmICghZSB8fCBkYXRhLmxlbmd0aCAtIGUgPiA2NTU1OClcbiAgICAgICAgICAgIGVycigxMyk7XG4gICAgfVxuICAgIDtcbiAgICB2YXIgYyA9IGIyKGRhdGEsIGUgKyA4KTtcbiAgICBpZiAoIWMpXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB2YXIgbyA9IGI0KGRhdGEsIGUgKyAxNik7XG4gICAgdmFyIHogPSBvID09IDQyOTQ5NjcyOTUgfHwgYyA9PSA2NTUzNTtcbiAgICBpZiAoeikge1xuICAgICAgICB2YXIgemUgPSBiNChkYXRhLCBlIC0gMTIpO1xuICAgICAgICB6ID0gYjQoZGF0YSwgemUpID09IDB4NjA2NEI1MDtcbiAgICAgICAgaWYgKHopIHtcbiAgICAgICAgICAgIGMgPSBiNChkYXRhLCB6ZSArIDMyKTtcbiAgICAgICAgICAgIG8gPSBiNChkYXRhLCB6ZSArIDQ4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZmx0ciA9IG9wdHMgJiYgb3B0cy5maWx0ZXI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjOyArK2kpIHtcbiAgICAgICAgdmFyIF9hID0gemgoZGF0YSwgbywgeiksIGNfMiA9IF9hWzBdLCBzYyA9IF9hWzFdLCBzdSA9IF9hWzJdLCBmbiA9IF9hWzNdLCBubyA9IF9hWzRdLCBvZmYgPSBfYVs1XSwgYiA9IHNsemgoZGF0YSwgb2ZmKTtcbiAgICAgICAgbyA9IG5vO1xuICAgICAgICBpZiAoIWZsdHIgfHwgZmx0cih7XG4gICAgICAgICAgICBuYW1lOiBmbixcbiAgICAgICAgICAgIHNpemU6IHNjLFxuICAgICAgICAgICAgb3JpZ2luYWxTaXplOiBzdSxcbiAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjXzJcbiAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGlmICghY18yKVxuICAgICAgICAgICAgICAgIGZpbGVzW2ZuXSA9IHNsYyhkYXRhLCBiLCBiICsgc2MpO1xuICAgICAgICAgICAgZWxzZSBpZiAoY18yID09IDgpXG4gICAgICAgICAgICAgICAgZmlsZXNbZm5dID0gaW5mbGF0ZVN5bmMoZGF0YS5zdWJhcnJheShiLCBiICsgc2MpLCBuZXcgdTgoc3UpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlcnIoMTQsICd1bmtub3duIGNvbXByZXNzaW9uIHR5cGUgJyArIGNfMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbGVzO1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIHNpbXBsZS1oZWFkZXIvaGVhZGVyICovXG5cbi8qIVxuICogY3J4VG9aaXBcbiAqIENvcHlyaWdodCAoYykgMjAxMyBSb2IgV3UgPHJvYkByb2J3dS5ubD5cbiAqIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyeFRvWmlwKGJ1ZjogQnVmZmVyKSB7XG4gICAgZnVuY3Rpb24gY2FsY0xlbmd0aChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGVuZ3RoICs9IGEgPDwgMDtcbiAgICAgICAgbGVuZ3RoICs9IGIgPDwgODtcbiAgICAgICAgbGVuZ3RoICs9IGMgPDwgMTY7XG4gICAgICAgIGxlbmd0aCArPSBkIDw8IDI0ID4+PiAwO1xuICAgICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIDUwIDRiIDAzIDA0XG4gICAgLy8gVGhpcyBpcyBhY3R1YWxseSBhIHppcCBmaWxlXG4gICAgaWYgKGJ1ZlswXSA9PT0gODAgJiYgYnVmWzFdID09PSA3NSAmJiBidWZbMl0gPT09IDMgJiYgYnVmWzNdID09PSA0KSB7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgLy8gNDMgNzIgMzIgMzQgKENyMjQpXG4gICAgaWYgKGJ1ZlswXSAhPT0gNjcgfHwgYnVmWzFdICE9PSAxMTQgfHwgYnVmWzJdICE9PSA1MCB8fCBidWZbM10gIT09IDUyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGVhZGVyOiBEb2VzIG5vdCBzdGFydCB3aXRoIENyMjRcIik7XG4gICAgfVxuXG4gICAgLy8gMDIgMDAgMDAgMDBcbiAgICAvLyBvclxuICAgIC8vIDAzIDAwIDAwIDAwXG4gICAgY29uc3QgaXNWMyA9IGJ1Zls0XSA9PT0gMztcbiAgICBjb25zdCBpc1YyID0gYnVmWzRdID09PSAyO1xuXG4gICAgaWYgKCghaXNWMiAmJiAhaXNWMykgfHwgYnVmWzVdIHx8IGJ1Zls2XSB8fCBidWZbN10pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBjcnggZm9ybWF0IHZlcnNpb24gbnVtYmVyLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoaXNWMikge1xuICAgICAgICBjb25zdCBwdWJsaWNLZXlMZW5ndGggPSBjYWxjTGVuZ3RoKGJ1Zls4XSwgYnVmWzldLCBidWZbMTBdLCBidWZbMTFdKTtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlTGVuZ3RoID0gY2FsY0xlbmd0aChidWZbMTJdLCBidWZbMTNdLCBidWZbMTRdLCBidWZbMTVdKTtcblxuICAgICAgICAvLyAxNiA9IE1hZ2ljIG51bWJlciAoNCksIENSWCBmb3JtYXQgdmVyc2lvbiAoNCksIGxlbmd0aHMgKDJ4NClcbiAgICAgICAgY29uc3QgemlwU3RhcnRPZmZzZXQgPSAxNiArIHB1YmxpY0tleUxlbmd0aCArIHNpZ25hdHVyZUxlbmd0aDtcblxuICAgICAgICByZXR1cm4gYnVmLnN1YmFycmF5KHppcFN0YXJ0T2Zmc2V0LCBidWYubGVuZ3RoKTtcbiAgICB9XG4gICAgLy8gdjMgZm9ybWF0IGhhcyBoZWFkZXIgc2l6ZSBhbmQgdGhlbiBoZWFkZXJcbiAgICBjb25zdCBoZWFkZXJTaXplID0gY2FsY0xlbmd0aChidWZbOF0sIGJ1Zls5XSwgYnVmWzEwXSwgYnVmWzExXSk7XG4gICAgY29uc3QgemlwU3RhcnRPZmZzZXQgPSAxMiArIGhlYWRlclNpemU7XG5cbiAgICByZXR1cm4gYnVmLnN1YmFycmF5KHppcFN0YXJ0T2Zmc2V0LCBidWYubGVuZ3RoKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsSUFBTztBQUFQO0FBQUE7QUFBQTtBQUFBLElBQU8sbUJBQVE7QUFBQTtBQUFBOzs7QUNBZixJQUFPO0FBQVA7QUFBQTtBQUFBO0FBQUEsSUFBTyxxQkFBUTtBQUFBO0FBQUE7OztBQ0FmLElBV2E7QUFYYjtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFJTyxJQUFNLHVCQUF1QixhQUFhLG1CQUFVLHFCQUFZLHdCQUF3Qix3QkFBZTtBQUFBO0FBQUE7OztBQ1N2RyxTQUFTLElBQUksS0FBYSxVQUFnQyxDQUFDLEdBQUc7QUFDakUsU0FBTyxJQUFJLFFBQWdCLENBQUMsU0FBUyxXQUFXO0FBQzVDLGlCQUFBQSxRQUFNLElBQUksS0FBSyxTQUFTLFNBQU87QUFDM0IsWUFBTSxFQUFFLFlBQVksZUFBZSxRQUFRLElBQUk7QUFDL0MsVUFBSSxjQUFlO0FBQ2YsZUFBTyxLQUFLLE9BQU8sR0FBRyxlQUFlLG1CQUFtQixLQUFLO0FBQ2pFLFVBQUksY0FBZTtBQUNmLGVBQU8sS0FBSyxRQUFRLElBQUksUUFBUSxVQUFXLE9BQU8sQ0FBQztBQUV2RCxZQUFNLFNBQVMsQ0FBQztBQUNoQixVQUFJLEdBQUcsU0FBUyxNQUFNO0FBRXRCLFVBQUksR0FB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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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Y0FBSSxXQUFXLEtBQUssS0FBSyxTQUFTLFNBQVMsY0FBYyxpQkFBaUI7QUFBQSxRQUM5RTtBQU1BLGdCQUFRLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDO0FBQUEsTUFDM0M7QUFBQSxJQUNKO0FBRUEsOEJBQVEsZUFBZSxXQUFXLGtCQUFrQixDQUFDLEVBQUUsaUJBQWlCLGFBQWEsR0FBRyxPQUFPO0FBQzNGLFVBQUksaUJBQWlCO0FBQ2pCLFlBQUksaUJBQWlCO0FBQ2pCLG1CQUFTLGVBQWU7QUFJNUIsWUFBSSxpQkFBaUIsY0FBYztBQUMvQixnQkFBTSxTQUFTLFdBQVcsaUJBQWlCLGNBQWM7QUFDekQsY0FBSTtBQUNBLDRCQUFnQixVQUFVLENBQUMsVUFBVTtBQUFBLFFBQzdDO0FBQUEsTUFDSjtBQUVBLFNBQUcsRUFBRSxRQUFRLE9BQU8sZ0JBQWdCLENBQUM7QUFBQSxJQUN6QyxDQUFDO0FBS0QsOEJBQVEsZUFBZSxXQUFXLG9CQUFvQixNQUFNO0FBQUEsSUFBRTtBQUFBLEVBQ2xFLENBQUM7QUFDTDtBQUVBLElBQUksTUFBb0I7QUFDcEI7QUFDSjsiLAogICJuYW1lcyI6IFsiaHR0cHMiLCAiZXJyb3IiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW5pdF9uYXRpdmUiLCAicGF0aCIsICJwIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfcGF0aCIsICJlcnIiLCAiaW1wb3J0X2VsZWN0cm9uIiwgIm5hdGl2ZV9leHBvcnRzIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbml0X25hdGl2ZSIsICJfIiwgIm5hdGl2ZV9leHBvcnRzIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbml0X25hdGl2ZSIsICJfIiwgIm5hdGl2ZV9leHBvcnRzIiwgInBhdGgiLCAib3MiLCAibWV0YWRhdGEiLCAiaW1wb3J0X2NoaWxkX3Byb2Nlc3MiLCAiaW1wb3J0X3BhdGgiLCAiaW5pdF9uYXRpdmUiLCAiZXJyb3IiLCAicGF0aCIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAiZnMiLCAiZXJyIiwgInBhdGgiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9wYXRoIiwgImluaXRfc2V0dGluZ3MiLCAiaW5pdF9uYXRpdmUiLCAibmF0aXZlX2V4cG9ydHMiLCAicGF0aCIsICJsb2dzRGlyIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW5pdF9uYXRpdmUiLCAiaW5pdF9zZXR0aW5ncyIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfaHR0cHMiLCAiaW5pdF9uYXRpdmUiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJpbml0X25hdGl2ZSIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW5pdF9uYXRpdmUiLCAiXyIsICJuYXRpdmVfZXhwb3J0cyIsICJpbml0X25hdGl2ZSIsICJpbml0X25hdGl2ZSIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAicHJvdG9jb2wiLCAiaW1wb3J0X2VsZWN0cm9uIiwgInBhdGgiLCAiZmQiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9mcyIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAicHJvdG9jb2wiLCAiYXBwIiwgImVyciIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW1wb3J0X3BhdGgiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgIkJyb3dzZXJXaW5kb3ciLCAiZWxlY3Ryb24iLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgImltcG9ydF9lbGVjdHJvbiIsICJyZXF1aXJlIiwgImMiLCAic3RhcnQiLCAicCIsICJsIiwgInRkIiwgImluaXQiLCAiX2EiLCAiaW5pdCIsICJlcnIiLCAiZGF0IiwgIl9hIiwgIl9hIiwgImkiLCAiX2EiLCAiZSIsICJpbXBvcnRfZnMiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9wYXRoIiwgInppcFN0YXJ0T2Zmc2V0IiwgImVyciIsICJmc0NvbnN0YW50cyIsICJlcnIiXQp9Cg==
