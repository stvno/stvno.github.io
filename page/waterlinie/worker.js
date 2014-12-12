importScripts('color.js');

self.ages = {};

onmessage = function (e) {
    if (e.data === 'clear') {
        self.ages = {};
        return;
    }

    if (e.data.raster) {
        var raster = new Uint8ClampedArray(e.data.raster);
        self.ages[e.data.id] = raster2age(raster);
    }

    var aged = color(self.ages[e.data.id],
        e.data.year);

    postMessage({
        id: e.data.id,
        gebouwen: aged.buffer
    }, [aged.buffer]);
};