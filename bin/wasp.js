const fs       = require( 'fs' );

const { Wasp } = require( '../lib/wasp' );

const ABAILABLE_WASPFILES = [
    'waspfile',
    'Waspfile',
    'waspfile.js',
    'Waspfile.js'
];

let foundFileName = ABAILABLE_WASPFILES.find( filename => fs.existsSync( filename ) );
        
let waspfile = require( foundFileName );

let wasp = new Wasp();

wasp.run( waspfile );
