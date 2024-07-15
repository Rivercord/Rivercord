// Rivercord bff883c8
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var cn=Object.create;var Oe=Object.defineProperty;var ln=Object.getOwnPropertyDescriptor;var un=Object.getOwnPropertyNames;var fn=Object.getPrototypeOf,pn=Object.prototype.hasOwnProperty;var H=(e,t)=>()=>(e&&(t=e(e=0)),t);var X=(e,t)=>{for(var r in t)Oe(e,r,{get:t[r],enumerable:!0})},Nt=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of un(t))!pn.call(e,i)&&i!==r&&Oe(e,i,{get:()=>t[i],enumerable:!(n=ln(t,i))||n.enumerable});return e};var V=(e,t,r)=>(r=e!=null?cn(fn(e)):{},Nt(t||!e||!e.__esModule?Oe(r,"default",{value:e,enumerable:!0}):r,e)),hn=e=>Nt(Oe({},"__esModule",{value:!0}),e);var l=H(()=>{"use strict"});var Te=H(()=>{"use strict";l()});var ue,Xe=H(()=>{l();ue="bff883c8"});var Q,Qe=H(()=>{l();Q="Rivercord/Rivercord"});var Ut,zt=H(()=>{"use strict";l();Xe();Qe();Ut=`Rivercord/${ue}${Q?` (https://github.com/${Q})`:""}`});function ee(e,t={}){return new Promise((r,n)=>{Ft.default.get(e,t,i=>{let{statusCode:a,statusMessage:o,headers:s}=i;if(a>=400)return void n(`${a}: ${o} - ${e}`);if(a>=300)return void r(ee(s.location,t));let c=[];i.on("error",n),i.on("data",u=>c.push(u)),i.once("end",()=>r(Buffer.concat(c)))})})}var Ft,et=H(()=>{"use strict";l();Ft=V(require("https"))});function fe(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var jt,Zt=H(()=>{"use strict";l();jt=["rivercordDesktopMain.js","rivercordDesktopPreload.js","rivercordDesktopRenderer.js","rivercordDesktopRenderer.css"]});var yn={};async function dn(e){return ee(gn+e,{headers:{Accept:"application/vnd.github+json","User-Agent":Ut}})}async function mn(){await Vt();let e=await dn(`/compare/${ue}...HEAD`);return JSON.parse(e.toString("utf-8")).commits.map(r=>({hash:r.sha.slice(0,7),author:r.author.login,message:r.commit.message.split(`
`)[0]}))}async function Ht(){return(await ee("https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/git-hash.txt")).toString("utf-8").trim()!==ue}async function Vt(){return await Ht()?(jt.forEach(e=>{tt.push([e,`https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${e}`])}),!0):!1}async function vn(){return await Promise.all(tt.map(async([e,t])=>(0,Wt.writeFile)((0,Bt.join)(__dirname,e),await ee(t)))),tt=[],!0}var pe,Wt,Bt,gn,tt,$t=H(()=>{"use strict";l();Te();zt();pe=require("electron"),Wt=require("fs/promises"),Bt=require("path");Xe();Qe();et();Zt();gn=`https://api.github.com/repos/${Q}`,tt=[];pe.ipcMain.handle("RivercordGetRepo",fe(()=>`https://github.com/${Q}`));pe.ipcMain.handle("RivercordGetUpdates",fe(mn));pe.ipcMain.handle("RivercordIsUpdateRequired",fe(Ht));pe.ipcMain.handle("RivercordUpdate",fe(Vt));pe.ipcMain.handle("RivercordBuild",fe(vn));console.log("[Rivercord] Updater",{gitHash:ue,gitRemote:Q,__dirname})});l();var ae=require("electron"),on=require("path");l();l();$t();l();Te();var At=require("electron");l();var it={};X(it,{fetchTrackData:()=>wn});l();var Jt=require("child_process"),qt=require("util"),Xt=(0,qt.promisify)(Jt.execFile);async function nt(e){let{stdout:t}=await Xt("osascript",e.map(r=>["-e",r]).flat());return t}function Yt(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}var Kt={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},P=null;async function In({id:e,name:t,artist:r,album:n}){if(e===P?.id){if("data"in P)return P.data;if("failures"in P&&P.failures>=5)return null}try{let[i,a]=await Promise.all([fetch(Yt("songs",r+" "+n+" "+t),Kt).then(f=>f.json()),fetch(Yt("artists",r.split(/ *[,&] */)[0]),Kt).then(f=>f.json())]),o=i?.songs?.data[0]?.attributes.url,s=i?.songs?.data[0]?.id?`https://song.link/i/${i?.songs?.data[0]?.id}`:void 0,c=i?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=a?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return P={id:e,data:{appleMusicLink:o,songLink:s,albumArtwork:c,artistArtwork:u}},P.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),P={id:e,failures:(e===P?.id&&"failures"in P?P.failures:0)+1},null}}async function wn(){try{await Xt("pgrep",["^Music$"])}catch{return null}if(await nt(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await nt(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await nt(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[n,i,a,o,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await In({id:n,name:i,artist:o,album:a});return{name:i,album:a,artist:o,playerPosition:t,duration:c,...u}}var ot={};X(ot,{initDevtoolsOpenEagerLoad:()=>An});l();function An(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var or={};l();l();Te();l();var Ee=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,n=""){let i=this;return new Proxy(t,{get(a,o){let s=a[o];return!(o in a)&&i.getDefaultValue&&(s=i.getDefaultValue({target:a,key:o,root:r,path:n})),typeof s=="object"&&s!==null&&!Array.isArray(s)?i.makeProxy(s,r,`${n}${n&&"."}${o}`):s},set(a,o,s){if(a[o]===s)return!0;Reflect.set(a,o,s);let c=`${n}${n&&"."}${o}`;return i.globalListeners.forEach(u=>u(s,c)),i.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let n=t,i=r.split(".");for(let a of i){if(!n){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}n=n[a]}this.pathListeners.get(r)?.forEach(a=>a(n))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let n=this.pathListeners.get(t)??new Set;n.add(r),this.pathListeners.set(t,n)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let n=this.pathListeners.get(t);!n||(n.delete(r),n.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}};l();function at(e,t){for(let r in t){let n=t[r];typeof n=="object"&&!Array.isArray(n)?(e[r]??={},at(e[r],n)):e[r]??=n}return e}var Me=require("electron"),re=require("fs");l();var Qt=require("electron"),$=require("path"),he=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,$.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,$.join)(Qt.app.getPath("userData"),"..","Rivercord")),ge=(0,$.join)(he,"settings"),te=(0,$.join)(he,"themes"),Ge=(0,$.join)(ge,"quickCss.css"),st=(0,$.join)(ge,"settings.json"),ct=(0,$.join)(ge,"native-settings.json"),er=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"];(0,re.mkdirSync)(ge,{recursive:!0});function rr(e,t){try{return JSON.parse((0,re.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var R=new Ee(rr("renderer",st));R.addGlobalChangeListener(()=>{try{(0,re.writeFileSync)(st,JSON.stringify(R.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Me.ipcMain.handle("RivercordGetSettingsDir",()=>ge);Me.ipcMain.on("RivercordGetSettings",e=>e.returnValue=R.plain);Me.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{R.setData(t,r)});var Cn={plugins:{}},nr=rr("native",ct);at(nr,Cn);var tr=new Ee(nr);tr.addGlobalChangeListener(()=>{try{(0,re.writeFileSync)(ct,JSON.stringify(tr.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}});var ir=require("electron");ir.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://open.spotify.com/embed/")){let i=R.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;n.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})});var sr={};l();var ar=require("electron");ar.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://www.youtube.com/")){if(!R.store.plugins?.FixYoutubeEmbeds?.enabled)return;n.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})});var ft={};X(ft,{checkffmpeg:()=>_n,checkytdlp:()=>On,execute:()=>Pn,getStdout:()=>Mn,interrupt:()=>Gn,isFfmpegAvailable:()=>Nn,isYtdlpAvailable:()=>Ln,start:()=>xn,stop:()=>Tn});l();var K=require("child_process"),w=V(require("fs")),cr=V(require("os")),ut=V(require("path")),z=null,Y="",Le="",lt=!1,ie=!1,de=null,me=null,Ue=()=>z??process.cwd(),ne=e=>ut.default.join(Ue(),e),lr=()=>{!z||w.readdirSync(z).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>w.unlinkSync(ne(e)))},Ne=e=>(Y+=e,Y=Y.replace(/^.*\r([^\n])/gm,"$1")),F=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),Le+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),ur=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);function fr(e){F(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,n)=>{de=(0,K.spawn)("yt-dlp",e,{cwd:Ue()}),de.stdout.on("data",i=>Ne(i)),de.stderr.on("data",i=>{Ne(i),ur(`yt-dlp encountered an error: ${i}`),t+=i}),de.on("exit",i=>{de=null,i===0?r(Y):n(new Error(t||`yt-dlp exited with code ${i}`))})})}function Sn(e){F(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,n)=>{me=(0,K.spawn)("ffmpeg",e,{cwd:Ue()}),me.stdout.on("data",i=>Ne(i)),me.stderr.on("data",i=>{Ne(i),ur(`ffmpeg encountered an error: ${i}`),t+=i}),me.on("exit",i=>{me=null,i===0?r(Y):n(new Error(t||`ffmpeg exited with code ${i}`))})})}async function xn(e,t){return t||=w.mkdtempSync(ut.default.join(cr.default.tmpdir(),"vencord_mediaDownloader_")),w.existsSync(t)||w.mkdirSync(t,{recursive:!0}),z=t,F("Using workdir: ",z),z}async function Tn(e){z&&(F("Cleaning up workdir"),w.rmSync(z,{recursive:!0}),z=null)}async function En(e){Y="";let t=JSON.parse(await fr(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return Y="",{videoTitle:`${t.title||"video"} (${t.id})`}}function bn({videoTitle:e},{maxFileSize:t,format:r}){let n=!!t,i=n?t*.8:0,a=n?t*.2:0,o={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=o;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(ie?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",n?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",n?`[filesize<${i}]`:"").replaceAll("{AUD_SIZE}",n?`[filesize<${a}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return F("Video formated calculated as ",f),F(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${ie}`),{format:f,videoTitle:e}}async function Dn({format:e,videoTitle:t},{ytdlpArgs:r,url:n,format:i}){lr();let a=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],o=ie?i==="video"?["--remux-video","webm>webm/mp4"]:i==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await fr([n,...a,...o,...s]);let c=w.readdirSync(Ue()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function Rn({file:e,videoTitle:t},{ffmpegArgs:r,format:n,maxFileSize:i,gifQuality:a}){let o=e.split(".").pop();if(!ie)return F("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:o};let s=["mp3","mp4","webm"],c=w.statSync(ne(e)).size,u=r?.filter(Boolean)||[],f=s.includes(o??""),m=!i||c<=i,T=u.length>0;if(f&&m&&!T&&!(n==="gif"))return F("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:o};let Z=parseFloat((0,K.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",ne(e)]).toString());if(isNaN(Z))throw"Failed to get video duration.";let d=~~((i?i*7/Z:9999999)/1024),y,A;switch(n){case"audio":y=["-i",ne(e),"-b:a",`${d}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y"],A="mp3";break;case"video":default:let O=d<=100?480:d<=500?720:1080;y=["-i",ne(e),"-b:v",`${~~(d*.8)}k`,"-b:a",`${~~(d*.2)}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${O}`],A="mp4";break;case"gif":let E,b,S,D;switch(a){case 1:E=5,b=360,S=24,D=5;break;case 2:E=10,b=420,S=32,D=5;break;default:case 3:E=15,b=480,S=64,D=4;break;case 4:E=20,b=540,S=64,D=3;break;case 5:E=30,b=720,S=128,D=1;break}y=["-i",ne(e),"-vf",`fps=${E},scale=w=${b}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${S}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${D}`,"-loop","0","-bufsize","1M","-y"],A="gif";break}return await Sn([...y,...u,`remux.${A}`]),{file:`remux.${A}`,videoTitle:t,extension:A}}function kn({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:w.readFileSync(ne(e)),title:`${t}.${r}`}}async function Pn(e,t){Le="";try{let r=await En(t),n=bn(r,t),i=await Dn(n,t),a=await Rn(i,t),o=kn(a);return{logs:Le,...o}}catch(r){return{error:r.toString(),logs:Le}}}function _n(e){try{return(0,K.execFileSync)("ffmpeg",["-version"]),(0,K.execFileSync)("ffprobe",["-version"]),ie=!0,!0}catch{return ie=!1,!1}}async function On(e){try{return(0,K.execFileSync)("yt-dlp",["--version"]),lt=!0,!0}catch{return lt=!1,!1}}async function Gn(e){F("Interrupting..."),de?.kill(),me?.kill(),lr()}var Mn=()=>Y,Ln=()=>lt,Nn=()=>ie;var vt={};X(vt,{chooseDir:()=>$n,deleteFileNative:()=>Wn,getDefaultNativeDataDir:()=>J,getDefaultNativeImageDir:()=>be,getImageNative:()=>jn,getLogsFromFs:()=>Hn,getNativeSavedImages:()=>Fn,getSettings:()=>je,init:()=>yr,initDirs:()=>vr,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>zn,showItemInFolder:()=>Yn,writeImageNative:()=>Zn,writeLogs:()=>Vn});l();var G=require("node:fs/promises"),oe=V(require("node:path"));l();var ze=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}};var Ze=require("electron");l();var ht=V(require("fs/promises")),hr=V(require("path"));l();var Fe=require("fs/promises"),pr=V(require("path"));async function Un(e){try{return await(0,Fe.access)(e),!0}catch{return!1}}async function ve(e){await Un(e)||await(0,Fe.mkdir)(e)}function pt(e){return pr.default.parse(e).name}async function je(){try{let e=await ht.default.readFile(await gr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await J(),imageCacheDir:await be()};try{await gt(t)}catch{}return t}}async function gt(e){!e||await ht.default.writeFile(await gr(),JSON.stringify(e,null,4),"utf8")}async function gr(){let e=await J();return await ve(e),hr.default.join(e,"mlSettings.json")}function zn(){}var ye=new Map,Fn=()=>ye,dt,mt,dr=async()=>mt??await be(),mr=async()=>dt??await J();async function vr(){let{logsDir:e,imageCacheDir:t}=await je();dt=e||await J(),mt=t||await be()}vr();async function yr(e){let t=await dr();await ve(t);let r=await(0,G.readdir)(t);for(let n of r){let i=pt(n);ye.set(i,oe.default.join(t,n))}}async function jn(e,t){let r=ye.get(t);return r?await(0,G.readFile)(r):null}async function Zn(e,t,r){if(!t||!r)return;let n=await dr(),i=pt(t);if(ye.get(i))return;let o=oe.default.join(n,t);await ve(n),await(0,G.writeFile)(o,r),ye.set(i,o)}async function Wn(e,t){let r=ye.get(t);!r||await(0,G.unlink)(r)}var Ir="message-logger-logs.json",Bn=new ze;async function Hn(e){let t=await mr();await ve(t);try{return JSON.parse(await(0,G.readFile)(oe.default.join(t,Ir),"utf-8"))}catch{}return null}async function Vn(e,t){let r=await mr();Bn.push(()=>(0,G.writeFile)(oe.default.join(r,Ir),t))}async function be(){return oe.default.join(await J(),"savedImages")}async function J(){return oe.default.join(he,"MessageLoggerData")}async function $n(e,t){let r=await je(),n=r[t]||await J(),a=(await Ze.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:n})).filePaths[0];if(!a)throw Error("Invalid Directory");switch(r[t]=a,await gt(r),t){case"logsDir":dt=a;break;case"imageCacheDir":mt=a;break}return t==="imageCacheDir"&&await yr(e),a}async function Yn(e,t){Ze.shell.showItemInFolder(t)}var yt={};X(yt,{resolveRedirect:()=>Jn});l();var wr=require("https"),Kn=/^https:\/\/(spotify\.link|s\.team)\/.+$/;function Ar(e){return new Promise((t,r)=>{let n=(0,wr.request)(new URL(e),{method:"HEAD"},i=>{t(i.headers.location?Ar(i.headers.location):e)});n.on("error",r),n.end()})}async function Jn(e,t){return Kn.test(t)?Ar(t):t}var It={};X(It,{readRecording:()=>qn});l();var Cr=require("electron"),Sr=require("fs/promises"),De=require("path");async function qn(e,t){t=(0,De.normalize)(t);let r=(0,De.basename)(t),n=(0,De.normalize)(Cr.app.getPath("userData")+"/");if(console.log(r,n,t),r!=="recording.ogg"||!t.startsWith(n))return null;try{let i=await(0,Sr.readFile)(t);return new Uint8Array(i.buffer)}catch{return null}}var Er={};l();var Tr=require("electron");l();var xr=`/* eslint-disable */

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
});`;Tr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.includes("discordsays")&&n.url.includes("youtube.com")){if(!R.store.plugins?.WatchTogetherAdblock?.enabled)return;n.executeJavaScript(xr)}})})});var wt={};X(wt,{sendToOverlay:()=>Xn});l();var Dr=require("dgram"),br;function Xn(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);br??=(0,Dr.createSocket)("udp4"),br.send(r,42069,"127.0.0.1")}var Rr={AppleMusicRichPresence:it,ConsoleShortcuts:ot,FixSpotifyEmbeds:or,FixYoutubeEmbeds:sr,MediaDownloader:ft,MessageLoggerEnhanced:vt,OpenInApp:yt,VoiceMessages:It,WatchTogetherAdblock:Er,XSOverlay:wt};var kr={};for(let[e,t]of Object.entries(Rr)){let r=Object.entries(t);if(!r.length)continue;let n=kr[e]={};for(let[i,a]of r){let o=`RivercordPluginNative_${e}_${i}`;At.ipcMain.handle(o,a),n[i]=o}}At.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=kr});l();Te();var v=require("electron");l();var Pr="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo=";var Re=require("fs"),we=require("fs/promises"),Ie=require("path");l();var Qn=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,ei=/^\\@/;function Ct(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function _r(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Or(e,t){if(!e)return Ct(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return Ct(t);let n={},i="",a="";for(let o of r.split(Qn))if(o.length!==0)if(o.charAt(0)==="@"&&o.charAt(1)!==" "){n[i]=a.trim();let s=o.indexOf(" ");i=o.substring(1,s),a=o.substring(s+1)}else a+=" "+o.replace("\\n",`
`).replace(ei,"@");return n[i]=a.trim(),delete n[""],Ct(t,n)}l();var Gr=require("electron");function Mr(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":Gr.shell.openExternal(t)}return{action:"deny"}})}(0,Re.mkdirSync)(te,{recursive:!0});function St(e,t){let r=(0,Ie.normalize)(e),n=(0,Ie.join)(e,t),i=(0,Ie.normalize)(n);return i.startsWith(r)?i:null}function ti(){return(0,we.readFile)(Ge,"utf-8").catch(()=>"")}async function ri(){let e=await(0,we.readdir)(te).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let n=await Lr(r).then(_r).catch(()=>null);n!=null&&t.push(Or(n,r))}return t}function Lr(e){e=e.replace(/\?v=\d+$/,"");let t=St(te,e);return t?(0,we.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}v.ipcMain.handle("RivercordOpenQuickCss",()=>v.shell.openPath(Ge));v.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!er.includes(r))throw"Disallowed protocol.";v.shell.openExternal(t)});v.ipcMain.handle("RivercordGetQuickCss",()=>ti());v.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,Re.writeFileSync)(Ge,t));v.ipcMain.handle("RivercordGetThemesDir",()=>te);v.ipcMain.handle("RivercordGetThemesList",()=>ri());v.ipcMain.handle("RivercordGetThemeData",(e,t)=>Lr(t));v.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${v.systemPreferences.getAccentColor?.()||""}`}));v.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=v.BrowserWindow.getAllWindows().find(n=>n.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new v.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,Ie.join)(__dirname,"rivercordDesktopPreload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});Mr(r),await r.loadURL(`data:text/html;base64,${Pr}`)});l();var tn=require("electron");l();var zr=require("module"),ni=(0,zr.createRequire)("/"),Be,ii=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Be=ni("worker_threads").Worker}catch{}var oi=Be?function(e,t,r,n,i){var a=!1,o=new Be(e+ii,{eval:!0}).on("error",function(s){return i(s,null)}).on("message",function(s){return i(null,s)}).on("exit",function(s){s&&!a&&i(new Error("exited with code "+s),null)});return o.postMessage(r,n),o.terminate=function(){return a=!0,Be.prototype.terminate.call(o)},o}:function(e,t,r,n,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var a=function(){};return{terminate:a,postMessage:a}},C=Uint8Array,q=Uint16Array,Et=Uint32Array,bt=new C([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Dt=new C([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fr=new C([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jr=function(e,t){for(var r=new q(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var i=new Et(r[30]),n=1;n<30;++n)for(var a=r[n];a<r[n+1];++a)i[a]=a-r[n]<<5|n;return[r,i]},Zr=jr(bt,2),Rt=Zr[0],ai=Zr[1];Rt[28]=258,ai[258]=28;var Wr=jr(Dt,0),Br=Wr[0],la=Wr[1],$e=new q(32768);for(g=0;g<32768;++g)j=(g&43690)>>>1|(g&21845)<<1,j=(j&52428)>>>2|(j&13107)<<2,j=(j&61680)>>>4|(j&3855)<<4,$e[g]=((j&65280)>>>8|(j&255)<<8)>>>1;var j,g,Ae=function(e,t,r){for(var n=e.length,i=0,a=new q(t);i<n;++i)e[i]&&++a[e[i]-1];var o=new q(t);for(i=0;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(r){s=new q(1<<t);var c=15-t;for(i=0;i<n;++i)if(e[i])for(var u=i<<4|e[i],f=t-e[i],m=o[e[i]-1]++<<f,T=m|(1<<f)-1;m<=T;++m)s[$e[m]>>>c]=u}else for(s=new q(n),i=0;i<n;++i)e[i]&&(s[i]=$e[o[e[i]-1]++]>>>15-e[i]);return s},ke=new C(288);for(g=0;g<144;++g)ke[g]=8;var g;for(g=144;g<256;++g)ke[g]=9;var g;for(g=256;g<280;++g)ke[g]=7;var g;for(g=280;g<288;++g)ke[g]=8;var g,Hr=new C(32);for(g=0;g<32;++g)Hr[g]=5;var g;var Vr=Ae(ke,9,1);var $r=Ae(Hr,5,1),He=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},k=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},Ve=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},Yr=function(e){return(e+7)/8|0},Ye=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var n=new(e.BYTES_PER_ELEMENT==2?q:e.BYTES_PER_ELEMENT==4?Et:C)(r-t);return n.set(e.subarray(t,r)),n};var Kr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],x=function(e,t,r){var n=new Error(t||Kr[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,x),!r)throw n;return n},Jr=function(e,t,r){var n=e.length;if(!n||r&&r.f&&!r.l)return t||new C(0);var i=!t||r,a=!r||r.i;r||(r={}),t||(t=new C(n*3));var o=function(Gt){var Mt=t.length;if(Gt>Mt){var Lt=new C(Math.max(Mt*2,Gt));Lt.set(t),t=Lt}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,m=r.d,T=r.m,N=r.n,Z=n*8;do{if(!f){s=k(e,c,1);var W=k(e,c+1,3);if(c+=3,W)if(W==1)f=Vr,m=$r,T=9,N=5;else if(W==2){var O=k(e,c,31)+257,E=k(e,c+10,15)+4,b=O+k(e,c+5,31)+1;c+=14;for(var S=new C(b),D=new C(19),I=0;I<E;++I)D[Fr[I]]=k(e,c+I*3,7);c+=E*3;for(var U=He(D),Pe=(1<<U)-1,se=Ae(D,U,1),I=0;I<b;){var Se=se[k(e,c,Pe)];c+=Se&15;var d=Se>>>4;if(d<16)S[I++]=d;else{var ce=0,_e=0;for(d==16?(_e=3+k(e,c,3),c+=2,ce=S[I-1]):d==17?(_e=3+k(e,c,7),c+=3):d==18&&(_e=11+k(e,c,127),c+=7);_e--;)S[I++]=ce}}var Pt=S.subarray(0,O),B=S.subarray(O);T=He(Pt),N=He(B),f=Ae(Pt,T,1),m=Ae(B,N,1)}else x(1);else{var d=Yr(c)+4,y=e[d-4]|e[d-3]<<8,A=d+y;if(A>n){a&&x(0);break}i&&o(u+y),t.set(e.subarray(d,A),u),r.b=u+=y,r.p=c=A*8,r.f=s;continue}if(c>Z){a&&x(0);break}}i&&o(u+131072);for(var an=(1<<T)-1,sn=(1<<N)-1,Ke=c;;Ke=c){var ce=f[Ve(e,c)&an],le=ce>>>4;if(c+=ce&15,c>Z){a&&x(0);break}if(ce||x(2),le<256)t[u++]=le;else if(le==256){Ke=c,f=null;break}else{var _t=le-254;if(le>264){var I=le-257,xe=bt[I];_t=k(e,c,(1<<xe)-1)+Rt[I],c+=xe}var Je=m[Ve(e,c)&sn],qe=Je>>>4;Je||x(3),c+=Je&15;var B=Br[qe];if(qe>3){var xe=Dt[qe];B+=Ve(e,c)&(1<<xe)-1,c+=xe}if(c>Z){a&&x(0);break}i&&o(u+131072);for(var Ot=u+_t;u<Ot;u+=4)t[u]=t[u-B],t[u+1]=t[u+1-B],t[u+2]=t[u+2-B],t[u+3]=t[u+3-B];u=Ot}}r.l=f,r.p=Ke,r.b=u,r.f=s,f&&(s=1,r.m=T,r.d=m,r.n=N)}while(!s);return u==t.length?t:Ye(t,0,u)};var si=new C(0);var ci=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},Nr=function(e,t,r){for(var n=e(),i=e.toString(),a=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var s=n[o],c=a[o];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var m in s.prototype)t+=";"+c+".prototype."+m+"="+s.prototype[m].toString()}else t+=u}else r[c]=s}return[t,r]},We=[],li=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},ui=function(e,t,r,n){var i;if(!We[r]){for(var a="",o={},s=e.length-1,c=0;c<s;++c)i=Nr(e[c],a,o),a=i[0],o=i[1];We[r]=Nr(e[s],a,o)}var u=ci({},We[r][1]);return oi(We[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,li(u),n)},fi=function(){return[C,q,Et,bt,Dt,Fr,Rt,Br,Vr,$r,$e,Kr,Ae,He,k,Ve,Yr,Ye,x,Jr,kt,qr,Xr]};var qr=function(e){return postMessage(e,[e.buffer])},Xr=function(e){return e&&e.size&&new C(e.size)},pi=function(e,t,r,n,i,a){var o=ui(r,n,i,function(s,c){o.terminate(),a(s,c)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}};var M=function(e,t){return e[t]|e[t+1]<<8},_=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},xt=function(e,t){return _(e,t)+_(e,t+4)*4294967296};function hi(e,t,r){return r||(r=t,t={}),typeof r!="function"&&x(7),pi(e,t,[fi],function(n){return qr(kt(n.data[0],Xr(n.data[1])))},1,r)}function kt(e,t){return Jr(e,t)}var Tt=typeof TextDecoder<"u"&&new TextDecoder,gi=0;try{Tt.decode(si,{stream:!0}),gi=1}catch{}var di=function(e){for(var t="",r=0;;){var n=e[r++],i=(n>127)+(n>223)+(n>239);if(r+i>e.length)return[t,Ye(e,r-1)];i?i==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function mi(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(Tt)return Tt.decode(e);var i=di(e),a=i[0],o=i[1];return o.length&&x(8),a}}var vi=function(e,t){return t+30+M(e,t+26)+M(e,t+28)},yi=function(e,t,r){var n=M(e,t+28),i=mi(e.subarray(t+46,t+46+n),!(M(e,t+8)&2048)),a=t+46+n,o=_(e,t+20),s=r&&o==4294967295?Ii(e,a):[o,_(e,t+24),_(e,t+42)],c=s[0],u=s[1],f=s[2];return[M(e,t+10),c,u,i,a+M(e,t+30)+M(e,t+32),f]},Ii=function(e,t){for(;M(e,t)!=1;t+=4+M(e,t+2));return[xt(e,t+12),xt(e,t+4),xt(e,t+20)]};var Ur=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Qr(e,t,r){r||(r=t,t={}),typeof r!="function"&&x(7);var n=[],i=function(){for(var d=0;d<n.length;++d)n[d]()},a={},o=function(d,y){Ur(function(){r(d,y)})};Ur(function(){o=r});for(var s=e.length-22;_(e,s)!=101010256;--s)if(!s||e.length-s>65558)return o(x(13,0,1),null),i;var c=M(e,s+8);if(c){var u=c,f=_(e,s+16),m=f==4294967295||u==65535;if(m){var T=_(e,s-12);m=_(e,T)==101075792,m&&(u=c=_(e,T+32),f=_(e,T+48))}for(var N=t&&t.filter,Z=function(d){var y=yi(e,f,m),A=y[0],O=y[1],E=y[2],b=y[3],S=y[4],D=y[5],I=vi(e,D);f=S;var U=function(se,Se){se?(i(),o(se,null)):(Se&&(a[b]=Se),--c||o(null,a))};if(!N||N({name:b,size:O,originalSize:E,compression:A}))if(!A)U(null,Ye(e,I,I+O));else if(A==8){var Pe=e.subarray(I,I+O);if(O<32e4)try{U(null,kt(Pe,new C(E)))}catch(se){U(se,null)}else n.push(hi(Pe,{size:E},U))}else U(x(14,"unknown compression type "+A,1),null);else U(null,null)},W=0;W<u;++W)Z(W)}else o(null,{});return i}var rn=require("fs"),L=require("fs/promises"),Ce=require("path");l();function en(e){function t(o,s,c,u){let f=0;return f+=o<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,n=e[4]===2;if(!n&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(n){let o=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+o+s;return e.subarray(c,e.length)}let a=12+t(e[8],e[9],e[10],e[11]);return e.subarray(a,e.length)}et();var wi=(0,Ce.join)(he,"ExtensionCache");async function Ai(e,t){return await(0,L.mkdir)(t,{recursive:!0}),new Promise((r,n)=>{Qr(e,(i,a)=>{if(i)return void n(i);Promise.all(Object.keys(a).map(async o=>{if(o.startsWith("_metadata/"))return;if(o.endsWith("/"))return void(0,L.mkdir)((0,Ce.join)(t,o),{recursive:!0});let s=o.split("/"),c=s.pop(),u=s.join("/"),f=(0,Ce.join)(t,u);u&&await(0,L.mkdir)(f,{recursive:!0}),await(0,L.writeFile)((0,Ce.join)(f,c),a[o])})).then(()=>r()).catch(o=>{(0,L.rm)(t,{recursive:!0,force:!0}),n(o)})})})}async function nn(e){let t=(0,Ce.join)(wi,`${e}`);try{await(0,L.access)(t,rn.constants.F_OK)}catch{let n=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,i=await ee(n,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await Ai(en(i),t).catch(console.error)}tn.session.defaultSession.loadExtension(t)}ae.app.whenReady().then(()=>{ae.protocol.registerFileProtocol("rivercord",({url:i},a)=>{let o=i.slice(12);if(o.endsWith("/")&&(o=o.slice(0,-1)),o.startsWith("/themes/")){let s=o.slice(8),c=St(te,s);if(!c){a({statusCode:403});return}a(c.replace(/\?v=\d+$/,""));return}switch(o){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":a((0,on.join)(__dirname,o));break;default:a({statusCode:403})}});try{R.store.enableReactDevtools&&nn("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(i=>console.error("[Rivercord] Failed to install React Developer Tools",i))}catch{}let e=(i,a)=>Object.keys(i).find(o=>o.toLowerCase()===a),t=i=>{let a={};return i.split(";").forEach(o=>{let[s,...c]=o.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(a,s)&&(a[s]=c)}),a},r=i=>Object.entries(i).filter(([,a])=>a?.length).map(a=>a.flat().join(" ")).join("; "),n=i=>{let a=e(i,"content-security-policy");if(a){let o=t(i[a][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src","script-src","frame-src"])o[s]??=[],o[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");i[a]=[r(o)]}};ae.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:i,resourceType:a},o)=>{if(i&&(a==="mainFrame"&&n(i),a==="stylesheet")){let s=e(i,"content-type");s&&(i[s]=["text/css"])}o({cancel:!1,responseHeaders:i})}),ae.session.defaultSession.webRequest.onHeadersReceived=()=>{}});
//# sourceURL=RivercordDesktopMain
//# sourceMappingURL=rivercord://rivercordDesktopMain.js.map
/*! For license information please see rivercordDesktopMain.js.LEGAL.txt */
