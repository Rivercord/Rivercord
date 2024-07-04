// Rivercord f0fe645b
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var sn=Object.create;var _e=Object.defineProperty;var cn=Object.getOwnPropertyDescriptor;var ln=Object.getOwnPropertyNames;var un=Object.getPrototypeOf,fn=Object.prototype.hasOwnProperty;var V=(e,t)=>()=>(e&&(t=e(e=0)),t);var q=(e,t)=>{for(var r in t)_e(e,r,{get:t[r],enumerable:!0})},Ut=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ln(t))!fn.call(e,i)&&i!==r&&_e(e,i,{get:()=>t[i],enumerable:!(n=cn(t,i))||n.enumerable});return e};var H=(e,t,r)=>(r=e!=null?sn(un(e)):{},Ut(t||!e||!e.__esModule?_e(r,"default",{value:e,enumerable:!0}):r,e)),pn=e=>Ut(_e({},"__esModule",{value:!0}),e);var l=V(()=>{"use strict"});var Ce=V(()=>{"use strict";l()});var Se,qe=V(()=>{l();Se="f0fe645b"});var Q,Qe=V(()=>{l();Q="Rivercord/Rivercord"});var zt,Ft=V(()=>{"use strict";l();qe();Qe();zt=`Rivercord/${Se}${Q?` (https://github.com/${Q})`:""}`});function le(e,t={}){return new Promise((r,n)=>{jt.default.get(e,t,i=>{let{statusCode:a,statusMessage:o,headers:s}=i;if(a>=400)return void n(`${a}: ${o} - ${e}`);if(a>=300)return void r(le(s.location,t));let c=[];i.on("error",n),i.on("data",u=>c.push(u)),i.once("end",()=>r(Buffer.concat(c)))})})}var jt,et=V(()=>{"use strict";l();jt=H(require("https"))});function xe(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var Zt,Wt=V(()=>{"use strict";l();Zt=["rivercordDesktopMain.js","rivercordDesktopPreload.js","rivercordDesktopRenderer.js","rivercordDesktopRenderer.css"]});var vn={};async function gn(e){return le(hn+e,{headers:{Accept:"application/vnd.github+json","User-Agent":zt}})}async function dn(){await nt();let e=await gn(`/compare/${Se}...HEAD`);return JSON.parse(e.toString("utf-8")).commits.map(r=>({hash:r.sha.slice(0,7),author:r.author.login,message:r.commit.message.split(`
`)[0]}))}async function nt(){return Zt.forEach(e=>{tt.push([e,`https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${e}`])}),await mn(),!0}async function mn(){return await Promise.all(tt.map(async([e,t])=>(0,Bt.writeFile)((0,Vt.join)(__dirname,e),await le(t)))),tt=[],!0}var Te,Bt,Vt,hn,tt,Ht=V(()=>{"use strict";l();Ce();Ft();Te=require("electron"),Bt=require("fs/promises"),Vt=require("path");qe();Qe();et();Wt();hn=`https://api.github.com/repos/${Q}`,tt=[];Te.ipcMain.handle("RivercordGetRepo",xe(()=>`https://github.com/${Q}`));Te.ipcMain.handle("RivercordGetUpdates",xe(dn));Te.ipcMain.handle("RivercordUpdate",xe(nt));Te.ipcMain.handle("RivercordBuild",xe(nt));console.log("[Rivercord] Updater",{gitHash:Se,gitRemote:Q,__dirname})});l();var oe=require("electron"),nn=require("path");l();l();Ht();l();Ce();var Ct=require("electron");l();var ot={};q(ot,{fetchTrackData:()=>In});l();var Kt=require("child_process"),Jt=require("util"),Xt=(0,Jt.promisify)(Kt.execFile);async function it(e){let{stdout:t}=await Xt("osascript",e.map(r=>["-e",r]).flat());return t}function $t(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}var Yt={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},P=null;async function yn({id:e,name:t,artist:r,album:n}){if(e===P?.id){if("data"in P)return P.data;if("failures"in P&&P.failures>=5)return null}try{let[i,a]=await Promise.all([fetch($t("songs",r+" "+n+" "+t),Yt).then(f=>f.json()),fetch($t("artists",r.split(/ *[,&] */)[0]),Yt).then(f=>f.json())]),o=i?.songs?.data[0]?.attributes.url,s=i?.songs?.data[0]?.id?`https://song.link/i/${i?.songs?.data[0]?.id}`:void 0,c=i?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=a?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return P={id:e,data:{appleMusicLink:o,songLink:s,albumArtwork:c,artistArtwork:u}},P.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),P={id:e,failures:(e===P?.id&&"failures"in P?P.failures:0)+1},null}}async function In(){try{await Xt("pgrep",["^Music$"])}catch{return null}if(await it(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await it(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await it(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[n,i,a,o,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await yn({id:n,name:i,artist:o,album:a});return{name:i,album:a,artist:o,playerPosition:t,duration:c,...u}}var at={};q(at,{initDevtoolsOpenEagerLoad:()=>wn});l();function wn(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var ir={};l();l();Ce();l();var Ee=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,n=""){let i=this;return new Proxy(t,{get(a,o){let s=a[o];return!(o in a)&&i.getDefaultValue&&(s=i.getDefaultValue({target:a,key:o,root:r,path:n})),typeof s=="object"&&s!==null&&!Array.isArray(s)?i.makeProxy(s,r,`${n}${n&&"."}${o}`):s},set(a,o,s){if(a[o]===s)return!0;Reflect.set(a,o,s);let c=`${n}${n&&"."}${o}`;return i.globalListeners.forEach(u=>u(s,c)),i.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let n=t,i=r.split(".");for(let a of i){if(!n){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}n=n[a]}this.pathListeners.get(r)?.forEach(a=>a(n))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let n=this.pathListeners.get(t)??new Set;n.add(r),this.pathListeners.set(t,n)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let n=this.pathListeners.get(t);!n||(n.delete(r),n.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}};l();function st(e,t){for(let r in t){let n=t[r];typeof n=="object"&&!Array.isArray(n)?(e[r]??={},st(e[r],n)):e[r]??=n}return e}var Ge=require("electron"),te=require("fs");l();var qt=require("electron"),$=require("path"),ue=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,$.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,$.join)(qt.app.getPath("userData"),"..","Rivercord")),fe=(0,$.join)(ue,"settings"),ee=(0,$.join)(ue,"themes"),Me=(0,$.join)(fe,"quickCss.css"),ct=(0,$.join)(fe,"settings.json"),lt=(0,$.join)(fe,"native-settings.json"),Qt=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"];(0,te.mkdirSync)(fe,{recursive:!0});function tr(e,t){try{return JSON.parse((0,te.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var k=new Ee(tr("renderer",ct));k.addGlobalChangeListener(()=>{try{(0,te.writeFileSync)(ct,JSON.stringify(k.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Ge.ipcMain.handle("RivercordGetSettingsDir",()=>fe);Ge.ipcMain.on("RivercordGetSettings",e=>e.returnValue=k.plain);Ge.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{k.setData(t,r)});var An={plugins:{}},rr=tr("native",lt);st(rr,An);var er=new Ee(rr);er.addGlobalChangeListener(()=>{try{(0,te.writeFileSync)(lt,JSON.stringify(er.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}});var nr=require("electron");nr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://open.spotify.com/embed/")){let i=k.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;n.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})});var ar={};l();var or=require("electron");or.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://www.youtube.com/")){if(!k.store.plugins?.FixYoutubeEmbeds?.enabled)return;n.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})});var pt={};q(pt,{checkffmpeg:()=>Pn,checkytdlp:()=>On,execute:()=>Rn,getStdout:()=>Mn,interrupt:()=>_n,isFfmpegAvailable:()=>Ln,isYtdlpAvailable:()=>Gn,start:()=>Sn,stop:()=>xn});l();var K=require("child_process"),w=H(require("fs")),sr=H(require("os")),ft=H(require("path")),z=null,Y="",Le="",ut=!1,ne=!1,pe=null,he=null,Ue=()=>z??process.cwd(),re=e=>ft.default.join(Ue(),e),cr=()=>{!z||w.readdirSync(z).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>w.unlinkSync(re(e)))},Ne=e=>(Y+=e,Y=Y.replace(/^.*\r([^\n])/gm,"$1")),F=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),Le+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),lr=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);function ur(e){F(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,n)=>{pe=(0,K.spawn)("yt-dlp",e,{cwd:Ue()}),pe.stdout.on("data",i=>Ne(i)),pe.stderr.on("data",i=>{Ne(i),lr(`yt-dlp encountered an error: ${i}`),t+=i}),pe.on("exit",i=>{pe=null,i===0?r(Y):n(new Error(t||`yt-dlp exited with code ${i}`))})})}function Cn(e){F(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,n)=>{he=(0,K.spawn)("ffmpeg",e,{cwd:Ue()}),he.stdout.on("data",i=>Ne(i)),he.stderr.on("data",i=>{Ne(i),lr(`ffmpeg encountered an error: ${i}`),t+=i}),he.on("exit",i=>{he=null,i===0?r(Y):n(new Error(t||`ffmpeg exited with code ${i}`))})})}async function Sn(e,t){return t||=w.mkdtempSync(ft.default.join(sr.default.tmpdir(),"vencord_mediaDownloader_")),w.existsSync(t)||w.mkdirSync(t,{recursive:!0}),z=t,F("Using workdir: ",z),z}async function xn(e){z&&(F("Cleaning up workdir"),w.rmSync(z,{recursive:!0}),z=null)}async function Tn(e){Y="";let t=JSON.parse(await ur(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return Y="",{videoTitle:`${t.title||"video"} (${t.id})`}}function En({videoTitle:e},{maxFileSize:t,format:r}){let n=!!t,i=n?t*.8:0,a=n?t*.2:0,o={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=o;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(ne?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",n?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",n?`[filesize<${i}]`:"").replaceAll("{AUD_SIZE}",n?`[filesize<${a}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return F("Video formated calculated as ",f),F(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${ne}`),{format:f,videoTitle:e}}async function bn({format:e,videoTitle:t},{ytdlpArgs:r,url:n,format:i}){cr();let a=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],o=ne?i==="video"?["--remux-video","webm>webm/mp4"]:i==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await ur([n,...a,...o,...s]);let c=w.readdirSync(Ue()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function Dn({file:e,videoTitle:t},{ffmpegArgs:r,format:n,maxFileSize:i,gifQuality:a}){let o=e.split(".").pop();if(!ne)return F("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:o};let s=["mp3","mp4","webm"],c=w.statSync(re(e)).size,u=r?.filter(Boolean)||[],f=s.includes(o??""),m=!i||c<=i,T=u.length>0;if(f&&m&&!T&&!(n==="gif"))return F("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:o};let Z=parseFloat((0,K.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",re(e)]).toString());if(isNaN(Z))throw"Failed to get video duration.";let d=~~((i?i*7/Z:9999999)/1024),y,A;switch(n){case"audio":y=["-i",re(e),"-b:a",`${d}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y"],A="mp3";break;case"video":default:let _=d<=100?480:d<=500?720:1080;y=["-i",re(e),"-b:v",`${~~(d*.8)}k`,"-b:a",`${~~(d*.2)}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${_}`],A="mp4";break;case"gif":let E,b,S,D;switch(a){case 1:E=5,b=360,S=24,D=5;break;case 2:E=10,b=420,S=32,D=5;break;default:case 3:E=15,b=480,S=64,D=4;break;case 4:E=20,b=540,S=64,D=3;break;case 5:E=30,b=720,S=128,D=1;break}y=["-i",re(e),"-vf",`fps=${E},scale=w=${b}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${S}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${D}`,"-loop","0","-bufsize","1M","-y"],A="gif";break}return await Cn([...y,...u,`remux.${A}`]),{file:`remux.${A}`,videoTitle:t,extension:A}}function kn({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:w.readFileSync(re(e)),title:`${t}.${r}`}}async function Rn(e,t){Le="";try{let r=await Tn(t),n=En(r,t),i=await bn(n,t),a=await Dn(i,t),o=kn(a);return{logs:Le,...o}}catch(r){return{error:r.toString(),logs:Le}}}function Pn(e){try{return(0,K.execFileSync)("ffmpeg",["-version"]),(0,K.execFileSync)("ffprobe",["-version"]),ne=!0,!0}catch{return ne=!1,!1}}async function On(e){try{return(0,K.execFileSync)("yt-dlp",["--version"]),ut=!0,!0}catch{return ut=!1,!1}}async function _n(e){F("Interrupting..."),pe?.kill(),he?.kill(),cr()}var Mn=()=>Y,Gn=()=>ut,Ln=()=>ne;var yt={};q(yt,{chooseDir:()=>Hn,deleteFileNative:()=>Zn,getDefaultNativeDataDir:()=>J,getDefaultNativeImageDir:()=>be,getImageNative:()=>Fn,getLogsFromFs:()=>Bn,getNativeSavedImages:()=>zn,getSettings:()=>je,init:()=>vr,initDirs:()=>mr,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>Un,showItemInFolder:()=>$n,writeImageNative:()=>jn,writeLogs:()=>Vn});l();var M=require("node:fs/promises"),ie=H(require("node:path"));l();var ze=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}};var Ze=require("electron");l();var gt=H(require("fs/promises")),pr=H(require("path"));l();var Fe=require("fs/promises"),fr=H(require("path"));async function Nn(e){try{return await(0,Fe.access)(e),!0}catch{return!1}}async function ge(e){await Nn(e)||await(0,Fe.mkdir)(e)}function ht(e){return fr.default.parse(e).name}async function je(){try{let e=await gt.default.readFile(await hr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await J(),imageCacheDir:await be()};try{await dt(t)}catch{}return t}}async function dt(e){!e||await gt.default.writeFile(await hr(),JSON.stringify(e,null,4),"utf8")}async function hr(){let e=await J();return await ge(e),pr.default.join(e,"mlSettings.json")}function Un(){}var de=new Map,zn=()=>de,mt,vt,gr=async()=>vt??await be(),dr=async()=>mt??await J();async function mr(){let{logsDir:e,imageCacheDir:t}=await je();mt=e||await J(),vt=t||await be()}mr();async function vr(e){let t=await gr();await ge(t);let r=await(0,M.readdir)(t);for(let n of r){let i=ht(n);de.set(i,ie.default.join(t,n))}}async function Fn(e,t){let r=de.get(t);return r?await(0,M.readFile)(r):null}async function jn(e,t,r){if(!t||!r)return;let n=await gr(),i=ht(t);if(de.get(i))return;let o=ie.default.join(n,t);await ge(n),await(0,M.writeFile)(o,r),de.set(i,o)}async function Zn(e,t){let r=de.get(t);!r||await(0,M.unlink)(r)}var yr="message-logger-logs.json",Wn=new ze;async function Bn(e){let t=await dr();await ge(t);try{return JSON.parse(await(0,M.readFile)(ie.default.join(t,yr),"utf-8"))}catch{}return null}async function Vn(e,t){let r=await dr();Wn.push(()=>(0,M.writeFile)(ie.default.join(r,yr),t))}async function be(){return ie.default.join(await J(),"savedImages")}async function J(){return ie.default.join(ue,"MessageLoggerData")}async function Hn(e,t){let r=await je(),n=r[t]||await J(),a=(await Ze.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:n})).filePaths[0];if(!a)throw Error("Invalid Directory");switch(r[t]=a,await dt(r),t){case"logsDir":mt=a;break;case"imageCacheDir":vt=a;break}return t==="imageCacheDir"&&await vr(e),a}async function $n(e,t){Ze.shell.showItemInFolder(t)}var It={};q(It,{resolveRedirect:()=>Kn});l();var Ir=require("https"),Yn=/^https:\/\/(spotify\.link|s\.team)\/.+$/;function wr(e){return new Promise((t,r)=>{let n=(0,Ir.request)(new URL(e),{method:"HEAD"},i=>{t(i.headers.location?wr(i.headers.location):e)});n.on("error",r),n.end()})}async function Kn(e,t){return Yn.test(t)?wr(t):t}var wt={};q(wt,{readRecording:()=>Jn});l();var Ar=require("electron"),Cr=require("fs/promises"),De=require("path");async function Jn(e,t){t=(0,De.normalize)(t);let r=(0,De.basename)(t),n=(0,De.normalize)(Ar.app.getPath("userData")+"/");if(console.log(r,n,t),r!=="recording.ogg"||!t.startsWith(n))return null;try{let i=await(0,Cr.readFile)(t);return new Uint8Array(i.buffer)}catch{return null}}var Tr={};l();var xr=require("electron");l();var Sr=`/* eslint-disable */

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
});`;xr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.includes("discordsays")&&n.url.includes("youtube.com")){if(!k.store.plugins?.WatchTogetherAdblock?.enabled)return;n.executeJavaScript(Sr)}})})});var At={};q(At,{sendToOverlay:()=>Xn});l();var br=require("dgram"),Er;function Xn(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);Er??=(0,br.createSocket)("udp4"),Er.send(r,42069,"127.0.0.1")}var Dr={AppleMusicRichPresence:ot,ConsoleShortcuts:at,FixSpotifyEmbeds:ir,FixYoutubeEmbeds:ar,MediaDownloader:pt,MessageLoggerEnhanced:yt,OpenInApp:It,VoiceMessages:wt,WatchTogetherAdblock:Tr,XSOverlay:At};var kr={};for(let[e,t]of Object.entries(Dr)){let r=Object.entries(t);if(!r.length)continue;let n=kr[e]={};for(let[i,a]of r){let o=`RivercordPluginNative_${e}_${i}`;Ct.ipcMain.handle(o,a),n[i]=o}}Ct.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=kr});l();Ce();var v=require("electron");l();var Rr="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo=";var ke=require("fs"),ve=require("fs/promises"),me=require("path");l();var qn=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,Qn=/^\\@/;function St(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function Pr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Or(e,t){if(!e)return St(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return St(t);let n={},i="",a="";for(let o of r.split(qn))if(o.length!==0)if(o.charAt(0)==="@"&&o.charAt(1)!==" "){n[i]=a.trim();let s=o.indexOf(" ");i=o.substring(1,s),a=o.substring(s+1)}else a+=" "+o.replace("\\n",`
`).replace(Qn,"@");return n[i]=a.trim(),delete n[""],St(t,n)}l();var _r=require("electron");function Mr(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":_r.shell.openExternal(t)}return{action:"deny"}})}(0,ke.mkdirSync)(ee,{recursive:!0});function xt(e,t){let r=(0,me.normalize)(e),n=(0,me.join)(e,t),i=(0,me.normalize)(n);return i.startsWith(r)?i:null}function ei(){return(0,ve.readFile)(Me,"utf-8").catch(()=>"")}async function ti(){let e=await(0,ve.readdir)(ee).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let n=await Gr(r).then(Pr).catch(()=>null);n!=null&&t.push(Or(n,r))}return t}function Gr(e){e=e.replace(/\?v=\d+$/,"");let t=xt(ee,e);return t?(0,ve.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}v.ipcMain.handle("RivercordOpenQuickCss",()=>v.shell.openPath(Me));v.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!Qt.includes(r))throw"Disallowed protocol.";v.shell.openExternal(t)});v.ipcMain.handle("RivercordGetQuickCss",()=>ei());v.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,ke.writeFileSync)(Me,t));v.ipcMain.handle("RivercordGetThemesDir",()=>ee);v.ipcMain.handle("RivercordGetThemesList",()=>ti());v.ipcMain.handle("RivercordGetThemeData",(e,t)=>Gr(t));v.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${v.systemPreferences.getAccentColor?.()||""}`}));v.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=v.BrowserWindow.getAllWindows().find(n=>n.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new v.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,me.join)(__dirname,"rivercordDesktopPreload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});Mr(r),await r.loadURL(`data:text/html;base64,${Rr}`)});l();var en=require("electron");l();var Ur=require("module"),ri=(0,Ur.createRequire)("/"),Be,ni=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Be=ri("worker_threads").Worker}catch{}var ii=Be?function(e,t,r,n,i){var a=!1,o=new Be(e+ni,{eval:!0}).on("error",function(s){return i(s,null)}).on("message",function(s){return i(null,s)}).on("exit",function(s){s&&!a&&i(new Error("exited with code "+s),null)});return o.postMessage(r,n),o.terminate=function(){return a=!0,Be.prototype.terminate.call(o)},o}:function(e,t,r,n,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var a=function(){};return{terminate:a,postMessage:a}},C=Uint8Array,X=Uint16Array,bt=Uint32Array,Dt=new C([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),kt=new C([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),zr=new C([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Fr=function(e,t){for(var r=new X(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var i=new bt(r[30]),n=1;n<30;++n)for(var a=r[n];a<r[n+1];++a)i[a]=a-r[n]<<5|n;return[r,i]},jr=Fr(Dt,2),Rt=jr[0],oi=jr[1];Rt[28]=258,oi[258]=28;var Zr=Fr(kt,0),Wr=Zr[0],ca=Zr[1],$e=new X(32768);for(g=0;g<32768;++g)j=(g&43690)>>>1|(g&21845)<<1,j=(j&52428)>>>2|(j&13107)<<2,j=(j&61680)>>>4|(j&3855)<<4,$e[g]=((j&65280)>>>8|(j&255)<<8)>>>1;var j,g,ye=function(e,t,r){for(var n=e.length,i=0,a=new X(t);i<n;++i)e[i]&&++a[e[i]-1];var o=new X(t);for(i=0;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(r){s=new X(1<<t);var c=15-t;for(i=0;i<n;++i)if(e[i])for(var u=i<<4|e[i],f=t-e[i],m=o[e[i]-1]++<<f,T=m|(1<<f)-1;m<=T;++m)s[$e[m]>>>c]=u}else for(s=new X(n),i=0;i<n;++i)e[i]&&(s[i]=$e[o[e[i]-1]++]>>>15-e[i]);return s},Re=new C(288);for(g=0;g<144;++g)Re[g]=8;var g;for(g=144;g<256;++g)Re[g]=9;var g;for(g=256;g<280;++g)Re[g]=7;var g;for(g=280;g<288;++g)Re[g]=8;var g,Br=new C(32);for(g=0;g<32;++g)Br[g]=5;var g;var Vr=ye(Re,9,1);var Hr=ye(Br,5,1),Ve=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},R=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},He=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},$r=function(e){return(e+7)/8|0},Ye=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var n=new(e.BYTES_PER_ELEMENT==2?X:e.BYTES_PER_ELEMENT==4?bt:C)(r-t);return n.set(e.subarray(t,r)),n};var Yr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],x=function(e,t,r){var n=new Error(t||Yr[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,x),!r)throw n;return n},Kr=function(e,t,r){var n=e.length;if(!n||r&&r.f&&!r.l)return t||new C(0);var i=!t||r,a=!r||r.i;r||(r={}),t||(t=new C(n*3));var o=function(Gt){var Lt=t.length;if(Gt>Lt){var Nt=new C(Math.max(Lt*2,Gt));Nt.set(t),t=Nt}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,m=r.d,T=r.m,N=r.n,Z=n*8;do{if(!f){s=R(e,c,1);var W=R(e,c+1,3);if(c+=3,W)if(W==1)f=Vr,m=Hr,T=9,N=5;else if(W==2){var _=R(e,c,31)+257,E=R(e,c+10,15)+4,b=_+R(e,c+5,31)+1;c+=14;for(var S=new C(b),D=new C(19),I=0;I<E;++I)D[zr[I]]=R(e,c+I*3,7);c+=E*3;for(var U=Ve(D),Pe=(1<<U)-1,ae=ye(D,U,1),I=0;I<b;){var we=ae[R(e,c,Pe)];c+=we&15;var d=we>>>4;if(d<16)S[I++]=d;else{var se=0,Oe=0;for(d==16?(Oe=3+R(e,c,3),c+=2,se=S[I-1]):d==17?(Oe=3+R(e,c,7),c+=3):d==18&&(Oe=11+R(e,c,127),c+=7);Oe--;)S[I++]=se}}var Ot=S.subarray(0,_),B=S.subarray(_);T=Ve(Ot),N=Ve(B),f=ye(Ot,T,1),m=ye(B,N,1)}else x(1);else{var d=$r(c)+4,y=e[d-4]|e[d-3]<<8,A=d+y;if(A>n){a&&x(0);break}i&&o(u+y),t.set(e.subarray(d,A),u),r.b=u+=y,r.p=c=A*8,r.f=s;continue}if(c>Z){a&&x(0);break}}i&&o(u+131072);for(var on=(1<<T)-1,an=(1<<N)-1,Ke=c;;Ke=c){var se=f[He(e,c)&on],ce=se>>>4;if(c+=se&15,c>Z){a&&x(0);break}if(se||x(2),ce<256)t[u++]=ce;else if(ce==256){Ke=c,f=null;break}else{var _t=ce-254;if(ce>264){var I=ce-257,Ae=Dt[I];_t=R(e,c,(1<<Ae)-1)+Rt[I],c+=Ae}var Je=m[He(e,c)&an],Xe=Je>>>4;Je||x(3),c+=Je&15;var B=Wr[Xe];if(Xe>3){var Ae=kt[Xe];B+=He(e,c)&(1<<Ae)-1,c+=Ae}if(c>Z){a&&x(0);break}i&&o(u+131072);for(var Mt=u+_t;u<Mt;u+=4)t[u]=t[u-B],t[u+1]=t[u+1-B],t[u+2]=t[u+2-B],t[u+3]=t[u+3-B];u=Mt}}r.l=f,r.p=Ke,r.b=u,r.f=s,f&&(s=1,r.m=T,r.d=m,r.n=N)}while(!s);return u==t.length?t:Ye(t,0,u)};var ai=new C(0);var si=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},Lr=function(e,t,r){for(var n=e(),i=e.toString(),a=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var s=n[o],c=a[o];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var m in s.prototype)t+=";"+c+".prototype."+m+"="+s.prototype[m].toString()}else t+=u}else r[c]=s}return[t,r]},We=[],ci=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},li=function(e,t,r,n){var i;if(!We[r]){for(var a="",o={},s=e.length-1,c=0;c<s;++c)i=Lr(e[c],a,o),a=i[0],o=i[1];We[r]=Lr(e[s],a,o)}var u=si({},We[r][1]);return ii(We[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,ci(u),n)},ui=function(){return[C,X,bt,Dt,kt,zr,Rt,Wr,Vr,Hr,$e,Yr,ye,Ve,R,He,$r,Ye,x,Kr,Pt,Jr,Xr]};var Jr=function(e){return postMessage(e,[e.buffer])},Xr=function(e){return e&&e.size&&new C(e.size)},fi=function(e,t,r,n,i,a){var o=li(r,n,i,function(s,c){o.terminate(),a(s,c)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}};var G=function(e,t){return e[t]|e[t+1]<<8},O=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Tt=function(e,t){return O(e,t)+O(e,t+4)*4294967296};function pi(e,t,r){return r||(r=t,t={}),typeof r!="function"&&x(7),fi(e,t,[ui],function(n){return Jr(Pt(n.data[0],Xr(n.data[1])))},1,r)}function Pt(e,t){return Kr(e,t)}var Et=typeof TextDecoder<"u"&&new TextDecoder,hi=0;try{Et.decode(ai,{stream:!0}),hi=1}catch{}var gi=function(e){for(var t="",r=0;;){var n=e[r++],i=(n>127)+(n>223)+(n>239);if(r+i>e.length)return[t,Ye(e,r-1)];i?i==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function di(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(Et)return Et.decode(e);var i=gi(e),a=i[0],o=i[1];return o.length&&x(8),a}}var mi=function(e,t){return t+30+G(e,t+26)+G(e,t+28)},vi=function(e,t,r){var n=G(e,t+28),i=di(e.subarray(t+46,t+46+n),!(G(e,t+8)&2048)),a=t+46+n,o=O(e,t+20),s=r&&o==4294967295?yi(e,a):[o,O(e,t+24),O(e,t+42)],c=s[0],u=s[1],f=s[2];return[G(e,t+10),c,u,i,a+G(e,t+30)+G(e,t+32),f]},yi=function(e,t){for(;G(e,t)!=1;t+=4+G(e,t+2));return[Tt(e,t+12),Tt(e,t+4),Tt(e,t+20)]};var Nr=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function qr(e,t,r){r||(r=t,t={}),typeof r!="function"&&x(7);var n=[],i=function(){for(var d=0;d<n.length;++d)n[d]()},a={},o=function(d,y){Nr(function(){r(d,y)})};Nr(function(){o=r});for(var s=e.length-22;O(e,s)!=101010256;--s)if(!s||e.length-s>65558)return o(x(13,0,1),null),i;var c=G(e,s+8);if(c){var u=c,f=O(e,s+16),m=f==4294967295||u==65535;if(m){var T=O(e,s-12);m=O(e,T)==101075792,m&&(u=c=O(e,T+32),f=O(e,T+48))}for(var N=t&&t.filter,Z=function(d){var y=vi(e,f,m),A=y[0],_=y[1],E=y[2],b=y[3],S=y[4],D=y[5],I=mi(e,D);f=S;var U=function(ae,we){ae?(i(),o(ae,null)):(we&&(a[b]=we),--c||o(null,a))};if(!N||N({name:b,size:_,originalSize:E,compression:A}))if(!A)U(null,Ye(e,I,I+_));else if(A==8){var Pe=e.subarray(I,I+_);if(_<32e4)try{U(null,Pt(Pe,new C(E)))}catch(ae){U(ae,null)}else n.push(pi(Pe,{size:E},U))}else U(x(14,"unknown compression type "+A,1),null);else U(null,null)},W=0;W<u;++W)Z(W)}else o(null,{});return i}var tn=require("fs"),L=require("fs/promises"),Ie=require("path");l();function Qr(e){function t(o,s,c,u){let f=0;return f+=o<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,n=e[4]===2;if(!n&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(n){let o=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+o+s;return e.subarray(c,e.length)}let a=12+t(e[8],e[9],e[10],e[11]);return e.subarray(a,e.length)}et();var Ii=(0,Ie.join)(ue,"ExtensionCache");async function wi(e,t){return await(0,L.mkdir)(t,{recursive:!0}),new Promise((r,n)=>{qr(e,(i,a)=>{if(i)return void n(i);Promise.all(Object.keys(a).map(async o=>{if(o.startsWith("_metadata/"))return;if(o.endsWith("/"))return void(0,L.mkdir)((0,Ie.join)(t,o),{recursive:!0});let s=o.split("/"),c=s.pop(),u=s.join("/"),f=(0,Ie.join)(t,u);u&&await(0,L.mkdir)(f,{recursive:!0}),await(0,L.writeFile)((0,Ie.join)(f,c),a[o])})).then(()=>r()).catch(o=>{(0,L.rm)(t,{recursive:!0,force:!0}),n(o)})})})}async function rn(e){let t=(0,Ie.join)(Ii,`${e}`);try{await(0,L.access)(t,tn.constants.F_OK)}catch{let n=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,i=await le(n,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await wi(Qr(i),t).catch(console.error)}en.session.defaultSession.loadExtension(t)}oe.app.whenReady().then(()=>{oe.protocol.registerFileProtocol("rivercord",({url:i},a)=>{let o=i.slice(12);if(o.endsWith("/")&&(o=o.slice(0,-1)),o.startsWith("/themes/")){let s=o.slice(8),c=xt(ee,s);if(!c){a({statusCode:403});return}a(c.replace(/\?v=\d+$/,""));return}switch(o){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":a((0,nn.join)(__dirname,o));break;default:a({statusCode:403})}});try{k.store.enableReactDevtools&&rn("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(i=>console.error("[Rivercord] Failed to install React Developer Tools",i))}catch{}let e=(i,a)=>Object.keys(i).find(o=>o.toLowerCase()===a),t=i=>{let a={};return i.split(";").forEach(o=>{let[s,...c]=o.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(a,s)&&(a[s]=c)}),a},r=i=>Object.entries(i).filter(([,a])=>a?.length).map(a=>a.flat().join(" ")).join("; "),n=i=>{let a=e(i,"content-security-policy");if(a){let o=t(i[a][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])o[s]??=[],o[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");o["script-src"]??=[],o["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),i[a]=[r(o)]}};oe.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:i,resourceType:a},o)=>{if(i&&(a==="mainFrame"&&n(i),a==="stylesheet")){let s=e(i,"content-type");s&&(i[s]=["text/css"])}o({cancel:!1,responseHeaders:i})}),oe.session.defaultSession.webRequest.onHeadersReceived=()=>{}});
//# sourceURL=RivercordDesktopMain
//# sourceMappingURL=rivercord://rivercordDesktopMain.js.map
/*! For license information please see rivercordDesktopMain.js.LEGAL.txt */
