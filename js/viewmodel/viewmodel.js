// Used to create our location objects, by assigning model data to observables
// that we can present on the page through our data bindings

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
	this.coords = ko.observable(data.coords);
	this.description = ko.observable(data.description);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAlt = ko.observable(data.imgAlt);
	this.type = ko.observable(data.type);
	this.keywords = ko.observableArray(data.keywords);
	this.id = ko.observable(data.id);
	this.api = ko.observable(data.api);
	this.endpoint = ko.observable(data.endpoint);
};

// The ViewModel is the nerve center of our application; it creates all the
// observables we need to render data dynamically on the page. It then uses
// these observables to filter which ones should be rendered based on their
// type and the given keywords. Specific detail of each stage is given by the
// relevant helper functions.

var ViewModel = function() {
	// SETUP
	// assign self to this for later reference, initialise our baseline
	// initLocations array, and populate it with location objects with
	// observable properties. This will be returned as our default result if
	// there are no filters to be applied to it by our filteredLocations
	// observable.

	var self = this;
	this.initLocations = ko.observableArray([]);
	locModel.locations.forEach(function(locItem) {
		self.initLocations.push( new Location(locItem) );
	});

	this.toggleNav = function() {
		var overlay = $('#overlay');
		if (overlay.hasClass('show-nav')) {
			overlay.removeClass('show-nav');
			overlay.addClass('hide-nav');
		} else {
			overlay.removeClass('hide-nav');
			overlay.addClass('show-nav');
		};
	};

	// FILTERS
	// Create our textFilterInput variable, that will be updated by keypress
	// from our input box, and used to apply keyword filters. the
	// formatTextInput will be called as part of filteredLocations to
	// standardise text input for accurate comparison against location keywords.
	// It takes in the given string of text input, splits it into an array
	// based on commas, which it then iterates over to remove commas and convert
	// to uppercase, before returning the formatted array.

	this.textFilterInput = ko.observable("");
	this.formatTextInput = function(filterString) {
		var output = [];
		var filterArray = filterString.split(",");
		filterArray.forEach(function(phrase) {
			phrase = phrase.trim()
			phrase = phrase.replace(",", "");
			phrase = phrase.toUpperCase();
			output.push(phrase);
		});
		return output;
	};

	// Our variable for storing checked checkbox values; this shouldn't need
	// formatting in the same way as above, since these values are hardcoded
	// and preformatted.

	this.checkboxFilterInput = ko.observableArray([]);

	// Our main filtering function. It takes a string denoting the location
	// property on which to filter, an array of locations to check, and an
	// array of filter terms on which to base our filtering. We begin with an 
	// empty results array, to which we add matched locations. We then hide
	// all markers To get matches,
	// we loop over the locations, checking through all of our given filters on
	// each one (checking before doing so whether the filters pertain to type
	// or location keywords such as cuisine). In the case of keywords, we
	// check if the filter is included inside of the location's (allowing us
	// to return results even if the user only types in part of a word),
	// whereas type simply checks for an identical match. Then returns the
	// matches to filteredLocations.
	this.filter = function(property, locArray, filterArray) {
		var results = [];
		locArray.forEach(function(location) {
			var marker = locModel.markers[location.id() - 1];
			filterArray.forEach(function(filter) {
				if (property === 'type') {
					if (filter === location.type()) {
						results.push(location);
						return;
					};
				} else {
					location.keywords().forEach(function(keyword) {
						if (filter.length > 0 && keyword.includes(filter)) {
							results.push(location);
							return;
						};
					})
				};
			});
		});
		return results;
	};

	// Our primary observable for locations, the output of which is what
	// actually gets used in the view. Assigned as a computed variable,
	// beginning by hiding all markers and fetching an array of all given
	// locations. If either of our filter input observables hold values, call
	// filter on our results array and re-assign its value to the output. If no
	// matches are returned, call noMatches, and exit the function. Otherwise,
	// check our results array for unique values, and assign them to uniqueResults
	// to filter out duplicate results, then pass these uniqueResults to
	// GoogleVM to redisplay their markers. If no filters have been given, then
	// at this point uniqueResults will contain all original locations and all
	// markers will be displayed once again. We finally return uniqueResults,
	// which will then be displayed in the view using our data-bindings.

	this.filteredLocations = ko.computed(function(){
		var results = self.initLocations();
		GoogleVM.hideAllMarkers();
		if (self.checkboxFilterInput().length > 0) {
			results = self.filter('type', results, self.checkboxFilterInput());
		};
		if (self.textFilterInput() !== "") {
			var textFilterArray = self.formatTextInput(self.textFilterInput());
			results = self.filter('keywords', results, textFilterArray);
		};
		if (results.length === 0) {
			this.noMatches()
			return results;
		} else {
			var uniqueResults = results.reduce(function(filteredResults,result){
				if (filteredResults.indexOf(result) < 0 ) filteredResults.push(result);
				return filteredResults;
			},[]);
			GoogleVM.showMarkers(uniqueResults);
			return uniqueResults;
		};
	}, this);

	// this simply creates a one-off non-observable object to be passed to
	// currentLoc in the event that no results match criteria given when filtering.

	this.noMatches = function() {
		var noMatches = {
				"name": "No Matches",
				"address": "Looks like nothing matches that search",
				"imgSrc": "img/lost.jpg",
				"imgAlt": "Looks like nothing matches that search",
				"type": "",
				"keywords": [''],
				"id": 0,
			};
			self.currentLoc(noMatches);
	};

	// SET CURRENT LOCATION
	// Define currentLoc as an observable to bind to the view. To assign it,
	// we can either click on a location on our list in the view, or a marker
	// in the map. The former uses knockout's click binding to call it and pass,
	// in the location, while the marker uses an event listener to call it and
	// pass in the location assigned to it in the listener. Either way, we first
	// check to see if an api call has already been made for that location. If
	// it has, skip straight to calling GoogleVM.openInfoWindow() based on the
	// location's id. If not, pass the location to foursquareVM to populate the
	// location's InfoWindow and information with an AJAX call to foursquare, 
	// and then call openInfoWindow() now its data has been updated. Finally,
	// assign the location the currentLoc observable to update currentLoc in
	// the view.

	this.currentLoc = ko.observable();
	this.setCurrentLoc = function(location) {
		if (location.id !== 0 ) {
			if (!location.api()) {
				foursquareVM.call(location);
			};
			GoogleVM.panTo(location.id());
			GoogleVM.openInfoWindow(location.id());
		};
		self.currentLoc(location);
	};
};

// Create our ViewModel before assigning its bindings to knockout. This line is
// is super important, as without it none of our calls to ViewModel functions
// from GoogleVM will work (as ViewModel won't be created otherwise until its
// bindings are assigned in app.js).
var VM = new ViewModel();