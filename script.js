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


