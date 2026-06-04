// 🔒 bounds (Rovaniemi ~15 km)
var bounds = L.latLngBounds(
  [66.3675, 25.1635],
  [66.7575, 26.3175]
);

// 🗺️ mapa
var map = L.map('map', {
  center: [66.5039, 25.7294],
  zoom: 12,
  minZoom: 10,
  maxZoom: 17
});


// 🔥 blokada przesuwania mapy z zapasem
//map.setMaxBounds(bounds.pad(0.5));
//map.options.maxBoundsViscosity = 0.7;



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

// 🌍 CARTO
var carto = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 17
  }
).addTo(map);


// 🎯 IKONY; atrakcje 
function getIcon(category) {

  if (category === "santa claus") {
    return L.icon({
      iconUrl: 'https://dominikaka363.github.io/rovaniemitodo2/icons/santa.png',
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
      iconUrl: './icons/sauna.png',
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

function createClusterLayer() {
  return L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    disableClusteringAtZoom: 16,
    maxClusterRadius: 100
  });
}



// 📦 WARSTWY - nowa warstwa
let churchLayer = createClusterLayer();
let santaLayer = createClusterLayer();
let otherLayer = createClusterLayer();
let animalsLayer = createClusterLayer();
let sportLayer = createClusterLayer();
let forKidsLayer = createClusterLayer();
let leanToLayer = createClusterLayer();
let museumLayer = createClusterLayer();
let forFreeLayer = createClusterLayer();
let saunaLayer = createClusterLayer();

// 🥾 WARSTWY SZLAKÓW
let natureTrailsLayer = L.layerGroup();
let winterTrailsLayer = L.layerGroup();
let summerTrailsLayer = L.layerGroup();
let accessibleTrailsLayer = L.layerGroup();



// NATURE trails
const natureTrails = [
  {
    file: 'Ounasvaara_nature_trail.geojson',
    name: 'Ounasvaara nature trail',
    color: '#FFE033',
    description: 'A forest nature trail in the Ounasvaara area, suitable for walking and enjoying Arctic nature.'
  },
  {
    file: 'The_Santa_Claus_Forest.geojson',
    name: 'The Santa Claus Forest',
    color: 'green',
    description: 'A themed forest trail connected with the Santa Claus area and the natural landscape of Rovaniemi.'
  },
  {
    file: 'Vaattunkivaara_nature_trail.geojson',
    name: 'Vaattunkivaara nature trail',
    color: '#FFE033',
    description: 'A scenic nature trail with forest landscapes, hills and views of the surrounding wilderness.'
  },
  {
    file: 'Kielosaari_plant_and_fungus_trail.geojson',
    name: 'Kielosaari plant and fungus trail',
    color: 'green',
    description: 'A short educational trail focused on local plants, fungi and riverside nature.'
  },
  {
    file: 'Kivalonaapa_meadow_culture_trail.geojson',
    name: 'Kivalonaapa meadow culture trail',
    color: 'green',
    description: 'A cultural nature trail presenting meadow landscapes and traditional local environments.'
  },
  {
    file: 'Koivusaari_nature_trail.geojson',
    name: 'Koivusaari nature trail',
    color: 'green',
    description: 'A nature trail on Koivusaari island, known for riverside scenery and birdlife.'
  },
  {
    file: 'Korkalovaara_nature_trail.geojson',
    name: 'Korkalovaara nature trail',
    color: 'green',
    description: 'A local forest trail in the Korkalovaara area, suitable for a peaceful walk close to the city.'
  },
  {
    file: 'Mire_trail.geojson',
    name: 'Mire trail',
    color: 'green',
    description: 'A trail through wetland and mire landscapes, showing typical northern Finnish nature.'
  }
];

// ❄️ WINTER TRAILS
const winterTrails = [
  {
    file: 'Ounasvaara winter trail.geojson',
    name: 'Ounasvaara winter trail',
    color: 'green',
    type: 'Winter trail',
    description: 'A winter trail in the Ounasvaara area, suitable for enjoying snowy forest landscapes.'
  },
  {
    file: 'Pöyliövaara winter walking trail.geojson',
    name: 'Pöyliövaara winter walking trail',
    color: '#FFE033',
    type: 'Winter trail',
    description: 'A winter walking trail in the Pöyliövaara area, offering a peaceful route through northern nature.'
  }
];


// ♿ ACCESSIBLE TRAILS
const accessibleTrails = [
  {
    file: 'Harjulampi Accessible Trail.geojson',
    name: 'Harjulampi accessible trail',
    color: '#1F78FF',
    type: 'Accessible trail',
    description: 'An accessible trail around Harjulampi, suitable for visitors looking for an easier nature route.'
  },
  {
    file: 'Könkäänsaari_accessible_nature_trail.geojson',
    name: 'Könkäänsaari accessible nature trail',
    color: '#1F78FF',
    type: 'Accessible trail',
    description: 'An accessible nature trail on Könkäänsaari, offering an easy way to experience riverside nature.'
  },
  {
    file: 'Puistolampi Accessible Trail.geojson',
    name: 'Puistolampi accessible trail',
    color: '#1F78FF',
    type: 'Accessible trail',
    description: 'An accessible trail near Puistolampi, suitable for a short and easy outdoor visit.'
  },
  {
    file: 'Pöyliövaara accessible trail.geojson',
    name: 'Pöyliövaara accessible trail',
    color: '#1F78FF',
    type: 'Accessible trail',
    description: 'An accessible trail in the Pöyliövaara area, designed for easier movement in nature.'
  },
  {
    file: 'Vikaköngäs accessible trail.geojson',
    name: 'Vikaköngäs accessible trail',
    color: '#1F78FF',
    type: 'Accessible trail',
    description: 'An accessible trail near Vikaköngäs, offering beautiful natural scenery close to the river.'
  }
];


// 🌿 SUMMER TRAILS
const summerTrails = [
  {
    file: 'Könkäiden Polku trail.geojson',
    name: 'Könkäiden Polku trail',
    color: '#FFE033',
    type: 'Summer trail',
    description: 'A scenic hiking trail with forest and riverside landscapes.'
  },
  {
    file: 'Möötikkärakka trail.geojson',
    name: 'Möötikkärakka trail',
    color: 'green',
    type: 'Summer trail',
    description: 'A nature trail through northern forest scenery, suitable for summer hiking.'
  },
  {
    file: 'Olkkajärvi hiking trail.geojson',
    name: 'Olkkajärvi hiking trail',
    color: 'red',
    type: 'Summer trail',
    description: 'A hiking trail near Olkkajärvi, offering a quiet outdoor route through natural surroundings.'
  },
  {
    file: 'Ounasvaara Summer trail.geojson',
    name: 'Ounasvaara summer trail',
    color: 'green',
    type: 'Summer trail',
    description: 'A summer trail in Ounasvaara, ideal for hiking and enjoying green forest landscapes.'
  },
  {
    file: 'Pikkurompa trail.geojson',
    name: 'Pikkurompa trail',
    color: 'green',
    type: 'Summer trail',
    description: 'A summer nature trail offering a peaceful route through the northern landscape.'
  },
  {
    file: 'Pöyliövaara Nature Experience Trail.geojson',
    name: 'Pöyliövaara nature experience trail',
    color: '#FFE033',
    type: 'Summer trail',
    description: 'A nature experience trail in Pöyliövaara, suitable for exploring local natural features.'
  }
];


// 🥾 FUNKCJA DODAWANIA SZLAKU + WIĘKSZA STREFA KLIKNIĘCIA
function addTrail(trailInfo, targetLayer, trailType) {
  fetch(trailInfo.file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found: " + trailInfo.file);
      }
      return response.json();
    })
    .then(data => {

      let popup = `
        <div style="text-align:center">
          <h3>🥾 ${trailInfo.name}</h3>

          <p style="font-size:13px; margin:0 0 10px;">
            ${trailInfo.description}
          </p>

          <p style="font-size:12px; margin:0;">
            <b>Trail type:</b> ${trailType}
          </p>
        </div>
      `;

      // 1️⃣ Widoczna linia szlaku
      let visibleTrail = L.geoJSON(data, {
        style: {
          color: trailInfo.color,
          weight: 4,
          opacity: 0.9
        }
      });

      // 2️⃣ Niewidoczna, gruba linia do klikania
      let clickTrail = L.geoJSON(data, {
        style: {
          color: trailInfo.color,
          weight: 35,        // szerokość strefy kliknięcia
          opacity: 0,        // niewidoczna
          fillOpacity: 0
        },

        onEachFeature: function(feature, layer) {
          layer.bindPopup(popup);
        }
      });

      // dodajemy obie linie do jednej warstwy
      clickTrail.addTo(targetLayer);
      visibleTrail.addTo(targetLayer);

    })
    .catch(err => console.error("Trail loading error:", err));
}

