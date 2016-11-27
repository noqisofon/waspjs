const findUp = require('find-up');
const debug = require('debug');

const __ = debug('wasp:find');

module.exports = function (filename, dir) {
    __('find this file: %s', filename);

    const opts = dir ? {cwd: dir} : {};

    return findUp(filename, opts);
};
