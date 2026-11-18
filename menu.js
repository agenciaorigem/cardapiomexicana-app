const menu = {
  'burritos-individuais': [{ alphabetical: true, items: [
    ['Tradicional Picante', 'Molho de tomate, carne moída, bacon, mussarela, rodelas de pimenta dedo de moça, barbecue, alface e tomate.'],
    ['Carne', 'Molho de tomate, carne moída, bacon, mussarela, barbecue, alface e tomate.'],
    ['Tomate Seco', 'Molho de tomate, catupiry, tomate seco, mussarela, barbecue, rúcula, alface e tomate.'],
    ['Pernil', 'Molho de tomate, catupiry, pernil desfiado, azeitona verde, mussarela, alface e tomate.'],
    ['Vegetariana', 'Molho de tomate, cenoura ralada, brócolis, azeitonas verdes, mussarela, barbecue, alface e tomate.'],
    ['Frango', 'Molho de tomate, frango grelhado em tiras, bacon, mussarela, barbecue, alface e tomate.'],
    ['Queijo', 'Molho de tomate, catupiry, cheddar, mussarela, bacon, barbecue, alface e tomate.'],
    ['Filé', 'Molho de tomate, contrafilé grelhado em tiras, calabresa, mussarela, barbecue, alface e tomate.'],
  ] }],
  'gran-burritos': [{ alphabetical: true, items: [
    ['Frango', 'Frango desfiado, bacon, milho, catupiry e mussarela. Gratinado e coberto com molho rosé.'],
    ['Filé', 'Contrafilé grelhado em tiras, calabresa, catupiry e mussarela. Gratinado e coberto com molho rosé.'],
    ['Carne', 'Carne moída, bacon, catupiry e mussarela. Gratinado e coberto com molho rosé.'],
    ['Brócolis com Bacon', 'Brócolis, bacon, catupiry e mussarela. Gratinado e coberto com molho rosé.'],
    ['Queijo', 'Mussarela, cheddar, catupiry, bacon, milho e palmito. Gratinado e coberto com molho rosé.'],
  ] }],
  combinados: [{
    note: 'Pimenta a gosto. Acompanha molho barbecue, sour cream e guacamole.',
    items: [
      ['Los Tres Hermanos', '2 tacos clássicos (frango e carne), 2 enchiladas (frango e carne) e 1 quesadilla de queijo.'],
      ['Los Revolucionarios', '2 tacos tijuanas (frango e chili), 2 burritos (carne e pernil), 2 enchiladas de queijo e 1 quesadilla de frango.'],
      ['Enamorados', '2 tacos tijuanas (frango e carne), 2 unidades de batatas mexicanas, 2 enchiladas de queijo e 1 quesadilla média de frango.'],
      ['Pancho Villa', '2 tacos tijuanas (frango e chili), 2 burritos (carne e pernil), 2 enchiladas de queijo e 1 quesadilla de frango.'],
      ['Combinado da Casa', '2 tacos tijuanas (frango e carne), 2 tacos shell (chili e pernil), 2 enchiladas de queijo, 2 unidades de batatas mexicanas, 1 quesadilla de frango e 1 porção de chili com nachos.'],
    ],
  }],
  'pratos-especiais': [{ items: [
    ['Batata Mexicana', '6 metades de batatas fritas cobertas com cheddar, mussarela e bacon, com salsinha e molho barbecue.'],
    ['Chili com Carne', 'Feijão mexicano preparado com carne moída, bacon, calabresa, mussarela e mix de pimentas. Acompanha nachos.'],
    ['Frijoles com Carne ou Frango', 'Feijão mexicano gratinado e recheado com carne moída ou frango, catupiry e mussarela. Acompanha nachos.'],
    ['Taco Shell', '3 tacos de farinha de milho crocante, nos sabores frango, carne e chili com carne.'],
    ['Guacamole com Nachos', 'Purê de abacate temperado com sal, limão, tomate e cebolinha.'],
    ['Quesadilla', 'Frango, pernil, carne ou queijo, com molho de tomate, mussarela e tomate picado.'],
    ['Enchiladas', '2 unidades (frango, pernil, carne ou queijo), gratinadas e cobertas com molho de tomate, mussarela e salsinha.'],
    ['Cebola Crispy', 'Porção de finas rodelas de cebola empanadas e fritas.'],
    ['Nacho Libre', 'Nachos crocantes cobertos com mussarela, cheddar, bacon, calabresa e uma carne à escolha: frango desfiado, carne moída ou pernil desfiado.'],
  ] }],
  pasteis: [
    { title: 'Pastéis Doces', alphabetical: true, items: [
      ['Suflair'], ['Banana com Chocolate'], ['Banana, Canela e Mussarela'], ['Morango com Chocolate'],
      ['Romeu e Julieta'], ['Nutella com Sorvete de Leite Ninho'], ['Suflair com Chocolate Branco'],
      ['Doce de Leite com Queijo'], ['Sonho de Valsa'], ['Ouro Branco'], ['Talento'],
    ] },
    { title: 'Pastéis Especiais', alphabetical: true, items: [
      ['X-Tudo', 'Carne moída, frango desfiado, calabresa, bacon, milho, catupiry e mussarela.'],
      ['Da Casa', 'Frango, mussarela, presunto, catupiry, milho, bacon e palmito.'],
      ['Camarão com Requeijão', 'Camarão no requeijão e mussarela.'],
      ['Hambúrguer', 'Hambúrguer, mussarela, tomate, bacon, cheddar ou catupiry.'],
      ['Mexicano', 'Chili com carne e mussarela.'],
    ] },
    { title: 'Monte o Seu Pastel Salgado', note: 'Escolha 2, 3 ou 4 ingredientes. Adicionais disponíveis.', alphabetical: true, items: [
      ['Azeitona'], ['Bacon'], ['Brócolis'], ['Calabresa'], ['Carne Moída'], ['Catupiry'],
      ['Cheddar'], ['Milho'], ['Cream Cheese'], ['Frango'], ['Mussarela'], ['Pernil'],
      ['Palmito'], ['Pimenta Dedo de Moça'], ['Queijo'], ['Presunto'], ['Queijo da Canastra'],
      ['Tomate Seco'], ['Tomate'], ['Champignon'],
    ] },
  ],
  'monte-sua-salada': [
    { title: 'Escolha 5 opções', items: [
      ['Alface'], ['Rúcula'], ['Cenoura'], ['Palmito'], ['Champignon'], ['Milho'],
      ['Tomate'], ['Brócolis'], ['Azeitona'], ['Pimenta Dedo de Moça'], ['Pimenta Biquinho'],
    ] },
    { title: 'Escolha 1 carne', note: 'Adicionais disponíveis.', items: [
      ['Frango'], ['Pernil'], ['Carne Moída'], ['Filé'], ['Bacon'], ['Calabresa'],
    ] },
  ],
  'escondidinho-da-frida': [{ items: [
    ['3 Queijos', 'Purê de batata recheado com mussarela, catupiry, cheddar, bacon e queijo gratinado.'],
    ['Brócolis', 'Purê de batata recheado com mussarela, catupiry, cheddar, bacon e queijo gratinado.'],
    ['Frango', 'Purê de batata recheado com frango desfiado, cheddar, milho, bacon e queijo gratinado.'],
    ['Pernil', 'Purê de batata recheado com pernil desfiado, azeitona, catupiry e queijo gratinado.'],
    ['Strogonoff de Frango', 'Purê de batata recheado com strogonoff de frango, queijo gratinado e batata palha.'],
    ['Strogonoff de Filé', 'Purê de batata recheado com strogonoff de filé, queijo gratinado e batata palha.'],
    ['Carne', 'Purê de batata recheado com carne moída, bacon, cheddar e queijo gratinado.'],
    ['Camarão no Requeijão', 'Purê de batata recheado com camarão no requeijão e queijo gratinado.'],
  ] }],
  caldos: [{
    note: 'Acompanham mussarela e torradas.',
    items: [
      ['Mandioca', 'Caldo de mandioca com bacon, calabresa e carne moída.'],
      ['Feijão', 'Caldo de feijão com bacon, calabresa e carne.'],
      ['Cabotiá', 'Caldo de cabotiá com bacon, calabresa e carne.'],
      ['Quenga', 'Caldo de mandioca com frango, bacon, cenoura e batata.'],
      ['Mexicano', 'Caldo de feijão mexicano (chili) com bacon, calabresa, carne moída, pimenta dedo de moça e pimenta godê.'],
    ],
  }],
  bebidas: [
    { title: 'Sucos', items: [
      ['Açaí Suíço', 'Morango ou banana.'], ['Abacaxi com Hortelã'], ['Frutas Vermelhas'],
      ['Limonada Suíça'], ['Morango Suíço'], ['Mix de 2 Frutas'], ['Abacaxi'],
      ['Acerola'], ['Amora'], ['Caju'], ['Goiaba'], ['Laranja'], ['Limão'], ['Manga'], ['Morango'],
    ] },
    { title: 'Refrigerantes', items: [
      ['Refrigerante Lata'], ['Refrigerante 600 ml'], ['Del Valle Lata'],
      ['Schweppes Lata'], ['Água com Gás'], ['Água sem Gás'],
    ] },
    { title: 'Cervejas Long Neck', items: [
      ['Sol Mexicana'], ['Corona'], ['Heineken'], ['Budweiser'], ['Stella Artois'],
    ] },
    { title: 'Smoothies', items: [
      ['Havana', 'Calda de morango, morango, kiwi, sorvete de limão e gelo triturado.'],
      ['Tropical', 'Calda de kiwi, manga, sorvete de limão e gelo triturado.'],
    ] },
    { title: 'Drinks', items: [
      ['Margarita', 'Tradicional ou Blue. Tequila, suco de limão, licor de laranja ou curaçau blue, sal e gelo.'],
      ['Tequila Sunrise', 'Tequila, suco de laranja, grenadine e gelo.'],
      ['Tequila', 'Tequila, suco de laranja, grenadine e gelo.'],
      ['Lemon Fresh', 'Suco de limão com toque de tequila e gelo.'],
      ['Cuba Libre', 'Coca-Cola, rum ou Malibu, limão e gelo.'],
      ['Mojito', 'Rum, limão, açúcar, soda club, hortelã e gelo.'],
      ['Energy Drink', 'Energético com gin, tequila ou vodka.'],
    ] },
  ],
  sobremesas: [{ items: [
    ['Quesadilla de Banana com Chocolate'],
    ['Quesadilla de Morango com Chocolate'],
    ['Quesadilla de Nutella com Sorvete de Leite Ninho Trufado'],
    ['Churritos', '12 unidades de churros.'],
    ['Gran Gateau', 'Petit gateau, calda de chocolate, pedaços de kiwi, uva, morango e banana, e sorvete de Leite Ninho trufado.'],
  ] }],
};
