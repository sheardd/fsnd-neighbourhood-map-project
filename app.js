var map;

var gMapsInit = function() {
	var truro = new google.maps.LatLng(50.263197, -5.051041);
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: truro,
		mapTypeId: 'terrain'
	});

	var infowindowArray = [];
	for (var i = 0; i < locModel.length; i++) {
		var coords = locModel[i].coords;
		var latLng = new google.maps.LatLng(coords[0],coords[1]);
		map.center = latLng;
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			title: locModel[i].name,
			infowindow: newInfoWindow(locModel[i]),
		});
		marker.set("type", "point");
		marker.set("id", "marker-" + i);
		marker.addListener('click', (function(savedMarker) {
			return function() {
				savedMarker.infowindow.open(map, savedMarker);
			};
		})(marker));
		$('body').not('#' + marker.id).click((function(savedMarker) {
			return function (){
				savedMarker.infowindow.close();
			};
		})(marker));
	};

	map.center = truro;
};

function newInfoWindow(place) {
	var infowindow = new google.maps.InfoWindow({
		content: "<h4>" + place.name + "</h4>" // can we mod this line to outsource to another func and load more info? REVIEW FOR THIRD-PARTY API
	});
	return infowindow;
}


var locModel = [
	{
		name: "Chantek",
		address: "",
		coords: [50.263786, -5.048547],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: 'Restaurant',
		keywords: ['Asian']
	},
	{
		name: "Habanero's Burrito Bar",
		address: "",
		coords: [50.262962, -5.055009],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: 'Restaurant',
		keywords: ['Mexican', 'Fast Food', 'Street Food']
	},
	{
		name: "Sonder Cafe Bar",
		address: "",
		coords: [50.263139, -5.049306],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: 'Restaurant',
		keywords: ['Bar & Grill']
	},
	{
		name: "Pierro's Pizzeria",
		address: "",
		coords: [50.263132, -5.054528],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: 'Restaurant',
		keywords: ['Italian']
	},
	{
		name: "Mustard and Rye",
		address: "",
		coords: [50.262301, -5.054735],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: 'Restaurant',
		keywords: ['Bar & Grill', 'BBQ', 'Burger']
	},
	{
		name: "Hubbox",
		address: "",
		coords: [50.263206, -5.054040],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: 'Restaurant',
		keywords: ['Burger', 'Bar & Grill']
	}
];

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
	this.description = ko.observable(data.description);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAlt = ko.observable(data.imgAlt);
	this.type = ko.observable(data.type);
	this.keywords = ko.observableArray(data.keywords);
}

var ViewModel = function() {
	// initialisation
	var self = this;
	this.initLocations = ko.observableArray([]);
	locModel.forEach(function(locItem) {
		self.initLocations.push( new Location(locItem) );
	});
	// define currentLoc and the function to set it
	this.currentLoc = ko.observable();
	this.fetchLoc = function() {
		self.currentLoc(this);
	};
	// filter by text input
	this.textFilterInput = ko.observable("");
	this.formatTextInput = function(filterString) {
		var filterArray = filterString.split(","); // filter on commas first to give us keyword phrases
		filterArray.forEach(function(phrase) { // tidy up our keyword phrases to filter on
			phrase = phrase.trim();
		});
		return filterArray;
	};
	// Our filter function used by both filter processes
	this.filter = function(property, locArray, filterArray) {
		var results = [];

		locArray.forEach(function(location) {
			console.log("location.type: " + location.type()); // LEAVE THIS IN
			console.log("location.keywords: " + location.keywords()); // LEAVE THIS IN
			filterArray.forEach(function(filter) {
				if (property === 'type') {
					if (location.type().includes(filter)) {
						results.push(location);
						return; // NOT SURE ABOUT THESE - BREAK RETURNS "ILLEGAL BREAK STATEMENT"
					};
				} else {
					if ($.inArray(filter, location.keywords())) { // ALL TEXT INPUT PASSES THIS CHECK
						results.push(location);
						return; // SEE ABOVE
					};
				};
			});
		});
		console.log(results);
		return results;
	};
	// Call and combine our two filters, to be bound to html
	this.filteredLocations = ko.computed(function(){
		if (self.textFilterInput() !== "") {
			var filterArray = self.formatTextInput(self.textFilterInput());
			return self.filter('keywords', self.initLocations(), filterArray);
		} else {
			return self.initLocations();
		};
	}, this);
};

ko.applyBindings( new ViewModel() );