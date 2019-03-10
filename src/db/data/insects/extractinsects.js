var fs = require('fs');
var raw = require('./data.json')

newJson = raw.filter(object => object.DDS_DATE_CREATION >= '2018-10-21T09:57:56' && object.LOC_LONG !== '' && object.LOC_LAT !== '' && object.LOC_X !== '' && object.LOC_Y !=='')

var json = JSON.stringify(newJson);
fs.writeFile('insects.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
}
);