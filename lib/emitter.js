'use strict';

/* export */ class Emitter {
    constructor() {
        this.events = [];
    }

    on(name, cb) {
        this.events[name] = this.events[name] || [];
        this.events[name].push( cb );

        return this;
    }

    emit(name, that) {
        let self = this;

        let events = self.events[name] || [];

        events.forEach( anEvent => {
            anEvent.call( self, that );
        } );
        return self;
    }
}

module.exports = Emitter;
