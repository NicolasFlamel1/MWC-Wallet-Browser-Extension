// Use strict
"use strict";


// Constants

// No transaction amount
const NO_TRANSACTION_AMOUNT = null;

// No transaction message
const NO_TRANSACTION_MESSAGE = null;

// Number string pattern
const NUMBER_STRING_PATTERN = /^[+-]?(?:0(?:\.\d+)?|[1-9]\d*(?:\.\d+)?|\.\d+)$/u;

// Index not found
const INDEX_NOT_FOUND = -1;

// Trailing zeros pattern
const TRAILING_ZEROS_PATTERN = /(\.\d*?)0+$/u;

// Ending decimal point pattern
const ENDING_DECIMAL_POINT_PATTERN = /\.$/u;

// Popup window width
const POPUP_WINDOW_WIDTH = 400;

// Popup window height
const POPUP_WINDOW_HEIGHT = 640;

// URL query string separator
const URL_QUERY_STRING_SEPARATOR = "?";

// URL query string parameter separator
const URL_QUERY_STRING_PARAMETER_SEPARATOR = "&";

// URL query string parameter value separator
const URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR = "=";

// No window
const NO_WINDOW = undefined;

// Extension not installed error
const EXTENSION_NOT_INSTALLED_ERROR = 0;

// Internal error error
const INTERNAL_ERROR_ERROR = 1;

// Invalid wallet type error
const INVALID_WALLET_TYPE_ERROR = 2;

// Invalid network type error
const INVALID_NETWORK_TYPE_ERROR = 3;

// Invalid request error
const INVALID_REQUEST_ERROR = 4;

// Invalid recipient address error
const INVALID_RECIPIENT_ADDRESS_ERROR = 5;

// Invalid amount error
const INVALID_AMOUNT_ERROR = 6;

// Invalid message error
const INVALID_MESSAGE_ERROR = 7;

// Open in new tab ID
const OPEN_IN_NEW_TAB_ID = "OPEN_IN_NEW_TAB_ID";

// Open in new window ID
const OPEN_IN_NEW_WINDOW_ID = "OPEN_IN_NEW_WINDOW_ID";

// Wallet types
const WALLET_TYPES = [

	// MWC
	"MimbleWimble Coin",
	
	// GRIN
	"Grin",
	
	// Epic Cash
	"Epic Cash"
];

// Network types
const NETWORK_TYPES = {

	// MWC
	"MimbleWimble Coin": [
	
		// Mainnet
		"Mainnet",
		
		// Floonet
		"Floonet"
	],
	
	// GRIN
	"Grin": [
	
		// Mainnet
		"Mainnet",
		
		// Testnet
		"Testnet"
	],
	
	// Epic Cash
	"Epic Cash": [
	
		// Mainnet
		"Mainnet",
		
		// Floonet
		"Floonet"
	]
};

// Value number bases
const VALUE_NUMBER_BASES = {

	// MWC
	"MimbleWimble Coin": 1E9,
	
	// GRIN
	"Grin": 1E9,
	
	// Epic Cash
	"Epic Cash": 1E8
};


// Main function

