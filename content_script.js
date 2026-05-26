// Use strict
"use strict";


// Main function

// Try
try {

	// Check if API doesn't already exist
	if(typeof api === "undefined") {
	
		// Create API
		var api = document.createElement("script");
		
		// Runtime message event
		((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onMessage"].addListener(removeApi);
		
		// Get enable website API
		const currentApi = api;
		((typeof chrome !== "undefined") ? chrome : browser)["storage"]["local"].get("Enable Website API").then(function(enableWebsiteApi) {
		
			// Check if API didn't change
			if(api === currentApi) {
			
				// Try
				try {
				
					// Check if enable website API doesn't exist or is true
					if("Enable Website API" in enableWebsiteApi === false || enableWebsiteApi["Enable Website API"] === true) {
					
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
							this.remove();
							
						}, true);
						
						// API error event
						api.addEventListener("error", function(event) {
						
							// Prevent default and stop propagation
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							
							// Remove API
							this.remove();
							
						}, true);
						
						// Add API to site
						document["documentElement"].prepend(api);
						
						// Message event
						window.addEventListener("message", getResponse);
					}
					
					// Otherwise
					else {
					
						// Turn off runtime message event
						((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onMessage"].removeListener(removeApi);
						
						// Set that API doesn't exist
						api = undefined;
					}
				}
				
				// Catch errors
				catch(error) {
				
					// Turn off runtime message event
					((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onMessage"].removeListener(removeApi);
					
					// Set that API doesn't exist
					api = undefined;
				}
			}
			
		// Catch errors
		}).catch(function(error) {
		
			// Check if API didn't change
			if(api === currentApi) {
			
				// Turn off runtime message event
				((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onMessage"].removeListener(removeApi);
				
				// Set that API doesn't exist
				api = undefined;
			}
		});
	}
}

// Catch errors
catch(error) {

}


// Supporting function implementation

// Remove API
function removeApi() {

	// Try
	try {
	
		// Turn off runtime message event
		((typeof chrome !== "undefined") ? chrome : browser)["runtime"]["onMessage"].removeListener(removeApi);
		
		// Check if API exists and it was added to site
		if(typeof api !== "undefined" && api["src"]["length"] !== 0) {
		
			// Create script
			const script = document.createElement("script");
			
			// Load script
			script["src"] = ((typeof chrome !== "undefined") ? chrome : browser)["runtime"].getURL("./remove_api.js");
			
			// Script load event
			script.addEventListener("load", function(event) {
			
				// Prevent default and stop propagation
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				
				// Remove script
				this.remove();
				
			}, true);
			
			// Script error event
			script.addEventListener("error", function(event) {
			
				// Prevent default and stop propagation
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				
				// Remove script
				this.remove();
				
			}, true);
			
			// Add script to site
			document["documentElement"].prepend(script);
			
			// Turn off message event
			window.removeEventListener("message", getResponse);
		}
		
		// Set that API doesn't exist
		api = undefined;
	}
	
	// Catch errors
	catch(error) {
	
	}
}

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
