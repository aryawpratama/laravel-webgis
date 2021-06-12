function displayMap(communesNbResults) {
  /**
   * Elements that make up the popup.
   */
  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');

  //Create icons features by searching his geocode (long, lat)
  let vectorSource = createIconsFeature(communesNbResults);

  //create the style
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 1,
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARDSURBVFiF3ZndaxxVGMZ/Z/YjX00Nadpo1qrFBgu56D9QbAtiLoRC7ywSNK1NURRREBKRFlSwFBW0gnSrJXY1CmISgyjFiyYSFC9ajE3MmpjdjWlMUtNos9lN9mteLzbRuCbZmTMTBB+Yi51znvd5n3nPnjnnjBIR/i/wuh4xpCpI0ojiENAA1AE1wCzwKzCE0EM5l2iShJvSyrXKnFVb8dOK4hmg3AIjifAmaU7ztMy7kYI7Zs6rQwjvka+AXcyiOMZx6XGahuE0AEHVitCFnhGAGoQugqrVaSrOKpNP4FWnSaxCGy1yWpesbyY/tLpwo7p/w0RxWHfI6Zk5q7ZSwhj6Q2sjzJLiXp1JQe+p+mllc4wA1CzHtw37lQmpCha5gbXpVxdJythh9z1kvzJJGrFixPBmOXixl+Z4mONmguZ4mIMXezG8WQsq5cs6tmDfTP7NXiSqN0vTzBD1TQfwbdmDUhX4tuyhvukATTNDlgxZ0SmUtUsgv0TZGPsv9FNSvXfNtpLqvey/0O+KTgF0zNQV7XHP4dsdtVvVKYCOmeqiPbwVOx21W9UpgI6ZWNEe2cSEo3arOgWwb0YYLp5G17Sjdqs6BdCZzYqL9B3dR2puYM221NwAfUf3uaJTAB0zaye5GmbWS6i2gdFQL5mFMCIJMgthRkO9hGobMLPFN4VWdAoptlcAQeUDRoG77YrZwDhQT4tk7JDsV6ZFMggv2+bZwyt2jYDuQnOa94GIFrc4IkzRrkPUM3NKsijatLjF0copsbJ++xec7TTPqw6EI/oB/glT+PC+13Y/aSQNv/Is+tNer09lMn7DMHwAYppp8fvTIpISkVQsFrslqww4M9OuqkgzANzl1MhCyrjZGAycm573pK1yFCyi5FoWvo/FYlPOT2fOqftRXMbB9lkEs+3zbe2f/FD5i3YMj2p3vn8/IV8DZ5yE+Gqkot+JEQCPada5dRhxEriiQ5ya90w+272916F+KpnJDLhjpkUy5HgESNqhZU2Vfr5ne+dSFtOBeso06J6cnEy6d0z0hPwEPGeH8sGVykvfjpfe1NZUci2+mHg7Go2G8z/d/goQVJ9B8S1veMYffujduo/thl+ZwUzDuBqJRGZWt7n/FcDH46lFNVLilar1uiTTxsJTnTssH/QpJVlMNQa5wbGJiWERya3Vz30zzfLb3OveY3dU5j5dp4e80Xdbd3TOu/H/yyAtpjnqgeGS8crRQRks+v5xf5gtY/KM/6NAVebhwvv90bLvHu2o/XId2pJSMmIaxo/RaHRMxN6yZtPM0K5K/7hl/FxVZgZWbs0mPDceeKcuGE95/kpSKUmaImHDNIfHrl+PiIj2zOb+MFvBY7IUOVl2ZG9g6bJH4ckJuRe/2NYZT3myKIkrGM4pNRyLjY+LW09URDb1+uaF0pfm3zJ+7zhRGdq1c9eDuwOBOzdLa/OG2X+APwE8DU64Y/5gfAAAAABJRU5ErkJggg=="
    }))
  });

  //add the feature vector to the layer vector, and apply a style to whole layer
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
  });

  //Check if map not already exist
  if ($('#mapOl').data('map') == null) {
    var center = ol.proj.transform([-2.811813, 48.557159], 'EPSG:4326', 'EPSG:3857');

    //Create all layers
    //Carte IGN
    let ignLayer = new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.WMTS({
        url: "https://wxs.ign.fr/KEY/geoportail/wmts",
        layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
        matrixSet: "PM",
        format: "image/jpeg",
        style: "normal",
        tileGrid: new ol.tilegrid.WMTS({
          origin: [-20037508, 20037508],
          // topLeftCorner
          resolutions: resolutions, // résolutions
          matrixIds: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"] // ids des TileMatrix                      // ids des TileMatrix
        })
      }),
    });

    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlayPopup = new ol.Overlay(/** @type {olx.OverlayOptions} */({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    }));

    var map = new ol.Map({
      renderer: 'canvas',
      target: 'mapOl',
      layers: [ignLayer, vectorLayer],
      overlays: [overlayPopup],
      view: new ol.View({
        center: center,
        zoom: 9,
        maxZoom: 13, //Limit zoom levels
        minZoom: 7
      })
    });
    //Set reference for jQuery
    $('#mapOl').data('map', map);
    $('#mapOl').data('vectorLayer', vectorLayer);

    //Create and layerSwitcher at map
    var layerSwitcher = new ol.control.LayerSwitcher({
      // paramétrage de l'affichage de la couche OSM
      layers: [{
        layer: ignLayer,
        config: {
          title: "Carte IGN",
          description: "Carte topographique IGN"
        }
      }],
    });
    //Set reference for layerSwitcher
    $('#mapOl').data('layerSwitcher', layerSwitcher);

    //Add layerSwitcher at map
    map.addControl(layerSwitcher);
    //Remove layer icons (markers) of layerSwitcher !
    layerSwitcher.removeLayer(vectorLayer);

    //Listener 
    /**
      * Add a click handler to the map to render the popup.
      */
    map.on('singleclick', function (evt) {
      var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
          return feature;
        });

      //Si clique sur un marker ! 
      if (feature) {
        var coordinate = evt.coordinate;

        //Get infos to display
        let infos = feature['infos'][0];
        let hrefId = "map_" + infos['commune'];

        content.innerHTML = 'Infos';

        //Add "event listener" to retrieve all actesIndividus for this commune
        $(content).on('click', $('a#' + hrefId), function () {
          //Find tag <a>
          let aId = $(this).find("a").prop('id');
          //Split to get Commune
          let commune = aId.split('_')[1];

          //Close map modal
          $('#modalcarte').modal('hide');

          //Call method to retrieve all actesIndividus (method: gene)
          mapToGene(commune);
        });

        //Show popup
        $(container).show();
        overlayPopup.setPosition(coordinate);
      }
    });

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function () {
      overlayPopup.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
  else //Change only vectorLayer (markers)
  {
    let map = $('#mapOl').data('map');
    let oldVectorLayer = $('#mapOl').data('vectorLayer');
    //Set reference for new vectorLayer (for future map)
    $('#mapOl').data('vectorLayer', vectorLayer);

    let layerSwitcher = $('#mapOl').data('layerSwitcher');

    //Remove old and add new vectorLayer
    map.removeLayer(oldVectorLayer);
    map.addLayer(vectorLayer);

    //Remove layer icons (markers) of layerSwitcher !
    layerSwitcher.removeLayer(vectorLayer);
  }
}