// const fs       = require( 'fs' );
const path = require('path');
const process = require('process');

const tape = require('tape');

const Wasp = require('../lib/wasp');

const fixtures = path.join(process.cwd(), 'test', 'fixtures');
const waspfile = path.join(fixtures, 'waspfile.js');

tape.test('->  Wasp', t => {
    t.ok(Wasp !== undefined, 'is defined');

    const methods = [
        'from', 'filter', 'watch', 'unwrap', 'exec',
        'start', 'write', 'clean', 'concat', 'to', 'emit'
    ];

    methods.forEach(method => {
        const actualMethod = Wasp.prototype[method];

        t.ok(actualMethod !== undefined, method + ' is defined');
    });

    t.end();
});

tape.test('->  Wasp.constructor', t => {
    const wasp = new Wasp({
        file: waspfile,
        host: {
            task: () => {
                t.equal(wasp, this, 'bind tasks to wasp instance');
            }
        }
    });

    t.ok(wasp !== undefined, 'create wasp instance');

    t.ok(wasp.tasks.task !== undefined, 'load task from host');

    t.end();
});
