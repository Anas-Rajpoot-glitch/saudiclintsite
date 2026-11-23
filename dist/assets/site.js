'use strict'
const ar=document.documentElement.lang==='ar'
const q=(selector,scope=document)=>scope.querySelector(selector)
const qa=(selector,scope=document)=>[...scope.querySelectorAll(selector)]
// Published pages use clean URLs. Preserve direct disk previews of the static export.
if (location.protocol === 'file:') {
  for (const anchor of qa('a[href]')) {
    if (anchor.protocol !== 'file:' || anchor.getAttribute('href').startsWith('#')) continue
    const url = new URL(anchor.href)
    if (url.pathname.endsWith('/')) url.pathname += 'index.html'
    else if (!url.pathname.endsWith('.html')) url.pathname += '.html'
    anchor.href = url.href
  }
}
const params=new URLSearchParams(location.search)
const menu=q('.menu-toggle')
function closeMenu(){menu.setAttribute('aria-expanded','false');q('#main-nav').classList.remove('is-open')}
menu.addEventListener('click',()=>{
const open=menu.getAttribute('aria-expanded')!=='true'
menu.setAttribute('aria-expanded',String(open))
q('#main-nav').classList.toggle('is-open',open)
})
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}})
document.addEventListener('click',e=>{if(!e.target.closest('.site-head'))closeMenu()})
const switcher=q('[data-language]')
function syncLanguageLink(){
const to=new URL(switcher.href)
to.search=location.search
to.hash=location.hash
switcher.href=to.href
}
syncLanguageLink()
const cards=qa('[data-project]')
const filters=qa('[data-filter]')
let category='all',limit=8
function updateGallery(key,push=false){
category=filters.some(b=>b.dataset.filter===key)?key:'all'
const subset=cards.filter(c=>category==='all'||c.dataset.category===category)
cards.forEach(c=>c.hidden=true)
subset.slice(0,limit).forEach(c=>c.hidden=false)
filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)))
q('.load-more').hidden=limit>=subset.length
q('.result-count').textContent=ar?`عرض ${Math.min(limit,subset.length)} من ${subset.length} مشروعاً`:`Showing ${Math.min(limit,subset.length)} of ${subset.length} projects`
if(push){const u=new URL(location.href);if(category==='all')u.searchParams.delete('category');else u.searchParams.set('category',category);try{history.replaceState(history.state,'',u)}catch{}syncLanguageLink()}
}
if(filters.length){
updateGallery(params.get('category'))
filters.forEach(b=>b.addEventListener('click',()=>{limit=8;updateGallery(b.dataset.filter,true)}))
q('.load-more').addEventListener('click',()=>{const count=limit;limit+=8;updateGallery(category);cards.filter(x=>!x.hidden)[count]?.focus({preventScroll:true})})
}
const viewer=q('.viewer')
if(viewer){
let slides=[],index=0,opener
function show(n){index=(n+slides.length)%slides.length;const c=slides[index];const img=q('img',c);q('.viewer-image').src=img.currentSrc||img.src;q('.viewer-image').alt=img.alt;q('.viewer-name').textContent=q('.project-caption strong',c).textContent;q('.viewer-area').textContent=q('.project-caption small',c).textContent;q('.viewer-count').textContent=`${index+1} / ${slides.length}`}
cards.forEach(c=>c.addEventListener('click',()=>{opener=c;slides=cards.filter(x=>category==='all'||x.dataset.category===category);show(slides.indexOf(c));viewer.showModal();document.body.classList.add('modal-open')}))
q('[data-close]',viewer).addEventListener('click',()=>viewer.close())
q('[data-prev]',viewer).addEventListener('click',()=>show(index-1))
q('[data-next]',viewer).addEventListener('click',()=>show(index+1))
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()})
viewer.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();show(index+((e.key==='ArrowLeft')===ar?1:-1))}})
viewer.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true})})
}
const reviews=qa('.review')
if(reviews.length){let current=0;const dots=qa('[data-review]');const move=n=>{current=(n+reviews.length)%reviews.length;reviews.forEach((r,i)=>r.hidden=i!==current);dots.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)))};dots.forEach((b,i)=>b.addEventListener('click',()=>move(i)));qa('[data-review-step]').forEach(b=>b.addEventListener('click',()=>move(current+Number(b.dataset.reviewStep))))}
const form=q('.request-form')
if(form){
const select=form.elements.service
const requested=params.get('service')
if(requested&&[...select.options].some(o=>o.value===requested))select.value=requested
const key='alhaddadah-language-draft'
try{
const draft=JSON.parse(sessionStorage.getItem(key)||'null')
sessionStorage.removeItem(key)
if(draft&&draft.page===document.body.dataset.page&&draft.lang===document.documentElement.lang&&Date.now()-draft.time<120000){
for(const [name,value] of Object.entries(draft.fields)){if(form.elements[name])form.elements[name].value=value}
}
}catch{}
switcher.addEventListener('click',()=>{try{sessionStorage.setItem(key,JSON.stringify({page:document.body.dataset.page,lang:switcher.hreflang,time:Date.now(),fields:Object.fromEntries(new FormData(form))}))}catch{}})
form.addEventListener('input',e=>e.target.setCustomValidity?.(''))
form.addEventListener('submit',e=>{
e.preventDefault()
for(const f of qa('input[required],textarea[required]',form)){if(!f.value.trim()){f.setCustomValidity(ar?'يرجى تعبئة هذا الحقل.':'Please fill in this field.');f.reportValidity();return}}
const phone=form.elements.phone
const normalized=phone.value.replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/[۰-۹]/g,c=>c.charCodeAt(0)-1776).replace(/[\s().-]/g,'')
if(!/^\+?\d{7,15}$/.test(normalized)){phone.setCustomValidity(ar?'أدخل رقم جوال صالحاً مع مفتاح الدولة عند الحاجة.':'Enter a valid phone number, including a country code if needed.');phone.reportValidity();return}
const kind=q('[name="kind"]:checked',form)?.dataset.label||(ar?'طلب عرض سعر':'Quote request')
const lines=[kind+' — '+(ar?'الحدادة للألمنيوم، الرياض':'Al-Haddadah, Riyadh')]
for(const f of qa('[data-label]:not([type="radio"])',form)){
const value=f.tagName==='SELECT'?(f.value?f.selectedOptions[0].textContent:''):f.value.trim()
if(value)lines.push(f.dataset.label+': '+value)
}
const url=new URL('https://wa.me/'+form.dataset.whatsapp)
url.searchParams.set('text',lines.join('\n'))
location.assign(url.href)
})
}
