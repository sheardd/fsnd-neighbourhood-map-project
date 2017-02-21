var foursquare = {
	client_secret: "MPHRMZ13RPQTOGEHPRNLIOKKF3MHOXQDJNCEQFOITUDNRUPH",
	client_id : "SPDMDU0UVW1E0UZ2MW3HDJCHG0YCR1VYZX2EFZDOC4GQNHZU",
	call: function (location) {
		var fsurl = "https://api.foursquare.com/v2/venues/" +
			location.endpoint() + "?client_id=" + foursquare.client_id +
			"&client_secret=" + foursquare.client_secret +
			"&v=20170218&m=foursquare";
		var fsAJAXSettings = {
			url: fsurl,
		};
		var marker = locModel.markers[location.id()-1];
		$.ajax(fsAJAXSettings).done(function(response) {
			var venue = response.response.venue;
			foursquare.updateLoc(venue, location);
		    foursquare.updateInfoWindow(venue, location, marker);
		    location.api(true);
	    }).fail(function(response) {
	    	foursquare.error(marker);
	    });
	},
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
	error: function(marker) {
		var errorMsg = "There was a problem fetching data from " +
    		"foursquare. Please check you are connected to the internet" +
    		" and try again.";
		location.imgSrc('img/lost.jpg');
    	location.imgAlt(errorMsg);
		errorMsg = "<div class='info-container'><p><b>" + errorMsg + "</b></p></div>";
    	marker.infowindow.setContent(marker.infowindow.content + errorMsg);
	}
};