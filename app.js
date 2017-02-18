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
				if (location.api.length === 0) {
					// APIVM.foursquare(location.id);
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
			"address": "",
			"coords": [50.263786, -5.048547],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Smart modern restaurant with courtyard and open kitchen," + 
				" serving Thai and South-East Asian dishes. - Google",
			"type": "Restaurant",
			"keywords": ["ASIAN"],
			"id": 1,
			"api": false,
			// "hasWiki": false,
			"endpoint": "4c61b4ab86b6be9ae5568a34"
		},
		{
			"name": "Habanero's Burrito Bar",
			"address": "",
			"coords": [50.262962, -5.055009],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Truro's only authentic Burrito spot.",
			"type": "Restaurant",
			"keywords": ["MEXICAN", "FAST FOOD", "STREET FOOD"],
			"id": 2,
			"api": false,
			// "hasWiki": false,
			"endpoint": "55cb3030498ef054bdb34605"
		},
		{
			"name": "Sonder Cafe Bar",
			"address": "",
			"coords": [50.263139, -5.049306],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Truro’s first and only independent craft beer bar.",
			"type": "Restaurant",
			"keywords": ["BAR & GRILL"],
			"id": 3,
			"api": false,
			// "hasWiki": false,
			"endpoint": "56f98728498ed2f78a0e9315"
		},
		{
			"name": "Pierro's Pizzeria",
			"address": "",
			"coords": [50.263132, -5.054528],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Family-oriented traditional Italian cuisine.",
			"type": "Restaurant",
			"keywords": ["ITALIAN"],
			"id": 4,
			"api": false,
			// "hasWiki": false,
			"endpoint": "4babb3aff964a520e2c13ae3"
		},
		{
			"name": "Mustard and Rye",
			"address": "",
			"coords": [50.262301, -5.054735],
			"description": "",
			"imgSrc": "",
			"imgAlt": "BBQ, steaks and shakes in sleek American-themed diner with yellow leather booths and vintage photos. - Google",
			"type": "Restaurant",
			"keywords": ["BAR & GRILL", "BBQ", "BURGER"],
			"id": 5,
			"api": false,
			// "hasWiki": false,
			"endpoint": "523d9ece498e057b77a72e45"
		},
		{
			"name": "Hubbox",
			"address": "",
			"coords": [50.263206, -5.054040],
			"description": "",
			"imgSrc": "",
			"imgAlt": "BURGERS - DOGS - BEERS",
			"type": "Restaurant",
			"keywords": ["BURGER", "BAR & GRILL"],
			"id": 6,
			"api": false,
			// "hasWiki": false,
			"endpoint": "53fb5b67498e83054e356060"
		},
		{
			"name": "Truro Cathedral",
			"address": "",
			"coords": [50.264117, -5.051248],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Victorian Gothic Revival CofE place of worship with a coffee shop and restaurant plus a gift shop. - Google",
			"type": "Tourist Attraction",
			"keywords": ["HERITAGE"],
			"id": 7,
			"api": false,
			// "hasWiki": true,
			"endpoint": "4bfce39e55539c74468bbcf3"
		},
		{
			"name": "Hall For Cornwall",
			"address": "",
			"coords": [50.262668, -5.050578],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Live music, drama, dance and comedy, including international touring productions, plus annual panto. - Google",
			"type": "Tourist Attraction",
			"keywords": ["ENTERTAINMENT"],
			"id": 8,
			"api": false,
			// "hasWiki": true,
			"endpoint": "4bab3ec2f964a520729b3ae3"
		},
		{
			"name": "Pannier Market",
			"address": "",
			"coords": [50.252897, -5.040091],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Truro's old fashioned Flea Market.",
			"type": "Tourist Attraction",
			"keywords": ["HERITAGE"],
			"id": 9,
			"api": false,
			// "hasWiki": true,
			"endpoint": "Boscawen_Park"
		},
		{
			"name": "Royal Cornwall Museum",
			"address": "",
			"coords": [50.263681, -5.054862],
			"description": "",
			"imgSrc": "",
			"imgAlt": "Museum with minerals from around the globe and exhibits about the region's wildlife and history. - Google",
			"type": "Tourist Attraction",
			"keywords": ["HERITAGE"],
			"id": 10,
			"api": false,
			// "hasWiki": true,
			"endpoint": "4bc33143abf49521e95ec393"
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
	// this.hasWiki = ko.observable(data.hasWiki);
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
				// "hasWiki": false,
				// "endpoint": "Truro"
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
		if (!this.api()) {
			// if (this.hasWiki()) {
			// 	var wikipedia = APIVM.wikipedia(this.id());
			// 	this.api(wikipedia);
			// 	console.log("this.api(): " + this.api());
			// } else {
			console.log("contacting foursquare...");
			self.foursquare(this);
			// };
		} else { // REPEATED FROM MARKER CODE; OUTSOURCE
			openMarker(this.id());
		};
		self.currentLoc(this);
	};
	this.foursquare = function (location) { // WE WERE TESTING WHETHER JSON LOADS PROPERLY USING $.GETJSON
		var client_secret = "MPHRMZ13RPQTOGEHPRNLIOKKF3MHOXQDJNCEQFOITUDNRUPH"
		var client_id = "SPDMDU0UVW1E0UZ2MW3HDJCHG0YCR1VYZX2EFZDOC4GQNHZU"
		var fsurl = "https://api.foursquare.com/v2/venues/" + location.endpoint();
		fsurl += "?client_id=" + client_id + "&client_secret=" + client_secret;
		fsurl += "&v=20170218&m=foursquare"
		var fsAJAXSettings = {
			url: fsurl,
		};
		$.ajax(fsAJAXSettings).done(function(response) {
	    console.log(response.response);
	    var venue = response.response.venue;
	    location.address(venue.location.address);
	    var firstTip = venue.tips.groups[0].items[0].text;
	    location.description(firstTip);
	    var imgSrc = venue.bestPhoto.prefix + venue.bestPhoto.width + "x" + 
	    	venue.bestPhoto.height + venue.bestPhoto.suffix;
	    location.imgSrc(imgSrc);
	    //add marker code
	    });
	};
};

