//FIRST ATTEMPT

function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat: 34.2235, lng: -118.2433},
    });

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("mode").addEventListener("change", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    })

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // Gets the mode of transportation id from the html file
    const selectedMode = document.getElementById("mode").value;

    // Gets the origin and destination id from the html file
    directionsService
    .route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,

        travelMode: google.maps.TravelMode[selectedMode],

    })
    .then((response) => {
        directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Direction request failed due to " + status));

}

//function to calculate the time it takes and the distance that must be traveled
// function calculateTimeAndDuration() {
//     var request = {
//         origin: document.getElementById("from").value,
//         destination: document.getElementById("to").value,
//         travelMode: document.getElementById("mode").value,
//         unitSystem: google.maps.UnitSystem.IMPERIAL
//     }
//     directionsService.route(request, (result) => {
//         const output = document.querySelector('#output');
//         output.innerHTML = "Driving distance: " + result.routes[0].legs[0].distance.text + " .<br />Duration: " + result.routes[0].legs[0].duration.text;
//     });


// }


//SCRAPERBEE

const scrapingbee = require('scrapingbee');

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient('1TEODL986LDVTZP1RHE7QN3I78MU6MILLQFY33ERUE7ZZNDTTIMI102T9VTY0RAFAIYLM2XEX3TVGMKG');
  var response = await client.get({
    url: url,
    params: {
        //Instructions in the website to get to specific city locations and get the data
        'js_scenario': {
            "instructions": [
                {"fill": ["#locationSearch.landinglnputKendo.k-input", "document.getElementById('to').value"]},
                {"click": "go"},
                {"wait": 1000},
                {"click": "#displayReports.viewReportToolbar"}

            ]
        }  
    },
  })
  return response
}

get('https://www.crimemapping.com').then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    // console.log(text);
    const crime = document.querySelector('#crime');
    crime.innerHTML = "Crime around your destination: .<br />" + text;
}).catch((e) => console.log('A problem occurs : ' + e.response.data));

//SECOND ATTEMPT

// function calculateRoute() {

//     //Request for specfic components of the code
//     var request = {
//         origin: document.getElementById("from").value,
//         destination: document.getElementById("to").value,
//         travelMode: document.getElementById("mode").value,
//         unitSystem: google.maps.UnitSystem.IMPERIAL
//     }

//     //Passing the requested methods to the route method
//     directionsService.route(request, (result, status) => {
//         if(status == google.maps.DirectionsStatus.OK) {
//             // Get the distance and time
//             const output = document.querySelector('#output');
//             output.innerHTML = "Driving distance: " + result.routes[0].legs[0].distance.text + " .<br />Duration: " + result.routes[0].legs[0].duration.text;

//             // display route
//             directionsDisplay.setDirections(result);
//         }
//         else {
//             // delete route from map
//             directionsDisplay.setDirections({routes: []});

//             // center map in La Crescenta
//             map.setCenter(myLatLng);

//             // Error message when trying to travel via sea
//             output.innerHTML = "<div class='alret-danger'> Could not retrieve driving distance. </div>";
//         }
//     });
// }

// var myLatLng = { lat: 34.2235, lng: -118.2433};
// var myOptions = {
//     center: myLatLng,
//     zoom: 14,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
// };

// //Creating the map
// var map = new google.maps.Map(document.getElementById("map"), myOptions)

// //Create a Directions service object to use the route method and get a result for the directions
// var directionsService = new google.maps.DirectionsService();

// //Create a DirectionsRenderer object to display the route

// var directionsDisplay = new google.maps.DirectionsRenderer();

// // Binding the directionsRenderer to the map
// directionsDisplay.setMap(map);

// //function

// function calcRoute() {
//     var request = {
//         origin: document.getElementById("from").value,
//         destination: document.getElementById("to").value,
//         travelMode: document.getElementById("mode").value,
//         unitSystem: google.maps.UnitSystem.IMPERIAL
//     }

//     //pass the request to the route method
//     directionsService.route(request, (result, status) => {
//         if(status == google.maps.DirectionsStatus.OK) {
//             // Get the distance and time
//             const output = document.querySelector('#output');
//             output.innerHTML = "Driving distance: " + result.routes[0].legs[0].distance.text + " .<br />Duration: " + result.routes[0].legs[0].duration.text;
//         }
//         else {
//             // delete route from map
//             directionsDisplay.setDirections({routes: []});

//             // center map in La Crescenta
//             map.setCenter(myLatLng);

//             // Error message when trying to travel via sea
//             output.innerHTML = "<div class='alret-danger'> Could not retrieve driving distance. </div>";
//         }
//     });
// }
