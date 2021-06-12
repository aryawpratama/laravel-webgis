var MAPS = {
  map: null,
  lat : document.getElementById('lat').value,
  lon : document.getElementById('lon').value,
  b : null,
  iconFeature: null,
  main: function () {
    this._input();
    this._marker();
    this._make();
  },
  _input: function(){
    this.b = [this.lon,this.lat]
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
              anchor: [0.5, 32],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'http://project.radiobayusakti.my.id/../img/marker.png'
            })
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat(this.b),
        zoom: 7
      })
    });
  },
  _marker: function () {
    this.iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(this.b)),
      name: 'So',
    });
  }
}
MAPS.main();
console.log(MAPS.b);
console.log(MAPS.ln)


// wait gw install tele dulu di hp, hp gw dah balik








// map.on("singleclick",function get (){
//     var a = document.getElementById('longitude').value;
//     var b = document.getElementById('latitude').value;
//     var c = [a,b];
//     return c;
// });

