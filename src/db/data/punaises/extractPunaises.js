var fs = require('fs');
var raw = require('./raw/declarations-exterminations-punaises-de-lit.json')

raw = raw.filter(declaration => declaration.DATE_DECLARATION >= '2018-12-01T00:00:00')
var json = JSON.stringify(raw);
fs.writeFile('punaises.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
}
);