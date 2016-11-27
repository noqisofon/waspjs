const arrify = require('arrify');
const interpret = require('interpret');
const debug = require('debug');

const __ = debug('wasp:bind');

/*!
 * @param  {String}  m
 */
function reduce(m) {
    m = arrify(m);

    try {
        const module = m[0].module ? m[0].module : m[0];

        __('register bind %o', module);

        return require(module);
    } catch (err) {
        return m.length ? reduce(m.slice(1)) : null;
    }
}

/*!
 * @param  {String}  filepath
 * @param  {Object}  options
 *
 * @return {String}
 */
module.exports = function (filepath, options) {
    filepath = filepath || '';

    // the extensions to read / pick up. currently: '.js' only
    const ext = filepath.split('.').slice(1).join('.');

    const module = reduce(interpret.jsVariants['.' + ext]);
    if (typeof module === 'function') {
        module(options);
    }
    return filepath;
};
