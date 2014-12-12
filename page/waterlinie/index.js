(function () {


 var map = new L.Map('map',{ minZoom: 9, maxZoom:16});   
        //Background map
        var layer = new L.StamenTileLayer("toner");
        layer.setOpacity(0.4);
        map.setView(new L.LatLng(52.08, 4.91), 10).addLayer(layer);
        bagatttr = 'BAG data &copy; bag.vrom.nl';   


L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  
  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'object' ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);  
      }
    });
  },
  
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: 'verdedingswerken-nieuwehollandsewaterlinie',
          query_layers: 'verdedingswerken-nieuwehollandsewaterlinie',
          info_format: 'application/json'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
    return 'http://research.geodan.nl/service/geoserver/research/wms?' + L.Util.getParamString(params, 'http://research.geodan.nl/service/geoserver/research/wms?', true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { console.log(err); return; } // do nothing if there's an error
    var result ='';
    for (var i = 0; i < content.features.length; i++){
        var p = content.features[i].properties;
        result+='<p>';
        result += (p.naam=='')?'':'Naam: '+p.naam+'<br/>';
        result += (p.subtype=='')?'':'<span class="subtype">'+p.subtype+'</span>';
        result += (p.beginjaar_=='')?'':'<br/>Begin: '+p.beginjaar_+'<br/>';
        result += (p.eindjaar_p=='')?'':'Eind: '+p.eindjaar_p+'<br/>';
        result += (p.foto_1=='')?'':'<img src="'+p.foto_1+'" width="300px"/>'+'<br/>';
        result += (p.linie_info=='')?'':'<a href="'+p.linie_info+'">linie info</a>'+'<br/>';
        result += (p.regio_info=='')?'':'<a href="'+p.regio_info+'">regio info</a>'+'<br/>';
        result +='</p>';
    }
    
    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(result)
      .openOn(this._map);
  }
});
 
L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};

 var waterlinie = L.tileLayer.betterWms("http://research.geodan.nl/service/geoserver/gwc/service/wms?", {
    layers: 'research%3Averdedingswerken-nieuwehollandsewaterlinie',
    format: 'image/png',
    transparent: true,
    attribution: "Waterlinie © PDOK"
});
map.addLayer(waterlinie);
 var hash = L.hash(map);

})();