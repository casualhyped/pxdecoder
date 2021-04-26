#!/usr/bin/env node
let fs = require("fs");
var colors = require('colors');
var args = process.argv.slice(2);
let path = args[1];
let output = args[3];

let pxDecodeStrings = function (path, output) {
    let cgtRegex = /(?=\Cgt)(.*?)(?=\")/g

    function atob(str) {
        return Buffer.from(str, 'base64').toString('binary');
    }
    
    function decodePxString(encoded) {
        for(var i = atob(encoded), a = "ZSA8q7L", c = "", u = 0; u < i.length; ++u) {
            var f = a.charCodeAt(u % 7);
            c += String.fromCharCode(f ^ i.charCodeAt(u));
        }
        return c;
    }

    let encodedScript = fs.readFileSync(path, 'utf8')
    let decodedScript = encodedScript.replace(cgtRegex, (cgtString) => {
        return decodePxString(cgtString)
    })

    fs.writeFile(output, decodedScript, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(colors.green(`${path} was successfully decoded and saved at: ${output}`));
        let logo = fs.readFileSync("logo.txt", 'utf8');
        console.log(logo)
    }); 
}


pxDecodeStrings(path, output)

    