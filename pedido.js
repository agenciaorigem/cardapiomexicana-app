function renderBuilder({ name, sizes, ingredients, extra, meats, extraMeat }) {
  function element(tag, content) {
    const result = document.createElement(tag);
    if (content) result.textContent = content;
    return result;
  }

  function field(label, values, type, key) {
    const group = element('fieldset');
    group.append(element('legend', label));
    const grid = element('div');
    grid.className = 'ingredient-grid';
    group.append(grid);
    const inputs = values.map((value) => {
      const input = element('input');
      input.type = type;
      input.name = key;
      input.value = value;
      const option = element('label');
      option.append(input, document.createTextNode(value));
      grid.append(option);
      return input;
    });
    return { group, inputs };
  }

  const money = (cents) => currency.format(cents / 100);
  const panel = element('div');
  panel.className = 'order-builder';
  const options = element('div');
  options.className = 'order-sizes';
  const form = element('form');
  form.hidden = true;
  const base = field('', ingredients, 'checkbox', 'ingredientes');
  const protein = meats && field('Escolha 1 carne', meats, 'radio', 'carne');
  const extras = field('Ingredientes adicionais · ' + money(extra) + ' cada', ingredients, 'checkbox', 'adicionais');
  const extraProtein = meats && field('Carnes adicionais · ' + money(extraMeat) + ' cada', meats, 'checkbox', 'carnes-adicionais');
  const more = element('details');
  more.append(element('summary', 'Adicionar extras'), extras.group);
  if (extraProtein) more.append(extraProtein.group);
  const status = element('p');
  status.setAttribute('aria-live', 'polite');
  const total = element('output');
  const submit = element('button', 'Adicionar ao pedido');
  submit.type = 'submit';
  submit.className = 'action';
  let size;
  let price;
  let complete = false;
  let amount;
  const selected = (field) => field ? field.inputs.filter((input) => input.checked).map((input) => input.value) : [];

  function refresh() {
    const count = selected(base).length;
    for (const input of base.inputs) input.disabled = !input.checked && count >= size;
    status.textContent = count + ' de ' + size + ' ingredientes selecionados';
    complete = count === size && (!protein || selected(protein).length === 1);
    submit.disabled = !complete;
    amount = price + selected(extras).length * extra + (extraProtein ? selected(extraProtein).length * extraMeat : 0);
    total.textContent = 'Total: ' + money(amount);
  }

  for (const [count, cents] of sizes) {
    const button = element('button', (meats ? 'Monte sua salada' : count + ' ingredientes') + ' · ' + money(cents));
    button.type = 'button';
    button.className = 'action';
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (size !== count) {
        form.reset();
        more.open = false;
      }
      size = count;
      price = cents;
      for (const option of options.children) option.setAttribute('aria-pressed', String(option === button));
      base.group.firstElementChild.textContent = 'Escolha ' + count + (meats ? ' opções' : ' ingredientes');
      form.hidden = false;
      refresh();
    });
    options.append(button);
  }

  form.append(base.group);
  if (protein) form.append(protein.group);
  form.append(status, more, total, submit);
  form.addEventListener('change', refresh);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!complete) return;
    addToCart({
      name: meats ? name : name + ' (' + size + ' ingredientes)',
      category: meats ? 'Monte sua Salada' : 'Pastéis',
      price: amount,
      details: [
        'Ingredientes: ' + selected(base).join(', '),
        protein && 'Carne: ' + selected(protein).join(', '),
        selected(extras).length && 'Adicionais: ' + selected(extras).join(', '),
        selected(extraProtein).length && 'Carnes adicionais: ' + selected(extraProtein).join(', '),
      ].filter(Boolean),
    });
  });
  panel.append(options, form);
  return panel;
}
