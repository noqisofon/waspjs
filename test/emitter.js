// const util = require( 'util' );
const tape = require('tape');

const Emitter = require('../lib/emitter');

class Subscriber extends Emitter {
}

const myEvent = 'my_event';

tape.test('->  Emitter', t => {
    t.ok(Emitter !== undefined, 'is defined');

    {
        const aSubscriber = new Subscriber();

        t.deepEqual(aSubscriber.events, [], 'inherit events collection');

        aSubscriber.on(myEvent, data => {
            t.deepEqual(data, {data: 1}, 'notify events');
            t.end();
        });

        aSubscriber.emit(myEvent, {data: 1});
    }
});
