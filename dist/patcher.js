// Rivercord c4e06884
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var Yn=Object.create;var Fe=Object.defineProperty;var Kn=Object.getOwnPropertyDescriptor;var qn=Object.getOwnPropertyNames;var Jn=Object.getPrototypeOf,Xn=Object.prototype.hasOwnProperty;var d=(e,t)=>()=>(e&&(t=e(e=0)),t);var ne=(e,t)=>{for(var r in t)Fe(e,r,{get:t[r],enumerable:!0})},Jt=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of qn(t))!Xn.call(e,n)&&n!==r&&Fe(e,n,{get:()=>t[n],enumerable:!(i=Kn(t,n))||i.enumerable});return e};var U=(e,t,r)=>(r=e!=null?Yn(Jn(e)):{},Jt(t||!e||!e.__esModule?Fe(r,"default",{value:e,enumerable:!0}):r,e)),ot=e=>Jt(Fe({},"__esModule",{value:!0}),e);var l=d(()=>{"use strict"});var Re=d(()=>{"use strict";l()});var Pe,at=d(()=>{l();Pe="c4e06884"});var ie,st=d(()=>{l();ie="Rivercord/Rivercord"});var Xt,Qt=d(()=>{"use strict";l();at();st();Xt=`Rivercord/${Pe}${ie?` (https://github.com/${ie})`:""}`});function ve(e,t={}){return new Promise((r,i)=>{er.default.get(e,t,n=>{let{statusCode:o,statusMessage:a,headers:s}=n;if(o>=400)return void i(`${o}: ${a} - ${e}`);if(o>=300)return void r(ve(s.location,t));let c=[];n.on("error",i),n.on("data",u=>c.push(u)),n.once("end",()=>r(Buffer.concat(c)))})})}var er,ct=d(()=>{"use strict";l();er=U(require("https"))});function _e(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var tr,rr=d(()=>{"use strict";l();tr=["patcher.js","preload.js","renderer.js","renderer.css"]});var ni={};async function ei(e){return ve(Qn+e,{headers:{Accept:"application/vnd.github+json","User-Agent":Xt}})}async function ti(){await ft();let e=await ei(`/compare/${Pe}...HEAD`);return JSON.parse(e.toString("utf-8")).commits.map(r=>({hash:r.sha.slice(0,7),author:r.author.login,message:r.commit.message.split(`
`)[0]}))}async function ft(){return tr.forEach(e=>{lt.push([e,`https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${e}`])}),await ri(),!0}async function ri(){return await Promise.all(lt.map(async([e,t])=>(0,nr.writeFile)((0,ir.join)(__dirname,e),await ve(t)))),lt=[],!0}var Oe,nr,ir,Qn,lt,or=d(()=>{"use strict";l();Re();Qt();Oe=require("electron"),nr=require("fs/promises"),ir=require("path");at();st();ct();rr();Qn=`https://api.github.com/repos/${ie}`,lt=[];Oe.ipcMain.handle("RivercordGetRepo",_e(()=>`https://github.com/${ie}`));Oe.ipcMain.handle("RivercordGetUpdates",_e(ti));Oe.ipcMain.handle("RivercordUpdate",_e(ft));Oe.ipcMain.handle("RivercordBuild",_e(ft));console.log("[Rivercord] Updater",{gitHash:Pe,gitRemote:ie,__dirname})});var ar=d(()=>{"use strict";l();or()});var ht={};ne(ht,{fetchTrackData:()=>oi});async function pt(e){let{stdout:t}=await fr("osascript",e.map(r=>["-e",r]).flat());return t}function sr(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}async function ii({id:e,name:t,artist:r,album:i}){if(e===L?.id){if("data"in L)return L.data;if("failures"in L&&L.failures>=5)return null}try{let[n,o]=await Promise.all([fetch(sr("songs",r+" "+i+" "+t),cr).then(f=>f.json()),fetch(sr("artists",r.split(/ *[,&] */)[0]),cr).then(f=>f.json())]),a=n?.songs?.data[0]?.attributes.url,s=n?.songs?.data[0]?.id?`https://song.link/i/${n?.songs?.data[0]?.id}`:void 0,c=n?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=o?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return L={id:e,data:{appleMusicLink:a,songLink:s,albumArtwork:c,artistArtwork:u}},L.data}catch(n){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",n),L={id:e,failures:(e===L?.id&&"failures"in L?L.failures:0)+1},null}}async function oi(){try{await fr("pgrep",["^Music$"])}catch{return null}if(await pt(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await pt(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await pt(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[i,n,o,a,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await ii({id:i,name:n,artist:a,album:o});return{name:n,album:o,artist:a,playerPosition:t,duration:c,...u}}var lr,ur,fr,cr,L,pr=d(()=>{"use strict";l();lr=require("child_process"),ur=require("util"),fr=(0,ur.promisify)(lr.execFile);cr={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},L=null});var dt={};ne(dt,{initDevtoolsOpenEagerLoad:()=>ai});function ai(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var hr=d(()=>{"use strict";l()});var Me,dr=d(()=>{"use strict";l();Me=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,i=""){let n=this;return new Proxy(t,{get(o,a){let s=o[a];return!(a in o)&&n.getDefaultValue&&(s=n.getDefaultValue({target:o,key:a,root:r,path:i})),typeof s=="object"&&s!==null&&!Array.isArray(s)?n.makeProxy(s,r,`${i}${i&&"."}${a}`):s},set(o,a,s){if(o[a]===s)return!0;Reflect.set(o,a,s);let c=`${i}${i&&"."}${a}`;return n.globalListeners.forEach(u=>u(s,c)),n.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let i=t,n=r.split(".");for(let o of n){if(!i){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}i=i[o]}this.pathListeners.get(r)?.forEach(o=>o(i))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let i=this.pathListeners.get(t)??new Set;i.add(r),this.pathListeners.set(t,i)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let i=this.pathListeners.get(t);!i||(i.delete(r),i.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}}});function gt(e,t){for(let r in t){let i=t[r];typeof i=="object"&&!Array.isArray(i)?(e[r]??={},gt(e[r],i)):e[r]??=i}return e}var gr=d(()=>{"use strict";l()});var mr,q,ye,Ie,J,we,mt,vt,vr,ze,oe=d(()=>{"use strict";l();mr=require("electron"),q=require("path"),ye=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,q.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,q.join)(mr.app.getPath("userData"),"..","Rivercord")),Ie=(0,q.join)(ye,"settings"),J=(0,q.join)(ye,"themes"),we=(0,q.join)(Ie,"quickCss.css"),mt=(0,q.join)(Ie,"settings.json"),vt=(0,q.join)(Ie,"native-settings.json"),vr=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"],ze=process.argv.includes("--vanilla")});function Ir(e,t){try{return JSON.parse((0,ae.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var Ze,ae,b,si,wr,yr,se=d(()=>{"use strict";l();Re();dr();gr();Ze=require("electron"),ae=require("fs");oe();(0,ae.mkdirSync)(Ie,{recursive:!0});b=new Me(Ir("renderer",mt));b.addGlobalChangeListener(()=>{try{(0,ae.writeFileSync)(mt,JSON.stringify(b.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Ze.ipcMain.handle("RivercordGetSettingsDir",()=>Ie);Ze.ipcMain.on("RivercordGetSettings",e=>e.returnValue=b.plain);Ze.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{b.setData(t,r)});si={plugins:{}},wr=Ir("native",vt);gt(wr,si);yr=new Me(wr);yr.addGlobalChangeListener(()=>{try{(0,ae.writeFileSync)(vt,JSON.stringify(yr.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}})});var Cr={};var Ar,Sr=d(()=>{"use strict";l();se();Ar=require("electron");Ar.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://open.spotify.com/embed/")){let n=b.store.plugins?.FixSpotifyEmbeds;if(!n?.enabled)return;i.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${n.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var xr={};var Tr,br=d(()=>{"use strict";l();se();Tr=require("electron");Tr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://www.youtube.com/")){if(!b.store.plugins?.FixYoutubeEmbeds?.enabled)return;i.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var wt={};ne(wt,{checkffmpeg:()=>vi,checkytdlp:()=>yi,execute:()=>mi,getStdout:()=>wi,interrupt:()=>Ii,isFfmpegAvailable:()=>Ci,isYtdlpAvailable:()=>Ai,start:()=>li,stop:()=>ui});function Rr(e){H(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{Ae=(0,Q.spawn)("yt-dlp",e,{cwd:He()}),Ae.stdout.on("data",n=>Be(n)),Ae.stderr.on("data",n=>{Be(n),kr(`yt-dlp encountered an error: ${n}`),t+=n}),Ae.on("exit",n=>{Ae=null,n===0?r(X):i(new Error(t||`yt-dlp exited with code ${n}`))})})}function ci(e){H(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{Ce=(0,Q.spawn)("ffmpeg",e,{cwd:He()}),Ce.stdout.on("data",n=>Be(n)),Ce.stderr.on("data",n=>{Be(n),kr(`ffmpeg encountered an error: ${n}`),t+=n}),Ce.on("exit",n=>{Ce=null,n===0?r(X):i(new Error(t||`ffmpeg exited with code ${n}`))})})}async function li(e,t){return t||=A.mkdtempSync(It.default.join(Er.default.tmpdir(),"vencord_mediaDownloader_")),A.existsSync(t)||A.mkdirSync(t,{recursive:!0}),B=t,H("Using workdir: ",B),B}async function ui(e){B&&(H("Cleaning up workdir"),A.rmSync(B,{recursive:!0}),B=null)}async function fi(e){X="";let t=JSON.parse(await Rr(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return X="",{videoTitle:`${t.title||"video"} (${t.id})`}}function pi({videoTitle:e},{maxFileSize:t,format:r}){let i=!!t,n=i?t*.8:0,o=i?t*.2:0,a={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=a;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(le?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",i?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",i?`[filesize<${n}]`:"").replaceAll("{AUD_SIZE}",i?`[filesize<${o}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return H("Video formated calculated as ",f),H(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${le}`),{format:f,videoTitle:e}}async function hi({format:e,videoTitle:t},{ytdlpArgs:r,url:i,format:n}){Dr();let o=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],a=le?n==="video"?["--remux-video","webm>webm/mp4"]:n==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await Rr([i,...o,...a,...s]);let c=A.readdirSync(He()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function di({file:e,videoTitle:t},{ffmpegArgs:r,format:i,maxFileSize:n,gifQuality:o}){let a=e.split(".").pop();if(!le)return H("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:a};let s=["mp3","mp4","webm"],c=A.statSync(ce(e)).size,u=r?.filter(Boolean)||[],f=s.includes(a??""),v=!n||c<=n,D=u.length>0;if(f&&v&&!D&&!(i==="gif"))return H("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:a};let $=parseFloat((0,Q.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",ce(e)]).toString());if(isNaN($))throw"Failed to get video duration.";let m=~~((n?n*7/$:9999999)/1024),I,S;switch(i){case"audio":I=["-i",ce(e),"-b:a",`${m}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y"],S="mp3";break;case"video":default:let N=m<=100?480:m<=500?720:1080;I=["-i",ce(e),"-b:v",`${~~(m*.8)}k`,"-b:a",`${~~(m*.2)}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${N}`],S="mp4";break;case"gif":let k,P,x,_;switch(o){case 1:k=5,P=360,x=24,_=5;break;case 2:k=10,P=420,x=32,_=5;break;default:case 3:k=15,P=480,x=64,_=4;break;case 4:k=20,P=540,x=64,_=3;break;case 5:k=30,P=720,x=128,_=1;break}I=["-i",ce(e),"-vf",`fps=${k},scale=w=${P}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${x}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${_}`,"-loop","0","-bufsize","1M","-y"],S="gif";break}return await ci([...I,...u,`remux.${S}`]),{file:`remux.${S}`,videoTitle:t,extension:S}}function gi({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:A.readFileSync(ce(e)),title:`${t}.${r}`}}async function mi(e,t){We="";try{let r=await fi(t),i=pi(r,t),n=await hi(i,t),o=await di(n,t),a=gi(o);return{logs:We,...a}}catch(r){return{error:r.toString(),logs:We}}}function vi(e){try{return(0,Q.execFileSync)("ffmpeg",["-version"]),(0,Q.execFileSync)("ffprobe",["-version"]),le=!0,!0}catch{return le=!1,!1}}async function yi(e){try{return(0,Q.execFileSync)("yt-dlp",["--version"]),yt=!0,!0}catch{return yt=!1,!1}}async function Ii(e){H("Interrupting..."),Ae?.kill(),Ce?.kill(),Dr()}var Q,A,Er,It,B,X,We,yt,le,Ae,Ce,He,ce,Dr,Be,H,kr,wi,Ai,Ci,Pr=d(()=>{"use strict";l();Q=require("child_process"),A=U(require("fs")),Er=U(require("os")),It=U(require("path")),B=null,X="",We="",yt=!1,le=!1,Ae=null,Ce=null,He=()=>B??process.cwd(),ce=e=>It.default.join(He(),e),Dr=()=>{!B||A.readdirSync(B).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>A.unlinkSync(ce(e)))},Be=e=>(X+=e,X=X.replace(/^.*\r([^\n])/gm,"$1")),H=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),We+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),kr=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);wi=()=>X,Ai=()=>yt,Ci=()=>le});var Ve,_r=d(()=>{"use strict";l();Ve=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}}});async function Si(e){try{return await(0,$e.access)(e),!0}catch{return!1}}async function Se(e){await Si(e)||await(0,$e.mkdir)(e)}function At(e){return Or.default.parse(e).name}var $e,Or,Ct=d(()=>{"use strict";l();$e=require("fs/promises"),Or=U(require("path"))});async function Ye(){try{let e=await St.default.readFile(await Lr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await ee(),imageCacheDir:await Le()};try{await Tt(t)}catch{}return t}}async function Tt(e){!e||await St.default.writeFile(await Lr(),JSON.stringify(e,null,4),"utf8")}async function Lr(){let e=await ee();return await Se(e),Mr.default.join(e,"mlSettings.json")}var St,Mr,Gr=d(()=>{"use strict";l();St=U(require("fs/promises")),Mr=U(require("path"));xt();Ct()});var Dt={};ne(Dt,{chooseDir:()=>_i,deleteFileNative:()=>Di,getDefaultNativeDataDir:()=>ee,getDefaultNativeImageDir:()=>Le,getImageNative:()=>bi,getLogsFromFs:()=>Ri,getNativeSavedImages:()=>xi,getSettings:()=>Ye,init:()=>Fr,initDirs:()=>jr,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>Ti,showItemInFolder:()=>Oi,writeImageNative:()=>Ei,writeLogs:()=>Pi});function Ti(){}async function jr(){let{logsDir:e,imageCacheDir:t}=await Ye();bt=e||await ee(),Et=t||await Le()}async function Fr(e){let t=await Nr();await Se(t);let r=await(0,j.readdir)(t);for(let i of r){let n=At(i);Te.set(n,ue.default.join(t,i))}}async function bi(e,t){let r=Te.get(t);return r?await(0,j.readFile)(r):null}async function Ei(e,t,r){if(!t||!r)return;let i=await Nr(),n=At(t);if(Te.get(n))return;let a=ue.default.join(i,t);await Se(i),await(0,j.writeFile)(a,r),Te.set(n,a)}async function Di(e,t){let r=Te.get(t);!r||await(0,j.unlink)(r)}async function Ri(e){let t=await Ur();await Se(t);try{return JSON.parse(await(0,j.readFile)(ue.default.join(t,zr),"utf-8"))}catch{}return null}async function Pi(e,t){let r=await Ur();ki.push(()=>(0,j.writeFile)(ue.default.join(r,zr),t))}async function Le(){return ue.default.join(await ee(),"savedImages")}async function ee(){return ue.default.join(ye,"MessageLoggerData")}async function _i(e,t){let r=await Ye(),i=r[t]||await ee(),o=(await Ke.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:i})).filePaths[0];if(!o)throw Error("Invalid Directory");switch(r[t]=o,await Tt(r),t){case"logsDir":bt=o;break;case"imageCacheDir":Et=o;break}return t==="imageCacheDir"&&await Fr(e),o}async function Oi(e,t){Ke.shell.showItemInFolder(t)}var j,ue,Ke,Te,xi,bt,Et,Nr,Ur,zr,ki,xt=d(()=>{"use strict";l();j=require("node:fs/promises"),ue=U(require("node:path"));_r();Ke=require("electron");oe();Gr();Ct();Te=new Map,xi=()=>Te,Nr=async()=>Et??await Le(),Ur=async()=>bt??await ee();jr();zr="message-logger-logs.json",ki=new Ve});var kt={};ne(kt,{resolveRedirect:()=>Li});function Wr(e){return new Promise((t,r)=>{let i=(0,Zr.request)(new URL(e),{method:"HEAD"},n=>{t(n.headers.location?Wr(n.headers.location):e)});i.on("error",r),i.end()})}async function Li(e,t){return Mi.test(t)?Wr(t):t}var Zr,Mi,Br=d(()=>{"use strict";l();Zr=require("https"),Mi=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var Rt={};ne(Rt,{readRecording:()=>Gi});async function Gi(e,t){t=(0,Ge.normalize)(t);let r=(0,Ge.basename)(t),i=(0,Ge.normalize)(Hr.app.getPath("userData")+"/");if(console.log(r,i,t),r!=="recording.ogg"||!t.startsWith(i))return null;try{let n=await(0,Vr.readFile)(t);return new Uint8Array(n.buffer)}catch{return null}}var Hr,Vr,Ge,$r=d(()=>{"use strict";l();Hr=require("electron"),Vr=require("fs/promises"),Ge=require("path")});var Yr,Kr=d(()=>{l();Yr=`/* eslint-disable */

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
});`});var Jr={};var qr,Xr=d(()=>{"use strict";l();se();qr=require("electron");Kr();qr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.includes("discordsays")&&i.url.includes("youtube.com")){if(!b.store.plugins?.WatchTogetherAdblock?.enabled)return;i.executeJavaScript(Yr)}})})})});var Pt={};ne(Pt,{sendToOverlay:()=>Ni});function Ni(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);Qr??=(0,en.createSocket)("udp4"),Qr.send(r,42069,"127.0.0.1")}var en,Qr,tn=d(()=>{"use strict";l();en=require("dgram")});var rn,nn=d(()=>{l();pr();hr();Sr();br();Pr();xt();Br();$r();Xr();tn();rn={AppleMusicRichPresence:ht,ConsoleShortcuts:dt,FixSpotifyEmbeds:Cr,FixYoutubeEmbeds:xr,MediaDownloader:wt,MessageLoggerEnhanced:Dt,OpenInApp:kt,VoiceMessages:Rt,WatchTogetherAdblock:Jr,XSOverlay:Pt}});var _t,on,an=d(()=>{"use strict";l();Re();_t=require("electron");nn();on={};for(let[e,t]of Object.entries(rn)){let r=Object.entries(t);if(!r.length)continue;let i=on[e]={};for(let[n,o]of r){let a=`RivercordPluginNative_${e}_${n}`;_t.ipcMain.handle(a,o),i[n]=a}}_t.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=on})});function Ot(e,t=300){let r;return function(...i){clearTimeout(r),r=setTimeout(()=>{e(...i)},t)}}var sn=d(()=>{"use strict";l()});var cn,ln=d(()=>{l();cn="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo="});function Mt(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function un(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function fn(e,t){if(!e)return Mt(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return Mt(t);let i={},n="",o="";for(let a of r.split(Ui))if(a.length!==0)if(a.charAt(0)==="@"&&a.charAt(1)!==" "){i[n]=o.trim();let s=a.indexOf(" ");n=a.substring(1,s),o=a.substring(s+1)}else o+=" "+a.replace("\\n",`
`).replace(ji,"@");return i[n]=o.trim(),delete i[""],Mt(t,i)}var Ui,ji,pn=d(()=>{"use strict";l();Ui=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,ji=/^\\@/});function dn(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":hn.shell.openExternal(t)}return{action:"deny"}})}var hn,gn=d(()=>{"use strict";l();hn=require("electron")});function Lt(e,t){let r=(0,xe.normalize)(e),i=(0,xe.join)(e,t),n=(0,xe.normalize)(i);return n.startsWith(r)?n:null}function mn(){return(0,pe.readFile)(we,"utf-8").catch(()=>"")}async function Fi(){let e=await(0,pe.readdir)(J).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let i=await vn(r).then(un).catch(()=>null);i!=null&&t.push(fn(i,r))}return t}function vn(e){e=e.replace(/\?v=\d+$/,"");let t=Lt(J,e);return t?(0,pe.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}function yn(e){let t;(0,pe.open)(we,"a+").then(i=>{i.close(),t=(0,fe.watch)(we,{persistent:!1},Ot(async()=>{e.webContents.postMessage("RivercordQuickCssUpdate",await mn())},50))}).catch(()=>{});let r=(0,fe.watch)(J,{persistent:!1},Ot(()=>{e.webContents.postMessage("RivercordThemeUpdate",void 0)}));e.once("closed",()=>{t?.close(),r.close()})}var y,fe,pe,xe,Gt=d(()=>{"use strict";l();ar();an();se();sn();Re();y=require("electron");ln();fe=require("fs"),pe=require("fs/promises"),xe=require("path");pn();oe();gn();(0,fe.mkdirSync)(J,{recursive:!0});y.ipcMain.handle("RivercordOpenQuickCss",()=>y.shell.openPath(we));y.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!vr.includes(r))throw"Disallowed protocol.";y.shell.openExternal(t)});y.ipcMain.handle("RivercordGetQuickCss",()=>mn());y.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,fe.writeFileSync)(we,t));y.ipcMain.handle("RivercordGetThemesDir",()=>J);y.ipcMain.handle("RivercordGetThemesList",()=>Fi());y.ipcMain.handle("RivercordGetThemeData",(e,t)=>vn(t));y.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${y.systemPreferences.getAccentColor?.()||""}`}));y.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=y.BrowserWindow.getAllWindows().find(i=>i.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new y.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,xe.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});dn(r),await r.loadURL(`data:text/html;base64,${cn}`)})});function Fn(e,t,r){let i=t;if(t in e)return void r(e[i]);Object.defineProperty(e,t,{set(n){delete e[i],e[i]=n,r(n)},configurable:!0,enumerable:!1})}var zn=d(()=>{"use strict";l()});var co={};function ao(e,t){let r=e.slice(4).split(".").map(Number),i=t.slice(4).split(".").map(Number);for(let n=0;n<i.length;n++){if(r[n]>i[n])return!0;if(r[n]<i[n])return!1}return!1}function so(){if(!process.env.DISABLE_UPDATER_AUTO_PATCHING)try{let e=(0,M.dirname)(process.execPath),t=(0,M.basename)(e),r=(0,M.join)(e,".."),i=(0,R.readdirSync)(r).reduce((s,c)=>c.startsWith("app-")&&ao(c,s)?c:s,t);if(i===t)return;let n=(0,M.join)(r,i,"resources"),o=(0,M.join)(n,"app.asar"),a=(0,M.join)(n,"_app.asar");if(!(0,R.existsSync)(o)||(0,R.statSync)(o).isDirectory())return;console.info("[Rivercord] Detected Host Update. Repatching..."),(0,R.renameSync)(o,a),(0,R.mkdirSync)(o),(0,R.writeFileSync)((0,M.join)(o,"package.json"),JSON.stringify({name:"discord",main:"index.js"})),(0,R.writeFileSync)((0,M.join)(o,"index.js"),`require(${JSON.stringify((0,M.join)(__dirname,"patcher.js"))});`)}catch(e){console.error("[Rivercord] Failed to repatch latest host update",e)}}var Zn,R,M,Wn=d(()=>{"use strict";l();Zn=require("electron"),R=require("original-fs"),M=require("path");Zn.app.on("before-quit",so)});var po={};var C,re,lo,uo,Bt,fo,Bn=d(()=>{"use strict";l();zn();C=U(require("electron")),re=require("path");Gt();se();oe();console.log("[Rivercord] Starting up...");lo=require.main.filename,uo=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",Bt=(0,re.join)((0,re.dirname)(lo),"..",uo),fo=require((0,re.join)(Bt,"package.json"));require.main.filename=(0,re.join)(Bt,fo.main);C.app.setAppPath(Bt);if(ze)console.log("[Rivercord] Running in vanilla mode. Not loading Rivercord");else{let e=b.store;if(Wn(),e.winCtrlQ){let n=C.Menu.buildFromTemplate;C.Menu.buildFromTemplate=function(o){if(o[0]?.label==="&File"){let{submenu:a}=o[0];Array.isArray(a)&&a.push({label:"Quit (Hidden)",visible:!1,acceleratorWorksWhenHidden:!0,accelerator:"Control+Q",click:()=>C.app.quit()})}return n.call(this,o)}}class t extends C.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let a=o.webPreferences.preload;o.webPreferences.preload=(0,re.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,e.frameless?o.frame=!1:e.winNativeTitleBar&&delete o.frame,e.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),!1&&(o.backgroundColor="#00000000",e.macosVibrancyStyle&&(o.vibrancy=e.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=a,super(o),yn(this)}else super(o)}}Object.assign(t,C.default.BrowserWindow),Object.defineProperty(t,"name",{value:"BrowserWindow",configurable:!0});let r=require.resolve("electron");delete require.cache[r].exports,require.cache[r].exports={...C.default,BrowserWindow:t},Fn(global,"appSettings",n=>{n.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0),e.disableMinSize?(n.set("MIN_WIDTH",0),n.set("MIN_HEIGHT",0)):(n.set("MIN_WIDTH",940),n.set("MIN_HEIGHT",500))}),process.env.DATA_DIR=(0,re.join)(C.app.getPath("userData"),"..","Rivercord");let i=C.app.commandLine.appendSwitch;C.app.commandLine.appendSwitch=function(...n){if(n[0]==="disable-features"){let o=new Set((n[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),n[1]+=[...o].join(",")}return i.apply(this,n)},C.app.commandLine.appendSwitch("disable-renderer-backgrounding"),C.app.commandLine.appendSwitch("disable-background-timer-throttling"),C.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Rivercord] Loading original Discord app.asar");require(require.main.filename)});l();var he=require("electron"),Hn=require("path");Gt();se();oe();l();var Nn=require("electron");l();var An=require("module"),zi=(0,An.createRequire)("/"),Je,Zi=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Je=zi("worker_threads").Worker}catch{}var Wi=Je?function(e,t,r,i,n){var o=!1,a=new Je(e+Zi,{eval:!0}).on("error",function(s){return n(s,null)}).on("message",function(s){return n(null,s)}).on("exit",function(s){s&&!o&&n(new Error("exited with code "+s),null)});return a.postMessage(r,i),a.terminate=function(){return o=!0,Je.prototype.terminate.call(a)},a}:function(e,t,r,i,n){setImmediate(function(){return n(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},T=Uint8Array,te=Uint16Array,jt=Uint32Array,Ft=new T([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),zt=new T([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Cn=new T([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Sn=function(e,t){for(var r=new te(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var n=new jt(r[30]),i=1;i<30;++i)for(var o=r[i];o<r[i+1];++o)n[o]=o-r[i]<<5|i;return[r,n]},Tn=Sn(Ft,2),Zt=Tn[0],Bi=Tn[1];Zt[28]=258,Bi[258]=28;var xn=Sn(zt,0),bn=xn[0],Qa=xn[1],et=new te(32768);for(g=0;g<32768;++g)V=(g&43690)>>>1|(g&21845)<<1,V=(V&52428)>>>2|(V&13107)<<2,V=(V&61680)>>>4|(V&3855)<<4,et[g]=((V&65280)>>>8|(V&255)<<8)>>>1;var V,g,be=function(e,t,r){for(var i=e.length,n=0,o=new te(t);n<i;++n)e[n]&&++o[e[n]-1];var a=new te(t);for(n=0;n<t;++n)a[n]=a[n-1]+o[n-1]<<1;var s;if(r){s=new te(1<<t);var c=15-t;for(n=0;n<i;++n)if(e[n])for(var u=n<<4|e[n],f=t-e[n],v=a[e[n]-1]++<<f,D=v|(1<<f)-1;v<=D;++v)s[et[v]>>>c]=u}else for(s=new te(i),n=0;n<i;++n)e[n]&&(s[n]=et[a[e[n]-1]++]>>>15-e[n]);return s},Ne=new T(288);for(g=0;g<144;++g)Ne[g]=8;var g;for(g=144;g<256;++g)Ne[g]=9;var g;for(g=256;g<280;++g)Ne[g]=7;var g;for(g=280;g<288;++g)Ne[g]=8;var g,En=new T(32);for(g=0;g<32;++g)En[g]=5;var g;var Dn=be(Ne,9,1);var kn=be(En,5,1),Xe=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},O=function(e,t,r){var i=t/8|0;return(e[i]|e[i+1]<<8)>>(t&7)&r},Qe=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},Rn=function(e){return(e+7)/8|0},tt=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var i=new(e.BYTES_PER_ELEMENT==2?te:e.BYTES_PER_ELEMENT==4?jt:T)(r-t);return i.set(e.subarray(t,r)),i};var Pn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(e,t,r){var i=new Error(t||Pn[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,E),!r)throw i;return i},_n=function(e,t,r){var i=e.length;if(!i||r&&r.f&&!r.l)return t||new T(0);var n=!t||r,o=!r||r.i;r||(r={}),t||(t=new T(i*3));var a=function(Yt){var Kt=t.length;if(Yt>Kt){var qt=new T(Math.max(Kt*2,Yt));qt.set(t),t=qt}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,v=r.d,D=r.m,Z=r.n,$=i*8;do{if(!f){s=O(e,c,1);var Y=O(e,c+1,3);if(c+=3,Y)if(Y==1)f=Dn,v=kn,D=9,Z=5;else if(Y==2){var N=O(e,c,31)+257,k=O(e,c+10,15)+4,P=N+O(e,c+5,31)+1;c+=14;for(var x=new T(P),_=new T(19),w=0;w<k;++w)_[Cn[w]]=O(e,c+w*3,7);c+=k*3;for(var W=Xe(_),Ue=(1<<W)-1,de=be(_,W,1),w=0;w<P;){var De=de[O(e,c,Ue)];c+=De&15;var m=De>>>4;if(m<16)x[w++]=m;else{var ge=0,je=0;for(m==16?(je=3+O(e,c,3),c+=2,ge=x[w-1]):m==17?(je=3+O(e,c,7),c+=3):m==18&&(je=11+O(e,c,127),c+=7);je--;)x[w++]=ge}}var Ht=x.subarray(0,N),K=x.subarray(N);D=Xe(Ht),Z=Xe(K),f=be(Ht,D,1),v=be(K,Z,1)}else E(1);else{var m=Rn(c)+4,I=e[m-4]|e[m-3]<<8,S=m+I;if(S>i){o&&E(0);break}n&&a(u+I),t.set(e.subarray(m,S),u),r.b=u+=I,r.p=c=S*8,r.f=s;continue}if(c>$){o&&E(0);break}}n&&a(u+131072);for(var Vn=(1<<D)-1,$n=(1<<Z)-1,rt=c;;rt=c){var ge=f[Qe(e,c)&Vn],me=ge>>>4;if(c+=ge&15,c>$){o&&E(0);break}if(ge||E(2),me<256)t[u++]=me;else if(me==256){rt=c,f=null;break}else{var Vt=me-254;if(me>264){var w=me-257,ke=Ft[w];Vt=O(e,c,(1<<ke)-1)+Zt[w],c+=ke}var nt=v[Qe(e,c)&$n],it=nt>>>4;nt||E(3),c+=nt&15;var K=bn[it];if(it>3){var ke=zt[it];K+=Qe(e,c)&(1<<ke)-1,c+=ke}if(c>$){o&&E(0);break}n&&a(u+131072);for(var $t=u+Vt;u<$t;u+=4)t[u]=t[u-K],t[u+1]=t[u+1-K],t[u+2]=t[u+2-K],t[u+3]=t[u+3-K];u=$t}}r.l=f,r.p=rt,r.b=u,r.f=s,f&&(s=1,r.m=D,r.d=v,r.n=Z)}while(!s);return u==t.length?t:tt(t,0,u)};var Hi=new T(0);var Vi=function(e,t){var r={};for(var i in e)r[i]=e[i];for(var i in t)r[i]=t[i];return r},In=function(e,t,r){for(var i=e(),n=e.toString(),o=n.slice(n.indexOf("[")+1,n.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<i.length;++a){var s=i[a],c=o[a];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var v in s.prototype)t+=";"+c+".prototype."+v+"="+s.prototype[v].toString()}else t+=u}else r[c]=s}return[t,r]},qe=[],$i=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},Yi=function(e,t,r,i){var n;if(!qe[r]){for(var o="",a={},s=e.length-1,c=0;c<s;++c)n=In(e[c],o,a),o=n[0],a=n[1];qe[r]=In(e[s],o,a)}var u=Vi({},qe[r][1]);return Wi(qe[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,$i(u),i)},Ki=function(){return[T,te,jt,Ft,zt,Cn,Zt,bn,Dn,kn,et,Pn,be,Xe,O,Qe,Rn,tt,E,_n,Wt,On,Mn]};var On=function(e){return postMessage(e,[e.buffer])},Mn=function(e){return e&&e.size&&new T(e.size)},qi=function(e,t,r,i,n,o){var a=Yi(r,i,n,function(s,c){a.terminate(),o(s,c)});return a.postMessage([e,t],t.consume?[e.buffer]:[]),function(){a.terminate()}};var F=function(e,t){return e[t]|e[t+1]<<8},G=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Nt=function(e,t){return G(e,t)+G(e,t+4)*4294967296};function Ji(e,t,r){return r||(r=t,t={}),typeof r!="function"&&E(7),qi(e,t,[Ki],function(i){return On(Wt(i.data[0],Mn(i.data[1])))},1,r)}function Wt(e,t){return _n(e,t)}var Ut=typeof TextDecoder<"u"&&new TextDecoder,Xi=0;try{Ut.decode(Hi,{stream:!0}),Xi=1}catch{}var Qi=function(e){for(var t="",r=0;;){var i=e[r++],n=(i>127)+(i>223)+(i>239);if(r+n>e.length)return[t,tt(e,r-1)];n?n==3?(i=((i&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023)):n&1?t+=String.fromCharCode((i&31)<<6|e[r++]&63):t+=String.fromCharCode((i&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(i)}};function eo(e,t){if(t){for(var r="",i=0;i<e.length;i+=16384)r+=String.fromCharCode.apply(null,e.subarray(i,i+16384));return r}else{if(Ut)return Ut.decode(e);var n=Qi(e),o=n[0],a=n[1];return a.length&&E(8),o}}var to=function(e,t){return t+30+F(e,t+26)+F(e,t+28)},ro=function(e,t,r){var i=F(e,t+28),n=eo(e.subarray(t+46,t+46+i),!(F(e,t+8)&2048)),o=t+46+i,a=G(e,t+20),s=r&&a==4294967295?no(e,o):[a,G(e,t+24),G(e,t+42)],c=s[0],u=s[1],f=s[2];return[F(e,t+10),c,u,n,o+F(e,t+30)+F(e,t+32),f]},no=function(e,t){for(;F(e,t)!=1;t+=4+F(e,t+2));return[Nt(e,t+12),Nt(e,t+4),Nt(e,t+20)]};var wn=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Ln(e,t,r){r||(r=t,t={}),typeof r!="function"&&E(7);var i=[],n=function(){for(var m=0;m<i.length;++m)i[m]()},o={},a=function(m,I){wn(function(){r(m,I)})};wn(function(){a=r});for(var s=e.length-22;G(e,s)!=101010256;--s)if(!s||e.length-s>65558)return a(E(13,0,1),null),n;var c=F(e,s+8);if(c){var u=c,f=G(e,s+16),v=f==4294967295||u==65535;if(v){var D=G(e,s-12);v=G(e,D)==101075792,v&&(u=c=G(e,D+32),f=G(e,D+48))}for(var Z=t&&t.filter,$=function(m){var I=ro(e,f,v),S=I[0],N=I[1],k=I[2],P=I[3],x=I[4],_=I[5],w=to(e,_);f=x;var W=function(de,De){de?(n(),a(de,null)):(De&&(o[P]=De),--c||a(null,o))};if(!Z||Z({name:P,size:N,originalSize:k,compression:S}))if(!S)W(null,tt(e,w,w+N));else if(S==8){var Ue=e.subarray(w,w+N);if(N<32e4)try{W(null,Wt(Ue,new T(k)))}catch(de){W(de,null)}else i.push(Ji(Ue,{size:k},W))}else W(E(14,"unknown compression type "+S,1),null);else W(null,null)},Y=0;Y<u;++Y)$(Y)}else a(null,{});return n}var Un=require("fs"),z=require("fs/promises"),Ee=require("path");oe();l();function Gn(e){function t(a,s,c,u){let f=0;return f+=a<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,i=e[4]===2;if(!i&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(i){let a=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+a+s;return e.subarray(c,e.length)}let o=12+t(e[8],e[9],e[10],e[11]);return e.subarray(o,e.length)}ct();var io=(0,Ee.join)(ye,"ExtensionCache");async function oo(e,t){return await(0,z.mkdir)(t,{recursive:!0}),new Promise((r,i)=>{Ln(e,(n,o)=>{if(n)return void i(n);Promise.all(Object.keys(o).map(async a=>{if(a.startsWith("_metadata/"))return;if(a.endsWith("/"))return void(0,z.mkdir)((0,Ee.join)(t,a),{recursive:!0});let s=a.split("/"),c=s.pop(),u=s.join("/"),f=(0,Ee.join)(t,u);u&&await(0,z.mkdir)(f,{recursive:!0}),await(0,z.writeFile)((0,Ee.join)(f,c),o[a])})).then(()=>r()).catch(a=>{(0,z.rm)(t,{recursive:!0,force:!0}),i(a)})})})}async function jn(e){let t=(0,Ee.join)(io,`${e}`);try{await(0,z.access)(t,Un.constants.F_OK)}catch{let i=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,n=await ve(i,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await oo(Gn(n),t).catch(console.error)}Nn.session.defaultSession.loadExtension(t)}ze||he.app.whenReady().then(()=>{he.protocol.registerFileProtocol("rivercord",({url:n},o)=>{let a=n.slice(12);if(a.endsWith("/")&&(a=a.slice(0,-1)),a.startsWith("/themes/")){let s=a.slice(8),c=Lt(J,s);if(!c){o({statusCode:403});return}o(c.replace(/\?v=\d+$/,""));return}switch(a){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":o((0,Hn.join)(__dirname,a));break;default:o({statusCode:403})}});try{b.store.enableReactDevtools&&jn("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(n=>console.error("[Rivercord] Failed to install React Developer Tools",n))}catch{}let e=(n,o)=>Object.keys(n).find(a=>a.toLowerCase()===o),t=n=>{let o={};return n.split(";").forEach(a=>{let[s,...c]=a.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(o,s)&&(o[s]=c)}),o},r=n=>Object.entries(n).filter(([,o])=>o?.length).map(o=>o.flat().join(" ")).join("; "),i=n=>{let o=e(n,"content-security-policy");if(o){let a=t(n[o][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])a[s]??=[],a[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");a["script-src"]??=[],a["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),n[o]=[r(a)]}};he.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:n,resourceType:o},a)=>{if(n&&(o==="mainFrame"&&i(n),o==="stylesheet")){let s=e(n,"content-type");s&&(n[s]=["text/css"])}a({cancel:!1,responseHeaders:n})}),he.session.defaultSession.webRequest.onHeadersReceived=()=>{}});Bn();
//# sourceURL=RivercordPatcher
//# sourceMappingURL=rivercord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */
