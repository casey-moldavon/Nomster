//Pushpin User Location Global variables
var userLat = "";
var userLong = "";
var userLocationGlobal = "";

//Pushpin Restaurant 1 Global variables
var Rest01Lat = restaurants.listing.businesses[0].coordinates.latitude;
var Rest01Long = restaurants.listing.businesses[0].coordinates.longitude;
var rest01Loc = "";

//Pushpin Restaurant 2 Global variables
var Rest02Lat = restaurants.listing.businesses[1].coordinates.latitude;
var Rest02Long = restaurants.listing.businesses[1].coordinates.longitude;
var rest02Loc = "";

//Pushpin Restaurant 3 Global variables
var Rest03Lat = restaurants.listing.businesses[2].coordinates.latitude;
var Rest03Long = restaurants.listing.businesses[2].coordinates.longitude;
var rest03Loc = "";

//Pushpin Restaurant 4 Global variables
var Rest04Lat = restaurants.listing.businesses[3].coordinates.latitude;
var Rest04Long = restaurants.listing.businesses[3].coordinates.longitude;
var rest04Loc = "";

//Pushpin Restaurant 5 Global variables
var Rest05Lat = restaurants.listing.businesses[4].coordinates.latitude;
var Rest05Long = restaurants.listing.businesses[4].coordinates.longitude;
var rest05Loc = "";

//Pushpin Restaurant 6 Global variables
var Rest06Lat = restaurants.listing.businesses[5].coordinates.latitude;
var Rest06Long = restaurants.listing.businesses[5].coordinates.longitude;
var rest06Loc = "";

//Pushpin Restaurant 7 Global variables
var Rest07Lat = restaurants.listing.businesses[6].coordinates.latitude;
var Rest07Long = restaurants.listing.businesses[6].coordinates.longitude;
var rest07Loc = "";

//Pushpin Restaurant 8 Global variables
var Rest08Lat = restaurants.listing.businesses[7].coordinates.latitude;
var Rest08Long = restaurants.listing.businesses[7].coordinates.longitude;
var rest08Loc = "";

//Pushpin Restaurant 9 Global variables
var Rest09Lat = restaurants.listing.businesses[8].coordinates.latitude;
var Rest09Long = restaurants.listing.businesses[8].coordinates.longitude;
var rest09Loc = "";

//Pushpin Restaurant 10 Global variables
var Rest10Lat = restaurants.listing.businesses[9].coordinates.latitude;
var Rest10Long = restaurants.listing.businesses[9].coordinates.longitude;
var rest10Loc = "";

//Pushpin Restaurant 11 Global variables
var Rest11Lat = restaurants.listing.businesses[10].coordinates.latitude;
var Rest11Long = restaurants.listing.businesses[10].coordinates.longitude;
var rest11Loc = "";

//Pushpin Restaurant 12 Global variables
var Rest12Lat = restaurants.listing.businesses[11].coordinates.latitude;
var Rest12Long = restaurants.listing.businesses[11].coordinates.longitude;
var rest12Loc = "";

//Pushpin Restaurant 13 Global variables
var Rest13Lat = restaurants.listing.businesses[12].coordinates.latitude;
var Rest13Long = restaurants.listing.businesses[12].coordinates.longitude;
var rest13Loc = "";

//Pushpin Restaurant 14 Global variables
var Rest14Lat = restaurants.listing.businesses[13].coordinates.latitude;
var Rest14Long = restaurants.listing.businesses[13].coordinates.longitude;
var rest14Loc = "";

//Pushpin Restaurant 15 Global variables
var Rest15Lat = restaurants.listing.businesses[14].coordinates.latitude;
var Rest15Long = restaurants.listing.businesses[14].coordinates.longitude;
var rest15Loc = "";

//Pushpin Restaurant 16 Global variables
var Rest16Lat = restaurants.listing.businesses[15].coordinates.latitude;
var Rest16Long = restaurants.listing.businesses[15].coordinates.longitude;
var rest16Loc = "";

//Pushpin Restaurant 17 Global variables
var Rest17Lat = restaurants.listing.businesses[16].coordinates.latitude;
var Rest17Long = restaurants.listing.businesses[16].coordinates.longitude;
var rest17Loc = "";

//Pushpin Restaurant 18 Global variables
var Rest18Lat = restaurants.listing.businesses[17].coordinates.latitude;
var Rest18Long = restaurants.listing.businesses[17].coordinates.longitude;
var rest18Loc = "";

//Pushpin Restaurant 19 Global variables
var Rest19Lat = restaurants.listing.businesses[18].coordinates.latitude;
var Rest19Long = restaurants.listing.businesses[18].coordinates.longitude;
var rest19Loc = "";

//Pushpin Restaurant 20 Global variables
var Rest20Lat = restaurants.listing.businesses[19].coordinates.latitude;
var Rest20Long = restaurants.listing.businesses[19].coordinates.longitude;
var rest20Loc = "";

