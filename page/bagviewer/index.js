(function () {

if (!('crossOrigin' in new Image()) ||
        typeof Uint8ClampedArray === 'undefined' ||
        typeof Worker === 'undefined') {

    document.body.innerHTML = '<div class="icon alert center pad1">This demo doesn\'t work in your browser. ' +
            'Please try viewing it in Chrome, Firefox or Safari.</div>' +
            '<p class="center"><img src="upgradebrowser.gif" /></p>';
    return;
}

 var map = new L.Map('map',{maxZoom:16});   
        //Background map
        var layer = new L.StamenTileLayer("toner");
        layer.setOpacity(0.4);
        map.setView(new L.LatLng(52.38, 4.61), 13).addLayer(layer);
        bagatttr = 'BAG data &copy; bag.vrom.nl';   

        //Create a canvas layer on which to draw the BAG data
        var canvasTiles = new L.TileLayer.Canvas( {tms: true, minZoom: 9, maxZoom: 16, attribution: bagatttr});
 var hash = L.hash(map);

var buildings = L.tileLayer.canvas();
var year;

buildings.redrawQueue = [];

var uniqueId = (function () {
    var lastId = 0;
    return function () {
        return ++lastId;
    };
})();

var workers = [];

function updateTile(e) {
    var ctx = contexts[e.data.id],
        imgData = ctx.createImageData(256, 256);

    var gebouwen = new Uint8ClampedArray(e.data.gebouwen);

    imgData.data.set(gebouwen);
    ctx.putImageData(imgData, 0, 0);
}

for (var i = 0; i < 16; i++) {
    workers[i] = new Worker('worker.js');
    workers[i].onmessage = updateTile;
}

map.on('viewreset', function () {
    buildings.redrawQueue = [];
    workers.forEach(function (worker) {
        worker.postMessage('clear');
    });
});


var contexts = {};


buildings.drawTile = function(canvas, tilePoint, zoom) {
    var bagImg = new Image(),
        ctx = canvas.getContext('2d'),
        bagCtx, renderedYear,
        id = uniqueId();

    contexts[id] = ctx;

    function redraw() {
        var transferable = [],
            data = {id: id};

        if (renderedYear !== year) {
            data.raster = bagCtx.getImageData(0, 0, 256, 256).data.buffer;
            data.year = year;
            transferable.push(data.raster);
        }

        data.year = year;
     

        var workerIndex = (tilePoint.x + tilePoint.y) % workers.length;

        workers[workerIndex].postMessage(data, transferable);

        renderedYear = year;
    }

   bagImg.onload = function() {
        var c = document.createElement('canvas');
        c.width = c.height = 256;
        bagCtx = c.getContext('2d');
        bagCtx.drawImage(bagImg, 0, 0);

        redraw();
        buildings.redrawQueue.push(redraw);
    };

    bagImg.crossOrigin = '*';
    var y = Math.pow(2,zoom) - tilePoint.y -1;
    
    bagImg.src= 'http://bag.edugis.nl/tiles/tilecache.py/ibag2/'+zoom+'/'+tilePoint.x+'/'+y+'.png';

}
  

buildings.redrawTiles = function () {
    buildings.redrawQueue.forEach(function(redraw) { redraw(); });
};

buildings.addTo(map);


function get(id) {
    return document.getElementById(id);
}

 
function updateValues() {
    year = parseInt(get('year').value);
    var klasse;
    if (year<1700) klasse ='y1600';
    else if (year<1800) klasse ='y1700';
    else if (year<1850) klasse ='y1800';
    else if (year<1900) klasse ='y1850';
    else if (year<1950) klasse ='y1900';
    else if (year<2000) klasse ='y1950';
    else  klasse ='y2000';
    var el = document.getElementById('yearveld');
    el.setAttribute('value',year);
    el.className =klasse;
  
}

updateValues();



(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var needsRedraw = false;

function redraw() {
    if (needsRedraw) {
        buildings.redrawTiles();
    }
    needsRedraw = false;

    window.requestAnimationFrame(redraw);
}

redraw();
[].forEach.call(document.querySelectorAll('#opacity'), function (input) {
    input['oninput' in input ? 'oninput' : 'onchange'] = function (e) {
        var opacity = parseFloat(get('opacity').value);
        document.getElementById('opacityveld').setAttribute('value',Math.round(opacity*100)+'%');
        layer.setOpacity(opacity);
    };
});
[].forEach.call(document.querySelectorAll('#year'), function (input) {
    input['oninput' in input ? 'oninput' : 'onchange'] = function (e) {
        updateValues();
        needsRedraw = true;
    };
});
})();