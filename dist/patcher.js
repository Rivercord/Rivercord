// Rivercord 22ae0969
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var Wn=Object.create;var je=Object.defineProperty;var Bn=Object.getOwnPropertyDescriptor;var Hn=Object.getOwnPropertyNames;var Vn=Object.getPrototypeOf,$n=Object.prototype.hasOwnProperty;var h=(e,t)=>()=>(e&&(t=e(e=0)),t);var ne=(e,t)=>{for(var r in t)je(e,r,{get:t[r],enumerable:!0})},$t=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Hn(t))!$n.call(e,n)&&n!==r&&je(e,n,{get:()=>t[n],enumerable:!(i=Bn(t,n))||i.enumerable});return e};var j=(e,t,r)=>(r=e!=null?Wn(Vn(e)):{},$t(t||!e||!e.__esModule?je(r,"default",{value:e,enumerable:!0}):r,e)),nt=e=>$t(je({},"__esModule",{value:!0}),e);var l=h(()=>{"use strict"});var ke=h(()=>{"use strict";l()});function Re(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var Yt=h(()=>{"use strict";l()});var Xn={};function me(...e){let t={cwd:Xt};return ot?it("flatpak-spawn",["--host","git",...e],t):it("git",e,t)}async function Yn(){return(await me("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function Kn(){await me("fetch");let e=(await me("branch","--show-current")).stdout.trim();if(!((await me("ls-remote","origin",e)).stdout.length>0))return[];let i=(await me("log",`HEAD...origin/${e}`,"--pretty=format:%an/%h/%s")).stdout.trim();return i?i.split(`
`).map(n=>{let[o,a,...s]=n.split("/");return{hash:a,author:o,message:s.join("/").split(`
`)[0]}}):[]}async function qn(){return(await me("pull")).stdout.includes("Fast-forward")}async function Jn(){return!(await it(ot?"flatpak-spawn":"node",ot?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:Xt})).stderr.includes("Build failed")}var Kt,Pe,qt,Jt,Xt,it,ot,Qt=h(()=>{"use strict";l();ke();Kt=require("child_process"),Pe=require("electron"),qt=require("path"),Jt=require("util");Yt();Xt=(0,qt.join)(__dirname,".."),it=(0,Jt.promisify)(Kt.execFile),ot=!1;Pe.ipcMain.handle("RivercordGetRepo",Re(Yn));Pe.ipcMain.handle("RivercordGetUpdates",Re(Kn));Pe.ipcMain.handle("RivercordUpdate",Re(qn));Pe.ipcMain.handle("RivercordBuild",Re(Jn))});var er=h(()=>{"use strict";l();Qt()});var ct={};ne(ct,{fetchTrackData:()=>ei});async function st(e){let{stdout:t}=await or("osascript",e.map(r=>["-e",r]).flat());return t}function tr(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}async function Qn({id:e,name:t,artist:r,album:i}){if(e===L?.id){if("data"in L)return L.data;if("failures"in L&&L.failures>=5)return null}try{let[n,o]=await Promise.all([fetch(tr("songs",r+" "+i+" "+t),rr).then(f=>f.json()),fetch(tr("artists",r.split(/ *[,&] */)[0]),rr).then(f=>f.json())]),a=n?.songs?.data[0]?.attributes.url,s=n?.songs?.data[0]?.id?`https://song.link/i/${n?.songs?.data[0]?.id}`:void 0,c=n?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=o?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return L={id:e,data:{appleMusicLink:a,songLink:s,albumArtwork:c,artistArtwork:u}},L.data}catch(n){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",n),L={id:e,failures:(e===L?.id&&"failures"in L?L.failures:0)+1},null}}async function ei(){try{await or("pgrep",["^Music$"])}catch{return null}if(await st(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await st(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await st(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[i,n,o,a,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await Qn({id:i,name:n,artist:a,album:o});return{name:n,album:o,artist:a,playerPosition:t,duration:c,...u}}var nr,ir,or,rr,L,ar=h(()=>{"use strict";l();nr=require("child_process"),ir=require("util"),or=(0,ir.promisify)(nr.execFile);rr={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},L=null});var lt={};ne(lt,{initDevtoolsOpenEagerLoad:()=>ti});function ti(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var sr=h(()=>{"use strict";l()});var _e,cr=h(()=>{"use strict";l();_e=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,i=""){let n=this;return new Proxy(t,{get(o,a){let s=o[a];return!(a in o)&&n.getDefaultValue&&(s=n.getDefaultValue({target:o,key:a,root:r,path:i})),typeof s=="object"&&s!==null&&!Array.isArray(s)?n.makeProxy(s,r,`${i}${i&&"."}${a}`):s},set(o,a,s){if(o[a]===s)return!0;Reflect.set(o,a,s);let c=`${i}${i&&"."}${a}`;return n.globalListeners.forEach(u=>u(s,c)),n.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let i=t,n=r.split(".");for(let o of n){if(!i){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}i=i[o]}this.pathListeners.get(r)?.forEach(o=>o(i))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let i=this.pathListeners.get(t)??new Set;i.add(r),this.pathListeners.set(t,i)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let i=this.pathListeners.get(t);!i||(i.delete(r),i.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}}});function ut(e,t){for(let r in t){let i=t[r];typeof i=="object"&&!Array.isArray(i)?(e[r]??={},ut(e[r],i)):e[r]??=i}return e}var lr=h(()=>{"use strict";l()});var ur,q,ve,ye,J,Ie,ft,pt,fr,Fe,ie=h(()=>{"use strict";l();ur=require("electron"),q=require("path"),ve=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,q.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,q.join)(ur.app.getPath("userData"),"..","Rivercord")),ye=(0,q.join)(ve,"settings"),J=(0,q.join)(ve,"themes"),Ie=(0,q.join)(ye,"quickCss.css"),ft=(0,q.join)(ye,"settings.json"),pt=(0,q.join)(ye,"native-settings.json"),fr=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"],Fe=process.argv.includes("--vanilla")});function dr(e,t){try{return JSON.parse((0,oe.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var Ue,oe,b,ri,hr,pr,ae=h(()=>{"use strict";l();ke();cr();lr();Ue=require("electron"),oe=require("fs");ie();(0,oe.mkdirSync)(ye,{recursive:!0});b=new _e(dr("renderer",ft));b.addGlobalChangeListener(()=>{try{(0,oe.writeFileSync)(ft,JSON.stringify(b.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Ue.ipcMain.handle("RivercordGetSettingsDir",()=>ye);Ue.ipcMain.on("RivercordGetSettings",e=>e.returnValue=b.plain);Ue.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{b.setData(t,r)});ri={plugins:{}},hr=dr("native",pt);ut(hr,ri);pr=new _e(hr);pr.addGlobalChangeListener(()=>{try{(0,oe.writeFileSync)(pt,JSON.stringify(pr.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}})});var mr={};var gr,vr=h(()=>{"use strict";l();ae();gr=require("electron");gr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://open.spotify.com/embed/")){let n=b.store.plugins?.FixSpotifyEmbeds;if(!n?.enabled)return;i.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${n.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var Ir={};var yr,wr=h(()=>{"use strict";l();ae();yr=require("electron");yr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://www.youtube.com/")){if(!b.store.plugins?.FixYoutubeEmbeds?.enabled)return;i.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var gt={};ne(gt,{checkffmpeg:()=>pi,checkytdlp:()=>di,execute:()=>fi,getStdout:()=>gi,interrupt:()=>hi,isFfmpegAvailable:()=>vi,isYtdlpAvailable:()=>mi,start:()=>ii,stop:()=>oi});function Tr(e){H(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{we=(0,Q.spawn)("yt-dlp",e,{cwd:We()}),we.stdout.on("data",n=>Ze(n)),we.stderr.on("data",n=>{Ze(n),Sr(`yt-dlp encountered an error: ${n}`),t+=n}),we.on("exit",n=>{we=null,n===0?r(X):i(new Error(t||`yt-dlp exited with code ${n}`))})})}function ni(e){H(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{Ae=(0,Q.spawn)("ffmpeg",e,{cwd:We()}),Ae.stdout.on("data",n=>Ze(n)),Ae.stderr.on("data",n=>{Ze(n),Sr(`ffmpeg encountered an error: ${n}`),t+=n}),Ae.on("exit",n=>{Ae=null,n===0?r(X):i(new Error(t||`ffmpeg exited with code ${n}`))})})}async function ii(e,t){return t||=A.mkdtempSync(ht.default.join(Ar.default.tmpdir(),"vencord_mediaDownloader_")),A.existsSync(t)||A.mkdirSync(t,{recursive:!0}),B=t,H("Using workdir: ",B),B}async function oi(e){B&&(H("Cleaning up workdir"),A.rmSync(B,{recursive:!0}),B=null)}async function ai(e){X="";let t=JSON.parse(await Tr(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return X="",{videoTitle:`${t.title||"video"} (${t.id})`}}function si({videoTitle:e},{maxFileSize:t,format:r}){let i=!!t,n=i?t*.8:0,o=i?t*.2:0,a={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=a;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(ce?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",i?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",i?`[filesize<${n}]`:"").replaceAll("{AUD_SIZE}",i?`[filesize<${o}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return H("Video formated calculated as ",f),H(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${ce}`),{format:f,videoTitle:e}}async function ci({format:e,videoTitle:t},{ytdlpArgs:r,url:i,format:n}){Cr();let o=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],a=ce?n==="video"?["--remux-video","webm>webm/mp4"]:n==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await Tr([i,...o,...a,...s]);let c=A.readdirSync(We()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function li({file:e,videoTitle:t},{ffmpegArgs:r,format:i,maxFileSize:n,gifQuality:o}){let a=e.split(".").pop();if(!ce)return H("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:a};let s=["mp3","mp4","webm"],c=A.statSync(se(e)).size,u=r?.filter(Boolean)||[],f=s.includes(a??""),v=!n||c<=n,D=u.length>0;if(f&&v&&!D&&!(i==="gif"))return H("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:a};let $=parseFloat((0,Q.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",se(e)]).toString());if(isNaN($))throw"Failed to get video duration.";let m=~~((n?n*7/$:9999999)/1024),I,S;switch(i){case"audio":I=["-i",se(e),"-b:a",`${m}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y"],S="mp3";break;case"video":default:let N=m<=100?480:m<=500?720:1080;I=["-i",se(e),"-b:v",`${~~(m*.8)}k`,"-b:a",`${~~(m*.2)}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${N}`],S="mp4";break;case"gif":let k,P,x,_;switch(o){case 1:k=5,P=360,x=24,_=5;break;case 2:k=10,P=420,x=32,_=5;break;default:case 3:k=15,P=480,x=64,_=4;break;case 4:k=20,P=540,x=64,_=3;break;case 5:k=30,P=720,x=128,_=1;break}I=["-i",se(e),"-vf",`fps=${k},scale=w=${P}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${x}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${_}`,"-loop","0","-bufsize","1M","-y"],S="gif";break}return await ni([...I,...u,`remux.${S}`]),{file:`remux.${S}`,videoTitle:t,extension:S}}function ui({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:A.readFileSync(se(e)),title:`${t}.${r}`}}async function fi(e,t){ze="";try{let r=await ai(t),i=si(r,t),n=await ci(i,t),o=await li(n,t),a=ui(o);return{logs:ze,...a}}catch(r){return{error:r.toString(),logs:ze}}}function pi(e){try{return(0,Q.execFileSync)("ffmpeg",["-version"]),(0,Q.execFileSync)("ffprobe",["-version"]),ce=!0,!0}catch{return ce=!1,!1}}async function di(e){try{return(0,Q.execFileSync)("yt-dlp",["--version"]),dt=!0,!0}catch{return dt=!1,!1}}async function hi(e){H("Interrupting..."),we?.kill(),Ae?.kill(),Cr()}var Q,A,Ar,ht,B,X,ze,dt,ce,we,Ae,We,se,Cr,Ze,H,Sr,gi,mi,vi,xr=h(()=>{"use strict";l();Q=require("child_process"),A=j(require("fs")),Ar=j(require("os")),ht=j(require("path")),B=null,X="",ze="",dt=!1,ce=!1,we=null,Ae=null,We=()=>B??process.cwd(),se=e=>ht.default.join(We(),e),Cr=()=>{!B||A.readdirSync(B).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>A.unlinkSync(se(e)))},Ze=e=>(X+=e,X=X.replace(/^.*\r([^\n])/gm,"$1")),H=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),ze+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),Sr=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);gi=()=>X,mi=()=>dt,vi=()=>ce});var Be,br=h(()=>{"use strict";l();Be=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}}});async function yi(e){try{return await(0,He.access)(e),!0}catch{return!1}}async function Ce(e){await yi(e)||await(0,He.mkdir)(e)}function mt(e){return Er.default.parse(e).name}var He,Er,vt=h(()=>{"use strict";l();He=require("fs/promises"),Er=j(require("path"))});async function Ve(){try{let e=await yt.default.readFile(await kr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await ee(),imageCacheDir:await Oe()};try{await It(t)}catch{}return t}}async function It(e){!e||await yt.default.writeFile(await kr(),JSON.stringify(e,null,4),"utf8")}async function kr(){let e=await ee();return await Ce(e),Dr.default.join(e,"mlSettings.json")}var yt,Dr,Rr=h(()=>{"use strict";l();yt=j(require("fs/promises")),Dr=j(require("path"));wt();vt()});var St={};ne(St,{chooseDir:()=>Ei,deleteFileNative:()=>Si,getDefaultNativeDataDir:()=>ee,getDefaultNativeImageDir:()=>Oe,getImageNative:()=>Ai,getLogsFromFs:()=>xi,getNativeSavedImages:()=>wi,getSettings:()=>Ve,init:()=>Mr,initDirs:()=>Or,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>Ii,showItemInFolder:()=>Di,writeImageNative:()=>Ci,writeLogs:()=>bi});function Ii(){}async function Or(){let{logsDir:e,imageCacheDir:t}=await Ve();At=e||await ee(),Ct=t||await Oe()}async function Mr(e){let t=await Pr();await Ce(t);let r=await(0,F.readdir)(t);for(let i of r){let n=mt(i);Se.set(n,le.default.join(t,i))}}async function Ai(e,t){let r=Se.get(t);return r?await(0,F.readFile)(r):null}async function Ci(e,t,r){if(!t||!r)return;let i=await Pr(),n=mt(t);if(Se.get(n))return;let a=le.default.join(i,t);await Ce(i),await(0,F.writeFile)(a,r),Se.set(n,a)}async function Si(e,t){let r=Se.get(t);!r||await(0,F.unlink)(r)}async function xi(e){let t=await _r();await Ce(t);try{return JSON.parse(await(0,F.readFile)(le.default.join(t,Lr),"utf-8"))}catch{}return null}async function bi(e,t){let r=await _r();Ti.push(()=>(0,F.writeFile)(le.default.join(r,Lr),t))}async function Oe(){return le.default.join(await ee(),"savedImages")}async function ee(){return le.default.join(ve,"MessageLoggerData")}async function Ei(e,t){let r=await Ve(),i=r[t]||await ee(),o=(await $e.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:i})).filePaths[0];if(!o)throw Error("Invalid Directory");switch(r[t]=o,await It(r),t){case"logsDir":At=o;break;case"imageCacheDir":Ct=o;break}return t==="imageCacheDir"&&await Mr(e),o}async function Di(e,t){$e.shell.showItemInFolder(t)}var F,le,$e,Se,wi,At,Ct,Pr,_r,Lr,Ti,wt=h(()=>{"use strict";l();F=require("node:fs/promises"),le=j(require("node:path"));br();$e=require("electron");ie();Rr();vt();Se=new Map,wi=()=>Se,Pr=async()=>Ct??await Oe(),_r=async()=>At??await ee();Or();Lr="message-logger-logs.json",Ti=new Be});var Tt={};ne(Tt,{resolveRedirect:()=>Ri});function Nr(e){return new Promise((t,r)=>{let i=(0,Gr.request)(new URL(e),{method:"HEAD"},n=>{t(n.headers.location?Nr(n.headers.location):e)});i.on("error",r),i.end()})}async function Ri(e,t){return ki.test(t)?Nr(t):t}var Gr,ki,jr=h(()=>{"use strict";l();Gr=require("https"),ki=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var xt={};ne(xt,{readRecording:()=>Pi});async function Pi(e,t){t=(0,Me.normalize)(t);let r=(0,Me.basename)(t),i=(0,Me.normalize)(Fr.app.getPath("userData")+"/");if(console.log(r,i,t),r!=="recording.ogg"||!t.startsWith(i))return null;try{let n=await(0,Ur.readFile)(t);return new Uint8Array(n.buffer)}catch{return null}}var Fr,Ur,Me,zr=h(()=>{"use strict";l();Fr=require("electron"),Ur=require("fs/promises"),Me=require("path")});var Zr,Wr=h(()=>{l();Zr=`/* eslint-disable */

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
});`});var Hr={};var Br,Vr=h(()=>{"use strict";l();ae();Br=require("electron");Wr();Br.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.includes("discordsays")&&i.url.includes("youtube.com")){if(!b.store.plugins?.WatchTogetherAdblock?.enabled)return;i.executeJavaScript(Zr)}})})})});var bt={};ne(bt,{sendToOverlay:()=>_i});function _i(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);$r??=(0,Yr.createSocket)("udp4"),$r.send(r,42069,"127.0.0.1")}var Yr,$r,Kr=h(()=>{"use strict";l();Yr=require("dgram")});var qr,Jr=h(()=>{l();ar();sr();vr();wr();xr();wt();jr();zr();Vr();Kr();qr={AppleMusicRichPresence:ct,ConsoleShortcuts:lt,FixSpotifyEmbeds:mr,FixYoutubeEmbeds:Ir,MediaDownloader:gt,MessageLoggerEnhanced:St,OpenInApp:Tt,VoiceMessages:xt,WatchTogetherAdblock:Hr,XSOverlay:bt}});var Et,Xr,Qr=h(()=>{"use strict";l();ke();Et=require("electron");Jr();Xr={};for(let[e,t]of Object.entries(qr)){let r=Object.entries(t);if(!r.length)continue;let i=Xr[e]={};for(let[n,o]of r){let a=`RivercordPluginNative_${e}_${n}`;Et.ipcMain.handle(a,o),i[n]=a}}Et.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=Xr})});function Dt(e,t=300){let r;return function(...i){clearTimeout(r),r=setTimeout(()=>{e(...i)},t)}}var en=h(()=>{"use strict";l()});var tn,rn=h(()=>{l();tn="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo="});function kt(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function nn(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function on(e,t){if(!e)return kt(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return kt(t);let i={},n="",o="";for(let a of r.split(Oi))if(a.length!==0)if(a.charAt(0)==="@"&&a.charAt(1)!==" "){i[n]=o.trim();let s=a.indexOf(" ");n=a.substring(1,s),o=a.substring(s+1)}else o+=" "+a.replace("\\n",`
`).replace(Mi,"@");return i[n]=o.trim(),delete i[""],kt(t,i)}var Oi,Mi,an=h(()=>{"use strict";l();Oi=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,Mi=/^\\@/});function cn(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":sn.shell.openExternal(t)}return{action:"deny"}})}var sn,ln=h(()=>{"use strict";l();sn=require("electron")});function Rt(e,t){let r=(0,Te.normalize)(e),i=(0,Te.join)(e,t),n=(0,Te.normalize)(i);return n.startsWith(r)?n:null}function un(){return(0,fe.readFile)(Ie,"utf-8").catch(()=>"")}async function Li(){let e=await(0,fe.readdir)(J).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let i=await fn(r).then(nn).catch(()=>null);i!=null&&t.push(on(i,r))}return t}function fn(e){e=e.replace(/\?v=\d+$/,"");let t=Rt(J,e);return t?(0,fe.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}function pn(e){let t;(0,fe.open)(Ie,"a+").then(i=>{i.close(),t=(0,ue.watch)(Ie,{persistent:!1},Dt(async()=>{e.webContents.postMessage("RivercordQuickCssUpdate",await un())},50))}).catch(()=>{});let r=(0,ue.watch)(J,{persistent:!1},Dt(()=>{e.webContents.postMessage("RivercordThemeUpdate",void 0)}));e.once("closed",()=>{t?.close(),r.close()})}var y,ue,fe,Te,Pt=h(()=>{"use strict";l();er();Qr();ae();en();ke();y=require("electron");rn();ue=require("fs"),fe=require("fs/promises"),Te=require("path");an();ie();ln();(0,ue.mkdirSync)(J,{recursive:!0});y.ipcMain.handle("RivercordOpenQuickCss",()=>y.shell.openPath(Ie));y.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!fr.includes(r))throw"Disallowed protocol.";y.shell.openExternal(t)});y.ipcMain.handle("RivercordGetQuickCss",()=>un());y.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,ue.writeFileSync)(Ie,t));y.ipcMain.handle("RivercordGetThemesDir",()=>J);y.ipcMain.handle("RivercordGetThemesList",()=>Li());y.ipcMain.handle("RivercordGetThemeData",(e,t)=>fn(t));y.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${y.systemPreferences.getAccentColor?.()||""}`}));y.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=y.BrowserWindow.getAllWindows().find(i=>i.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new y.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,Te.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});cn(r),await r.loadURL(`data:text/html;base64,${tn}`)})});function Ln(e,t,r){let i=t;if(t in e)return void r(e[i]);Object.defineProperty(e,t,{set(n){delete e[i],e[i]=n,r(n)},configurable:!0,enumerable:!1})}var Gn=h(()=>{"use strict";l()});var no={};function to(e,t){let r=e.slice(4).split(".").map(Number),i=t.slice(4).split(".").map(Number);for(let n=0;n<i.length;n++){if(r[n]>i[n])return!0;if(r[n]<i[n])return!1}return!1}function ro(){if(!process.env.DISABLE_UPDATER_AUTO_PATCHING)try{let e=(0,M.dirname)(process.execPath),t=(0,M.basename)(e),r=(0,M.join)(e,".."),i=(0,R.readdirSync)(r).reduce((s,c)=>c.startsWith("app-")&&to(c,s)?c:s,t);if(i===t)return;let n=(0,M.join)(r,i,"resources"),o=(0,M.join)(n,"app.asar"),a=(0,M.join)(n,"_app.asar");if(!(0,R.existsSync)(o)||(0,R.statSync)(o).isDirectory())return;console.info("[Rivercord] Detected Host Update. Repatching..."),(0,R.renameSync)(o,a),(0,R.mkdirSync)(o),(0,R.writeFileSync)((0,M.join)(o,"package.json"),JSON.stringify({name:"discord",main:"index.js"})),(0,R.writeFileSync)((0,M.join)(o,"index.js"),`require(${JSON.stringify((0,M.join)(__dirname,"patcher.js"))});`)}catch(e){console.error("[Rivercord] Failed to repatch latest host update",e)}}var Nn,R,M,jn=h(()=>{"use strict";l();Nn=require("electron"),R=require("original-fs"),M=require("path");Nn.app.on("before-quit",ro)});var so={};var C,re,io,oo,Ut,ao,Fn=h(()=>{"use strict";l();Gn();C=j(require("electron")),re=require("path");Pt();ae();ie();console.log("[Rivercord] Starting up...");io=require.main.filename,oo=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",Ut=(0,re.join)((0,re.dirname)(io),"..",oo),ao=require((0,re.join)(Ut,"package.json"));require.main.filename=(0,re.join)(Ut,ao.main);C.app.setAppPath(Ut);if(Fe)console.log("[Rivercord] Running in vanilla mode. Not loading Rivercord");else{let e=b.store;if(jn(),e.winCtrlQ){let n=C.Menu.buildFromTemplate;C.Menu.buildFromTemplate=function(o){if(o[0]?.label==="&File"){let{submenu:a}=o[0];Array.isArray(a)&&a.push({label:"Quit (Hidden)",visible:!1,acceleratorWorksWhenHidden:!0,accelerator:"Control+Q",click:()=>C.app.quit()})}return n.call(this,o)}}class t extends C.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let a=o.webPreferences.preload;o.webPreferences.preload=(0,re.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,e.frameless?o.frame=!1:e.winNativeTitleBar&&delete o.frame,e.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),!1&&(o.backgroundColor="#00000000",e.macosVibrancyStyle&&(o.vibrancy=e.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=a,super(o),pn(this)}else super(o)}}Object.assign(t,C.default.BrowserWindow),Object.defineProperty(t,"name",{value:"BrowserWindow",configurable:!0});let r=require.resolve("electron");delete require.cache[r].exports,require.cache[r].exports={...C.default,BrowserWindow:t},Ln(global,"appSettings",n=>{n.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0),e.disableMinSize?(n.set("MIN_WIDTH",0),n.set("MIN_HEIGHT",0)):(n.set("MIN_WIDTH",940),n.set("MIN_HEIGHT",500))}),process.env.DATA_DIR=(0,re.join)(C.app.getPath("userData"),"..","Rivercord");let i=C.app.commandLine.appendSwitch;C.app.commandLine.appendSwitch=function(...n){if(n[0]==="disable-features"){let o=new Set((n[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),n[1]+=[...o].join(",")}return i.apply(this,n)},C.app.commandLine.appendSwitch("disable-renderer-backgrounding"),C.app.commandLine.appendSwitch("disable-background-timer-throttling"),C.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Rivercord] Loading original Discord app.asar");require(require.main.filename)});l();var pe=require("electron"),Un=require("path");Pt();ae();ie();l();var _n=require("electron");l();var gn=require("module"),Gi=(0,gn.createRequire)("/"),Ke,Ni=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Ke=Gi("worker_threads").Worker}catch{}var ji=Ke?function(e,t,r,i,n){var o=!1,a=new Ke(e+Ni,{eval:!0}).on("error",function(s){return n(s,null)}).on("message",function(s){return n(null,s)}).on("exit",function(s){s&&!o&&n(new Error("exited with code "+s),null)});return a.postMessage(r,i),a.terminate=function(){return o=!0,Ke.prototype.terminate.call(a)},a}:function(e,t,r,i,n){setImmediate(function(){return n(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},T=Uint8Array,te=Uint16Array,Mt=Uint32Array,Lt=new T([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Gt=new T([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),mn=new T([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),vn=function(e,t){for(var r=new te(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var n=new Mt(r[30]),i=1;i<30;++i)for(var o=r[i];o<r[i+1];++o)n[o]=o-r[i]<<5|i;return[r,n]},yn=vn(Lt,2),Nt=yn[0],Fi=yn[1];Nt[28]=258,Fi[258]=28;var In=vn(Gt,0),wn=In[0],Ma=In[1],Xe=new te(32768);for(g=0;g<32768;++g)V=(g&43690)>>>1|(g&21845)<<1,V=(V&52428)>>>2|(V&13107)<<2,V=(V&61680)>>>4|(V&3855)<<4,Xe[g]=((V&65280)>>>8|(V&255)<<8)>>>1;var V,g,xe=function(e,t,r){for(var i=e.length,n=0,o=new te(t);n<i;++n)e[n]&&++o[e[n]-1];var a=new te(t);for(n=0;n<t;++n)a[n]=a[n-1]+o[n-1]<<1;var s;if(r){s=new te(1<<t);var c=15-t;for(n=0;n<i;++n)if(e[n])for(var u=n<<4|e[n],f=t-e[n],v=a[e[n]-1]++<<f,D=v|(1<<f)-1;v<=D;++v)s[Xe[v]>>>c]=u}else for(s=new te(i),n=0;n<i;++n)e[n]&&(s[n]=Xe[a[e[n]-1]++]>>>15-e[n]);return s},Le=new T(288);for(g=0;g<144;++g)Le[g]=8;var g;for(g=144;g<256;++g)Le[g]=9;var g;for(g=256;g<280;++g)Le[g]=7;var g;for(g=280;g<288;++g)Le[g]=8;var g,An=new T(32);for(g=0;g<32;++g)An[g]=5;var g;var Cn=xe(Le,9,1);var Sn=xe(An,5,1),qe=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},O=function(e,t,r){var i=t/8|0;return(e[i]|e[i+1]<<8)>>(t&7)&r},Je=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},Tn=function(e){return(e+7)/8|0},Qe=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var i=new(e.BYTES_PER_ELEMENT==2?te:e.BYTES_PER_ELEMENT==4?Mt:T)(r-t);return i.set(e.subarray(t,r)),i};var xn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(e,t,r){var i=new Error(t||xn[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,E),!r)throw i;return i},bn=function(e,t,r){var i=e.length;if(!i||r&&r.f&&!r.l)return t||new T(0);var n=!t||r,o=!r||r.i;r||(r={}),t||(t=new T(i*3));var a=function(Bt){var Ht=t.length;if(Bt>Ht){var Vt=new T(Math.max(Ht*2,Bt));Vt.set(t),t=Vt}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,v=r.d,D=r.m,Z=r.n,$=i*8;do{if(!f){s=O(e,c,1);var Y=O(e,c+1,3);if(c+=3,Y)if(Y==1)f=Cn,v=Sn,D=9,Z=5;else if(Y==2){var N=O(e,c,31)+257,k=O(e,c+10,15)+4,P=N+O(e,c+5,31)+1;c+=14;for(var x=new T(P),_=new T(19),w=0;w<k;++w)_[mn[w]]=O(e,c+w*3,7);c+=k*3;for(var W=qe(_),Ge=(1<<W)-1,de=xe(_,W,1),w=0;w<P;){var Ee=de[O(e,c,Ge)];c+=Ee&15;var m=Ee>>>4;if(m<16)x[w++]=m;else{var he=0,Ne=0;for(m==16?(Ne=3+O(e,c,3),c+=2,he=x[w-1]):m==17?(Ne=3+O(e,c,7),c+=3):m==18&&(Ne=11+O(e,c,127),c+=7);Ne--;)x[w++]=he}}var zt=x.subarray(0,N),K=x.subarray(N);D=qe(zt),Z=qe(K),f=xe(zt,D,1),v=xe(K,Z,1)}else E(1);else{var m=Tn(c)+4,I=e[m-4]|e[m-3]<<8,S=m+I;if(S>i){o&&E(0);break}n&&a(u+I),t.set(e.subarray(m,S),u),r.b=u+=I,r.p=c=S*8,r.f=s;continue}if(c>$){o&&E(0);break}}n&&a(u+131072);for(var zn=(1<<D)-1,Zn=(1<<Z)-1,et=c;;et=c){var he=f[Je(e,c)&zn],ge=he>>>4;if(c+=he&15,c>$){o&&E(0);break}if(he||E(2),ge<256)t[u++]=ge;else if(ge==256){et=c,f=null;break}else{var Zt=ge-254;if(ge>264){var w=ge-257,De=Lt[w];Zt=O(e,c,(1<<De)-1)+Nt[w],c+=De}var tt=v[Je(e,c)&Zn],rt=tt>>>4;tt||E(3),c+=tt&15;var K=wn[rt];if(rt>3){var De=Gt[rt];K+=Je(e,c)&(1<<De)-1,c+=De}if(c>$){o&&E(0);break}n&&a(u+131072);for(var Wt=u+Zt;u<Wt;u+=4)t[u]=t[u-K],t[u+1]=t[u+1-K],t[u+2]=t[u+2-K],t[u+3]=t[u+3-K];u=Wt}}r.l=f,r.p=et,r.b=u,r.f=s,f&&(s=1,r.m=D,r.d=v,r.n=Z)}while(!s);return u==t.length?t:Qe(t,0,u)};var Ui=new T(0);var zi=function(e,t){var r={};for(var i in e)r[i]=e[i];for(var i in t)r[i]=t[i];return r},dn=function(e,t,r){for(var i=e(),n=e.toString(),o=n.slice(n.indexOf("[")+1,n.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<i.length;++a){var s=i[a],c=o[a];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var v in s.prototype)t+=";"+c+".prototype."+v+"="+s.prototype[v].toString()}else t+=u}else r[c]=s}return[t,r]},Ye=[],Zi=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},Wi=function(e,t,r,i){var n;if(!Ye[r]){for(var o="",a={},s=e.length-1,c=0;c<s;++c)n=dn(e[c],o,a),o=n[0],a=n[1];Ye[r]=dn(e[s],o,a)}var u=zi({},Ye[r][1]);return ji(Ye[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,Zi(u),i)},Bi=function(){return[T,te,Mt,Lt,Gt,mn,Nt,wn,Cn,Sn,Xe,xn,xe,qe,O,Je,Tn,Qe,E,bn,jt,En,Dn]};var En=function(e){return postMessage(e,[e.buffer])},Dn=function(e){return e&&e.size&&new T(e.size)},Hi=function(e,t,r,i,n,o){var a=Wi(r,i,n,function(s,c){a.terminate(),o(s,c)});return a.postMessage([e,t],t.consume?[e.buffer]:[]),function(){a.terminate()}};var U=function(e,t){return e[t]|e[t+1]<<8},G=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},_t=function(e,t){return G(e,t)+G(e,t+4)*4294967296};function Vi(e,t,r){return r||(r=t,t={}),typeof r!="function"&&E(7),Hi(e,t,[Bi],function(i){return En(jt(i.data[0],Dn(i.data[1])))},1,r)}function jt(e,t){return bn(e,t)}var Ot=typeof TextDecoder<"u"&&new TextDecoder,$i=0;try{Ot.decode(Ui,{stream:!0}),$i=1}catch{}var Yi=function(e){for(var t="",r=0;;){var i=e[r++],n=(i>127)+(i>223)+(i>239);if(r+n>e.length)return[t,Qe(e,r-1)];n?n==3?(i=((i&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023)):n&1?t+=String.fromCharCode((i&31)<<6|e[r++]&63):t+=String.fromCharCode((i&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(i)}};function Ki(e,t){if(t){for(var r="",i=0;i<e.length;i+=16384)r+=String.fromCharCode.apply(null,e.subarray(i,i+16384));return r}else{if(Ot)return Ot.decode(e);var n=Yi(e),o=n[0],a=n[1];return a.length&&E(8),o}}var qi=function(e,t){return t+30+U(e,t+26)+U(e,t+28)},Ji=function(e,t,r){var i=U(e,t+28),n=Ki(e.subarray(t+46,t+46+i),!(U(e,t+8)&2048)),o=t+46+i,a=G(e,t+20),s=r&&a==4294967295?Xi(e,o):[a,G(e,t+24),G(e,t+42)],c=s[0],u=s[1],f=s[2];return[U(e,t+10),c,u,n,o+U(e,t+30)+U(e,t+32),f]},Xi=function(e,t){for(;U(e,t)!=1;t+=4+U(e,t+2));return[_t(e,t+12),_t(e,t+4),_t(e,t+20)]};var hn=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function kn(e,t,r){r||(r=t,t={}),typeof r!="function"&&E(7);var i=[],n=function(){for(var m=0;m<i.length;++m)i[m]()},o={},a=function(m,I){hn(function(){r(m,I)})};hn(function(){a=r});for(var s=e.length-22;G(e,s)!=101010256;--s)if(!s||e.length-s>65558)return a(E(13,0,1),null),n;var c=U(e,s+8);if(c){var u=c,f=G(e,s+16),v=f==4294967295||u==65535;if(v){var D=G(e,s-12);v=G(e,D)==101075792,v&&(u=c=G(e,D+32),f=G(e,D+48))}for(var Z=t&&t.filter,$=function(m){var I=Ji(e,f,v),S=I[0],N=I[1],k=I[2],P=I[3],x=I[4],_=I[5],w=qi(e,_);f=x;var W=function(de,Ee){de?(n(),a(de,null)):(Ee&&(o[P]=Ee),--c||a(null,o))};if(!Z||Z({name:P,size:N,originalSize:k,compression:S}))if(!S)W(null,Qe(e,w,w+N));else if(S==8){var Ge=e.subarray(w,w+N);if(N<32e4)try{W(null,jt(Ge,new T(k)))}catch(de){W(de,null)}else i.push(Vi(Ge,{size:k},W))}else W(E(14,"unknown compression type "+S,1),null);else W(null,null)},Y=0;Y<u;++Y)$(Y)}else a(null,{});return n}var On=require("fs"),z=require("fs/promises"),be=require("path");ie();l();function Rn(e){function t(a,s,c,u){let f=0;return f+=a<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,i=e[4]===2;if(!i&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(i){let a=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+a+s;return e.subarray(c,e.length)}let o=12+t(e[8],e[9],e[10],e[11]);return e.subarray(o,e.length)}l();var Pn=j(require("https"));function Ft(e,t={}){return new Promise((r,i)=>{Pn.default.get(e,t,n=>{let{statusCode:o,statusMessage:a,headers:s}=n;if(o>=400)return void i(`${o}: ${a} - ${e}`);if(o>=300)return void r(Ft(s.location,t));let c=[];n.on("error",i),n.on("data",u=>c.push(u)),n.once("end",()=>r(Buffer.concat(c)))})})}var Qi=(0,be.join)(ve,"ExtensionCache");async function eo(e,t){return await(0,z.mkdir)(t,{recursive:!0}),new Promise((r,i)=>{kn(e,(n,o)=>{if(n)return void i(n);Promise.all(Object.keys(o).map(async a=>{if(a.startsWith("_metadata/"))return;if(a.endsWith("/"))return void(0,z.mkdir)((0,be.join)(t,a),{recursive:!0});let s=a.split("/"),c=s.pop(),u=s.join("/"),f=(0,be.join)(t,u);u&&await(0,z.mkdir)(f,{recursive:!0}),await(0,z.writeFile)((0,be.join)(f,c),o[a])})).then(()=>r()).catch(a=>{(0,z.rm)(t,{recursive:!0,force:!0}),i(a)})})})}async function Mn(e){let t=(0,be.join)(Qi,`${e}`);try{await(0,z.access)(t,On.constants.F_OK)}catch{let i=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,n=await Ft(i,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await eo(Rn(n),t).catch(console.error)}_n.session.defaultSession.loadExtension(t)}Fe||pe.app.whenReady().then(()=>{pe.protocol.registerFileProtocol("rivercord",({url:n},o)=>{let a=n.slice(12);if(a.endsWith("/")&&(a=a.slice(0,-1)),a.startsWith("/themes/")){let s=a.slice(8),c=Rt(J,s);if(!c){o({statusCode:403});return}o(c.replace(/\?v=\d+$/,""));return}switch(a){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":o((0,Un.join)(__dirname,a));break;default:o({statusCode:403})}});try{b.store.enableReactDevtools&&Mn("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(n=>console.error("[Rivercord] Failed to install React Developer Tools",n))}catch{}let e=(n,o)=>Object.keys(n).find(a=>a.toLowerCase()===o),t=n=>{let o={};return n.split(";").forEach(a=>{let[s,...c]=a.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(o,s)&&(o[s]=c)}),o},r=n=>Object.entries(n).filter(([,o])=>o?.length).map(o=>o.flat().join(" ")).join("; "),i=n=>{let o=e(n,"content-security-policy");if(o){let a=t(n[o][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])a[s]??=[],a[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");a["script-src"]??=[],a["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),n[o]=[r(a)]}};pe.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:n,resourceType:o},a)=>{if(n&&(o==="mainFrame"&&i(n),o==="stylesheet")){let s=e(n,"content-type");s&&(n[s]=["text/css"])}a({cancel:!1,responseHeaders:n})}),pe.session.defaultSession.webRequest.onHeadersReceived=()=>{}});Fn();
//# sourceURL=RivercordPatcher
//# sourceMappingURL=rivercord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */
