const fs   = require( 'fs' );
const path = require( 'path' );

const tape = require( 'tape' );

const Wasp = require( '../lib/wasp' );

const fixtures = path.join( process.cwd(), 'test', 'fixtures' );
const waspfile  = path.join( fixtures, 'waspfile.js' );

tape.test( '->  Wasp', t => {
    t.ok( Wasp !== undefined, 'is defined' );

    let methods = [
        'from', 'filter', 'watch', 'unwrap', 'exec',
        'start', 'write', 'clean', 'concat', 'to'  , 'emit'
    ];

    methods.forEach( method => {
        let actual_method = Wasp.prototype[method];

        t.ok( actual_method !== undefined, method + ' is defined' );
    } );

    t.end();
} );

tape.test( '->  Wasp.constructor', t => {
    let wasp = new Wasp( {
        file: waspfile,
        host: {
            task: () => {
                t.equal( wasp, this, 'bind tasks to wasp instance' );
            }
        }
    } );

    t.ok( wasp !== undefined, 'create wasp instance' );

    t.ok( wasp.tasks.task !== undefined, 'load task from host' );

    t.end();
} );
