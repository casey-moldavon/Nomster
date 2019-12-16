
// //GET USER GEOLOCATION
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else { 
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }
// function showPosition(position) {
// console.log(position.coords.latitude);
// console.log(position.coords.longitude);
// }
// //NOT YET WORKING - position.coord etc returns as undefined
// function GetMap(position) {
//         var map = new Microsoft.Maps.Map('#myMap', {
//             credentials: 'ArfOhekfSK9rly4qjcdt20SypfRiLnIYtUbxAzrv6-PDjseOmmMguOsqBYcrD-sW',
//             center: new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude)
//         });
//         var center = map.getCenter();
//         //Create custom Pushpin
//         var pin = new Microsoft.Maps.Pushpin(center, {
//             title: 'Microsoft',
//             subTitle: 'City Center',
//             text: '1'
//         });
//         //Add the pushpin to the map
//         map.entities.push(pin);
//     }