// 🌲 LOAD NATURE TRAILS
natureTrails.forEach(trail => {
  addTrail(trail, natureTrailsLayer, "Nature trail");
});

// ❄️ LOAD WINTER TRAILS
winterTrails.forEach(trail => {
  addTrail(trail, winterTrailsLayer, "Winter trail");
});

// 🌿 LOAD SUMMER TRAILS
summerTrails.forEach(trail => {
  addTrail(trail, summerTrailsLayer, "Summer trail");
});

// ♿ LOAD ACCESSIBLE TRAILS
accessibleTrails.forEach(trail => {
  addTrail(trail, accessibleTrailsLayer, "Accessible trail");
});





// 📍 FUNKCJA TWORZENIA MARKERA do ikon
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
          ? `<a href="${props.website}" target="_blank">🌐 Zobacz więcej</a>`
          : ""
      }

    </div>
  `;

  return L.marker([coords[1], coords[0]], {
    icon: getIcon(iconCategory)
  }).bindPopup(popup);
}


// 📍 WCZYTANIE ATRAKCJI GEOJSON - ikony
fetch('a5_eng.geojson')
  .then(res => res.json())
  .then(data => {

    data.features.forEach(feature => {

      let raw = feature.properties.category || "";

      let categories = raw
        .split(",")
        .map(c => c.trim().toLowerCase())
        .filter(Boolean);

      if (categories.includes("church")) {
        churchLayer.addLayer(createMarker(feature, categories, "church"));
      }

      if (categories.includes("santa claus")) {
        santaLayer.addLayer(createMarker(feature, categories, "santa claus"));
      }

      if (categories.includes("animals")) {
        animalsLayer.addLayer(createMarker(feature, categories, "animals"));
      }

      if (categories.includes("sport")) {
        sportLayer.addLayer(createMarker(feature, categories, "sport"));
      }

      if (categories.includes("for kids")) {
        forKidsLayer.addLayer(createMarker(feature, categories, "for kids"));
      }

      if (categories.includes("lean-to")) {
        leanToLayer.addLayer(createMarker(feature, categories, "lean-to"));
      }

      if (categories.includes("museum")) {
        museumLayer.addLayer(createMarker(feature, categories, "museum"));
      }

      if (categories.includes("for free")) {
        forFreeLayer.addLayer(createMarker(feature, categories, "for free"));
      }

      if (categories.includes("sauna")) {
        saunaLayer.addLayer(createMarker(feature, categories, "sauna"));
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
        otherLayer.addLayer(createMarker(feature, categories, "other"));
      }

    });


  })
  .catch(err => console.error("Błąd wczytywania a5.geojson:", err));


      // 🗺️ domyślnie pokazane warstwy atrakcji
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

    // szlaki 
    natureTrailsLayer.addTo(map);
    winterTrailsLayer.addTo(map);
    summerTrailsLayer.addTo(map);
    accessibleTrailsLayer.addTo(map);


// LEGENDA
L.control.layers(
  {
    "CARTO Light": carto
  },
  {
    '<img src="./icons/church.png" style="width:20px;height:20px;vertical-align:middle;"> Church': churchLayer,
    '<img src="./icons/santa.png" style="width:20px;height:20px;vertical-align:middle;"> Santa Claus': santaLayer,
    '<img src="./icons/flower.png" style="width:20px;height:20px;vertical-align:middle;"> Other': otherLayer,
    '<img src="./icons/ren.png" style="width:20px;height:20px;vertical-align:middle;"> Animals': animalsLayer,
    '<img src="./icons/sport.png" style="width:20px;height:20px;vertical-align:middle;"> Sport': sportLayer,
    '<img src="./icons/child.png" style="width:20px;height:20px;vertical-align:middle;"> For kids': forKidsLayer,
    '<img src="./icons/hut.png" style="width:20px;height:20px;vertical-align:middle;"> Lean-to': leanToLayer,
    '<img src="./icons/museum.png" style="width:20px;height:20px;vertical-align:middle;"> Museum': museumLayer,
    '<img src="./icons/free.png" style="width:20px;height:20px;vertical-align:middle;"> For free': forFreeLayer,
    '<img src="./icons/sauna.png" style="width:20px;height:20px;vertical-align:middle;"> Sauna': saunaLayer,

    // SZLAKI 
    'Nature trails': natureTrailsLayer,
    'Winter trails': winterTrailsLayer,
    'Summer trails': summerTrailsLayer,
    'Accessible trails': accessibleTrailsLayer
  
  },

  { 
  collapsed: true,
  position: 'topright'
}
).addTo(map);


