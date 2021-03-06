
// ========================= This is the Map onload =========================
var userLat = "";
var userLong = "";
var userLocationGlobal = "";
function GetMap(objQuery) {
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: "ArfOhekfSK9rly4qjcdt20SypfRiLnIYtUbxAzrv6-PDjseOmmMguOsqBYcrD-sW"
    });
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

    /* if not location was present in the objQuery object then */
    if (objQuery && !("location" in objQuery)) {
        /* get current position from the navigator */
        navigator.geolocation.getCurrentPosition(function (position) {
            var loc = new Microsoft.Maps.Location(
                position.coords.latitude,
                position.coords.longitude);
            userLat = position.coords.latitude;
            userLong = position.coords.longitude;
            userLocationGlobal = loc;
            //Add a pushpin at the user's location.
            var pin = new Microsoft.Maps.Pushpin(loc, {
                icon: 'assets/images/monster-1-icon.png'
            });
            map.entities.push(pin);
            //Center the map on the user's location.
            map.setView({ center: loc, zoom: 15 });

            // set properaties in the yelp query to facilitate a call by lat,lon
            objQuery.latitude = position.coords.latitude;
            objQuery.longitude = position.coords.longitude;

            restaraunts.retrieve(objQuery, function(listing) {
                for (business of listing.businesses) {
                    let lat = business.coordinates.latitude;
                    let lon = business.coordinates.longitude;

                    let loc = new Microsoft.Maps.Location(lat, lon);
                    let pin = new Microsoft.Maps.Pushpin(loc);
                    pin.metadata = {
                        title: business.name,
                        description: business.location.display_address.join("\n")
                    };
                    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
                    map.entities.push(pin);
                }

                updateNomNomsCallback(listing);
            }, true);
        });
    }
    else {
        restaraunts.retrieve(
            objQuery,
            function (listing) {
                // create a new location using yelp position
                var loc = new Microsoft.Maps.Location(
                    listing.position.latitude,
                    listing.position.longitude);
                // create a pin
                var pin = new Microsoft.Maps.Pushpin(loc);
                map.entities.push(pin);

                for (business of listing.businesses) {
                    let lat = business.coordinates.latitude;
                    let lon = business.coordinates.longitude;

                    let loc = new Microsoft.Maps.Location(lat, lon);
                    let pin = new Microsoft.Maps.Pushpin(loc);
                    pin.metadata = {
                        title: business.name,
                        description: business.location.display_address.join("\n")
                    };
                    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
                    map.entities.push(pin);
                }

                // set the view for the map
                map.setView({ center: loc, zoom: 15 });

                // call callback for updating nomnoms section of web page
                updateNomNomsCallback(listing);
            },
            true);
    }
}

// ========================= Design animations/display to page 2 =========================

$("#search-button").on("click", function (event) {
    event.preventDefault();

    $("#page-2").fadeIn(3000, function () {
        $(this).css("visibility", "visible");
    });

    $("#home-tab").fadeIn(3000, function () {
        $(this).css("visibility", "visible");
    });

    $("#image-display-2").delay(3000).show("slide", { direction: "left" }, 1000);
    $("#bubble-1").delay(4500).fadeIn(1000);
    $("#bubble-2").delay(5000).fadeIn(1000);
    $("#bubble-3").delay(5500).fadeIn(1500);

    $("#page-2").css("z-index", "2");

    var objQuery = {};
    objQuery.range = Math.round(parseInt($("#myRange").val().trim()) * 1609.34);

    var location = $("#location").val().trim();
    if (location.length != 0) {
        objQuery.location = location;
    }

    GetMap(objQuery);
});

// ========================= Design animations/displays back to page 1 =========================

$("#home-tab").on("click", function (event) {
    event.preventDefault();

    $("#page-2").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#home-tab").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#image-display-2").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#bubble-1").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#bubble-2").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#bubble-3").fadeOut(2000, function () {
        $(this).css("display", "none");
    });
});



$("#image-display-2").on("click", function (event) {
    event.preventDefault();

    $("#page-2").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#home-tab").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#image-display-2").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#bubble-1").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#bubble-2").fadeOut(2000, function () {
        $(this).css("display", "none");
    });

    $("#bubble-3").fadeOut(2000, function () {
        $(this).css("display", "none");
    });
});

$("#about-tab").on("click", function (event) {
    event.preventDefault();

    $("#about-us").fadeToggle(2000, function () {
        $(this).css("visibility", "visible");
    });
});

$("#contact-tab").on("click", function (event) {
    event.preventDefault();

    $("#contact-us").fadeToggle(2000, function () {
        $(this).css("visibility", "visible");
    });
});