// Rivercord ec3e23e6
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var tn=Object.create;var Re=Object.defineProperty;var rn=Object.getOwnPropertyDescriptor;var nn=Object.getOwnPropertyNames;var on=Object.getPrototypeOf,an=Object.prototype.hasOwnProperty;var Oe=(e,t)=>()=>(e&&(t=e(e=0)),t);var X=(e,t)=>{for(var r in t)Re(e,r,{get:t[r],enumerable:!0})},Mt=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of nn(t))!an.call(e,i)&&i!==r&&Re(e,i,{get:()=>t[i],enumerable:!(n=rn(t,i))||n.enumerable});return e};var H=(e,t,r)=>(r=e!=null?tn(on(e)):{},Mt(t||!e||!e.__esModule?Re(r,"default",{value:e,enumerable:!0}):r,e)),sn=e=>Mt(Re({},"__esModule",{value:!0}),e);var l=Oe(()=>{"use strict"});var we=Oe(()=>{"use strict";l()});function Ae(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var Gt=Oe(()=>{"use strict";l()});var pn={};function se(...e){let t={cwd:zt};return Xe?Je("flatpak-spawn",["--host","git",...e],t):Je("git",e,t)}async function cn(){return(await se("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function ln(){await se("fetch");let e=(await se("branch","--show-current")).stdout.trim();if(!((await se("ls-remote","origin",e)).stdout.length>0))return[];let n=(await se("log",`HEAD...origin/${e}`,"--pretty=format:%an/%h/%s")).stdout.trim();return n?n.split(`
`).map(i=>{let[a,o,...s]=i.split("/");return{hash:o,author:a,message:s.join("/").split(`
`)[0]}}):[]}async function un(){return(await se("pull")).stdout.includes("Fast-forward")}async function fn(){return!(await Je(Xe?"flatpak-spawn":"node",Xe?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:zt})).stderr.includes("Build failed")}var Lt,Ce,Nt,Ft,zt,Je,Xe,Ut=Oe(()=>{"use strict";l();we();Lt=require("child_process"),Ce=require("electron"),Nt=require("path"),Ft=require("util");Gt();zt=(0,Nt.join)(__dirname,".."),Je=(0,Ft.promisify)(Lt.execFile),Xe=!1;Ce.ipcMain.handle("RivercordGetRepo",Ae(cn));Ce.ipcMain.handle("RivercordGetUpdates",Ae(ln));Ce.ipcMain.handle("RivercordUpdate",Ae(un));Ce.ipcMain.handle("RivercordBuild",Ae(fn))});l();var ne=require("electron"),qr=require("path");l();l();Ut();l();we();var vt=require("electron");l();var et={};X(et,{fetchTrackData:()=>gn});l();var Wt=require("child_process"),Bt=require("util"),Ht=(0,Bt.promisify)(Wt.execFile);async function Qe(e){let{stdout:t}=await Ht("osascript",e.map(r=>["-e",r]).flat());return t}function jt(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}var Zt={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},O=null;async function hn({id:e,name:t,artist:r,album:n}){if(e===O?.id){if("data"in O)return O.data;if("failures"in O&&O.failures>=5)return null}try{let[i,a]=await Promise.all([fetch(jt("songs",r+" "+n+" "+t),Zt).then(f=>f.json()),fetch(jt("artists",r.split(/ *[,&] */)[0]),Zt).then(f=>f.json())]),o=i?.songs?.data[0]?.attributes.url,s=i?.songs?.data[0]?.id?`https://song.link/i/${i?.songs?.data[0]?.id}`:void 0,c=i?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=a?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return O={id:e,data:{appleMusicLink:o,songLink:s,albumArtwork:c,artistArtwork:u}},O.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),O={id:e,failures:(e===O?.id&&"failures"in O?O.failures:0)+1},null}}async function gn(){try{await Ht("pgrep",["^Music$"])}catch{return null}if(await Qe(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await Qe(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await Qe(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[n,i,a,o,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await hn({id:n,name:i,artist:o,album:a});return{name:i,album:a,artist:o,playerPosition:t,duration:c,...u}}var tt={};X(tt,{initDevtoolsOpenEagerLoad:()=>dn});l();function dn(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var qt={};l();l();we();l();var Se=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,n=""){let i=this;return new Proxy(t,{get(a,o){let s=a[o];return!(o in a)&&i.getDefaultValue&&(s=i.getDefaultValue({target:a,key:o,root:r,path:n})),typeof s=="object"&&s!==null&&!Array.isArray(s)?i.makeProxy(s,r,`${n}${n&&"."}${o}`):s},set(a,o,s){if(a[o]===s)return!0;Reflect.set(a,o,s);let c=`${n}${n&&"."}${o}`;return i.globalListeners.forEach(u=>u(s,c)),i.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let n=t,i=r.split(".");for(let a of i){if(!n){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}n=n[a]}this.pathListeners.get(r)?.forEach(a=>a(n))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let n=this.pathListeners.get(t)??new Set;n.add(r),this.pathListeners.set(t,n)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let n=this.pathListeners.get(t);!n||(n.delete(r),n.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}};l();function rt(e,t){for(let r in t){let n=t[r];typeof n=="object"&&!Array.isArray(n)?(e[r]??={},rt(e[r],n)):e[r]??=n}return e}var _e=require("electron"),Q=require("fs");l();var Vt=require("electron"),V=require("path"),ce=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,V.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,V.join)(Vt.app.getPath("userData"),"..","Rivercord")),le=(0,V.join)(ce,"settings"),q=(0,V.join)(ce,"themes"),Pe=(0,V.join)(le,"quickCss.css"),nt=(0,V.join)(le,"settings.json"),it=(0,V.join)(le,"native-settings.json"),$t=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"];(0,Q.mkdirSync)(le,{recursive:!0});function Kt(e,t){try{return JSON.parse((0,Q.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var k=new Se(Kt("renderer",nt));k.addGlobalChangeListener(()=>{try{(0,Q.writeFileSync)(nt,JSON.stringify(k.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});_e.ipcMain.handle("RivercordGetSettingsDir",()=>le);_e.ipcMain.on("RivercordGetSettings",e=>e.returnValue=k.plain);_e.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{k.setData(t,r)});var mn={plugins:{}},Jt=Kt("native",it);rt(Jt,mn);var Yt=new Se(Jt);Yt.addGlobalChangeListener(()=>{try{(0,Q.writeFileSync)(it,JSON.stringify(Yt.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}});var Xt=require("electron");Xt.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://open.spotify.com/embed/")){let i=k.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;n.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})});var er={};l();var Qt=require("electron");Qt.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://www.youtube.com/")){if(!k.store.plugins?.FixYoutubeEmbeds?.enabled)return;n.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})});var st={};X(st,{checkffmpeg:()=>En,checkytdlp:()=>bn,execute:()=>Tn,getStdout:()=>kn,interrupt:()=>Dn,isFfmpegAvailable:()=>On,isYtdlpAvailable:()=>Rn,start:()=>yn,stop:()=>In});l();var Y=require("child_process"),w=H(require("fs")),tr=H(require("os")),at=H(require("path")),z=null,$="",Me="",ot=!1,te=!1,ue=null,fe=null,Le=()=>z??process.cwd(),ee=e=>at.default.join(Le(),e),rr=()=>{!z||w.readdirSync(z).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>w.unlinkSync(ee(e)))},Ge=e=>($+=e,$=$.replace(/^.*\r([^\n])/gm,"$1")),U=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),Me+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),nr=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);function ir(e){U(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,n)=>{ue=(0,Y.spawn)("yt-dlp",e,{cwd:Le()}),ue.stdout.on("data",i=>Ge(i)),ue.stderr.on("data",i=>{Ge(i),nr(`yt-dlp encountered an error: ${i}`),t+=i}),ue.on("exit",i=>{ue=null,i===0?r($):n(new Error(t||`yt-dlp exited with code ${i}`))})})}function vn(e){U(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,n)=>{fe=(0,Y.spawn)("ffmpeg",e,{cwd:Le()}),fe.stdout.on("data",i=>Ge(i)),fe.stderr.on("data",i=>{Ge(i),nr(`ffmpeg encountered an error: ${i}`),t+=i}),fe.on("exit",i=>{fe=null,i===0?r($):n(new Error(t||`ffmpeg exited with code ${i}`))})})}async function yn(e,t){return t||=w.mkdtempSync(at.default.join(tr.default.tmpdir(),"vencord_mediaDownloader_")),w.existsSync(t)||w.mkdirSync(t,{recursive:!0}),z=t,U("Using workdir: ",z),z}async function In(e){z&&(U("Cleaning up workdir"),w.rmSync(z,{recursive:!0}),z=null)}async function wn(e){$="";let t=JSON.parse(await ir(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return $="",{videoTitle:`${t.title||"video"} (${t.id})`}}function An({videoTitle:e},{maxFileSize:t,format:r}){let n=!!t,i=n?t*.8:0,a=n?t*.2:0,o={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=o;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(te?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",n?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",n?`[filesize<${i}]`:"").replaceAll("{AUD_SIZE}",n?`[filesize<${a}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return U("Video formated calculated as ",f),U(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${te}`),{format:f,videoTitle:e}}async function Cn({format:e,videoTitle:t},{ytdlpArgs:r,url:n,format:i}){rr();let a=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],o=te?i==="video"?["--remux-video","webm>webm/mp4"]:i==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await ir([n,...a,...o,...s]);let c=w.readdirSync(Le()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function Sn({file:e,videoTitle:t},{ffmpegArgs:r,format:n,maxFileSize:i,gifQuality:a}){let o=e.split(".").pop();if(!te)return U("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:o};let s=["mp3","mp4","webm"],c=w.statSync(ee(e)).size,u=r?.filter(Boolean)||[],f=s.includes(o??""),m=!i||c<=i,T=u.length>0;if(f&&m&&!T&&!(n==="gif"))return U("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:o};let Z=parseFloat((0,Y.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",ee(e)]).toString());if(isNaN(Z))throw"Failed to get video duration.";let d=~~((i?i*7/Z:9999999)/1024),y,A;switch(n){case"audio":y=["-i",ee(e),"-b:a",`${d}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y"],A="mp3";break;case"video":default:let _=d<=100?480:d<=500?720:1080;y=["-i",ee(e),"-b:v",`${~~(d*.8)}k`,"-b:a",`${~~(d*.2)}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${_}`],A="mp4";break;case"gif":let E,b,S,D;switch(a){case 1:E=5,b=360,S=24,D=5;break;case 2:E=10,b=420,S=32,D=5;break;default:case 3:E=15,b=480,S=64,D=4;break;case 4:E=20,b=540,S=64,D=3;break;case 5:E=30,b=720,S=128,D=1;break}y=["-i",ee(e),"-vf",`fps=${E},scale=w=${b}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${S}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${D}`,"-loop","0","-bufsize","1M","-y"],A="gif";break}return await vn([...y,...u,`remux.${A}`]),{file:`remux.${A}`,videoTitle:t,extension:A}}function xn({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:w.readFileSync(ee(e)),title:`${t}.${r}`}}async function Tn(e,t){Me="";try{let r=await wn(t),n=An(r,t),i=await Cn(n,t),a=await Sn(i,t),o=xn(a);return{logs:Me,...o}}catch(r){return{error:r.toString(),logs:Me}}}function En(e){try{return(0,Y.execFileSync)("ffmpeg",["-version"]),(0,Y.execFileSync)("ffprobe",["-version"]),te=!0,!0}catch{return te=!1,!1}}async function bn(e){try{return(0,Y.execFileSync)("yt-dlp",["--version"]),ot=!0,!0}catch{return ot=!1,!1}}async function Dn(e){U("Interrupting..."),ue?.kill(),fe?.kill(),rr()}var kn=()=>$,Rn=()=>ot,On=()=>te;var ht={};X(ht,{chooseDir:()=>jn,deleteFileNative:()=>Nn,getDefaultNativeDataDir:()=>K,getDefaultNativeImageDir:()=>xe,getImageNative:()=>Gn,getLogsFromFs:()=>zn,getNativeSavedImages:()=>Mn,getSettings:()=>ze,init:()=>fr,initDirs:()=>ur,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>_n,showItemInFolder:()=>Zn,writeImageNative:()=>Ln,writeLogs:()=>Un});l();var M=require("node:fs/promises"),re=H(require("node:path"));l();var Ne=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}};var Ue=require("electron");l();var lt=H(require("fs/promises")),ar=H(require("path"));l();var Fe=require("fs/promises"),or=H(require("path"));async function Pn(e){try{return await(0,Fe.access)(e),!0}catch{return!1}}async function pe(e){await Pn(e)||await(0,Fe.mkdir)(e)}function ct(e){return or.default.parse(e).name}async function ze(){try{let e=await lt.default.readFile(await sr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await K(),imageCacheDir:await xe()};try{await ut(t)}catch{}return t}}async function ut(e){!e||await lt.default.writeFile(await sr(),JSON.stringify(e,null,4),"utf8")}async function sr(){let e=await K();return await pe(e),ar.default.join(e,"mlSettings.json")}function _n(){}var he=new Map,Mn=()=>he,ft,pt,cr=async()=>pt??await xe(),lr=async()=>ft??await K();async function ur(){let{logsDir:e,imageCacheDir:t}=await ze();ft=e||await K(),pt=t||await xe()}ur();async function fr(e){let t=await cr();await pe(t);let r=await(0,M.readdir)(t);for(let n of r){let i=ct(n);he.set(i,re.default.join(t,n))}}async function Gn(e,t){let r=he.get(t);return r?await(0,M.readFile)(r):null}async function Ln(e,t,r){if(!t||!r)return;let n=await cr(),i=ct(t);if(he.get(i))return;let o=re.default.join(n,t);await pe(n),await(0,M.writeFile)(o,r),he.set(i,o)}async function Nn(e,t){let r=he.get(t);!r||await(0,M.unlink)(r)}var pr="message-logger-logs.json",Fn=new Ne;async function zn(e){let t=await lr();await pe(t);try{return JSON.parse(await(0,M.readFile)(re.default.join(t,pr),"utf-8"))}catch{}return null}async function Un(e,t){let r=await lr();Fn.push(()=>(0,M.writeFile)(re.default.join(r,pr),t))}async function xe(){return re.default.join(await K(),"savedImages")}async function K(){return re.default.join(ce,"MessageLoggerData")}async function jn(e,t){let r=await ze(),n=r[t]||await K(),a=(await Ue.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:n})).filePaths[0];if(!a)throw Error("Invalid Directory");switch(r[t]=a,await ut(r),t){case"logsDir":ft=a;break;case"imageCacheDir":pt=a;break}return t==="imageCacheDir"&&await fr(e),a}async function Zn(e,t){Ue.shell.showItemInFolder(t)}var gt={};X(gt,{resolveRedirect:()=>Bn});l();var hr=require("https"),Wn=/^https:\/\/(spotify\.link|s\.team)\/.+$/;function gr(e){return new Promise((t,r)=>{let n=(0,hr.request)(new URL(e),{method:"HEAD"},i=>{t(i.headers.location?gr(i.headers.location):e)});n.on("error",r),n.end()})}async function Bn(e,t){return Wn.test(t)?gr(t):t}var dt={};X(dt,{readRecording:()=>Hn});l();var dr=require("electron"),mr=require("fs/promises"),Te=require("path");async function Hn(e,t){t=(0,Te.normalize)(t);let r=(0,Te.basename)(t),n=(0,Te.normalize)(dr.app.getPath("userData")+"/");if(console.log(r,n,t),r!=="recording.ogg"||!t.startsWith(n))return null;try{let i=await(0,mr.readFile)(t);return new Uint8Array(i.buffer)}catch{return null}}var Ir={};l();var yr=require("electron");l();var vr=`/* eslint-disable */

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
});`;yr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.includes("discordsays")&&n.url.includes("youtube.com")){if(!k.store.plugins?.WatchTogetherAdblock?.enabled)return;n.executeJavaScript(vr)}})})});var mt={};X(mt,{sendToOverlay:()=>Vn});l();var Ar=require("dgram"),wr;function Vn(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);wr??=(0,Ar.createSocket)("udp4"),wr.send(r,42069,"127.0.0.1")}var Cr={AppleMusicRichPresence:et,ConsoleShortcuts:tt,FixSpotifyEmbeds:qt,FixYoutubeEmbeds:er,MediaDownloader:st,MessageLoggerEnhanced:ht,OpenInApp:gt,VoiceMessages:dt,WatchTogetherAdblock:Ir,XSOverlay:mt};var Sr={};for(let[e,t]of Object.entries(Cr)){let r=Object.entries(t);if(!r.length)continue;let n=Sr[e]={};for(let[i,a]of r){let o=`RivercordPluginNative_${e}_${i}`;vt.ipcMain.handle(o,a),n[i]=o}}vt.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=Sr});l();we();var v=require("electron");l();var xr="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo=";var Ee=require("fs"),de=require("fs/promises"),ge=require("path");l();var $n=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,Yn=/^\\@/;function yt(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function Tr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Er(e,t){if(!e)return yt(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return yt(t);let n={},i="",a="";for(let o of r.split($n))if(o.length!==0)if(o.charAt(0)==="@"&&o.charAt(1)!==" "){n[i]=a.trim();let s=o.indexOf(" ");i=o.substring(1,s),a=o.substring(s+1)}else a+=" "+o.replace("\\n",`
`).replace(Yn,"@");return n[i]=a.trim(),delete n[""],yt(t,n)}l();var br=require("electron");function Dr(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":br.shell.openExternal(t)}return{action:"deny"}})}(0,Ee.mkdirSync)(q,{recursive:!0});function It(e,t){let r=(0,ge.normalize)(e),n=(0,ge.join)(e,t),i=(0,ge.normalize)(n);return i.startsWith(r)?i:null}function Kn(){return(0,de.readFile)(Pe,"utf-8").catch(()=>"")}async function Jn(){let e=await(0,de.readdir)(q).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let n=await kr(r).then(Tr).catch(()=>null);n!=null&&t.push(Er(n,r))}return t}function kr(e){e=e.replace(/\?v=\d+$/,"");let t=It(q,e);return t?(0,de.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}v.ipcMain.handle("RivercordOpenQuickCss",()=>v.shell.openPath(Pe));v.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!$t.includes(r))throw"Disallowed protocol.";v.shell.openExternal(t)});v.ipcMain.handle("RivercordGetQuickCss",()=>Kn());v.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,Ee.writeFileSync)(Pe,t));v.ipcMain.handle("RivercordGetThemesDir",()=>q);v.ipcMain.handle("RivercordGetThemesList",()=>Jn());v.ipcMain.handle("RivercordGetThemeData",(e,t)=>kr(t));v.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${v.systemPreferences.getAccentColor?.()||""}`}));v.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=v.BrowserWindow.getAllWindows().find(n=>n.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new v.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,ge.join)(__dirname,"rivercordDesktopPreload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});Dr(r),await r.loadURL(`data:text/html;base64,${xr}`)});l();var Kr=require("electron");l();var Pr=require("module"),Xn=(0,Pr.createRequire)("/"),Ze,qn=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Ze=Xn("worker_threads").Worker}catch{}var Qn=Ze?function(e,t,r,n,i){var a=!1,o=new Ze(e+qn,{eval:!0}).on("error",function(s){return i(s,null)}).on("message",function(s){return i(null,s)}).on("exit",function(s){s&&!a&&i(new Error("exited with code "+s),null)});return o.postMessage(r,n),o.terminate=function(){return a=!0,Ze.prototype.terminate.call(o)},o}:function(e,t,r,n,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var a=function(){};return{terminate:a,postMessage:a}},C=Uint8Array,J=Uint16Array,Ct=Uint32Array,St=new C([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),xt=new C([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),_r=new C([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Mr=function(e,t){for(var r=new J(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var i=new Ct(r[30]),n=1;n<30;++n)for(var a=r[n];a<r[n+1];++a)i[a]=a-r[n]<<5|n;return[r,i]},Gr=Mr(St,2),Tt=Gr[0],ei=Gr[1];Tt[28]=258,ei[258]=28;var Lr=Mr(xt,0),Nr=Lr[0],Wo=Lr[1],He=new J(32768);for(g=0;g<32768;++g)j=(g&43690)>>>1|(g&21845)<<1,j=(j&52428)>>>2|(j&13107)<<2,j=(j&61680)>>>4|(j&3855)<<4,He[g]=((j&65280)>>>8|(j&255)<<8)>>>1;var j,g,me=function(e,t,r){for(var n=e.length,i=0,a=new J(t);i<n;++i)e[i]&&++a[e[i]-1];var o=new J(t);for(i=0;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(r){s=new J(1<<t);var c=15-t;for(i=0;i<n;++i)if(e[i])for(var u=i<<4|e[i],f=t-e[i],m=o[e[i]-1]++<<f,T=m|(1<<f)-1;m<=T;++m)s[He[m]>>>c]=u}else for(s=new J(n),i=0;i<n;++i)e[i]&&(s[i]=He[o[e[i]-1]++]>>>15-e[i]);return s},be=new C(288);for(g=0;g<144;++g)be[g]=8;var g;for(g=144;g<256;++g)be[g]=9;var g;for(g=256;g<280;++g)be[g]=7;var g;for(g=280;g<288;++g)be[g]=8;var g,Fr=new C(32);for(g=0;g<32;++g)Fr[g]=5;var g;var zr=me(be,9,1);var Ur=me(Fr,5,1),We=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},R=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},Be=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},jr=function(e){return(e+7)/8|0},Ve=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var n=new(e.BYTES_PER_ELEMENT==2?J:e.BYTES_PER_ELEMENT==4?Ct:C)(r-t);return n.set(e.subarray(t,r)),n};var Zr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],x=function(e,t,r){var n=new Error(t||Zr[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,x),!r)throw n;return n},Wr=function(e,t,r){var n=e.length;if(!n||r&&r.f&&!r.l)return t||new C(0);var i=!t||r,a=!r||r.i;r||(r={}),t||(t=new C(n*3));var o=function(Ot){var Pt=t.length;if(Ot>Pt){var _t=new C(Math.max(Pt*2,Ot));_t.set(t),t=_t}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,m=r.d,T=r.m,N=r.n,Z=n*8;do{if(!f){s=R(e,c,1);var W=R(e,c+1,3);if(c+=3,W)if(W==1)f=zr,m=Ur,T=9,N=5;else if(W==2){var _=R(e,c,31)+257,E=R(e,c+10,15)+4,b=_+R(e,c+5,31)+1;c+=14;for(var S=new C(b),D=new C(19),I=0;I<E;++I)D[_r[I]]=R(e,c+I*3,7);c+=E*3;for(var F=We(D),De=(1<<F)-1,ie=me(D,F,1),I=0;I<b;){var ye=ie[R(e,c,De)];c+=ye&15;var d=ye>>>4;if(d<16)S[I++]=d;else{var oe=0,ke=0;for(d==16?(ke=3+R(e,c,3),c+=2,oe=S[I-1]):d==17?(ke=3+R(e,c,7),c+=3):d==18&&(ke=11+R(e,c,127),c+=7);ke--;)S[I++]=oe}}var Dt=S.subarray(0,_),B=S.subarray(_);T=We(Dt),N=We(B),f=me(Dt,T,1),m=me(B,N,1)}else x(1);else{var d=jr(c)+4,y=e[d-4]|e[d-3]<<8,A=d+y;if(A>n){a&&x(0);break}i&&o(u+y),t.set(e.subarray(d,A),u),r.b=u+=y,r.p=c=A*8,r.f=s;continue}if(c>Z){a&&x(0);break}}i&&o(u+131072);for(var Qr=(1<<T)-1,en=(1<<N)-1,$e=c;;$e=c){var oe=f[Be(e,c)&Qr],ae=oe>>>4;if(c+=oe&15,c>Z){a&&x(0);break}if(oe||x(2),ae<256)t[u++]=ae;else if(ae==256){$e=c,f=null;break}else{var kt=ae-254;if(ae>264){var I=ae-257,Ie=St[I];kt=R(e,c,(1<<Ie)-1)+Tt[I],c+=Ie}var Ye=m[Be(e,c)&en],Ke=Ye>>>4;Ye||x(3),c+=Ye&15;var B=Nr[Ke];if(Ke>3){var Ie=xt[Ke];B+=Be(e,c)&(1<<Ie)-1,c+=Ie}if(c>Z){a&&x(0);break}i&&o(u+131072);for(var Rt=u+kt;u<Rt;u+=4)t[u]=t[u-B],t[u+1]=t[u+1-B],t[u+2]=t[u+2-B],t[u+3]=t[u+3-B];u=Rt}}r.l=f,r.p=$e,r.b=u,r.f=s,f&&(s=1,r.m=T,r.d=m,r.n=N)}while(!s);return u==t.length?t:Ve(t,0,u)};var ti=new C(0);var ri=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},Rr=function(e,t,r){for(var n=e(),i=e.toString(),a=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var s=n[o],c=a[o];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var m in s.prototype)t+=";"+c+".prototype."+m+"="+s.prototype[m].toString()}else t+=u}else r[c]=s}return[t,r]},je=[],ni=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},ii=function(e,t,r,n){var i;if(!je[r]){for(var a="",o={},s=e.length-1,c=0;c<s;++c)i=Rr(e[c],a,o),a=i[0],o=i[1];je[r]=Rr(e[s],a,o)}var u=ri({},je[r][1]);return Qn(je[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,ni(u),n)},oi=function(){return[C,J,Ct,St,xt,_r,Tt,Nr,zr,Ur,He,Zr,me,We,R,Be,jr,Ve,x,Wr,Et,Br,Hr]};var Br=function(e){return postMessage(e,[e.buffer])},Hr=function(e){return e&&e.size&&new C(e.size)},ai=function(e,t,r,n,i,a){var o=ii(r,n,i,function(s,c){o.terminate(),a(s,c)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}};var G=function(e,t){return e[t]|e[t+1]<<8},P=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},wt=function(e,t){return P(e,t)+P(e,t+4)*4294967296};function si(e,t,r){return r||(r=t,t={}),typeof r!="function"&&x(7),ai(e,t,[oi],function(n){return Br(Et(n.data[0],Hr(n.data[1])))},1,r)}function Et(e,t){return Wr(e,t)}var At=typeof TextDecoder<"u"&&new TextDecoder,ci=0;try{At.decode(ti,{stream:!0}),ci=1}catch{}var li=function(e){for(var t="",r=0;;){var n=e[r++],i=(n>127)+(n>223)+(n>239);if(r+i>e.length)return[t,Ve(e,r-1)];i?i==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function ui(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(At)return At.decode(e);var i=li(e),a=i[0],o=i[1];return o.length&&x(8),a}}var fi=function(e,t){return t+30+G(e,t+26)+G(e,t+28)},pi=function(e,t,r){var n=G(e,t+28),i=ui(e.subarray(t+46,t+46+n),!(G(e,t+8)&2048)),a=t+46+n,o=P(e,t+20),s=r&&o==4294967295?hi(e,a):[o,P(e,t+24),P(e,t+42)],c=s[0],u=s[1],f=s[2];return[G(e,t+10),c,u,i,a+G(e,t+30)+G(e,t+32),f]},hi=function(e,t){for(;G(e,t)!=1;t+=4+G(e,t+2));return[wt(e,t+12),wt(e,t+4),wt(e,t+20)]};var Or=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Vr(e,t,r){r||(r=t,t={}),typeof r!="function"&&x(7);var n=[],i=function(){for(var d=0;d<n.length;++d)n[d]()},a={},o=function(d,y){Or(function(){r(d,y)})};Or(function(){o=r});for(var s=e.length-22;P(e,s)!=101010256;--s)if(!s||e.length-s>65558)return o(x(13,0,1),null),i;var c=G(e,s+8);if(c){var u=c,f=P(e,s+16),m=f==4294967295||u==65535;if(m){var T=P(e,s-12);m=P(e,T)==101075792,m&&(u=c=P(e,T+32),f=P(e,T+48))}for(var N=t&&t.filter,Z=function(d){var y=pi(e,f,m),A=y[0],_=y[1],E=y[2],b=y[3],S=y[4],D=y[5],I=fi(e,D);f=S;var F=function(ie,ye){ie?(i(),o(ie,null)):(ye&&(a[b]=ye),--c||o(null,a))};if(!N||N({name:b,size:_,originalSize:E,compression:A}))if(!A)F(null,Ve(e,I,I+_));else if(A==8){var De=e.subarray(I,I+_);if(_<32e4)try{F(null,Et(De,new C(E)))}catch(ie){F(ie,null)}else n.push(si(De,{size:E},F))}else F(x(14,"unknown compression type "+A,1),null);else F(null,null)},W=0;W<u;++W)Z(W)}else o(null,{});return i}var Jr=require("fs"),L=require("fs/promises"),ve=require("path");l();function $r(e){function t(o,s,c,u){let f=0;return f+=o<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,n=e[4]===2;if(!n&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(n){let o=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+o+s;return e.subarray(c,e.length)}let a=12+t(e[8],e[9],e[10],e[11]);return e.subarray(a,e.length)}l();var Yr=H(require("https"));function bt(e,t={}){return new Promise((r,n)=>{Yr.default.get(e,t,i=>{let{statusCode:a,statusMessage:o,headers:s}=i;if(a>=400)return void n(`${a}: ${o} - ${e}`);if(a>=300)return void r(bt(s.location,t));let c=[];i.on("error",n),i.on("data",u=>c.push(u)),i.once("end",()=>r(Buffer.concat(c)))})})}var gi=(0,ve.join)(ce,"ExtensionCache");async function di(e,t){return await(0,L.mkdir)(t,{recursive:!0}),new Promise((r,n)=>{Vr(e,(i,a)=>{if(i)return void n(i);Promise.all(Object.keys(a).map(async o=>{if(o.startsWith("_metadata/"))return;if(o.endsWith("/"))return void(0,L.mkdir)((0,ve.join)(t,o),{recursive:!0});let s=o.split("/"),c=s.pop(),u=s.join("/"),f=(0,ve.join)(t,u);u&&await(0,L.mkdir)(f,{recursive:!0}),await(0,L.writeFile)((0,ve.join)(f,c),a[o])})).then(()=>r()).catch(o=>{(0,L.rm)(t,{recursive:!0,force:!0}),n(o)})})})}async function Xr(e){let t=(0,ve.join)(gi,`${e}`);try{await(0,L.access)(t,Jr.constants.F_OK)}catch{let n=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,i=await bt(n,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await di($r(i),t).catch(console.error)}Kr.session.defaultSession.loadExtension(t)}ne.app.whenReady().then(()=>{ne.protocol.registerFileProtocol("rivercord",({url:i},a)=>{let o=i.slice(12);if(o.endsWith("/")&&(o=o.slice(0,-1)),o.startsWith("/themes/")){let s=o.slice(8),c=It(q,s);if(!c){a({statusCode:403});return}a(c.replace(/\?v=\d+$/,""));return}switch(o){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":a((0,qr.join)(__dirname,o));break;default:a({statusCode:403})}});try{k.store.enableReactDevtools&&Xr("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(i=>console.error("[Rivercord] Failed to install React Developer Tools",i))}catch{}let e=(i,a)=>Object.keys(i).find(o=>o.toLowerCase()===a),t=i=>{let a={};return i.split(";").forEach(o=>{let[s,...c]=o.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(a,s)&&(a[s]=c)}),a},r=i=>Object.entries(i).filter(([,a])=>a?.length).map(a=>a.flat().join(" ")).join("; "),n=i=>{let a=e(i,"content-security-policy");if(a){let o=t(i[a][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])o[s]??=[],o[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");o["script-src"]??=[],o["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),i[a]=[r(o)]}};ne.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:i,resourceType:a},o)=>{if(i&&(a==="mainFrame"&&n(i),a==="stylesheet")){let s=e(i,"content-type");s&&(i[s]=["text/css"])}o({cancel:!1,responseHeaders:i})}),ne.session.defaultSession.webRequest.onHeadersReceived=()=>{}});
//# sourceURL=RivercordDesktopMain
//# sourceMappingURL=rivercord://rivercordDesktopMain.js.map
/*! For license information please see rivercordDesktopMain.js.LEGAL.txt */
