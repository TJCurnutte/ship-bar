const p=require('puppeteer-core');const R=process.argv[2]||'r1';const U='https://ship-bar.neural-forge.io/';
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const out={};
for(const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]){const pg=await b.newPage();const errs=[];
pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});pg.on('pageerror',e=>errs.push(String(e)));pg.on('requestfailed',r=>errs.push('failed '+r.url()));
await pg.setViewport({width:w,height:h,deviceScaleFactor:1,isMobile:n=='mobile',hasTouch:n=='mobile'});await pg.goto(U,{waitUntil:'networkidle0'});
await pg.screenshot({path:`/workspace/shipbar/${R}-${n}-${w}.png`,fullPage:true});
const r=await pg.evaluate(()=>{const sw=document.documentElement.scrollWidth,cw=document.documentElement.clientWidth;const wide=[];const ban={};
const add=(k,el)=>{(ban[k]=ban[k]||[]).push(el.tagName+(el.id?'#'+el.id:'')+(el.className?'.'+el.className:''))};
for(const el of document.querySelectorAll('body *')){const s=getComputedStyle(el),rc=el.getBoundingClientRect();
if(rc.right>cw+1&&!el.closest('.t,pre'))wide.push(el.tagName+'.'+el.className);
if(/gradient/.test(s.backgroundImage))add('gradient',el);if(s.backdropFilter&&s.backdropFilter!='none')add('glass',el);
if(s.textShadow!='none')add('glow-text',el);if(/blur\(|drop-shadow/.test(s.filter))add('glow-filter',el);
if(s.boxShadow!='none'&&/\d+px \d+px [1-9]\d*px/.test(s.boxShadow))add('blurred-shadow',el);
if(/^H[1-6]$/.test(el.tagName)&&/serif/.test(s.fontFamily)&&!/sans-serif/.test(s.fontFamily))add('serif-headline',el);
if(/^H[1-3]$/.test(el.tagName)&&s.textTransform!='lowercase'&&el.textContent!==el.textContent.toLowerCase())add('non-lowercase-headline',el);
if(s.display=='grid'&&s.gridTemplateColumns.split(' ').length>=3&&el.children.length>=4)add('bento?',el);
if(s.position=='fixed'||s.position=='sticky')add('sticky/fixed',el);}
const txt=document.body.innerText;const filler=['lorem','seamless','supercharge','unlock','revolutionary','game-changer','todo','undefined','NaN','[object'].filter(w=>txt.toLowerCase().includes(w.toLowerCase()));
const small=[...document.querySelectorAll('a,button,summary')].filter(e=>{const q=e.getBoundingClientRect();return q.height<24&&q.width>0}).map(e=>e.textContent.trim().slice(0,30));
const fonts=[...new Set([...document.querySelectorAll('body *')].map(e=>getComputedStyle(e).fontFamily.split(',')[0]))];
const colors=[...new Set([...document.querySelectorAll('body *')].flatMap(e=>{const s=getComputedStyle(e);return [s.color,s.backgroundColor]}))].filter(c=>c!='rgba(0, 0, 0, 0)');
return {scrollWidth:sw,clientWidth:cw,overflow:sw>cw,wide:wide.slice(0,10),banned:ban,filler,smallTargets:small,fonts,colors,h1:document.querySelector('h1').innerText,height:document.documentElement.scrollHeight}});
r.consoleErrors=errs;out[n]=r;await pg.close();}
await b.close();require('fs').writeFileSync(`/workspace/shipbar/${R}-measure.json`,JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1))})();