function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: "ArfOhekfSK9rly4qjcdt20SypfRiLnIYtUbxAzrv6-PDjseOmmMguOsqBYcrD-sW"
    });
    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        var restaurantLoc01 = new Microsoft.Maps.Location(rest01Lat,rest01Long);
        var restaurantLoc02 = new Microsoft.Maps.Location(rest02Lat,rest02Long);
        var restaurantLoc03 = new Microsoft.Maps.Location(rest03Lat,rest03Long);
        var restaurantLoc04 = new Microsoft.Maps.Location(rest04Lat,rest04Long);
        var restaurantLoc05 = new Microsoft.Maps.Location(rest05Lat,rest05Long);
        var restaurantLoc06 = new Microsoft.Maps.Location(rest06Lat,rest06Long);
        var restaurantLoc07 = new Microsoft.Maps.Location(rest07Lat,rest07Long);
        var restaurantLoc08 = new Microsoft.Maps.Location(rest08Lat,rest08Long);
        var restaurantLoc09 = new Microsoft.Maps.Location(rest09Lat,rest09Long);
        var restaurantLoc10 = new Microsoft.Maps.Location(rest10Lat,rest10Long);
        var restaurantLoc11 = new Microsoft.Maps.Location(rest11Lat,rest11Long);
        var restaurantLoc12 = new Microsoft.Maps.Location(rest12Lat,rest12Long);
        var restaurantLoc13 = new Microsoft.Maps.Location(rest13Lat,rest13Long);
        var restaurantLoc14 = new Microsoft.Maps.Location(rest14Lat,rest14Long);
        var restaurantLoc15 = new Microsoft.Maps.Location(rest15Lat,rest15Long);
        var restaurantLoc16 = new Microsoft.Maps.Location(rest16Lat,rest16Long);
        var restaurantLoc17 = new Microsoft.Maps.Location(rest17Lat,rest17Long);
        var restaurantLoc18 = new Microsoft.Maps.Location(rest18Lat,rest18Long);
        var restaurantLoc19 = new Microsoft.Maps.Location(rest19Lat,rest19Long);
        var restaurantLoc20 = new Microsoft.Maps.Location(rest20Lat,rest20Long);
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        userLocationGlobal = loc;
        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);
        var pin01 = new Microsoft.Maps.Pushpin(restaurantLoc01, {
            text: "01"
        });
        map.entities.push(pin01);
        var pin02 = new Microsoft.Maps.Pushpin(restaurantLoc02, {
            text: "02"
        });
        map.entities.push(pin02);
        var pin03 = new Microsoft.Maps.Pushpin(restaurantLoc03, {
            text:"03"
        });
        map.entities.push(pin03);
        var pin04 = new Microsoft.Maps.Pushpin(restaurantLoc04, {
            text: "04"
        });
        map.entities.push(pin04);
        var pin05 = new Microsoft.Maps.Pushpin(restaurantLoc05, {
            text: "05"
        });
        map.entities.push(pin05);
        var pin06 = new Microsoft.Maps.Pushpin(restaurantLoc06, {
            text: "06"
        });
        map.entities.push(pin06);
        var pin07 = new Microsoft.Maps.Pushpin(restaurantLoc07, {
            text: "07"
        });
        map.entities.push(pin07);
        var pin08 = new Microsoft.Maps.Pushpin(restaurantLoc08, {
            text: "08"
        });
        map.entities.push(pin08);
        var pin09 = new Microsoft.Maps.Pushpin(restaurantLoc09, {
            text: "09"
        });
        map.entities.push(pin09);
        var pin10 = new Microsoft.Maps.Pushpin(restaurantLoc10, {
            text: "10"
        });
        map.entities.push(pin10);
        var pin11 = new Microsoft.Maps.Pushpin(restaurantLoc11, {
            text: "11"
        });
        map.entities.push(pin11);
        var pin12 = new Microsoft.Maps.Pushpin(restaurantLoc12, {
            text: "12"
        });
        map.entities.push(pin12);
        var pin13 = new Microsoft.Maps.Pushpin(restaurantLoc13, {
            text: "13"
        });
        map.entities.push(pin13);
        var pin14 = new Microsoft.Maps.Pushpin(restaurantLoc14, {
            text: "14"
        });
        map.entities.push(pin14);
        var pin15 = new Microsoft.Maps.Pushpin(restaurantLoc15, {
            text: "15"
        });
        map.entities.push(pin15);
        var pin16 = new Microsoft.Maps.Pushpin(restaurantLoc16, {
            text: "16"
        });
        map.entities.push(pin16);
        var pin17 = new Microsoft.Maps.Pushpin(restaurantLoc17, {
            text: "17"
        });
        map.entities.push(pin17);
        var pin18 = new Microsoft.Maps.Pushpin(restaurantLoc18, {
            text: "18"
        });
        map.entities.push(pin18);
        var pin19 = new Microsoft.Maps.Pushpin(restaurantLoc19, {
            text: "19"
        });
        map.entities.push(pin19);
        var pin20 = new Microsoft.Maps.Pushpin(restaurantLoc20, {
            text: "20"
        });
        map.entities.push(pin20);
        // Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });
}
setTimeout(function () {
    console.log(userLong);
    console.log(userLat);
}, 10000);


//pin metadata -- should go inside map function
pin.metadata = {
    title: restaurant.listing.businesses[i],
    description: restaurant.listing.businesses[i]
};
Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

//outside map function event listener 
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