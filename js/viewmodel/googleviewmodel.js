var GoogleVM = {
	init: function() {
		var truro = new google.maps.LatLng(50.263197, -5.051041);
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: truro,
			mapTypeId: 'terrain'
		});
		google.maps.InfoWindow.prototype.opened = false;
		for (var i = 0; i < locModel.locations.length; i++) {
			var location = VM.initLocations()[i];
			var marker = GoogleVM.createMarker(google, map, location);
			locModel.markers.push(marker);
		};
		map.center = truro;
	},
	createMarker: function(google, map, location) {
		var coords = location.coords();
		var latLng = new google.maps.LatLng(coords[0],coords[1]);
		map.center = latLng;
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			title: location.name(),
			infowindow: GoogleVM.newInfoWindow(location, google),
		});
		marker.addListener('click', (function(marker, location) {
				if (!marker.infowindow.opened) {
					return function() {
						VM.setCurrentLoc(location);
					};
				};
			})(marker, location));
			marker.set("type", "point");
			var markerNum = location.id();
			marker.set("id", "marker-" + markerNum)
		return marker;
	},
	newInfoWindow: function(location, google) {
		var infowindow = new google.maps.InfoWindow({
			content: "<h4>" + location.name() + "</h4>"
		});
		return infowindow;
	},
	openInfoWindow: function(id) {
		var currentMarker = locModel.markers[id-1];
		locModel.markers.forEach(function(marker) {
			if (currentMarker === marker) {
				marker.infowindow.opened = true;
				window.setTimeout(function() {
					marker.setAnimation(null);
				}, 2850);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				marker.infowindow.open(map, marker);
			} else {
				marker.infowindow.opened = false;
				marker.infowindow.close();
			};
		});
	}
};