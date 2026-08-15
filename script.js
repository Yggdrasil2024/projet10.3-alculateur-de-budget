//constantes du script

/* --- on load les operations si elles existent --- */
let operations = JSON.parse(localStorage.getItem("operation-list")) || [];

/* --- element du formulaire --- */
const form = document.getElementById("operation_formular");
const operationTitle = document.getElementById("operation_title");
const operationAmount = document.getElementById("operation_amount");
const operationType = document.getElementById("operation_type");
const operationList = document.getElementById("operations_list");

/* --- les KPIs --- */
const balanceItem = document.getElementById("balance");
const incomeItem = document.getElementById("earnings");
const expenseItem = document.getElementById("expenses");

/* --- dans la zone des operation --- */
const badge = document.getElementById("sum-badge");

/**
 * fonction pour formatter la monnaie
 *
 * @param {number} amount - somme à formatter
 * @returns {string} - somme formatté
 */
const currencyFormatter = (amount) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
  }).format(amount);
};

const renderUI = () => {
  let earnedSum = 0;
  let expensesSum = 0;
  operationList.innerHTML = "";

  if (operations.length === 0) {
    operationList.innerHTML = `<p class="empty_operations">Aucune operation enregistré pour l'instant</p>`;
  }

  //affichage de chage element d'operation
  operations.forEach((item) => {
    const earning = item.type == 2;
    const amount = item.amount;

    //on ressence les depense et gains
    if (earning) {
      earnedSum += amount;
    } else {
      expensesSum += amount;
    }

    if (operations.length === 0) {
    }
    //la div pour les operations
    const listItem = document.createElement("div");
    listItem.classList.add("operation__item");
    listItem.innerHTML = `<div class="operation__item__description">
                                <div class="operation__item__title ${earning ? "dot-earning" : "dot-expense"}">
                                    ${item.title}
                                </div>
                                <div class="operation__item__amt">
                                    <span class="${earning ? "income" : "expense"}">${earning ? "+" : "-"}${currencyFormatter(amount)}</span>
                                    <span class="badge ${earning ? "badge-incomes" : "badge-expenses"}">${earning ? "Revenu" : "Dépense"}</span>
                                </div>
                            </div>
                            <div class="operation__item__action"><button type="button"><img
                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgtaWNvbiBsdWNpZGUteCI+PHBhdGggZD0iTTE4IDYgNiAxOCIvPjxwYXRoIGQ9Im02IDYgMTIgMTIiLz48L3N2Zz4="
                                        alt="effacer">
                                </button></div>
                        </div>`;

    operationList.appendChild(listItem);
  });

  //badge pour compter les operation
  badge.textContent = `${operations.length} operation${operations.length > 1 ? "s" : ""}`;

  //on s'occupe du contenu de la dashboard
  balanceItem.textContent = `${currencyFormatter(earnedSum - expensesSum)}`;
  incomeItem.textContent = `${currencyFormatter(earnedSum)}`;
  expenseItem.textContent = `${currencyFormatter(expensesSum)}`;

  //enregistrement des operation courante dans localstorage
  localStorage.setItem("operation-list", JSON.stringify(operations));
};

const addToOperations = (operation) => {
  try {
    operations.unshift(operation);
    return true;
  } catch (error) {
    console.error(error);
  }
};

/**
 * fonction qui va generer un id aleatoire
 *
 * @returns {string} - id aleatoire
 */
const idGenerator = () => {
  const id = [];
  char = "1234567890abcdefghijklmnopqrstuvxyz";

  //generation de l'id
  for (let index = 0; index < 6; index++) {
    id[index] = char[Math.floor(Math.random() * char.length)];
  }
  //on genere un autre id si celui là existe deja
  if (operations) {
    const operationsIds = operations.map((item) => {
      return item.id;
    });

    if (operationsIds.includes(id.join(""))) {
      return idGenerator();
    }
  }
  return id.join("");
};

/**
 * on va gerer ce qui se passe au moment de
 * l'ajout d'une operation
 */
form.addEventListener("submit", (event) => {
  //previent les indesirables
  event.preventDefault();

  const f_title = operationTitle.value;
  const f_amount = parseFloat(operationAmount.value);
  const f_type = Number(operationType.value);

  if (!f_title || isNaN(f_amount) || !f_type || f_amount <= 0) {
    alert("veuiller remplir correctement le formulaire");
    return;
  }
  //nouvelle operation
  const newOperation = {
    id: idGenerator(),
    title: f_title,
    amount: f_amount,
    type: f_type,
  };

  //ajout dans les les operations
  addToOperations(newOperation);
  form.reset();

  //on met à jour l'interface
  renderUI();
});

//on charge l'interface depuis donné
renderUI();
