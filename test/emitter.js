// const util = require( 'util' );
const tape = require( 'tape' );

const Emitter = require( '../lib/emitter' );

class Subscriber extends Emitter {
}

const my_event = 'my_event';

tape.test( '->  Emitter', t => {
    t.ok( Emitter !== undefined, 'is defined' );

    {
        const aSubscriber = new Subscriber();
        
        t.deepEqual( aSubscriber.events, [], 'inherit events collection' );

        aSubscriber.on( my_event, data => {
            t.deepEqual( data, { data: 1 }, 'notify events' );
            t.end();
        } );

        aSubscriber.emit( my_event, { data: 1 } );
    }
} );
