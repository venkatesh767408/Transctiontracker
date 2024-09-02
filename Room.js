document.addEventListener("DOMContentLoaded", function () {
    let transactionList = JSON.parse(localStorage.getItem("transactions")) || [];
    let initialAmount = parseFloat(localStorage.getItem("initialAmount")) || 0;
    
    const initialAmountInput = document.getElementById("initialAmount");
    const transactionDateInput = document.getElementById("transactionDate");
    const amountInput = document.getElementById("amount");
    const creditBtn = document.getElementById("creditBtn");
    const debitBtn = document.getElementById("debitBtn");
    const transactionListEl = document.getElementById("transactionList");
    const totalAmountEl = document.getElementById("totalAmount");

    function updateTransactionList() {
        transactionListEl.innerHTML = "";
        transactionList.forEach((transaction, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${transaction.date}: ${transaction.type} - $${transaction.amount} <button onclick="deleteTransaction(${index})">Delete</button>`;
            transactionListEl.appendChild(li);
        });
    }

    function updateTotalAmountDisplay() {
        totalAmountEl.textContent = initialAmount.toFixed(2);
    }

    function addTransaction(type) {
        const date = transactionDateInput.value;
        const amount = parseFloat(amountInput.value);

        if (!date || isNaN(amount) || isNaN(initialAmount)) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const transaction = {
            date,
            type,
            amount
        };

        if (type === "Credit") {
            initialAmount += amount;
        } else if (type === "Debit") {
            initialAmount -= amount;
        }

        transactionList.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactionList));
        localStorage.setItem("initialAmount", initialAmount.toString());
        
        updateTransactionList();
        updateTotalAmountDisplay();
    }

    function deleteTransaction(index) {
        const transaction = transactionList[index];
        if (transaction.type === "Credit") {
            initialAmount -= transaction.amount;
        } else if (transaction.type === "Debit") {
            initialAmount += transaction.amount;
        }

        transactionList.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactionList));
        localStorage.setItem("initialAmount", initialAmount.toString());

        updateTransactionList();
        updateTotalAmountDisplay();
    }

    window.deleteTransaction = deleteTransaction;

    creditBtn.addEventListener("click", function () {
        addTransaction("Credit");
    });

    debitBtn.addEventListener("click", function () {
        addTransaction("Debit");
    });

    initialAmountInput.addEventListener("input", function() {
        initialAmount = parseFloat(initialAmountInput.value) || 0;
        localStorage.setItem("initialAmount", initialAmount.toString());
        updateTotalAmountDisplay();
    });

    updateTransactionList();
    updateTotalAmountDisplay();
});
