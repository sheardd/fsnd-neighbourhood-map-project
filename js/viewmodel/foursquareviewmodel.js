// Handles all things foursquare

var foursquareVM = {

	// If I knew how to fetch things from a JSON file in Javascript,
	// these wouldn't be here. I did look into it but I couldn't figure it out
	// without using something like requireJS but that seemed a bit OTT.
	
	client_secret: "MPHRMZ13RPQTOGEHPRNLIOKKF3MHOXQDJNCEQFOITUDNRUPH",
	client_id : "SPDMDU0UVW1E0UZ2MW3HDJCHG0YCR1VYZX2EFZDOC4GQNHZU",

	// foursquareVM's primary function. Uses the given location's endpoint
	// observable to make an AJAX request to foursquare for information on
	// that location. It also creates the marker variable before we actually
	// need it so that it can be passed into both .done() and .fail(). If
	// the request is successful, it defines the venue within the response,
	// that contains actual location info, and uses this object to update
	// the location's data, using updateLoc(). Since these values are all
	// observables, they will be updated automatically in the view as a result.
	// It then passes the same information to updateInfoWindow (along with
	// marker), to update the location's infowindow content. Finally, it
	// sets the location's api property to true, so that the next time that
	// location as passed to currentLoc, the foursquare api won't be called
	// again unnecessarily. In the event of an error, calls our error function
	// to update our marker's infowindow with an error message. Also leaves
	// location.api() untouched so that foursquare.call() can be called again
	// and the AJAX call can be re-attempted.

	call: function (location) {
		var fsurl = "https://api.foursquare.com/v2/venues/" +
			location.endpoint() + "?client_id=" + foursquareVM.client_id +
			"&client_secret=" + foursquareVM.client_secret +
			"&v=20170218&m=foursquare";
		var fsAJAXSettings = {
			url: fsurl,
		};
		var marker = locModel.markers[location.id()-1];
		$.ajax(fsAJAXSettings).done(function(response) {
			var venue = response.response.venue;
			foursquareVM.updateLoc(venue, location);
		    foursquareVM.updateInfoWindow(venue, location, marker);
		    location.api(true);
	    }).fail(function(response) {
	    	foursquareVM.error(marker);
	    });
	},

	// Takes the venue information retrieved from foursquare and the given
	// location, and assigns the location's address and photo (if it has one)
	// from foursquare. If the location has no photos on foursquare, sets
	// imgSrc to false, so that the img element for current-location won't
	// render without a src to fetch.

	updateLoc: function(venue, location) {
		location.address(venue.location.address);
		if (venue.bestPhoto) {
		var imgSrc = venue.bestPhoto.prefix + venue.bestPhoto.width + "x" + 
			venue.bestPhoto.height + venue.bestPhoto.suffix;
		location.imgSrc(imgSrc);
		} else {
			location.imgSrc(false);
		};
	},

	// Again, takes venue from foursquare and given location, as well as the
	// marker relating to that location, and sets the marker's infowindow
	// content. To create a location description, it takes the first tip
	// (foursquare comment) for that venue, to give an independent and (usually)
	// personable description of the location. Also uses the venue's
	// canonicalUrl to provide a dynamic link to the location's foursquare page
	// for more info. Location name is still set using location.name() simply
	// for the sake of consistency in naming and neatness.

	updateInfoWindow: function(venue, location, marker) {
		var firstTip = venue.tips.groups[0].items[0].text;
	    var description = "<p>" + firstTip + "<p>";
	    var locUrl = venue.canonicalUrl;
	    description += "<div><p><a href='" + locUrl + "'>Find " +
	    	location.name() + " on foursquare</a></p><p><a href=" + 
	    	"'https://www.foursquare.com'>Powered by foursquare</a></p>";
	    description = "<div class='info-container'>" + description +
	    	"</div>";
	    marker.infowindow.setContent(marker.infowindow.content + description);
	},

	// In the event that there is an issue with reaching foursquare, assigns
	// a simple error message to our infowindow's content, and sets location
	// image to the same image as our no matches object (since it works for
	// both). 

	error: function(marker) {
		var errorMsg = "There was a problem fetching data from " +
    		"foursquare. Please check you are connected to the internet" +
    		" and try again.";
		location.imgSrc('img/lost.jpg');
    	location.imgAlt(errorMsg);
		errorMsg = "<div class='info-container'><p><b>" + errorMsg +
			"</b></p></div>";
    	marker.infowindow.setContent(marker.infowindow.content + errorMsg);
	}
};