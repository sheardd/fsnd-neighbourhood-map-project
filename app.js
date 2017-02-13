var map;

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
			map: map
		});
	};
	map.center = truro;

};

var locModel = [
	{
		name: "Chantek",
		address: "",
		coords: [50.263786, -5.048547],
		description: "",
		imgSrc: "",
		imgAlt: ""
	},
	{
		name: "Habanero's Burrito Bar",
		address: "",
		coords: [50.262962, -5.055009],
		description: "",
		imgSrc: "",
		imgAlt: ""
	},
	{
		name: "Sonder Cafe Bar",
		address: "",
		coords: [50.263139, -5.049306],
		description: "",
		imgSrc: "",
		imgAlt: ""
	},
	{
		name: "Pierro's Pizzeria",
		address: "",
		coords: [50.263132, -5.054528],
		description: "",
		imgSrc: "",
		imgAlt: ""
	},
	{
		name: "Mustard and Rye",
		address: "",
		coords: [50.262301, -5.054735],
		description: "",
		imgSrc: "",
		imgAlt: ""
	},
	{
		name: "Hubbox",
		address: "",
		coords: [50.263206, -5.054040],
		description: "",
		imgSrc: "",
		imgAlt: ""
	}
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
	};

	this.mapsCallback = function() {
	};

	this.init();
};

// GoogleMapsVM();
ko.applyBindings( new ViewModel() );