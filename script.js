// Initialize and add the map
let map;

async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, initially centered at a default location
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -25.344, lng: 131.031 }, // Default location
    mapId: "DEMO_MAP_ID",
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
        const marker = new AdvancedMarkerElement({
          map: map,
          position: pos,
          title: "Current location",
        });
      },
      () => {
        handleLocationError(true);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }
}

function handleLocationError(browserHasGeolocation) {
  alert(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}

initMap();