var map;

var gMapsInit = function() {
	var truro = new google.maps.LatLng(50.263197, -5.051041);
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: truro,
		mapTypeId: 'terrain'
	});
	google.maps.InfoWindow.prototype.opened = false;
	for (var i = 0; i < locModel.locations.length; i++) {
		createMarker(google, map, locModel.locations[i]);
	};
	map.center = truro;
};

function createMarker(google, map, location) {
	var coords = location.coords;
	var latLng = new google.maps.LatLng(coords[0],coords[1]);
	map.center = latLng;
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: location.name,
		infowindow: newInfoWindow(location),
	});
	marker.set("type", "point");
	marker.set("id", "marker-" + location.id);
	marker.addListener('click', (function(savedMarker) {
		if (!savedMarker.infowindow.opened) {
			return function() {
				if (location.api) {
					wikipediaVM.wikipedia(location.id);
				} else {
					openMarker(location.id);
				};
			};
		};
	})(marker));
	// $('#map').not('#' + marker.id).click((function(savedMarker) {
	// 	return function (){
	// 		savedMarker.infowindow.opened = false;
	// 		savedMarker.infowindow.close();
	// 	};
	// })(marker));
	locModel.markers.push(marker);
};

function newInfoWindow(location) {
	var infowindow = new google.maps.InfoWindow({
		content: "<h4>" + location.name + "</h4>" +
			"<p>" + location.description + "</p>"
	});
	return infowindow;
};

function openMarker(id) {
	var currentMarker = locModel.markers[id-1];
		locModel.markers.forEach(function(marker) {
			if (currentMarker === marker) {
				marker.infowindow.opened = true;
				marker.infowindow.open(map, marker);
			} else {
				marker.infowindow.opened = false;
				marker.infowindow.close();
			};
		})
};

