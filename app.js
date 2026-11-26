const categories = [
  ['tacos-individuais', 'Tacos Individuais'],
  ['burritos-individuais', 'Burritos Individuais'],
  ['gran-burritos', 'Gran Burritos'],
  ['combinados', 'Combinados'],
  ['pratos-especiais', 'Pratos Especiais'],
  ['pasteis', 'Pastéis'],
  ['monte-sua-salada', 'Monte sua Salada'],
  ['escondidinho-da-frida', 'Escondidinho da Frida'],
  ['caldos', 'Caldos'],
  ['bebidas', 'Bebidas'],
  ['sobremesas', 'Sobremesas'],
];

const byId = (id) => document.getElementById(id);
const categoryNav = byId('categories');
for (const [slug, label] of categories) {
  const link = document.createElement('a');
  link.href = '#' + slug;
  link.className = 'category';
  link.textContent = label;
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '›';
  link.append(arrow);
  categoryNav.append(link);
}

const alphabet = new Intl.Collator('pt-BR');
const products = byId('products');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const categoryPhotos = {
  'tacos-individuais': ['tacos', 'Tacos crocantes servidos no prato'],
  'burritos-individuais': ['burrito', 'Burrito individual com recheio à mostra'],
  'gran-burritos': ['gran-burrito', 'Gran burrito gratinado com queijo'],
  combinados: ['combinados', 'Bandeja com tacos, porções e molhos'],
  'monte-sua-salada': ['salada', 'Salada com legumes, folhas e carnes'],
  'escondidinho-da-frida': ['escondidinho', 'Escondidinho gratinado'],
  caldos: ['caldos', 'Caldo servido com torradas'],
};

function renderProducts(groups, slug) {
  products.replaceChildren();
  for (const [index, { title, note, alphabetical, items, photo: groupPhoto, builder }] of groups.entries()) {
    const group = document.createElement('section');
    group.className = 'menu-group';
    if (title) {
      const heading = document.createElement('h2');
      heading.textContent = title;
      group.append(heading);
    }
    const photo = groupPhoto ?? (index === 0 ? categoryPhotos[slug] : undefined);
    if (photo) {
      const [name, alt] = photo;
      const image = document.createElement('img');
      image.className = 'category-photo';
      image.src = `./fotos/${name}.webp`;
      image.alt = alt;
      image.decoding = 'async';
      group.append(image);
    }
    if (note) {
      const paragraph = document.createElement('p');
      paragraph.textContent = note;
      if (slug === 'combinados') paragraph.className = 'combo-note';
      group.append(paragraph);
    }
    if (builder) {
      group.append(renderBuilder(builder));
      products.append(group);
      continue;
    }
    const grid = document.createElement('div');
    grid.className = 'products';
    const ordered = alphabetical ? [...items].sort(([a], [b]) => alphabet.compare(a, b)) : items;
    for (const [name, ingredients, priceInCents] of ordered) {
      const article = document.createElement('article');
      const choose = document.createElement('button');
      choose.type = 'button';
      choose.className = 'choose-product';
      choose.textContent = 'Selecionar';
      choose.setAttribute('aria-label', 'Selecionar ' + name);
      choose.setAttribute('aria-expanded', 'false');
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'action';
      add.textContent = 'Adicionar ao pedido';
      add.hidden = true;
      choose.addEventListener('click', () => {
        add.hidden = !add.hidden;
        choose.setAttribute('aria-expanded', String(!add.hidden));
      });
      add.addEventListener('click', () => {
        addToCart({ name, category: title ? categories.find(([id]) => id === slug)[1] + ' / ' + title :
          categories.find(([id]) => id === slug)[1], price: priceInCents, details: [] });
        add.textContent = 'Adicionar mais um';
      });
      const heading = document.createElement(title ? 'h3' : 'h2');
      heading.textContent = name;
      const header = document.createElement('div');
      header.className = 'product-heading';
      const price = document.createElement('span');
      price.className = 'product-price';
      price.textContent = currency.format(priceInCents / 100);
      header.append(heading, price);
      article.append(header);
      if (ingredients) {
        const description = document.createElement('p');
        description.textContent = ingredients;
        article.append(description);
      }
      article.append(choose, add);
      grid.append(article);
    }
    group.append(grid);
    products.append(group);
  }
}

function renderCategory() {
  const slug = location.hash.slice(1);
  const category = categories.find(([id]) => id === slug);
  document.body.classList.toggle('home-view', !category);
  byId('home').hidden = Boolean(category);
  byId('detail').hidden = !category;
  if (category) {
    byId('section-title').textContent = category[1];
    renderProducts(menu[slug], slug);
    byId('section-title').focus({ preventScroll: true });
  }
  window.scrollTo(0, 0);
}
initCart();
window.addEventListener('hashchange', renderCategory);
renderCategory();


let installPrompt;
const installButton = byId('install');
const standalone = window.matchMedia('(display-mode: standalone)');
installButton.hidden = standalone.matches || navigator.standalone === true;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
});
window.addEventListener('appinstalled', () => {
  installPrompt = undefined;
  installButton.hidden = true;
});
installButton.addEventListener('click', async () => {
  if (installPrompt) {
    const prompt = installPrompt;
    installPrompt = undefined;
    try {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') installButton.hidden = true;
      return;
    } catch {
      // Show the browser's manual installation steps.
    }
  }
  const appleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  byId('install-help').textContent = appleMobile
    ? 'Abra este cardápio no Safari, toque em Compartilhar e selecione “Adicionar à Tela de Início”.'
    : 'No menu do navegador, procure “Instalar app” ou “Adicionar à tela inicial”.';
  byId('install-dialog').showModal();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(console.error);
}

const splash = byId('splash-screen');
if (splash) {
  const hideSplash = () => {
    splash.classList.add('fade-out');
    setTimeout(() => { if (splash.parentNode) splash.remove(); }, 450);
  };
  if (document.readyState === 'complete') {
    setTimeout(hideSplash, 650);
  } else {
    window.addEventListener('load', () => setTimeout(hideSplash, 650));
    setTimeout(hideSplash, 1200);
  }
}
