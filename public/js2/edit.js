var lat = parseFloat(document.getElementById('latitude').value);
var lon = parseFloat(document.getElementById('longitude').value);
var kab = document.getElementById('kotaorkab').value;
var prov = document.getElementById('provinsi').value;
var label = document.getElementById('label').value;
var arr = [lat,lon];
var mymap = L.map('maps').setView(arr, 9);
var popup = L.popup();
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoibWFyaWZmaW4iLCJhIjoiY2tqM3V3OHByMGY4ejJybnE0ZDZpN2JpdSJ9.VkZp3cjQSPoL7lpc-VWsCg'
}).addTo(mymap);
// Coordinate
var marker = L.marker(arr).addTo(mymap)
marker.bindPopup("<center>Ini lokasi lama</center> <br> Point "+label+"<br>"+"Kab/Kota = "+kab+"<br>"+"Provinsi = "+prov).openPopup();


function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("<center>Ini lokasi baru yang anda pilih</center <br> Latitude = "+e.latlng.lat+"<br>"+"Longitude = "+e.latlng.lng)
        .openOn(mymap);
        var a = e.latlng.toString();
        var latitude = e.latlng.lat;
        var longitude = e.latlng.lng;
    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;
    function simpleReverseGeocoding(lon, lat) {
        fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (json.address.county == undefined && json.address.village == undefined) {
                document.getElementById('kotaorkab').value = json.address.city;
            }
            else if (json.address.county == undefined) {
                document.getElementById('kotaorkab').value = json.address.village;
            }
            else {
                document.getElementById('kotaorkab').value = json.address.county;
            }
            if (json.address.state == undefined && json.address.city_district == undefined){
                document.getElementById('kotaorkab').value = json.address.municipality;
            }
            else if (json.address.state == undefined) {
                document.getElementById('provinsi').value = json.address.city_district;
            }
            else {
                document.getElementById('provinsi').value = json.address.state;

            }
        })
    }
    simpleReverseGeocoding(longitude, latitude); 
}


mymap.on('click', onMapClick);