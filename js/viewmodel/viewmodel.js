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

var ViewModel = function() {
	// initialise locations
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
						};
					})
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
				"address": "Looks like nothing matches that search",
				"imgSrc": "img/lost.jpg",
				"imgAlt": "Looks like nothing matches that search",
				"type": "",
				"keywords": [''],
				"id": 0,
			};
			results.push(noMatches);
			self.currentLoc(noMatches);
			return results;
		} else {
			// remove duplicate results based on Christian Landgren's solution:
			// http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
			var uniqueResults = results.reduce(function(filteredResults,result){
				if (filteredResults.indexOf(result) < 0 ) filteredResults.push(result);
				return filteredResults;
			},[]);
			// return our results 
			return uniqueResults;
		};
	}, this);
	// define currentLoc and the function to set it
	this.currentLoc = ko.observable();
	this.setCurrentLoc = function(location) {
		if (location.id !== 0 ) {
			if (!location.api()) {
				self.foursquare(location);
			};
			GoogleVM.openInfoWindow(location.id());
		};
		self.currentLoc(location);
	};

	// make AJAX request to foursquare and assign data from the response to our location 
	this.foursquare = function (location) {
		var client_secret = "MPHRMZ13RPQTOGEHPRNLIOKKF3MHOXQDJNCEQFOITUDNRUPH"
		var client_id = "SPDMDU0UVW1E0UZ2MW3HDJCHG0YCR1VYZX2EFZDOC4GQNHZU"
		var fsurl = "https://api.foursquare.com/v2/venues/" + location.endpoint();
		fsurl += "?client_id=" + client_id + "&client_secret=" + client_secret;
		fsurl += "&v=20170218&m=foursquare"
		var fsAJAXSettings = {
			url: fsurl,
		};
		var marker = locModel.markers[location.id()-1];
		$.ajax(fsAJAXSettings).done(function(response) {
			var venue = response.response.venue;
			location.address(venue.location.address);
			if (venue.bestPhoto) {
			var imgSrc = venue.bestPhoto.prefix + venue.bestPhoto.width + "x" + 
				venue.bestPhoto.height + venue.bestPhoto.suffix;
			location.imgSrc(imgSrc);
			} else {
				location.imgSrc(false);
			};
		    var firstTip = venue.tips.groups[0].items[0].text;
		    var description = "<p>" + firstTip + "<p>";
		    var locUrl = venue.canonicalUrl;
		    description += "<div><p><a href='" + locUrl + "'>Find " +
		    	location.name() + " on foursquare</a></p><p><a href=" + 
		    	"'https://www.foursquare.com'>Powered by foursquare</a></p>";
		    description = "<div class='info-container'>" + description +
		    	"</div>";
		    marker.infowindow.setContent(marker.infowindow.content + description);
		    location.api(true);
	    }).fail(function(response) {
	    	console.log(response);
	    	var errorMsg = "There was a problem fetching data from " +
	    		"foursquare. Please check you are connected to the internet" +
	    		" and try again.";
    		location.imgSrc('img/lost.jpg');
	    	location.imgAlt(errorMsg);
    		errorMsg = "<div class='info-container'><p><b>" + errorMsg + "</b></p></div>";
	    	marker.infowindow.setContent(marker.infowindow.content + errorMsg);
	    });
	};
};

var VM = new ViewModel();