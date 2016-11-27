const fs = require('fs');

const debug = require('debug');

const __ = debug('wasp:read');

/*!
 * @param  {String}  filepath
 * @return {Promise} 
 */
module.exports = function (filepath) {
    __('read this file: %s', filepath);
};
