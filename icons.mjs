const paths = {
  facebook: '<path fill="currentColor" stroke="none" d="M14.2 22v-9h3l.46-3.5H14.2V7.3c0-1 .28-1.7 1.74-1.7h1.86V2.47c-.32-.04-1.43-.14-2.73-.14-2.7 0-4.55 1.64-4.55 4.67v2.5H7.46V13h3.06v9z"/>',
  instagram: '<rect x="2.9" y="2.9" width="18.2" height="18.2" rx="5.2" stroke-width="2"/><circle cx="12" cy="12" r="4.4" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.17" fill="currentColor" stroke="none"/>',
  youtube: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M22.5 6.8a3 3 0 0 0-2.1-2.1C18.5 4.2 12 4.2 12 4.2s-6.5 0-8.4.5a3 3 0 0 0-2.1 2.1A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.2 3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.2ZM9.9 15.6V8.4l6.3 3.6z"/>',
  phone: '<path d="m7 3 2.5 4.7-2 2a15 15 0 0 0 6.8 6.8l2-2L21 17v2.3c0 1-1 1.8-2 1.7C10.5 20.2 3.8 13.5 3 5c-.1-1 .7-2 1.7-2z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  quote: '<path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  medal: '<circle cx="12" cy="8" r="5"/><path d="m8 12-2 8 4-2 2 3 2-3 4 2-2-8"/>',
  structure: '<path d="M3 21h18M5 20V5h9v15m0-11h5v11M8 8h3m-3 4h3m-3 4h3"/>',
  people: '<circle cx="10" cy="8" r="3"/><path d="M3 21v-2a7 7 0 0 1 14 0v2M16 5a3 3 0 0 1 0 6m3 3a5 5 0 0 1 2 5v2"/>',
  tools: '<path d="m14 6 4 4m-8 2-7 7 2 2 7-7M14 3l-3 5 5 5 5-3-3-1-3-3zM4 3l4 2 1 3-2 1-3-2zM15 15l5 5"/>',
  gallery: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="m4 18 5-5 3 3 4-5 5 6"/>',
  badge: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  ruler: '<path d="m3 16 13-13 5 5L8 21zM13 6l2 2m-5 1 2 2m-5 1 2 2"/>',
  frame: '<path d="M3 3h18v18H3zM3 14h18M12 3v18"/>',
  iron: '<path d="M3 20V7m6 13V5m6 15V5m6 15V7M3 10c5 0 5-4 9-4s5 4 9 4M3 17h18"/>',
  door: '<path d="M4 21V3h15v18M4 4l11 2v15L4 19M11 12v2M2 21h20"/>',
  window: '<rect x="3" y="3" width="18" height="17" rx="1"/><path d="M12 3v17M3 10h18M2 21h20"/>',
  facade: '<path d="M3 21h18M5 21V5l13-3v19M9 6v14m5-15v15M5 11l13-2M5 16l13-1"/>',
  canopy: '<path d="M2 11 12 4l10 7M4 11h16M5 11v10m14-10v10M8 9l4-5 4 5"/>',
  gates: '<path d="M2 21V5m20 16V5M4 20V9l7-3v14zm9 0V6l7 3v11z"/>',
  rails: '<path d="m2 14 20-9M2 19l20-9m-17 8v-5m5 3v-5m5 3V9m5 3V7"/>',
  check: '<path d="m4 12 5 5L20 6"/>', plus: '<path d="M12 4v16M4 12h16"/>',
  prev: '<path d="m15 5-7 7 7 7"/>', next: '<path d="m9 5 7 7-7 7"/>',
  whatsapp: '<path d="M20.9 11.5a9 9 0 0 1-13.4 7.9L3 20.7l1.3-4.4a9 9 0 1 1 16.6-4.8Z"/><path d="M8 7.3c.5-.5 1 .2 1.2.8l.7 1.4c.2.4-.5 1-.8 1.3.7 1.6 2.2 3 3.9 3.5.4-.5 1-1.5 1.4-1.3l1.8.9c.5.2.8.4.6 1-.4 1.4-1.6 1.9-2.9 1.6-3.5-.8-7-4-7.4-7.1 0-.7.5-1.7 1.5-2.1Z" fill="currentColor" stroke="none"/>'
}
export function icon(name, size=22) {
  return '<svg aria-hidden="true" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+paths[name]+'</svg>'
}
