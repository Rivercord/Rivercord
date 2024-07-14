// Rivercord 1e923d8b
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var Kn=Object.create;var Fe=Object.defineProperty;var qn=Object.getOwnPropertyDescriptor;var Jn=Object.getOwnPropertyNames;var Qn=Object.getPrototypeOf,Xn=Object.prototype.hasOwnProperty;var d=(e,t)=>()=>(e&&(t=e(e=0)),t);var ne=(e,t)=>{for(var r in t)Fe(e,r,{get:t[r],enumerable:!0})},qt=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Jn(t))!Xn.call(e,n)&&n!==r&&Fe(e,n,{get:()=>t[n],enumerable:!(i=qn(t,n))||i.enumerable});return e};var U=(e,t,r)=>(r=e!=null?Kn(Qn(e)):{},qt(t||!e||!e.__esModule?Fe(r,"default",{value:e,enumerable:!0}):r,e)),ot=e=>qt(Fe({},"__esModule",{value:!0}),e);var l=d(()=>{"use strict"});var Oe=d(()=>{"use strict";l()});var ye,at=d(()=>{l();ye="1e923d8b"});var ie,st=d(()=>{l();ie="Rivercord/Rivercord"});var Jt,Qt=d(()=>{"use strict";l();at();st();Jt=`Rivercord/${ye}${ie?` (https://github.com/${ie})`:""}`});function oe(e,t={}){return new Promise((r,i)=>{Xt.default.get(e,t,n=>{let{statusCode:o,statusMessage:a,headers:s}=n;if(o>=400)return void i(`${o}: ${a} - ${e}`);if(o>=300)return void r(oe(s.location,t));let c=[];n.on("error",i),n.on("data",u=>c.push(u)),n.once("end",()=>r(Buffer.concat(c)))})})}var Xt,ct=d(()=>{"use strict";l();Xt=U(require("https"))});function Ie(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var er,tr=d(()=>{"use strict";l();er=["patcher.js","preload.js","renderer.js","renderer.css"]});var ii={};async function ti(e){return oe(ei+e,{headers:{Accept:"application/vnd.github+json","User-Agent":Jt}})}async function ri(){await or();let e=await ti(`/compare/${ye}...HEAD`);return JSON.parse(e.toString("utf-8")).commits.map(r=>({hash:r.sha.slice(0,7),author:r.author.login,message:r.commit.message.split(`
`)[0]}))}async function ir(){return(await oe("https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/git-hash.txt")).toString("utf-8").trim()!==ye}async function or(){return await ir()?(er.forEach(e=>{lt.push([e,`https://raw.githubusercontent.com/Rivercord/Rivercord/main/dist/${e}`])}),!0):!1}async function ni(){return await Promise.all(lt.map(async([e,t])=>(0,rr.writeFile)((0,nr.join)(__dirname,e),await oe(t)))),lt=[],!0}var we,rr,nr,ei,lt,ar=d(()=>{"use strict";l();Oe();Qt();we=require("electron"),rr=require("fs/promises"),nr=require("path");at();st();ct();tr();ei=`https://api.github.com/repos/${ie}`,lt=[];we.ipcMain.handle("RivercordGetRepo",Ie(()=>`https://github.com/${ie}`));we.ipcMain.handle("RivercordGetUpdates",Ie(ri));we.ipcMain.handle("RivercordIsUpdateRequired",Ie(ir));we.ipcMain.handle("RivercordUpdate",Ie(or));we.ipcMain.handle("RivercordBuild",Ie(ni));console.log("[Rivercord] Updater",{gitHash:ye,gitRemote:ie,__dirname})});var sr=d(()=>{"use strict";l();ar()});var pt={};ne(pt,{fetchTrackData:()=>ai});async function ft(e){let{stdout:t}=await pr("osascript",e.map(r=>["-e",r]).flat());return t}function cr(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}async function oi({id:e,name:t,artist:r,album:i}){if(e===G?.id){if("data"in G)return G.data;if("failures"in G&&G.failures>=5)return null}try{let[n,o]=await Promise.all([fetch(cr("songs",r+" "+i+" "+t),lr).then(f=>f.json()),fetch(cr("artists",r.split(/ *[,&] */)[0]),lr).then(f=>f.json())]),a=n?.songs?.data[0]?.attributes.url,s=n?.songs?.data[0]?.id?`https://song.link/i/${n?.songs?.data[0]?.id}`:void 0,c=n?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=o?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return G={id:e,data:{appleMusicLink:a,songLink:s,albumArtwork:c,artistArtwork:u}},G.data}catch(n){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",n),G={id:e,failures:(e===G?.id&&"failures"in G?G.failures:0)+1},null}}async function ai(){try{await pr("pgrep",["^Music$"])}catch{return null}if(await ft(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await ft(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await ft(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[i,n,o,a,s]=r.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await oi({id:i,name:n,artist:a,album:o});return{name:n,album:o,artist:a,playerPosition:t,duration:c,...u}}var ur,fr,pr,lr,G,hr=d(()=>{"use strict";l();ur=require("child_process"),fr=require("util"),pr=(0,fr.promisify)(ur.execFile);lr={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},G=null});var ht={};ne(ht,{initDevtoolsOpenEagerLoad:()=>si});function si(e){let t=()=>e.sender.executeJavaScript("Rivercord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var dr=d(()=>{"use strict";l()});var Me,gr=d(()=>{"use strict";l();Me=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,i=""){let n=this;return new Proxy(t,{get(o,a){let s=o[a];return!(a in o)&&n.getDefaultValue&&(s=n.getDefaultValue({target:o,key:a,root:r,path:i})),typeof s=="object"&&s!==null&&!Array.isArray(s)?n.makeProxy(s,r,`${i}${i&&"."}${a}`):s},set(o,a,s){if(o[a]===s)return!0;Reflect.set(o,a,s);let c=`${i}${i&&"."}${a}`;return n.globalListeners.forEach(u=>u(s,c)),n.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let i=t,n=r.split(".");for(let o of n){if(!i){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}i=i[o]}this.pathListeners.get(r)?.forEach(o=>o(i))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let i=this.pathListeners.get(t)??new Set;i.add(r),this.pathListeners.set(t,i)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let i=this.pathListeners.get(t);!i||(i.delete(r),i.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}}});function dt(e,t){for(let r in t){let i=t[r];typeof i=="object"&&!Array.isArray(i)?(e[r]??={},dt(e[r],i)):e[r]??=i}return e}var mr=d(()=>{"use strict";l()});var vr,q,Ae,Se,J,Ce,gt,mt,yr,ze,ae=d(()=>{"use strict";l();vr=require("electron"),q=require("path"),Ae=process.env.RIVERCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,q.join)(process.env.DISCORD_USER_DATA_DIR,"..","RivercordData"):(0,q.join)(vr.app.getPath("userData"),"..","Rivercord")),Se=(0,q.join)(Ae,"settings"),J=(0,q.join)(Ae,"themes"),Ce=(0,q.join)(Se,"quickCss.css"),gt=(0,q.join)(Se,"settings.json"),mt=(0,q.join)(Se,"native-settings.json"),yr=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:"],ze=process.argv.includes("--vanilla")});function wr(e,t){try{return JSON.parse((0,se.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var Ze,se,b,ci,Ar,Ir,ce=d(()=>{"use strict";l();Oe();gr();mr();Ze=require("electron"),se=require("fs");ae();(0,se.mkdirSync)(Se,{recursive:!0});b=new Me(wr("renderer",gt));b.addGlobalChangeListener(()=>{try{(0,se.writeFileSync)(gt,JSON.stringify(b.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Ze.ipcMain.handle("RivercordGetSettingsDir",()=>Se);Ze.ipcMain.on("RivercordGetSettings",e=>e.returnValue=b.plain);Ze.ipcMain.handle("RivercordSetSettings",(e,t,r)=>{b.setData(t,r)});ci={plugins:{}},Ar=wr("native",mt);dt(Ar,ci);Ir=new Me(Ar);Ir.addGlobalChangeListener(()=>{try{(0,se.writeFileSync)(mt,JSON.stringify(Ir.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}})});var Cr={};var Sr,Tr=d(()=>{"use strict";l();ce();Sr=require("electron");Sr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://open.spotify.com/embed/")){let n=b.store.plugins?.FixSpotifyEmbeds;if(!n?.enabled)return;i.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${n.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var br={};var xr,Er=d(()=>{"use strict";l();ce();xr=require("electron");xr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://www.youtube.com/")){if(!b.store.plugins?.FixYoutubeEmbeds?.enabled)return;i.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var It={};ne(It,{checkffmpeg:()=>yi,checkytdlp:()=>Ii,execute:()=>vi,getStdout:()=>Ai,interrupt:()=>wi,isFfmpegAvailable:()=>Ci,isYtdlpAvailable:()=>Si,start:()=>ui,stop:()=>fi});function Pr(e){H(`Executing yt-dlp with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{Te=(0,X.spawn)("yt-dlp",e,{cwd:He()}),Te.stdout.on("data",n=>Be(n)),Te.stderr.on("data",n=>{Be(n),kr(`yt-dlp encountered an error: ${n}`),t+=n}),Te.on("exit",n=>{Te=null,n===0?r(Q):i(new Error(t||`yt-dlp exited with code ${n}`))})})}function li(e){H(`Executing ffmpeg with args: ["${e.map(r=>r.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((r,i)=>{xe=(0,X.spawn)("ffmpeg",e,{cwd:He()}),xe.stdout.on("data",n=>Be(n)),xe.stderr.on("data",n=>{Be(n),kr(`ffmpeg encountered an error: ${n}`),t+=n}),xe.on("exit",n=>{xe=null,n===0?r(Q):i(new Error(t||`ffmpeg exited with code ${n}`))})})}async function ui(e,t){return t||=A.mkdtempSync(yt.default.join(Dr.default.tmpdir(),"vencord_mediaDownloader_")),A.existsSync(t)||A.mkdirSync(t,{recursive:!0}),B=t,H("Using workdir: ",B),B}async function fi(e){B&&(H("Cleaning up workdir"),A.rmSync(B,{recursive:!0}),B=null)}async function pi(e){Q="";let t=JSON.parse(await Pr(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return Q="",{videoTitle:`${t.title||"video"} (${t.id})`}}function hi({videoTitle:e},{maxFileSize:t,format:r}){let i=!!t,n=i?t*.8:0,o=i?t*.2:0,a={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(r){case"audio":u=a;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(ue?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",i?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",i?`[filesize<${n}]`:"").replaceAll("{AUD_SIZE}",i?`[filesize<${o}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return H("Video formated calculated as ",f),H(`Based on: format=${r}, maxFileSize=${t}, ffmpegAvailable=${ue}`),{format:f,videoTitle:e}}async function di({format:e,videoTitle:t},{ytdlpArgs:r,url:i,format:n}){Rr();let o=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],a=ue?n==="video"?["--remux-video","webm>webm/mp4"]:n==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=r?.filter(Boolean)||[];await Pr([i,...o,...a,...s]);let c=A.readdirSync(He()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function gi({file:e,videoTitle:t},{ffmpegArgs:r,format:i,maxFileSize:n,gifQuality:o}){let a=e.split(".").pop();if(!ue)return H("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:a};let s=["mp3","mp4","webm"],c=A.statSync(le(e)).size,u=r?.filter(Boolean)||[],f=s.includes(a??""),v=!n||c<=n,D=u.length>0;if(f&&v&&!D&&!(i==="gif"))return H("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:a};let $=parseFloat((0,X.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",le(e)]).toString());if(isNaN($))throw"Failed to get video duration.";let m=~~((n?n*7/$:9999999)/1024),I,C;switch(i){case"audio":I=["-i",le(e),"-b:a",`${m}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y"],C="mp3";break;case"video":default:let N=m<=100?480:m<=500?720:1080;I=["-i",le(e),"-b:v",`${~~(m*.8)}k`,"-b:a",`${~~(m*.2)}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${N}`],C="mp4";break;case"gif":let R,P,x,_;switch(o){case 1:R=5,P=360,x=24,_=5;break;case 2:R=10,P=420,x=32,_=5;break;default:case 3:R=15,P=480,x=64,_=4;break;case 4:R=20,P=540,x=64,_=3;break;case 5:R=30,P=720,x=128,_=1;break}I=["-i",le(e),"-vf",`fps=${R},scale=w=${P}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${x}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${_}`,"-loop","0","-bufsize","1M","-y"],C="gif";break}return await li([...I,...u,`remux.${C}`]),{file:`remux.${C}`,videoTitle:t,extension:C}}function mi({file:e,videoTitle:t,extension:r}){if(!r)throw"Invalid extension.";return{buffer:A.readFileSync(le(e)),title:`${t}.${r}`}}async function vi(e,t){We="";try{let r=await pi(t),i=hi(r,t),n=await di(i,t),o=await gi(n,t),a=mi(o);return{logs:We,...a}}catch(r){return{error:r.toString(),logs:We}}}function yi(e){try{return(0,X.execFileSync)("ffmpeg",["-version"]),(0,X.execFileSync)("ffprobe",["-version"]),ue=!0,!0}catch{return ue=!1,!1}}async function Ii(e){try{return(0,X.execFileSync)("yt-dlp",["--version"]),vt=!0,!0}catch{return vt=!1,!1}}async function wi(e){H("Interrupting..."),Te?.kill(),xe?.kill(),Rr()}var X,A,Dr,yt,B,Q,We,vt,ue,Te,xe,He,le,Rr,Be,H,kr,Ai,Si,Ci,_r=d(()=>{"use strict";l();X=require("child_process"),A=U(require("fs")),Dr=U(require("os")),yt=U(require("path")),B=null,Q="",We="",vt=!1,ue=!1,Te=null,xe=null,He=()=>B??process.cwd(),le=e=>yt.default.join(He(),e),Rr=()=>{!B||A.readdirSync(B).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>A.unlinkSync(le(e)))},Be=e=>(Q+=e,Q=Q.replace(/^.*\r([^\n])/gm,"$1")),H=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),We+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),kr=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);Ai=()=>Q,Si=()=>vt,Ci=()=>ue});var Ve,Or=d(()=>{"use strict";l();Ve=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}}});async function Ti(e){try{return await(0,$e.access)(e),!0}catch{return!1}}async function be(e){await Ti(e)||await(0,$e.mkdir)(e)}function wt(e){return Mr.default.parse(e).name}var $e,Mr,At=d(()=>{"use strict";l();$e=require("fs/promises"),Mr=U(require("path"))});async function Ye(){try{let e=await St.default.readFile(await Lr(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await ee(),imageCacheDir:await Ge()};try{await Ct(t)}catch{}return t}}async function Ct(e){!e||await St.default.writeFile(await Lr(),JSON.stringify(e,null,4),"utf8")}async function Lr(){let e=await ee();return await be(e),Gr.default.join(e,"mlSettings.json")}var St,Gr,Nr=d(()=>{"use strict";l();St=U(require("fs/promises")),Gr=U(require("path"));Tt();At()});var Et={};ne(Et,{chooseDir:()=>Oi,deleteFileNative:()=>Ri,getDefaultNativeDataDir:()=>ee,getDefaultNativeImageDir:()=>Ge,getImageNative:()=>Ei,getLogsFromFs:()=>Pi,getNativeSavedImages:()=>bi,getSettings:()=>Ye,init:()=>zr,initDirs:()=>Fr,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>xi,showItemInFolder:()=>Mi,writeImageNative:()=>Di,writeLogs:()=>_i});function xi(){}async function Fr(){let{logsDir:e,imageCacheDir:t}=await Ye();xt=e||await ee(),bt=t||await Ge()}async function zr(e){let t=await Ur();await be(t);let r=await(0,j.readdir)(t);for(let i of r){let n=wt(i);Ee.set(n,fe.default.join(t,i))}}async function Ei(e,t){let r=Ee.get(t);return r?await(0,j.readFile)(r):null}async function Di(e,t,r){if(!t||!r)return;let i=await Ur(),n=wt(t);if(Ee.get(n))return;let a=fe.default.join(i,t);await be(i),await(0,j.writeFile)(a,r),Ee.set(n,a)}async function Ri(e,t){let r=Ee.get(t);!r||await(0,j.unlink)(r)}async function Pi(e){let t=await jr();await be(t);try{return JSON.parse(await(0,j.readFile)(fe.default.join(t,Zr),"utf-8"))}catch{}return null}async function _i(e,t){let r=await jr();ki.push(()=>(0,j.writeFile)(fe.default.join(r,Zr),t))}async function Ge(){return fe.default.join(await ee(),"savedImages")}async function ee(){return fe.default.join(Ae,"MessageLoggerData")}async function Oi(e,t){let r=await Ye(),i=r[t]||await ee(),o=(await Ke.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:i})).filePaths[0];if(!o)throw Error("Invalid Directory");switch(r[t]=o,await Ct(r),t){case"logsDir":xt=o;break;case"imageCacheDir":bt=o;break}return t==="imageCacheDir"&&await zr(e),o}async function Mi(e,t){Ke.shell.showItemInFolder(t)}var j,fe,Ke,Ee,bi,xt,bt,Ur,jr,Zr,ki,Tt=d(()=>{"use strict";l();j=require("node:fs/promises"),fe=U(require("node:path"));Or();Ke=require("electron");ae();Nr();At();Ee=new Map,bi=()=>Ee,Ur=async()=>bt??await Ge(),jr=async()=>xt??await ee();Fr();Zr="message-logger-logs.json",ki=new Ve});var Dt={};ne(Dt,{resolveRedirect:()=>Li});function Br(e){return new Promise((t,r)=>{let i=(0,Wr.request)(new URL(e),{method:"HEAD"},n=>{t(n.headers.location?Br(n.headers.location):e)});i.on("error",r),i.end()})}async function Li(e,t){return Gi.test(t)?Br(t):t}var Wr,Gi,Hr=d(()=>{"use strict";l();Wr=require("https"),Gi=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var Rt={};ne(Rt,{readRecording:()=>Ni});async function Ni(e,t){t=(0,Le.normalize)(t);let r=(0,Le.basename)(t),i=(0,Le.normalize)(Vr.app.getPath("userData")+"/");if(console.log(r,i,t),r!=="recording.ogg"||!t.startsWith(i))return null;try{let n=await(0,$r.readFile)(t);return new Uint8Array(n.buffer)}catch{return null}}var Vr,$r,Le,Yr=d(()=>{"use strict";l();Vr=require("electron"),$r=require("fs/promises"),Le=require("path")});var Kr,qr=d(()=>{l();Kr=`/* eslint-disable */

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
});`});var Qr={};var Jr,Xr=d(()=>{"use strict";l();ce();Jr=require("electron");qr();Jr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.includes("discordsays")&&i.url.includes("youtube.com")){if(!b.store.plugins?.WatchTogetherAdblock?.enabled)return;i.executeJavaScript(Kr)}})})})});var kt={};ne(kt,{sendToOverlay:()=>Ui});function Ui(e,t){t.icon=Buffer.from(t.icon).toString("base64");let r=JSON.stringify(t);en??=(0,tn.createSocket)("udp4"),en.send(r,42069,"127.0.0.1")}var tn,en,rn=d(()=>{"use strict";l();tn=require("dgram")});var nn,on=d(()=>{l();hr();dr();Tr();Er();_r();Tt();Hr();Yr();Xr();rn();nn={AppleMusicRichPresence:pt,ConsoleShortcuts:ht,FixSpotifyEmbeds:Cr,FixYoutubeEmbeds:br,MediaDownloader:It,MessageLoggerEnhanced:Et,OpenInApp:Dt,VoiceMessages:Rt,WatchTogetherAdblock:Qr,XSOverlay:kt}});var Pt,an,sn=d(()=>{"use strict";l();Oe();Pt=require("electron");on();an={};for(let[e,t]of Object.entries(nn)){let r=Object.entries(t);if(!r.length)continue;let i=an[e]={};for(let[n,o]of r){let a=`RivercordPluginNative_${e}_${n}`;Pt.ipcMain.handle(a,o),i[n]=a}}Pt.ipcMain.on("RivercordGetPluginIpcMethodMap",e=>{e.returnValue=an})});function _t(e,t=300){let r;return function(...i){clearTimeout(r),r=setTimeout(()=>{e(...i)},t)}}var cn=d(()=>{"use strict";l()});var ln,un=d(()=>{l();ln="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+CiAgICA8dGl0bGU+Uml2ZXJjb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzL2VkaXRvci9lZGl0b3IubWFpbi5jc3MiCiAgICAgICAgaW50ZWdyaXR5PSJzaGEyNTYtdGlKUFEyTzA0ei9wWi9Bd2R5SWdock9NemV3ZitQSXZFbDFZS2JRdnNaaz0iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiCiAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIiAvPgogICAgPHN0eWxlPgogICAgICAgIGh0bWwsCiAgICAgICAgYm9keSwKICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiAwOwogICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cgo8Ym9keT4KICAgIDxkaXYgaWQ9ImNvbnRhaW5lciI+PC9kaXY+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMvbG9hZGVyLmpzIgogICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgIHJlZmVycmVycG9saWN5PSJuby1yZWZlcnJlciI+PC9zY3JpcHQ+CgogICAgPHNjcmlwdD4KICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgIHBhdGhzOiB7CiAgICAgICAgICAgICAgICB2czogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbW9uYWNvLWVkaXRvckAwLjUwLjAvbWluL3ZzIiwKICAgICAgICAgICAgfSwKICAgICAgICB9KTsKCiAgICAgICAgcmVxdWlyZShbInZzL2VkaXRvci9lZGl0b3IubWFpbiJdLCAoKSA9PiB7CiAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSgKICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29udGFpbmVyIiksCiAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3NzLAogICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogImNzcyIsCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICBzZXRDc3MoZWRpdG9yLmdldFZhbHVlKCkpCiAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIG1vbmFjbyByZS1sYXlvdXQKICAgICAgICAgICAgICAgICAgICBlZGl0b3IubGF5b3V0KCk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KPC9ib2R5PgoKPC9odG1sPgo="});function Ot(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function fn(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function pn(e,t){if(!e)return Ot(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return Ot(t);let i={},n="",o="";for(let a of r.split(ji))if(a.length!==0)if(a.charAt(0)==="@"&&a.charAt(1)!==" "){i[n]=o.trim();let s=a.indexOf(" ");n=a.substring(1,s),o=a.substring(s+1)}else o+=" "+a.replace("\\n",`
`).replace(Fi,"@");return i[n]=o.trim(),delete i[""],Ot(t,i)}var ji,Fi,hn=d(()=>{"use strict";l();ji=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,Fi=/^\\@/});function gn(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":dn.shell.openExternal(t)}return{action:"deny"}})}var dn,mn=d(()=>{"use strict";l();dn=require("electron")});function Mt(e,t){let r=(0,De.normalize)(e),i=(0,De.join)(e,t),n=(0,De.normalize)(i);return n.startsWith(r)?n:null}function vn(){return(0,he.readFile)(Ce,"utf-8").catch(()=>"")}async function zi(){let e=await(0,he.readdir)(J).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let i=await yn(r).then(fn).catch(()=>null);i!=null&&t.push(pn(i,r))}return t}function yn(e){e=e.replace(/\?v=\d+$/,"");let t=Mt(J,e);return t?(0,he.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}function In(e){let t;(0,he.open)(Ce,"a+").then(i=>{i.close(),t=(0,pe.watch)(Ce,{persistent:!1},_t(async()=>{e.webContents.postMessage("RivercordQuickCssUpdate",await vn())},50))}).catch(()=>{});let r=(0,pe.watch)(J,{persistent:!1},_t(()=>{e.webContents.postMessage("RivercordThemeUpdate",void 0)}));e.once("closed",()=>{t?.close(),r.close()})}var y,pe,he,De,Gt=d(()=>{"use strict";l();sr();sn();ce();cn();Oe();y=require("electron");un();pe=require("fs"),he=require("fs/promises"),De=require("path");hn();ae();mn();(0,pe.mkdirSync)(J,{recursive:!0});y.ipcMain.handle("RivercordOpenQuickCss",()=>y.shell.openPath(Ce));y.ipcMain.handle("RivercordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!yr.includes(r))throw"Disallowed protocol.";y.shell.openExternal(t)});y.ipcMain.handle("RivercordGetQuickCss",()=>vn());y.ipcMain.handle("RivercordSetQuickCss",(e,t)=>(0,pe.writeFileSync)(Ce,t));y.ipcMain.handle("RivercordGetThemesDir",()=>J);y.ipcMain.handle("RivercordGetThemesList",()=>zi());y.ipcMain.handle("RivercordGetThemeData",(e,t)=>yn(t));y.ipcMain.handle("RivercordGetThemeSystemValues",()=>({"os-accent-color":`#${y.systemPreferences.getAccentColor?.()||""}`}));y.ipcMain.handle("RivercordOpenMonacoEditor",async()=>{let e="Rivercord QuickCSS Editor",t=y.BrowserWindow.getAllWindows().find(i=>i.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new y.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,De.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});gn(r),await r.loadURL(`data:text/html;base64,${ln}`)})});function zn(e,t,r){let i=t;if(t in e)return void r(e[i]);Object.defineProperty(e,t,{set(n){delete e[i],e[i]=n,r(n)},configurable:!0,enumerable:!1})}var Zn=d(()=>{"use strict";l()});var lo={};function so(e,t){let r=e.slice(4).split(".").map(Number),i=t.slice(4).split(".").map(Number);for(let n=0;n<i.length;n++){if(r[n]>i[n])return!0;if(r[n]<i[n])return!1}return!1}function co(){if(!process.env.DISABLE_UPDATER_AUTO_PATCHING)try{let e=(0,M.dirname)(process.execPath),t=(0,M.basename)(e),r=(0,M.join)(e,".."),i=(0,k.readdirSync)(r).reduce((s,c)=>c.startsWith("app-")&&so(c,s)?c:s,t);if(i===t)return;let n=(0,M.join)(r,i,"resources"),o=(0,M.join)(n,"app.asar"),a=(0,M.join)(n,"_app.asar");if(!(0,k.existsSync)(o)||(0,k.statSync)(o).isDirectory())return;console.info("[Rivercord] Detected Host Update. Repatching..."),(0,k.renameSync)(o,a),(0,k.mkdirSync)(o),(0,k.writeFileSync)((0,M.join)(o,"package.json"),JSON.stringify({name:"discord",main:"index.js"})),(0,k.writeFileSync)((0,M.join)(o,"index.js"),`require(${JSON.stringify((0,M.join)(__dirname,"patcher.js"))});`)}catch(e){console.error("[Rivercord] Failed to repatch latest host update",e)}}var Wn,k,M,Bn=d(()=>{"use strict";l();Wn=require("electron"),k=require("original-fs"),M=require("path");Wn.app.on("before-quit",co)});var ho={};var S,re,uo,fo,Wt,po,Hn=d(()=>{"use strict";l();Zn();S=U(require("electron")),re=require("path");Gt();ce();ae();console.log("[Rivercord] Starting up...");uo=require.main.filename,fo=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",Wt=(0,re.join)((0,re.dirname)(uo),"..",fo),po=require((0,re.join)(Wt,"package.json"));require.main.filename=(0,re.join)(Wt,po.main);S.app.setAppPath(Wt);if(ze)console.log("[Rivercord] Running in vanilla mode. Not loading Rivercord");else{let e=b.store;if(Bn(),e.winCtrlQ){let n=S.Menu.buildFromTemplate;S.Menu.buildFromTemplate=function(o){if(o[0]?.label==="&File"){let{submenu:a}=o[0];Array.isArray(a)&&a.push({label:"Quit (Hidden)",visible:!1,acceleratorWorksWhenHidden:!0,accelerator:"Control+Q",click:()=>S.app.quit()})}return n.call(this,o)}}class t extends S.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let a=o.webPreferences.preload;o.webPreferences.preload=(0,re.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,e.frameless?o.frame=!1:e.winNativeTitleBar&&delete o.frame,e.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),!1&&(o.backgroundColor="#00000000",e.macosVibrancyStyle&&(o.vibrancy=e.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=a,super(o),In(this)}else super(o)}}Object.assign(t,S.default.BrowserWindow),Object.defineProperty(t,"name",{value:"BrowserWindow",configurable:!0});let r=require.resolve("electron");delete require.cache[r].exports,require.cache[r].exports={...S.default,BrowserWindow:t},zn(global,"appSettings",n=>{n.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0),e.disableMinSize?(n.set("MIN_WIDTH",0),n.set("MIN_HEIGHT",0)):(n.set("MIN_WIDTH",940),n.set("MIN_HEIGHT",500))}),process.env.DATA_DIR=(0,re.join)(S.app.getPath("userData"),"..","Rivercord");let i=S.app.commandLine.appendSwitch;S.app.commandLine.appendSwitch=function(...n){if(n[0]==="disable-features"){let o=new Set((n[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),n[1]+=[...o].join(",")}return i.apply(this,n)},S.app.commandLine.appendSwitch("disable-renderer-backgrounding"),S.app.commandLine.appendSwitch("disable-background-timer-throttling"),S.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Rivercord] Loading original Discord app.asar");require(require.main.filename)});l();var de=require("electron"),Vn=require("path");Gt();ce();ae();l();var Un=require("electron");l();var Sn=require("module"),Zi=(0,Sn.createRequire)("/"),Je,Wi=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Je=Zi("worker_threads").Worker}catch{}var Bi=Je?function(e,t,r,i,n){var o=!1,a=new Je(e+Wi,{eval:!0}).on("error",function(s){return n(s,null)}).on("message",function(s){return n(null,s)}).on("exit",function(s){s&&!o&&n(new Error("exited with code "+s),null)});return a.postMessage(r,i),a.terminate=function(){return o=!0,Je.prototype.terminate.call(a)},a}:function(e,t,r,i,n){setImmediate(function(){return n(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},T=Uint8Array,te=Uint16Array,Ut=Uint32Array,jt=new T([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ft=new T([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Cn=new T([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Tn=function(e,t){for(var r=new te(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var n=new Ut(r[30]),i=1;i<30;++i)for(var o=r[i];o<r[i+1];++o)n[o]=o-r[i]<<5|i;return[r,n]},xn=Tn(jt,2),zt=xn[0],Hi=xn[1];zt[28]=258,Hi[258]=28;var bn=Tn(Ft,0),En=bn[0],es=bn[1],et=new te(32768);for(g=0;g<32768;++g)V=(g&43690)>>>1|(g&21845)<<1,V=(V&52428)>>>2|(V&13107)<<2,V=(V&61680)>>>4|(V&3855)<<4,et[g]=((V&65280)>>>8|(V&255)<<8)>>>1;var V,g,Re=function(e,t,r){for(var i=e.length,n=0,o=new te(t);n<i;++n)e[n]&&++o[e[n]-1];var a=new te(t);for(n=0;n<t;++n)a[n]=a[n-1]+o[n-1]<<1;var s;if(r){s=new te(1<<t);var c=15-t;for(n=0;n<i;++n)if(e[n])for(var u=n<<4|e[n],f=t-e[n],v=a[e[n]-1]++<<f,D=v|(1<<f)-1;v<=D;++v)s[et[v]>>>c]=u}else for(s=new te(i),n=0;n<i;++n)e[n]&&(s[n]=et[a[e[n]-1]++]>>>15-e[n]);return s},Ne=new T(288);for(g=0;g<144;++g)Ne[g]=8;var g;for(g=144;g<256;++g)Ne[g]=9;var g;for(g=256;g<280;++g)Ne[g]=7;var g;for(g=280;g<288;++g)Ne[g]=8;var g,Dn=new T(32);for(g=0;g<32;++g)Dn[g]=5;var g;var Rn=Re(Ne,9,1);var kn=Re(Dn,5,1),Qe=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},O=function(e,t,r){var i=t/8|0;return(e[i]|e[i+1]<<8)>>(t&7)&r},Xe=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},Pn=function(e){return(e+7)/8|0},tt=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var i=new(e.BYTES_PER_ELEMENT==2?te:e.BYTES_PER_ELEMENT==4?Ut:T)(r-t);return i.set(e.subarray(t,r)),i};var _n=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(e,t,r){var i=new Error(t||_n[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,E),!r)throw i;return i},On=function(e,t,r){var i=e.length;if(!i||r&&r.f&&!r.l)return t||new T(0);var n=!t||r,o=!r||r.i;r||(r={}),t||(t=new T(i*3));var a=function($t){var Yt=t.length;if($t>Yt){var Kt=new T(Math.max(Yt*2,$t));Kt.set(t),t=Kt}},s=r.f||0,c=r.p||0,u=r.b||0,f=r.l,v=r.d,D=r.m,Z=r.n,$=i*8;do{if(!f){s=O(e,c,1);var Y=O(e,c+1,3);if(c+=3,Y)if(Y==1)f=Rn,v=kn,D=9,Z=5;else if(Y==2){var N=O(e,c,31)+257,R=O(e,c+10,15)+4,P=N+O(e,c+5,31)+1;c+=14;for(var x=new T(P),_=new T(19),w=0;w<R;++w)_[Cn[w]]=O(e,c+w*3,7);c+=R*3;for(var W=Qe(_),Ue=(1<<W)-1,ge=Re(_,W,1),w=0;w<P;){var Pe=ge[O(e,c,Ue)];c+=Pe&15;var m=Pe>>>4;if(m<16)x[w++]=m;else{var me=0,je=0;for(m==16?(je=3+O(e,c,3),c+=2,me=x[w-1]):m==17?(je=3+O(e,c,7),c+=3):m==18&&(je=11+O(e,c,127),c+=7);je--;)x[w++]=me}}var Bt=x.subarray(0,N),K=x.subarray(N);D=Qe(Bt),Z=Qe(K),f=Re(Bt,D,1),v=Re(K,Z,1)}else E(1);else{var m=Pn(c)+4,I=e[m-4]|e[m-3]<<8,C=m+I;if(C>i){o&&E(0);break}n&&a(u+I),t.set(e.subarray(m,C),u),r.b=u+=I,r.p=c=C*8,r.f=s;continue}if(c>$){o&&E(0);break}}n&&a(u+131072);for(var $n=(1<<D)-1,Yn=(1<<Z)-1,rt=c;;rt=c){var me=f[Xe(e,c)&$n],ve=me>>>4;if(c+=me&15,c>$){o&&E(0);break}if(me||E(2),ve<256)t[u++]=ve;else if(ve==256){rt=c,f=null;break}else{var Ht=ve-254;if(ve>264){var w=ve-257,_e=jt[w];Ht=O(e,c,(1<<_e)-1)+zt[w],c+=_e}var nt=v[Xe(e,c)&Yn],it=nt>>>4;nt||E(3),c+=nt&15;var K=En[it];if(it>3){var _e=Ft[it];K+=Xe(e,c)&(1<<_e)-1,c+=_e}if(c>$){o&&E(0);break}n&&a(u+131072);for(var Vt=u+Ht;u<Vt;u+=4)t[u]=t[u-K],t[u+1]=t[u+1-K],t[u+2]=t[u+2-K],t[u+3]=t[u+3-K];u=Vt}}r.l=f,r.p=rt,r.b=u,r.f=s,f&&(s=1,r.m=D,r.d=v,r.n=Z)}while(!s);return u==t.length?t:tt(t,0,u)};var Vi=new T(0);var $i=function(e,t){var r={};for(var i in e)r[i]=e[i];for(var i in t)r[i]=t[i];return r},wn=function(e,t,r){for(var i=e(),n=e.toString(),o=n.slice(n.indexOf("[")+1,n.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<i.length;++a){var s=i[a],c=o[a];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var v in s.prototype)t+=";"+c+".prototype."+v+"="+s.prototype[v].toString()}else t+=u}else r[c]=s}return[t,r]},qe=[],Yi=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},Ki=function(e,t,r,i){var n;if(!qe[r]){for(var o="",a={},s=e.length-1,c=0;c<s;++c)n=wn(e[c],o,a),o=n[0],a=n[1];qe[r]=wn(e[s],o,a)}var u=$i({},qe[r][1]);return Bi(qe[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,Yi(u),i)},qi=function(){return[T,te,Ut,jt,Ft,Cn,zt,En,Rn,kn,et,_n,Re,Qe,O,Xe,Pn,tt,E,On,Zt,Mn,Gn]};var Mn=function(e){return postMessage(e,[e.buffer])},Gn=function(e){return e&&e.size&&new T(e.size)},Ji=function(e,t,r,i,n,o){var a=Ki(r,i,n,function(s,c){a.terminate(),o(s,c)});return a.postMessage([e,t],t.consume?[e.buffer]:[]),function(){a.terminate()}};var F=function(e,t){return e[t]|e[t+1]<<8},L=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Lt=function(e,t){return L(e,t)+L(e,t+4)*4294967296};function Qi(e,t,r){return r||(r=t,t={}),typeof r!="function"&&E(7),Ji(e,t,[qi],function(i){return Mn(Zt(i.data[0],Gn(i.data[1])))},1,r)}function Zt(e,t){return On(e,t)}var Nt=typeof TextDecoder<"u"&&new TextDecoder,Xi=0;try{Nt.decode(Vi,{stream:!0}),Xi=1}catch{}var eo=function(e){for(var t="",r=0;;){var i=e[r++],n=(i>127)+(i>223)+(i>239);if(r+n>e.length)return[t,tt(e,r-1)];n?n==3?(i=((i&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023)):n&1?t+=String.fromCharCode((i&31)<<6|e[r++]&63):t+=String.fromCharCode((i&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(i)}};function to(e,t){if(t){for(var r="",i=0;i<e.length;i+=16384)r+=String.fromCharCode.apply(null,e.subarray(i,i+16384));return r}else{if(Nt)return Nt.decode(e);var n=eo(e),o=n[0],a=n[1];return a.length&&E(8),o}}var ro=function(e,t){return t+30+F(e,t+26)+F(e,t+28)},no=function(e,t,r){var i=F(e,t+28),n=to(e.subarray(t+46,t+46+i),!(F(e,t+8)&2048)),o=t+46+i,a=L(e,t+20),s=r&&a==4294967295?io(e,o):[a,L(e,t+24),L(e,t+42)],c=s[0],u=s[1],f=s[2];return[F(e,t+10),c,u,n,o+F(e,t+30)+F(e,t+32),f]},io=function(e,t){for(;F(e,t)!=1;t+=4+F(e,t+2));return[Lt(e,t+12),Lt(e,t+4),Lt(e,t+20)]};var An=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Ln(e,t,r){r||(r=t,t={}),typeof r!="function"&&E(7);var i=[],n=function(){for(var m=0;m<i.length;++m)i[m]()},o={},a=function(m,I){An(function(){r(m,I)})};An(function(){a=r});for(var s=e.length-22;L(e,s)!=101010256;--s)if(!s||e.length-s>65558)return a(E(13,0,1),null),n;var c=F(e,s+8);if(c){var u=c,f=L(e,s+16),v=f==4294967295||u==65535;if(v){var D=L(e,s-12);v=L(e,D)==101075792,v&&(u=c=L(e,D+32),f=L(e,D+48))}for(var Z=t&&t.filter,$=function(m){var I=no(e,f,v),C=I[0],N=I[1],R=I[2],P=I[3],x=I[4],_=I[5],w=ro(e,_);f=x;var W=function(ge,Pe){ge?(n(),a(ge,null)):(Pe&&(o[P]=Pe),--c||a(null,o))};if(!Z||Z({name:P,size:N,originalSize:R,compression:C}))if(!C)W(null,tt(e,w,w+N));else if(C==8){var Ue=e.subarray(w,w+N);if(N<32e4)try{W(null,Zt(Ue,new T(R)))}catch(ge){W(ge,null)}else i.push(Qi(Ue,{size:R},W))}else W(E(14,"unknown compression type "+C,1),null);else W(null,null)},Y=0;Y<u;++Y)$(Y)}else a(null,{});return n}var jn=require("fs"),z=require("fs/promises"),ke=require("path");ae();l();function Nn(e){function t(a,s,c,u){let f=0;return f+=a<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,i=e[4]===2;if(!i&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(i){let a=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+a+s;return e.subarray(c,e.length)}let o=12+t(e[8],e[9],e[10],e[11]);return e.subarray(o,e.length)}ct();var oo=(0,ke.join)(Ae,"ExtensionCache");async function ao(e,t){return await(0,z.mkdir)(t,{recursive:!0}),new Promise((r,i)=>{Ln(e,(n,o)=>{if(n)return void i(n);Promise.all(Object.keys(o).map(async a=>{if(a.startsWith("_metadata/"))return;if(a.endsWith("/"))return void(0,z.mkdir)((0,ke.join)(t,a),{recursive:!0});let s=a.split("/"),c=s.pop(),u=s.join("/"),f=(0,ke.join)(t,u);u&&await(0,z.mkdir)(f,{recursive:!0}),await(0,z.writeFile)((0,ke.join)(f,c),o[a])})).then(()=>r()).catch(a=>{(0,z.rm)(t,{recursive:!0,force:!0}),i(a)})})})}async function Fn(e){let t=(0,ke.join)(oo,`${e}`);try{await(0,z.access)(t,jn.constants.F_OK)}catch{let i=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,n=await oe(i,{headers:{"User-Agent":"Rivercord (https://github.com/Rivercord/Rivercord)"}});await ao(Nn(n),t).catch(console.error)}Un.session.defaultSession.loadExtension(t)}ze||de.app.whenReady().then(()=>{de.protocol.registerFileProtocol("rivercord",({url:n},o)=>{let a=n.slice(12);if(a.endsWith("/")&&(a=a.slice(0,-1)),a.startsWith("/themes/")){let s=a.slice(8),c=Mt(J,s);if(!c){o({statusCode:403});return}o(c.replace(/\?v=\d+$/,""));return}switch(a){case"renderer.js.map":case"rivercordDesktopRenderer.js.map":case"preload.js.map":case"rivercordDesktopPreload.js.map":case"patcher.js.map":case"rivercordDesktopMain.js.map":o((0,Vn.join)(__dirname,a));break;default:o({statusCode:403})}});try{b.store.enableReactDevtools&&Fn("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Rivercord] Installed React Developer Tools")).catch(n=>console.error("[Rivercord] Failed to install React Developer Tools",n))}catch{}let e=(n,o)=>Object.keys(n).find(a=>a.toLowerCase()===o),t=n=>{let o={};return n.split(";").forEach(a=>{let[s,...c]=a.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(o,s)&&(o[s]=c)}),o},r=n=>Object.entries(n).filter(([,o])=>o?.length).map(o=>o.flat().join(" ")).join("; "),i=n=>{let o=e(n,"content-security-policy");if(o){let a=t(n[o][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src","script-src","frame-src"])a[s]??=[],a[s].push("*","blob:","data:","rivercord:","'unsafe-inline'");n[o]=[r(a)]}};de.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:n,resourceType:o},a)=>{if(n&&(o==="mainFrame"&&i(n),o==="stylesheet")){let s=e(n,"content-type");s&&(n[s]=["text/css"])}a({cancel:!1,responseHeaders:n})}),de.session.defaultSession.webRequest.onHeadersReceived=()=>{}});Hn();
//# sourceURL=RivercordPatcher
//# sourceMappingURL=rivercord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */
