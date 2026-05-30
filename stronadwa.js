// 🔒 bounds (Rovaniemi ~15 km)
var bounds = L.latLngBounds(
  [66.3675, 25.3935],
  [66.6375, 26.0675]
);

// 🗺️ mapa
var map = L.map('map', {
  center: [66.5039, 25.7294],
  zoom: 12,
  minZoom: 10,
  maxZoom: 17
});

// 📏 skala
L.control.scale({
  position: 'bottomleft',
  metric: true,
  imperial: false,
  maxWidth: 200
}).addTo(map);

// 🔥 blokada przesuwania mapy
map.setMaxBounds(bounds);
map.options.maxBoundsViscosity = 1.0;

// 🌍 OSM
var carto = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 17
  }
).addTo(map);


// 🎯 IKONY
function getIcon(category) {

  if (category === "santa claus") {
    return L.icon({
      iconUrl: './icons/santa.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
  }

  if (category === "church") {
    return L.icon({
      iconUrl: './icons/church.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
  }

  if (category === "animals") {
    return L.icon({
      iconUrl: './icons/ren.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
  }

  if (category === "sport") {
    return L.icon({
      iconUrl: './icons/sport.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
  }

  if (category === "museum") {
  return L.icon({
    iconUrl: './icons/museum.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
}

if (category === "sauna") {
  return L.icon({
    iconUrl: './icons/museum.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
}

if (category === "for kids") {
  return L.icon({
    iconUrl: './icons/child.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
}


if (category === "lean-to") {
  return L.icon({
    iconUrl: './icons/hut.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
}


if (category === "for free") {
  return L.icon({
    iconUrl: './icons/free.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
}

  return L.icon({
    iconUrl: './icons/flower.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
}



// 📦 NIEZALEŻNE WARSTWY
let churchLayer = L.layerGroup();
let santaLayer = L.layerGroup();
let otherLayer = L.layerGroup();
let animalsLayer = L.layerGroup();
let sportLayer = L.layerGroup();

let forKidsLayer = L.layerGroup();
let leanToLayer = L.layerGroup();
let museumLayer = L.layerGroup();
let forFreeLayer = L.layerGroup();
let saunaLayer = L.layerGroup();


// 📍 FUNKCJA TWORZENIA MARKERA
function createMarker(feature, categories, iconCategory) {
  let coords = feature.geometry.coordinates;
  let props = feature.properties;

let popup = `
  <div style="text-align:center">

    <h3>${props.layer || "Atrakcja"}</h3>



    <p style="font-size:13px; margin:0 0 10px;">
      ${props.description || "Brak opisu."}
    </p>

    ${
      props.website
      ? `<a href="${props.website}" target="_blank">
           🌐 Zobacz więcej
         </a>`
      : ""
    }

  </div>
`;

  return L.marker([coords[1], coords[0]], {
    icon: getIcon(iconCategory)
  }).bindPopup(popup);
}


// 📍 GEOJSON
fetch('a5.geojson')
  .then(res => res.json())
  .then(data => {

    data.features.forEach(feature => {

      let raw = feature.properties.category || "";

      let categories = raw
        .split(",")
        .map(c => c.trim().toLowerCase())
        .filter(Boolean);

      // ⛪ osobny marker dla Church
      if (categories.includes("church")) {
        churchLayer.addLayer(
          createMarker(feature, categories, "church")
        );
      }

      // 🎅 osobny marker dla Santa Claus
      if (categories.includes("santa claus")) {
        santaLayer.addLayer(
          createMarker(feature, categories, "santa claus")
        );
      }

      // osobny marker dla animals
      if (categories.includes("animals")) {
        animalsLayer.addLayer(
          createMarker(feature, categories, "animals")
        );
      }

    // osobny marker dla sport
        
      if (categories.includes("sport")) {
        sportLayer.addLayer(
          createMarker(feature, categories, "sport")
        );
      }
    if (categories.includes("for kids")) {
  forKidsLayer.addLayer(
    createMarker(feature, categories, "for kids")
  );
}

    if (categories.includes("lean-to")) {
  leanToLayer.addLayer(
    createMarker(feature, categories, "lean-to")
  );
}

    if (categories.includes("museum")) {
  museumLayer.addLayer(
    createMarker(feature, categories, "museum")
  );
}

    if (categories.includes("for free")) {
  forFreeLayer.addLayer(
    createMarker(feature, categories, "for free")
  );
}

    if (categories.includes("sauna")) {
  saunaLayer.addLayer(
    createMarker(feature, categories, "sauna")
  );
}

      // 🌸 pozostałe atrakcje
if (
  !categories.includes("church") &&
  !categories.includes("santa claus") &&
  !categories.includes("animals") &&
  !categories.includes("sport") &&
  !categories.includes("for kids") &&
  !categories.includes("lean-to") &&
  !categories.includes("museum") &&
  !categories.includes("for free") &&
  !categories.includes("sauna")
) {
  otherLayer.addLayer(
    createMarker(feature, categories, "other")
  );
}
    });

    // 🗺️ domyślnie pokazane warstwy
    churchLayer.addTo(map);
    santaLayer.addTo(map);
    otherLayer.addTo(map);
    animalsLayer.addTo(map);
    sportLayer.addTo(map);
    forKidsLayer.addTo(map);
    leanToLayer.addTo(map);
    museumLayer.addTo(map);
    forFreeLayer.addTo(map);
    saunaLayer.addTo(map);

    // 🎛️ CONTROL LAYERS
    L.control.layers(

  {
    "CARTO Light": carto
  },
      {
      '<img src="icons/church.png" style="width:20px;height:20px;vertical-align:middle;"> Church': churchLayer,
      '<img src="icons/santa.png" style="width:20px;height:20px;vertical-align:middle;"> Santa Claus': santaLayer,
      '<img src="icons/flower.png" style="width:20px;height:20px;vertical-align:middle;"> Other': otherLayer,
      '<img src="icons/ren.png" style="width:20px;height:20px;vertical-align:middle;"> Animals':animalsLayer,
      '<img src="icons/sport.png" style="width:20px;height:20px;vertical-align:middle;"> Sport':sportLayer,
      '<img src="./icons/child.png" style="width:20px;height:20px;vertical-align:middle;"> For kids': forKidsLayer,
      '<img src="icons/hut.png" style="width:20px;height:20px;vertical-align:middle;"> Lean-to': leanToLayer,
      '<img src="icons/museum.png" style="width:20px;height:20px;vertical-align:middle;"> Museum': museumLayer,
      '<img src="icons/free.png" style="width:20px;height:20px;vertical-align:middle;"> For free': forFreeLayer,
      '<img src="icons/sauna.png" style="width:20px;height:20px;vertical-align:middle;"> Sauna': saunaLayer
      },
      { collapsed: false }
    ).addTo(map);

  })
  .catch(err => console.error("GeoJSON error:", err));


console.log("JS działa");