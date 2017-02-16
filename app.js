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
		address: "15 New Bridge St, Truro TR1 2AA",
		coords: [50.263786, -5.048547],
		description: "Smart modern restaurant with courtyard and open kitchen, serving Thai and South-East Asian dishes.",
		imgSrc: "http://www.chantek.co.uk/images/pic01.jpg",
		imgAlt: "Smart modern restaurant with courtyard and open kitchen, serving Thai and South-East Asian dishes.",
		type: "Restaurant",
		keywords: ['ASIAN'],
		id: 1
	},
	{
		name: "Habanero's Burrito Bar",
		address: "11 Kenwyn St, Truro TR1 3DJ",
		coords: [50.262962, -5.055009],
		description: "Mexican restaurant in Truro, Cornwall",
		imgSrc: "http://www.enjoytruro.co.uk/assets/members/habaneros_burrito_bar_truro/thumbs/160x/image-3409.jpeg",
		imgAlt: "Mexican restaurant in Truro, Cornwall",
		type: "Restaurant",
		keywords: ['MEXICAN', 'FAST FOOD', 'STREET FOOD'],
		id: 2
	},
	{
		name: "Sonder Cafe Bar",
		address: "6 Prince's St, Truro TR1 2ES",
		coords: [50.263139, -5.049306],
		description: "Truro’s first and only independent craft beer bar. Amazing spirits and cocktails, bottled beers and a small selection of quality wine.",
		imgSrc: "http://www.enjoytruro.co.uk/assets/members/sonder_cafe_bar/thumbs/546x320/image-3716.jpeg",
		imgAlt: "Truro’s first and only independent craft beer bar. Amazing spirits and cocktails, bottled beers and a small selection of quality wine.",
		type: "Restaurant",
		keywords: ['BAR & GRILL'],
		id: 3
	},
	{
		name: "Pierro's Pizzeria",
		address: "Kenwyn Street, Truro, Cornwall TR1 3DJ",
		coords: [50.263132, -5.054528],
		description: "Traditional Italian Food in the heart of Truro",
		imgSrc: "https://www.eatoutcornwall.com/upload/images/gallery/company/5328/P1040237.JPG",
		imgAlt: "Traditional Italian Food in the heart of Truro",
		type: "Restaurant",
		keywords: ['ITALIAN'],
		id: 4
	},
	{
		name: "Mustard and Rye",
		address: "Chiltern House, Calenick St, Truro TR1 2SF",
		coords: [50.262301, -5.054735],
		description: "BBQ, steaks and shakes in sleek American-themed diner with yellow leather booths and vintage photos.",
		imgSrc: "http://www.stundumplings.co.uk/wp-content/uploads/2013/12/mustard-and-rye-restaurant-in-truro.jpg",
		imgAlt: "BBQ, steaks and shakes in sleek American-themed diner with yellow leather booths and vintage photos.",
		type: "Restaurant",
		keywords: ['BAR & GRILL', 'BBQ', 'BURGER'],
		id: 5
	},
	{
		name: "Hubbox",
		address: "116 Kenwyn St, Truro TR1 3DJ",
		coords: [50.263206, -5.054040],
		description: "BURGERS - DOGS - BEERS",
		imgSrc: "http://www.hub-stives.co.uk/assets/Truro_slider1.jpg",
		imgAlt: "BURGERS - DOGS - BEERS",
		type: "Restaurant",
		keywords: ['BURGER', 'BAR & GRILL'],
		id: 6
	},
	{
		name: "Truro Cathedral",
		address: "14 St Mary's St, Truro TR1 2AF",
		coords: [50.264117, -5.051248],
		description: "Victorian Gothic Revival CofE place of worship with a coffee shop and restaurant plus a gift shop.",
		imgSrc: "https://farm9.staticflickr.com/8481/8284579509_14952d397a_z.jpg",
		imgAlt: "Victorian Gothic Revival CofE place of worship with a coffee shop and restaurant plus a gift shop.",
		type: "Tourist Attraction",
		keywords: ['HERITAGE'],
		id: 7
	},
	{
		name: "Hall For Cornwall",
		address: "Back Quay, Truro TR1 2LL",
		coords: [50.262668, -5.050578],
		description: "Live music, drama, dance and comedy, including international touring productions, plus annual panto.",
		imgSrc: "http://www.cornishguardian.co.uk/images/localworld/ugc-images/276349/Article/images/27937333/11101566-large.jpg",
		imgAlt: "Live music, drama, dance and comedy, including international touring productions, plus annual panto.",
		type: "Tourist Attraction",
		keywords: ['ENTERTAINMENT'],
		id: 8
	},
	{
		name: "Plaza Cinema",
		address: "The Plaza, 69 Lemon St, Truro TR1 2PN",
		coords: [50.261991, -5.052413],
		description: "Blockbusters and more in an art deco-fronted building, plus live screenings via satellite.",
		imgSrc: "http://google.localdataimages.com/800_WM/2251/22510130.jpg",
		imgAlt: "Blockbusters and more in an art deco-fronted building, plus live screenings via satellite.",
		type: "Tourist Attraction",
		keywords: ['ENTERTAINMENT'],
		id: 9
	},
	{
		name: "Royal Cornwall Museum",
		address: "25 River St, Truro TR1 2SJ",
		coords: [50.263681, -5.054862],
		description: "Museum with minerals from around the globe and exhibits about the region's wildlife and history.",
		imgSrc: "https://static.artuk.org/_source/RCM_location_image_1.jpg",
		imgAlt: "Museum with minerals from around the globe and exhibits about the region's wildlife and history.",
		type: "Tourist Attraction",
		keywords: ['HERITAGE'],
		id: 10
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
		var filterArray = filterString.split(",");
		 // filter on commas first to give us keyword phrases
		filterArray.forEach(function(phrase) { // tidy up our keyword phrases to filter on
			phrase = phrase.trim()
			phrase = phrase.replace(",", "");
			phrase = phrase.toUpperCase();
			output.push(phrase);
		});
		console.log("output: ");
		console.log(output);
		return output;
	};
	// filter by checkbox input
	this.checkboxFilterInput = ko.observableArray([]);
	// Our filter function used by both filter processes
	this.filter = function(property, locArray, filterArray) {
		var results = [];
		gMapsMarkers.forEach(function(marker) {
			marker.setVisible(false);
		});
		locArray.forEach(function(location) {
			var marker = gMapsMarkers[location.id() - 1];
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
					};})
				};
			});
		});

		for (var i = 0; i < results.length; i++) {
			var locationId = results[i].id();
			for (var j = 0; j < gMapsMarkers.length; j++) {
				var marker = gMapsMarkers[j];
				var markerId = parseInt(marker.id.substr(7));
				if (locationId === markerId) {
					marker.setVisible(true);
				};
			};
		};
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
		if (results.length === 0) {
			results.push({
				name: "No Matches",
				address: "",
				coords: [],
				description: "Looks like nothing matches that search",
				imgSrc: "http://www.nurturingtruth.com/wp-content/uploads/2014/10/lost.jpg",
				imgAlt: "Looks like nothing matches that search",
				type: "",
				keywords: [''],
				id: 99
			});
		};
		// return our results 
		return results;
	}, this);
};

ko.applyBindings( new ViewModel() );