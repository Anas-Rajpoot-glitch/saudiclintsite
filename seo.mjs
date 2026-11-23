import {brand, legalName, socialProfiles, workshopLocation} from './content.mjs'
import {services} from './services.mjs'
import {projects} from './gallery.mjs'
import {searchCopy} from './search-content.mjs'

export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]))

export function pageHead({page, lang, service, origin, pathFor, name, asset, photo, phone, waPhone}) {
  const [heading, description] = searchCopy[page][lang]
  const title = `${heading} | ${brand[lang]}`
  const url = pathFor(page, lang)
  const locale = lang === 'ar' ? 'ar-SA' : 'en'
  const otherLocales = {ar: 'ar_SA', en: 'en_US'}
  const area = {'@type': 'City', name: lang === 'ar' ? 'الرياض' : 'Riyadh'}
  const businessId = origin + '/#workshop'
  const siteId = origin + '/#website'
  const ref = id => ({'@id': id})
  const business = {
    '@type': 'LocalBusiness', '@id': businessId, name: brand[lang], legalName: legalName[lang],
    url: origin + '/', logo: origin + '/assets/anvil-gearworks-emblem.png', image: origin + '/assets/hero.webp',
    sameAs: socialProfiles.map(profile => profile.url),
    telephone: '+' + phone, areaServed: area,
    address: {'@type': 'PostalAddress', addressLocality: area.name, addressCountry: 'SA'},
    openingHoursSpecification: [{'@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'], opens: '07:00', closes: '23:00'}],
    contactPoint: {'@type': 'ContactPoint', contactType: 'customer service', telephone: '+' + waPhone, url: 'https://wa.me/' + waPhone, availableLanguage: ['Arabic','English']},
  }
  if (page === 'contact') {
    business.hasMap = workshopLocation.url
    business.geo = {'@type':'GeoCoordinates', latitude:workshopLocation.latitude, longitude:workshopLocation.longitude}
  }
  const website = {
    '@type': 'WebSite', '@id': siteId, url: origin + '/', name: brand.ar, alternateName: brand.en,
    inLanguage: ['ar-SA', 'en'], publisher: ref(businessId),
  }
  const pageTypes = {about: 'AboutPage', contact: 'ContactPage', gallery: 'ImageGallery', services: 'CollectionPage'}
  const webpage = {
    '@type': pageTypes[page] || 'WebPage', '@id': url + '#page', url, name: title, description,
    inLanguage: locale, isPartOf: ref(siteId), about: ref(businessId),
  }
  const graph = [website, business, webpage]
  if (photo.onPage) {
    webpage.primaryImageOfPage = ref(url + '#primary-image')
    graph.push({'@type': 'ImageObject', '@id': url + '#primary-image', contentUrl: origin + photo.source, caption: photo.alt})
  }
  if (page !== 'home') {
    const trail = service ? ['home','services',page] : ['home',page]
    webpage.breadcrumb = ref(url + '#breadcrumbs')
    graph.push({
      '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs',
      itemListElement: trail.map((p, i) => ({'@type': 'ListItem', position: i + 1, name: name(p), item: pathFor(p, lang)})),
    })
  }
  if (service) {
    webpage.mainEntity = ref(url + '#service')
    graph.push({
      '@type': 'Service', '@id': url + '#service', name: service[lang].name, serviceType: service[lang].name,
      url, description: service[lang].intro, provider: ref(businessId), areaServed: area,
      image: origin + photo.source, mainEntityOfPage: ref(webpage['@id']),
    })
  } else if (page === 'services') {
    webpage.mainEntity = ref(url + '#service-directory')
    graph.push({
      '@type': 'ItemList', '@id': url + '#service-directory', name: heading, numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem', position: i + 1, name: s[lang].name, url: pathFor(s.slug, lang),
        item: {'@type':'Service', '@id':pathFor(s.slug, lang) + '#service', name:s[lang].name, provider:ref(businessId)},
      })),
    })
  } else if (page === 'gallery') {
    webpage.image = projects.map(p => ({'@type':'ImageObject', contentUrl: origin + p.image, caption: p[lang].join(' · ')}))
  } else {
    webpage.mainEntity = ref(businessId)
  }
  const social = {
    'og:type': 'website', 'og:site_name': brand[lang], 'og:url': url, 'og:title': title, 'og:description': description,
    'og:locale': otherLocales[lang], 'og:locale:alternate': otherLocales[lang === 'en' ? 'ar' : 'en'],
    'og:image': origin + photo.share, 'og:image:type': 'image/jpeg', 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': photo.alt,
  }
  const named = {
    description, robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'theme-color': '#171c1d',
    'twitter:card': 'summary_large_image', 'twitter:title': title, 'twitter:description': description,
    'twitter:image': origin + photo.share, 'twitter:image:alt': photo.alt,
  }
  const meta = (attribute, values) => Object.entries(values).map(([key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`).join('\n')
  const alternates = [['ar-SA','ar'],['en','en'],['x-default','ar']].map(([code, l]) => `<link rel="alternate" hreflang="${code}" href="${escapeHtml(pathFor(page, l))}">`)
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
${meta('name', named)}
<link rel="canonical" href="${escapeHtml(url)}">
${alternates.join('\n')}
${meta('property', social)}
<link rel="icon" href="${asset('favicon.ico')}" sizes="16x16 24x24 32x32 48x48 64x64" type="image/x-icon">
<link rel="icon" href="${asset('assets/anvil-gearworks-icon.png')}" sizes="96x96" type="image/png">
<link rel="apple-touch-icon" href="${asset('assets/anvil-gearworks-touch.png')}" sizes="180x180">
<link rel="stylesheet" href="${asset('assets/site.css')}">
<script defer src="${asset('assets/site.js')}"></script>
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>`
}

export function sitemap({routes, pathFor, imagesFor, origin}) {
  const entries = []
  for (const lang of ['ar','en']) {
    for (const route of routes) {
      const url = escapeHtml(pathFor(route, lang))
      const alternates = [['ar-SA','ar'],['en','en'],['x-default','ar']].map(([code, l]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeHtml(pathFor(route, l))}"/>`)
      const images = [...new Set(imagesFor(route))].map(image => `    <image:image><image:loc>${escapeHtml(origin + image)}</image:loc></image:image>`)
      entries.push(`  <url>\n    <loc>${url}</loc>\n${[...alternates,...images].join('\n')}\n  </url>`)
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>\n`
}
