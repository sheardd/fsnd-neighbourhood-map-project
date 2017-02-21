// Simple error handling for jQuery: set a timeout to append an error message
// to the top of the page, which is cleared using the jQuery statement beneath.
// If jQuery fails to load, clearTimeout() cannot be run, so the error message
// should and will be loaded.

var jQueryTimeout = setTimeout(function() {
	var error = "There was a problem loading jQuery. Please check your " +
		"internet connection and try again.";
	var errorElem = document.createTextNode(error);
	document.body.prepend(errorElem);
}, 8000);

$(function() {
	clearTimeout(jQueryTimeout);
});

// Error handling for Google Maps API: set a timeout to append an error message
// to the map div, which will be cleared if the callback for google maps is
// called. If gMapsInit isn't called, google maps evidently didn't load, so the
// error message in the timeout should indeed be rendered.

var googleTimeout = setTimeout(function() {
	var errorMsg = "There was a problem loading Google Maps. Please " +
		"check your internet connection and try again";
	$('#map').text(errorMsg);
}, 8000);

var gMapsInit = function() {
	clearTimeout(googleTimeout);
	GoogleVM.init();
};

// Fire KnockoutJS!

ko.applyBindings( VM );