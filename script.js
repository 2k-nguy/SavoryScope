document.addEventListener("DOMContentLoaded", function() {
  initAutocomplete();
  initMap();

});

// Your other JavaScript code here

function initAutocomplete() {
  const input = document.getElementById('address');
  const autocomplete = new google.maps.places.Autocomplete(input);
}

// Initialize and add the map
let map;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -25.344, lng: 131.031 }, // Default location
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // The map, centered at current location
        map.setCenter(pos);

        // The marker, positioned at current location
        const marker = new google.maps.Marker({
          map: map,
          position: pos,
          title: "Current location",
        });
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }

  // Initialize Autocomplete
  const input = document.getElementById('address');
  const autocomplete = new google.maps.places.Autocomplete(input);
}

function handleLocationError(browserHasGeolocation, pos) {
  const infoWindow = new google.maps.InfoWindow;
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation.");
  infoWindow.open(map);
}

var typingEffect = new Typed(".typedText",{
  strings : ["Designer","Youtuber","Developer"],
  loop : true,
  typeSpeed : 100, 
  backSpeed : 80,
  backDelay : 2000
})

initMap();
initAutocomplete();

