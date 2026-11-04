function renderRichText(parent, text) {
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    parent.append(text.slice(last, m.index));
    const url = m[2];
    if (/^(https?:|mailto:|\.{0,2}\/|#)/i.test(url)) {
      const a = document.createElement('a');
      a.href = url;
      a.textContent = m[1];
      if (/^https?:/i.test(url)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      parent.appendChild(a);
    } else {
      parent.append(m[0]);
    }
    last = re.lastIndex;
  }
  parent.append(text.slice(last));
}

function createCard(data) {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h3');
  title.textContent = data.title;

  const labelBox = document.createElement('div');
  labelBox.className = 'label-container';
  (data.labels || []).forEach(text => {
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = text;
    labelBox.appendChild(label);
  });

  const desc = document.createElement('p');
  desc.className = 'desc';
  renderRichText(desc, data.desc || '');

  const info = document.createElement('div');
  info.className = 'info';

  (data.refs || []).forEach(r => {
    const ref = document.createElement('p');
    ref.className = 'ref';
    ref.append(r.label + ': ');
    if (r.url) {
      const a = document.createElement('a');
      a.href = r.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = r.text || r.url;
      ref.appendChild(a);
    } else {
      ref.append(r.text || '');
    }
    info.appendChild(ref);
  });

  const date = document.createElement('span');
  date.className = 'date';
  date.textContent = data.date;
  info.appendChild(date);

  card.append(title, labelBox, desc, info);
  return card;
}

async function loadCards() {
  try {
    const res = await fetch('../json/cards.json');
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    document.querySelectorAll('[data-section]').forEach(container => {
      const items = data[container.dataset.section] || [];
      container.append(...items.map(createCard));
    });
  } catch (err) {
    console.error('Could not load cards:', err);
  }
}

loadCards();