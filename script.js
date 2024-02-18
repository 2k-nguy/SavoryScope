document.addEventListener("DOMContentLoaded", function() {
  initAutocomplete();
  //initMap();
  
});

function initAutocomplete() {
  const input = document.getElementById('address');
  const autocomplete = new google.maps.places.Autocomplete(input);
}

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -25.344, lng: 131.031 }, // Default location
  });

  const marker = new google.maps.Marker({
    position: { lat: -25.344, lng: 131.031 },
    map: map,
    draggable: true
  });

  const geocoder = new google.maps.Geocoder;

  marker.addListener('dragend', function() {
    geocoder.geocode({'location': marker.getPosition()}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          document.getElementById('address').value = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(pos);
        marker.setPosition(pos);
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, pos) {
  const infoWindow = new google.maps.InfoWindow;
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation.");
  infoWindow.open(map);
}


window.onload = function() {
  VANTA.CLOUDS({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    backgroundColor: 0xffffff,
    skyColor: 0x68b8d7,
    cloudColor: 0xadc1de,
    cloudShadowColor: 0x183550,
    sunColor: 0xff9919,
    sunGlareColor: 0xff6633,
    sunlightColor: 0xff9933,
    speed: 1.50
  });

  var service = new google.maps.places.PlacesService(map);

  document.getElementById('searchForm').onsubmit = function(e) {
      e.preventDefault();

      var address = document.getElementById('address').value;
      var minBudget = document.getElementById('min-budget').value;
      var maxBudget = document.getElementById('max-budget').value;
      var cuisine = document.getElementById('cuisine').value;

      var request = {
          query: `${cuisine} Restaurants near ${address} Price between ${minBudget}-${maxBudget}`,
          fields: ['name', 'geometry'],
      };

      service.textSearch(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
              window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(results[0].name)}`;
          }
      });
  };
};