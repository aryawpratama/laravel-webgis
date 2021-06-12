var mymap = L.map('maps').setView([-7.449, 109.2150], 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoibWFyaWZmaW4iLCJhIjoiY2tqM3V3OHByMGY4ejJybnE0ZDZpN2JpdSJ9.VkZp3cjQSPoL7lpc-VWsCg'
}).addTo(mymap);
var popup = L.popup();
var longlat = [];
var label = [];
var marker = [];
var index = document.getElementById('index').value;
if(index===''){
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("<center>Lokasi yang anda pilih</center><br>Latitude = "+e.latlng.lat+"<br>"+"Longitude = "+e.latlng.lng)
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
} else {
// Coordinate
for(c=0;c<=index;c++){
    var lat = parseFloat(document.getElementById('lat'+[c]).value);
    var lon = parseFloat(document.getElementById('lon'+[c]).value);
    var arr = [lat,lon];
    longlat.push(arr);
}
// LabelPopup
for(d=0;d<=index;d++){
    var lab = document.getElementById('lab'+[d]).value;
    var kab = document.getElementById('kab'+[d]).value;
    var prov = document.getElementById('prov'+[d]).value;
    var arr = [lab,kab,prov];
    label.push(arr);
}
for(i=0;i<longlat.length;i++){
    var push = L.marker(longlat[i]).addTo(mymap)
    marker.push(push);
}

for(a=0;a<label.length;a++){
marker[a].bindPopup("Point "+label[a][0]+"<br>"+"Kab/Kota = "+label[a][1]+"<br>"+"Provinsi = "+label[a][2]);
}

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("<center>Ini lokasi yang anda pilih</center> <br> Latitude = "+e.latlng.lat+"<br>"+"Longitude = "+e.latlng.lng)
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
            if (json.address.state == undefined) {
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
}