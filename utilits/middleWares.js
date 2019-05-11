const printer = require('colorprint');

exports.logger = (req, res, next) => {
    printer.notice(`${req.method} ---> ${req.url}`);

    next();
}