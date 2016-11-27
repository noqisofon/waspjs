const fs = require( 'fs' );

this.debug = function (text) {
    console.log( text );
};

const abailableWaspFiles = [
    'waspfile',
    'Waspfile',
    'waspfile.js',
    'Waspfile.js'
];

let foundFileName = abailableWaspFiles.find( filename => fs.existsSync( filename ) );

console.log( foundFileName );

let waspfile = require( foundFileName );

console.log( waspfile );

if ( waspfile.default ) {
    waspfile.default.apply( this );
}
