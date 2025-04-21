// Seleciona os elementos do formulario
const form = document.querySelector(`form`);
const amount = document.querySelector(`#amount`);
const expense = document.querySelector(`#expense`);
const category = document.querySelector(`#category`);

// Seleciona os elementos da lista.
const expenseList = document.querySelector(`ul`);

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

     //Adiciona as informações no item.
     expenseItem.append(expenseIcon, expenseInfo);

    // Adiciona o item na lista.
    expenseList.append(expenseItem);
  } 
  catch (error) {
    alert(`Não foi possivel atualizar a lista de despesas.`);
    console.log(error);
  }
}
