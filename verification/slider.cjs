const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
const root=process.cwd(),report={screens:[],errors:[]};
const server=http.createServer((req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!file.startsWith(root+path.sep))throw Error();res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.webp')?'image/webp':'image/png');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let browser,ws,id=0;const pending=new Map();
const keep=setInterval(()=>{},1000);const timeout=setTimeout(()=>{console.error('QA timeout');cleanup();process.exitCode=1;},35000);
function cleanup(){clearTimeout(timeout);clearInterval(keep);if(ws)ws.close();server.close();if(browser)browser.kill();}
function cmd(method,params={}){return new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});}
async function evalJS(expression){const r=await cmd('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;const profile=fs.mkdtempSync(path.join(os.tmpdir(),'tole-pro-qa-'));browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-extensions','--no-first-run','--remote-debugging-port=9335','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
let tabs;for(let i=0;i<50;i++){try{tabs=await(await fetch('http://127.0.0.1:9335/json')).json();if(tabs.some(t=>t.type==='page'))break;}catch{}await sleep(200);}
ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){let p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')report.errors.push(m.params.exceptionDetails.text);});await cmd('Runtime.enable');await cmd('Page.enable');await cmd('Page.bringToFront');await cmd('Network.enable');await cmd('Network.setBlockedURLs',{urls:['https://fonts.googleapis.com/*','https://fonts.gstatic.com/*']});await cmd('Page.navigate',{url:'http://127.0.0.1:'+port+'/'});await sleep(1700);

const assert=(ok,msg)=>{if(!ok)throw Error(msg);};
async function position(){return evalJS(`({scroll:scrollY/(document.documentElement.scrollHeight-innerHeight),value:+document.querySelector('#scrollControl').value,progress:+getComputedStyle(document.documentElement).getPropertyValue('--p')})`);}
for (const mobile of [false,true]) {
 await cmd('Emulation.setDeviceMetricsOverride',{width:mobile?390:1440,height:mobile?844:900,deviceScaleFactor:1,mobile});
 await cmd('Emulation.setTouchEmulationEnabled',{enabled:mobile});
 await evalJS('scrollTo(0,0)');await sleep(600);
 const r=await evalJS(`(()=>{const r=document.querySelector('#scrollControl').getBoundingClientRect();return {left:r.left,width:r.width,y:r.top+r.height/2}})()`);
 const start=r.left+19, end=r.left+r.width-19;
 if(mobile){
  await cmd('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start,y:r.y}]});
  await cmd('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:(start+end)/2,y:r.y}]});
 }else{
  await cmd('Input.dispatchMouseEvent',{type:'mousePressed',x:start,y:r.y,button:'left',clickCount:1});
  await cmd('Input.dispatchMouseEvent',{type:'mouseMoved',x:(start+end)/2,y:r.y,button:'left',buttons:1});
 }
 await sleep(100);const middle=await position();assert(Math.abs(middle.scroll-.5)<.04,'Drag middle '+JSON.stringify(middle));
 if(mobile){await cmd('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:end,y:r.y}]});await cmd('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 else{await cmd('Input.dispatchMouseEvent',{type:'mouseMoved',x:end,y:r.y,button:'left',buttons:1});await cmd('Input.dispatchMouseEvent',{type:'mouseReleased',x:end,y:r.y,button:'left',clickCount:1});}
 await sleep(150);const finish=await position();assert(finish.scroll>.98,'Drag end');
 await evalJS('scrollTo(0,.25*(document.documentElement.scrollHeight-innerHeight))');await sleep(650);const reverse=await position();assert(Math.abs(reverse.value-25)<=1,'Scroll updates slider');
 report.screens.push({mobile,middle,finish,reverse});
}
await evalJS(`document.querySelector('#scrollControl').focus()`);
for(const [key,code,value] of [['Home',36,0],['End',35,100],['ArrowLeft',37,99]]){
 await cmd('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:code});
 await cmd('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:code});await sleep(100);
 const p=await position();assert(p.value===value,'Keyboard '+key+' '+JSON.stringify(p));
}
report.keyboard=true;assert(!report.errors.length,'JavaScript errors');
fs.writeFileSync('verification/slider-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
await cmd('Browser.close');cleanup();})().catch(e=>{console.error(e);cleanup();process.exitCode=1;});
