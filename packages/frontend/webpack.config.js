'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
    module.exports = require('./tooling/webpack.config.dev');
} else {
    module.exports = require('./tooling/webpack.config.prod');
}
