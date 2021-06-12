var MAPS = {
  vectorLayer: [],
  map: null,
  coordinate: null,
  features: null,
  view: null,
  initialview: function () {
    var mandalay = ol.proj.fromLonLat([109.186, -7.3814]);
    this.view = new ol.View({
      center: mandalay,
      zoom: 6// 5
    });
  },
  make: function () {
    if (this.vectorLayer == undefined || this.vectorLayer == null || this.vectorLayer == '') {
      this.map = new ol.Map({
        target: 'maps',
        view: this.view,
        layers: [
          new ol.layer.Tile({
            preload: 3,
            source: new ol.source.OSM(),
          })
        ],
        loadTilesWhileAnimating: true,
      });
    } else {
      this.map = new ol.Map({
        target: 'maps',
        view: this.view,
        layers: [
          new ol.layer.Tile({
            preload: 3,
            source: new ol.source.OSM(),
          }),
          this.vectorLayer[0],
        ],
        loadTilesWhileAnimating: true,
      });
    }
  },
  click: function () {
    this.map.on('singleclick', function (evt) {
      var b = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      document.getElementById('longitude').value = b[0];
      document.getElementById('latitude').value = b[1];
      function simpleReverseGeocoding(lon, lat) {
        fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function (response) {
          return response.json();
        }).then(function (json) {
          console.log(json)
          if (json.address.county == undefined && json.address.village == undefined) {
            document.getElementById('kotaorkab').value = json.address.city;
          }
          else if (json.address.county == undefined) {
            document.getElementById('kotaorkab').value = json.address.village;
          }
          else {
            document.getElementById('kotaorkab').value = json.address.county;
          }
          if (json.address.state == undefined) {
            document.getElementById('provinsi').value = json.address.city_district;
          }
          else {
            document.getElementById('provinsi').value = json.address.state;

          }
        })
      }
      simpleReverseGeocoding(b[0], b[1]);
      var long = parseFloat(document.getElementById('longitude').value);
      var lat = parseFloat(document.getElementById('latitude').value);
      var link = 'http://project.radiobayusakti.my.id/../img/marker.png';
      var arr = [long,lat,link];
      var vectorSource = new ol.source.Vector({});
      var places = [
        arr
      ];
      var features = [];
      console.log(places);
      for (var i = 0; i < places.length; i++) {
      var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326', 'EPSG:3857')),
      });
      
      
      var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
      src: link,
      crossOrigin: 'anonymous',
      })
      });
      iconFeature.setStyle(iconStyle);
      vectorSource.addFeature(iconFeature);
      }
      
      
      
      var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true
      });
      make(vectorLayer);
      });
  }
}
function make (layer){
  console.log(layer)
  MAPS.vectorLayer.push(layer);
}
MAPS.initialview();
MAPS.make();
console.log(MAPS.vectorLayer);
$(document).ready(function() {
  $("#maps").click(function(){
    MAPS.click()
    console.log(MAPS.vectorLayer);
  }
);
})
