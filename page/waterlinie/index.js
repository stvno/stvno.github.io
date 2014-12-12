var kringen =true,  water =true;
(function () {


 var map = new L.Map('map',{ minZoom: 9, maxZoom:16});   
        //Background map
        var layer = new L.StamenTileLayer("toner");
        layer.setOpacity(0.4);
        map.setView(new L.LatLng(52.08, 4.91), 10).addLayer(layer);
        bagatttr = 'BAG data &copy; bag.vrom.nl';   
var w = L.geoJson(inundatie, {style: {

fillColor:'#729fcf',
opacity : 1,
fillOpacity : 0.5,
color : 'none',
zindex :0
}}).addTo(map);

var  k = L.geoJson(kringels, {style: function(f) {
var c = f.properties.color;
var style = {};
switch(c) {


case 1: //kring
  style.fillColor = '#a40000';
  style.opacity = 1;
  style.fillOpacity = 0.5;
  style.color = '#a40000';
  style.weight = 1;
  style.zindex = 1000;
  break;
case 4: //schootsveld
  style.fillColor = '#555753';
  style.opacity = 1;
  style.fillOpacity = 0.5;
  style.color = '#555753';
  style.weight = 1;
  break;
  }
return style;
}
}).addTo(map);


L.geoJson(linie, {style: function(f) {
var c = f.properties.color;
var style = {};
switch(c) {
case 0: //verdedigingswerk
  style.fillColor = '#a40000';
  style.opacity = 1;
  style.fillOpacity = 1;
  style.color = '#000';
  style.weight = 1;
  break;

case 2: //tankversperring
 style.fillColor = '#000';
  style.opacity = 1;
  style.fillOpacity = 1;
  style.color = '#000';
  style.weight = 2;
  break;
case 3: //sluis
  style.fillColor = '#204a87';
  style.opacity = 1;
  style.fillOpacity = 1;
  style.color = '#204a87';
  style.weight = 1;
  break;

case 5: //huisjes
  style.fillColor = '#a40000';
  style.opacity = 1;
  style.fillOpacity =1;
  style.color = 'none';
  style.weight = 1;
  break;
case 6: //waterwerken
style.fillColor = '#4e9a06';
  style.opacity = 1;
  style.fillOpacity = 1;
  style.color = '#4e9a06';
  style.weight = 1;
  break;

case 8: //loopgraaf
style.fillColor = '#000';
  style.opacity = 1;
  style.fillOpacity = 1;
  style.color = '#000';
  style.weight = 1;
  break
case 9: //overig
style.fillColor = '#5c3566';
  style.opacity = 1;
  style.fillOpacity = 1;
  style.color = '#5c3566';
  style.weight = 1;
  break;

}
return style;
}}).addTo(map);


 var hash = L.hash(map);
$('#kringen').click(function(){
kringen =kringen?false:true;
k.setStyle(function(f) {
var c = f.properties.color;
var style = {};
switch(c) {


case 1: //kring
  style.fillColor = '#a40000';
  style.opacity = kringen?1:0;
  style.fillOpacity = kringen?0.5:0;
  style.color = '#a40000';
  style.weight = 1;
  style.zindex = 1000;
  break;
case 4: //schootsveld
  style.fillColor = '#555753';
  style.opacity = kringen?1:0;
  style.fillOpacity = kringen?0.5:0;
  style.color = '#555753';
  style.weight = 1;
  break;
  }
return style;
})
});
})();
