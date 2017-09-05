var view = new ol.View({
  center: [939258.2035682527, 6178557.87034736],
  zoom: 5
})			
var zoomView = new ol.View({zoom:7, maxZoom: 9, minZoom: 5});
var zoomLayer = new ol.layer.Tile({source: new ol.source.OSM()})
var stamen =  new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'watercolor',
        url: "https://stamen-tiles-{a-d}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
      })
    })
var zoomMap = new ol.Map({
    layers: [
       zoomLayer
    ],
    view: zoomView,
    target: 'zoommap',
    controls: []
})

var map = new ol.Map({
    interactions: ol.interaction.defaults(
        {
        altShiftDragRotate: false,
        dragPan: false,
        doubleClickZoom: false,
        keyboard: false,
        mouseWheelZoom: false,
        shiftDragZoom: false,
        pinchRotate: false,
        pinchZoom: false
        }
    ),
    layers: [
      new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    view: view,
    target: 'map',
    controls: []
});
map.on('click',function(d){
    moveZoom(d);
});
$(map.getViewport()).on('mousemove',function(d){			
    moveZoom(d);		
});
map.on('pointermove',function(d){			
    moveZoom(d);		
});		
$(zoomMap.getViewport()).on('mousemove',function(evt){
    moveZoom(evt);
});
zoomMap.on('pointermove',function(evt){
    moveZoom(evt);
});
$('#sidepanel').on('mousemove',function(e){
$(this).css('cursor','default');
});
var stamenaan = false;
$('#changeLayer').click(function(e){
    
    if(stamenaan) {
    
    zoomMap.removeLayer(stamen);
    zoomMap.addLayer(zoomLayer);
    }
    else 
    {
    zoomMap.removeLayer(zoomLayer);
    zoomMap.addLayer(stamen);
    }
    
    stamenaan = stamenaan?false:true;
})

var radius = 150;
var mousePosition = null;		
var moveZoom = function(d) {
	var e = map.getEventPixel(d.originalEvent);
	mousePosition = zoomMap.getEventPixel(d.originalEvent);  
      
	zoomView.setCenter(map.getCoordinateFromPixel(e));
	 $('#zoommap').offset({top:e[1]-102,left:e[0]-102});	
	 zoomMap.render();
}

function clipLayer(event) {
  var ctx = event.context;
  var pixelRatio = 1;//event.frameState.pixelRatio;
 
  ctx.save();
  ctx.beginPath();
  if (mousePosition) {
    // only show a circle around the mouse
    ctx.arc(mousePosition[0]+50 , mousePosition[1] +50,
        radius, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.stroke();
  }
  ctx.clip();
  
}
function postClip(event) {
 var ctx = event.context
  ctx.restore();
}
zoomLayer.on('precompose', clipLayer);
stamen.on('precompose', clipLayer);

// after rendering the layer, restore the canvas context
zoomLayer.on('postcompose', postClip);
stamen.on('postcompose', postClip);