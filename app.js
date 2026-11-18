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

const tacos = [
  ['Chili com Carne (Picante)', 'Chili com carne, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Taco Clássico de Carne', 'Carne moída, bacon, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Taco Clássico de Frango', 'Frango grelhado, bacon, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Taco de Filé', 'Contra filé grelhado em tiras, calabresa, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Brócolis com Bacon', 'Brócolis, bacon, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Taco de Frango com Milho', 'Catupiry, frango desfiado, milho, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Taco de Pernil', 'Catupiry, pernil desfiado, azeitonas verdes, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Taco de Queijo', 'Catupiry, cheddar, mussarela, bacon, milho, palmito, barbecue, alface, tomate e cebola crispy.'],
  ['Taco X-Tudo', 'Frango grelhado em tiras, carne moída, bacon, calabresa, mussarela, barbecue, alface, tomate e cebola crispy.'],
  ['Moda Chef', 'Frango chili, bacon, calabresa, catupiry, cheddar, mussarela, pimenta defumada, barbecue, alface, tomate e cebola crispy.'],
];

menu['tacos-individuais'] = [{ alphabetical: true, items: tacos }];

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

const categoryPhotos = {
  'tacos-individuais': ['tacos', 'Tacos crocantes servidos no prato'],
  'burritos-individuais': ['burrito', 'Burrito individual com recheio à mostra'],
  combinados: ['combinados', 'Bandeja com tacos, porções e molhos'],
  pasteis: [
    ['pastel-doce', 'Pastel doce com sorvete e calda de chocolate'],
    ['pastel-salgado', 'Pastel salgado aberto com recheio à mostra'],
  ],
  'monte-sua-salada': ['salada', 'Salada com legumes, folhas e carnes'],
  'escondidinho-da-frida': ['escondidinho', 'Escondidinho gratinado'],
  caldos: ['caldos', 'Caldo servido com torradas'],
  sobremesas: ['sobremesas', 'Gran Gateau com frutas, sorvete e calda de chocolate'],
};

function renderProducts(groups, slug) {
  products.replaceChildren();
  for (const [index, { title, note, alphabetical, items }] of groups.entries()) {
    const group = document.createElement('section');
    group.className = 'menu-group';
    if (title) {
      const heading = document.createElement('h2');
      heading.textContent = title;
      group.append(heading);
    }
    const photo = slug === 'pasteis' ? categoryPhotos.pasteis[index] :
      index === 0 ? categoryPhotos[slug] : undefined;
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
      group.append(paragraph);
    }
    const grid = document.createElement('div');
    grid.className = 'products';
    const ordered = alphabetical ? [...items].sort(([a], [b]) => alphabet.compare(a, b)) : items;
    for (const [name, ingredients] of ordered) {
      const article = document.createElement('article');
      const heading = document.createElement(title ? 'h3' : 'h2');
      heading.textContent = name;
      article.append(heading);
      if (ingredients) {
        const description = document.createElement('p');
        description.textContent = ingredients;
        article.append(description);
      }
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