var locModel = {
	"fetchCurrentLoc" : function() {
		return locModel.currentLoc;
	},
	"markers": [],
	"locations" : [
		{
			"name": "Chantek",
			"address": "15 New Bridge St, Truro TR1 2AA",
			"coords": [50.263786, -5.048547],
			"description": "Smart modern restaurant with courtyard and open kitchen, serving Thai and South-East Asian dishes.",
			"imgSrc": "img/chantek.jpg",
			"imgAlt": "Smart modern restaurant with courtyard and open kitchen, serving Thai and South-East Asian dishes.",
			"type": "Restaurant",
			"keywords": ["ASIAN"],
			"id": 1,
			"api": false,
			"hasWiki": false,
			"endpoint": "https://www.facebook.com/chantekrestaurant"
		},
		{
			"name": "Habanero's Burrito Bar",
			"address": "11 Kenwyn St, Truro TR1 3DJ",
			"coords": [50.262962, -5.055009],
			"description": "Mexican restaurant in Truro, Cornwall",
			"imgSrc": "img/habaneros.jpeg",
			"imgAlt": "Mexican restaurant in Truro, Cornwall",
			"type": "Restaurant",
			"keywords": ["MEXICAN", "FAST FOOD", "STREET FOOD"],
			"id": 2,
			"api": false,
			"hasWiki": false,
			"endpoint": "https://www.facebook.com/HabanerosTruro"
		},
		{
			"name": "Sonder Cafe Bar",
			"address": "6 Prince's St, Truro TR1 2ES",
			"coords": [50.263139, -5.049306],
			"description": "Truro's first and only independent craft beer bar. Amazing spirits and cocktails, bottled beers and a small selection of quality wine.",
			"imgSrc": "img/sonder.jpeg",
			"imgAlt": "Truro's first and only independent craft beer bar. Amazing spirits and cocktails, bottled beers and a small selection of quality wine.",
			"type": "Restaurant",
			"keywords": ["BAR & GRILL"],
			"id": 3,
			"api": false,
			"hasWiki": false,
			"endpoint": "https://www.facebook.com/SonderTruro"
		},
		{
			"name": "Pierro's Pizzeria",
			"address": "Kenwyn Street, Truro, Cornwall TR1 3DJ",
			"coords": [50.263132, -5.054528],
			"description": "Traditional Italian Food in the heart of Truro",
			"imgSrc": "img/pieros.JPG",
			"imgAlt": "Traditional Italian Food in the heart of Truro",
			"type": "Restaurant",
			"keywords": ["ITALIAN"],
			"id": 4,
			"api": false,
			"hasWiki": false,
			"endpoint": "https://www.facebook.com/pierostruro"
		},
		{
			"name": "Mustard and Rye",
			"address": "Chiltern House, Calenick St, Truro TR1 2SF",
			"coords": [50.262301, -5.054735],
			"description": "BBQ, steaks and shakes in sleek American-themed diner with yellow leather booths and vintage photos.",
			"imgSrc": "img/mustardandrye.jpg",
			"imgAlt": "BBQ, steaks and shakes in sleek American-themed diner with yellow leather booths and vintage photos.",
			"type": "Restaurant",
			"keywords": ["BAR & GRILL", "BBQ", "BURGER"],
			"id": 5,
			"api": false,
			"hasWiki": false,
			"endpoint": "https://www.facebook.com/MustardRye"
		},
		{
			"name": "Hubbox",
			"address": "116 Kenwyn St, Truro TR1 3DJ",
			"coords": [50.263206, -5.054040],
			"description": "BURGERS - DOGS - BEERS",
			"imgSrc": "img/hubbox.jpg",
			"imgAlt": "BURGERS - DOGS - BEERS",
			"type": "Restaurant",
			"keywords": ["BURGER", "BAR & GRILL"],
			"id": 6,
			"api": false,
			"hasWiki": false,
			"endpoint": "https://www.facebook.com/hubboxtruro"
		},
		{
			"name": "Truro Cathedral",
			"address": "14 St Mary's St, Truro TR1 2AF",
			"coords": [50.264117, -5.051248],
			"description": "",
			"imgSrc": "img/cathedral.jpg",
			"imgAlt": "Victorian Gothic Revival CofE place of worship with a coffee shop and restaurant plus a gift shop.",
			"type": "Tourist Attraction",
			"keywords": ["HERITAGE"],
			"id": 7,
			"api": true,
			"hasWiki": true,
			"endpoint": "Truro_Cathedral"
		},
		{
			"name": "Hall For Cornwall",
			"address": "Back Quay, Truro TR1 2LL",
			"coords": [50.262668, -5.050578],
			"description": "",
			"imgSrc": "img/hfc.jpg",
			"imgAlt": "Live music, drama, dance and comedy, including international touring productions, plus annual panto.",
			"type": "Tourist Attraction",
			"keywords": ["ENTERTAINMENT"],
			"id": 8,
			"api": true,
			"hasWiki": true,
			"endpoint": "Hall_for_Cornwall"
		},
		{
			"name": "Boscawen Park",
			"address": "Malpas Rd, Truro TR1 1UE",
			"coords": [50.252897, -5.040091],
			"description": "",
			"imgSrc": "img/boscawenpark.jpg",
			"imgAlt": "Park & Cricket Ground just outside Truro's city center.",
			"type": "Tourist Attraction",
			"keywords": ["HERITAGE"],
			"id": 9,
			"api": true,
			"hasWiki": true,
			"endpoint": "Boscawen_Park"
		},
		{
			"name": "Royal Cornwall Museum",
			"address": "25 River St, Truro TR1 2SJ",
			"coords": [50.263681, -5.054862],
			"description": "",
			"imgSrc": "img/rcm.jpg",
			"imgAlt": "Museum with minerals from around the globe and exhibits about the region's wildlife and history.",
			"type": "Tourist Attraction",
			"keywords": ["HERITAGE"],
			"id": 10,
			"api": true,
			"hasWiki": true,
			"endpoint": "Royal_Cornwall_Museum"
		}
	],	
};

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
	this.description = ko.observable(data.description);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAlt = ko.observable(data.imgAlt);
	this.type = ko.observable(data.type);
	this.keywords = ko.observableArray(data.keywords);
	this.id = ko.observable(data.id);
	this.api = ko.observable(data.api);
	this.hasWiki = ko.observable(data.hasWiki);
	this.endpoint = ko.observable(data.endpoint);
};

