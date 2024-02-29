const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const expense = {
    date: expenseForm.date.value,
    category: expenseForm.category.value,
    amount: parseFloat(expenseForm.amount.value),
  };
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  expenseForm.reset();
});

const renderExpenses = () => {
  expensesList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>
        <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    expensesList.appendChild(row);
  });
};

const editExpense = (index) => {
  const expense = expenses[index];
  expenseForm.date.value = expense.date;
  expenseForm.category.value = expense.category;
  expenseForm.amount.value = expense.amount;
  expenseForm.editIndex.value = index;
};

const deleteExpense = (index) => {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
};

renderExpenses();