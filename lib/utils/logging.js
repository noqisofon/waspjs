const $ = require('clor');
const debug = require('debug');

const __ = debug('wasp:log');

/*!
 *
 */
function stamp() {
    const args = [].slice.call(arguments);

    if (process.env.DEBUG) {
        return __.apply(__, args);
    }
    process.stdout.write('[' + $[this.color](timestamp()) + '] ');

    console[this.method].apply(console, this.custom ? [this.custom].concat(args) : args);
}

/*!
 * @return {String}  as `HH:MM:ss`
 */
function timestamp() {
    const now = new Date();

    return [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ].join('.');
}

function log() {
    stamp.apply({method: 'log', color: 'magenta'}, arguments);

    return this;
}

function error() {
    stamp.apply({method: 'error', color: 'red'}, arguments);

    return this;
}

function alert() {
    if (process.env.VERBOSE) {
        stamp.apply({
            custom: $.yello.bold('%s'),
            method: 'log',
            color: 'yellow'
        }, arguments);
    }
    return this;
}

module.exports = {
    stamp,
    timestamp,
    log,
    error,
    alert
};
