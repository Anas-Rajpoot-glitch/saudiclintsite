import {mkdirSync,writeFileSync} from 'node:fs'
import {resolve,relative,dirname} from 'node:path'
import {services,prices} from './services.mjs'
import {projects} from './gallery.mjs'
import {workshopLocation,brand,legalName,districts,summaries,values,reviews} from './content.mjs'
import {icon} from './icons.mjs'
import {planningNotes} from './search-content.mjs'
import {pageHead, sitemap, escapeHtml as html} from './seo.mjs'

const dist = resolve('dist')
const vercelBuild = process.argv.includes('--vercel')
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const origin = new URL(process.env.SITE_ORIGIN || (productionHost && `https://${productionHost}`) || 'https://al-haddadah-riyadh.beigealto4.chatgpt.site').origin
const phone='966532006716', waPhone='966575807288'
const routes=['home','services',...services.map(s=>s.slug),'gallery','about','contact']
const sections=['home','services','gallery','about','contact']
const labels={ar:['الرئيسية','خدماتنا','معرض الأعمال','من نحن','تواصل معنا'],en:['Home','Services','Gallery','About us','Contact']}
const assetIcons=['frame','iron','door','window','facade','canopy','gates','rails']
const featured=[11,24,6,16,39,48,56,35]
let lang, page
const T=(ar,en)=>lang==='ar'?ar:en
const localPath=(p,l=lang)=>(l==='en'?'en/':'')+(p==='home'?'index.html':(services.some(x=>x.slug===p)?'services/':'')+p+'.html')
const cleanPath = path => path.replace(/index\.html$/, '').replace(/\.html$/, '')
const pagePath = (p, l) => {
  const path = '/' + cleanPath(localPath(p, l))
  return vercelBuild && path === '/en/' ? '/en' : path
}
const link = (p, l=lang) => vercelBuild ? pagePath(p, l) : cleanPath(relative(dirname(localPath(page)),localPath(p,l)).replaceAll('\\','/')) || './'
const asset = p => vercelBuild ? '/' + p.replace(/^\//,'') : relative(dirname(localPath(page)),p.replace(/^\//,'')).replaceAll('\\','/')
const absolute = (p, l=lang) => origin + pagePath(p, l)
const name=p=>labels[lang][sections.indexOf(p)]||services.find(s=>s.slug===p)[lang].name
const wLink=(msg=T('مرحباً، أود الاستفسار عن خدمات الحدادة والألمنيوم في الرياض.','Hello, I would like to ask about your ironwork and aluminum services in Riyadh.'))=>`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`
const iconButton=(label,url,ic,cls='primary',extra='')=>`<a class="btn ${cls}" href="${html(url)}" ${extra}>${ic?icon(ic,19):''}<span>${html(label)}</span></a>`
const eyebrow=s=>`<div class="eyebrow"><i></i>${html(s)}</div>`
const photo=(n,cls='',eager=false)=>`<img class="${cls}" src="${asset(projects[n].image)}" alt="${html(projects[n][lang].join(T('، ',' · ')))}" loading="${eager?'eager':'lazy'}" decoding="async" width="${projects[n].width}" height="${projects[n].height}">`
const brandEmblem = () => `<img class="brand-emblem" src="${asset('assets/anvil-gearworks-emblem.png')}" width="58" height="58" alt="">`
function header(){
const active=services.some(s=>s.slug===page)?'services':page
return `<a class="skip" href="#main">${T('انتقل إلى المحتوى','Skip to content')}</a><header class="site-head"><div class="wrap head-inner">
<a class="brand" href="${link('home')}" aria-label="${brand[lang]}">${brandEmblem()}<span><strong>${brand[lang]}</strong><small>${T('للحدادة والأعمال المعدنية','ALUMINUM & IRON WORKS')}</small></span></a>
<nav id="main-nav" aria-label="${T('القائمة الرئيسية','Main navigation')}">${sections.map(p=>`<a href="${link(p)}" ${active===p?'aria-current="page"':''}>${name(p)}</a>`).join('')}</nav>
<div class="head-actions"><a class="lang" data-language href="${link(page,T('en','ar'))}" hreflang="${T('en','ar')}" lang="${T('en','ar')}">${icon('globe',18)}<span>${T('English','العربية')}</span></a>${iconButton(T('اتصل الآن','Call now'),'tel:+'+phone,'phone','call-top')}<button class="menu-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="${T('القائمة','Menu')}">${icon('menu')}</button></div></div></header>`
}
function footer(){
return `<footer><div class="wrap foot-grid"><div class="foot-brand"><a class="brand" href="${link('home')}">${brandEmblem()}<span><strong>${brand[lang]}</strong><small>${T('للحدادة والأعمال المعدنية','ALUMINUM & IRON WORKS')}</small></span></a><p>${legalName[lang]}.</p><span class="foot-loc">${icon('pin',16)}${T('الرياض، المملكة العربية السعودية','Riyadh, Saudi Arabia')}</span></div>
<div><h3>${T('روابط سريعة','Explore')}</h3>${sections.map(s=>`<a href="${link(s)}">${name(s)}</a>`).join('')}</div><div><h3>${name('services')}</h3>${services.map(s=>`<a href="${link(s.slug)}">${s[lang].name}</a>`).join('')}</div><div><h3>${name('contact')}</h3><a href="tel:+${phone}">${icon('phone',15)} <bdi>053 200 6716</bdi></a><a href="${wLink()}">${icon('whatsapp',16)} <bdi>057 580 7288</bdi></a><a href="tel:+${waPhone}">${T('الهاتف الثاني','Second phone')} <bdi>057 580 7288</bdi></a><p>${T('السبت إلى الخميس','Saturday to Thursday')}<br>${T('٧ صباحاً – ١١ مساءً','7 AM – 11 PM')}</p></div></div><div class="wrap foot-base">© ${new Date().getFullYear()} ${brand[lang]} · ${T('جميع الحقوق محفوظة','All rights reserved')}</div></footer>
<a class="float-wa" href="${wLink()}" aria-label="${T('تواصل معنا عبر واتساب','Chat with us on WhatsApp')}" title="${T('تواصل عبر واتساب','Chat on WhatsApp')}">${icon('whatsapp',30)}</a>`
}
function stats(){
const statlabels=T(['عاماً من الخبرة','مشروع منجز','عميل راضٍ','فنياً متخصصاً'],['Years of experience','Completed projects','Satisfied clients','Specialist technicians'])
return `<div class="stats"><div class="wrap stats-inner">${[15,500,400,25].map((v,i)=>`<div class="stat"><div class="stat-icon">${icon(['medal','structure','people','tools'][i],27)}</div><div><strong dir="ltr">${v}<em>+</em></strong><span>${statlabels[i]}</span></div></div>`).join('')}</div></div>`
}
function homeHero(){
return `<section class="hero"><img class="hero-photo" src="${asset('assets/hero.webp')}" srcset="${asset('assets/hero-1100.webp')} 1100w, ${asset('assets/hero.webp')} 2022w" sizes="100vw" alt="${T('فني يلحم قطعة حديد في الورشة','A welder joining a steel section in a workshop')}" width="2022" height="778" fetchpriority="high"><div class="hero-shade"></div><div class="wrap hero-inner"><div class="hero-copy"><div class="place">${icon('pin',16)}${T('الرياض، المملكة العربية السعودية','Riyadh, Saudi Arabia')}</div>
<h1>${T('حدادة وألمنيوم','Ironwork & aluminum')}<br><em>${T('على مقاس مشروعك','made for your space')}</em></h1>
<p>${T('نصمّم ونصنّع ونركّب الأبواب والنوافذ والبوابات والواجهات في الرياض، من أول مقاس حتى آخر لحام.','From the first measurement to the final weld, we design, fabricate and install doors, windows, gates and facades across Riyadh.')}</p>
<div class="actions">${iconButton(T('اطلب عرض سعر مجاني','Get a free quote'),link('contact'),'quote')}${iconButton(T('استكشف خدماتنا','Explore our services'),link('services'),'grid','ghost')}</div></div>
<a href="${link('gallery')}" class="hero-gallery">${icon('gallery',17)}${T('شاهد أعمالنا','View our work')}</a></div></section>${stats()}`
}
function sectionTitle(k,title,desc='',action=''){
return `<div class="section-head"><div>${eyebrow(k)}<h2>${title}</h2>${desc?`<p>${desc}</p>`:''}</div>${action}</div>`
}
function cards(list=services){
return `<div class="service-grid">${list.map(s=>{let i=services.indexOf(s);return `<a class="service-card" href="${link(s.slug)}"><div class="service-image">${photo(featured[i])}<span class="card-icon">${icon(assetIcons[i],23)}</span></div><div class="service-body"><h3>${s[lang].name}</h3><p>${summaries[lang][i]}</p><span class="small-link">${T('تفاصيل الخدمة','Service details')}<b>+</b></span></div></a>`}).join('')}</div>`
}
function serviceSection(){
return `<section class="paper section" id="services"><div class="wrap">${sectionTitle(T('خدمات الورشة','Workshop services'),T('خدمات الحدادة والألمنيوم','Our ironwork & aluminum services'),'',iconButton(T('عرض جميع الخدمات','View all services'),link('services'),'grid','outline'))}${cards()}</div></section>`
}
function districtSection(){
return `<section class="section area-section"><div class="wrap area-layout"><div>${eyebrow(T('مناطق الخدمة','Service area'))}<h2>${T('نصل إلى جميع أحياء الرياض','Serving every district in Riyadh')}</h2><p>${linkedCopy(T('أرسل اسم الحي وموقع المشروع عند [طلب معاينة وعرض سعر](contact). ننسّق معك زيارة الموقع لأخذ المقاسات ومناقشة خيارات التنفيذ.','Include your district and location when you [request a site survey and quote](contact). We’ll arrange a visit to take measurements and discuss the work.'))}</p></div><ul class="districts">${districts[lang].map(v=>`<li>${icon('pin',15)}${v}</li>`).join('')}</ul></div></section>`
}
function aboutIntro(full=false){
return `<section class="section white"><div class="wrap story-layout"><div class="story-photo">${photo(11)}<div class="story-seal"><img src="${asset('assets/anvil-gearworks-emblem.png')}" alt="${brand[lang]}" width="76" height="76"></div></div><div>${eyebrow(T('عن المؤسسة','The workshop'))}<h2>${T('من ورشتنا في الرياض إلى موقع مشروعك','From our Riyadh workshop to your project')}</h2><p>${T(legalName.ar+' تتولى تفصيل وتركيب الحديد والألمنيوم للمنازل والفلل والمحلات والمباني التجارية. يبدأ العمل بمعاينة الموقع ومراجعة احتياجاتك، ثم اختيار الخامات والتصميم والتشطيب.','Al-Haddadah fabricates and installs ironwork and aluminum for homes, villas, shops and commercial buildings in Riyadh. Each job starts with a site survey and a conversation about materials, design and finish.')}</p>
${full?`<p>${T('بدأت المؤسسة في الرياض لخدمة مشاريع المدينة السكنية والتجارية. وضمن تطلعات رؤية السعودية 2030، نواصل تطوير أدوات الورشة وطرق التصنيع والتركيب. رؤيتنا الريادة في أعمال الألمنيوم، ورسالتنا تقديم جودة يلمسها العميل في تفاصيل التركيب.','Founded in Riyadh to serve residential and commercial projects, the business continues to develop its equipment and fabrication methods in line with Saudi Vision 2030. Its vision is to lead in aluminum work, with a focus on quality that customers can see in the finished installation.')}</p>`:`<div class="story-notes"><span>${icon('ruler')}${T('تفصيل حسب المقاس','Made to measure')}</span><span>${icon('badge')}${T('ضمان وخدمة ما بعد البيع','Warranty and aftercare')}</span></div>${iconButton(T('تعرّف على المؤسسة','About the workshop'),link('about'),null,'outline')}`}</div></div></section>`
}
function cta(service){
return `<section class="cta"><div class="wrap cta-inner"><div>${eyebrow(T('تواصل مع الورشة','Talk to the workshop'))}<h2>${T('ما الذي ترغب في تنفيذه؟','What do you have in mind?')}</h2><p>${T('شاركنا المقاسات أو فكرة المشروع لنساعدك في اختيار الخدمة والتشطيب.','Share your measurements or project idea and we’ll help you choose the right service and finish.')}</p></div><div class="actions">${iconButton(T('طلب عرض سعر','Request a quote'),link('contact')+(service?'?service='+service.slug:''),'quote')}${iconButton(T('محادثة واتساب','Chat on WhatsApp'),wLink(),'whatsapp','ghost')}${iconButton(T('اتصل الآن','Call now'),'tel:+'+phone,'phone','ghost')}</div></div></section>`
}
function crumbs(current,parent=''){
return `<nav class="crumbs" aria-label="${T('مسار الصفحة','Breadcrumb')}"><a href="${link('home')}">${name('home')}</a><span>/</span>${parent?`<a href="${link(parent)}">${name(parent)}</a><span>/</span>`:''}<b aria-current="page">${current}</b></nav>`
}
function mast(section,title,desc,n,buttons='',parent=''){
return `<section class="mast"><div class="wrap mast-grid"><div>${crumbs(name(page),parent)}${eyebrow(section)}<h1>${title}</h1><p>${desc}</p>${buttons?`<div class="actions">${buttons}</div>`:''}</div><div class="mast-photo">${photo(n,'',true)}</div></div></section>`
}
function tiles(projectIds,cls=''){
return `<div class="projects-grid ${cls}">${projectIds.map(i=>projectTile(projects[i])).join('')}</div>`
}
function projectTile(p){
return `<button class="project-tile" data-project="${p.id}" data-category="${p.category}" type="button"><img src="${asset(p.image)}" alt="${html(p[lang][0])}" loading="lazy" decoding="async" width="${p.width}" height="${p.height}"><span class="project-caption"><small>${icon('pin',14)}${html(p[lang][1])}</small><strong>${html(p[lang][0])}</strong></span><span class="zoom">${icon('plus',17)}</span></button>`
}
function lightbox(){
return `<dialog class="viewer" aria-label="${T('معاينة المشروع','Project viewer')}"><div class="viewer-bar"><span class="viewer-count" dir="ltr"></span><button type="button" data-close aria-label="${T('إغلاق','Close')}">${icon('close')}</button></div><img class="viewer-image" alt=""><div class="viewer-bottom"><div><strong class="viewer-name"></strong><span class="viewer-area"></span></div><div class="viewer-nav"><button type="button" data-prev aria-label="${T('السابق','Previous')}">${icon(T('next','prev'))}</button><button type="button" data-next aria-label="${T('التالي','Next')}">${icon(T('prev','next'))}</button></div></div></dialog>`
}
function homeGallery(){
return `<section class="section dark-projects"><div class="wrap">${sectionTitle(T('من معرض الأعمال','Project gallery'),T('أعمال من الرياض','A selection from Riyadh'),'',iconButton(T('المعرض الكامل','Full gallery'),link('gallery'),'gallery','ghost'))}${tiles([24,39,16,35,6,48],'showcase')}</div></section>`
}
function testimonials(){
return `<section class="section white"><div class="wrap review-layout"><div>${eyebrow(T('شهادات العملاء','Customer testimonials'))}<h2>${T('آراء من عملائنا','From our customers')}</h2></div><div class="review-wrap">${reviews[lang].map((r,i)=>`<figure class="review" ${i?'hidden':''}><div class="stars" aria-hidden="true">★★★★★</div><blockquote>“${html(r[0])}”</blockquote><figcaption><strong>${r[1]}</strong><span>${r[2]} · ${r[3]}</span></figcaption></figure>`).join('')}<div class="review-nav"><button type="button" data-review-step="-1" aria-label="${T('الرأي السابق','Previous review')}">${icon(T('next','prev'),18)}</button>${reviews[lang].map((_,i)=>`<button class="dot" data-review="${i}" aria-label="${T('الرأي','Review')} ${i+1}" aria-pressed="${i===0}"></button>`).join('')}<button type="button" data-review-step="1" aria-label="${T('الرأي التالي','Next review')}">${icon(T('prev','next'),18)}</button></div></div></div></section>`
}
function requestForm(detail=false){
const label=T({name:'الاسم الكامل',phone:'رقم الجوال',email:'البريد الإلكتروني (اختياري)',service:'الخدمة المطلوبة',district:'موقع المشروع في الرياض (اختياري)',details:'تفاصيل المشروع',work:'طلب تنفيذ',consult:'استشارة فنية',quote:'طلب عرض سعر'},
{name:'Full name',phone:'Mobile number',email:'Email (optional)',service:'Service required',district:'Project location in Riyadh (optional)',details:'Project details',work:'Work request',consult:'Technical consultation',quote:'Quote request'})
const choices=[...services.map(s=>[s.slug,s[lang].name]),...(!detail?prices.map((p,i)=>['iron-'+i,p[lang][0]]):[]),['other',T('أخرى','Other')]]
return `<form class="request-form" method="dialog" data-request="${detail?'quote':'work'}" data-whatsapp="${waPhone}">
<h2>${detail?T('اطلب عرض سعر','Request a quote'):T('أرسل تفاصيل طلبك','Tell us about your project')}</h2>
${detail?'':`<fieldset class="request-tabs"><legend class="sr">${T('نوع الطلب','Request type')}</legend>${['work','consult'].map((k,i)=>`<label><input type="radio" name="kind" value="${k}" data-label="${label[k]}" ${i?'':'checked'}><span>${label[k]}</span></label>`).join('')}</fieldset>`}
<div class="form-grid"><label>${label.name} <b>*</b><input required maxlength="100" name="customer" data-label="${label.name}" autocomplete="name" placeholder="${T('اسمك الكامل','Your full name')}"></label><label>${label.phone} <b>*</b><input name="phone" type="tel" required minlength="7" maxlength="25" autocomplete="tel" data-label="${label.phone}" placeholder="05xxxxxxxx" dir="ltr"></label>
${detail?`<label>${label.email}<input name="email" type="email" maxlength="200" dir="ltr" autocomplete="email" data-label="${T('البريد الإلكتروني','Email')}" placeholder="name@example.com"></label>`:''}
<label class="${!detail?'wide':''}">${label.service} ${detail?'<b>*</b>':''}<select name="service" ${detail?'required':''} data-label="${label.service}"><option value="">${T('اختر الخدمة','Select a service')}</option>${choices.map(([v,n])=>`<option value="${v}">${n}</option>`).join('')}</select></label>
${detail?`<label class="wide">${label.district}<input name="district" maxlength="160" data-label="${T('موقع المشروع','Project location')}" placeholder="${T('مثال: حي الملقا','e.g. Al-Malqa district')}"></label>`:''}
<label class="wide">${label.details} <b>*</b><textarea name="details" required maxlength="3000" rows="4" data-label="${label.details}" placeholder="${T('ما المطلوب تنفيذه؟ أضف المقاسات والكميات إن توفرت.','Describe the work, including measurements and quantities if available.')}"></textarea></label></div>
<button class="btn primary submit" type="submit">${icon('whatsapp',20)}${T('إرسال الطلب عبر واتساب','Send request via WhatsApp')}</button><p class="form-note">${T('يفتح واتساب برسالة تتضمن تفاصيل طلبك. اضغط إرسال داخل المحادثة لإتمام الطلب.','WhatsApp opens with your details filled in. Tap Send in the chat to complete your request.')}</p><noscript><p><a href="${wLink()}">${T('افتح واتساب وأرسل التفاصيل مباشرة','Open WhatsApp and send your details directly')}</a></p></noscript></form>`
}
function servicesPage(){
return mast(T('دليل الخدمات','Service directory'),T('خدمات الحدادة والألمنيوم في الرياض','Ironwork and aluminum services in Riyadh'),T('اختر الخدمة للاطلاع على خيارات التصنيع والتركيب والمشاريع المنفّذة.','Explore fabrication options, installation details and project examples for each service.'),11)+`<section class="section paper"><div class="wrap"><h2 class="sr">${T('دليل خدمات الورشة','Workshop service directory')}</h2>${cards()}</div></section><section class="section form-bg"><div class="wrap form-layout"><div>${eyebrow(T('ابدأ مشروعك','Start your project'))}<h2>${T('طلب تنفيذ أو استشارة فنية','Request work or technical advice')}</h2><p>${T('إذا كانت لديك فكرة أو مخطط، صف لنا ما تحتاجه. نراجع التفاصيل معك عبر واتساب وننسّق موعد المعاينة في الرياض.','Tell us what you want to build, or describe a drawing you already have. We can discuss the details on WhatsApp and arrange a Riyadh site visit.')}</p></div>${requestForm(false)}</div></section>`+cta()
}
function linkedCopy(copy) {
  return html(copy).replace(/\[([^\]]+)\]\(([a-z-]+)(#[a-z-]+)?\)/g, (_, label, route, fragment='') => {
    if (!routes.includes(route)) throw new Error('Unknown content link: ' + route)
    return '<a href="' + link(route) + fragment + '">' + label + '</a>'
  })
}
function servicePage(s){
const i=services.indexOf(s),d=s[lang],similar=services.filter(k=>s.related.includes(k.slug))
const group=projects.filter(p=>p.category===s.slug)
const [question,answer]=planningNotes[s.slug][lang]
return mast(T('خدمات الورشة','Workshop services'),d.name+T(' في الرياض',' in Riyadh'),d.intro,featured[i],iconButton(T('طلب عرض سعر','Request a quote'),link('contact')+'?service='+s.slug,'quote')+iconButton(T('استفسر عبر واتساب','Ask on WhatsApp'),wLink(T('مرحباً، لدي استفسار عن '+d.name+' في الرياض.','Hello, I would like to ask about '+d.name.toLowerCase()+' in Riyadh.')),'whatsapp','ghost'),'services')+
`<section class="section paper"><div class="wrap">${sectionTitle(T('خيارات التنفيذ','Fabrication options'),T('أنواع الخدمة','Service options'))}<div class="type-grid">${d.types.map(([t,x])=>`<article><span class="type-icon">${icon(assetIcons[i],25)}</span><h3>${t}</h3><p>${x}</p></article>`).join('')}</div></div></section>
${s.slug==='ironworks'?`<section class="section white" id="prices"><div class="wrap">${sectionTitle(T('تكلفة التنفيذ','Pricing'),T('أسعار الحدادة التقديرية في الرياض','Indicative ironwork prices in Riyadh'),T('هذه أسعار بداية بالريال السعودي. يتحدد السعر النهائي بعد مراجعة المقاسات والتصميم والتشطيب.','Starting prices in Saudi riyals. Final pricing depends on dimensions, design and finish.'))}<div class="price-list">${prices.map(p=>`<div><div><h3>${p[lang][0]}</h3><p>${p[lang][1]}</p></div><strong>${T('من','From')} <bdi>${p.sar.toLocaleString('en-US')}</bdi> ${T('ر.س','SAR')}</strong></div>`).join('')}</div></div></section>`:''}
<section class="section white"><div class="wrap two-cols"><div>${eyebrow(T('الخامات والتشطيب','Materials and finish'))}<h2>${T('مواصفات وخيارات','Specifications and options')}</h2><aside class="planning-note"><h3>${html(question)}</h3><p>${linkedCopy(answer)}</p></aside></div><ul class="checks">${d.features.map(f=>`<li>${icon('check',18)}${f}</li>`).join('')}</ul></div></section>
<section class="section steps-section"><div class="wrap">${sectionTitle(T('من المعاينة إلى التركيب','From survey to installation'),T('كيف نعمل','How we work'))}<ol class="step-grid">${d.steps.map(([t,x],i)=>`<li><b>${String(i+1).padStart(2,'0')}</b><h3>${t}</h3><p>${x}</p></li>`).join('')}</ol></div></section>
<section class="section paper"><div class="wrap">${sectionTitle(T('معرض الأعمال','Project gallery'),T('نماذج من أعمالنا','Examples of our work'),'',iconButton(T('المعرض الكامل','Full gallery'),link('gallery')+'?category='+s.slug,'gallery','outline'))}<div class="projects-grid">${group.map(projectTile).join('')}</div></div></section>
<section class="section white"><div class="wrap">${sectionTitle(T('اكتشف المزيد','Explore more'),T('خدمات ذات صلة','Related services'))}${cards(similar)}</div></section>`+cta(s)+lightbox()
}
function aboutPage(){
return mast(T('من نحن','About us'),T('ورشة حدادة وألمنيوم في الرياض','A Riyadh ironwork and aluminum workshop'),T('نخدم أصحاب المنازل والمنشآت والمقاولين في مشاريع التصنيع والتركيب حسب الطلب.','We work with homeowners, businesses and contractors on custom fabrication and installation.'),10)+stats()+aboutIntro(true)+`<section class="section paper"><div class="wrap">${sectionTitle(T('مميزات المؤسسة','Our approach'),T('ما الذي يميز عملنا؟','What goes into our work'))}<div class="type-grid values">${values[lang].map(([t,p],i)=>`<article>${icon(['badge','tools','quote','phone','ruler','clock'][i],28)}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section>`+districtSection()+cta()
}
function galleryServiceLinks(){
  return '<nav class="gallery-services" aria-label="' +T('خدمات المشاريع المعروضة','Services behind the projects')+'"><h2>'+T('تفاصيل الخدمات المعروضة','Services behind these projects')+'</h2><ul>'+services.map(s=>'<li><a href="'+link(s.slug)+'">'+html(s[lang].name)+'</a></li>').join('')+'</ul></nav>'
}
function galleryPage(){
return mast(T('نماذج من المشاريع','Selected projects'),T('معرض أعمال الحدادة والألمنيوم','Ironwork and aluminum gallery'),T('تصفّح صور الأبواب والنوافذ والواجهات والمظلات، واختر فئة لعرض المشاريع المرتبطة بها.','Browse doors, windows, facades and canopies. Choose a category to see matching projects across Riyadh.'),39)+
`<section class="section paper"><div class="wrap gallery-wrap"><div class="filters" role="group" aria-label="${T('تصفية حسب الخدمة','Filter by service')}">${[['all',T('الكل','All projects')],...services.map(s=>[s.slug,s[lang].name])].map(([v,n],i)=>`<button data-filter="${v}" aria-pressed="${i===0}">${n}</button>`).join('')}</div><p class="result-count" role="status" aria-live="polite"></p><div class="projects-grid full-gallery">${projects.map(projectTile).join('')}</div><button class="btn outline load-more" hidden>${icon('plus',17)}${T('عرض المزيد','Load more')}</button>${galleryServiceLinks()}</div></section>`+cta()+lightbox()
}
function workshopMap() {
  const heading = T('موقع الورشة في الرياض', 'Workshop location in Riyadh')
  const mapsLabel = T('افتح موقع الورشة في خرائط Google', 'Open the workshop in Google Maps')
  return `<section class="workshop-map" aria-labelledby="workshop-location">
  <h2 id="workshop-location" class="sr">${heading}</h2>
  <iframe src="${html(workshopLocation.embed(lang))}" title="${heading}" width="1200" height="480" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  <a class="map-card" href="${workshopLocation.url}" target="_blank" rel="noopener noreferrer" aria-label="${mapsLabel}" title="${mapsLabel}">
    <span class="map-pin">${icon('pin',24)}</span>
    <span class="map-label"><strong>${brand[lang]}</strong><small>${workshopLocation.district[lang]}</small></span>
  </a>
</section>`
}
function contactPage(){
return `<section class="contact-top"><div class="wrap">${crumbs(name('contact'))}${eyebrow(T('تواصل مع الورشة','Get in touch'))}<h1>${T('اطلب عرض سعر لمشروعك','Get a quote for your project')}</h1><p>${linkedCopy(T('حدّد الخدمة وموقع المشروع لنراجع طلبك عبر واتساب. إذا كنت تقارن بين الخامات أو طرق الفتح، تصفّح [دليل خدمات الورشة](services) أولاً.','Choose a service and share the project location for a WhatsApp quote. If you’re comparing materials or opening styles, start with the [workshop service guide](services).'))}</p></div></section>
${workshopMap()}
<section class="section paper contact-section"><div class="wrap form-layout"><div class="contact-info"><h2>${T('تواصل مباشر','Contact the workshop')}</h2><p>${legalName[lang]}</p><div class="contact-line">${icon('phone')}<div><span>${T('هاتف الورشة','Workshop phone')}</span><a href="tel:+${phone}" dir="ltr">053 200 6716</a></div></div><div class="contact-line">${icon('whatsapp')}<div><span>${T('واتساب','WhatsApp')}</span><a href="${wLink()}" dir="ltr">057 580 7288</a></div></div><div class="contact-line">${icon('pin')}<div><span>${T('منطقة الخدمة','Service area')}</span><strong>${T('جميع أحياء الرياض، السعودية','All districts of Riyadh, Saudi Arabia')}</strong></div></div><div class="contact-line">${icon('clock')}<div><span>${T('أوقات العمل','Opening hours')}</span><strong>${T('السبت إلى الخميس · ٧ صباحاً – ١١ مساءً','Saturday to Thursday · 7 AM – 11 PM')}</strong></div></div></div>${requestForm(true)}</div></section>`
}
function pagePhoto(route, language) {
  const serviceIndex = services.findIndex(s => s.slug === route)
  const index = serviceIndex >= 0 ? featured[serviceIndex] : {about:10, services:11, gallery:39}[route]
  const project = projects[index]
  if (project) return {
    source: project.image, share: '/assets/share/' + project.id + '.jpg',
    alt: project[language].join(' · '), onPage: true,
  }
  return {
    source: '/assets/hero.webp', share: '/assets/share/riyadh-workshop.jpg',
    alt: language === 'ar' ? 'لحام قطعة حديد في الورشة' : 'A welder joining a steel section in a workshop',
    onPage: route === 'home',
  }
}
function sitemapImages(route) {
  if (route === 'gallery') return projects.map(p => p.image)
  if (route === 'contact') return []
  const onPage = [pagePhoto(route, 'ar').source]
  if (route === 'home' || route === 'services') return onPage.concat(featured.map(i => projects[i].image))
  return onPage.concat(projects.filter(p => p.category === route).map(p => p.image))
}
function render(){
const s=services.find(x=>x.slug===page)
const head=pageHead({page,lang,service:s,origin,pathFor:absolute,name,asset,photo:pagePhoto(page,lang),phone,waPhone})
const content=s?servicePage(s):page==='home'?homeHero()+serviceSection()+aboutIntro()+homeGallery()+testimonials()+districtSection()+cta()+lightbox():page==='services'?servicesPage():page==='gallery'?galleryPage():page==='about'?aboutPage():contactPage()
return `<!doctype html><html lang="${lang}" dir="${T('rtl','ltr')}"><head>${head}</head><body data-page="${page}">${header()}<main id="main">${content}</main>${footer()}</body></html>`
}
for(lang of ['ar','en'])for(page of routes){
const out=resolve(dist,localPath(page))
mkdirSync(dirname(out),{recursive:true})
writeFileSync(out,render())
}
writeFileSync(resolve(dist,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n')
writeFileSync(resolve(dist,'sitemap.xml'),sitemap({routes,pathFor:absolute,imagesFor:sitemapImages,origin}))
console.log(`Built ${routes.length*2} localized pages and sitemap`)
