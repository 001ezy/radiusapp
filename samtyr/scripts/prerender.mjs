import {readFile,writeFile} from 'node:fs/promises';
import {createServer} from 'vite';
const vite=await createServer({server:{middlewareMode:true,watch:null,ws:false},appType:'custom'});
try{
 const {default:prerender}=await vite.ssrLoadModule('/src/prerender.jsx');
 const markup=prerender().replace(/(?:\.\/|\/)assets\/(samtyr-(?:table|dessert|main-[a-z]+)\.webp)/g,'./assets/$1');
 const path=new URL('../dist/index.html',import.meta.url);
 const page=await readFile(path,'utf8');
 if(!page.includes('<div id="root"></div>')) throw Error('Missing prerender slot');
 await writeFile(path,page.replace('<div id="root"></div>',()=>'<div id="root">'+markup+'</div>').replace(/<noscript>.*?<\/noscript>/s,''));
}finally{await vite.close();}
