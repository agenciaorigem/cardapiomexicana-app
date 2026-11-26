const cartKey = 'mexicana-pedido-v1';
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem(cartKey));
  if (Array.isArray(saved)) cart = saved.filter((item) => item &&
    typeof item.name === 'string' && typeof item.category === 'string' &&
    Number.isSafeInteger(item.price) && item.price >= 0 &&
    Array.isArray(item.details) && item.details.every((line) => typeof line === 'string'));
} catch {
  // The current order still works when storage is unavailable.
}

function addToCart(item) {
  cart.push(item);
  updateCart();
  byId('cart-feedback').textContent = item.name + ' adicionado ao pedido. ' + cart.length + ' itens.';
}

function orderLink(items, money) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const lines = items.flatMap((item, index) => [
    (index + 1) + '. ' + item.name + ' (' + item.category + ') — ' + money(item.price),
    ...item.details,
  ]);
  return 'https://wa.me/553535311155?text=' + encodeURIComponent(
    ['Olá! Gostaria de fazer este pedido:', '', ...lines, '', 'Total: ' + money(total)].join('\n')
  );
}

function updateCart() {
  const money = (cents) => currency.format(cents / 100);
  const list = byId('cart-items');
  const checkout = byId('checkout');
  try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch {}
  byId('cart-bar').hidden = cart.length === 0;
  byId('view-order').textContent = 'Ver pedido (' + cart.length + ')';
  list.replaceChildren();
  for (const [index, item] of cart.entries()) {
    const row = document.createElement('article');
    row.className = 'cart-row';
    const title = document.createElement('strong');
    title.textContent = item.name + ' · ' + money(item.price);
    row.append(title);
    for (const line of [item.category, ...item.details]) {
      const text = document.createElement('p');
      text.textContent = line;
      row.append(text);
    }
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remover';
    remove.setAttribute('aria-label', 'Remover ' + item.name + ' do pedido');
    remove.addEventListener('click', () => {
      cart.splice(index, 1);
      updateCart();
      byId('close-cart').focus();
    });
    row.append(remove);
    list.append(row);
  }
  if (!cart.length) list.textContent = 'Seu pedido está vazio.';
  byId('cart-total').textContent = cart.length ?
    'Total: ' + money(cart.reduce((sum, item) => sum + item.price, 0)) : '';
  checkout.hidden = byId('checkout-help').hidden = !cart.length;
  if (cart.length) checkout.href = orderLink(cart, money);
  else checkout.removeAttribute('href');
}

function initCart() {
  const dialog = byId('cart-dialog');
  byId('view-order').addEventListener('click', () => dialog.showModal());
  byId('close-cart').addEventListener('click', () => dialog.close());
  updateCart();
}
