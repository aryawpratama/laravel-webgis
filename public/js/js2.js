var MAPS = {
  map: null,
  b: [109.2396, -7.4243],
  iconFeature: null,
  main: function () {
    this._marker();
    this._make();
    this._click();
  },
  _make: function () {
    this.map = new ol.Map({
      target: 'maps',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [this.iconFeature]
          }),
          style: new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([109.2396, -7.4243]),
        zoom: 7
      })
    });
  },
  _click: function () {
    this.map.on('singleclick', function (evt) {
      var c = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      
      document.getElementById('longitude').value = c[0];
      document.getElementById('latitude').value = c[1];
      
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
      simpleReverseGeocoding(c[0], c[1]);
      this._setValue(c);
    });
  },
  _marker: function () {
    this.iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(this.b)),
      name: 'So',
    });
  },
}

MAPS.main();
console.log(MAPS.b);


// wait gw install tele dulu di hp, hp gw dah balik








// map.on("singleclick",function get (){
//     var a = document.getElementById('longitude').value;
//     var b = document.getElementById('latitude').value;
//     var c = [a,b];
//     return c;
// });

