
/*
Customer Class: represent a customer's accounts in the bank. I have simulated as if it were a JSON file from a database
The class constructor will have all the customer information as the properties
*/
class Customer {
	constructor (){
		this.datacustomers = [
			{
				"id": 1, 
				"firstname": "Julian",
				"lastname": "Alvarez",
				"accountnumber": "881764",
				"pin": "1111"

			},
			{
				"id": 2, 
				"firstname": "Pedro",
				"lastname": "Perez",
				"accountnumber": "881765",
				"pin": "1010"	
			},
			{
				"id": 3, 
				"firstname": "Laura",
				"lastname": "Salvatore",
				"accountnumber": "881766",
				"pin": "8080"	
			},
			{
				"id": 4, 
				"firstname": "Juana",
				"lastname": "Montero",
				"accountnumber": "881767",
				"pin": "1515"	
			}
		];


	}
//This is the a method with the conditions to find and match the customer account
getCustomerByAccount(accountnumber){
return this.datacustomers.find(customer =>  customer.accountnumber === accountnumber.toString());
}

//This is the a method to get all the customers information
getAllCustomers(){
	return this.datacustomers;
	}
} 
//This is a global variable in order to have it available to be used in atm_functions.js
window.Customer = Customer;


//This is the account class where I there is the account information from customers and where I have simulated some movements.
class Account {
	constructor(){
		this.dataMovements = {
			881764: {
				balance: 10000, 
				typeOfAccount: "Current Account",
				interestRate: 0.15,
				movements: [
					{
						type: "Deposit",
						amount: 500,
						date: "2024-12-10"
					},
					{
						type: "Withdraw",
						amount: 50,
						date: "2024-12-11"

					},

				],
			},
			881765: {
				balance: 500, 
				typeOfAccount: "Current Account",
				interestRate: 0.11,
				movements: [
						{
							type: "withdraw",
							amount: 200,
							date: "2024-12-01"
						},
						{
							type: "Withdraw",
							amount: 50,
							date: "2024-12-05"
	
						},
	
					],
				},
			881766: {
				balance: 800, 
				typeOfAccount: "Current Account",
				interestRate: 0.15,
				movements: [
						{
							type: "Deposit",
							amount: 100,
							date: "2024-12-05"
						},
						{
							type: "Deposit",
							amount: 50,
							date: "2024-12-11"
	
						},
	
					],
				},
			881767: {
				balance: 5000, 
				typeOfAccount: "Current Account",
				interestRate: 0.17,
				movements: [
						{
							type: "Deposit",
							amount: 100,
							date: "2024-12-10"
						},
						{
							type: "Deposit",
							amount: 50,
							date: "2024-12-11"

						},
					],
				},
			};
	}
//This is a method to get the balance of the accounts
	getBalance(accountnumber){
		if(this.dataMovements[accountnumber]){
			return this.dataMovements[accountnumber].balance;
		}
		else{
			return -9999;
		}
	}
	//This is a method to get the movements of the account
	getMovements(accountnumber){
		return this.dataMovements[accountnumber];
	}
	//This is a method to add a new movement to the account
	setNewMovement(accountnumber, newMovement){
		if(this.dataMovements[accountnumber]) {
			if(newMovement.type === "Deposit") {
				this.dataMovements[accountnumber].balance += newMovement.amount;
				this.dataMovements[accountnumber].movements.push(newMovement);
				document.getElementById("displayMessage").innerHTML = "Sucessfull operation. Deposit";
			}else if(newMovement.type === "Withdraw") {
					if(this.dataMovements[accountnumber].balance - newMovement.amount >= 0)
					{
						this.dataMovements[accountnumber].balance -= newMovement.amount;
						this.dataMovements[accountnumber].movements.push(newMovement);
						document.getElementById("displayMessage").innerHTML = "Sucessfull operation. Withdraw";
					}else {
				document.getElementById("displayMessage").innerHTML = `Operation failed - Withdraw <br> Insufficient Balance`;
			}
		}else {
			console.log("ups, we are working in new options...");
			}				
		} else{
		console.log("Account does not exist");
		}
	}
}
//This is a global variable in order to have it available to be used in atm_functions.js
window.Account = Account;