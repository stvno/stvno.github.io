(function () {


 var map = new L.Map('map',{ minZoom: 9, maxZoom:16});   
        //Background map
        var layer = new L.StamenTileLayer("toner");
        layer.setOpacity(0.4);
        map.setView(new L.LatLng(52.08, 4.91), 10).addLayer(layer);
        bagatttr = 'BAG data &copy; bag.vrom.nl';   

        //Create a canvas layer on which to draw the BAG data
        var waterlinie = L.tileLayer.wms("http://research.geodan.nl/service/geoserver/gwc/service/wms?", {
    layers: 'research%3Averdedingswerken-nieuwehollandsewaterlinie',
    format: 'image/png',
    transparent: true,
    attribution: "Waterlinie © PDOK"
});
map.addLayer(waterlinie);
 var hash = L.hash(map);

})();