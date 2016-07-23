'use strict';

const path = require('path');

const arrify = require('arrify');
const assign = require('object-assign');
const debug = require('debug');
const flatten = require('flatten');

const Emitter = require('./emitter');
const utils = require('./utils');

const __ = debug('wasp');

class Wasp extends Emitter {
    constructor(options) {
        super();

        const self = this;

        if (!(self instanceof Wasp)) {
            throw new TypeError('Wasp cannot be invoked without \'new\'');
        }

        options = assign({
            file: process.cwd(),
            host: {},
            plugins: []
        }, options || {});

        const host = options.host;
        const file = options.file;
        const plugins = options.plugins;

        assign(self, {
            file,
            plugins,
            root: path.dirname(file),
            alert: utils.alert,
            error: utils.error,
            defer: utils.defer,
            log: utils.log,
            host: (typeof host === 'function') ? assign(host, {default: host}) : host,
            debug: __,
            _: {
                filters: []
            },
            tasks: Object.keys(host).reduce((_, key) => {
                const that = {};

                that[key] = host[key].bind(self);

                return assign(_, that);
            })
        });

        plugins.forEach(element => {
            if (!element.plugin) {
                throw new Error('Did you forget to `npm i -D ' + element.name + '`?');
            }
            element.plugin.call(self,
                                 debug(element.name.replace('-', ':')),
                                 __('load %o', element.name));
        });

        __('chdir %o', self.root);
        process.chdir(self.root);
    }

    /*!
     * @params   {String|Array}   globs
     */
    from(globs) {
        globs = arrify(globs);

        assign(this, {
            _: {
                filters: [],
                globs: flatten(globs)
            }
        });

        this._.cat = undefined;

        __('source %o', this._globs);

        return this;
    }
}

module.exports = Wasp;
