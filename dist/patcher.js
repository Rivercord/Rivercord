// Rivercord f12a55b2
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var Hn=Object.create;var Ue=Object.defineProperty;var Vn=Object.getOwnPropertyDescriptor;var $n=Object.getOwnPropertyNames;var Yn=Object.getPrototypeOf,Kn=Object.prototype.hasOwnProperty;var d=(e,t)=>()=>(e&&(t=e(e=0)),t);var te=(e,t)=>{for(var r in t)Ue(e,r,{get:t[r],enumerable:!0})},$t=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of $n(t))!Kn.call(e,n)&&n!==r&&Ue(e,n,{get:()=>t[n],enumerable:!(i=Vn(t,n))||i.enumerable});return e};var L=(e,t,r)=>(r=e!=null?Hn(Yn(e)):{},$t(t||!e||!e.__esModule?Ue(r,"default",{value:e,enumerable:!0}):r,e)),Yt=e=>$t(Ue({},"__esModule",{value:!0}),e);var l=d(()=>{"use strict"});var Pe=d(()=>{"use strict";l()});var me,nt=d(()=>{"use strict";l();me="f12a55b2"});var re,it=d(()=>{"use strict";l();re="Rivercord/Rivercord"});var Kt,qt=d(()=>{"use strict";l();nt();it();Kt=`Rivercord/${me}${re?` (https://github.com/${re})`:""}`});function ne(e,t={}){return new Promise((r,i)=>{Jt.default.get(e,t,n=>{let{statusCode:o,statusMessage:a,headers:s}=n;if(o>=400)return void i(`${o}: ${a} - ${e}`);if(o>=300)return void r(ne(s.location,t));let c=[];n.on("error",i),n.on("data",u=>c.push(u)),n.once("end",()=>r(Buffer.concat(c)))})})}var Jt,ot=d(()=>{"use strict";l();Jt=L(require("https"))});function ve(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var Qt,Xt=d(()=>{"use strict";l();Qt=["patcher.js","preload.js","renderer.js","renderer.css"]});var ei={};async function Jn(e){return ne(qn+e,{headers:{Accept:"application/vnd.github+json","User-Agent":Kt}})}async function Qn(){await nr();let e=await Jn(`/compare/${me}...HEAD`);return JSON.parse(e.toString("utf-8")).commits.map(r=>({hash:r.sha.slice(0,7),author:r.author.login,message:r.commit.message.split(`
`)[0]}))}async function rr(){return(await ne("https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/git-hash.txt")).toString("utf-8").trim()!==me}async function nr(){return await rr()?(Qt.forEach(e=>{at.push([e,`https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${e}`])}),!0):!1}async function Xn(){return await Promise.all(at.map(async([e,t])=>(0,er.writeFile)((0,tr.join)(__dirname,e),await ne(t)))),at=[],!0}var ye,er,tr,qn,at,ir=d(()=>{"use strict";l();Pe();qt();ye=require("electron"),er=require("fs/promises"),tr=require("path");nt();it();ot();Xt();qn=`https://api.github.com/repos/${re}`,at=[];ye.ipcMain.handle("RivercordGetRepo",ve(()=>`https://github.com/${re}`));ye.ipcMain.handle("RivercordGetUpdates",ve(Qn));ye.ipcMain.handle("RivercordIsUpdateRequired",ve(rr));ye.ipcMain.handle("RivercordUpdate",ve(nr));ye.ipcMain.handle("RivercordBuild",ve(Xn));console.log("[Rivercord] Updater",{gitHash:me,gitRemote:re,__dirname})});var or=d(()=>{"use strict";l();ir()});var lt={};te(lt,{fetchTrackData:()=>ri});async function ct(e){let{stdout:t}=await ur("osascript",e.map(r=>["-e",r]).flat());return t}function ar(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}async function ti({id:e,name:t,artist:r,album:i}){if(e===O?.id){if("data"in O)return O.data;if("failures"in O&&O.failures>=5)return null}try{let[n,o]=await Promise.all([fetch(ar("songs",r+" "+i+" "+t),sr).then(f=>f.json()),fetch(ar("artists",r.split(/ *[,&] */)[0]),sr).then(f=>f.json())]),a=n?.songs?.data[0]?.attributes.url,s=n?.songs?.data[0]?.id?`https://song.link/i/${n?.songs?.data[0]?.id}`:void 0,c=n?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=o?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return O={id:e,data:{appleMusicLink:a,songLink:s,albumArtwork:c,artistArtwork:u}},O.data}catch(n){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",n),O={id:e,failures:(e===O?.id&&"failures"in O?O.failures:0)+1},null}}async function ri(){try{await ur("pgrep",["^Music$"])}catch{return null}if(await ct(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await ct(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await ct(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[i,n,o,a,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await ti({id:i,name:n,artist:a,album:o});return{name:n,album:o,artist:a,playerPosition:t,duration:c,...u}}var cr,lr,ur,sr,O,fr=d(()=>{"use strict";l();cr=require("child_process"),lr=require("util"),ur=(0,lr.promisify)(cr.execFile);sr={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},O=null});var ut={};te(ut,{initDevtoolsOpenEagerLoad:()=>ni});function ni(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var pr=d(()=>{"use strict";l()});var _e,hr=d(()=>{"use strict";l();_e=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,i=""){let n=this;return new Proxy(t,{get(o,a){let s=o[a];return!(a in o)&&n.getDefaultValue&&(s=n.getDefaultValue({target:o,key:a,root:r,path:i})),typeof s=="object"&&s!==null&&!Array.isArray(s)?n.makeProxy(s,r,`${i}${i&&"."}${a}`):s},set(o,a,s){if(o[a]===s)return!0;Reflect.set(o,a,s);let c=`${i}${i&&"."}${a}`;return n.globalListeners.forEach(u=>u(s,c)),n.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let i=t,n=r.split(".");for(let o of n){if(!i){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}i=i[o]}this.pathListeners.get(r)?.forEach(o=>o(i))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let i=this.pathListeners.get(t)??new Set;i.add(r),this.pathListeners.set(t,i)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let i=this.pathListeners.get(t);i&&(i.delete(r),i.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}}});function ft(e,t){for(let r in t){let i=t[r];typeof i=="object"&&!Array.isArray(i)?(e[r]??={},ft(e[r],i)):e[r]??=i}return e}var dr=d(()=>{"use strict";l()});var gr,Y,Ie,we,K,Ae,pt,ht,mr,Fe,ie=d(()=>{"use strict";l();gr=require("electron"),Y=require("path"),Ie=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,Y.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,Y.join)(gr.app.getPath("userData"),"..","Rivercord")),we=(0,Y.join)(Ie,"settings"),K=(0,Y.join)(Ie,"themes"),Ae=(0,Y.join)(we,"quickCss.css"),pt=(0,Y.join)(we,"settings.json"),ht=(0,Y.join)(we,"native-settings.json"),mr=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"],Fe=process.argv.includes("--vanilla")});function yr(e,t){try{return JSON.parse((0,oe.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var je,oe,x,ii,Ir,vr,ae=d(()=>{"use strict";l();Pe();hr();dr();je=require("electron"),oe=require("fs");ie();(0,oe.mkdirSync)(we,{recursive:!0});x=new _e(yr("renderer",pt));x.addGlobalChangeListener(()=>{try{(0,oe.writeFileSync)(pt,JSON.stringify(x.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});je.ipcMain.handle("RivercordGetSettingsDir",()=>we);je.ipcMain.on("RivercordGetSettings",e=>e.returnValue=x.plain);je.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{x.setData(t,r)});ii={plugins:{}},Ir=yr("native",ht);ft(Ir,ii);vr=new _e(Ir);vr.addGlobalChangeListener(()=>{try{(0,oe.writeFileSync)(ht,JSON.stringify(vr.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}})});var Ar={};var wr,Cr=d(()=>{"use strict";l();ae();wr=require("electron");wr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://open.spotify.com/embed/")){let n=x.store.plugins?.FixSpotifyEmbeds;if(!n?.enabled)return;i.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${n.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var Tr={};var Sr,xr=d(()=>{"use strict";l();ae();Sr=require("electron");Sr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://www.youtube.com/")){if(!x.store.plugins?.FixYoutubeEmbeds?.enabled)return;i.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var mt={};te(mt,{checkffmpeg:()=>di,checkytdlp:()=>gi,execute:()=>hi,getStdout:()=>vi,interrupt:()=>mi,isFfmpegAvailable:()=>Ii,isYtdlpAvailable:()=>yi,start:()=>ai,stop:()=>si});function Rr(e){W(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{Ce=(0,J.spawn)("yt-dlp",e,{cwd:We()}),Ce.stdout.on("data",n=>Ze(n)),Ce.stderr.on("data",n=>{Ze(n),Dr(`yt-dlp encountered an error: ${n}`),t+=n}),Ce.on("exit",n=>{Ce=null,n===0?r(q):i(new Error(t||`yt-dlp exited with code ${n}`))})})}function oi(e){W(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{Se=(0,J.spawn)("ffmpeg",e,{cwd:We()}),Se.stdout.on("data",n=>Ze(n)),Se.stderr.on("data",n=>{Ze(n),Dr(`ffmpeg encountered an error: ${n}`),t+=n}),Se.on("exit",n=>{Se=null,n===0?r(q):i(new Error(t||`ffmpeg exited with code ${n}`))})})}async function ai(e,t){return t||=A.mkdtempSync(gt.default.join(br.default.tmpdir(),"vencord_mediaDownloader_")),A.existsSync(t)||A.mkdirSync(t,{recursive:!0}),Z=t,W("Using workdir: ",Z),Z}async function si(e){Z&&(W("Cleaning up workdir"),A.rmSync(Z,{recursive:!0}),Z=null)}async function ci(e){q="";let t=JSON.parse(await Rr(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return q="",{videoTitle:`${t.title||"video"} (${t.id})`}}function li({videoTitle:e},{maxFileSize:t,format:r}){let i=!!t,n=i?t*.8:0,o=i?t*.2:0,a={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=a;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(ce?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",i?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",i?`[filesize<${n}]`:"").replaceAll("{AUD_SIZE}",i?`[filesize<${o}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return W("Video formated calculated as ",f),W(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${ce}`),{format:f,videoTitle:e}}async function ui({format:e,videoTitle:t},{ytdlpArgs:r,url:i,format:n}){Er();let o=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],a=ce?n==="video"?["--remux-video","webm>webm/mp4"]:n==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await Rr([i,...o,...a,...s]);let c=A.readdirSync(We()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function fi({file:e,videoTitle:t},{ffmpegArgs:r,format:i,maxFileSize:n,gifQuality:o}){let a=e.split(".").pop();if(!ce)return W("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:a};let s=["mp3","mp4","webm"],c=A.statSync(se(e)).size,u=r?.filter(Boolean)||[],f=s.includes(a??""),v=!n||c<=n,E=u.length>0;if(f&&v&&!E&&!(i==="gif"))return W("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:a};let H=parseFloat((0,J.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",se(e)]).toString());if(isNaN(H))throw"Failed to get video duration.";let m=~~((n?n*7/H:9999999)/1024),I,C;switch(i){case"audio":I=["-i",se(e),"-b:a",`${m}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y"],C="mp3";break;case"video":default:let G=m<=100?480:m<=500?720:1080;I=["-i",se(e),"-b:v",`${~~(m*.8)}k`,"-b:a",`${~~(m*.2)}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${G}`],C="mp4";break;case"gif":let D,R,T,k;switch(o){case 1:D=5,R=360,T=24,k=5;break;case 2:D=10,R=420,T=32,k=5;break;default:case 3:D=15,R=480,T=64,k=4;break;case 4:D=20,R=540,T=64,k=3;break;case 5:D=30,R=720,T=128,k=1;break}I=["-i",se(e),"-vf",`fps=${D},scale=w=${R}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${T}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${k}`,"-loop","0","-bufsize","1M","-y"],C="gif";break}return await oi([...I,...u,`remux.${C}`]),{file:`remux.${C}`,videoTitle:t,extension:C}}function pi({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:A.readFileSync(se(e)),title:`${t}.${r}`}}async function hi(e,t){ze="";try{let r=await ci(t),i=li(r,t),n=await ui(i,t),o=await fi(n,t),a=pi(o);return{logs:ze,...a}}catch(r){return{error:r.toString(),logs:ze}}}function di(e){try{return(0,J.execFileSync)("ffmpeg",["-version"]),(0,J.execFileSync)("ffprobe",["-version"]),ce=!0,!0}catch{return ce=!1,!1}}async function gi(e){try{return(0,J.execFileSync)("yt-dlp",["--version"]),dt=!0,!0}catch{return dt=!1,!1}}async function mi(e){W("Interrupting..."),Ce?.kill(),Se?.kill(),Er()}var J,A,br,gt,Z,q,ze,dt,ce,Ce,Se,We,se,Er,Ze,W,Dr,vi,yi,Ii,kr=d(()=>{"use strict";l();J=require("child_process"),A=L(require("fs")),br=L(require("os")),gt=L(require("path")),Z=null,q="",ze="",dt=!1,ce=!1,Ce=null,Se=null,We=()=>Z??process.cwd(),se=e=>gt.default.join(We(),e),Er=()=>{Z&&A.readdirSync(Z).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>A.unlinkSync(se(e)))},Ze=e=>(q+=e,q=q.replace(/^.*\r([^\n])/gm,"$1")),W=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),ze+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),Dr=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);vi=()=>q,yi=()=>dt,Ii=()=>ce});var Be,Pr=d(()=>{"use strict";l();Be=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}}});async function wi(e){try{return await(0,He.access)(e),!0}catch{return!1}}async function Te(e){await wi(e)||await(0,He.mkdir)(e)}function vt(e){return _r.default.parse(e).name}var He,_r,yt=d(()=>{"use strict";l();He=require("fs/promises"),_r=L(require("path"))});async function Ve(){try{let e=await It.default.readFile(await Mr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await Q(),imageCacheDir:await Oe()};try{await wt(t)}catch{}return t}}async function wt(e){e&&await It.default.writeFile(await Mr(),JSON.stringify(e,null,4),"utf8")}async function Mr(){let e=await Q();return await Te(e),Or.default.join(e,"mlSettings.json")}var It,Or,Gr=d(()=>{"use strict";l();It=L(require("fs/promises")),Or=L(require("path"));At();yt()});var Tt={};te(Tt,{chooseDir:()=>Ri,deleteFileNative:()=>xi,getDefaultNativeDataDir:()=>Q,getDefaultNativeImageDir:()=>Oe,getImageNative:()=>Si,getLogsFromFs:()=>Ei,getNativeSavedImages:()=>Ci,getSettings:()=>Ve,init:()=>Fr,initDirs:()=>Ur,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>Ai,showItemInFolder:()=>ki,writeImageNative:()=>Ti,writeLogs:()=>Di});function Ai(){}async function Ur(){let{logsDir:e,imageCacheDir:t}=await Ve();Ct=e||await Q(),St=t||await Oe()}async function Fr(e){let t=await Lr();await Te(t);let r=await(0,N.readdir)(t);for(let i of r){let n=vt(i);xe.set(n,le.default.join(t,i))}}async function Si(e,t){let r=xe.get(t);return r?await(0,N.readFile)(r):null}async function Ti(e,t,r){if(!t||!r)return;let i=await Lr(),n=vt(t);if(xe.get(n))return;let a=le.default.join(i,t);await Te(i),await(0,N.writeFile)(a,r),xe.set(n,a)}async function xi(e,t){let r=xe.get(t);r&&await(0,N.unlink)(r)}async function Ei(e){let t=await Nr();await Te(t);try{return JSON.parse(await(0,N.readFile)(le.default.join(t,jr),"utf-8"))}catch{}return null}async function Di(e,t){let r=await Nr();bi.push(()=>(0,N.writeFile)(le.default.join(r,jr),t))}async function Oe(){return le.default.join(await Q(),"savedImages")}async function Q(){return le.default.join(Ie,"MessageLoggerData")}async function Ri(e,t){let r=await Ve(),i=r[t]||await Q(),o=(await $e.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:i})).filePaths[0];if(!o)throw Error("Invalid Directory");switch(r[t]=o,await wt(r),t){case"logsDir":Ct=o;break;case"imageCacheDir":St=o;break}return t==="imageCacheDir"&&await Fr(e),o}async function ki(e,t){$e.shell.showItemInFolder(t)}var N,le,$e,xe,Ci,Ct,St,Lr,Nr,jr,bi,At=d(()=>{"use strict";l();N=require("node:fs/promises"),le=L(require("node:path"));Pr();$e=require("electron");ie();Gr();yt();xe=new Map,Ci=()=>xe,Lr=async()=>St??await Oe(),Nr=async()=>Ct??await Q();Ur();jr="message-logger-logs.json",bi=new Be});var xt={};te(xt,{resolveRedirect:()=>_i});function Zr(e){return new Promise((t,r)=>{let i=(0,zr.request)(new URL(e),{method:"HEAD"},n=>{t(n.headers.location?Zr(n.headers.location):e)});i.on("error",r),i.end()})}async function _i(e,t){return Pi.test(t)?Zr(t):t}var zr,Pi,Wr=d(()=>{"use strict";l();zr=require("https"),Pi=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var bt={};te(bt,{readRecording:()=>Oi});async function Oi(e,t){t=(0,Me.normalize)(t);let r=(0,Me.basename)(t),i=(0,Me.normalize)(Br.app.getPath("userData")+"/");if(console.log(r,i,t),r!=="recording.ogg"||!t.startsWith(i))return null;try{let n=await(0,Hr.readFile)(t);return new Uint8Array(n.buffer)}catch{return null}}var Br,Hr,Me,Vr=d(()=>{"use strict";l();Br=require("electron"),Hr=require("fs/promises"),Me=require("path")});var $r,Yr=d(()=>{"use strict";l();$r=`/* eslint-disable */

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
});`});var qr={};var Kr,Jr=d(()=>{"use strict";l();ae();Kr=require("electron");Yr();Kr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.includes("discordsays")&&i.url.includes("youtube.com")){if(!x.store.plugins?.WatchTogetherAdblock?.enabled)return;i.executeJavaScript($r)}})})})});var Et={};te(Et,{sendToOverlay:()=>Mi});function Mi(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);Qr??=(0,Xr.createSocket)("udp4"),Qr.send(r,42069,"127.0.0.1")}var Xr,Qr,en=d(()=>{"use strict";l();Xr=require("dgram")});var tn,rn=d(()=>{"use strict";l();fr();pr();Cr();xr();kr();At();Wr();Vr();Jr();en();tn={AppleMusicRichPresence:lt,ConsoleShortcuts:ut,FixSpotifyEmbeds:Ar,FixYoutubeEmbeds:Tr,MediaDownloader:mt,MessageLoggerEnhanced:Tt,OpenInApp:xt,VoiceMessages:bt,WatchTogetherAdblock:qr,XSOverlay:Et}});var Dt,nn,on=d(()=>{"use strict";l();Pe();Dt=require("electron");rn();nn={};for(let[e,t]of Object.entries(tn)){let r=Object.entries(t);if(!r.length)continue;let i=nn[e]={};for(let[n,o]of r){let a=`RivercordPluginNative_${e}_${n}`;Dt.ipcMain.handle(a,o),i[n]=a}}Dt.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=nn})});function Rt(e,t=300){let r;return function(...i){clearTimeout(r),r=setTimeout(()=>{e(...i)},t)}}var an=d(()=>{"use strict";l()});var sn,cn=d(()=>{"use strict";l();sn="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo="});function kt(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function ln(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function un(e,t){if(!e)return kt(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return kt(t);let i={},n="",o="";for(let a of r.split(Gi))if(a.length!==0)if(a.charAt(0)==="@"&&a.charAt(1)!==" "){i[n]=o.trim();let s=a.indexOf(" ");n=a.substring(1,s),o=a.substring(s+1)}else o+=" "+a.replace("\\n",`
`).replace(Li,"@");return i[n]=o.trim(),delete i[""],kt(t,i)}var Gi,Li,fn=d(()=>{"use strict";l();Gi=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,Li=/^\\@/});function hn(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":pn.shell.openExternal(t)}return{action:"deny"}})}var pn,dn=d(()=>{"use strict";l();pn=require("electron")});function Pt(e,t){let r=(0,be.normalize)(e),i=(0,be.join)(e,t),n=(0,be.normalize)(i);return n.startsWith(r)?n:null}function gn(){return(0,fe.readFile)(Ae,"utf-8").catch(()=>"")}async function Ni(){let e=await(0,fe.readdir)(K).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let i=await mn(r).then(ln).catch(()=>null);i!=null&&t.push(un(i,r))}return t}function mn(e){e=e.replace(/\?v=\d+$/,"");let t=Pt(K,e);return t?(0,fe.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}function vn(e){let t;(0,fe.open)(Ae,"a+").then(i=>{i.close(),t=(0,ue.watch)(Ae,{persistent:!1},Rt(async()=>{e.webContents.postMessage("RivercordQuickCssUpdate",await gn())},50))}).catch(()=>{});let r=(0,ue.watch)(K,{persistent:!1},Rt(()=>{e.webContents.postMessage("RivercordThemeUpdate",void 0)}));e.once("closed",()=>{t?.close(),r.close()})}var y,ue,fe,be,_t=d(()=>{"use strict";l();or();on();ae();an();Pe();y=require("electron");cn();ue=require("fs"),fe=require("fs/promises"),be=require("path");fn();ie();dn();(0,ue.mkdirSync)(K,{recursive:!0});y.ipcMain.handle("RivercordOpenQuickCss",()=>y.shell.openPath(Ae));y.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!mr.includes(r))throw"Disallowed protocol.";y.shell.openExternal(t)});y.ipcMain.handle("RivercordGetQuickCss",()=>gn());y.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,ue.writeFileSync)(Ae,t));y.ipcMain.handle("RivercordGetThemesDir",()=>K);y.ipcMain.handle("RivercordGetThemesList",()=>Ni());y.ipcMain.handle("RivercordGetThemeData",(e,t)=>mn(t));y.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${y.systemPreferences.getAccentColor?.()||""}`}));y.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=y.BrowserWindow.getAllWindows().find(i=>i.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new y.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,be.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});hn(r),await r.loadURL(`data:text/html;base64,${sn}`)})});function Fn(e,t,r){let i=t;if(t in e)return void r(e[i]);Object.defineProperty(e,t,{set(n){delete e[i],e[i]=n,r(n)},configurable:!0,enumerable:!1})}var jn=d(()=>{"use strict";l()});var ao={};var _,ee,no,io,jt,oo,zn=d(()=>{"use strict";l();jn();_=L(require("electron")),ee=require("path");_t();ae();ie();console.log("[Rivercord] Starting up...");no=require.main.filename,io=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",jt=(0,ee.join)((0,ee.dirname)(no),"..",io),oo=require((0,ee.join)(jt,"package.json"));require.main.filename=(0,ee.join)(jt,oo.main);_.app.setAppPath(jt);if(Fe)console.log("[Rivercord] Running in vanilla mode. Not loading Rivercord");else{let e=x.store;class t extends _.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let a=o.webPreferences.preload;o.webPreferences.preload=(0,ee.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,e.frameless&&(o.frame=!1),e.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),!1&&(o.backgroundColor="#00000000",e.macosVibrancyStyle&&(o.vibrancy=e.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=a,super(o),vn(this)}else super(o)}}Object.assign(t,_.default.BrowserWindow),Object.defineProperty(t,"name",{value:"BrowserWindow",configurable:!0});let r=require.resolve("electron");delete require.cache[r].exports,require.cache[r].exports={..._.default,BrowserWindow:t},Fn(global,"appSettings",n=>{n.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0),e.disableMinSize?(n.set("MIN_WIDTH",0),n.set("MIN_HEIGHT",0)):(n.set("MIN_WIDTH",940),n.set("MIN_HEIGHT",500))}),process.env.DATA_DIR=(0,ee.join)(_.app.getPath("userData"),"..","Rivercord");let i=_.app.commandLine.appendSwitch;_.app.commandLine.appendSwitch=function(...n){if(n[0]==="disable-features"){let o=new Set((n[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),n[1]+=[...o].join(",")}return i.apply(this,n)},_.app.commandLine.appendSwitch("disable-renderer-backgrounding"),_.app.commandLine.appendSwitch("disable-background-timer-throttling"),_.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Rivercord] Loading original Discord app.asar");require(require.main.filename)});l();var pe=require("electron"),Zn=require("path");_t();ae();ie();l();var Ln=require("electron");l();var wn=require("module"),Ui=(0,wn.createRequire)("/"),Ke,Fi=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Ke=Ui("worker_threads").Worker}catch{}var ji=Ke?function(e,t,r,i,n){var o=!1,a=new Ke(e+Fi,{eval:!0}).on("error",function(s){return n(s,null)}).on("message",function(s){return n(null,s)}).on("exit",function(s){s&&!o&&n(new Error("exited with code "+s),null)});return a.postMessage(r,i),a.terminate=function(){return o=!0,Ke.prototype.terminate.call(a)},a}:function(e,t,r,i,n){setImmediate(function(){return n(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},S=Uint8Array,X=Uint16Array,Gt=Uint32Array,Lt=new S([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Nt=new S([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),An=new S([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Cn=function(e,t){for(var r=new X(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var n=new Gt(r[30]),i=1;i<30;++i)for(var o=r[i];o<r[i+1];++o)n[o]=o-r[i]<<5|i;return[r,n]},Sn=Cn(Lt,2),Ut=Sn[0],zi=Sn[1];Ut[28]=258,zi[258]=28;var Tn=Cn(Nt,0),xn=Tn[0],$a=Tn[1],Qe=new X(32768);for(g=0;g<32768;++g)B=(g&43690)>>>1|(g&21845)<<1,B=(B&52428)>>>2|(B&13107)<<2,B=(B&61680)>>>4|(B&3855)<<4,Qe[g]=((B&65280)>>>8|(B&255)<<8)>>>1;var B,g,Ee=function(e,t,r){for(var i=e.length,n=0,o=new X(t);n<i;++n)e[n]&&++o[e[n]-1];var a=new X(t);for(n=0;n<t;++n)a[n]=a[n-1]+o[n-1]<<1;var s;if(r){s=new X(1<<t);var c=15-t;for(n=0;n<i;++n)if(e[n])for(var u=n<<4|e[n],f=t-e[n],v=a[e[n]-1]++<<f,E=v|(1<<f)-1;v<=E;++v)s[Qe[v]>>>c]=u}else for(s=new X(i),n=0;n<i;++n)e[n]&&(s[n]=Qe[a[e[n]-1]++]>>>15-e[n]);return s},Ge=new S(288);for(g=0;g<144;++g)Ge[g]=8;var g;for(g=144;g<256;++g)Ge[g]=9;var g;for(g=256;g<280;++g)Ge[g]=7;var g;for(g=280;g<288;++g)Ge[g]=8;var g,bn=new S(32);for(g=0;g<32;++g)bn[g]=5;var g;var En=Ee(Ge,9,1);var Dn=Ee(bn,5,1),qe=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},P=function(e,t,r){var i=t/8|0;return(e[i]|e[i+1]<<8)>>(t&7)&r},Je=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},Rn=function(e){return(e+7)/8|0},Xe=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var i=new(e.BYTES_PER_ELEMENT==2?X:e.BYTES_PER_ELEMENT==4?Gt:S)(r-t);return i.set(e.subarray(t,r)),i};var kn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],b=function(e,t,r){var i=new Error(t||kn[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,b),!r)throw i;return i},Pn=function(e,t,r){var i=e.length;if(!i||r&&r.f&&!r.l)return t||new S(0);var n=!t||r,o=!r||r.i;r||(r={}),t||(t=new S(i*3));var a=function(Bt){var Ht=t.length;if(Bt>Ht){var Vt=new S(Math.max(Ht*2,Bt));Vt.set(t),t=Vt}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,v=r.d,E=r.m,j=r.n,H=i*8;do{if(!f){s=P(e,c,1);var V=P(e,c+1,3);if(c+=3,V)if(V==1)f=En,v=Dn,E=9,j=5;else if(V==2){var G=P(e,c,31)+257,D=P(e,c+10,15)+4,R=G+P(e,c+5,31)+1;c+=14;for(var T=new S(R),k=new S(19),w=0;w<D;++w)k[An[w]]=P(e,c+w*3,7);c+=D*3;for(var z=qe(k),Le=(1<<z)-1,he=Ee(k,z,1),w=0;w<R;){var Re=he[P(e,c,Le)];c+=Re&15;var m=Re>>>4;if(m<16)T[w++]=m;else{var de=0,Ne=0;for(m==16?(Ne=3+P(e,c,3),c+=2,de=T[w-1]):m==17?(Ne=3+P(e,c,7),c+=3):m==18&&(Ne=11+P(e,c,127),c+=7);Ne--;)T[w++]=de}}var zt=T.subarray(0,G),$=T.subarray(G);E=qe(zt),j=qe($),f=Ee(zt,E,1),v=Ee($,j,1)}else b(1);else{var m=Rn(c)+4,I=e[m-4]|e[m-3]<<8,C=m+I;if(C>i){o&&b(0);break}n&&a(u+I),t.set(e.subarray(m,C),u),r.b=u+=I,r.p=c=C*8,r.f=s;continue}if(c>H){o&&b(0);break}}n&&a(u+131072);for(var Wn=(1<<E)-1,Bn=(1<<j)-1,et=c;;et=c){var de=f[Je(e,c)&Wn],ge=de>>>4;if(c+=de&15,c>H){o&&b(0);break}if(de||b(2),ge<256)t[u++]=ge;else if(ge==256){et=c,f=null;break}else{var Zt=ge-254;if(ge>264){var w=ge-257,ke=Lt[w];Zt=P(e,c,(1<<ke)-1)+Ut[w],c+=ke}var tt=v[Je(e,c)&Bn],rt=tt>>>4;tt||b(3),c+=tt&15;var $=xn[rt];if(rt>3){var ke=Nt[rt];$+=Je(e,c)&(1<<ke)-1,c+=ke}if(c>H){o&&b(0);break}n&&a(u+131072);for(var Wt=u+Zt;u<Wt;u+=4)t[u]=t[u-$],t[u+1]=t[u+1-$],t[u+2]=t[u+2-$],t[u+3]=t[u+3-$];u=Wt}}r.l=f,r.p=et,r.b=u,r.f=s,f&&(s=1,r.m=E,r.d=v,r.n=j)}while(!s);return u==t.length?t:Xe(t,0,u)};var Zi=new S(0);var Wi=function(e,t){var r={};for(var i in e)r[i]=e[i];for(var i in t)r[i]=t[i];return r},yn=function(e,t,r){for(var i=e(),n=e.toString(),o=n.slice(n.indexOf("[")+1,n.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<i.length;++a){var s=i[a],c=o[a];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var v in s.prototype)t+=";"+c+".prototype."+v+"="+s.prototype[v].toString()}else t+=u}else r[c]=s}return[t,r]},Ye=[],Bi=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},Hi=function(e,t,r,i){var n;if(!Ye[r]){for(var o="",a={},s=e.length-1,c=0;c<s;++c)n=yn(e[c],o,a),o=n[0],a=n[1];Ye[r]=yn(e[s],o,a)}var u=Wi({},Ye[r][1]);return ji(Ye[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,Bi(u),i)},Vi=function(){return[S,X,Gt,Lt,Nt,An,Ut,xn,En,Dn,Qe,kn,Ee,qe,P,Je,Rn,Xe,b,Pn,Ft,_n,On]};var _n=function(e){return postMessage(e,[e.buffer])},On=function(e){return e&&e.size&&new S(e.size)},$i=function(e,t,r,i,n,o){var a=Hi(r,i,n,function(s,c){a.terminate(),o(s,c)});return a.postMessage([e,t],t.consume?[e.buffer]:[]),function(){a.terminate()}};var U=function(e,t){return e[t]|e[t+1]<<8},M=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Ot=function(e,t){return M(e,t)+M(e,t+4)*4294967296};function Yi(e,t,r){return r||(r=t,t={}),typeof r!="function"&&b(7),$i(e,t,[Vi],function(i){return _n(Ft(i.data[0],On(i.data[1])))},1,r)}function Ft(e,t){return Pn(e,t)}var Mt=typeof TextDecoder<"u"&&new TextDecoder,Ki=0;try{Mt.decode(Zi,{stream:!0}),Ki=1}catch{}var qi=function(e){for(var t="",r=0;;){var i=e[r++],n=(i>127)+(i>223)+(i>239);if(r+n>e.length)return[t,Xe(e,r-1)];n?n==3?(i=((i&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023)):n&1?t+=String.fromCharCode((i&31)<<6|e[r++]&63):t+=String.fromCharCode((i&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(i)}};function Ji(e,t){if(t){for(var r="",i=0;i<e.length;i+=16384)r+=String.fromCharCode.apply(null,e.subarray(i,i+16384));return r}else{if(Mt)return Mt.decode(e);var n=qi(e),o=n[0],a=n[1];return a.length&&b(8),o}}var Qi=function(e,t){return t+30+U(e,t+26)+U(e,t+28)},Xi=function(e,t,r){var i=U(e,t+28),n=Ji(e.subarray(t+46,t+46+i),!(U(e,t+8)&2048)),o=t+46+i,a=M(e,t+20),s=r&&a==4294967295?eo(e,o):[a,M(e,t+24),M(e,t+42)],c=s[0],u=s[1],f=s[2];return[U(e,t+10),c,u,n,o+U(e,t+30)+U(e,t+32),f]},eo=function(e,t){for(;U(e,t)!=1;t+=4+U(e,t+2));return[Ot(e,t+12),Ot(e,t+4),Ot(e,t+20)]};var In=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Mn(e,t,r){r||(r=t,t={}),typeof r!="function"&&b(7);var i=[],n=function(){for(var m=0;m<i.length;++m)i[m]()},o={},a=function(m,I){In(function(){r(m,I)})};In(function(){a=r});for(var s=e.length-22;M(e,s)!=101010256;--s)if(!s||e.length-s>65558)return a(b(13,0,1),null),n;var c=U(e,s+8);if(c){var u=c,f=M(e,s+16),v=f==4294967295||u==65535;if(v){var E=M(e,s-12);v=M(e,E)==101075792,v&&(u=c=M(e,E+32),f=M(e,E+48))}for(var j=t&&t.filter,H=function(m){var I=Xi(e,f,v),C=I[0],G=I[1],D=I[2],R=I[3],T=I[4],k=I[5],w=Qi(e,k);f=T;var z=function(he,Re){he?(n(),a(he,null)):(Re&&(o[R]=Re),--c||a(null,o))};if(!j||j({name:R,size:G,originalSize:D,compression:C}))if(!C)z(null,Xe(e,w,w+G));else if(C==8){var Le=e.subarray(w,w+G);if(G<32e4)try{z(null,Ft(Le,new S(D)))}catch(he){z(he,null)}else i.push(Yi(Le,{size:D},z))}else z(b(14,"unknown compression type "+C,1),null);else z(null,null)},V=0;V<u;++V)H(V)}else a(null,{});return n}var Nn=require("fs"),F=require("fs/promises"),De=require("path");ie();l();function Gn(e){function t(a,s,c,u){let f=0;return f+=a<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,i=e[4]===2;if(!i&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(i){let a=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+a+s;return e.subarray(c,e.length)}let o=12+t(e[8],e[9],e[10],e[11]);return e.subarray(o,e.length)}ot();var to=(0,De.join)(Ie,"ExtensionCache");async function ro(e,t){return await(0,F.mkdir)(t,{recursive:!0}),new Promise((r,i)=>{Mn(e,(n,o)=>{if(n)return void i(n);Promise.all(Object.keys(o).map(async a=>{if(a.startsWith("_metadata/"))return;if(a.endsWith("/"))return void(0,F.mkdir)((0,De.join)(t,a),{recursive:!0});let s=a.split("/"),c=s.pop(),u=s.join("/"),f=(0,De.join)(t,u);u&&await(0,F.mkdir)(f,{recursive:!0}),await(0,F.writeFile)((0,De.join)(f,c),o[a])})).then(()=>r()).catch(a=>{(0,F.rm)(t,{recursive:!0,force:!0}),i(a)})})})}async function Un(e){let t=(0,De.join)(to,`${e}`);try{await(0,F.access)(t,Nn.constants.F_OK)}catch{let i=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,n=await ne(i,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await ro(Gn(n),t).catch(console.error)}Ln.session.defaultSession.loadExtension(t)}Fe||pe.app.whenReady().then(()=>{pe.protocol.registerFileProtocol("rivercord",({url:n},o)=>{let a=n.slice(12);if(a.endsWith("/")&&(a=a.slice(0,-1)),a.startsWith("/themes/")){let s=a.slice(8),c=Pt(K,s);if(!c){o({statusCode:403});return}o(c.replace(/\?v=\d+$/,""));return}switch(a){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":o((0,Zn.join)(__dirname,a));break;default:o({statusCode:403})}});try{x.store.enableReactDevtools&&Un("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(n=>console.error("[Rivercord] Failed to install React Developer Tools",n))}catch{}let e=(n,o)=>Object.keys(n).find(a=>a.toLowerCase()===o),t=n=>{let o={};return n.split(";").forEach(a=>{let[s,...c]=a.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(o,s)&&(o[s]=c)}),o},r=n=>Object.entries(n).filter(([,o])=>o?.length).map(o=>o.flat().join(" ")).join("; "),i=n=>{let o=e(n,"content-security-policy");if(o){let a=t(n[o][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src","script-src","frame-src"])a[s]??=[],a[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");n[o]=[r(a)]}};pe.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:n,resourceType:o},a)=>{if(n&&(o==="mainFrame"&&i(n),o==="stylesheet")){let s=e(n,"content-type");s&&(n[s]=["text/css"])}a({cancel:!1,responseHeaders:n})}),pe.session.defaultSession.webRequest.onHeadersReceived=()=>{}});zn();
//# sourceURL=RivercordPatcher
//# sourceMappingURL=rivercord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */
