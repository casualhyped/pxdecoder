#!/usr/bin/env node
var colors = require('colors');
var args = process.argv.slice(2);
let path = args[1];
let output = args[3];
var fs = require('fs');
const {Base64} = require('js-base64');


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
        let logo = Base64.decode(`ICAgICAgICAgICAgICBfICAgICAgICAgICAgICAgICAgICBfICAgICAgICAgICAKICAgICAgICAg
        ICAgIHwgfCAgICAgICAgICAgICAgICAgIHwgfCAgICAgICAgICAKIF8gX19fXyAgX19fX3wgfCBf
        X18gIF9fXyBfX18gICBfX3wgfCBfX18gXyBfXyAKfCAnXyBcIFwvIC8gX2AgfC8gXyBcLyBfXy8g
        XyBcIC8gX2AgfC8gXyBcICdfX3wKfCB8XykgPiAgPCAoX3wgfCAgX18vIChffCAoXykgfCAoX3wg
        fCAgX18vIHwgICAKfCAuX18vXy9cX1xfXyxffFxfX198XF9fX1xfX18vIFxfXyxffFxfX198X3wg
        ICAKfCB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKfF98ICAg
        ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA=`)
        console.log(logo)
    }); 
}


pxDecodeStrings(path, output)

    