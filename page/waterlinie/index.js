var kringen =true,  water =true, year = 1950;
(function () {
/*

 var lmap = new L.Map('map',{ minZoom: 9, maxZoom:18});   
        //Background map
        var layer = new L.StamenTileLayer("toner");
        layer.setOpacity(0.4);
        lmap.setView(new L.LatLng(52.08, 4.91), 10).addLayer(layer);
        bagatttr = 'BAG data &copy; bag.vrom.nl';   
        
        
var tmk = new L.tileLayer('http://t{s}.edugis.nl/tiles/1.0.0/tmk_1910/{z}/{x}/{y}.png',{subdomains: '123',tms:true,opacity: 0.5});
lmap.addLayer(tmk);*/

var crs = new L.Proj.CRS.TMS(
     'EPSG:28992',
     '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
     [-285401.92,22598.08,595401.92,903401.92], {
     resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.21]
  })
  
  var lmap = L.map('map',{crs:crs, minZoom: 1, maxZoom: 13, fadeAnimation: false});
  var layer = new L.Proj.TileLayer.TMS('http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart@EPSG:28992@png/{z}/{x}/{y}.png',crs,{
    maxZoom: 14
    ,minZoom: 5
    });  
  lmap.addLayer(layer);
  var tmk = new L.tileLayer('http://r{s}.edugis.nl/tiles/1.0.0/tmk_1910/{z}/{x}/{y}.png',{subdomains: '1',tms:true,opacity: 0.9});
lmap.addLayer(tmk);


lmap.setView([51.840,5.841],7);//zuid limburg
var w = new L.geoJson(inundatie, {style: {

fillColor:'#729fcf',
opacity : 1,
fillOpacity : 0.5,
color : 'none',
zindex :0
},
filter: function(f) {
  return parseInt(f.properties.beginjaar_)<year;
}
})
w.addTo(lmap);

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
,
filter: function(f) {
  return parseInt(f.properties.beginjaar_)<year;
}

})
lmap.addLayer(k);


var l = new L.geoJson(linie, {style: function(f) {
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
},
filter: function(f) {
  return parseInt(f.properties.beginjaar_)<year;
}


})
l.addTo(lmap);


 var hash = L.hash(lmap);
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
function get(id) {
    return document.getElementById(id);
}
function redraw() {
lmap.removeLayer(l)
lmap.removeLayer(w)
lmap.removeLayer(k)
lmap.addLayer(k)
lmap.addLayer(l)
lmap.addLayer(w)
}
[].forEach.call(document.querySelectorAll('#year'), function (input) {
    input['oninput' in input ? 'oninput' : 'onchange'] = function (e) {
        year = parseInt(get('year').value);
  redraw();
    };
});
})();
