//constantes du DOM

/* --- on load les operations si elles existent --- */
let operations = localStorage.getItem("operation-list") || [];

/* --- element du formulaire --- */
const form = document.getElementById("operation_formular");
const operationTitle = document.getElementById("operation_title");
const operationAmount = document.getElementById("operation_amount");
const operationType = document.getElementById("operation_type");

/* --- les KPIs --- */
const balance = document.getElementById("balance");
const tatalIncome = document.getElementById("earnings");
const totalSpent = document.getElementById("expenses");

const renderUI = () => {};

const addToOperations = (operation) => {
  operations.unshift(operation);
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

