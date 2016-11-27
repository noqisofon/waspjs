class Wasp {
    source(globs, opts) {

        return this;
    }

    run(waspfile, opts) {
        if ( waspfile.default ) {
            waspfile.default.apply( this );
        }

        return this;
    }
}

exports.Wasp = Wasp;
