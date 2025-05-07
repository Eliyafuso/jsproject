//Variable declaration

const customer = new window.Customer();
const account = new window.Account();

//initialize the ATM machine
function initialize() {
    Stage = 1;
    AcctNo = "";
    Pin = 0;    
    document.getElementById("displayMessage").innerHTML = "Please Enter your Account Number";
    document.getElementById("displayAccount").value = "";
    document.getElementById("displayPin").value = "";
    document.getElementById("displaySubMsg").innerHTML = "";
}

//When we close session reloads the web to bring the clients and it take the user to the initial status.
function reloadWeb() {
    location.reload();
    }

//This is the function when the user login correctly.
function enterPressed(){
    const accountfield = document.getElementById("displayAccount").value;
    const pinfield = document.getElementById("displayPin").value;
    //console.log(accountfield)
    //console.log(pinfield)
    const client = customer.datacustomers.find((clientFound) =>
    clientFound.accountnumber === accountfield.toString() && 
    clientFound.pin === pinfield.toString())
    //console.log(client)
    if(client){
        document.getElementById("displayMessage").innerHTML = "Please select one of the following operations";
        document.getElementById("displaySubMsg").innerHTML = "Welcome " + client.firstname + " " + client.lastname + "!";
        document.getElementById("displayMovements").innerHTML = `<h3>Operations</h3>
        <button onclick="showMenu('${accountfield}')">Available Operations</button>`;

    }else {
        document.getElementById("displaySubMsg").innerHTML = "Incorrect PIN, please add the correct PIN";
    }    
}

//In this case I have decided to use buttins instead of case, in order to show the user the available operations. Which I found easier to control.
function showMenu(accountNumber){
    let = client = customer.getCustomerByAccount(accountNumber);
    document.getElementById("displayMessage").innerHTML = "Please select one of the following operations";
    document.getElementById("displaySubMsg").innerHTML = "Welcome " + client.firstname + " " + client.lastname + "!";
    document.getElementById("displayMovements").innerHTML = `<h3>Select an Operation</h3>
    <button onclick="showDepositForm('${accountNumber}')">Deposit</button>
    <button onclick="showWithdrawForm('${accountNumber}')">Withdraw</button>
    <button onclick="showBalance('${accountNumber}')">Balance</button>
    <button onclick="initialize();reloadWeb()">Close Session</button>`;
}

//This function shows the user the current balance. using id = "displayMovements"
function showBalance(accountNumber){
    let = client = customer.getCustomerByAccount(accountNumber);
    document.getElementById("displaySubMsg").innerHTML = "Welcome " + client.firstname + " " + client.lastname + "!";
    let balance = account.getBalance(accountNumber);
    if(balance >=0){
        const clientMovements = account.getMovements(accountNumber);
        //console.log("showBalance",clientMovements)
        let movementHTML = "<ul>";
        clientMovements.movements.forEach((movement) => {
            movementHTML += `<li>${movement.type}: ${movement.amount} CAD in ${movement.date}</li>`;
        });
        movementHTML += "<ul>";
    
    document.getElementById("displayMovements").innerHTML = `<h3>Movements</h3>${movementHTML}
    <h3>Balance: ${clientMovements.balance} CAD</h3>
    <button onclick="showMenu('${accountNumber}')">Go Back</button>`;
} else {
    ////console.log("The account does not exist!");
}
}

//This function shows the user the form to perform the deposit operation.
function showDepositForm(accountNumber){
    let = client = customer.getCustomerByAccount(accountNumber);
    document.getElementById("displaySubMsg").innerHTML = "Welcome " + client.firstname + " " + client.lastname + "!";
    document.getElementById("displayMovements").innerHTML = `<h3>Balance: ${account.getMovements(accountNumber).balance}
    CAD<br>Enter the amount to deposit</h3>
    <input type="number" id="depositAmount" />
        <button onclick="deposit('${accountNumber}')">Deposit</button>
    <button onclick="showMenu('${accountNumber}')">Cancel</button>`;
} 
//This function updates the balance and save the movement and makes sure that the amount is possitive.
function deposit(accountNumber){
    let = client = customer.getCustomerByAccount(accountNumber);
    document.getElementById("displaySubMsg").innerHTML = "Welcome" + client.firstname + " " + client.lastname + "!";
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);
    if(depositAmount > 0){
        const today = new Date().toISOString().split("T")[0];
        ////console.log(today);
        const newMovement = {
            type: "Deposit",
            amount: depositAmount,
            date: today,
        }
        account.setNewMovement(accountNumber, newMovement);
        document.getElementById ("displayMovements").innerHTML = `<h3>New Balance: ${account.getMovements(accountNumber).balance} CAD</h3>
        <button onclick="showMenu('${accountNumber}')">Go Back</button>`;           
} else {
    document.getElementById("displayMessage").innerHTML = `Operation rejected <br> The amount must be greater than 0`;
}
} 
//This function shows the user the form to perform the withdraw operation.
function showWithdrawForm(accountNumber){
    let = client = customer.getCustomerByAccount(accountNumber);
    document.getElementById("displaySubMsg").innerHTML = "Welcome " + client.firstname + " " + client.lastname + "!";
    document.getElementById("displayMovements").innerHTML = `<h3>Balance: ${account.getMovements(accountNumber).balance}
    CAD <br>Enter the amount to withdraw</h3>
    <input type="number" id= "withdrawAmount" />
        <button onclick="withdraw('${accountNumber}')">Withdraw</button>
    <button onclick="showMenu('${accountNumber}')">Cancel</button>`;
} 

//This function updates the balance and save the movement and makes sure that the amount is possitive and checks if there is enough balance.
function withdraw(accountNumber){
    let = client = customer.getCustomerByAccount(accountNumber);
    document.getElementById("displaySubMsg").innerHTML = "Welcome " + client.firstname + " " + client.lastname + "!";
    const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    if(withdrawAmount > 0){
        const today = new Date().toISOString().split("T")[0];
        const newMovement = {
            type: "Withdraw",
            amount: withdrawAmount,
            date: today,
        }
        account.setNewMovement(accountNumber, newMovement);
        document.getElementById ("displayMovements").innerHTML = `<h3>New Balance: ${account.getMovements(accountNumber).balance} CAD</h3>
        <button onclick="showMenu('${accountNumber}')">Go Back</button>`;           
} else {
    document.getElementById("displayMessage").innerHTML = "Operation rejected" <br> "The amount must be greater than 0";
}
} 
