var fs = require('fs');
var raw = require('./raw/data.json')

raw = raw.filter(obj => obj.LOC_LONG !== '')
var json = JSON.stringify(raw);
fs.writeFile('argile.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
}
);