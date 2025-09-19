// Use strict
"use strict";


// Main function

// Try
try {

	// Check if api doesn't already exist
	if(typeof api === "undefined") {
	
		// Create API
		var api = document.createElement("script");
		
		// Load API
		api["src"] = ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./api.js");
		
		// Configure API
		api.setAttribute("data-src", ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./api.js"));
		
		// API load event
		api.addEventListener("load", function(event) {
		
			// Prevent default and stop propagation
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			
			// Remove API
			api.remove();
			
		}, true);
		
		// Add API to site
		document["head"].appendChild(api);
		
		// Message event
		window.addEventListener("message", getResponse);
	}
}

// Catch errors
catch(error) {

}


// Supporting function implementation

// Get response
function getResponse(event) {

	// Try
	try {
	
		// Check if sender is the API
		if(event["origin"] === location["origin"] && typeof event["data"] === "object" && event["data"] !== null && "Extension ID" in event["data"] === true && event["data"]["Extension ID"] === (new URL(((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./api.js")))["hostname"] && "Wallet Type" in event["data"] === true && "Network Type" in event["data"] === true && "Request" in event["data"] === true && "Index" in event["data"] === true) {
		
			// Send request to the service worker and application
			((typeof chrome !== "undefined") ? chrome : browser)["runtime"].sendMessage(event["data"]).then(function(response) {
			
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
