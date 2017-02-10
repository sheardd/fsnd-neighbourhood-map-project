var locModel = [
	{
		name: "Bob's Burgers",
		address: "Lanner Mill, Trispen, Truro, Cornwall, TR4 9AX",
		description: "Just a Family Burger Place",
		imgSrc: "https://bullseye-prod.aggrego.org/wp-ag/wp-content/uploads/sites/72/2015/10/bobs-8-1024x565.png?o=eyJ4IjowLjUsInkiOjAuNSwid2lkdGgiOjEyNzIsImhlaWdodCI6NzAyfQ%3D%3D&s=xM39ocCRLxxE4J1enOeqczNJtJI%3D",
		imgAlt: "Bob's Burgers' storefront"
	},
	{
		name: "Mettricks Tea & Coffee",
		address: "1 Bargate, Southampton, Hants",
		description: "Better Tea & Coffee",
		imgSrc: "https://static.wixstatic.com/media/ccb5e2_5f71ffce89d4a915693e5c0d33e1f140.png_srz_320_163_85_22_0.50_1.20_0.00_png_srz",
		imgAlt: "Mettricks Logo"
	},
	{
		name: "Sonder Cafe Bar",
		address: "Opposite the back of the Pannier Market, Truro",
		description: "Our coffee is cheap and drinkable, and our snack portions are massive",
		imgSrc: "https://pbs.twimg.com/profile_images/715201855203180544/DNS-6AB9.jpg",
		imgAlt: "Sonder Logo"
	},
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
};

var GoogleMapsVM = function() {
	var self = this;
	// this.gMapsUrl = "https://maps.googleapis.com/maps/api/js?key=";
	// gMapsUrl += "AIzaSyC1TZRJK7_lN0GZhEDga7vPu8pm_v7qWIQ&callback=initMap";
	// $.ajax(gMapsUrl).done(function() {
	// 	console.log("initMap Called Successfully");
	// 	map = new google.maps.Map( $('#map'), {
 //          zoom: 2,
 //          center: new google.maps.LatLng(2.8,-187.3),
 //          mapTypeId: 'terrain'
	// 	});
	// });
	// Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }
};

// GoogleMapsVM();
ko.applyBindings( new ViewModel() );