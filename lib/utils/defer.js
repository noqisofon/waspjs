/*!
 * @param  {Function}  asyncFunc
 */
module.exports = function (asyncFunc) {
    return function (value, options) {
        return new Promise((resolve, reject) => {
            const cb = (err, value) => err ? reject(err) : resolve(value);

            asyncFunc(value, options || cb, options && cb);
        });
    };
};
