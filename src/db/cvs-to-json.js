let csvToJson = require('convert-csv-to-json');
 
let fileInputName = './data/punaises/raw/declarations-exterminations-punaises-de-lit.csv'; 
let fileOutputName = './data/punaises/declarations-exterminations-punaises-de-lit.json';
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);