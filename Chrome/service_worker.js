// Use strict
"use strict";


// Constants

// No transaction amount
const NO_TRANSACTION_AMOUNT = null;

// No transaction message
const NO_TRANSACTION_MESSAGE = null;

// Number string pattern
const NUMBER_STRING_PATTERN = /^[+-]?(?:0(?:\.\d+)?|[1-9]\d*(?:\.\d+)?|\.\d+)$/u;

// Value number base
const VALUE_NUMBER_BASE = 1E9;

// Maximum amount precision
const MAXIMUM_AMOUNT_PRECISION = Math.log10(VALUE_NUMBER_BASE);

// Minimum amount
const MINIMUM_AMOUNT = 1 / VALUE_NUMBER_BASE;

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

// Invalid request error
const INVALID_REQUEST_ERROR = 2;

// Invalid recipient address error
const INVALID_RECIPIENT_ADDRESS_ERROR = 3;

// Invalid amount error
const INVALID_AMOUNT_ERROR = 4;

// Invalid message error
const INVALID_MESSAGE_ERROR = 5;

// Open in new tab ID
const OPEN_IN_NEW_TAB_ID = "OPEN_IN_NEW_TAB_ID";

// Open in new window ID
const OPEN_IN_NEW_WINDOW_ID = "OPEN_IN_NEW_WINDOW_ID";


// Events

// Startup event
chrome["runtime"]["onStartup"].addListener(function() {

	// Clear window ID
	chrome["storage"]["local"].remove("Window ID");
	
	// Add context menu items
	addContextMenuItems();
});

