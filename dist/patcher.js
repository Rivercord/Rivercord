// Rivercord 74978b42
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
    git_hash_default = "74978b42";
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
async function fetchUpdates() {
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
        for (const directive of ["style-src", "connect-src", "img-src", "font-src", "media-src", "worker-src"]) {
          csp[directive] ??= [];
          csp[directive].push("*", "blob:", "data:", "rivercord:", "'unsafe-inline'");
        }
        csp["script-src"] ??= [];
        csp["script-src"].push("'unsafe-eval'", "https://unpkg.com", "https://cdnjs.cloudflare.com");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc2NyaXB0cy9idWlsZC9pbmplY3QvcmVhY3QubWpzIiwgIi4uL3NyYy9zaGFyZWQvSXBjRXZlbnRzLnRzIiwgImdpdC1oYXNoOn5naXQtaGFzaCIsICJnaXQtcmVtb3RlOn5naXQtcmVtb3RlIiwgIi4uL3NyYy9zaGFyZWQvcml2ZXJjb3JkVXNlckFnZW50LnRzIiwgIi4uL3NyYy9tYWluL3V0aWxzL3NpbXBsZUdldC50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2NvbW1vbi50cyIsICIuLi9zcmMvbWFpbi91cGRhdGVyL2h0dHAudHMiLCAiLi4vc3JjL21haW4vdXBkYXRlci9pbmRleC50cyIsICIuLi9zcmMvcGx1Z2lucy9hcHBsZU11c2ljLmRlc2t0b3AvbmF0aXZlLnRzIiwgIi4uL3NyYy9wbHVnaW5zL2NvbnNvbGVTaG9ydGN1dHMvbmF0aXZlLnRzIiwgIi4uL3NyYy9zaGFyZWQvU2V0dGluZ3NTdG9yZS50cyIsICIuLi9zcmMvdXRpbHMvbWVyZ2VEZWZhdWx0cy50cyIsICIuLi9zcmMvbWFpbi91dGlscy9jb25zdGFudHMudHMiLCAiLi4vc3JjL21haW4vc2V0dGluZ3MudHMiLCAiLi4vc3JjL3BsdWdpbnMvZml4U3BvdGlmeUVtYmVkcy5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy9maXhZb3V0dWJlRW1iZWRzLmRlc2t0b3AvbmF0aXZlLnRzIiwgIi4uL3NyYy9wbHVnaW5zL21lZGlhRG93bmxvYWRlci5kZXNrdG9wL25hdGl2ZS50cyIsICIuLi9zcmMvdXRpbHMvUXVldWUudHMiLCAiLi4vc3JjL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZS91dGlscy50cyIsICIuLi9zcmMvcGx1Z2lucy9tZXNzYWdlTG9nZ2VyRW5oYW5jZWQvbmF0aXZlL3NldHRpbmdzLnRzIiwgIi4uL3NyYy9wbHVnaW5zL21lc3NhZ2VMb2dnZXJFbmhhbmNlZC9uYXRpdmUvaW5kZXgudHMiLCAiLi4vc3JjL3BsdWdpbnMvb3BlbkluQXBwL25hdGl2ZS50cyIsICIuLi9zcmMvcGx1Z2lucy92b2ljZU1lc3NhZ2VzL25hdGl2ZS50cyIsICJmaWxlLXVyaTpmaWxlOi8vYWRndWFyZC5qcz9taW5pZnkiLCAiLi4vc3JjL3BsdWdpbnMvd2F0Y2hUb2dldGhlckFkYmxvY2suZGVza3RvcC9uYXRpdmUudHMiLCAiLi4vc3JjL3BsdWdpbnMveHNPdmVybGF5LmRlc2t0b3AvbmF0aXZlLnRzIiwgImltcG9ydC1uYXRpdmVzOn5wbHVnaW5OYXRpdmVzIiwgIi4uL3NyYy9tYWluL2lwY1BsdWdpbnMudHMiLCAiLi4vc3JjL3NoYXJlZC9kZWJvdW5jZS50cyIsICJmaWxlLXVyaTpmaWxlOi8vbW9uYWNvV2luLmh0bWw/bWluaWZ5JmJhc2U2NCIsICIuLi9zcmMvbWFpbi90aGVtZXMvaW5kZXgudHMiLCAiLi4vc3JjL21haW4vdXRpbHMvZXh0ZXJuYWxMaW5rcy50cyIsICIuLi9zcmMvbWFpbi9pcGNNYWluLnRzIiwgIi4uL3NyYy9zaGFyZWQvb25jZURlZmluZWQudHMiLCAiLi4vc3JjL21haW4vcGF0Y2hXaW4zMlVwZGF0ZXIudHMiLCAiLi4vc3JjL21haW4vcGF0Y2hlci50cyIsICIuLi9zcmMvbWFpbi9pbmRleC50cyIsICIuLi9zcmMvbWFpbi91dGlscy9leHRlbnNpb25zLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9mZmxhdGVAMC43LjQvbm9kZV9tb2R1bGVzL2ZmbGF0ZS9lc20vaW5kZXgubWpzIiwgIi4uL3NyYy9tYWluL3V0aWxzL2NyeFRvWmlwLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5leHBvcnQgY29uc3QgUml2ZXJjb3JkRnJhZ21lbnQgPSAvKiAjX19QVVJFX18qLyBTeW1ib2wuZm9yKFwicmVhY3QuZnJhZ21lbnRcIik7XG5leHBvcnQgbGV0IFJpdmVyY29yZENyZWF0ZUVsZW1lbnQgPVxuICAgICguLi5hcmdzKSA9PiAoUml2ZXJjb3JkQ3JlYXRlRWxlbWVudCA9IFJpdmVyY29yZC5XZWJwYWNrLkNvbW1vbi5SZWFjdC5jcmVhdGVFbGVtZW50KSguLi5hcmdzKTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5leHBvcnQgY29uc3QgZW51bSBJcGNFdmVudHMge1xuICAgIFFVSUNLX0NTU19VUERBVEUgPSBcIlJpdmVyY29yZFF1aWNrQ3NzVXBkYXRlXCIsXG4gICAgVEhFTUVfVVBEQVRFID0gXCJSaXZlcmNvcmRUaGVtZVVwZGF0ZVwiLFxuICAgIEdFVF9RVUlDS19DU1MgPSBcIlJpdmVyY29yZEdldFF1aWNrQ3NzXCIsXG4gICAgU0VUX1FVSUNLX0NTUyA9IFwiUml2ZXJjb3JkU2V0UXVpY2tDc3NcIixcbiAgICBVUExPQURfVEhFTUUgPSBcIlJpdmVyY29yZFVwbG9hZFRoZW1lXCIsXG4gICAgREVMRVRFX1RIRU1FID0gXCJSaXZlcmNvcmREZWxldGVUaGVtZVwiLFxuICAgIEdFVF9USEVNRVNfRElSID0gXCJSaXZlcmNvcmRHZXRUaGVtZXNEaXJcIixcbiAgICBHRVRfVEhFTUVTX0xJU1QgPSBcIlJpdmVyY29yZEdldFRoZW1lc0xpc3RcIixcbiAgICBHRVRfVEhFTUVfREFUQSA9IFwiUml2ZXJjb3JkR2V0VGhlbWVEYXRhXCIsXG4gICAgR0VUX1RIRU1FX1NZU1RFTV9WQUxVRVMgPSBcIlJpdmVyY29yZEdldFRoZW1lU3lzdGVtVmFsdWVzXCIsXG4gICAgR0VUX1NFVFRJTkdTX0RJUiA9IFwiUml2ZXJjb3JkR2V0U2V0dGluZ3NEaXJcIixcbiAgICBHRVRfU0VUVElOR1MgPSBcIlJpdmVyY29yZEdldFNldHRpbmdzXCIsXG4gICAgU0VUX1NFVFRJTkdTID0gXCJSaXZlcmNvcmRTZXRTZXR0aW5nc1wiLFxuICAgIE9QRU5fRVhURVJOQUwgPSBcIlJpdmVyY29yZE9wZW5FeHRlcm5hbFwiLFxuICAgIE9QRU5fUVVJQ0tDU1MgPSBcIlJpdmVyY29yZE9wZW5RdWlja0Nzc1wiLFxuICAgIEdFVF9VUERBVEVTID0gXCJSaXZlcmNvcmRHZXRVcGRhdGVzXCIsXG4gICAgR0VUX1JFUE8gPSBcIlJpdmVyY29yZEdldFJlcG9cIixcbiAgICBVUERBVEUgPSBcIlJpdmVyY29yZFVwZGF0ZVwiLFxuICAgIEJVSUxEID0gXCJSaXZlcmNvcmRCdWlsZFwiLFxuICAgIE9QRU5fTU9OQUNPX0VESVRPUiA9IFwiUml2ZXJjb3JkT3Blbk1vbmFjb0VkaXRvclwiLFxuXG4gICAgR0VUX1BMVUdJTl9JUENfTUVUSE9EX01BUCA9IFwiUml2ZXJjb3JkR2V0UGx1Z2luSXBjTWV0aG9kTWFwXCIsXG5cbiAgICBPUEVOX0lOX0FQUF9fUkVTT0xWRV9SRURJUkVDVCA9IFwiUml2ZXJjb3JkT0lBUmVzb2x2ZVJlZGlyZWN0XCIsXG4gICAgVk9JQ0VfTUVTU0FHRVNfUkVBRF9SRUNPUkRJTkcgPSBcIlJpdmVyY29yZFZNUmVhZFJlY29yZGluZ1wiLFxufVxuIiwgImV4cG9ydCBkZWZhdWx0IFwiNzQ5NzhiNDJcIiIsICJleHBvcnQgZGVmYXVsdCBcIlJpdmVyY29yZC9SaXZlcmNvcmRcIiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgZ2l0SGFzaCBmcm9tIFwifmdpdC1oYXNoXCI7XG5pbXBvcnQgZ2l0UmVtb3RlIGZyb20gXCJ+Z2l0LXJlbW90ZVwiO1xuXG5leHBvcnQgeyBnaXRIYXNoLCBnaXRSZW1vdGUgfTtcblxuZXhwb3J0IGNvbnN0IFJJVkVSQ09SRF9VU0VSX0FHRU5UID0gYFJpdmVyY29yZC8ke2dpdEhhc2h9JHtnaXRSZW1vdGUgPyBgIChodHRwczovL2dpdGh1Yi5jb20vJHtnaXRSZW1vdGV9KWAgOiBcIlwifWA7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zOiBodHRwcy5SZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEJ1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwcy5nZXQodXJsLCBvcHRpb25zLCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0dXNDb2RlLCBzdGF0dXNNZXNzYWdlLCBoZWFkZXJzIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSEgPj0gNDAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlamVjdChgJHtzdGF0dXNDb2RlfTogJHtzdGF0dXNNZXNzYWdlfSAtICR7dXJsfWApO1xuICAgICAgICAgICAgaWYgKHN0YXR1c0NvZGUhID49IDMwMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCByZXNvbHZlKGdldChoZWFkZXJzLmxvY2F0aW9uISwgb3B0aW9ucykpO1xuXG4gICAgICAgICAgICBjb25zdCBjaHVua3MgPSBbXSBhcyBCdWZmZXJbXTtcbiAgICAgICAgICAgIHJlcy5vbihcImVycm9yXCIsIHJlamVjdCk7XG5cbiAgICAgICAgICAgIHJlcy5vbihcImRhdGFcIiwgY2h1bmsgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcbiAgICAgICAgICAgIHJlcy5vbmNlKFwiZW5kXCIsICgpID0+IHJlc29sdmUoQnVmZmVyLmNvbmNhdChjaHVua3MpKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmV4cG9ydCBjb25zdCBSSVZFUkNPUkRfRklMRVMgPSBbXG4gICAgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJwYXRjaGVyLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BNYWluLmpzXCIsXG4gICAgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJwcmVsb2FkLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BQcmVsb2FkLmpzXCIsXG4gICAgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJyZW5kZXJlci5qc1wiIDogXCJyaXZlcmNvcmREZXNrdG9wUmVuZGVyZXIuanNcIixcbiAgICBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInJlbmRlcmVyLmNzc1wiIDogXCJyaXZlcmNvcmREZXNrdG9wUmVuZGVyZXIuY3NzXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRXJyb3JzKGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSB7XG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGF3YWl0IGZ1bmMoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZSBpbnN0YW5jZW9mIEVycm9yID8ge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcm90b3R5cGVzIGdldCBsb3N0LCBzbyB0dXJuIGVycm9yIGludG8gcGxhaW4gb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIC4uLmVcbiAgICAgICAgICAgICAgICB9IDogZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCAiaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBSSVZFUkNPUkRfVVNFUl9BR0VOVCB9IGZyb20gXCJAc2hhcmVkL3JpdmVyY29yZFVzZXJBZ2VudFwiO1xuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgd3JpdGVGaWxlIH0gZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IGdpdEhhc2ggZnJvbSBcIn5naXQtaGFzaFwiO1xuaW1wb3J0IGdpdFJlbW90ZSBmcm9tIFwifmdpdC1yZW1vdGVcIjtcblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIi4uL3V0aWxzL3NpbXBsZUdldFwiO1xuaW1wb3J0IHsgUklWRVJDT1JEX0ZJTEVTLCBzZXJpYWxpemVFcnJvcnMgfSBmcm9tIFwiLi9jb21tb25cIjtcblxuY29uc3QgQVBJX0JBU0UgPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2dpdFJlbW90ZX1gO1xubGV0IFBlbmRpbmdVcGRhdGVzID0gW10gYXMgW3N0cmluZywgc3RyaW5nXVtdO1xuXG5hc3luYyBmdW5jdGlvbiBnaXRodWJHZXQoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgIHJldHVybiBnZXQoQVBJX0JBU0UgKyBlbmRwb2ludCwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vdm5kLmdpdGh1Yitqc29uXCIsXG4gICAgICAgICAgICAvLyBcIkFsbCBBUEkgcmVxdWVzdHMgTVVTVCBpbmNsdWRlIGEgdmFsaWQgVXNlci1BZ2VudCBoZWFkZXIuXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB3aXRoIG5vIFVzZXItQWdlbnQgaGVhZGVyIHdpbGwgYmUgcmVqZWN0ZWQuXCJcbiAgICAgICAgICAgIFwiVXNlci1BZ2VudFwiOiBSSVZFUkNPUkRfVVNFUl9BR0VOVFxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUdpdENoYW5nZXMoKSB7XG4gICAgYXdhaXQgZmV0Y2hVcGRhdGVzKCk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBnaXRodWJHZXQoYC9jb21wYXJlLyR7Z2l0SGFzaH0uLi5IRUFEYCk7XG5cbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMudG9TdHJpbmcoXCJ1dGYtOFwiKSk7XG4gICAgcmV0dXJuIGRhdGEuY29tbWl0cy5tYXAoKGM6IGFueSkgPT4gKHtcbiAgICAgICAgLy8gZ2l0aHViIGFwaSBvbmx5IHNlbmRzIHRoZSBsb25nIHNoYVxuICAgICAgICBoYXNoOiBjLnNoYS5zbGljZSgwLCA3KSxcbiAgICAgICAgYXV0aG9yOiBjLmF1dGhvci5sb2dpbixcbiAgICAgICAgbWVzc2FnZTogYy5jb21taXQubWVzc2FnZS5zcGxpdChcIlxcblwiKVswXVxuICAgIH0pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hVcGRhdGVzKCkge1xuICAgIC8vIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBnaXRodWJHZXQoXCIvcmVsZWFzZXMvbGF0ZXN0XCIpO1xuXG4gICAgLy8gY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVsZWFzZS50b1N0cmluZygpKTtcbiAgICAvLyBjb25zdCBoYXNoID0gZGF0YS5uYW1lLnNsaWNlKGRhdGEubmFtZS5sYXN0SW5kZXhPZihcIiBcIikgKyAxKTtcbiAgICAvLyBpZiAoaGFzaCA9PT0gZ2l0SGFzaClcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgUklWRVJDT1JEX0ZJTEVTLmZvckVhY2goaSA9PiB7XG4gICAgICAgIFBlbmRpbmdVcGRhdGVzLnB1c2goXG4gICAgICAgICAgICBbaSwgYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SaXZlcmNvcmQvUml2ZXJjb3JkL21haW4vZGlzdC8ke2l9YF1cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIGRhdGEuYXNzZXRzLmZvckVhY2goKHsgbmFtZSwgYnJvd3Nlcl9kb3dubG9hZF91cmwgfSkgPT4ge1xuICAgIC8vICAgICBpZiAoUklWRVJDT1JEX0ZJTEVTLnNvbWUocyA9PiBuYW1lLnN0YXJ0c1dpdGgocykpKSB7XG4gICAgLy8gICAgICAgICBQZW5kaW5nVXBkYXRlcy5wdXNoKFtuYW1lLCBicm93c2VyX2Rvd25sb2FkX3VybF0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5VXBkYXRlcygpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChQZW5kaW5nVXBkYXRlcy5tYXAoXG4gICAgICAgIGFzeW5jIChbbmFtZSwgZGF0YV0pID0+IHdyaXRlRmlsZShcbiAgICAgICAgICAgIGpvaW4oX19kaXJuYW1lLCBuYW1lKSxcbiAgICAgICAgICAgIGF3YWl0IGdldChkYXRhKVxuICAgICAgICApXG4gICAgKSk7XG4gICAgUGVuZGluZ1VwZGF0ZXMgPSBbXTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9SRVBPLCBzZXJpYWxpemVFcnJvcnMoKCkgPT4gYGh0dHBzOi8vZ2l0aHViLmNvbS8ke2dpdFJlbW90ZX1gKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1VQREFURVMsIHNlcmlhbGl6ZUVycm9ycyhjYWxjdWxhdGVHaXRDaGFuZ2VzKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuVVBEQVRFLCBzZXJpYWxpemVFcnJvcnMoZmV0Y2hVcGRhdGVzKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuQlVJTEQsIHNlcmlhbGl6ZUVycm9ycyhhcHBseVVwZGF0ZXMpKTtcblxuY29uc29sZS5sb2coXCJbUml2ZXJjb3JkXSBVcGRhdGVyXCIsIHsgZ2l0SGFzaCwgZ2l0UmVtb3RlLCBfX2Rpcm5hbWUgfSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuLy8gaWYgKCFJU19VUERBVEVSX0RJU0FCTEVEKVxuLy8gICAgIHJlcXVpcmUoSVNfU1RBTkRBTE9ORSA/IFwiLi9odHRwXCIgOiBcIi4vZ2l0XCIpO1xuXG5pZiAoIUlTX1VQREFURVJfRElTQUJMRUQpXG4gICAgcmVxdWlyZShcIi4vaHR0cFwiKTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBleGVjRmlsZSB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tIFwidXRpbFwiO1xuXG5pbXBvcnQgdHlwZSB7IFRyYWNrRGF0YSB9IGZyb20gXCIuXCI7XG5cbmNvbnN0IGV4ZWMgPSBwcm9taXNpZnkoZXhlY0ZpbGUpO1xuXG4vLyBmdW5jdGlvbiBleGVjKGZpbGU6IHN0cmluZywgYXJnczogc3RyaW5nW10gPSBbXSkge1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IGNvZGU6IG51bWJlciB8IG51bGwsIHN0ZG91dDogc3RyaW5nIHwgbnVsbCwgc3RkZXJyOiBzdHJpbmcgfCBudWxsOyB9PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHByb2Nlc3MgPSBzcGF3bihmaWxlLCBhcmdzLCB7IHN0ZGlvOiBbbnVsbCwgXCJwaXBlXCIsIFwicGlwZVwiXSB9KTtcblxuLy8gICAgICAgICBsZXQgc3Rkb3V0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbi8vICAgICAgICAgcHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIChjaHVuazogc3RyaW5nKSA9PiB7IHN0ZG91dCA/Pz0gXCJcIjsgc3Rkb3V0ICs9IGNodW5rOyB9KTtcbi8vICAgICAgICAgbGV0IHN0ZGVycjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4vLyAgICAgICAgIHByb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCAoY2h1bms6IHN0cmluZykgPT4geyBzdGRvdXQgPz89IFwiXCI7IHN0ZGVyciArPSBjaHVuazsgfSk7XG5cbi8vICAgICAgICAgcHJvY2Vzcy5vbihcImV4aXRcIiwgY29kZSA9PiB7IHJlc29sdmUoeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9KTsgfSk7XG4vLyAgICAgICAgIHByb2Nlc3Mub24oXCJlcnJvclwiLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuLy8gICAgIH0pO1xuLy8gfVxuXG5hc3luYyBmdW5jdGlvbiBhcHBsZXNjcmlwdChjbWRzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKFwib3Nhc2NyaXB0XCIsIGNtZHMubWFwKGMgPT4gW1wiLWVcIiwgY10pLmZsYXQoKSk7XG4gICAgcmV0dXJuIHN0ZG91dDtcbn1cblxuZnVuY3Rpb24gbWFrZVNlYXJjaFVybCh0eXBlOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKFwiaHR0cHM6Ly90b29scy5hcHBsZW1lZGlhc2VydmljZXMuY29tL2FwaS9hcHBsZS1tZWRpYS9tdXNpYy9VUy9zZWFyY2guanNvblwiKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChcInR5cGVzXCIsIHR5cGUpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwibGltaXRcIiwgXCIxXCIpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwidGVybVwiLCBxdWVyeSk7XG4gICAgcmV0dXJuIHVybDtcbn1cblxuY29uc3QgcmVxdWVzdE9wdGlvbnM6IFJlcXVlc3RJbml0ID0ge1xuICAgIGhlYWRlcnM6IHsgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgcnY6MTI1LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMTI1LjBcIiB9LFxufTtcblxuaW50ZXJmYWNlIFJlbW90ZURhdGEge1xuICAgIGFwcGxlTXVzaWNMaW5rPzogc3RyaW5nLFxuICAgIHNvbmdMaW5rPzogc3RyaW5nLFxuICAgIGFsYnVtQXJ0d29yaz86IHN0cmluZyxcbiAgICBhcnRpc3RBcnR3b3JrPzogc3RyaW5nO1xufVxuXG5sZXQgY2FjaGVkUmVtb3RlRGF0YTogeyBpZDogc3RyaW5nLCBkYXRhOiBSZW1vdGVEYXRhOyB9IHwgeyBpZDogc3RyaW5nLCBmYWlsdXJlczogbnVtYmVyOyB9IHwgbnVsbCA9IG51bGw7XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoUmVtb3RlRGF0YSh7IGlkLCBuYW1lLCBhcnRpc3QsIGFsYnVtIH06IHsgaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhcnRpc3Q6IHN0cmluZywgYWxidW06IHN0cmluZzsgfSkge1xuICAgIGlmIChpZCA9PT0gY2FjaGVkUmVtb3RlRGF0YT8uaWQpIHtcbiAgICAgICAgaWYgKFwiZGF0YVwiIGluIGNhY2hlZFJlbW90ZURhdGEpIHJldHVybiBjYWNoZWRSZW1vdGVEYXRhLmRhdGE7XG4gICAgICAgIGlmIChcImZhaWx1cmVzXCIgaW4gY2FjaGVkUmVtb3RlRGF0YSAmJiBjYWNoZWRSZW1vdGVEYXRhLmZhaWx1cmVzID49IDUpIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtzb25nRGF0YSwgYXJ0aXN0RGF0YV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChtYWtlU2VhcmNoVXJsKFwic29uZ3NcIiwgYXJ0aXN0ICsgXCIgXCIgKyBhbGJ1bSArIFwiIFwiICsgbmFtZSksIHJlcXVlc3RPcHRpb25zKS50aGVuKHIgPT4gci5qc29uKCkpLFxuICAgICAgICAgICAgZmV0Y2gobWFrZVNlYXJjaFVybChcImFydGlzdHNcIiwgYXJ0aXN0LnNwbGl0KC8gKlssJl0gKi8pWzBdKSwgcmVxdWVzdE9wdGlvbnMpLnRoZW4ociA9PiByLmpzb24oKSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYXBwbGVNdXNpY0xpbmsgPSBzb25nRGF0YT8uc29uZ3M/LmRhdGFbMF0/LmF0dHJpYnV0ZXMudXJsO1xuICAgICAgICBjb25zdCBzb25nTGluayA9IHNvbmdEYXRhPy5zb25ncz8uZGF0YVswXT8uaWQgPyBgaHR0cHM6Ly9zb25nLmxpbmsvaS8ke3NvbmdEYXRhPy5zb25ncz8uZGF0YVswXT8uaWR9YCA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjb25zdCBhbGJ1bUFydHdvcmsgPSBzb25nRGF0YT8uc29uZ3M/LmRhdGFbMF0/LmF0dHJpYnV0ZXMuYXJ0d29yay51cmwucmVwbGFjZShcInt3fVwiLCBcIjUxMlwiKS5yZXBsYWNlKFwie2h9XCIsIFwiNTEyXCIpO1xuICAgICAgICBjb25zdCBhcnRpc3RBcnR3b3JrID0gYXJ0aXN0RGF0YT8uYXJ0aXN0cz8uZGF0YVswXT8uYXR0cmlidXRlcy5hcnR3b3JrLnVybC5yZXBsYWNlKFwie3d9XCIsIFwiNTEyXCIpLnJlcGxhY2UoXCJ7aH1cIiwgXCI1MTJcIik7XG5cbiAgICAgICAgY2FjaGVkUmVtb3RlRGF0YSA9IHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgZGF0YTogeyBhcHBsZU11c2ljTGluaywgc29uZ0xpbmssIGFsYnVtQXJ0d29yaywgYXJ0aXN0QXJ0d29yayB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYWNoZWRSZW1vdGVEYXRhLmRhdGE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW0FwcGxlTXVzaWNSaWNoUHJlc2VuY2VdIEZhaWxlZCB0byBmZXRjaCByZW1vdGUgZGF0YTpcIiwgZSk7XG4gICAgICAgIGNhY2hlZFJlbW90ZURhdGEgPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGZhaWx1cmVzOiAoaWQgPT09IGNhY2hlZFJlbW90ZURhdGE/LmlkICYmIFwiZmFpbHVyZXNcIiBpbiBjYWNoZWRSZW1vdGVEYXRhID8gY2FjaGVkUmVtb3RlRGF0YS5mYWlsdXJlcyA6IDApICsgMVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRyYWNrRGF0YSgpOiBQcm9taXNlPFRyYWNrRGF0YSB8IG51bGw+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBleGVjKFwicGdyZXBcIiwgW1wiXk11c2ljJFwiXSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyU3RhdGUgPSBhd2FpdCBhcHBsZXNjcmlwdChbJ3RlbGwgYXBwbGljYXRpb24gXCJNdXNpY1wiJywgXCJnZXQgcGxheWVyIHN0YXRlXCIsIFwiZW5kIHRlbGxcIl0pXG4gICAgICAgIC50aGVuKG91dCA9PiBvdXQudHJpbSgpKTtcbiAgICBpZiAocGxheWVyU3RhdGUgIT09IFwicGxheWluZ1wiKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHBsYXllclBvc2l0aW9uID0gYXdhaXQgYXBwbGVzY3JpcHQoWyd0ZWxsIGFwcGxpY2F0aW9uIFwiTXVzaWNcIicsIFwiZ2V0IHBsYXllciBwb3NpdGlvblwiLCBcImVuZCB0ZWxsXCJdKVxuICAgICAgICAudGhlbih0ZXh0ID0+IE51bWJlci5wYXJzZUZsb2F0KHRleHQudHJpbSgpKSk7XG5cbiAgICBjb25zdCBzdGRvdXQgPSBhd2FpdCBhcHBsZXNjcmlwdChbXG4gICAgICAgICdzZXQgb3V0cHV0IHRvIFwiXCInLFxuICAgICAgICAndGVsbCBhcHBsaWNhdGlvbiBcIk11c2ljXCInLFxuICAgICAgICBcInNldCB0X2lkIHRvIGRhdGFiYXNlIGlkIG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9uYW1lIHRvIG5hbWUgb2YgY3VycmVudCB0cmFja1wiLFxuICAgICAgICBcInNldCB0X2FsYnVtIHRvIGFsYnVtIG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9hcnRpc3QgdG8gYXJ0aXN0IG9mIGN1cnJlbnQgdHJhY2tcIixcbiAgICAgICAgXCJzZXQgdF9kdXJhdGlvbiB0byBkdXJhdGlvbiBvZiBjdXJyZW50IHRyYWNrXCIsXG4gICAgICAgICdzZXQgb3V0cHV0IHRvIFwiXCIgJiB0X2lkICYgXCJcXFxcblwiICYgdF9uYW1lICYgXCJcXFxcblwiICYgdF9hbGJ1bSAmIFwiXFxcXG5cIiAmIHRfYXJ0aXN0ICYgXCJcXFxcblwiICYgdF9kdXJhdGlvbicsXG4gICAgICAgIFwiZW5kIHRlbGxcIixcbiAgICAgICAgXCJyZXR1cm4gb3V0cHV0XCJcbiAgICBdKTtcblxuICAgIGNvbnN0IFtpZCwgbmFtZSwgYWxidW0sIGFydGlzdCwgZHVyYXRpb25TdHJdID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpLmZpbHRlcihrID0+ICEhayk7XG4gICAgY29uc3QgZHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdChkdXJhdGlvblN0cik7XG5cbiAgICBjb25zdCByZW1vdGVEYXRhID0gYXdhaXQgZmV0Y2hSZW1vdGVEYXRhKHsgaWQsIG5hbWUsIGFydGlzdCwgYWxidW0gfSk7XG5cbiAgICByZXR1cm4geyBuYW1lLCBhbGJ1bSwgYXJ0aXN0LCBwbGF5ZXJQb3NpdGlvbiwgZHVyYXRpb24sIC4uLnJlbW90ZURhdGEgfTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREZXZ0b29sc09wZW5FYWdlckxvYWQoZTogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgY29uc3QgaGFuZGxlRGV2dG9vbHNPcGVuZWQgPSAoKSA9PiBlLnNlbmRlci5leGVjdXRlSmF2YVNjcmlwdChcIlJpdmVyY29yZC5QbHVnaW5zLnBsdWdpbnMuQ29uc29sZVNob3J0Y3V0cy5lYWdlckxvYWQodHJ1ZSlcIik7XG5cbiAgICBpZiAoZS5zZW5kZXIuaXNEZXZUb29sc09wZW5lZCgpKVxuICAgICAgICBoYW5kbGVEZXZ0b29sc09wZW5lZCgpO1xuICAgIGVsc2VcbiAgICAgICAgZS5zZW5kZXIub25jZShcImRldnRvb2xzLW9wZW5lZFwiLCAoKSA9PiBoYW5kbGVEZXZ0b29sc09wZW5lZCgpKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBMaXRlcmFsVW5pb24gfSBmcm9tIFwidHlwZS1mZXN0XCI7XG5cbi8vIFJlc29sdmVzIGEgcG9zc2libHkgbmVzdGVkIHByb3AgaW4gdGhlIGZvcm0gb2YgXCJzb21lLm5lc3RlZC5wcm9wXCIgdG8gdHlwZSBvZiBULnNvbWUubmVzdGVkLnByb3BcbnR5cGUgUmVzb2x2ZVByb3BEZWVwPFQsIFA+ID0gUCBleHRlbmRzIGAke2luZmVyIFByZX0uJHtpbmZlciBTdWZ9YFxuICAgID8gUHJlIGV4dGVuZHMga2V5b2YgVFxuICAgID8gUmVzb2x2ZVByb3BEZWVwPFRbUHJlXSwgU3VmPlxuICAgIDogYW55XG4gICAgOiBQIGV4dGVuZHMga2V5b2YgVFxuICAgID8gVFtQXVxuICAgIDogYW55O1xuXG5pbnRlcmZhY2UgU2V0dGluZ3NTdG9yZU9wdGlvbnMge1xuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICBnZXREZWZhdWx0VmFsdWU/OiAoZGF0YToge1xuICAgICAgICB0YXJnZXQ6IGFueTtcbiAgICAgICAga2V5OiBzdHJpbmc7XG4gICAgICAgIHJvb3Q6IGFueTtcbiAgICAgICAgcGF0aDogc3RyaW5nO1xuICAgIH0pID0+IGFueTtcbn1cblxuLy8gbWVyZ2VzIHRoZSBTZXR0aW5nc1N0b3JlT3B0aW9ucyB0eXBlIGludG8gdGhlIGNsYXNzXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzU3RvcmU8VCBleHRlbmRzIG9iamVjdD4gZXh0ZW5kcyBTZXR0aW5nc1N0b3JlT3B0aW9ucyB7IH1cblxuLyoqXG4gKiBUaGUgU2V0dGluZ3NTdG9yZSBhbGxvd3MgeW91IHRvIGVhc2lseSBjcmVhdGUgYSBtdXRhYmxlIHN0b3JlIHRoYXRcbiAqIGhhcyBzdXBwb3J0IGZvciBnbG9iYWwgYW5kIHBhdGgtYmFzZWQgY2hhbmdlIGxpc3RlbmVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdzU3RvcmU8VCBleHRlbmRzIG9iamVjdD4ge1xuICAgIHByaXZhdGUgcGF0aExpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8KG5ld0RhdGE6IGFueSkgPT4gdm9pZD4+KCk7XG4gICAgcHJpdmF0ZSBnbG9iYWxMaXN0ZW5lcnMgPSBuZXcgU2V0PChuZXdEYXRhOiBULCBwYXRoOiBzdHJpbmcpID0+IHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RvcmUgb2JqZWN0LiBNYWtpbmcgY2hhbmdlcyB0byB0aGlzIG9iamVjdCB3aWxsIHRyaWdnZXIgdGhlIGFwcGxpY2FibGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIHB1YmxpYyBkZWNsYXJlIHN0b3JlOiBUO1xuICAgIC8qKlxuICAgICAqIFRoZSBwbGFpbiBkYXRhLiBDaGFuZ2VzIHRvIHRoaXMgb2JqZWN0IHdpbGwgbm90IHRyaWdnZXIgYW55IGNoYW5nZSBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVjbGFyZSBwbGFpbjogVDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbGFpbjogVCwgb3B0aW9uczogU2V0dGluZ3NTdG9yZU9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnBsYWluID0gcGxhaW47XG4gICAgICAgIHRoaXMuc3RvcmUgPSB0aGlzLm1ha2VQcm94eShwbGFpbik7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUHJveHkob2JqZWN0OiBhbnksIHJvb3Q6IFQgPSBvYmplY3QsIHBhdGg6IHN0cmluZyA9IFwiXCIpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShvYmplY3QsIHtcbiAgICAgICAgICAgIGdldCh0YXJnZXQsIGtleTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IHYgPSB0YXJnZXRba2V5XTtcblxuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiB0YXJnZXQpICYmIHNlbGYuZ2V0RGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHYgPSBzZWxmLmdldERlZmF1bHRWYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICByb290LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubWFrZVByb3h5KHYsIHJvb3QsIGAke3BhdGh9JHtwYXRoICYmIFwiLlwifSR7a2V5fWApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHRhcmdldCwga2V5OiBzdHJpbmcsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFtrZXldID09PSB2YWx1ZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNldFBhdGggPSBgJHtwYXRofSR7cGF0aCAmJiBcIi5cIn0ke2tleX1gO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5nbG9iYWxMaXN0ZW5lcnMuZm9yRWFjaChjYiA9PiBjYih2YWx1ZSwgc2V0UGF0aCkpO1xuICAgICAgICAgICAgICAgIHNlbGYucGF0aExpc3RlbmVycy5nZXQoc2V0UGF0aCk/LmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRhdGEgb2YgdGhlIHN0b3JlLlxuICAgICAqIFRoaXMgd2lsbCB1cGRhdGUgdGhpcy5zdG9yZSBhbmQgdGhpcy5wbGFpbiAoYW5kIG9sZCByZWZlcmVuY2VzIHRvIHRoZW0gd2lsbCBiZSBzdGFsZSEgQXZvaWQgc3RvcmluZyB0aGVtIGluIHZhcmlhYmxlcylcbiAgICAgKlxuICAgICAqIEFkZGl0aW9uYWxseSwgYWxsIGdsb2JhbCBsaXN0ZW5lcnMgKGFuZCB0aG9zZSBmb3IgcGF0aFRvTm90aWZ5LCBpZiBzcGVjaWZpZWQpIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBkYXRhXG4gICAgICogQHBhcmFtIHZhbHVlIE5ldyBkYXRhXG4gICAgICogQHBhcmFtIHBhdGhUb05vdGlmeSBPcHRpb25hbCBwYXRoIHRvIG5vdGlmeSBpbnN0ZWFkIG9mIGdsb2JhbGx5LiBVc2VkIHRvIHRyYW5zZmVyIHBhdGggdmlhIGlwY1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXREYXRhKHZhbHVlOiBULCBwYXRoVG9Ob3RpZnk/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHRocm93IG5ldyBFcnJvcihcIlNldHRpbmdzU3RvcmUgaXMgcmVhZC1vbmx5XCIpO1xuXG4gICAgICAgIHRoaXMucGxhaW4gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHRoaXMubWFrZVByb3h5KHZhbHVlKTtcblxuICAgICAgICBpZiAocGF0aFRvTm90aWZ5KSB7XG4gICAgICAgICAgICBsZXQgdiA9IHZhbHVlO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gcGF0aFRvTm90aWZ5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBwYXRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgICAgIGBTZXR0aW5ncyNzZXREYXRhOiBQYXRoICR7cGF0aFRvTm90aWZ5fSBkb2VzIG5vdCBleGlzdCBpbiBuZXcgZGF0YS4gTm90IGRpc3BhdGNoaW5nIHVwZGF0ZWBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2ID0gdltwXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYXRoTGlzdGVuZXJzLmdldChwYXRoVG9Ob3RpZnkpPy5mb3JFYWNoKGNiID0+IGNiKHYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFya0FzQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGdsb2JhbCBjaGFuZ2UgbGlzdGVuZXIsIHRoYXQgd2lsbCBmaXJlIHdoZW5ldmVyIGFueSBzZXR0aW5nIGlzIGNoYW5nZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBuZXcgZGF0YS4gVGhpcyBpcyBlaXRoZXIgdGhlIG5ldyB2YWx1ZSBzZXQgb24gdGhlIHBhdGgsIG9yIHRoZSBuZXcgcm9vdCBvYmplY3QgaWYgaXQgd2FzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBvZiB0aGUgc2V0dGluZyB0aGF0IHdhcyBjaGFuZ2VkLiBFbXB0eSBzdHJpbmcgaWYgdGhlIHJvb3Qgb2JqZWN0IHdhcyBjaGFuZ2VkXG4gICAgICovXG4gICAgcHVibGljIGFkZEdsb2JhbENoYW5nZUxpc3RlbmVyKGNiOiAoZGF0YTogYW55LCBwYXRoOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxMaXN0ZW5lcnMuYWRkKGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBzY29wZWQgY2hhbmdlIGxpc3RlbmVyIHRoYXQgd2lsbCBmaXJlIHdoZW5ldmVyIGEgc2V0dGluZyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHBhdGggaXMgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlIGlmIHBhdGggaXMgYFwiZm9vLmJhclwiYCwgdGhlIGxpc3RlbmVyIHdpbGwgZmlyZSBvblxuICAgICAqIGBgYGpzXG4gICAgICogU2V0dGluZy5zdG9yZS5mb28uYmFyID0gXCJoaVwiXG4gICAgICogYGBgXG4gICAgICogYnV0IG5vdCBvblxuICAgICAqIGBgYGpzXG4gICAgICogU2V0dGluZy5zdG9yZS5mb28uYmF6ID0gXCJoaVwiXG4gICAgICogYGBgXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcGFyYW0gY2JcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkQ2hhbmdlTGlzdGVuZXI8UCBleHRlbmRzIExpdGVyYWxVbmlvbjxrZXlvZiBULCBzdHJpbmc+PihcbiAgICAgICAgcGF0aDogUCxcbiAgICAgICAgY2I6IChkYXRhOiBSZXNvbHZlUHJvcERlZXA8VCwgUD4pID0+IHZvaWRcbiAgICApIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5wYXRoTGlzdGVuZXJzLmdldChwYXRoIGFzIHN0cmluZykgPz8gbmV3IFNldCgpO1xuICAgICAgICBsaXN0ZW5lcnMuYWRkKGNiKTtcbiAgICAgICAgdGhpcy5wYXRoTGlzdGVuZXJzLnNldChwYXRoIGFzIHN0cmluZywgbGlzdGVuZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBnbG9iYWwgbGlzdGVuZXJcbiAgICAgKiBAc2VlIHtAbGluayBhZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlR2xvYmFsQ2hhbmdlTGlzdGVuZXIoY2I6IChkYXRhOiBhbnksIHBhdGg6IHN0cmluZykgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmdsb2JhbExpc3RlbmVycy5kZWxldGUoY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHNjb3BlZCBsaXN0ZW5lclxuICAgICAqIEBzZWUge0BsaW5rIGFkZENoYW5nZUxpc3RlbmVyfVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVDaGFuZ2VMaXN0ZW5lcihwYXRoOiBMaXRlcmFsVW5pb248a2V5b2YgVCwgc3RyaW5nPiwgY2I6IChkYXRhOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5wYXRoTGlzdGVuZXJzLmdldChwYXRoIGFzIHN0cmluZyk7XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShjYik7XG4gICAgICAgIGlmICghbGlzdGVuZXJzLnNpemUpIHRoaXMucGF0aExpc3RlbmVycy5kZWxldGUocGF0aCBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgYWxsIGdsb2JhbCBjaGFuZ2UgbGlzdGVuZXJzXG4gICAgICovXG4gICAgcHVibGljIG1hcmtBc0NoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzLmZvckVhY2goY2IgPT4gY2IodGhpcy5wbGFpbiwgXCJcIikpO1xuICAgIH1cbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBkZWZhdWx0cyBpbnRvIGFuIG9iamVjdCBhbmQgcmV0dXJucyB0aGUgc2FtZSBvYmplY3RcbiAqIEBwYXJhbSBvYmogT2JqZWN0XG4gKiBAcGFyYW0gZGVmYXVsdHMgRGVmYXVsdHNcbiAqIEByZXR1cm5zIG9ialxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWZhdWx0czxUPihvYmo6IFQsIGRlZmF1bHRzOiBUKTogVCB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgICAgY29uc3QgdiA9IGRlZmF1bHRzW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPz89IHt9IGFzIGFueTtcbiAgICAgICAgICAgIG1lcmdlRGVmYXVsdHMob2JqW2tleV0sIHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPz89IHY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgY29uc3QgREFUQV9ESVIgPSBwcm9jZXNzLmVudi5SSVZFUkNPUkRfVVNFUl9EQVRBX0RJUiA/PyAoXG4gICAgcHJvY2Vzcy5lbnYuRElTQ09SRF9VU0VSX0RBVEFfRElSXG4gICAgICAgID8gam9pbihwcm9jZXNzLmVudi5ESVNDT1JEX1VTRVJfREFUQV9ESVIsIFwiLi5cIiwgXCJSaXZlcmNvcmREYXRhXCIpXG4gICAgICAgIDogam9pbihhcHAuZ2V0UGF0aChcInVzZXJEYXRhXCIpLCBcIi4uXCIsIFwiUml2ZXJjb3JkXCIpXG4pO1xuZXhwb3J0IGNvbnN0IFNFVFRJTkdTX0RJUiA9IGpvaW4oREFUQV9ESVIsIFwic2V0dGluZ3NcIik7XG5leHBvcnQgY29uc3QgVEhFTUVTX0RJUiA9IGpvaW4oREFUQV9ESVIsIFwidGhlbWVzXCIpO1xuZXhwb3J0IGNvbnN0IFFVSUNLQ1NTX1BBVEggPSBqb2luKFNFVFRJTkdTX0RJUiwgXCJxdWlja0Nzcy5jc3NcIik7XG5leHBvcnQgY29uc3QgU0VUVElOR1NfRklMRSA9IGpvaW4oU0VUVElOR1NfRElSLCBcInNldHRpbmdzLmpzb25cIik7XG5leHBvcnQgY29uc3QgTkFUSVZFX1NFVFRJTkdTX0ZJTEUgPSBqb2luKFNFVFRJTkdTX0RJUiwgXCJuYXRpdmUtc2V0dGluZ3MuanNvblwiKTtcbmV4cG9ydCBjb25zdCBBTExPV0VEX1BST1RPQ09MUyA9IFtcbiAgICBcImh0dHBzOlwiLFxuICAgIFwiaHR0cDpcIixcbiAgICBcInN0ZWFtOlwiLFxuICAgIFwic3BvdGlmeTpcIixcbiAgICBcImNvbS5lcGljZ2FtZXMubGF1bmNoZXI6XCIsXG4gICAgXCJ0aWRhbDpcIlxuXTtcblxuZXhwb3J0IGNvbnN0IElTX1ZBTklMTEEgPSAvKiBAX19QVVJFX18gKi8gcHJvY2Vzcy5hcmd2LmluY2x1ZGVzKFwiLS12YW5pbGxhXCIpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tIFwiQGFwaS9TZXR0aW5nc1wiO1xuaW1wb3J0IHsgSXBjRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvSXBjRXZlbnRzXCI7XG5pbXBvcnQgeyBTZXR0aW5nc1N0b3JlIH0gZnJvbSBcIkBzaGFyZWQvU2V0dGluZ3NTdG9yZVwiO1xuaW1wb3J0IHsgbWVyZ2VEZWZhdWx0cyB9IGZyb20gXCJAdXRpbHMvbWVyZ2VEZWZhdWx0c1wiO1xuaW1wb3J0IHsgaXBjTWFpbiB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IHsgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuaW1wb3J0IHsgTkFUSVZFX1NFVFRJTkdTX0ZJTEUsIFNFVFRJTkdTX0RJUiwgU0VUVElOR1NfRklMRSB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5ta2RpclN5bmMoU0VUVElOR1NfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gcmVhZFNldHRpbmdzPFQgPSBvYmplY3Q+KG5hbWU6IHN0cmluZywgZmlsZTogc3RyaW5nKTogUGFydGlhbDxUPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGZpbGUsIFwidXRmLThcIikpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGlmIChlcnI/LmNvZGUgIT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcmVhZCAke25hbWV9IHNldHRpbmdzYCwgZXJyKTtcblxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUmVuZGVyZXJTZXR0aW5ncyA9IG5ldyBTZXR0aW5nc1N0b3JlKHJlYWRTZXR0aW5nczxTZXR0aW5ncz4oXCJyZW5kZXJlclwiLCBTRVRUSU5HU19GSUxFKSk7XG5cblJlbmRlcmVyU2V0dGluZ3MuYWRkR2xvYmFsQ2hhbmdlTGlzdGVuZXIoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHdyaXRlRmlsZVN5bmMoU0VUVElOR1NfRklMRSwgSlNPTi5zdHJpbmdpZnkoUmVuZGVyZXJTZXR0aW5ncy5wbGFpbiwgbnVsbCwgNCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3cml0ZSByZW5kZXJlciBzZXR0aW5nc1wiLCBlKTtcbiAgICB9XG59KTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9TRVRUSU5HU19ESVIsICgpID0+IFNFVFRJTkdTX0RJUik7XG5pcGNNYWluLm9uKElwY0V2ZW50cy5HRVRfU0VUVElOR1MsIGUgPT4gZS5yZXR1cm5WYWx1ZSA9IFJlbmRlcmVyU2V0dGluZ3MucGxhaW4pO1xuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuU0VUX1NFVFRJTkdTLCAoXywgZGF0YTogU2V0dGluZ3MsIHBhdGhUb05vdGlmeT86IHN0cmluZykgPT4ge1xuICAgIFJlbmRlcmVyU2V0dGluZ3Muc2V0RGF0YShkYXRhLCBwYXRoVG9Ob3RpZnkpO1xufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF0aXZlU2V0dGluZ3Mge1xuICAgIHBsdWdpbnM6IHtcbiAgICAgICAgW3BsdWdpbjogc3RyaW5nXToge1xuICAgICAgICAgICAgW3NldHRpbmc6IHN0cmluZ106IGFueTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5jb25zdCBEZWZhdWx0TmF0aXZlU2V0dGluZ3M6IE5hdGl2ZVNldHRpbmdzID0ge1xuICAgIHBsdWdpbnM6IHt9XG59O1xuXG5jb25zdCBuYXRpdmVTZXR0aW5ncyA9IHJlYWRTZXR0aW5nczxOYXRpdmVTZXR0aW5ncz4oXCJuYXRpdmVcIiwgTkFUSVZFX1NFVFRJTkdTX0ZJTEUpO1xubWVyZ2VEZWZhdWx0cyhuYXRpdmVTZXR0aW5ncywgRGVmYXVsdE5hdGl2ZVNldHRpbmdzKTtcblxuZXhwb3J0IGNvbnN0IE5hdGl2ZVNldHRpbmdzID0gbmV3IFNldHRpbmdzU3RvcmUobmF0aXZlU2V0dGluZ3MpO1xuXG5OYXRpdmVTZXR0aW5ncy5hZGRHbG9iYWxDaGFuZ2VMaXN0ZW5lcigoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhOQVRJVkVfU0VUVElOR1NfRklMRSwgSlNPTi5zdHJpbmdpZnkoTmF0aXZlU2V0dGluZ3MucGxhaW4sIG51bGwsIDQpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgbmF0aXZlIHNldHRpbmdzXCIsIGUpO1xuICAgIH1cbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiQG1haW4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChfLCB3aW4pID0+IHtcbiAgICB3aW4ud2ViQ29udGVudHMub24oXCJmcmFtZS1jcmVhdGVkXCIsIChfLCB7IGZyYW1lIH0pID0+IHtcbiAgICAgICAgZnJhbWUub25jZShcImRvbS1yZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJhbWUudXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL29wZW4uc3BvdGlmeS5jb20vZW1iZWQvXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LkZpeFNwb3RpZnlFbWJlZHM7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncz8uZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZnJhbWUuZXhlY3V0ZUphdmFTY3JpcHQoYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IEF1ZGlvLnByb3RvdHlwZS5wbGF5O1xuICAgICAgICAgICAgICAgICAgICBBdWRpby5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52b2x1bWUgPSAkeyhzZXR0aW5ncy52b2x1bWUgLyAxMDApIHx8IDAuMX07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiQG1haW4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5hcHAub24oXCJicm93c2VyLXdpbmRvdy1jcmVhdGVkXCIsIChfLCB3aW4pID0+IHtcbiAgICB3aW4ud2ViQ29udGVudHMub24oXCJmcmFtZS1jcmVhdGVkXCIsIChfLCB7IGZyYW1lIH0pID0+IHtcbiAgICAgICAgZnJhbWUub25jZShcImRvbS1yZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJhbWUudXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFJlbmRlcmVyU2V0dGluZ3Muc3RvcmUucGx1Z2lucz8uRml4WW91dHViZUVtYmVkcztcbiAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzPy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmcmFtZS5leGVjdXRlSmF2YVNjcmlwdChgXG4gICAgICAgICAgICAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi55dHAtZXJyb3ItY29udGVudC13cmFwLXN1YnJlYXNvbiBhW2hyZWYqPVwid3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9XCJdJylcbiAgICAgICAgICAgICAgICAgICAgKSBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgICAgICAgIH0pLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6dHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDI0IFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBDaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMsIGV4ZWNGaWxlU3luYywgc3Bhd24gfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgSXBjTWFpbkludm9rZUV2ZW50IH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBvcyBmcm9tIFwib3NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbnR5cGUgRm9ybWF0ID0gXCJ2aWRlb1wiIHwgXCJhdWRpb1wiIHwgXCJnaWZcIjtcbnR5cGUgRG93bmxvYWRPcHRpb25zID0ge1xuICAgIHVybDogc3RyaW5nO1xuICAgIGZvcm1hdD86IEZvcm1hdDtcbiAgICBnaWZRdWFsaXR5PzogMSB8IDIgfCAzIHwgNCB8IDU7XG4gICAgeXRkbHBBcmdzPzogc3RyaW5nW107XG4gICAgZmZtcGVnQXJncz86IHN0cmluZ1tdO1xuICAgIG1heEZpbGVTaXplPzogbnVtYmVyO1xufTtcblxubGV0IHdvcmtkaXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xubGV0IHN0ZG91dF9nbG9iYWw6IHN0cmluZyA9IFwiXCI7XG5sZXQgbG9nc19nbG9iYWw6IHN0cmluZyA9IFwiXCI7XG5cbmxldCB5dGRscEF2YWlsYWJsZSA9IGZhbHNlO1xubGV0IGZmbXBlZ0F2YWlsYWJsZSA9IGZhbHNlO1xuXG5sZXQgeXRkbHBQcm9jZXNzOiBDaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMgfCBudWxsID0gbnVsbDtcbmxldCBmZm1wZWdQcm9jZXNzOiBDaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMgfCBudWxsID0gbnVsbDtcblxuY29uc3QgZ2V0ZGlyID0gKCkgPT4gd29ya2RpciA/PyBwcm9jZXNzLmN3ZCgpO1xuY29uc3QgcCA9IChmaWxlOiBzdHJpbmcpID0+IHBhdGguam9pbihnZXRkaXIoKSwgZmlsZSk7XG5jb25zdCBjbGVhblZpZGVvRmlsZXMgPSAoKSA9PiB7XG4gICAgaWYgKCF3b3JrZGlyKSByZXR1cm47XG4gICAgZnMucmVhZGRpclN5bmMod29ya2RpcilcbiAgICAgICAgLmZpbHRlcihmID0+IGYuc3RhcnRzV2l0aChcImRvd25sb2FkLlwiKSB8fCBmLnN0YXJ0c1dpdGgoXCJyZW11eC5cIikpXG4gICAgICAgIC5mb3JFYWNoKGYgPT4gZnMudW5saW5rU3luYyhwKGYpKSk7XG59O1xuY29uc3QgYXBwZW5kT3V0ID0gKGRhdGE6IHN0cmluZykgPT4gKCAvLyBNYWtlcyBjYXJyaWFnZSByZXR1cm4gKFxccikgd29ya1xuICAgIChzdGRvdXRfZ2xvYmFsICs9IGRhdGEpLCAoc3Rkb3V0X2dsb2JhbCA9IHN0ZG91dF9nbG9iYWwucmVwbGFjZSgvXi4qXFxyKFteXFxuXSkvZ20sIFwiJDFcIikpKTtcbmNvbnN0IGxvZyA9ICguLi5kYXRhOiBzdHJpbmdbXSkgPT4gKGNvbnNvbGUubG9nKGBbUGx1Z2luOk1lZGlhRG93bmxvYWRlcl0gJHtkYXRhLmpvaW4oXCIgXCIpfWApLCBsb2dzX2dsb2JhbCArPSBgW1BsdWdpbjpNZWRpYURvd25sb2FkZXJdICR7ZGF0YS5qb2luKFwiIFwiKX1cXG5gKTtcbmNvbnN0IGVycm9yID0gKC4uLmRhdGE6IHN0cmluZ1tdKSA9PiBjb25zb2xlLmVycm9yKGBbUGx1Z2luOk1lZGlhRG93bmxvYWRlcl0gW0VSUk9SXSAke2RhdGEuam9pbihcIiBcIil9YCk7XG5cbmZ1bmN0aW9uIHl0ZGxwKGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsb2coYEV4ZWN1dGluZyB5dC1kbHAgd2l0aCBhcmdzOiBbXCIke2FyZ3MubWFwKGEgPT4gYS5yZXBsYWNlKCdcIicsICdcXFxcXCInKSkuam9pbignXCIsIFwiJyl9XCJdYCk7XG4gICAgbGV0IGVycm9yTXNnID0gXCJcIjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgeXRkbHBQcm9jZXNzID0gc3Bhd24oXCJ5dC1kbHBcIiwgYXJncywge1xuICAgICAgICAgICAgY3dkOiBnZXRkaXIoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgeXRkbHBQcm9jZXNzLnN0ZG91dC5vbihcImRhdGFcIiwgZGF0YSA9PiBhcHBlbmRPdXQoZGF0YSkpO1xuICAgICAgICB5dGRscFByb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCBkYXRhID0+IHtcbiAgICAgICAgICAgIGFwcGVuZE91dChkYXRhKTtcbiAgICAgICAgICAgIGVycm9yKGB5dC1kbHAgZW5jb3VudGVyZWQgYW4gZXJyb3I6ICR7ZGF0YX1gKTtcbiAgICAgICAgICAgIGVycm9yTXNnICs9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB5dGRscFByb2Nlc3Mub24oXCJleGl0XCIsIGNvZGUgPT4ge1xuICAgICAgICAgICAgeXRkbHBQcm9jZXNzID0gbnVsbDtcbiAgICAgICAgICAgIGNvZGUgPT09IDAgPyByZXNvbHZlKHN0ZG91dF9nbG9iYWwpIDogcmVqZWN0KG5ldyBFcnJvcihlcnJvck1zZyB8fCBgeXQtZGxwIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZm1wZWcoYXJnczogc3RyaW5nW10pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxvZyhgRXhlY3V0aW5nIGZmbXBlZyB3aXRoIGFyZ3M6IFtcIiR7YXJncy5tYXAoYSA9PiBhLnJlcGxhY2UoJ1wiJywgJ1xcXFxcIicpKS5qb2luKCdcIiwgXCInKX1cIl1gKTtcbiAgICBsZXQgZXJyb3JNc2cgPSBcIlwiO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmZm1wZWdQcm9jZXNzID0gc3Bhd24oXCJmZm1wZWdcIiwgYXJncywge1xuICAgICAgICAgICAgY3dkOiBnZXRkaXIoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZmZtcGVnUHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIGRhdGEgPT4gYXBwZW5kT3V0KGRhdGEpKTtcbiAgICAgICAgZmZtcGVnUHJvY2Vzcy5zdGRlcnIub24oXCJkYXRhXCIsIGRhdGEgPT4ge1xuICAgICAgICAgICAgYXBwZW5kT3V0KGRhdGEpO1xuICAgICAgICAgICAgZXJyb3IoYGZmbXBlZyBlbmNvdW50ZXJlZCBhbiBlcnJvcjogJHtkYXRhfWApO1xuICAgICAgICAgICAgZXJyb3JNc2cgKz0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZmbXBlZ1Byb2Nlc3Mub24oXCJleGl0XCIsIGNvZGUgPT4ge1xuICAgICAgICAgICAgZmZtcGVnUHJvY2VzcyA9IG51bGw7XG4gICAgICAgICAgICBjb2RlID09PSAwID8gcmVzb2x2ZShzdGRvdXRfZ2xvYmFsKSA6IHJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cgfHwgYGZmbXBlZyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydChfOiBJcGNNYWluSW52b2tlRXZlbnQsIF93b3JrZGlyOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICBfd29ya2RpciB8fD0gZnMubWtkdGVtcFN5bmMocGF0aC5qb2luKG9zLnRtcGRpcigpLCBcInZlbmNvcmRfbWVkaWFEb3dubG9hZGVyX1wiKSk7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKF93b3JrZGlyKSkgZnMubWtkaXJTeW5jKF93b3JrZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB3b3JrZGlyID0gX3dvcmtkaXI7XG4gICAgbG9nKFwiVXNpbmcgd29ya2RpcjogXCIsIHdvcmtkaXIpO1xuICAgIHJldHVybiB3b3JrZGlyO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0b3AoXzogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgaWYgKHdvcmtkaXIpIHtcbiAgICAgICAgbG9nKFwiQ2xlYW5pbmcgdXAgd29ya2RpclwiKTtcbiAgICAgICAgZnMucm1TeW5jKHdvcmtkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB3b3JrZGlyID0gbnVsbDtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1ldGFkYXRhKG9wdGlvbnM6IERvd25sb2FkT3B0aW9ucykge1xuICAgIHN0ZG91dF9nbG9iYWwgPSBcIlwiO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gSlNPTi5wYXJzZShhd2FpdCB5dGRscChbXCItSlwiLCBvcHRpb25zLnVybCwgXCItLW5vLXdhcm5pbmdzXCJdKSk7XG4gICAgaWYgKG1ldGFkYXRhLmlzX2xpdmUpIHRocm93IFwiTGl2ZSBzdHJlYW1zIGFyZSBub3Qgc3VwcG9ydGVkLlwiO1xuICAgIHN0ZG91dF9nbG9iYWwgPSBcIlwiO1xuICAgIHJldHVybiB7IHZpZGVvVGl0bGU6IGAke21ldGFkYXRhLnRpdGxlIHx8IFwidmlkZW9cIn0gKCR7bWV0YWRhdGEuaWR9KWAgfTtcbn1cbmZ1bmN0aW9uIGdlbkZvcm1hdCh7IHZpZGVvVGl0bGUgfTogeyB2aWRlb1RpdGxlOiBzdHJpbmc7IH0sIHsgbWF4RmlsZVNpemUsIGZvcm1hdCB9OiBEb3dubG9hZE9wdGlvbnMpIHtcbiAgICBjb25zdCBIQVNfTElNSVQgPSAhIW1heEZpbGVTaXplO1xuICAgIGNvbnN0IE1BWF9WSURFT19TSVpFID0gSEFTX0xJTUlUID8gbWF4RmlsZVNpemUgKiAwLjggOiAwO1xuICAgIGNvbnN0IE1BWF9BVURJT19TSVpFID0gSEFTX0xJTUlUID8gbWF4RmlsZVNpemUgKiAwLjIgOiAwO1xuXG4gICAgY29uc3QgYXVkaW8gPSB7XG4gICAgICAgIG5vRmZtcGVnOiBcImJhW2V4dD1tcDNde1RPVF9TSVpFfS93YVtleHQ9bXAzXXtUT1RfU0laRX1cIixcbiAgICAgICAgZmZtcGVnOiBcImJhKntUT1RfU0laRX0vYmF7VE9UX1NJWkV9L3dhKntUT1RfU0laRX0vYmEqXCJcbiAgICB9O1xuICAgIGNvbnN0IHZpZGVvID0ge1xuICAgICAgICBub0ZmbXBlZzogXCJie1RPVF9TSVpFfXtIRUlHSFR9W2V4dD13ZWJtXS9ie1RPVF9TSVpFfXtIRUlHSFR9W2V4dD1tcDRdL3d7SEVJR0hUfXtUT1RfU0laRX1cIixcbiAgICAgICAgZmZtcGVnOiBcImIqe1ZJRF9TSVpFfXtIRUlHSFR9K2Jhe0FVRF9TSVpFfS9ie1RPVF9TSVpFfXtIRUlHSFR9L2Iqe0hFSUdIVH0rYmFcIixcbiAgICB9O1xuICAgIGNvbnN0IGdpZiA9IHtcbiAgICAgICAgZmZtcGVnOiBcImJ2e1RPVF9TSVpFfS93dntUT1RfU0laRX1cIlxuICAgIH07XG5cbiAgICBsZXQgZm9ybWF0X2dyb3VwOiB7IG5vRmZtcGVnPzogc3RyaW5nOyBmZm1wZWc6IHN0cmluZzsgfTtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICBjYXNlIFwiYXVkaW9cIjpcbiAgICAgICAgICAgIGZvcm1hdF9ncm91cCA9IGF1ZGlvO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJnaWZcIjpcbiAgICAgICAgICAgIGZvcm1hdF9ncm91cCA9IGdpZjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidmlkZW9cIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGZvcm1hdF9ncm91cCA9IHZpZGVvO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybWF0X3N0cmluZyA9IChmZm1wZWdBdmFpbGFibGUgPyBmb3JtYXRfZ3JvdXAuZmZtcGVnIDogZm9ybWF0X2dyb3VwLm5vRmZtcGVnKVxuICAgICAgICA/LnJlcGxhY2VBbGwoXCJ7VE9UX1NJWkV9XCIsIEhBU19MSU1JVCA/IGBbZmlsZXNpemU8JHttYXhGaWxlU2l6ZX1dYCA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlQWxsKFwie1ZJRF9TSVpFfVwiLCBIQVNfTElNSVQgPyBgW2ZpbGVzaXplPCR7TUFYX1ZJREVPX1NJWkV9XWAgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZUFsbChcIntBVURfU0laRX1cIiwgSEFTX0xJTUlUID8gYFtmaWxlc2l6ZTwke01BWF9BVURJT19TSVpFfV1gIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2VBbGwoXCJ7SEVJR0hUfVwiLCBcIltoZWlnaHQ8PTEwODBdXCIpO1xuICAgIGlmICghZm9ybWF0X3N0cmluZykgdGhyb3cgXCJHaWYgZm9ybWF0IGlzIG9ubHkgc3VwcG9ydGVkIHdpdGggZmZtcGVnLlwiO1xuICAgIGxvZyhcIlZpZGVvIGZvcm1hdGVkIGNhbGN1bGF0ZWQgYXMgXCIsIGZvcm1hdF9zdHJpbmcpO1xuICAgIGxvZyhgQmFzZWQgb246IGZvcm1hdD0ke2Zvcm1hdH0sIG1heEZpbGVTaXplPSR7bWF4RmlsZVNpemV9LCBmZm1wZWdBdmFpbGFibGU9JHtmZm1wZWdBdmFpbGFibGV9YCk7XG4gICAgcmV0dXJuIHsgZm9ybWF0OiBmb3JtYXRfc3RyaW5nLCB2aWRlb1RpdGxlIH07XG59XG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZCh7IGZvcm1hdCwgdmlkZW9UaXRsZSB9OiB7IGZvcm1hdDogc3RyaW5nOyB2aWRlb1RpdGxlOiBzdHJpbmc7IH0sIHsgeXRkbHBBcmdzLCB1cmwsIGZvcm1hdDogdXNyRm9ybWF0IH06IERvd25sb2FkT3B0aW9ucykge1xuICAgIGNsZWFuVmlkZW9GaWxlcygpO1xuICAgIGNvbnN0IGJhc2VBcmdzID0gW1wiLWZcIiwgZm9ybWF0LCBcIi1vXCIsIFwiZG93bmxvYWQuJShleHQpc1wiLCBcIi0tZm9yY2Utb3ZlcndyaXRlc1wiLCBcIi1JXCIsIFwiMVwiXTtcbiAgICBjb25zdCByZW11eEFyZ3MgPSBmZm1wZWdBdmFpbGFibGVcbiAgICAgICAgPyB1c3JGb3JtYXQgPT09IFwidmlkZW9cIlxuICAgICAgICAgICAgPyBbXCItLXJlbXV4LXZpZGVvXCIsIFwid2VibT53ZWJtL21wNFwiXVxuICAgICAgICAgICAgOiB1c3JGb3JtYXQgPT09IFwiYXVkaW9cIlxuICAgICAgICAgICAgICAgID8gW1wiLS1leHRyYWN0LWF1ZGlvXCIsIFwiLS1hdWRpby1mb3JtYXRcIiwgXCJtcDNcIl1cbiAgICAgICAgICAgICAgICA6IFtdXG4gICAgICAgIDogW107XG4gICAgY29uc3QgY3VzdG9tQXJncyA9IHl0ZGxwQXJncz8uZmlsdGVyKEJvb2xlYW4pIHx8IFtdO1xuXG4gICAgYXdhaXQgeXRkbHAoW3VybCwgLi4uYmFzZUFyZ3MsIC4uLnJlbXV4QXJncywgLi4uY3VzdG9tQXJnc10pO1xuICAgIGNvbnN0IGZpbGUgPSBmcy5yZWFkZGlyU3luYyhnZXRkaXIoKSkuZmluZChmID0+IGYuc3RhcnRzV2l0aChcImRvd25sb2FkLlwiKSk7XG4gICAgaWYgKCFmaWxlKSB0aHJvdyBcIk5vIHZpZGVvIGZpbGUgd2FzIGZvdW5kIVwiO1xuICAgIHJldHVybiB7IGZpbGUsIHZpZGVvVGl0bGUgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbXV4KHsgZmlsZSwgdmlkZW9UaXRsZSB9OiB7IGZpbGU6IHN0cmluZzsgdmlkZW9UaXRsZTogc3RyaW5nOyB9LCB7IGZmbXBlZ0FyZ3MsIGZvcm1hdCwgbWF4RmlsZVNpemUsIGdpZlF1YWxpdHkgfTogRG93bmxvYWRPcHRpb25zKSB7XG4gICAgY29uc3Qgc291cmNlRXh0ZW5zaW9uID0gZmlsZS5zcGxpdChcIi5cIikucG9wKCk7XG4gICAgaWYgKCFmZm1wZWdBdmFpbGFibGUpIHJldHVybiBsb2coXCJTa2lwcGluZyByZW11eCwgZmZtcGVnIGlzIHVuYXZhaWxhYmxlLlwiKSwgeyBmaWxlLCB2aWRlb1RpdGxlLCBleHRlbnNpb246IHNvdXJjZUV4dGVuc2lvbiB9O1xuXG4gICAgLy8gV2Ugb25seSByZWFsbHkgbmVlZCB0byByZW11eCBpZlxuICAgIC8vIDEuIFRoZSBmaWxlIGlzIHRvbyBiaWdcbiAgICAvLyAyLiBUaGUgZmlsZSBpcyBpbiBhIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGJ5IGRpc2NvcmRcbiAgICAvLyAzLiBUaGUgdXNlciBwcm92aWRlZCBjdXN0b20gZmZtcGVnIGFyZ3VtZW50c1xuICAgIC8vIDQuIFRoZSB0YXJnZXQgZm9ybWF0IGlzIGdpZlxuICAgIGNvbnN0IGFjY2VwdGFibGVGb3JtYXRzID0gW1wibXAzXCIsIFwibXA0XCIsIFwid2VibVwiXTtcbiAgICBjb25zdCBmaWxlU2l6ZSA9IGZzLnN0YXRTeW5jKHAoZmlsZSkpLnNpemU7XG4gICAgY29uc3QgY3VzdG9tQXJncyA9IGZmbXBlZ0FyZ3M/LmZpbHRlcihCb29sZWFuKSB8fCBbXTtcblxuICAgIGNvbnN0IGlzRm9ybWF0QWNjZXB0YWJsZSA9IGFjY2VwdGFibGVGb3JtYXRzLmluY2x1ZGVzKHNvdXJjZUV4dGVuc2lvbiA/PyBcIlwiKTtcbiAgICBjb25zdCBpc0ZpbGVTaXplQWNjZXB0YWJsZSA9ICghbWF4RmlsZVNpemUgfHwgZmlsZVNpemUgPD0gbWF4RmlsZVNpemUpO1xuICAgIGNvbnN0IGhhc0N1c3RvbUFyZ3MgPSBjdXN0b21BcmdzLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgaXNHaWYgPSBmb3JtYXQgPT09IFwiZ2lmXCI7XG4gICAgaWYgKGlzRm9ybWF0QWNjZXB0YWJsZSAmJiBpc0ZpbGVTaXplQWNjZXB0YWJsZSAmJiAhaGFzQ3VzdG9tQXJncyAmJiAhaXNHaWYpXG4gICAgICAgIHJldHVybiBsb2coXCJTa2lwcGluZyByZW11eCwgZmlsZSB0eXBlIGFuZCBzaXplIGFyZSBnb29kLCBhbmQgbm8gZmZtcGVnIGFyZ3VtZW50cyB3ZXJlIHNwZWNpZmllZC5cIiksIHsgZmlsZSwgdmlkZW9UaXRsZSwgZXh0ZW5zaW9uOiBzb3VyY2VFeHRlbnNpb24gfTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gcGFyc2VGbG9hdChleGVjRmlsZVN5bmMoXCJmZnByb2JlXCIsIFtcIi12XCIsIFwiZXJyb3JcIiwgXCItc2hvd19lbnRyaWVzXCIsIFwiZm9ybWF0PWR1cmF0aW9uXCIsIFwiLW9mXCIsIFwiZGVmYXVsdD1ub3ByaW50X3dyYXBwZXJzPTE6bm9rZXk9MVwiLCBwKGZpbGUpXSkudG9TdHJpbmcoKSk7XG4gICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkgdGhyb3cgXCJGYWlsZWQgdG8gZ2V0IHZpZGVvIGR1cmF0aW9uLlwiO1xuICAgIC8vIGZmbXBlZyB0ZW5kcyB0byBnbyBhYm92ZSB0aGUgdGFyZ2V0IHNpemUsIHNvIEknbSBzZXR0aW5nIGl0IHRvIDcvOFxuICAgIGNvbnN0IHRhcmdldEJpdHMgPSBtYXhGaWxlU2l6ZSA/IChtYXhGaWxlU2l6ZSAqIDcpIC8gZHVyYXRpb24gOiA5OTk5OTk5O1xuICAgIGNvbnN0IGtpbG9iaXRzID0gfn4odGFyZ2V0Qml0cyAvIDEwMjQpO1xuXG4gICAgbGV0IGJhc2VBcmdzOiBzdHJpbmdbXTtcbiAgICBsZXQgZXh0OiBzdHJpbmc7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgY2FzZSBcImF1ZGlvXCI6XG4gICAgICAgICAgICBiYXNlQXJncyA9IFtcIi1pXCIsIHAoZmlsZSksIFwiLWI6YVwiLCBgJHtraWxvYml0c31rYCwgXCItbWF4cmF0ZVwiLCBgJHtraWxvYml0c31rYCwgXCItYnVmc2l6ZVwiLCBcIjFNXCIsIFwiLXlcIl07XG4gICAgICAgICAgICBleHQgPSBcIm1wM1wiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gRHluYW1pY2FsbHkgcmVzaXplIGJhc2VkIG9uIHRhcmdldCBiaXRyYXRlXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBraWxvYml0cyA8PSAxMDAgPyA0ODAgOiBraWxvYml0cyA8PSA1MDAgPyA3MjAgOiAxMDgwO1xuICAgICAgICAgICAgYmFzZUFyZ3MgPSBbXCItaVwiLCBwKGZpbGUpLCBcIi1iOnZcIiwgYCR7fn4oa2lsb2JpdHMgKiAwLjgpfWtgLCBcIi1iOmFcIiwgYCR7fn4oa2lsb2JpdHMgKiAwLjIpfWtgLCBcIi1tYXhyYXRlXCIsIGAke2tpbG9iaXRzfWtgLCBcIi1idWZzaXplXCIsIFwiMU1cIiwgXCIteVwiLCBcIi1maWx0ZXI6dlwiLCBgc2NhbGU9LTE6JHtoZWlnaHR9YF07XG4gICAgICAgICAgICBleHQgPSBcIm1wNFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJnaWZcIjpcbiAgICAgICAgICAgIGxldCBmcHM6IG51bWJlciwgd2lkdGg6IG51bWJlciwgY29sb3JzOiBudW1iZXIsIGJheWVyX3NjYWxlOiBudW1iZXI7XG4gICAgICAgICAgICAvLyBXQVJOSU5HOiB0aGVzZSBwYXJhbWV0ZXJzIGhhdmUgYmVlbiBhcmJpdHJhcmlseSBjaG9zZW4sIG9wdGltaXphdGlvbiBpcyB3ZWxjb21lIVxuICAgICAgICAgICAgc3dpdGNoIChnaWZRdWFsaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSA1LCB3aWR0aCA9IDM2MCwgY29sb3JzID0gMjQsIGJheWVyX3NjYWxlID0gNTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSAxMCwgd2lkdGggPSA0MjAsIGNvbG9ycyA9IDMyLCBiYXllcl9zY2FsZSA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBmcHMgPSAxNSwgd2lkdGggPSA0ODAsIGNvbG9ycyA9IDY0LCBiYXllcl9zY2FsZSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZnBzID0gMjAsIHdpZHRoID0gNTQwLCBjb2xvcnMgPSA2NCwgYmF5ZXJfc2NhbGUgPSAzO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGZwcyA9IDMwLCB3aWR0aCA9IDcyMCwgY29sb3JzID0gMTI4LCBiYXllcl9zY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiYXNlQXJncyA9IFtcIi1pXCIsIHAoZmlsZSksIFwiLXZmXCIsIGBmcHM9JHtmcHN9LHNjYWxlPXc9JHt3aWR0aH06aD0tMTpmbGFncz1sYW5jem9zLG1wZGVjaW1hdGUsc3BsaXRbczBdW3MxXTtbczBdcGFsZXR0ZWdlbj1tYXhfY29sb3JzPSR7Y29sb3JzfVtwXTtbczFdW3BdcGFsZXR0ZXVzZT1kaXRoZXI9YmF5ZXI6YmF5ZXJfc2NhbGU9JHtiYXllcl9zY2FsZX1gLCBcIi1sb29wXCIsIFwiMFwiLCBcIi1idWZzaXplXCIsIFwiMU1cIiwgXCIteVwiXTtcbiAgICAgICAgICAgIGV4dCA9IFwiZ2lmXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhd2FpdCBmZm1wZWcoWy4uLmJhc2VBcmdzLCAuLi5jdXN0b21BcmdzLCBgcmVtdXguJHtleHR9YF0pO1xuICAgIHJldHVybiB7IGZpbGU6IGByZW11eC4ke2V4dH1gLCB2aWRlb1RpdGxlLCBleHRlbnNpb246IGV4dCB9O1xufVxuZnVuY3Rpb24gdXBsb2FkKHsgZmlsZSwgdmlkZW9UaXRsZSwgZXh0ZW5zaW9uIH06IHsgZmlsZTogc3RyaW5nOyB2aWRlb1RpdGxlOiBzdHJpbmc7IGV4dGVuc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkOyB9KSB7XG4gICAgaWYgKCFleHRlbnNpb24pIHRocm93IFwiSW52YWxpZCBleHRlbnNpb24uXCI7XG4gICAgY29uc3QgYnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKHAoZmlsZSkpO1xuICAgIHJldHVybiB7IGJ1ZmZlciwgdGl0bGU6IGAke3ZpZGVvVGl0bGV9LiR7ZXh0ZW5zaW9ufWAgfTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlKFxuICAgIF86IElwY01haW5JbnZva2VFdmVudCxcbiAgICBvcHQ6IERvd25sb2FkT3B0aW9uc1xuKTogUHJvbWlzZTx7XG4gICAgYnVmZmVyOiBCdWZmZXI7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBsb2dzOiBzdHJpbmc7XG59IHwge1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgbG9nczogc3RyaW5nO1xufT4ge1xuICAgIGxvZ3NfZ2xvYmFsID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB2aWRlb01ldGFkYXRhID0gYXdhaXQgbWV0YWRhdGEob3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9Gb3JtYXQgPSBnZW5Gb3JtYXQodmlkZW9NZXRhZGF0YSwgb3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9Eb3dubG9hZCA9IGF3YWl0IGRvd25sb2FkKHZpZGVvRm9ybWF0LCBvcHQpO1xuICAgICAgICBjb25zdCB2aWRlb1JlbXV4ID0gYXdhaXQgcmVtdXgodmlkZW9Eb3dubG9hZCwgb3B0KTtcbiAgICAgICAgY29uc3QgdmlkZW9VcGxvYWQgPSB1cGxvYWQodmlkZW9SZW11eCk7XG4gICAgICAgIHJldHVybiB7IGxvZ3M6IGxvZ3NfZ2xvYmFsLCAuLi52aWRlb1VwbG9hZCB9O1xuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogZS50b1N0cmluZygpLCBsb2dzOiBsb2dzX2dsb2JhbCB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrZmZtcGVnKF8/OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgICBleGVjRmlsZVN5bmMoXCJmZm1wZWdcIiwgW1wiLXZlcnNpb25cIl0pO1xuICAgICAgICBleGVjRmlsZVN5bmMoXCJmZnByb2JlXCIsIFtcIi12ZXJzaW9uXCJdKTtcbiAgICAgICAgZmZtcGVnQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmZm1wZWdBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja3l0ZGxwKF8/OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgICBleGVjRmlsZVN5bmMoXCJ5dC1kbHBcIiwgW1wiLS12ZXJzaW9uXCJdKTtcbiAgICAgICAgeXRkbHBBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHl0ZGxwQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnRlcnJ1cHQoXzogSXBjTWFpbkludm9rZUV2ZW50KSB7XG4gICAgbG9nKFwiSW50ZXJydXB0aW5nLi4uXCIpO1xuICAgIHl0ZGxwUHJvY2Vzcz8ua2lsbCgpO1xuICAgIGZmbXBlZ1Byb2Nlc3M/LmtpbGwoKTtcbiAgICBjbGVhblZpZGVvRmlsZXMoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFN0ZG91dCA9ICgpID0+IHN0ZG91dF9nbG9iYWw7XG5leHBvcnQgY29uc3QgaXNZdGRscEF2YWlsYWJsZSA9ICgpID0+IHl0ZGxwQXZhaWxhYmxlO1xuZXhwb3J0IGNvbnN0IGlzRmZtcGVnQXZhaWxhYmxlID0gKCkgPT4gZmZtcGVnQXZhaWxhYmxlO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IFByb21pc2FibGUgfSBmcm9tIFwidHlwZS1mZXN0XCI7XG5cbi8qKlxuICogQSBxdWV1ZSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJ1biB0YXNrcyBjb25zZWN1dGl2ZWx5LlxuICogSGlnaGx5IHJlY29tbWVuZGVkIGZvciB0aGluZ3MgbGlrZSBmZXRjaGluZyBkYXRhIGZyb20gRGlzY29yZFxuICovXG5leHBvcnQgY2xhc3MgUXVldWUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtYXhTaXplIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgcXVldWVkIGF0IG9uY2UuXG4gICAgICogICAgICAgICAgICAgICAgSWYgdGhlIHF1ZXVlIGlzIGZ1bGwsIHRoZSBvbGRlc3QgZnVuY3Rpb24gd2lsbCBiZSByZW1vdmVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtYXhTaXplID0gSW5maW5pdHkpIHsgfVxuXG4gICAgcHJpdmF0ZSBxdWV1ZSA9IFtdIGFzIEFycmF5PCgpID0+IFByb21pc2FibGU8dW5rbm93bj4+O1xuXG4gICAgcHJpdmF0ZSBwcm9taXNlPzogUHJvbWlzZTxhbnk+O1xuXG4gICAgcHJpdmF0ZSBuZXh0KCkge1xuICAgICAgICBjb25zdCBmdW5jID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoZnVuYylcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuYylcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB0aGlzLm5leHQoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJ1bigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb21pc2UpXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgYSB0YXNrIGF0IHRoZSBlbmQgb2YgdGhlIHF1ZXVlLiBUaGlzIHRhc2sgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgb3RoZXIgdGFza3NcbiAgICAgKiBJZiB0aGUgcXVldWUgZXhjZWVkcyB0aGUgc3BlY2lmaWVkIG1heFNpemUsIHRoZSBmaXJzdCB0YXNrIGluIHF1ZXVlIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0gZnVuYyBUYXNrXG4gICAgICovXG4gICAgcHVzaDxUPihmdW5jOiAoKSA9PiBQcm9taXNhYmxlPFQ+KSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKVxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgIHRoaXMucXVldWUucHVzaChmdW5jKTtcbiAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVwZW5kIGEgdGFzayBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS4gVGhpcyB0YXNrIHdpbGwgYmUgZXhlY3V0ZWQgbmV4dFxuICAgICAqIElmIHRoZSBxdWV1ZSBleGNlZWRzIHRoZSBzcGVjaWZpZWQgbWF4U2l6ZSwgdGhlIGxhc3QgdGFzayBpbiBxdWV1ZSB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIGZ1bmMgVGFza1xuICAgICAqL1xuICAgIHVuc2hpZnQ8VD4oZnVuYzogKCkgPT4gUHJvbWlzYWJsZTxUPikge1xuICAgICAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSlcbiAgICAgICAgICAgIHRoaXMucXVldWUucG9wKCk7XG5cbiAgICAgICAgdGhpcy5xdWV1ZS51bnNoaWZ0KGZ1bmMpO1xuICAgICAgICB0aGlzLnJ1bigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2YgdGFza3MgaW4gdGhlIHF1ZXVlXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICB9XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgYWNjZXNzLCBta2RpciB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4aXN0cyhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYWNjZXNzKGZpbGVuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZURpcmVjdG9yeUV4aXN0cyhjYWNoZURpcjogc3RyaW5nKSB7XG4gICAgaWYgKCFhd2FpdCBleGlzdHMoY2FjaGVEaXIpKVxuICAgICAgICBhd2FpdCBta2RpcihjYWNoZURpcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVuYW1lKS5uYW1lO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgRGlzY29yZCBjbGllbnQgbW9kXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlclxuICovXG5cbmltcG9ydCBmcyBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGdldERlZmF1bHROYXRpdmVEYXRhRGlyLCBnZXREZWZhdWx0TmF0aXZlSW1hZ2VEaXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgZW5zdXJlRGlyZWN0b3J5RXhpc3RzIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIE1MU2V0dGluZ3Mge1xuICAgIGxvZ3NEaXI6IHN0cmluZztcbiAgICBpbWFnZUNhY2hlRGlyOiBzdHJpbmc7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxNTFNldHRpbmdzPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBmcy5yZWFkRmlsZShhd2FpdCBnZXRTZXR0aW5nc0ZpbGVQYXRoKCksIFwidXRmOFwiKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBwcm9iYWJseSBkb2VzbnQgZXhpc3RcbiAgICAgICAgLy8gdGltZSB0byBjcmVhdGUgaXRcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBsb2dzRGlyOiBhd2FpdCBnZXREZWZhdWx0TmF0aXZlRGF0YURpcigpLFxuICAgICAgICAgICAgaW1hZ2VDYWNoZURpcjogYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZUltYWdlRGlyKCksXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBzYXZlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxuXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICB9XG59XG5cbi8vIGRvbnQgZXhwb3NlIHRoaXMgdG8gcmVuZGVyZXIgZnV0dXJlIG1lXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBNTFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncykgcmV0dXJuO1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShhd2FpdCBnZXRTZXR0aW5nc0ZpbGVQYXRoKCksIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLCBudWxsLCA0KSwgXCJ1dGY4XCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0ZpbGVQYXRoKCkge1xuICAgIC8vIG1sU2V0dGluZ3MuanNvbiB3aWxsIGFsd2F5cyBpbiB0aGF0IGZvbGRlclxuICAgIGNvbnN0IE1sRGF0YURpciA9IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKE1sRGF0YURpcik7XG4gICAgY29uc3QgbWxTZXR0aW5nc0RpciA9IHBhdGguam9pbihNbERhdGFEaXIsIFwibWxTZXR0aW5ncy5qc29uXCIpO1xuXG4gICAgcmV0dXJuIG1sU2V0dGluZ3NEaXI7XG59XG5cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyByZWFkZGlyLCByZWFkRmlsZSwgdW5saW5rLCB3cml0ZUZpbGUgfSBmcm9tIFwibm9kZTpmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCJAdXRpbHMvUXVldWVcIjtcbmltcG9ydCB7IGRpYWxvZywgSXBjTWFpbkludm9rZUV2ZW50LCBzaGVsbCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5pbXBvcnQgeyBEQVRBX0RJUiB9IGZyb20gXCIuLi8uLi8uLi9tYWluL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHNhdmVTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBlbnN1cmVEaXJlY3RvcnlFeGlzdHMsIGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCB7IGdldFNldHRpbmdzIH07XG5cbi8vIHNvIHdlIGNhbiBmaWx0ZXIgdGhlIG5hdGl2ZSBoZWxwZXJzIGJ5IHRoaXMga2V5XG5leHBvcnQgZnVuY3Rpb24gbWVzc2FnZUxvZ2dlckVuaGFuY2VkVW5pcXVlSWRUaGluZ3lJZGtNYW4oKSB7IH1cblxuLy8gTWFwPGF0dGFjaG1ldElkLCBwYXRoPigpXG5jb25zdCBuYXRpdmVTYXZlZEltYWdlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5leHBvcnQgY29uc3QgZ2V0TmF0aXZlU2F2ZWRJbWFnZXMgPSAoKSA9PiBuYXRpdmVTYXZlZEltYWdlcztcblxubGV0IGxvZ3NEaXI6IHN0cmluZztcbmxldCBpbWFnZUNhY2hlRGlyOiBzdHJpbmc7XG5cbmNvbnN0IGdldEltYWdlQ2FjaGVEaXIgPSBhc3luYyAoKSA9PiBpbWFnZUNhY2hlRGlyID8/IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpO1xuY29uc3QgZ2V0TG9nc0RpciA9IGFzeW5jICgpID0+IGxvZ3NEaXIgPz8gYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKTtcblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0RGlycygpIHtcbiAgICBjb25zdCB7IGxvZ3NEaXI6IGxkLCBpbWFnZUNhY2hlRGlyOiBpY2QgfSA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG5cbiAgICBsb2dzRGlyID0gbGQgfHwgYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKTtcbiAgICBpbWFnZUNhY2hlRGlyID0gaWNkIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpO1xufVxuaW5pdERpcnMoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBpbWFnZURpciA9IGF3YWl0IGdldEltYWdlQ2FjaGVEaXIoKTtcblxuICAgIGF3YWl0IGVuc3VyZURpcmVjdG9yeUV4aXN0cyhpbWFnZURpcik7XG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCByZWFkZGlyKGltYWdlRGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnRJZCA9IGdldEF0dGFjaG1lbnRJZEZyb21GaWxlbmFtZShmaWxlbmFtZSk7XG4gICAgICAgIG5hdGl2ZVNhdmVkSW1hZ2VzLnNldChhdHRhY2htZW50SWQsIHBhdGguam9pbihpbWFnZURpciwgZmlsZW5hbWUpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJbWFnZU5hdGl2ZShfZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgYXR0YWNobWVudElkOiBzdHJpbmcpOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBCdWZmZXIgfCBudWxsPiB7XG4gICAgY29uc3QgaW1hZ2VQYXRoID0gbmF0aXZlU2F2ZWRJbWFnZXMuZ2V0KGF0dGFjaG1lbnRJZCk7XG4gICAgaWYgKCFpbWFnZVBhdGgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhd2FpdCByZWFkRmlsZShpbWFnZVBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVJbWFnZU5hdGl2ZShfZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCwgZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogVWludDhBcnJheSkge1xuICAgIGlmICghZmlsZW5hbWUgfHwgIWNvbnRlbnQpIHJldHVybjtcbiAgICBjb25zdCBpbWFnZURpciA9IGF3YWl0IGdldEltYWdlQ2FjaGVEaXIoKTtcblxuICAgIC8vIHJldHVybnMgdGhlIGZpbGUgbmFtZVxuICAgIC8vIC4uLy4uL3NvbWVNYWxpY291c1BhdGgucG5nIC0+IHNvbWVNYWxpY291c1BhdGhcbiAgICBjb25zdCBhdHRhY2htZW50SWQgPSBnZXRBdHRhY2htZW50SWRGcm9tRmlsZW5hbWUoZmlsZW5hbWUpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdJbWFnZSA9IG5hdGl2ZVNhdmVkSW1hZ2VzLmdldChhdHRhY2htZW50SWQpO1xuICAgIGlmIChleGlzdGluZ0ltYWdlKSByZXR1cm47XG5cbiAgICBjb25zdCBpbWFnZVBhdGggPSBwYXRoLmpvaW4oaW1hZ2VEaXIsIGZpbGVuYW1lKTtcbiAgICBhd2FpdCBlbnN1cmVEaXJlY3RvcnlFeGlzdHMoaW1hZ2VEaXIpO1xuICAgIGF3YWl0IHdyaXRlRmlsZShpbWFnZVBhdGgsIGNvbnRlbnQpO1xuXG4gICAgbmF0aXZlU2F2ZWRJbWFnZXMuc2V0KGF0dGFjaG1lbnRJZCwgaW1hZ2VQYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUZpbGVOYXRpdmUoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGF0dGFjaG1lbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW1hZ2VQYXRoID0gbmF0aXZlU2F2ZWRJbWFnZXMuZ2V0KGF0dGFjaG1lbnRJZCk7XG4gICAgaWYgKCFpbWFnZVBhdGgpIHJldHVybjtcblxuICAgIGF3YWl0IHVubGluayhpbWFnZVBhdGgpO1xufVxuXG5jb25zdCBMT0dTX0RBVEFfRklMRU5BTUUgPSBcIm1lc3NhZ2UtbG9nZ2VyLWxvZ3MuanNvblwiO1xuY29uc3QgZGF0YVdyaXRlUXVldWUgPSBuZXcgUXVldWUoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExvZ3NGcm9tRnMoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQpIHtcbiAgICBjb25zdCBsb2dzRGlyID0gYXdhaXQgZ2V0TG9nc0RpcigpO1xuXG4gICAgYXdhaXQgZW5zdXJlRGlyZWN0b3J5RXhpc3RzKGxvZ3NEaXIpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGF3YWl0IHJlYWRGaWxlKHBhdGguam9pbihsb2dzRGlyLCBMT0dTX0RBVEFfRklMRU5BTUUpLCBcInV0Zi04XCIpKTtcbiAgICB9IGNhdGNoIHsgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZUxvZ3MoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBsb2dzRGlyID0gYXdhaXQgZ2V0TG9nc0RpcigpO1xuXG4gICAgZGF0YVdyaXRlUXVldWUucHVzaCgoKSA9PiB3cml0ZUZpbGUocGF0aC5qb2luKGxvZ3NEaXIsIExPR1NfREFUQV9GSUxFTkFNRSksIGNvbnRlbnRzKSk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHROYXRpdmVJbWFnZURpcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oYXdhaXQgZ2V0RGVmYXVsdE5hdGl2ZURhdGFEaXIoKSwgXCJzYXZlZEltYWdlc1wiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHBhdGguam9pbihEQVRBX0RJUiwgXCJNZXNzYWdlTG9nZ2VyRGF0YVwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNob29zZURpcihldmVudDogSXBjTWFpbkludm9rZUV2ZW50LCBsb2dLZXk6IFwibG9nc0RpclwiIHwgXCJpbWFnZUNhY2hlRGlyXCIpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XG4gICAgY29uc3QgZGVmYXVsdFBhdGggPSBzZXR0aW5nc1tsb2dLZXldIHx8IGF3YWl0IGdldERlZmF1bHROYXRpdmVEYXRhRGlyKCk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBkaWFsb2cuc2hvd09wZW5EaWFsb2coeyBwcm9wZXJ0aWVzOiBbXCJvcGVuRGlyZWN0b3J5XCJdLCBkZWZhdWx0UGF0aDogZGVmYXVsdFBhdGggfSk7XG4gICAgY29uc3QgZGlyID0gcmVzLmZpbGVQYXRoc1swXTtcblxuICAgIGlmICghZGlyKSB0aHJvdyBFcnJvcihcIkludmFsaWQgRGlyZWN0b3J5XCIpO1xuXG4gICAgc2V0dGluZ3NbbG9nS2V5XSA9IGRpcjtcblxuICAgIGF3YWl0IHNhdmVTZXR0aW5ncyhzZXR0aW5ncyk7XG5cbiAgICBzd2l0Y2ggKGxvZ0tleSkge1xuICAgICAgICBjYXNlIFwibG9nc0RpclwiOiBsb2dzRGlyID0gZGlyOyBicmVhaztcbiAgICAgICAgY2FzZSBcImltYWdlQ2FjaGVEaXJcIjogaW1hZ2VDYWNoZURpciA9IGRpcjsgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGxvZ0tleSA9PT0gXCJpbWFnZUNhY2hlRGlyXCIpXG4gICAgICAgIGF3YWl0IGluaXQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGRpcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3dJdGVtSW5Gb2xkZXIoX2V2ZW50OiBJcGNNYWluSW52b2tlRXZlbnQsIGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICBzaGVsbC5zaG93SXRlbUluRm9sZGVyKGZpbGVQYXRoKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tIFwiaHR0cHNcIjtcblxuLy8gVGhlc2UgbGlua3MgZG9uJ3Qgc3VwcG9ydCBDT1JTLCBzbyB0aGlzIGhhcyB0byBiZSBuYXRpdmVcbmNvbnN0IHZhbGlkUmVkaXJlY3RVcmxzID0gL15odHRwczpcXC9cXC8oc3BvdGlmeVxcLmxpbmt8c1xcLnRlYW0pXFwvLiskLztcblxuZnVuY3Rpb24gZ2V0UmVkaXJlY3QodXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHJlcXVlc3QobmV3IFVSTCh1cmwpLCB7IG1ldGhvZDogXCJIRUFEXCIgfSwgcmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgICAgcmVzLmhlYWRlcnMubG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgPyBnZXRSZWRpcmVjdChyZXMuaGVhZGVycy5sb2NhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgOiB1cmxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCByZWplY3QpO1xuICAgICAgICByZXEuZW5kKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXNvbHZlUmVkaXJlY3QoXzogSXBjTWFpbkludm9rZUV2ZW50LCB1cmw6IHN0cmluZykge1xuICAgIGlmICghdmFsaWRSZWRpcmVjdFVybHMudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gICAgcmV0dXJuIGdldFJlZGlyZWN0KHVybCk7XG59XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBEaXNjb3JkIGNsaWVudCBtb2RcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyXG4gKi9cblxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyByZWFkRmlsZSB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHsgYmFzZW5hbWUsIG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkUmVjb3JkaW5nKF8sIGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgICBmaWxlUGF0aCA9IG5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBiYXNlbmFtZShmaWxlUGF0aCk7XG4gICAgY29uc3QgZGlzY29yZEJhc2VEaXJXaXRoVHJhaWxpbmdTbGFzaCA9IG5vcm1hbGl6ZShhcHAuZ2V0UGF0aChcInVzZXJEYXRhXCIpICsgXCIvXCIpO1xuICAgIGNvbnNvbGUubG9nKGZpbGVuYW1lLCBkaXNjb3JkQmFzZURpcldpdGhUcmFpbGluZ1NsYXNoLCBmaWxlUGF0aCk7XG4gICAgaWYgKGZpbGVuYW1lICE9PSBcInJlY29yZGluZy5vZ2dcIiB8fCAhZmlsZVBhdGguc3RhcnRzV2l0aChkaXNjb3JkQmFzZURpcldpdGhUcmFpbGluZ1NsYXNoKSkgcmV0dXJuIG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBidWYgPSBhd2FpdCByZWFkRmlsZShmaWxlUGF0aCk7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWYuYnVmZmVyKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IFwiLyogZXNsaW50LWRpc2FibGUgKi9cXG5cXG4vKipcXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBZEd1YXJkJ3MgQmxvY2sgWW91VHViZSBBZHMgKGh0dHBzOi8vZ2l0aHViLmNvbS9BZGd1YXJkVGVhbS9CbG9ja1lvdVR1YmVBZHNTaG9ydGN1dCkuXFxuICpcXG4gKiBDb3B5cmlnaHQgKEMpIEFkR3VhcmQgVGVhbVxcbiAqXFxuICogQWRHdWFyZCdzIEJsb2NrIFlvdVR1YmUgQWRzIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcXG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXFxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cXG4gKlxcbiAqIEFkR3VhcmQncyBCbG9jayBZb3VUdWJlIEFkcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXFxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXFxuICpcXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxcbiAqIGFsb25nIHdpdGggQWRHdWFyZCdzIEJsb2NrIFlvdVR1YmUgQWRzLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxcbiAqL1xcblxcbmNvbnN0IExPR09fSUQgPSBcXFwiYmxvY2steW91dHViZS1hZHMtbG9nb1xcXCI7XFxuY29uc3QgaGlkZGVuQ1NTID0gW1xcbiAgICBcXFwiI19fZmZZb3V0dWJlMVxcXCIsXFxuICAgIFxcXCIjX19mZllvdXR1YmUyXFxcIixcXG4gICAgXFxcIiNfX2ZmWW91dHViZTNcXFwiLFxcbiAgICBcXFwiI19fZmZZb3V0dWJlNFxcXCIsXFxuICAgIFxcXCIjZmVlZC1weXYtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIiNmZWVkbW9kdWxlLVBST1xcXCIsXFxuICAgIFxcXCIjaG9tZXBhZ2UtY2hyb21lLXNpZGUtcHJvbW9cXFwiLFxcbiAgICBcXFwiI21lcmNoLXNoZWxmXFxcIixcXG4gICAgXFxcIiNvZmZlci1tb2R1bGVcXFwiLFxcbiAgICAnI3BsYS1zaGVsZiA+IHl0ZC1wbGEtc2hlbGYtcmVuZGVyZXJbY2xhc3M9XFxcInN0eWxlLXNjb3BlIHl0ZC13YXRjaFxcXCJdJyxcXG4gICAgXFxcIiNwbGEtc2hlbGZcXFwiLFxcbiAgICBcXFwiI3ByZW1pdW0teXZhXFxcIixcXG4gICAgXFxcIiNwcm9tby1pbmZvXFxcIixcXG4gICAgXFxcIiNwcm9tby1saXN0XFxcIixcXG4gICAgXFxcIiNwcm9tb3Rpb24tc2hlbGZcXFwiLFxcbiAgICBcXFwiI3JlbGF0ZWQgPiB5dGQtd2F0Y2gtbmV4dC1zZWNvbmRhcnktcmVzdWx0cy1yZW5kZXJlciA+ICNpdGVtcyA+IHl0ZC1jb21wYWN0LXByb21vdGVkLXZpZGVvLXJlbmRlcmVyLnl0ZC13YXRjaC1uZXh0LXNlY29uZGFyeS1yZXN1bHRzLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIiNzZWFyY2gtcHZhXFxcIixcXG4gICAgXFxcIiNzaGVsZi1weXYtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIiN2aWRlby1tYXN0aGVhZFxcXCIsXFxuICAgIFxcXCIjd2F0Y2gtYnJhbmRlZC1hY3Rpb25zXFxcIixcXG4gICAgXFxcIiN3YXRjaC1idXktdXJsc1xcXCIsXFxuICAgIFxcXCIjd2F0Y2gtY2hhbm5lbC1icmFuZC1kaXZcXFwiLFxcbiAgICBcXFwiI3dhdGNoNy1icmFuZGVkLWJhbm5lclxcXCIsXFxuICAgIFxcXCIjWXRLZXZsYXJWaXNpYmlsaXR5SWRlbnRpZmllclxcXCIsXFxuICAgIFxcXCIjWXRTcGFya2xlc1Zpc2liaWxpdHlJZGVudGlmaWVyXFxcIixcXG4gICAgXFxcIi5jYXJvdXNlbC1vZmZlci11cmwtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi5jb21wYW5pb24tYWQtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi5Hb29nbGVBY3RpdmVWaWV3RWxlbWVudFxcXCIsXFxuICAgICcubGlzdC12aWV3W3N0eWxlPVxcXCJtYXJnaW46IDdweCAwcHQ7XFxcIl0nLFxcbiAgICBcXFwiLnByb21vdGVkLXNwYXJrbGVzLXRleHQtc2VhcmNoLXJvb3QtY29udGFpbmVyXFxcIixcXG4gICAgXFxcIi5wcm9tb3RlZC12aWRlb3NcXFwiLFxcbiAgICBcXFwiLnNlYXJjaFZpZXcubGlzdC12aWV3XFxcIixcXG4gICAgXFxcIi5zcGFya2xlcy1saWdodC1jdGFcXFwiLFxcbiAgICBcXFwiLndhdGNoLWV4dHJhLWluZm8tY29sdW1uXFxcIixcXG4gICAgXFxcIi53YXRjaC1leHRyYS1pbmZvLXJpZ2h0XFxcIixcXG4gICAgXFxcIi55dGQtY2Fyb3VzZWwtYWQtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1jb21wYWN0LXByb21vdGVkLXZpZGVvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtY29tcGFuaW9uLXNsb3QtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1tZXJjaC1zaGVsZi1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXBsYXllci1sZWdhY3ktZGVza3RvcC13YXRjaC1hZHMtcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwiLnl0ZC1wcm9tb3RlZC1zcGFya2xlcy10ZXh0LXNlYXJjaC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXByb21vdGVkLXZpZGVvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dGQtc2VhcmNoLXB5di1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCIueXRkLXZpZGVvLW1hc3RoZWFkLWFkLXYzLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcIi55dHAtYWQtYWN0aW9uLWludGVyc3RpdGlhbC1iYWNrZ3JvdW5kLWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIueXRwLWFkLWFjdGlvbi1pbnRlcnN0aXRpYWwtc2xvdFxcXCIsXFxuICAgIFxcXCIueXRwLWFkLWltYWdlLW92ZXJsYXlcXFwiLFxcbiAgICBcXFwiLnl0cC1hZC1vdmVybGF5LWNvbnRhaW5lclxcXCIsXFxuICAgIFxcXCIueXRwLWFkLXByb2dyZXNzXFxcIixcXG4gICAgXFxcIi55dHAtYWQtcHJvZ3Jlc3MtbGlzdFxcXCIsXFxuICAgICdbY2xhc3MqPVxcXCJ5dGQtZGlzcGxheS1hZC1cXFwiXScsXFxuICAgICdbbGF5b3V0Kj1cXFwiZGlzcGxheS1hZC1cXFwiXScsXFxuICAgICdhW2hyZWZePVxcXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL2N0aHJ1P1xcXCJdJyxcXG4gICAgJ2FbaHJlZl49XFxcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2N0aHJ1P1xcXCJdJyxcXG4gICAgXFxcInl0ZC1hY3Rpb24tY29tcGFuaW9uLWFkLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1iYW5uZXItcHJvbW8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLWNvbXBhY3QtcHJvbW90ZWQtdmlkZW8tcmVuZGVyZXJcXFwiLFxcbiAgICBcXFwieXRkLWNvbXBhbmlvbi1zbG90LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1kaXNwbGF5LWFkLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1wcm9tb3RlZC1zcGFya2xlcy10ZXh0LXNlYXJjaC1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtcHJvbW90ZWQtc3BhcmtsZXMtd2ViLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1zZWFyY2gtcHl2LXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC1zaW5nbGUtb3B0aW9uLXN1cnZleS1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJ5dGQtdmlkZW8tbWFzdGhlYWQtYWQtYWR2ZXJ0aXNlci1pbmZvLXJlbmRlcmVyXFxcIixcXG4gICAgXFxcInl0ZC12aWRlby1tYXN0aGVhZC1hZC12My1yZW5kZXJlclxcXCIsXFxuICAgIFxcXCJZVE0tUFJPTU9URUQtVklERU8tUkVOREVSRVJcXFwiLFxcbl07XFxuLyoqXFxuKiBBZGRzIENTUyB0byB0aGUgcGFnZVxcbiovXFxuY29uc3QgaGlkZUVsZW1lbnRzID0gKCkgPT4ge1xcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBoaWRkZW5DU1M7XFxuICAgIGlmICghc2VsZWN0b3JzKSB7XFxuICAgICAgICByZXR1cm47XFxuICAgIH1cXG4gICAgY29uc3QgcnVsZSA9IHNlbGVjdG9ycy5qb2luKFxcXCIsIFxcXCIpICsgXFxcIiB7IGRpc3BsYXk6IG5vbmUhaW1wb3J0YW50OyB9XFxcIjtcXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxcXCJzdHlsZVxcXCIpO1xcbiAgICBzdHlsZS5pbm5lckhUTUwgPSBydWxlO1xcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcXG59O1xcbi8qKlxcbiogQ2FsbHMgdGhlIFxcXCJjYWxsYmFja1xcXCIgZnVuY3Rpb24gb24gZXZlcnkgRE9NIGNoYW5nZSwgYnV0IG5vdCBmb3IgdGhlIHRyYWNrZWQgZXZlbnRzXFxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvblxcbiovXFxuY29uc3Qgb2JzZXJ2ZURvbUNoYW5nZXMgPSBjYWxsYmFjayA9PiB7XFxuICAgIGNvbnN0IGRvbU11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xcbiAgICAgICAgY2FsbGJhY2sobXV0YXRpb25zKTtcXG4gICAgfSk7XFxuICAgIGRvbU11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXFxuICAgIH0pO1xcbn07XFxuLyoqXFxuKiBUaGlzIGZ1bmN0aW9uIGlzIHN1cHBvc2VkIHRvIGJlIGNhbGxlZCBvbiBldmVyeSBET00gY2hhbmdlXFxuKi9cXG5jb25zdCBoaWRlRHluYW1pY0FkcyA9ICgpID0+IHtcXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxcXCIjY29udGVudHMgPiB5dGQtcmljaC1pdGVtLXJlbmRlcmVyIHl0ZC1kaXNwbGF5LWFkLXJlbmRlcmVyXFxcIik7XFxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcXG4gICAgICAgIHJldHVybjtcXG4gICAgfVxcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcXG4gICAgICAgIGlmIChlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcXG4gICAgICAgICAgICBpZiAocGFyZW50LmxvY2FsTmFtZSA9PT0gXFxcInl0ZC1yaWNoLWl0ZW0tcmVuZGVyZXJcXFwiKSB7XFxuICAgICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXFxcIm5vbmVcXFwiO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfSk7XFxufTtcXG4vKipcXG4qIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSB2aWRlbyBhZHMgYXJlIGN1cnJlbnRseSBydW5uaW5nXFxuKiBhbmQgYXV0by1jbGlja3MgdGhlIHNraXAgYnV0dG9uLlxcbiovXFxuY29uc3QgYXV0b1NraXBBZHMgPSAoKSA9PiB7XFxuICAgIC8vIElmIHRoZXJlJ3MgYSB2aWRlbyB0aGF0IHBsYXlzIHRoZSBhZCBhdCB0aGlzIG1vbWVudCwgc2Nyb2xsIHRoaXMgYWRcXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcIi5hZC1zaG93aW5nXFxcIikpIHtcXG4gICAgICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwidmlkZW9cXFwiKTtcXG4gICAgICAgIGlmICh2aWRlbyAmJiB2aWRlby5kdXJhdGlvbikge1xcbiAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gdmlkZW8uZHVyYXRpb247XFxuICAgICAgICAgICAgLy8gU2tpcCBidXR0b24gc2hvdWxkIGFwcGVhciBhZnRlciB0aGF0LFxcbiAgICAgICAgICAgIC8vIG5vdyBzaW1wbHkgY2xpY2sgaXQgYXV0b21hdGljYWxseVxcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xcbiAgICAgICAgICAgICAgICBjb25zdCBza2lwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcXFwiYnV0dG9uLnl0cC1hZC1za2lwLWJ1dHRvblxcXCIpO1xcbiAgICAgICAgICAgICAgICBpZiAoc2tpcEJ0bikge1xcbiAgICAgICAgICAgICAgICAgICAgc2tpcEJ0bi5jbGljaygpO1xcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfSwgMTAwKTtcXG4gICAgICAgIH1cXG4gICAgfVxcbn07XFxuLyoqXFxuKiBUaGlzIGZ1bmN0aW9uIG92ZXJyaWRlcyBhIHByb3BlcnR5IG9uIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxcbipcXG4qIEBwYXJhbSB7b2JqZWN0fSBvYmogb2JqZWN0IHRvIGxvb2sgZm9yIHByb3BlcnRpZXMgaW5cXG4qIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgdG8gb3ZlcnJpZGVcXG4qIEBwYXJhbSB7Kn0gb3ZlcnJpZGVWYWx1ZSB2YWx1ZSB0byBzZXRcXG4qL1xcbmNvbnN0IG92ZXJyaWRlT2JqZWN0ID0gKG9iaiwgcHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKSA9PiB7XFxuICAgIGlmICghb2JqKSB7XFxuICAgICAgICByZXR1cm4gZmFsc2U7XFxuICAgIH1cXG4gICAgbGV0IG92ZXJyaWRlbiA9IGZhbHNlO1xcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgPT09IHByb3BlcnR5TmFtZSkge1xcbiAgICAgICAgICAgIG9ialtrZXldID0gb3ZlcnJpZGVWYWx1ZTtcXG4gICAgICAgICAgICBvdmVycmlkZW4gPSB0cnVlO1xcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcXG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgdHlwZW9mIG9ialtrZXldID09PSBcXFwib2JqZWN0XFxcIikge1xcbiAgICAgICAgICAgIGlmIChvdmVycmlkZU9iamVjdChvYmpba2V5XSwgcHJvcGVydHlOYW1lLCBvdmVycmlkZVZhbHVlKSkge1xcbiAgICAgICAgICAgICAgICBvdmVycmlkZW4gPSB0cnVlO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcbiAgICByZXR1cm4gb3ZlcnJpZGVuO1xcbn07XFxuLyoqXFxuKiBPdmVycmlkZXMgSlNPTi5wYXJzZSBhbmQgUmVzcG9uc2UuanNvbiBmdW5jdGlvbnMuXFxuKiBFeGFtaW5lcyB0aGVzZSBmdW5jdGlvbnMgYXJndW1lbnRzLCBsb29rcyBmb3IgcHJvcGVydGllcyB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSB0aGVyZVxcbiogYW5kIGlmIGl0IGV4aXN0cywgY2hhbmdlcyBpdCdzIHZhbHVlIHRvIHdoYXQgd2FzIHNwZWNpZmllZC5cXG4qXFxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIG5hbWUgb2YgdGhlIHByb3BlcnR5XFxuKiBAcGFyYW0geyp9IG92ZXJyaWRlVmFsdWUgbmV3IHZhbHVlIGZvciB0aGUgcHJvcGVydHlcXG4qL1xcbmNvbnN0IGpzb25PdmVycmlkZSA9IChwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpID0+IHtcXG4gICAgY29uc3QgbmF0aXZlSlNPTlBhcnNlID0gSlNPTi5wYXJzZTtcXG4gICAgSlNPTi5wYXJzZSA9ICguLi5hcmdzKSA9PiB7XFxuICAgICAgICBjb25zdCBvYmogPSBuYXRpdmVKU09OUGFyc2UuYXBwbHkodGhpcywgYXJncyk7XFxuICAgICAgICAvLyBPdmVycmlkZSBpdCdzIHByb3BzIGFuZCByZXR1cm4gYmFjayB0byB0aGUgY2FsbGVyXFxuICAgICAgICBvdmVycmlkZU9iamVjdChvYmosIHByb3BlcnR5TmFtZSwgb3ZlcnJpZGVWYWx1ZSk7XFxuICAgICAgICByZXR1cm4gb2JqO1xcbiAgICB9O1xcbiAgICAvLyBPdmVycmlkZSBSZXNwb25zZS5wcm90b3R5cGUuanNvblxcbiAgICBjb25zdCBuYXRpdmVSZXNwb25zZUpzb24gPSBSZXNwb25zZS5wcm90b3R5cGUuanNvbjtcXG4gICAgUmVzcG9uc2UucHJvdG90eXBlLmpzb24gPSBuZXcgUHJveHkobmF0aXZlUmVzcG9uc2VKc29uLCB7XFxuICAgICAgICBhcHBseSguLi5hcmdzKSB7XFxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgdGFyZ2V0IGZ1bmN0aW9uLCBnZXQgdGhlIG9yaWdpbmFsIFByb21pc2VcXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gUmVmbGVjdC5hcHBseSguLi5hcmdzKTtcXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgb25lIGFuZCBvdmVycmlkZSB0aGUgSlNPTiBpbnNpZGVcXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZGF0YSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZU9iamVjdChkYXRhLCBwcm9wZXJ0eU5hbWUsIG92ZXJyaWRlVmFsdWUpO1xcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XFxuICAgICAgICAgICAgfSk7XFxuICAgICAgICB9LFxcbiAgICB9KTtcXG59O1xcbmNvbnN0IGFkZEFkR3VhcmRMb2dvU3R5bGUgPSAoKSA9PiB7IH07XFxuY29uc3QgYWRkQWRHdWFyZExvZ28gPSAoKSA9PiB7XFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChMT0dPX0lEKSkge1xcbiAgICAgICAgcmV0dXJuO1xcbiAgICB9XFxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxcXCJzcGFuXFxcIik7XFxuICAgIGxvZ28uaW5uZXJIVE1MID0gXFxcIl9fbG9nb190ZXh0X19cXFwiO1xcbiAgICBsb2dvLnNldEF0dHJpYnV0ZShcXFwiaWRcXFwiLCBMT0dPX0lEKTtcXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXFxcIm0ueW91dHViZS5jb21cXFwiKSB7XFxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxcXCJoZWFkZXIubW9iaWxlLXRvcGJhci1oZWFkZXIgPiBidXR0b25cXFwiKTtcXG4gICAgICAgIGlmIChidG4pIHtcXG4gICAgICAgICAgICBidG4ucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGxvZ28sIGJ0bi5uZXh0U2libGluZyk7XFxuICAgICAgICAgICAgYWRkQWRHdWFyZExvZ29TdHlsZSgpO1xcbiAgICAgICAgfVxcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXFxcInd3dy55b3V0dWJlLmNvbVxcXCIpIHtcXG4gICAgICAgIGNvbnN0IGNvZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcXFwiY291bnRyeS1jb2RlXFxcIik7XFxuICAgICAgICBpZiAoY29kZSkge1xcbiAgICAgICAgICAgIGNvZGUuaW5uZXJIVE1MID0gXFxcIlxcXCI7XFxuICAgICAgICAgICAgY29kZS5hcHBlbmRDaGlsZChsb2dvKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcXFwibXVzaWMueW91dHViZS5jb21cXFwiKSB7XFxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcIi55dG11c2ljLW5hdi1iYXIjbGVmdC1jb250ZW50XFxcIik7XFxuICAgICAgICBpZiAoZWwpIHtcXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChsb2dvKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSBcXFwid3d3LnlvdXR1YmUtbm9jb29raWUuY29tXFxcIikge1xcbiAgICAgICAgY29uc3QgY29kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXFxcIiN5dC1tYXN0aGVhZCAjbG9nby1jb250YWluZXIgLmNvbnRlbnQtcmVnaW9uXFxcIik7XFxuICAgICAgICBpZiAoY29kZSkge1xcbiAgICAgICAgICAgIGNvZGUuaW5uZXJIVE1MID0gXFxcIlxcXCI7XFxuICAgICAgICAgICAgY29kZS5hcHBlbmRDaGlsZChsb2dvKTtcXG4gICAgICAgICAgICBhZGRBZEd1YXJkTG9nb1N0eWxlKCk7XFxuICAgICAgICB9XFxuICAgIH1cXG59O1xcbi8vIFJlbW92ZXMgYWRzIG1ldGFkYXRhIGZyb20gWW91VHViZSBYSFIgcmVxdWVzdHNcXG5qc29uT3ZlcnJpZGUoXFxcImFkUGxhY2VtZW50c1xcXCIsIFtdKTtcXG5qc29uT3ZlcnJpZGUoXFxcInBsYXllckFkc1xcXCIsIFtdKTtcXG4vLyBBcHBsaWVzIENTUyB0aGF0IGhpZGVzIFlvdVR1YmUgYWQgZWxlbWVudHNcXG5oaWRlRWxlbWVudHMoKTtcXG4vLyBTb21lIGNoYW5nZXMgc2hvdWxkIGJlIHJlLWV2YWx1YXRlZCBvbiBldmVyeSBwYWdlIGNoYW5nZVxcbmFkZEFkR3VhcmRMb2dvKCk7XFxuaGlkZUR5bmFtaWNBZHMoKTtcXG5hdXRvU2tpcEFkcygpO1xcbm9ic2VydmVEb21DaGFuZ2VzKCgpID0+IHtcXG4gICAgYWRkQWRHdWFyZExvZ28oKTtcXG4gICAgaGlkZUR5bmFtaWNBZHMoKTtcXG4gICAgYXV0b1NraXBBZHMoKTtcXG59KTtcIiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBSZW5kZXJlclNldHRpbmdzIH0gZnJvbSBcIkBtYWluL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCBhZGd1YXJkIGZyb20gXCJmaWxlOi8vYWRndWFyZC5qcz9taW5pZnlcIjtcblxuYXBwLm9uKFwiYnJvd3Nlci13aW5kb3ctY3JlYXRlZFwiLCAoXywgd2luKSA9PiB7XG4gICAgd2luLndlYkNvbnRlbnRzLm9uKFwiZnJhbWUtY3JlYXRlZFwiLCAoXywgeyBmcmFtZSB9KSA9PiB7XG4gICAgICAgIGZyYW1lLm9uY2UoXCJkb20tcmVhZHlcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZyYW1lLnVybC5pbmNsdWRlcyhcImRpc2NvcmRzYXlzXCIpICYmIGZyYW1lLnVybC5pbmNsdWRlcyhcInlvdXR1YmUuY29tXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFSZW5kZXJlclNldHRpbmdzLnN0b3JlLnBsdWdpbnM/LldhdGNoVG9nZXRoZXJBZGJsb2NrPy5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBmcmFtZS5leGVjdXRlSmF2YVNjcmlwdChhZGd1YXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIERpc2NvcmQgY2xpZW50IG1vZFxuICogQ29weXJpZ2h0IChjKSAyMDIzIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTb2NrZXQsIFNvY2tldCB9IGZyb20gXCJkZ3JhbVwiO1xuXG5sZXQgeHNvU29ja2V0OiBTb2NrZXQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kVG9PdmVybGF5KF8sIGRhdGE6IGFueSkge1xuICAgIGRhdGEuaWNvbiA9IEJ1ZmZlci5mcm9tKGRhdGEuaWNvbikudG9TdHJpbmcoXCJiYXNlNjRcIik7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIHhzb1NvY2tldCA/Pz0gY3JlYXRlU29ja2V0KFwidWRwNFwiKTtcbiAgICB4c29Tb2NrZXQuc2VuZChqc29uLCA0MjA2OSwgXCIxMjcuMC4wLjFcIik7XG59XG4iLCAiaW1wb3J0ICogYXMgcDAgZnJvbSBcIi4vcGx1Z2lucy9hcHBsZU11c2ljLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwMSBmcm9tIFwiLi9wbHVnaW5zL2NvbnNvbGVTaG9ydGN1dHMvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwMiBmcm9tIFwiLi9wbHVnaW5zL2ZpeFNwb3RpZnlFbWJlZHMuZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHAzIGZyb20gXCIuL3BsdWdpbnMvZml4WW91dHViZUVtYmVkcy5kZXNrdG9wL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDQgZnJvbSBcIi4vcGx1Z2lucy9tZWRpYURvd25sb2FkZXIuZGVza3RvcC9uYXRpdmVcIjtcbmltcG9ydCAqIGFzIHA1IGZyb20gXCIuL3BsdWdpbnMvbWVzc2FnZUxvZ2dlckVuaGFuY2VkL25hdGl2ZVwiO1xuaW1wb3J0ICogYXMgcDYgZnJvbSBcIi4vcGx1Z2lucy9vcGVuSW5BcHAvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwNyBmcm9tIFwiLi9wbHVnaW5zL3ZvaWNlTWVzc2FnZXMvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwOCBmcm9tIFwiLi9wbHVnaW5zL3dhdGNoVG9nZXRoZXJBZGJsb2NrLmRlc2t0b3AvbmF0aXZlXCI7XG5pbXBvcnQgKiBhcyBwOSBmcm9tIFwiLi9wbHVnaW5zL3hzT3ZlcmxheS5kZXNrdG9wL25hdGl2ZVwiO1xuZXhwb3J0IGRlZmF1bHQge1xuXCJBcHBsZU11c2ljUmljaFByZXNlbmNlXCI6cDAsXG5cIkNvbnNvbGVTaG9ydGN1dHNcIjpwMSxcblwiRml4U3BvdGlmeUVtYmVkc1wiOnAyLFxuXCJGaXhZb3V0dWJlRW1iZWRzXCI6cDMsXG5cIk1lZGlhRG93bmxvYWRlclwiOnA0LFxuXCJNZXNzYWdlTG9nZ2VyRW5oYW5jZWRcIjpwNSxcblwiT3BlbkluQXBwXCI6cDYsXG5cIlZvaWNlTWVzc2FnZXNcIjpwNyxcblwiV2F0Y2hUb2dldGhlckFkYmxvY2tcIjpwOCxcblwiWFNPdmVybGF5XCI6cDksXG59OyIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBJcGNFdmVudHMgfSBmcm9tIFwiQHNoYXJlZC9JcGNFdmVudHNcIjtcbmltcG9ydCB7IGlwY01haW4gfSBmcm9tIFwiZWxlY3Ryb25cIjtcblxuaW1wb3J0IFBsdWdpbk5hdGl2ZXMgZnJvbSBcIn5wbHVnaW5OYXRpdmVzXCI7XG5cbmNvbnN0IFBsdWdpbklwY01hcHBpbmdzID0ge30gYXMgUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj47XG5leHBvcnQgdHlwZSBQbHVnaW5JcGNNYXBwaW5ncyA9IHR5cGVvZiBQbHVnaW5JcGNNYXBwaW5ncztcblxuZm9yIChjb25zdCBbcGx1Z2luLCBtZXRob2RzXSBvZiBPYmplY3QuZW50cmllcyhQbHVnaW5OYXRpdmVzKSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhtZXRob2RzKTtcbiAgICBpZiAoIWVudHJpZXMubGVuZ3RoKSBjb250aW51ZTtcblxuICAgIGNvbnN0IG1hcHBpbmdzID0gUGx1Z2luSXBjTWFwcGluZ3NbcGx1Z2luXSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBbbWV0aG9kTmFtZSwgbWV0aG9kXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGBSaXZlcmNvcmRQbHVnaW5OYXRpdmVfJHtwbHVnaW59XyR7bWV0aG9kTmFtZX1gO1xuICAgICAgICBpcGNNYWluLmhhbmRsZShrZXksIG1ldGhvZCk7XG4gICAgICAgIG1hcHBpbmdzW21ldGhvZE5hbWVdID0ga2V5O1xuICAgIH1cbn1cblxuaXBjTWFpbi5vbihJcGNFdmVudHMuR0VUX1BMVUdJTl9JUENfTUVUSE9EX01BUCwgZSA9PiB7XG4gICAgZS5yZXR1cm5WYWx1ZSA9IFBsdWdpbklwY01hcHBpbmdzO1xufSk7XG4iLCAiLypcbiAqIFJpdmVyY29yZCwgYSBtb2RpZmljYXRpb24gZm9yIERpc2NvcmQncyBkZXNrdG9wIGFwcFxuICogQ29weXJpZ2h0IChjKSAyMDIyIFZlbmRpY2F0ZWQgYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIHRoYXQgd2lsbCBjYWxsIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gKiBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIGFnYWluXG4gKiB3aXRoaW4gdGhlIGRlbGF5LCB0aGUgdGltZXIgd2lsbCBiZSByZXNldC5cbiAqIEBwYXJhbSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwXG4gKiBAcGFyYW0gZGVsYXkgVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2U8VCBleHRlbmRzIEZ1bmN0aW9uPihmdW5jOiBULCBkZWxheSA9IDMwMCk6IFQge1xuICAgIGxldCB0aW1lb3V0OiBOb2RlSlMuVGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4geyBmdW5jKC4uLmFyZ3MpOyB9LCBkZWxheSk7XG4gICAgfSBhcyBhbnk7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgXCJQQ0ZFVDBOVVdWQkZJR2gwYld3K0NqeG9kRzFzSUd4aGJtYzlJbVZ1SWo0S0NqeG9aV0ZrUGdvZ0lDQWdQRzFsZEdFZ1kyaGhjbk5sZEQwaWRYUm1MVGdpSUM4K0NpQWdJQ0E4ZEdsMGJHVStVbWwyWlhKamIzSmtJRkYxYVdOclExTlRJRVZrYVhSdmNqd3ZkR2wwYkdVK0NpQWdJQ0E4YkdsdWF5QnlaV3c5SW5OMGVXeGxjMmhsWlhRaUlHaHlaV1k5SW1oMGRIQnpPaTh2WTJSdUxtcHpaR1ZzYVhaeUxtNWxkQzl1Y0cwdmJXOXVZV052TFdWa2FYUnZja0F3TGpVd0xqQXZiV2x1TDNaekwyVmthWFJ2Y2k5bFpHbDBiM0l1YldGcGJpNWpjM01pQ2lBZ0lDQWdJQ0FnYVc1MFpXZHlhWFI1UFNKemFHRXlOVFl0ZEdsS1VGRXlUekEwZWk5d1dpOUJkMlI1U1dkb2NrOU5lbVYzWml0UVNYWkZiREZaUzJKUmRuTmFhejBpSUdOeWIzTnpiM0pwWjJsdVBTSmhibTl1ZVcxdmRYTWlDaUFnSUNBZ0lDQWdjbVZtWlhKeVpYSndiMnhwWTNrOUltNXZMWEpsWm1WeWNtVnlJaUF2UGdvZ0lDQWdQSE4wZVd4bFBnb2dJQ0FnSUNBZ0lHaDBiV3dzQ2lBZ0lDQWdJQ0FnWW05a2VTd0tJQ0FnSUNBZ0lDQWpZMjl1ZEdGcGJtVnlJSHNLSUNBZ0lDQWdJQ0FnSUNBZ2NHOXphWFJwYjI0NklHRmljMjlzZFhSbE93b2dJQ0FnSUNBZ0lDQWdJQ0JzWldaME9pQXdPd29nSUNBZ0lDQWdJQ0FnSUNCMGIzQTZJREE3Q2lBZ0lDQWdJQ0FnSUNBZ0lIZHBaSFJvT2lBeE1EQWxPd29nSUNBZ0lDQWdJQ0FnSUNCb1pXbG5hSFE2SURFd01DVTdDaUFnSUNBZ0lDQWdJQ0FnSUcxaGNtZHBiam9nTURzS0lDQWdJQ0FnSUNBZ0lDQWdjR0ZrWkdsdVp6b2dNRHNLSUNBZ0lDQWdJQ0FnSUNBZ2IzWmxjbVpzYjNjNklHaHBaR1JsYmpzS0lDQWdJQ0FnSUNCOUNpQWdJQ0E4TDNOMGVXeGxQZ284TDJobFlXUStDZ284WW05a2VUNEtJQ0FnSUR4a2FYWWdhV1E5SW1OdmJuUmhhVzVsY2lJK1BDOWthWFkrQ2lBZ0lDQThjMk55YVhCMElITnlZejBpYUhSMGNITTZMeTlqWkc0dWFuTmtaV3hwZG5JdWJtVjBMMjV3YlM5dGIyNWhZMjh0WldScGRHOXlRREF1TlRBdU1DOXRhVzR2ZG5NdmJHOWhaR1Z5TG1weklnb2dJQ0FnSUNBZ0lHbHVkR1ZuY21sMGVUMGljMmhoTWpVMkxVdGpWVFE0VkVkeU9EUnlOM1Z1UmpkS05VbG5RbTg1TldGbFZuSkZZbkpIWlRBMFV6ZFVZMFpWYW5NOUlpQmpjbTl6YzI5eWFXZHBiajBpWVc1dmJubHRiM1Z6SWdvZ0lDQWdJQ0FnSUhKbFptVnljbVZ5Y0c5c2FXTjVQU0p1YnkxeVpXWmxjbkpsY2lJK1BDOXpZM0pwY0hRK0Nnb2dJQ0FnUEhOamNtbHdkRDRLSUNBZ0lDQWdJQ0J5WlhGMWFYSmxMbU52Ym1acFp5aDdDaUFnSUNBZ0lDQWdJQ0FnSUhCaGRHaHpPaUI3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyY3pvZ0ltaDBkSEJ6T2k4dlkyUnVMbXB6WkdWc2FYWnlMbTVsZEM5dWNHMHZiVzl1WVdOdkxXVmthWFJ2Y2tBd0xqVXdMakF2YldsdUwzWnpJaXdLSUNBZ0lDQWdJQ0FnSUNBZ2ZTd0tJQ0FnSUNBZ0lDQjlLVHNLQ2lBZ0lDQWdJQ0FnY21WeGRXbHlaU2hiSW5aekwyVmthWFJ2Y2k5bFpHbDBiM0l1YldGcGJpSmRMQ0FvS1NBOVBpQjdDaUFnSUNBZ0lDQWdJQ0FnSUdkbGRFTjFjbkpsYm5SRGMzTW9LUzUwYUdWdUtDaGpjM01wSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJsWkdsMGIzSWdQU0J0YjI1aFkyOHVaV1JwZEc5eUxtTnlaV0YwWlNnS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNnaVkyOXVkR0ZwYm1WeUlpa3NDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZXdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVd4MVpUb2dZM056TEFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JzWVc1bmRXRm5aVG9nSW1OemN5SXNDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9aVzFsT2lCblpYUlVhR1Z0WlNncExBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ2s3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsWkdsMGIzSXViMjVFYVdSRGFHRnVaMlZOYjJSbGJFTnZiblJsYm5Rb0tDa2dQVDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpYUkRjM01vWldScGRHOXlMbWRsZEZaaGJIVmxLQ2twQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FwT3dvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9JbkpsYzJsNlpTSXNJQ2dwSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlCdFlXdGxJRzF2Ym1GamJ5QnlaUzFzWVhsdmRYUUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsWkdsMGIzSXViR0Y1YjNWMEtDazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVHNLSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdDaUFnSUNBZ0lDQWdmU2s3Q2lBZ0lDQThMM05qY21sd2RENEtQQzlpYjJSNVBnb0tQQzlvZEcxc1Bnbz1cIiIsICIvKiBlc2xpbnQtZGlzYWJsZSBzaW1wbGUtaGVhZGVyL2hlYWRlciAqL1xuXG4vKiFcbiAqIEJldHRlckRpc2NvcmQgYWRkb24gbWV0YSBwYXJzZXJcbiAqIENvcHlyaWdodCAyMDIzIEJldHRlckRpc2NvcmQgY29udHJpYnV0b3JzXG4gKiBDb3B5cmlnaHQgMjAyMyBWZW5kaWNhdGVkIGFuZCBSaXZlcmNvcmQgY29udHJpYnV0b3JzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBzcGxpdFJlZ2V4ID0gL1teXFxTXFxyXFxuXSo/XFxyPyg/OlxcclxcbnxcXG4pW15cXFNcXHJcXG5dKj9cXCpbXlxcU1xcclxcbl0/LztcbmNvbnN0IGVzY2FwZWRBdFJlZ2V4ID0gL15cXFxcQC87XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclRoZW1lSGVhZGVyIHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBhdXRob3I6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBzdHJpbmc7XG4gICAgbGljZW5zZT86IHN0cmluZztcbiAgICBzb3VyY2U/OiBzdHJpbmc7XG4gICAgd2Vic2l0ZT86IHN0cmluZztcbiAgICBpbnZpdGU/OiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIG1ha2VIZWFkZXIoZmlsZU5hbWU6IHN0cmluZywgb3B0czogUGFydGlhbDxVc2VyVGhlbWVIZWFkZXI+ID0ge30pOiBVc2VyVGhlbWVIZWFkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVOYW1lLFxuICAgICAgICBuYW1lOiBvcHRzLm5hbWUgPz8gZmlsZU5hbWUucmVwbGFjZSgvXFwuY3NzJC9pLCBcIlwiKSxcbiAgICAgICAgYXV0aG9yOiBvcHRzLmF1dGhvciA/PyBcIlVua25vd24gQXV0aG9yXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBvcHRzLmRlc2NyaXB0aW9uID8/IFwiQSBEaXNjb3JkIFRoZW1lLlwiLFxuICAgICAgICB2ZXJzaW9uOiBvcHRzLnZlcnNpb24sXG4gICAgICAgIGxpY2Vuc2U6IG9wdHMubGljZW5zZSxcbiAgICAgICAgc291cmNlOiBvcHRzLnNvdXJjZSxcbiAgICAgICAgd2Vic2l0ZTogb3B0cy53ZWJzaXRlLFxuICAgICAgICBpbnZpdGU6IG9wdHMuaW52aXRlXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwQk9NKGZpbGVDb250ZW50OiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZUNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgICAgIGZpbGVDb250ZW50ID0gZmlsZUNvbnRlbnQuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlQ29udGVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoZW1lSW5mbyhjc3M6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IFVzZXJUaGVtZUhlYWRlciB7XG4gICAgaWYgKCFjc3MpIHJldHVybiBtYWtlSGVhZGVyKGZpbGVOYW1lKTtcblxuICAgIGNvbnN0IGJsb2NrID0gY3NzLnNwbGl0KFwiLyoqXCIsIDIpPy5bMV0/LnNwbGl0KFwiKi9cIiwgMSk/LlswXTtcbiAgICBpZiAoIWJsb2NrKSByZXR1cm4gbWFrZUhlYWRlcihmaWxlTmFtZSk7XG5cbiAgICBjb25zdCBoZWFkZXI6IFBhcnRpYWw8VXNlclRoZW1lSGVhZGVyPiA9IHt9O1xuICAgIGxldCBmaWVsZCA9IFwiXCI7XG4gICAgbGV0IGFjY3VtID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgYmxvY2suc3BsaXQoc3BsaXRSZWdleCkpIHtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID09PSAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSBcIkBcIiAmJiBsaW5lLmNoYXJBdCgxKSAhPT0gXCIgXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcltmaWVsZF0gPSBhY2N1bS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCBsID0gbGluZS5pbmRleE9mKFwiIFwiKTtcbiAgICAgICAgICAgIGZpZWxkID0gbGluZS5zdWJzdHJpbmcoMSwgbCk7XG4gICAgICAgICAgICBhY2N1bSA9IGxpbmUuc3Vic3RyaW5nKGwgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjY3VtICs9IFwiIFwiICsgbGluZS5yZXBsYWNlKFwiXFxcXG5cIiwgXCJcXG5cIikucmVwbGFjZShlc2NhcGVkQXRSZWdleCwgXCJAXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhlYWRlcltmaWVsZF0gPSBhY2N1bS50cmltKCk7XG4gICAgZGVsZXRlIGhlYWRlcltcIlwiXTtcbiAgICByZXR1cm4gbWFrZUhlYWRlcihmaWxlTmFtZSwgaGVhZGVyKTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjMgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyB0eXBlIEJyb3dzZXJXaW5kb3csIHNoZWxsIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGlua3NPcGVuRXh0ZXJuYWxseSh3aW46IEJyb3dzZXJXaW5kb3cpIHtcbiAgICB3aW4ud2ViQ29udGVudHMuc2V0V2luZG93T3BlbkhhbmRsZXIoKHsgdXJsIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh1cmwpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhYm91dDpibGFua1wiOlxuICAgICAgICAgICAgY2FzZSBcImh0dHBzOi8vZGlzY29yZC5jb20vcG9wb3V0XCI6XG4gICAgICAgICAgICBjYXNlIFwiaHR0cHM6Ly9wdGIuZGlzY29yZC5jb20vcG9wb3V0XCI6XG4gICAgICAgICAgICBjYXNlIFwiaHR0cHM6Ly9jYW5hcnkuZGlzY29yZC5jb20vcG9wb3V0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBcImFsbG93XCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgeyBwcm90b2NvbCB9ID0gbmV3IFVSTCh1cmwpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiB7IGFjdGlvbjogXCJkZW55XCIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICAgICAgICAgIGNhc2UgXCJodHRwOlwiOlxuICAgICAgICAgICAgY2FzZSBcImh0dHBzOlwiOlxuICAgICAgICAgICAgY2FzZSBcIm1haWx0bzpcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdGVhbTpcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzcG90aWZ5OlwiOlxuICAgICAgICAgICAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbCh1cmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgYWN0aW9uOiBcImRlbnlcIiB9O1xuICAgIH0pO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCBcIi4vdXBkYXRlclwiO1xuaW1wb3J0IFwiLi9pcGNQbHVnaW5zXCI7XG5pbXBvcnQgXCIuL3NldHRpbmdzXCI7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcIkBzaGFyZWQvZGVib3VuY2VcIjtcbmltcG9ydCB7IElwY0V2ZW50cyB9IGZyb20gXCJAc2hhcmVkL0lwY0V2ZW50c1wiO1xuaW1wb3J0IHsgQnJvd3NlcldpbmRvdywgaXBjTWFpbiwgc2hlbGwsIHN5c3RlbVByZWZlcmVuY2VzIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgbW9uYWNvSHRtbCBmcm9tIFwiZmlsZTovL21vbmFjb1dpbi5odG1sP21pbmlmeSZiYXNlNjRcIjtcbmltcG9ydCB7IEZTV2F0Y2hlciwgbWtkaXJTeW5jLCB3YXRjaCwgd3JpdGVGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgb3BlbiwgcmVhZGRpciwgcmVhZEZpbGUgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4sIG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGdldFRoZW1lSW5mbywgc3RyaXBCT00sIFVzZXJUaGVtZUhlYWRlciB9IGZyb20gXCIuL3RoZW1lc1wiO1xuaW1wb3J0IHsgQUxMT1dFRF9QUk9UT0NPTFMsIFFVSUNLQ1NTX1BBVEgsIFRIRU1FU19ESVIgfSBmcm9tIFwiLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5IH0gZnJvbSBcIi4vdXRpbHMvZXh0ZXJuYWxMaW5rc1wiO1xuXG5ta2RpclN5bmMoVEhFTUVTX0RJUiwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVTYWZlUGF0aChiYXNlUGF0aDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBub3JtYWxpemVkQmFzZVBhdGggPSBub3JtYWxpemUoYmFzZVBhdGgpO1xuICAgIGNvbnN0IG5ld1BhdGggPSBqb2luKGJhc2VQYXRoLCBwYXRoKTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IG5vcm1hbGl6ZShuZXdQYXRoKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZFBhdGguc3RhcnRzV2l0aChub3JtYWxpemVkQmFzZVBhdGgpID8gbm9ybWFsaXplZFBhdGggOiBudWxsO1xufVxuXG5mdW5jdGlvbiByZWFkQ3NzKCkge1xuICAgIHJldHVybiByZWFkRmlsZShRVUlDS0NTU19QQVRILCBcInV0Zi04XCIpLmNhdGNoKCgpID0+IFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0VGhlbWVzKCk6IFByb21pc2U8VXNlclRoZW1lSGVhZGVyW10+IHtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IHJlYWRkaXIoVEhFTUVTX0RJUikuY2F0Y2goKCkgPT4gW10pO1xuXG4gICAgY29uc3QgdGhlbWVJbmZvOiBVc2VyVGhlbWVIZWFkZXJbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBmaWxlcykge1xuICAgICAgICBpZiAoIWZpbGVOYW1lLmVuZHNXaXRoKFwiLmNzc1wiKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFRoZW1lRGF0YShmaWxlTmFtZSkudGhlbihzdHJpcEJPTSkuY2F0Y2goKCkgPT4gbnVsbCk7XG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRoZW1lSW5mby5wdXNoKGdldFRoZW1lSW5mbyhkYXRhLCBmaWxlTmFtZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGVtZUluZm87XG59XG5cbmZ1bmN0aW9uIGdldFRoZW1lRGF0YShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgZmlsZU5hbWUgPSBmaWxlTmFtZS5yZXBsYWNlKC9cXD92PVxcZCskLywgXCJcIik7XG4gICAgY29uc3Qgc2FmZVBhdGggPSBlbnN1cmVTYWZlUGF0aChUSEVNRVNfRElSLCBmaWxlTmFtZSk7XG4gICAgaWYgKCFzYWZlUGF0aCkgcmV0dXJuIFByb21pc2UucmVqZWN0KGBVbnNhZmUgcGF0aCAke2ZpbGVOYW1lfWApO1xuICAgIHJldHVybiByZWFkRmlsZShzYWZlUGF0aCwgXCJ1dGYtOFwiKTtcbn1cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLk9QRU5fUVVJQ0tDU1MsICgpID0+IHNoZWxsLm9wZW5QYXRoKFFVSUNLQ1NTX1BBVEgpKTtcblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLk9QRU5fRVhURVJOQUwsIChfLCB1cmwpID0+IHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgeyBwcm90b2NvbCB9ID0gbmV3IFVSTCh1cmwpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICB0aHJvdyBcIk1hbGZvcm1lZCBVUkxcIjtcbiAgICB9XG4gICAgaWYgKCFBTExPV0VEX1BST1RPQ09MUy5pbmNsdWRlcyhwcm90b2NvbCkpXG4gICAgICAgIHRocm93IFwiRGlzYWxsb3dlZCBwcm90b2NvbC5cIjtcblxuICAgIHNoZWxsLm9wZW5FeHRlcm5hbCh1cmwpO1xufSk7XG5cblxuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9RVUlDS19DU1MsICgpID0+IHJlYWRDc3MoKSk7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuU0VUX1FVSUNLX0NTUywgKF8sIGNzcykgPT5cbiAgICB3cml0ZUZpbGVTeW5jKFFVSUNLQ1NTX1BBVEgsIGNzcylcbik7XG5cbmlwY01haW4uaGFuZGxlKElwY0V2ZW50cy5HRVRfVEhFTUVTX0RJUiwgKCkgPT4gVEhFTUVTX0RJUik7XG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuR0VUX1RIRU1FU19MSVNULCAoKSA9PiBsaXN0VGhlbWVzKCkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRV9EQVRBLCAoXywgZmlsZU5hbWUpID0+IGdldFRoZW1lRGF0YShmaWxlTmFtZSkpO1xuaXBjTWFpbi5oYW5kbGUoSXBjRXZlbnRzLkdFVF9USEVNRV9TWVNURU1fVkFMVUVTLCAoKSA9PiAoe1xuICAgIC8vIHdpbiAmIG1hYyBvbmx5XG4gICAgXCJvcy1hY2NlbnQtY29sb3JcIjogYCMke3N5c3RlbVByZWZlcmVuY2VzLmdldEFjY2VudENvbG9yPy4oKSB8fCBcIlwifWBcbn0pKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdElwYyhtYWluV2luZG93OiBCcm93c2VyV2luZG93KSB7XG4gICAgbGV0IHF1aWNrQ3NzV2F0Y2hlcjogRlNXYXRjaGVyIHwgdW5kZWZpbmVkO1xuXG4gICAgb3BlbihRVUlDS0NTU19QQVRILCBcImErXCIpLnRoZW4oZmQgPT4ge1xuICAgICAgICBmZC5jbG9zZSgpO1xuICAgICAgICBxdWlja0Nzc1dhdGNoZXIgPSB3YXRjaChRVUlDS0NTU19QQVRILCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0sIGRlYm91bmNlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMucG9zdE1lc3NhZ2UoSXBjRXZlbnRzLlFVSUNLX0NTU19VUERBVEUsIGF3YWl0IHJlYWRDc3MoKSk7XG4gICAgICAgIH0sIDUwKSk7XG4gICAgfSkuY2F0Y2goKCkgPT4geyB9KTtcblxuICAgIGNvbnN0IHRoZW1lc1dhdGNoZXIgPSB3YXRjaChUSEVNRVNfRElSLCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0sIGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5wb3N0TWVzc2FnZShJcGNFdmVudHMuVEhFTUVfVVBEQVRFLCB2b2lkIDApO1xuICAgIH0pKTtcblxuICAgIG1haW5XaW5kb3cub25jZShcImNsb3NlZFwiLCAoKSA9PiB7XG4gICAgICAgIHF1aWNrQ3NzV2F0Y2hlcj8uY2xvc2UoKTtcbiAgICAgICAgdGhlbWVzV2F0Y2hlci5jbG9zZSgpO1xuICAgIH0pO1xufVxuXG5pcGNNYWluLmhhbmRsZShJcGNFdmVudHMuT1BFTl9NT05BQ09fRURJVE9SLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBcIlJpdmVyY29yZCBRdWlja0NTUyBFZGl0b3JcIjtcbiAgICBjb25zdCBleGlzdGluZ1dpbmRvdyA9IEJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmZpbmQodyA9PiB3LnRpdGxlID09PSB0aXRsZSk7XG4gICAgaWYgKGV4aXN0aW5nV2luZG93ICYmICFleGlzdGluZ1dpbmRvdy5pc0Rlc3Ryb3llZCgpKSB7XG4gICAgICAgIGV4aXN0aW5nV2luZG93LmZvY3VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3aW4gPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRvSGlkZU1lbnVCYXI6IHRydWUsXG4gICAgICAgIGRhcmtUaGVtZTogdHJ1ZSxcbiAgICAgICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgICAgICAgIHByZWxvYWQ6IGpvaW4oX19kaXJuYW1lLCBJU19ESVNDT1JEX0RFU0tUT1AgPyBcInByZWxvYWQuanNcIiA6IFwicml2ZXJjb3JkRGVza3RvcFByZWxvYWQuanNcIiksXG4gICAgICAgICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgbm9kZUludGVncmF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNhbmRib3g6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG1ha2VMaW5rc09wZW5FeHRlcm5hbGx5KHdpbik7XG5cbiAgICBhd2FpdCB3aW4ubG9hZFVSTChgZGF0YTp0ZXh0L2h0bWw7YmFzZTY0LCR7bW9uYWNvSHRtbH1gKTtcbn0pO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB0eXBlIHsgTGl0ZXJhbFVuaW9uIH0gZnJvbSBcInR5cGUtZmVzdFwiO1xuXG4vKipcbiAqIFdhaXQgZm9yIGEgcHJvcGVydHkgdG8gYmUgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0LCB0aGVuIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGhcbiAqIHRoZSB2YWx1ZVxuICogQHBhcmFtIHRhcmdldCBPYmplY3RcbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSB0byBiZSBkZWZpbmVkXG4gKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAqXG4gKiBAZXhhbXBsZSBvbmNlRGVmaW5lZCh3aW5kb3csIFwid2VicGFja0NodW5rZGlzY29yZF9hcHBcIiwgd3BJbnN0YW5jZSA9PiB3cEluc3RhbmNlLnB1c2goLi4uKSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbmNlRGVmaW5lZDxUIGV4dGVuZHMgb2JqZWN0LCBQIGV4dGVuZHMgTGl0ZXJhbFVuaW9uPGtleW9mIFQsIFByb3BlcnR5S2V5Pj4oXG4gICAgdGFyZ2V0OiBULCBwcm9wZXJ0eTogUCwgY2FsbGJhY2s6ICh2OiBQIGV4dGVuZHMga2V5b2YgVCA/IFRbUF0gOiBhbnkpID0+IHZvaWRcbik6IHZvaWQge1xuICAgIGNvbnN0IHByb3BlcnR5QXNBbnkgPSBwcm9wZXJ0eSBhcyBhbnk7XG5cbiAgICBpZiAocHJvcGVydHkgaW4gdGFyZ2V0KVxuICAgICAgICByZXR1cm4gdm9pZCBjYWxsYmFjayh0YXJnZXRbcHJvcGVydHlBc0FueV0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICAgICAgc2V0KHYpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlBc0FueV07XG4gICAgICAgICAgICB0YXJnZXRbcHJvcGVydHlBc0FueV0gPSB2O1xuICAgICAgICAgICAgY2FsbGJhY2sodik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB9KTtcbn1cbiIsICIvKlxuICogUml2ZXJjb3JkLCBhIG1vZGlmaWNhdGlvbiBmb3IgRGlzY29yZCdzIGRlc2t0b3AgYXBwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjIgVmVuZGljYXRlZCBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMsIG1rZGlyU3luYywgcmVhZGRpclN5bmMsIHJlbmFtZVN5bmMsIHN0YXRTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcIm9yaWdpbmFsLWZzXCI7XG5pbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSwgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmZ1bmN0aW9uIGlzTmV3ZXIoJG5ldzogc3RyaW5nLCBvbGQ6IHN0cmluZykge1xuICAgIGNvbnN0IG5ld1BhcnRzID0gJG5ldy5zbGljZSg0KS5zcGxpdChcIi5cIikubWFwKE51bWJlcik7XG4gICAgY29uc3Qgb2xkUGFydHMgPSBvbGQuc2xpY2UoNCkuc3BsaXQoXCIuXCIpLm1hcChOdW1iZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobmV3UGFydHNbaV0gPiBvbGRQYXJ0c1tpXSkgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChuZXdQYXJ0c1tpXSA8IG9sZFBhcnRzW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcGF0Y2hMYXRlc3QoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52LkRJU0FCTEVfVVBEQVRFUl9BVVRPX1BBVENISU5HKSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjdXJyZW50QXBwUGF0aCA9IGRpcm5hbWUocHJvY2Vzcy5leGVjUGF0aCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWZXJzaW9uID0gYmFzZW5hbWUoY3VycmVudEFwcFBhdGgpO1xuICAgICAgICBjb25zdCBkaXNjb3JkUGF0aCA9IGpvaW4oY3VycmVudEFwcFBhdGgsIFwiLi5cIik7XG5cbiAgICAgICAgY29uc3QgbGF0ZXN0VmVyc2lvbiA9IHJlYWRkaXJTeW5jKGRpc2NvcmRQYXRoKS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoY3Vyci5zdGFydHNXaXRoKFwiYXBwLVwiKSAmJiBpc05ld2VyKGN1cnIsIHByZXYpKVxuICAgICAgICAgICAgICAgID8gY3VyclxuICAgICAgICAgICAgICAgIDogcHJldjtcbiAgICAgICAgfSwgY3VycmVudFZlcnNpb24gYXMgc3RyaW5nKTtcblxuICAgICAgICBpZiAobGF0ZXN0VmVyc2lvbiA9PT0gY3VycmVudFZlcnNpb24pIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBqb2luKGRpc2NvcmRQYXRoLCBsYXRlc3RWZXJzaW9uLCBcInJlc291cmNlc1wiKTtcbiAgICAgICAgY29uc3QgYXBwID0gam9pbihyZXNvdXJjZXMsIFwiYXBwLmFzYXJcIik7XG4gICAgICAgIGNvbnN0IF9hcHAgPSBqb2luKHJlc291cmNlcywgXCJfYXBwLmFzYXJcIik7XG5cbiAgICAgICAgaWYgKCFleGlzdHNTeW5jKGFwcCkgfHwgc3RhdFN5bmMoYXBwKS5pc0RpcmVjdG9yeSgpKSByZXR1cm47XG5cbiAgICAgICAgY29uc29sZS5pbmZvKFwiW1JpdmVyY29yZF0gRGV0ZWN0ZWQgSG9zdCBVcGRhdGUuIFJlcGF0Y2hpbmcuLi5cIik7XG5cbiAgICAgICAgcmVuYW1lU3luYyhhcHAsIF9hcHApO1xuICAgICAgICBta2RpclN5bmMoYXBwKTtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhqb2luKGFwcCwgXCJwYWNrYWdlLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGlzY29yZFwiLFxuICAgICAgICAgICAgbWFpbjogXCJpbmRleC5qc1wiXG4gICAgICAgIH0pKTtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhqb2luKGFwcCwgXCJpbmRleC5qc1wiKSwgYHJlcXVpcmUoJHtKU09OLnN0cmluZ2lmeShqb2luKF9fZGlybmFtZSwgXCJwYXRjaGVyLmpzXCIpKX0pO2ApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW1JpdmVyY29yZF0gRmFpbGVkIHRvIHJlcGF0Y2ggbGF0ZXN0IGhvc3QgdXBkYXRlXCIsIGVycik7XG4gICAgfVxufVxuXG4vLyBUcnkgdG8gcGF0Y2ggbGF0ZXN0IG9uIGJlZm9yZS1xdWl0XG4vLyBEaXNjb3JkJ3MgV2luMzIgdXBkYXRlciB3aWxsIGNhbGwgYXBwLnF1aXQoKSBvbiByZXN0YXJ0IGFuZCBvcGVuIG5ldyB2ZXJzaW9uIG9uIHdpbGwtcXVpdFxuYXBwLm9uKFwiYmVmb3JlLXF1aXRcIiwgcGF0Y2hMYXRlc3QpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IG9uY2VEZWZpbmVkIH0gZnJvbSBcIkBzaGFyZWQvb25jZURlZmluZWRcIjtcbmltcG9ydCBlbGVjdHJvbiwgeyBhcHAsIEJyb3dzZXJXaW5kb3dDb25zdHJ1Y3Rvck9wdGlvbnMsIE1lbnUgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGRpcm5hbWUsIGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBpbml0SXBjIH0gZnJvbSBcIi4vaXBjTWFpblwiO1xuaW1wb3J0IHsgUmVuZGVyZXJTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBJU19WQU5JTExBIH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmNvbnNvbGUubG9nKFwiW1JpdmVyY29yZF0gU3RhcnRpbmcgdXAuLi5cIik7XG5cbi8vIE91ciBpbmplY3RvciBmaWxlIGF0IGFwcC9pbmRleC5qc1xuY29uc3QgaW5qZWN0b3JQYXRoID0gcmVxdWlyZS5tYWluIS5maWxlbmFtZTtcblxuLy8gc3BlY2lhbCBkaXNjb3JkX2FyY2hfZWxlY3Ryb24gaW5qZWN0aW9uIG1ldGhvZFxuY29uc3QgYXNhck5hbWUgPSByZXF1aXJlLm1haW4hLnBhdGguZW5kc1dpdGgoXCJhcHAuYXNhclwiKSA/IFwiX2FwcC5hc2FyXCIgOiBcImFwcC5hc2FyXCI7XG5cbi8vIFRoZSBvcmlnaW5hbCBhcHAuYXNhclxuY29uc3QgYXNhclBhdGggPSBqb2luKGRpcm5hbWUoaW5qZWN0b3JQYXRoKSwgXCIuLlwiLCBhc2FyTmFtZSk7XG5cbmNvbnN0IGRpc2NvcmRQa2cgPSByZXF1aXJlKGpvaW4oYXNhclBhdGgsIFwicGFja2FnZS5qc29uXCIpKTtcbnJlcXVpcmUubWFpbiEuZmlsZW5hbWUgPSBqb2luKGFzYXJQYXRoLCBkaXNjb3JkUGtnLm1haW4pO1xuXG4vLyBAdHMtaWdub3JlIFVudHlwZWQgbWV0aG9kPyBEaWVzIGZyb20gY3JpbmdlXG5hcHAuc2V0QXBwUGF0aChhc2FyUGF0aCk7XG5cbmlmICghSVNfVkFOSUxMQSkge1xuICAgIGNvbnN0IHNldHRpbmdzID0gUmVuZGVyZXJTZXR0aW5ncy5zdG9yZTtcbiAgICAvLyBSZXBhdGNoIGFmdGVyIGhvc3QgdXBkYXRlcyBvbiBXaW5kb3dzXG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIikge1xuICAgICAgICByZXF1aXJlKFwiLi9wYXRjaFdpbjMyVXBkYXRlclwiKTtcblxuICAgICAgICBpZiAoc2V0dGluZ3Mud2luQ3RybFEpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsQnVpbGQgPSBNZW51LmJ1aWxkRnJvbVRlbXBsYXRlO1xuICAgICAgICAgICAgTWVudS5idWlsZEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZVswXT8ubGFiZWwgPT09IFwiJkZpbGVcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN1Ym1lbnUgfSA9IHRlbXBsYXRlWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJtZW51KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJRdWl0IChIaWRkZW4pXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZWxlcmF0b3JXb3Jrc1doZW5IaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZWxlcmF0b3I6IFwiQ29udHJvbCtRXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IGFwcC5xdWl0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEJ1aWxkLmNhbGwodGhpcywgdGVtcGxhdGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEJyb3dzZXJXaW5kb3cgZXh0ZW5kcyBlbGVjdHJvbi5Ccm93c2VyV2luZG93IHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9uczogQnJvd3NlcldpbmRvd0NvbnN0cnVjdG9yT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnM/LndlYlByZWZlcmVuY2VzPy5wcmVsb2FkICYmIG9wdGlvbnMudGl0bGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IG9wdGlvbnMud2ViUHJlZmVyZW5jZXMucHJlbG9hZDtcbiAgICAgICAgICAgICAgICBvcHRpb25zLndlYlByZWZlcmVuY2VzLnByZWxvYWQgPSBqb2luKF9fZGlybmFtZSwgSVNfRElTQ09SRF9ERVNLVE9QID8gXCJwcmVsb2FkLmpzXCIgOiBcInJpdmVyY29yZERlc2t0b3BQcmVsb2FkLmpzXCIpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMud2ViUHJlZmVyZW5jZXMuc2FuZGJveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIHdvcmsgYXJvdW5kIGRpc2NvcmQgdW5sb2FkaW5nIHdoZW4gaW4gYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIG9wdGlvbnMud2ViUHJlZmVyZW5jZXMuYmFja2dyb3VuZFRocm90dGxpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mcmFtZWxlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5mcmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiICYmIHNldHRpbmdzLndpbk5hdGl2ZVRpdGxlQmFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmZyYW1lO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy50cmFuc3BhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDAwMDAwMFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG5lZWRzVmlicmFuY3kgPSBwcm9jZXNzLnBsYXRmb3JtID09PSBcImRhcndpblwiICYmIHNldHRpbmdzLm1hY29zVmlicmFuY3lTdHlsZTtcblxuICAgICAgICAgICAgICAgIGlmIChuZWVkc1ZpYnJhbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwMDAwMDBcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1hY29zVmlicmFuY3lTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYW5jeSA9IHNldHRpbmdzLm1hY29zVmlicmFuY3lTdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkRJU0NPUkRfUFJFTE9BRCA9IG9yaWdpbmFsO1xuXG4gICAgICAgICAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaW5pdElwYyh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKEJyb3dzZXJXaW5kb3csIGVsZWN0cm9uLkJyb3dzZXJXaW5kb3cpO1xuICAgIC8vIGVzYnVpbGQgbWF5IHJlbmFtZSBvdXIgQnJvd3NlcldpbmRvdywgd2hpY2ggbGVhZHMgdG8gaXQgYmVpbmcgZXhjbHVkZWRcbiAgICAvLyBmcm9tIGdldEZvY3VzZWRXaW5kb3coKSwgc28gdGhpcyBpcyBuZWNlc3NhcnlcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZGlzY29yZC9lbGVjdHJvbi9ibG9iLzEzLXgteS9saWIvYnJvd3Nlci9hcGkvYnJvd3Nlci13aW5kb3cudHMjTDYwLUw2MlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCcm93c2VyV2luZG93LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJCcm93c2VyV2luZG93XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcblxuICAgIC8vIFJlcGxhY2UgZWxlY3Ryb25zIGV4cG9ydHMgd2l0aCBvdXIgY3VzdG9tIEJyb3dzZXJXaW5kb3dcbiAgICBjb25zdCBlbGVjdHJvblBhdGggPSByZXF1aXJlLnJlc29sdmUoXCJlbGVjdHJvblwiKTtcbiAgICBkZWxldGUgcmVxdWlyZS5jYWNoZVtlbGVjdHJvblBhdGhdIS5leHBvcnRzO1xuICAgIHJlcXVpcmUuY2FjaGVbZWxlY3Ryb25QYXRoXSEuZXhwb3J0cyA9IHtcbiAgICAgICAgLi4uZWxlY3Ryb24sXG4gICAgICAgIEJyb3dzZXJXaW5kb3dcbiAgICB9O1xuXG4gICAgLy8gUGF0Y2ggYXBwU2V0dGluZ3MgdG8gZm9yY2UgZW5hYmxlIGRldnRvb2xzIGFuZCBvcHRpb25hbGx5IGRpc2FibGUgbWluIHNpemVcbiAgICBvbmNlRGVmaW5lZChnbG9iYWwsIFwiYXBwU2V0dGluZ3NcIiwgcyA9PiB7XG4gICAgICAgIHMuc2V0KFwiREFOR0VST1VTX0VOQUJMRV9ERVZUT09MU19PTkxZX0VOQUJMRV9JRl9ZT1VfS05PV19XSEFUX1lPVVJFX0RPSU5HXCIsIHRydWUpO1xuICAgICAgICBpZiAoc2V0dGluZ3MuZGlzYWJsZU1pblNpemUpIHtcbiAgICAgICAgICAgIHMuc2V0KFwiTUlOX1dJRFRIXCIsIDApO1xuICAgICAgICAgICAgcy5zZXQoXCJNSU5fSEVJR0hUXCIsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcy5zZXQoXCJNSU5fV0lEVEhcIiwgOTQwKTtcbiAgICAgICAgICAgIHMuc2V0KFwiTUlOX0hFSUdIVFwiLCA1MDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBwcm9jZXNzLmVudi5EQVRBX0RJUiA9IGpvaW4oYXBwLmdldFBhdGgoXCJ1c2VyRGF0YVwiKSwgXCIuLlwiLCBcIlJpdmVyY29yZFwiKTtcblxuICAgIC8vIE1vbmtleSBwYXRjaCBjb21tYW5kTGluZSB0bzpcbiAgICAvLyAtIGRpc2FibGUgV2lkZ2V0TGF5ZXJpbmc6IEZpeCBEZXZUb29scyBjb250ZXh0IG1lbnVzIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvMzg3OTBcbiAgICAvLyAtIGRpc2FibGUgVXNlRWNvUW9TRm9yQmFja2dyb3VuZFByb2Nlc3M6IFdvcmsgYXJvdW5kIERpc2NvcmQgdW5sb2FkaW5nIHdoZW4gaW4gYmFja2dyb3VuZFxuICAgIGNvbnN0IG9yaWdpbmFsQXBwZW5kID0gYXBwLmNvbW1hbmRMaW5lLmFwcGVuZFN3aXRjaDtcbiAgICBhcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09IFwiZGlzYWJsZS1mZWF0dXJlc1wiKSB7XG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlZEZlYXR1cmVzID0gbmV3IFNldCgoYXJnc1sxXSA/PyBcIlwiKS5zcGxpdChcIixcIikpO1xuICAgICAgICAgICAgZGlzYWJsZWRGZWF0dXJlcy5hZGQoXCJXaWRnZXRMYXllcmluZ1wiKTtcbiAgICAgICAgICAgIGRpc2FibGVkRmVhdHVyZXMuYWRkKFwiVXNlRWNvUW9TRm9yQmFja2dyb3VuZFByb2Nlc3NcIik7XG4gICAgICAgICAgICBhcmdzWzFdICs9IFsuLi5kaXNhYmxlZEZlYXR1cmVzXS5qb2luKFwiLFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxBcHBlbmQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIGRpc2FibGUgcmVuZGVyZXIgYmFja2dyb3VuZGluZyB0byBwcmV2ZW50IHRoZSBhcHAgZnJvbSB1bmxvYWRpbmcgd2hlbiBpbiB0aGUgYmFja2dyb3VuZFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvMjgyMlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvY2hyb21lLWxhdW5jaGVyL2Jsb2IvNWEyN2RkNTc0ZDQ3YTc1ZmVjMGZiNTBmN2I3NzRlYmY4YTk3OTFiYS9kb2NzL2Nocm9tZS1mbGFncy1mb3ItdG9vbHMubWQjdGFzay10aHJvdHRsaW5nXG4gICAgLy8gV29yayBhcm91bmQgZGlzY29yZCB1bmxvYWRpbmcgd2hlbiBpbiBiYWNrZ3JvdW5kXG4gICAgLy8gRGlzY29yZCBhbHNvIHJlY2VudGx5IHN0YXJ0ZWQgYWRkaW5nIHRoZXNlIGZsYWdzIGJ1dCBvbmx5IG9uIHdpbmRvd3MgZm9yIHNvbWUgcmVhc29uIGR1bm5vIHdoeSwgaXQgaGFwcGVucyBvbiBMaW51eCB0b29cbiAgICBhcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoKFwiZGlzYWJsZS1yZW5kZXJlci1iYWNrZ3JvdW5kaW5nXCIpO1xuICAgIGFwcC5jb21tYW5kTGluZS5hcHBlbmRTd2l0Y2goXCJkaXNhYmxlLWJhY2tncm91bmQtdGltZXItdGhyb3R0bGluZ1wiKTtcbiAgICBhcHAuY29tbWFuZExpbmUuYXBwZW5kU3dpdGNoKFwiZGlzYWJsZS1iYWNrZ3JvdW5kaW5nLW9jY2x1ZGVkLXdpbmRvd3NcIik7XG59IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKFwiW1JpdmVyY29yZF0gUnVubmluZyBpbiB2YW5pbGxhIG1vZGUuIE5vdCBsb2FkaW5nIFJpdmVyY29yZFwiKTtcbn1cblxuY29uc29sZS5sb2coXCJbUml2ZXJjb3JkXSBMb2FkaW5nIG9yaWdpbmFsIERpc2NvcmQgYXBwLmFzYXJcIik7XG5yZXF1aXJlKHJlcXVpcmUubWFpbiEuZmlsZW5hbWUpO1xuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMyBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IGFwcCwgcHJvdG9jb2wsIHNlc3Npb24gfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBlbnN1cmVTYWZlUGF0aCB9IGZyb20gXCIuL2lwY01haW5cIjtcbmltcG9ydCB7IFJlbmRlcmVyU2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgSVNfVkFOSUxMQSwgVEhFTUVTX0RJUiB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgaW5zdGFsbEV4dCB9IGZyb20gXCIuL3V0aWxzL2V4dGVuc2lvbnNcIjtcblxuaWYgKElTX1ZFU0tUT1AgfHwgIUlTX1ZBTklMTEEpIHtcbiAgICBhcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIFNvdXJjZSBNYXBzISBNYXliZSB0aGVyZSdzIGEgYmV0dGVyIHdheSBidXQgc2luY2UgdGhlIHJlbmRlcmVyIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIGZyb20gYSBzdHJpbmcgSSBkb24ndCB0aGluayBhbnkgb3RoZXIgZm9ybSBvZiBzb3VyY2VtYXBzIHdvdWxkIHdvcmtcbiAgICAgICAgcHJvdG9jb2wucmVnaXN0ZXJGaWxlUHJvdG9jb2woXCJyaXZlcmNvcmRcIiwgKHsgdXJsOiB1bnNhZmVVcmwgfSwgY2IpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB1bnNhZmVVcmwuc2xpY2UoXCJyaXZlcmNvcmQ6Ly9cIi5sZW5ndGgpO1xuICAgICAgICAgICAgaWYgKHVybC5lbmRzV2l0aChcIi9cIikpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCIvdGhlbWVzL1wiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gdXJsLnNsaWNlKFwiL3RoZW1lcy9cIi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVVcmwgPSBlbnN1cmVTYWZlUGF0aChUSEVNRVNfRElSLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzYWZlVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHsgc3RhdHVzQ29kZTogNDAzIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNiKHNhZmVVcmwucmVwbGFjZSgvXFw/dj1cXGQrJC8sIFwiXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHVybCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyZW5kZXJlci5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicml2ZXJjb3JkRGVza3RvcFJlbmRlcmVyLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJwcmVsb2FkLmpzLm1hcFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyaXZlcmNvcmREZXNrdG9wUHJlbG9hZC5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicGF0Y2hlci5qcy5tYXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwicml2ZXJjb3JkRGVza3RvcE1haW4uanMubWFwXCI6XG4gICAgICAgICAgICAgICAgICAgIGNiKGpvaW4oX19kaXJuYW1lLCB1cmwpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY2IoeyBzdGF0dXNDb2RlOiA0MDMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoUmVuZGVyZXJTZXR0aW5ncy5zdG9yZS5lbmFibGVSZWFjdERldnRvb2xzKVxuICAgICAgICAgICAgICAgIGluc3RhbGxFeHQoXCJmbWthZG1hcGdvZmFkb3BsamJqZmthcGRrb2llbmloaVwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmluZm8oXCJbUml2ZXJjb3JkXSBJbnN0YWxsZWQgUmVhY3QgRGV2ZWxvcGVyIFRvb2xzXCIpKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJbUml2ZXJjb3JkXSBGYWlsZWQgdG8gaW5zdGFsbCBSZWFjdCBEZXZlbG9wZXIgVG9vbHNcIiwgZXJyKSk7XG4gICAgICAgIH0gY2F0Y2ggeyB9XG5cblxuICAgICAgICBjb25zdCBmaW5kSGVhZGVyID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiwgaGVhZGVyTmFtZTogTG93ZXJjYXNlPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKGggPT4gaC50b0xvd2VyQ2FzZSgpID09PSBoZWFkZXJOYW1lKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZW1vdmUgQ1NQXG4gICAgICAgIHR5cGUgUG9saWN5UmVzdWx0ID0gUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xuXG4gICAgICAgIGNvbnN0IHBhcnNlUG9saWN5ID0gKHBvbGljeTogc3RyaW5nKTogUG9saWN5UmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUG9saWN5UmVzdWx0ID0ge307XG4gICAgICAgICAgICBwb2xpY3kuc3BsaXQoXCI7XCIpLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBbZGlyZWN0aXZlS2V5LCAuLi5kaXJlY3RpdmVWYWx1ZV0gPSBkaXJlY3RpdmUudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmVLZXkgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIGRpcmVjdGl2ZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2RpcmVjdGl2ZUtleV0gPSBkaXJlY3RpdmVWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZ5UG9saWN5ID0gKHBvbGljeTogUG9saWN5UmVzdWx0KTogc3RyaW5nID0+XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhwb2xpY3kpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoWywgdmFsdWVzXSkgPT4gdmFsdWVzPy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgLm1hcChkaXJlY3RpdmUgPT4gZGlyZWN0aXZlLmZsYXQoKS5qb2luKFwiIFwiKSlcbiAgICAgICAgICAgICAgICAuam9pbihcIjsgXCIpO1xuXG4gICAgICAgIGNvbnN0IHBhdGNoQ3NwID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZmluZEhlYWRlcihoZWFkZXJzLCBcImNvbnRlbnQtc2VjdXJpdHktcG9saWN5XCIpO1xuXG4gICAgICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NwID0gcGFyc2VQb2xpY3koaGVhZGVyc1toZWFkZXJdWzBdKTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGlyZWN0aXZlIG9mIFtcInN0eWxlLXNyY1wiLCBcImNvbm5lY3Qtc3JjXCIsIFwiaW1nLXNyY1wiLCBcImZvbnQtc3JjXCIsIFwibWVkaWEtc3JjXCIsIFwid29ya2VyLXNyY1wiXSkge1xuICAgICAgICAgICAgICAgICAgICBjc3BbZGlyZWN0aXZlXSA/Pz0gW107XG4gICAgICAgICAgICAgICAgICAgIGNzcFtkaXJlY3RpdmVdLnB1c2goXCIqXCIsIFwiYmxvYjpcIiwgXCJkYXRhOlwiLCBcInJpdmVyY29yZDpcIiwgXCIndW5zYWZlLWlubGluZSdcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVzdHJpY3QgdGhpcyB0byBvbmx5IGltcG9ydGVkIHBhY2thZ2VzIHdpdGggZml4ZWQgdmVyc2lvbi5cbiAgICAgICAgICAgICAgICAvLyBQZXJoYXBzIGF1dG8gZ2VuZXJhdGUgd2l0aCBlc2J1aWxkXG4gICAgICAgICAgICAgICAgY3NwW1wic2NyaXB0LXNyY1wiXSA/Pz0gW107XG4gICAgICAgICAgICAgICAgY3NwW1wic2NyaXB0LXNyY1wiXS5wdXNoKFwiJ3Vuc2FmZS1ldmFsJ1wiLCBcImh0dHBzOi8vdW5wa2cuY29tXCIsIFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbVwiKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2hlYWRlcl0gPSBbc3RyaW5naWZ5UG9saWN5KGNzcCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlc3Npb24uZGVmYXVsdFNlc3Npb24ud2ViUmVxdWVzdC5vbkhlYWRlcnNSZWNlaXZlZCgoeyByZXNwb25zZUhlYWRlcnMsIHJlc291cmNlVHlwZSB9LCBjYikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlSGVhZGVycykge1xuICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZVR5cGUgPT09IFwibWFpbkZyYW1lXCIpXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoQ3NwKHJlc3BvbnNlSGVhZGVycyk7XG5cbiAgICAgICAgICAgICAgICAvLyBGaXggaG9zdHMgdGhhdCBkb24ndCBwcm9wZXJseSBzZXQgdGhlIGNzcyBjb250ZW50IHR5cGUsIHN1Y2ggYXNcbiAgICAgICAgICAgICAgICAvLyByYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tXG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlVHlwZSA9PT0gXCJzdHlsZXNoZWV0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZmluZEhlYWRlcihyZXNwb25zZUhlYWRlcnMsIFwiY29udGVudC10eXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzW2hlYWRlcl0gPSBbXCJ0ZXh0L2Nzc1wiXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNiKHsgY2FuY2VsOiBmYWxzZSwgcmVzcG9uc2VIZWFkZXJzIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhc3NpZ24gYSBub29wIHRvIG9uSGVhZGVyc1JlY2VpdmVkIHRvIHByZXZlbnQgb3RoZXIgbW9kcyBmcm9tIGFkZGluZyB0aGVpciBvd24gaW5jb21wYXRpYmxlIG9uZXMuXG4gICAgICAgIC8vIEZvciBpbnN0YW5jZSwgT3BlbkFzYXIgYWRkcyB0aGVpciBvd24gdGhhdCBkb2Vzbid0IGZpeCBjb250ZW50LXR5cGUgZm9yIHN0eWxlc2hlZXRzIHdoaWNoIG1ha2VzIGl0XG4gICAgICAgIC8vIGltcG9zc2libGUgdG8gbG9hZCBjc3MgZnJvbSBnaXRodWIgcmF3IGRlc3BpdGUgb3VyIGZpeCBhYm92ZVxuICAgICAgICBzZXNzaW9uLmRlZmF1bHRTZXNzaW9uLndlYlJlcXVlc3Qub25IZWFkZXJzUmVjZWl2ZWQgPSAoKSA9PiB7IH07XG4gICAgfSk7XG59XG5cbmlmIChJU19ESVNDT1JEX0RFU0tUT1ApIHtcbiAgICByZXF1aXJlKFwiLi9wYXRjaGVyXCIpO1xufVxuIiwgIi8qXG4gKiBSaXZlcmNvcmQsIGEgbW9kaWZpY2F0aW9uIGZvciBEaXNjb3JkJ3MgZGVza3RvcCBhcHBcbiAqIENvcHlyaWdodCAoYykgMjAyMiBWZW5kaWNhdGVkIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5cbmltcG9ydCB7IHNlc3Npb24gfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCB7IHVuemlwIH0gZnJvbSBcImZmbGF0ZVwiO1xuaW1wb3J0IHsgY29uc3RhbnRzIGFzIGZzQ29uc3RhbnRzIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBhY2Nlc3MsIG1rZGlyLCBybSwgd3JpdGVGaWxlIH0gZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgREFUQV9ESVIgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNyeFRvWmlwIH0gZnJvbSBcIi4vY3J4VG9aaXBcIjtcbmltcG9ydCB7IGdldCB9IGZyb20gXCIuL3NpbXBsZUdldFwiO1xuXG5jb25zdCBleHRlbnNpb25DYWNoZURpciA9IGpvaW4oREFUQV9ESVIsIFwiRXh0ZW5zaW9uQ2FjaGVcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3QoZGF0YTogQnVmZmVyLCBvdXREaXI6IHN0cmluZykge1xuICAgIGF3YWl0IG1rZGlyKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdW56aXAoZGF0YSwgKGVyciwgZmlsZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiB2b2lkIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoZmlsZXMpLm1hcChhc3luYyBmID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaWduYXR1cmUgc3R1ZmZcbiAgICAgICAgICAgICAgICAvLyAnQ2Fubm90IGxvYWQgZXh0ZW5zaW9uIHdpdGggZmlsZSBvciBkaXJlY3RvcnkgbmFtZVxuICAgICAgICAgICAgICAgIC8vIF9tZXRhZGF0YS4gRmlsZW5hbWVzIHN0YXJ0aW5nIHdpdGggXCJfXCIgYXJlIHJlc2VydmVkIGZvciB1c2UgYnkgdGhlIHN5c3RlbS4nO1xuICAgICAgICAgICAgICAgIGlmIChmLnN0YXJ0c1dpdGgoXCJfbWV0YWRhdGEvXCIpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBpZiAoZi5lbmRzV2l0aChcIi9cIikpIHJldHVybiB2b2lkIG1rZGlyKGpvaW4ob3V0RGlyLCBmKSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoRWxlbWVudHMgPSBmLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gcGF0aEVsZW1lbnRzLnBvcCgpITtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3RvcmllcyA9IHBhdGhFbGVtZW50cy5qb2luKFwiL1wiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSBqb2luKG91dERpciwgZGlyZWN0b3JpZXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IG1rZGlyKGRpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXdhaXQgd3JpdGVGaWxlKGpvaW4oZGlyLCBuYW1lKSwgZmlsZXNbZl0pO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzb2x2ZSgpKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBybShvdXREaXIsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zdGFsbEV4dChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZXh0RGlyID0gam9pbihleHRlbnNpb25DYWNoZURpciwgYCR7aWR9YCk7XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBhY2Nlc3MoZXh0RGlyLCBmc0NvbnN0YW50cy5GX09LKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgdXJsID0gaWQgPT09IFwiZm1rYWRtYXBnb2ZhZG9wbGpiamZrYXBka29pZW5paGlcIlxuICAgICAgICAgICAgLy8gUmVhY3QgRGV2dG9vbHMgdjQuMjVcbiAgICAgICAgICAgIC8vIHY0LjI3IGlzIGJyb2tlbiBpbiBFbGVjdHJvbiwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMjU4NDNcbiAgICAgICAgICAgIC8vIFVuZm9ydHVuYXRlbHksIEdvb2dsZSBkb2VzIG5vdCBzZXJ2ZSBvbGQgdmVyc2lvbnMsIHNvIHRoaXMgaXMgdGhlIG9ubHkgd2F5XG4gICAgICAgICAgICA/IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1ZlbmRpY2F0ZWQvcmFuZG9tLWZpbGVzL2Y2ZjU1MGU0YzU4YWM1ZjIwMTIwOTVhMTMwNDA2YzJhYjI1Yjk4NGQvZm1rYWRtYXBnb2ZhZG9wbGpiamZrYXBka29pZW5paGkuemlwXCJcbiAgICAgICAgICAgIDogYGh0dHBzOi8vY2xpZW50czIuZ29vZ2xlLmNvbS9zZXJ2aWNlL3VwZGF0ZTIvY3J4P3Jlc3BvbnNlPXJlZGlyZWN0JmFjY2VwdGZvcm1hdD1jcngyLGNyeDMmeD1pZCUzRCR7aWR9JTI2dWMmcHJvZHZlcnNpb249MzJgO1xuICAgICAgICBjb25zdCBidWYgPSBhd2FpdCBnZXQodXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJVc2VyLUFnZW50XCI6IFwiUml2ZXJjb3JkIChodHRwczovL2dpdGh1Yi5jb20vUml2ZXJjb3JkL1JpdmVyY29yZClcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgZXh0cmFjdChjcnhUb1ppcChidWYpLCBleHREaXIpLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgIH1cblxuICAgIHNlc3Npb24uZGVmYXVsdFNlc3Npb24ubG9hZEV4dGVuc2lvbihleHREaXIpO1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tICdtb2R1bGUnO1xudmFyIHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKCcvJyk7XG4vLyBERUZMQVRFIGlzIGEgY29tcGxleCBmb3JtYXQ7IHRvIHJlYWQgdGhpcyBjb2RlLCB5b3Ugc2hvdWxkIHByb2JhYmx5IGNoZWNrIHRoZSBSRkMgZmlyc3Q6XG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMTk1MVxuLy8gWW91IG1heSBhbHNvIHdpc2ggdG8gdGFrZSBhIGxvb2sgYXQgdGhlIGd1aWRlIEkgbWFkZSBhYm91dCB0aGlzIHByb2dyYW06XG4vLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS8xMDFhcnJvd3ovMjUzZjMxZWI1YWJjM2Q5Mjc1YWI5NDMwMDNmZmVjYWRcbi8vIFNvbWUgb2YgdGhlIGZvbGxvd2luZyBjb2RlIGlzIHNpbWlsYXIgdG8gdGhhdCBvZiBVWklQLmpzOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob3RvcGVhL1VaSVAuanNcbi8vIEhvd2V2ZXIsIHRoZSB2YXN0IG1ham9yaXR5IG9mIHRoZSBjb2RlYmFzZSBoYXMgZGl2ZXJnZWQgZnJvbSBVWklQLmpzIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlIGFuZCByZWR1Y2UgYnVuZGxlIHNpemUuXG4vLyBTb21ldGltZXMgMCB3aWxsIGFwcGVhciB3aGVyZSAtMSB3b3VsZCBiZSBtb3JlIGFwcHJvcHJpYXRlLiBUaGlzIGlzIGJlY2F1c2UgdXNpbmcgYSB1aW50XG4vLyBpcyBiZXR0ZXIgZm9yIG1lbW9yeSBpbiBtb3N0IGVuZ2luZXMgKEkgKnRoaW5rKikuXG4vLyBNZWRpb2NyZSBzaGltXG52YXIgV29ya2VyO1xudmFyIHdvcmtlckFkZCA9IFwiO3ZhciBfX3c9cmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKTtfX3cucGFyZW50UG9ydC5vbignbWVzc2FnZScsZnVuY3Rpb24obSl7b25tZXNzYWdlKHtkYXRhOm19KX0pLHBvc3RNZXNzYWdlPWZ1bmN0aW9uKG0sdCl7X193LnBhcmVudFBvcnQucG9zdE1lc3NhZ2UobSx0KX0sY2xvc2U9cHJvY2Vzcy5leGl0O3NlbGY9Z2xvYmFsXCI7XG50cnkge1xuICAgIFdvcmtlciA9IHJlcXVpcmUoJ3dvcmtlcl90aHJlYWRzJykuV29ya2VyO1xufVxuY2F0Y2ggKGUpIHtcbn1cbnZhciB3ayA9IFdvcmtlciA/IGZ1bmN0aW9uIChjLCBfLCBtc2csIHRyYW5zZmVyLCBjYikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdmFyIHcgPSBuZXcgV29ya2VyKGMgKyB3b3JrZXJBZGQsIHsgZXZhbDogdHJ1ZSB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGNiKGUsIG51bGwpOyB9KVxuICAgICAgICAub24oJ21lc3NhZ2UnLCBmdW5jdGlvbiAobSkgeyByZXR1cm4gY2IobnVsbCwgbSk7IH0pXG4gICAgICAgIC5vbignZXhpdCcsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGlmIChjICYmICFkb25lKVxuICAgICAgICAgICAgY2IobmV3IEVycm9yKCdleGl0ZWQgd2l0aCBjb2RlICcgKyBjKSwgbnVsbCk7XG4gICAgfSk7XG4gICAgdy5wb3N0TWVzc2FnZShtc2csIHRyYW5zZmVyKTtcbiAgICB3LnRlcm1pbmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBXb3JrZXIucHJvdG90eXBlLnRlcm1pbmF0ZS5jYWxsKHcpO1xuICAgIH07XG4gICAgcmV0dXJuIHc7XG59IDogZnVuY3Rpb24gKF8sIF9fLCBfX18sIF9fX18sIGNiKSB7XG4gICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNiKG5ldyBFcnJvcignYXN5bmMgb3BlcmF0aW9ucyB1bnN1cHBvcnRlZCAtIHVwZGF0ZSB0byBOb2RlIDEyKyAob3IgTm9kZSAxMC0xMSB3aXRoIHRoZSAtLWV4cGVyaW1lbnRhbC13b3JrZXIgQ0xJIGZsYWcpJyksIG51bGwpOyB9KTtcbiAgICB2YXIgTk9QID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlcm1pbmF0ZTogTk9QLFxuICAgICAgICBwb3N0TWVzc2FnZTogTk9QXG4gICAgfTtcbn07XG5cbi8vIGFsaWFzZXMgZm9yIHNob3J0ZXIgY29tcHJlc3NlZCBjb2RlIChtb3N0IG1pbmlmZXJzIGRvbid0IGRvIHRoaXMpXG52YXIgdTggPSBVaW50OEFycmF5LCB1MTYgPSBVaW50MTZBcnJheSwgdTMyID0gVWludDMyQXJyYXk7XG4vLyBmaXhlZCBsZW5ndGggZXh0cmEgYml0c1xudmFyIGZsZWIgPSBuZXcgdTgoWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDEsIDEsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDMsIDQsIDQsIDQsIDQsIDUsIDUsIDUsIDUsIDAsIC8qIHVudXNlZCAqLyAwLCAwLCAvKiBpbXBvc3NpYmxlICovIDBdKTtcbi8vIGZpeGVkIGRpc3RhbmNlIGV4dHJhIGJpdHNcbi8vIHNlZSBmbGViIG5vdGVcbnZhciBmZGViID0gbmV3IHU4KFswLCAwLCAwLCAwLCAxLCAxLCAyLCAyLCAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LCA3LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMywgMTMsIC8qIHVudXNlZCAqLyAwLCAwXSk7XG4vLyBjb2RlIGxlbmd0aCBpbmRleCBtYXBcbnZhciBjbGltID0gbmV3IHU4KFsxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LCAxMCwgNSwgMTEsIDQsIDEyLCAzLCAxMywgMiwgMTQsIDEsIDE1XSk7XG4vLyBnZXQgYmFzZSwgcmV2ZXJzZSBpbmRleCBtYXAgZnJvbSBleHRyYSBiaXRzXG52YXIgZnJlYiA9IGZ1bmN0aW9uIChlYiwgc3RhcnQpIHtcbiAgICB2YXIgYiA9IG5ldyB1MTYoMzEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzE7ICsraSkge1xuICAgICAgICBiW2ldID0gc3RhcnQgKz0gMSA8PCBlYltpIC0gMV07XG4gICAgfVxuICAgIC8vIG51bWJlcnMgaGVyZSBhcmUgYXQgbWF4IDE4IGJpdHNcbiAgICB2YXIgciA9IG5ldyB1MzIoYlszMF0pO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMzA7ICsraSkge1xuICAgICAgICBmb3IgKHZhciBqID0gYltpXTsgaiA8IGJbaSArIDFdOyArK2opIHtcbiAgICAgICAgICAgIHJbal0gPSAoKGogLSBiW2ldKSA8PCA1KSB8IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtiLCByXTtcbn07XG52YXIgX2EgPSBmcmViKGZsZWIsIDIpLCBmbCA9IF9hWzBdLCByZXZmbCA9IF9hWzFdO1xuLy8gd2UgY2FuIGlnbm9yZSB0aGUgZmFjdCB0aGF0IHRoZSBvdGhlciBudW1iZXJzIGFyZSB3cm9uZzsgdGhleSBuZXZlciBoYXBwZW4gYW55d2F5XG5mbFsyOF0gPSAyNTgsIHJldmZsWzI1OF0gPSAyODtcbnZhciBfYiA9IGZyZWIoZmRlYiwgMCksIGZkID0gX2JbMF0sIHJldmZkID0gX2JbMV07XG4vLyBtYXAgb2YgdmFsdWUgdG8gcmV2ZXJzZSAoYXNzdW1pbmcgMTYgYml0cylcbnZhciByZXYgPSBuZXcgdTE2KDMyNzY4KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMzI3Njg7ICsraSkge1xuICAgIC8vIHJldmVyc2UgdGFibGUgYWxnb3JpdGhtIGZyb20gU09cbiAgICB2YXIgeCA9ICgoaSAmIDB4QUFBQSkgPj4+IDEpIHwgKChpICYgMHg1NTU1KSA8PCAxKTtcbiAgICB4ID0gKCh4ICYgMHhDQ0NDKSA+Pj4gMikgfCAoKHggJiAweDMzMzMpIDw8IDIpO1xuICAgIHggPSAoKHggJiAweEYwRjApID4+PiA0KSB8ICgoeCAmIDB4MEYwRikgPDwgNCk7XG4gICAgcmV2W2ldID0gKCgoeCAmIDB4RkYwMCkgPj4+IDgpIHwgKCh4ICYgMHgwMEZGKSA8PCA4KSkgPj4+IDE7XG59XG4vLyBjcmVhdGUgaHVmZm1hbiB0cmVlIGZyb20gdTggXCJtYXBcIjogaW5kZXggLT4gY29kZSBsZW5ndGggZm9yIGNvZGUgaW5kZXhcbi8vIG1iIChtYXggYml0cykgbXVzdCBiZSBhdCBtb3N0IDE1XG4vLyBUT0RPOiBvcHRpbWl6ZS9zcGxpdCB1cD9cbnZhciBoTWFwID0gKGZ1bmN0aW9uIChjZCwgbWIsIHIpIHtcbiAgICB2YXIgcyA9IGNkLmxlbmd0aDtcbiAgICAvLyBpbmRleFxuICAgIHZhciBpID0gMDtcbiAgICAvLyB1MTYgXCJtYXBcIjogaW5kZXggLT4gIyBvZiBjb2RlcyB3aXRoIGJpdCBsZW5ndGggPSBpbmRleFxuICAgIHZhciBsID0gbmV3IHUxNihtYik7XG4gICAgLy8gbGVuZ3RoIG9mIGNkIG11c3QgYmUgMjg4ICh0b3RhbCAjIG9mIGNvZGVzKVxuICAgIGZvciAoOyBpIDwgczsgKytpKSB7XG4gICAgICAgIGlmIChjZFtpXSlcbiAgICAgICAgICAgICsrbFtjZFtpXSAtIDFdO1xuICAgIH1cbiAgICAvLyB1MTYgXCJtYXBcIjogaW5kZXggLT4gbWluaW11bSBjb2RlIGZvciBiaXQgbGVuZ3RoID0gaW5kZXhcbiAgICB2YXIgbGUgPSBuZXcgdTE2KG1iKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbWI7ICsraSkge1xuICAgICAgICBsZVtpXSA9IChsZVtpIC0gMV0gKyBsW2kgLSAxXSkgPDwgMTtcbiAgICB9XG4gICAgdmFyIGNvO1xuICAgIGlmIChyKSB7XG4gICAgICAgIC8vIHUxNiBcIm1hcFwiOiBpbmRleCAtPiBudW1iZXIgb2YgYWN0dWFsIGJpdHMsIHN5bWJvbCBmb3IgY29kZVxuICAgICAgICBjbyA9IG5ldyB1MTYoMSA8PCBtYik7XG4gICAgICAgIC8vIGJpdHMgdG8gcmVtb3ZlIGZvciByZXZlcnNlclxuICAgICAgICB2YXIgcnZiID0gMTUgLSBtYjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHM7ICsraSkge1xuICAgICAgICAgICAgLy8gaWdub3JlIDAgbGVuZ3Roc1xuICAgICAgICAgICAgaWYgKGNkW2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gbnVtIGVuY29kaW5nIGJvdGggc3ltYm9sIGFuZCBiaXRzIHJlYWRcbiAgICAgICAgICAgICAgICB2YXIgc3YgPSAoaSA8PCA0KSB8IGNkW2ldO1xuICAgICAgICAgICAgICAgIC8vIGZyZWUgYml0c1xuICAgICAgICAgICAgICAgIHZhciByXzEgPSBtYiAtIGNkW2ldO1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHZhbHVlXG4gICAgICAgICAgICAgICAgdmFyIHYgPSBsZVtjZFtpXSAtIDFdKysgPDwgcl8xO1xuICAgICAgICAgICAgICAgIC8vIG0gaXMgZW5kIHZhbHVlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSA9IHYgfCAoKDEgPDwgcl8xKSAtIDEpOyB2IDw9IG07ICsrdikge1xuICAgICAgICAgICAgICAgICAgICAvLyBldmVyeSAxNiBiaXQgdmFsdWUgc3RhcnRpbmcgd2l0aCB0aGUgY29kZSB5aWVsZHMgdGhlIHNhbWUgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgIGNvW3Jldlt2XSA+Pj4gcnZiXSA9IHN2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY28gPSBuZXcgdTE2KHMpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY2RbaV0pIHtcbiAgICAgICAgICAgICAgICBjb1tpXSA9IHJldltsZVtjZFtpXSAtIDFdKytdID4+PiAoMTUgLSBjZFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvO1xufSk7XG4vLyBmaXhlZCBsZW5ndGggdHJlZVxudmFyIGZsdCA9IG5ldyB1OCgyODgpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAxNDQ7ICsraSlcbiAgICBmbHRbaV0gPSA4O1xuZm9yICh2YXIgaSA9IDE0NDsgaSA8IDI1NjsgKytpKVxuICAgIGZsdFtpXSA9IDk7XG5mb3IgKHZhciBpID0gMjU2OyBpIDwgMjgwOyArK2kpXG4gICAgZmx0W2ldID0gNztcbmZvciAodmFyIGkgPSAyODA7IGkgPCAyODg7ICsraSlcbiAgICBmbHRbaV0gPSA4O1xuLy8gZml4ZWQgZGlzdGFuY2UgdHJlZVxudmFyIGZkdCA9IG5ldyB1OCgzMik7XG5mb3IgKHZhciBpID0gMDsgaSA8IDMyOyArK2kpXG4gICAgZmR0W2ldID0gNTtcbi8vIGZpeGVkIGxlbmd0aCBtYXBcbnZhciBmbG0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmx0LCA5LCAwKSwgZmxybSA9IC8qI19fUFVSRV9fKi8gaE1hcChmbHQsIDksIDEpO1xuLy8gZml4ZWQgZGlzdGFuY2UgbWFwXG52YXIgZmRtID0gLyojX19QVVJFX18qLyBoTWFwKGZkdCwgNSwgMCksIGZkcm0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmR0LCA1LCAxKTtcbi8vIGZpbmQgbWF4IG9mIGFycmF5XG52YXIgbWF4ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgbSA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChhW2ldID4gbSlcbiAgICAgICAgICAgIG0gPSBhW2ldO1xuICAgIH1cbiAgICByZXR1cm4gbTtcbn07XG4vLyByZWFkIGQsIHN0YXJ0aW5nIGF0IGJpdCBwIGFuZCBtYXNrIHdpdGggbVxudmFyIGJpdHMgPSBmdW5jdGlvbiAoZCwgcCwgbSkge1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgcmV0dXJuICgoZFtvXSB8IChkW28gKyAxXSA8PCA4KSkgPj4gKHAgJiA3KSkgJiBtO1xufTtcbi8vIHJlYWQgZCwgc3RhcnRpbmcgYXQgYml0IHAgY29udGludWluZyBmb3IgYXQgbGVhc3QgMTYgYml0c1xudmFyIGJpdHMxNiA9IGZ1bmN0aW9uIChkLCBwKSB7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICByZXR1cm4gKChkW29dIHwgKGRbbyArIDFdIDw8IDgpIHwgKGRbbyArIDJdIDw8IDE2KSkgPj4gKHAgJiA3KSk7XG59O1xuLy8gZ2V0IGVuZCBvZiBieXRlXG52YXIgc2hmdCA9IGZ1bmN0aW9uIChwKSB7IHJldHVybiAoKHAgKyA3KSAvIDgpIHwgMDsgfTtcbi8vIHR5cGVkIGFycmF5IHNsaWNlIC0gYWxsb3dzIGdhcmJhZ2UgY29sbGVjdG9yIHRvIGZyZWUgb3JpZ2luYWwgcmVmZXJlbmNlLFxuLy8gd2hpbGUgYmVpbmcgbW9yZSBjb21wYXRpYmxlIHRoYW4gLnNsaWNlXG52YXIgc2xjID0gZnVuY3Rpb24gKHYsIHMsIGUpIHtcbiAgICBpZiAocyA9PSBudWxsIHx8IHMgPCAwKVxuICAgICAgICBzID0gMDtcbiAgICBpZiAoZSA9PSBudWxsIHx8IGUgPiB2Lmxlbmd0aClcbiAgICAgICAgZSA9IHYubGVuZ3RoO1xuICAgIC8vIGNhbid0IHVzZSAuY29uc3RydWN0b3IgaW4gY2FzZSB1c2VyLXN1cHBsaWVkXG4gICAgdmFyIG4gPSBuZXcgKHYuQllURVNfUEVSX0VMRU1FTlQgPT0gMiA/IHUxNiA6IHYuQllURVNfUEVSX0VMRU1FTlQgPT0gNCA/IHUzMiA6IHU4KShlIC0gcyk7XG4gICAgbi5zZXQodi5zdWJhcnJheShzLCBlKSk7XG4gICAgcmV0dXJuIG47XG59O1xuLyoqXG4gKiBDb2RlcyBmb3IgZXJyb3JzIGdlbmVyYXRlZCB3aXRoaW4gdGhpcyBsaWJyYXJ5XG4gKi9cbmV4cG9ydCB2YXIgRmxhdGVFcnJvckNvZGUgPSB7XG4gICAgVW5leHBlY3RlZEVPRjogMCxcbiAgICBJbnZhbGlkQmxvY2tUeXBlOiAxLFxuICAgIEludmFsaWRMZW5ndGhMaXRlcmFsOiAyLFxuICAgIEludmFsaWREaXN0YW5jZTogMyxcbiAgICBTdHJlYW1GaW5pc2hlZDogNCxcbiAgICBOb1N0cmVhbUhhbmRsZXI6IDUsXG4gICAgSW52YWxpZEhlYWRlcjogNixcbiAgICBOb0NhbGxiYWNrOiA3LFxuICAgIEludmFsaWRVVEY4OiA4LFxuICAgIEV4dHJhRmllbGRUb29Mb25nOiA5LFxuICAgIEludmFsaWREYXRlOiAxMCxcbiAgICBGaWxlbmFtZVRvb0xvbmc6IDExLFxuICAgIFN0cmVhbUZpbmlzaGluZzogMTIsXG4gICAgSW52YWxpZFppcERhdGE6IDEzLFxuICAgIFVua25vd25Db21wcmVzc2lvbk1ldGhvZDogMTRcbn07XG4vLyBlcnJvciBjb2Rlc1xudmFyIGVjID0gW1xuICAgICd1bmV4cGVjdGVkIEVPRicsXG4gICAgJ2ludmFsaWQgYmxvY2sgdHlwZScsXG4gICAgJ2ludmFsaWQgbGVuZ3RoL2xpdGVyYWwnLFxuICAgICdpbnZhbGlkIGRpc3RhbmNlJyxcbiAgICAnc3RyZWFtIGZpbmlzaGVkJyxcbiAgICAnbm8gc3RyZWFtIGhhbmRsZXInLFxuICAgICxcbiAgICAnbm8gY2FsbGJhY2snLFxuICAgICdpbnZhbGlkIFVURi04IGRhdGEnLFxuICAgICdleHRyYSBmaWVsZCB0b28gbG9uZycsXG4gICAgJ2RhdGUgbm90IGluIHJhbmdlIDE5ODAtMjA5OScsXG4gICAgJ2ZpbGVuYW1lIHRvbyBsb25nJyxcbiAgICAnc3RyZWFtIGZpbmlzaGluZycsXG4gICAgJ2ludmFsaWQgemlwIGRhdGEnXG4gICAgLy8gZGV0ZXJtaW5lZCBieSB1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFxuXTtcbjtcbnZhciBlcnIgPSBmdW5jdGlvbiAoaW5kLCBtc2csIG50KSB7XG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobXNnIHx8IGVjW2luZF0pO1xuICAgIGUuY29kZSA9IGluZDtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGUsIGVycik7XG4gICAgaWYgKCFudClcbiAgICAgICAgdGhyb3cgZTtcbiAgICByZXR1cm4gZTtcbn07XG4vLyBleHBhbmRzIHJhdyBERUZMQVRFIGRhdGFcbnZhciBpbmZsdCA9IGZ1bmN0aW9uIChkYXQsIGJ1Ziwgc3QpIHtcbiAgICAvLyBzb3VyY2UgbGVuZ3RoXG4gICAgdmFyIHNsID0gZGF0Lmxlbmd0aDtcbiAgICBpZiAoIXNsIHx8IChzdCAmJiBzdC5mICYmICFzdC5sKSlcbiAgICAgICAgcmV0dXJuIGJ1ZiB8fCBuZXcgdTgoMCk7XG4gICAgLy8gaGF2ZSB0byBlc3RpbWF0ZSBzaXplXG4gICAgdmFyIG5vQnVmID0gIWJ1ZiB8fCBzdDtcbiAgICAvLyBubyBzdGF0ZVxuICAgIHZhciBub1N0ID0gIXN0IHx8IHN0Lmk7XG4gICAgaWYgKCFzdClcbiAgICAgICAgc3QgPSB7fTtcbiAgICAvLyBBc3N1bWVzIHJvdWdobHkgMzMlIGNvbXByZXNzaW9uIHJhdGlvIGF2ZXJhZ2VcbiAgICBpZiAoIWJ1ZilcbiAgICAgICAgYnVmID0gbmV3IHU4KHNsICogMyk7XG4gICAgLy8gZW5zdXJlIGJ1ZmZlciBjYW4gZml0IGF0IGxlYXN0IGwgZWxlbWVudHNcbiAgICB2YXIgY2J1ZiA9IGZ1bmN0aW9uIChsKSB7XG4gICAgICAgIHZhciBibCA9IGJ1Zi5sZW5ndGg7XG4gICAgICAgIC8vIG5lZWQgdG8gaW5jcmVhc2Ugc2l6ZSB0byBmaXRcbiAgICAgICAgaWYgKGwgPiBibCkge1xuICAgICAgICAgICAgLy8gRG91YmxlIG9yIHNldCB0byBuZWNlc3NhcnksIHdoaWNoZXZlciBpcyBncmVhdGVyXG4gICAgICAgICAgICB2YXIgbmJ1ZiA9IG5ldyB1OChNYXRoLm1heChibCAqIDIsIGwpKTtcbiAgICAgICAgICAgIG5idWYuc2V0KGJ1Zik7XG4gICAgICAgICAgICBidWYgPSBuYnVmO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyAgbGFzdCBjaHVuayAgICAgICAgIGJpdHBvcyAgICAgICAgICAgYnl0ZXNcbiAgICB2YXIgZmluYWwgPSBzdC5mIHx8IDAsIHBvcyA9IHN0LnAgfHwgMCwgYnQgPSBzdC5iIHx8IDAsIGxtID0gc3QubCwgZG0gPSBzdC5kLCBsYnQgPSBzdC5tLCBkYnQgPSBzdC5uO1xuICAgIC8vIHRvdGFsIGJpdHNcbiAgICB2YXIgdGJ0cyA9IHNsICogODtcbiAgICBkbyB7XG4gICAgICAgIGlmICghbG0pIHtcbiAgICAgICAgICAgIC8vIEJGSU5BTCAtIHRoaXMgaXMgb25seSAxIHdoZW4gbGFzdCBjaHVuayBpcyBuZXh0XG4gICAgICAgICAgICBmaW5hbCA9IGJpdHMoZGF0LCBwb3MsIDEpO1xuICAgICAgICAgICAgLy8gdHlwZTogMCA9IG5vIGNvbXByZXNzaW9uLCAxID0gZml4ZWQgaHVmZm1hbiwgMiA9IGR5bmFtaWMgaHVmZm1hblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBiaXRzKGRhdCwgcG9zICsgMSwgMyk7XG4gICAgICAgICAgICBwb3MgKz0gMztcbiAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgIC8vIGdvIHRvIGVuZCBvZiBieXRlIGJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBzaGZ0KHBvcykgKyA0LCBsID0gZGF0W3MgLSA0XSB8IChkYXRbcyAtIDNdIDw8IDgpLCB0ID0gcyArIGw7XG4gICAgICAgICAgICAgICAgaWYgKHQgPiBzbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9TdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBzaXplXG4gICAgICAgICAgICAgICAgaWYgKG5vQnVmKVxuICAgICAgICAgICAgICAgICAgICBjYnVmKGJ0ICsgbCk7XG4gICAgICAgICAgICAgICAgLy8gQ29weSBvdmVyIHVuY29tcHJlc3NlZCBkYXRhXG4gICAgICAgICAgICAgICAgYnVmLnNldChkYXQuc3ViYXJyYXkocywgdCksIGJ0KTtcbiAgICAgICAgICAgICAgICAvLyBHZXQgbmV3IGJpdHBvcywgdXBkYXRlIGJ5dGUgY291bnRcbiAgICAgICAgICAgICAgICBzdC5iID0gYnQgKz0gbCwgc3QucCA9IHBvcyA9IHQgKiA4LCBzdC5mID0gZmluYWw7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IDEpXG4gICAgICAgICAgICAgICAgbG0gPSBmbHJtLCBkbSA9IGZkcm0sIGxidCA9IDksIGRidCA9IDU7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAvLyAgbGl0ZXJhbCAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhzXG4gICAgICAgICAgICAgICAgdmFyIGhMaXQgPSBiaXRzKGRhdCwgcG9zLCAzMSkgKyAyNTcsIGhjTGVuID0gYml0cyhkYXQsIHBvcyArIDEwLCAxNSkgKyA0O1xuICAgICAgICAgICAgICAgIHZhciB0bCA9IGhMaXQgKyBiaXRzKGRhdCwgcG9zICsgNSwgMzEpICsgMTtcbiAgICAgICAgICAgICAgICBwb3MgKz0gMTQ7XG4gICAgICAgICAgICAgICAgLy8gbGVuZ3RoK2Rpc3RhbmNlIHRyZWVcbiAgICAgICAgICAgICAgICB2YXIgbGR0ID0gbmV3IHU4KHRsKTtcbiAgICAgICAgICAgICAgICAvLyBjb2RlIGxlbmd0aCB0cmVlXG4gICAgICAgICAgICAgICAgdmFyIGNsdCA9IG5ldyB1OCgxOSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoY0xlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBpbmRleCBtYXAgdG8gZ2V0IHJlYWwgY29kZVxuICAgICAgICAgICAgICAgICAgICBjbHRbY2xpbVtpXV0gPSBiaXRzKGRhdCwgcG9zICsgaSAqIDMsIDcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MgKz0gaGNMZW4gKiAzO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RocyBiaXRzXG4gICAgICAgICAgICAgICAgdmFyIGNsYiA9IG1heChjbHQpLCBjbGJtc2sgPSAoMSA8PCBjbGIpIC0gMTtcbiAgICAgICAgICAgICAgICAvLyBjb2RlIGxlbmd0aHMgbWFwXG4gICAgICAgICAgICAgICAgdmFyIGNsbSA9IGhNYXAoY2x0LCBjbGIsIDEpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGw7KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gY2xtW2JpdHMoZGF0LCBwb3MsIGNsYm1zayldO1xuICAgICAgICAgICAgICAgICAgICAvLyBiaXRzIHJlYWRcbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IHIgJiAxNTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3ltYm9sXG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gciA+Pj4gNDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGggdG8gY29weVxuICAgICAgICAgICAgICAgICAgICBpZiAocyA8IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZHRbaSsrXSA9IHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgY29weSAgIGNvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IDAsIG4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT0gMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IDMgKyBiaXRzKGRhdCwgcG9zLCAzKSwgcG9zICs9IDIsIGMgPSBsZHRbaSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocyA9PSAxNylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMyArIGJpdHMoZGF0LCBwb3MsIDcpLCBwb3MgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gMTgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IDExICsgYml0cyhkYXQsIHBvcywgMTI3KSwgcG9zICs9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobi0tKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxkdFtpKytdID0gYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICBsZW5ndGggdHJlZSAgICAgICAgICAgICAgICAgZGlzdGFuY2UgdHJlZVxuICAgICAgICAgICAgICAgIHZhciBsdCA9IGxkdC5zdWJhcnJheSgwLCBoTGl0KSwgZHQgPSBsZHQuc3ViYXJyYXkoaExpdCk7XG4gICAgICAgICAgICAgICAgLy8gbWF4IGxlbmd0aCBiaXRzXG4gICAgICAgICAgICAgICAgbGJ0ID0gbWF4KGx0KTtcbiAgICAgICAgICAgICAgICAvLyBtYXggZGlzdCBiaXRzXG4gICAgICAgICAgICAgICAgZGJ0ID0gbWF4KGR0KTtcbiAgICAgICAgICAgICAgICBsbSA9IGhNYXAobHQsIGxidCwgMSk7XG4gICAgICAgICAgICAgICAgZG0gPSBoTWFwKGR0LCBkYnQsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVycigxKTtcbiAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGJ1ZmZlciBjYW4gaG9sZCB0aGlzICsgdGhlIGxhcmdlc3QgcG9zc2libGUgYWRkaXRpb25cbiAgICAgICAgLy8gTWF4aW11bSBjaHVuayBzaXplIChwcmFjdGljYWxseSwgdGhlb3JldGljYWxseSBpbmZpbml0ZSkgaXMgMl4xNztcbiAgICAgICAgaWYgKG5vQnVmKVxuICAgICAgICAgICAgY2J1ZihidCArIDEzMTA3Mik7XG4gICAgICAgIHZhciBsbXMgPSAoMSA8PCBsYnQpIC0gMSwgZG1zID0gKDEgPDwgZGJ0KSAtIDE7XG4gICAgICAgIHZhciBscG9zID0gcG9zO1xuICAgICAgICBmb3IgKDs7IGxwb3MgPSBwb3MpIHtcbiAgICAgICAgICAgIC8vIGJpdHMgcmVhZCwgY29kZVxuICAgICAgICAgICAgdmFyIGMgPSBsbVtiaXRzMTYoZGF0LCBwb3MpICYgbG1zXSwgc3ltID0gYyA+Pj4gNDtcbiAgICAgICAgICAgIHBvcyArPSBjICYgMTU7XG4gICAgICAgICAgICBpZiAocG9zID4gdGJ0cykge1xuICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWMpXG4gICAgICAgICAgICAgICAgZXJyKDIpO1xuICAgICAgICAgICAgaWYgKHN5bSA8IDI1NilcbiAgICAgICAgICAgICAgICBidWZbYnQrK10gPSBzeW07XG4gICAgICAgICAgICBlbHNlIGlmIChzeW0gPT0gMjU2KSB7XG4gICAgICAgICAgICAgICAgbHBvcyA9IHBvcywgbG0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFkZCA9IHN5bSAtIDI1NDtcbiAgICAgICAgICAgICAgICAvLyBubyBleHRyYSBiaXRzIG5lZWRlZCBpZiBsZXNzXG4gICAgICAgICAgICAgICAgaWYgKHN5bSA+IDI2NCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmRleFxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHN5bSAtIDI1NywgYiA9IGZsZWJbaV07XG4gICAgICAgICAgICAgICAgICAgIGFkZCA9IGJpdHMoZGF0LCBwb3MsICgxIDw8IGIpIC0gMSkgKyBmbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IGI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRpc3RcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGRtW2JpdHMxNihkYXQsIHBvcykgJiBkbXNdLCBkc3ltID0gZCA+Pj4gNDtcbiAgICAgICAgICAgICAgICBpZiAoIWQpXG4gICAgICAgICAgICAgICAgICAgIGVycigzKTtcbiAgICAgICAgICAgICAgICBwb3MgKz0gZCAmIDE1O1xuICAgICAgICAgICAgICAgIHZhciBkdCA9IGZkW2RzeW1dO1xuICAgICAgICAgICAgICAgIGlmIChkc3ltID4gMykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IGZkZWJbZHN5bV07XG4gICAgICAgICAgICAgICAgICAgIGR0ICs9IGJpdHMxNihkYXQsIHBvcykgJiAoKDEgPDwgYikgLSAxKSwgcG9zICs9IGI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vQnVmKVxuICAgICAgICAgICAgICAgICAgICBjYnVmKGJ0ICsgMTMxMDcyKTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kID0gYnQgKyBhZGQ7XG4gICAgICAgICAgICAgICAgZm9yICg7IGJ0IDwgZW5kOyBidCArPSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZltidF0gPSBidWZbYnQgLSBkdF07XG4gICAgICAgICAgICAgICAgICAgIGJ1ZltidCArIDFdID0gYnVmW2J0ICsgMSAtIGR0XTtcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0ICsgMl0gPSBidWZbYnQgKyAyIC0gZHRdO1xuICAgICAgICAgICAgICAgICAgICBidWZbYnQgKyAzXSA9IGJ1ZltidCArIDMgLSBkdF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ0ID0gZW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0LmwgPSBsbSwgc3QucCA9IGxwb3MsIHN0LmIgPSBidCwgc3QuZiA9IGZpbmFsO1xuICAgICAgICBpZiAobG0pXG4gICAgICAgICAgICBmaW5hbCA9IDEsIHN0Lm0gPSBsYnQsIHN0LmQgPSBkbSwgc3QubiA9IGRidDtcbiAgICB9IHdoaWxlICghZmluYWwpO1xuICAgIHJldHVybiBidCA9PSBidWYubGVuZ3RoID8gYnVmIDogc2xjKGJ1ZiwgMCwgYnQpO1xufTtcbi8vIHN0YXJ0aW5nIGF0IHAsIHdyaXRlIHRoZSBtaW5pbXVtIG51bWJlciBvZiBiaXRzIHRoYXQgY2FuIGhvbGQgdiB0byBkXG52YXIgd2JpdHMgPSBmdW5jdGlvbiAoZCwgcCwgdikge1xuICAgIHYgPDw9IHAgJiA3O1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgZFtvXSB8PSB2O1xuICAgIGRbbyArIDFdIHw9IHYgPj4+IDg7XG59O1xuLy8gc3RhcnRpbmcgYXQgcCwgd3JpdGUgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGJpdHMgKD44KSB0aGF0IGNhbiBob2xkIHYgdG8gZFxudmFyIHdiaXRzMTYgPSBmdW5jdGlvbiAoZCwgcCwgdikge1xuICAgIHYgPDw9IHAgJiA3O1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgZFtvXSB8PSB2O1xuICAgIGRbbyArIDFdIHw9IHYgPj4+IDg7XG4gICAgZFtvICsgMl0gfD0gdiA+Pj4gMTY7XG59O1xuLy8gY3JlYXRlcyBjb2RlIGxlbmd0aHMgZnJvbSBhIGZyZXF1ZW5jeSB0YWJsZVxudmFyIGhUcmVlID0gZnVuY3Rpb24gKGQsIG1iKSB7XG4gICAgLy8gTmVlZCBleHRyYSBpbmZvIHRvIG1ha2UgYSB0cmVlXG4gICAgdmFyIHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGRbaV0pXG4gICAgICAgICAgICB0LnB1c2goeyBzOiBpLCBmOiBkW2ldIH0pO1xuICAgIH1cbiAgICB2YXIgcyA9IHQubGVuZ3RoO1xuICAgIHZhciB0MiA9IHQuc2xpY2UoKTtcbiAgICBpZiAoIXMpXG4gICAgICAgIHJldHVybiBbZXQsIDBdO1xuICAgIGlmIChzID09IDEpIHtcbiAgICAgICAgdmFyIHYgPSBuZXcgdTgodFswXS5zICsgMSk7XG4gICAgICAgIHZbdFswXS5zXSA9IDE7XG4gICAgICAgIHJldHVybiBbdiwgMV07XG4gICAgfVxuICAgIHQuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5mIC0gYi5mOyB9KTtcbiAgICAvLyBhZnRlciBpMiByZWFjaGVzIGxhc3QgaW5kLCB3aWxsIGJlIHN0b3BwZWRcbiAgICAvLyBmcmVxIG11c3QgYmUgZ3JlYXRlciB0aGFuIGxhcmdlc3QgcG9zc2libGUgbnVtYmVyIG9mIHN5bWJvbHNcbiAgICB0LnB1c2goeyBzOiAtMSwgZjogMjUwMDEgfSk7XG4gICAgdmFyIGwgPSB0WzBdLCByID0gdFsxXSwgaTAgPSAwLCBpMSA9IDEsIGkyID0gMjtcbiAgICB0WzBdID0geyBzOiAtMSwgZjogbC5mICsgci5mLCBsOiBsLCByOiByIH07XG4gICAgLy8gZWZmaWNpZW50IGFsZ29yaXRobSBmcm9tIFVaSVAuanNcbiAgICAvLyBpMCBpcyBsb29rYmVoaW5kLCBpMiBpcyBsb29rYWhlYWQgLSBhZnRlciBwcm9jZXNzaW5nIHR3byBsb3ctZnJlcVxuICAgIC8vIHN5bWJvbHMgdGhhdCBjb21iaW5lZCBoYXZlIGhpZ2ggZnJlcSwgd2lsbCBzdGFydCBwcm9jZXNzaW5nIGkyIChoaWdoLWZyZXEsXG4gICAgLy8gbm9uLWNvbXBvc2l0ZSkgc3ltYm9scyBpbnN0ZWFkXG4gICAgLy8gc2VlIGh0dHBzOi8vcmVkZGl0LmNvbS9yL3Bob3RvcGVhL2NvbW1lbnRzL2lrZWtodC91emlwanNfcXVlc3Rpb25zL1xuICAgIHdoaWxlIChpMSAhPSBzIC0gMSkge1xuICAgICAgICBsID0gdFt0W2kwXS5mIDwgdFtpMl0uZiA/IGkwKysgOiBpMisrXTtcbiAgICAgICAgciA9IHRbaTAgIT0gaTEgJiYgdFtpMF0uZiA8IHRbaTJdLmYgPyBpMCsrIDogaTIrK107XG4gICAgICAgIHRbaTErK10gPSB7IHM6IC0xLCBmOiBsLmYgKyByLmYsIGw6IGwsIHI6IHIgfTtcbiAgICB9XG4gICAgdmFyIG1heFN5bSA9IHQyWzBdLnM7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgaWYgKHQyW2ldLnMgPiBtYXhTeW0pXG4gICAgICAgICAgICBtYXhTeW0gPSB0MltpXS5zO1xuICAgIH1cbiAgICAvLyBjb2RlIGxlbmd0aHNcbiAgICB2YXIgdHIgPSBuZXcgdTE2KG1heFN5bSArIDEpO1xuICAgIC8vIG1heCBiaXRzIGluIHRyZWVcbiAgICB2YXIgbWJ0ID0gbG4odFtpMSAtIDFdLCB0ciwgMCk7XG4gICAgaWYgKG1idCA+IG1iKSB7XG4gICAgICAgIC8vIG1vcmUgYWxnb3JpdGhtcyBmcm9tIFVaSVAuanNcbiAgICAgICAgLy8gVE9ETzogZmluZCBvdXQgaG93IHRoaXMgY29kZSB3b3JrcyAoZGVidClcbiAgICAgICAgLy8gIGluZCAgICBkZWJ0XG4gICAgICAgIHZhciBpID0gMCwgZHQgPSAwO1xuICAgICAgICAvLyAgICBsZWZ0ICAgICAgICAgICAgY29zdFxuICAgICAgICB2YXIgbGZ0ID0gbWJ0IC0gbWIsIGNzdCA9IDEgPDwgbGZ0O1xuICAgICAgICB0Mi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiB0cltiLnNdIC0gdHJbYS5zXSB8fCBhLmYgLSBiLmY7IH0pO1xuICAgICAgICBmb3IgKDsgaSA8IHM7ICsraSkge1xuICAgICAgICAgICAgdmFyIGkyXzEgPSB0MltpXS5zO1xuICAgICAgICAgICAgaWYgKHRyW2kyXzFdID4gbWIpIHtcbiAgICAgICAgICAgICAgICBkdCArPSBjc3QgLSAoMSA8PCAobWJ0IC0gdHJbaTJfMV0pKTtcbiAgICAgICAgICAgICAgICB0cltpMl8xXSA9IG1iO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGR0ID4+Pj0gbGZ0O1xuICAgICAgICB3aGlsZSAoZHQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgaTJfMiA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfMl0gPCBtYilcbiAgICAgICAgICAgICAgICBkdCAtPSAxIDw8IChtYiAtIHRyW2kyXzJdKysgLSAxKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPj0gMCAmJiBkdDsgLS1pKSB7XG4gICAgICAgICAgICB2YXIgaTJfMyA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfM10gPT0gbWIpIHtcbiAgICAgICAgICAgICAgICAtLXRyW2kyXzNdO1xuICAgICAgICAgICAgICAgICsrZHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWJ0ID0gbWI7XG4gICAgfVxuICAgIHJldHVybiBbbmV3IHU4KHRyKSwgbWJ0XTtcbn07XG4vLyBnZXQgdGhlIG1heCBsZW5ndGggYW5kIGFzc2lnbiBsZW5ndGggY29kZXNcbnZhciBsbiA9IGZ1bmN0aW9uIChuLCBsLCBkKSB7XG4gICAgcmV0dXJuIG4ucyA9PSAtMVxuICAgICAgICA/IE1hdGgubWF4KGxuKG4ubCwgbCwgZCArIDEpLCBsbihuLnIsIGwsIGQgKyAxKSlcbiAgICAgICAgOiAobFtuLnNdID0gZCk7XG59O1xuLy8gbGVuZ3RoIGNvZGVzIGdlbmVyYXRpb25cbnZhciBsYyA9IGZ1bmN0aW9uIChjKSB7XG4gICAgdmFyIHMgPSBjLmxlbmd0aDtcbiAgICAvLyBOb3RlIHRoYXQgdGhlIHNlbWljb2xvbiB3YXMgaW50ZW50aW9uYWxcbiAgICB3aGlsZSAocyAmJiAhY1stLXNdKVxuICAgICAgICA7XG4gICAgdmFyIGNsID0gbmV3IHUxNigrK3MpO1xuICAgIC8vICBpbmQgICAgICBudW0gICAgICAgICBzdHJlYWtcbiAgICB2YXIgY2xpID0gMCwgY2xuID0gY1swXSwgY2xzID0gMTtcbiAgICB2YXIgdyA9IGZ1bmN0aW9uICh2KSB7IGNsW2NsaSsrXSA9IHY7IH07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gczsgKytpKSB7XG4gICAgICAgIGlmIChjW2ldID09IGNsbiAmJiBpICE9IHMpXG4gICAgICAgICAgICArK2NscztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWNsbiAmJiBjbHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgZm9yICg7IGNscyA+IDEzODsgY2xzIC09IDEzOClcbiAgICAgICAgICAgICAgICAgICAgdygzMjc1NCk7XG4gICAgICAgICAgICAgICAgaWYgKGNscyA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdyhjbHMgPiAxMCA/ICgoY2xzIC0gMTEpIDw8IDUpIHwgMjg2OTAgOiAoKGNscyAtIDMpIDw8IDUpIHwgMTIzMDUpO1xuICAgICAgICAgICAgICAgICAgICBjbHMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNscyA+IDMpIHtcbiAgICAgICAgICAgICAgICB3KGNsbiksIC0tY2xzO1xuICAgICAgICAgICAgICAgIGZvciAoOyBjbHMgPiA2OyBjbHMgLT0gNilcbiAgICAgICAgICAgICAgICAgICAgdyg4MzA0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2xzID4gMilcbiAgICAgICAgICAgICAgICAgICAgdygoKGNscyAtIDMpIDw8IDUpIHwgODIwOCksIGNscyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2xzLS0pXG4gICAgICAgICAgICAgICAgdyhjbG4pO1xuICAgICAgICAgICAgY2xzID0gMTtcbiAgICAgICAgICAgIGNsbiA9IGNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtjbC5zdWJhcnJheSgwLCBjbGkpLCBzXTtcbn07XG4vLyBjYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiBvdXRwdXQgZnJvbSB0cmVlLCBjb2RlIGxlbmd0aHNcbnZhciBjbGVuID0gZnVuY3Rpb24gKGNmLCBjbCkge1xuICAgIHZhciBsID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsLmxlbmd0aDsgKytpKVxuICAgICAgICBsICs9IGNmW2ldICogY2xbaV07XG4gICAgcmV0dXJuIGw7XG59O1xuLy8gd3JpdGVzIGEgZml4ZWQgYmxvY2tcbi8vIHJldHVybnMgdGhlIG5ldyBiaXQgcG9zXG52YXIgd2ZibGsgPSBmdW5jdGlvbiAob3V0LCBwb3MsIGRhdCkge1xuICAgIC8vIG5vIG5lZWQgdG8gd3JpdGUgMDAgYXMgdHlwZTogVHlwZWRBcnJheSBkZWZhdWx0cyB0byAwXG4gICAgdmFyIHMgPSBkYXQubGVuZ3RoO1xuICAgIHZhciBvID0gc2hmdChwb3MgKyAyKTtcbiAgICBvdXRbb10gPSBzICYgMjU1O1xuICAgIG91dFtvICsgMV0gPSBzID4+PiA4O1xuICAgIG91dFtvICsgMl0gPSBvdXRbb10gXiAyNTU7XG4gICAgb3V0W28gKyAzXSA9IG91dFtvICsgMV0gXiAyNTU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyArK2kpXG4gICAgICAgIG91dFtvICsgaSArIDRdID0gZGF0W2ldO1xuICAgIHJldHVybiAobyArIDQgKyBzKSAqIDg7XG59O1xuLy8gd3JpdGVzIGEgYmxvY2tcbnZhciB3YmxrID0gZnVuY3Rpb24gKGRhdCwgb3V0LCBmaW5hbCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBibCwgcCkge1xuICAgIHdiaXRzKG91dCwgcCsrLCBmaW5hbCk7XG4gICAgKytsZlsyNTZdO1xuICAgIHZhciBfYSA9IGhUcmVlKGxmLCAxNSksIGRsdCA9IF9hWzBdLCBtbGIgPSBfYVsxXTtcbiAgICB2YXIgX2IgPSBoVHJlZShkZiwgMTUpLCBkZHQgPSBfYlswXSwgbWRiID0gX2JbMV07XG4gICAgdmFyIF9jID0gbGMoZGx0KSwgbGNsdCA9IF9jWzBdLCBubGMgPSBfY1sxXTtcbiAgICB2YXIgX2QgPSBsYyhkZHQpLCBsY2R0ID0gX2RbMF0sIG5kYyA9IF9kWzFdO1xuICAgIHZhciBsY2ZyZXEgPSBuZXcgdTE2KDE5KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxjbHQubGVuZ3RoOyArK2kpXG4gICAgICAgIGxjZnJlcVtsY2x0W2ldICYgMzFdKys7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsY2R0Lmxlbmd0aDsgKytpKVxuICAgICAgICBsY2ZyZXFbbGNkdFtpXSAmIDMxXSsrO1xuICAgIHZhciBfZSA9IGhUcmVlKGxjZnJlcSwgNyksIGxjdCA9IF9lWzBdLCBtbGNiID0gX2VbMV07XG4gICAgdmFyIG5sY2MgPSAxOTtcbiAgICBmb3IgKDsgbmxjYyA+IDQgJiYgIWxjdFtjbGltW25sY2MgLSAxXV07IC0tbmxjYylcbiAgICAgICAgO1xuICAgIHZhciBmbGVuID0gKGJsICsgNSkgPDwgMztcbiAgICB2YXIgZnRsZW4gPSBjbGVuKGxmLCBmbHQpICsgY2xlbihkZiwgZmR0KSArIGViO1xuICAgIHZhciBkdGxlbiA9IGNsZW4obGYsIGRsdCkgKyBjbGVuKGRmLCBkZHQpICsgZWIgKyAxNCArIDMgKiBubGNjICsgY2xlbihsY2ZyZXEsIGxjdCkgKyAoMiAqIGxjZnJlcVsxNl0gKyAzICogbGNmcmVxWzE3XSArIDcgKiBsY2ZyZXFbMThdKTtcbiAgICBpZiAoZmxlbiA8PSBmdGxlbiAmJiBmbGVuIDw9IGR0bGVuKVxuICAgICAgICByZXR1cm4gd2ZibGsob3V0LCBwLCBkYXQuc3ViYXJyYXkoYnMsIGJzICsgYmwpKTtcbiAgICB2YXIgbG0sIGxsLCBkbSwgZGw7XG4gICAgd2JpdHMob3V0LCBwLCAxICsgKGR0bGVuIDwgZnRsZW4pKSwgcCArPSAyO1xuICAgIGlmIChkdGxlbiA8IGZ0bGVuKSB7XG4gICAgICAgIGxtID0gaE1hcChkbHQsIG1sYiwgMCksIGxsID0gZGx0LCBkbSA9IGhNYXAoZGR0LCBtZGIsIDApLCBkbCA9IGRkdDtcbiAgICAgICAgdmFyIGxsbSA9IGhNYXAobGN0LCBtbGNiLCAwKTtcbiAgICAgICAgd2JpdHMob3V0LCBwLCBubGMgLSAyNTcpO1xuICAgICAgICB3Yml0cyhvdXQsIHAgKyA1LCBuZGMgLSAxKTtcbiAgICAgICAgd2JpdHMob3V0LCBwICsgMTAsIG5sY2MgLSA0KTtcbiAgICAgICAgcCArPSAxNDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBubGNjOyArK2kpXG4gICAgICAgICAgICB3Yml0cyhvdXQsIHAgKyAzICogaSwgbGN0W2NsaW1baV1dKTtcbiAgICAgICAgcCArPSAzICogbmxjYztcbiAgICAgICAgdmFyIGxjdHMgPSBbbGNsdCwgbGNkdF07XG4gICAgICAgIGZvciAodmFyIGl0ID0gMDsgaXQgPCAyOyArK2l0KSB7XG4gICAgICAgICAgICB2YXIgY2xjdCA9IGxjdHNbaXRdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGNsY3RbaV0gJiAzMTtcbiAgICAgICAgICAgICAgICB3Yml0cyhvdXQsIHAsIGxsbVtsZW5dKSwgcCArPSBsY3RbbGVuXTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMTUpXG4gICAgICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgKGNsY3RbaV0gPj4+IDUpICYgMTI3KSwgcCArPSBjbGN0W2ldID4+PiAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG0gPSBmbG0sIGxsID0gZmx0LCBkbSA9IGZkbSwgZGwgPSBmZHQ7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGk7ICsraSkge1xuICAgICAgICBpZiAoc3ltc1tpXSA+IDI1NSkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IChzeW1zW2ldID4+PiAxOCkgJiAzMTtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBsbVtsZW4gKyAyNTddKSwgcCArPSBsbFtsZW4gKyAyNTddO1xuICAgICAgICAgICAgaWYgKGxlbiA+IDcpXG4gICAgICAgICAgICAgICAgd2JpdHMob3V0LCBwLCAoc3ltc1tpXSA+Pj4gMjMpICYgMzEpLCBwICs9IGZsZWJbbGVuXTtcbiAgICAgICAgICAgIHZhciBkc3QgPSBzeW1zW2ldICYgMzE7XG4gICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgZG1bZHN0XSksIHAgKz0gZGxbZHN0XTtcbiAgICAgICAgICAgIGlmIChkc3QgPiAzKVxuICAgICAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCAoc3ltc1tpXSA+Pj4gNSkgJiA4MTkxKSwgcCArPSBmZGViW2RzdF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgbG1bc3ltc1tpXV0pLCBwICs9IGxsW3N5bXNbaV1dO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdiaXRzMTYob3V0LCBwLCBsbVsyNTZdKTtcbiAgICByZXR1cm4gcCArIGxsWzI1Nl07XG59O1xuLy8gZGVmbGF0ZSBvcHRpb25zIChuaWNlIDw8IDEzKSB8IGNoYWluXG52YXIgZGVvID0gLyojX19QVVJFX18qLyBuZXcgdTMyKFs2NTU0MCwgMTMxMDgwLCAxMzEwODgsIDEzMTEwNCwgMjYyMTc2LCAxMDQ4NzA0LCAxMDQ4ODMyLCAyMTE0NTYwLCAyMTE3NjMyXSk7XG4vLyBlbXB0eVxudmFyIGV0ID0gLyojX19QVVJFX18qLyBuZXcgdTgoMCk7XG4vLyBjb21wcmVzc2VzIGRhdGEgaW50byBhIHJhdyBERUZMQVRFIGJ1ZmZlclxudmFyIGRmbHQgPSBmdW5jdGlvbiAoZGF0LCBsdmwsIHBsdmwsIHByZSwgcG9zdCwgbHN0KSB7XG4gICAgdmFyIHMgPSBkYXQubGVuZ3RoO1xuICAgIHZhciBvID0gbmV3IHU4KHByZSArIHMgKyA1ICogKDEgKyBNYXRoLmNlaWwocyAvIDcwMDApKSArIHBvc3QpO1xuICAgIC8vIHdyaXRpbmcgdG8gdGhpcyB3cml0ZXMgdG8gdGhlIG91dHB1dCBidWZmZXJcbiAgICB2YXIgdyA9IG8uc3ViYXJyYXkocHJlLCBvLmxlbmd0aCAtIHBvc3QpO1xuICAgIHZhciBwb3MgPSAwO1xuICAgIGlmICghbHZsIHx8IHMgPCA4KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHM7IGkgKz0gNjU1MzUpIHtcbiAgICAgICAgICAgIC8vIGVuZFxuICAgICAgICAgICAgdmFyIGUgPSBpICsgNjU1MzU7XG4gICAgICAgICAgICBpZiAoZSA+PSBzKSB7XG4gICAgICAgICAgICAgICAgLy8gd3JpdGUgZmluYWwgYmxvY2tcbiAgICAgICAgICAgICAgICB3W3BvcyA+PiAzXSA9IGxzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcyA9IHdmYmxrKHcsIHBvcyArIDEsIGRhdC5zdWJhcnJheShpLCBlKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBvcHQgPSBkZW9bbHZsIC0gMV07XG4gICAgICAgIHZhciBuID0gb3B0ID4+PiAxMywgYyA9IG9wdCAmIDgxOTE7XG4gICAgICAgIHZhciBtc2tfMSA9ICgxIDw8IHBsdmwpIC0gMTtcbiAgICAgICAgLy8gICAgcHJldiAyLWJ5dGUgdmFsIG1hcCAgICBjdXJyIDItYnl0ZSB2YWwgbWFwXG4gICAgICAgIHZhciBwcmV2ID0gbmV3IHUxNigzMjc2OCksIGhlYWQgPSBuZXcgdTE2KG1za18xICsgMSk7XG4gICAgICAgIHZhciBiczFfMSA9IE1hdGguY2VpbChwbHZsIC8gMyksIGJzMl8xID0gMiAqIGJzMV8xO1xuICAgICAgICB2YXIgaHNoID0gZnVuY3Rpb24gKGkpIHsgcmV0dXJuIChkYXRbaV0gXiAoZGF0W2kgKyAxXSA8PCBiczFfMSkgXiAoZGF0W2kgKyAyXSA8PCBiczJfMSkpICYgbXNrXzE7IH07XG4gICAgICAgIC8vIDI0NTc2IGlzIGFuIGFyYml0cmFyeSBudW1iZXIgb2YgbWF4aW11bSBzeW1ib2xzIHBlciBibG9ja1xuICAgICAgICAvLyA0MjQgYnVmZmVyIGZvciBsYXN0IGJsb2NrXG4gICAgICAgIHZhciBzeW1zID0gbmV3IHUzMigyNTAwMCk7XG4gICAgICAgIC8vIGxlbmd0aC9saXRlcmFsIGZyZXEgICBkaXN0YW5jZSBmcmVxXG4gICAgICAgIHZhciBsZiA9IG5ldyB1MTYoMjg4KSwgZGYgPSBuZXcgdTE2KDMyKTtcbiAgICAgICAgLy8gIGwvbGNudCAgZXhiaXRzICBpbmRleCAgbC9saW5kICB3YWl0ZHggIGJpdHBvc1xuICAgICAgICB2YXIgbGNfMSA9IDAsIGViID0gMCwgaSA9IDAsIGxpID0gMCwgd2kgPSAwLCBicyA9IDA7XG4gICAgICAgIGZvciAoOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICAvLyBoYXNoIHZhbHVlXG4gICAgICAgICAgICAvLyBkZW9wdCB3aGVuIGkgPiBzIC0gMyAtIGF0IGVuZCwgZGVvcHQgYWNjZXB0YWJsZVxuICAgICAgICAgICAgdmFyIGh2ID0gaHNoKGkpO1xuICAgICAgICAgICAgLy8gaW5kZXggbW9kIDMyNzY4ICAgIHByZXZpb3VzIGluZGV4IG1vZFxuICAgICAgICAgICAgdmFyIGltb2QgPSBpICYgMzI3NjcsIHBpbW9kID0gaGVhZFtodl07XG4gICAgICAgICAgICBwcmV2W2ltb2RdID0gcGltb2Q7XG4gICAgICAgICAgICBoZWFkW2h2XSA9IGltb2Q7XG4gICAgICAgICAgICAvLyBXZSBhbHdheXMgc2hvdWxkIG1vZGlmeSBoZWFkIGFuZCBwcmV2LCBidXQgb25seSBhZGQgc3ltYm9scyBpZlxuICAgICAgICAgICAgLy8gdGhpcyBkYXRhIGlzIG5vdCB5ZXQgcHJvY2Vzc2VkIChcIndhaXRcIiBmb3Igd2FpdCBpbmRleClcbiAgICAgICAgICAgIGlmICh3aSA8PSBpKSB7XG4gICAgICAgICAgICAgICAgLy8gYnl0ZXMgcmVtYWluaW5nXG4gICAgICAgICAgICAgICAgdmFyIHJlbSA9IHMgLSBpO1xuICAgICAgICAgICAgICAgIGlmICgobGNfMSA+IDcwMDAgfHwgbGkgPiAyNDU3NikgJiYgcmVtID4gNDIzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHdibGsoZGF0LCB3LCAwLCBzeW1zLCBsZiwgZGYsIGViLCBsaSwgYnMsIGkgLSBicywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbGkgPSBsY18xID0gZWIgPSAwLCBicyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjg2OyArK2opXG4gICAgICAgICAgICAgICAgICAgICAgICBsZltqXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzA7ICsrailcbiAgICAgICAgICAgICAgICAgICAgICAgIGRmW2pdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gIGxlbiAgICBkaXN0ICAgY2hhaW5cbiAgICAgICAgICAgICAgICB2YXIgbCA9IDIsIGQgPSAwLCBjaF8xID0gYywgZGlmID0gKGltb2QgLSBwaW1vZCkgJiAzMjc2NztcbiAgICAgICAgICAgICAgICBpZiAocmVtID4gMiAmJiBodiA9PSBoc2goaSAtIGRpZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heG4gPSBNYXRoLm1pbihuLCByZW0pIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heGQgPSBNYXRoLm1pbigzMjc2NywgaSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1heCBwb3NzaWJsZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90IGNhcHBlZCBhdCBkaWYgYmVjYXVzZSBkZWNvbXByZXNzb3JzIGltcGxlbWVudCBcInJvbGxpbmdcIiBpbmRleCBwb3B1bGF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHZhciBtbCA9IE1hdGgubWluKDI1OCwgcmVtKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGRpZiA8PSBtYXhkICYmIC0tY2hfMSAmJiBpbW9kICE9IHBpbW9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0W2kgKyBsXSA9PSBkYXRbaSArIGwgLSBkaWZdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5sID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDsgbmwgPCBtbCAmJiBkYXRbaSArIG5sXSA9PSBkYXRbaSArIG5sIC0gZGlmXTsgKytubClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChubCA+IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IG5sLCBkID0gZGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBicmVhayBvdXQgZWFybHkgd2hlbiB3ZSByZWFjaCBcIm5pY2VcIiAod2UgYXJlIHNhdGlzZmllZCBlbm91Z2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChubCA+IG1heG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm93LCBmaW5kIHRoZSByYXJlc3QgMi1ieXRlIHNlcXVlbmNlIHdpdGhpbiB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxlbmd0aCBvZiBsaXRlcmFscyBhbmQgc2VhcmNoIGZvciB0aGF0IGluc3RlYWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11Y2ggZmFzdGVyIHRoYW4ganVzdCB1c2luZyB0aGUgc3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1tZCA9IE1hdGgubWluKGRpZiwgbmwgLSAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtbWQ7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpID0gKGkgLSBkaWYgKyBqICsgMzI3NjgpICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHRpID0gcHJldlt0aV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2QgPSAodGkgLSBwdGkgKyAzMjc2OCkgJiAzMjc2NztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZCA+IG1kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kID0gY2QsIHBpbW9kID0gdGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgcHJldmlvdXMgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIGltb2QgPSBwaW1vZCwgcGltb2QgPSBwcmV2W2ltb2RdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmICs9IChpbW9kIC0gcGltb2QgKyAzMjc2OCkgJiAzMjc2NztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkIHdpbGwgYmUgbm9uemVybyBvbmx5IHdoZW4gYSBtYXRjaCB3YXMgZm91bmRcbiAgICAgICAgICAgICAgICBpZiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSBib3RoIGRpc3QgYW5kIGxlbiBkYXRhIGluIG9uZSBVaW50MzJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgaXMgcmVjb2duaXplZCBhcyBhIGxlbi9kaXN0IHdpdGggMjh0aCBiaXQgKDJeMjgpXG4gICAgICAgICAgICAgICAgICAgIHN5bXNbbGkrK10gPSAyNjg0MzU0NTYgfCAocmV2ZmxbbF0gPDwgMTgpIHwgcmV2ZmRbZF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW4gPSByZXZmbFtsXSAmIDMxLCBkaW4gPSByZXZmZFtkXSAmIDMxO1xuICAgICAgICAgICAgICAgICAgICBlYiArPSBmbGViW2xpbl0gKyBmZGViW2Rpbl07XG4gICAgICAgICAgICAgICAgICAgICsrbGZbMjU3ICsgbGluXTtcbiAgICAgICAgICAgICAgICAgICAgKytkZltkaW5dO1xuICAgICAgICAgICAgICAgICAgICB3aSA9IGkgKyBsO1xuICAgICAgICAgICAgICAgICAgICArK2xjXzE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzeW1zW2xpKytdID0gZGF0W2ldO1xuICAgICAgICAgICAgICAgICAgICArK2xmW2RhdFtpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBvcyA9IHdibGsoZGF0LCB3LCBsc3QsIHN5bXMsIGxmLCBkZiwgZWIsIGxpLCBicywgaSAtIGJzLCBwb3MpO1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSBlYXNpZXN0IHdheSB0byBhdm9pZCBuZWVkaW5nIHRvIG1haW50YWluIHN0YXRlXG4gICAgICAgIGlmICghbHN0ICYmIHBvcyAmIDcpXG4gICAgICAgICAgICBwb3MgPSB3ZmJsayh3LCBwb3MgKyAxLCBldCk7XG4gICAgfVxuICAgIHJldHVybiBzbGMobywgMCwgcHJlICsgc2hmdChwb3MpICsgcG9zdCk7XG59O1xuLy8gQ1JDMzIgdGFibGVcbnZhciBjcmN0ID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ID0gbmV3IEludDMyQXJyYXkoMjU2KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIHZhciBjID0gaSwgayA9IDk7XG4gICAgICAgIHdoaWxlICgtLWspXG4gICAgICAgICAgICBjID0gKChjICYgMSkgJiYgLTMwNjY3NDkxMikgXiAoYyA+Pj4gMSk7XG4gICAgICAgIHRbaV0gPSBjO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn0pKCk7XG4vLyBDUkMzMlxudmFyIGNyYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYyA9IC0xO1xuICAgIHJldHVybiB7XG4gICAgICAgIHA6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAvLyBjbG9zdXJlcyBoYXZlIGF3ZnVsIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICB2YXIgY3IgPSBjO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNyID0gY3JjdFsoY3IgJiAyNTUpIF4gZFtpXV0gXiAoY3IgPj4+IDgpO1xuICAgICAgICAgICAgYyA9IGNyO1xuICAgICAgICB9LFxuICAgICAgICBkOiBmdW5jdGlvbiAoKSB7IHJldHVybiB+YzsgfVxuICAgIH07XG59O1xuLy8gQWxkZXIzMlxudmFyIGFkbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhID0gMSwgYiA9IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcDogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIC8vIGNsb3N1cmVzIGhhdmUgYXdmdWwgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHZhciBuID0gYSwgbSA9IGI7XG4gICAgICAgICAgICB2YXIgbCA9IGQubGVuZ3RoIHwgMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpICE9IGw7KSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSBNYXRoLm1pbihpICsgMjY1NSwgbCk7XG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBlOyArK2kpXG4gICAgICAgICAgICAgICAgICAgIG0gKz0gbiArPSBkW2ldO1xuICAgICAgICAgICAgICAgIG4gPSAobiAmIDY1NTM1KSArIDE1ICogKG4gPj4gMTYpLCBtID0gKG0gJiA2NTUzNSkgKyAxNSAqIChtID4+IDE2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEgPSBuLCBiID0gbTtcbiAgICAgICAgfSxcbiAgICAgICAgZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYSAlPSA2NTUyMSwgYiAlPSA2NTUyMTtcbiAgICAgICAgICAgIHJldHVybiAoYSAmIDI1NSkgPDwgMjQgfCAoYSA+Pj4gOCkgPDwgMTYgfCAoYiAmIDI1NSkgPDwgOCB8IChiID4+PiA4KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuO1xuLy8gZGVmbGF0ZSB3aXRoIG9wdHNcbnZhciBkb3B0ID0gZnVuY3Rpb24gKGRhdCwgb3B0LCBwcmUsIHBvc3QsIHN0KSB7XG4gICAgcmV0dXJuIGRmbHQoZGF0LCBvcHQubGV2ZWwgPT0gbnVsbCA/IDYgOiBvcHQubGV2ZWwsIG9wdC5tZW0gPT0gbnVsbCA/IE1hdGguY2VpbChNYXRoLm1heCg4LCBNYXRoLm1pbigxMywgTWF0aC5sb2coZGF0Lmxlbmd0aCkpKSAqIDEuNSkgOiAoMTIgKyBvcHQubWVtKSwgcHJlLCBwb3N0LCAhc3QpO1xufTtcbi8vIFdhbG1hcnQgb2JqZWN0IHNwcmVhZFxudmFyIG1yZyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIG8gPSB7fTtcbiAgICBmb3IgKHZhciBrIGluIGEpXG4gICAgICAgIG9ba10gPSBhW2tdO1xuICAgIGZvciAodmFyIGsgaW4gYilcbiAgICAgICAgb1trXSA9IGJba107XG4gICAgcmV0dXJuIG87XG59O1xuLy8gd29ya2VyIGNsb25lXG4vLyBUaGlzIGlzIHBvc3NpYmx5IHRoZSBjcmF6aWVzdCBwYXJ0IG9mIHRoZSBlbnRpcmUgY29kZWJhc2UsIGRlc3BpdGUgaG93IHNpbXBsZSBpdCBtYXkgc2VlbS5cbi8vIFRoZSBvbmx5IHBhcmFtZXRlciB0byB0aGlzIGZ1bmN0aW9uIGlzIGEgY2xvc3VyZSB0aGF0IHJldHVybnMgYW4gYXJyYXkgb2YgdmFyaWFibGVzIG91dHNpZGUgb2YgdGhlIGZ1bmN0aW9uIHNjb3BlLlxuLy8gV2UncmUgZ29pbmcgdG8gdHJ5IHRvIGZpZ3VyZSBvdXQgdGhlIHZhcmlhYmxlIG5hbWVzIHVzZWQgaW4gdGhlIGNsb3N1cmUgYXMgc3RyaW5ncyBiZWNhdXNlIHRoYXQgaXMgY3J1Y2lhbCBmb3Igd29ya2VyaXphdGlvbi5cbi8vIFdlIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBtYXBwaW5nIG9mIHRydWUgdmFyaWFibGUgbmFtZSB0byB2YWx1ZSAoYmFzaWNhbGx5LCB0aGUgY3VycmVudCBzY29wZSBhcyBhIEpTIG9iamVjdCkuXG4vLyBUaGUgcmVhc29uIHdlIGNhbid0IGp1c3QgdXNlIHRoZSBvcmlnaW5hbCB2YXJpYWJsZSBuYW1lcyBpcyBtaW5pZmllcnMgbWFuZ2xpbmcgdGhlIHRvcGxldmVsIHNjb3BlLlxuLy8gVGhpcyB0b29rIG1lIHRocmVlIHdlZWtzIHRvIGZpZ3VyZSBvdXQgaG93IHRvIGRvLlxudmFyIHdjbG4gPSBmdW5jdGlvbiAoZm4sIGZuU3RyLCB0ZCkge1xuICAgIHZhciBkdCA9IGZuKCk7XG4gICAgdmFyIHN0ID0gZm4udG9TdHJpbmcoKTtcbiAgICB2YXIga3MgPSBzdC5zbGljZShzdC5pbmRleE9mKCdbJykgKyAxLCBzdC5sYXN0SW5kZXhPZignXScpKS5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZHQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHYgPSBkdFtpXSwgayA9IGtzW2ldO1xuICAgICAgICBpZiAodHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZm5TdHIgKz0gJzsnICsgayArICc9JztcbiAgICAgICAgICAgIHZhciBzdF8xID0gdi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHYucHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIGdsb2JhbCBvYmplY3RzXG4gICAgICAgICAgICAgICAgaWYgKHN0XzEuaW5kZXhPZignW25hdGl2ZSBjb2RlXScpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcEluZCA9IHN0XzEuaW5kZXhPZignICcsIDgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgZm5TdHIgKz0gc3RfMS5zbGljZShzcEluZCwgc3RfMS5pbmRleE9mKCcoJywgc3BJbmQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZuU3RyICs9IHN0XzE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHQgaW4gdi5wcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBmblN0ciArPSAnOycgKyBrICsgJy5wcm90b3R5cGUuJyArIHQgKyAnPScgKyB2LnByb3RvdHlwZVt0XS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmblN0ciArPSBzdF8xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRkW2tdID0gdjtcbiAgICB9XG4gICAgcmV0dXJuIFtmblN0ciwgdGRdO1xufTtcbnZhciBjaCA9IFtdO1xuLy8gY2xvbmUgYnVmc1xudmFyIGNiZnMgPSBmdW5jdGlvbiAodikge1xuICAgIHZhciB0bCA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gdikge1xuICAgICAgICBpZiAodltrXS5idWZmZXIpIHtcbiAgICAgICAgICAgIHRsLnB1c2goKHZba10gPSBuZXcgdltrXS5jb25zdHJ1Y3Rvcih2W2tdKSkuYnVmZmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGw7XG59O1xuLy8gdXNlIGEgd29ya2VyIHRvIGV4ZWN1dGUgY29kZVxudmFyIHdya3IgPSBmdW5jdGlvbiAoZm5zLCBpbml0LCBpZCwgY2IpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCFjaFtpZF0pIHtcbiAgICAgICAgdmFyIGZuU3RyID0gJycsIHRkXzEgPSB7fSwgbSA9IGZucy5sZW5ndGggLSAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG07ICsraSlcbiAgICAgICAgICAgIF9hID0gd2NsbihmbnNbaV0sIGZuU3RyLCB0ZF8xKSwgZm5TdHIgPSBfYVswXSwgdGRfMSA9IF9hWzFdO1xuICAgICAgICBjaFtpZF0gPSB3Y2xuKGZuc1ttXSwgZm5TdHIsIHRkXzEpO1xuICAgIH1cbiAgICB2YXIgdGQgPSBtcmcoe30sIGNoW2lkXVsxXSk7XG4gICAgcmV0dXJuIHdrKGNoW2lkXVswXSArICc7b25tZXNzYWdlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgayBpbiBlLmRhdGEpc2VsZltrXT1lLmRhdGFba107b25tZXNzYWdlPScgKyBpbml0LnRvU3RyaW5nKCkgKyAnfScsIGlkLCB0ZCwgY2Jmcyh0ZCksIGNiKTtcbn07XG4vLyBiYXNlIGFzeW5jIGluZmxhdGUgZm5cbnZhciBiSW5mbHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbdTgsIHUxNiwgdTMyLCBmbGViLCBmZGViLCBjbGltLCBmbCwgZmQsIGZscm0sIGZkcm0sIHJldiwgZWMsIGhNYXAsIG1heCwgYml0cywgYml0czE2LCBzaGZ0LCBzbGMsIGVyciwgaW5mbHQsIGluZmxhdGVTeW5jLCBwYmYsIGd1OF07IH07XG52YXIgYkRmbHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbdTgsIHUxNiwgdTMyLCBmbGViLCBmZGViLCBjbGltLCByZXZmbCwgcmV2ZmQsIGZsbSwgZmx0LCBmZG0sIGZkdCwgcmV2LCBkZW8sIGV0LCBoTWFwLCB3Yml0cywgd2JpdHMxNiwgaFRyZWUsIGxuLCBsYywgY2xlbiwgd2ZibGssIHdibGssIHNoZnQsIHNsYywgZGZsdCwgZG9wdCwgZGVmbGF0ZVN5bmMsIHBiZl07IH07XG4vLyBnemlwIGV4dHJhXG52YXIgZ3plID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6aCwgZ3pobCwgd2J5dGVzLCBjcmMsIGNyY3RdOyB9O1xuLy8gZ3VuemlwIGV4dHJhXG52YXIgZ3V6ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtnenMsIGd6bF07IH07XG4vLyB6bGliIGV4dHJhXG52YXIgemxlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW3psaCwgd2J5dGVzLCBhZGxlcl07IH07XG4vLyB1bnpsaWIgZXh0cmFcbnZhciB6dWxlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW3psdl07IH07XG4vLyBwb3N0IGJ1ZlxudmFyIHBiZiA9IGZ1bmN0aW9uIChtc2cpIHsgcmV0dXJuIHBvc3RNZXNzYWdlKG1zZywgW21zZy5idWZmZXJdKTsgfTtcbi8vIGdldCB1OFxudmFyIGd1OCA9IGZ1bmN0aW9uIChvKSB7IHJldHVybiBvICYmIG8uc2l6ZSAmJiBuZXcgdTgoby5zaXplKTsgfTtcbi8vIGFzeW5jIGhlbHBlclxudmFyIGNiaWZ5ID0gZnVuY3Rpb24gKGRhdCwgb3B0cywgZm5zLCBpbml0LCBpZCwgY2IpIHtcbiAgICB2YXIgdyA9IHdya3IoZm5zLCBpbml0LCBpZCwgZnVuY3Rpb24gKGVyciwgZGF0KSB7XG4gICAgICAgIHcudGVybWluYXRlKCk7XG4gICAgICAgIGNiKGVyciwgZGF0KTtcbiAgICB9KTtcbiAgICB3LnBvc3RNZXNzYWdlKFtkYXQsIG9wdHNdLCBvcHRzLmNvbnN1bWUgPyBbZGF0LmJ1ZmZlcl0gOiBbXSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdy50ZXJtaW5hdGUoKTsgfTtcbn07XG4vLyBhdXRvIHN0cmVhbVxudmFyIGFzdHJtID0gZnVuY3Rpb24gKHN0cm0pIHtcbiAgICBzdHJtLm9uZGF0YSA9IGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7IHJldHVybiBwb3N0TWVzc2FnZShbZGF0LCBmaW5hbF0sIFtkYXQuYnVmZmVyXSk7IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldikgeyByZXR1cm4gc3RybS5wdXNoKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pOyB9O1xufTtcbi8vIGFzeW5jIHN0cmVhbSBhdHRhY2hcbnZhciBhc3RybWlmeSA9IGZ1bmN0aW9uIChmbnMsIHN0cm0sIG9wdHMsIGluaXQsIGlkKSB7XG4gICAgdmFyIHQ7XG4gICAgdmFyIHcgPSB3cmtyKGZucywgaW5pdCwgaWQsIGZ1bmN0aW9uIChlcnIsIGRhdCkge1xuICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgdy50ZXJtaW5hdGUoKSwgc3RybS5vbmRhdGEuY2FsbChzdHJtLCBlcnIpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkYXRbMV0pXG4gICAgICAgICAgICAgICAgdy50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgIHN0cm0ub25kYXRhLmNhbGwoc3RybSwgZXJyLCBkYXRbMF0sIGRhdFsxXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB3LnBvc3RNZXNzYWdlKG9wdHMpO1xuICAgIHN0cm0ucHVzaCA9IGZ1bmN0aW9uIChkLCBmKSB7XG4gICAgICAgIGlmICghc3RybS5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0KVxuICAgICAgICAgICAgc3RybS5vbmRhdGEoZXJyKDQsIDAsIDEpLCBudWxsLCAhIWYpO1xuICAgICAgICB3LnBvc3RNZXNzYWdlKFtkLCB0ID0gZl0sIFtkLmJ1ZmZlcl0pO1xuICAgIH07XG4gICAgc3RybS50ZXJtaW5hdGUgPSBmdW5jdGlvbiAoKSB7IHcudGVybWluYXRlKCk7IH07XG59O1xuLy8gcmVhZCAyIGJ5dGVzXG52YXIgYjIgPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gZFtiXSB8IChkW2IgKyAxXSA8PCA4KTsgfTtcbi8vIHJlYWQgNCBieXRlc1xudmFyIGI0ID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIChkW2JdIHwgKGRbYiArIDFdIDw8IDgpIHwgKGRbYiArIDJdIDw8IDE2KSB8IChkW2IgKyAzXSA8PCAyNCkpID4+PiAwOyB9O1xudmFyIGI4ID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGI0KGQsIGIpICsgKGI0KGQsIGIgKyA0KSAqIDQyOTQ5NjcyOTYpOyB9O1xuLy8gd3JpdGUgYnl0ZXNcbnZhciB3Ynl0ZXMgPSBmdW5jdGlvbiAoZCwgYiwgdikge1xuICAgIGZvciAoOyB2OyArK2IpXG4gICAgICAgIGRbYl0gPSB2LCB2ID4+Pj0gODtcbn07XG4vLyBnemlwIGhlYWRlclxudmFyIGd6aCA9IGZ1bmN0aW9uIChjLCBvKSB7XG4gICAgdmFyIGZuID0gby5maWxlbmFtZTtcbiAgICBjWzBdID0gMzEsIGNbMV0gPSAxMzksIGNbMl0gPSA4LCBjWzhdID0gby5sZXZlbCA8IDIgPyA0IDogby5sZXZlbCA9PSA5ID8gMiA6IDAsIGNbOV0gPSAzOyAvLyBhc3N1bWUgVW5peFxuICAgIGlmIChvLm10aW1lICE9IDApXG4gICAgICAgIHdieXRlcyhjLCA0LCBNYXRoLmZsb29yKG5ldyBEYXRlKG8ubXRpbWUgfHwgRGF0ZS5ub3coKSkgLyAxMDAwKSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICAgIGNbM10gPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBmbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNbaSArIDEwXSA9IGZuLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxufTtcbi8vIGd6aXAgZm9vdGVyOiAtOCB0byAtNCA9IENSQywgLTQgdG8gLTAgaXMgbGVuZ3RoXG4vLyBnemlwIHN0YXJ0XG52YXIgZ3pzID0gZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoZFswXSAhPSAzMSB8fCBkWzFdICE9IDEzOSB8fCBkWzJdICE9IDgpXG4gICAgICAgIGVycig2LCAnaW52YWxpZCBnemlwIGRhdGEnKTtcbiAgICB2YXIgZmxnID0gZFszXTtcbiAgICB2YXIgc3QgPSAxMDtcbiAgICBpZiAoZmxnICYgNClcbiAgICAgICAgc3QgKz0gZFsxMF0gfCAoZFsxMV0gPDwgOCkgKyAyO1xuICAgIGZvciAodmFyIHpzID0gKGZsZyA+PiAzICYgMSkgKyAoZmxnID4+IDQgJiAxKTsgenMgPiAwOyB6cyAtPSAhZFtzdCsrXSlcbiAgICAgICAgO1xuICAgIHJldHVybiBzdCArIChmbGcgJiAyKTtcbn07XG4vLyBnemlwIGxlbmd0aFxudmFyIGd6bCA9IGZ1bmN0aW9uIChkKSB7XG4gICAgdmFyIGwgPSBkLmxlbmd0aDtcbiAgICByZXR1cm4gKChkW2wgLSA0XSB8IGRbbCAtIDNdIDw8IDggfCBkW2wgLSAyXSA8PCAxNikgfCAoZFtsIC0gMV0gPDwgMjQpKSA+Pj4gMDtcbn07XG4vLyBnemlwIGhlYWRlciBsZW5ndGhcbnZhciBnemhsID0gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIDEwICsgKChvLmZpbGVuYW1lICYmIChvLmZpbGVuYW1lLmxlbmd0aCArIDEpKSB8fCAwKTsgfTtcbi8vIHpsaWIgaGVhZGVyXG52YXIgemxoID0gZnVuY3Rpb24gKGMsIG8pIHtcbiAgICB2YXIgbHYgPSBvLmxldmVsLCBmbCA9IGx2ID09IDAgPyAwIDogbHYgPCA2ID8gMSA6IGx2ID09IDkgPyAzIDogMjtcbiAgICBjWzBdID0gMTIwLCBjWzFdID0gKGZsIDw8IDYpIHwgKGZsID8gKDMyIC0gMiAqIGZsKSA6IDEpO1xufTtcbi8vIHpsaWIgdmFsaWRcbnZhciB6bHYgPSBmdW5jdGlvbiAoZCkge1xuICAgIGlmICgoZFswXSAmIDE1KSAhPSA4IHx8IChkWzBdID4+PiA0KSA+IDcgfHwgKChkWzBdIDw8IDggfCBkWzFdKSAlIDMxKSlcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIHpsaWIgZGF0YScpO1xuICAgIGlmIChkWzFdICYgMzIpXG4gICAgICAgIGVycig2LCAnaW52YWxpZCB6bGliIGRhdGE6IHByZXNldCBkaWN0aW9uYXJpZXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbmZ1bmN0aW9uIEFzeW5jQ21wU3RybShvcHRzLCBjYikge1xuICAgIGlmICghY2IgJiYgdHlwZW9mIG9wdHMgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICByZXR1cm4gb3B0cztcbn1cbi8vIHpsaWIgZm9vdGVyOiAtNCB0byAtMCBpcyBBZGxlcjMyXG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uXG4gKi9cbnZhciBEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgaWYgKCFjYiAmJiB0eXBlb2Ygb3B0cyA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIHRoaXMubyA9IG9wdHMgfHwge307XG4gICAgfVxuICAgIERlZmxhdGUucHJvdG90eXBlLnAgPSBmdW5jdGlvbiAoYywgZikge1xuICAgICAgICB0aGlzLm9uZGF0YShkb3B0KGMsIHRoaXMubywgMCwgMCwgIWYpLCBmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIERlZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIHRoaXMuZCA9IGZpbmFsO1xuICAgICAgICB0aGlzLnAoY2h1bmssIGZpbmFsIHx8IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IERlZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0RlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNEZWZsYXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJEZmx0LFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBEZWZsYXRlXTsgfVxuICAgICAgICBdLCB0aGlzLCBBc3luY0NtcFN0cm0uY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgRGVmbGF0ZShldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA2KTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0RlZmxhdGUgfTtcbmV4cG9ydCBmdW5jdGlvbiBkZWZsYXRlKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkRmbHQsXG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoZGVmbGF0ZVN5bmMoZXYuZGF0YVswXSwgZXYuZGF0YVsxXSkpOyB9LCAwLCBjYik7XG59XG4vKipcbiAqIENvbXByZXNzZXMgZGF0YSB3aXRoIERFRkxBVEUgd2l0aG91dCBhbnkgd3JhcHBlclxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gY29tcHJlc3NcbiAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVmbGF0ZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmbGF0ZVN5bmMoZGF0YSwgb3B0cykge1xuICAgIHJldHVybiBkb3B0KGRhdGEsIG9wdHMgfHwge30sIDAsIDApO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBJbmZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5mbGF0aW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGluZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gSW5mbGF0ZShjYikge1xuICAgICAgICB0aGlzLnMgPSB7fTtcbiAgICAgICAgdGhpcy5wID0gbmV3IHU4KDApO1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIH1cbiAgICBJbmZsYXRlLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLnAubGVuZ3RoO1xuICAgICAgICB2YXIgbiA9IG5ldyB1OChsICsgYy5sZW5ndGgpO1xuICAgICAgICBuLnNldCh0aGlzLnApLCBuLnNldChjLCBsKSwgdGhpcy5wID0gbjtcbiAgICB9O1xuICAgIEluZmxhdGUucHJvdG90eXBlLmMgPSBmdW5jdGlvbiAoZmluYWwpIHtcbiAgICAgICAgdGhpcy5kID0gdGhpcy5zLmkgPSBmaW5hbCB8fCBmYWxzZTtcbiAgICAgICAgdmFyIGJ0cyA9IHRoaXMucy5iO1xuICAgICAgICB2YXIgZHQgPSBpbmZsdCh0aGlzLnAsIHRoaXMubywgdGhpcy5zKTtcbiAgICAgICAgdGhpcy5vbmRhdGEoc2xjKGR0LCBidHMsIHRoaXMucy5iKSwgdGhpcy5kKTtcbiAgICAgICAgdGhpcy5vID0gc2xjKGR0LCB0aGlzLnMuYiAtIDMyNzY4KSwgdGhpcy5zLmIgPSB0aGlzLm8ubGVuZ3RoO1xuICAgICAgICB0aGlzLnAgPSBzbGModGhpcy5wLCAodGhpcy5zLnAgLyA4KSB8IDApLCB0aGlzLnMucCAmPSA3O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgaW5mbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBmaW5hbCBjaHVua1xuICAgICAqL1xuICAgIEluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRoaXMuZShjaHVuayksIHRoaXMuYyhmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBJbmZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0luZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgaW5mbGF0aW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNJbmZsYXRlKGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJJbmZsdCxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgSW5mbGF0ZV07IH1cbiAgICAgICAgXSwgdGhpcywgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgSW5mbGF0ZSgpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDcpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jSW5mbGF0ZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGluZmxhdGUoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiSW5mbHRcbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihpbmZsYXRlU3luYyhldi5kYXRhWzBdLCBndTgoZXYuZGF0YVsxXSkpKTsgfSwgMSwgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIERFRkxBVEUgZGF0YSB3aXRoIG5vIHdyYXBwZXJcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGRlY29tcHJlc3NcbiAqIEBwYXJhbSBvdXQgV2hlcmUgdG8gd3JpdGUgdGhlIGRhdGEuIFNhdmVzIG1lbW9yeSBpZiB5b3Uga25vdyB0aGUgZGVjb21wcmVzc2VkIHNpemUgYW5kIHByb3ZpZGUgYW4gb3V0cHV0IGJ1ZmZlciBvZiB0aGF0IGxlbmd0aC5cbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5mbGF0ZVN5bmMoZGF0YSwgb3V0KSB7XG4gICAgcmV0dXJuIGluZmx0KGRhdGEsIG91dCk7XG59XG4vLyBiZWZvcmUgeW91IHllbGwgYXQgbWUgZm9yIG5vdCBqdXN0IHVzaW5nIGV4dGVuZHMsIG15IHJlYXNvbiBpcyB0aGF0IFRTIGluaGVyaXRhbmNlIGlzIGhhcmQgdG8gd29ya2VyaXplLlxuLyoqXG4gKiBTdHJlYW1pbmcgR1pJUCBjb21wcmVzc2lvblxuICovXG52YXIgR3ppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHemlwKG9wdHMsIGNiKSB7XG4gICAgICAgIHRoaXMuYyA9IGNyYygpO1xuICAgICAgICB0aGlzLmwgPSAwO1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBEZWZsYXRlLmNhbGwodGhpcywgb3B0cywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBHWklQcGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEd6aXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIERlZmxhdGUucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgR3ppcC5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHRoaXMuYy5wKGMpO1xuICAgICAgICB0aGlzLmwgKz0gYy5sZW5ndGg7XG4gICAgICAgIHZhciByYXcgPSBkb3B0KGMsIHRoaXMubywgdGhpcy52ICYmIGd6aGwodGhpcy5vKSwgZiAmJiA4LCAhZik7XG4gICAgICAgIGlmICh0aGlzLnYpXG4gICAgICAgICAgICBnemgocmF3LCB0aGlzLm8pLCB0aGlzLnYgPSAwO1xuICAgICAgICBpZiAoZilcbiAgICAgICAgICAgIHdieXRlcyhyYXcsIHJhdy5sZW5ndGggLSA4LCB0aGlzLmMuZCgpKSwgd2J5dGVzKHJhdywgcmF3Lmxlbmd0aCAtIDQsIHRoaXMubCk7XG4gICAgICAgIHRoaXMub25kYXRhKHJhdywgZik7XG4gICAgfTtcbiAgICByZXR1cm4gR3ppcDtcbn0oKSk7XG5leHBvcnQgeyBHemlwIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCBjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNHemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jR3ppcChvcHRzLCBjYikge1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiRGZsdCxcbiAgICAgICAgICAgIGd6ZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgRGVmbGF0ZSwgR3ppcF07IH1cbiAgICAgICAgXSwgdGhpcywgQXN5bmNDbXBTdHJtLmNhbGwodGhpcywgb3B0cywgY2IpLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IEd6aXAoZXYuZGF0YSk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgOCk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0d6aXA7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNHemlwIH07XG5leHBvcnQgZnVuY3Rpb24gZ3ppcChkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJEZmx0LFxuICAgICAgICBnemUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtnemlwU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihnemlwU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDIsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3NlcyBkYXRhIHdpdGggR1pJUFxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gY29tcHJlc3NcbiAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZ3ppcHBlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnemlwU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKVxuICAgICAgICBvcHRzID0ge307XG4gICAgdmFyIGMgPSBjcmMoKSwgbCA9IGRhdGEubGVuZ3RoO1xuICAgIGMucChkYXRhKTtcbiAgICB2YXIgZCA9IGRvcHQoZGF0YSwgb3B0cywgZ3pobChvcHRzKSwgOCksIHMgPSBkLmxlbmd0aDtcbiAgICByZXR1cm4gZ3poKGQsIG9wdHMpLCB3Ynl0ZXMoZCwgcyAtIDgsIGMuZCgpKSwgd2J5dGVzKGQsIHMgLSA0LCBsKSwgZDtcbn1cbi8qKlxuICogU3RyZWFtaW5nIEdaSVAgZGVjb21wcmVzc2lvblxuICovXG52YXIgR3VuemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHVU5aSVAgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgaW5mbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBHdW56aXAoY2IpIHtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgSW5mbGF0ZS5jYWxsKHRoaXMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgR1VOWklQcGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEd1bnppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuZS5jYWxsKHRoaXMsIGNodW5rKTtcbiAgICAgICAgaWYgKHRoaXMudikge1xuICAgICAgICAgICAgdmFyIHMgPSB0aGlzLnAubGVuZ3RoID4gMyA/IGd6cyh0aGlzLnApIDogNDtcbiAgICAgICAgICAgIGlmIChzID49IHRoaXMucC5sZW5ndGggJiYgIWZpbmFsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheShzKSwgdGhpcy52ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnAubGVuZ3RoIDwgOClcbiAgICAgICAgICAgICAgICBlcnIoNiwgJ2ludmFsaWQgZ3ppcCBkYXRhJyk7XG4gICAgICAgICAgICB0aGlzLnAgPSB0aGlzLnAuc3ViYXJyYXkoMCwgLTgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5lY2Vzc2FyeSB0byBwcmV2ZW50IFRTIGZyb20gdXNpbmcgdGhlIGNsb3N1cmUgdmFsdWVcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIHdvcmtlcml6YXRpb24gdG8gZnVuY3Rpb24gY29ycmVjdGx5XG4gICAgICAgIEluZmxhdGUucHJvdG90eXBlLmMuY2FsbCh0aGlzLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gR3VuemlwO1xufSgpKTtcbmV4cG9ydCB7IEd1bnppcCB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIEdaSVAgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNHdW56aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgR1VOWklQIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlZmxhdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNHdW56aXAoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkluZmx0LFxuICAgICAgICAgICAgZ3V6ZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgSW5mbGF0ZSwgR3VuemlwXTsgfVxuICAgICAgICBdLCB0aGlzLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBHdW56aXAoKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA5KTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jR3VuemlwO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jR3VuemlwIH07XG5leHBvcnQgZnVuY3Rpb24gZ3VuemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkluZmx0LFxuICAgICAgICBndXplLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3VuemlwU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihndW56aXBTeW5jKGV2LmRhdGFbMF0pKTsgfSwgMywgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIEdaSVAgZGF0YVxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG91dCBXaGVyZSB0byB3cml0ZSB0aGUgZGF0YS4gR1pJUCBhbHJlYWR5IGVuY29kZXMgdGhlIG91dHB1dCBzaXplLCBzbyBwcm92aWRpbmcgdGhpcyBkb2Vzbid0IHNhdmUgbWVtb3J5LlxuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBndW56aXBTeW5jKGRhdGEsIG91dCkge1xuICAgIHJldHVybiBpbmZsdChkYXRhLnN1YmFycmF5KGd6cyhkYXRhKSwgLTgpLCBvdXQgfHwgbmV3IHU4KGd6bChkYXRhKSkpO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgWmxpYiBjb21wcmVzc2lvblxuICovXG52YXIgWmxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBabGliKG9wdHMsIGNiKSB7XG4gICAgICAgIHRoaXMuYyA9IGFkbGVyKCk7XG4gICAgICAgIHRoaXMudiA9IDE7XG4gICAgICAgIERlZmxhdGUuY2FsbCh0aGlzLCBvcHRzLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIHpsaWJiZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmxpYi5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICBabGliLnByb3RvdHlwZS5wID0gZnVuY3Rpb24gKGMsIGYpIHtcbiAgICAgICAgdGhpcy5jLnAoYyk7XG4gICAgICAgIHZhciByYXcgPSBkb3B0KGMsIHRoaXMubywgdGhpcy52ICYmIDIsIGYgJiYgNCwgIWYpO1xuICAgICAgICBpZiAodGhpcy52KVxuICAgICAgICAgICAgemxoKHJhdywgdGhpcy5vKSwgdGhpcy52ID0gMDtcbiAgICAgICAgaWYgKGYpXG4gICAgICAgICAgICB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gNCwgdGhpcy5jLmQoKSk7XG4gICAgICAgIHRoaXMub25kYXRhKHJhdywgZik7XG4gICAgfTtcbiAgICByZXR1cm4gWmxpYjtcbn0oKSk7XG5leHBvcnQgeyBabGliIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgWmxpYiBjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNabGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jWmxpYihvcHRzLCBjYikge1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiRGZsdCxcbiAgICAgICAgICAgIHpsZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgRGVmbGF0ZSwgWmxpYl07IH1cbiAgICAgICAgXSwgdGhpcywgQXN5bmNDbXBTdHJtLmNhbGwodGhpcywgb3B0cywgY2IpLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IFpsaWIoZXYuZGF0YSk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNabGliO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jWmxpYiB9O1xuZXhwb3J0IGZ1bmN0aW9uIHpsaWIoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICAgICAgemxlLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbemxpYlN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoemxpYlN5bmMoZXYuZGF0YVswXSwgZXYuZGF0YVsxXSkpOyB9LCA0LCBjYik7XG59XG4vKipcbiAqIENvbXByZXNzIGRhdGEgd2l0aCBabGliXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSB6bGliLWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gemxpYlN5bmMoZGF0YSwgb3B0cykge1xuICAgIGlmICghb3B0cylcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgIHZhciBhID0gYWRsZXIoKTtcbiAgICBhLnAoZGF0YSk7XG4gICAgdmFyIGQgPSBkb3B0KGRhdGEsIG9wdHMsIDIsIDQpO1xuICAgIHJldHVybiB6bGgoZCwgb3B0cyksIHdieXRlcyhkLCBkLmxlbmd0aCAtIDQsIGEuZCgpKSwgZDtcbn1cbi8qKlxuICogU3RyZWFtaW5nIFpsaWIgZGVjb21wcmVzc2lvblxuICovXG52YXIgVW56bGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBabGliIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgaW5mbGF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVbnpsaWIoY2IpIHtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgSW5mbGF0ZS5jYWxsKHRoaXMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgdW56bGliYmVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFVuemxpYi5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuZS5jYWxsKHRoaXMsIGNodW5rKTtcbiAgICAgICAgaWYgKHRoaXMudikge1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPCAyICYmICFmaW5hbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnAgPSB0aGlzLnAuc3ViYXJyYXkoMiksIHRoaXMudiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA8IDQpXG4gICAgICAgICAgICAgICAgZXJyKDYsICdpbnZhbGlkIHpsaWIgZGF0YScpO1xuICAgICAgICAgICAgdGhpcy5wID0gdGhpcy5wLnN1YmFycmF5KDAsIC00KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBuZWNlc3NhcnkgdG8gcHJldmVudCBUUyBmcm9tIHVzaW5nIHRoZSBjbG9zdXJlIHZhbHVlXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIGZvciB3b3JrZXJpemF0aW9uIHRvIGZ1bmN0aW9uIGNvcnJlY3RseVxuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5jLmNhbGwodGhpcywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIFVuemxpYjtcbn0oKSk7XG5leHBvcnQgeyBVbnpsaWIgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBabGliIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jVW56bGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIFpsaWIgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWZsYXRlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jVW56bGliKGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJJbmZsdCxcbiAgICAgICAgICAgIHp1bGUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIEluZmxhdGUsIFVuemxpYl07IH1cbiAgICAgICAgXSwgdGhpcywgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgVW56bGliKCk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgMTEpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNVbnpsaWI7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNVbnpsaWIgfTtcbmV4cG9ydCBmdW5jdGlvbiB1bnpsaWIoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiSW5mbHQsXG4gICAgICAgIHp1bGUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1bnpsaWJTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKHVuemxpYlN5bmMoZXYuZGF0YVswXSwgZ3U4KGV2LmRhdGFbMV0pKSk7IH0sIDUsIGNiKTtcbn1cbi8qKlxuICogRXhwYW5kcyBabGliIGRhdGFcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGRlY29tcHJlc3NcbiAqIEBwYXJhbSBvdXQgV2hlcmUgdG8gd3JpdGUgdGhlIGRhdGEuIFNhdmVzIG1lbW9yeSBpZiB5b3Uga25vdyB0aGUgZGVjb21wcmVzc2VkIHNpemUgYW5kIHByb3ZpZGUgYW4gb3V0cHV0IGJ1ZmZlciBvZiB0aGF0IGxlbmd0aC5cbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW56bGliU3luYyhkYXRhLCBvdXQpIHtcbiAgICByZXR1cm4gaW5mbHQoKHpsdihkYXRhKSwgZGF0YS5zdWJhcnJheSgyLCAtNCkpLCBvdXQpO1xufVxuLy8gRGVmYXVsdCBhbGdvcml0aG0gZm9yIGNvbXByZXNzaW9uICh1c2VkIGJlY2F1c2UgaGF2aW5nIGEga25vd24gb3V0cHV0IHNpemUgYWxsb3dzIGZhc3RlciBkZWNvbXByZXNzaW9uKVxuZXhwb3J0IHsgZ3ppcCBhcyBjb21wcmVzcywgQXN5bmNHemlwIGFzIEFzeW5jQ29tcHJlc3MgfTtcbi8vIERlZmF1bHQgYWxnb3JpdGhtIGZvciBjb21wcmVzc2lvbiAodXNlZCBiZWNhdXNlIGhhdmluZyBhIGtub3duIG91dHB1dCBzaXplIGFsbG93cyBmYXN0ZXIgZGVjb21wcmVzc2lvbilcbmV4cG9ydCB7IGd6aXBTeW5jIGFzIGNvbXByZXNzU3luYywgR3ppcCBhcyBDb21wcmVzcyB9O1xuLyoqXG4gKiBTdHJlYW1pbmcgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGVjb21wcmVzc2lvblxuICovXG52YXIgRGVjb21wcmVzcyA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWNvbXByZXNzZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWNvbXByZXNzKGNiKSB7XG4gICAgICAgIHRoaXMuRyA9IEd1bnppcDtcbiAgICAgICAgdGhpcy5JID0gSW5mbGF0ZTtcbiAgICAgICAgdGhpcy5aID0gVW56bGliO1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWNvbXByZXNzZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVjb21wcmVzcy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKCF0aGlzLnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnAgJiYgdGhpcy5wLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjaHVuay5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIG4uc2V0KHRoaXMucCksIG4uc2V0KGNodW5rLCB0aGlzLnAubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnAgPSBjaHVuaztcbiAgICAgICAgICAgIGlmICh0aGlzLnAubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgY2IgPSBmdW5jdGlvbiAoKSB7IF90aGlzXzEub25kYXRhLmFwcGx5KF90aGlzXzEsIGFyZ3VtZW50cyk7IH07XG4gICAgICAgICAgICAgICAgdGhpcy5zID0gKHRoaXMucFswXSA9PSAzMSAmJiB0aGlzLnBbMV0gPT0gMTM5ICYmIHRoaXMucFsyXSA9PSA4KVxuICAgICAgICAgICAgICAgICAgICA/IG5ldyB0aGlzLkcoY2IpXG4gICAgICAgICAgICAgICAgICAgIDogKCh0aGlzLnBbMF0gJiAxNSkgIT0gOCB8fCAodGhpcy5wWzBdID4+IDQpID4gNyB8fCAoKHRoaXMucFswXSA8PCA4IHwgdGhpcy5wWzFdKSAlIDMxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IHRoaXMuSShjYilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IHRoaXMuWihjYik7XG4gICAgICAgICAgICAgICAgdGhpcy5zLnB1c2godGhpcy5wLCBmaW5hbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnMucHVzaChjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIERlY29tcHJlc3M7XG59KCkpO1xuZXhwb3J0IHsgRGVjb21wcmVzcyB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIEdaSVAsIFpsaWIsIG9yIHJhdyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jRGVjb21wcmVzcyA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVjb21wcmVzc2VkXG4gICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jRGVjb21wcmVzcyhjYikge1xuICAgICAgICB0aGlzLkcgPSBBc3luY0d1bnppcDtcbiAgICAgICAgdGhpcy5JID0gQXN5bmNJbmZsYXRlO1xuICAgICAgICB0aGlzLlogPSBBc3luY1VuemxpYjtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVjb21wcmVzc2VkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEFzeW5jRGVjb21wcmVzcy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgRGVjb21wcmVzcy5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNEZWNvbXByZXNzO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jRGVjb21wcmVzcyB9O1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcHJlc3MoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gKGRhdGFbMF0gPT0gMzEgJiYgZGF0YVsxXSA9PSAxMzkgJiYgZGF0YVsyXSA9PSA4KVxuICAgICAgICA/IGd1bnppcChkYXRhLCBvcHRzLCBjYilcbiAgICAgICAgOiAoKGRhdGFbMF0gJiAxNSkgIT0gOCB8fCAoZGF0YVswXSA+PiA0KSA+IDcgfHwgKChkYXRhWzBdIDw8IDggfCBkYXRhWzFdKSAlIDMxKSlcbiAgICAgICAgICAgID8gaW5mbGF0ZShkYXRhLCBvcHRzLCBjYilcbiAgICAgICAgICAgIDogdW56bGliKGRhdGEsIG9wdHMsIGNiKTtcbn1cbi8qKlxuICogRXhwYW5kcyBjb21wcmVzc2VkIEdaSVAsIFpsaWIsIG9yIHJhdyBERUZMQVRFIGRhdGEsIGF1dG9tYXRpY2FsbHkgZGV0ZWN0aW5nIHRoZSBmb3JtYXRcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGRlY29tcHJlc3NcbiAqIEBwYXJhbSBvdXQgV2hlcmUgdG8gd3JpdGUgdGhlIGRhdGEuIFNhdmVzIG1lbW9yeSBpZiB5b3Uga25vdyB0aGUgZGVjb21wcmVzc2VkIHNpemUgYW5kIHByb3ZpZGUgYW4gb3V0cHV0IGJ1ZmZlciBvZiB0aGF0IGxlbmd0aC5cbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb21wcmVzc1N5bmMoZGF0YSwgb3V0KSB7XG4gICAgcmV0dXJuIChkYXRhWzBdID09IDMxICYmIGRhdGFbMV0gPT0gMTM5ICYmIGRhdGFbMl0gPT0gOClcbiAgICAgICAgPyBndW56aXBTeW5jKGRhdGEsIG91dClcbiAgICAgICAgOiAoKGRhdGFbMF0gJiAxNSkgIT0gOCB8fCAoZGF0YVswXSA+PiA0KSA+IDcgfHwgKChkYXRhWzBdIDw8IDggfCBkYXRhWzFdKSAlIDMxKSlcbiAgICAgICAgICAgID8gaW5mbGF0ZVN5bmMoZGF0YSwgb3V0KVxuICAgICAgICAgICAgOiB1bnpsaWJTeW5jKGRhdGEsIG91dCk7XG59XG4vLyBmbGF0dGVuIGEgZGlyZWN0b3J5IHN0cnVjdHVyZVxudmFyIGZsdG4gPSBmdW5jdGlvbiAoZCwgcCwgdCwgbykge1xuICAgIGZvciAodmFyIGsgaW4gZCkge1xuICAgICAgICB2YXIgdmFsID0gZFtrXSwgbiA9IHAgKyBrLCBvcCA9IG87XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgICAgICBvcCA9IG1yZyhvLCB2YWxbMV0pLCB2YWwgPSB2YWxbMF07XG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiB1OClcbiAgICAgICAgICAgIHRbbl0gPSBbdmFsLCBvcF07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdFtuICs9ICcvJ10gPSBbbmV3IHU4KDApLCBvcF07XG4gICAgICAgICAgICBmbHRuKHZhbCwgbiwgdCwgbyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLy8gdGV4dCBlbmNvZGVyXG52YXIgdGUgPSB0eXBlb2YgVGV4dEVuY29kZXIgIT0gJ3VuZGVmaW5lZCcgJiYgLyojX19QVVJFX18qLyBuZXcgVGV4dEVuY29kZXIoKTtcbi8vIHRleHQgZGVjb2RlclxudmFyIHRkID0gdHlwZW9mIFRleHREZWNvZGVyICE9ICd1bmRlZmluZWQnICYmIC8qI19fUFVSRV9fKi8gbmV3IFRleHREZWNvZGVyKCk7XG4vLyB0ZXh0IGRlY29kZXIgc3RyZWFtXG52YXIgdGRzID0gMDtcbnRyeSB7XG4gICAgdGQuZGVjb2RlKGV0LCB7IHN0cmVhbTogdHJ1ZSB9KTtcbiAgICB0ZHMgPSAxO1xufVxuY2F0Y2ggKGUpIHsgfVxuLy8gZGVjb2RlIFVURjhcbnZhciBkdXRmOCA9IGZ1bmN0aW9uIChkKSB7XG4gICAgZm9yICh2YXIgciA9ICcnLCBpID0gMDs7KSB7XG4gICAgICAgIHZhciBjID0gZFtpKytdO1xuICAgICAgICB2YXIgZWIgPSAoYyA+IDEyNykgKyAoYyA+IDIyMykgKyAoYyA+IDIzOSk7XG4gICAgICAgIGlmIChpICsgZWIgPiBkLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBbciwgc2xjKGQsIGkgLSAxKV07XG4gICAgICAgIGlmICghZWIpXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICAgIGVsc2UgaWYgKGViID09IDMpIHtcbiAgICAgICAgICAgIGMgPSAoKGMgJiAxNSkgPDwgMTggfCAoZFtpKytdICYgNjMpIDw8IDEyIHwgKGRbaSsrXSAmIDYzKSA8PCA2IHwgKGRbaSsrXSAmIDYzKSkgLSA2NTUzNixcbiAgICAgICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTYgfCAoYyA+PiAxMCksIDU2MzIwIHwgKGMgJiAxMDIzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZWIgJiAxKVxuICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMzEpIDw8IDYgfCAoZFtpKytdICYgNjMpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMTUpIDw8IDEyIHwgKGRbaSsrXSAmIDYzKSA8PCA2IHwgKGRbaSsrXSAmIDYzKSk7XG4gICAgfVxufTtcbi8qKlxuICogU3RyZWFtaW5nIFVURi04IGRlY29kaW5nXG4gKi9cbnZhciBEZWNvZGVVVEY4ID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVVEYtOCBkZWNvZGluZyBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBpcyBkZWNvZGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGVjb2RlVVRGOChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICBpZiAodGRzKVxuICAgICAgICAgICAgdGhpcy50ID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucCA9IGV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWNvZGVkIGZyb20gVVRGLTggYmluYXJ5XG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIERlY29kZVVURjgucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGZpbmFsID0gISFmaW5hbDtcbiAgICAgICAgaWYgKHRoaXMudCkge1xuICAgICAgICAgICAgdGhpcy5vbmRhdGEodGhpcy50LmRlY29kZShjaHVuaywgeyBzdHJlYW06IHRydWUgfSksIGZpbmFsKTtcbiAgICAgICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnQuZGVjb2RlKCkubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBlcnIoOCk7XG4gICAgICAgICAgICAgICAgdGhpcy50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdmFyIGRhdCA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgZGF0LnNldCh0aGlzLnApO1xuICAgICAgICBkYXQuc2V0KGNodW5rLCB0aGlzLnAubGVuZ3RoKTtcbiAgICAgICAgdmFyIF9hID0gZHV0ZjgoZGF0KSwgY2ggPSBfYVswXSwgbnAgPSBfYVsxXTtcbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAobnAubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgICAgIHRoaXMucCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wID0gbnA7XG4gICAgICAgIHRoaXMub25kYXRhKGNoLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVjb2RlVVRGODtcbn0oKSk7XG5leHBvcnQgeyBEZWNvZGVVVEY4IH07XG4vKipcbiAqIFN0cmVhbWluZyBVVEYtOCBlbmNvZGluZ1xuICovXG52YXIgRW5jb2RlVVRGOCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVVRGLTggZGVjb2Rpbmcgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZW5jb2RlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEVuY29kZVVURjgoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZW5jb2RlZCB0byBVVEYtOFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgc3RyaW5nIGRhdGEgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBFbmNvZGVVVEY4LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB0aGlzLm9uZGF0YShzdHJUb1U4KGNodW5rKSwgdGhpcy5kID0gZmluYWwgfHwgZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIEVuY29kZVVURjg7XG59KCkpO1xuZXhwb3J0IHsgRW5jb2RlVVRGOCB9O1xuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBpbnRvIGEgVWludDhBcnJheSBmb3IgdXNlIHdpdGggY29tcHJlc3Npb24vZGVjb21wcmVzc2lvbiBtZXRob2RzXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlXG4gKiBAcGFyYW0gbGF0aW4xIFdoZXRoZXIgb3Igbm90IHRvIGludGVycHJldCB0aGUgZGF0YSBhcyBMYXRpbi0xLiBUaGlzIHNob3VsZFxuICogICAgICAgICAgICAgICBub3QgbmVlZCB0byBiZSB0cnVlIHVubGVzcyBkZWNvZGluZyBhIGJpbmFyeSBzdHJpbmcuXG4gKiBAcmV0dXJucyBUaGUgc3RyaW5nIGVuY29kZWQgaW4gVVRGLTgvTGF0aW4tMSBiaW5hcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0clRvVTgoc3RyLCBsYXRpbjEpIHtcbiAgICBpZiAobGF0aW4xKSB7XG4gICAgICAgIHZhciBhcl8xID0gbmV3IHU4KHN0ci5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGFyXzFbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgcmV0dXJuIGFyXzE7XG4gICAgfVxuICAgIGlmICh0ZSlcbiAgICAgICAgcmV0dXJuIHRlLmVuY29kZShzdHIpO1xuICAgIHZhciBsID0gc3RyLmxlbmd0aDtcbiAgICB2YXIgYXIgPSBuZXcgdTgoc3RyLmxlbmd0aCArIChzdHIubGVuZ3RoID4+IDEpKTtcbiAgICB2YXIgYWkgPSAwO1xuICAgIHZhciB3ID0gZnVuY3Rpb24gKHYpIHsgYXJbYWkrK10gPSB2OyB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGlmIChhaSArIDUgPiBhci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBuID0gbmV3IHU4KGFpICsgOCArICgobCAtIGkpIDw8IDEpKTtcbiAgICAgICAgICAgIG4uc2V0KGFyKTtcbiAgICAgICAgICAgIGFyID0gbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDEyOCB8fCBsYXRpbjEpXG4gICAgICAgICAgICB3KGMpO1xuICAgICAgICBlbHNlIGlmIChjIDwgMjA0OClcbiAgICAgICAgICAgIHcoMTkyIHwgKGMgPj4gNikpLCB3KDEyOCB8IChjICYgNjMpKTtcbiAgICAgICAgZWxzZSBpZiAoYyA+IDU1Mjk1ICYmIGMgPCA1NzM0NClcbiAgICAgICAgICAgIGMgPSA2NTUzNiArIChjICYgMTAyMyA8PCAxMCkgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDEwMjMpLFxuICAgICAgICAgICAgICAgIHcoMjQwIHwgKGMgPj4gMTgpKSwgdygxMjggfCAoKGMgPj4gMTIpICYgNjMpKSwgdygxMjggfCAoKGMgPj4gNikgJiA2MykpLCB3KDEyOCB8IChjICYgNjMpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdygyMjQgfCAoYyA+PiAxMikpLCB3KDEyOCB8ICgoYyA+PiA2KSAmIDYzKSksIHcoMTI4IHwgKGMgJiA2MykpO1xuICAgIH1cbiAgICByZXR1cm4gc2xjKGFyLCAwLCBhaSk7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgVWludDhBcnJheSB0byBhIHN0cmluZ1xuICogQHBhcmFtIGRhdCBUaGUgZGF0YSB0byBkZWNvZGUgdG8gc3RyaW5nXG4gKiBAcGFyYW0gbGF0aW4xIFdoZXRoZXIgb3Igbm90IHRvIGludGVycHJldCB0aGUgZGF0YSBhcyBMYXRpbi0xLiBUaGlzIHNob3VsZFxuICogICAgICAgICAgICAgICBub3QgbmVlZCB0byBiZSB0cnVlIHVubGVzcyBlbmNvZGluZyB0byBiaW5hcnkgc3RyaW5nLlxuICogQHJldHVybnMgVGhlIG9yaWdpbmFsIFVURi04L0xhdGluLTEgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJGcm9tVTgoZGF0LCBsYXRpbjEpIHtcbiAgICBpZiAobGF0aW4xKSB7XG4gICAgICAgIHZhciByID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0Lmxlbmd0aDsgaSArPSAxNjM4NClcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBkYXQuc3ViYXJyYXkoaSwgaSArIDE2Mzg0KSk7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICBlbHNlIGlmICh0ZClcbiAgICAgICAgcmV0dXJuIHRkLmRlY29kZShkYXQpO1xuICAgIGVsc2Uge1xuICAgICAgICB2YXIgX2EgPSBkdXRmOChkYXQpLCBvdXQgPSBfYVswXSwgZXh0ID0gX2FbMV07XG4gICAgICAgIGlmIChleHQubGVuZ3RoKVxuICAgICAgICAgICAgZXJyKDgpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn1cbjtcbi8vIGRlZmxhdGUgYml0IGZsYWdcbnZhciBkYmYgPSBmdW5jdGlvbiAobCkgeyByZXR1cm4gbCA9PSAxID8gMyA6IGwgPCA2ID8gMiA6IGwgPT0gOSA/IDEgOiAwOyB9O1xuLy8gc2tpcCBsb2NhbCB6aXAgaGVhZGVyXG52YXIgc2x6aCA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiBiICsgMzAgKyBiMihkLCBiICsgMjYpICsgYjIoZCwgYiArIDI4KTsgfTtcbi8vIHJlYWQgemlwIGhlYWRlclxudmFyIHpoID0gZnVuY3Rpb24gKGQsIGIsIHopIHtcbiAgICB2YXIgZm5sID0gYjIoZCwgYiArIDI4KSwgZm4gPSBzdHJGcm9tVTgoZC5zdWJhcnJheShiICsgNDYsIGIgKyA0NiArIGZubCksICEoYjIoZCwgYiArIDgpICYgMjA0OCkpLCBlcyA9IGIgKyA0NiArIGZubCwgYnMgPSBiNChkLCBiICsgMjApO1xuICAgIHZhciBfYSA9IHogJiYgYnMgPT0gNDI5NDk2NzI5NSA/IHo2NGUoZCwgZXMpIDogW2JzLCBiNChkLCBiICsgMjQpLCBiNChkLCBiICsgNDIpXSwgc2MgPSBfYVswXSwgc3UgPSBfYVsxXSwgb2ZmID0gX2FbMl07XG4gICAgcmV0dXJuIFtiMihkLCBiICsgMTApLCBzYywgc3UsIGZuLCBlcyArIGIyKGQsIGIgKyAzMCkgKyBiMihkLCBiICsgMzIpLCBvZmZdO1xufTtcbi8vIHJlYWQgemlwNjQgZXh0cmEgZmllbGRcbnZhciB6NjRlID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKDsgYjIoZCwgYikgIT0gMTsgYiArPSA0ICsgYjIoZCwgYiArIDIpKVxuICAgICAgICA7XG4gICAgcmV0dXJuIFtiOChkLCBiICsgMTIpLCBiOChkLCBiICsgNCksIGI4KGQsIGIgKyAyMCldO1xufTtcbi8vIGV4dHJhIGZpZWxkIGxlbmd0aFxudmFyIGV4ZmwgPSBmdW5jdGlvbiAoZXgpIHtcbiAgICB2YXIgbGUgPSAwO1xuICAgIGlmIChleCkge1xuICAgICAgICBmb3IgKHZhciBrIGluIGV4KSB7XG4gICAgICAgICAgICB2YXIgbCA9IGV4W2tdLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgZXJyKDkpO1xuICAgICAgICAgICAgbGUgKz0gbCArIDQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlO1xufTtcbi8vIHdyaXRlIHppcCBoZWFkZXJcbnZhciB3emggPSBmdW5jdGlvbiAoZCwgYiwgZiwgZm4sIHUsIGMsIGNlLCBjbykge1xuICAgIHZhciBmbCA9IGZuLmxlbmd0aCwgZXggPSBmLmV4dHJhLCBjb2wgPSBjbyAmJiBjby5sZW5ndGg7XG4gICAgdmFyIGV4bCA9IGV4ZmwoZXgpO1xuICAgIHdieXRlcyhkLCBiLCBjZSAhPSBudWxsID8gMHgyMDE0QjUwIDogMHg0MDM0QjUwKSwgYiArPSA0O1xuICAgIGlmIChjZSAhPSBudWxsKVxuICAgICAgICBkW2IrK10gPSAyMCwgZFtiKytdID0gZi5vcztcbiAgICBkW2JdID0gMjAsIGIgKz0gMjsgLy8gc3BlYyBjb21wbGlhbmNlPyB3aGF0J3MgdGhhdD9cbiAgICBkW2IrK10gPSAoZi5mbGFnIDw8IDEpIHwgKGMgPCAwICYmIDgpLCBkW2IrK10gPSB1ICYmIDg7XG4gICAgZFtiKytdID0gZi5jb21wcmVzc2lvbiAmIDI1NSwgZFtiKytdID0gZi5jb21wcmVzc2lvbiA+PiA4O1xuICAgIHZhciBkdCA9IG5ldyBEYXRlKGYubXRpbWUgPT0gbnVsbCA/IERhdGUubm93KCkgOiBmLm10aW1lKSwgeSA9IGR0LmdldEZ1bGxZZWFyKCkgLSAxOTgwO1xuICAgIGlmICh5IDwgMCB8fCB5ID4gMTE5KVxuICAgICAgICBlcnIoMTApO1xuICAgIHdieXRlcyhkLCBiLCAoeSA8PCAyNSkgfCAoKGR0LmdldE1vbnRoKCkgKyAxKSA8PCAyMSkgfCAoZHQuZ2V0RGF0ZSgpIDw8IDE2KSB8IChkdC5nZXRIb3VycygpIDw8IDExKSB8IChkdC5nZXRNaW51dGVzKCkgPDwgNSkgfCAoZHQuZ2V0U2Vjb25kcygpID4+PiAxKSksIGIgKz0gNDtcbiAgICBpZiAoYyAhPSAtMSkge1xuICAgICAgICB3Ynl0ZXMoZCwgYiwgZi5jcmMpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDQsIGMgPCAwID8gLWMgLSAyIDogYyk7XG4gICAgICAgIHdieXRlcyhkLCBiICsgOCwgZi5zaXplKTtcbiAgICB9XG4gICAgd2J5dGVzKGQsIGIgKyAxMiwgZmwpO1xuICAgIHdieXRlcyhkLCBiICsgMTQsIGV4bCksIGIgKz0gMTY7XG4gICAgaWYgKGNlICE9IG51bGwpIHtcbiAgICAgICAgd2J5dGVzKGQsIGIsIGNvbCk7XG4gICAgICAgIHdieXRlcyhkLCBiICsgNiwgZi5hdHRycyk7XG4gICAgICAgIHdieXRlcyhkLCBiICsgMTAsIGNlKSwgYiArPSAxNDtcbiAgICB9XG4gICAgZC5zZXQoZm4sIGIpO1xuICAgIGIgKz0gZmw7XG4gICAgaWYgKGV4bCkge1xuICAgICAgICBmb3IgKHZhciBrIGluIGV4KSB7XG4gICAgICAgICAgICB2YXIgZXhmID0gZXhba10sIGwgPSBleGYubGVuZ3RoO1xuICAgICAgICAgICAgd2J5dGVzKGQsIGIsICtrKTtcbiAgICAgICAgICAgIHdieXRlcyhkLCBiICsgMiwgbCk7XG4gICAgICAgICAgICBkLnNldChleGYsIGIgKyA0KSwgYiArPSA0ICsgbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sKVxuICAgICAgICBkLnNldChjbywgYiksIGIgKz0gY29sO1xuICAgIHJldHVybiBiO1xufTtcbi8vIHdyaXRlIHppcCBmb290ZXIgKGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSlcbnZhciB3emYgPSBmdW5jdGlvbiAobywgYiwgYywgZCwgZSkge1xuICAgIHdieXRlcyhvLCBiLCAweDYwNTRCNTApOyAvLyBza2lwIGRpc2tcbiAgICB3Ynl0ZXMobywgYiArIDgsIGMpO1xuICAgIHdieXRlcyhvLCBiICsgMTAsIGMpO1xuICAgIHdieXRlcyhvLCBiICsgMTIsIGQpO1xuICAgIHdieXRlcyhvLCBiICsgMTYsIGUpO1xufTtcbi8qKlxuICogQSBwYXNzLXRocm91Z2ggc3RyZWFtIHRvIGtlZXAgZGF0YSB1bmNvbXByZXNzZWQgaW4gYSBaSVAgYXJjaGl2ZS5cbiAqL1xudmFyIFppcFBhc3NUaHJvdWdoID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwYXNzLXRocm91Z2ggc3RyZWFtIHRoYXQgY2FuIGJlIGFkZGVkIHRvIFpJUCBhcmNoaXZlc1xuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBUaGUgZmlsZW5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBkYXRhIHN0cmVhbVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFppcFBhc3NUaHJvdWdoKGZpbGVuYW1lKSB7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5jID0gY3JjKCk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuY29tcHJlc3Npb24gPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZXMgYSBjaHVuayBhbmQgcHVzaGVzIHRvIHRoZSBvdXRwdXQgc3RyZWFtLiBZb3UgY2FuIG92ZXJyaWRlIHRoaXNcbiAgICAgKiBtZXRob2QgaW4gYSBzdWJjbGFzcyBmb3IgY3VzdG9tIGJlaGF2aW9yLCBidXQgYnkgZGVmYXVsdCB0aGlzIHBhc3Nlc1xuICAgICAqIHRoZSBkYXRhIHRocm91Z2guIFlvdSBtdXN0IGNhbGwgdGhpcy5vbmRhdGEoZXJyLCBjaHVuaywgZmluYWwpIGF0IHNvbWVcbiAgICAgKiBwb2ludCBpbiB0aGlzIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHByb2Nlc3NcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRoaXMub25kYXRhKG51bGwsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBhZGRlZC4gSWYgeW91IGFyZSBzdWJjbGFzc2luZyB0aGlzIHdpdGggYSBjdXN0b21cbiAgICAgKiBjb21wcmVzc2lvbiBhbGdvcml0aG0sIG5vdGUgdGhhdCB5b3UgbXVzdCBwdXNoIGRhdGEgZnJvbSB0aGUgc291cmNlXG4gICAgICogZmlsZSBvbmx5LCBwcmUtY29tcHJlc3Npb24uXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICB0aGlzLmMucChjaHVuayk7XG4gICAgICAgIHRoaXMuc2l6ZSArPSBjaHVuay5sZW5ndGg7XG4gICAgICAgIGlmIChmaW5hbClcbiAgICAgICAgICAgIHRoaXMuY3JjID0gdGhpcy5jLmQoKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzKGNodW5rLCBmaW5hbCB8fCBmYWxzZSk7XG4gICAgfTtcbiAgICByZXR1cm4gWmlwUGFzc1Rocm91Z2g7XG59KCkpO1xuZXhwb3J0IHsgWmlwUGFzc1Rocm91Z2ggfTtcbi8vIEkgZG9uJ3QgZXh0ZW5kIGJlY2F1c2UgVHlwZVNjcmlwdCBleHRlbnNpb24gYWRkcyAxa0Igb2YgcnVudGltZSBibG9hdFxuLyoqXG4gKiBTdHJlYW1pbmcgREVGTEFURSBjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzLiBQcmVmZXIgdXNpbmcgQXN5bmNaaXBEZWZsYXRlXG4gKiBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gKi9cbnZhciBaaXBEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBERUZMQVRFIHN0cmVhbSB0aGF0IGNhbiBiZSBhZGRlZCB0byBaSVAgYXJjaGl2ZXNcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgVGhlIGZpbGVuYW1lIHRvIGFzc29jaWF0ZSB3aXRoIHRoaXMgZGF0YSBzdHJlYW1cbiAgICAgKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFppcERlZmxhdGUoZmlsZW5hbWUsIG9wdHMpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAoIW9wdHMpXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLmNhbGwodGhpcywgZmlsZW5hbWUpO1xuICAgICAgICB0aGlzLmQgPSBuZXcgRGVmbGF0ZShvcHRzLCBmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEobnVsbCwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gODtcbiAgICAgICAgdGhpcy5mbGFnID0gZGJmKG9wdHMubGV2ZWwpO1xuICAgIH1cbiAgICBaaXBEZWZsYXRlLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZSwgbnVsbCwgZmluYWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBEZWZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gWmlwRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBaaXBEZWZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzXG4gKi9cbnZhciBBc3luY1ppcERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgc3RyZWFtIHRoYXQgY2FuIGJlIGFkZGVkIHRvIFpJUCBhcmNoaXZlc1xuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBUaGUgZmlsZW5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBkYXRhIHN0cmVhbVxuICAgICAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNaaXBEZWZsYXRlKGZpbGVuYW1lLCBvcHRzKSB7XG4gICAgICAgIHZhciBfdGhpc18xID0gdGhpcztcbiAgICAgICAgaWYgKCFvcHRzKVxuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5jYWxsKHRoaXMsIGZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5kID0gbmV3IEFzeW5jRGVmbGF0ZShvcHRzLCBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpc18xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvbiA9IDg7XG4gICAgICAgIHRoaXMuZmxhZyA9IGRiZihvcHRzLmxldmVsKTtcbiAgICAgICAgdGhpcy50ZXJtaW5hdGUgPSB0aGlzLmQudGVybWluYXRlO1xuICAgIH1cbiAgICBBc3luY1ppcERlZmxhdGUucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRoaXMuZC5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBBc3luY1ppcERlZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY1ppcERlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNaaXBEZWZsYXRlIH07XG4vLyBUT0RPOiBCZXR0ZXIgdHJlZSBzaGFraW5nXG4vKipcbiAqIEEgemlwcGFibGUgYXJjaGl2ZSB0byB3aGljaCBmaWxlcyBjYW4gaW5jcmVtZW50YWxseSBiZSBhZGRlZFxuICovXG52YXIgWmlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgWklQIGFyY2hpdmUgdG8gd2hpY2ggZmlsZXMgY2FuIGJlIGFkZGVkXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgZm9yIHRoZSBnZW5lcmF0ZWQgWklQIGFyY2hpdmVcbiAgICAgKiAgICAgICAgICAgaXMgYXZhaWxhYmxlXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwKGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIHRoaXMudSA9IFtdO1xuICAgICAgICB0aGlzLmQgPSAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZmlsZSB0byB0aGUgWklQIGFyY2hpdmVcbiAgICAgKiBAcGFyYW0gZmlsZSBUaGUgZmlsZSBzdHJlYW0gdG8gYWRkXG4gICAgICovXG4gICAgWmlwLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIC8vIGZpbmlzaGluZyBvciBmaW5pc2hlZFxuICAgICAgICBpZiAodGhpcy5kICYgMilcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGVycig0ICsgKHRoaXMuZCAmIDEpICogOCwgMCwgMSksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZiA9IHN0clRvVTgoZmlsZS5maWxlbmFtZSksIGZsXzEgPSBmLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb20gPSBmaWxlLmNvbW1lbnQsIG8gPSBjb20gJiYgc3RyVG9VOChjb20pO1xuICAgICAgICAgICAgdmFyIHUgPSBmbF8xICE9IGZpbGUuZmlsZW5hbWUubGVuZ3RoIHx8IChvICYmIChjb20ubGVuZ3RoICE9IG8ubGVuZ3RoKSk7XG4gICAgICAgICAgICB2YXIgaGxfMSA9IGZsXzEgKyBleGZsKGZpbGUuZXh0cmEpICsgMzA7XG4gICAgICAgICAgICBpZiAoZmxfMSA+IDY1NTM1KVxuICAgICAgICAgICAgICAgIHRoaXMub25kYXRhKGVycigxMSwgMCwgMSksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBuZXcgdTgoaGxfMSk7XG4gICAgICAgICAgICB3emgoaGVhZGVyLCAwLCBmaWxlLCBmLCB1LCAtMSk7XG4gICAgICAgICAgICB2YXIgY2hrc18xID0gW2hlYWRlcl07XG4gICAgICAgICAgICB2YXIgcEFsbF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY2hrc18yID0gY2hrc18xOyBfaSA8IGNoa3NfMi5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoayA9IGNoa3NfMltfaV07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzXzEub25kYXRhKG51bGwsIGNoaywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGtzXzEgPSBbXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgdHJfMSA9IHRoaXMuZDtcbiAgICAgICAgICAgIHRoaXMuZCA9IDA7XG4gICAgICAgICAgICB2YXIgaW5kXzEgPSB0aGlzLnUubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHVmXzEgPSBtcmcoZmlsZSwge1xuICAgICAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICAgICAgdTogdSxcbiAgICAgICAgICAgICAgICBvOiBvLFxuICAgICAgICAgICAgICAgIHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudGVybWluYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcEFsbF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cl8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnh0ID0gX3RoaXNfMS51W2luZF8xICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG54dC5yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5kID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cl8xID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjbF8xID0gMDtcbiAgICAgICAgICAgIGZpbGUub25kYXRhID0gZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsXzEgKz0gZGF0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY2hrc18xLnB1c2goZGF0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGQgPSBuZXcgdTgoMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2J5dGVzKGRkLCAwLCAweDgwNzRCNTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2J5dGVzKGRkLCA0LCBmaWxlLmNyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDgsIGNsXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2J5dGVzKGRkLCAxMiwgZmlsZS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoa3NfMS5wdXNoKGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVmXzEuYyA9IGNsXzEsIHVmXzEuYiA9IGhsXzEgKyBjbF8xICsgMTYsIHVmXzEuY3JjID0gZmlsZS5jcmMsIHVmXzEuc2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cl8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmXzEucigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJfMSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHJfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHBBbGxfMSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnUucHVzaCh1Zl8xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRW5kcyB0aGUgcHJvY2VzcyBvZiBhZGRpbmcgZmlsZXMgYW5kIHByZXBhcmVzIHRvIGVtaXQgdGhlIGZpbmFsIGNodW5rcy5cbiAgICAgKiBUaGlzICptdXN0KiBiZSBjYWxsZWQgYWZ0ZXIgYWRkaW5nIGFsbCBkZXNpcmVkIGZpbGVzIGZvciB0aGUgcmVzdWx0aW5nXG4gICAgICogWklQIGZpbGUgdG8gd29yayBwcm9wZXJseS5cbiAgICAgKi9cbiAgICBaaXAucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5kICYgMikge1xuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDQgKyAodGhpcy5kICYgMSkgKiA4LCAwLCAxKSwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIHRoaXMuZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnUucHVzaCh7XG4gICAgICAgICAgICAgICAgcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShfdGhpc18xLmQgJiAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS51LnNwbGljZSgtMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzXzEuZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdDogZnVuY3Rpb24gKCkgeyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kID0gMztcbiAgICB9O1xuICAgIFppcC5wcm90b3R5cGUuZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ0ID0gMCwgbCA9IDAsIHRsID0gMDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBmID0gX2FbX2ldO1xuICAgICAgICAgICAgdGwgKz0gNDYgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKSArIChmLm8gPyBmLm8ubGVuZ3RoIDogMCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG91dCA9IG5ldyB1OCh0bCArIDIyKTtcbiAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHRoaXMudTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgIHZhciBmID0gX2NbX2JdO1xuICAgICAgICAgICAgd3poKG91dCwgYnQsIGYsIGYuZiwgZi51LCAtZi5jIC0gMiwgbCwgZi5vKTtcbiAgICAgICAgICAgIGJ0ICs9IDQ2ICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSkgKyAoZi5vID8gZi5vLmxlbmd0aCA6IDApLCBsICs9IGYuYjtcbiAgICAgICAgfVxuICAgICAgICB3emYob3V0LCBidCwgdGhpcy51Lmxlbmd0aCwgdGwsIGwpO1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBvdXQsIHRydWUpO1xuICAgICAgICB0aGlzLmQgPSAyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBtZXRob2QgdG8gdGVybWluYXRlIGFueSBpbnRlcm5hbCB3b3JrZXJzIHVzZWQgYnkgdGhlIHN0cmVhbS4gU3Vic2VxdWVudFxuICAgICAqIGNhbGxzIHRvIGFkZCgpIHdpbGwgZmFpbC5cbiAgICAgKi9cbiAgICBaaXAucHJvdG90eXBlLnRlcm1pbmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBmID0gX2FbX2ldO1xuICAgICAgICAgICAgZi50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kID0gMjtcbiAgICB9O1xuICAgIHJldHVybiBaaXA7XG59KCkpO1xuZXhwb3J0IHsgWmlwIH07XG5leHBvcnQgZnVuY3Rpb24gemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgdmFyIHIgPSB7fTtcbiAgICBmbHRuKGRhdGEsICcnLCByLCBvcHRzKTtcbiAgICB2YXIgayA9IE9iamVjdC5rZXlzKHIpO1xuICAgIHZhciBsZnQgPSBrLmxlbmd0aCwgbyA9IDAsIHRvdCA9IDA7XG4gICAgdmFyIHNsZnQgPSBsZnQsIGZpbGVzID0gbmV3IEFycmF5KGxmdCk7XG4gICAgdmFyIHRlcm0gPSBbXTtcbiAgICB2YXIgdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXJtLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgdGVybVtpXSgpO1xuICAgIH07XG4gICAgdmFyIGNiZCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIG10KGZ1bmN0aW9uICgpIHsgY2IoYSwgYik7IH0pO1xuICAgIH07XG4gICAgbXQoZnVuY3Rpb24gKCkgeyBjYmQgPSBjYjsgfSk7XG4gICAgdmFyIGNiZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG91dCA9IG5ldyB1OCh0b3QgKyAyMiksIG9lID0gbywgY2RsID0gdG90IC0gbztcbiAgICAgICAgdG90ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGZ0OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBmID0gZmlsZXNbaV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBsID0gZi5jLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3emgob3V0LCB0b3QsIGYsIGYuZiwgZi51LCBsKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFkZCA9IDMwICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSk7XG4gICAgICAgICAgICAgICAgdmFyIGxvYyA9IHRvdCArIGJhZGQ7XG4gICAgICAgICAgICAgICAgb3V0LnNldChmLmMsIGxvYyk7XG4gICAgICAgICAgICAgICAgd3poKG91dCwgbywgZiwgZi5mLCBmLnUsIGwsIHRvdCwgZi5tKSwgbyArPSAxNiArIGJhZGQgKyAoZi5tID8gZi5tLmxlbmd0aCA6IDApLCB0b3QgPSBsb2MgKyBsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2JkKGUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHd6ZihvdXQsIG8sIGZpbGVzLmxlbmd0aCwgY2RsLCBvZSk7XG4gICAgICAgIGNiZChudWxsLCBvdXQpO1xuICAgIH07XG4gICAgaWYgKCFsZnQpXG4gICAgICAgIGNiZigpO1xuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGZuID0ga1tpXTtcbiAgICAgICAgdmFyIF9hID0gcltmbl0sIGZpbGUgPSBfYVswXSwgcCA9IF9hWzFdO1xuICAgICAgICB2YXIgYyA9IGNyYygpLCBzaXplID0gZmlsZS5sZW5ndGg7XG4gICAgICAgIGMucChmaWxlKTtcbiAgICAgICAgdmFyIGYgPSBzdHJUb1U4KGZuKSwgcyA9IGYubGVuZ3RoO1xuICAgICAgICB2YXIgY29tID0gcC5jb21tZW50LCBtID0gY29tICYmIHN0clRvVTgoY29tKSwgbXMgPSBtICYmIG0ubGVuZ3RoO1xuICAgICAgICB2YXIgZXhsID0gZXhmbChwLmV4dHJhKTtcbiAgICAgICAgdmFyIGNvbXByZXNzaW9uID0gcC5sZXZlbCA9PSAwID8gMCA6IDg7XG4gICAgICAgIHZhciBjYmwgPSBmdW5jdGlvbiAoZSwgZCkge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0QWxsKCk7XG4gICAgICAgICAgICAgICAgY2JkKGUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmaWxlc1tpXSA9IG1yZyhwLCB7XG4gICAgICAgICAgICAgICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgICAgICAgICAgICAgIGNyYzogYy5kKCksXG4gICAgICAgICAgICAgICAgICAgIGM6IGQsXG4gICAgICAgICAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICAgICAgICAgIG06IG0sXG4gICAgICAgICAgICAgICAgICAgIHU6IHMgIT0gZm4ubGVuZ3RoIHx8IChtICYmIChjb20ubGVuZ3RoICE9IG1zKSksXG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjb21wcmVzc2lvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG8gKz0gMzAgKyBzICsgZXhsICsgbDtcbiAgICAgICAgICAgICAgICB0b3QgKz0gNzYgKyAyICogKHMgKyBleGwpICsgKG1zIHx8IDApICsgbDtcbiAgICAgICAgICAgICAgICBpZiAoIS0tbGZ0KVxuICAgICAgICAgICAgICAgICAgICBjYmYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHMgPiA2NTUzNSlcbiAgICAgICAgICAgIGNibChlcnIoMTEsIDAsIDEpLCBudWxsKTtcbiAgICAgICAgaWYgKCFjb21wcmVzc2lvbilcbiAgICAgICAgICAgIGNibChudWxsLCBmaWxlKTtcbiAgICAgICAgZWxzZSBpZiAoc2l6ZSA8IDE2MDAwMCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYmwobnVsbCwgZGVmbGF0ZVN5bmMoZmlsZSwgcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjYmwoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGVybS5wdXNoKGRlZmxhdGUoZmlsZSwgcCwgY2JsKSk7XG4gICAgfTtcbiAgICAvLyBDYW5ub3QgdXNlIGxmdCBiZWNhdXNlIGl0IGNhbiBkZWNyZWFzZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xmdDsgKytpKSB7XG4gICAgICAgIF9sb29wXzEoaSk7XG4gICAgfVxuICAgIHJldHVybiB0QWxsO1xufVxuLyoqXG4gKiBTeW5jaHJvbm91c2x5IGNyZWF0ZXMgYSBaSVAgZmlsZS4gUHJlZmVyIHVzaW5nIGB6aXBgIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAqIHdpdGggbW9yZSB0aGFuIG9uZSBmaWxlLlxuICogQHBhcmFtIGRhdGEgVGhlIGRpcmVjdG9yeSBzdHJ1Y3R1cmUgZm9yIHRoZSBaSVAgYXJjaGl2ZVxuICogQHBhcmFtIG9wdHMgVGhlIG1haW4gb3B0aW9ucywgbWVyZ2VkIHdpdGggcGVyLWZpbGUgb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGdlbmVyYXRlZCBaSVAgYXJjaGl2ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gemlwU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKVxuICAgICAgICBvcHRzID0ge307XG4gICAgdmFyIHIgPSB7fTtcbiAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICBmbHRuKGRhdGEsICcnLCByLCBvcHRzKTtcbiAgICB2YXIgbyA9IDA7XG4gICAgdmFyIHRvdCA9IDA7XG4gICAgZm9yICh2YXIgZm4gaW4gcikge1xuICAgICAgICB2YXIgX2EgPSByW2ZuXSwgZmlsZSA9IF9hWzBdLCBwID0gX2FbMV07XG4gICAgICAgIHZhciBjb21wcmVzc2lvbiA9IHAubGV2ZWwgPT0gMCA/IDAgOiA4O1xuICAgICAgICB2YXIgZiA9IHN0clRvVTgoZm4pLCBzID0gZi5sZW5ndGg7XG4gICAgICAgIHZhciBjb20gPSBwLmNvbW1lbnQsIG0gPSBjb20gJiYgc3RyVG9VOChjb20pLCBtcyA9IG0gJiYgbS5sZW5ndGg7XG4gICAgICAgIHZhciBleGwgPSBleGZsKHAuZXh0cmEpO1xuICAgICAgICBpZiAocyA+IDY1NTM1KVxuICAgICAgICAgICAgZXJyKDExKTtcbiAgICAgICAgdmFyIGQgPSBjb21wcmVzc2lvbiA/IGRlZmxhdGVTeW5jKGZpbGUsIHApIDogZmlsZSwgbCA9IGQubGVuZ3RoO1xuICAgICAgICB2YXIgYyA9IGNyYygpO1xuICAgICAgICBjLnAoZmlsZSk7XG4gICAgICAgIGZpbGVzLnB1c2gobXJnKHAsIHtcbiAgICAgICAgICAgIHNpemU6IGZpbGUubGVuZ3RoLFxuICAgICAgICAgICAgY3JjOiBjLmQoKSxcbiAgICAgICAgICAgIGM6IGQsXG4gICAgICAgICAgICBmOiBmLFxuICAgICAgICAgICAgbTogbSxcbiAgICAgICAgICAgIHU6IHMgIT0gZm4ubGVuZ3RoIHx8IChtICYmIChjb20ubGVuZ3RoICE9IG1zKSksXG4gICAgICAgICAgICBvOiBvLFxuICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uXG4gICAgICAgIH0pKTtcbiAgICAgICAgbyArPSAzMCArIHMgKyBleGwgKyBsO1xuICAgICAgICB0b3QgKz0gNzYgKyAyICogKHMgKyBleGwpICsgKG1zIHx8IDApICsgbDtcbiAgICB9XG4gICAgdmFyIG91dCA9IG5ldyB1OCh0b3QgKyAyMiksIG9lID0gbywgY2RsID0gdG90IC0gbztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBmID0gZmlsZXNbaV07XG4gICAgICAgIHd6aChvdXQsIGYubywgZiwgZi5mLCBmLnUsIGYuYy5sZW5ndGgpO1xuICAgICAgICB2YXIgYmFkZCA9IDMwICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSk7XG4gICAgICAgIG91dC5zZXQoZi5jLCBmLm8gKyBiYWRkKTtcbiAgICAgICAgd3poKG91dCwgbywgZiwgZi5mLCBmLnUsIGYuYy5sZW5ndGgsIGYubywgZi5tKSwgbyArPSAxNiArIGJhZGQgKyAoZi5tID8gZi5tLmxlbmd0aCA6IDApO1xuICAgIH1cbiAgICB3emYob3V0LCBvLCBmaWxlcy5sZW5ndGgsIGNkbCwgb2UpO1xuICAgIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFN0cmVhbWluZyBwYXNzLXRocm91Z2ggZGVjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzXG4gKi9cbnZhciBVbnppcFBhc3NUaHJvdWdoID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFVuemlwUGFzc1Rocm91Z2goKSB7XG4gICAgfVxuICAgIFVuemlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgZmluYWwpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEobnVsbCwgZGF0YSwgZmluYWwpO1xuICAgIH07XG4gICAgVW56aXBQYXNzVGhyb3VnaC5jb21wcmVzc2lvbiA9IDA7XG4gICAgcmV0dXJuIFVuemlwUGFzc1Rocm91Z2g7XG59KCkpO1xuZXhwb3J0IHsgVW56aXBQYXNzVGhyb3VnaCB9O1xuLyoqXG4gKiBTdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXMuIFByZWZlciBBc3luY1ppcEluZmxhdGUgZm9yXG4gKiBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gKi9cbnZhciBVbnppcEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgZGVjb21wcmVzc2lvbiB0aGF0IGNhbiBiZSB1c2VkIGluIFpJUCBhcmNoaXZlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVuemlwSW5mbGF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzXzEgPSB0aGlzO1xuICAgICAgICB0aGlzLmkgPSBuZXcgSW5mbGF0ZShmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEobnVsbCwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBVbnppcEluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgZmluYWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuaS5wdXNoKGRhdGEsIGZpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZSwgbnVsbCwgZmluYWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBVbnppcEluZmxhdGUuY29tcHJlc3Npb24gPSA4O1xuICAgIHJldHVybiBVbnppcEluZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgVW56aXBJbmZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXNcbiAqL1xudmFyIEFzeW5jVW56aXBJbmZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBERUZMQVRFIGRlY29tcHJlc3Npb24gdGhhdCBjYW4gYmUgdXNlZCBpbiBaSVAgYXJjaGl2ZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY1VuemlwSW5mbGF0ZShfLCBzeikge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmIChzeiA8IDMyMDAwMCkge1xuICAgICAgICAgICAgdGhpcy5pID0gbmV3IEluZmxhdGUoZnVuY3Rpb24gKGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpc18xLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pID0gbmV3IEFzeW5jSW5mbGF0ZShmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXNfMS5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50ZXJtaW5hdGUgPSB0aGlzLmkudGVybWluYXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFzeW5jVW56aXBJbmZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIGZpbmFsKSB7XG4gICAgICAgIGlmICh0aGlzLmkudGVybWluYXRlKVxuICAgICAgICAgICAgZGF0YSA9IHNsYyhkYXRhLCAwKTtcbiAgICAgICAgdGhpcy5pLnB1c2goZGF0YSwgZmluYWwpO1xuICAgIH07XG4gICAgQXN5bmNVbnppcEluZmxhdGUuY29tcHJlc3Npb24gPSA4O1xuICAgIHJldHVybiBBc3luY1VuemlwSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1VuemlwSW5mbGF0ZSB9O1xuLyoqXG4gKiBBIFpJUCBhcmNoaXZlIGRlY29tcHJlc3Npb24gc3RyZWFtIHRoYXQgZW1pdHMgZmlsZXMgYXMgdGhleSBhcmUgZGlzY292ZXJlZFxuICovXG52YXIgVW56aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFpJUCBkZWNvbXByZXNzaW9uIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBhIGZpbGUgaW4gdGhlIFpJUCBhcmNoaXZlIGlzIGZvdW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gVW56aXAoY2IpIHtcbiAgICAgICAgdGhpcy5vbmZpbGUgPSBjYjtcbiAgICAgICAgdGhpcy5rID0gW107XG4gICAgICAgIHRoaXMubyA9IHtcbiAgICAgICAgICAgIDA6IFVuemlwUGFzc1Rocm91Z2hcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wID0gZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIHVuemlwcGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFVuemlwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB2YXIgX3RoaXNfMSA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5vbmZpbGUpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICghdGhpcy5wKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICBpZiAodGhpcy5jID4gMCkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKHRoaXMuYywgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciB0b0FkZCA9IGNodW5rLnN1YmFycmF5KDAsIGxlbik7XG4gICAgICAgICAgICB0aGlzLmMgLT0gbGVuO1xuICAgICAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgICAgICB0aGlzLmQucHVzaCh0b0FkZCwgIXRoaXMuYyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5rWzBdLnB1c2godG9BZGQpO1xuICAgICAgICAgICAgY2h1bmsgPSBjaHVuay5zdWJhcnJheShsZW4pO1xuICAgICAgICAgICAgaWYgKGNodW5rLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZiA9IDAsIGkgPSAwLCBpcyA9IHZvaWQgMCwgYnVmID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnAubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGJ1ZiA9IGNodW5rO1xuICAgICAgICAgICAgZWxzZSBpZiAoIWNodW5rLmxlbmd0aClcbiAgICAgICAgICAgICAgICBidWYgPSB0aGlzLnA7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgPSBuZXcgdTgodGhpcy5wLmxlbmd0aCArIGNodW5rLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnVmLnNldCh0aGlzLnApLCBidWYuc2V0KGNodW5rLCB0aGlzLnAubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsID0gYnVmLmxlbmd0aCwgb2MgPSB0aGlzLmMsIGFkZCA9IG9jICYmIHRoaXMuZDtcbiAgICAgICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB2YXIgc2lnID0gYjQoYnVmLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2lnID09IDB4NDAzNEI1MCkge1xuICAgICAgICAgICAgICAgICAgICBmID0gMSwgaXMgPSBpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzXzEuZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNfMS5jID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJmID0gYjIoYnVmLCBpICsgNiksIGNtcF8xID0gYjIoYnVmLCBpICsgOCksIHUgPSBiZiAmIDIwNDgsIGRkID0gYmYgJiA4LCBmbmwgPSBiMihidWYsIGkgKyAyNiksIGVzID0gYjIoYnVmLCBpICsgMjgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobCA+IGkgKyAzMCArIGZubCArIGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hrc18zID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEuay51bnNoaWZ0KGNoa3NfMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY18xID0gYjQoYnVmLCBpICsgMTgpLCBzdV8xID0gYjQoYnVmLCBpICsgMjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuXzEgPSBzdHJGcm9tVTgoYnVmLnN1YmFycmF5KGkgKyAzMCwgaSArPSAzMCArIGZubCksICF1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY18xID09IDQyOTQ5NjcyOTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGRkID8gWy0yXSA6IHo2NGUoYnVmLCBpKSwgc2NfMSA9IF9hWzBdLCBzdV8xID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY18xID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLmMgPSBzY18xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlXzEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZm5fMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogY21wXzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlXzEub25kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlXzEub25kYXRhKG51bGwsIGV0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3RyID0gX3RoaXNfMS5vW2NtcF8xXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5vbmRhdGEoZXJyKDE0LCAndW5rbm93biBjb21wcmVzc2lvbiB0eXBlICcgKyBjbXBfMSwgMSksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMSA9IHNjXzEgPCAwID8gbmV3IGN0cihmbl8xKSA6IG5ldyBjdHIoZm5fMSwgc2NfMSwgc3VfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEub25kYXRhID0gZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkgeyBmaWxlXzEub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNoa3NfNCA9IGNoa3NfMzsgX2kgPCBjaGtzXzQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdCA9IGNoa3NfNFtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLnB1c2goZGF0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXNfMS5rWzBdID09IGNoa3NfMyAmJiBfdGhpc18xLmMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNfMS5kID0gZF8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS5wdXNoKGV0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkXzEgJiYgZF8xLnRlcm1pbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjXzEgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlXzEuc2l6ZSA9IHNjXzEsIGZpbGVfMS5vcmlnaW5hbFNpemUgPSBzdV8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLm9uZmlsZShmaWxlXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWcgPT0gMHg4MDc0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcyA9IGkgKz0gMTIgKyAob2MgPT0gLTIgJiYgOCksIGYgPSAzLCB0aGlzXzEuYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNpZyA9PSAweDIwMTRCNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzID0gaSAtPSA0LCBmID0gMywgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgdGhpc18xID0gdGhpcztcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbCAtIDQ7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZV8xID0gX2xvb3BfMigpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZV8xID09PSBcImJyZWFrXCIpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wID0gZXQ7XG4gICAgICAgICAgICBpZiAob2MgPCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdCA9IGYgPyBidWYuc3ViYXJyYXkoMCwgaXMgLSAxMiAtIChvYyA9PSAtMiAmJiA4KSAtIChiNChidWYsIGlzIC0gMTYpID09IDB4ODA3NEI1MCAmJiA0KSkgOiBidWYuc3ViYXJyYXkoMCwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGFkZClcbiAgICAgICAgICAgICAgICAgICAgYWRkLnB1c2goZGF0LCAhIWYpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rWysoZiA9PSAyKV0ucHVzaChkYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGYgJiAyKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goYnVmLnN1YmFycmF5KGkpLCBmaW5hbCk7XG4gICAgICAgICAgICB0aGlzLnAgPSBidWYuc3ViYXJyYXkoaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jKVxuICAgICAgICAgICAgICAgIGVycigxMyk7XG4gICAgICAgICAgICB0aGlzLnAgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBkZWNvZGVyIHdpdGggdGhlIHN0cmVhbSwgYWxsb3dpbmcgZm9yIGZpbGVzIGNvbXByZXNzZWQgd2l0aFxuICAgICAqIHRoZSBjb21wcmVzc2lvbiB0eXBlIHByb3ZpZGVkIHRvIGJlIGV4cGFuZGVkIGNvcnJlY3RseVxuICAgICAqIEBwYXJhbSBkZWNvZGVyIFRoZSBkZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgVW56aXAucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGRlY29kZXIpIHtcbiAgICAgICAgdGhpcy5vW2RlY29kZXIuY29tcHJlc3Npb25dID0gZGVjb2RlcjtcbiAgICB9O1xuICAgIHJldHVybiBVbnppcDtcbn0oKSk7XG5leHBvcnQgeyBVbnppcCB9O1xudmFyIG10ID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrID09ICdmdW5jdGlvbicgPyBxdWV1ZU1pY3JvdGFzayA6IHR5cGVvZiBzZXRUaW1lb3V0ID09ICdmdW5jdGlvbicgPyBzZXRUaW1lb3V0IDogZnVuY3Rpb24gKGZuKSB7IGZuKCk7IH07XG5leHBvcnQgZnVuY3Rpb24gdW56aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICB2YXIgdGVybSA9IFtdO1xuICAgIHZhciB0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlcm0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB0ZXJtW2ldKCk7XG4gICAgfTtcbiAgICB2YXIgZmlsZXMgPSB7fTtcbiAgICB2YXIgY2JkID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgbXQoZnVuY3Rpb24gKCkgeyBjYihhLCBiKTsgfSk7XG4gICAgfTtcbiAgICBtdChmdW5jdGlvbiAoKSB7IGNiZCA9IGNiOyB9KTtcbiAgICB2YXIgZSA9IGRhdGEubGVuZ3RoIC0gMjI7XG4gICAgZm9yICg7IGI0KGRhdGEsIGUpICE9IDB4NjA1NEI1MDsgLS1lKSB7XG4gICAgICAgIGlmICghZSB8fCBkYXRhLmxlbmd0aCAtIGUgPiA2NTU1OCkge1xuICAgICAgICAgICAgY2JkKGVycigxMywgMCwgMSksIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHRBbGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgO1xuICAgIHZhciBsZnQgPSBiMihkYXRhLCBlICsgOCk7XG4gICAgaWYgKGxmdCkge1xuICAgICAgICB2YXIgYyA9IGxmdDtcbiAgICAgICAgdmFyIG8gPSBiNChkYXRhLCBlICsgMTYpO1xuICAgICAgICB2YXIgeiA9IG8gPT0gNDI5NDk2NzI5NSB8fCBjID09IDY1NTM1O1xuICAgICAgICBpZiAoeikge1xuICAgICAgICAgICAgdmFyIHplID0gYjQoZGF0YSwgZSAtIDEyKTtcbiAgICAgICAgICAgIHogPSBiNChkYXRhLCB6ZSkgPT0gMHg2MDY0QjUwO1xuICAgICAgICAgICAgaWYgKHopIHtcbiAgICAgICAgICAgICAgICBjID0gbGZ0ID0gYjQoZGF0YSwgemUgKyAzMik7XG4gICAgICAgICAgICAgICAgbyA9IGI0KGRhdGEsIHplICsgNDgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmbHRyID0gb3B0cyAmJiBvcHRzLmZpbHRlcjtcbiAgICAgICAgdmFyIF9sb29wXzMgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgdmFyIF9hID0gemgoZGF0YSwgbywgeiksIGNfMSA9IF9hWzBdLCBzYyA9IF9hWzFdLCBzdSA9IF9hWzJdLCBmbiA9IF9hWzNdLCBubyA9IF9hWzRdLCBvZmYgPSBfYVs1XSwgYiA9IHNsemgoZGF0YSwgb2ZmKTtcbiAgICAgICAgICAgIG8gPSBubztcbiAgICAgICAgICAgIHZhciBjYmwgPSBmdW5jdGlvbiAoZSwgZCkge1xuICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRBbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgY2JkKGUsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc1tmbl0gPSBkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tbGZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JkKG51bGwsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFmbHRyIHx8IGZsdHIoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGZuLFxuICAgICAgICAgICAgICAgIHNpemU6IHNjLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2l6ZTogc3UsXG4gICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNfMVxuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNfMSlcbiAgICAgICAgICAgICAgICAgICAgY2JsKG51bGwsIHNsYyhkYXRhLCBiLCBiICsgc2MpKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjXzEgPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5mbCA9IGRhdGEuc3ViYXJyYXkoYiwgYiArIHNjKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjIDwgMzIwMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNibChudWxsLCBpbmZsYXRlU3luYyhpbmZsLCBuZXcgdTgoc3UpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNibChlLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtLnB1c2goaW5mbGF0ZShpbmZsLCB7IHNpemU6IHN1IH0sIGNibCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNibChlcnIoMTQsICd1bmtub3duIGNvbXByZXNzaW9uIHR5cGUgJyArIGNfMSwgMSksIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNibChudWxsLCBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjOyArK2kpIHtcbiAgICAgICAgICAgIF9sb29wXzMoaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBjYmQobnVsbCwge30pO1xuICAgIHJldHVybiB0QWxsO1xufVxuLyoqXG4gKiBTeW5jaHJvbm91c2x5IGRlY29tcHJlc3NlcyBhIFpJUCBhcmNoaXZlLiBQcmVmZXIgdXNpbmcgYHVuemlwYCBmb3IgYmV0dGVyXG4gKiBwZXJmb3JtYW5jZSB3aXRoIG1vcmUgdGhhbiBvbmUgZmlsZS5cbiAqIEBwYXJhbSBkYXRhIFRoZSByYXcgY29tcHJlc3NlZCBaSVAgZmlsZVxuICogQHBhcmFtIG9wdHMgVGhlIFpJUCBleHRyYWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgZmlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuemlwU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgdmFyIGZpbGVzID0ge307XG4gICAgdmFyIGUgPSBkYXRhLmxlbmd0aCAtIDIyO1xuICAgIGZvciAoOyBiNChkYXRhLCBlKSAhPSAweDYwNTRCNTA7IC0tZSkge1xuICAgICAgICBpZiAoIWUgfHwgZGF0YS5sZW5ndGggLSBlID4gNjU1NTgpXG4gICAgICAgICAgICBlcnIoMTMpO1xuICAgIH1cbiAgICA7XG4gICAgdmFyIGMgPSBiMihkYXRhLCBlICsgOCk7XG4gICAgaWYgKCFjKVxuICAgICAgICByZXR1cm4ge307XG4gICAgdmFyIG8gPSBiNChkYXRhLCBlICsgMTYpO1xuICAgIHZhciB6ID0gbyA9PSA0Mjk0OTY3Mjk1IHx8IGMgPT0gNjU1MzU7XG4gICAgaWYgKHopIHtcbiAgICAgICAgdmFyIHplID0gYjQoZGF0YSwgZSAtIDEyKTtcbiAgICAgICAgeiA9IGI0KGRhdGEsIHplKSA9PSAweDYwNjRCNTA7XG4gICAgICAgIGlmICh6KSB7XG4gICAgICAgICAgICBjID0gYjQoZGF0YSwgemUgKyAzMik7XG4gICAgICAgICAgICBvID0gYjQoZGF0YSwgemUgKyA0OCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZsdHIgPSBvcHRzICYmIG9wdHMuZmlsdGVyO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYzsgKytpKSB7XG4gICAgICAgIHZhciBfYSA9IHpoKGRhdGEsIG8sIHopLCBjXzIgPSBfYVswXSwgc2MgPSBfYVsxXSwgc3UgPSBfYVsyXSwgZm4gPSBfYVszXSwgbm8gPSBfYVs0XSwgb2ZmID0gX2FbNV0sIGIgPSBzbHpoKGRhdGEsIG9mZik7XG4gICAgICAgIG8gPSBubztcbiAgICAgICAgaWYgKCFmbHRyIHx8IGZsdHIoe1xuICAgICAgICAgICAgbmFtZTogZm4sXG4gICAgICAgICAgICBzaXplOiBzYyxcbiAgICAgICAgICAgIG9yaWdpbmFsU2l6ZTogc3UsXG4gICAgICAgICAgICBjb21wcmVzc2lvbjogY18yXG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBpZiAoIWNfMilcbiAgICAgICAgICAgICAgICBmaWxlc1tmbl0gPSBzbGMoZGF0YSwgYiwgYiArIHNjKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGNfMiA9PSA4KVxuICAgICAgICAgICAgICAgIGZpbGVzW2ZuXSA9IGluZmxhdGVTeW5jKGRhdGEuc3ViYXJyYXkoYiwgYiArIHNjKSwgbmV3IHU4KHN1KSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZXJyKDE0LCAndW5rbm93biBjb21wcmVzc2lvbiB0eXBlICcgKyBjXzIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWxlcztcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBzaW1wbGUtaGVhZGVyL2hlYWRlciAqL1xuXG4vKiFcbiAqIGNyeFRvWmlwXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgUm9iIFd1IDxyb2JAcm9id3Uubmw+XG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcnhUb1ppcChidWY6IEJ1ZmZlcikge1xuICAgIGZ1bmN0aW9uIGNhbGNMZW5ndGgoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSAwO1xuXG4gICAgICAgIGxlbmd0aCArPSBhIDw8IDA7XG4gICAgICAgIGxlbmd0aCArPSBiIDw8IDg7XG4gICAgICAgIGxlbmd0aCArPSBjIDw8IDE2O1xuICAgICAgICBsZW5ndGggKz0gZCA8PCAyNCA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyA1MCA0YiAwMyAwNFxuICAgIC8vIFRoaXMgaXMgYWN0dWFsbHkgYSB6aXAgZmlsZVxuICAgIGlmIChidWZbMF0gPT09IDgwICYmIGJ1ZlsxXSA9PT0gNzUgJiYgYnVmWzJdID09PSAzICYmIGJ1ZlszXSA9PT0gNCkge1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIC8vIDQzIDcyIDMyIDM0IChDcjI0KVxuICAgIGlmIChidWZbMF0gIT09IDY3IHx8IGJ1ZlsxXSAhPT0gMTE0IHx8IGJ1ZlsyXSAhPT0gNTAgfHwgYnVmWzNdICE9PSA1Mikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGhlYWRlcjogRG9lcyBub3Qgc3RhcnQgd2l0aCBDcjI0XCIpO1xuICAgIH1cblxuICAgIC8vIDAyIDAwIDAwIDAwXG4gICAgLy8gb3JcbiAgICAvLyAwMyAwMCAwMCAwMFxuICAgIGNvbnN0IGlzVjMgPSBidWZbNF0gPT09IDM7XG4gICAgY29uc3QgaXNWMiA9IGJ1Zls0XSA9PT0gMjtcblxuICAgIGlmICgoIWlzVjIgJiYgIWlzVjMpIHx8IGJ1Zls1XSB8fCBidWZbNl0gfHwgYnVmWzddKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgY3J4IGZvcm1hdCB2ZXJzaW9uIG51bWJlci5cIik7XG4gICAgfVxuXG4gICAgaWYgKGlzVjIpIHtcbiAgICAgICAgY29uc3QgcHVibGljS2V5TGVuZ3RoID0gY2FsY0xlbmd0aChidWZbOF0sIGJ1Zls5XSwgYnVmWzEwXSwgYnVmWzExXSk7XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZUxlbmd0aCA9IGNhbGNMZW5ndGgoYnVmWzEyXSwgYnVmWzEzXSwgYnVmWzE0XSwgYnVmWzE1XSk7XG5cbiAgICAgICAgLy8gMTYgPSBNYWdpYyBudW1iZXIgKDQpLCBDUlggZm9ybWF0IHZlcnNpb24gKDQpLCBsZW5ndGhzICgyeDQpXG4gICAgICAgIGNvbnN0IHppcFN0YXJ0T2Zmc2V0ID0gMTYgKyBwdWJsaWNLZXlMZW5ndGggKyBzaWduYXR1cmVMZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIGJ1Zi5zdWJhcnJheSh6aXBTdGFydE9mZnNldCwgYnVmLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIHYzIGZvcm1hdCBoYXMgaGVhZGVyIHNpemUgYW5kIHRoZW4gaGVhZGVyXG4gICAgY29uc3QgaGVhZGVyU2l6ZSA9IGNhbGNMZW5ndGgoYnVmWzhdLCBidWZbOV0sIGJ1ZlsxMF0sIGJ1ZlsxMV0pO1xuICAgIGNvbnN0IHppcFN0YXJ0T2Zmc2V0ID0gMTIgKyBoZWFkZXJTaXplO1xuXG4gICAgcmV0dXJuIGJ1Zi5zdWJhcnJheSh6aXBTdGFydE9mZnNldCwgYnVmLmxlbmd0aCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLElBQU87QUFBUDtBQUFBO0FBQUE7QUFBQSxJQUFPLG1CQUFRO0FBQUE7QUFBQTs7O0FDQWYsSUFBTztBQUFQO0FBQUE7QUFBQTtBQUFBLElBQU8scUJBQVE7QUFBQTtBQUFBOzs7QUNBZixJQVdhO0FBWGI7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBSU8sSUFBTSx1QkFBdUIsYUFBYSxtQkFBVSxxQkFBWSx3QkFBd0Isd0JBQWU7QUFBQTtBQUFBOzs7QUNTdkcsU0FBUyxJQUFJLEtBQWEsVUFBZ0MsQ0FBQyxHQUFHO0FBQ2pFLFNBQU8sSUFBSSxRQUFnQixDQUFDLFNBQVMsV0FBVztBQUM1QyxpQkFBQUEsUUFBTSxJQUFJLEtBQUssU0FBUyxTQUFPO0FBQzNCLFlBQU0sRUFBRSxZQUFZLGVBQWUsUUFBUSxJQUFJO0FBQy9DLFVBQUksY0FBZTtBQUNmLGVBQU8sS0FBSyxPQUFPLEdBQUcsZUFBZSxtQkFBbUIsS0FBSztBQUNqRSxVQUFJLGNBQWU7QUFDZixlQUFPLEtBQUssUUFBUSxJQUFJLFFBQVEsVUFBVyxPQUFPLENBQUM7QUFFdkQsWUFBTSxTQUFTLENBQUM7QUFDaEIsVUFBSSxHQUFHLFNBQVMsTUFBTTtBQUV0QixVQUFJLEdB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBZixJQUFBRSxrQkFBQTtBQUFBLElBT0FDO0FBUEEsSUFBQUMsZUFB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QUFRLGVBQWUsV0FBVyxrQkFBa0IsQ0FBQyxFQUFFLGlCQUFpQixhQUFhLEdBQUcsT0FBTztBQUMzRixVQUFJLGlCQUFpQjtBQUNqQixZQUFJLGlCQUFpQjtBQUNqQixtQkFBUyxlQUFlO0FBSTVCLFlBQUksaUJBQWlCLGNBQWM7QUFDL0IsZ0JBQU0sU0FBUyxXQUFXLGlCQUFpQixjQUFjO0FBQ3pELGNBQUk7QUFDQSw0QkFBZ0IsVUFBVSxDQUFDLFVBQVU7QUFBQSxRQUM3QztBQUFBLE1BQ0o7QUFFQSxTQUFHLEVBQUUsUUFBUSxPQUFPLGdCQUFnQixDQUFDO0FBQUEsSUFDekMsQ0FBQztBQUtELDhCQUFRLGVBQWUsV0FBVyxvQkFBb0IsTUFBTTtBQUFBLElBQUU7QUFBQSxFQUNsRSxDQUFDO0FBQ0w7QUFFQSxJQUFJLE1BQW9CO0FBQ3BCO0FBQ0o7IiwKICAibmFtZXMiOiBbImh0dHBzIiwgImVycm9yIiwgIm5hdGl2ZV9leHBvcnRzIiwgImluaXRfbmF0aXZlIiwgInBhdGgiLCAicCIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW1wb3J0X3BhdGgiLCAiZXJyIiwgImltcG9ydF9lbGVjdHJvbiIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW5pdF9uYXRpdmUiLCAiXyIsICJuYXRpdmVfZXhwb3J0cyIsICJpbXBvcnRfZWxlY3Ryb24iLCAiaW5pdF9uYXRpdmUiLCAiXyIsICJuYXRpdmVfZXhwb3J0cyIsICJwYXRoIiwgIm9zIiwgIm1ldGFkYXRhIiwgImltcG9ydF9jaGlsZF9wcm9jZXNzIiwgImltcG9ydF9wYXRoIiwgImluaXRfbmF0aXZlIiwgImVycm9yIiwgInBhdGgiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9wYXRoIiwgImZzIiwgImVyciIsICJwYXRoIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJpbml0X3NldHRpbmdzIiwgImluaXRfbmF0aXZlIiwgIm5hdGl2ZV9leHBvcnRzIiwgInBhdGgiLCAibG9nc0RpciIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImluaXRfbmF0aXZlIiwgImluaXRfc2V0dGluZ3MiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2h0dHBzIiwgImluaXRfbmF0aXZlIiwgIm5hdGl2ZV9leHBvcnRzIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfcHJvbWlzZXMiLCAiaW1wb3J0X3BhdGgiLCAiaW5pdF9uYXRpdmUiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImluaXRfbmF0aXZlIiwgIl8iLCAibmF0aXZlX2V4cG9ydHMiLCAiaW5pdF9uYXRpdmUiLCAiaW5pdF9uYXRpdmUiLCAibmF0aXZlX2V4cG9ydHMiLCAiaW1wb3J0X2VsZWN0cm9uIiwgInByb3RvY29sIiwgImltcG9ydF9lbGVjdHJvbiIsICJwYXRoIiwgImZkIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfZnMiLCAiaW1wb3J0X3Byb21pc2VzIiwgImltcG9ydF9wYXRoIiwgInByb3RvY29sIiwgImFwcCIsICJlcnIiLCAiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfcGF0aCIsICJCcm93c2VyV2luZG93IiwgImVsZWN0cm9uIiwgImltcG9ydF9lbGVjdHJvbiIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfZWxlY3Ryb24iLCAicmVxdWlyZSIsICJjIiwgInN0YXJ0IiwgInAiLCAibCIsICJ0ZCIsICJpbml0IiwgIl9hIiwgImluaXQiLCAiZXJyIiwgImRhdCIsICJfYSIsICJfYSIsICJpIiwgIl9hIiwgImUiLCAiaW1wb3J0X2ZzIiwgImltcG9ydF9wcm9taXNlcyIsICJpbXBvcnRfcGF0aCIsICJ6aXBTdGFydE9mZnNldCIsICJlcnIiLCAiZnNDb25zdGFudHMiLCAiZXJyIl0KfQo=
