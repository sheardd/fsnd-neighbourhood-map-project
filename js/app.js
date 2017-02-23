// Simple error handling for jQuery: appends an error message to the top
// of the page if jQuery cannot be loaded.

var jQueryError = function() {
	var error = "There was a problem loading jQuery. Please check your " +
		"internet connection and try again.";
	var errorElem = document.createTextNode(error);
	document.body.prepend(errorElem);
};

// Callback function for Google Maps API: a simple wrapper function that calls
// the GoogleVM's init() function.

var gMapsInit = function() {
	GoogleVM.init();
};

// Error handling for Google Maps API: a simple error message that will be
// appended to the map div if gMapsError is called if the Google Maps API
// script cannot be loaded

var gMapsError = function() {
	var errorMsg = "There was a problem loading Google Maps. Please " +
		"check your internet connection and try again";
	$('#map').text(errorMsg);
};