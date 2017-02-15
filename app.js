var map;
var gMapsMarkers = [];
var gMapsInit = function() {
	var truro = new google.maps.LatLng(50.263197, -5.051041);
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: truro,
		mapTypeId: 'terrain'
	});

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
		google.maps.InfoWindow.prototype.opened = false;
		marker.set("type", "point");
		marker.set("id", "marker-" + locModel[i].id);
		marker.addListener('click', (function(savedMarker) {
			if (!savedMarker.infowindow.opened) {
				return function() {
					savedMarker.infowindow.opened = true;
					savedMarker.infowindow.open(map, savedMarker);
				};
			};
		})(marker));
		$('body').not('#' + marker.id).click((function(savedMarker) {
			return function (){
				savedMarker.infowindow.opened = false;
				savedMarker.infowindow.close();
			};
		})(marker));
		gMapsMarkers.push(marker);
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
		type: "Restaurant",
		keywords: ['ASIAN'],
		id: 1
	},
	{
		name: "Habanero's Burrito Bar",
		address: "",
		coords: [50.262962, -5.055009],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: "Restaurant",
		keywords: ['MEXICAN', 'FAST FOOD', 'STREET FOOD'],
		id: 2
	},
	{
		name: "Sonder Cafe Bar",
		address: "",
		coords: [50.263139, -5.049306],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: "Restaurant",
		keywords: ['BAR & GRILL'],
		id: 3
	},
	{
		name: "Pierro's Pizzeria",
		address: "",
		coords: [50.263132, -5.054528],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: "Restaurant",
		keywords: ['ITALIAN'],
		id: 4
	},
	{
		name: "Mustard and Rye",
		address: "",
		coords: [50.262301, -5.054735],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: "Restaurant",
		keywords: ['BAR & GRILL', 'BBQ', 'BURGER'],
		id: 5
	},
	{
		name: "Hubbox",
		address: "",
		coords: [50.263206, -5.054040],
		description: "",
		imgSrc: "",
		imgAlt: "",
		type: "Restaurant",
		keywords: ['BURGER', 'BAR & GRILL'],
		id: 6
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
	this.id = ko.observable(data.id);
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
		var output = [];
		var filterArray = filterString.split(","); // filter on commas first to give us keyword phrases
		filterArray.forEach(function(phrase) { // tidy up our keyword phrases to filter on
			phrase = phrase.trim()
			phrase = phrase.toUpperCase();
			output.push(phrase);
		});
		return output;
	};
	// filter by checkbox input
	this.checkboxFilterInput = ko.observableArray([]);
	// Our filter function used by both filter processes
	this.filter = function(property, locArray, filterArray) {
		var results = [];

		locArray.forEach(function(location) {
			var marker = gMapsMarkers[location.id() - 1];
			filterArray.forEach(function(filter) {
				if (property === 'type') {
					if (filter === location.type()) {
						results.push(location);
						return;
					} else {
						marker.setVisible(false);
						return;
					};
				} else {
					if ($.inArray(filter, location.keywords()) > -1 ) {
						results.push(location);
						return;
					} else {
						marker.setVisible(false);
						return;
					};
				};
			});
		});
		return results;
	};
	// Start with full results (either way), and if filters are given, refine
	// results first on broad type, then specific keywords
	this.filteredLocations = ko.computed(function(){
		var results = self.initLocations();
		gMapsMarkers.forEach(function(marker) {
			marker.setVisible(true);
		});
		if (self.checkboxFilterInput().length > 0) {
			// if there are checkbox filters, refine our results variable using them
			results = self.filter('type', results, self.checkboxFilterInput());
		};
		if (self.textFilterInput() !== "") {
			// if there are keyword filters, refine our results variable using them
			var textFilterArray = self.formatTextInput(self.textFilterInput());
			results = self.filter('keywords', results, textFilterArray);
		};
		// return our results 
		return results;
	}, this);
};

ko.applyBindings( new ViewModel() );