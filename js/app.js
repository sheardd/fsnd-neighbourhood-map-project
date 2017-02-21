var jQueryTimeout = setTimeout(function() {
	var error = "There was a problem loading jQuery. Please check your " +
		"internet connection and try again.";
	var errorElem = document.createTextNode(error);
	document.body.prepend(errorElem);
}, 8000);

var googleTimeout = setTimeout(function() {
	var errorMsg = "There was a problem loading Google Maps. Please " +
		"check your internet connection and try again";
	$('#map').text(errorMsg);
}, 8000);

$(function() {
	clearTimeout(jQueryTimeout);
});

var gMapsInit = function() {
	clearTimeout(googleTimeout);
	GoogleVM.init();
};

ko.applyBindings( VM );