var ViewModel = function() {
	// initialisation
	var self = this;
	this.initLocations = ko.observableArray([]);
	locModel.locations.forEach(function(locItem) {
		self.initLocations.push( new Location(locItem) );
	});
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
		return output;
	};
	// filter by checkbox input
	this.checkboxFilterInput = ko.observableArray([]);
	// Our filter function used by both filter processes
	this.filter = function(property, locArray, filterArray) {
		var results = [];
		locModel.markers.forEach(function(marker) {
			marker.setVisible(false);
			marker.infowindow.close();
		});
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
					};})
				};
			});
		});

		for (var i = 0; i < results.length; i++) {
			var locationId = results[i].id();
			for (var j = 0; j < locModel.markers.length; j++) {
				var marker = locModel.markers[j];
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
		locModel.markers.forEach(function(marker) {
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
			var noMatches = {
				"name": "No Matches",
				"address": "",
				"coords": [],
				"description": "Looks like nothing matches that search",
				"imgSrc": "img/lost.jpg",
				"imgAlt": "Looks like nothing matches that search",
				"type": "",
				"keywords": [''],
				"id": 99,
				"api": "",
				"hasWiki": false,
				"endpoint": null
			};
			results.push(noMatches);
			self.currentLoc(noMatches);
			// FIGURE OUT HOW TO SET THIS TO CURRENTLOC WITHOUT REMOVING OBSERVABLES - MIGHT WORK AS IS?
		};
		// return our results 
		return results;
	}, this);
	// TripAdvisor BEGINS
	// define currentLoc and the function to set it
	this.currentLoc = ko.observable();
	this.setCurrentLoc = function() {
		// using currentLoc:
		// make API request
		// update currentLoc's api property (check that this updates the original observable as well)
		self.currentLoc(this);
		if (this.api()) {
			var wikipedia = wikipediaVM.wikipedia(this.id());
			this.api(false);
		} else { // REPEATED FROM MARKER CODE; OUTSOURCE
			openMarker(this.id());
		};
		// marker.infowindow.content = self.currentLoc().api();
		// marker.infowindow.opened = true;
		// marker.infowindow.open(map, marker); // CLICKING ON THE OVERLAY FIRES THE CLOSE EVENT; MAYBE TRY LIMITING THE ORIGINAL LISTENER TO JUST THE MAP, AND EXPLICITLY CLOSING ALL MARKERS HERE BEFORE REOPENING
		// locModel.currentLoc = this;
		// locModel.currentLoc.name = this.name();
		// locModel.currentLoc.address = this.address();
		// locModel.currentLoc.description = this.description();
		// locModel.currentLoc.imgSrc = this.imgSrc();
		// locModel.currentLoc.imgAlt = this.imgAlt();
		// locModel.currentLoc.type = this.type();
		// locModel.currentLoc.keywords = this.keywords();
		// locModel.currentLoc.id = this.id();
		// locModel.currentLoc.api = this.api();
		
	};
};

var wikipediaVM = {
	wikipedia: function (id) { // When you've actually got API data, you can get round HTML strings
		var location = locModel.locations[id-1];
		var marker = locModel.markers[id-1];
		var wikiRequestTimeout = setTimeout(function () {
	    	console.log("<p>failed to get wikipedia resources</p>");
	    }, 8000);

	    var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
	    	location.endpoint + "&format=json"; //&callback=wikiCallback
	    var wikiAJAXSettings = {
	    	url: wikiurl,
	    	dataType: "jsonp",
	    };
	    $.ajax(wikiAJAXSettings).done(function(response) {
	  //   	var articles = response[1];
			// for (var i = 0; i < articles.length; i++) {
			// 	var article = articles[i];
			// 	var url = 'http://en.wikipedia.org/wiki/' + article;
			// 	$wikiElem.append('<li><a href="' + url + '">' + article +
	  //   			'</a></li>');
			// };
			content = "<h3>" + response[1][0] + "</h3>";
			content += "<p>" + response[2][0] + "</p>";
			content += "<a href='" + response[3][0] + "'>";
			content += response[1][0] +  " on Wikipedia</a>";
			marker.infowindow.setContent(content);
			openMarker(id);
			$('#current-location').find('.description').text(response[2][0]);
			location.api = false;
			clearTimeout(wikiRequestTimeout);
	    });
	}
};

ko.applyBindings( new ViewModel() );