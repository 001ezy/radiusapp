import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import menu from './menu.json';
import './menu.css';

const locales=['ru','en','zh-CN'];
const contact='https://wa.me/996755365002';
const saladPhotos={
 'Цезарь с курицей':'samtyr-salad-caesar.webp',
 'Греческий салат':'samtyr-salad-greek.webp',
 'Зелёный салат':'samtyr-salad-green.webp',
};
export function App(){
 const [lang,setLang]=useState(()=>{try{const saved=localStorage.getItem('samtyr-menu-language');return locales.includes(saved)?saved:'ru';}catch{return'ru';}});
 const [section,setSection]=useState(menu[0].id);
 const ix=locales.indexOf(lang), t=(...copy)=>copy[ix];
 useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem('samtyr-menu-language',lang);}catch{}},[lang]);
 useEffect(()=>{let frame=0;function update(){frame=0;let selected=menu[0].id;for(const {id} of menu){if(document.getElementById(id).getBoundingClientRect().top<120)selected=id;else break;}setSection(selected);}
 function scroll(){if(!frame)frame=requestAnimationFrame(update);}
 window.addEventListener('scroll',scroll,{passive:true});update();return()=>{window.removeEventListener('scroll',scroll);if(frame)cancelAnimationFrame(frame);};},[]);
 useEffect(()=>{
 if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('arrived');observer.unobserve(entry.target);}}, {threshold:0.17});
 document.querySelectorAll('.essay-photo').forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 const feature=(key)=>{const dessert=key==='dessert', burgers=key==='burgers';return <figure className={'essay-photo '+key}><img src={import.meta.env.BASE_URL+'assets/samtyr-'+key+'.webp'} alt={burgers?t('Мини-бургеры и закуски на столе','Mini burgers and appetizers on a table','餐桌上的迷你汉堡和小食'):dessert?t('Кекс с кремом и ягодами','Cupcake with cream and berries','配有奶油和浆果的纸杯蛋糕'):t('Блюда на сервированном столе','Dishes set out on a buffet table','摆放在餐桌上的菜品')} loading="lazy" decoding="async" width="1050" height="650"/><figcaption><span className="caption">{t('Атмосфера ресторана','From the restaurant','餐厅一景')}</span><span className="roman">{burgers?t('Мини-бургеры и закуски','Mini burgers and appetizers','迷你汉堡与小食'):dessert?t('Сладкий акцент','A sweet finish','甜蜜收尾'):t('За столом','At the table','餐桌一景')}</span></figcaption></figure>;};
 const label=t('Связаться через WhatsApp','Contact via WhatsApp','通过 WhatsApp 联系');
 return <><a className="skip" href="#salads">{t('К меню','Skip to menu','跳转到菜单')}</a>
 <header className="hero" id="top"><div className="hero-copy"><div className="top"><a className="wordmark" href="#top">SAMTYR<span>HOTEL</span></a><div className="language" role="group" aria-label={t('Язык','Language','语言')}><button type="button" lang="ru" onClick={()=>setLang('ru')} aria-pressed={lang==='ru'}>RU</button><button type="button" lang="en" onClick={()=>setLang('en')} aria-pressed={lang==='en'}>EN</button><button type="button" lang="zh-CN" aria-label="简体中文" onClick={()=>setLang('zh-CN')} aria-pressed={lang==='zh-CN'}>简中</button></div></div>
 <div className="hero-body"><svg viewBox="0 0 112 42" width="112" height="42" fill="none" aria-hidden="true"><path d="M1 40L36 6l13 13L65 1l46 39M16 40l29-22 10 9 11-12 28 25M44 40l20-13 18 13" stroke="currentColor"/></svg><p className="eyebrow">{t('Ресторан','Restaurant','餐厅')}</p><h1>{t('Меню','Menu','菜单')}</h1><div className="hero-actions"><a className="start" href="#salads">{t('Смотреть меню','Explore the menu','查看菜单')}<span aria-hidden="true">↓</span></a></div></div></div>
 <img className="cover" src={import.meta.env.BASE_URL+'assets/samtyr-table.webp'} alt={t('Четыре закуски и чашка на деревянном подносе','Four appetizers and a cup on a wooden tray','木托盘上的四份小食和一只杯子')} fetchPriority="high" width="1536" height="1024"/></header>
 <nav className="categorybar" aria-label={t('Разделы меню','Menu sections','菜单分类')}><div className="nav-inner">{menu.map(g=><a key={g.id} href={'#'+g.id} onClick={()=>setSection(g.id)} aria-current={g.id===section?'location':undefined}>{g.name[ix]}</a>)}</div></nav>
 <main id="menu">{menu.map(g=><React.Fragment key={g.id}>{g.id==='main'?feature('buffet'):g.id==='burgers'?feature('burgers'):g.id==='desserts'?feature('dessert'):null}<section className="group" id={g.id}><div className="sectionhead"><div><span className="section-ornament" aria-hidden="true">✦</span><h2>{g.name[ix]}</h2></div><div className="sectionline"/></div><div className="dishes">{g.items.map(d=><article className={'dish'+(g.id==='salads'?' dish-with-photo':'')} key={d.name[0]}>{g.id==='salads'&&saladPhotos[d.name[0]]&&<img className="dish-photo" src={import.meta.env.BASE_URL+'assets/'+saladPhotos[d.name[0]]} alt={d.name[ix]} width="880" height="660" loading="lazy" decoding="async"/>}<div className="dishbody"><h3>{d.name[ix]}</h3>{d.description[ix]&&<p>{d.description[ix]}</p>}</div><span className="price">{d.price} <small>{t('сом','KGS','索姆')}</small></span></article>)}</div></section></React.Fragment>)}</main>
 <a className="contact-float" href={contact} target="_blank" rel="noopener noreferrer" aria-label={label}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3 20l1.2-4.9A8.4 8.4 0 1 1 20.5 11.6Z"/><path d="M9 8c-.5-.6-1.6.1-1.6 1 0 2.7 3.9 6.3 6.7 6.3.8 0 1.5-1.2 1.1-1.6l-1.6-1.1c-.4-.2-.7.5-1 .6-1-.4-2.3-1.5-2.7-2.5.2-.3.7-.5.5-.9Z"/></svg><span>WhatsApp</span></a><footer><span className="wordmark">SAMTYR<span>HOTEL</span></span><div className="footer-note">{t('Цены указаны в сомах','Prices are shown in Kyrgyz som (KGS)','价格均以吉尔吉斯斯坦索姆（KGS）标示')}</div><a href="#top">{t('Наверх','Back to top','返回顶部')} ↑</a></footer></>;
}
if(typeof document!=='undefined')createRoot(document.getElementById('root')).render(<App/>);
