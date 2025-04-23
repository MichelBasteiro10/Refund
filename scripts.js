// Seleciona os elementos do formulario
const form = document.querySelector(`form`);
const amount = document.querySelector(`#amount`);
const expense = document.querySelector(`#expense`);
const category = document.querySelector(`#category`);

// Seleciona os elementos da lista.
const expenseList = document.querySelector(`ul`);
const expenseQuantity = document.querySelector(`aside header p span`);
const expensesTotals = document.querySelector(`aside header h2`)

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Obtem o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, ``);

  //Transforma o valor em centavos
  value = Number(value) / 100;

  //Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  //Formata o valor no padrão BRL (Real Brasileiro)
  value = value.toLocaleString(`pt-BR`, {
    style: `currency`,
    currency: `BRL`,
  });

  //Retorna o valorr formatado
  return value;
}

// Captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
  event.preventDefault();

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  //Chama a função que ira adicionar o item na lista.
  expenseAdd(newExpense);
};

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento de li para adicionar o item na lista.
    const expenseItem = document.createElement(`li`);
    expenseItem.classList.add(`expense`);

    // Cria o icone da categoria
    const expenseIcon = document.createElement(`img`);
    expenseIcon.setAttribute(`src`, `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute(`alt`, newExpense.category_name);

    // Cria a info de despesa.
    const expenseInfo = document.createElement(`div`);
    expenseInfo.classList.add(`expense-info`);

    // Cria o nome da despesa.
    const expenseName = document.createElement(`strong`);
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement(`span`);
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria dentro da div das informações de despesa.
    expenseInfo.append(expenseName, expenseCategory);

    //Cria o valor da despesa.
    const expenseAmount = document.createElement(`span`);
    expenseAmount.classList.add(`expense-amount`);
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace(`R$`, ``)}`;

    // Cria o icone de remover
    const removeIcon = document.createElement(`img`);
    removeIcon.classList.add(`remove-icon`);
    removeIcon.setAttribute(`src`, `img/remove.svg`);
    removeIcon.setAttribute(`alt`, `Icone de remover`);

    //Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista.
    expenseList.append(expenseItem);

    // Atualiza os totais.
    updateTotals();
  } catch (error) {
    alert(`Não foi possivel atualizar a lista de despesas.`);
    console.log(error);
  }
}

// Atualiza os totais.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista.
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? `Despesas` : `Despesa`
    }`;

    // Variavel para incrementar o total
    let total = 0;

    // Percorre cada item da lista
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(`.expense-amount`)

      // Remover caracteres não númericos e substitui a virgula por ponto.
      let value = itemAmount.textContent.replace(/[^\d,]/g, ``).replace(`,`, ".");

      // Converte o valor para float.
      value = parseFloat(value)

      // Verifica se é um numero válido
      if(isNaN(value)) {
        return alert(`Não foi possivel calcular o total. O valor não parece ser um número`)
      }

      // Incrementar valor total
      total += Number(value)
    }

    // Cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement(`small`)
    symbolBRL.textContent = `R$`

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", ``)

    // Limpa o conte´´udo do elemento.
    expensesTotals.innerHTML = ``
    
    // Adiciona o simbolo da moeda e o valor total formatado
    expensesTotals.append(symbolBRL, total)

  } catch (error) {
    console.log(error);
    alert(`Não foi possivel atualizar os totais`);
  }
}
