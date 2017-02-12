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

	this.init = function() {
		var mapsCallback = $("<script>");
		mapsCallback.html( this.mapsCallback() );

		var gMapsUrl = "https://maps.googleapis.com/maps/api/js?" +
			"key=AIzaSyC1TZRJK7_lN0GZhEDga7vPu8pm_v7qWIQ&callback=initMap&libraries=places";
		var mapsScript = $("<script>", {
			"src": gMapsUrl,
		});
		mapsScript[0].setAttribute("async", "");
		mapsScript[0].setAttribute("defer", "");
		$('body').append(mapsCallback);
		$('body').append(mapsScript);
	};

	this.mapsCallback = function() {
		var callbackString = "";
		callbackString += "var map;";
		callbackString += "function initMap() {";
		callbackString += "	map = new google.maps.Map(document.getElementById('map'), {";
		callbackString += " zoom: 17,";
		callbackString += "	center: new google.maps.LatLng(50.263201, -5.051041),";
		callbackString += "	mapTypeId: 'terrain'";
		callbackString += "	} ); }";
		return callbackString;
	};

	this.init();
};

GoogleMapsVM();
ko.applyBindings( new ViewModel() );