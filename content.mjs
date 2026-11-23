export const brand = {ar:'الحدادة للألمنيوم', en:'Al-Haddadah'}
export const legalName = {ar:'مؤسسة محمد بن عبيد بن ثواب المطيري للحدادة والألمنيوم',en:'Mohammed bin Obaid bin Thawab Al-Mutairi Establishment for Ironwork and Aluminum'}
export const socialProfiles = [
  {icon: 'facebook', ar: 'فيسبوك', en: 'Facebook', url: 'https://www.facebook.com/people/Al-Haddadah-Aluminum-Iron/61589456815766/'},
  {icon: 'instagram', ar: 'إنستغرام', en: 'Instagram', url: 'https://www.instagram.com/alhaddadahaluminumiron/'},
  {icon: 'youtube', ar: 'يوتيوب', en: 'YouTube', url: 'https://www.youtube.com/@Al-HaddadahAluminumIron'},
]
export const workshopLocation = {
  url: 'https://maps.app.goo.gl/uznGUWqqEym19546A',
  latitude: 24.829123,
  longitude: 46.7958548,
  district: {ar: 'حي الرمال، الرياض', en: 'Al-Rimal, Riyadh'},
  embed(lang) {
    const place = '0x3e2eff1e09aebe43%3A0x9c2c7a7cf2610f3f'
    const listing = encodeURIComponent('للحدادة والالمنيوم')
    return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14499.957744133878!2d${this.longitude}!3d${this.latitude}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${place}!2s${listing}!5e0!3m2!1s${lang}!2ssa!4v1700000000000!5m2!1s${lang}!2ssa`
  },
}
export const districts = {
  ar:['الملقا','النرجس','الياسمين','العليا','الرمال','الصحافة','المروج','قرطبة','النخيل','الربوة','السليمانية','الورود'],
  en:['Al-Malqa','Al-Narjis','Al-Yasmin','Al-Olaya','Al-Rimal','Al-Sahafa','Al-Muruj','Qurtubah','Al-Nakheel','Al-Rabwah','Al-Sulaimaniyah','Al-Wurud']
}
export const summaries = {
  ar:['قطاعات وقواطع وتكسيات تُصنّع حسب مقاسات الموقع.','تفصيل ولحام الحديد للبوابات والأسوار والهياكل المعدنية.','أبواب سحّاب ومفصلية وقابلة للطي للمداخل والغرف.','نوافذ حسب المقاس مع خيارات الزجاج المزدوج والعزل.','أنظمة كرتن وول وزجاج عنكبوتي للمباني والمحلات.','مظلات ألمنيوم للسيارات والحدائق ومداخل المباني.','بوابات آلية ويدوية وأسوار حماية للفلل والمزارع.','درابزين للسلالم والشرفات وشبابيك حماية حسب الطلب.'],
  en:['Custom aluminum sections, office partitions and cladding made to site dimensions.','Custom iron fabrication and welding for gates, fences and steel structures.','Sliding, hinged and folding aluminum doors for entrances and interiors.','Made-to-measure windows with double glazing and insulation options.','Curtain wall and spider glazing systems for shops, offices and homes.','Aluminum shade structures for parking bays, gardens and entrances.','Automatic or manual gates and perimeter fencing for villas and farms.','Stair and balcony railings with made-to-measure protective window grilles.']
}
export const values = {
 ar:[['الخامات','نختار القطاع والزجاج أو الحديد وفق استخدام القطعة ومكان تركيبها.'],['الخبرة','يعمل فريق التصنيع والتركيب من المقاس الأول حتى التسليم.'],['وضوح السعر','نراجع المواد والمقاسات والتشطيب معك في عرض السعر.'],['ما بعد التركيب','يمكنك التواصل معنا بشأن الضمان والصيانة الدورية.'],['التفصيل','نكيّف التصميم مع مدخل الفيلا أو مساحة المكتب أو واجهة المحل.'],['المواعيد','ننسّق موعد المعاينة والتركيب وفق مراحل المشروع.']],
 en:[['Material selection','We match the profile, glass or steel to the location and its use.'],['Workshop experience','Our fabricators and installers follow each job from measurement to handover.'],['Clear pricing','We review dimensions, materials and finishes with you in the quotation.'],['Aftercare','Contact the workshop for warranty support or scheduled maintenance.'],['Made to measure','Each design fits the entrance, office layout or shopfront it serves.'],['Scheduling','We agree survey and installation dates around the stages of your project.']]
}
export const reviews = {
 ar:[
 ['تعاملت مع المؤسسة في تركيب نوافذ ألمنيوم لفيلتي، وكانت الجودة ممتازة والتركيب احترافي. أنصح الجميع بالتعامل معهم.','أحمد محمد العتيبي','صاحب فيلا · حي الملقا','نوافذ ألمنيوم'],
 ['تعاملنا معهم في عدة مشاريع تجارية، دائماً ما يلتزمون بالمواعيد والجودة. أسعارهم منافسة جداً.','فهد عبدالله الدوسري','مقاول · شمال الرياض','واجهات زجاجية'],
 ['قاموا بتنفيذ بوابة حديدية أوتوماتيكية لعمارتي، العمل كان متقن والضمان شامل. شكراً لفريق العمل.','سعود خالد القحطاني','صاحب عمارة · حي النرجس','بوابة حديدية'],
 ['تم تركيب واجهة زجاجية كاملة للمطعم، النتيجة مبهرة وأضافت لمسة عصرية رائعة. عمل احترافي بكل المقاييس.','محمد ناصر الشمري','صاحب مطعم · حي العليا','واجهة زجاجية']
 ],
 en:[
 ['I worked with the establishment to install aluminum windows for my villa. The quality was excellent and the installation was professional. I recommend them to everyone.','Ahmed Mohammed Al-Otaibi','Villa owner · Al-Malqa','Aluminum windows'],
 ['We worked with them on several commercial projects. They consistently deliver on time and maintain quality. Their prices are very competitive.','Fahad Abdullah Al-Dosari','Contractor · North Riyadh','Glass facades'],
 ['They installed an automatic iron gate for my building. The work was meticulous and the warranty is comprehensive. Thanks to the team.','Saud Khalid Al-Qahtani','Building owner · Al-Narjis','Iron gate'],
 ['They installed a complete glass facade for the restaurant. The result is impressive and gave it a wonderful modern touch. Professional work in every respect.','Mohammed Nasser Al-Shammari','Restaurant owner · Al-Olaya','Glass facade']
 ]}
