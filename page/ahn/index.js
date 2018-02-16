(function () {

if (!('crossOrigin' in new Image()) ||
        typeof Uint8ClampedArray === 'undefined' ||
        typeof Worker === 'undefined') {

    document.body.innerHTML = '<div class="icon alert center pad1">This demo doesn\'t work in your browser. ' +
            'Please try viewing it in Chrome, Firefox or Safari.</div>' +
            '<p class="center"><img src="upgradebrowser.gif" /></p>';
    return;
}

 var crs = new L.Proj.CRS.TMS(
     'EPSG:28992',
     '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
     [-285401.92,22598.08,595401.92,903401.92], {
     resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.21]
  })
  
  var map = L.map('map',{crs:crs, minZoom: 1, maxZoom: 13, fadeAnimation: false});
  var layer = new L.Proj.TileLayer.TMS('//geodata.nationaalgeoregister.nl/tiles/service/tms/1.0.0/brtachtergrondkaart/EPSG:28992/{z}/{x}/{y}.png',crs,{
    maxZoom: 14
    ,minZoom: 5
    });  
  map.addLayer(layer);
  map.on('click',function(e) {
    console.log(e);
  })
map.setView([51.840,5.841],7);//zuid limburg
 var hash = L.hash(map);

var hills = L.tileLayer.canvas();
var min, max, range, above, below;

hills.redrawQueue = [];

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

    var height = new Uint8ClampedArray(e.data.height);
    //var height = e.data.height;

    imgData.data.set(height);
    ctx.putImageData(imgData, 0, 0);
}
var cores = navigator.hardwareConcurrency?navigator.hardwareConcurrency:4;
for (var i = 0; i < cores-1; i++) {
    workers[i] = new Worker('worker.js');
    workers[i].onmessage = updateTile;
}

map.on('viewreset', function () {
    hills.redrawQueue = [];
    workers.forEach(function (worker) {
        worker.postMessage('clear');
    });
});


var contexts = {};


hills.drawTile = function(canvas, tilePoint, zoom) {
    var demImg = new Image(),
        ctx = canvas.getContext('2d'),
        demCtx, renderedRange,
        id = uniqueId();

    contexts[id] = ctx;

    function redraw() {
        var transferable = [],
            data = {id: id};

        if (renderedRange !== range) {
            data.raster = demCtx.getImageData(0, 0, 256, 256).data.buffer;
            data.range = range;
            transferable.push(data.raster);
        }

        data.min = min;
        data.max = max;
        data.below = below;
        data.above = above;

        var workerIndex = (tilePoint.x + tilePoint.y) % workers.length;

        workers[workerIndex].postMessage(data, transferable);

        renderedRange = range;
    }

    demImg.onload = function() {
        var c = document.createElement('canvas');
        c.width = c.height = 256;
        demCtx = c.getContext('2d');
        demCtx.drawImage(demImg, 0, 0);

        redraw();
        hills.redrawQueue.push(redraw);
    };

    demImg.crossOrigin = 'Anonymous';
    var y = Math.pow(2,zoom) - tilePoint.y -1;
    
    demImg.src= '//saturnus.geodan.nl/mapproxy/maaiveld/tms/1.0.0/ahn2/nlgrid/'+zoom+'/'+tilePoint.x+'/'+y+'.png';
}
  

hills.redrawTiles = function () {
    hills.redrawQueue.forEach(function(redraw) { redraw(); });
};

hills.addTo(map);


function get(id) {
    return document.getElementById(id);
}
 
function updateValues() {
    min = parseFloat(get('min').value);
    max = parseFloat(get('max').value);
    range = [min,max];
    below = document.getElementById('below').checked;
    above = document.getElementById('above').checked;
    document.getElementById('min').setAttribute('max',max);
    document.getElementById('min').setAttribute('min',-12);
    document.getElementById('max').setAttribute('min',min);  
    
    document.getElementById('minveld').setAttribute('value',min);
    document.getElementById('maxveld').setAttribute('value',max);

    document.getElementById('minheightlabel').setAttribute('value',min);
    document.getElementById('maxheightlabel').setAttribute('value',max); 
    document.getElementById('medianheightlabel').setAttribute('value',Math.round(((max-min)/2)*100)/100);    
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
        hills.redrawTiles();
    }
    needsRedraw = false;

    window.requestAnimationFrame(redraw);
}

redraw();

[].forEach.call(document.querySelectorAll('#sliderpanel input.sld'), function (input) {
    input['oninput' in input ? 'oninput' : 'onchange'] = function (e) {
        updateValues();
        needsRedraw = true;
    };
});

[].forEach.call(document.querySelectorAll('#sliderpanel input'), function (input) {
    input['onchange'] = function (e) {
        updateValues();
        needsRedraw = true;
    };
});

[].forEach.call(document.querySelectorAll('#opacity'), function (input) {
    input['oninput' in input ? 'oninput' : 'onchange'] = function (e) {
        var opacity = parseFloat(get('opacity').value);
        document.getElementById('opacityveld').setAttribute('value',Math.round(opacity*100)+'%');
        hills.setOpacity(opacity);
    };
});
})();