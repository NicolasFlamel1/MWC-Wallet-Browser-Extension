// Use strict
"use strict";


// Main function

// Try
try {

	// Create MWC Wallet
	var MwcWallet = Object.freeze({
	
		// Public
		
			// Start transaction
			"startTransaction": function(walletType, networkType, recipientAddress, amount = MwcWallet.NO_TRANSACTION_AMOUNT, message = MwcWallet.NO_TRANSACTION_MESSAGE) {
			
				// Set self
				const self = this;
				
				// Return promise
				return new Promise(function(resolve, reject) {
				
					// Return testing if extension exists
					return fetch(self.path).then(function() {
					
						// Create index
						const index = Math.random();
						
						// Get response
						const getResponse = function(event) {
						
							// Check if sender is the content script
							if(event["origin"] === location["origin"] && typeof event["data"] === "object" && event["data"] !== null && "Response" in event["data"] === true && "Index" in event["data"] === true) {
							
								// Check if response is for the request
								if(event["data"]["Index"] === index) {
								
									// Remove message event
									window.removeEventListener("message", getResponse);
									
									// Check if response was success
									if(event["data"]["Response"] === true) {
									
										// Resolve
										resolve();
									}
									
									// Otherwise
									else {
									
										// Check if response has an error
										if("Error" in event["data"] === true) {
										
											// Reject error
											reject(event["data"]["Error"]);
										}
										
										// Otherwise
										else {
										
											// Reject internal error error
											reject(self.INTERNAL_ERROR_ERROR);
										}
									}
								}
							}
						};
						
						// Message event
						window.addEventListener("message", getResponse);
						
						// Send request to the content script
						window.postMessage({
						
							// Extension ID
							"Extension ID": self.extensionId,
							
							// Wallet type
							"Wallet Type": walletType,
							
							// Network type
							"Network Type": networkType,
							
							// Request
							"Request": "Start Transaction",
							
							// Recipient address
							"Recipient Address": recipientAddress,
							
							// Amount
							"Amount": amount,
							
							// Message
							"Message": message,
							
							// Index
							"Index": index
						
						}, location["origin"]);
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject extension not found error
						reject(self.EXTENSION_NOT_INSTALLED_ERROR);
					});
				});
			},
			
			// No transaction amount
			"NO_TRANSACTION_AMOUNT": null,
			
			// No transaction message
			"NO_TRANSACTION_MESSAGE": null,
			
			// Extension not installed error
			"EXTENSION_NOT_INSTALLED_ERROR": 0,
			
			// Internal error error
			"INTERNAL_ERROR_ERROR": 1,
			
			// Invalid wallet type error
			"INVALID_WALLET_TYPE_ERROR": 2,
			
			// Invalid network type error
			"INVALID_NETWORK_TYPE_ERROR": 3,
			
			// Invalid request error
			"INVALID_REQUEST_ERROR": 4,
			
			// Invalid recipient address error
			"INVALID_RECIPIENT_ADDRESS_ERROR": 5,
			
			// Invalid amount error
			"INVALID_AMOUNT_ERROR": 6,
			
			// Invalid message error
			"INVALID_MESSAGE_ERROR": 7,
			
			// MWC wallet type
			"MWC_WALLET_TYPE": "MimbleWimble Coin",
			
			// GRIN wallet type
			"GRIN_WALLET_TYPE": "Grin",
			
			// EPIC wallet type
			"EPIC_WALLET_TYPE": "Epic Cash",
			
			// Mainnet network type
			"MAINNET_NETWORK_TYPE": "Mainnet",
			
			// Testnet network type
			"TESTNET_NETWORK_TYPE": "Testnet",
			
			// Floonet network type
			"FLOONET_NETWORK_TYPE": "Floonet",
			
		// Private
		
			// Extension ID
			"extensionId": (new URL(document["currentScript"]["dataset"]["src"]))["hostname"],
			
			// Path
			"path": document["currentScript"]["dataset"]["src"]
	});
}

// Catch errors
catch(error) {

}
