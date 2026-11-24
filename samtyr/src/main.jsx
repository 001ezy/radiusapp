import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import menu from './menu.json';
import './menu.css';

const dishArt={'Стейк Рибай':'ribeye','Стейк на говяжьей кости':'bone','Медальоны':'medallions','Стейк из форели':'trout','Куриный стейк':'chicken'};
const contact='https://wa.me/996755365002';
export function App(){
 const [lang,setLang]=useState(()=>{try{return localStorage.getItem('samtyr-menu-language')==='en'?'en':'ru';}catch{return'ru';}});
 const [section,setSection]=useState(menu[0].id);
 const ix=Number(lang==='en'), t=(ru,en)=>ix?en:ru;
 useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem('samtyr-menu-language',lang);}catch{}},[lang]);
 useEffect(()=>{let frame=0;function update(){frame=0;let selected=menu[0].id;for(const {id} of menu){if(document.getElementById(id).getBoundingClientRect().top<120)selected=id;else break;}setSection(selected);}
 function scroll(){if(!frame)frame=requestAnimationFrame(update);}
 window.addEventListener('scroll',scroll,{passive:true});update();return()=>{window.removeEventListener('scroll',scroll);if(frame)cancelAnimationFrame(frame);};},[]);
 useEffect(()=>{
 if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('arrived');observer.unobserve(entry.target);}}, {threshold:0.17});
 document.querySelectorAll('.essay-photo').forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 const feature=()=> <figure className="essay-photo dessert"><img src={import.meta.env.BASE_URL+'assets/samtyr-dessert.webp'} alt={t('Кекс с кремом и ягодами','Cupcake with cream and berries')} loading="lazy" decoding="async" width="1050" height="650"/><figcaption><span className="caption">{t('Атмосфера ресторана','From the restaurant')}</span><span className="roman">{t('Сладкий акцент','A sweet finish')}</span></figcaption></figure>;
 const dishImage=(key,name)=><figure className="dish-art"><img src={import.meta.env.BASE_URL+'assets/samtyr-main-'+key+'.webp'} alt={t(name+' — иллюстрация приготовления на сковороде',name+' — illustration of preparation in a skillet')} width="960" height="640" loading="lazy" decoding="async"/><figcaption>{t('ИИ-иллюстрация приготовления','AI illustration of preparation')}</figcaption></figure>;
 const label=t('Связаться через WhatsApp','Contact via WhatsApp');
 return <><a className="skip" href="#salads">{t('К меню','Skip to menu')}</a>
 <header className="hero" id="top"><div className="hero-copy"><div className="top"><a className="wordmark" href="#top">SAMTYR<span>HOTEL</span></a><div className="language" role="group" aria-label={t('Язык','Language')}><button type="button" onClick={()=>setLang('ru')} aria-pressed={!ix}>RU</button><button type="button" onClick={()=>setLang('en')} aria-pressed={!!ix}>EN</button></div></div>
 <div className="hero-body"><h1>{t('Меню','Menu')}</h1><div className="hero-actions"><a className="start" href="#salads">{t('Смотреть меню','Explore the menu')}<span aria-hidden="true">↓</span></a></div></div></div>
 <img className="cover" src={import.meta.env.BASE_URL+'assets/samtyr-table.webp'} alt={t('Четыре закуски и чашка на деревянном подносе','Four appetizers and a cup on a wooden tray')} fetchPriority="high" width="1536" height="1024"/></header>
 <nav className="categorybar" aria-label={t('Разделы меню','Menu sections')}><div className="nav-inner">{menu.map(g=><a key={g.id} href={'#'+g.id} onClick={()=>setSection(g.id)} aria-current={g.id===section?'location':undefined}>{g.name[ix]}</a>)}</div></nav>
 <main id="menu">{menu.map(g=><React.Fragment key={g.id}>{g.id==='desserts'?feature():null}<section className="group" id={g.id}><div className="sectionhead"><div><span className="section-ornament" aria-hidden="true">✦</span><h2>{g.name[ix]}</h2></div><div className="sectionline"/></div><div className="dishes">{g.items.map(d=><article className={g.id==='main'?'dish dish--main':'dish'} key={d.name[0]}>{g.id==='main'&&dishArt[d.name[0]]?dishImage(dishArt[d.name[0]],d.name[ix]):null}<div className="dishbody"><h3>{d.name[ix]}</h3>{d.description[ix]&&<p>{d.description[ix]}</p>}</div><span className="price">{d.price} <small>{t('сом','KGS')}</small></span></article>)}</div></section></React.Fragment>)}</main>
 <a className="contact-float" href={contact} target="_blank" rel="noopener noreferrer" aria-label={label}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3 20l1.2-4.9A8.4 8.4 0 1 1 20.5 11.6Z"/><path d="M9 8c-.5-.6-1.6.1-1.6 1 0 2.7 3.9 6.3 6.7 6.3.8 0 1.5-1.2 1.1-1.6l-1.6-1.1c-.4-.2-.7.5-1 .6-1-.4-2.3-1.5-2.7-2.5.2-.3.7-.5.5-.9Z"/></svg><span>WhatsApp</span></a><footer><span className="wordmark">SAMTYR<span>HOTEL</span></span><div className="footer-note">{t('Цены указаны в сомах','Prices are shown in Kyrgyz som (KGS)')}</div><a href="#top">{t('Наверх','Back to top')} ↑</a></footer></>;
}
if(typeof document!=='undefined')createRoot(document.getElementById('root')).render(<App/>);
