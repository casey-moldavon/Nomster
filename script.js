

// ========================= This is the Map onload =========================
var userLat = "";
var userLong = "";
var userLocationGlobal = "";
function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: "ArfOhekfSK9rly4qjcdt20SypfRiLnIYtUbxAzrv6-PDjseOmmMguOsqBYcrD-sW"
    });
    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        userLocationGlobal = loc;
        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);
        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });
}
setTimeout(function () {
    console.log(userLong);
    console.log(userLat);
}, 10000);


// ========================= Search listing =========================







































// ========================= Design animations/displays + page shifts =========================
$("#search-button").on("click", function(event) {
    event.preventDefault();

    $("#page-2").fadeIn(2000, function(){
        $(this).css("visibility", "visible");
    });

    $("#home-tab").fadeIn(2000, function(){
        $(this).css("visibility", "visible");
    });

    $("#image-display-2").delay(3000).show("slide", {direction: "left" }, 1000);
    $("#bubble-1").delay(4000).fadeIn(4200);
    $("#bubble-2").delay(4500).fadeIn(4200);
    $("#bubble-3").delay(5000).fadeIn(4200);

    getmap();
});


// idea: monster pops up over page while content loats and then disappears


// $("#home-tab").on("click", function(event) {
//     event.preventDefault();

//     $("#page-2").fadeOut(2000, function(){
//         $(this).css("display", "none");
//     });

    // $("#home-tab").fadeOut(2000, function(){
    //     $(this).css("display", "none");
    // });

    // $("#image-display-2").fadeOut(2000, function(){
    //     $(this).css("display", "none");
    // });

    // $("#bubble-1").fadeOut(2000, function(){
    //     $(this).css("display", "none");
    // });

    // $("#bubble-2").fadeOut(2000, function(){
    //     $(this).css("display", "none");
    // });

    // $("#bubble-3").fadeOut(2000, function(){
    //     $(this).css("display", "none");
    // });
// });
