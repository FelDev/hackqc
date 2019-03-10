var fs = require('fs');
var raw = require('./data.json')

newJson = raw.filter(object => object.LOC_LONG !== '' && object.LOC_LAT !== '' && object.LOC_X !== '' && object.LOC_Y !=='')

var json = JSON.stringify(newJson);
fs.writeFile('insect.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
}
);