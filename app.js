import mapboxgl from "mapbox-gl";
import background from "./background";
import geosJson from "./geos.json";

import LayerChuo from "./layer-chuo";

// for (let geo of geosJson.geos) {
//   console.log(geo.attributes.SIKUCHOSON);
// }

// mapboxgl.accessToken = "pk.eyJ1IjoiNDY5Nm1vbnB5IiwiYSI6ImNqc3ZiaW5hZzA0dWU0NHB2cmdoMWR5cjQifQ.u7eGlUDaItdDATUFZDUmkw";
mapboxgl.accessToken =
  "pk.eyJ1IjoiNDY5Nm1vbnB5IiwiYSI6ImNqc3ZnOWljcDAzNHQ0NHFreXo1d2EyMGEifQ.E5g4kQVqGPZNBv2E-bouRw";
const map = new mapboxgl.Map({
  container: "map",
  zoom: 10,
  minZoom: 0,
  maxZoom: 28,
  center: [139.7420893538008, 35.65349812038335],
  style: "mapbox://styles/4696monpy/cjsoax9tj086h1fpc2j280vrv"
});

window.layer = new LayerChuo(map);

map.on("load", function() {
  map.addLayer(window.layer, "background");
  background();
  window.layer.updateTime();
});