// Installed event
chrome["runtime"]["onInstalled"].addListener(function() {
	
	// Clear window ID
	chrome["storage"]["local"].remove("Window ID");
	
	// Add context menu items
	addContextMenuItems();
	
	// Get all windows
	chrome["windows"].getAll({
	
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
				chrome["scripting"].executeScript({
				
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
});

// Removed event
chrome["windows"]["onRemoved"].addListener(function() {

	// Get window ID
	chrome["storage"]["local"].get("Window ID").then(function(windowId) {
	
		// Check if window ID exists
		if("Window ID" in windowId === true) {
		
			// Get windows
			chrome["windows"].getAll({
			
				// Window types
				"windowTypes": [
				
					// Normal
					"normal"
				]
				
			}).then(function(windows) {
			
				// Check if no more windows are open
				if(windows["length"] === 0) {
			
					// Close window and catch errors
					chrome["windows"].remove(windowId["Window ID"]).catch(function(error) {
					
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

// Clicked event
chrome["action"]["onClicked"].addListener(function() {

	// Get window ID
	chrome["storage"]["local"].get("Window ID").then(function(windowId) {
	
		// Check if window ID exists
		if("Window ID" in windowId === true) {
		
			// Get window
			chrome["windows"].get(windowId["Window ID"]).then(function(window) {
			
				// Check if window exists
				if(window !== NO_WINDOW) {
			
					// Update window
					chrome["windows"].update(windowId["Window ID"], {
					
						// Focused
						"focused": true
					
					// Catch errors
					}).catch(function(error) {
					
					});
				}
				
				// Otherwise
				else {
				
					// Create window
					chrome["windows"].create({
					
						// URL
						"url": chrome["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+"),
						
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
						chrome["storage"]["local"].set({
						
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
				chrome["windows"].create({
				
					// URL
					"url": chrome["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+"),
					
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
					chrome["storage"]["local"].set({
					
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
			chrome["windows"].create({
			
				// URL
				"url": chrome["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+"),
				
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
				chrome["storage"]["local"].set({
				
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

// Message event
chrome["runtime"]["onMessage"].addListener(function(request, sender, sendResponse) {

	// Check if sender is the content script
	if(sender["id"] === chrome["runtime"]["id"] && typeof request === "object" && request !== null && "Request" in request === true && "Index" in request === true) {
	
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
				else if("Amount" in request === false || (request["Amount"] !== NO_TRANSACTION_AMOUNT && (isNumberString(request["Amount"]) === false || getNumberStringPrecision(request["Amount"]) > MAXIMUM_AMOUNT_PRECISION || parseFloat(removeTrailingZeros(request["Amount"])) < MINIMUM_AMOUNT))) {
				
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
					startTransaction(request["Recipient Address"], request["Amount"], request["Message"]).then(function() {
					
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
});

// Context menu click event
chrome["contextMenus"]["onClicked"].addListener(function(info) {

	// Check menu item ID
	switch(info["menuItemId"]) {
	
		// Open in new tab ID
		case OPEN_IN_NEW_TAB_ID:

			// Create tab
			chrome["tabs"].create({
			
				// URL
				"url": chrome["runtime"].getURL("./index.html")
			
			// Catch errors
			}).catch(function(error) {
			
			});
			
			// Break
			break;
		
		// Open in new window ID
		case OPEN_IN_NEW_WINDOW_ID:
		
			// Create window
			chrome["windows"].create({
			
				// URL
				"url": chrome["runtime"].getURL("./index.html")
			
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
	chrome["contextMenus"].removeAll();

	// Create open in new tab context menu item
	chrome["contextMenus"].create({
	
		// ID
		"id": OPEN_IN_NEW_TAB_ID,
	
		// Contexts
		"contexts": [
		
			// Action
			"action"
		],
		
		// Title
		"title": chrome["i18n"].getMessage("openInNewTab").replace(/\$/gu, "$$$")
	});
	
	// Create open in new window context menu item
	chrome["contextMenus"].create({
	
		// ID
		"id": OPEN_IN_NEW_WINDOW_ID,
	
		// Contexts
		"contexts": [
		
			// Action
			"action"
		],
		
		// Title
		"title": chrome["i18n"].getMessage("openInNewWindow").replace(/\$/gu, "$$$")
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
function startTransaction(recipientAddress, amount, message) {

	// Return promise
	return new Promise(function(resolve, reject) {

		// Return getting window ID
		return chrome["storage"]["local"].get("Window ID").then(function(windowId) {
		
			// Check if window ID exists
			if("Window ID" in windowId === true) {
			
				// Return getting window
				return chrome["windows"].get(windowId["Window ID"]).then(function(window) {
				
					// Check if window exists
					if(window !== NO_WINDOW) {
				
						// Return updating window
						return chrome["windows"].update(windowId["Window ID"], {
						
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
						return chrome["windows"].create({
						
							// URL
							"url": chrome["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Request").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("Start Transaction").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Recipient Address").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(recipientAddress).replace(/%20/ug, "+") + ((amount !== NO_TRANSACTION_AMOUNT) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Amount").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(amount).replace(/%20/ug, "+") : "") + ((message !== NO_TRANSACTION_MESSAGE) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Message").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(message).replace(/%20/ug, "+") : ""),
							
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
							return chrome["storage"]["local"].set({
							
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
					return chrome["windows"].create({
					
						// URL
						"url": chrome["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Request").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("Start Transaction").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Recipient Address").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(recipientAddress).replace(/%20/ug, "+") + ((amount !== NO_TRANSACTION_AMOUNT) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Amount").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(amount).replace(/%20/ug, "+") : "") + ((message !== NO_TRANSACTION_MESSAGE) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Message").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(message).replace(/%20/ug, "+") : ""),
						
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
						return chrome["storage"]["local"].set({
						
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
				return chrome["windows"].create({
				
					// URL
					"url": chrome["runtime"].getURL("./index.html") + URL_QUERY_STRING_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Request").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("Start Transaction").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Recipient Address").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(recipientAddress).replace(/%20/ug, "+") + ((amount !== NO_TRANSACTION_AMOUNT) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Amount").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(amount).replace(/%20/ug, "+") : "") + ((message !== NO_TRANSACTION_MESSAGE) ? URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Message").replace(/%20/ug, "+") + URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(message).replace(/%20/ug, "+") : ""),
					
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
					return chrome["storage"]["local"].set({
					
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
