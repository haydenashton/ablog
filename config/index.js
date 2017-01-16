const ENV = process.env.NODE_ENV || 'development';

module.exports = Object.assign({}, require('./env/global'), require(`./env/${ENV}`));