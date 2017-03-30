#!/usr/bin/env node
var haxelib = require('haxe').haxelib;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var ls = fs.readdir;

exec('npm root', function(err,stdout,stderr){
    if( err != null || stdout == null ) {
        throw err;
    }
    console.log('looking for haxelibs in ' + stdout);
    var root = stdout.trim();
    ls(root, function(err, items){
        items.map(function(item){
            var haxelib_path = path.join(root, item);
            var haxelib_json = path.join(haxelib_path, 'haxelib.json');
            //console.log('scanning ',haxelib_json);
            fs.stat(haxelib_json, function(err, stats) {
                //console.log(err);
                if( err == null && stats != null && stats.isFile() ) {
                    var haxelib_name = JSON.parse(fs.readFileSync(haxelib_json)).name;
                    console.log('linking ' + haxelib_name);
                    haxelib.exec(['dev', haxelib_name, haxelib_path],function(err, stdout, stderr){
                        console.log(stdout);
                        console.log(stderr);
                    });
                }
            });
        });
    });
});
