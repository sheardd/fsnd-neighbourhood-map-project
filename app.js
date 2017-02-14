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
		categories: [
			{
				type: 'Restaurant',
				keywords: ['Asian']
			}
		]
	},
	{
		name: "Habanero's Burrito Bar",
		address: "",
		coords: [50.262962, -5.055009],
		description: "",
		imgSrc: "",
		imgAlt: "",
		categories: [
			{
				type: 'Restaurant',
				keywords: ['Mexican', 'Fast Food', 'Street Food']
			}
		]
	},
	{
		name: "Sonder Cafe Bar",
		address: "",
		coords: [50.263139, -5.049306],
		description: "",
		imgSrc: "",
		imgAlt: "",
		categories: [
			{
				type: 'Restaurant',
				keywords: ['Bar & Grill']
			}
		]
	},
	{
		name: "Pierro's Pizzeria",
		address: "",
		coords: [50.263132, -5.054528],
		description: "",
		imgSrc: "",
		imgAlt: "",
		categories: [
			{
				type: 'Restaurant',
				keywords: ['Italian']
			}
		]
	},
	{
		name: "Mustard and Rye",
		address: "",
		coords: [50.262301, -5.054735],
		description: "",
		imgSrc: "",
		imgAlt: "",
		categories: [
			{
				type: 'Restaurant',
				keywords: ['Bar & Grill', 'BBQ', 'Burger']
			}
		]
	},
	{
		name: "Hubbox",
		address: "",
		coords: [50.263206, -5.054040],
		description: "",
		imgSrc: "",
		imgAlt: "",
		categories: [
			{
				type: 'Restaurant',
				keywords: ['Burger', 'Bar & Grill']
			}
		]
	}
];

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
	this.description = ko.observable(data.description);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAlt = ko.observable(data.imgAlt);
}

var ViewModel = function() {
	var self = this;
	this.locations = ko.observableArray([]);
	locModel.forEach(function(locItem) {
		self.locations.push( new Location(locItem) );
	});
	this.currentLoc = ko.observable();
	this.fetchLoc = function() {
		self.currentLoc(this);
	};
	this.textFilterInput = ko.observable("");
	this.filteredLocations = ko.computed(function(){
		var 
		return;
	}, this);
	this.filterByTextInput = function(filterString) {
		var filterArray = filterString.split(","); // filter on commas first to give us keyword phrases
		if (!filterArray.prototype.trim) { // trim() workaround for older browsers, courtesy of developer.mozilla.org
			filterArray.prototype.trim = function () {
				return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			};
		};
		filterArray.forEach(function(phrase) { // tidy up our keyword phrases to filter on
			phrase = phrase.trim();
		});
		self.filter('keywords', filterArray);
	};
	this.filter = function(property, locArray, filters) {
		var results = [];
		locArray.forEach(function(location) {
				filters.forEach(function(filter) {
					console.log(location.property); // just checks we're getting property's value not its key
					if typeof location.property === 'string' {
						if location.property.includes(filter) {
							results.push(location);
							break;
						};
					} else {
						if $.inArray(filter, location.property) {
							results.push(location);
							break;
						};
					};
				});
		return results;
	};
};

ko.applyBindings( new ViewModel() );