// Use strict
"use strict";


// Events

// Message event
window.addEventListener("message", getResponse);


// Main function

// Create API
const api = document.createElement("script");

// Load API
api["src"] = browser["runtime"].getURL("./api.js");

// Add API to site
document["head"].appendChild(api);


// Supporting function implementation

// Get response
function getResponse(event) {

	// Try
	try {

		// Check if sender is the API
		if(event["origin"] === location["origin"] && typeof event["data"] === "object" && event["data"] !== null && "Extension ID" in event["data"] === true && event["data"]["Extension ID"] === (new URL(browser["runtime"].getURL("./api.js")))["hostname"] && "Wallet Type" in event["data"] === true && "Network Type" in event["data"] === true && "Request" in event["data"] === true && "Index" in event["data"] === true) {
		
			// Send request to the service worker and application
			browser["runtime"].sendMessage(event["data"]).then(function(response) {
			
				// Send response to the API
				event["source"].postMessage(response, event["origin"]);
			
			// Catch errors
			}).catch(function(error) {
			
				// Send response to the API
				event["source"].postMessage({
				
					// Response
					"Response": false,
					
					// Index
					"Index": event["data"]["Index"]
					
				}, event["origin"]);
			});
		}
	}
	
	// Catch errors
	catch(error) {
	
		// Turn off message event
		window.removeEventListener("message", getResponse);
	}
}
