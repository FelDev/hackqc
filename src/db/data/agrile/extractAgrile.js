var fs = require('fs');
var raw = require('./raw/data.json')

raw = raw.filter(obj => obj.LOC_LONG !== '' && obj.DDS_DATE_CREATION >= '2018-11-01T00:00:00').map(obj => ({ date: obj.DDS_DATE_CREATION, lat: obj.LOC_LAT, lng: obj.LOC_LONG }))
var json = JSON.stringify(raw);
fs.writeFile('agrile.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
}
);