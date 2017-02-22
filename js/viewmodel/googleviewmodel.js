// Handles the response from our Google Maps API call, when called by
// gMapsInit().

var GoogleVM = {
	// INITIALISATION
	// First creates the main map in the view, before creating markers
	// for every location object in VM, and pushing each one to a markers array
	// in locModel (creating the property as it does so). Recenters the map
	// when it's done (for some reason Google Maps API markers don't render
	// properly unless the map is centered on their coordinates when created).
	// Also stores the created map in a property on GoogleVM so it can be
	// referenced by other functions.

	map: {},
	init: function() {
		var truro = new google.maps.LatLng(50.263197, -5.051041);
		GoogleVM.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: truro,
			mapTypeId: 'terrain'
		});
		for (var i = 0; i < VM.initLocations().length; i++) {
			var location = VM.initLocations()[i];
			var marker = GoogleVM.createMarker(google, location);
			locModel.markers.push(marker);
		};
		GoogleVM.map.center = truro;
	},

	// MARKER FUNCTIONS
	// Creates a marker using the given google object and library, as well as
	// the specific location. Fetches the necessary coordinates from location, 
	// centers the map over their latlng object (see above), before creating
	// the marker object. In doing so, calls newInfoWindow to create an
	// infowindow relating to that specific location and assigning it as a
	// property on the marker to make it easily referrable. Once the marker is
	// created, uses the API's marker.addlistener() function to call
	// VM.setCurrentLoc() from the ViewModel, and passes it location.
	// Also assigns an ID to the marker; it's not strictly necessary (it gets
	// used once later on to in showMarkers and we could probably work around
	// it), but it would future-proof against needing the element ID to fetch
	// specific markers for whatever resaon later. Returns the marker to be
	// pushed to locModel.markers.

	createMarker: function(google, location) {
		var coords = location.coords();
		var latLng = new google.maps.LatLng(coords[0],coords[1]);
		GoogleVM.map.center = latLng;
		var marker = new google.maps.Marker({
			position: latLng,
			map: GoogleVM.map,
			title: location.name(),
			infowindow: GoogleVM.newInfoWindow(location, google),
		});
		marker.addListener('click', (function(marker, location) {
				return function() {
					VM.setCurrentLoc(location);
				};
			})(marker, location));
			marker.set("type", "point");
			var markerNum = location.id();
			marker.set("id", "marker-" + markerNum)
		return marker;
	},

	// Takes an array of locations (actually results passed to it from
	// VM.filter()). When called, all markers visibility will have been set to
	// false, so this function checks locations in the array against markers in
	// locModel.markers, and sets the marker's visibility to true when an id
	// match is found.

	showMarkers: function(locArray) {
		for (var i = 0; i < locArray.length; i++) {
			var locationId = locArray[i].id();
			for (var j = 0; j < locModel.markers.length; j++) {
				var marker = locModel.markers[j];
				var markerId = parseInt(marker.id.substr(7));
				if (locationId === markerId) {
					marker.setVisible(true);
				};
			};
		};
	},

	// Called at the start of VM.filter() to iterate over all markers, setting
	// their visibility to false and closing any open infowindows as necessary.
	// The idea is that this function resets all markers to the same state, so
	// that only the filtered markers can be re-displayed by showMarkers above.

	hideAllMarkers: function(){
		locModel.markers.forEach(function(marker) {
			marker.setVisible(false);
			marker.infowindow.close();
		});
	},

	// A simple wrapper function for the map object's panTo method; uses the
	// given id to fetch the relevant marker, and calls panTo() using its
	// position.

	panTo: function(id) {
		var marker = locModel.markers[id-1];
		var latLng = marker.position;
		GoogleVM.map.panTo(marker.position);
	},

	// INFOWINDOW FUNCTIONS
	// Creates a new infowindow using the google object and the given location,
	// which will be attached to the relevant marker as a property when called.
	// Since the content should be populated when foursquare is called (before
	// the infowindow is opened for the first time), content here is largely a
	// placeholder in case workflow changes later in project development.

	newInfoWindow: function(location, google) {
		var infowindow = new google.maps.InfoWindow({
			content: "<h4>" + location.name() + "</h4>"
		});
		return infowindow;
	},

	// Opens a specific infowindow based on location id. Fetches the correct
	// marker using the id number as a point of reference to index (id-1),
	// and then iterates over stored markers. If ids don't match, explicitly
	// close that marker's infowindow and set opened to false in case it was
	// already open. If they do, set a bounce animation on the marker (to be
	// reset to null when the timeout expires), and open the infowindow.

	openInfoWindow: function(id) {
		var currentMarker = locModel.markers[id-1];
		locModel.markers.forEach(function(marker) {
			if (currentMarker === marker) {
				window.setTimeout(function() {
					marker.setAnimation(null);
				}, 2850);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				marker.infowindow.open(map, marker);
			} else {
				marker.infowindow.close();
			};
		});
	}
};