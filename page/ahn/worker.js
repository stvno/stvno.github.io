importScripts('color.js');

self.heights = {};

onmessage = function (e) {
    if (e.data === 'clear') {
        self.heights = {};
        return;
    }

    if (e.data.raster) {
        var raster = new Uint8ClampedArray(e.data.raster);
        self.heights[e.data.id] = raster2height(raster);
    }

    var classed = color(self.heights[e.data.id],
        e.data.min, e.data.max, e.data.below, e.data.above);

    postMessage({
        id: e.data.id,
        height: classed.buffer
    }, [classed.buffer]);
};