// var APIVM = {
// 	wikipedia: function (id) { // When you've actually got API data, you can get round HTML strings
// 		var location = locModel.locations[id-1];
// 		var marker = locModel.markers[id-1];
// 		var wikiRequestTimeout = setTimeout(function () {
// 	    	console.log("<p>failed to get wikipedia resources</p>");
// 	    }, 8000);

// 	    var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
// 	    	location.endpoint + "&format=json"; //&callback=wikiCallback
// 	    var wikiAJAXSettings = {
// 	    	url: wikiurl,
// 	    	dataType: "jsonp",
// 	    };
// 	    var content = $.ajax(wikiAJAXSettings).done(function(response) {
// 	  //   	var articles = response[1];
// 			// for (var i = 0; i < articles.length; i++) {
// 			// 	var article = articles[i];
// 			// 	var url = 'http://en.wikipedia.org/wiki/' + article;
// 			// 	$wikiElem.append('<li><a href="' + url + '">' + article +
// 	  //   			'</a></li>');
// 			// };
// 			var html = "<h3>" + response[1][0] + "</h3>";
// 			html += "<p>" + response[2][0] + "</p>";
// 			html += "<a href='" + response[3][0] + "'>";
// 			html += response[1][0] +  " on Wikipedia</a>";
// 			marker.infowindow.setContent(html);
// 			openMarker(id);
// 			$('#current-location').find('.description').text(response[2][0]);
// 			location.api = html;
// 			clearTimeout(wikiRequestTimeout);
// 			return html;
// 	    });
// 	    return content;
// 	},
	
// };

ko.applyBindings( new ViewModel() );