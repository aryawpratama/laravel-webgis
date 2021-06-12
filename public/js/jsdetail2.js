var index = document.getElementById('index').value;
console.log(index);

var coordinate = []
function loop (){
  var i = 1;
  while (i<=index) {
    
    var lon = document.getElementById('lon'+i).value;
    var lat = document.getElementById('lat'+i).value;
    var arr = [lon,lat];
    var coor = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(arr))
    });
    coordinate.push(coor);
    i++;
  }
}
loop()
console.log(coordinate);

var vectorSource = new ol.source.Vector({
  features: coordinate
});



var cent = ol.proj.fromLonLat([109.186,-7.3814]);
var view = new ol.View({
center: cent,
zoom: 6// 5
});

var coordinate2 = []
function loop2 (){
  var i=1
  while (i<=index) {
    
    var lon = parseFloat(document.getElementById('lon'+i).value);
    var lat = parseFloat(document.getElementById('lat'+i).value);
    var link = 'http://project.radiobayusakti.my.id/../img/marker.png';
    var arr = [lon,lat,link];
    coordinate2.push(arr);
    i++;
  }
}
loop2()
console.log(coordinate2);
var vectorSource = new ol.source.Vector({});
var places = [
  coordinate2
];

console.log(places[0][1]);
var features = [];
for (var i = 0; i < index; i++) {
var iconFeature = new ol.Feature({
geometry: new ol.geom.Point(ol.proj.transform(places[0][i], 'EPSG:4326', 'EPSG:3857')),
});


var iconStyle = new ol.style.Style({
image: new ol.style.Icon({
src: places[0][i][2],
color: places[0][i][3],
anchor : [0.5,0.7],
crossOrigin: 'anonymous',
})
});
iconFeature.setStyle(iconStyle);
vectorSource.addFeature(iconFeature);
console.log(places[0][i][1]);
console.log(places[0][i][0]);
}



var vectorLayer = new ol.layer.Vector({
source: vectorSource,
updateWhileAnimating: true,
updateWhileInteracting: true
});

var map = new ol.Map({
target: 'maps',
view: view,
layers: [
new ol.layer.Tile({
preload: 3,
source: new ol.source.OSM(),
}),
vectorLayer,
],
loadTilesWhileAnimating: true,
});