// Runtime startup event
((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onStartup"].addListener(function() {

	// Clear window ID
	((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].remove("Window ID");
	
	// Add context menu items
	addContextMenuItems();
});

// Runtime installed event
((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onInstalled"].addListener(function() {

	// Clear window ID
	((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].remove("Window ID");
	
	// Add context menu items
	addContextMenuItems();
	
	// Inject content script
	injectContentScript();
});

/* Disabled features that require "management" permission in manifest.json since some extension stores flag that permission as deceptive and misleading

// Check if management exists
if(typeof ((typeof chrome !== "undefined") ? chrome : browser).management !== "undefined") {

	// Management enabled event
	((typeof chrome !== "undefined") ? chrome : browser)["management"]["onEnabled"].addListener(function() {
	
		// Clear window ID
		((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].remove("Window ID");
		
		// Add context menu items
		addContextMenuItems();
		
		// Inject content script
		injectContentScript();
	});
	
	// Management disabled event
	((typeof chrome !== "undefined") ? chrome : browser)["management"]["onDisabled"].addListener(function() {
	
		// Get window ID
		((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].get("Window ID").then(function(windowId) {
		
			// Check if window ID exists
			if("Window ID" in windowId === true) {
			
				// Close window and catch errors
				((typeof chrome !== "undefined") ? chrome : browser)["windows"].remove(windowId["Window ID"]).catch(function(error) {
				
				});
			}
			
		// Catch errors
		}).catch(function(error) {
		
		});
	});
	
	// Management uninstalled event
	((typeof chrome !== "undefined") ? chrome : browser)["management"]["onUninstalled"].addListener(function() {
	
		// Get window ID
		((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].get("Window ID").then(function(windowId) {
		
			// Check if window ID exists
			if("Window ID" in windowId === true) {
			
				// Close window and catch errors
				((typeof chrome !== "undefined") ? chrome : browser)["windows"].remove(windowId["Window ID"]).catch(function(error) {
				
				});
			}
			
		// Catch errors
		}).catch(function(error) {
		
		});
	});
}*/

// Windows removed event
((typeof chrome !== "undefined") ? chrome : browser)["windows"]["onRemoved"].addListener(function() {

	// Get window ID
	((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].get("Window ID").then(function(windowId) {
	
		// Check if window ID exists
		if("Window ID" in windowId === true) {
		
			// Get windows
			((typeof chrome !== "undefined") ? chrome : browser)["windows"].getAll({
			
				// Window types
				"windowTypes": [
				
					// Normal
					"normal"
				]
				
			}).then(function(windows) {
			
				// Check if no more windows are open
				if(windows["length"] === 0) {
				
					// Close window and catch errors
					((typeof chrome !== "undefined") ? chrome : browser)["windows"].remove(windowId["Window ID"]).catch(function(error) {
					
					});
				}
				
			// Catch errors
			}).catch(function(errors) {
			
			});
		}
	
	// Catch errors
	}).catch(function(error) {
	
	});
});

// Action clicked event
((typeof chrome !== "undefined") ? chrome : browser)["action"]["onClicked"].addListener(function() {

	// Get window ID
	((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].get("Window ID").then(function(windowId) {
	
		// Check if window ID exists
		if("Window ID" in windowId === true) {
		
			// Get window
			((typeof chrome !== "undefined") ? chrome : browser)["windows"].get(windowId["Window ID"]).then(function(window) {
			
				// Check if window exists
				if(window !== NO_WINDOW) {
				
					// Update window
					((typeof chrome !== "undefined") ? chrome : browser)["windows"].update(windowId["Window ID"], {
					
						// Focused
						"focused": true
					
					// Catch errors
					}).catch(function(error) {
					
					});
				}
				
				// Otherwise
				else {
				
					// Create window
					((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
					
						// URL
						"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+"),
						
						// Type
						"type": "popup",
						
						// Focused
						"focused": true,
						
						// Height
						"height": POPUP_WINDOW_HEIGHT,
						
						// Width
						"width": POPUP_WINDOW_WIDTH
					
					}).then(function(window) {
					
						// Save window ID
						((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].set({
						
							// Window ID
							"Window ID": window["id"]
							
						// Catch errors
						}).catch(function(error) {
						
						});
						
					// Catch errors
					}).catch(function(error) {
					
					});
				}
			
			// Catch errors
			}).catch(function(error) {
			
				// Create window
				((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
				
					// URL
					"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+"),
					
					// Type
					"type": "popup",
					
					// Focused
					"focused": true,
					
					// Height
					"height": POPUP_WINDOW_HEIGHT,
					
					// Width
					"width": POPUP_WINDOW_WIDTH
				
				}).then(function(window) {
				
					// Save window ID
					((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].set({
					
						// Window ID
						"Window ID": window["id"]
						
					// Catch errors
					}).catch(function(error) {
					
					});
					
				// Catch errors
				}).catch(function(error) {
				
				});
			});
		}
		
		// Otherwise
		else {
		
			// Create window
			((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
			
				// URL
				"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+"),
				
				// Type
				"type": "popup",
				
				// Focused
				"focused": true,
				
				// Height
				"height": POPUP_WINDOW_HEIGHT,
				
				// Width
				"width": POPUP_WINDOW_WIDTH
			
			}).then(function(window) {
			
				// Save window ID
				((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].set({
				
					// Window ID
					"Window ID": window["id"]
					
				// Catch errors
				}).catch(function(error) {
				
				});
				
			// Catch errors
			}).catch(function(error) {
			
			});
		}
	
	// Catch errors
	}).catch(function(error) {
	
	});
});

// Runtime message event
((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onMessage"].addListener(function(request, sender, sendResponse) {

	// Check if sender is the content script
	if(sender["id"] === ((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["id"] && typeof request === "object" && request !== null && "Wallet Type" in request === true && "Network Type" in request === true && "Request" in request === true && "Index" in request === true) {
	
		// Check if wallet type is invalid
		if(WALLET_TYPES.indexOf(request["Wallet Type"]) === INDEX_NOT_FOUND) {
		
			// Send response
			sendResponse({
			
				// Response
				"Response": false,
				
				// Error
				"Error": INVALID_WALLET_TYPE_ERROR,
				
				// Index
				"Index": request["Index"]
			});
		}
		
		// Otherwise check if network type is invalid
		else if(NETWORK_TYPES[request["Wallet Type"]].indexOf(request["Network Type"]) === INDEX_NOT_FOUND) {
		
			// Send response
			sendResponse({
			
				// Response
				"Response": false,
				
				// Error
				"Error": INVALID_NETWORK_TYPE_ERROR,
				
				// Index
				"Index": request["Index"]
			});
		}
		
		// Otherwise
		else {
		
			// Check request
			switch(request["Request"]) {
			
				// Start transaction
				case "Start Transaction":
				
					// Check if recipient address isn't valid
					if("Recipient Address" in request === false || typeof request["Recipient Address"] !== "string" || request["Recipient Address"]["length"] === 0) {
					
						// Send response
						sendResponse({
						
							// Response
							"Response": false,
							
							// Error
							"Error": INVALID_RECIPIENT_ADDRESS_ERROR,
							
							// Index
							"Index": request["Index"]
						});
					}
					
					// Otherwise check if amount isn't valid
					else if("Amount" in request === false || (request["Amount"] !== NO_TRANSACTION_AMOUNT && (isNumberString(request["Amount"]) === false || getNumberStringPrecision(request["Amount"]) > Math.log10(VALUE_NUMBER_BASES[request["Wallet Type"]]) || parseFloat(removeTrailingZeros(request["Amount"])) < 1 / VALUE_NUMBER_BASES[request["Wallet Type"]]))) {
					
						// Send response
						sendResponse({
						
							// Response
							"Response": false,
							
							// Error
							"Error": INVALID_AMOUNT_ERROR,
							
							// Index
							"Index": request["Index"]
						});
					}
					
					// Otherwise check if message isn't valid
					else if("Message" in request === false || (request["Message"] !== NO_TRANSACTION_MESSAGE && typeof request["Message"] !== "string")) {
					
						// Send response
						sendResponse({
						
							// Response
							"Response": false,
							
							// Error
							"Error": INVALID_MESSAGE_ERROR,
							
							// Index
							"Index": request["Index"]
						});
					}
					
					// Otherwise
					else {
					
						// Start transaction
						startTransaction(request["Wallet Type"], request["Network Type"], request["Recipient Address"], request["Amount"], request["Message"]).then(function() {
						
							// Send response
							sendResponse({
							
								// Response
								"Response": true,
								
								// Index
								"Index": request["Index"]
							});
						
						// Catch errors
						}).catch(function(error) {
						
							// Send response
							sendResponse({
							
								// Response
								"Response": false,
								
								// Error
								"Error": error,
								
								// Index
								"Index": request["Index"]
							});
						});
						
						// Return true
						return true;
					}
					
					// Break
					break;
				
				// Default
				default:
				
					// Send response
					sendResponse({
					
						// Response
						"Response": false,
						
						// Error
						"Error": INVALID_REQUEST_ERROR,
						
						// Index
						"Index": request["Index"]
					});
					
					// Break
					break;
			}
		}
	}
});

// Context menus clicked event
((typeof chrome !== "undefined") ? chrome : browser)["contextMenus"]["onClicked"].addListener(function(info) {

	// Check menu item ID
	switch(info["menuItemId"]) {
	
		// Open in new tab ID
		case OPEN_IN_NEW_TAB_ID:
		
			// Create tab
			((typeof chrome !== "undefined") ? chrome : browser)["tabs"].create({
			
				// URL
				"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html")
			
			// Catch errors
			}).catch(function(error) {
			
			});
			
			// Break
			break;
		
		// Open in new window ID
		case OPEN_IN_NEW_WINDOW_ID:
		
			// Create window
			((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
			
				// URL
				"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html")
			
			// Catch errors
			}).catch(function(error) {
			
			});
			
			// Break
			break;
	}
});


// Supporting function implementation

// Add context menu items
function addContextMenuItems() {

	// Remove all context menu items
	((typeof chrome !== "undefined") ? chrome : browser)["contextMenus"].removeAll();
	
	// Create open in new tab context menu item
	((typeof chrome !== "undefined") ? chrome : browser)["contextMenus"].create({
	
		// ID
		"id": OPEN_IN_NEW_TAB_ID,
		
		// Contexts
		"contexts": [
		
			// Action
			"action"
		],
		
		// Title
		"title": sanitizeContextMenuTitle(((typeof chrome !== "undefined") ? chrome : browser)["i18n"].getMessage("openInNewTab"))
	});
	
	// Create open in new window context menu item
	((typeof chrome !== "undefined") ? chrome : browser)["contextMenus"].create({
	
		// ID
		"id": OPEN_IN_NEW_WINDOW_ID,
		
		// Contexts
		"contexts": [
		
			// Action
			"action"
		],
		
		// Title
		"title": sanitizeContextMenuTitle(((typeof chrome !== "undefined") ? chrome : browser)["i18n"].getMessage("openInNewWindow"))
	});
}

// Inject content script
function injectContentScript() {

	// Get all windows
	((typeof chrome !== "undefined") ? chrome : browser)["windows"].getAll({
	
		// Populate
		"populate": true
		
	}).then(function(windows) {
	
		// Go through all windows
		for(let i = 0; i < windows["length"]; ++i) {
		
			// Get window
			const window = windows[i];
			
			// Go through all window's tabs
			for(let j = 0; j < window["tabs"]["length"]; ++j) {
			
				// Get tab
				const tab = window["tabs"][j];
				
				// Execute script
				((typeof chrome !== "undefined") ? chrome : browser)["scripting"].executeScript({
				
					// Target
					"target": {
					
						// Tab ID
						"tabId": tab["id"],
						
						// All frames
						"allFrames": true
					},
					
					// Files
					"files": [
					
						// Content script
						"./content_script.js"
					]
				
				// Catch errors
				}).catch(function(error) {
				
				});
			}
		}
		
	// Catch errors
	}).catch(function(error) {
	
	});
}

// Is number string
function isNumberString(string) {

	// Check if string isn't a string
	if(typeof string !== "string") {
	
		// Return false
		return false;
	}
	
	// Return if string is a number string
	return NUMBER_STRING_PATTERN.test(string) === true;
}

// Remove trailing zeros
function removeTrailingZeros(string) {

	// Remove trailing zeros and ending decimal point from string
	string = string.replace(TRAILING_ZEROS_PATTERN, "$1").replace(ENDING_DECIMAL_POINT_PATTERN, "");
	
	// Check if string is invalid
	if(Number.isNaN(parseFloat(string)) === true) {
	
		// Return zero
		return "0";
	}
	
	// Otherwise
	else {
	
		// Return string
		return string;
	}
}

// Get number string precision
function getNumberStringPrecision(string) {

	// Remove trailing zeros from string
	string = removeTrailingZeros(string);
	
	// Check if string doesn't contains a fractional component
	const fractionIndex = string.indexOf(".");
	
	if(fractionIndex === INDEX_NOT_FOUND) {
	
		// Return zero
		return 0;
	}
	
	// Otherwise
	else {
	
		// Return number of fractional digits
		return string["length"] - (fractionIndex + "."["length"]);
	}
}

// Start transaction
function startTransaction(walletType, networkType, recipientAddress, amount, message) {

	// Return promise
	return new Promise(function(resolve, reject) {
	
		// Return getting window ID
		return ((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].get("Window ID").then(function(windowId) {
		
			// Check if window ID exists
			if("Window ID" in windowId === true) {
			
				// Return getting window
				return ((typeof chrome !== "undefined") ? chrome : browser)["windows"].get(windowId["Window ID"]).then(function(window) {
				
					// Check if window exists
					if(window !== NO_WINDOW) {
					
						// Return updating window
						return ((typeof chrome !== "undefined") ? chrome : browser)["windows"].update(windowId["Window ID"], {
						
							// Focused
							"focused": true
						
						}).then(function() {
						
							// Resolve
							resolve();
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject internal error error
							reject(INTERNAL_ERROR_ERROR);
						});
					}
					
					// Otherwise
					else {
					
						// Return creating window
						return ((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
						
							// URL
							"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Override Wallet Type").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(walletType).replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Override Network Type").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(networkType).replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Request").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("Start Transaction").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Recipient Address").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(recipientAddress).replace(/%20/ug, "+") + ((amount !== NO_TRANSACTION_AMOUNT) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Amount").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(amount).replace(/%20/ug, "+") : "") + ((message !== NO_TRANSACTION_MESSAGE) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Message").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(message).replace(/%20/ug, "+") : ""),
							
							// Type
							"type": "popup",
							
							// Focused
							"focused": true,
							
							// Height
							"height": POPUP_WINDOW_HEIGHT,
							
							// Width
							"width": POPUP_WINDOW_WIDTH
						
						}).then(function(window) {
						
							// Return saving window ID
							return ((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].set({
							
								// Window ID
								"Window ID": window["id"]
							
							}).then(function() {
							
								// Resolve
								resolve();
								
							// Catch errors
							}).catch(function(error) {
							
								// Reject internal error error
								reject(INTERNAL_ERROR_ERROR);
							});
							
						// Catch errors
						}).catch(function(error) {
						
							// Reject internal error error
							reject(INTERNAL_ERROR_ERROR);
						});
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Return creating window
					return ((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
					
						// URL
						"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Override Wallet Type").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(walletType).replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Override Network Type").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(networkType).replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Request").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("Start Transaction").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Recipient Address").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(recipientAddress).replace(/%20/ug, "+") + ((amount !== NO_TRANSACTION_AMOUNT) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Amount").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(amount).replace(/%20/ug, "+") : "") + ((message !== NO_TRANSACTION_MESSAGE) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Message").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(message).replace(/%20/ug, "+") : ""),
						
						// Type
						"type": "popup",
						
						// Focused
						"focused": true,
						
						// Height
						"height": POPUP_WINDOW_HEIGHT,
						
						// Width
						"width": POPUP_WINDOW_WIDTH
					
					}).then(function(window) {
					
						// Return saving window ID
						return ((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].set({
						
							// Window ID
							"Window ID": window["id"]
						
						}).then(function() {
						
							// Resolve
							resolve();
							
						// Catch errors
						}).catch(function(error) {
						
							// Reject internal error error
							reject(INTERNAL_ERROR_ERROR);
						});
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject internal error error
						reject(INTERNAL_ERROR_ERROR);
					});
				});
			}
			
			// Otherwise
			else {
			
				// Return creating window
				return ((typeof chrome !== "undefined") ? chrome : browser)["windows"].create({
				
					// URL
					"url": ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Override Wallet Type").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(walletType).replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Override Network Type").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(networkType).replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Request").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("Start Transaction").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Recipient Address").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(recipientAddress).replace(/%20/ug, "+") + ((amount !== NO_TRANSACTION_AMOUNT) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Amount").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(amount).replace(/%20/ug, "+") : "") + ((message !== NO_TRANSACTION_MESSAGE) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Message").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(message).replace(/%20/ug, "+") : ""),
					
					// Type
					"type": "popup",
					
					// Focused
					"focused": true,
					
					// Height
					"height": POPUP_WINDOW_HEIGHT,
					
					// Width
					"width": POPUP_WINDOW_WIDTH
				
				}).then(function(window) {
				
					// Return saving window ID
					return ((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].set({
					
						// Window ID
						"Window ID": window["id"]
					
					}).then(function() {
					
						// Resolve
						resolve();
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject internal error error
						reject(INTERNAL_ERROR_ERROR);
					});
					
				// Catch errors
				}).catch(function(error) {
				
					// Reject internal error error
					reject(INTERNAL_ERROR_ERROR);
				});
			}
		
		// Catch errors
		}).catch(function(error) {
		
			// Reject internal error error
			reject(INTERNAL_ERROR_ERROR);
		});
	});
}

// Sanitize context menu title
function sanitizeContextMenuTitle(title) {

	// Return escaped title if non-Chrome otherwise return escaped title with all but the first letter changed to lower case
	return (typeof browser !== "undefined") ? title.replace(/\$/gu, "$$$") : ([...title][0] + [...title].slice(1).join("").toLocaleLowerCase(chrome["i18n"].getUILanguage())).replace(/\$/gu, "$$$");
}
