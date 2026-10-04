// Read-only collection view for this site's authored journal documents.
const host = document.querySelector('[data-journal]');
const status = document.querySelector('[data-status]');
const container = new URL('./entries/', document.baseURI);
const listing = new URL(host.dataset.listing || container.href, document.baseURI);
const LDP = 'http://www.w3.org/ns/ldp#contains';

async function read(url, accept) {
  const response = await fetch(url, { headers: { Accept: accept }, credentials: 'same-origin' });
  if (!response.ok) throw new Error(`${response.status} reading ${url.pathname}`);
  return response;
}

function entryURLs(data) {
  const nodes = Array.isArray(data) ? data : (data['@graph'] || [data]);
  const node = nodes.find(n => n.contains || n['ldp:contains'] || n[LDP]);
  const members = node && (node.contains || node['ldp:contains'] || node[LDP]);
  if (!Array.isArray(members)) throw new Error('Expected a JSS JSON-LD container listing.');
  return [...new Set(members.map(item => {
    const id = typeof item === 'string' ? item : item['@id'];
    if (!id) return null;
    const url = new URL(id, container);
    if (url.origin !== container.origin || url.search || url.hash) return null;
    const name = url.pathname.slice(container.pathname.length);
    return url.pathname.startsWith(container.pathname) && /^\d{4}-\d{2}-\d{2}\.html$/.test(name) ? url.href : null;
  }).filter(Boolean))].sort().reverse();
}

function prepareArticle(doc, url) {
  const article = doc.querySelector('article[data-journal-day]');
  if (!article) throw new Error(`No journal entry in ${url.pathname}`);
  const day = article.dataset.journalDay;
  if (url.pathname.split('/').pop() !== `${day}.html`) throw new Error(`Date mismatch in ${url.pathname}`);
  // Only import the article, never a day page's navigation, styles or scripts.
  article.querySelectorAll('script, style, link, base, object, embed, form').forEach(n => n.remove());
  for (const el of [article, ...article.querySelectorAll('*')]) {
    for (const attr of [...el.attributes]) {
      if (/^on/i.test(attr.name) || attr.name === 'srcdoc') el.removeAttribute(attr.name);
    }
  }
  const ids = new Map();
  for (const el of article.querySelectorAll('[id]')) {
    const old = el.id;
    el.id = `day-${day}-${old}`;
    ids.set(old, el.id);
  }
  article.id = `day-${day}`;
  article.setAttribute('about', url.href);
  for (const el of article.querySelectorAll('[href], [src], [poster]')) {
    for (const attr of ['href', 'src', 'poster']) {
      if (!el.hasAttribute(attr)) continue;
      const raw = el.getAttribute(attr);
      if (attr === 'href' && raw.startsWith('#') && ids.has(raw.slice(1))) {
        el.setAttribute(attr, `#${ids.get(raw.slice(1))}`);
        continue;
      }
      const resolved = new URL(raw, url);
      const allowed = attr === 'href' ? ['http:', 'https:', 'mailto:', 'tel:'] : ['http:', 'https:'];
      if (allowed.includes(resolved.protocol)) el.setAttribute(attr, resolved.href);
      else el.removeAttribute(attr);
    }
    if (el.getAttribute('target') === '_blank') el.setAttribute('rel', 'noopener noreferrer');
  }
  const time = article.querySelector('header time');
  if (time) {
    const link = doc.createElement('a');
    link.className = 'day-link';
    link.href = url.href;
    time.replaceWith(link);
    link.append(time);
  }
  return document.importNode(article, true);
}

async function main() {
  try {
    const data = await (await read(listing, 'application/ld+json')).json();
    const urls = entryURLs(data);
    if (!urls.length) { status.textContent = 'No journal days found.'; return; }
    const results = await Promise.allSettled(urls.map(async href => {
      const url = new URL(href);
      const html = await (await read(url, 'text/html')).text();
      return prepareArticle(new DOMParser().parseFromString(html, 'text/html'), url);
    }));
    let shown = 0;
    const errors = [];
    for (const result of results) {
      if (result.status === 'rejected') { errors.push(result.reason.message); continue; }
      if (shown++) host.append(document.createElement('hr'));
      host.append(result.value);
    }
    status.hidden = !errors.length;
    if (errors.length) status.textContent = `${shown} of ${urls.length} days loaded. ${errors.join('; ')}`;
  } catch (error) {
    status.textContent = `Could not load the journal: ${error.message}`;
  }
}
main();
