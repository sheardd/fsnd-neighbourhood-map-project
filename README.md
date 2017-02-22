==============================================================================

README - Neighbourhood Map Project for Udacity

==============================================================================

Introduction

------------------------------------------------------------------------------

This project was created for a Udacity course to demonstrate working knowledge
of JavaScript Design Patterns, as well as how to update a website
asynchronously using both API requests and knockout. More specifically, this
project was designed to have a real-world application as a local search engine
with a focus on tourism. At its current rudimentary level, this only includes
suggestions of local places to eat and points of interest, but has been
designed where possible to be scalable (based on my current knowledge). This
could include more locations of more diverse types, over a larger area such as
the entire local region.

In order to make this project scalable:

- Add proper server-side handling; would presumably have to be in JavaScript
since the ViewModel is written using JavaScript?

- Replace the model with a proper SQL database, and refactor it to sort
locations into separate tables based on type for faster lookup (lookup
would presumably be faster using SQL anyway).

- Integrate a login system for user specific functionality (see below), most
likely using third-party authentication, including an option to authenticate
with foursquare for additional third-party location content.

- Add functionality for users to create, update and delete location data.

- In the long term, potentially replace foursquare with tripadvisor. I
originally wanted to use tripadvisor in this project over foursquare, as I
wanted location descriptions to be honest and independent reviews. However,
about a week into this project I discovered that Tripadvisor have a rather
fierce usage policy that prevents people from using their API for research or
testing purposes, under which category this would fall. Instead I've used
foursquare "tips" to provide a similar independent opinion, but tripadvisor
reviews would be better in a live production situation for this purpose. We
could potentially keep foursquare alongside tripadvisor for authentication,
and enhanced user experience (showing friends who've checked in at locations
etc.), and using tripadvisor for reviews.

==============================================================================

Quick-Start Guide

------------------------------------------------------------------------------

To run the application:

1) Just open index.html, or go to:
	https://sheardd.github.io/fsnd-neighbourhood-map-project/

2) To view information about a location, just click on its marker to open its
InfoWindow.

3) Altenatively, click "Show Me Around Town!" to bring up a full list of all
locations. Click on any location in the list to bring up more information about
it in the Current Location panel at the top of the location list.

4) To filter locations, use the filter controls at the top of the overlay. You
can filter locations by type using the checkboxes, by specific keywords using
the textbox, or a combination of both. To give you some ideas, all keywords
associated with a location are listed in their list entry.

==============================================================================

Directory Contents and Description

------------------------------------------------------------------------------

js/app.js

Summary:
Our initial startup file; sets timeouts on loading jQuery and the Google Maps
API, both of which are cleared when successfully loaded, as well as housing the
callback function for Google Maps. It also applies the bindings to our
ViewModel to activate knockout. 

Dependencies:
Everything else.

------------------------------------------------------------------------------

viewmodel/viewmodel.js

Summary:
Contains our main ViewModel for knockout, creating all observables to be used
in the view, as well as updating them as and when. This can either take the
form of filtering arrays of objects to be rendered in the view, or updating the
properties of individual objects by making calls to foursquare using the foursquareVM.

Dependencies:
js/viewmodel/googlevidwmodel.js
(Required to update marker visibility in sync with updating ViewModel's
location objects' observables, as well as open infowindows)

js/viewmodel/foursquareviewmodel.js
(Required to fetch data from foursquare with which to update ViewModel's
location objects' observables)

js/model/model.js
(Required to instantiate all of our location objects and fetch our markers
after they are created by GoogleVM)

js/lib/knockout-3.4.1.js
(Required to provide asynchronous DOM updates using observables)

------------------------------------------------------------------------------

js/viewmodel/googleviewmodel.js

Summary:
Creates our map, as well as all markers and infowindows. Also houses several
functions used to center the map, hide and show map markers, and open
infowindows animatedly. While this is indeed a viewmodel, in that it fetches
data from a model (in this case google), and manipulates the output to be
rendered in the view, it isn't linked to knockout, and is considered
subservient to viewmodel.js

Dependencies:
js/model/model.js
(Required to determine titles and coordinates of all markers and infowindows)

Google Maps API
(Required for literally everything)

------------------------------------------------------------------------------

js/viewmodel/foursquareviewmodel.js


Summary:
Makes API calls to foursquare, the responses from which are used to update
location information in ViewModel. While this is indeed a viewmodel, in that
it fetches data from a model (in this case foursquare), and manipulates the
output to be rendered in the view, it isn't linked to knockout, and is
considered subservient to viewmodel.js

Dependencies:
js/viewmodel/viewmodel.js
(Required to determine the urls with which to make API calls. Obviously
indirectly requires all of viewmodel.js's dependencies as well)

------------------------------------------------------------------------------

js/lib/knockout-3.4.1.js


Summary:
Our MVVM framework library; allows us to create observables in the ViewModel,
that can be updated dynamically to cleanly and dynamically reflect changes in
the view in real time.

Dependencies:
None

------------------------------------------------------------------------------

js/model/model.js


Summary:
Contains all basic data used to create location objects in viewmodel.js, as
well as create infowindows and markers in googleviewmodel.js

Dependencies:
None

------------------------------------------------------------------------------

index.html

Summary:
Our single page static html file, which uses data-bindings to update rendered
content dynamically thanks to knockout and our viewmodels.

Dependencies:
js/viewmodel/viewmodel.js
(Assigns all the data-bindings used in index.html to render and update content)

js/viewmodel/googlevidwmodel.js
(Required to create the map, as well as markers and infowindows, and update
their visibility)

js/viewmodel/foursquareviewmodel.js
(Required to fetch data from foursquare with which to update ViewModel's
location objects' observables, which is then rendered using index.html)

js/lib/knockout-3.4.1.js
(Required to provide asynchronous DOM updates using observables)

------------------------------------------------------------------------------

static/style.css

Summary: A very basic site-wide stylesheet.

Dependencies: Called by index.html, references some
google fonts linked at the start of index.html, but fallback values have been
provided so the stylesheet can function without if necessary.

------------------------------------------------------------------------------

img/lost.jpg

Summary: A simple image used in the current-location panel in the event of no
results being returned by a location search, or a failed AJAX call to
foursquare.

Dependencies: Called by viewmodel.js, and by foursquareviewmodel.js

